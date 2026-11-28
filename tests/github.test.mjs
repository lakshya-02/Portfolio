import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import path from "node:path";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only") {
      return { shortCircuit: true, url: "data:text/javascript," };
    }
    if (specifier === "@/lib/github-view") {
      return { shortCircuit: true, url: pathToFileURL(path.join(root, "lib", "github-view.ts")).href };
    }
    return nextResolve(specifier, context);
  },
});

const { getGitHubActivity, getGitHubPortfolio } = await import("../lib/github.ts");

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function makePublicNode(name, stars, langBytes, readmeText = null) {
  return {
    isPrivate: false,
    name,
    url: `https://github.com/lakshya-02/${name}`,
    description: `${name} description`,
    stargazerCount: stars,
    homepageUrl: null,
    primaryLanguage: langBytes.length ? { name: langBytes[0][0] } : null,
    languages: {
      edges: langBytes.map(([lang, size]) => ({ size, node: { name: lang } })),
    },
    readmeMd: readmeText ? { text: readmeText, isBinary: false } : null,
  };
}

function withMockedFetch(handler, fn) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = handler;
  return Promise.resolve().then(fn).finally(() => {
    globalThis.fetch = originalFetch;
  });
}

function withToken(token, fn) {
  const previous = process.env.GITHUB_READ_TOKEN;
  if (token === undefined) delete process.env.GITHUB_READ_TOKEN;
  else process.env.GITHUB_READ_TOKEN = token;
  return Promise.resolve().then(fn).finally(() => {
    if (previous === undefined) delete process.env.GITHUB_READ_TOKEN;
    else process.env.GITHUB_READ_TOKEN = previous;
  });
}

test("returns null without fetching when GITHUB_READ_TOKEN is missing or blank", async () => {
  let calls = 0;
  await withMockedFetch(async () => {
    calls += 1;
    return jsonResponse({});
  }, async () => {
    await withToken(undefined, async () => {
      assert.equal(await getGitHubPortfolio(), null);
      assert.equal(await getGitHubActivity(), null);
    });
    await withToken("   ", async () => {
      assert.equal(await getGitHubPortfolio(), null);
      assert.equal(await getGitHubActivity(), null);
    });
  });
  assert.equal(calls, 0);
});

test("paginates all public and private repositories and never queries private READMEs or metadata", async () => {
  const queries = [];
  await withToken("token-pagination", () => withMockedFetch(async (_url, init) => {
    const body = JSON.parse(String(init.body));
    queries.push(body);
    assert.equal(init.cache, "force-cache");
    assert.deepEqual(init.next, { revalidate: 300 });

    if (body.query.includes("privacy: PUBLIC")) {
      if (!body.variables.after) {
        return jsonResponse({
          data: {
            viewer: {
              login: "lakshya-02",
              repositories: {
                pageInfo: { hasNextPage: true, endCursor: "pub-c1" },
                nodes: [makePublicNode("RepoOne", 4, [["C#", 1000], ["HTML", 100]], "# RepoOne")],
              },
            },
          },
        });
      }
      return jsonResponse({
        data: {
          viewer: {
            login: "lakshya-02",
            repositories: {
              pageInfo: { hasNextPage: false, endCursor: null },
              nodes: [makePublicNode("RepoTwo", 9, [["TypeScript", 500]], "# RepoTwo")],
            },
          },
        },
      });
    }

    // Verify private query requests ONLY isPrivate and name (no README, URL, description, branches, or commits).
    assert.equal(/readme|description|homepage|languages|defaultBranchRef|history|\burl\b/i.test(body.query), false);
    if (!body.variables.after) {
      return jsonResponse({
        data: {
          viewer: {
            login: "lakshya-02",
            repositories: {
              pageInfo: { hasNextPage: true, endCursor: "priv-c1" },
              nodes: [{ isPrivate: true, name: "z-private" }],
            },
          },
        },
      });
    }
    return jsonResponse({
      data: {
        viewer: {
          login: "lakshya-02",
          repositories: {
            pageInfo: { hasNextPage: false, endCursor: null },
            nodes: [{ isPrivate: true, name: "a-private" }],
          },
        },
      },
    });
  }, async () => {
    const portfolio = await getGitHubPortfolio();
    assert.ok(portfolio);
    assert.deepEqual(portfolio.publicRepositories.map((r) => r.name), ["RepoTwo", "RepoOne"]);
    assert.deepEqual(portfolio.privateRepositoryNames, ["a-private", "z-private"]);
    assert.deepEqual(portfolio.languages.map((l) => l.name), ["C#", "TypeScript", "HTML"]);
    assert.equal(queries.length, 4);
  }));
});

test("caches portfolio and activity for 5 minutes with stable activity window keys and does not cache failures", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.parse("2026-11-26T12:00:05.000Z") });

  let portfolioCalls = 0;
  let activityProfileBodies = [];
  let shouldFail = true;

  await withToken("token-cache", () => withMockedFetch(async (_url, init) => {
    const body = JSON.parse(String(init.body));

    if (shouldFail) return jsonResponse({ errors: [{ message: "temporary outage" }] });

    if (body.query.includes("contributionsCollection")) {
      activityProfileBodies.push(body.variables);
      return jsonResponse({
        data: {
          viewer: {
            id: "user-1",
            login: "lakshya-02",
            contributionsCollection: {
              contributionCalendar: {
                totalContributions: 1,
                weeks: [{ contributionDays: [{ date: "2026-11-26", contributionCount: 1 }] }],
              },
            },
            repositories: { totalCount: 0, nodes: [] },
          },
        },
      });
    }

    if (body.query.includes("history(since:")) {
      return jsonResponse({
        data: {
          viewer: {
            repositories: {
              pageInfo: { hasNextPage: false, endCursor: null },
              nodes: [],
            },
          },
        },
      });
    }

    portfolioCalls += 1;
    const isPrivate = body.query.includes("privacy: PRIVATE");
    return jsonResponse({
      data: {
        viewer: {
          login: "lakshya-02",
          repositories: {
            pageInfo: { hasNextPage: false, endCursor: null },
            nodes: isPrivate ? [{ isPrivate: true, name: "hidden" }] : [makePublicNode("Repo", 1, [["C#", 100]])],
          },
        },
      },
    });
  }, async () => {
    // Failures return null and are NOT cached.
    assert.equal(await getGitHubPortfolio(), null);
    assert.equal(await getGitHubActivity(), null);

    shouldFail = false;
    const [p1, p2] = await Promise.all([getGitHubPortfolio(), getGitHubPortfolio()]);
    assert.ok(p1 && p2);
    assert.equal(portfolioCalls, 2); // 1 public + 1 private (concurrent dedup)

    const a1 = await getGitHubActivity();
    assert.ok(a1);
    assert.equal(activityProfileBodies.length, 1);
    assert.equal(activityProfileBodies[0].to, "2026-11-26T12:00:00.000Z");

    // Advance 4 minutes (< 5 min): served from cache without hitting fetch.
    t.mock.timers.tick(240_000);
    assert.deepEqual(await getGitHubPortfolio(), p1);
    assert.deepEqual(await getGitHubActivity(), a1);
    assert.equal(portfolioCalls, 2);
    assert.equal(activityProfileBodies.length, 1);

    // Advance past 5 minutes: re-fetches with next 5-minute activity bucket.
    t.mock.timers.tick(60_000);
    const p3 = await getGitHubPortfolio();
    const a2 = await getGitHubActivity();
    assert.ok(p3 && a2);
    assert.equal(portfolioCalls, 4);
    assert.equal(activityProfileBodies.length, 2);
    assert.equal(activityProfileBodies[1].to, "2026-11-26T12:05:00.000Z");
  }));
});

test("rejects broken pagination or the wrong viewer and preserves public data during a private-query outage", async () => {
  await withToken("token-bad-cursor", () => withMockedFetch(async () => jsonResponse({
    data: {
      viewer: {
        login: "lakshya-02",
        repositories: {
          pageInfo: { hasNextPage: true, endCursor: null },
          nodes: [],
        },
      },
    },
  }), async () => {
    assert.equal(await getGitHubPortfolio(), null);
  }));

  await withToken("token-wrong-viewer", () => withMockedFetch(async () => jsonResponse({
    data: {
      viewer: {
        login: "not-lakshya",
        repositories: { pageInfo: { hasNextPage: false, endCursor: null }, nodes: [] },
      },
    },
  }), async () => {
    assert.equal(await getGitHubPortfolio(), null);
  }));

  await withToken("token-private-fail", () => withMockedFetch(async (_url, init) => {
    const body = JSON.parse(String(init.body));
    if (body.query.includes("privacy: PRIVATE")) return jsonResponse({}, 502);
    return jsonResponse({
      data: {
        viewer: {
          login: "lakshya-02",
          repositories: {
            pageInfo: { hasNextPage: false, endCursor: null },
            nodes: [makePublicNode("Repo", 1, [["C#", 100]])],
          },
        },
      },
    });
  }, async () => {
    const portfolio = await getGitHubPortfolio();
    assert.equal(portfolio.publicRepositories[0].name, "Repo");
    assert.deepEqual(portfolio.privateRepositoryNames, []);
    assert.equal(portfolio.languages[0].name, "C#");
  }));
});
