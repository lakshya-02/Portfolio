import assert from "node:assert/strict";
import { test } from "node:test";
import { cleanText, readmeExcerpt } from "../lib/project-readme.ts";

test("skips badges, images, code and lists, then takes the first prose", () => {
  const md = "\uFEFF# Title\r\n\r\n[![b](https://img.shields.io/x.svg)](https://x.y)\r\n\r\n<img src=\"a.png\">\r\n\r\n```\nnpm i\n```\r\n\r\n- item one here\r\n\r\nA **Unity** game with [docs](https://a.b) and `code`.\r\n\r\nSecond paragraph.";
  assert.equal(readmeExcerpt(md), "A Unity game with docs and code.");
});

test("reads a blockquote summary and caps long text on a word boundary", () => {
  assert.equal(readmeExcerpt("# T\n\n> Heritage app 🏛️ for the hackathon, built in Unity."), "Heritage app for the hackathon, built in Unity.");
  const long = cleanText("word ".repeat(100), 50);
  assert.ok(long.length <= 53 && long.endsWith("..."));
});

test("a heading directly above prose does not hide it", () => {
  assert.equal(readmeExcerpt("# Ping-Pong\nBeginner friendly Ping-Pong game"), "Beginner friendly Ping-Pong game");
});

test("returns empty when there is no prose", () => {
  assert.equal(readmeExcerpt("# T\n\n| a | b |\n|---|---|"), "");
});
test("skips underlined README headings", () => {
  assert.equal(readmeExcerpt("A very long project title\n=========================\n\nA practical tool for creating Unity scenes."), "A practical tool for creating Unity scenes.");
});
