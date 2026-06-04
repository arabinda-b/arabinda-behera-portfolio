# Stage 12 — Navbar: Mobile Menu + Active Section Highlight

## Overview

- **Active section tracking** — nav link glows cyan with animated underline as you scroll into that section
- **Mobile hamburger menu** — slide-down drawer for small screens, closes on link click
- **Publications** added to nav links

---

## Step 1 — Replace `src/components/layout/Navbar.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAME } from "@/lib/data";
import { ThemeToggle } from "../ui/theme-toggle";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",        href: "/#about" },
  { label: "Experience",   href: "/#experience" },
  { label: "Projects",     href: "/#projects" },
  { label: "Skills",       href: "/#skills" },
  { label: "Publications", href: "/#publications" },
  { label: "Blog",         href: "/blog" },
  { label: "Contact",      href: "/#contact" },
];

// Use absolute hrefs (/#section) so links work from any route (e.g. /blog).
// Relative #section links resolve to /blog#section when on the blog page.
const SECTION_IDS = NAV_LINKS
  .filter((l) => l.href.startsWith("/#"))
  .map((l) => l.href.replace("/#", ""));

export default function Navbar() {
  const [scrolled, setScrolled]  = useState(false);
  const [activeId, setActiveId]  = useState("");
  const [menuOpen, setMenuOpen]  = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset activeId when navigating away from home (e.g. to /blog)
  useEffect(() => {
    if (pathname !== "/") setActiveId("");
  }, [pathname]);

  // IntersectionObserver — track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-lg tracking-tight hover:text-primary transition-colors"
        >
          {NAME.split(" ")[0]}
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("/#", "");
            const isActive = pathname === "/blog"
              ? link.href === "/blog"
              : activeId === id;
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
                  {/* Animated underline */}
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

        {/* Right side: theme toggle + hamburger */}
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
              const id = link.href.replace("/#", "");
              const isActive = activeId === id;
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

## Step 2 — Verify section IDs in page components

Each section component must have an `id` matching the nav links. Check that these are present:

| Component | Required `id` |
|---|---|
| `Hero.tsx` | `id="hero"` |
| `About.tsx` | `id="about"` |
| `Experience.tsx` | `id="experience"` |
| `Projects.tsx` | `id="projects"` |
| `Skills.tsx` | `id="skills"` |
| `Publications.tsx` | `id="publications"` |
| `Contact.tsx` | `id="contact"` |

---

## How it works

| Feature | Mechanism |
|---|---|
| Active section | `IntersectionObserver` on each `#section` — fires when element occupies the middle band of the viewport (`rootMargin: "-40% 0px -55% 0px"`) |
| Blog active state | `usePathname()` detects `/blog` route — highlights "Blog" link and clears `activeId` so no section link stays lit |
| Animated underline | `w-0 → w-full` width transition on an absolutely positioned `<span>`; always full-width when active |
| Mobile menu | `menuOpen` boolean toggles a drawer `div` below the navbar; `closeMenu` called on link click |
| Hamburger icon | Swaps `Menu` ↔ `X` from lucide-react (already installed via shadcn) |

---

## Files Changed

| File | Action |
|---|---|
| `src/components/layout/Navbar.tsx` | Full replacement — active states, mobile drawer, Publications link |
