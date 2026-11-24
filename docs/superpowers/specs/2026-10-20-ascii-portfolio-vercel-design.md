# ASCII portfolio and Vercel update — design

## Intent and scope

Build a fast, text-first portfolio homepage inspired by berzi.one, using Lakshya's supplied ASCII artwork instead of an image. Keep the existing project archive, project detail routes, real project/skills/experience content, and working contact form. Show real GitHub activity, including anonymous daily private-contribution counts but never private repository names, URLs, or commits. Update the linked Vercel project only after a verified preview. There is no live Cloudflare Tunnel hostname or DNS cutover.

## Approach

Replace the temporary `public/landing.html` rewrite with an App Router homepage. This keeps GitHub credentials in a server-only data module and lets the page render useful HTML without client-side data fetching. A scheduled JSON snapshot would add CI machinery; browser-side GitHub requests would expose a credential. Neither is warranted here. The site remains public: no visitor login, JWT, session, database, or API route is required.

## Homepage and artwork

The page is a compact, responsive single page: identity and navigation, ASCII portrait, short introduction, selected work, skills/experience, GitHub activity, and contact. Existing `/projects` and `/projects/[slug]` routes remain navigable and visually coherent. Reuse the current content data and contact form rather than discarding functional content. Keep the homepage image-free and text-first; avoid new UI or animation dependencies.

Copy `C:\Users\Lakshya\Downloads\ascii-art.txt` into the repository as the source asset. It is currently 199 rows by 400 columns. Trim only common outer whitespace and fully blank outer rows when rendering; preserve internal spaces and glyphs. Render the full art as actual text in a monospaced `<pre>` sized to fit its container, with no horizontal page overflow and an accessible text alternative. Verify the full-art result at 320px, 375px, tablet, and desktop widths; keep the source text available in the repo even though the visual glyphs become small on phones.

Use a high-quality, OFL-licensed monospaced web font, self-hosted by `next/font`, with system monospace fallbacks and no browser request to a third-party font host. Retain the existing project-page typography unless a measured or visual issue requires a scoped adjustment.

## GitHub data and privacy boundary

Use a narrowly scoped, owner-controlled GitHub credential in server-only Vercel environment variables. Do not copy the broad local `gh` OAuth token into Vercel, commit a token, embed it in client code, or log its value. Query the authenticated `lakshya-02` account server-side. Cache responses for a bounded interval (target: six hours) so requests are fast and do not exhaust GitHub limits.

The public view model contains only trailing-year contribution dates/counts, total contributions, an aggregate count of the owner's commits on default branches of owned private repositories in that same year, public repository count and star total, up to five recent public commits, and up to five public repository summaries. This private commit count is distinct from GitHub's `restrictedContributionsCount`, which includes non-commit activity and must not be mislabeled as commits. Private contributions may affect daily counts and total contributions, but private repository identifiers, commit messages, SHAs, URLs, and ownership metadata are removed before data reaches rendering. Render an ASCII-style heatmap and simple textual charts from actual returned values; label date range and freshness. If the API returns no recent public commits, state that explicitly. Never substitute fabricated activity, including zeroes, on authentication, rate-limit, or network failure. Show a clear unavailable state with a GitHub profile link instead.

The runtime secret is named `GITHUB_READ_TOKEN`. Counting exact private-repository commits requires read-only access to those private repositories' commit histories, a broader permission than reading anonymous contribution totals. The owner must create a separate token limited to read-only access to the relevant private repositories, and add it to Vercel without sending it through chat. If a safe credential is unavailable, the site may still show an honest unavailable state, but production must not claim private-inclusive activity or a private commit count is working.

## Verification and release

Use tests first for nontrivial normalization/privacy logic, then verify lint, strict TypeScript, production build, and existing routes. Test real desktop and mobile browser flows, accessibility, console/network failures, and performance. Run CodeRabbit review and Codex Security audit; fix validated findings and rerun checks. Inspect the linked Vercel project's environment-variable names, preview build/logs, and preview behavior without exposing values. Only after preview verification, update production, confirm the active deployment and public URL, and keep the prior deployment available for rollback. Do not delete Cloudflare resources or DNS records; none are known to be active.

## Non-goals and constraints

No speculative auth flow, JWT, database, or API endpoint. No fake GitHub data or image substitute for the supplied art. No destructive deletion of historical content merely because the temporary landing-page rewrite makes it unreachable. Remove only files, exports, configuration, and dependencies proven unused after the final page is in place. If the Vercel connector cannot read production logs or a GitHub credential needs manual setup, report the exact unverified item rather than claiming production health.
