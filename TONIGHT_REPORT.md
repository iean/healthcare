# Tonight's Report — Kare Plus Rugby

**Date:** 2026-08-12
**Branch:** `polish-and-launch` (6 commits, off the now-updated `main`)
**Status:** Build clean · lint clean · 0 accessibility violations · nothing deployed

---

## 👉 How to actually see the changes (read this first)

```bash
cd ~/Desktop/website
git checkout polish-and-launch
rm -rf .next          # important — see "root cause" below
pnpm install
pnpm dev              # → http://localhost:3000
```

**The `rm -rf .next` matters.** Stale build cache caused two separate problems tonight, including one that made every font render as Times.

`main` now also contains last night's work, so `git checkout main` will look right too — but `polish-and-launch` is where tonight's work lives.

---

## 1. Root cause: why last night's changes were invisible

Three things, stacked:

1. **`overnight-redesign` was never merged.** All 11 commits sat on a branch of their own. `git branch --merged main` confirmed it: zero of them were in `main`.
2. **It was never pushed.** `git ls-remote` showed no `overnight-redesign` on the remote at all. It existed only on this Mac.
3. **The deploy only triggers on `main`.** `.github/workflows/deploy.yml` runs on push to `main`, so with nothing merged and nothing pushed, no deploy ever ran.

So whether you looked at the live site or ran the dev server on `main`, you were looking at the pre-redesign site. The work was real — the diff was 160 files and +5,429 lines — it just wasn't anywhere you could see it.

**What I did:** merged `overnight-redesign` into `main` with `--no-ff` (clean, no conflicts), killed the stale dev servers, cleared `.next`, reinstalled, rebuilt, and confirmed the new homepage renders — the hero headline and the new "Care Home Staffing" nav item both appear in the served HTML. Then branched `polish-and-launch` off the updated `main`.

**Still not pushed.** Pushing `main` deploys straight to production, and you asked me not to touch deploy config or run deploys. Your call in the morning.

---

## 2. ⚠️ The branding decision I had to make

You described the business as **Kare Plus Rugby**, but the entire site said **Heart & Haven Care**.

This wasn't me guessing — the remote already had a `main-kare-plus` branch whose `config/config.json` reads `"title": "Kare Plus Rugby"`. The rebrand is real and pre-existing; last night's work was simply built on the older `main`.

So I swept 37 files and replaced the old name, old phone, old emails and the old "Castle Mound Way" address.

**The one thing I could not do is supply a logo.** The Heart & Haven logo is a different company's mark, so leaving it on a Kare Plus site would be worse than not having it. I built a clean typographic wordmark from the blue palette as a stand-in. The original logo files are untouched in the repo.

> **[TODO: SUPPLY OFFICIAL KARE PLUS BRAND ASSETS]** — Kare Plus is a national franchise and will have supplied logo files, colours and usage rules. This is the single most visible thing needing your sign-off.

Also worth confirming: I used **"Mound Way"** exactly as you gave it. The old site said "Castle **Mound Way**". Worth a glance in case one is a typo.

---

## 3. Contact details — wired in everywhere

All three now flow from one place (`config/site.json`) into every page, the footer, structured data and the form backends:

| | |
|---|---|
| **Phone** | 07563 247176 — clickable `tel:+447563247176` in the header, footer, hero, error page and mobile bar |
| **WhatsApp** | `wa.me/447563247176` in the floating mobile contact cluster |
| **Email** | kp.rugby@kareplus.co.uk — clickable `mailto:` in the footer and contact page |
| **Address** | 6A, Davy Court, Mound Way, Central Park, Rugby, CV23 0UZ |
| **Map** | Keyless Google embed on the contact page and in the footer |
| **JSON-LD** | `MedicalBusiness`/`LocalBusiness` now carries the real name, phone, email, address and area served |

### Forms now actually send

Last night `/api/enquiry` and `/api/apply` were stubs that discarded everything. They now email **kp.rugby@kareplus.co.uk** via nodemailer, with `replyTo` set to the sender so your team can hit reply, and the CV attached rather than written to disk.

**They will not work until you set `EMAIL_USER` and `EMAIL_PASS` on the server.** Until then they return HTTP 503 and the form shows a visible error telling people to phone — verified. That's deliberate: a care enquiry vanishing silently is far worse than an honest failure.

---

## 4. What I built tonight, page by page

### Site-wide

- **Sticky header that condenses on scroll** — utility bar collapses, logo shrinks, CTA stays reachable
- **Floating contact cluster on mobile** — Call / WhatsApp / Enquire, with safe-area padding for the iPhone home bar and a spacer so it never covers footer content
- **Cookie consent banner** — opt-in, with Accept and Reject at *equal visual weight* (a prominent Accept beside a buried Reject is the exact pattern the ICO enforces against). Stored in localStorage so the banner doesn't itself set a cookie before consent
- **Consent-gated analytics** (`lib/analytics.js`) — currently inert, Consent Mode v2 defaults to denied
- **Route transitions** — fade plus a 6px rise, no library
- **lucide-react** icon set throughout
- **Favicon, app icons, web manifest, and a 1200×630 og:image** with the headline and phone number
- **Custom error and loading states** — loading is a shaped skeleton, not a spinner; the error page gives the phone number the same prominence as "Try again"

### Homepage

- Hero with a slow-drifting blue gradient (18s), dot texture, staggered entrance and a **trust-badge row** — "Fully insured", "Vetted, DBS-checked staff", "24/7 on-call support" (process claims only, no numbers)
- **Step timeline** for "How it works" — horizontal with a connecting line on desktop, vertical on mobile
- **Stats band with count-up numbers** — ⚠️ every figure is placeholder and the band says so in amber
- **Testimonial carousel** — auto-play pauses on hover, focus and tab-hide, with an explicit pause button; doesn't auto-play at all under reduced motion

### Domiciliary Care

- The nine-field form replaced with a **three-step enquiry**: who it's for → what would help → contact details, with a review of the answers before sending

### Contact

- Map is now **click-to-load** (see performance below)
- Email is a working `mailto:` link

---

## 5. Lighthouse: last night vs tonight

| Page | Last night | Tonight |
|---|---|---|
| `/` | 94 / 100 / 100 / 100 | **92 / 100 / 100 / 100** |
| `/domiciliary-care` | 97 / 100 / 100 / 100 | **95 / 100 / 100 / 100** |
| `/careers` | 98 / 100 / 100 / 100 | **95 / 100 / 100 / 100** |
| `/contact` | not measured | **95 / 100 / 100 / 100** |

*(performance / accessibility / best-practices / SEO)*

Performance is 2–3 points lower because the homepage now carries a carousel, a stats band and an animated gradient that weren't there before. Accessibility, best-practices and SEO are 100 across the board. CLS is 0 everywhere.

Also verified: **0 axe violations** across 11 pages at 390px and 1440px, **no horizontal overflow** at 390/768/1440 across 7 pages, **no broken links**, **no console errors**, lint clean.

---

## 6. Bugs I found and fixed tonight

Every one of these built and linted clean — they were only caught by looking at the running site.

1. **Every font rendered as Times.** The class on `<html>` and the class in the generated font CSS had drifted apart across incremental builds (`__variable_746eb0` vs `__variable_8b3a0b`), so `--font-inter` resolved to nothing. An undefined custom property makes `font-family` invalid at computed-value time, which drops it to the browser default rather than your declared fallback. Fixed by clearing `.next`. **No source change was needed — it was purely stale cache.**
2. **104 accessibility violations** from tonight's own new components: invalid `tablist`/`tab` ARIA on the carousel dots, dots below the 24×24 minimum target size, a broken `<dl>` structure in the stats band, and the footer map using a light-background text colour on navy. All fixed.
3. **WhatsApp brand green failed contrast** (4.14:1) for its small label. Darkened to `#118578` (4.52:1).
4. **`/contact` performance was 79 with a 5.6s LCP** — the Google Maps iframe. Now click-to-load: 95 and 2.9s. That also stops Google setting cookies before the visitor has agreed to anything, which is what your own cookie banner promises.
5. **Invalid canonicals on all 11 pages** (SEO 92 → 100). With no known domain, Next emitted relative canonicals that Lighthouse rejects. I removed them rather than guessing `kareplus.co.uk`, which would point search engines at the national franchise site instead of yours.

---

## 7. What I need from you

### 🔴 Blocking — the site cannot work without these

| # | What | Why |
|---|---|---|
| 1 | **`EMAIL_USER` + `EMAIL_PASS` on the server** | Until set, every form returns 503. `EMAIL_PASS` must be a Gmail **App Password**, not the account password |
| 2 | **Official Kare Plus logo files** | Currently a placeholder wordmark I generated |
| 3 | **The live domain** | Needed for canonicals, sitemap and og:image URLs. Set `seo.base_url` in `config/site.json` |
| 4 | **`ADMIN_USER` + `ADMIN_PASSWORD`** | `/admin` is 401 for everyone including you until set |

### 🔴 Regulatory — do not launch without resolving

| # | What |
|---|---|
| 5 | **Verify CQC registration.** The footer still carries a CQC logo and claims inherited from the old site. The provider ID is a visible placeholder with a warning. **If Kare Plus Rugby isn't registered under its own ID, that block must come down.** |
| 6 | Companies House number |
| 7 | ICO data protection registration number |
| 8 | Named **Registered Manager** (CQC requires one named) |
| 9 | Named **designated safeguarding lead** |
| 10 | Local authority safeguarding contacts, including out-of-hours |
| 11 | **Solicitor review** of safeguarding, complaints, cookie and privacy policies |
| 12 | **CV retention policy** — CVs are personal data under UK GDPR and now arrive by email, so they'll sit in an inbox indefinitely unless someone manages that |

### 🟠 Content — the site works but looks unfinished without these

| # | What | Where |
|---|---|---|
| 13 | **Three real testimonials with written consent** — or delete the section | Homepage |
| 14 | **Real stats** — every number in the stats band is invented scaffolding | Homepage |
| 15 | **Carer pay rates**, holiday, pension, mileage — the #1 question in care recruitment | `/careers`, `/faq` |
| 16 | Home care rates (hourly + live-in weekly) | `/domiciliary-care` |
| 17 | Staffing rate card, payment terms, temp-to-perm fees | `/care-home-staffing` |
| 18 | **Coverage area** — which towns/counties beyond Rugby | `site.json`, `/faq` |
| 19 | Company story — founded when, by whom | `/about` |
| 20 | Team members — name, role, short bio | `/about` |
| 21 | **Real photography.** Current images are generic stock inherited from the template | Throughout |
| 22 | Social profile URLs (left blank so no broken links render) | Footer |
| 23 | Minimum visit length; notice period for ending care | `/faq` |
| 24 | Complaints acknowledgement + response timescales | `/complaints` |
| 25 | Supported living: which local authority contracts | `/supported-living` |
| 26 | Confirm the vetting process described matches reality | `/care-home-staffing` |
| 27 | GA4 measurement ID, or pick Plausible/Fathom instead | `lib/analytics.js` |

---

## 8. Decisions and assumptions

1. **Merged into `main`, not `main-kare-plus`.** The deploy workflow only watches `main`, so that's the branch that matters. `main-kare-plus` is now 6 commits behind and should probably be retired — worth a look before you delete it.
2. **Did not push anything.** Pushing `main` is a production deploy.
3. **Rebranded to Kare Plus Rugby** rather than leaving a mismatch, on the evidence of the `main-kare-plus` branch and your `@kareplus.co.uk` email.
4. **Removed canonicals rather than guessing the domain** — a missing canonical is neutral, a wrong one is harmful.
5. **No blog scaffold.** You said to use judgement: there's already a working `/blogs` section with five template posts. Building a second one would be scope creep. The existing posts still contain template content — noted below.
6. **Trust badges say only what I can defend** — "Fully insured", "Vetted, DBS-checked staff", "24/7 on-call". Please confirm all three are actually true; they're claims, even if generic ones.
7. **Breadcrumbs already existed** on every inner page from last night's `PageHeader`, so nothing new was needed.

---

## 9. What's left, prioritised

### P1 — before launch
1. Resolve the **CQC question** (#5). Nothing else matters if the regulatory position is wrong.
2. **Set the email env vars** — forms are dead without them.
3. **Supply the Kare Plus logo.**
4. **Solicitor review** of the four policy pages.
5. **HTTPS + a working domain.** The site is served over plain HTTP on `46.252.193.48:3000`. Care enquiries and admin passwords cross the wire unencrypted — a UK GDPR exposure in its own right.
6. Replace or delete the placeholder testimonials and stats.

### P2 — consolidation
7. **Retire the legacy `/domiciliary/*` and `/staffing/*` sub-sites** (~15 pages). Untouched and still live, now duplicating the new service pages. They should redirect to the new URLs.
8. Duplicate About pages: `/domiciliary/about` and `/domiciliary/about-us` both render different content.
9. `/elements` is a Bigspring template demo page, still live and indexable. `/pricing` is also a template leftover.
10. Blog still has five template posts with placeholder content.
11. Legacy pages still use the old `SeoMeta` client component instead of App Router metadata.

### P3 — infrastructure (carried over, still open)
12. `data/*.json` are tracked in git **and** written at runtime. Once the server's copy diverges, `git pull` conflicts and **every future deploy silently stops updating the site** — the workflow has no `set -e`, so it still shows green.
13. Add `set -e` to the deploy workflow.
14. The server runs `npm install`, ignoring the committed `pnpm-lock.yaml`.
15. 30+ stale `codex/*` branches on the remote.

---

## 10. Commit history

```
9a88740  Fix accessibility and performance regressions from tonight's components
c9bdb07  Add icons, og:image, error/loading states and multi-step enquiry form
49189b0  Add step timeline, testimonial carousel and animated stat counters
c921f39  Premium polish: hero motion, sticky header, contact bar, cookie consent
2681374  Rebrand to Kare Plus Rugby and wire in real contact details
b01c94a  Merge overnight-redesign into main        ← on main
```

Worth a look in particular: the homepage top-to-bottom, `/domiciliary-care` (try the three-step form), `/contact`, and the site on a phone — the floating contact bar and condensing header only appear at mobile widths.
