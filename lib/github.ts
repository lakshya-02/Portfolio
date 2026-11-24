import "server-only";
import { toPublicGitHubView, type GitHubView } from "@/lib/github-view";

const profileQuery = `
  query ($from: DateTime!, $to: DateTime!) {
    viewer {
      id
      login
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
      repositories(first: 100, privacy: PUBLIC, affiliations: [OWNER], orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        nodes {
          isPrivate nameWithOwner url description stargazerCount
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 5) {
                  nodes { messageHeadline committedDate url author { user { login } } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const privateQuery = `
  query ($since: GitTimestamp!, $authorId: ID!, $after: String) {
    viewer {
      repositories(first: 100, after: $after, privacy: PRIVATE, affiliations: [OWNER]) {
        pageInfo { hasNextPage endCursor }
        nodes {
          isPrivate isEmpty
          defaultBranchRef {
            target {
              ... on Commit {
                history(since: $since, author: {id: $authorId}) { totalCount }
              }
            }
          }
        }
      }
    }
  }
`;

async function queryGitHub(token: string, query: string, variables: Record<string, unknown>): Promise<unknown> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "pf2-portfolio",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 21600 },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("GitHub request failed");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("data" in result) || ("errors" in result)) {
    throw new Error("GitHub response failed");
  }
  return result.data;
}

export async function getGitHubActivity(): Promise<GitHubView | null> {
  const token = process.env.GITHUB_READ_TOKEN;
  if (!token) return null;

  try {
    const now = new Date();
    const start = new Date(now);
    start.setUTCFullYear(start.getUTCFullYear() - 1);
    const profile = await queryGitHub(token, profileQuery, { from: start.toISOString(), to: now.toISOString() });
    const userId = (profile as { viewer?: { id?: unknown } }).viewer?.id;
    if (typeof userId !== "string") throw new Error("GitHub viewer missing");

    let nodes: unknown[] | null = [];
    try {
      let after: string | null = null;
      do {
        const page = await queryGitHub(token, privateQuery, { since: start.toISOString(), authorId: userId, after }) as {
          viewer?: { repositories?: { nodes?: unknown[]; pageInfo?: { hasNextPage?: boolean; endCursor?: string | null } } };
        };
        const repositories = page.viewer?.repositories;
        if (!Array.isArray(repositories?.nodes) || !repositories.pageInfo) throw new Error("GitHub private repositories missing");
        nodes.push(...repositories.nodes);
        const nextCursor = repositories.pageInfo.hasNextPage ? repositories.pageInfo.endCursor ?? null : null;
        if (repositories.pageInfo.hasNextPage && (!nextCursor || nextCursor === after)) throw new Error("GitHub pagination failed");
        after = nextCursor;
      } while (after);
    } catch {
      nodes = null;
      console.warn("GitHub private commit count is unavailable");
    }

    return toPublicGitHubView({
      profile,
      privateRepos: nodes === null ? null : { viewer: { repositories: { nodes } } },
      fetchedAt: now.toISOString(),
    });
  } catch {
    console.warn("GitHub activity is unavailable");
    return null;
  }
}
