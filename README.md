# Lakshya Singh's portfolio

The ASCII homepage is at `/`, with the project archive and detail pages at `/projects` and `/projects/[slug]`.

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For live GitHub activity, add a server-only `GITHUB_READ_TOKEN` to the ignored `.env.local` file, then run `npm run dev`.

Use a fine-grained token owned by `lakshya-02` with Metadata and Contents read-only access to the repositories to count. Private commit totals cover the owner's commits on the default branches of accessible owned private repositories over the past year. A token restricted to selected repositories produces a correspondingly scoped total.

Do not use a `NEXT_PUBLIC_` variable or commit the token. Private repository activity is rendered only as anonymous daily counts and an aggregate commit count; no private names or commit details are published.

The activity chart uses real daily contribution counts in Sunday-to-Saturday week columns, with month labels and shaded text cells. Expand “Daily counts” for an accessible date-by-date table.

## Deployment status

Live at https://pf2-gamma.vercel.app, linked to the `pf2` Vercel project. On 2026-10-20, deployment `dpl_5jiWTLHJQKeqVE3qu2ZekwJH6Ubf` was built, checked, and promoted. Production uses `GITHUB_READ_TOKEN` as a Vercel Secret, never a browser environment variable.

The current user-supplied token returns the contribution calendar and public statistics, but hides default branches for non-empty private repositories. Private commit totals therefore display as unavailable, not zero. Replace it with a fine-grained token with Contents read-only access to the selected repositories; the current classic token also has unnecessary permissions. Do not deploy a GitHub CLI credential.

The minimal homepage uses IBM Plex Mono, self-hosted by Next.js with swap loading and monospace fallbacks. Its SIL Open Font License is included at `public/licenses/IBM-Plex-Mono-OFL.txt`.

Verification: nine data/privacy tests, ESLint, TypeScript, local and Vercel production builds passed. Public production returned HTTP 200 with the new sections and real contribution chart, no observed browser errors or failed requests, and no horizontal overflow at desktop/mobile sizes. Local checks covered expandable details, invalid-email validation, project navigation, and the accessible daily table. Generated public HTML/JavaScript did not contain the GitHub token.

Known limits: production dependency audit is clean, but five high-severity development-tool advisories remain. CodeRabbit and Codex Security reviews were unavailable. Email delivery was not sent as a test; monitoring, full accessibility/performance audits, and a rollback drill have not been completed. The prior production deployment `dpl_5ecF8nebGCMFzSwbDQKFni9csVTP` is the rollback reference.

The portfolio is public; visitor authentication, JWTs, and API routes are not part of the current site.
