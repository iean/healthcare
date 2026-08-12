# Overnight Redesign — Plan

**Branch:** `overnight-redesign` (cut from `main` @ `1d9f64e`)
**Date:** 2026-08-12

---

## 1. Audit findings

### Stack (detected — keeping all of it, introducing nothing new)

| Layer | What's there |
|---|---|
| Framework | Next.js 14.2 App Router |
| Styling | **Tailwind CSS 3.4**, driven by `config/theme.json` via `tailwind.config.js`, plus SCSS partials in `styles/` |
| Content | Markdown + `gray-matter`, JSON in `config/` and `content/home/banner.json` |
| Fonts | `next/font/google` — Inter, Merriweather, Playfair Display, loaded in `app/layout.js` |
| Icons | `react-icons` |
| Images | `next/image` used in places, raw `<img>` in others |

Styling approach is **Tailwind + theme.json tokens**. I will keep that and push everything through it.

### The core design problem

`config/theme.json` and `tailwind.config.js` already define a token system — **and almost nothing uses it.** 34 files contain ~230 hardcoded hex colors across ~25 distinct shades:

| Count | Hex | What |
|---|---|---|
| 57 | `#431c52` | purple |
| 29 | `#f4b860` | gold |
| 24 | `#6a2c70` | purple |
| 17 | `#5e3ea1` | violet |
| 9 each | `#d46f4d`, `#9e3ea1`, `#2f2f85` | orange, magenta, indigo |
| rest | ~18 more one-off tints | |

That's why the site looks inconsistent: it's four or five different colour schemes layered on top of each other. Fixing the tokens alone changes nothing until the hardcoded values are replaced.

### Brand colours — resolving the conflict

The brief says **blue and white**. `theme.json` currently says purple `#5a2671` + gold `#b9892f`.

I sampled the actual logo (`H&H-New-Color-logo.png`), which I've been told not to replace:

- **Navy `#000048`** — the "Heart and Haven Care" wordmark
- **Gold `#E8CC58`** — the heart/house mark
- **Green `#006038`** — the "Caring from the heart" tagline

**The logo contains no purple at all.** So blue/white is not a departure from the brand — it's closer to the real logo than the current theme is. I'll anchor the blue scale on the logo's own navy, and use the logo's gold sparingly as the single CTA accent the brief allows. That makes the logo look deliberate rather than stranded.

### Content problems

- Homepage still carries **Bigspring template copy**: "Let us solve your critical website development challenges", "It is the most advanced digital marketing and it company", plus Lorem ipsum
- Feature list mentions "Cloud Support" — a leftover from a software template, meaningless for a care agency
- Footer content is Lorem ipsum
- No Care Home Staffing page, no Careers page, no FAQ, no cookie/complaints/safeguarding policies
- `/supported-living` is in the main nav but has no page → live 404
- Duplicate About pages: `/domiciliary/about` and `/domiciliary/about-us`

### ⚠️ Compliance issue found in existing code (not introduced by me)

`layouts/partials/Footer.js` already publishes **CQC regulatory claims**:

> "CQC regulates Heart & Haven Care Ltd to provide care at Heart & Haven Care - Main Office"
> "We haven't inspected this service yet"
> "✓ We checked this service was likely to be safe, effective, caring, responsive and well-led during registration."

plus a CQC logo and a link to `/registration-details` — **a page that does not exist** (broken link).

I cannot verify any of this. Per the brief I will **not delete it** and **not extend it**. I'll mark it with a visible TODO for verification and flag it as the top item in the report. If Heart & Haven is not actually CQC-registered, this is a serious regulatory problem that predates tonight's work.

---

## 2. Design system

Anchored on the logo navy. All values go in `config/theme.json` → `tailwind.config.js`, never hardcoded.

### Blue scale

| Token | Hex | Use |
|---|---|---|
| `primary-950` | `#000048` | logo navy — major headings |
| `primary-900` | `#062463` | deep sections, footer |
| `primary-800` | `#0B347F` | section headers |
| `primary` | `#12469B` | buttons, links, brand fill |
| `primary-600` | `#1D5BC0` | hover |
| `primary-400` | `#5B8AD9` | borders, muted icons |
| `primary-100` | `#DCE7F8` | tint fills |
| `primary-50` | `#F1F6FD` | section backgrounds |

### Neutrals + accent

| Token | Hex | Use |
|---|---|---|
| `body` | `#FFFFFF` | page background |
| `surface` | `#F7F9FC` | off-white alternating sections |
| `text` | `#14203A` | body copy — ~15:1 on white |
| `text-muted` | `#4A5773` | secondary copy — ~7:1, still AA at small sizes |
| `border` | `#DCE3ED` | hairlines |
| `accent` | `#B8860B` | **sparingly** — CTA highlight, ties to logo gold. Dark enough for AA on white. |
| `success` / `warning` / `danger` | greens/ambers/reds | form states only |

Contrast targets: **WCAG AA minimum (4.5:1 body, 3:1 large)**, verified with a script, not by eye.

### Typography

Keep **Inter** (already loaded, excellent legibility). Drop Playfair/Merriweather from body use — decorative serifs hurt an older audience. Base size **17px** rather than 16px, scale ratio 1.2 for a calmer hierarchy.

### Spacing / components

4px-based scale. Shared `Section`, `Container`, `Button`, `Card` primitives so spacing stops being ad-hoc. Subtle shadows, 1px borders, 8–12px radii. Scroll-in animations via a small IntersectionObserver hook, `prefers-reduced-motion` respected.

---

## 3. Order of work

1. Design system: `theme.json`, `tailwind.config.js`, shared UI primitives
2. Sweep the 34 files replacing hardcoded hex with tokens
3. Navigation — three explicit paths: *I need care* / *I need staff* / *I want to work here*
4. Homepage rebuild
5. Care Home Staffing page (new)
6. Domiciliary Care page + enquiry form
7. Careers page + application form with CV upload
8. Contact page — general + referral forms
9. About, FAQ, 404
10. Policy pages: privacy, cookies, complaints, safeguarding
11. Forms: validation, error/success states, stub API routes
12. SEO: per-page metadata, OG/Twitter, JSON-LD, sitemap, robots
13. Images: `next/image`, sizing, lazy loading
14. Build + lint + Lighthouse, fix everything
15. `OVERNIGHT_REPORT.md`

## 4. Rules I'm holding myself to

- **No invented regulatory or compliance facts.** No CQC numbers, no DBS statistics, no staff counts, no insurance details, no testimonials presented as real. Generic trust copy only; everything specific becomes a visible `[TODO: ...]`.
- **Nothing deleted outright.** Replaced content is committed first so it stays in history.
- **No touching** `.env`, secrets, CI, or deploy config. No deploy or publish commands. Local build only.
- **Branch only** — never commit to `main`.

---

## 5. Lighthouse baseline (before any changes)

Production build (`next build` + `next start`), headless Chrome, Lighthouse 12.

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | **75** | **96** | 100 | 100 |
| `/domiciliary` | **86** | **94** | 100 | 100 |

`/domiciliary` Core Web Vitals: LCP **4.3 s** (poor — target < 2.5 s), CLS 0 (good), TBT 30 ms (good).

Performance is the weak axis, and LCP is the reason — large unoptimised hero images. Accessibility is already decent; the goal is to keep it at 100 while substantially changing the visuals.
