import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const root = new URL("../public/concept-samples-v2/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("manifest.json", root), "utf8"));
const checksums = JSON.parse(await readFile(new URL("checksums.json", root), "utf8"));
const files = new Set();
for (const options of Object.values(manifest)) {
  if (options.length !== 3) throw new Error("Each concept category must have three examples");
  for (const sample of options) {
    if (!/^[a-z0-9-]+$/.test(sample.file) || !sample.title || !sample.alt) throw new Error("Invalid gallery manifest entry");
    for (const width of [640, 1280]) files.add(`${sample.file}-${width}.webp`);
  }
}
if (files.size !== 30) throw new Error("Expected 15 unique concepts in two sizes");
for (const file of files) {
  const bytes = await readFile(new URL(file, root));
  if (bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WEBP") throw new Error("Invalid WebP: " + file);
  if (createHash("sha256").update(bytes).digest("hex") !== checksums[file]) throw new Error("Gallery image checksum mismatch: " + file);
}
console.log(`Verified ${files.size} original gallery images.`);
