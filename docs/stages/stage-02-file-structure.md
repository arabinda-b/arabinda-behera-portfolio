# Stage 2 — Understand the File Structure & First Edit

**Status:** Complete  
**Date:** 2026-05-29

## What You'll Learn

App Router file conventions, how layouts wrap pages, hot reload, and your first Tailwind edit.

---

## Step 1 — Read These 3 Files (don't change yet)

Open each in your IDE and read them:

### `src/app/layout.tsx`
The root shell. Every page on the site is wrapped inside this. Think of it like a **base servlet filter in Java** — it runs for every request. Notice it imports the font and `globals.css`.

### `src/app/page.tsx`
The home route `/`. This is a **React Server Component** — it renders on the server and sends HTML to the browser. Zero JavaScript is shipped to the client from this file.

### `src/app/globals.css`
Three `@tailwind` directives load Tailwind's utility classes. The `:root` block defines CSS variables (colors) that shadcn/ui will use later.

---

## Step 2 — Replace `page.tsx`

Open `src/app/page.tsx` and **replace the entire contents** with:

```tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-5xl font-bold tracking-tight">
        Arabinda Behera
      </h1>
      <p className="text-xl text-muted-foreground">
        Software Engineer · Particle Physicist · AI Practitioner
      </p>
    </main>
  );
}
```

Save the file — the browser at `localhost:3000` should update **instantly** (hot reload, no manual refresh needed).

---

## Step 3 — Experiment with Tailwind

Try changing `text-5xl` to `text-7xl` and watch the heading grow.  
Try adding `text-red-500` to the `<h1>` className — it turns red immediately.

This is how Tailwind works: class names directly encode CSS values. No separate CSS file needed.

### Tailwind Classes Used Here

| Class | CSS equivalent |
|---|---|
| `flex flex-col` | `display: flex; flex-direction: column` |
| `items-center` | `align-items: center` |
| `justify-center` | `justify-content: center` |
| `min-h-screen` | `min-height: 100vh` |
| `text-5xl` | `font-size: 3rem` |
| `font-bold` | `font-weight: 700` |
| `tracking-tight` | tighter letter spacing |
| `gap-4` | `gap: 1rem` between flex children |
| `text-muted-foreground` | CSS variable gray color (defined in `globals.css`) |

---

## Step 4 — Understand the Layout / Children Relationship

Look at `layout.tsx` again. Notice the `{children}` prop:

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}   {/* ← your page.tsx output goes here */}
      </body>
    </html>
  );
}
```

Your `page.tsx` output is passed as `children`. The layout is the shell, the page is the content inside it. This nesting is how React composition works — and how Next.js builds every page on your site.

---

## Key Concepts Learned

| Concept | Explanation |
|---|---|
| App Router file conventions | `layout.tsx` = shell, `page.tsx` = route content |
| React Server Components (RSC) | Render on server, send HTML — no JS shipped to client by default |
| Hot Module Replacement (HMR) | Save a file → browser updates instantly, no refresh |
| Tailwind utility classes | CSS values as class names, no separate stylesheet |
| `{children}` composition | Layout wraps page content via the `children` prop |

---

## Next Stage

→ [Stage 3 — Install shadcn/ui and First Components](stage-03-shadcn-components.md)
