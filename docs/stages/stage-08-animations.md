# Stage 8 — Framer Motion Animations

**Status:** Complete  
**Date:** 2026-05-29

## What You'll Learn

Animation libraries, `useInView` for scroll-triggered effects, the stagger pattern, variants, and how to keep Server Components clean by isolating animation into thin client wrappers.

---

## The Architecture Strategy

Framer Motion uses browser APIs, so any component using it needs `"use client"`. Rather than converting every section into a Client Component, we create **three small reusable wrappers** in `src/components/ui/fade-in.tsx` and import them into the sections. The sections themselves stay as Server Components — only the animation wrappers become client-side.

This is the "push client boundary down" pattern — a core Next.js App Router best practice.

---

## Step 1 — Install Framer Motion

```bash
npm install framer-motion
```

---

## Step 2 — Create `src/components/ui/fade-in.tsx`

This single file provides three components you'll use across all sections:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
```

**The three components:**


| Component       | Use case                                                                   |
| --------------- | -------------------------------------------------------------------------- |
| `FadeIn`        | Animates a single element into view. Optional `delay` prop for sequencing. |
| `FadeInStagger` | Parent wrapper — triggers children to animate in one after another.        |
| `FadeInItem`    | Child of `FadeInStagger` — inherits the stagger timing via `variants`.     |


**How `useInView` works:** Framer Motion watches the element using the browser's `IntersectionObserver`. When the element enters the viewport (minus the 80px margin), `isInView` becomes `true` and the animation runs. `once: true` means it only animates once, not every time you scroll past.

---

## Step 3 — Update `src/components/sections/Hero.tsx`

Replace with this version that staggers the name, tagline, and buttons on page load:

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NAME, TAGLINE } from "@/lib/data";
import { FadeIn } from "@/components/ui/fade-in";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <FadeIn delay={0.1}>
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
          Hello, I am
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          {NAME}
        </h1>
      </FadeIn>
      <FadeIn delay={0.3}>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
          {TAGLINE}
        </p>
      </FadeIn>
      <FadeIn delay={0.4}>
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
      </FadeIn>
    </section>
  );
}
```

---

## Step 4 — Update `src/components/sections/About.tsx`

Add a `FadeIn` wrapper around each column:

```tsx
import { AWARDS, BIO, EDUCATION } from "@/lib/data";
import { FadeIn } from "@/components/ui/fade-in";

export default function About() {
  const breakthroughPrize = AWARDS.find((a) =>
    a.title.includes("Breakthrough")
  );

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-12">About</h2>
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-12">
        <FadeIn delay={0.1}>
          <div className="space-y-4">
            {BIO.split("\n\n").map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
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
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
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
                    <p className="text-xs text-muted-foreground italic">{edu.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

---

## Step 5 — Update `src/components/sections/Experience.tsx`

Wrap each timeline entry in `FadeIn` with an index-based delay:

```tsx
import { EXPERIENCES } from "@/lib/data";
import { FadeIn } from "@/components/ui/fade-in";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
      </FadeIn>
      <div className="relative pl-6 space-y-12 border-l border-border ml-1.5">
        {EXPERIENCES.map((exp, index) => (
          <FadeIn key={`${exp.company}-${exp.period}`} delay={index * 0.1}>
            <div className="relative">
              <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />
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
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
```

---

## Step 6 — Update `src/components/sections/Projects.tsx`

Use `FadeInStagger` + `FadeInItem` so cards animate in one after another:

```tsx
import { PROJECTS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-12">Projects</h2>
      </FadeIn>
      <FadeInStagger className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
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
    </section>
  );
}
```

---

## Step 7 — Update `src/components/sections/Skills.tsx`

Same stagger pattern for skill groups:

```tsx
import { SKILL_GROUPS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-12">Skills</h2>
      </FadeIn>
      <FadeInStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SKILL_GROUPS.map((group) => (
          <FadeInItem key={group.category}>
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
          </FadeInItem>
        ))}
      </FadeInStagger>
    </section>
  );
}
```

---

## Step 8 — Verify

```bash
npm run build
npm run dev
```

Open `localhost:3000` and scroll slowly from top to bottom. You should see:

- Hero elements fade in sequentially on load (name → tagline → buttons)
- Each section heading fades up as you scroll to it
- Experience entries appear one after another as you scroll
- Project cards and skill groups stagger in with a cascading effect

---

## Key Concepts Learned


| Concept                     | Explanation                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| "Push client boundary down" | Keep sections as Server Components; only the thin animation wrapper is client-side                 |
| `useInView`                 | Uses `IntersectionObserver` under the hood — fires when element enters viewport                    |
| `once: true`                | Animation runs only the first time the element enters view, not on every scroll                    |
| `variants`                  | Named animation states (`hidden`/`visible`) passed down through the React tree — how stagger works |
| `staggerChildren`           | Parent variant sets a delay between each child's animation                                         |
| `delay` prop                | Manually sequences sibling elements (used in Hero, Experience)                                     |


---

## Next Stage

→ [Stage 9 — Blog with MDX](stage-09-blog-mdx.md)