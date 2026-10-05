import { chromium } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}});
const base='http://127.0.0.1:4180',checks=[];
await page.goto(base,{waitUntil:'networkidle'});
if(await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).count())await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
const story=page.locator('.organic-statement>div');await story.scrollIntoViewIfNeeded();
await page.waitForFunction(()=>getComputedStyle(document.querySelector('.organic-statement>div')).opacity==='1');
checks.push({name:'scroll-reveal',ok:true});
await page.locator('.cinema-screen').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'Odtwórz opowieść · 27 s'}).click();
await page.getByRole('heading',{name:'Mapa Twojej firmy.'}).waitFor({timeout:10000});
await page.getByRole('button',{name:'Wstrzymaj',exact:true}).click();
checks.push({name:'process-playback',ok:true});
await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});
checks.push({name:'reduced-motion',ok:await page.locator('.organic-await').count()===0});
for(const route of ['/', '/en', '/polityka-prywatnosci']){
 for(const width of [1440,390,360]){
  await page.setViewportSize({width,height:960});await page.goto(base+route,{waitUntil:'networkidle'});
  const result=await page.evaluate(async()=>{for(const image of document.images)image.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));return{overflow:document.documentElement.scrollWidth>innerWidth+2,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)};});
  checks.push({name:route+'@'+width,ok:!result.overflow&&!result.broken.length,...result});
  if(width===390||width===1440)await page.screenshot({path:`outputs/design-review/final-${width}-${route.replaceAll('/','_')}.png`,fullPage:true});
 }
}
for(const route of ['/demo/natura-strona','/status','/koncepcja-zielonej-marki']){const r=await fetch(base+route);checks.push({name:'noindex '+route,ok:r.headers.get('x-robots-tag')?.includes('noindex')===true});}
fs.writeFileSync('outputs/design-review/final-checks.json',JSON.stringify(checks,null,2));console.log(JSON.stringify(checks,null,2));
await browser.close();
