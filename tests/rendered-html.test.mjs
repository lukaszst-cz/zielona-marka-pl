import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

const forbiddenBrand = new RegExp(["c" + "hat", "g" + "pt"].join(""), "i");

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("strona główna prowadzi przez pięć etapów od strony do relacji", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Masz dobrą firmę/i);
  assert.match(html, /Pokażmy ją z dobrej strony/i);
  assert.match(html, /01 \/ TWOJA STRONA/i);
  assert.match(html, /02 \/ FORMULARZE/i);
  assert.match(html, /03 \/ SKLEP I PŁATNOŚCI/i);
  assert.match(html, /04 \/ CRM I OBSŁUGA ZLECEŃ/i);
  assert.match(html, /05 \/ KONTAKT PO USŁUDZE/i);
  assert.match(html, /Bezpłatny mini audyt/i);
  assert.match(html, /Przeczytaj poradnik/i);
  assert.match(html, /Bezpłatna Mapa Szans/i);
  assert.match(html, /demo\/mini-audyt-zielona-marka/i);
  assert.match(html, /demo\/mapa-szans-zielona-marka/i);
  assert.match(html, /Wyślij wiadomość/i);
  assert.match(html, /Zróbmy miejsce/i);
  assert.doesNotMatch(html, forbiddenBrand);
});

test("nowe zakładki są renderowane", async () => {
  for (const path of ["/oferta", "/modernizacja-strony", "/realizacje", "/realizacje/transportflow", "/praktyczne-narzedzia", "/usprawnienia-firmy", "/jak-pracuje", "/raport-qa", "/kontakt", "/strony-dla-warsztatow", "/strony-dla-firm-uslugowych", "/strony-dla-beauty", "/asystent-zapytan", "/maly-crm-dla-firm", "/strony-internetowe-marki", "/poradnik", "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan", "/poradnik/ile-kosztuje-strona-dla-malej-firmy"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, forbiddenBrand, path);
    if (path === "/oferta") assert.match(html, /Przelewy24/i);
    if (path === "/maly-crm-dla-firm") assert.match(html, /PWA/i);
    if (path === "/raport-qa") assert.match(html, /kontroli jakości/i);
    if (path.includes("/poradnik/")) assert.match(html, /"@type":"Article"/);
    if (path === "/poradnik") { assert.match(html, /"@type":"CollectionPage"/); assert.match(html, /AKTUALNE PORADNIKI/); }
    if (path === "/praktyczne-narzedzia") { assert.match(html, /Lead &amp; Offer Copilot/); assert.match(html, /"@type":"ItemList"/); }
    if (path === "/realizacje/transportflow") { assert.match(html, /TransportFlow 360/); assert.match(html, /"@type":"SoftwareApplication"/); }
    if (path.includes("dlaczego-strona")) assert.match(html, /7 najczęstszych przyczyn/i);
    if (path.includes("ile-kosztuje")) { assert.match(html, /1 449 zł netto/i); assert.match(html, /6 900 zł netto/i); }
  }
});

test("lokalne podstrony mają unikalną treść i działający kontakt", async () => {
  for (const city of ["zabki", "zielonka", "kobylka", "wolomin", "radzymin", "targowek", "bialoleka", "warszawa"]) {
    const response = await render(`/strony-internetowe/${city}`);
    assert.equal(response.status, 200, city);
    const html = await response.text();
    assert.match(html, /lokalny klient/i, city);
    assert.match(html, /kontakt@zielona-marka\.pl/i, city);
    assert.match(html, /FAQPage/i, city);
    assert.match(html, /KONKRETNY SCENARIUSZ/i, city);
    assert.match(html, /OBSZAR DZIAŁANIA/i, city);
    assert.doesNotMatch(html, forbiddenBrand, city);
    assert.doesNotMatch(html, /Małachowskiego\s*1/i, city);
  }
});

test("zaakceptowane zdjęcia właściciela pozostają na stronach procesu i kontaktu", async () => {
  const expected = [
    ["/jak-pracuje", "lukasz-zielona-marka-jak-pracuje-20260908.webp"],
    ["/kontakt", "lukasz-kontakt-naturalny-20260919.webp"],
  ];
  for (const [path, file] of expected) {
    assert.equal(existsSync(new URL(`../dist/client/${file}`, import.meta.url)), true, file);
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(file.replaceAll(".", "\\.")), `${path}: ${file}`);
  }
});
