<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project layout

- `app/page.tsx` renders the live ASCII homepage. Its layout is in `app/home.module.css`.
- `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` render the project archive and detail pages.
- `/projects/xr`, `/projects/games`, and `/projects/general` are reserved category slugs handled by the same project route. Keep project slugs distinct from them.
- Edit portfolio content in `data/`; `data/skills.ts` feeds the homepage's three-column skills grid.
- Keep GitHub access in the server-side `lib/github.ts`; do not expose `GITHUB_READ_TOKEN` to client code.
- GitHub data is cached for five minutes. Public README summaries are rendered as plain text; private repositories expose names only, as authorized by the owner. Never expose private URLs, descriptions, source, or commit messages. Unavailable private commit counts must stay unavailable, not zero.
- Use the navy/black and orange theme in `app/globals.css` and shared ASCII styling in `app/home.module.css`. Keep Apple system fonts first. The text-only skills grid has three desktop columns; static `ascii.rest` logos belong only in the GitHub language section.
- Curate projects in `data/projects.ts` by portfolio relevance. `lib/project-archive.ts` adds the remaining public repositories and private names. Language percentages exclude forks.
- Preserve responsive layouts and accessible HTML when editing sections. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` for code changes.
- Run `node --experimental-strip-types --test tests/*.test.mjs` for GitHub or README parsing changes. Use Node 22.18+ for these tests. Do not send real contact-form messages without explicit authorization.
