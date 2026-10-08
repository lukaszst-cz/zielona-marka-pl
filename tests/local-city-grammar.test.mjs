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

const testBaseUrl = process.env.TEST_BASE_URL;
if (!testBaseUrl) throw new Error("TEST_BASE_URL is required. Run tests through scripts/run-built-worker-tests.mjs.");

async function render(path) {
  return fetch(new URL(path, testBaseUrl), { headers: { accept: "text/html" } });
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
