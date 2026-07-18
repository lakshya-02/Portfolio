# CLAUDE.md — Agent & Project Guidelines

This file serves as the definitive guide for AI development assistants (like Claude) to understand, run, compile, and build upon Lakshya Singh's **XR & Game Developer Portfolio**.

---

## 🚀 Project & AI Journey Overview

This repository is a premium, high-performance, dark-only portfolio built to showcase the projects, skills, and professional experience of **Lakshya Singh** (XR & Game Developer).

### 🤖 The AI Development Transition
* **Phase 1: Codex & Antigravity (Gemini)**: Bootstrapped the initial workspace, established the structure of the Next.js App Router, configured the **Tailwind CSS v4** styling token layer in CSS, designed core static sections, defined rigid TypeScript models (`lib/types.ts`), and set up the static-first data-driven framework.
* **Phase 2: Shifting to Claude**: Transitioned to **Claude** for high-level reasoning, complex layout debugging, custom framer-motion (`motion`) animation behaviors, standalone VR/MR web performance optimizations (maintaining fast asset loads), high-fidelity media showcases, and polishing interactive components.

---

## 🛠️ Tech Stack & Tooling

* **Framework:** Next.js 15+ (App Router)
* **Runtime & UI Library:** React 19.x (Strict mode enabled)
* **Programming Language:** TypeScript (Strict type checks)
* **Styling Engine:** Tailwind CSS v4 (configured via `@theme` imports in CSS; zero raw hex codes inside React components)
* **Animation System:** `motion` (successor to Framer Motion v12.4.2+)
* **Icons:** Lucide React
* **Typography:** Google Fonts (`Sora` for display headers, `AR One Sans` for body copy) self-hosted via `next/font/google` to minimize layout shifts
* **Utility Utilities:** `clsx` and `tailwind-merge` combined into a unified `cn()` class merger

---

## 💻 Key Commands

Run the following commands in the workspace root directory:

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run dev` | Run Dev Server | Spins up local server at `http://localhost:3000` |
| `npm run build` | Compile / Build | Compiles production-ready build outputs (strictly static-first) |
| `npm run lint` | ESLint Check | Runs code linters to verify formatting and syntax rules |
| `npx tsc --noEmit` | Type Check | Validates TypeScript compliance without generating files |

---

## 📁 Repository Architecture & Folder Boundaries

```
/app
  layout.tsx            — Root styling variables, metadata, Navbar/Footer layouts
  page.tsx              — Home page (composes section wrappers)
  not-found.tsx         — Custom 404 page
  /projects
    page.tsx            — Full portfolio archive page
    /[slug]
      page.tsx          — Dynamic SSG routes for project case studies
/components
  /ui                   — Primitives (Button, Badge, Card, SectionHeading, TextMarquee, GlowOrbs)
  /motion               — Animation wrappers (Reveal, StaggerGroup)
  /layout               — Global Shell components (Navbar, Footer, SocialLinks)
  /sections             — Page layouts (Hero, About, FeaturedProjects, Skills, Experience, ContactCTA)
/data                   — Centralized content (site.ts, projects.ts, skills.ts, experience.ts)
/lib                    — Shared configuration (types.ts, animations.ts, utils.ts)
```

### 🧱 Component Boundaries & Separation of Concerns
1. **Strict Data/UI Boundary:** No user-facing strings or project descriptions are hardcoded inside components. All text, credentials, timelines, assets, and project data MUST be imported from `/data/` config files.
2. **Server-First Execution:** By default, all layout/section components are Server Components. 
3. **Client Component Boundaries (`"use client"`):** Restricted strictly to `/components/motion/` (animation hooks) and components managing UI state transitions, e.g., the mobile hamburger menu in `components/layout/Navbar.tsx`.

---

## 🎨 Styling, Design Signatures & Coding Standards

To maintain visual cohesion, adhere strictly to these constraints:

### 🌗 Theme & Colors (Strictly Dark-First)
Do **NOT** implement theme switching or light mode. Black is the dominant visual state.
* **Dominant Void:** `#000000` (`bg-void`)
* **Underlying Surfaces:** Panel `#101014` (`bg-panel`), Panel-Raised `#17171c` (`bg-panel-raised`)
* **Subtle Boundaries:** Lines `#24242b` (`border-line`)
* **Typography:** White ink `#f5f5f7` (`text-ink`), Muted ink `#9b9ba6` (`text-ink-muted`)
* **Brand Accents:** Neon Pink `#ff2e88` (`text-pink`, `bg-pink`) as primary accent, and Electric Blue `#38b6ff` (`text-blue`, `bg-blue`) as secondary accent

### 🖌️ Design Signature Marks
* **The Identity Mark:** A small pink square (`size-2 bg-pink`) precedes section eyebrows, acts as timeline/experience markers, and sits inside the navbar logo.
* **Hero Outline Typography:** Use the `.text-stroke` class to outline key words in headers.
* **The Pink Period:** All significant headers and tagline sentences end with a pink period: `<span className="text-pink">.</span>`.
* **Hairline Separation:** Use horizontal rules styled with `border-line` to demarcate page blocks.

### 🎬 Animation Principles
* Keep animations light, subtle, and UX-first. Avoid scroll-jacking or heavy 3D resource blocks that stutter on standalone Quest devices.
* Use the unified motion controls defined in `lib/animations.ts`.
* Restrict animations to scroll reveals, staggered child items, and button hovers.
* **Accessibility:** Ensure the parent wrapping container utilizes `<MotionConfig reducedMotion="user">` to respect user OS preferences.

---

## 🏆 Current Progress & Achievements

* **Completed Scaffolding:** Initialized Next.js 15 structure, Tailwind v4 compiler tools, and Google fonts integration.
* **Established Style Sheets:** Integrated dark-mode tokens, custom layout utility boundaries (`cn`), and glowing orb effects.
* **Data Integration Complete:** Fully populated `/data/` with Lakshya Singh's authentic credentials:
  - **Work Experience:** Internships at Proto Corp Pvt Ltd and SRM University-AP, leadership at Next Tech Lab.
  - **Key Projects:** ScanSpace (Quest 3 MR reconstruction), VR Car Driving Simulator, Treasure Hunt AR, WebAR Image Tracking, AR Maze, ILLegal Move, Unity UI Bridge.
  - **Technical Skills:** Category-wise classifications for Unity, Graphics pipelines, spatial APIs, tools, and languages.
* **Dynamic Routing:** Built responsive `/projects` listing and `/projects/[slug]` folder setups.

---

## 🗺️ Next Steps & Roadmap

1. **Case Study Enrichment:** Replace basic project markdown structures on `/projects/[slug]` pages with rich, image-based, media-centric UI boards.
2. **Interactive Elements:** Design and embed lightweight 3D/XR mock interactions (e.g., custom Three.js canvas modules or shader grids) directly on the landing page to echo Lakshya's XR developer persona.
3. **Rigorous Breakpoint Checks:** Verify layout fluidness across devices (collapsing multi-column grids to single column layouts, preventing horizontal overflows).
4. **Vercel Deployment Setup:** Connect git commits to automated static deployment structures.