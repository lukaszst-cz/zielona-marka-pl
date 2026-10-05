import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const routes=['/','/oferta','/jak-pracuje','/kontakt','/realizacje','/modernizacja-strony','/maly-crm-dla-firm','/usprawnienia-firmy','/strony-dla-firm-uslugowych','/strony-dla-beauty','/strony-dla-warsztatow','/asystent-zapytan','/chatbot-dla-firm','/opieka-nad-strona','/przyklady-zaplecza','/strony-internetowe-marki','/strony-internetowe/targowek','/en','/polityka-prywatnosci'];
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
 const results=[];
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const route of routes){
   try{
    const response=await page.goto(`http://127.0.0.1:4180${route}`,{waitUntil:'domcontentloaded',timeout:20000});
    const metrics=await page.evaluate(()=>{
     const header=document.querySelector('.zm-header .brand-signature');
     const footer=document.querySelector('.zm-footer .brand-signature');
     const img=header?.querySelector('img');
     const box=header?.getBoundingClientRect();
     const items=[...document.querySelectorAll('main ul li,main ol li')].filter(el=>{const rect=el.getBoundingClientRect();const style=getComputedStyle(el);return rect.width>0&&rect.height>0&&style.visibility!=='hidden'});
     return {header:!!header,footer:!!footer,logoSrc:img?.getAttribute('src'),logoBox:box?{x:Math.round(box.x),width:Math.round(box.width),height:Math.round(box.height)}:null,listCount:items.length,edgeItems:items.map(el=>({text:el.textContent.trim().slice(0,45),x:Math.round(el.getBoundingClientRect().x),right:Math.round(el.getBoundingClientRect().right)})).filter(item=>item.x<14||item.right>innerWidth-14).slice(0,5),overflow:document.documentElement.scrollWidth>innerWidth+2};
    });
    if(width===390&&route==='/oferta'){
     await page.screenshot({path:'outputs/mobile-offer-logo.png'});
     await page.locator('main ul').first().scrollIntoViewIfNeeded();
     await page.screenshot({path:'outputs/mobile-offer-list.png'});
    }
    results.push({width,route,status:response.status(),...metrics});
   }catch(error){results.push({width,route,error:String(error).slice(0,160)})}
  }
  await page.close();
 }
 const exceptions=results.filter(row=>row.error||row.status!==200||!row.header||!row.footer||row.logoSrc!=='/logo-fern-automation-white.svg'||row.edgeItems?.length||row.overflow);
 console.log(JSON.stringify({routes:routes.length,checked:results.length,exceptions,logoSizes:[...new Set(results.filter(x=>x.logoBox).map(x=>`${x.width}:${x.logoBox.width}x${x.logoBox.height}`))],listCounts:results.filter(x=>x.listCount).map(x=>({route:x.route,width:x.width,count:x.listCount}))}));
}finally{await browser.close()}
