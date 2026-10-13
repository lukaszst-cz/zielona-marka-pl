import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const configUrl = new URL("../dist/server/wrangler.json", import.meta.url);
const configPath = fileURLToPath(configUrl);
const original = await readFile(configPath, "utf8");
const prepared = original.replace(/"legacy_env":true,?/g, "");

if (prepared === original) {
  console.log("Generated Wrangler configuration is ready.");
} else {
  await writeFile(configPath, prepared, "utf8");
  console.log("Removed legacy_env from generated Wrangler configuration for Wrangler 4.150+.");
}
