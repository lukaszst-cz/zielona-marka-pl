import assert from "node:assert/strict";
import test from "node:test";
import { readFile, stat } from "node:fs/promises";
import worker from "../dist/server/index.js";

const env = { ASSETS: { fetch: async () => new Response("Not found", {status:404}) } };
const context = { waitUntil() {}, passThroughOnException() {} };
const fetchPage = (path, options) => worker.fetch(new Request("http://localhost"+path, options),env,context);

test("public header and simplified demo navigation",async()=>{
  const status=await fetchPage("/status");
  assert.equal(status.status,200);
  const statusHtml=await status.text();
  assert.equal((statusHtml.match(/class="zm-header"/g)||[]).length,1);
  assert.match(statusHtml,/logo-fern-automation-white.svg/);
  for(const path of ["/demo/natura","/demo/bistro","/demo/dom","/demo/transport","/demo/natura-strona","/demo/bistro-strona","/demo/dom-strona"]){
    const response=await fetchPage(path);
    assert.equal(response.status,200,path);
    assert.equal(response.headers.get("x-content-type-options"),"nosniff",path);
    const html=await response.text();
    assert.equal((html.match(/class="zm-header"/g)||[]).length,0,path);
    assert.equal((html.match(/class="demo-simple-nav"/g)||[]).length,1,path);
    assert.match(html,/Wróć do strony głównej/,path);
  }
});
test("English language rendered on server",async()=>{
  assert.match(await (await fetchPage("/en")).text(),/<html lang="en"/);
});
test("canonical domain keeps path and query",async()=>{
  for(const origin of ["http://zielona-marka.pl","http://www.zielona-marka.pl","https://www.zielona-marka.pl"]){
    const response=await worker.fetch(new Request(origin+"/oferta?source=test"),env,context);
    assert.equal(response.status,301);
    assert.equal(response.headers.get("location"),"https://zielona-marka.pl/oferta?source=test");
  }
});
test("inquiry validation rejects invalid submissions before database access",async()=>{
  const send=body=>fetchPage("/api/inquiries",{method:"POST",headers:{"content-type":"application/json"},body});
  for(const body of ["null","{","[]",JSON.stringify({name:"Test",email:"bad@",message:"Test",consent:"yes"}),JSON.stringify({name:"Test",email:"test@example.com",message:"Test"})]){
    assert.equal((await send(body)).status,400);
  }
  assert.equal((await send("x".repeat(20001))).status,413);
  assert.equal((await fetchPage("/api/inquiries",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:"name=test"})).status,400);
});
test("metadata titles do not duplicate the brand",async()=>{
  for(const path of ["/realizacje","/maly-crm-dla-firm"]){
    const html=await(await fetchPage(path)).text();
    const title=html.match(/<title>(.*?)<\/title>/)?.[1]||"";
    assert.equal((title.match(/Zielona Marka/g)||[]).length,1);
  }
});
test("homepage menu stays above the hero and mobile devices use the lighter film",async()=>{
  const [homeCss,hero,portal,mobileFilm]=await Promise.all([
    readFile(new URL("../app/home-v5.css",import.meta.url),"utf8"),
    readFile(new URL("../app/ForestHero.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/LivingPortal.tsx",import.meta.url),"utf8"),
    stat(new URL("../public/brand-review-v5/fern-moss-stream-mobile-20260929.mp4",import.meta.url)),
  ]);
  assert.match(homeCss,/zmh-opening>\.zm-header\{position:relative;z-index:40\}/);
  assert.match(hero,/fern-moss-stream-mobile-20260929\.mp4/);
  assert.match(hero,/userIntent\.current/);
  assert.match(hero,/scrollY>48/);
  assert.doesNotMatch(hero,/setTimeout\([^)]*3000/);
  assert.match(portal,/fern-moss-stream-mobile-20260929\.mp4/);
  assert.ok(mobileFilm.size<600_000,`mobile film is ${mobileFilm.size} bytes`);
});
test("v1.0.1 defers non-critical home media and caches hashed assets",async()=>{
  const [headers,homeCss,refinements,hero,portal]=await Promise.all([
    readFile(new URL("../public/_headers",import.meta.url),"utf8"),
    readFile(new URL("../app/home-v5.css",import.meta.url),"utf8"),
    readFile(new URL("../app/site-refinements.css",import.meta.url),"utf8"),
    readFile(new URL("../app/ForestHero.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/LivingPortal.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(headers,/\/_next\/static\/\*[\s\S]*max-age=31536000, immutable/);
  assert.match(hero,/zmh-living-forest\$\{ready\?' is-media-ready'/);
  assert.match(homeCss,/\.zmh-living-forest\.is-media-ready:before\{background-image:url\('\/brand-review-v5\/user-stream-tree-optimized\.webp'\)/);
  assert.match(portal,/if \(visible\) el\.classList\.add\("zmh-media-ready"\)/);
  assert.match(refinements,/\.zmh-assembly\.zmh-media-ready\{background:[^}]*stream-water-bottom\.webp/);
});
test("small mobile links and consent controls have finger-sized targets",async()=>{
  const css=await readFile(new URL("../app/site-refinements.css",import.meta.url),"utf8");
  assert.match(css,/offer-page-packages article>a,\.extra-grid article>a,\.site-footer \.footer-grid a\{display:inline-flex;align-items:center;min-height:44px/);
  assert.match(css,/\.contact-form \.form-consent input\{width:24px;height:24px/);
});
test("private demos can be crawled only to receive noindex",async()=>{
  const robots=await(await fetchPage("/robots.txt")).text();
  assert.doesNotMatch(robots,/Disallow:\s*\/(demo|studio|status)/i);
  const demo=await(await fetchPage("/demo/natura")).text();
  assert.match(demo,/<meta name="robots" content="noindex, nofollow"/);
  const headers=await readFile(new URL("../public/_headers",import.meta.url),"utf8");
  assert.match(headers,/\/demo\/\*[\s\S]*X-Robots-Tag: noindex, nofollow/);
});
test("key commercial pages include page-specific structured data",async()=>{
  assert.match(await(await fetchPage("/oferta")).text(),/"@type":"Service"/);
  const realization=await(await fetchPage("/realizacje/natura-studio")).text();
  assert.match(realization,/"@type":"CreativeWork"/);
  assert.match(realization,/"logo":"https:\/\/zielona-marka\.pl\/logo-zielona-marka-transparent-v1\.png"/);
  assert.match(await(await fetchPage("/realizacje/transportflow")).text(),/"@type":"SoftwareApplication"/);
});
test("SEO content package links key services and labels the case study template honestly",async()=>{
  for(const path of ["/strony-dla-firm-uslugowych","/modernizacja-strony","/maly-crm-dla-firm","/usprawnienia-firmy"]){
    const html=await(await fetchPage(path)).text();
    assert.match(html,/NASTĘPNY SENSOWNY KROK/,path);
    assert.match(html,/seo-related-grid/,path);
  }
  const portfolio=await(await fetchPage("/realizacje")).text();
  assert.match(portfolio,/Szablon do uzupełnienia po pierwszej realizacji/);
  assert.match(portfolio,/nie przedstawia wyników żadnego klienta/);
});
test("guide is discoverable and its diagnostic steps have restrained motion",async()=>{
  const home=await(await fetchPage("/")).text();
  const guide=await(await fetchPage("/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan")).text();
  const css=await readFile(new URL("../app/site-refinements.css",import.meta.url),"utf8");
  assert.match(home,/Przeczytaj poradnik/);
  assert.match(guide,/Poradniki<\/a>/);
  assert.match(css,/\.guide-reasons li:hover\{transform:translateY\(-5px\)/);
  assert.match(css,/\.guide-check li:hover\{transform:translateX\(7px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{\.guide-reasons li/);
});
test("guides expose author, visible breadcrumbs, FAQ schema and dedicated social images",async()=>{
  const hub=await(await fetchPage("/poradnik")).text();
  const css=await readFile(new URL("../app/site-refinements.css",import.meta.url),"utf8");
  assert.match(hub,/guide-card-meta/);
  assert.doesNotMatch(hub,/<footer><b>Czytaj poradnik/);
  assert.match(css,/\.guide-card-meta\{[^}]*background:transparent/);
  for(const path of ["/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan","/poradnik/ile-kosztuje-strona-dla-malej-firmy"]){
    const html=await(await fetchPage(path)).text();
    assert.match(html,/guide-breadcrumbs/,path);
    assert.match(html,/Łukasz Staniewicz[\s\S]*Zielona Marka/,path);
    assert.match(html,/"@type":"FAQPage"/,path);
    assert.match(html,/30\.09\.2026/,path);
  }
  for(const file of ["og-poradniki-zielona-marka.png","og-dlaczego-strona-nie-przynosi-zapytan.png","og-ile-kosztuje-strona-dla-malej-firmy.png"]){
    const info=await stat(new URL(`../public/${file}`,import.meta.url));
    assert.ok(info.size>20_000,`${file}: ${info.size}`);
  }
});
test("guide hub exposes a durable feed and missing pages offer useful navigation",async()=>{
  const hub=await(await fetchPage("/poradnik")).text();
  assert.match(hub,/application\/rss\+xml/);
  assert.match(hub,/\/poradnik\/rss\.xml/);
  const feed=await fetchPage("/poradnik/rss.xml");
  assert.equal(feed.status,200);
  assert.match(feed.headers.get("content-type")||"",/application\/rss\+xml/);
  assert.match(await feed.text(),/<rss version="2\.0">/);
  const missing=await fetchPage("/nie-ma-takiej-strony-seo-test");
  assert.equal(missing.status,404);
  assert.match(await missing.text(),/Zobacz poradniki/);
});
test("analytics covers guide journeys and form starts without collecting field values",async()=>{
  const tracking=await readFile(new URL("../app/SiteTracking.tsx",import.meta.url),"utf8");
  assert.match(tracking,/guide_entry_click/);
  assert.match(tracking,/guide_cta_click/);
  assert.match(tracking,/form_start/);
  assert.doesNotMatch(tracking,/\.value/);
  const forms=(await readFile(new URL("../app/ContactForm.tsx",import.meta.url),"utf8"))+(await readFile(new URL("../app/HomeContactForm.tsx",import.meta.url),"utf8"));
  assert.match(forms,/form_submit_attempt/);
  assert.match(forms,/form_submit_error/);
  assert.match(forms,/generate_lead/);
  assert.doesNotMatch(forms,/email:\s*form\.|message:\s*form\.|name:\s*form\./);
});

test("tools page uses verified destinations and avoids generic AI sales language",async()=>{
  const source=await readFile(new URL("../app/praktyczne-narzedzia/tools.ts",import.meta.url),"utf8");
  const page=await readFile(new URL("../app/praktyczne-narzedzia/page.tsx",import.meta.url),"utf8");
  const transport=await readFile(new URL("../app/realizacje/transportflow/page.tsx",import.meta.url),"utf8");
  for(const fragment of ["lead-offer-zm.pages.dev","document-checker-zm.pages.dev","printflow-360","transportflow-360","DocPilot","CzyToŚciema?","Fleet Ops Desk"]){
    assert.match(source,new RegExp(fragment));
  }
  assert.match(page,/Co jest bezpłatne:/);
  assert.match(page,/price:\s*"0"/);
  assert.match(source,/primaryUrl:\s*"https:\/\/github\.com\/lukaszst-cz\/printflow-360"/);
  assert.doesNotMatch(source,/lukaszst-cz\.github\.io\/(?:printflow|transportflow)-360/);
  assert.match(source,/primaryUrl:\s*"\/demo\/transport"/);
  assert.match(transport,/href="\/demo\/transport"/);
  assert.match(transport,/https:\/\/github\.com\/lukaszst-cz\/transportflow-360/);
  assert.doesNotMatch(source+page+transport,/coffee|buy me|postaw\w*\s+.*kaw|naleśnik|nalesnik/i);
  assert.doesNotMatch(source,/rewolucyjn|innowacyjn|kompleksow|szyt\w* na miarę|przenieś.+poziom|game.?changer/i);
  for(const file of ["tool-lead-offer-copilot-v2.jpg","tool-document-checker-v2.jpg","tool-printflow-360-v2.jpg","tool-transportflow-360-v2.jpg"]){
    const info=await stat(new URL(`../public/${file}`,import.meta.url));
    assert.ok(info.size>20_000,`${file}: ${info.size}`);
  }
});

test("old chatbot address has one direct destination",async()=>{
  const config=await readFile(new URL("../next.config.ts",import.meta.url),"utf8");
  assert.match(config,/source:\s*"\/chatbot-dla-firm"[\s\S]*destination:\s*"\/asystent-zapytan"/);
  assert.doesNotMatch(config,/realizacje\/transportflow[\s\S]*demo\/transport/);
});
