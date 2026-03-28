# Publish on GitHub Pages

Your site files are in **`public/`**. Links use **relative paths** so the site works at:

`https://YOUR_USERNAME.github.io/REPO_NAME/`

## One-time setup

### 1. Create a GitHub repository

- On GitHub: **New repository** (e.g. `europe-trip-2026`).
- **Public** (required for free Pages on personal accounts unless you use GitHub Enterprise).
- Do **not** add a README if you will push from your Mac (avoids merge conflicts); or add one and pull first.

### 2. Push this project from your Mac

```bash
cd /Users/srikar/Documents/Sandbox/europe-trip-site

git init
git add .
git commit -m "Initial trip site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` / `YOUR_REPO` with yours.

### 3. Turn on GitHub Pages (GitHub Actions)

1. Repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**: choose **GitHub Actions** (not “Deploy from a branch”).
3. The workflow **Deploy to GitHub Pages** should appear; if GitHub suggests committing the workflow, push again — it’s already in `.github/workflows/deploy-github-pages.yml`.

### 4. First deploy

- After `git push` to `main`, open **Actions** tab → wait for the green check on **Deploy to GitHub Pages**.
- Site URL: **`https://YOUR_USERNAME.github.io/YOUR_REPO/`**  
  (GitHub shows the exact link under **Settings → Pages** after a successful run.)

Updates: every push to `main` redeploys automatically.

## Username / password on GitHub Pages (option 2 — browser login)

GitHub Pages serves **static files only** — no nginx Basic Auth. This repo deploys a **browser login** on every page (`public/js/site-gate.js` + a digest in `auth-config.js` generated in CI).

### Enable it (one-time)

1. Open your repo on GitHub → **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret** (exact names):
   - **`PAGES_SITE_USER`** — e.g. same as Docker `TRIP_SITE_USER` (`Intltravel2k26`).
   - **`PAGES_SITE_PASSWORD`** — e.g. same as Docker `TRIP_SITE_PASSWORD` (`Intltravel@2k26`).
3. Trigger a deploy: push to **`main`**, or **Actions** → **Deploy to GitHub Pages** → **Run workflow**.
4. In the workflow log, look for **`Pages login gate is ON`** (notice). If you see a **warning** about secrets missing, the names don’t match or the secrets weren’t saved.
5. Open your live Pages URL in a **private/incognito** window — you should see the **Europe trip** sign-in. Session lasts until you close the tab (or clear site data).

**Where it’s implemented:** `.github/workflows/deploy-github-pages.yml` (step **Apply Pages login**) · `scripts/write-pages-auth.mjs` · `public/js/site-gate.js` · all pages load `js/auth-config.js` first.

**If login never appears** after you set secrets: add the **same two names** under **Settings → Environments → `github-pages` → Environment secrets** (some accounts use environment-scoped secrets for the Pages environment).

**Limits:** The live site still ships `auth-config.js` with a **digest** only — offline guessing is possible. Fine for casual privacy; use **Cloudflare Access** or **private Pages** if you need stronger protection.

If either secret is **missing**, the **Deploy to GitHub Pages** workflow **fails** at **Apply Pages login** — the site is not updated until both secrets are set (login is **enforced** for deploys from this repo).

## If the repo is only the `public/` folder

If you prefer the repo root to **be** the site (no `public/` subfolder):

1. Change the workflow `path` from `public` to `.` in `.github/workflows/deploy-github-pages.yml`.
2. Or keep the monorepo layout and only push `public/` using a subtree (advanced).

## Private repo + Pages

- **GitHub Pro** (and some org plans) allow **private** repos with Pages.
- On **free** personal accounts, **public** repo = public site.

## Custom domain (optional, paid)

Buy a domain → **Settings → Pages → Custom domain** → add DNS per GitHub’s instructions.
