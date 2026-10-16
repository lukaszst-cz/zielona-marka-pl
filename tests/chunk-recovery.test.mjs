import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const source = await readFile(new URL("../public/chunk-recovery.js", import.meta.url), "utf8");

function harness({ storageBlocked = false } = {}) {
  const listeners = new Map();
  const stored = new Map();
  let reloads = 0;
  let clock = 1_800_000;
  const window = {
    location: { origin: "https://zielona-marka.pl", href: "https://zielona-marka.pl/oferta",
      reload() { reloads += 1; } },
    addEventListener(type, callback) { listeners.set(type, callback); },
  };
  const sessionStorage = {
    getItem(key) { if (storageBlocked) throw new Error("Storage unavailable"); return stored.get(key) ?? null; },
    setItem(key, value) { if (storageBlocked) throw new Error("Storage unavailable"); stored.set(key, value); },
  };
  runInNewContext(source, {
    window, sessionStorage, URL,
    Date: { now: () => clock },
  });
  return {
    trigger(type, message) {
      const event = { payload: { message }, reason: { message },
        defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
      const callback = listeners.get(type);
      assert.ok(callback, type + " must be handled");
      callback(event);
      return event;
    },
    get reloads() { return reloads; },
    advance(ms) { clock += ms; },
  };
}

const oldChunk = "Failed to fetch dynamically imported module: https://zielona-marka.pl/_next/static/chunks/PolishTypography-old123.js";

test("recovers a stale first-party Vite chunk once, without reload loops", () => {
  const h = harness();
  const first = h.trigger("vite:preloadError", oldChunk);
  assert.equal(h.reloads, 1);
  assert.equal(first.defaultPrevented, true);
  const repeated = h.trigger("vite:preloadError", oldChunk);
  assert.equal(h.reloads, 1);
  assert.equal(repeated.defaultPrevented, false, "Do not suppress errors after retry budget is exhausted");
  h.advance(31 * 60 * 1000);
  h.trigger("vite:preloadError", oldChunk);
  assert.equal(h.reloads, 2, "An old tab can recover from a subsequent deployment much later");
});

test("handles a rejected dynamic import, ignores unrelated and third-party errors", () => {
  const h = harness();
  h.trigger("unhandledrejection", "TypeError: API request failed");
  h.trigger("vite:preloadError", "Failed to fetch dynamically imported module: https://third-party.example/_next/static/chunks/evil.js");
  h.trigger("vite:preloadError", "Failed to fetch dynamically imported module: https://zielona-marka.pl/widgets/demo.js");
  assert.equal(h.reloads, 0);
  h.trigger("unhandledrejection", oldChunk);
  assert.equal(h.reloads, 1);
});

test("never reloads when session storage cannot guard against a loop", () => {
  const h = harness({ storageBlocked: true });
  const error = h.trigger("vite:preloadError", oldChunk);
  assert.equal(h.reloads, 0);
  assert.equal(error.defaultPrevented, false);
});

test("root layout installs the stable script without changing the website hero", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /<script src="\/chunk-recovery\.js" defer\s*\/>/);
  assert.match(layout, /<PolishTypography \/>/);
  assert.match(layout, /<CookieConsent \/>/);
});
