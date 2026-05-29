# Stage 5 — CLAUDE.md and Claude Code Setup

**Status:** Complete  
**Date:** 2026-05-29

## What You'll Learn

How Claude Code uses `CLAUDE.md` for project context, how `.claude/settings.json` reduces permission prompts, and why these make AI-assisted development dramatically more effective.

---

## The Core Idea

Every time you open this project in Claude Code, it reads `CLAUDE.md` **before** doing anything. This means:
- You never have to re-explain the project structure
- Claude knows exactly where to add new blog posts, projects, or skills
- Future you (or a teammate) has a living project guide

`.claude/settings.json` pre-approves common safe operations (running the dev server, building, git commands) so you don't get permission prompts for routine tasks.

---

## Step 1 — Create `CLAUDE.md` in the project root

Create the file `CLAUDE.md` at `/Users/abehera/Projects/claude-test/my-portfolio/CLAUDE.md`:

```markdown
# My Portfolio — CLAUDE.md

## Project Overview

Personal portfolio website for Arabinda Behera. Built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and MDX. Deployed on Vercel.

## Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Framework   | Next.js 16 (App Router)     |
| Language    | TypeScript                  |
| Styling     | Tailwind CSS + shadcn/ui    |
| Animation   | Framer Motion               |
| Blog        | @next/mdx                   |
| Deployment  | Vercel (auto-deploy on push) |

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout — Navbar + Footer wrap every page
    page.tsx            # Home page — imports and renders all section components
    blog/
      page.tsx          # Blog list
      [slug]/page.tsx   # Individual blog post (reads MDX from content/blog/)
  components/
    ui/                 # shadcn/ui generated components — do not edit manually
    layout/
      Navbar.tsx        # Sticky top nav with smooth-scroll anchor links
      Footer.tsx
    sections/           # One file per portfolio section
      Hero.tsx
      About.tsx
      Experience.tsx
      Projects.tsx
      Skills.tsx
      Publications.tsx
      Contact.tsx
  lib/
    data.ts             # ALL resume content as typed TypeScript constants
    utils.ts            # cn() helper for merging Tailwind classes
  types/
    index.ts            # TypeScript interfaces: Experience, Project, SkillGroup, etc.
content/
  blog/                 # MDX blog post files (one .mdx file = one blog post)
public/
  resume.pdf            # Downloadable resume
```

## How to Add Content

### Add a new project
Edit `src/lib/data.ts` → find the `PROJECTS` array → add a new object matching the `Project` interface.

### Add a new skill
Edit `src/lib/data.ts` → find the `SKILL_GROUPS` array → add to an existing category's `skills` array, or add a new `SkillGroup`.

### Add a blog post
Create a new `.mdx` file in `content/blog/` with this frontmatter:
```
---
title: "Your Post Title"
date: "2026-05-29"
description: "One sentence summary shown on the blog list page."
tags: ["tag1", "tag2"]
---

Your content here in Markdown...
```
The filename becomes the URL slug: `my-post.mdx` → `/blog/my-post`.

### Add a publication
Edit `src/lib/data.ts` → find the `PUBLICATIONS` array → add a new object matching the `Publication` interface.

## Development Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build (run before pushing)
npm run lint     # ESLint checks
```

## Deployment

Connected to Vercel. Every push to `main` auto-deploys.
Pull requests get a preview URL automatically.

## Skills Available

- `/verify` — run the app and confirm a feature works correctly in the browser
- `/code-review` — review current diff for correctness and best practices
```

---

## Step 2 — Create `.claude/settings.json`

Create the folder and file at `my-portfolio/.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev:*)",
      "Bash(npm run build:*)",
      "Bash(npm run lint:*)",
      "Bash(npm install*)",
      "Bash(npx shadcn*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)"
    ]
  }
}
```

**What this does:** These are the Bash commands Claude Code can run without asking you first. Read-only git commands and standard npm scripts are safe to pre-approve. Destructive operations like `git push --force` or `rm -rf` are intentionally not in this list.

---

## Step 3 — Test That Claude Code Reads It

Close this conversation and open a **new Claude Code session** in this project directory. Type:

```
What is the structure of this project?
```

Claude should immediately describe the structure from `CLAUDE.md` without you having to explain anything. This is the "context injection" superpower of CLAUDE.md.

Then come back to this conversation and continue with Stage 6.

---

## Key Concepts Learned

| Concept | Explanation |
|---|---|
| `CLAUDE.md` | Auto-loaded context file — Claude reads it at the start of every session in this directory |
| `.claude/settings.json` | Pre-approved permissions — reduces friction for routine safe operations |
| Context injection | Giving an AI assistant structured project knowledge so you don't repeat yourself |
| Living documentation | `CLAUDE.md` serves both humans and AI — always keep it up to date |

---

## Next Stage

→ [Stage 6 — Navbar and Footer Layout](stage-06-layout.md)
