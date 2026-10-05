import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base='http://127.0.0.1:4180';
const dir='outputs/design-review';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}, reducedMotion:'reduce'});
const page=await context.newPage();
const issues=[];const results=[];
page.on('pageerror', e=>issues.push({type:'js',message:e.message}));
const sitemap=await (await fetch(`${base}/sitemap.xml`)).text();
const routes=[...new Set([...Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g),m=>new URL(m[1]).pathname),'/demo/natura-strona','/demo/dom-strona','/demo/bistro-strona','/demo/transport','/koncepcja-zielonej-marki','/status'])];
for(const width of [1440,390,360]) {
 await page.setViewportSize({width,height:1000});
 for(const route of routes) {
  const response=await page.goto(base+route,{waitUntil:'networkidle'});
  if(await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).count()) await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
  await page.evaluate(async()=>{for(const image of document.images){image.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
  const data=await page.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel="canonical"]')?.getAttribute('href'),overflow:document.documentElement.scrollWidth>innerWidth+2,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),jsonLd:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{JSON.parse(s.textContent);return true}catch{return false}})}));
  results.push({route,width,status:response.status(),...data});
  if(response.status()!==200||data.overflow||data.h1!==1||data.brokenImages.length||data.jsonLd.includes(false)) issues.push({route,width,status:response.status(),...data});
  if(['/', '/oferta','/kontakt','/demo/natura-strona','/demo/bistro-strona','/demo/dom-strona'].includes(route)) await page.screenshot({path:`${dir}/${width}-${route.replaceAll('/','_')||'home'}.png`,fullPage:true});
 }
}
await page.goto(base,{waitUntil:'networkidle'});
await page.locator('[name="name"]').fill('Test lokalny Zielona Marka');
await page.locator('[name="email"]').fill('local-review@example.invalid');
await page.locator('[name="projectType"]').selectOption({label:'Mały CRM do klientów i zleceń'});
await page.locator('[name="message"]').fill('LOCAL_DESIGN_REVIEW: test zapisu formularza do izolowanej bazy.');
await page.locator('.form-consent input').check();
const sent=page.waitForResponse(r=>r.url().endsWith('/api/inquiries')&&r.request().method()==='POST');
await page.getByRole('button',{name:'Wyślij brief'}).click();
const submitted=await sent;const submission={status:submitted.status(),body:await submitted.json()};
if(submission.status!==201)issues.push({type:'form',submission});
const invalid=await fetch(`${base}/api/inquiries`,{method:'POST',headers:{'content-type':'application/json'},body:'{}'});
if(invalid.status!==400)issues.push({type:'invalid-form',status:invalid.status});
await page.getByRole('button',{name:'Odtwórz opowieść · 27 s'}).click();
await page.getByRole('button',{name:'06 / OPIEKUJĘ SIĘ',exact:true}).click();
if(!await page.getByRole('heading',{name:'Dalej też jesteśmy w kontakcie.'}).count())issues.push({type:'process-controls'});
const redirects=[];
for(const route of ['/chatbot-dla-firm','/realizacje/transportflow']){const r=await fetch(base+route,{redirect:'manual'});redirects.push({route,status:r.status,location:r.headers.get('location')});if(![301,302,307,308].includes(r.status))issues.push({type:'redirect',route,status:r.status});}
fs.writeFileSync(`${dir}/report.json`,JSON.stringify({results,issues,submission,invalid:invalid.status,redirects},null,2));
console.log(JSON.stringify({routes:routes.length,views:results.length,issues,submissionStatus:submission.status,invalidStatus:invalid.status,redirects},null,2));
await browser.close();
