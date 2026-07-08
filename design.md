# Starfolio Design System

This document defines the visual language, interaction patterns, and content formatting rules for the Starfolio portfolio template. All design decisions are centralized via `src/data/config.ts` and `src/data/resume.tsx`.

---

## 1. Design Philosophy

- **Config-driven**: All content, site metadata, and theme tokens live in a single config file (`resume.tsx`) and a single theme file (`config.ts`). Components are generic shells that consume data.
- **Minimal & Content-first**: No decorative noise. Surfaces are clean, borders are subtle, and typography is highly legible. The focus is on the portfolio owner's content.
- **Performant**: Astro for static shells, React islands only where interactivity is needed (theme toggle, dock, animations).
- **Neutral Palette**: Achromatic OKLCH scales with no brand hue. The user's content (photos, project images, avatar) provides the color.

---

## 2. Color System

### Philosophy
The palette is strictly neutral (grayscale OKLCH). No accent colors are used for branding. Contrast is achieved through luminance, not saturation.

### Theme Tokens
All colors are defined as OKLCH values in `src/data/config.ts` under `CONFIG.theme.light` and `CONFIG.theme.dark`.

Key tokens:
| Token | Light Value | Dark Value | Usage |
|---|---|---|---|
| `background` | `oklch(1 0 0)` | `oklch(0.18 0 0)` | Page background |
| `foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Primary text |
| `card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Card backgrounds |
| `muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Subtle backgrounds |
| `muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | Secondary text, timestamps |
| `border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Dividers, card borders |
| `primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | Headings, active states |
| `secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Pill backgrounds |

### CSS Variable Injection
`src/layouts/Layout.astro` dynamically generates a `<style>` block from `CONFIG.theme` values. These are mapped to CSS custom properties (`--background`, `--foreground`, etc.) which are consumed by Tailwind's `@theme inline` in `src/styles/global.css`.

**Rule**: Never hardcode colors in components. Always reference Tailwind utilities (`bg-background`, `text-foreground`, `border-border`) or CSS variables.

---

## 3. Typography

### Font Families
| Role | Font | File | Config Location |
|---|---|---|---|
| Sans (Body & UI) | Outfit Variable | `@fontsource-variable/outfit` | `global.css` `--font-sans` |
| Mono (Code) | Geist Mono Variable | `@fontsource-variable/geist-mono` | `global.css` `--font-mono` |

### Base Sizing
Base font size is controlled by `CONFIG.typography.baseFontSize` (default: `115`). This is applied as a percentage on the `<html>` element in `Layout.astro`. This scales all rem-based text, spacing, and components proportionally.

### Heading Scale
Prose headings in MDX/blog are tightly tracked and sized:
| Level | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| H1 | `text-2xl` | `font-semibold` | `tracking-tight` | `leading-tight` |
| H2 | `text-xl` | `font-semibold` | `tracking-tight` | `leading-tight` |
| H3 | `text-lg` | `font-semibold` | `tracking-tight` | `leading-tight` |
| H4-H6 | `text-base` | `font-medium` | `tracking-tight` | `leading-tight` |

Section headings (e.g., "About", "Work Experience") use `text-xl font-bold`.
Hero text uses `text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter`.

---

## 4. Spacing & Layout

### Container
- Max width: `max-w-2xl` (672px)
- Horizontal padding: `px-6`
- Vertical padding: `py-12 sm:py-24` with `pb-24`

### Section Rhythm
- Gap between major sections: `gap-14`
- Internal section gaps: `gap-y-4` to `gap-y-6`

### Responsive Breakpoints
| Token | Value | Typical Use |
|---|---|---|
| `sm` | 640px | Text scaling (`sm:text-4xl`) |
| `md` | 768px | Layout shifts (`md:flex-row`, `md:order-1`) |

---

## 5. Surfaces & Shapes

### Border Radius
- Global radius: `0.625rem` (from `CONFIG.theme.radius`)
- Derived tokens: `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`
- Avatars: `rounded-full`
- Skill pills: `rounded-xl`
- Cards: `rounded-lg` (implied by shadcn/ui defaults)

### Borders & Rings
- Standard border: `border border-border`
- Ring usage for emphasis: `ring-2 ring-border` or `ring-2 ring-border/20`
- Avatar: `ring-4 ring-muted`
- Education/Work logos: `ring-2 ring-border`

### Shadows
- Minimal usage. Avatar uses `shadow-lg`.
- Generally prefer borders and background contrast over elevation shadows.

---

## 6. Animation & Motion

### Philosophy
Motion is subtle, staggered, and content-revealing. No jarring or overly playful animations.

### BlurFade / BlurFadeText
- The primary entrance animation for all sections and text.
- `BLUR_FADE_DELAY = 0.04` seconds.
- Each subsequent element increments its delay by multiples of this base value (e.g., `*3`, `*4`, `*5`...).
- Creates a cascading reveal effect as the user scrolls or loads the page.

### Hover Interactions
- Education/Work links: `ArrowUpRight` icon fades in and slides from `-translate-x-2` to `translate-x-0` on `group-hover`.
- Prose table rows: `hover:bg-accent/50` with `transition-colors`.
- Duration: `duration-200` for hover states.

### FlickeringGrid
- A canvas-based background animation in the page header.
- Uses `maskImage: linear-gradient(to bottom, black, transparent)` to fade into the page background.
- Positioned absolutely behind content (`z-0`).

---

## 7. Iconography

### UI Icons
- **Library**: [Lucide React](https://lucide.dev/)
- **Size**: Usually `h-4 w-4` (or `size-3` for project card links, `size-4` for skill pills)
- **Stroke width**: Default (2)

### Tech Stack / Brand Icons
- Custom SVG React components in `src/components/ui/svgs/`.
- Often have light and dark variants (e.g., `reactLight`, `reactDark`, `nextjsLogoLight`, `nextjsLogoDark`).
- Rendered as React components with `className` support.
- Usage: `<skill.icon className="size-4 ..." />`

### Social Icons
- Custom icons exported from `src/components/icons.tsx` (e.g., `Icons.github`, `Icons.x`, `Icons.linkedin`).

---

## 8. Responsive Behavior

### Hero Section
- Mobile: Avatar stacks on top (`order-1`), text below (`order-2`).
- Desktop (`md:`): Text left (`order-1`), Avatar right (`order-2`).
- Avatar size: `size-24` mobile, `md:size-32` desktop.

### General
- All major layout shifts happen at `md:`.
- Single-column layouts are the default; multi-column only at `md:` and above.

---

## 9. Content Formatting (MDX / Prose)

Blog posts and the About summary use Tailwind Typography (`prose`) with heavy custom overrides in `src/styles/global.css`.

### Code Blocks (Shiki)
- **Light theme**: `github-light`
- **Dark theme**: `github-dark`
- **Background**: Transparent (`bg-transparent!`). The editor background comes from the surrounding card/page.
- **Inline code**: `bg-muted/60 dark:bg-muted/40`, `border rounded-md`, `px-1.5 py-0.5`, `text-[13px]`, `font-mono`. No backtick pseudo-elements.
- **Font**: `font-mono!` for `pre` blocks, `leading-relaxed`.
- **Dual theme support**: `.shiki` uses `var(--shiki-light)` in light mode and `var(--shiki-dark)` in dark mode.

### Blockquotes
- Left border: `border-l-4 border-amber-500`
- Background: `bg-muted/50`
- Italic text, `pl-4`, `p-4`, `rounded-md rounded-l-none`.

### Tables
- Full width (`w-full`), border-collapse separate.
- Header cells: `bg-muted/50`, `font-semibold`, bottom border.
- Body cells: `text-muted-foreground`, `text-sm`, bottom border.
- Right borders on all cells except last column.
- Row hover: `hover:bg-accent/50`.

### Task Lists (GFM)
- Bullets removed (`list-none!`).
- Checkboxes aligned with `align-middle`.

### Links in Prose
- `text-primary`, `underline`, `underline-offset-4`.

---

## 10. Asset Guidelines

### Images
- **Avatar**: `/picofme.png`. Used in hero section with `AvatarImage`.
- **OG Image**: `/og_image.png`. Used for social sharing meta tags.
- **Photos**: `/photos/photo1.jpg` through `photo9.jpg`. Grid display, square aspect ratio assumed.
- **Project images**: WebP/PNG in `/public/`. Some projects use video instead of images.
- **Logos**: Education and work entries use external favicon URLs or generated avatars (e.g., `avatar.vercel.sh`).

### Favicon
- SVG: `/favicon.svg`
- ICO fallback: `/favicon.ico`

### Loading Strategy
- Images in hero and project cards use standard `img` tags or Astro-optimized images.
- Videos use standard `<video>` or external CDN links.

---

## 11. Dark Mode

- **Class-based**: `.dark` class on `<html>`.
- **Storage key**: `localStorage.theme` (values: `"light"`, `"dark"`).
- **System preference**: NOT used (`enableSystem={false}` in `ThemeProvider`).
- **FOUC prevention**: Inline script in `<Layout.astro>` runs before first paint to apply the correct class.
- **Toggle**: `ModeToggle` component (likely in `navbar.tsx` or related).

---

## 12. Accessibility

- Semantic HTML: `section`, `nav`, `main` used appropriately.
- ARIA hidden on decorative hover icons (`aria-hidden` on `ArrowUpRight`).
- Focus rings: Use `ring` and `ring-offset` utilities for keyboard navigation.
- `sr-only` classes for screen-reader-only labels where needed.
- Color contrast: OKLCH neutral scale ensures high contrast in both modes without WCAG violations on text/background pairs.

---

## 13. SEO / Meta

- Title template: `%s | %n` (page title | site name).
- Canonical URLs auto-generated from `Astro.url.href`.
- OpenGraph and Twitter cards populated from `DATA.name`, `DATA.description`, `DATA.ogImage`.
- Sitemap generated via `@astrojs/sitemap`.
