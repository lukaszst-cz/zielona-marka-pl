import assert from "node:assert/strict";
import test from "node:test";

const cities = [
  ["zabki", "Ząbek", "Ząbkach"],
  ["zielonka", "Zielonki", "Zielonce"],
  ["kobylka", "Kobyłki", "Kobyłce"],
  ["wolomin", "Wołomina", "Wołominie"],
  ["radzymin", "Radzymina", "Radzyminie"],
  ["targowek", "Targówka", "Targówku"],
  ["bialoleka", "Białołęki", "Białołęce"],
  ["warszawa", "Warszawy", "Warszawie"],
];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("lokalne strony używają właściwego przypadku nazwy miasta", async () => {
  for (const [slug, genitive, locative] of cities) {
    const response = await render(`/strony-internetowe/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = (await response.text()).replaceAll("<!-- -->", "");
    assert.match(html, new RegExp(`firmie z ${genitive}`), slug);
    assert.match(html, new RegExp(`firm z ${genitive}`), slug);
    assert.match(html, new RegExp(`działających w ${locative}`), slug);
    assert.doesNotMatch(html, new RegExp(`firmie z ${locative}`), slug);
  }
});
