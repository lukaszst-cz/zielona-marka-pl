import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { referencedAssets } from "./public-asset-utils.mjs";

/* Public contract: these markers must come from the live site,
   not merely exist in a successful GitHub build. */
export const releasePages = [
  { path: "/", markers: ["zm-home-offers", "zm-home-carousel", "zm-home-slide-counter", "Pokaż slajd 1: Mini audyt", "Pokaż slajd 2: Mapa Szans", "Pokaż slajd 3: Bezpłatna koncepcja", "Zobacz swoją firmę", "zmh-contact-preview", "zmh-assembly-board--premium", "zmh-preview-website", "zmh-preview-statuses"] },
  { path: "/bezplatna-koncepcja-strony", markers: ["Gazetka sprzedażowa", "Koncepcja logo", "zv5-hero-art", "zv5-tabs", "Zanim zamówisz,", "Żyj trochę", "Wybierz ten kierunek"] },
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
  return ["--zm-ui-card", ".care-plans", ".zm-dtp-prices", ".local-related nav a", ".zm-home-slide[hidden]", ".zm-home-carousel-controls", ".zm-offer-browser", ".zmh-contact-preview-message", ".zv5-desktop", ".zv5-preview-stage", ".zm-public.zm-concept .page-hero.zm-concept-hero", ".zmh-assembly-board--premium", ".zmh-preview-site-copy", "fern-frond.svg", ".zmh-cinema .zmh-website", ".zmh-cinema .zmh-flow-item"].filter(
    (marker) => !css.includes(marker),
  );
}

export async function monitorRelease({
  origin = "https://zielona-marka.pl",
  request = fetch,
} = {}) {
  const pages = [];
  const failures = [];
  const cssPaths = new Set();
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
      pages.push({ path, status: response.status, missing, cssAssets: referencedAssets(html, origin).filter((v) => v.endsWith(".css")).length });
      if (response.status !== 200) failures.push(path + ": status " + response.status);
      if (missing.length) failures.push(path + ": missing HTML markers: " + missing.join(", "));
      for (const asset of referencedAssets(html, origin).filter((v) => v.endsWith(".css"))) cssPaths.add(asset);
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
  return {
    checkedAt: new Date().toISOString(), origin, pages, cssFiles,
    expectedChanges: "PR #88 (free concepts), PR #89 (UI and care plans), PR #95 (homepage offer slides), PR #102 (free concept previews and request paths), PR #105 (shared light hero layout), V5 agreed showcase integration",
    missingCss, conceptFormProbe, failures, isCurrent: failures.length === 0,
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
    failures: report.failures,
  }, null, 2));
  if (!report.isCurrent) process.exitCode = 1;
}
