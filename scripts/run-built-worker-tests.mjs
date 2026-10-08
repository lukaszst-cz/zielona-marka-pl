import { spawn } from "node:child_process";
import { once } from "node:events";

const host = "127.0.0.1";
const port = 8788;
const baseUrl = `http://${host}:${port}`;
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const logs = [];

const wrangler = spawn(
  npx,
  ["--no-install", "wrangler", "dev", "--ip", host, "--port", String(port), "--log-level", "error"],
  {
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

async function stopWorker() {
  if (wrangler.exitCode !== null) return;
  wrangler.kill("SIGTERM");
  await Promise.race([
    once(wrangler, "exit"),
    new Promise((resolve) => setTimeout(resolve, 3_000)),
  ]);
  if (wrangler.exitCode === null) wrangler.kill("SIGKILL");
}

let exitCode = 1;
try {
  await waitForWorker();
  const tests = spawn(
    process.execPath,
    [
      "--test",
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
  const [code] = await once(tests, "exit");
  clearTimeout(timeout);
  exitCode = typeof code === "number" ? code : 1;
} finally {
  await stopWorker();
}

process.exitCode = exitCode;
