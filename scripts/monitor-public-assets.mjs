import { mkdir, readFile, writeFile } from "node:fs/promises";
import { referencedAssets, isUnusableAssetResponse } from "./public-asset-utils.mjs";

const origin = "https://zielona-marka.pl";
const pages = ["/", "/poradnik", "/oferta", "/projektuj-strone", "/bezplatna-koncepcja-strony"];
const failures = [];
const report = {
  checkedAt: new Date().toISOString(),
  origin,
  pages: [],
  assets: [],
  previousAssets: [],
  historicalMissing: [],
  failures,
  note: "Checks HTML-referenced asset paths, not traffic analytics or real-user Core Web Vitals.",
};

async function request(path, body = false) {
  const response = await fetch(origin + path, {
    redirect: "follow",
    signal: AbortSignal.timeout(18000),
    headers: { "User-Agent": "ZielonaMarkaAssetAvailability/1.0" },
  });
  const result = {
    status: response.status,
    contentType: response.headers.get("content-type") ?? "",
    cfCache: response.headers.get("cf-cache-status") ?? "unknown",
  };
  if (body) result.html = await response.text();
  else await response.body?.cancel();
  return result;
}

const references = new Set();
// Include inactive gallery tabs: these images are absent from initial HTML.
const gallery = JSON.parse(await readFile(new URL("../public/concept-samples-v2/manifest.json", import.meta.url), "utf8"));
for (const sample of Object.values(gallery).flat()) {
  for (const width of [640, 1280]) references.add(`/concept-samples-v2/${sample.file}-${width}.webp`);
}
for (const path of pages) {
  try {
    const response = await request(path, true);
    const items = referencedAssets(response.html, origin);
    report.pages.push({ path, status: response.status, assetsReferenced: items.length });
    if (response.status !== 200 || !response.contentType.includes("text/html")) {
      failures.push(path + ": HTML status/content-type: " + response.status + " " + response.contentType);
    }
    for (const asset of items) references.add(asset);
  } catch (error) {
    failures.push(path + ": fetch failed: " + String(error.message).slice(0, 180));
  }
}

const allAssets = [...references].sort();
// Check every referenced asset, including rare chunks which would be missed
// by a sample. A cap prevents a broken HTML response from creating an
// unexpectedly large number of public requests.
const maxAssets = 180;
if (allAssets.length > maxAssets) {
  failures.push("Referenced asset count " + allAssets.length + " exceeds safety cap " + maxAssets);
}
if (!allAssets.some(path => /^\/(?:_next\/static\/|assets\/|static\/)/.test(path) && /\.(?:m?js|css)$/.test(path))) {
  failures.push("No versioned assets found in any page HTML; parser or output format changed.");
}
const queue = allAssets.slice(0, maxAssets);
await Promise.all(Array.from({ length: Math.min(3, queue.length) }, async () => {
  while (queue.length) {
    const path = queue.shift();
    if (!path) return;
    try {
      const asset = await request(path);
      report.assets.push({ path, ...asset });
      if (isUnusableAssetResponse(path, asset.status, asset.contentType)) {
        failures.push(path + ": unusable asset: " + asset.status + " " + asset.contentType);
      }
    } catch (error) {
      report.assets.push({ path, error: String(error.message).slice(0, 180) });
      failures.push(path + ": fetch failed: " + String(error.message).slice(0, 180));
    }
  }
}));

report.assets.sort((a, b) => a.path.localeCompare(b.path));

// Diagnose older, content-hashed assets referenced by tabs opened before the
// current deployment. Their disappearance is reported separately, not treated
// as proof that the current site's HTTP response is broken.
let previousPaths = [];
try {
  const saved = JSON.parse(await readFile("asset-monitor-artifacts/asset-history.json", "utf8"));
  if (Array.isArray(saved.assets)) {
    previousPaths = saved.assets.filter(path =>
      typeof path === "string" &&
      /^\/(?:_next\/static\/|assets\/|static\/)/.test(path) &&
      /\.(?:m?js|css)$/.test(path)
    );
  }
} catch (error) {
  if (error?.code !== "ENOENT") {
    report.historicalMissing.push({ issue: "previous asset manifest unreadable", detail: String(error.message).slice(0, 150) });
  }
}
const historical = [...new Set(previousPaths)].filter(path => !references.has(path)).slice(0, 80);
const historicalQueue = [...historical];
await Promise.all(Array.from({ length: Math.min(3, historicalQueue.length) }, async () => {
  while (historicalQueue.length) {
    const path = historicalQueue.shift();
    if (!path) return;
    try {
      const response = await request(path);
      const row = { path, ...response };
      report.previousAssets.push(row);
      if (isUnusableAssetResponse(path, response.status, response.contentType)) {
        report.historicalMissing.push(row);
      }
    } catch (error) {
      const row = { path, error: String(error.message).slice(0, 150) };
      report.previousAssets.push(row);
      report.historicalMissing.push(row);
    }
  }
}));
report.previousAssets.sort((a, b) => a.path.localeCompare(b.path));
await mkdir("asset-monitor-artifacts", { recursive: true });
await writeFile("asset-monitor-artifacts/asset-history.json", JSON.stringify({
  createdAt: report.checkedAt,
  assets: allAssets.slice(0, maxAssets).filter(path => /\.(?:m?js|css)$/.test(path)),
}, null, 2) + "\n");

await mkdir("asset-monitor-artifacts", { recursive: true });
await writeFile("asset-monitor-artifacts/report.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({
  pagesChecked: report.pages.length,
  versionedAssetsFound: allAssets.length,
  assetsChecked: report.assets.length,
  historicalAssetsChecked: report.previousAssets.length,
  historicalMissingCount: report.historicalMissing.length,
  failures,
}, null, 2));
if (failures.length) process.exitCode = 1;
