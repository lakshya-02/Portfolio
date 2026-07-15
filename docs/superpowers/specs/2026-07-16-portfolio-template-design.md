# Portfolio Template — Design Spec

**Date:** 2026-07-16
**Status:** Approved
**Scope:** v1 template — placeholder content only, structure over content (per CLAUDE.md)

## Overview

A premium, dark-only portfolio template built as a reusable foundation. All displayed
content comes from typed data files so real content can replace placeholders later
without touching UI code. Bold, minimal, black-first aesthetic with hot pink as the
primary accent and electric blue used rarely as a secondary accent.

## Tech Stack

- **Next.js 15+ (App Router)** with TypeScript (strict mode)
- **Tailwind CSS v4** — CSS-first config, design tokens via `@theme` in `globals.css`
- **motion** (successor to framer-motion) — client motion primitives only
- **lucide-react** — icons
- **clsx + tailwind-merge** — `cn()` class-merging utility
- **next/font** — self-hosted fonts, zero external requests
- Deployment target: Vercel-ready static-first output (no deploy in v1)

## Routes

| Route | Rendering | Purpose |
|---|---|---|
| `/` | Static (Server Components) | Single-page home: Hero, About, Featured Projects, Skills, Experience, Contact CTA |
| `/projects` | Static | Full project listing |
| `/projects/[slug]` | SSG via `generateStaticParams` | Project detail (case-study placeholder) |
| `not-found` | Static | Styled 404 |

## Folder Structure

```
/app
  layout.tsx            — fonts, metadata, MotionConfig, skip link, Navbar/Footer
  page.tsx              — home, composes section components
  not-found.tsx         — styled 404
  /projects/page.tsx
  /projects/[slug]/page.tsx
/components
  /ui                   — Button, Badge, Card, SectionHeading, Container (pure, no data imports)
  /motion               — Reveal, StaggerGroup (client-only animation wrappers)
  /layout               — Navbar, Footer
  /sections             — Hero, About, FeaturedProjects, Skills, Experience, ContactCTA
/data                   — site.ts, projects.ts, skills.ts, experience.ts
/lib                    — types.ts, animations.ts, utils.ts (cn)
/app/globals.css        — Tailwind import + @theme tokens
```

**Boundaries:**
- `components/ui` are dumb primitives — props in, markup out; no knowledge of domain types.
- `components/sections` import from `/data` and compose `ui` + `motion` primitives.
- Sections are independently reorderable/removable in `page.tsx`.
- Server Components by default; `"use client"` only in `/components/motion` and Navbar
  (mobile menu state). Sections remain server-rendered and pass content as children
  into motion wrappers.

## Data Layer

All copy, project entries, skills, experience items, nav links, and social links live in
`/data` as typed constants. Contracts in `lib/types.ts`:

- `SiteConfig` — name, tagline, nav links, social links, contact email
- `Project` — slug, title, summary, description, tags, year, featured flag, links (placeholder `#`)
- `SkillGroup` — category label + list of skill names
- `ExperienceItem` — role, org, period, bullets (used for both work and education timeline)

Placeholder content throughout ("Project One", lorem-style text, dummy timeline).
No text hardcoded inside components — headings/labels come from data or props.

## Design Tokens (Tailwind `@theme`)

- `--color-background`: #000000 (dominant)
- `--color-surface`: ~#111113 (cards/panels), `--color-surface-raised`: ~#1A1A1D
- `--color-border`: ~#26262B subtle borders
- `--color-foreground`: near-white; `--color-muted`: light gray for secondary text
- `--color-accent`: hot pink (~#FF2D78) — CTAs, active states, focus rings, small highlights only; never large fills
- `--color-accent-blue`: electric blue (~#2D9CFF) — rare secondary highlights (badge variant, occasional icon)
- **Fonts:** Space Grotesk (headings — bold, geometric, confident) + Inter (body — readable), both via `next/font`
- Large heading scale, generous section padding (mobile-first, scaling up), mostly sharp corners with slight rounding on cards/buttons

## Components

- **Button** — primary (pink), ghost, icon variants; subtle hover glow/scale
- **Card** — elevated surface; hover lift + accent border
- **Badge** — tag pill (default + blue variant)
- **SectionHeading** — eyebrow label + large bold heading
- **Container** — max-width + responsive padding
- **Navbar** — sticky, minimal; anchor links to home sections + Projects link; mobile hamburger with fade/slide menu (client)
- **Footer** — social links, copyright/tagline
- **Reveal / StaggerGroup** — client motion wrappers: fade-in-up on scroll into view (`once: true`), staggered children (~0.08s)

## Animation Rules

- Central variants in `lib/animations.ts`; no ad-hoc animation definitions
- Scroll-reveal fades, staggered entrances, hover micro-interactions only
- No parallax, scroll-jacking, or looping/auto-playing motion
- Global `<MotionConfig reducedMotion="user">` — respects OS reduced-motion preference

## Accessibility

- Skip-to-content link, semantic landmarks (`header/nav/main/footer`), one `h1` per page
- Visible focus rings (accent pink), keyboard-navigable mobile menu
- Contrast: body text light-gray-on-black meets WCAG AA; pink accent reserved for
  large text/icons/borders where contrast allows

## Contact Section

Static UI only: styled form fields (name, email, message) with a no-op submit and note
that wiring comes later; social link icons (email, GitHub, LinkedIn placeholders → `#`).

## Responsiveness & Verification

- Mobile-first; grids collapse to single column; no horizontal scroll at any width
- Verify at 375 / 768 / 1024 / 1440 px
- Golden path check before completion: run dev server, scroll full home page, open a
  project detail page, exercise mobile nav, confirm reduced-motion behavior

## Out of Scope (v1)

Light mode, theme toggle, real content, contact form submission, CMS/MDX, analytics,
deployment, blog.
