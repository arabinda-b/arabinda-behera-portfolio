# Stage 6 — Navbar and Footer Layout

**Status:** In Progress  
**Date:** 2026-05-29

## What You'll Learn

The difference between Server and Client Components, why `"use client"` is needed for interactive UI, sticky positioning with a glass-blur effect, and wiring shared layout into `layout.tsx`.

---

## The Key Concept: Server vs Client Components

| | Server Component (default) | Client Component (`"use client"`) |
|---|---|---|
| Renders on | Server | Browser |
| Can use `useState`, `useEffect` | No | Yes |
| JavaScript sent to browser | None | Yes |
| Use for | Static content, data fetching | Interactivity, scroll detection, animations |

**Rule of thumb:** Start with a Server Component. Only add `"use client"` when you need browser APIs or React hooks.

The **Navbar needs `"use client"`** because it listens to the scroll event to add a background blur.  
The **Footer is a Server Component** — it's purely static HTML.

---

## Step 1 — Create the folder structure

```bash
mkdir -p src/components/layout
```

---

## Step 2 — Create `src/components/layout/Navbar.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAME } from "@/lib/data";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight hover:text-primary transition-colors"
        >
          {NAME.split(" ")[0]}
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

**What's happening here:**
- `"use client"` — top of file, marks this as a Client Component
- `useState(false)` — tracks whether user has scrolled past 20px
- `useEffect` — adds a scroll listener when the component mounts, removes it when it unmounts (the `return` inside `useEffect` is the cleanup function — like Java's `AutoCloseable`)
- `bg-background/80 backdrop-blur-md` — Tailwind's glass effect: 80% opaque + CSS blur filter
- `hidden md:flex` — hidden on mobile, visible on medium screens and above

---

## Step 3 — Create `src/components/layout/Footer.tsx`

```tsx
import Link from "next/link";
import { EMAIL, LINKEDIN, GITHUB } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Arabinda Behera. Built with Next.js & Tailwind.</p>
        <div className="flex gap-6">
          <Link href={LINKEDIN} target="_blank" className="hover:text-foreground transition-colors">
            LinkedIn
          </Link>
          <Link href={`mailto:${EMAIL}`} className="hover:text-foreground transition-colors">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

Notice: **no `"use client"`** — this is a pure Server Component. It renders once on the server and sends plain HTML. No JavaScript needed.

---

## Step 4 — Add `GITHUB` to `src/lib/data.ts`

Open `src/lib/data.ts` and add this line near the other constants at the top:

```ts
export const GITHUB = "https://github.com/arabinda-behera";
```

(Update the username to your actual GitHub username once you create the repo in Stage 10.)

---

## Step 5 — Wire into `src/app/layout.tsx`

Replace the full contents of `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NAME, TAGLINE } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: NAME,
  description: TAGLINE,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Key additions:**
- `scroll-smooth` on `<html>` — makes anchor link clicks (`#about`, `#experience`) animate smoothly
- `pt-16` on `<main>` — 64px top padding so content doesn't hide under the fixed Navbar
- `metadata` uses your data from `data.ts` — the browser tab and search engines will show your name

---

## Step 6 — Verify

Run `npm run dev` and open `localhost:3000`. You should see:
- Your name in the top-left of the navbar
- Nav links on the right (About, Experience, Projects, Skills, Blog, Contact)
- Footer at the bottom with LinkedIn and Email links
- Scroll down — the navbar should get a frosted glass background after 20px

---

## Key Concepts Learned

| Concept | Explanation |
|---|---|
| `"use client"` | Opts a component into client-side rendering — needed for hooks and browser events |
| `useEffect` cleanup | Return function from `useEffect` runs on unmount — prevents memory leaks |
| `next/link` | Next.js `<Link>` component — handles client-side navigation, prefetching |
| `next/font` | Self-hosts Google Fonts at build time — faster, no external request |
| `metadata` export | Next.js reads this for `<title>` and `<meta description>` — important for SEO |
| `scroll-smooth` | CSS `scroll-behavior: smooth` — anchor links animate instead of jumping |

---

## Next Stage

→ [Stage 7 — Building the Sections](stage-07-sections.md)
