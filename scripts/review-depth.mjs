import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];fs.mkdirSync('outputs/design-review/depth',{recursive:true});
const paths=['/','/oferta','/maly-crm-dla-firm','/kontakt','/demo/natura-strona','/demo/bistro-strona','/demo/dom-strona'];
for(const [index,path] of paths.entries()){
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.addInitScript(()=>{window.__shifts=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__shifts.push({value:e.value,sources:e.sources?.map(s=>({tag:s.node?.tagName,cls:s.node?.className,previous:s.previousRect,current:s.currentRect}))})}).observe({type:'layout-shift',buffered:true});});
 await page.goto('http://127.0.0.1:4180'+path,{waitUntil:'networkidle'});
 const initial=await page.evaluate(()=>({bytes:performance.getEntriesByType('resource').reduce((s,r)=>s+r.encodedBodySize,0),shifts:window.__shifts,largest:performance.getEntriesByType('resource').filter(r=>r.encodedBodySize>100000).map(r=>({path:new URL(r.name).pathname,bytes:r.encodedBodySize})).sort((a,b)=>b.bytes-a.bytes)}));
 if(await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).count())await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
 await page.evaluate(async()=>{for(const image of document.images)image.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 const sections=page.locator('main>section');const count=await sections.count();
 const shots=[];
 for(let n=1;n<count;n++){
  await sections.nth(n).scrollIntoViewIfNeeded();
  const name=`${index}-${n}`;await page.screenshot({path:`outputs/design-review/depth/${name}.png`});shots.push(name);
 }
 const controls=await page.evaluate(()=>[...document.querySelectorAll('input,select,textarea,button,a,summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0}).filter(e=>!e.textContent.trim()&&!e.getAttribute('aria-label')&&!e.labels?.length&&!e.querySelector('img[alt]')).map(e=>({tag:e.tagName,name:e.getAttribute('name'),class:e.className})));
 results.push({path,initial,shots,unnamedControls:controls});await page.close();
}
fs.writeFileSync('outputs/design-review/depth/report.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(r=>({path:r.path,initial:r.initial,unnamedControls:r.unnamedControls})),null,2));await browser.close();
