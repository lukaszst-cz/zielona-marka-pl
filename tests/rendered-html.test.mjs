import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

const forbiddenBrand = new RegExp(["c" + "hat", "g" + "pt"].join(""), "i");

const testBaseUrl = process.env.TEST_BASE_URL;
if (!testBaseUrl) throw new Error("TEST_BASE_URL is required. Run tests through scripts/run-built-worker-tests.mjs.");

async function render(path = "/") {
  return fetch(new URL(path, testBaseUrl), { headers: { accept: "text/html" }, signal: AbortSignal.timeout(12_000) });
}

function headMarkup(html) {
  const match = html.match(/<head(?:\s[^>]*)?>[\s\S]*?<\/head>/i);
  assert.ok(match, "document head not found");
  return match[0];
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
  assert.match(html, /href="\/realizacje\/natura-studio"/i);
  assert.match(html, /href="\/realizacje\/bistro-forma"/i);
  assert.match(html, /href="\/realizacje\/dom-dobry"/i);
  assert.doesNotMatch(html, forbiddenBrand);
});

test("nowe zakładki są renderowane", async () => {
  for (const path of ["/dtp", "/opieka-nad-strona", "/oferta", "/modernizacja-strony", "/realizacje", "/realizacje/transportflow", "/praktyczne-narzedzia", "/usprawnienia-firmy", "/jak-pracuje", "/raport-qa", "/kontakt", "/strony-dla-warsztatow", "/strony-dla-firm-uslugowych", "/strony-dla-beauty", "/asystent-zapytan", "/maly-crm-dla-firm", "/strony-internetowe-marki", "/poradnik", "/poradnik/jak-przygotowac-pdf-do-druku", "/poradnik/jak-uporzadkowac-zapytania-klientow", "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan", "/poradnik/ile-kosztuje-strona-dla-malej-firmy"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, forbiddenBrand, path);
    if (path === "/oferta") assert.match(html, /Przelewy24/i);
    if (path === "/realizacje") { assert.match(html, /href="\/realizacje\/natura-studio"/i); assert.match(html, /href="\/realizacje\/bistro-forma"/i); assert.match(html, /href="\/realizacje\/dom-dobry"/i); }
    if (path === "/maly-crm-dla-firm") assert.match(html, /PWA/i);
    if (path === "/raport-qa") assert.match(html, /kontroli jakości/i);
    if (path.includes("/poradnik/")) assert.match(html, /"@type":"Article"/);
    if (path === "/poradnik") { assert.match(html, /"@type":"CollectionPage"/); assert.match(html, /BLOG \/ ARTYKUŁY I WIEDZA/); assert.match(html, /Szukaj na blogu/); assert.match(html, /DTP i druk/); }
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
    const head = headMarkup(html);
    assert.ok(head.includes(`rel="canonical" href="https://zielona-marka.pl/strony-internetowe/${city}"`), city);
    assert.doesNotMatch(html, forbiddenBrand, city);
    assert.doesNotMatch(html, /Małachowskiego\s*1/i, city);
  }
});

test("kluczowe statyczne podstrony mają własne metadata w head", async () => {
  const expected = [
    ["/oferta", "Strony internetowe – cennik i koszt utrzymania", "Wizytówka od 899 zł netto", "https://zielona-marka.pl/oferta"],
    ["/poradnik", "Blog – strony WWW, SEO, DTP i porady dla firm", "Blog Zielonej Marki", "https://zielona-marka.pl/poradnik"],
    ["/dtp", "DTP, wizytówki, ulotki i przygotowanie do druku", "Projektowanie wizytówek", "https://zielona-marka.pl/dtp"],
    ["/opieka-nad-strona", "Opieka nad stroną, hosting i koszty utrzymania", "Ile kosztuje utrzymanie strony WWW?", "https://zielona-marka.pl/opieka-nad-strona"],
    ["/modernizacja-strony", "Modernizacja strony internetowej", "Ocena starej strony i plan modernizacji", "https://zielona-marka.pl/modernizacja-strony"],
    ["/kontakt", "Kontakt i wycena", "Skontaktuj się z Zieloną Marką", "https://zielona-marka.pl/kontakt"],
    ["/maly-crm-dla-firm", "Mały CRM dla firmy", "Od dobrego zapytania do następnego kroku", "https://zielona-marka.pl/maly-crm-dla-firm"],
  ];
  for (const [path, titlePart, descriptionPart, canonical] of expected) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const head = headMarkup(await response.text());
    assert.ok(head.includes(`<title>${titlePart} | Zielona Marka</title>`) || head.includes(`<title>${titlePart}</title>`), `${path}: title`);
    assert.ok(head.includes(descriptionPart), `${path}: description`);
    assert.ok(head.includes(`rel="canonical" href="${canonical}"`), `${path}: canonical`);
  }
});

test("dynamiczna strona projektu ma canonical w head", async () => {
  const response = await render("/realizacje/natura-studio");
  assert.equal(response.status, 200);
  const head = headMarkup(await response.text());
  assert.ok(head.includes('rel="canonical" href="https://zielona-marka.pl/realizacje/natura-studio"'));
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


test("ZM Studio is part of the real website and previews a complete customer page", async () => {
  const response = await render("/projektuj-strone");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const className of [
    "zm-header", "zm-footer", "zm-creator-config", "zm-creator-quote",
    "zm-creator-preview-wrap", "zm-demo-nav", "zm-demo-hero",
    "zm-demo-services", "zm-demo-about", "zm-demo-steps", "zm-demo-faq",
    "zm-demo-contact", "zm-demo-footer",
  ]) assert.match(html, new RegExp(className), className);
  assert.match(html, /Cała przykładowa strona/);
  assert.match(html, /Pierwszy rok łącznie/);
  assert.match(html, /Łącznie przez 3 lata/);
  assert.match(html, /<dd>od\s*<!-- -->1669 zł<\/dd>/);
  assert.match(html, /Wyślij projekt i wycenę/);
  assert.doesNotMatch(html, /class="zm-web-preview"/);
});

test("Global navigation uses categorized menu and branded social icons", async () => {
  for (const path of ["/", "/poradnik", "/projektuj-strone"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    for (const heading of ["Strony internetowe", "Materiały i identyfikacja", "Systemy dla firm", "Strony dla branż"]) {
      assert.match(html, new RegExp(heading), path + " menu: " + heading);
    }
    assert.match(html, /class="zm-mega-groups"/);
    assert.match(html, /class="zm-mobile-menu-group"/);
    assert.match(html, /\/podpis-email\/icon-facebook\.png/);
    assert.match(html, /\/podpis-email\/icon-instagram\.png/);
    assert.match(html, /\/podpis-email\/icon-www\.png/);
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i);
    assert.ok(footer, path + ": missing footer");
    assert.ok((footer[0].match(/href="\/dtp"/g) || []).length <= 1, path + ": repeated DTP link");
  }
});

test("Premium clarity and ZM Mini pricing are consistent in public website", async () => {
  const routes = ["/", "/oferta", "/projektuj-strone", "/poradnik/ile-kosztuje-strona-dla-malej-firmy"];
  for (const path of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /899 zł|899 PLN/, path + ": starter price");
    assert.doesNotMatch(html, /wizytówk[^<]{0,70}990 zł/, path + ": outdated Mini price");
  }
  const offer = await (await render("/oferta")).text();
  assert.match(offer, /jednostronicowy układ z 3 sekcjami/);
  const studio = await (await render("/projektuj-strone")).text();
  assert.match(studio, /899 zł/);
  const home = await (await render("/")).text();
  assert.match(home, /zmh-social-panel/);
  assert.match(home, /\/icon-github-zielona-marka\.svg/);
  assert.match(home, /Zaprojektuj przykładową stronę/);
  const article = await (await render("/poradnik/jak-przygotowac-pdf-do-druku")).text();
  assert.match(article, /Łukasz Staniewicz/);
});

test("ZM Studio offers five distinct full-site templates and six independent palettes", async () => {
  const html = await (await render("/projektuj-strone")).text();
  for (const name of ["Klasyczny firmowy", "Editorial premium", "Minimal &amp; elegancja", "Galeria i realizacje", "Lokalny kontakt"]) {
    assert.match(html, new RegExp(name), "Missing distinct template: " + name);
  }
  for (const color of ["Botaniczny", "Nowoczesny", "Elegancki premium", "Jasny atelier", "Ciepły terrakota", "Kreatywny śliwkowy"]) {
    assert.match(html, new RegExp(color), "Missing palette: " + color);
  }
  assert.match(html, /aria-label="Wybierz układ i wygląd strony"/);
  assert.match(html, /zm-demo-layout-classic/);
  assert.match(html, /zm-demo-footer/);
  const styles = await readFile(new URL("../app/full-site-builder.css", import.meta.url), "utf8");
  for (const layout of ["editorial", "minimal", "showcase", "contact"]) {
    assert.match(styles, new RegExp("zm-demo-layout-" + layout), "Missing responsive layout CSS: " + layout);
  }
});
