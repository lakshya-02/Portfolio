// Plain-text excerpt of a README: the first prose paragraph, no badges, images, HTML, code or lists.

const MIN = 20;

function toPlain(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[`*_~]+/g, "")
    .replace(/\p{Extended_Pictographic}\uFE0F?/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function cleanText(text: string, max = 200): string {
  const plain = toPlain(text);
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), MIN)).replace(/[\s.,;:]+$/, "")}...`;
}

export function readmeExcerpt(markdown: string, max = 200): string {
  const body = markdown
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/(```|~~~)[\s\S]*?(\1|$)/g, "\n\n")
    .replace(/^[^\n]+\n(?:=+|-+)\s*$/gm, "\n")
    .replace(/^#{1,6}\s.*$/gm, "\n");
  for (const block of body.split(/\n\s*\n/)) {
    const lines = block.split("\n").map((line) => line.trim());
    const first = lines[0] ?? "";
    // Lists, tables, rules, indented code and raw HTML blocks are not prose.
    if (/^([-*+]\s|\d+[.)]\s|\||---|===|<)/.test(first) || /^( {4}|\t)/.test(block)) continue;
    const text = toPlain(lines.map((line) => line.replace(/^>\s?/, "")).join(" "));
    if (text.length >= MIN && /[a-z]{3}/i.test(text)) return cleanText(text, max);
  }
  return "";
}
