import assert from "node:assert/strict";
import test from "node:test";
import { readFile, stat } from "node:fs/promises";
const testBaseUrl = process.env.TEST_BASE_URL;
if (!testBaseUrl) throw new Error("TEST_BASE_URL is required. Run tests through scripts/run-built-worker-tests.mjs.");

const pageCache = new Map();

async function fetchPage(path, options = {}) {
  const method = String(options.method ?? "GET").toUpperCase();
  if (method !== "GET" || options.body) {
    return fetch(new URL(path, testBaseUrl), {
      ...options,
      signal: options.signal ?? AbortSignal.timeout(12_000),
    });
  }

  const key = String(path);
  if (!pageCache.has(key)) {
    pageCache.set(key, (async () => {
      const response = await fetch(new URL(path, testBaseUrl), {
        ...options,
        signal: options.signal ?? AbortSignal.timeout(12_000),
      });
      return {
        status: response.status,
        statusText: response.statusText,
        headers: [...response.headers.entries()],
        body: await response.arrayBuffer(),
      };
    })());
  }

  const cached = await pageCache.get(key);
  return new Response(cached.body.slice(0), {
    status: cached.status,
    statusText: cached.statusText,
    headers: cached.headers,
  });
}

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
test("canonical domain redirect policy stays explicit in proxy",async()=>{
  const proxy=await readFile(new URL("../proxy.ts",import.meta.url),"utf8");
  assert.match(proxy,/www\.zielona-marka\.pl/);
  assert.match(proxy,/url\.hostname = "zielona-marka\.pl"/);
  assert.match(proxy,/url\.protocol = "https:"/);
  assert.match(proxy,/NextResponse\.redirect\(url, 301\)/);
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
  assert.doesNotMatch(portal,/fern-moss-stream-mobile-20260929\.mp4/, "Stream video is only loaded in ForestHero");
  assert.match(portal,/zmh-contact-preview/, "Final CTA shows a contact preview rather than water");
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
  assert.doesNotMatch(refinements,/stream-water-bottom\.webp/, "No water photograph below the first screen");
  assert.match(refinements,/\.zmh-assembly\.zmh-media-ready\{background:transparent!important\}/, "The second scene should not swap backgrounds when it becomes visible");
  assert.match(refinements,/\.zmh-scene-transition\{[^}]*height:0!important;margin:0!important;background:none!important/, "No opaque separator or spacing at the scene boundary");
  assert.doesNotMatch(refinements,/--zmh-dissolve-height/, "Remove the former oversized dark transition");
  assert.match(refinements,/\.zmh-scene-transition span\{display:none!important\}/);
  assert.equal((refinements.match(/The opening and story share the same forest background/g) || []).length, 1, "Keep one canonical transition block");
  assert.doesNotMatch(refinements,/Approved visual treatment: no visible divider/, "Remove later CSS that overrides the transition");
  assert.match(refinements,/\.zmh-opening \.zmh-living-forest\{[^}]*mask-image:linear-gradient\(to bottom,[^}]*transparent 100%\)/, "Fade the entire first media layer onto the shared photo");
  assert.ok(refinements.lastIndexOf("The opening and story share the same forest background") > refinements.lastIndexOf("Mobile controls and secondary calls to action"), "Transition styles must follow legacy mobile overrides");
  assert.match(refinements,/\.zmh-opening::after\{content:none!important\}/, "Remove the overlay that darkened the middle of the first scene");
  assert.match(refinements,/\.zmh-assembly::before\{[^}]*background:radial-gradient\(/, "The first scrolling scene uses abstract botanical lighting");
});
test("homepage free offers are real slides and the stream ends with the hero",async()=>{
  const [page,source,slides,styles]=await Promise.all([
    (await fetchPage("/")).text(),
    readFile(new URL("../app/OrganicHome.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/HomeOffersCarousel.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/home-carousel.css",import.meta.url),"utf8"),
  ]);
  assert.match(source,/HomeOffersCarousel/);
  assert.doesNotMatch(source,/zmh-concept-feature/, "Legacy static concept card should no longer be rendered");
  assert.match(page,/Zobacz swoją firmę/);
  assert.match(page,/Zamów bezpłatną koncepcję/);
  for(const name of ["Mini audyt","Mapa Szans","Bezpłatna koncepcja"]) assert.ok(slides.includes(name),name);
  for(const i of [1,2,3]) assert.match(page,new RegExp("Pokaż slajd " + i));
  assert.match(slides,/aria-pressed=\{index === active\}/);
  assert.match(slides,/onTouchStart=/);
  assert.match(slides,/onTouchEnd=/);
  assert.match(slides,/Math\.abs\(deltaX\) > Math\.abs\(deltaY\) \* 1\.3/);
  assert.match(page,/zmh-contact-preview/);
  assert.match(styles,/\.zm-home-slide\[hidden\]\{display:none!important\}/);
  assert.equal((styles.match(/stream-water-bottom\.webp/g)||[]).length,1,"The water fallback image belongs only to the opening");
  assert.match(styles,/\.zmh-assembly::before\{[^}]*background:radial-gradient/);
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
  assert.match(realization,/"logo":"https:\/\/zielona-marka\.pl\/logo-zielona-marka-transparent-v1\.webp"/);
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
  assert.match(guide,/Blog<\/a>/);
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
test("business identity, authors and client-safe quote tracking stay consistent",async()=>{
  const home=await(await fetchPage("/")).text();
  for(const kind of ["ProfessionalService","WebSite","Person","Service"]){
    assert.ok(home.includes(`"@type":"${kind}"`),kind);
  }
  assert.match(home,/"@id":"https:\/\/zielona-marka\.pl\/#website"/);
  assert.match(home,/"@id":"https:\/\/zielona-marka\.pl\/#lukasz-st-cz"/);
  const guides=[
    "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan",
    "/poradnik/ile-kosztuje-strona-dla-malej-firmy",
    "/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac",
    "/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac",
    "/poradnik/co-powinna-miec-strona-firmy-uslugowej",
    "/poradnik/ile-kosztuje-projekt-gazetki",
    "/poradnik/jak-przygotowac-pdf-do-druku",
    "/poradnik/jak-uporzadkowac-zapytania-klientow",
  ];
  for(const path of guides){
    const html=await(await fetchPage(path)).text();
    assert.match(html,/"author":\{"@id":"https:\/\/zielona-marka\.pl\/#lukasz-st-cz"\}/,path);
  }
  const tracker=await readFile(new URL("../app/SiteTracking.tsx",import.meta.url),"utf8");
  assert.match(tracker,/const analyticsHref = href\.split\("\?"\)\[0\]/);
  assert.doesNotMatch(tracker,/link_url: href/);
  assert.match(tracker,/link_url: analyticsHref/);
  const cost=await readFile(new URL("../app/TotalCostCalculator.tsx",import.meta.url),"utf8");
  assert.match(cost,/website_quote_to_contact/);
  assert.match(cost,/package_id: site, care_plan: care, hosting_type: hosting/);
});

test("new guides expose navigable and structured breadcrumbs",async()=>{
  for(const path of ["/poradnik/ile-kosztuje-projekt-gazetki","/poradnik/jak-przygotowac-pdf-do-druku","/poradnik/jak-uporzadkowac-zapytania-klientow"]){
    const html=await(await fetchPage(path)).text();
    assert.match(html,/guide-breadcrumbs/,path);
    assert.match(html,/"@type":"BreadcrumbList"/,path);
    assert.match(html,/"@type":"ListItem","position":3/,path);
  }
});

test("indexable sitemap pages have unique titles and descriptions",async()=>{
  const xml=await(await fetchPage("/sitemap.xml")).text();
  const urls=[...xml.matchAll(/<loc>(https:\/\/zielona-marka\.pl[^<]*)<\/loc>/g)].map(m=>m[1]);
  assert.ok(urls.length>=44,"expected current site and guides in sitemap");
  const seen=new Map();
  for(const url of urls){
    const path=new URL(url).pathname;
    const html=await(await fetchPage(path)).text();
    const title=html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim()||"";
    assert.ok(title.length>=10,`missing title: ${path}`);
    assert.ok(!seen.has(title),`duplicate title ${title}: ${path} and ${seen.get(title)}`);
    seen.set(title,path);
    const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1]||"";
    assert.ok(description.length>=40,`missing or short description: ${path}`);
  }
});

test("guide hub exposes a durable feed and missing pages offer useful navigation",async()=>{
  const hub=await(await fetchPage("/poradnik")).text();
  assert.match(hub,/application\/rss\+xml/);
  assert.match(hub,/\/poradnik\/rss\.xml/);
  const feed=await fetchPage("/poradnik/rss.xml");
  assert.equal(feed.status,200);
  assert.match(feed.headers.get("content-type")||"",/application\/rss\+xml/);
  const rssText=await feed.text();
  assert.match(rssText,/<rss version="2\.0">/);
  assert.match(rssText,/jak-przygotowac-pdf-do-druku/);
  assert.match(rssText,/jak-uporzadkowac-zapytania-klientow/);
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
  const flow=await readFile(new URL("../app/projekty-flow/page.tsx",import.meta.url),"utf8");
  const transport=await readFile(new URL("../app/realizacje/transportflow/page.tsx",import.meta.url),"utf8");
  for(const fragment of ["lead-offer-zm.pages.dev","document-checker-zm.pages.dev","DocPilot","CzyToŚciema?","Fleet Ops Desk"]){
    assert.match(source,new RegExp(fragment));
  }
  assert.match(page,/Bezpłatnie dostępne teraz:/);
  assert.match(page,/price:\s*"0"/);
  assert.match(page,/href="\/projekty-flow"/);
  assert.match(flow,/primaryUrl:\s*"https:\/\/github\.com\/lukaszst-cz\/printflow-360"/);
  assert.doesNotMatch(source,/lukaszst-cz\.github\.io\/(?:printflow|transportflow)-360/);
  assert.match(flow,/primaryUrl:\s*"\/demo\/transport"/);
  assert.match(flow,/tool-workshopflow-360-photo\.png/);
  assert.match(source,/program-czy-to-sciema-photo-v3\.png/);
  assert.match(source,/program-fleet-ops-desk-photo-v3\.png/);
  assert.match(source,/program-spokojny-pc-plus-cover\.svg/);
  assert.match(source,/program-docpilot-photo-v3\.png/);
  assert.match(source,/program-aktywnik-plus-photo-v3\.png/);
  assert.match(source,/aktywnik-plus-wordmark\.svg/);
  assert.match(source,/spokojny-mobile-plus-download\/releases\/tag\/v1\.0\.0-rc1/);
  assert.match(source,/SpokojnyMobile\+/);
  assert.match(page,/program-card-logo/);
  assert.match(transport,/href="\/demo\/transport"/);
  assert.match(transport,/https:\/\/github\.com\/lukaszst-cz\/transportflow-360/);
  assert.doesNotMatch(source+page+flow+transport,/coffee|buy me|postaw\w*\s+.*kaw|naleśnik|nalesnik/i);
  assert.doesNotMatch(source,/rewolucyjn|innowacyjn|kompleksow|szyt\w* na miarę|przenieś.+poziom|game.?changer/i);
  for(const file of ["tool-lead-offer-copilot-v2.jpg","tool-document-checker-v2.jpg","tool-printflow-360-v2.jpg","tool-transportflow-360-v2.jpg"]){
    const info=await stat(new URL(`../public/${file}`,import.meta.url));
    assert.ok(info.size>20_000,`${file}: ${info.size}`);
  }
  const workshop=await stat(new URL("../public/tool-workshopflow-360-photo.png",import.meta.url));
  assert.ok(workshop.size>20_000);
  for(const file of ["program-czy-to-sciema-photo-v3.png","program-fleet-ops-desk-photo-v3.png","program-docpilot-photo-v3.png","program-aktywnik-plus-photo-v3.png"]){
    const photo=await stat(new URL(`../public/${file}`,import.meta.url));
    assert.ok(photo.size>20_000,`${file}: ${photo.size}`);
  }
  for(const file of ["czy-to-sciema-icon.svg","fleet-ops-desk-icon.svg","spokojny-pc-plus-icon.svg","aktywnik-plus-wordmark.svg"]){
    const icon=await stat(new URL(`../public/${file}`,import.meta.url));
    assert.ok(icon.size>200,`${file}: ${icon.size}`);
  }
});

test("optimized critical assets stay lightweight",async()=>{
  const limits=[
    ["lukasz-zielona-marka-jak-pracuje-20260908.webp",20_000,150_000],
    ["logo-zielona-marka-transparent-v1.webp",5_000,60_000],
    ["program-spokojny-pc-plus-cover.svg",2_000,20_000],
  ];
  for(const [file,minBytes,maxBytes] of limits){
    const info=await stat(new URL(`../public/${file}`,import.meta.url));
    assert.ok(info.size>minBytes && info.size<maxBytes,`${file}: ${info.size} bytes outside ${minBytes}-${maxBytes}`);
  }
});

test("old chatbot address has one direct destination",async()=>{
  const config=await readFile(new URL("../next.config.ts",import.meta.url),"utf8");
  assert.match(config,/source:\s*"\/chatbot-dla-firm"[\s\S]*destination:\s*"https:\/\/zielona-marka\.pl\/asystent-zapytan"/);
  assert.doesNotMatch(config,/realizacje\/transportflow[\s\S]*demo\/transport/);
});


test("public quality manuals are discoverable and have clean canonical titles",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const manuals=[
    ["/standard-jakosci","Standard jakości – jak realizujemy projekty"],
    ["/standard-dtp","Standard kontroli jakości DTP i Prepress"],
  ];
  for(const [path,title] of manuals){
    const absolute="https://zielona-marka.pl"+path;
    assert.ok(sitemap.includes("<loc>"+absolute+"</loc>"),path+" missing from sitemap");
    const response=await fetchPage(path);
    assert.equal(response.status,200,path);
    const html=await response.text();
    assert.match(html,new RegExp('rel="canonical" href="'+absolute+'"'),path);
    assert.ok(html.includes("<title>"+title+" | Zielona Marka</title>"),path+" canonical title");
    assert.doesNotMatch(html,/<meta name="robots" content="[^"]*noindex/i,path);
    assert.doesNotMatch(html,/Zielona Marka \| Zielona Marka<\/title>/,path);
  }
});

test("forest hero ambient sound is opt-in and stops when tab is hidden",async()=>{
  const hero=await readFile(new URL("../app/ForestHero.tsx",import.meta.url),"utf8");
  assert.match(hero,/onClick=\{toggleSound\}/);
  assert.match(hero,/document\.addEventListener\('visibilitychange',syncSound\)/);
  assert.match(hero,/document\.hidden\)\{sound\.pause\(\);return;\}/);
  assert.doesNotMatch(hero,/const resume=\(\)=>startSound\(\)/);
  assert.doesNotMatch(hero,/useEffect\(\(\)=>\{\s*if\(userMuted\.current\)return;\s*startSound\(\)/);
});

test("SEO release guard keeps sitemap and robots aligned",async()=>{
  const sitemapResponse=await fetchPage("/sitemap.xml");
  assert.equal(sitemapResponse.status,200);
  const sitemap=await sitemapResponse.text();
  for(const path of ["/","/oferta","/poradnik","/strony-internetowe","/projekty-flow","/spokojny-pc-plus","/raport-qa","/strony-dla-warsztatow","/strony-dla-beauty","/strony-dla-firm-uslugowych"]){
    const expected=path==="/"?"https://zielona-marka.pl":"https://zielona-marka.pl"+path;
    assert.match(sitemap,new RegExp(expected.replace(/[.*+?^$()|[\]\\]/g,"\\$&")),path);
  }
  for(const path of ["/status","/demo/","/polityka-prywatnosci"]){
    assert.doesNotMatch(sitemap,new RegExp("<loc>https://zielona-marka\\.pl"+path.replace(/[.*+?^$()|[\]\\]/g,"\\$&")),path);
  }
  const robots=await(await fetchPage("/robots.txt")).text();
  assert.match(robots,/Sitemap:\s*https:\/\/zielona-marka\.pl\/sitemap\.xml/i);
});

test("public SEO pages keep self canonicals and private areas keep noindex",async()=>{
  for(const path of ["/oferta","/projekty-flow","/spokojny-pc-plus","/strony-internetowe","/poradnik"]){
    const html=await(await fetchPage(path)).text();
    const escaped=("https://zielona-marka.pl"+path).replace(/[.*+?^$()|[\]\\]/g,"\\$&");
    assert.match(html,new RegExp('<link rel="canonical" href="'+escaped+'"'),path);
    assert.doesNotMatch(html,/<meta name="robots" content="noindex/i,path);
  }
  for(const path of ["/status","/demo/natura"]){
    const response=await fetchPage(path);
    assert.match((response.headers.get("x-robots-tag")||"")+" "+await response.text(),/noindex/i,path);
  }
});

test("inquiry endpoint rejects cross-site browser submissions",async()=>{
  const response=await fetchPage("/api/inquiries",{
    method:"POST",
    headers:{
      "content-type":"application/json",
      "origin":"https://example.com",
      "sec-fetch-site":"cross-site"
    },
    body:JSON.stringify({name:"Test",email:"test@example.com",message:"Test",consent:"yes"})
  });
  assert.equal(response.status,403);
});

test("analytics names every lead form and tracks funnel without field values",async()=>{
  const [tracking,contact,home]=await Promise.all([
    readFile(new URL("../app/SiteTracking.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/ContactForm.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/HomeContactForm.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(contact,/data-analytics-form/);
  assert.match(home,/data-analytics-form="homepage_v5"/);
  for(const event of ["lead_start","click_phone","click_email","click_whatsapp","cta_contact"]){
    assert.match(tracking,new RegExp(event),event);
  }
  assert.doesNotMatch(tracking,/\.value/);
});


test("sitemap pages do not link to broken internal routes",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const pageUrls=[...sitemap.matchAll(/<loc>(https:\/\/zielona-marka\.pl[^<]*)<\/loc>/g)].map(m=>m[1]);
  assert.ok(pageUrls.length>=30,`unexpected sitemap size: ${pageUrls.length}`);
  const targets=new Set();
  for(const pageUrl of pageUrls){
    const pagePath=new URL(pageUrl).pathname;
    const response=await fetchPage(pagePath);
    assert.ok(response.status<400,`${pagePath} returned ${response.status}`);
    const html=await response.text();
    for(const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)){
      const raw=match[1];
      if(!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) continue;
      let url;
      try{url=new URL(raw,"https://zielona-marka.pl"+pagePath);}catch{continue;}
      if(url.hostname!=="zielona-marka.pl" && url.hostname!=="www.zielona-marka.pl") continue;
      const pathname=url.pathname;
      if(pathname.startsWith("/_next/")) continue;
      if(/\.[a-z0-9]{2,6}$/i.test(pathname) && pathname!=="/poradnik/rss.xml") continue;
      targets.add(pathname);
    }
  }
  for(const path of targets){
    if(path.startsWith("/demo/") && path.endsWith("/")){
      try{
        const info=await stat(new URL("../public"+path+"index.html",import.meta.url));
        assert.ok(info.size>0,`empty static demo: ${path}`);
        continue;
      }catch{ /* Not a static demo directory; validate through the app worker below. */ }
    }
    const response=await fetchPage(path);
    assert.equal(response.status,200,`internal link must resolve directly: ${path} -> ${response.status}`);
  }
});

test("public SEO pages do not reference missing local assets",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const pageUrls=[...sitemap.matchAll(/<loc>(https:\/\/zielona-marka\.pl[^<]*)<\/loc>/g)].map(m=>m[1]);
  const assetPaths=new Set();
  for(const pageUrl of pageUrls){
    const pagePath=new URL(pageUrl).pathname;
    const html=await(await fetchPage(pagePath)).text();
    for(const match of html.matchAll(/(?:src|href|content)="([^"]+)"/g)){
      const raw=match[1];
      if(!raw || raw.startsWith("data:") || raw.startsWith("#")) continue;
      let url;
      try{url=new URL(raw,"https://zielona-marka.pl"+pagePath);}catch{continue;}
      if(url.hostname!=="zielona-marka.pl" && url.hostname!=="www.zielona-marka.pl") continue;
      if(url.pathname.startsWith("/_next/") || !/\.[a-z0-9]{2,6}$/i.test(url.pathname) || url.pathname==="/poradnik/rss.xml") continue;
      assetPaths.add(url.pathname);
    }
  }
  for(const pathname of assetPaths){
    try{
      const info=await stat(new URL("../public"+pathname,import.meta.url));
      assert.ok(info.size>0,`empty asset: ${pathname}`);
    }catch(error){
      assert.fail(`missing public asset referenced by HTML: ${pathname} (${error?.code||error})`);
    }
  }
});


test("internal links from sitemap pages never point to missing routes",async()=>{
  const sitemapResponse=await fetchPage("/sitemap.xml");
  assert.equal(sitemapResponse.status,200);
  const sitemap=await sitemapResponse.text();
  const pagePaths=[...sitemap.matchAll(/<loc>https:\/\/zielona-marka\.pl([^<]*)<\/loc>/g)]
    .map(match=>match[1]||"/");
  assert.ok(pagePaths.length>=35,`expected a substantial sitemap, got ${pagePaths.length}`);

  const targets=new Map();
  for(const pagePath of pagePaths){
    const response=await fetchPage(pagePath||"/");
    assert.equal(response.status,200,`sitemap page failed: ${pagePath}`);
    const html=await response.text();
    for(const match of html.matchAll(/<a\\b[^>]*\\bhref="([^"]+)"/g)){
      const raw=match[1].replace(/&amp;/g,"&");
      if(!raw.startsWith("/") || raw.startsWith("//")) continue;
      if(raw.startsWith("/_next/") || raw.startsWith("/api/")) continue;
      const target=(raw.split("#")[0].split("?")[0]||"/").replace(/\/$/,"")||"/";
      if(!targets.has(target)) targets.set(target,new Set());
      targets.get(target).add(pagePath||"/");
    }
  }

  for(const [target,sources] of targets){
    const response=await fetchPage(target);
    assert.ok(response.status<400,`broken internal link ${target} -> HTTP ${response.status}; linked from ${[...sources].join(", ")}`);
  }
});


test("every sitemap page keeps core SEO invariants",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const paths=[...sitemap.matchAll(/<loc>https:\/\/zielona-marka\.pl([^<]*)<\/loc>/g)]
    .map(match=>match[1]||"/");
  assert.ok(paths.length>=35,`expected a substantial sitemap, got ${paths.length}`);

  for(const path of paths){
    const response=await fetchPage(path);
    assert.equal(response.status,200,`HTTP status for ${path}`);
    const html=await response.text();

    assert.doesNotMatch(html,/<meta name="robots" content="[^"]*noindex/i,`noindex leaked onto sitemap page ${path}`);
    assert.doesNotMatch(html,/<meta name="keywords"/i,`obsolete meta keywords on ${path}`);

    const expectedCanonical="https://zielona-marka.pl"+(path==="/"?"":path);
    const escaped=expectedCanonical.replace(/[.*+?^$()|[\]\\]/g,"\\$&");
    assert.match(html,new RegExp('<link rel="canonical" href="'+escaped+'"'),`canonical for ${path}`);

    assert.equal((html.match(/<h1\b/g)||[]).length,1,`H1 count for ${path}`);
    const title=html.match(/<title>(.*?)<\/title>/)?.[1]||"";
    assert.ok((title.match(/Zielona Marka/g)||[]).length<=1,`duplicated brand in title for ${path}: ${title}`);
  }
});


test("internal hash links resolve to existing section ids",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const pagePaths=[...sitemap.matchAll(/<loc>https:\/\/zielona-marka\.pl([^<]*)<\/loc>/g)]
    .map(match=>match[1]||"/");
  const htmlCache=new Map();

  async function pageHtml(path){
    if(!htmlCache.has(path)){
      const response=await fetchPage(path);
      assert.equal(response.status,200,`hash-link target page failed: ${path}`);
      htmlCache.set(path,await response.text());
    }
    return htmlCache.get(path);
  }

  for(const sourcePath of pagePaths){
    const html=await pageHtml(sourcePath);
    for(const match of html.matchAll(/<a\b[^>]*\bhref="([^"]*#[^"]+)"/g)){
      const raw=match[1].replace(/&amp;/g,"&");
      if(raw.startsWith("http://")||raw.startsWith("https://")){
        const absolute=new URL(raw);
        if(!["zielona-marka.pl","www.zielona-marka.pl"].includes(absolute.hostname)) continue;
      }
      let target;
      try{target=new URL(raw,"https://zielona-marka.pl"+sourcePath);}catch{continue;}
      if(!target.hash) continue;
      const targetPath=(target.pathname.replace(/\/$/,"")||"/");
      const id=decodeURIComponent(target.hash.slice(1));
      if(!id) continue;
      const targetHtml=await pageHtml(targetPath);
      const escaped=id.replace(/[.*+?^$()|[\]\\]/g,"\\$&");
      assert.match(
        targetHtml,
        new RegExp(`(?:id|name)="${escaped}"`),
        `broken hash link ${sourcePath} -> ${targetPath}#${id}`
      );
    }
  }
});


test("sitemap has no duplicate URLs",async()=>{
  const xml=await(await fetchPage("/sitemap.xml")).text();
  const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
  assert.ok(urls.length>=35,`unexpected sitemap size: ${urls.length}`);
  assert.equal(new Set(urls).size,urls.length,"duplicate URL found in sitemap");
  for(const url of urls){
    assert.match(url,/^https:\/\/zielona-marka\.pl(?:\/|$)/,`unexpected sitemap host: ${url}`);
  }
});

test("public pages keep baseline security headers",async()=>{
  for(const path of ["/","/oferta","/kontakt"]){
    const response=await fetchPage(path);
    assert.equal(response.status,200,path);
    assert.equal(response.headers.get("x-content-type-options"),"nosniff",path);
    assert.equal(response.headers.get("x-frame-options"),"SAMEORIGIN",path);
    assert.equal(response.headers.get("referrer-policy"),"strict-origin-when-cross-origin",path);
    assert.match(response.headers.get("strict-transport-security")||"",/max-age=31536000/i,path);
    const csp=response.headers.get("content-security-policy")||"";
    assert.match(csp,/default-src 'self'/,path);
    assert.match(csp,/object-src 'none'/,path);
    assert.match(csp,/frame-ancestors 'self'/,path);
  }
});

test("new-tab links explicitly protect opener context",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const paths=[...sitemap.matchAll(/<loc>https:\/\/zielona-marka\.pl([^<]*)<\/loc>/g)]
    .map(match=>match[1]||"/");
  for(const path of paths){
    const html=await(await fetchPage(path)).text();
    for(const match of html.matchAll(/<a\b([^>]*\btarget="_blank"[^>]*)>/g)){
      const attrs=match[1];
      const rel=attrs.match(/\brel="([^"]*)"/)?.[1]||"";
      assert.match(rel,/(?:^|\s)(?:noopener|noreferrer)(?:\s|$)/,`missing noopener/noreferrer on ${path}: <a${attrs}>`);
    }
  }
});


test("Polish and English pages keep reciprocal language metadata",async()=>{
  const pl=await(await fetchPage("/")).text();
  const en=await(await fetchPage("/en")).text();

  assert.match(pl,/<html lang="pl"/);
  assert.match(en,/<html lang="en"/);

  for(const html of [pl,en]){
    assert.match(html,/<link rel="alternate" hreflang="pl" href="https:\/\/zielona-marka\.pl"/i);
    assert.match(html,/<link rel="alternate" hreflang="en" href="https:\/\/zielona-marka\.pl\/en"/i);
    assert.match(html,/<link rel="alternate" hreflang="x-default" href="https:\/\/zielona-marka\.pl"/i);
  }

  assert.match(en,/<meta property="og:url" content="https:\/\/zielona-marka\.pl\/en"/);
});


test("rendered pages keep unique ids and accessible form controls",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const paths=[...sitemap.matchAll(/<loc>https:\/\/zielona-marka\.pl([^<]*)<\/loc>/g)]
    .map(match=>match[1]||"/");

  for(const path of paths){
    const html=await(await fetchPage(path)).text();

    const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(match=>match[1]);
    assert.equal(new Set(ids).size,ids.length,`duplicate id on ${path}`);

    for(const match of html.matchAll(/<img\b([^>]*)>/g)){
      assert.match(match[1],/\balt="[^"]*"/,`image without alt on ${path}: <img${match[1]}>`);
    }

    for(const match of html.matchAll(/<(input|textarea|select)\b([^>]*)>/g)){
      const tag=match[1];
      const attrs=match[2];
      if(/\btype="hidden"/.test(attrs)) continue;
      if(/\baria-label="[^"]+"/.test(attrs)||/\baria-labelledby="[^"]+"/.test(attrs)) continue;
      const id=attrs.match(/\bid="([^"]+)"/)?.[1];
      if(!id) continue;
      const escaped=id.replace(/[.*+?^$()|[\]\\]/g,"\\$&");
      assert.match(html,new RegExp(`<label[^>]*for="${escaped}"`),`${tag}#${id} has no label on ${path}`);
    }
  }
});


test("sitemap pages avoid duplicate search snippets",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const paths=[...sitemap.matchAll(/<loc>https:\/\/zielona-marka\.pl([^<]*)<\/loc>/g)]
    .map(match=>match[1]||"/");
  const titles=new Map();
  const descriptions=new Map();

  for(const path of paths){
    const html=await(await fetchPage(path)).text();
    const title=html.match(/<title>(.*?)<\/title>/)?.[1]?.trim()||"";
    const description=html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim()||"";
    assert.ok(title.length>0,`missing title on ${path}`);
    assert.ok(description.length>0,`missing description on ${path}`);
    if(!titles.has(title)) titles.set(title,[]);
    if(!descriptions.has(description)) descriptions.set(description,[]);
    titles.get(title).push(path);
    descriptions.get(description).push(path);
  }

  for(const [title,owners] of titles){
    assert.equal(owners.length,1,`duplicate title on ${owners.join(", ")}: ${title}`);
  }
  for(const [description,owners] of descriptions){
    assert.equal(owners.length,1,`duplicate meta description on ${owners.join(", ")}: ${description}`);
  }
});

test("structured data on sitemap pages is valid JSON-LD",async()=>{
  const sitemap=await(await fetchPage("/sitemap.xml")).text();
  const paths=[...sitemap.matchAll(/<loc>https:\/\/zielona-marka\.pl([^<]*)<\/loc>/g)]
    .map(match=>match[1]||"/");
  let schemaCount=0;

  for(const path of paths){
    const html=await(await fetchPage(path)).text();
    for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
      schemaCount++;
      let parsed;
      try{
        parsed=JSON.parse(match[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#x27;/g,"'"));
      }catch(error){
        assert.fail(`invalid JSON-LD on ${path}: ${error}`);
      }
      const items=Array.isArray(parsed)?parsed:[parsed];
      for(const item of items){
        assert.equal(item?.["@context"],"https://schema.org",`unexpected JSON-LD context on ${path}`);
        assert.ok(item?.["@type"]||item?.["@graph"],`JSON-LD missing type/graph on ${path}`);
      }
    }
  }
  assert.ok(schemaCount>=paths.length,`expected at least one schema block per sitemap page, found ${schemaCount} for ${paths.length} pages`);
});


test("security headers stay enabled on public and private routes",async()=>{
  const home=await fetchPage("/");
  assert.match(home.headers.get("content-security-policy")||"",/default-src 'self'/);
  assert.match(home.headers.get("strict-transport-security")||"",/max-age=31536000/i);
  assert.equal(home.headers.get("x-content-type-options"),"nosniff");
  assert.equal(home.headers.get("referrer-policy"),"strict-origin-when-cross-origin");
  for(const path of ["/status","/demo/natura","/studio"]){
    const response=await fetchPage(path);
    assert.match(response.headers.get("x-robots-tag")||"",/noindex/i,path);
    assert.match(response.headers.get("x-robots-tag")||"",/nofollow/i,path);
  }
});


test("quote configuration is transferred without personal details in URLs",async()=>{
  const sources=await Promise.all([
    "TotalCostCalculator.tsx","DtpQuoteBuilder.jsx","WebsiteConfigurator.jsx"
  ].map(file=>readFile(new URL("../app/"+file,import.meta.url),"utf8")));
  for(const source of sources){
    assert.match(source,/saveQuoteTransfer\(/);
    assert.doesNotMatch(source,/&wycena=/);
  }
  const transfer=await readFile(new URL("../app/QuoteTransfer.ts",import.meta.url),"utf8");
  assert.match(transfer,/sessionStorage\.setItem/);
  assert.match(transfer,/sessionStorage\.removeItem/);
  assert.match(transfer,/LIFETIME_MS/);
  const contact=await readFile(new URL("../app/ContactForm.tsx",import.meta.url),"utf8");
  assert.match(contact,/takeQuoteTransfer\(initialPackage\)/);
  assert.match(contact,/ref=\{messageRef\}/);
});


test("DTP wizard keeps step controls inactive until React handlers are ready",async()=>{
  const code=await readFile(new URL("../app/DtpQuoteBuilder.jsx",import.meta.url),"utf8");
  assert.match(code,/data-ready=\{hydrated \? "true" : "false"\}/);
  assert.match(code,/stepNames\.map\(\(name, index\) => <button type="button" key=\{name\} disabled=\{!hydrated\}/);
});

test("consent-gated analytics stays protected in browser QA", async () => {
  const qa = await readFile(new URL("../tests/live-browser-qa.mjs", import.meta.url), "utf8");
  assert.ok(qa.includes("analyticsRequestsWithoutConsent"));
  assert.ok(qa.includes("no analytics requests without consent"));
  assert.ok(qa.includes("privacyProtections.blockedCloudflareAnalytics"));
  const response = await fetchPage("/");
  const csp = response.headers.get("content-security-policy") || "";
  const scriptDirective = csp.split(";").find(item => item.trim().startsWith("script-src ")) || "";
  assert.ok(scriptDirective.includes("www.googletagmanager.com"));
  assert.ok(!scriptDirective.includes("static.cloudflareinsights.com"));
});

test("failed client navigation has a usable recovery screen and asset health guard", async () => {
  const fallback = await readFile(new URL("../app/error.tsx", import.meta.url), "utf8");
  assert.ok(fallback.includes("window.location.reload()"));
  assert.ok(fallback.includes("onClick={reset}"));
  assert.ok(fallback.includes("kontakt@zielona-marka.pl"));
  const browserQA = await readFile(new URL("../tests/live-browser-qa.mjs", import.meta.url), "utf8");
  assert.ok(browserQA.includes("failedJsChunks"));
  assert.ok(browserQA.includes("JS asset failures recover after a fresh navigation"));
});

test("public Chromium QA also runs nightly without new commits", async () => {
  const workflow = await readFile(new URL("../.github/workflows/live-browser-qa.yml", import.meta.url), "utf8");
  assert.ok(workflow.includes("schedule:"));
  assert.ok(workflow.includes('cron: "30 4 * * *"'));
  assert.ok(workflow.includes("github.event_name == 'schedule'"));
  assert.ok(workflow.includes("retention-days: 7"));
});

test("GA4 disable flag matches the consent-gated measurement ID", async () => {
  const [layout, consent] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CookieConsent.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(consent, /const MEASUREMENT_ID = "G-CYFQ326JRF"/);
  assert.match(layout, /ga-disable-G-CYFQ326JRF.*=true/);
  assert.match(consent, /`ga-disable-\$\{MEASUREMENT_ID\}`\] = false/);
  assert.match(consent, /`ga-disable-\$\{MEASUREMENT_ID\}`\] = true/);
  assert.ok(consent.includes("localStorage.getItem(STORAGE_KEY) !== \"accepted\""));
});


test("blog hub uses one public layout, matching the offer and DTP", async () => {
  const blog = await (await fetchPage("/poradnik")).text();
  const offer = await (await fetchPage("/oferta")).text();
  const dtp = await (await fetchPage("/dtp")).text();
  for (const [name, html] of [["Blog", blog], ["Oferta", offer], ["DTP", dtp]]) {
    assert.match(html, /class="page-hero shell"/, name + " is missing the shared hero");
    assert.equal((html.match(/class="zm-header"/g) || []).length, 1, name + " should have one shared header");
    assert.equal((html.match(/class="zm-footer"/g) || []).length, 1, name + " should have one shared footer");
  }
  assert.match(blog, /class="zm-public guide-page zm-blog-page"/);
  assert.doesNotMatch(blog, /class="[^"]*\bguide-hub\b/);
  assert.match(blog, /AUTOR PORADNIKÓW/);
  assert.match(blog, /Od którego artykułu najlepiej zacząć/);
  assert.match(blog, /Czy artykuły zastępują audyt/);
  assert.match(blog, /Łukasz Staniewicz/);
  assert.match(blog, /lukasz-kontakt-naturalny-20260919\.webp/);
  const css = await readFile(new URL("../app/blog-layout-unification.css", import.meta.url), "utf8");
  assert.match(css, /\.guide-library > \.zm-blog-results/);
  assert.match(css, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 800px\)/);
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.ok(layout.indexOf('import "./blog-layout-unification.css"') > layout.indexOf('import "./qa-integrated.css"'), "Blog overrides must follow other shared styles");
});


test("key public routes use their own social preview metadata", async () => {
  const pages = [
    ["/jak-pracuje", "Jak wygląda współpraca nad stroną | Zielona Marka"],
    ["/raport-qa", "Przykładowy raport kontroli jakości strony | Zielona Marka"],
    ["/realizacje", "Realizacje i demonstracje stron WWW | Zielona Marka"],
    ["/przyklady-zaplecza", "Przykłady paneli i zaplecza dla firm | Zielona Marka"],
    ["/projekty-flow", "Projekty Flow — procesy i demonstracje | Zielona Marka"],
  ];
  const attr = (tag, name) => tag?.match(new RegExp(name + '="([^"]*)"', "i"))?.[1];
  const titles = new Set();
  for (const [route, expectedTitle] of pages) {
    const response = await fetchPage(route);
    assert.ok(response.ok, route + " must be available");
    const html = await response.text();
    const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
    const metaFor = (name, value) => metas.find(tag => attr(tag, name) === value);
    const ogTitle = attr(metaFor("property", "og:title"), "content");
    const twitterTitle = attr(metaFor("name", "twitter:title"), "content");
    const ogUrl = attr(metaFor("property", "og:url"), "content");
    assert.equal(ogTitle, expectedTitle, route + " Open Graph preview title");
    assert.equal(twitterTitle, expectedTitle, route + " Twitter preview title");
    assert.equal(ogUrl, "https://zielona-marka.pl" + route, route + " Open Graph URL");
    assert.ok(attr(metaFor("property", "og:description"), "content")?.length > 70, route + " Open Graph summary missing");
    titles.add(ogTitle);
  }
  assert.equal(titles.size, pages.length, "Social previews must not all inherit the generic homepage title");
});


test("inquiry email notification failures remain observable after CRM save", async () => {
  const route = await readFile(new URL("../app/api/inquiries/route.ts", import.meta.url), "utf8");
  assert.ok(route.indexOf("await db.insert(inquiries)") >= 0);
  assert.ok(route.indexOf("await db.insert(inquiries)") < route.indexOf("await notifyOwner("), "Save the inquiry before sending optional email notification");
  assert.match(route, /Inquiry saved in CRM, but email notification delivery failed/);
  assert.match(route, /Inquiry notification not configured; saved lead remains in CRM/);
  assert.ok(!route.includes(".catch(() => undefined)"), "Do not swallow notification failures without a log");
});


test("SEO monitor recognizes index blocking on all sitemap URLs", async () => {
  const { hasNoindex } = await import("../scripts/seo-robots.mjs");
  assert.equal(hasNoindex('<html><meta name="robots" content="index,follow"></html>'), false);
  assert.equal(hasNoindex('<meta name="robots" content="noindex, nofollow">'), true);
  assert.equal(hasNoindex('<meta content="nofollow, noindex" name="robots">'), true);
  assert.equal(hasNoindex('<meta name="googlebot" content="noindex">'), true);
  assert.equal(hasNoindex('<meta name="robots" content="noindex">', ""), true);
  assert.equal(hasNoindex('<meta name="description" content="How to remove noindex from your site">'), false);
  assert.equal(hasNoindex("<h1>How to fix noindex</h1>", "noindex, nofollow"), true);
  assert.equal(hasNoindex("<h1>How to fix noindex</h1>", ""), false);
  const monitor = await readFile(new URL("../scripts/monitor-public-seo.mjs", import.meta.url), "utf8");
  assert.equal(monitor.split("hasNoindex(body, response.headers").length - 1, 2, "Priority pages and additional sitemap pages must use identical detection");
});



test("versioned asset monitor extracts safe first-party paths and rejects HTML fallback", async () => {
  const { referencedAssets, isUnusableAssetResponse } = await import("../scripts/public-asset-utils.mjs");
  const html = [
    '<script defer src="/_next/static/chunks/entry-AbC123.js?download=1"></script>',
    '<link rel="modulepreload" href="/_next/static/chunks/entry-AbC123.js">',
    '<link rel="stylesheet" href="/_next/static/css/styles-123.css">',
    '<script src="https://external.example/_next/static/chunks/evil.js"></script>',
    '<link href="/kontakt" rel="canonical">',
  ].join("");
  assert.deepEqual(referencedAssets(html, "https://zielona-marka.pl"), [
    "/_next/static/chunks/entry-AbC123.js",
    "/_next/static/css/styles-123.css",
  ].sort());
  assert.equal(isUnusableAssetResponse("/_next/static/chunks/a.js", 404, "text/html"), true);
  assert.equal(isUnusableAssetResponse("/_next/static/chunks/a.js", 200, "text/html"), true);
  assert.equal(isUnusableAssetResponse("/_next/static/chunks/a.js", 200, "application/javascript"), false);
  assert.equal(isUnusableAssetResponse("/_next/static/chunks/a.js", 206, "text/javascript"), false);
  assert.equal(isUnusableAssetResponse("/_next/static/css/a.css", 200, "text/css"), false);
  const script = await readFile(new URL("../scripts/monitor-public-assets.mjs", import.meta.url), "utf8");
  assert.match(script, /asset-monitor-artifacts\/report\.json/);
  assert.match(script, /versionedAssetsFound/);
  assert.ok(script.includes("asset-monitor-artifacts/asset-history.json"), "Historical asset manifest must be persisted");
  assert.ok(script.includes("report.historicalMissing"), "Historical chunk availability must be reported");
  assert.ok(script.includes("!references.has(path)"), "Historical probe must exclude assets still referenced by current HTML");
  assert.match(script, /const queue = allAssets\.slice\(0, maxAssets\)/);
  assert.doesNotMatch(script, /\.slice\(0, 20\)/, "Monitoring must not omit later chunks");
});


test("home scrolled layout restores photography and shares public-page section rhythm", async () => {
  const home = await readFile(new URL("../app/OrganicHome.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/home-scroll-editorial.css", import.meta.url), "utf8");
  assert.match(home, /import "\.\/home-scroll-editorial\.css"/);
  assert.match(home, /className="zmh-scroll-content"/);
  assert.match(css, /\.zmh-scroll-content/);
  assert.match(css, /\.zm-home-offers-intro h2/);
  assert.ok(home.indexOf('import "./home-scroll-editorial.css"') >
    home.indexOf('import "./home-layout-repair.css"'), "Load final homepage rules after earlier repair");
  assert.match(css, /\.zmh-assembly\.zmh-media-ready/);
  assert.match(css, /\.zmh-quick-brief/);
  assert.match(css, /\.zmh-cinema-chapters \.zmh-story/);
  assert.match(css, /\.zmh-lower-forest/);
  assert.match(css, /forest-continuous\.webp/);
  assert.match(css, /zielona-marka-hero-paprocie\.webp/);
  assert.match(css, /@media\(max-width:620px\)/);
  assert.doesNotMatch(css, /\.zmh-opening\s*\{/,
    "Keep the first hero unchanged; do not override its video or navigation");
});

test("organic homepage keeps the original content and confines the stream to the opening",async()=>{
  const [home,portal,theme,fern,page]=await Promise.all([
    readFile(new URL("../app/OrganicHome.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/LivingPortal.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/home-nature-finish.css",import.meta.url),"utf8"),
    readFile(new URL("../public/brand-review-v6/fern-frond.svg",import.meta.url),"utf8"),
    (await fetchPage("/")).text(),
  ]);
  assert.match(home,/import "\.\/home-nature-finish\.css"/);
  for(const item of ["HomeOffersCarousel","HomeContactForm","HomeStoryMotion","<SiteFooter","<ForestHero"]){
    assert.ok(home.includes(item),item+" must remain available");
  }
  assert.match(portal,/zmh-assembly-board--premium/);
  assert.match(portal,/zmh-preview-website/);
  assert.match(portal,/zmh-preview-statuses/);
  assert.match(portal,/Wszystko zaczyna/);
  assert.match(portal,/PRZYKŁADOWY PROCES DLA TWOJEJ FIRMY/);
  assert.match(page,/PRZYKŁADOWY PROCES DLA TWOJEJ FIRMY/);
  assert.match(page,/KONTAKT PO USŁUDZE/);
  assert.match(theme,/\.zmh-opening \.zmh-living-forest\{/);
  assert.match(theme,/\.zmh-assembly::before\{/);
  assert.doesNotMatch(theme,/background:[^;]*stream-water-bottom\.webp/s, "Don't repeat the water photography in lower sections");
  assert.match(theme,/fern-frond\.svg/);
  assert.match(fern,/<svg [^>]*viewBox="0 0 330 470"/);
  assert.match(theme,/prefers-reduced-motion:reduce/);
  assert.match(theme,/animation-timeline:view\(\)/);
  assert.match(theme,/\.zmh-cinema-screen/);
  assert.match(theme,/\.zm-home-slide:not\(\[hidden\]\)/);
});


test("botanical ornaments stay inside homepage sections at mobile and desktop widths", async () => {
  const css = await readFile(new URL("../app/home-nature-finish.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /\.zm-home-offers::after\s*\{[^}]*right:\s*-/s, "Offer fern must not extend the viewport");
  assert.doesNotMatch(css, /\.zmh-contact::before\s*\{[^}]*left:\s*-/s, "Contact fern must not extend the viewport");
  assert.match(css, /\.zm-home-offers::after\s*\{[^}]*right:36px/s, "Mobile fern must remain in bounds even when rotated");
  assert.match(css, /\.zmh-contact::before\s*\{[^}]*left:48px/s, "Mobile contact fern must remain in bounds even when rotated");
  assert.match(css, /right:clamp\(68px,7vw,110px\)/);
  assert.match(css, /left:clamp\(70px,7vw,120px\)/);
});
