# Deployment Report

**Date:** 2026-08-13
**Live site:** https://www.heartandhavenhealthcare.co.uk
**Status:** ✅ **Deployed and verified live.** No manual step needed from you.

---

## TL;DR

The work was never pushed to GitHub. It only ever existed on this Mac, on branches that were never merged into `main`. Vercel deploys from `main`, so it had nothing new to build.

I merged everything into `main`, pushed it, and **Vercel auto-deployed within about 30 seconds**. I then fetched the live URL and confirmed the new site is serving. Two deployments went out tonight (the second fixed defects only visible once I knew the real domain).

---

## 1. How this site is actually hosted

**Vercel.** Confirmed from the live response headers, not inferred:

```
server: Vercel
x-vercel-cache: HIT
x-vercel-id: lhr1::jbrvb-...
```

Details:

| | |
|---|---|
| **Provider** | Vercel (London region, `lhr1`) |
| **Deploy branch** | `main` — confirmed by the fact that `origin/main` content matched the live site exactly |
| **How it's linked** | Vercel dashboard Git integration. There is **no `vercel.json` and no `.vercel/project.json`** in the repo, so the connection lives entirely in the Vercel dashboard |
| **Domain** | `www.heartandhavenhealthcare.co.uk` → `216.150.16.129` / `216.150.1.65` |

### ⚠️ I had this wrong for two days, and I should flag that

On day one I concluded from `.github/workflows/deploy.yml` that the site was on a self-hosted VPS, and I wrote that into `PROJECT.md` as fact. **That was wrong.**

What's actually going on is that there are **two deployment targets** running off the same `main` branch:

1. **Vercel** — serves the real public domain. This is the one that matters.
2. **A VPS at `46.252.193.48:3000`** — via the GitHub Actions workflow. Still running, still succeeding, but it's serving on a bare IP with no domain pointed at it.

`netlify.toml` also exists in the repo and is a red herring — nothing is on Netlify.

I only caught this because you gave me the live URL. Nothing in the repo points at Vercel at all. **Worth deciding whether the VPS target is still wanted** — right now every push deploys to both.

---

## 2. Why the live site looked unchanged

Three things, and any one of them alone would have done it:

1. **`overnight-redesign` was never merged into `main`.** Eleven commits sat on their own branch.
2. **`polish-and-launch` was never merged either.** Six more commits.
3. **Nothing was ever pushed to GitHub.** `git ls-remote` showed neither branch existed on the remote. `origin/main` was still sitting at `1d9f64e` from 2026-08-07.

So Vercel was building `main`, `main` had nothing new, and every improvement lived only on this laptop.

### Proof of what was missing

`origin/main` → `polish-and-launch` was **194 files changed, +7,686 / −522 lines**.

I also fingerprinted the live site before touching anything, which confirmed the picture precisely:

| Check on live site (before) | Result | Meaning |
|---|---|---|
| `GET /api/messages` | **401** | Day-one security fix *was* live (it was pushed on the 7th) |
| Footer text | "Lorem ipsum…" | Redesign *not* live |
| `/care-home-staffing` | **500** | Page didn't exist |
| "Kare Plus" anywhere | **0 matches** | Rebrand not live |

That mixed result is the giveaway: the security work from the 7th *was* deployed, everything after it wasn't — exactly matching "pushed on the 7th, nothing since".

---

## 3. What I merged and pushed

`polish-and-launch` already contained everything (both `main` and `overnight-redesign` were ancestors of it), so consolidation was a clean fast-forward with **no conflicts**.

**Deployment 1 — `175237e`** (18 commits)
The full redesign: design system, rebuilt homepage, new service/about/careers/contact/FAQ/policy pages, Kare Plus Rugby rebrand and contact details, forms, SEO, image optimisation, accessibility fixes.

**Deployment 2 — `b0b4dfd`** (defects only visible once I knew the real domain)
- `sitemap.xml` was publishing **`https://example.invalid/`** URLs — the fallback used while the domain was unknown. Google would have fetched that and found nothing valid.
- The homepage `<title>` had **no brand on it**. Next.js `title.template` deliberately does not apply to the segment where it's declared, so `app/page.js` needed the brand spelled out rather than inherited.
- **Canonicals restored** on all 11 pages. I'd stripped them because relative canonicals are invalid and I had no domain to make them absolute.

### On the branding — I checked with you first

The live site was unambiguously **Heart & Haven Care** (title, `info@heartandhavencare.co.uk`, `01788 422422`, zero mentions of Kare Plus). You'd told me the business is **Kare Plus Rugby** with a different phone number.

I stopped and asked rather than guessing, because pushing the wrong contact details to a live care site means people arranging care call a number that may not be monitored. **You confirmed: push Kare Plus Rugby.** That's what went live.

One supporting detail that made it credible: the addresses match to the unit — live said "6A Davy Court, **Castle** Mound Way", you gave "6A, Davy Court, Mound Way", same postcode `CV23 0UZ`. Same premises.

---

## 4. Did I confirm it's live myself? **Yes.**

I fetched the live URL directly after each deploy. I did not need a hosting CLI — none is installed (`vercel`, `netlify` and `gh` are all absent), but Vercel's Git integration deployed automatically on push.

**Verified on `https://www.heartandhavenhealthcare.co.uk` after deploy:**

| Check | Result |
|---|---|
| All 13 routes (`/`, `/domiciliary-care`, `/care-home-staffing`, `/supported-living`, `/about`, `/careers`, `/contact`, `/faq`, policies, `sitemap.xml`, `robots.txt`) | **200** |
| `/nonexistent-page` | **404** (was returning a 500 error page before) |
| `/api/messages`, `/admin` | **401** — admin lockdown still enforced |
| Phone / email / WhatsApp | `07563 247176`, `kp.rugby@kareplus.co.uk`, `wa.me/447563247176` |
| Old phone `01788 422422` | **0 occurrences** |
| "Lorem ipsum" | **0 occurrences** |
| `example.invalid` in sitemap | **0 occurrences** |
| Canonical | `https://www.heartandhavenhealthcare.co.uk` |
| JSON-LD | name `Kare Plus Rugby`, real phone, email and address |

I also took screenshots of the live production site at desktop and mobile widths and confirmed the new design renders.

**Cache:** no manual purge needed. The stale response had `age: 440118` (about 5 days); immediately after deploy it was `age: 0` with fresh content. Vercel invalidated on its own.

**VPS target:** the GitHub Actions workflow also ran and succeeded for both commits, and `46.252.193.48:3000` is serving the new build too. Both targets are in sync.

---

## 5. Check it yourself tomorrow — 3 things

Open **https://www.heartandhavenhealthcare.co.uk** and look for:

1. **The phone number in the top bar reads `07563 247176`.** The old site showed `01788 422422`. If you see the old number, you're looking at a cached page — hard-refresh with **Cmd+Shift+R**.

2. **The main navigation has a "Care Home Staffing" link.** That page did not exist before at all — it returned a server error. Click it; it should load a full page about supplying nurses and carers.

3. **The homepage headline reads "Care at home, and the carers care homes rely on."** on a deep navy background, with a "Fully insured / Vetted, DBS-checked staff / 24/7 on-call support" row beneath the two buttons. The old homepage had none of this.

**Bonus check:** on a phone, a blue/green/white **Call · WhatsApp · Enquire** bar should be fixed to the bottom of the screen.

---

## 6. Manual steps left for you

**None for deployment.** It is live and verified.

But four things still need you before the site is genuinely launch-ready — all carried over from previous nights:

| # | What | Why it matters |
|---|---|---|
| 1 | **Set `EMAIL_USER` + `EMAIL_PASS` in Vercel** (Settings → Environment Variables, then redeploy) | **Every contact and job-application form currently returns an error.** They're wired to email `kp.rugby@kareplus.co.uk` but there's no SMTP credential, so they return 503 and tell people to phone instead. `EMAIL_PASS` must be a Gmail **App Password**, not the account password. |
| 2 | **Set `ADMIN_USER` + `ADMIN_PASSWORD` in Vercel** | `/admin` returns 401 for everyone including you until these exist. |
| 3 | **Verify the CQC registration** | The footer still carries a CQC logo and registration claims inherited from the old site, with the provider ID as a visible placeholder. If Kare Plus Rugby isn't registered under its own ID, that block must come down. |
| 4 | **Supply the official Kare Plus logo** | The header currently shows a typographic wordmark I generated as a stand-in. |

Also visible on the live site right now and worth knowing about: the **stats band figures are placeholders** (marked with an amber warning), and the **three testimonials are placeholders** (also marked). Both are deliberately impossible to mistake for real content, but they are public.

---

## 7. Timeline of tonight

| Time | Action |
|---|---|
| 00:04 | Fetched live site — `server: Vercel`, old content, `age: 440118` (5 days stale) |
| 00:06 | Fingerprinted: security fixes live, redesign absent. Confirmed `origin/main` = `1d9f64e` |
| 00:07 | Confirmed no `vercel.json`, no CLIs installed, `main-kare-plus` 5 months stale |
| 00:08 | Merged `polish-and-launch` → `main` (fast-forward, no conflicts). Clean rebuild, verified locally |
| 00:09 | Asked about the Heart & Haven vs Kare Plus conflict; you confirmed Kare Plus |
| 00:09 | Pushed `1d9f64e..175237e` |
| 00:10 | **Vercel auto-deployed. New version live.** |
| 00:11 | Found `example.invalid` sitemap and missing brand in title |
| 00:12 | Pushed `175237e..b0b4dfd` |
| 00:13 | **Second deploy live.** Full verification + screenshots |

---

## 8. Honest notes

- **I got the hosting wrong for two days** and wrote it into `PROJECT.md` as established fact. It said "Self-hosted VPS — it is NOT Netlify", which was half right: it isn't Netlify, but it isn't primarily the VPS either. I've left that file alone tonight rather than rewriting history; this report is the correction. Worth updating `PROJECT.md` when you next touch it.
- **I could not have found the domain from the repo.** Nothing in it references `heartandhavenhealthcare.co.uk` — the configs pointed at `heartandhavencare.co.uk`, which doesn't resolve at all. Your giving me the URL is what unblocked the sitemap and canonical fixes.
- **Two deploys, not one.** The second was needed because the first shipped `example.invalid` in the sitemap. I'd rather tell you that than present it as one clean deploy.
- **I did not touch** `.env`, secrets, or `.github/workflows/deploy.yml`.
- **`polish-and-launch` and `overnight-redesign` still exist** and are fully merged into `main`. Safe to delete whenever you like.
