# Lakshya Singh's portfolio

The ASCII homepage is at `/`. The archive at `/projects` leads with selected work, followed by the GitHub repository list. Browse selected work by category at `/projects/xr`, `/projects/games`, and `/projects/general`.

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For live GitHub activity, add a server-only `GITHUB_READ_TOKEN` to the ignored `.env.local` file, then run `npm run dev`.

Use a fine-grained token owned by `lakshya-02` with Metadata and Contents read-only access to the repositories to count. Private commit totals cover the owner's commits on the default branches of accessible owned private repositories over the past year. A token restricted to selected repositories produces a correspondingly scoped total.

Keep the token server-side. The archive shows private repository names only. The activity chart shows daily contribution totals and an aggregate private commit count when the token can read the required history.

The activity chart uses real daily contribution counts in Sunday-to-Saturday week columns, with month labels and shaded text cells. Expand “Daily counts” for an accessible date-by-date table.

## Current redesign

The homepage and archive refresh their cached pages every five minutes. Apple system fonts come first, with Inter and JetBrains Mono as fallbacks. Their licenses are in `public/licenses/`.

The current GitHub token returns the contribution calendar and public statistics. It cannot read the required private branch history, so the private commit count displays as unavailable.

Contact currently uses a direct email link. The demo submission reached EmailJS, which rejected it because Gmail needs to be reconnected. See `CLAUDE.md` for the form setting.

Local verification covered ESLint, TypeScript, the production build, 20 tests, and desktop and mobile project navigation.

## Deployment history

The `pf2` Vercel project was promoted to production on 2026-10-20 as `dpl_5jiWTLHJQKeqVE3qu2ZekwJH6Ubf`, with `dpl_5ecF8nebGCMFzSwbDQKFni9csVTP` recorded as its rollback reference. This redesign has been verified in the local production build.
