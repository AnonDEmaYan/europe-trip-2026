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

## Username / password on GitHub Pages

GitHub Pages serves **static files only** — there is no nginx or HTTP Basic Auth like your **Docker** setup. This repo adds an **optional** browser login for the live site:

1. On GitHub: repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. Add **`PAGES_SITE_USER`** and **`PAGES_SITE_PASSWORD`** (same values you use for Docker, e.g. `Intltravel2k26` / `Intltravel@2k26`).
3. Push to **`main`** (or **Actions** → **Deploy to GitHub Pages** → **Run workflow**). The workflow runs `scripts/write-pages-auth.mjs`, which writes only a **SHA-256 digest** into `public/js/auth-config.js` in the deploy artifact — not your plaintext password in the repo.
4. Open your Pages URL; you should get a **Trip site** sign-in. The session lasts until you close the tab (or clear site data).

**Limits (read this):** Anyone can download the deployed `auth-config.js` and try offline guesses against the digest. This keeps casual visitors out; it is **not** bank-grade security. For stronger protection, use **Cloudflare Access**, a **private** GitHub repo with **GitHub Pro** private Pages, or keep the site **Docker-only** on your network.

If you **omit** those two secrets, the published site has **no** login gate (digest stays empty in the committed stub).

## If the repo is only the `public/` folder

If you prefer the repo root to **be** the site (no `public/` subfolder):

1. Change the workflow `path` from `public` to `.` in `.github/workflows/deploy-github-pages.yml`.
2. Or keep the monorepo layout and only push `public/` using a subtree (advanced).

## Private repo + Pages

- **GitHub Pro** (and some org plans) allow **private** repos with Pages.
- On **free** personal accounts, **public** repo = public site.

## Custom domain (optional, paid)

Buy a domain → **Settings → Pages → Custom domain** → add DNS per GitHub’s instructions.
