# ASCII Portfolio and Vercel Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the supplied ASCII-art portfolio with real, privacy-safe GitHub activity to the linked Vercel project.

**Architecture:** A Next.js App Router homepage reads the art as text and fetches GitHub data server-side. A pure normalizer removes private identifiers before rendering; the existing project routes and contact flow stay. A verified Vercel preview precedes production.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, strict TypeScript, Tailwind CSS 4, Node 25 built-in test runner, GitHub GraphQL, Vercel.

**Spec:** `docs/superpowers/specs/2026-10-20-ascii-portfolio-vercel-design.md`

## Global Constraints

- No Cloudflare integration, visitor auth, JWT, database, API route, image-based homepage, or fake GitHub data.
- Preserve `/projects`, `/projects/[slug]`, real portfolio content, and the existing contact form.
- Show private contributions only as daily/aggregate counts; show private default-branch commits only as one aggregate count for the trailing year. Never render private repo identifiers or commit details.
- Do not deploy the broad local `gh` token. Production private counts require a separate owner-created, read-only private-repository token in Vercel named `GITHUB_READ_TOKEN`.
- Keep the previous Vercel production deployment available for rollback.

## Review Focus

- Missing, invalid, or rate-limited GitHub token: page remains usable and says activity is unavailable, never zero.
- Private repo payload containing names, URLs, and commit messages: no such field reaches the public view model or HTML.
- Empty/default-branch-less private repo: contributes zero without failing the entire aggregate.
- ASCII art at 320px and wide desktop: stays inside viewport and retains line alignment.
- Contact form or project navigation after homepage replacement: existing routes and submission states remain functional.

---

### Task 1: Restore a real homepage and integrate the art

**Files:** Create `public/ascii-art.txt`, `lib/ascii.ts`, `tests/ascii.test.mjs`, `app/page.tsx`, `app/home.module.css`; modify `app/layout.tsx`, `next.config.ts`, `package.json`; remove `public/landing.html` after parity is checked.

**Interfaces:** `prepareAsciiArt(source: string): { lines: string[]; columns: number }` trims only common outer whitespace and blank outer rows. The server page reads `public/ascii-art.txt` via `fs.readFile`, then consumes the prepared art, existing content data, and `ContactForm`.

- [ ] Copy the supplied artwork byte-for-byte to `public/ascii-art.txt`; record its original 199×400 dimensions.
- [ ] Write `tests/ascii.test.mjs` first: internal spaces survive, blank outer rows/common margins trim, all output rows have equal width; run `node --test tests/ascii.test.mjs` and observe the expected missing-export failure.
- [ ] Implement `prepareAsciiArt` minimally; rerun that test green and run the full test command.
- [ ] Read the local Next 16 page, font, and data-fetching guides; implement the single-page text layout with self-hosted OFL-licensed IBM Plex Mono, responsive `<pre>`, semantic headings, accessible art alternative, and existing project/contact links.
- [ ] Remove the temporary `/` rewrite only when the new page serves successfully; verify `/`, `/projects`, and one project detail route locally. Commit this deliverable.

### Task 2: GitHub data with a strict public boundary

**Files:** Create `lib/github-view.ts`, `lib/github.ts`, `tests/github-view.test.mjs`; modify `app/page.tsx`, `app/home.module.css`, `package.json`, `.gitignore` only if a new local-secret pattern is necessary.

**Interfaces:** `toPublicGitHubView(raw: unknown): GitHubView` validates GitHub responses and returns only daily contribution counts, trailing-year totals, private commit aggregate, public repo statistics/summaries, and public commit summaries. `getGitHubActivity(): Promise<GitHubView | null>` is server-only and returns `null` on unavailable data.

- [ ] Write tests first for public data, private metadata exclusion, missing fields, empty histories, and malformed input; observe failures with `node --test tests/github-view.test.mjs`.
- [ ] Implement the pure validator/normalizer and rerun tests green; do not serialize raw private-repository objects into React props.
- [ ] Query authenticated `lakshya-02` contributions and public repositories/commits with six-hour caching. Count owner-authored commits on default branches of owned private repositories for the same trailing-year window; keep repository identities inside the server module.
- [ ] Render the real heatmap/text charts and explicit unavailable/empty states. Verify HTML and client bundles do not contain private identifiers or `GITHUB_READ_TOKEN`; commit this deliverable.

### Task 3: Remove code made obsolete by the final page

**Files:** Review `components/sections/`, `components/ui/`, `data/`, `lib/types.ts`, `public/images/`, `package.json`, `package-lock.json`, `README.md`, `CLAUDE.md`.

**Interfaces:** No runtime interface change; preserve every value and component still consumed by the homepage or project routes.

- [ ] Trace imports again after Tasks 1–2 and list exact unreachable files/exports/dependencies; do not delete content solely because the temporary draft hid it.
- [ ] Remove only confirmed unused items using scoped patches; remove unneeded packages with `npm uninstall` and update documentation to describe Vercel and the required secret without including its value.
- [ ] Run `node --test tests/*.test.mjs`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `git diff --check`; fix failures and commit.

### Task 4: Review, browser verification, and Vercel release

**Files:** Any task-owned source/test files needed for validated fixes; no deployment config unless evidence requires it.

**Interfaces:** Preview and production must render the same verified build; no private secret appears in responses, logs, or bundles.

- [ ] Run CodeRabbit and Codex Security on the final diff; reproduce actionable findings, add failing tests, fix, and rerun relevant checks.
- [ ] Test desktop, 320px/375px mobile, keyboard/accessibility, console/network failures, and measured performance in an available real browser; report any unavailable browser surface rather than claiming a pass.
- [ ] Confirm the Vercel project, environment-variable names, and rollback deployment. Have the owner create/configure the narrow `GITHUB_READ_TOKEN` without sharing its value through chat.
- [ ] Deploy a preview; inspect build output, page HTML, browser flows, and available runtime logs. Promote to production only after preview passes and private count works; verify the public URL and retain the earlier deployment for rollback.
