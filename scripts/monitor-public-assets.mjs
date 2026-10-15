import { mkdir, writeFile } from "node:fs/promises";
import { referencedAssets, isUnusableAssetResponse } from "./public-asset-utils.mjs";

const origin = "https://zielona-marka.pl";
const pages = ["/", "/poradnik", "/oferta", "/projektuj-strone", "/bezplatna-koncepcja-strony"];
const failures = [];
const report = {
  checkedAt: new Date().toISOString(),
  origin,
  pages: [],
  assets: [],
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
const picked = [
  ...allAssets.filter(path => /\.(?:m?js)$/.test(path)).slice(0, 20),
  ...allAssets.filter(path => /\.css$/.test(path)).slice(0, 8),
  ...allAssets.filter(path => !/\.(?:m?js|css)$/.test(path)).slice(0, 4),
];
if (picked.length === 0) failures.push("No versioned assets found in any page HTML; parser or output format changed.");
const queue = [...new Set(picked)];
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
await mkdir("asset-monitor-artifacts", { recursive: true });
await writeFile("asset-monitor-artifacts/report.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({
  pagesChecked: report.pages.length,
  versionedAssetsFound: allAssets.length,
  assetsChecked: report.assets.length,
  failures,
}, null, 2));
if (failures.length) process.exitCode = 1;
