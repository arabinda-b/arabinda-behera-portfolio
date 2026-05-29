# Stage 7 — Building the Sections

**Status:** Complete  
**Date:** 2026-05-29

## What You'll Learn

Component composition, reading from the data layer, Tailwind responsive grids, and the `asChild` pattern for polymorphic components.

---

## Overview

Seven section components, one file each in `src/components/sections/`. After all are created, we wire them into `src/app/page.tsx`.

Build them in order — each one introduces a new pattern.

---

## Step 1 — Create the folder

```bash
mkdir -p src/components/sections
```

---

## Section 1 — `src/components/sections/Hero.tsx`

**New pattern:** `asChild` — lets `<Button>` render as an `<a>` or `<Link>` without losing its styles.

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NAME, TAGLINE } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
        Hello, I am
      </p>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
        {NAME}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
        {TAGLINE}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button size="lg" asChild>
          <Link href="#projects">View Projects</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
}
```

> **Why `asChild`?** Normally `<Button>` renders a `<button>` element. With `asChild`, it passes all its styles to its child element instead — so `<Link>` gets button styles. This avoids invalid HTML like `<button><a>...</a></button>`.

---

## Section 2 — `src/components/sections/About.tsx`

**New pattern:** Deriving data from the data layer (`AWARDS.find()`), splitting a multi-paragraph string, stats grid.

```tsx
import { AWARDS, BIO, EDUCATION } from "@/lib/data";

export default function About() {
  const breakthroughPrize = AWARDS.find((a) =>
    a.title.includes("Breakthrough")
  );

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">About</h2>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left: Bio text */}
        <div className="space-y-4">
          {BIO.split("\n\n").map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Right: Prize + Stats + Education */}
        <div className="space-y-6">
          {breakthroughPrize && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-1">
                🏆 {breakthroughPrize.year}
              </p>
              <p className="font-semibold">{breakthroughPrize.title}</p>
              <p className="text-sm text-muted-foreground">
                {breakthroughPrize.org}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "15+", label: "Publications" },
              { value: "5+", label: "Years Engineering" },
              { value: "3000+", label: "ATLAS Collaborators" },
              { value: "100s", label: "Citations" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border p-4 text-center"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Education
            </h3>
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="space-y-0.5">
                <p className="font-medium text-sm">{edu.degree}</p>
                <p className="text-xs text-muted-foreground">
                  {edu.school} · {edu.period}
                </p>
                {edu.note && (
                  <p className="text-xs text-muted-foreground italic">
                    {edu.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Section 3 — `src/components/sections/Experience.tsx`

**New pattern:** The CSS vertical timeline trick using `border-l` and absolutely positioned dots.

```tsx
import { EXPERIENCES } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">Experience</h2>
      <div className="relative pl-6 space-y-12 border-l border-border ml-1.5">
        {EXPERIENCES.map((exp) => (
          <div key={`${exp.company}-${exp.period}`} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
              <div>
                <h3 className="font-semibold text-lg leading-tight">{exp.role}</h3>
                <p className="text-primary font-medium text-sm">{exp.company}</p>
              </div>
              <div className="md:text-right shrink-0">
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="text-xs text-muted-foreground">{exp.location}</p>
              </div>
            </div>

            <ul className="space-y-2">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary mt-0.5 shrink-0">▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

> **How the timeline works:** The parent `div` has `border-l` (a left border = the vertical line) and `pl-6` (padding so content clears the line). Each dot is `position: absolute` with a negative left value to sit on top of the border line.

---

## Section 4 — `src/components/sections/Projects.tsx`

**New pattern:** shadcn/ui `Card` composition with `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`.

```tsx
import { PROJECTS } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <Card key={project.title} className="flex flex-col">
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
        ))}
      </div>
    </section>
  );
}
```

---

## Section 5 — `src/components/sections/Skills.tsx`

**New pattern:** Iterating over grouped data, responsive CSS grid columns.

```tsx
import { SKILL_GROUPS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">Skills</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## Section 6 — `src/components/sections/Publications.tsx`

**New pattern:** `"use client"` for local toggle state, `useState` to show/hide items.

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { PUBLICATIONS, GOOGLE_SCHOLAR, ORCID, INSPIRE_HEP } from "@/lib/data";
import { Button } from "@/components/ui/button";

const SHOW_COUNT = 4;

export default function Publications() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? PUBLICATIONS : PUBLICATIONS.slice(0, SHOW_COUNT);

  return (
    <section id="publications" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Publications</h2>
          <p className="text-muted-foreground mt-1">
            {PUBLICATIONS.length}+ peer-reviewed papers · Hundreds of citations
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link href={GOOGLE_SCHOLAR} target="_blank" className="text-primary hover:underline">
            Google Scholar
          </Link>
          <Link href={INSPIRE_HEP} target="_blank" className="text-primary hover:underline">
            INSPIRE HEP
          </Link>
          <Link href={ORCID} target="_blank" className="text-primary hover:underline">
            ORCID
          </Link>
        </div>
      </div>

      <ol className="space-y-5 list-decimal list-inside marker:text-muted-foreground">
        {visible.map((pub) => (
          <li key={pub.url}>
            <Link
              href={pub.url}
              target="_blank"
              className="font-medium hover:text-primary transition-colors"
            >
              {pub.title}
            </Link>
            <span className="text-muted-foreground text-sm">
              {pub.collaboration ? ` — ${pub.collaboration},` : " —"}{" "}
              <em>{pub.journal}</em> ({pub.year})
            </span>
          </li>
        ))}
      </ol>

      <Button
        variant="outline"
        className="mt-8"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "Show fewer" : `Show all ${PUBLICATIONS.length} publications`}
      </Button>
    </section>
  );
}
```

---

## Section 7 — `src/components/sections/Contact.tsx`

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EMAIL, LINKEDIN, GITHUB, GOOGLE_SCHOLAR } from "@/lib/data";

const LINKS = [
  { label: "LinkedIn", href: LINKEDIN },
  { label: "GitHub", href: GITHUB },
  { label: "Google Scholar", href: GOOGLE_SCHOLAR },
  { label: "Email", href: `mailto:${EMAIL}` },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-10">
        Open to interesting conversations, collaborations, and opportunities.
        The best way to reach me is by email.
      </p>
      <Button size="lg" asChild className="mb-12">
        <a href={`mailto:${EMAIL}`}>Say Hello</a>
      </Button>
      <div className="flex flex-wrap gap-6 justify-center">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
```

---

## Step 2 — Wire everything into `src/app/page.tsx`

Replace the full contents of `src/app/page.tsx`:

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Publications from "@/components/sections/Publications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Publications />
      <Contact />
    </>
  );
}
```

---

## Step 3 — Add CardDescription to shadcn/ui

The `Projects` section uses `CardDescription`. If you get an import error, run:

```bash
npx shadcn@latest add card
```

This re-generates the card component with all sub-components included.

---

## Step 4 — Verify

Run `npm run build` — must pass with zero TypeScript errors.

Then `npm run dev` and check each section:
- Hero: name, tagline, two buttons
- About: bio, Breakthrough Prize gold card, 4 stats, education
- Experience: vertical timeline with 5 entries
- Projects: 2×2 card grid with tech badges
- Skills: 3-column badge grid grouped by category
- Publications: 4 shown, "Show all 12" button expands the list
- Contact: email button + 4 social links

Click the navbar links — they should smooth-scroll to each section.

---

## Key Concepts Learned

| Concept | Explanation |
|---|---|
| `asChild` | Passes component styles to a child element — avoids invalid nested HTML |
| CSS timeline trick | `border-l` on parent + absolute dots on children = vertical timeline with zero extra libraries |
| `list-decimal list-inside` | Tailwind classes for numbered lists — used in Publications |
| `md:grid-cols-2` | Responsive grid: 1 column on mobile, 2 on medium+ screens |
| `"use client"` for state | Publications needs `useState` for expand/collapse — requires client boundary |
| Fragment `<>...</>` | Render multiple root elements without a wrapping `<div>` |

---

## Next Stage

→ [Stage 8 — Framer Motion Animations](stage-08-animations.md)
