# Stage 13 — Multi-Page Portfolio Restructure

## Overview

Convert from a single-page scroll to a multi-page app. Home becomes a lean landing hub. Each major section gets its own route. Skills and Projects share one page at `/projects`.

---

## New Route Structure

```
/               → Home — Hero + mini bio + Breakthrough Prize + featured projects
/about          → About, Education, Awards, Certifications
/experience     → Full experience timeline
/projects       → Projects grid + Skills breakdown
/publications   → All publications
/contact        → Contact
/blog           → Blog list (unchanged)
/blog/[slug]    → Blog post (unchanged)
```

---

## Step 1 — Create new page files

Each file imports the existing section component(s) — no logic changes to the components themselves.

### `src/app/about/page.tsx`

```tsx
import About from "@/components/sections/About";

export const metadata = { title: "About — Arabinda Behera" };

export default function AboutPage() {
  return <About />;
}
```

### `src/app/experience/page.tsx`

```tsx
import Experience from "@/components/sections/Experience";

export const metadata = { title: "Experience — Arabinda Behera" };

export default function ExperiencePage() {
  return <Experience />;
}
```

### `src/app/projects/page.tsx`

Projects and Skills share this page — Projects first, Skills below.

```tsx
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export const metadata = { title: "Projects & Skills — Arabinda Behera" };

export default function ProjectsPage() {
  return (
    <>
      <Projects />
      <Skills />
    </>
  );
}
```

### `src/app/publications/page.tsx`

```tsx
import Publications from "@/components/sections/Publications";

export const metadata = { title: "Publications — Arabinda Behera" };

export default function PublicationsPage() {
  return <Publications />;
}
```

### `src/app/contact/page.tsx`

```tsx
import Contact from "@/components/sections/Contact";

export const metadata = { title: "Contact — Arabinda Behera" };

export default function ContactPage() {
  return <Contact />;
}
```

---

## Step 2 — Update `src/app/page.tsx` (slim home)

Replace the full section list with a minimal landing layout. Featured projects are a hardcoded subset — pick 2 from `PROJECTS` by index or add a `featured: true` flag to `data.ts`.

```tsx
import Hero from "@/components/sections/Hero";
import HomeFeatured from "@/components/sections/HomeFeatured";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeFeatured />
    </>
  );
}
```

### Create `src/components/sections/HomeFeatured.tsx`

This replaces the full About + Projects + Skills + Publications + Contact that used to be on the home page. It shows only a mini bio strip and 2 featured project cards.

```tsx
import Link from "next/link";
import { AWARDS, BIO, PROJECTS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";

const FEATURED = PROJECTS.slice(0, 2);

export default function HomeFeatured() {
  const prize = AWARDS.find((a) => a.title.includes("Breakthrough"));

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto space-y-24">

      {/* Mini bio + prize */}
      <FadeIn>
        <div className="max-w-2xl space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {BIO.split("\n\n")[0]}
          </p>
          {prize && (
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 px-4 py-1.5 text-sm text-yellow-500">
              🏆 {prize.year} {prize.title} · {prize.org}
            </div>
          )}
          <div className="flex gap-8 pt-2">
            {[
              { value: "15+", label: "Publications" },
              { value: "5+", label: "Years Engineering" },
              { value: "100s", label: "Citations" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Featured projects */}
      <div>
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
        <FadeInStagger className="grid md:grid-cols-2 gap-6">
          {FEATURED.map((project) => (
            <FadeInItem key={project.title}>
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>

    </section>
  );
}
```

---

## Step 3 — Update `src/components/layout/Navbar.tsx`

### 3a — Replace `NAV_LINKS`

Remove Skills as a separate link (it now lives under `/projects`). Switch all hrefs to page routes.

```tsx
const NAV_LINKS = [
  { label: "About",        href: "/about" },
  { label: "Experience",   href: "/experience" },
  { label: "Projects",     href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Blog",         href: "/blog" },
  { label: "Contact",      href: "/contact" },
];
```

### 3b — Remove `SECTION_IDS` and `IntersectionObserver`

Delete these entirely — they only worked on the home page scroll. Active state now comes purely from `usePathname`.

```tsx
// DELETE these lines:
const SECTION_IDS = ...

// DELETE this useEffect:
useEffect(() => {
  const observers: IntersectionObserver[] = [];
  SECTION_IDS.forEach(...);
  ...
}, []);

// DELETE this useEffect:
useEffect(() => {
  if (pathname !== "/") setActiveId("");
}, [pathname]);

// DELETE this state:
const [activeId, setActiveId] = useState("");
```

### 3c — Simplify `isActive` in both desktop and mobile maps

```tsx
const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
```

This handles `/blog/my-post` correctly highlighting the Blog link.

### 3d — Full cleaned-up Navbar for reference

```tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAME } from "@/lib/data";
import { ThemeToggle } from "../ui/theme-toggle";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",        href: "/about" },
  { label: "Experience",   href: "/experience" },
  { label: "Projects",     href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Blog",         href: "/blog" },
  { label: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

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

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors relative group ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`text-sm transition-colors ${
                      isActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
```

---

## Step 4 — Update Hero buttons

The "View Projects" button currently scrolls to `#projects`. Update it to navigate to `/projects`.

In `src/components/sections/Hero.tsx`, change:

```tsx
<Link href="#projects">View Projects</Link>
```

to:

```tsx
<Link href="/projects">View Projects</Link>
```

---

## Files Summary

| Action | File |
|---|---|
| Create | `src/app/about/page.tsx` |
| Create | `src/app/experience/page.tsx` |
| Create | `src/app/projects/page.tsx` |
| Create | `src/app/publications/page.tsx` |
| Create | `src/app/contact/page.tsx` |
| Create | `src/components/sections/HomeFeatured.tsx` |
| Modify | `src/app/page.tsx` — slim home |
| Modify | `src/components/layout/Navbar.tsx` — page routes, simplified active state |
| Modify | `src/components/sections/Hero.tsx` — update button href |
