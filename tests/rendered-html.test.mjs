import assert from "node:assert/strict";
import test from "node:test";

const forbiddenBrand = new RegExp(["chat", "gpt"].join(""), "i");

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
  assert.match(html, /konkretne zapytania/i);
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
  for (const path of ["/oferta", "/modernizacja-strony", "/realizacje", "/usprawnienia-firmy", "/jak-pracuje", "/kontakt", "/strony-dla-warsztatow", "/strony-dla-firm-uslugowych", "/strony-dla-beauty", "/chatbot-dla-firm", "/maly-crm-dla-firm", "/strony-internetowe-marki"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, forbiddenBrand, path);
    if (path === "/oferta") assert.match(html, /Przelewy24/i);
    if (path === "/maly-crm-dla-firm") assert.match(html, /PWA/i);
  }
});
