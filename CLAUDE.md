# Portfolio development guide

This is Lakshya Singh's Next.js 16 portfolio. The live ASCII homepage is implemented in `app/page.tsx` and styled by `app/home.module.css`. The project archive and case studies live under `app/projects/`.

## Where to edit

- `data/projects.ts`, `data/skills.ts`, `data/experience.ts`, and `data/site.ts` hold portfolio content.
- `components/sections/ContactForm.tsx` handles the EmailJS form.
- `components/sections/GitHubHeatmap.tsx`, `lib/github.ts`, and `lib/github-view.ts` handle GitHub activity. Keep `GITHUB_READ_TOKEN` server only and private repository details anonymous.
- `components/projects/` and `components/ui/` hold components used by the project pages. `components/motion/` provides the project archive animation.

The homepage skills grid shows three category columns on wide screens, two on medium screens, and one on narrow screens. Edit `data/skills.ts` to change its content. Skill groups contain a category and a list of skills; the old category icon field is unused and has been removed.

## Commands

```bash
npm ci
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

Read the relevant installed Next.js documentation in `node_modules/next/dist/docs/` before changing Next.js code. Preserve the generated Next.js block in `AGENTS.md`. The current typography is IBM Plex Mono through `next/font/google`, with its license at `public/licenses/IBM-Plex-Mono-OFL.txt`.
