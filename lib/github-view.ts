export interface GitHubView {
  days: { date: string; count: number }[];
  totalContributions: number;
  privateCommitCount: number | null;
  publicRepositoryCount: number;
  publicStarCount: number;
  repositories: { name: string; url: string; description: string; stars: number }[];
  commits: { message: string; url: string; date: string; repository: string }[];
  fetchedAt: string;
}

export interface GitHubPortfolioRepository {
  name: string;
  fork: boolean;
  url: string;
  description: string;
  language: string | null;
  stars: number;
  homepage: string | null;
  readme: string | null;
}

export interface GitHubPortfolioLanguage {
  name: string;
  bytes: number;
  percentage: number;
}

export interface GitHubPortfolio {
  publicRepositories: GitHubPortfolioRepository[];
  privateRepositoryNames: string[];
  languages: GitHubPortfolioLanguage[];
  fetchedAt: string;
}

export const MAX_README_LENGTH = 4000;
const readmeFields = ["readmeMd", "readmeLower", "readmeTitle", "readmeUpper", "readmePlain", "readmeTxt", "readmeRst"] as const;

export function buildHeatmap(days: GitHubView["days"]) {
  const months: { label: string; week: number }[] = [];
  if (!days.length) return { weeks: [], months };
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (GitHubView["days"][number] | null)[] = [...Array(offset).fill(null), ...days];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) => cells.slice(index * 7, index * 7 + 7));
  const formatter = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
  days.forEach((day, index) => {
    if (index === 0 || day.date.slice(0, 7) !== days[index - 1].date.slice(0, 7)) {
      months.push({
        label: formatter.format(new Date(`${day.date}T00:00:00Z`)).toLowerCase(),
        week: Math.floor((offset + index) / 7),
      });
    }
  });
  return { weeks, months };
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid GitHub response");
  return value as Record<string, unknown>;
}

function field(value: unknown, ...keys: string[]): unknown {
  return keys.reduce<unknown>((current, key) => object(current)[key], value);
}

function array(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error("Invalid GitHub response");
  return value;
}

function string(value: unknown): string {
  if (typeof value !== "string") throw new Error("Invalid GitHub response");
  return value;
}

function nonEmptyString(value: unknown): string {
  const text = string(value).trim();
  if (!text) throw new Error("Invalid GitHub string");
  return text;
}

function count(value: unknown): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) throw new Error("Invalid GitHub count");
  return value as number;
}

function githubUrl(value: unknown): string {
  const url = new URL(string(value));
  if (url.protocol !== "https:" || url.hostname !== "github.com") throw new Error("Invalid GitHub URL");
  return url.toString();
}

function optionalHttpUrl(value: unknown): string | null {
  if (value == null) return null;
  const raw = string(value).trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function truncateReadme(raw: string): string | null {
  const clean = raw.replace(/\0/g, "").replace(/\r\n?/g, "\n").trim();
  if (!clean) return null;
  if (clean.length <= MAX_README_LENGTH) return clean;
  let end = MAX_README_LENGTH - 1;
  // Avoid cutting a UTF-16 surrogate pair across the truncation boundary.
  if (end > 0 && clean.charCodeAt(end - 1) >= 0xd800 && clean.charCodeAt(end - 1) <= 0xdbff) {
    end -= 1;
  }
  return `${clean.slice(0, end).trimEnd()}…`;
}

function extractReadme(repo: Record<string, unknown>): string | null {
  for (const key of readmeFields) {
    const blob = repo[key];
    if (!blob || typeof blob !== "object" || Array.isArray(blob)) continue;
    const record = blob as Record<string, unknown>;
    if (record.isBinary === true || typeof record.text !== "string") continue;
    const truncated = truncateReadme(record.text);
    if (truncated !== null) return truncated;
  }
  return null;
}

export function toPublicGitHubView(raw: unknown): GitHubView {
  const viewer = field(raw, "profile", "viewer");
  if (field(viewer, "login") !== "lakshya-02") throw new Error("Unexpected GitHub account");

  const calendar = field(viewer, "contributionsCollection", "contributionCalendar");
  const days = array(field(calendar, "weeks")).flatMap((week) =>
    array(field(week, "contributionDays")).map((day) => {
      const date = string(field(day, "date"));
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Invalid contribution date");
      return { date, count: count(field(day, "contributionCount")) };
    }),
  );

  const publicNodes = array(field(viewer, "repositories", "nodes"))
    .filter((repo) => field(repo, "isPrivate") === false);
  if (count(field(viewer, "repositories", "totalCount")) > publicNodes.length) {
    throw new Error("Incomplete public repository list");
  }
  const repositories = publicNodes.map((repo) => ({
    name: string(field(repo, "nameWithOwner")),
    url: githubUrl(field(repo, "url")),
    description: field(repo, "description") == null ? "" : string(field(repo, "description")),
    stars: count(field(repo, "stargazerCount")),
  })).sort((a, b) => b.stars - a.stars).slice(0, 5);

  const commits = publicNodes.flatMap((repo) => {
    const branch = field(repo, "defaultBranchRef");
    if (branch == null) return [];
    return array(field(branch, "target", "history", "nodes"))
      .filter((commit) => field(commit, "author", "user") != null && field(commit, "author", "user", "login") === "lakshya-02")
      .map((commit) => ({
        message: string(field(commit, "messageHeadline")),
        url: githubUrl(field(commit, "url")),
        date: string(field(commit, "committedDate")),
        repository: string(field(repo, "nameWithOwner")),
      }));
  }).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const privateData = field(raw, "privateRepos");
  const privateNodes = privateData === null ? null : array(field(privateData, "viewer", "repositories", "nodes"));
  const privateCommitCount = privateNodes === null ? null : privateNodes.reduce<number | null>((total, repo) => {
    if (total === null) return null;
    if (field(repo, "isPrivate") !== true) return total;
    const branch = field(repo, "defaultBranchRef");
    // GitHub can hide branch data without returning a permission error.
    if (branch == null) return field(repo, "isEmpty") === true ? total : null;
    return total + count(field(branch, "target", "history", "totalCount"));
  }, 0);

  return {
    days,
    totalContributions: count(field(calendar, "totalContributions")),
    privateCommitCount,
    publicRepositoryCount: publicNodes.length,
    publicStarCount: publicNodes.reduce<number>((total, repo) => total + count(field(repo, "stargazerCount")), 0),
    repositories,
    commits,
    fetchedAt: string(field(raw, "fetchedAt")),
  };
}

export function toGitHubPortfolio(raw: unknown): GitHubPortfolio {
  const input = object(raw);
  if (field(input, "login") !== "lakshya-02") throw new Error("Unexpected GitHub account");

  const publicNodes = array(field(input, "publicRepositories"))
    .filter((repo) => repo != null && field(repo, "isPrivate") === false);

  const languageBytes = new Map<string, number>();
  let totalLanguageBytes = 0;

  const publicRepositories = publicNodes.map((repo) => {
    const record = object(repo);
    const language = record.primaryLanguage == null
      ? null
      : string(field(record.primaryLanguage, "name")).trim() || null;

    if (record.isFork !== true && record.languages != null) {
      for (const edge of array(field(record.languages, "edges"))) {
        if (edge == null) continue;
        const bytes = count(field(edge, "size"));
        if (bytes === 0) continue;
        const languageName = nonEmptyString(field(edge, "node", "name"));
        languageBytes.set(languageName, (languageBytes.get(languageName) ?? 0) + bytes);
        totalLanguageBytes += bytes;
      }
    }

    return {
      name: nonEmptyString(record.name),
      fork: record.isFork === true,
      url: githubUrl(record.url),
      description: record.description == null ? "" : string(record.description),
      language,
      stars: count(record.stargazerCount),
      homepage: optionalHttpUrl(record.homepageUrl),
      readme: extractReadme(record),
    };
  }).sort((a, b) => b.stars - a.stars);

  const privateRepositoryNames = array(field(input, "privateRepositories"))
    .filter((repo) => repo != null && field(repo, "isPrivate") === true)
    .map((repo) => nonEmptyString(field(repo, "name")))
    .sort((a, b) => a.localeCompare(b));

  const languages = Array.from(languageBytes.entries())
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalLanguageBytes > 0 ? Math.round((bytes / totalLanguageBytes) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes || a.name.localeCompare(b.name))
    .slice(0, 4);

  return {
    publicRepositories,
    privateRepositoryNames,
    languages,
    fetchedAt: nonEmptyString(field(input, "fetchedAt")),
  };
}
