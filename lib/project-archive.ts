import "server-only";
import { projects } from "@/data/projects";
import { getGitHubPortfolio } from "@/lib/github";
import { cleanText, readmeExcerpt } from "@/lib/project-readme";

export interface MoreProject {
  name: string;
  url: string;
  text: string;
  language: string;
  stars: number;
  fork: boolean;
}

export interface ProjectArchive {
  more: MoreProject[];
  privateNames: string[];
}

// Repositories already told in full by data/projects.ts, plus the profile and site repos.
const skipped = new Set([
  "lakshya-02",
  "portfolio",
  ...projects.map((project) => project.links.source.split("/").pop()?.toLowerCase() ?? ""),
]);

// GitHub results are cached for five minutes. Curated projects remain available if GitHub fails.
export async function getProjectArchive(): Promise<ProjectArchive> {
  const portfolio = await getGitHubPortfolio().catch(() => null);
  if (!portfolio) return { more: [], privateNames: [] };

  const more = portfolio.publicRepositories
    .filter((repo) => {
      return !skipped.has(repo.name.toLowerCase()) && repo.url.startsWith("https://github.com/");
    })
    .map((repo) => ({
      name: repo.name,
      url: repo.url,
      text: readmeExcerpt(repo.readme ?? "") || cleanText(repo.description ?? "") || "Explore the source on GitHub.",
      language: repo.language ?? "",
      stars: repo.stars,
      fork: repo.fork,
    }))
    .sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name));

  return { more, privateNames: portfolio.privateRepositoryNames };
}
