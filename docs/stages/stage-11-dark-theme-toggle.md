# Stage 11 — Dark Cosmic Theme + Light/Dark Toggle

## Overview

Replace the default shadcn neutral theme with a dark cosmic palette (deep navy background, electric cyan accent). Add a `next-themes` powered toggle button in the Navbar so users can switch between dark and light modes.

---

## Step 1 — Install `next-themes`

```bash
npm install next-themes
```

---

## Step 2 — Update `src/app/globals.css`

Replace the existing `:root` and `.dark` blocks with the following. `:root` is the light theme; `.dark` is the new cosmic dark theme.

### `:root` (light mode)

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.55 0.18 200);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.55 0.18 200);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.55 0.18 200);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.55 0.18 200);
}
```

### `.dark` (dark cosmic)

```css
.dark {
  --background: oklch(0.07 0.01 240);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.11 0.015 240);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.11 0.015 240);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.75 0.18 200);
  --primary-foreground: oklch(0.07 0.01 240);
  --secondary: oklch(0.15 0.02 240);
  --secondary-foreground: oklch(0.85 0 0);
  --muted: oklch(0.15 0.02 240);
  --muted-foreground: oklch(0.55 0.03 220);
  --accent: oklch(0.75 0.18 200);
  --accent-foreground: oklch(0.07 0.01 240);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 8%);
  --input: oklch(1 0 0 / 10%);
  --ring: oklch(0.75 0.18 200);
  --sidebar: oklch(0.11 0.015 240);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.75 0.18 200);
  --sidebar-primary-foreground: oklch(0.07 0.01 240);
  --sidebar-accent: oklch(0.15 0.02 240);
  --sidebar-accent-foreground: oklch(0.85 0 0);
  --sidebar-border: oklch(1 0 0 / 8%);
  --sidebar-ring: oklch(0.75 0.18 200);
}
```

**Color notes:**
- Background: near-black with a cool blue tint (`oklch(0.07 0.01 240)` ≈ `#050b12`)
- Primary / accent: electric cyan (`oklch(0.75 0.18 200)` ≈ `#00d4ff`)
- Borders: subtle white-alpha glow instead of hard gray lines
- Muted text: cool blue-tinted gray

---

## Step 3 — Create `src/components/providers/ThemeProvider.tsx`

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
```

---

## Step 4 — Update `src/app/layout.tsx`

- Remove `dark` from the `<html>` className (if previously hardcoded)
- Add `suppressHydrationWarning` to `<html>` — required because next-themes injects `class="dark"` client-side via a script before React hydrates, causing an attribute mismatch. This suppresses that warning safely on this element only.
- Wrap body contents with `ThemeProvider`

```tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// html tag:
<html lang="en" className="scroll-smooth" suppressHydrationWarning>

// body:
<body className={inter.className}>
  <ThemeProvider>
    <Navbar />
    <main className="pt-16">{children}</main>
    <Footer />
  </ThemeProvider>
</body>
```

---

## Step 5 — Create `src/components/ui/theme-toggle.tsx`

Always render `<button>` on both server and client to avoid element-type hydration mismatch. Only swap the icon inside after mount.

```tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {mounted ? (
        resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />
      ) : (
        <span className="w-4 h-4" />
      )}
    </button>
  );
}
```

> **Why this pattern:** `!resolvedTheme` returning `<div>` causes a tag mismatch — next-themes injects a script that makes `resolvedTheme` available immediately on the client during hydration, so the server (`<div>`) and client (`<button>`) differ. Keeping `<button>` constant and only toggling the icon inside avoids the mismatch. The `useEffect` block body avoids the "calling setState synchronously within an effect" lint warning.

---

## Step 6 — Update `src/components/layout/Navbar.tsx`

Import `ThemeToggle` and add it to the nav:

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Inside <nav>, after the <ul>:
<div className="flex items-center gap-3">
  <ThemeToggle />
</div>
```

---

## Files Changed

| File | Action |
|---|---|
| `src/app/globals.css` | Replace `:root` and `.dark` CSS variable blocks |
| `src/app/layout.tsx` | Wrap with `ThemeProvider`; remove hardcoded `dark` class |
| `src/components/providers/ThemeProvider.tsx` | Create — wraps `next-themes` |
| `src/components/ui/theme-toggle.tsx` | Create — Sun/Moon toggle button |
| `src/components/layout/Navbar.tsx` | Add `ThemeToggle` to nav |
| `package.json` | Add `next-themes` dependency |
