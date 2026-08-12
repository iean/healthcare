# Overnight Redesign — Report

**Branch:** `overnight-redesign` (11 commits, branched from `main` @ `1d9f64e`)
**Date:** 2026-08-12
**Status:** Builds clean, lints clean, zero accessibility violations. **Not deployed** — nothing was pushed and no deploy command was run.

---

## ⚠️ Read this first — three things that need you before anything goes live

**1. The site already publishes CQC claims I could not verify.**
This is not something I added. The existing footer stated *"CQC regulates Heart & Haven Care Ltd to provide care at Heart & Haven Care - Main Office"*, showed the CQC logo, and linked to `/registration-details` — **a page that does not exist**. I preserved the block (nothing deleted) but replaced the unverifiable parts with visible placeholders and an explicit warning. **If Heart & Haven is not currently CQC-registered, this is a regulatory problem that predates tonight and needs dealing with urgently.** Displaying the CQC logo is itself an implied claim.

**2. Every form on the site currently loses submissions.**
`/api/enquiry` and `/api/apply` are stubs. They validate properly and return success, but they email nobody and store nothing. I made this loud rather than silent — the JSON response and server log both say `delivered: false`. You need to connect an email service before launch. Note this is the *same class of bug* as the one found last week, where `nodemailer.createTransporter` (a method that doesn't exist) meant the Get Started form had never sent a single email.

**3. The policy pages are developer drafts, not legal documents.**
Safeguarding, complaints and cookie policy each carry an unmissable banner saying they must be reviewed by a solicitor. They are structurally sound starting points — they are not legal advice and have not been checked against UK GDPR or CQC requirements.

---

## Results

| Measure | Before | After |
|---|---|---|
| Homepage Performance | 75 | **94** |
| Homepage Accessibility | 96 | **100** |
| Homepage SEO / Best practices | 100 / 100 | **100 / 100** |
| `/domiciliary-care` | — (didn't exist) | **97 / 100 / 100 / 100** |
| `/careers` | — (didn't exist) | **98 / 100 / 100 / 100** |
| `/domiciliary` LCP | 4.3 s | 2.5 s |
| Total image weight | 43.7 MB | **11.7 MB** |
| WCAG 2.1 A/AA violations | — | **0** across 12 pages × 2 viewports |
| Hardcoded hex colours | ~230 across 34 files | **0** |

Lighthouse run against a production build in headless Chrome. Accessibility audited with axe-core at 390 px and 1440 px.

---

## What changed, page by page

### Design system (foundation for everything else)

The real problem was not the colour scheme — it was that `config/theme.json` and `tailwind.config.js` already defined a token system that **almost nothing used**. 34 files carried ~230 hardcoded hex values across ~25 shades: four or five unrelated colour schemes layered on top of each other.

- **New blue/white palette anchored on the logo's own navy.** I sampled `H&H-New-Color-logo.png`: it is navy `#000048`, gold `#E8CC58` and green `#006038` — **no purple at all**. So the brief's blue/white direction is actually closer to the real brand than the purple theme that was there. The blue ramp is built from that navy.
- **236 hardcoded values replaced with tokens** across `layouts/`, `app/` and `styles/`.
- **Contrast is enforced, not eyeballed.** `scripts/check-contrast.mjs` checks 16 colour pairings and exits non-zero on failure. Two of my first-draft values failed and were solved for numerically: the accent (logo gold was 3.25:1 on white — now `#847432` at 4.64:1) and the form-input border (1.73:1 — now `#8B95A2` at 3.04:1 to meet the 3:1 UI rule).
- **Typography:** Inter throughout at a 17 px base. Playfair Display and Merriweather were dropped — decorative serifs hurt legibility for an older audience and cost two extra font downloads.
- **Shared primitives** added: `Section`/`Container`, `Button`, `Card`, `SectionHeading`, `Reveal`, `Field`, `Accordion`, `PageHeader`, `FeatureGrid`, `LegalPage`.

### Homepage — rebuilt

Was still running Bigspring template copy (*"Let us solve your critical website development challenges"*, *"It is the most advanced digital marketing and it company"*) plus Lorem ipsum, and a feature list that included **"Cloud Support"**.

Now: hero stating both services in one sentence → three-way intent router → service overview → trust signals → tabbed how-it-works → testimonials → CTA.

The old hero was an **auto-rotating carousel** showing one service per slide, so a care home manager could land on a home-care slide and assume the site wasn't for them. It's now static — auto-rotation also fails WCAG 2.2.2 without a pause control.

### New pages

| Page | Notes |
|---|---|
| `/domiciliary-care` | What's included, types of care, costs section, enquiry form |
| `/care-home-staffing` | Roles, vetting process, flexibility, rates section, staff request form |
| `/supported-living` | **Fixes a live 404** — this was linked from the main nav but never existed |
| `/about` | Values, regulation section, team placeholder |
| `/careers` | Benefits, process, application form with CV upload |
| `/contact` | Rebuilt — general enquiry + professional referral in tabs, 999 safety notice |
| `/faq` | Four grouped sections, native `<details>` accordion, FAQPage JSON-LD |
| `/cookie-policy`, `/complaints`, `/safeguarding` | New policy pages |
| `404` | Routes to the three intents instead of dead-ending |

### Navigation

Three explicit paths for the three visitor intents — *I need care* / *I need staff* / *I want to work here* — in the header, on the homepage, and on the 404. The old site had a single undifferentiated nav plus **two stacked headers** on `/domiciliary/*` and `/staffing/*` (a site header and a section header, both rendering at once).

### Footer

Now carries the safeguarding statement and working links to privacy, cookie, complaints and safeguarding policies. Previously **Privacy Policy and Terms both pointed at `#`** despite both pages existing.

### Forms

One configurable `EnquiryForm` (care / referral / staffing / general) and an `ApplicationForm` with CV upload. Validation follows the GOV.UK pattern: an error summary that takes focus on submit, inline errors tied by `aria-describedby`, errors never signalled by colour alone, validation on blur rather than on every keystroke.

Validation is deliberately **permissive** on names and phone numbers — over-strict rules lock out real people with double-barrelled names or international numbers, which matters more than tidy data on a care site.

Verified by driving a real browser: empty submit produces a 5-problem summary and moves focus to it; bad email/phone/short-message each produce the right inline error; the API stubs accept valid payloads and reject invalid ones with per-field errors; a `.exe` upload is rejected.

### SEO

Per-page metadata, OpenGraph and Twitter cards, `MedicalBusiness`/`LocalBusiness` JSON-LD, `FAQPage` JSON-LD, generated `sitemap.xml` and `robots.txt`.

Two deliberate safeguards: **any field still holding a `[TODO: ...]` value is filtered out of structured data**, and the FAQ schema drops any answer containing a TODO. Publishing placeholder text as structured data would feed nonsense straight to search engines.

### Performance

Images were the whole problem. Recompressed and capped at 1800 px: **43.7 MB → 11.7 MB** across 59 files. `services/domiciliary-care.jpg` was **9.9 MB** and is now 0.2 MB. The favicon was a **1024×1024 PNG at 1.3 MB** shipped on every page load — now 180×180 at 7.8 KB. Originals are recoverable from git history.

Also: AVIF/WebP via `next/image`, `deviceSizes` matched to the theme breakpoints, 30-day cache on optimised images, and baseline security headers. **HSTS was deliberately not set** — the site is served over plain HTTP today and enabling HSTS before TLS exists would make it unreachable.

---

## Bugs found and fixed along the way

These were all found by looking at the running site, not by trusting the build — every one of them built and linted clean.

1. **`/contact` and `/faq` were serving old Lorem ipsum markdown.** The catch-all `app/[regular]/page.js` generated static params from every file in `content/`, which beat the new dedicated pages. Both new pages were being built and never served. Fixed with a reserved-slug list.
2. **Every heading inside a dark section was invisible.** `styles/base.scss` forced `text-dark` on all `h1`–`h6`, which beat the inherited white. The homepage `h1` was navy on navy. Headings now inherit colour.
3. **Scroll-reveal could hide content permanently.** `Reveal` used a fractional IntersectionObserver threshold, which an element taller than the viewport can never satisfy — that content would have stayed at `opacity: 0` forever. Now `threshold: 0`. The component also renders visible-first and only hides once JS confirms motion is allowed, so nothing disappears if JS fails.
4. **Soft 404s.** `getRegularPage()` silently rendered `content/404.md` for unknown slugs with HTTP **200**. Search engines index those and monitoring never sees them. Unknown slugs now return a real 404.
5. **Duplicate DOM ids on the contact page.** Two `EnquiryForm`s mount at once; field ids are now namespaced per instance. Duplicate ids break every label association.
6. **Two stacked headers** on `/domiciliary/*` and `/staffing/*`.
7. **`robots.txt` left `/admin` crawlable** — it only disallowed `/api/*`.

---

## Everything I need from you

### Regulatory / compliance — blocking

| # | What's needed | Where |
|---|---|---|
| 1 | **Verify CQC registration status.** Provider ID, and whether the logo and wording can be displayed at all | `SiteFooter.js`, `/about`, `/faq` |
| 2 | Companies House registration number | `config/site.json` |
| 3 | ICO data protection registration number | `config/site.json` |
| 4 | Named **Registered Manager** (CQC requires one to be named) | `/about` |
| 5 | Named **designated safeguarding lead** | `/safeguarding` |
| 6 | Local authority adult safeguarding contacts, incl. out-of-hours | `/safeguarding`, `/complaints` |
| 7 | **Solicitor review** of safeguarding, complaints, cookie and privacy policies | all policy pages |

### Business facts — needed before launch

| # | What's needed | Where |
|---|---|---|
| 8 | **Coverage area** — which towns/counties. Office is Rugby, Warwickshire | `site.json`, `/faq` |
| 9 | **Home care rates** — hourly and live-in weekly | `/domiciliary-care` |
| 10 | **Staffing rate card**, payment terms, temp-to-perm fees | `/care-home-staffing` |
| 11 | **Pay rates, holiday, pension, mileage** for carers — the single biggest factor in care recruitment; the Careers page is much weaker without it | `/careers`, `/faq` |
| 12 | Minimum visit length, and notice period for ending a care package | `/faq` |
| 13 | Complaints acknowledgement and response timescales | `/complaints` |
| 14 | Which local authorities you hold supported-living contracts with | `/supported-living` |
| 15 | **Company story** — founded when, by whom, why | `/about` |
| 16 | **Team members** — name, role, short bio | `/about` |
| 17 | **Three real testimonials with written consent** — or remove the section | homepage |
| 18 | Confirm the vetting process described matches reality | `/care-home-staffing` |
| 19 | **Email discrepancy:** the codebase contains both `info@heartandhavencare.co.uk` and `info@heartandhaven.com`. I used the `.co.uk` one (matches the domain). Confirm which is right | several |
| 20 | Dedicated recruitment and safeguarding email addresses, or confirm both go to the main inbox | `config/site.json` |

### Technical — needed to function

| # | What's needed |
|---|---|
| 21 | **Email service for `/api/enquiry`** + destination address. Until then all enquiries are lost |
| 22 | **Storage + email for `/api/apply`**, plus a CV retention policy (personal data under UK GDPR). Do **not** write into the repo directory — the deploy does `git pull` and untracked writes there cause conflicts |
| 23 | `ADMIN_USER` / `ADMIN_PASSWORD` on the VPS — still unset, so `/admin` is 401 for everyone |
| 24 | **DNS: `heartandhavencare.co.uk` does not resolve.** The site is only reachable at `http://46.252.193.48:3000` |
| 25 | **No HTTPS.** Care enquiries and admin passwords cross the wire unencrypted |

---

## Assumptions I made

1. **Blue/white overrides the existing purple/gold theme** — you asked for blue and white, and the logo supports it. The logo itself was not touched.
2. **The logo's gold is the accent colour**, used sparingly, darkened to `#847432` to pass AA. It ties the palette to the logo rather than leaving it stranded.
3. **New pages at clean URLs** (`/domiciliary-care`, `/care-home-staffing`) rather than rebuilding the `/domiciliary/*` and `/staffing/*` sub-sites. Those legacy pages are **untouched and still reachable** — nothing deleted. See "still to do".
4. **Address, phone and email came from the repo's own `config/social.json`.** They are not invented, but I have not independently verified them.
5. **Generic trust copy only.** Where a specific fact would normally go, there is a visible TODO instead. I invented no numbers, ratings, qualifications or accreditations anywhere.
6. **The 999 notice on the contact page** assumes the form is not monitored 24/7. Correct me if there is genuine round-the-clock monitoring.

---

## Issues I hit and how I resolved them

- **Screenshots showed an unstyled page.** A stale `next start` from the Lighthouse run was still bound to port 3100, serving hashed CSS filenames that no longer existed after a rebuild. Not a code fault — I now kill the server before restarting.
- **12 elements appeared stuck invisible.** My test measured before IntersectionObserver had settled. With a proper scroll and settle, zero elements stay hidden. The investigation did surface the genuine `threshold` bug above.
- **pnpm 11 aborted every build** with `ERR_PNPM_IGNORED_BUILDS`. I first added `pnpm.onlyBuiltDependencies` to `package.json` — pnpm 11 silently ignores it, the setting moved to `pnpm-workspace.yaml`. (Fixed last week; noted because the failure mode is confusing.)
- **`npm i puppeteer` inside the project** for screenshot tooling risked disturbing pnpm's `node_modules`. I checked — no damage, no lockfile created — and moved all tooling to `/tmp/tools` so the project's dependencies were never touched.
- **A "broken link" turned out to be the real office address** used as an `href` by mistake in `app/staffing/about-us/page.js`. That's how I found the genuine business details in `config/social.json`.

---

## Still to do — prioritised

### P1 — before launch
1. Resolve the **CQC question** (#1 above). Nothing else matters if the regulatory position is wrong.
2. **Connect the forms.** A care website whose enquiry form silently discards enquiries is worse than having no form.
3. **Solicitor review** of all four policy pages.
4. **HTTPS + working domain.** Personal data over plain HTTP on a healthcare site is a UK GDPR exposure in its own right.
5. Fill in pay rates and coverage area — the two biggest commercial gaps.

### P2 — consolidation
6. **Retire the legacy `/domiciliary/*` and `/staffing/*` sub-sites** (~15 pages). They're untouched and still live, now duplicating the new service pages. They should be redirected to the new URLs — I left them because deleting wasn't mine to decide.
7. **Duplicate About pages** — `/domiciliary/about` and `/domiciliary/about-us` both render with different content. Pick one, redirect the other.
8. `/elements` is a **Bigspring template demo page** still live and indexable. `/pricing` is also a template leftover — confirm whether a care business wants it.
9. Old `SeoMeta` client component is still used by legacy pages; the new pages use App Router metadata. Migrate the rest.
10. Blog still contains five template posts with placeholder content.

### P3 — infrastructure (from last week's audit, still open)
11. `data/*.json` are tracked in git **and** written at runtime. Once the server's copy diverges, `git pull` conflicts and **every future deploy silently stops updating the site** — the workflow has no `set -e`, so it still shows green.
12. Add `set -e` to the deploy workflow.
13. The server runs `npm install`, ignoring the committed `pnpm-lock.yaml`, so production versions can drift from local.
14. 30+ stale `codex/*` branches on the remote.

### P4 — nice to have
15. Real photography. The stock images are serviceable but generic.
16. `/api/jobs` already backs an admin vacancy manager — surfacing live vacancies on `/careers` would be a genuine improvement.
17. Consider a lightweight cookie banner **if** analytics is ever switched on (currently none, which is why there's no banner).

---

## How to review this

```bash
cd ~/Desktop/website
git checkout overnight-redesign
pnpm install
pnpm dev          # http://localhost:3000
```

Commits are sequential and each does one thing:

```
55d89b8  Add REDESIGN_PLAN.md with audit findings and Lighthouse baseline
ecce6b4  Design system: blue/white palette anchored on the logo navy
4d8a53b  Recolour: replace 236 hardcoded hex values with design tokens
14f26c2  Add site-wide header and footer with three-intent navigation
b5af692  Rebuild homepage around the three visitor intents
2c15d91  Add Domiciliary Care and Care Home Staffing service pages
f5e944f  Add Supported Living, About, Careers, Contact, FAQ, policies and 404
744fc57  SEO and performance: sitemap, robots, image optimisation, headers
…        Use real business details, add MedicalBusiness schema, fix soft-404s
…        Fix catch-all route hijacking /contact and /faq
```

Worth a look in particular: the homepage, `/contact` (try submitting the form empty to see the validation), `/careers`, and `/faq`.

**Nothing was pushed and nothing was deployed.** `.env`, secrets and CI config were not touched.
