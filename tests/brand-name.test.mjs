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
