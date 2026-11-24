import assert from "node:assert/strict";
import { test } from "node:test";
import { buildHeatmap, toPublicGitHubView } from "../lib/github-view.ts";

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
