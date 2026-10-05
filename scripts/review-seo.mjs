import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base='http://127.0.0.1:4180',dir='outputs/design-review';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:960},reducedMotion:'reduce'});
const sitemap=await(await fetch(base+'/sitemap.xml')).text();
const routes=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const report={pages:[],issues:[],links:[],interactions:[]};
const links=new Map();
for(const [index,route] of routes.entries()){
 await page.goto(base+route,{waitUntil:'networkidle'});
 const data=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,robots:document.querySelector('meta[name="robots"]')?.content,links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))}));
 for(const href of data.links){try{const u=new URL(href,base+route);if(u.origin===base||u.origin==='https://zielona-marka.pl')links.set(u.pathname+u.search+u.hash,route);}catch{report.issues.push({route,invalidHref:href});}}
 delete data.links;report.pages.push({route,...data});
 if(!data.title||!data.description||data.canonical?.replace(/\/$/,'')!=='https://zielona-marka.pl'+(route==='/'?'':route))report.issues.push({type:'metadata',route,...data});
 if(data.robots?.includes('noindex'))report.issues.push({type:'sitemap-noindex',route});
 if(await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).count())await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
 await page.screenshot({path:`${dir}/top-${String(index).padStart(2,'0')}.png`});
}
for(const key of ['title','description']){const seen=new Map();for(const row of report.pages){if(seen.has(row[key]))report.issues.push({type:'duplicate-'+key,routes:[seen.get(row[key]),row.route]});seen.set(row[key],row.route);}}
for(const [link,from] of links){
 const u=new URL(link,base);const response=await fetch(base+u.pathname+u.search);const body=await response.text();
 const ok=response.ok;const anchor=!u.hash||body.includes(`id="${decodeURIComponent(u.hash.slice(1))}"`);
 report.links.push({link,from,status:response.status,anchor});
 if(!ok||!anchor)report.issues.push({type:'link',link,from,status:response.status,anchor});
}
await page.goto(base,{waitUntil:'networkidle'});await page.setViewportSize({width:390,height:844});
await page.locator('.organic-mobile-menu summary').click();
report.interactions.push({name:'mobile-menu',ok:await page.locator('.organic-mobile-menu a[href="/kontakt"]').isVisible()});
await page.locator('.organic-mobile-menu summary').click();
await page.locator('[name="name"]').fill('Test offline');await page.locator('[name="email"]').fill('offline@example.invalid');await page.locator('[name="projectType"]').selectOption({label:'Mały CRM do klientów i zleceń'});await page.locator('[name="message"]').fill('Lokalny test utraty sieci');await page.locator('.form-consent input').check();
await page.route('**/api/inquiries',r=>r.abort('internetdisconnected'));await page.getByRole('button',{name:'Wyślij brief'}).click();await page.getByRole('alert').waitFor();
report.interactions.push({name:'offline-form',ok:(await page.getByRole('alert').innerText()).includes('Brak połączenia')&&await page.getByRole('button',{name:'Wyślij brief'}).isEnabled()});
await page.unroute('**/api/inquiries');
await page.goto(base+'/demo/dom-strona',{waitUntil:'networkidle'});await page.getByRole('button',{name:'4 pokoje',exact:true}).click();
report.interactions.push({name:'property-filter',ok:await page.locator('.dom-table article').count()===1&&(await page.locator('.dom-unit-card h3').innerText()).includes('A.04')});
await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:dir+'/home-mobile-viewport.png'});
await page.setViewportSize({width:1440,height:1000});await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:dir+'/home-desktop-viewport.png'});
report.issues.push(...report.interactions.filter(i=>!i.ok));
fs.writeFileSync(dir+'/seo-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:report.pages.length,links:report.links.length,interactions:report.interactions,issues:report.issues},null,2));
await browser.close();
