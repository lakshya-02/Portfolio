import "server-only";
import { createHash } from "node:crypto";
import {
  toGitHubPortfolio,
  toPublicGitHubView,
  type GitHubPortfolio,
  type GitHubView,
} from "@/lib/github-view";

export type {
  GitHubPortfolio,
  GitHubPortfolioLanguage,
  GitHubPortfolioRepository,
  GitHubView,
} from "@/lib/github-view";

const GITHUB_CACHE_TTL_SECONDS = 300;
const GITHUB_CACHE_TTL_MS = GITHUB_CACHE_TTL_SECONDS * 1000;
const MAX_PAGINATION_PAGES = 100;

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

const portfolioPublicQuery = `
  query ($after: String) {
    viewer {
      login
      repositories(first: 50, after: $after, privacy: PUBLIC, affiliations: [OWNER], orderBy: {field: UPDATED_AT, direction: DESC}) {
        pageInfo { hasNextPage endCursor }
        nodes {
          isPrivate
          isFork
          name
          url
          description
          stargazerCount
          homepageUrl
          primaryLanguage { name }
          languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node { name }
            }
          }
          readmeMd: object(expression: "HEAD:README.md") { ... on Blob { text isBinary } }
          readmeLower: object(expression: "HEAD:readme.md") { ... on Blob { text isBinary } }
          readmeTitle: object(expression: "HEAD:Readme.md") { ... on Blob { text isBinary } }
          readmeUpper: object(expression: "HEAD:README.MD") { ... on Blob { text isBinary } }
          readmePlain: object(expression: "HEAD:README") { ... on Blob { text isBinary } }
          readmeTxt: object(expression: "HEAD:README.txt") { ... on Blob { text isBinary } }
          readmeRst: object(expression: "HEAD:README.rst") { ... on Blob { text isBinary } }
        }
      }
    }
  }
`;

// Private repositories authorize names only; never query READMEs, URLs, descriptions, languages, branches, or commits.
const portfolioPrivateQuery = `
  query ($after: String) {
    viewer {
      login
      repositories(first: 100, after: $after, privacy: PRIVATE, affiliations: [OWNER]) {
        pageInfo { hasNextPage endCursor }
        nodes {
          isPrivate
          name
        }
      }
    }
  }
`;

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

const responseCache = new Map<string, CacheEntry>();
const inFlightCache = new Map<string, Promise<unknown>>();

function cacheKeyFor(scope: "activity" | "portfolio", token: string): string {
  return `${scope}:${createHash("sha256").update(token).digest("hex")}`;
}

async function withServerCache<T>(
  scope: "activity" | "portfolio",
  token: string,
  loader: () => Promise<T | null>,
): Promise<T | null> {
  const key = cacheKeyFor(scope, token);
  const cached = responseCache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value as T;
  }
  if (cached) responseCache.delete(key);

  const pending = inFlightCache.get(key) as Promise<T | null> | undefined;
  if (pending) return pending;

  const request = loader()
    .then((value) => {
      if (value !== null) {
        if (responseCache.size >= 32) responseCache.clear();
        responseCache.set(key, { value, expiresAt: Date.now() + GITHUB_CACHE_TTL_MS });
      }
      return value;
    })
    .finally(() => {
      inFlightCache.delete(key);
    });

  inFlightCache.set(key, request);
  return request;
}

async function queryGitHub(token: string, query: string, variables: Record<string, unknown>): Promise<unknown> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "pf2-portfolio",
    },
    body: JSON.stringify({ query, variables }),
    cache: "force-cache",
    next: { revalidate: GITHUB_CACHE_TTL_SECONDS },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("GitHub request failed");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("data" in result)) {
    throw new Error("GitHub response failed");
  }
  if ("errors" in result && result.errors != null && (!Array.isArray(result.errors) || result.errors.length > 0)) {
    throw new Error("GitHub response failed");
  }
  return result.data;
}

async function paginateViewerRepositories(
  token: string,
  query: string,
  variables: Record<string, unknown> = {},
  expectedLogin?: string,
): Promise<unknown[]> {
  const nodes: unknown[] = [];
  let after: string | null = null;
  for (let pageCount = 0; pageCount < MAX_PAGINATION_PAGES; pageCount++) {
    const data = await queryGitHub(token, query, { ...variables, after }) as {
      viewer?: {
        login?: unknown;
        repositories?: {
          nodes?: unknown[];
          pageInfo?: { hasNextPage?: unknown; endCursor?: unknown };
        };
      };
    };
    if (expectedLogin !== undefined && data.viewer?.login !== expectedLogin) {
      throw new Error("Unexpected GitHub account");
    }
    const repositories = data.viewer?.repositories;
    const pageInfo = repositories?.pageInfo;
    if (!Array.isArray(repositories?.nodes) || !pageInfo || typeof pageInfo.hasNextPage !== "boolean") {
      throw new Error("GitHub repositories missing");
    }
    nodes.push(...repositories.nodes);
    if (!pageInfo.hasNextPage) return nodes;
    const nextCursor = typeof pageInfo.endCursor === "string" && pageInfo.endCursor ? pageInfo.endCursor : null;
    if (!nextCursor || nextCursor === after) throw new Error("GitHub pagination failed");
    after = nextCursor;
  }
  throw new Error("GitHub pagination limit exceeded");
}

function getActivityWindow(nowMs: number): { from: string; to: string; fetchedAt: string } {
  // Snap GraphQL range boundaries to 5-minute buckets so Next fetch cache keys stay stable.
  const bucketMs = Math.floor(nowMs / GITHUB_CACHE_TTL_MS) * GITHUB_CACHE_TTL_MS;
  const end = new Date(bucketMs);
  const start = new Date(end);
  start.setUTCFullYear(start.getUTCFullYear() - 1);
  return {
    from: start.toISOString(),
    to: end.toISOString(),
    fetchedAt: new Date(nowMs).toISOString(),
  };
}

export async function getGitHubActivity(): Promise<GitHubView | null> {
  const token = process.env.GITHUB_READ_TOKEN?.trim();
  if (!token) return null;

  return withServerCache("activity", token, async () => {
    try {
      const { from, to, fetchedAt } = getActivityWindow(Date.now());
      const profile = await queryGitHub(token, profileQuery, { from, to });
      const viewer = (profile as { viewer?: { id?: unknown; login?: unknown } }).viewer;
      if (viewer?.login !== "lakshya-02" || typeof viewer.id !== "string") {
        throw new Error("GitHub viewer missing");
      }

      let nodes: unknown[] | null = null;
      try {
        nodes = await paginateViewerRepositories(token, privateQuery, { since: from, authorId: viewer.id });
      } catch {
        nodes = null;
        console.warn("GitHub private commit count is unavailable");
      }

      return toPublicGitHubView({
        profile,
        privateRepos: nodes === null ? null : { viewer: { repositories: { nodes } } },
        fetchedAt,
      });
    } catch {
      console.warn("GitHub activity is unavailable");
      return null;
    }
  });
}

export async function getGitHubPortfolio(): Promise<GitHubPortfolio | null> {
  const token = process.env.GITHUB_READ_TOKEN?.trim();
  if (!token) return null;

  return withServerCache("portfolio", token, async () => {
    try {
      const [publicRepositories, privateRepositories] = await Promise.all([
        paginateViewerRepositories(token, portfolioPublicQuery, {}, "lakshya-02"),
        paginateViewerRepositories(token, portfolioPrivateQuery, {}, "lakshya-02").catch(() => {
          console.warn("GitHub private repository names are unavailable");
          return [];
        }),
      ]);
      return toGitHubPortfolio({
        login: "lakshya-02",
        publicRepositories,
        privateRepositories,
        fetchedAt: new Date().toISOString(),
      });
    } catch {
      console.warn("GitHub portfolio is unavailable");
      return null;
    }
  });
}
