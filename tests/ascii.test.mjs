import assert from "node:assert/strict";
import { test } from "node:test";
import { prepareAsciiArt } from "../lib/ascii.ts";

test("keeps internal spacing while removing the common outside margin", () => {
  const art = prepareAsciiArt("\n    .  \n    X X\n    - -\n\n");

  assert.equal(art.columns, 3);
  assert.deepEqual(art.lines, [".  ", "X X", "- -"]);
});

test("preserves an empty row inside the artwork", () => {
  const art = prepareAsciiArt("  A\r\n   \r\n  B\r\n");

  assert.deepEqual(art.lines, ["A", " ", "B"]);
});
