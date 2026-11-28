# Changelog

All notable changes to this project are documented in this file for other agents and collaborators.

---

## 2026-11-26 — Font Update

### Changed
- **Display font** (`--font-display`) in `app/globals.css`: replaced `Arial, Helvetica, sans-serif` with `Inter` (loaded via `next/font/google`) + Apple system font fallback chain (`-apple-system`, `BlinkMacSystemFont`, `"SF Pro Display"`, `"Helvetica Neue"`).
- **`app/layout.tsx`**: added `Inter` import from `next/font/google` with weights 700/800/900, exposed as `--font-inter` CSS variable; added `display.variable` to `<html>` className.

---

## 2026-11-26

### Removed
- **ASCII art portrait** from the homepage hero section (`app/page.tsx`).
  - Removed the `<figure>` element containing the VR-headset ASCII art `<pre>` block and its `<figcaption>`.
  - Removed unused imports: `readFile` from `node:fs/promises`, `path` from `node:path`, and `prepareAsciiArt` from `@/lib/ascii`.
  - Removed the `source` and `art` variables that loaded `public/ascii-art.txt`.
  - The hero section now starts directly with the eyebrow text, heading, and nav links.
  - CSS classes `.portrait` and `.portrait pre` in `app/home.module.css` are now unused (kept for reference but can be cleaned up).

---

## 2026-11-26 (ASCII pages, fonts, content)

### Changed
- Fonts: Apple system faces first (SF Pro Display / SF Pro Text / SF Mono), with Inter and JetBrains Mono as non-preloaded fallbacks. IBM Plex Mono removed. This reverses the earlier entry that put Inter ahead of the Apple fonts, which made Macs use Inter.
- Homepage order: about, experience (work and volunteer roles), selected work, tech stack, activity, contact.
- Tech stack shows ascii.rest logos for C#, C++, C, Python, JavaScript, TypeScript, Java, HTML and CSS; the language list left `data/skills.ts`.
- `/projects` groups projects by the new `category` field (XR, Games, General). `/projects/[slug]` and the navbar/footer now use the ASCII style from `app/home.module.css`.
- All copy rewritten in plain language. Projects added from public repos: Quest Vision Assistant, Vigyan AR, Endless Puzzle, SquareBox, Unity UI Bridge.

### Removed
- Unused template components: ProjectCard, Card, Badge, SectionHeading, Container. Unused `.portrait` CSS.

---

## 2026-11-26 (build fix, handoff)

### Fixed
- Build was broken: `app/page.tsx` and `lib/project-archive.ts` imported `getGitHubPortfolio`, which did not exist yet. It now exists in `lib/github.ts` (the version with the server cache), and `project-archive.ts` no longer filters on `fork`/`archived`, which `GitHubPortfolioRepository` does not have.
- Verified: `npx tsc --noEmit`, `npm run lint`, `node --test tests/*.mjs` (11 pass), `npm run build`, and HTTP 200 on /, /projects, /projects/{xr,games,general}, project pages; 404 on unknown routes.

### Open
- `/projects` lists private repository names. CLAUDE.md says private repository details stay anonymous. Confirm with the owner or drop `privateNames`.
- Forks are not excluded from "more on github". Add `isFork` to `portfolioPublicQuery` if that matters.
- Run tests with `node --test tests/*.mjs`; `node --test tests/` fails because it treats the folder as a file.
