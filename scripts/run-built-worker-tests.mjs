import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";

const host = "127.0.0.1";
const port = 8788;
const baseUrl = `http://${host}:${port}`;
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const logs = [];

const wrangler = spawn(
  npx,
  ["--no-install", "vinext", "start", "--port", String(port)],
  {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NO_COLOR: "1",
      HOST: host,
      PORT: String(port),
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
      throw new Error(`vinext start exited before tests started (code ${wrangler.exitCode}).\n${logs.join("")}`);
    }
    try {
      const response = await fetch(`${baseUrl}/`, { redirect: "manual", signal: AbortSignal.timeout(2_000) });
      if (response.status < 500) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const confirm = await fetch(`${baseUrl}/`, { redirect: "manual", signal: AbortSignal.timeout(2_000) });
        if (confirm.status < 500) return;
      }
    } catch {
      // vinext start is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
  throw new Error(`Timed out waiting for vinext start at ${baseUrl}.\n${logs.join("")}`);
}

function descendantPids(rootPid) {
  if (process.platform === "win32" || !rootPid) return [];
  const result = spawnSync("ps", ["-eo", "pid=,ppid="], { encoding: "utf8" });
  if (result.status !== 0 || !result.stdout) return [];
  const children = new Map();
  for (const line of result.stdout.split("\n")) {
    const [pidText, ppidText] = line.trim().split(/\s+/);
    const pid = Number(pidText);
    const ppid = Number(ppidText);
    if (!Number.isInteger(pid) || !Number.isInteger(ppid)) continue;
    if (!children.has(ppid)) children.set(ppid, []);
    children.get(ppid).push(pid);
  }
  const ordered = [];
  const visit = (pid) => {
    for (const child of children.get(pid) ?? []) {
      visit(child);
      ordered.push(child);
    }
  };
  visit(rootPid);
  return ordered;
}

function killPid(pid, signal) {
  try {
    process.kill(pid, signal);
  } catch (error) {
    if (error?.code !== "ESRCH") throw error;
  }
}

function signalWorker(signal) {
  if (!wrangler.pid) return;
  for (const pid of descendantPids(wrangler.pid)) killPid(pid, signal);
  if (wrangler.exitCode === null) killPid(wrangler.pid, signal);
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
    console.error("Test process exceeded 360 seconds; terminating.");
    tests.kill("SIGTERM");
  }, 360_000);
  const outcome = await Promise.race([
    once(tests, "exit").then(([code]) => ({ type: "tests", code })),
    once(wrangler, "exit").then(([code, signal]) => ({ type: "wrangler", code, signal })),
  ]);
  clearTimeout(timeout);
  if (outcome.type === "wrangler") {
    console.error(`vinext start exited during tests (code ${outcome.code}, signal ${outcome.signal ?? "none"}).\n${logs.join("")}`);
    if (tests.exitCode === null) tests.kill("SIGTERM");
    exitCode = 1;
  } else {
    exitCode = typeof outcome.code === "number" ? outcome.code : 1;
  }
} finally {
  await stopWorker();
}

process.exitCode = exitCode;
