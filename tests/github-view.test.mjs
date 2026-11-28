import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAX_README_LENGTH,
  buildHeatmap,
  toGitHubPortfolio,
  toPublicGitHubView,
} from "../lib/github-view.ts";

const raw = {
  fetchedAt: "2026-10-20T00:00:00.000Z",
  profile: {
    viewer: {
      login: "lakshya-02",
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 7,
          weeks: [{ contributionDays: [{ date: "2026-10-19", contributionCount: 2 }] }],
        },
      },
      repositories: {
        totalCount: 1,
        nodes: [
          {
            isPrivate: false,
            nameWithOwner: "lakshya-02/Public",
            url: "https://github.com/lakshya-02/Public",
            description: "Open project",
            stargazerCount: 3,
            defaultBranchRef: { target: { history: { nodes: [{
              oid: "abc123",
              messageHeadline: "Ship public feature",
              committedDate: "2026-10-19T08:00:00Z",
              url: "https://github.com/lakshya-02/Public/commit/abc123",
              author: { user: { login: "lakshya-02" } },
            }] } } },
          },
          {
            isPrivate: true,
            nameWithOwner: "lakshya-02/SECRET_PROFILE_LEAK",
            url: "https://github.com/lakshya-02/SECRET_PROFILE_LEAK",
            description: "SECRET_DESCRIPTION",
            stargazerCount: 99,
          },
        ],
      },
    },
  },
  privateRepos: {
    viewer: {
      repositories: {
        nodes: [
          {
            isPrivate: true,
            nameWithOwner: "lakshya-02/SECRET_HISTORY_LEAK",
            defaultBranchRef: { target: { history: { totalCount: 4 } } },
          },
          { isPrivate: true, isEmpty: true, defaultBranchRef: null },
        ],
      },
    },
  },
};

test("counts private commits without exposing private repository data", () => {
  const view = toPublicGitHubView(raw);

  assert.equal(view.privateCommitCount, 4);
  assert.equal(view.publicRepositoryCount, 1);
  assert.equal(view.publicStarCount, 3);
  assert.deepEqual(view.days, [{ date: "2026-10-19", count: 2 }]);
  assert.equal(view.commits[0].message, "Ship public feature");
  assert.equal(JSON.stringify(view).includes("SECRET_"), false);
});

test("keeps the calendar and public stats when private history access is unavailable", () => {
  const view = toPublicGitHubView({ ...raw, privateRepos: null });
  assert.equal(view.privateCommitCount, null);
  assert.equal(view.totalContributions, 7);
  assert.equal(view.publicRepositoryCount, 1);
  assert.deepEqual(view.days, [{ date: "2026-10-19", count: 2 }]);
});

test("does not report zero when GitHub hides a non-empty private repository branch", () => {
  const hidden = structuredClone(raw);
  hidden.privateRepos.viewer.repositories.nodes[1].isEmpty = false;
  const view = toPublicGitHubView(hidden);
  assert.equal(view.privateCommitCount, null);
  assert.equal(view.totalContributions, 7);
  assert.equal(view.publicRepositoryCount, 1);
});

test("rejects an unexpected GitHub account instead of publishing its data", () => {
  assert.throws(() => toPublicGitHubView({ ...raw, profile: { viewer: { ...raw.profile.viewer, login: "someone-else" } } }));
});

test("rejects malformed contribution counts instead of inventing zeroes", () => {
  const malformed = structuredClone(raw);
  malformed.profile.viewer.contributionsCollection.contributionCalendar.weeks[0].contributionDays[0].contributionCount = -1;
  assert.throws(() => toPublicGitHubView(malformed));
});

test("places real daily counts in weekday rows", () => {
  const { weeks } = buildHeatmap([
    { date: "2023-01-01", count: 0 },
    { date: "2023-01-02", count: 2 },
  ]);

  assert.deepEqual(weeks[0][0], { date: "2023-01-01", count: 0 });
  assert.deepEqual(weeks[0][1], { date: "2023-01-02", count: 2 });
  assert.equal(weeks[0][2], null);
});

test("aligns month labels and pads partial weeks across a year boundary", () => {
  const chart = buildHeatmap([
    { date: "2023-12-29", count: 1 },
    { date: "2023-12-30", count: 2 },
    { date: "2023-12-31", count: 3 },
    { date: "2024-01-01", count: 4 },
    { date: "2024-01-02", count: 5 },
  ]);
  assert.equal(chart.weeks.length, 2);
  assert.equal(chart.weeks[0][4], null);
  assert.deepEqual(chart.weeks[0][5], { date: "2023-12-29", count: 1 });
  assert.deepEqual(chart.weeks[1][1], { date: "2024-01-01", count: 4 });
  assert.equal(chart.weeks[1][3], null);
  assert.deepEqual(chart.months, [{ label: "dec", week: 0 }, { label: "jan", week: 1 }]);
  assert.deepEqual(buildHeatmap([]), { weeks: [], months: [] });
});

const portfolioRaw = {
  login: "lakshya-02",
  fetchedAt: "2026-11-26T12:00:00.000Z",
  publicRepositories: [
    {
      isPrivate: false,
      name: "Alpha",
      url: "https://github.com/lakshya-02/Alpha",
      description: null,
      stargazerCount: 2,
      homepageUrl: "",
      primaryLanguage: { name: "TypeScript" },
      languages: {
        edges: [
          { size: 300, node: { name: "TypeScript" } },
          { size: 100, node: { name: "CSS" } },
          { size: 50, node: { name: "Shell" } },
        ],
      },
      readmeMd: { text: "  # Alpha\r\nHello  ", isBinary: false },
    },
    {
      isPrivate: false,
      name: "Beta",
      url: "https://github.com/lakshya-02/Beta",
      description: "XR tool",
      stargazerCount: 10,
      homepageUrl: "https://beta.example.com",
      primaryLanguage: { name: "C#" },
      languages: {
        edges: [
          { size: 500, node: { name: "C#" } },
          { size: 50, node: { name: "ShaderLab" } },
          { size: 25, node: { name: "Python" } },
        ],
      },
      readmeMd: { text: "binary", isBinary: true },
      readmeLower: { text: "Fallback readme", isBinary: false },
    },
    {
      isPrivate: true,
      name: "SECRET_MIXED_IN_PUBLIC",
      url: "https://github.com/lakshya-02/SECRET_MIXED_IN_PUBLIC",
      description: "SECRET_MIXED_DESC",
      stargazerCount: 999,
      homepageUrl: "https://secret.example.com",
      primaryLanguage: { name: "SecretLang" },
      languages: { edges: [{ size: 999999, node: { name: "SecretLang" } }] },
      readmeMd: { text: "SECRET_MIXED_README", isBinary: false },
    },
  ],
  privateRepositories: [
    {
      isPrivate: true,
      name: "zeta-vault",
      url: "https://github.com/lakshya-02/SECRET_PRIV_URL",
      description: "SECRET_PRIV_DESC",
      readmeMd: { text: "SECRET_PRIV_README", isBinary: false },
      defaultBranchRef: { name: "SECRET_BRANCH" },
    },
    {
      isPrivate: true,
      name: "alpha-vault",
      languages: { edges: [{ size: 5000, node: { name: "SECRET_LANG" } }] },
    },
    { isPrivate: false, name: "NotPrivate" },
  ],
};

test("builds portfolio with public metadata, top 4 public languages, and private names only", () => {
  const portfolio = toGitHubPortfolio(portfolioRaw);

  assert.equal(portfolio.publicRepositories.length, 2);
  assert.deepEqual(portfolio.publicRepositories.map((repo) => repo.name), ["Beta", "Alpha"]);
  assert.deepEqual(portfolio.publicRepositories[0], {
    name: "Beta",
    url: "https://github.com/lakshya-02/Beta",
    fork: false,
    description: "XR tool",
    language: "C#",
    stars: 10,
    homepage: "https://beta.example.com/",
    readme: "Fallback readme",
  });
  assert.deepEqual(portfolio.publicRepositories[1], {
    name: "Alpha",
    url: "https://github.com/lakshya-02/Alpha",
    fork: false,
    description: "",
    language: "TypeScript",
    stars: 2,
    homepage: null,
    readme: "# Alpha\nHello",
  });

  assert.deepEqual(portfolio.privateRepositoryNames, ["alpha-vault", "zeta-vault"]);
  assert.equal(JSON.stringify(portfolio).includes("SECRET_"), false);

  // Total public bytes: C# 500, TypeScript 300, CSS 100, ShaderLab 50, Shell 50, Python 25 => 1025
  assert.equal(portfolio.languages.length, 4);
  assert.deepEqual(portfolio.languages, [
    { name: "C#", bytes: 500, percentage: 48.8 },
    { name: "TypeScript", bytes: 300, percentage: 29.3 },
    { name: "CSS", bytes: 100, percentage: 9.8 },
    { name: "ShaderLab", bytes: 50, percentage: 4.9 },
  ]);
});

test("truncates long public READMEs cleanly without splitting surrogate pairs", () => {
  const longWithEmojiAtBoundary = `${"a".repeat(MAX_README_LENGTH - 2)}🚀tail`;
  const raw = structuredClone(portfolioRaw);
  raw.publicRepositories = [{
    ...portfolioRaw.publicRepositories[0],
    homepageUrl: "javascript:alert(1)",
    primaryLanguage: null,
    languages: { edges: [] },
    readmeMd: { text: longWithEmojiAtBoundary, isBinary: false },
  }];
  raw.privateRepositories = [];

  const portfolio = toGitHubPortfolio(raw);
  const repo = portfolio.publicRepositories[0];
  assert.equal(repo.homepage, null);
  assert.equal(repo.language, null);
  assert.deepEqual(portfolio.languages, []);
  assert.ok(repo.readme !== null && repo.readme.length <= MAX_README_LENGTH);
  assert.ok(repo.readme.endsWith("…"));
  assert.equal(repo.readme.isWellFormed(), true);
});

test("keeps forks in the repository list without counting their code as authored languages", () => {
  const raw = structuredClone(portfolioRaw);
  raw.publicRepositories[0].isFork = true;
  const portfolio = toGitHubPortfolio(raw);
  assert.equal(portfolio.publicRepositories.find((repo) => repo.name === "Alpha").fork, true);
  assert.deepEqual(portfolio.languages.map((language) => language.name), ["C#", "ShaderLab", "Python"]);
  assert.equal(portfolio.languages[0].percentage, 87);
});

test("rejects unexpected viewer, invalid repo URL, or negative counts in portfolio", () => {
  assert.throws(() => toGitHubPortfolio({ ...portfolioRaw, login: "other-user" }));

  const badUrl = structuredClone(portfolioRaw);
  badUrl.publicRepositories[0].url = "https://evil.example.com/foo";
  assert.throws(() => toGitHubPortfolio(badUrl));

  const badBytes = structuredClone(portfolioRaw);
  badBytes.publicRepositories[0].languages.edges[0].size = -5;
  assert.throws(() => toGitHubPortfolio(badBytes));
});
