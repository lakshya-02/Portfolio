# Portfolio Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium dark-only portfolio template (Next.js App Router) with all placeholder content in typed data files, per `docs/superpowers/specs/2026-07-16-portfolio-template-design.md`.

**Architecture:** Static-first Next.js 15 App Router site. Server Components everywhere except small client motion wrappers and the Navbar. All copy lives in `/data` typed by `lib/types.ts`. Tailwind v4 `@theme` tokens carry the entire visual system.

**Tech Stack:** Next.js 15+, TypeScript (strict), Tailwind CSS v4, `motion` (framer-motion successor), lucide-react, clsx + tailwind-merge.

**Design signature (apply consistently, do not improvise):** a small pink square (`size-2 bg-pink`) is the identity mark — it appears in the nav logo, before every section eyebrow, and as timeline markers. Hero headline has one stroke-outlined word (`.text-stroke`) and sentences end with a pink period (`<span className="text-pink">.</span>`). Sections are separated by hairline rules (`border-line`).

## Global Constraints

- Next.js 15+ App Router; TypeScript `strict: true`; no `src/` dir; import alias `@/*`
- Tailwind CSS v4 — all colors/fonts via `@theme` tokens in `app/globals.css`; components never use raw hex values
- Dark-only: no light mode, no theme toggle, no `prefers-color-scheme` handling
- Tokens (exact): background `#000000`, panel `#101014`, panel-raised `#17171c`, line `#24242b`, ink `#f5f5f7`, ink-muted `#9b9ba6`, pink `#ff2e88`, blue `#38b6ff`
- Fonts: Space Grotesk (display) + Inter (body) via `next/font/google`, exposed as `--font-display` / `--font-body`
- All rendered copy comes from `/data` files or props — never hardcoded in components (exception: `aria-label` strings)
- Server Components by default; `"use client"` ONLY in `components/motion/*` and `components/layout/Navbar.tsx`
- Motion: scroll-reveal fades + stagger + hover micro-interactions only; NO parallax, NO looping/auto-playing animation, NO scroll-jacking; global `<MotionConfig reducedMotion="user">`
- Accessibility: skip link, `header/nav/main/footer` landmarks, exactly one `h1` per page, `focus-visible` pink outlines, WCAG AA body contrast
- No horizontal scrolling at 375–1440 px widths
- Placeholder content only ("Project One" style names, dummy copy)
- **Verification approach:** this template has no business logic (presentational markup + trivial data selectors), so there is no unit-test framework (YAGNI). The per-task gate is `npx tsc --noEmit` + `npm run build` succeeding, plus browser checks where noted. Task 11 is the full golden-path verification.

---

### Task 1: Scaffold project, theme tokens, fonts, base layout

**Files:**
- Create: entire Next.js scaffold at repo root (via create-next-app)
- Replace: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Delete: `public/*.svg` boilerplate

**Interfaces:**
- Produces: Tailwind token classes used by every later task: `bg-void`, `bg-panel`, `bg-panel-raised`, `border-line`, `text-ink`, `text-ink-muted`, `text-pink`, `text-blue`, `bg-pink`, `bg-blue`, `font-display`, `font-body`; utility class `.text-stroke`; CSS vars `--font-space-grotesk`, `--font-inter`.

- [ ] **Step 1: Move non-scaffold files aside** (create-next-app refuses non-allowlisted files; `.git` is allowlisted and stays)

```bash
cd /c/Users/Lakshya/Desktop/pf2
mkdir -p ../pf2-keep
mv CLAUDE.md docs ../pf2-keep/
```

- [ ] **Step 2: Scaffold Next.js**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```

Expected: "Success!" — creates `app/`, `package.json`, `tsconfig.json`, `.gitignore`, etc. It must NOT re-init git (existing `.git` detected).

- [ ] **Step 3: Restore project files**

```bash
mv ../pf2-keep/CLAUDE.md ../pf2-keep/docs .
rmdir ../pf2-keep
```

- [ ] **Step 4: Install dependencies**

```bash
npm install motion lucide-react clsx tailwind-merge
```

- [ ] **Step 5: Delete boilerplate assets**

```bash
rm -f public/*.svg
```

- [ ] **Step 6: Replace `app/globals.css` entirely with:**

```css
@import "tailwindcss";

@theme {
  --color-void: #000000;
  --color-panel: #101014;
  --color-panel-raised: #17171c;
  --color-line: #24242b;
  --color-ink: #f5f5f7;
  --color-ink-muted: #9b9ba6;
  --color-pink: #ff2e88;
  --color-blue: #38b6ff;

  --font-display: var(--font-space-grotesk), sans-serif;
  --font-body: var(--font-inter), sans-serif;
}

::selection {
  background: var(--color-pink);
  color: #000000;
}

.text-stroke {
  -webkit-text-stroke: 1.5px var(--color-ink);
  color: transparent;
}

@supports not (-webkit-text-stroke: 1px #000) {
  .text-stroke {
    color: var(--color-ink);
  }
}
```

- [ ] **Step 7: Replace `app/layout.tsx` entirely with:**

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio template",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-void font-body text-ink antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Replace `app/page.tsx` entirely with this temporary smoke-test page** (replaced in Task 6):

```tsx
export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="font-display text-5xl font-bold">
        Portfolio<span className="text-pink">.</span>
      </h1>
    </main>
  );
}
```

- [ ] **Step 9: Verify**

Run: `npx tsc --noEmit` — Expected: no output (exit 0). Confirm `"strict": true` in `tsconfig.json`.
Run: `npm run build` — Expected: `✓ Compiled successfully` and route table showing `○ /` (static).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 with Tailwind v4 theme tokens and fonts"
```

---

### Task 2: Types, cn utility, data layer

**Files:**
- Create: `lib/types.ts`, `lib/utils.ts`, `data/site.ts`, `data/projects.ts`, `data/skills.ts`, `data/experience.ts`

**Interfaces:**
- Produces:
  - `lib/utils.ts`: `cn(...inputs: ClassValue[]): string`
  - `lib/types.ts`: `SectionMeta`, `NavLink`, `SocialIconId`, `SocialLink`, `SiteConfig`, `Project`, `SkillGroup`, `ExperienceItem`
  - `data/site.ts`: `siteConfig: SiteConfig`
  - `data/projects.ts`: `projects: Project[]`, `getFeaturedProjects(): Project[]`, `getProjectBySlug(slug: string): Project | undefined`
  - `data/skills.ts`: `skillGroups: SkillGroup[]`
  - `data/experience.ts`: `experienceItems: ExperienceItem[]`

- [ ] **Step 1: Create `lib/utils.ts`:**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create `lib/types.ts`:**

```ts
export interface SectionMeta {
  eyebrow: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type SocialIconId = "github" | "linkedin" | "mail" | "twitter";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconId;
}

export interface SiteConfig {
  name: string;
  role: string;
  headline: string;
  headlineAccent: string;
  tagline: string;
  availability: string;
  email: string;
  footerNote: string;
  skipToContent: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  heroCtas: { primary: NavLink; secondary: NavLink };
  sections: {
    about: SectionMeta;
    projects: SectionMeta;
    skills: SectionMeta;
    experience: SectionMeta;
    contact: SectionMeta;
  };
  about: { intro: string; body: string[] };
  projectsCta: NavLink;
  projectsPage: SectionMeta;
  projectDetail: { back: string; live: string; source: string };
  contact: {
    body: string;
    formNote: string;
    fields: { name: string; email: string; message: string; submit: string };
  };
  notFound: { title: string; body: string; cta: string };
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  tags: string[];
  year: string;
  featured: boolean;
  links: { live: string; source: string };
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  kind: "work" | "education";
  bullets: string[];
}
```

- [ ] **Step 3: Create `data/site.ts`:**

```ts
import type { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  name: "Your Name",
  role: "Software Engineer",
  headline: "Building bold digital products with",
  headlineAccent: "intent",
  tagline:
    "Placeholder tagline — a short statement about the work you do, who you do it for, and the standard you hold it to.",
  availability: "Available for new projects",
  email: "hello@example.com",
  footerNote: "© 2026 Your Name — a portfolio template awaiting real content.",
  skipToContent: "Skip to content",
  navLinks: [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
  socialLinks: [
    { label: "GitHub", href: "#", icon: "github" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
  ],
  heroCtas: {
    primary: { label: "View projects", href: "/projects" },
    secondary: { label: "Get in touch", href: "/#contact" },
  },
  sections: {
    about: { eyebrow: "About", title: "A short introduction." },
    projects: { eyebrow: "Projects", title: "Selected work." },
    skills: { eyebrow: "Skills", title: "Tools of the trade." },
    experience: { eyebrow: "Experience", title: "Where I've been." },
    contact: { eyebrow: "Contact", title: "Let's build something." },
  },
  about: {
    intro:
      "Placeholder pull-quote: one confident sentence about the kind of problems you love to solve and why.",
    body: [
      "Placeholder paragraph one. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Describe your background, your craft, and what drives the work — two or three sentences at most.",
      "Placeholder paragraph two. Sed do eiusmod tempor incididunt ut labore. A second short paragraph for values, approach, or what you're exploring right now.",
    ],
  },
  projectsCta: { label: "View all projects", href: "/projects" },
  projectsPage: { eyebrow: "Archive", title: "All projects." },
  projectDetail: {
    back: "All projects",
    live: "Visit live site",
    source: "View source",
  },
  contact: {
    body: "Placeholder invitation — say how you like to be contacted and what kinds of projects or roles you're open to.",
    formNote:
      "This form is a placeholder. Submission wiring is added when the template gets real content.",
    fields: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
    },
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved. Head back to the start.",
    cta: "Back home",
  },
};
```

- [ ] **Step 4: Create `data/projects.ts`:**

```ts
import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary:
      "Placeholder summary — a flagship product case study described in a single confident sentence.",
    description: [
      "Placeholder paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Describe the problem this project solved, who it served, and the constraints that shaped it.",
      "Placeholder paragraph. Ut enim ad minim veniam, quis nostrud exercitation. Describe the approach, the architecture, and one decision you would defend in a review.",
      "Placeholder paragraph. Duis aute irure dolor in reprehenderit. Close with the outcome — what shipped, what improved, and what you would do differently.",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2026",
    featured: true,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-two",
    title: "Project Two",
    summary:
      "Placeholder summary — a developer tool that made a slow workflow fast.",
    description: [
      "Placeholder paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Frame the workflow pain and the people who felt it.",
      "Placeholder paragraph. Excepteur sint occaecat cupidatat non proident. Outline the implementation and the trade-offs taken.",
    ],
    tags: ["Rust", "CLI", "Developer Tools"],
    year: "2026",
    featured: true,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-three",
    title: "Project Three",
    summary:
      "Placeholder summary — a design system that unified a fragmented product surface.",
    description: [
      "Placeholder paragraph. Sed ut perspiciatis unde omnis iste natus error. Describe the fragmentation and its cost.",
      "Placeholder paragraph. Nemo enim ipsam voluptatem quia voluptas. Describe the token system, components, and adoption path.",
    ],
    tags: ["React", "Design Systems", "Storybook"],
    year: "2025",
    featured: true,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-four",
    title: "Project Four",
    summary:
      "Placeholder summary — a realtime dashboard for a data-heavy operations team.",
    description: [
      "Placeholder paragraph. At vero eos et accusamus et iusto odio. Describe the data volume and latency requirements.",
      "Placeholder paragraph. Et harum quidem rerum facilis est. Describe the streaming pipeline and rendering strategy.",
    ],
    tags: ["React", "WebSockets", "D3"],
    year: "2025",
    featured: false,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-five",
    title: "Project Five",
    summary:
      "Placeholder summary — a mobile-first commerce experiment with sharp conversion goals.",
    description: [
      "Placeholder paragraph. Temporibus autem quibusdam et aut officiis. Describe the hypothesis and the metric that mattered.",
      "Placeholder paragraph. Itaque earum rerum hic tenetur a sapiente. Describe what the experiment proved or disproved.",
    ],
    tags: ["Next.js", "Stripe", "A/B Testing"],
    year: "2024",
    featured: false,
    links: { live: "#", source: "#" },
  },
  {
    slug: "project-six",
    title: "Project Six",
    summary:
      "Placeholder summary — an open-source library with a small API and strong opinions.",
    description: [
      "Placeholder paragraph. Nam libero tempore, cum soluta nobis est. Describe the gap in the ecosystem it filled.",
      "Placeholder paragraph. Omnis voluptas assumenda est, omnis dolor repellendus. Describe the API design and community response.",
    ],
    tags: ["TypeScript", "Open Source", "npm"],
    year: "2024",
    featured: false,
    links: { live: "#", source: "#" },
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
```

- [ ] **Step 5: Create `data/skills.ts`:**

```ts
import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "PostgreSQL", "Redis", "REST", "GraphQL"],
  },
  {
    category: "Languages",
    skills: ["TypeScript", "Python", "Rust", "SQL"],
  },
  {
    category: "Tools",
    skills: ["Git", "Docker", "CI/CD", "Vercel", "Linux"],
  },
  {
    category: "Design",
    skills: ["Figma", "Design Systems", "Prototyping", "Typography"],
  },
  {
    category: "Practices",
    skills: ["Accessibility", "Performance", "Testing", "Code Review"],
  },
];
```

- [ ] **Step 6: Create `data/experience.ts`:**

```ts
import type { ExperienceItem } from "@/lib/types";

export const experienceItems: ExperienceItem[] = [
  {
    role: "Senior Placeholder Engineer",
    org: "Dummy Company A",
    period: "2024 — Present",
    kind: "work",
    bullets: [
      "Placeholder bullet — led a cross-functional effort described in one concrete, outcome-shaped sentence.",
      "Placeholder bullet — shipped a system or feature with a measurable placeholder result.",
    ],
  },
  {
    role: "Placeholder Engineer",
    org: "Dummy Company B",
    period: "2022 — 2024",
    kind: "work",
    bullets: [
      "Placeholder bullet — owned a service, product area, or platform capability.",
      "Placeholder bullet — improved something by a placeholder percentage.",
    ],
  },
  {
    role: "Junior Placeholder Developer",
    org: "Dummy Startup C",
    period: "2021 — 2022",
    kind: "work",
    bullets: [
      "Placeholder bullet — built and maintained features across the stack.",
    ],
  },
  {
    role: "B.Tech in Placeholder Studies",
    org: "Sample University",
    period: "2017 — 2021",
    kind: "education",
    bullets: [
      "Placeholder bullet — coursework, thesis, or activities worth one line.",
    ],
  },
];
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit` — Expected: no output (exit 0).

- [ ] **Step 8: Commit**

```bash
git add lib data
git commit -m "feat: add typed data layer with placeholder content"
```

---

### Task 3: Motion primitives and MotionConfig

**Files:**
- Create: `lib/animations.ts`, `components/motion/MotionProvider.tsx`, `components/motion/Reveal.tsx`, `components/motion/StaggerGroup.tsx`
- Modify: `app/layout.tsx` (wrap body content in `MotionProvider`)

**Interfaces:**
- Consumes: nothing from earlier tasks (self-contained)
- Produces:
  - `MotionProvider({ children: ReactNode })` — client wrapper adding `<MotionConfig reducedMotion="user">`
  - `Reveal({ children, className?, delay? }: { children: ReactNode; className?: string; delay?: number })` — fade-in-up on scroll into view, animates once
  - `StaggerGroup({ children, className? })` and `StaggerItem({ children, className? })` — staggered child reveals (~0.08 s)
  - `lib/animations.ts`: `staggerContainer: Variants`, `staggerItem: Variants`

- [ ] **Step 1: Create `lib/animations.ts`:**

```ts
import type { Variants } from "motion/react";

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
```

- [ ] **Step 2: Create `components/motion/MotionProvider.tsx`:**

```tsx
"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

- [ ] **Step 3: Create `components/motion/Reveal.tsx`:**

```tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Create `components/motion/StaggerGroup.tsx`:**

```tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Modify `app/layout.tsx`** — add import and wrap children:

```tsx
import { MotionProvider } from "@/components/motion/MotionProvider";
```

and change the body line to:

```tsx
      <body className="bg-void font-body text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` — Expected: no output.
Run: `npm run build` — Expected: `✓ Compiled successfully`.

- [ ] **Step 7: Commit**

```bash
git add lib/animations.ts components/motion app/layout.tsx
git commit -m "feat: add motion primitives with reduced-motion support"
```

---

### Task 4: UI primitives

**Files:**
- Create: `components/ui/Container.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/Button.tsx`, `components/ui/Badge.tsx`, `components/ui/Card.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`
- Produces:
  - `Container({ children, className? })` — `max-w-6xl` centered wrapper with responsive padding
  - `SectionHeading({ eyebrow, title, as?, className? }: { eyebrow: string; title: string; as?: "h1" | "h2"; className?: string })` — pink-square eyebrow + display heading (`h2` default; pass `as="h1"` when it is the page's top heading)
  - `Button({ href?, variant?, className?, children }: { href?: string; variant?: "primary" | "outline" | "ghost"; className?: string; children: ReactNode })` — renders `Link` when `href` given, else `<button type="button">`
  - `Badge({ children, variant? }: { children: ReactNode; variant?: "default" | "blue" })`
  - `Card({ children, className? })` — panel surface with `group` hover accent border
- These are pure primitives: they must NOT import from `/data`.

- [ ] **Step 1: Create `components/ui/Container.tsx`:**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/ui/SectionHeading.tsx`:**

```tsx
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 sm:mb-16", className)}>
      <p className="mb-4 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.25em] text-pink">
        <span aria-hidden className="inline-block size-2 bg-pink" />
        {eyebrow}
      </p>
      <Heading className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </Heading>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/ui/Button.tsx`:**

```tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-pink text-black hover:bg-pink/90 hover:shadow-[0_0_24px_rgba(255,46,136,0.35)]",
  outline: "border border-line text-ink hover:border-pink hover:text-pink",
  ghost: "text-ink-muted hover:text-ink",
} as const;

interface ButtonProps {
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink",
    variants[variant],
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Create `components/ui/Badge.tsx`:**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "border-line text-ink-muted",
  blue: "border-blue/40 text-blue",
} as const;

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Create `components/ui/Card.tsx`:**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-line bg-panel p-6 transition-colors duration-300 hover:border-pink/60 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` — Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add components/ui
git commit -m "feat: add reusable UI primitives"
```

---

### Task 5: Navbar, Footer, SocialLinks, layout integration

**Files:**
- Create: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `components/layout/SocialLinks.tsx`
- Modify: `app/layout.tsx` (metadata from siteConfig; skip link; Navbar/main/Footer structure)

**Interfaces:**
- Consumes: `siteConfig` (Task 2), `Container` (Task 4), `cn` (Task 2), `MotionProvider` (Task 3)
- Produces: `Navbar()` (client), `Footer()`, `SocialLinks({ className? })` — all take no data props; they read `siteConfig` directly. Layout provides `<main id="main" className="pt-16">`; sections must use `scroll-mt-24` on anchored ids.

- [ ] **Step 1: Create `components/layout/SocialLinks.tsx`:**

```tsx
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { SocialIconId } from "@/lib/types";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const icons: Record<SocialIconId, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-5", className)}>
      {siteConfig.socialLinks.map((link) => {
        const Icon = icons[link.icon];
        return (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              className="text-ink-muted transition-colors hover:text-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
            >
              <Icon className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
```

- [ ] **Step 2: Create `components/layout/Navbar.tsx`:**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 font-display text-lg font-bold"
        >
          <span aria-hidden className="size-2.5 bg-pink" />
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-ink md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>
      {open && (
        <nav
          aria-label="Primary mobile"
          className="border-t border-line bg-void md:hidden"
        >
          <ul className="flex flex-col px-5 py-4">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Create `components/layout/Footer.tsx`:**

```tsx
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="flex items-center gap-2 font-display font-bold">
            <span aria-hidden className="size-2 bg-pink" />
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{siteConfig.footerNote}</p>
        </div>
        <SocialLinks />
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: Replace `app/layout.tsx` entirely with:**

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-void font-body text-ink antialiased">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-pink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
          >
            {siteConfig.skipToContent}
          </a>
          <Navbar />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Update `app/page.tsx` temporary content** — the smoke-test page from Task 1 now sits inside `<main>`, so remove its own `<main>` wrapper:

```tsx
export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center">
      <h1 className="font-display text-5xl font-bold">
        Portfolio<span className="text-pink">.</span>
      </h1>
    </div>
  );
}
```

- [ ] **Step 6: Verify in browser**

Run: `npm run dev`, open http://localhost:3000.
Expected: fixed navbar with pink-square logo and links; footer with social icons; Tab once shows the pink skip link; mobile width (375 px) shows hamburger that opens/closes the menu. Stop the dev server after checking.

- [ ] **Step 7: Verify build**

Run: `npx tsc --noEmit` then `npm run build` — Expected: no type errors, `✓ Compiled successfully`.

- [ ] **Step 8: Commit**

```bash
git add components/layout app/layout.tsx app/page.tsx
git commit -m "feat: add navbar, footer, and accessible layout shell"
```

---

### Task 6: Hero and About sections, home composition

**Files:**
- Create: `components/sections/Hero.tsx`, `components/sections/About.tsx`
- Replace: `app/page.tsx`

**Interfaces:**
- Consumes: `siteConfig`, `Container`, `Button`, `SectionHeading`, `Reveal`
- Produces: `Hero()`, `About()` — no props; sections read data directly. Section pattern every later section must follow: `<section id="…" className="scroll-mt-24 border-b border-line py-24 sm:py-32">` (last section on a page omits `border-b`).

- [ ] **Step 1: Create `components/sections/Hero.tsx`:**

```tsx
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="border-b border-line">
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-24">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-sm text-ink-muted">
            <span aria-hidden className="size-2 rounded-full bg-blue" />
            {siteConfig.availability}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {siteConfig.headline}{" "}
            <span className="text-stroke">{siteConfig.headlineAccent}</span>
            <span className="text-pink">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
            {siteConfig.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={siteConfig.heroCtas.primary.href}>
              {siteConfig.heroCtas.primary.label}
            </Button>
            <Button href={siteConfig.heroCtas.secondary.href} variant="outline">
              {siteConfig.heroCtas.secondary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/About.tsx`:**

```tsx
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-line py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.about.eyebrow}
          title={siteConfig.sections.about.title}
        />
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
              {siteConfig.about.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 leading-relaxed text-ink-muted">
              {siteConfig.about.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Replace `app/page.tsx` with:**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`, open http://localhost:3000.
Expected: full-height hero — blue availability dot (static, not pulsing), huge headline with the word "intent" stroke-outlined and a pink period, two CTAs; About section below with pink-square eyebrow. Sections fade in on scroll. Stop the dev server.

- [ ] **Step 5: Verify build, then commit**

Run: `npx tsc --noEmit` and `npm run build` — Expected: clean.

```bash
git add components/sections app/page.tsx
git commit -m "feat: add hero and about sections"
```

---

### Task 7: ProjectCard, FeaturedProjects, Skills

**Files:**
- Create: `components/projects/ProjectCard.tsx`, `components/sections/FeaturedProjects.tsx`, `components/sections/Skills.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `getFeaturedProjects`, `skillGroups`, `Card`, `Badge`, `SectionHeading`, `Container`, `Button`, `StaggerGroup`, `StaggerItem`
- Produces: `ProjectCard({ project }: { project: Project })` — whole card is one link to `/projects/${project.slug}`; reused by Task 9. `FeaturedProjects()`, `Skills()`.
- Note: `ProjectCard` lives in `components/projects/` (domain component shared by a section and a page — deliberate small addition to the spec's folder list).

- [ ] **Step 1: Create `components/projects/ProjectCard.tsx`:**

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
      >
        <span className="sr-only">{project.title}</span>
      </Link>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="text-xs text-ink-muted">{project.year}</span>
          <ArrowUpRight className="size-5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pink" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
```

- [ ] **Step 2: Create `components/sections/FeaturedProjects.tsx`** (first featured card spans both columns — deliberate asymmetry):

```tsx
import { getFeaturedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-line py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.projects.eyebrow}
          title={siteConfig.sections.projects.title}
        />
        <StaggerGroup className="grid gap-5 md:grid-cols-2">
          {featured.map((project, index) => (
            <StaggerItem
              key={project.slug}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-12">
          <Button href={siteConfig.projectsCta.href} variant="outline">
            {siteConfig.projectsCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/sections/Skills.tsx`:**

```tsx
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-b border-line py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.skills.eyebrow}
          title={siteConfig.sections.skills.title}
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <StaggerItem key={group.category}>
              <Card className="h-full">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                  {group.category}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx`:**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Skills />
    </>
  );
}
```

- [ ] **Step 5: Verify in browser**

Run: `npm run dev`. Expected: three featured cards (first spans full width on md+), staggered reveal, arrow slides toward top-right in pink on card hover, card border tints pink; skills grid 3 columns on desktop / 1 on mobile.

- [ ] **Step 6: Verify build, then commit**

Run: `npx tsc --noEmit` and `npm run build` — Expected: clean.

```bash
git add components/projects components/sections/FeaturedProjects.tsx components/sections/Skills.tsx app/page.tsx
git commit -m "feat: add featured projects and skills sections"
```

---

### Task 8: Experience and ContactCTA sections

**Files:**
- Create: `components/sections/Experience.tsx`, `components/sections/ContactCTA.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `experienceItems`, `siteConfig`, `Container`, `SectionHeading`, `Badge`, `Button`, `Card`, `Reveal`, `SocialLinks`
- Produces: `Experience()` — timeline with pink-square markers; `ContactCTA()` — static form, no submit handler (Button defaults to `type="button"`).

- [ ] **Step 1: Create `components/sections/Experience.tsx`:**

```tsx
import { experienceItems } from "@/data/experience";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-line py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.experience.eyebrow}
          title={siteConfig.sections.experience.title}
        />
        <ol className="relative ml-1 max-w-3xl border-l border-line">
          {experienceItems.map((item) => (
            <li
              key={`${item.role}-${item.org}`}
              className="relative pb-12 pl-8 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[4.5px] top-1.5 size-2 bg-pink"
              />
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs text-ink-muted">{item.period}</span>
                  {item.kind === "education" && (
                    <Badge variant="blue">Education</Badge>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{item.org}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 bg-line"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/ContactCTA.tsx`** (last home section — no `border-b`):

```tsx
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";

const inputClasses =
  "w-full rounded-md border border-line bg-void px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-pink focus:outline-none";

export function ContactCTA() {
  const { fields } = siteConfig.contact;
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.sections.contact.eyebrow}
          title={siteConfig.sections.contact.title}
        />
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-ink-muted">
              {siteConfig.contact.body}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-block font-display text-2xl font-bold transition-colors hover:text-pink sm:text-3xl"
            >
              {siteConfig.email}
            </a>
            <SocialLinks className="mt-8" />
          </Reveal>
          <Reveal delay={0.1}>
            <Card>
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm text-ink-muted"
                  >
                    {fields.name}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm text-ink-muted"
                  >
                    {fields.email}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm text-ink-muted"
                  >
                    {fields.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    className={inputClasses}
                  />
                </div>
                <Button className="w-full">{fields.submit}</Button>
                <p className="text-xs text-ink-muted">
                  {siteConfig.contact.formNote}
                </p>
              </form>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Update `app/page.tsx`:**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <ContactCTA />
    </>
  );
}
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`. Expected: timeline with pink square markers and one blue "Education" badge; contact section with email link, social icons, and a form whose submit does nothing and shows the placeholder note. All nav anchor links scroll to the right sections.

- [ ] **Step 5: Verify build, then commit**

Run: `npx tsc --noEmit` and `npm run build` — Expected: clean.

```bash
git add components/sections/Experience.tsx components/sections/ContactCTA.tsx app/page.tsx
git commit -m "feat: add experience timeline and contact sections"
```

---

### Task 9: Projects listing page

**Files:**
- Create: `app/projects/page.tsx`

**Interfaces:**
- Consumes: `projects`, `siteConfig`, `Container`, `SectionHeading`, `ProjectCard`, `StaggerGroup`, `StaggerItem`

- [ ] **Step 1: Create `app/projects/page.tsx`:**

```tsx
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export const metadata: Metadata = {
  title: siteConfig.projectsPage.title.replace(/\.$/, ""),
  description: siteConfig.tagline,
};

export default function ProjectsPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={siteConfig.projectsPage.eyebrow}
          title={siteConfig.projectsPage.title}
        />
        <StaggerGroup className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
```

Note: `as="h1"` makes the listing header the page's single `h1` (SectionHeading defaults to `h2` for home sections, where the Hero owns the `h1`).

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`, open http://localhost:3000/projects. Expected: "All projects." header, six cards in two columns (one on mobile), each card links to its detail route (404 for now — detail page is Task 10).

- [ ] **Step 3: Verify build, then commit**

Run: `npx tsc --noEmit` and `npm run build` — Expected: clean, route table shows `○ /projects`.

```bash
git add app/projects/page.tsx
git commit -m "feat: add projects listing page"
```

---

### Task 10: Project detail page and styled 404

**Files:**
- Create: `app/projects/[slug]/page.tsx`, `app/not-found.tsx`

**Interfaces:**
- Consumes: `projects`, `getProjectBySlug`, `siteConfig`, `Container`, `Badge`, `Button`, `Reveal`
- Produces: SSG project detail routes for all six slugs; unknown slugs render the styled 404. Note: in Next 15, `params` is a `Promise` and must be awaited.

- [ ] **Step 1: Create `app/projects/[slug]/page.tsx`:**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: siteConfig.notFound.title };
  }
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  return (
    <article className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          {siteConfig.projectDetail.back}
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm text-ink-muted">{project.year}</span>
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          {project.title}
          <span className="text-pink">.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          {project.summary}
        </p>
        <hr className="my-12 border-line" />
        <div className="space-y-6 leading-relaxed text-ink-muted">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href={project.links.live}>
            {siteConfig.projectDetail.live}
          </Button>
          <Button href={project.links.source} variant="outline">
            {siteConfig.projectDetail.source}
          </Button>
        </div>
      </Container>
    </article>
  );
}
```

- [ ] **Step 2: Create `app/not-found.tsx`:**

```tsx
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container>
        <p
          aria-hidden
          className="font-display text-8xl font-bold sm:text-9xl"
        >
          <span className="text-stroke">404</span>
          <span className="text-pink">.</span>
        </p>
        <h1 className="mt-6 font-display text-3xl font-bold">
          {siteConfig.notFound.title}
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
          {siteConfig.notFound.body}
        </p>
        <div className="mt-8">
          <Button href="/">{siteConfig.notFound.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`. Open http://localhost:3000/projects/project-one — Expected: back link, tags, big title with pink period, paragraphs, two link buttons. Open http://localhost:3000/projects/does-not-exist — Expected: styled 404 with stroke-outlined "404".

- [ ] **Step 4: Verify build shows SSG routes**

Run: `npm run build` — Expected: `✓ Compiled successfully`; route table lists `● /projects/[slug]` with the six `/projects/project-*` paths pre-rendered (SSG).

- [ ] **Step 5: Commit**

```bash
git add app/projects app/not-found.tsx
git commit -m "feat: add project detail pages and styled 404"
```

---

### Task 11: Final golden-path verification

**Files:**
- Modify: only if fixes are needed

- [ ] **Step 1: Full production build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: no type errors, no lint errors, all routes static/SSG.

- [ ] **Step 2: Browser golden path** (`npm run dev`)

- Home: scroll top to bottom — every section reveals once, no janky motion, no looping animation anywhere.
- Nav: click each nav link from home AND from /projects (anchors must navigate back to `/#section` correctly); click logo returns home.
- Projects: listing → click a card → detail page → back link → listing.
- 404: visit an unknown URL.

- [ ] **Step 3: Responsive check** — DevTools responsive mode at 375, 768, 1024, 1440 px on home, /projects, and one detail page. Expected: no horizontal scrollbar at any width (check `document.documentElement.scrollWidth <= window.innerWidth` in console if unsure), mobile menu works at 375 px, grids collapse to one column.

- [ ] **Step 4: Accessibility pass**

- Keyboard-only: Tab from page load — first stop is the pink skip link; Enter jumps to main; all links/buttons show pink focus outlines; mobile menu reachable and operable via keyboard.
- Landmarks: one `header`, one `main`, one `footer`; exactly one `h1` on home and on each detail page.
- Reduced motion: in DevTools Rendering panel, set "Emulate CSS prefers-reduced-motion: reduce", reload — content appears without translate/fade motion.

- [ ] **Step 5: Fix anything found, re-run the failing check, then commit**

```bash
git add -A
git commit -m "fix: polish issues found in final verification"
```

(Skip the commit if nothing needed fixing.)
