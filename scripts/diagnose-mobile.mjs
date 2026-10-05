import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:390,height:844}});
for(const path of ['/modernizacja-strony','/demo/dom-strona','/demo/bistro-strona']){
 await page.goto('http://127.0.0.1:4180'+path,{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 console.log(path,await page.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,els:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>innerWidth+2||r.left< -2||e.scrollWidth>e.clientWidth+3)}).slice(0,30).map(e=>({tag:e.tagName,cls:e.className,width:Math.round(e.getBoundingClientRect().width),scroll:e.scrollWidth,text:e.textContent.slice(0,80)}))})));
}
await browser.close();
