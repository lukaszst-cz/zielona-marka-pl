import assert from "node:assert/strict";
import test from "node:test";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const extensions = new Set([".tsx", ".ts", ".jsx", ".js", ".mjs", ".css", ".html", ".svg", ".json", ".txt"]);
const brandPattern = /zielon[\p{L}]*\s+mark[\p{L}]*/giu;
const approvedNames = new Set(["Zielona Marka", "ZIELONA MARKA"]);

async function* publicSourceFiles(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const location = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      yield* publicSourceFiles(location);
    } else if (entry.isFile() && extensions.has(path.extname(entry.name))) {
      yield location;
    }
  }
}

test("nazwa marki pozostaje nieodmienna na każdej podstronie i w publicznych plikach", async () => {
  const bad = [];
  let scanned = 0;
  for (const source of ["app", "public"]) {
    for await (const filename of publicSourceFiles(path.join(root, source))) {
      scanned++;
      const content = await readFile(filename, "utf8");
      for (const match of content.matchAll(brandPattern)) {
        if (approvedNames.has(match[0])) continue;
        const line = content.slice(0, match.index).split("\n").length;
        bad.push(path.relative(root, filename) + ":" + line + " (" + match[0] + ")");
      }
    }
  }
  assert.ok(scanned > 100, "Brand audit unexpectedly skipped source files");
  assert.deepEqual(bad, [], "Odmienione formy Zielona Marka są niedozwolone");
});

test("public standard buttons download newly corrected branded PDF editions", async () => {
  const downloads = [
    ["app/standard-jakosci/page.tsx", "zielona-marka-standard-jakosci-www-dtp-crm-v3-1-korekta.pdf"],
    ["app/standard-dtp/page.tsx", "zielona-marka-standard-dtp-prepress-qa-v3-1-korekta.pdf"],
  ];
  for (const [page, pdf] of downloads) {
    const source = await readFile(path.join(root, page), "utf8");
    assert.ok(source.includes('href="/downloads/' + pdf + '"'), "Outdated download link in " + page);
    const bytes = await readFile(path.join(root, "public", "downloads", pdf));
    assert.ok(bytes.length > 100000 && bytes.subarray(0, 4).toString("ascii") === "%PDF", "Invalid corrected PDF: " + pdf);
  }
});
