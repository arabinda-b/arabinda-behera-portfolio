# Stage 9 — Blog with MDX

**Status:** In Progress  
**Date:** 2026-05-29

## What You'll Learn

MDX (Markdown + JSX), frontmatter parsing, dynamic routes in Next.js App Router, `generateStaticParams` for static generation, and the `@tailwindcss/typography` prose plugin.

---

## What is MDX?

MDX is Markdown that can contain React components. A blog post is a `.mdx` file with:
- **Frontmatter** — YAML metadata at the top (title, date, description, tags)
- **Markdown body** — standard Markdown that renders as HTML
- Optionally: imported React components inline

We store posts in `content/blog/` and read them at build time using Node's `fs` module. This is called **file-system based content** — no database, no CMS, just files.

---

## Step 1 — Install packages

```bash
npm install next-mdx-remote gray-matter @tailwindcss/typography
```

| Package | Purpose |
|---|---|
| `next-mdx-remote/rsc` | Compiles MDX strings into React on the server (RSC-compatible) |
| `gray-matter` | Parses YAML frontmatter from `.mdx` files |
| `@tailwindcss/typography` | Adds the `prose` class for beautiful article typography |

---

## Step 2 — Enable the typography plugin in `tailwind.config.ts`

Open `tailwind.config.ts` and update the `plugins` array:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
```

The `prose` class (from this plugin) automatically styles headings, paragraphs, lists, code blocks, and links inside an article — without writing a single CSS rule.

---

## Step 3 — Create `src/lib/blog.ts`

This utility reads `.mdx` files from `content/blog/` and parses their frontmatter:

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<PostMeta, "slug">) };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostContent(slug: string): string {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`Post not found: ${slug}`);
  return fs.readFileSync(filePath, "utf8");
}
```

> **Note:** `fs` only runs on the server (Node.js). This file is never sent to the browser — it's used in Server Components and `generateStaticParams` only.

---

## Step 4 — Create `src/app/blog/page.tsx`

The blog listing page:

```tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn>
        <h1 className="text-4xl font-bold mb-3">Writing</h1>
        <p className="text-muted-foreground mb-12">
          Thoughts on software engineering, AI, and the intersection of
          physics and code.
        </p>
      </FadeIn>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Coming soon.</p>
      ) : (
        <FadeInStagger className="space-y-6">
          {posts.map((post) => (
            <FadeInItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </FadeInItem>
          ))}
        </FadeInStagger>
      )}
    </main>
  );
}
```

---

## Step 5 — Create `src/app/blog/[slug]/` folder and `page.tsx`

First make the folder:

```bash
mkdir -p src/app/blog/slug
```

Then create `src/app/blog/[slug]/page.tsx`:

> **Important:** The folder name must be literally `[slug]` with the square brackets — that's Next.js dynamic route syntax. The brackets tell Next.js this segment is a variable, not a fixed path.

```tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { getAllPosts, getPostContent } from "@/lib/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  let source: string;
  try {
    source = getPostContent(params.slug);
  } catch {
    notFound();
  }

  const { content, data } = matter(source);

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Back to Writing
      </Link>
      <p className="text-xs text-muted-foreground mb-2">
        {new Date(data.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div className="flex flex-wrap gap-2 mb-12">
        {data.tags?.map((tag: string) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
```

**Key concepts here:**

| Concept | Explanation |
|---|---|
| `[slug]` folder | Dynamic route — `params.slug` captures whatever is in the URL at that position |
| `generateStaticParams` | Tells Next.js which slugs exist at build time → generates static HTML for each post |
| `MDXRemote` from `/rsc` | Compiles MDX on the server — no JavaScript sent to browser for rendering |
| `prose` class | `@tailwindcss/typography` — styles all the article HTML automatically |
| `dark:prose-invert` | Inverts prose colors in dark mode |
| `notFound()` | Next.js built-in — returns a 404 response if the post file doesn't exist |

---

## Step 6 — Create `content/blog/` and your first post

```bash
mkdir -p content/blog
```

Create `content/blog/from-cern-to-oracle.mdx`:

```mdx
---
title: "From CERN to Oracle: What Particle Physics Taught Me About Software Engineering"
date: "2026-05-29"
description: "How designing High-Level Triggers for the LHC prepared me for building distributed systems at enterprise scale."
tags: ["career", "physics", "software-engineering", "AI"]
---

When I tell people I spent years analyzing particle collisions at CERN before joining Oracle as a software engineer, the reaction is usually some version of "that's a weird pivot." But the more I've worked in production engineering, the more I see the same patterns everywhere — just at different scales.

## The Scale Problem Is the Same

At CERN's ATLAS experiment, the LHC produces about 40 million proton-proton collisions per second. The detector generates roughly 60 terabytes of raw data every second. You cannot store or process all of it. The **High-Level Trigger** system — which I worked on — had microseconds to decide which collisions were "interesting" enough to save.

That's a real-time distributed systems problem with brutal latency constraints.

At Oracle, I work on Release Engineering pipelines that orchestrate thousands of build and deployment jobs across enterprise software. The constraint is different (not microseconds), but the core challenge is the same: how do you process massive throughput reliably, with intelligent filtering, and without losing the events that actually matter?

The mental models transfer almost exactly.

## Statistical Rigor Belongs in Production

Physics taught me to be obsessive about uncertainty. Every measurement comes with error bars. Every claim needs to be reproducible. Every result needs to survive scrutiny from 3,000 collaborators who are actively trying to find a flaw in your analysis.

Software engineering often lacks this culture. Systems get built, they "work," and assumptions get baked in. When something breaks in production, the debugging is often less rigorous than it could be.

The habit of asking "what are the failure modes?" and "how would I know if this was wrong?" — that's physics thinking, and it makes me a better engineer.

## Deep Learning Was Already in My Toolkit

One of my PhD projects involved training Variational Autoencoders (VAEs) and Generative Adversarial Networks (GANs) to simulate photon showers in the ATLAS electromagnetic calorimeter — replacing an expensive simulation (GEANT4) with a neural network that ran 100x faster.

This was 2019–2020. The techniques I learned then — generative modeling, distribution matching, evaluating simulation fidelity — are exactly the techniques powering enterprise AI today. When I built a RAG system at Oracle using vector embeddings and similarity search, it felt like a direct extension of the same thinking.

The tools changed. The ideas didn't.

## What I'd Tell My Past Self

The transition from physics to software engineering is smaller than it looks. The skills that made you a good physicist — handling ambiguity, debugging at scale, building systems that actually work, communicating technical results clearly — are the same skills that make a good software engineer.

The syntax is different. The domain is different. The core discipline is identical.
```

---

## Step 7 — Verify

```bash
npm run build
npm run dev
```

Check:
- `localhost:3000/blog` — shows the post card with title, date, description, tags
- `localhost:3000/blog/from-cern-to-oracle` — renders the full article with styled prose
- Click "← Back to Writing" — returns to the list
- Click "Blog" in the navbar — navigates to `/blog`

---

## Key Concepts Learned

| Concept | Explanation |
|---|---|
| MDX | Markdown + React components in one file |
| Frontmatter | YAML block at the top of a file — `gray-matter` extracts it as a JS object |
| `fs` module | Node.js file system — only available server-side, perfect for reading content files |
| `[slug]` dynamic route | Square brackets = URL parameter. `params.slug` = the actual value from the URL |
| `generateStaticParams` | Pre-generates static HTML at build time for all known slugs — fast, SEO-friendly |
| `prose` + `dark:prose-invert` | Typography plugin handles all article styling — headings, code, lists, links |

---

## Next Stage

→ [Stage 10 — Deployment to Vercel](stage-10-deployment.md)
