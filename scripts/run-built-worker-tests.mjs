import { spawn } from "node:child_process";
import { once } from "node:events";
import { createRequire } from "node:module";

const host = "127.0.0.1";
const port = 8788;
const baseUrl = `http://${host}:${port}`;
const require = createRequire(import.meta.url);
const wranglerCli = require.resolve("wrangler/bin/wrangler.js");
const groupedProcess = process.platform !== "win32";
const logs = [];

const wrangler = spawn(
  process.execPath,
  [wranglerCli, "dev", "--compatibility-date", "2026-05-22", "--ip", host, "--port", String(port), "--log-level", "error"],
  {
    detached: groupedProcess,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NO_COLOR: "1",
      WRANGLER_SEND_METRICS: "false",
    },
  },
);

for (const stream of [wrangler.stdout, wrangler.stderr]) {
  stream?.setEncoding("utf8");
  stream?.on("data", (chunk) => {
    logs.push(chunk);
    if (logs.length > 200) logs.shift();
  });
}

async function waitForWorker() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (wrangler.exitCode !== null) {
      throw new Error(`Wrangler exited before tests started (code ${wrangler.exitCode}).\n${logs.join("")}`);
    }
    try {
      const response = await fetch(`${baseUrl}/robots.txt`, { redirect: "manual", signal: AbortSignal.timeout(2_000) });
      if (response.status < 500) return;
    } catch {
      // Wrangler is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
  throw new Error(`Timed out waiting for Wrangler at ${baseUrl}.\n${logs.join("")}`);
}

function signalWorker(signal) {
  if (wrangler.exitCode !== null) return;
  try {
    if (groupedProcess && wrangler.pid) process.kill(-wrangler.pid, signal);
    else wrangler.kill(signal);
  } catch (error) {
    if (error?.code !== "ESRCH") throw error;
  }
}

async function stopWorker() {
  if (wrangler.exitCode !== null) return;
  signalWorker("SIGTERM");
  await Promise.race([
    once(wrangler, "exit"),
    new Promise((resolve) => setTimeout(resolve, 3_000)),
  ]);
  if (wrangler.exitCode === null) {
    signalWorker("SIGKILL");
    await Promise.race([
      once(wrangler, "exit"),
      new Promise((resolve) => setTimeout(resolve, 2_000)),
    ]);
  }
}

let exitCode = 1;
try {
  await waitForWorker();
  const tests = spawn(
    process.execPath,
    [
      "--test",
      "--test-concurrency=1",
      "--test-force-exit",
      "tests/rendered-html.test.mjs",
      "tests/site-refinements.test.mjs",
      "tests/local-city-grammar.test.mjs",
    ],
    {
      stdio: "inherit",
      env: { ...process.env, TEST_BASE_URL: baseUrl },
    },
  );
  const timeout = setTimeout(() => {
    console.error("Test process exceeded 180 seconds; terminating.");
    tests.kill("SIGTERM");
  }, 180_000);
  const outcome = await Promise.race([
    once(tests, "exit").then(([code]) => ({ type: "tests", code })),
    once(wrangler, "exit").then(([code, signal]) => ({ type: "wrangler", code, signal })),
  ]);
  clearTimeout(timeout);
  if (outcome.type === "wrangler") {
    console.error(`Wrangler exited during tests (code ${outcome.code}, signal ${outcome.signal ?? "none"}).\n${logs.join("")}`);
    if (tests.exitCode === null) tests.kill("SIGTERM");
    exitCode = 1;
  } else {
    exitCode = typeof outcome.code === "number" ? outcome.code : 1;
  }
} finally {
  await stopWorker();
}

process.exitCode = exitCode;
