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
  assert.match(config,/source:\s*"\/chatbot-dla-firm"[\s\S]*destination:\s*"\/asystent-zapytan"/);
  assert.doesNotMatch(config,/realizacje\/transportflow[\s\S]*demo\/transport/);
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
      }catch{}
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
