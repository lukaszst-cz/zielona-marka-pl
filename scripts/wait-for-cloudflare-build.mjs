import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const BUILD_NAME = "Workers Builds: zielona-marka";

/** Select the newest Cloudflare production check, never a GitHub CI or Preview check. */
export function cloudflareBuildState(checkRuns) {
  const matched = (Array.isArray(checkRuns) ? checkRuns : [])
    .filter(run => run?.name === BUILD_NAME)
    .sort((a, b) => String(b.started_at || b.created_at || "")
      .localeCompare(String(a.started_at || a.created_at || "")));
  const latest = matched[0];
  if (!latest) return { kind: "waiting", detail: "Cloudflare build check not registered yet" };
  if (latest.status !== "completed") {
    return { kind: "waiting", detail: "Cloudflare build is " + latest.status };
  }
  if (latest.conclusion === "success") return { kind: "ready", detail: "Cloudflare build succeeded" };
  return { kind: "failed", detail: "Cloudflare build completed with " + String(latest.conclusion || "unknown") };
}

export async function waitForCloudflareBuild({
  lookup,
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
  attempts = 48,
  intervalMs = 10000,
} = {}) {
  if (typeof lookup !== "function") throw new Error("Cloudflare check lookup is required");
  let last = { kind: "waiting", detail: "Not checked yet" };
  for (let attempt = 1; attempt <= attempts; attempt++) {
    last = cloudflareBuildState(await lookup());
    if (last.kind === "ready") return { ...last, attempt };
    if (last.kind === "failed") throw new Error(last.detail);
    if (attempt < attempts) await sleep(intervalMs);
  }
  throw new Error("Timed out waiting for Cloudflare production build: " + last.detail);
}

async function main() {
  const token = process.env.GH_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  const sha = process.env.DEPLOYMENT_SHA;
  if (!token || !/^[^/]+\/[^/]+$/.test(repo ?? "") || !/^[a-f0-9]{40}$/i.test(sha ?? "")) {
    throw new Error("GITHUB_REPOSITORY, DEPLOYMENT_SHA and GH_TOKEN must be provided.");
  }
  const lookup = async () => {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/commits/" + sha + "/check-runs?per_page=100",
      { headers: {
        Authorization: "Bearer " + token,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      }, signal: AbortSignal.timeout(15000) },
    );
    if (!response.ok) throw new Error("GitHub check lookup HTTP " + response.status);
    return (await response.json()).check_runs ?? [];
  };
  const result = await waitForCloudflareBuild({ lookup });
  console.log("Production deployment ready for " + sha.slice(0, 12) + ": " + result.detail +
    " (check " + result.attempt + "). Starting public-browser QA.");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await main();
}
