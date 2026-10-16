import assert from "node:assert/strict";
import test from "node:test";
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("../app/", import.meta.url);
const forbidden = String.fromCodePoint(0x2014);

async function getSources(folder) {
  const names = await readdir(folder, { withFileTypes: true });
  const batches = await Promise.all(names.map(async entry => {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) return getSources(path);
    return /\.(tsx|ts|jsx|js|css)$/.test(entry.name) ? [path] : [];
  }));
  return batches.flat();
}

test("no em dash in any public application text or metadata", async () => {
  const offenders = [];
  for (const file of await getSources(root.pathname)) {
    const source = await readFile(file, "utf8");
    const found = source.indexOf(forbidden);
    if (found >= 0) {
      offenders.push(relative(root.pathname, file) + " at position " + found);
    }
  }
  assert.deepEqual(offenders, [], "Every public page and component must be free of long em dashes");
});