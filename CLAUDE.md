# Portfolio development guide

Read `AGENTS.md` and the relevant installed Next.js documentation before editing. This portfolio uses Next.js 16 App Router, React 19, TypeScript and Tailwind 4. It has no animation framework or component library.

## Pages and content

- `app/page.tsx`: name and tagline, about, experience, education, selected work, tech stack, GitHub and contact.
- `app/home.module.css` and `app/globals.css`: shared ASCII rules and bracket labels, navy/black background, orange accents, readable sans-serif prose.
- `app/projects/page.tsx`: curated projects followed by other public repositories and private names.
- `app/projects/[slug]/page.tsx`: project details and the reserved categories `xr`, `games`, `general`.
- `data/projects.ts`: verified project summaries in portfolio order. Keep source and demo URLs accurate. Private repositories belong in the names-only list.
- `data/experience.ts`, `data/site.ts`, `data/skills.ts`: editable portfolio copy. Keep supported facts, use plain English, and avoid invented claims.

Skills use three text-only columns on desktop, two on medium screens and one on narrow screens. Apple system fonts come first, with self-hosted Inter and JetBrains Mono fallbacks through `next/font`. Font licenses are in `public/licenses/`. `TechLogos.tsx` renders static first frames from `ascii.rest` on the server, only for the most-used GitHub languages.

## GitHub and contact

`lib/github.ts` owns authenticated server-only access and five-minute caching. `lib/github-view.ts` validates and shapes the response. Never expose `GITHUB_READ_TOKEN`. Public README excerpts stay plain text. The owner authorizes private repository names only; private content, URLs, descriptions and commit messages must never reach the page. Private commit history may be inaccessible: display unavailable rather than a fabricated zero. Language percentages use public non-fork repositories.

`lib/project-archive.ts` merges additional repositories without duplicating curated projects. `lib/project-readme.ts` extracts short plain-text README summaries. All internal page navigation uses `next/link`, with Home pointing to `/` and Projects to `/projects`.

`components/sections/ContactForm.tsx` sends through EmailJS using `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. Preserve labels, native validation, pending state, status announcements and message contents after failure. The email link is the fallback. Real test submissions require explicit user authorization.

The owner chose the email link after the live test returned an expired Gmail grant. The form is hidden by default. Reconnect Gmail in EmailJS, then set `EMAILJS_FORM_ENABLED=true` and rebuild to restore it. Do not enable it before a successful delivery check.

## Checks

```sh
npm run lint
npx tsc --noEmit
node --experimental-strip-types --test tests/*.test.mjs
npm run build
```

Use Node 22.18+ for the tests. Check desktop and mobile navigation, category filters, project details, 404, keyboard focus and contact states after UI changes. Do not commit test messages, credentials or private GitHub data.
