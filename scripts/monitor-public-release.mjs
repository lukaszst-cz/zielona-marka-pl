import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { referencedAssets, isUnusableAssetResponse } from "./public-asset-utils.mjs";

/** Read-only readiness check. Never submit a lead or send a monitoring email. */
export async function probeInquiryReadiness({ origin = "https://zielona-marka.pl", request = fetch } = {}) {
  try {
    const response = await request(new URL("/api/inquiries", origin), {
      headers: { "Cache-Control": "no-store" }, signal: AbortSignal.timeout(16000),
    });
    const body = await response.json();
    const ready = response.ok && body?.enabled === true && body?.databaseConfigured === true && body?.notificationConfigured === true;
    return { status: response.status, ready };
  } catch {
    return { status: null, ready: false };
  }
}

/* Public contract: these HTML markers must be returned by the server.
   Client-rendered assembly parts are verified in browser QA after hydration. */
export const releasePages = [
  { path: "/", markers: ["inspiration-services", "inspiration-story", "zm-approved-concept-scene", "zmh-piece-concept", "zmh-contact-concepts", "Zobacz swoją firmę"] },
  { path: "/bezplatna-koncepcja-strony", markers: ["Gazetka sprzedażowa", "Koncepcja logo", "zm-editorial-art", "zv5-tabs", "Twoja firma.", "existing-1280.webp", "Gdzie przesłać propozycję?"] },
  { path: "/opieka-nad-strona", markers: ["care-plans", "care-plan-benefit", "care-plan-difference", "Co zyskujesz?"] },
  { path: "/strony-internetowe", markers: ["Wybierz miasto lub dzielnicę."] },
  { path: "/dtp", markers: ["DTP"] },
  { path: "/projektuj-strone", markers: ["ZM Studio"] },
];

export function missingPageMarkers(html, markers) {
  return markers.filter((marker) => !html.includes(marker));
}

export function missingUiStyles(css) {
  // Unlike general file availability checks, these tokens identify the
  // actual Oct 2026 shared layout changes in the served CSS bundle.
  return ["--zm-ui-card", ".care-plans", ".zm-dtp-prices", ".local-related nav a", ".inspiration-services", ".inspiration-story", ".zm-generated-sample", ".zmh-contact-concepts", ".zmh-assembly-board", ".zmh-piece-concept", ".zmh-cinema", ".zmh-flow-item", ".zm-concept-lightbox", ".zv5-preview-stage", ".zm-public.zm-concept .page-hero.zm-concept-hero"].filter(
    (marker) => !css.includes(marker),
  );
}

/* Recheck a missing immutable script once: deployments may shift between edges.
   A persistent 404 is a potential client-side hydration failure, even on HTTP 200 pages. */
export async function probeScriptAsset(path, { origin, request, retryDelayMs = 1200 }) {
  let result = { path, ok: false, status: null, contentType: "", cfCache: null };
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await request(new URL(path, origin), {
        headers: { "cache-control": "no-cache", "User-Agent": "ZielonaMarkaReleaseParity/1.0" },
        signal: AbortSignal.timeout(12000),
      });
      const contentType = response.headers?.get?.("content-type") ?? "";
      result = { path, ok: !isUnusableAssetResponse(path, response.status, contentType),
        status: response.status, contentType,
        cfCache: response.headers?.get?.("cf-cache-status") ?? null, attempts: attempt };
      await response.body?.cancel?.();
      if (result.ok) return result;
    } catch (error) {
      result = { path, ok: false, status: null, error: String(error.message).slice(0, 140), attempts: attempt };
    }
    if (attempt === 1 && retryDelayMs > 0) await new Promise(resolve => setTimeout(resolve, retryDelayMs));
  }
  return result;
}

export async function monitorRelease({
  origin = "https://zielona-marka.pl",
  request = fetch,
} = {}) {
  const pages = [];
  const failures = [];
  const cssPaths = new Set();
  const jsPaths = new Set();
  for (const { path, markers } of releasePages) {
    try {
      const url = new URL(path, origin);
      url.searchParams.set("_zm_release_probe", String(Date.now()));
      const response = await request(url, {
        signal: AbortSignal.timeout(16000),
        headers: { "cache-control": "no-cache", "User-Agent": "ZielonaMarkaReleaseParity/1.0" },
      });
      const html = await response.text();
      const missing = missingPageMarkers(html, markers);
      const assets = referencedAssets(html, origin);
      pages.push({ path, status: response.status, missing,
        cssAssets: assets.filter(v => v.endsWith(".css")).length,
        jsAssets: assets.filter(v => /\.m?js$/.test(v)).length });
      if (response.status !== 200) failures.push(path + ": status " + response.status);
      if (missing.length) failures.push(path + ": missing HTML markers: " + missing.join(", "));
      for (const asset of assets.filter(v => v.endsWith(".css"))) cssPaths.add(asset);
      for (const asset of assets.filter(v => /\.m?js$/.test(v))) jsPaths.add(asset);
    } catch (err) {
      failures.push(path + ": " + String(err.message).slice(0, 180));
    }
  }

  const cssFiles = [];
  let combinedCss = "";
  const candidates = [...cssPaths].slice(0, 32);
  if (candidates.length === 0) failures.push("No public CSS assets found in rendered HTML.");
  for (const asset of candidates) {
    try {
      const response = await request(new URL(asset, origin), { signal: AbortSignal.timeout(16000) });
      const css = await response.text();
      cssFiles.push({ path: asset, status: response.status, bytes: css.length });
      if (response.status >= 200 && response.status < 300 && !css.slice(0, 100).toLowerCase().includes("<!doctype html")) combinedCss += css + "\n";
    } catch (err) {
      cssFiles.push({ path: asset, error: String(err.message).slice(0, 180) });
    }
  }
  const missingCss = missingUiStyles(combinedCss);
  if (missingCss.length) failures.push("Production CSS is missing current UI rules: " + missingCss.join(", "));

  const scriptAssets = [];
  const scriptsToCheck = [...jsPaths].slice(0, 120);
  if (scriptsToCheck.length === 0) failures.push("No public versioned JavaScript assets found in rendered HTML.");
  for (let i = 0; i < scriptsToCheck.length; i += 8) {
    scriptAssets.push(...await Promise.all(scriptsToCheck.slice(i, i + 8).map(path =>
      probeScriptAsset(path, { origin, request }))));
  }
  const missingScripts = scriptAssets.filter(asset => !asset.ok);
  if (missingScripts.length) failures.push("Public HTML references unavailable JavaScript assets: " +
    missingScripts.slice(0, 8).map(asset => asset.path + " (HTTP " + (asset.status ?? "unknown") + ")").join(", "));
  if (jsPaths.size > scriptsToCheck.length) failures.push("JavaScript asset check truncated before all referenced scripts.");

  // Safe negative probe: invalid type must be rejected before D1/email writes.
  // A distinctive validation response proves the latest form handler is deployed.
  let conceptFormProbe = { status: null, currentHandler: false };
  try {
    const payload = new URLSearchParams({
      name: "QA",
      email: "concept-probe@example.invalid",
      company: "Kontrola formularza",
      mode: "__invalid_probe__",
      details: "Tylko test walidacji; nie zapisuj zgłoszenia.",
      consent: "yes",
    });
    const response = await request(new URL("/api/inquiries", origin), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": new URL(origin).origin,
        "Cache-Control": "no-store",
      },
      body: payload,
      signal: AbortSignal.timeout(16000),
    });
    const body = await response.text();
    conceptFormProbe = {
      status: response.status,
      currentHandler: response.status === 400 && body.includes("Uzupełnij firmę, rodzaj projektu i opis"),
    };
    if (!conceptFormProbe.currentHandler) {
      failures.push("Free concept native form handler is not confirmed on production (HTTP " + response.status + ").");
    }
  } catch (err) {
    failures.push("Free concept form probe failed: " + String(err.message).slice(0, 180));
  }
  const inquiryReadiness = await probeInquiryReadiness({ origin, request });
  if (!inquiryReadiness.ready) failures.push("Automatic inquiry forms are not enabled or their database/mail configuration is unavailable.");
  return {
    checkedAt: new Date().toISOString(), origin, pages, cssFiles, scriptAssets, missingScripts,
    expectedChanges: "PR #88 (free concepts), PR #89 (UI and care plans), PR #95 (homepage offer slides), PR #102 (free concept previews and request paths), PR #105 (shared light hero layout), V5 agreed showcase integration",
    missingCss, conceptFormProbe, inquiryReadiness, failures, isCurrent: failures.length === 0,
    note: "This checks public release parity; successful GitHub CI alone cannot prove Cloudflare deployment.",
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const report = await monitorRelease();
  await mkdir("release-monitor-artifacts", { recursive: true });
  await writeFile("release-monitor-artifacts/report.json", JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify({
    isCurrent: report.isCurrent,
    pagesChecked: report.pages.length,
    cssAssetsChecked: report.cssFiles.length,
    jsAssetsChecked: report.scriptAssets.length,
    missingJsAssets: report.missingScripts.length,
    failures: report.failures,
  }, null, 2));
  if (!report.isCurrent) process.exitCode = 1;
}
