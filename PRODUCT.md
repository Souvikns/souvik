# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary owner: Souvik De, the software engineer whose career this site presents. He maintains the site by editing a single config file.

Visitors: a mix of professional audiences — recruiters/hiring teams evaluating Souvik for roles, engineering leads and collaborators assessing his technical depth and open-source work, and clients/consulting prospects considering him for contract work. Their job is to verify his identity, skills, work history, and projects, and to decide whether to contact him.

## Product Purpose

A personal portfolio website that presents Souvik De's professional identity: name, location, description, work history, skills, projects, and a technical blog. Success means the right people find the site through search and social, can quickly verify Souvik's credibility and depth, and are moved to contact him via email, phone, or social links.

## Positioning

The site is entirely config-driven: every piece of content (name, bio, work history, projects, skills, navbar, contact info) lives in one data file (`src/data/resume.tsx`), and every site setting, SEO value, and theme token lives in another (`src/data/config.ts`). Components are generic shells that render data, so the portfolio is refreshed by editing configuration rather than markup. The credibility is carried by verified real-world evidence — AsyncAPI maintainership, Google Summer of Code mentorship, Postman, and XaneAI work — not by fabricated claims.

## Operating Context

- Deployed on Vercel via the `@astrojs/vercel` adapter (SSR). The home page is prerendered; blog pages are dynamic.
- Built with Astro 6.2, React 19 islands, Tailwind CSS v4, and shadcn/ui components. Node >= 22.
- Visitors browse a single-page home (About, Work Experience, Skills, Projects, Contact sections), a paginated blog index (10 posts per page), and individual MDX blog posts.
- Navigation is a floating dock with Home, Blog, and Resume links plus social shortcuts.
- Dark/light theme is user-controlled only (`enableSystem: false`), stored in `localStorage.theme`, applied class-based on `<html>` before first paint to prevent FOUC.
- Contact paths: email, phone, GitHub, LinkedIn.

## Capabilities and Constraints

- Config-driven architecture: portfolio content and site/theme settings never live in components. Content changes happen only in `src/data/resume.tsx` and `src/data/config.ts`.
- Theme tokens are OKLCH values injected as CSS variables from `CONFIG.theme`; components reference Tailwind utilities mapped to those variables, never raw color values.
- Global typography scale is set once via `CONFIG.typography.baseFontSize` (currently 115%) and applied to the `<html>` element.
- Blog uses Astro Content Collections v3 with a fixed frontmatter schema (title, publishedAt, summary, etc.) and a Shiki-based `rehype-pretty-code` pipeline.
- SEO: title template, robots meta, canonical URLs, OpenGraph, Twitter cards, and sitemap via `@astrojs/sitemap`.
- Security headers set in `src/middleware.ts` (nosniff, frame options, referrer policy, permissions policy).
- Known stale template defaults: `CONFIG.site.url` is still `https://alexmercer.dev` and `twitterHandle` is `@alexmercer_dev`, while the real site is `https://souvik.de`. This is an undecided/known-drift fact to reconcile in the data file.

## Brand Commitments

Personal brand only. The site represents Souvik De (`https://souvik.de`, GitHub `Souvikns`). "Starfolio" is the underlying template's package name, not the site's brand. No binding visual or naming constraint beyond presenting Souvik's identity.

## Evidence on Hand

- Real, current resume data in `src/data/resume.tsx`: work history (XaneAI, Postman, Mage), projects (Notion Board, Kitsu), skills, contact details, summary, and social links.
- Avatar at `/profile.png`, OG image at `/og_image.png`, favicon at `/favicon.svg`.
- Blog posts under `src/content/blog/*.mdx`.
- Commented-out example projects remain in `resume.tsx` as template placeholders and are not rendered; no fabricated testimonials, benchmarks, or claims exist, and future work must not fabricate them.

## Product Principles

1. **Config-driven content.** All content and theme changes happen in data files, never in components.
2. **Content-first, minimal presentation.** A neutral palette lets the owner's real work, images, and identity provide the color; presentation never competes with the content.
3. **Credibility through evidence.** The site surfaces verified professional history and open-source work, and must never invent claims.
4. **Performance and accessibility.** Astro static shells, lean React islands, semantic HTML, and high-contrast OKLCH neutrals keep the site fast and usable.
5. **A living professional record.** Work history, projects, and blog must stay accurate and current as Souvik's career evolves.