import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const out='outputs/brand-review-v5';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const checks=[];
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
 const getCopy=()=>page.locator('.hero-copy,.copy,.process,.contact>div').allTextContents();
 await page.goto('http://127.0.0.1:4190/brand-review-v4/',{waitUntil:'networkidle'});const original=await getCopy();
 for(const width of [1440,390,360]){
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:4190/brand-review-v5/',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));});
  checks.push({name:`copy-unchanged-${width}`,ok:JSON.stringify(original)===JSON.stringify(await getCopy())});
  checks.push({name:`no-overflow-${width}`,ok:await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)});
  const stages=page.locator('.cinema-chapters>.story');
  for(let index=0;index<5;index++){
   await stages.nth(index).evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-90,behavior:'instant'}));
   await page.waitForFunction(index=>document.querySelector(`.cine-shot[data-stage="${index}"]`).classList.contains('is-current'),index);
   await page.waitForTimeout(1050);
   checks.push({name:`scene-${index}-${width}`,ok:await stages.nth(index).evaluate(el=>el.classList.contains('is-current'))});
   if(width!==360&&[0,1,3,4].includes(index))await page.screenshot({path:`${out}/scene-${index}-${width}.png`});
  }
  await page.locator('#motion-toggle').click();checks.push({name:`manual-reduced-motion-${width}`,ok:await page.evaluate(()=>!document.documentElement.classList.contains('cinema-enhanced'))});
  const images=await page.evaluate(()=>[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src));checks.push({name:`images-${width}`,ok:images.length===0,broken:images});
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});
 checks.push({name:'system-reduced-motion',ok:await page.evaluate(()=>!document.documentElement.classList.contains('cinema-enhanced'))});
 checks.push({name:'reduced-motion-copy',ok:JSON.stringify(original)===JSON.stringify(await getCopy())});
 checks.push({name:'javascript-errors',ok:errors.length===0,errors});
 const noScript=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});await noScript.goto('http://127.0.0.1:4190/brand-review-v5/',{waitUntil:'networkidle'});
 checks.push({name:'no-js-readable-fallback',ok:await noScript.locator('.cinema-chapters .visual').first().isVisible()});
 checks.push({name:'no-js-no-overflow',ok:await noScript.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)});
 fs.writeFileSync(`${out}/report.json`,JSON.stringify(checks,null,2));console.log(JSON.stringify(checks));
}finally{await browser.close();}
