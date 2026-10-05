import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const out='outputs/brand-review-v3';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const report=[];
try{
 const page=await browser.newPage();
 for(const width of [1440,390,360]){
  await page.setViewportSize({width,height:960});
  await page.goto('http://127.0.0.1:4190/brand-review-v3/',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));});
  const result=await page.evaluate(()=>({width:innerWidth,height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),h1:document.querySelectorAll('h1').length}));
  report.push(result);
  await page.screenshot({path:`${out}/page-${width}.png`,fullPage:true});
  if(width===1440){
   await page.screenshot({path:`${out}/hero.png`});
   for(const y of [900,1900,2900,4000])await page.screenshot({path:`${out}/desktop-${y}.png`,fullPage:true,clip:{x:0,y,width,height:Math.min(1050,result.height-y)}});
  }
  if(width===390){
   for(const y of [0,1500,3300,6100])await page.screenshot({path:`${out}/mobile-${y}.png`,fullPage:true,clip:{x:0,y,width,height:Math.min(1100,result.height-y)}});
  }
 }
 const urls=await page.locator('a[href^="http://127.0.0.1:4180"]').evaluateAll(links=>[...new Set(links.map(link=>link.href))]);
 for(const url of urls){try{const response=await page.request.get(url,{timeout:12000});report.push({url,status:response.status()});}catch(error){report.push({url,error:error.message.split('\n')[0]});}}
 await page.setViewportSize({width:1200,height:720});
 await page.goto('http://127.0.0.1:4190/brand-review-v3/logo-board.html',{waitUntil:'networkidle'});
 await page.screenshot({path:'public/brand-review-v3/logo-preview.png'});
 const links=await page.request.get('http://127.0.0.1:4190/brand-review-v3/');
 report.push({noindex:links.headers()['x-robots-tag']==='noindex, nofollow'});
 fs.writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2));
 console.log(JSON.stringify(report));
}finally{await browser.close();}
