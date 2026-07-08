# Starfolio Agent Guidelines

This document provides operational rules for AI coding agents working on the Starfolio codebase. Follow these conventions to maintain consistency, performance, and the config-driven architecture.

---

## 1. Project Overview

| Property | Value |
|---|---|
| **Name** | Starfolio |
| **Framework** | Astro 6.2 |
| **UI Library** | React 19 (islands) |
| **Styling** | Tailwind CSS v4 |
| **Component System** | shadcn/ui (radix-luma style) |
| **Deployment** | Vercel (SSR via `@astrojs/vercel`) |
| **Package Manager** | `npm` |
| **Node Version** | >= 22.12.0 |

**Core Principle**: Starfolio is a **config-driven portfolio template**. All content (name, bio, work history, projects, skills) lives in `src/data/resume.tsx`. All site settings, SEO, and theme tokens live in `src/data/config.ts`. Components are generic shells that render data. **Never hardcode portfolio content into components.**

---

## 2. Directory Structure

```
├── src/
│   ├── data/
│   │   ├── config.ts          # Site settings, SEO, theme tokens, typography
│   │   └── resume.tsx         # All portfolio content (name, work, projects, skills, etc.)
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (Button, Card, Avatar, Tooltip, etc.)
│   │   │   └── svgs/          # Custom SVG React components for tech logos
│   │   ├── magicui/           # Animation primitives (BlurFade, Dock, FlickeringGrid)
│   │   ├── section/           # Page section components (WorkSection, ProjectsSection, etc.)
│   │   ├── mdx/               # MDX-specific components (CodeBlock, MediaContainer)
│   │   ├── icons.tsx          # Custom social/brand icon components
│   │   ├── navbar.tsx         # Floating dock navigation bar
│   │   ├── NavbarIsland.tsx   # React island wrapping ThemeProvider + TooltipProvider + Navbar
│   │   ├── HomePage.tsx       # Main landing page component (renders all sections)
│   │   ├── BlogList.tsx       # Blog listing with pagination
│   │   ├── mode-toggle.tsx    # Light/Dark theme toggle button
│   │   ├── theme-provider.tsx # next-themes provider wrapper
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro       # Root HTML shell, SEO meta, FOUC script, CSS variable injection
│   ├── pages/
│   │   ├── index.astro        # Home (prerendered)
│   │   ├── blog/
│   │   │   ├── index.astro    # Blog list (SSR, paginated)
│   │   │   └── [slug].astro   # Individual blog post
│   │   └── 404.astro          # Not found page
│   ├── content/
│   │   └── blog/              # MDX blog posts
│   ├── lib/
│   │   ├── utils.ts           # `cn()` (clsx + tailwind-merge), `formatDate()`
│   │   ├── pagination.ts      # Blog pagination helpers
│   │   └── remark-code-meta.ts # Custom remark plugin for code block metadata
│   ├── styles/
│   │   └── global.css         # Tailwind v4 imports, theme variables, prose overrides
│   ├── middleware.ts          # Security headers
│   ├── content.config.ts      # Astro Content Collections schema (blog)
│   └── mdx-components.tsx     # MDX component map
├── astro.config.mjs           # Astro config (integrations, adapter, markdown plugins)
├── components.json            # shadcn/ui configuration
├── vercel.json               # (Optional) Vercel deployment overrides
├── design.md                  # Visual design system reference (this project)
└── agents.md                  # This file
```

---

## 3. Config-Driven Architecture

### The Golden Rule
**Content changes must happen in data files, not in UI components.**

- **Portfolio content** → `src/data/resume.tsx` (`DATA` export)
  - Name, bio, avatar, social links, work history, education, projects, hackathons, photos, skills, navbar items, contact info.
- **Site settings** → `src/data/config.ts` (`CONFIG` export)
  - Site URL, locale, SEO templates, blog pagination size, typography scale, theme colors (light/dark), border radius.

### How Sections Work
`src/components/HomePage.tsx` defines a `sectionComponents` map. Each key matches a key in `DATA.sections`.

```tsx
const sectionComponents: Record<string, React.ReactNode> = {
  about: <section id="about">...</section>,
  work: <section id="work">...</section>,
  // ...
};
```

The component filters `DATA.sections` by `enabled: true`, sorts by `order`, and renders the matching component.

**To add a new section:**
1. Add entry to `DATA.sections` in `resume.tsx` with `order`, `enabled`, and any labels/headings.
2. Add the corresponding JSX to `sectionComponents` in `HomePage.tsx`.
3. Add any new data arrays (e.g., `DATA.talks`) to `resume.tsx`.
4. Ensure the section's `id` matches for anchor linking.

---

## 4. Component Patterns

### Astro vs React
| Use Case | Format | Hydration |
|---|---|---|
| Static shell, meta tags, layout | `.astro` | None |
| Interactive UI (dock, theme toggle, animations) | `.tsx` island | `client:load` or `client:only="react"` |
| Blog list with pagination | `.tsx` island | `client:load` |
| shadcn/ui primitives | `.tsx` | Island-level only |

### Hydration Directives
- `client:load` — Hydrate immediately on page load. Use for always-visible interactive elements (Navbar, Dock).
- `client:only="react"` — Skip server render entirely. Use for heavy client-only React trees (HomePage sections with BlurFade animations).
- **Do not** use `client:visible` unless the element is below the fold and heavy.

### shadcn/ui Conventions
- Components live in `src/components/ui/`.
- Use the `cn()` utility from `src/lib/utils.ts` for all conditional/merged classes:
  ```tsx
  className={cn("base-classes", condition && "conditional-class", className)}
  ```
- Follow the existing component structure: forward refs where appropriate, use `class-variance-authority` for variants (already set up in existing components like Button, Badge).

---

## 5. Styling Rules

### Tailwind CSS v4
This project uses Tailwind CSS v4. **Do not use v3 syntax.**

**Correct (v4):**
```css
@import "tailwindcss";
@import "tw-animate-css";
@theme inline {
  --color-background: var(--background);
  --font-sans: 'Outfit Variable', sans-serif;
}
```

**Incorrect (v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### CSS Variables
Theme tokens are injected as CSS variables via `Layout.astro`. Map them in `global.css` under `@theme inline`.

**Always use Tailwind utilities referencing the CSS vars:**
- `bg-background`, `text-foreground`, `border-border`
- `text-muted-foreground`, `bg-muted`
- `text-primary`, `bg-primary`

**Never use raw hex/OKLCH values in component classNames.** If a color needs to change, update `src/data/config.ts`.

### Prose Overrides
MDX/blog content uses the `prose` class. Overrides for prose elements live in `src/styles/global.css` under `@layer base`. Follow existing patterns for headings, code, blockquotes, tables, and task lists.

### Typography Scale
Font size scaling is controlled globally by `CONFIG.typography.baseFontSize` (default `115`). Do not use arbitrary pixel values for font sizes in components. Use Tailwind text utilities (`text-sm`, `text-base`, `text-xl`, etc.) which scale proportionally.

---

## 6. Theme System

### Dark Mode Implementation
Dark mode is **class-based** (`<html class="dark">`), controlled by `next-themes`.

**Critical rules:**
1. **FOUC Prevention**: `Layout.astro` contains an inline `<script is:inline>` that reads `localStorage.theme` and applies `.dark` **before first paint**. This script must never be removed or altered.
2. **`enableSystem: false`**: The `ThemeProvider` in `NavbarIsland.tsx` explicitly disables system preference detection. The theme is strictly user-controlled.
3. **Storage key**: `localStorage.theme` (values `"light"` or `"dark"`).

### Adding/Changing Colors
1. Edit `src/data/config.ts` → `CONFIG.theme.light` or `CONFIG.theme.dark`.
2. Use **OKLCH** format: `oklch(L C H)` or `oklch(L C H / alpha)`.
3. Ensure light and dark tokens have semantic parity (e.g., `background` in light should map to `background` in dark).
4. `Layout.astro` will auto-inject the new values on build.

---

## 7. Content (MDX / Blog)

### Content Collections
Blog posts use Astro Content Collections v3 with the `glob` loader.

- **Config**: `src/content.config.ts`
- **Schema** (Zod):
  ```ts
  z.object({
    title: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    author: z.string().optional(),
    summary: z.string(),
    image: z.string().optional(),
  })
  ```
- **Location**: `src/content/blog/*.mdx`

### Markdown Processing Pipeline
1. **Remark plugins**: `remarkGfm` (GitHub Flavored Markdown), `remarkCodeMeta` (custom metadata for code blocks)
2. **Rehype plugins**: `rehypePrettyCode` with Shiki (dual theme: `github-light` / `github-dark`)
3. **Syntax highlighting**: Disabled in Astro/MDX native (`syntaxHighlight: false`) to allow `rehypePrettyCode` to handle it.

### Adding a Blog Post
1. Create `src/content/blog/my-post.mdx`
2. Add frontmatter matching the schema above.
3. The post will be automatically picked up by `getCollection("blog")`.

---

## 8. Performance & Edge Constraints

- **Output mode**: `output: 'server'` in `astro.config.mjs`. All pages are server-rendered on Vercel serverless functions.
- **Adapter**: `@astrojs/vercel`. Node.js built-in modules (`fs`, `path`, etc.) are available on the server side, but avoid them in client/island code.
- **Prerendering**: Only `src/pages/index.astro` is prerendered (`export const prerender = true`). Blog pages are dynamic (SSR).
- **Bundle size**: Keep React islands lean. Use Astro components for static markup. Avoid heavy third-party JS in islands.
- **Images**: Store static assets in `/public/`. Astro does not optimize these automatically; consider using `astro:assets` if image optimization is needed in the future.

---

## 9. Security

Security headers are set in `src/middleware.ts` via Astro's middleware API:

```ts
response.headers.set("X-Content-Type-Options", "nosniff");
response.headers.set("X-Frame-Options", "DENY");
response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
```

**Rule**: When adding new headers, follow the same pattern in `middleware.ts`. Use `defineMiddleware` from `astro:middleware`.

---

## 10. Build & Deploy

### Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

### Deployment
- Target: Vercel (via Git integration or Vercel CLI).
- Config: Astro adapter `@astrojs/vercel` in `astro.config.mjs`.
- Optional overrides: `vercel.json` for custom headers, redirects, or rewrites.

---

## 11. Adding UI Components

### From shadcn/ui
Use the shadcn CLI (if available in environment) or manually add components following the existing pattern:
1. Place in `src/components/ui/`.
2. Use `cn()` for class merging.
3. Export from the file.
4. Import using the `@/components/ui/*` alias.

### Custom Components
1. **Reusable primitives** → `src/components/ui/`
2. **Page sections** → `src/components/section/`
3. **Animation effects** → `src/components/magicui/`
4. **MDX-specific** → `src/components/mdx/`

### SVG Icons
- UI icons: Use `lucide-react`.
- Brand/tech icons: Create React components in `src/components/ui/svgs/`.
- If a logo needs light/dark variants, create separate components (e.g., `ReactLight`, `ReactDark`).

---

## 12. Anti-patterns & Pitfalls

### Do NOT:
1. **Hardcode portfolio content** in `.tsx` or `.astro` files. Use `DATA` from `resume.tsx`.
2. **Modify the FOUC script** in `Layout.astro` unless fixing a genuine bug with theme flashing.
3. **Set `enableSystem: true`** in `ThemeProvider`. System theme detection is intentionally disabled.
4. **Use raw color values** (hex, rgb, OKLCH) in component `className`s. Always use the theme CSS variable utilities.
5. **Forget hydration directives** on new interactive React components inside `.astro` files. Without `client:load` or `client:only`, React islands won't hydrate.
6. **Use Node.js built-ins** in client/island code. This will break client-side bundles.
7. **Use `px` for font sizes**. Scale is controlled globally via `baseFontSize` config.
8. **Add arbitrary Tailwind values** (e.g., `w-[123px]`) for theme-adjacent properties. Extend the theme via `global.css` `@theme inline` if needed.
9. **Change `output: 'server'`** without understanding the adapter implications.
10. **Forget to add new sections** to both `DATA.sections` (with `order` and `enabled`) and `sectionComponents` in `HomePage.tsx`.

### Do:
1. Keep components generic and data-driven.
2. Use OKLCH for any new color tokens in `config.ts`.
3. Maintain semantic HTML and accessibility attributes.
4. Test both light and dark modes when changing styles.
5. Verify mobile layout when adding new sections.

---

## 13. Quick Reference

| Task | File(s) |
|---|---|
| Change name/bio/work history | `src/data/resume.tsx` |
| Change site URL/SEO/blog settings | `src/data/config.ts` |
| Change colors | `src/data/config.ts` → `CONFIG.theme` |
| Change fonts | Install package + edit `src/styles/global.css` |
| Add blog post | `src/content/blog/*.mdx` |
| Add new page section | `src/data/resume.tsx` (data) + `src/components/HomePage.tsx` (UI) |
| Add shadcn/ui component | `src/components/ui/` |
| Add custom icon | `src/components/ui/svgs/` or `src/components/icons.tsx` |
| Change security headers | `src/middleware.ts` |
| Change prose/blog styling | `src/styles/global.css` |
| Change animation timing | `src/components/HomePage.tsx` (`BLUR_FADE_DELAY`) |
