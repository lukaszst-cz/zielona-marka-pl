import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const configPath = fileURLToPath(new URL("../dist/server/wrangler.json", import.meta.url));
const content = await readFile(configPath, "utf8");
let config;
try {
  config = JSON.parse(content);
} catch (error) {
  throw new Error("Vinext generated invalid Wrangler JSON: " + configPath, { cause: error });
}
if (!config || Array.isArray(config) || typeof config !== "object") {
  throw new Error("Vinext generated an unexpected Wrangler config shape: " + configPath);
}
// Public UI previews deliberately have no production DB or mail bindings.
// Wrangler previews do not inherit production bindings.
if (!Object.hasOwn(config, "previews")) config.previews = {};
if (Object.hasOwn(config, "legacy_env")) {
  delete config.legacy_env;
  await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
  console.log("Removed obsolete legacy_env from the generated Wrangler configuration.");
} else {
  console.log("Generated Wrangler configuration is ready.");
}
await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
