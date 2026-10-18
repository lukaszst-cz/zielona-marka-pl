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
const sourceConfigPath = fileURLToPath(new URL("../wrangler.jsonc", import.meta.url));
const sourceConfig = JSON.parse(await readFile(sourceConfigPath, "utf8"));
if (!Array.isArray(sourceConfig.send_email) || !sourceConfig.send_email.some(
  (binding) => binding.name === "INQUIRY_EMAIL" && binding.destination_address === "kontakt@zielona-marka.pl"
)) {
  throw new Error("Missing restricted inquiry email binding in source Wrangler config.");
}
let changed = false;
if (Object.hasOwn(config, "legacy_env")) {
  delete config.legacy_env;
  changed = true;
}
// Vinext generates its own deployment config: without this copy the email
// binding can disappear from the actual production Worker.
if (JSON.stringify(config.send_email) !== JSON.stringify(sourceConfig.send_email)) {
  config.send_email = sourceConfig.send_email;
  changed = true;
}
if (changed) {
  await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
  console.log("Generated Wrangler configuration updated with inquiry email binding.");
} else {
  console.log("Generated Wrangler configuration is ready.");
}
