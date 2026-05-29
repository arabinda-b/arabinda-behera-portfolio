# Stage 1 — Prerequisites & Project Scaffolding

**Status:** Complete  
**Date:** 2026-05-29

## What We Did

Bootstrapped a Next.js 16 project with the App Router, TypeScript, Tailwind CSS, and the `src/` directory layout.

## Command Run

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-git
npm run dev
```

## Files Created

```
src/
  app/
    layout.tsx     # Root layout — wraps every page
    page.tsx       # Home route "/"
    globals.css    # Global styles + Tailwind directives
    favicon.ico
public/            # Static assets (images, PDFs go here)
next.config.ts     # Next.js configuration
tailwind.config.ts # Tailwind configuration
tsconfig.json      # TypeScript configuration
package.json       # Dependencies and scripts
.gitignore
```

## Key Concepts Learned

| Concept | Explanation |
|---|---|
| App Router | Next.js 13+ routing system. Each folder under `src/app/` maps to a URL. A `page.tsx` file makes it a route. |
| `layout.tsx` | Wraps all pages — like a base template in Java Servlets. Changes here affect every route. |
| Server Components | All components in `src/app/` are React Server Components by default — they render on the server, send plain HTML to the browser. No JavaScript shipped unless you add `"use client"`. |
| Tailwind CSS | Utility-first CSS. Instead of writing `.my-class { font-size: 2rem }`, you write `className="text-4xl"` directly in JSX. |
| `@/*` import alias | `@/components/Navbar` maps to `src/components/Navbar`. Avoids `../../..` relative path hell. |

## Dev Commands

```bash
npm run dev    # Start dev server at localhost:3000 (hot reload)
npm run build  # Production build (run before deploying)
npm run lint   # ESLint checks
```

## Next Stage

→ [Stage 2 — File Structure & First Edit](stage-02-file-structure.md)
