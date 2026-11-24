export function prepareAsciiArt(source: string): { lines: string[]; columns: number } {
  const rows = source.replace(/\r\n?/g, "\n").split("\n");
  while (rows.length && !rows[0].trim()) rows.shift();
  while (rows.length && !rows.at(-1)?.trim()) rows.pop();
  if (!rows.length) return { lines: [], columns: 0 };

  const visible = rows.filter((row) => row.trim());
  const left = Math.min(...visible.map((row) => row.length - row.trimStart().length));
  const right = Math.max(...visible.map((row) => row.trimEnd().length));

  return {
    lines: rows.map((row) => row.padEnd(right).slice(left, right)),
    columns: right - left,
  };
}
