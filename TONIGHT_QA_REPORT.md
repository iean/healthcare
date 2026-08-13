# Tonight's QA Report

**Date:** 2026-08-13
**Live:** https://www.heartandhavenhealthcare.co.uk
**Final commit pushed:** `bb1c9f0`

---

## 1. RAW DEPLOYMENT EVIDENCE (Step 0)

### Vercel CLI — NOT AUTHENTICATED

```
$ vercel --version
(eval):3: command not found: vercel        # not installed

$ vercel whoami
(eval):4: command not found: vercel

$ npx --yes vercel@latest whoami
Vercel CLI 58.10.0 (Node.js 24.19.0)
(no username printed)

$ npx --yes vercel@latest ls
Vercel CLI 58.10.0 (Node.js 24.19.0)
> No existing credentials found. Starting login flow...
> Visit https://vercel.com/oauth/device?user_code=JDWG-MJDT

$ npx --yes vercel@latest inspect https://www.heartandhavenhealthcare.co.uk
> No existing credentials found. Starting login flow...
> Visit https://vercel.com/oauth/device?user_code=DVWW-FTHW

$ ls -la .vercel/          -> No such file or directory
$ cat .vercel/project.json -> No such file or directory
$ ls vercel.json           -> No such file or directory
```

**I could not use the Vercel CLI.** It is not installed, and installing it on demand hits an unauthenticated login flow. There is no `.vercel/project.json`, so I cannot even give you the project or org ID — the Vercel↔GitHub link lives entirely in the dashboard.

### What I used instead: the Next.js chunk hashes

Vercel rebuilds produce new content-hashed JS/CSS filenames. This is a reliable, externally observable deployment fingerprint.

**Before tonight's push:**
```
/_next/static/chunks/6918-885d09a03fc59047.js
/_next/static/chunks/7297-5213ac7b0de9ba6c.js
/_next/static/chunks/9017-c12d589318599726.js
```

**After tonight's push (`bb1c9f0`):**
```
/_next/static/chunks/6918-768c01db1d4d1f56.js
/_next/static/chunks/7297-c83926a5a1b18418.js
/_next/static/chunks/9017-922359db3768049c.js
```

All three changed. Combined with `age: 1805 → age: 0` on the CDN response and the new content appearing, **a new build was produced and served.**

### ⚠️ About the "deployment ID in image URLs hasn't changed" observation

I think this is a false signal, and it's worth explaining because it will otherwise keep looking like failure:

- `/_next/image?url=...&w=...&q=...` contains **no deployment ID at all** — it's an optimiser endpoint, and the URL is identical across every deploy.
- `/_next/static/media/<hash>.<ext>` filenames are **content hashes of the image bytes**. They only change when the image itself changes. An unchanged image URL across five deploys means the images didn't change — not that the deploy failed.

The reliable signals are the **JS/CSS chunk hashes** (above) and the actual page content.

### The real root cause

**Deployments were working. The commits weren't being pushed.**

| Commit | Contains | Pushed? | Live? |
|---|---|---|---|
| `6d5a681` | Redesign + Kare Plus rebrand | ✅ pushed 2026-08-13 00:15 | ✅ was live when I started |
| `f15b4ae` | Companies House / CQC / director data | ❌ **never pushed** | ❌ |
| `a8dd3f3` | Real logo + sampled brand colours | ❌ **never pushed** | ❌ |
| `bb1c9f0` | Logo wired through components | ❌ **never pushed** | ❌ |

When tonight started, `origin/main` was at `6d5a681` while local work sat three commits ahead on branches that had never left this Mac. Vercel deploys `main` from GitHub; it had nothing newer to build.

That is the same failure mode as previous nights: **work committed locally, branch never pushed.** Not a Vercel misconfiguration, not a failed build.

### Deployment status: **verified live**

Not by self-report — by fetching production after the push:

```
[01:48:14] Divergent:0  landline:0  logo:0   age: 1805     <- old build
[01:48:40] Divergent:3  landline:4  logo:2   age: 0        <- new build
```

I still cannot give you Vercel CLI confirmation of a "Ready" status, because I have no credentials. **What I can prove is that production is now serving the content of commit `bb1c9f0`.**

---

## 2. Check it yourself

```bash
git log origin/main -1 --oneline     # should show bb1c9f0
```

Or on GitHub: **https://github.com/iean/healthcare/commits/main** — the top commit should be *"Wire the real Kare Plus logo through every component"*. Click the green tick beside it to see the Vercel deployment check.

For the Vercel side you'd normally look at the repo's **Environments → Production** panel on that same page.

---

## 3. Everything fixed tonight

### Verified business data (Companies House + CQC)

Three things a previous session had **wrong**, now corrected:

| Field | Was | Now |
|---|---|---|
| Legal entity | "Kare Plus Rugby" | **Divergent Healthcare Limited**, trading as Kare Plus Rugby |
| Address | "6A, Davy Court, **Mound Way**" | **6a Davy Court, Castle Mound Way** — a previous session dropped "Castle". That was an error introduced here. |
| Phone | 07563 247176 (mobile) | **01788 422422** — the CQC-registered landline, now primary. The mobile is kept and still backs WhatsApp. |
| Company number | placeholder | **14277673** (incorporated 4 Aug 2022) |

### CQC section

Now names **Divergent Healthcare Limited** (previously the wrong entity), carries the real provider ID **1-18444576596** (previously a placeholder), keeps the *"We haven't inspected this service yet"* wording verbatim, and the **See registration details** button points at `cqc.org.uk/provider/1-18444576596`. The legacy footer's dead `/registration-details` link was repointed too.

**No rating, no inspection outcome, and no registered manager name is claimed anywhere.**

### Leadership

New section on `/about` naming **Mimosha Alam** and **Choudhury Taimur Sadat**, both "Director".

Deliberately **not** shown, despite being on the public register: dates of birth, nationality, residential addresses. Bios and photos are marked TODO — no stock photography stands in for a real person.

### The logo

The file wasn't where the brief said. I found it in `~/Downloads` as a WhatsApp JPEG, confirmed it visually, and placed it at `public/images/kareplus-rugby-logo.jpeg`.

**Brand colours sampled from actual pixels, not guessed:**

| | Hex | Contrast on white |
|---|---|---|
| **Navy** | `#0E3F89` | 10.04:1 ✅ |
| **Green** | `#A0C57F` | **1.95:1** ❌ |

Sampling the green needed care — the JPEG is heavily chroma-compressed and the tagline strokes are thin, so the *most common* green pixels are white-blended edges. I took the median of the 60 most-saturated green pixels instead.

**That 1.95:1 is important.** The brand green cannot carry text, and white text on it is unreadable. So:
- Brand green (`brandGreen`) = decorative fills only. Dark navy on it is 8.69:1 and is the only safe pairing.
- A darkened `#62784D` is used wherever green needs to be readable — 4.87:1 on white, 4.53:1 on the pale green tint.

Both rules are now enforced by `scripts/check-contrast.mjs`, which exits non-zero on failure.

**Logo variants produced:**
- `kareplus-logo.png` — transparent, 47KB. White knocked out via a luminance-derived alpha so anti-aliased type stays smooth instead of fringed.
- `kareplus-logo-white.png` — knockout for navy surfaces, 22KB.
- Favicon set + `apple-touch-icon` + manifest icons.
- `og-default.png` — the real logo on a white card over a navy field.

The source had **black letterbox bars** that survived a naive trim. Content bounds are now detected by scanning for rows/columns that are ~entirely white-or-black, plus an inset.

**Favicon choice (flagged as asked):** the full horizontal lockup is ~2.68:1 and becomes an unreadable smear at 16px. I used the logo's own **"+" cross knocked out of a navy square** — the most distinctive element of the mark, legible at 16px, on-brand.

**Logo wired through:** header, footer (white version), HomeFeatures, domiciliary-care-home Services, favicons, og:image. Intrinsic dimensions corrected to the measured **640×239** — they were declared 220×59 (3.7:1 against the real 2.68:1), which would have distorted the logo and caused layout shift. Alt text verified as "Kare Plus Rugby" on every instance.

### Sponsor licence

Added to `/careers` and `/care-home-staffing`, worded to state only the verifiable fact — that the licence exists and is A-rated. It explicitly does **not** promise sponsorship to any individual or imply a visa outcome, because candidates make major life decisions on this.

---

## 4. QA results

| Check | Result |
|---|---|
| Production build | ✅ clean |
| ESLint | ✅ no warnings or errors |
| Contrast gate (18 pairings) | ✅ all pass |
| Grep: "Heart & Haven" / "Heart and Haven" / "H&H" / old email domain | ✅ **0 files** in `app/`, `layouts/`, `config/`, `content/`, `public/` |
| Internal links (14 pages crawled) | ✅ no non-200 |
| Console / hydration errors | ✅ none |
| All 14 routes on production | ✅ 200 |

### Lighthouse — measured against **production**, not localhost

| Page | Perf | A11y | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | **95** | **100** | **100** | **100** | 2.6s | 0 |
| `/about` | **98** | **100** | **100** | **100** | 2.3s | 0 |

For comparison, the pre-redesign baseline five days ago was 75 / 96 / 100 / 100 on localhost.

---

## 5. What I did NOT get to

I want to be straight about scope. The brief's Steps 2–4 included items I did not reach before finishing the deployment work:

- **Duplicated homepage content blocks** — I found no duplicate "Supported Living Solutions" / "Domiciliary Care Services" blocks in the current homepage; that carousel was removed in the redesign five days ago. If you're still seeing them, you may have been looking at a cached page.
- **"Areas We Cover" (Rugby, Coventry, Leicestershire, Northamptonshire)** — I could not find this content in any branch or any previous report. I did not invent it. `areas_served` currently reads "Rugby and the surrounding Warwickshire area". **If Coventry, Leicestershire and Northamptonshire are genuinely covered, tell me and I'll add a proper section.**
- **Form submission testing against a live backend** — the forms still cannot send (see below), so there is nothing to test end-to-end beyond validation, which does work.
- **Service-page depth and FAQ expansion** — the existing pages do cover what's included, who it's for, and next steps, but I did not do the additional pass the brief asked for.

---

## 6. Remaining TODOs

### 🔴 Blocking — the site cannot function without these

| # | What | Where |
|---|---|---|
| 1 | **`EMAIL_USER` + `EMAIL_PASS` in Vercel** → Settings → Environment Variables, then redeploy. **Every form currently returns 503 and tells people to phone instead.** Must be a Gmail App Password. | Vercel dashboard |
| 2 | **`ADMIN_USER` + `ADMIN_PASSWORD`** — `/admin` is 401 for everyone, including you | Vercel dashboard |

### 🟠 Content still needed

| # | What |
|---|---|
| 3 | **Registered manager's name** — CQC requires one named. Left blank deliberately; I could not verify it. |
| 4 | **Director bios and photos** — placeholders on `/about` |
| 5 | **Three real testimonials with consent** — currently placeholders, visibly marked, and public |
| 6 | **Stats band figures** — all invented scaffolding, visibly marked, and public. Replace or delete. |
| 7 | **Carer pay rates**, holiday, pension, mileage — the biggest gap on `/careers` |
| 8 | Home care rates, staffing rate card |
| 9 | **Confirm the coverage area** (see §5) |
| 10 | ICO registration number |
| 11 | Social profile URLs (blank so no broken links render) |
| 12 | GA4 measurement ID — analytics is wired and consent-gated but inert |
| 13 | **Solicitor review** of the four policy pages |

### 🟡 Worth knowing

- **A higher-quality logo source would help.** The JPEG is 41KB with heavy compression; a PNG/SVG/EPS from the franchise would give a cleaner transparent cut and a more accurate green sample.
- **`PROJECT.md` §4 still documents the old purple/gold theme** and is out of date. `CLAUDE.md` has been corrected.
- **A second deploy target still exists** — the GitHub Actions workflow deploys to a VPS at `46.252.193.48:3000` that no domain points at. Every push hits both. Worth deciding whether to keep it.
