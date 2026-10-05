import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';

const base=process.argv[2]||'http://127.0.0.1:4180';
const output=process.argv[3]||'outputs/local-site-audit.json';
const additions=['/demo/natura-strona','/demo/bistro-strona','/demo/dom-strona','/demo/transport','/koncepcja-zielonej-marki','/status'];
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const report={pages:[],issues:[],mediaControls:null};
try{
 const sitemap=await (await fetch(`${base}/sitemap.xml`)).text();
 const routes=[...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>new URL(match[1]).pathname).concat(additions))];
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  for(const route of routes){
   errors.length=0;
   try{
    const response=await page.goto(`${base}${route}`,{waitUntil:'networkidle',timeout:30000});
    const data=await page.evaluate(()=>({
     title:document.title,
     description:document.querySelector('meta[name="description"]')?.content||'',
     canonical:document.querySelector('link[rel="canonical"]')?.href||'',
     h1:document.querySelectorAll('h1').length,
     overflow:document.documentElement.scrollWidth>innerWidth+2,
     brokenImages:[...document.images].filter(image=>image.complete&&!image.naturalWidth).map(image=>image.currentSrc||image.src),
     missingAlt:[...document.images].filter(image=>!image.hasAttribute('alt')).map(image=>image.currentSrc||image.src),
     unnamedInputs:[...document.querySelectorAll('input,textarea,select')].filter(field=>field.getAttribute('aria-hidden')!=='true'&&!field.getAttribute('aria-label')&&!field.labels?.length).map(field=>field.outerHTML.slice(0,100)),
     invalidJsonLd:[...document.querySelectorAll('script[type="application/ld+json"]')].filter(node=>{try{JSON.parse(node.textContent||'');return false}catch{return true}}).length,
    }));
    const row={route,width,status:response?.status()||0,...data,errors:[...errors]};
    report.pages.push(row);
    if(row.status!==200||!row.title||!row.description||row.h1!==1||row.overflow||row.brokenImages.length||row.missingAlt.length||row.unnamedInputs.length||row.invalidJsonLd||row.errors.length)report.issues.push(row);
   }catch(error){report.issues.push({route,width,error:String(error)});}
  }
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto(base,{waitUntil:'networkidle'});
 await page.waitForTimeout(3600);
 const before=await page.locator('.zmh-media-controls').boundingBox();
 await page.evaluate(()=>scrollTo(0,300));
 const after=await page.locator('.zmh-media-controls').boundingBox();
 report.mediaControls={before,after,anchoredToOpening:!!before&&!!after&&before.y>=100&&after.y<0};
 if(!report.mediaControls.anchoredToOpening)report.issues.push({type:'media-controls',...report.mediaControls});
 writeFileSync(output,JSON.stringify(report,null,2));
 console.log(JSON.stringify({routes:routes.length,views:report.pages.length,issues:report.issues.length,mediaControls:report.mediaControls},null,2));
}finally{await browser.close()}
