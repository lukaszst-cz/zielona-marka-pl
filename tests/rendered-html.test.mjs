import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const forbiddenBrand = new RegExp(String.fromCodePoint(99, 104, 97, 116, 103, 112, 116), "i");
const forbiddenDeveloperLink = /github\.com\/lukaszst-cz/i;
const forbiddenPrivateEmail = /lukasz\.staniewicz@gmail\.com/i;

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("strona główna renderuje ofertę i drogę do kontaktu", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /cyfrowe miejsca/i);
  assert.match(html, /Modernizacja/i);
  assert.match(html, /warsztaty/i);
  assert.match(html, /beauty/i);
  assert.match(html, /Mały CRM/i);
  assert.match(html, /30% na start/i);
  assert.match(html, /2 490 zł/i);
  assert.match(html, /kontakt@zielona-marka\.pl/i);
  assert.doesNotMatch(html, forbiddenBrand);
});

test("nowe zakładki są renderowane", async () => {
  for (const path of ["/oferta", "/modernizacja-strony", "/realizacje", "/realizacje/transportflow", "/usprawnienia-firmy", "/jak-pracuje", "/kontakt", "/strony-dla-warsztatow", "/strony-dla-firm-uslugowych", "/strony-dla-beauty", "/asystent-zapytan", "/maly-crm-dla-firm", "/strony-internetowe-marki"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, forbiddenBrand, path);
    if (path === "/oferta") assert.match(html, /Przelewy24/i);
    if (path === "/maly-crm-dla-firm") assert.match(html, /PWA/i);
    if (path === "/realizacje/transportflow") {
      assert.match(html, /TransportFlow/i);
      assert.doesNotMatch(html, forbiddenDeveloperLink);
    }
    if (path === "/realizacje") assert.doesNotMatch(html, forbiddenDeveloperLink);
  }
});

test("prywatny login nie jest zapisany w publicznym kodzie", async () => {
  const sources = await Promise.all([
    readFile(new URL("../app/studio/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/studio/session.ts", import.meta.url), "utf8"),
  ]);
  for (const source of sources) assert.doesNotMatch(source, forbiddenPrivateEmail);
});

test("strefa klienta ma zakaz indeksowania", async () => {
  const response = await render("/status");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /name="robots"[^>]+noindex/i);
});


test("główne wewnętrzne linki nie prowadzą do 404", async () => {
  const seeds = ["/", "/oferta", "/modernizacja-strony", "/realizacje", "/usprawnienia-firmy", "/jak-pracuje", "/kontakt", "/strony-dla-warsztatow", "/strony-dla-firm-uslugowych", "/strony-dla-beauty", "/asystent-zapytan", "/maly-crm-dla-firm", "/strony-internetowe-marki"];
  const checked = new Set();
  for (const seed of seeds) {
    const response = await render(seed);
    assert.equal(response.status, 200, seed);
    const html = await response.text();
    const hrefs = [...html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)].map(match => match[1] || "/");
    for (const href of hrefs) {
      if (checked.has(href) || href.startsWith("/status") || href.startsWith("/studio") || href.startsWith("/demo") || /\.(?:png|jpe?g|webp|svg|ico|mp4|webm|pdf)$/i.test(href)) continue;
      checked.add(href);
      const linked = await render(href);
      assert.notEqual(linked.status, 404, `${seed} -> ${href}`);
    }
  }
});
