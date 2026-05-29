# Stage 3 — Install shadcn/ui and Add First Components

**Status:** Complete  
**Date:** 2026-05-29

## What You'll Learn

How component libraries work, CLI-driven code generation, Tailwind variants, and composing your first real UI piece.

---

## What is shadcn/ui?

Unlike traditional component libraries (Material UI, Ant Design) that ship pre-built components from `node_modules`, **shadcn/ui copies the component source code directly into your project**. You own the code — you can read it, modify it, and understand exactly how it works.

Each component is just TypeScript + Tailwind classes. No magic.

---

## Step 1 — Initialize shadcn/ui

Run this in your terminal:

```bash
npx shadcn@latest init
```

The CLI asks several questions. Here is what you will actually see and what to choose:

| Prompt | Choice | Why |
|---|---|---|
| **Component library** | **Radix UI** | Original and most documented foundation. "Base" is experimental — all community examples use Radix. |
| **Color preset** | **Luma** | Clean neutral palette. Options are Nova, Vega, Maia, Lyra, Mira, Luma, Sera, Rhea, Custom — Luma is the most neutral and works well for a professional dark portfolio. Presets only set initial CSS variables; you can change colors in `globals.css` at any time. |
| **Style** | Default | |
| **CSS variables** | Yes | Enables theming via CSS custom properties |

This creates/updates:

- `src/lib/utils.ts` — adds a `cn()` helper (merges Tailwind class names safely)
- `components.json` — shadcn/ui config file (records your choices for future `add` commands)
- Updates `globals.css` with CSS variable color tokens (e.g., `--background`, `--foreground`, `--primary`)

---

## Step 2 — Install Components

```bash
npx shadcn@latest add button card badge separator collapsible
```

Look at what appeared in `src/components/ui/`:

```
src/components/ui/
  button.tsx
  card.tsx
  badge.tsx
  separator.tsx
  collapsible.tsx
```

**Open `src/components/ui/button.tsx`** — read through it. Notice:

- It uses `cva()` (class variance authority) to define variants like `default`, `outline`, `ghost`
- The `cn()` utility merges class names without conflicts
- It's just a `<button>` element with styled variants — nothing proprietary

---

## Step 3 — Use Button and Badge in page.tsx

Replace the contents of `src/app/page.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-5xl font-bold tracking-tight">
        Arabinda Behera
      </h1>
      <p className="text-xl text-muted-foreground">
        Software Engineer · Particle Physicist · AI Practitioner
      </p>

      {/* Badge row — tech stack preview */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge>Next.js</Badge>
        <Badge variant="outline">TypeScript</Badge>
        <Badge variant="secondary">Tailwind CSS</Badge>
        <Badge>React</Badge>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-3">
        <Button>View Projects</Button>
        <Button variant="outline">Download Resume</Button>
      </div>
    </main>
  );
}
```

---

## Step 4 — Explore Variants

The `variant` prop changes the visual style without writing any CSS. Try these on the Button:

- `variant="default"` — filled primary color
- `variant="outline"` — border only
- `variant="ghost"` — invisible until hover
- `variant="destructive"` — red (for dangerous actions)

Try `size="lg"` and `size="sm"` on the buttons.

For Badge, try `variant="outline"` and `variant="secondary"`.

This pattern — **variants as props** — is how modern React component libraries work. Compare to CSS: instead of writing a new class for each style, you pass a prop.

---

## Step 5 — Understand the `cn()` Utility

Open `src/lib/utils.ts`. It exports:

```ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**Why does this exist?**  
Tailwind has a conflict problem: if you write `className="p-4 p-8"`, both classes get added but only one wins unpredictably. `twMerge` resolves conflicts — the last one always wins. You'll use `cn()` in every custom component you write.

---

## Key Concepts Learned


| Concept                             | Explanation                                                       |
| ----------------------------------- | ----------------------------------------------------------------- |
| shadcn/ui "copy into project" model | You own the component code — read it, modify it                   |
| Component variants                  | Style differences passed as props, not new CSS classes            |
| `cn()` utility                      | Safely merges Tailwind classes, resolves conflicts                |
| `@/` import alias                   | `@/components/ui/button` = `src/components/ui/button.tsx`         |
| `components.json`                   | shadcn/ui registry config — tells the CLI where to put components |


---

## Next Stage

→ [Stage 4 — TypeScript Data Layer](stage-04-data-layer.md)