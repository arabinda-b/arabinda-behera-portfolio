# Stage 10 — Deployment to Vercel

**Status:** In Progress  
**Date:** 2026-05-29

## What You'll Learn

Git repository setup, connecting GitHub to Vercel, automatic CI/CD on every push, preview URLs for pull requests, and a final build check.

---

## The Deployment Flow

```
You push code to GitHub
        ↓
Vercel detects the push (webhook)
        ↓
Vercel runs: npm run build
        ↓
If build passes → live site updates in ~30 seconds
If build fails  → old site stays live, you get an email
```

Every pull request also gets its own **preview URL** — a temporary live site for that branch. You can share it for review before merging.

---

## Step 1 — Final local build check

Before pushing, verify everything compiles:

```bash
npm run build
```

Fix any TypeScript errors before continuing. A passing build here means Vercel will succeed too.

---

## Step 2 — Initialize Git

```bash
git init
git add .
git commit -m "Initial portfolio — Next.js 16, Tailwind v4, shadcn/ui, MDX blog"
```

Check what was staged before committing:
```bash
git status
```

Make sure `node_modules/` is NOT listed — it should be in `.gitignore` already.

---

## Step 3 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** → **New repository**
3. Name it `my-portfolio`
4. Set to **Public** (required for free Vercel deployment)
5. **Do NOT** check "Add README", "Add .gitignore", or "Choose a license" — your repo already has these
6. Click **Create repository**

GitHub will show you a page with push instructions. Use the commands under **"…or push an existing repository from the command line"**:

```bash
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 4 — Update the GitHub URL in `src/lib/data.ts`

Now that the repo exists, update the placeholder:

```ts
export const GITHUB = "https://github.com/YOUR_USERNAME/my-portfolio";
```

Commit the change:
```bash
git add src/lib/data.ts
git commit -m "Update GitHub URL"
git push
```

---

## Step 5 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Find `my-portfolio` in the repository list → click **Import**
4. Vercel auto-detects Next.js — leave all settings as default
5. Click **Deploy**

Watch the build log. It should complete in ~1–2 minutes. When it finishes you get a live URL like `my-portfolio-xyz.vercel.app`.

---

## Step 6 — Add a custom domain (optional)

Vercel gives you a free `.vercel.app` subdomain. To use your own domain (e.g. `arabindabehera.com`):

1. In Vercel project → **Settings → Domains**
2. Add your domain
3. Update your domain registrar's DNS with the records Vercel shows you
4. Wait 10–30 minutes for DNS to propagate

---

## Step 7 — Understand the CI/CD workflow going forward

From now on, your workflow is:

```bash
# Make a change
git add .
git commit -m "Add new project card"
git push
```

That's it. Vercel picks it up and redeploys automatically. No manual deployment steps ever again.

**For bigger changes** — use a branch:
```bash
git checkout -b feature/add-dark-mode
# make changes
git push origin feature/add-dark-mode
# open a PR on GitHub → Vercel creates a preview URL
# merge PR → Vercel deploys to production
```

---

## Step 8 — Add Vercel Analytics (optional but recommended)

```bash
npm install @vercel/analytics
```

Add one line to `src/app/layout.tsx`:

```tsx
import { Analytics } from "@vercel/analytics/react";

// Inside the <body>:
<body className={inter.className}>
  <Navbar />
  <main className="pt-16">{children}</main>
  <Footer />
  <Analytics />
</body>
```

Commit and push — you'll see visitor data in the Vercel dashboard within minutes.

---

## Verification Checklist

After deployment, check the live URL for:

- [ ] Home page loads with Hero section
- [ ] Navbar glass effect works on scroll
- [ ] All 7 sections visible: Hero, About, Experience, Projects, Skills, Publications, Contact
- [ ] Breakthrough Prize callout card appears in About
- [ ] Navbar links smooth-scroll to each section
- [ ] `/blog` lists the post
- [ ] `/blog/from-cern-to-oracle` renders the full article
- [ ] "Download Resume" button — will 404 until you add `resume.pdf` to `public/`
- [ ] Footer LinkedIn and Email links work
- [ ] Site looks correct on mobile (resize browser to 375px)

---

## Add Your Resume PDF

Copy your resume PDF into the `public/` folder and name it `resume.pdf`:

```bash
cp /path/to/your/resume.pdf public/resume.pdf
git add public/resume.pdf
git commit -m "Add resume PDF"
git push
```

The "Download Resume" button in the Hero section will now work.

---

## Key Concepts Learned

| Concept | Explanation |
|---|---|
| `git init` + `git remote add` | Connects your local repo to GitHub |
| CI/CD | Continuous Integration / Continuous Deployment — every push triggers an automated build and deploy |
| Vercel webhook | GitHub notifies Vercel on every push via a webhook — Vercel rebuilds automatically |
| Preview URLs | Every PR branch gets a temporary live URL — review before merging to production |
| `public/` folder | Static files served at the root URL — `public/resume.pdf` → `yoursite.com/resume.pdf` |

---

## Congratulations 🎉

You've built and deployed a full portfolio website from scratch:

| Stage | What you built |
|---|---|
| 1–2 | Next.js project + App Router fundamentals |
| 3 | shadcn/ui component library |
| 4 | TypeScript data layer |
| 5 | CLAUDE.md + Claude Code setup |
| 6 | Navbar + Footer layout |
| 7 | 7 portfolio sections |
| 8 | Framer Motion scroll animations |
| 9 | MDX blog |
| 10 | GitHub + Vercel CI/CD |
