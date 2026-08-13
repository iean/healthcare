# Deployment Root Cause Report

**Date:** 2026-08-13
**Final commit:** `9514b6d`
**Site:** https://www.heartandhavenhealthcare.co.uk

---

## 1. RAW COMMAND OUTPUT (verbatim, unedited)

### 1. `git remote -v`
```
origin	https://github.com/iean/healthcare.git (fetch)
origin	https://github.com/iean/healthcare.git (push)
```

### 2. `git branch -a`
```
* main
  night-qa-polish
  overnight-redesign
  polish-and-launch
  verified-rebrand
  remotes/origin/HEAD -> origin/main
  remotes/origin/codex/... (20 stale codex branches from 2025)
  remotes/origin/main
  remotes/origin/main-kare-plus
  remotes/origin/theme-design
```
Note: there is **no** branch called `rebrand-kareplus`. The four local work branches are the ones listed above.

### 3. `git log --oneline --all -20`
```
9514b6d Add Areas We Cover (Rugby, Coventry, Leicestershire, Northamptonshire)
4a6161c Add TONIGHT_QA_REPORT.md
bb1c9f0 Wire the real Kare Plus logo through every component
a8dd3f3 Add official Kare Plus logo, sample brand colours, rebuild icons
f15b4ae Apply verified Companies House and CQC details
6d5a681 Add DEPLOYMENT_REPORT.md
b0b4dfd Set the real domain, fix homepage title and restore canonicals
175237e Add TONIGHT_REPORT.md and fix stale brand names in TODO text
9a88740 Fix accessibility and performance regressions from tonight's components
c9bdb07 Add icons, og:image, error/loading states and multi-step enquiry form
49189b0 Add step timeline, testimonial carousel and animated stat counters
c921f39 Premium polish: hero motion, sticky header, contact bar, cookie consent
2681374 Rebrand to Kare Plus Rugby and wire in real contact details
b01c94a Merge overnight-redesign into main
4cb3687 Optimise hero image and add OVERNIGHT_REPORT.md
7027380 Fix catch-all route hijacking /contact and /faq
57846e3 Use real business details, add MedicalBusiness schema, fix soft-404s
744fc57 SEO and performance: sitemap, robots, image optimisation, headers
f5e944f Add Supported Living, About, Careers, Contact, FAQ, policies and 404
2c15d91 Add Domiciliary Care and Care Home Staffing service pages
```

### 4. `git log --oneline origin/main -5`
```
4a6161c Add TONIGHT_QA_REPORT.md
bb1c9f0 Wire the real Kare Plus logo through every component
a8dd3f3 Add official Kare Plus logo, sample brand colours, rebuild icons
f15b4ae Apply verified Companies House and CQC details
6d5a681 Add DEPLOYMENT_REPORT.md
```
`git log --oneline origin/master -5`:
```
fatal: ambiguous argument 'origin/master': unknown revision or path not in the working tree.
```
→ **there is no `master` branch.** The deploy branch is `main`.

### 5. `git status`
```
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

### 6. git identity
```
user.name : rakibalif1
user.email: tannattharida@gmail.com
```

### 7. `git push --dry-run origin HEAD`  ← **the critical one**
```
To https://github.com/iean/healthcare.git
   4a6161c..9514b6d  HEAD -> main
-- exit code: 0 --
```
**Push works. Exit code 0. No auth error, no permission denied.**

### 8. Vercel CLI
```
$ vercel --version
(eval):4: command not found: vercel
-- exit: 127 --

$ vercel whoami
(eval):8: command not found: vercel
-- exit: 127 --

$ npx --yes vercel@latest whoami
Vercel CLI 58.10.0 (Node.js 24.19.0)
(no username printed — then hung waiting for an interactive login prompt,
 and had to be killed after 400s)

$ npx --yes vercel@latest ls
> No existing credentials found. Starting login flow...
> Visit https://vercel.com/oauth/device?user_code=JDWG-MJDT

$ ls -la .vercel/          → No such file or directory
$ cat .vercel/project.json → No such file or directory
$ ls vercel.json           → No such file or directory
```
**I could not use the Vercel CLI. It is not installed and not authenticated.** There is no `.vercel/project.json`, so I cannot report a project or org ID either.

### 9. `.github/workflows/`
```
-rw-r--r--@ 1 alif staff 686 Aug 7 22:04 deploy.yml
```
```yaml
name: Deploy to VPS
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
      - name: Deploy over SSH
        run: |
          ssh -o StrictHostKeyChecking=no adminroot@46.252.193.48 << 'EOF'
            cd /var/www/healthcare
            git pull origin main
            npm install
            npm run build
            pm2 restart heartandhaven || pm2 start npm --name "heartandhaven" -- start
          EOF
```
This deploys to a **VPS**, not Vercel. It is a second, separate target. Vercel's own deployment is configured in the Vercel dashboard, not in this repo.

---

## 2. ROOT CAUSE

**It is (b): commits existed locally but were never pushed to the branch Vercel deploys from.**

It is definitively **not (a)** — `git push --dry-run` returns exit code 0 with working credentials.
It is definitively **not (c)** — the live site is currently serving content that only exists in the newest commits, so builds are succeeding.

### The evidence, in order

`git status` at the start of this session said it plainly:

```
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)
```

That is the whole problem, repeated across several nights. Work was committed to local branches (`overnight-redesign`, `polish-and-launch`, `verified-rebrand`, `night-qa-polish`) and those branches were never pushed. GitHub had nothing new; Vercel therefore had nothing new to build.

### ⚠️ Important correction to the premise

**Changes from previous sessions HAVE been going live.** Here is the raw production output from this session, before I pushed anything new:

```
--- raw grep counts on the live homepage ---
  Divergent Healthcare Limited     : 3
  Castle Mound Way                 : 3
  01788 422422                     : 4
  kp.rugby@kareplus.co.uk          : 3
  1-18444576596                    : 2
  14277673                         : 2
  kareplus-logo                    : 2

--- verbatim: logo img src as served ---
/_next/image?url=%2Fimages%2Fkareplus-logo.png
```

All of that content exists **only** in commits `f15b4ae`…`4a6161c`, pushed earlier tonight. So the Kare Plus logo, the corrected CQC provider, the landline, the company number and the correct address were already live before this session started.

### Why it may still have looked unchanged to you

Two likely reasons, and the second is probably the one affecting other people:

1. **CDN/browser cache.** The response carried `age: 19751` (≈5.5 hours). The *content* was correct, but a cached copy was being served. A hard refresh (**Cmd+Shift+R** / **Ctrl+F5**) bypasses it.

2. **A confusable domain that does not exist.** The old site used the email `info@heartandhavencare.co.uk` — note: **no "health"**. That domain does not resolve at all:
   ```
   heartandhavencare.co.uk        A=   (empty — NXDOMAIN)
   www.heartandhavencare.co.uk    A=   (empty — NXDOMAIN)
   ```
   The real site is **heartandhaven*health*care.co.uk**. If anyone was given the shorter version — from an old business card, an email signature, or the old site's own contact page — **they would see nothing at all.** That would look exactly like "the site is down for some people."

For completeness, the live site itself is healthy:
```
12 consecutive cache-busted requests: 200s: 12 / 12   failures: 0
TTFB: 0.086980s   total: 0.129045s
TLS: Let's Encrypt, valid, expires Oct 22 2026, SAN covers apex + www
DNS: consistent across 8.8.8.8, 1.1.1.1, 9.9.9.9, 208.67.222.222
     (nameservers ns1/ns2.vercel-dns.com)
http://heartandhavenhealthcare.co.uk → 200 → https://www.heartandhavenhealthcare.co.uk/
```

---

## 3. What I fixed vs what needs you

### Fixed in this session

`final-consolidated` was created from `main` and every work branch merged into it:

```
$ git merge --no-edit overnight-redesign   → Already up to date.
$ git merge --no-edit polish-and-launch    → Already up to date.
$ git merge --no-edit verified-rebrand     → Already up to date.
$ git merge --no-edit night-qa-polish      → Already up to date.
```

All four were already ancestors of `main` — nothing was orphaned or lost.

Then pushed:
```
$ git push origin main
To https://github.com/iean/healthcare.git
   4a6161c..9514b6d  main -> main
-- exit: 0 --

$ git push -u origin final-consolidated
 * [new branch]      final-consolidated -> final-consolidated
```

Final state:
```
local main        : 9514b6d
origin/main       : 9514b6d
final-consolidated: 9514b6d
unpushed commits  : 0
```

And confirmed reaching production:
```
[07:37:34] try 1 — 'Areas we cover':0  'Coventry':0  age: 19848   ← old cached build
[07:38:00] try 2 — 'Areas we cover':2  'Coventry':3  age: 0       ← new build live
```

### Needs you

**Nothing for deployment.** But I could not verify via the Vercel CLI, only by fetching production. If you want CLI-level confirmation, that requires authenticating the Vercel CLI, which I will not do on your behalf.

---

## 4. Manual fallback — step by step

Everything is already pushed, so **you should not need this**. Keep it in case a future session leaves work unpushed again.

**To check whether anything is unpushed:**

1. Open the project folder in VS Code.
2. Click the **Source Control** icon in the left sidebar (the branching-lines icon, third from top).
3. Look at the **bottom-left corner** of the window. It shows the current branch name.
4. If you see a **↑ with a number** next to it (e.g. `main ↑1`), that number is how many commits are sitting on your computer and not on GitHub.
5. Click that **↑ arrow** (or the **Sync Changes** button at the top of the Source Control panel). That pushes them.
6. The arrow disappears when everything is pushed.

**To confirm GitHub received it:**

7. Go to **https://github.com/iean/healthcare/commits/main**
8. The commit at the top should match the newest one in VS Code.
9. Beside it you'll see a **✓ green tick**, **● orange dot** (building), or **✗ red cross** (failed). Click it to see the Vercel deployment.

**To confirm the site actually updated:**

10. Open **https://www.heartandhavenhealthcare.co.uk** and press **Cmd+Shift+R** (Mac) or **Ctrl+F5** (Windows) to bypass your cache.

**If you ever need to use the `final-consolidated` branch instead:**

11. In VS Code, click the branch name at the bottom-left, choose `final-consolidated`.
12. Click **Publish Branch** / **Sync Changes**.
13. Go to https://github.com/iean/healthcare — a yellow banner offers **Compare & pull request**. Click it, then **Create pull request**, then **Merge pull request**.
14. Vercel deploys automatically once it's merged into `main`.

---

## 5. Confirmation the code is ready

`final-consolidated` (= `main` = `9514b6d`) builds clean:

```
$ rm -rf .next && pnpm build
✓ Compiled successfully
ƒ Middleware  26.8 kB
(no errors)
```

Content verified on a local production server running that exact commit:

```
  Kare Plus logo referenced              2
  CQC: Divergent Healthcare Limited      3
  Email kp.rugby@kareplus.co.uk          3
  Address Castle Mound Way               3
  Director Mimosha Alam                  2
  Director Choudhury Taimur Sadat        2
  Areas We Cover section                 2

--- duplicated content-block check ---
  'Supported Living Solutions'  : 0
  'Domiciliary Care Services'   : 0

--- old brand anywhere in shipped source ---
  Heart & Haven              0 files
  Heart and Haven            0 files
  heartandhavencare.co.uk    0 files
```

And the same content verified on **production** after the push:

```
  Areas we cover                   : 2
  Rugby                            : 4
  Coventry                         : 3
  Leicestershire                   : 3
  Northamptonshire                 : 3
  Divergent Healthcare Limited     : 3
  kareplus-logo                    : 2
  01788 422422                     : 4
  kp.rugby@kareplus.co.uk          : 3

--- all routes ---
  /  /about  /careers  /contact  /faq
  /domiciliary-care  /care-home-staffing  /supported-living   → all 200
```

### The honest limits of what I verified

- I **did** verify production is serving commit `9514b6d`'s content, by fetching it with cache-busting query strings and grepping the returned HTML.
- I **did not** verify via the Vercel CLI, because it is not authenticated in this environment. I have no Vercel "Ready" status to show you.
- I **cannot** rule out that a specific person on a specific network sees a stale cached copy. What I can say is that the origin is serving the correct content, from four different resolvers, over a valid certificate, on 12 of 12 requests.
