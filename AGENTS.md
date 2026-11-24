<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project layout

- `app/page.tsx` renders the live ASCII homepage. Its layout is in `app/home.module.css`.
- `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` render the project archive and detail pages.
- Edit portfolio content in `data/`; `data/skills.ts` feeds the homepage's three-column skills grid.
- Keep GitHub access in the server-side `lib/github.ts`; do not expose `GITHUB_READ_TOKEN` to client code.
- Preserve responsive layouts and accessible HTML when editing sections. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` for code changes.
