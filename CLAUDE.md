# My Portfolio — CLAUDE.md

## Project Overview

Personal portfolio website for Arabinda Behera. Built with Next.js 16 (App Router),
TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and MDX. Deployed on Vercel.

## Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Framework  | Next.js 16 (App Router)      |
| Language   | TypeScript                   |
| Styling    | Tailwind CSS + shadcn/ui     |
| Animation  | Framer Motion                |
| Blog       | @next/mdx                    |
| Deployment | Vercel (auto-deploy on push) |

## Project Structure

```
src/
  app/
    layout.tsx           # Root layout — Navbar + Footer wrap every page
    page.tsx             # Home page — imports and renders all section components
    blog/
      page.tsx           # Blog list
      [slug]/page.tsx    # Individual blog post (reads MDX from content/blog/)
  components/
    ui/                  # shadcn/ui generated components — do not edit manually
    layout/
      Navbar.tsx         # Sticky top nav with smooth-scroll anchor links
      Footer.tsx
    sections/            # One file per portfolio section
      Hero.tsx
      About.tsx
      Experience.tsx
      Projects.tsx
      Skills.tsx
      Publications.tsx
      Contact.tsx
  lib/
    data.ts              # ALL resume content as typed TypeScript constants
    utils.ts             # cn() helper for merging Tailwind classes
  types/
    index.ts             # TypeScript interfaces: Experience, Project, SkillGroup, etc.
content/
  blog/                  # MDX blog post files (one .mdx file = one blog post)
public/
  resume.pdf             # Downloadable resume
```

## How to Add Content

### Add a new project

Edit `src/lib/data.ts` → find the `PROJECTS` array → add a new object matching the `Project` interface.

### Add a new skill

Edit `src/lib/data.ts` → find the `SKILL_GROUPS` array → add to an existing category's `skills` array.

### Add a blog post

Create a new `.mdx` file in `content/blog/` with this frontmatter:

```mdx
---
title: "Your Post Title"
date: "2026-05-29"
description: "One sentence summary."
tags: ["tag1", "tag2"]
---

Your content here in Markdown...
```

The filename becomes the URL slug: `my-post.mdx` → `/blog/my-post`

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
