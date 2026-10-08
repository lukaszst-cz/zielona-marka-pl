import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {createRequire} from 'node:module';
import fs from 'node:fs';
const sharp=createRequire(import.meta.url)('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const out='outputs/brand-review-v4';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const report=[];
const lum=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
try{
 const page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,390,360]){
  await page.setViewportSize({width,height:960});await page.goto('http://127.0.0.1:4190/brand-review-v4/',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));});
  const result=await page.evaluate(()=>({width:innerWidth,height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),h1:document.querySelectorAll('h1').length,heroServicesSize:getComputedStyle(document.querySelector('.hero .eyebrow')).fontSize,leadSize:getComputedStyle(document.querySelector('.lead')).fontSize,phoneLinks:[...document.querySelectorAll('a')].filter(a=>a.textContent.includes('Porozmawiajmy')).every(a=>a.getAttribute('href')==='tel:+48450458466')}));
  await page.screenshot({path:`${out}/page-${width}.png`,fullPage:true});
  await page.screenshot({path:`${out}/hero-${width}.png`});
  for(const selector of ['#opowiesc','#projekty','#proces','#kontakt']){
   const y=await page.locator(selector).evaluate(el=>Math.max(0,el.getBoundingClientRect().top+scrollY));
   await page.screenshot({path:`${out}/${selector.slice(1)}-${width}.png`,fullPage:true,clip:{x:0,y,width,height:Math.min(1100,result.height-y)}});
  }
  const samples=await page.evaluate(()=>{
   const selectors='.hero .eyebrow,.hero h1,.lead,.service-line,.trust-note,.quiet,.pill,.copy h2,.copy>p,.copy>.text-link,.intro,.section-heading h2,.process>h2,.process>p,.care-steps h3,.care-steps p,.contact h2,.contact>div>p,.phone';
   const seen=new Set(),items=[];
   for(const el of document.querySelectorAll(selectors)){
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    for(let node=walker.nextNode();node;node=walker.nextNode()){
     if(seen.has(node)||!node.textContent.trim())continue;seen.add(node);
     const style=getComputedStyle(node.parentElement),color=style.color.match(/[\d.]+/g).slice(0,3).map(Number);
     const range=document.createRange();range.selectNodeContents(node);
     const rects=[...range.getClientRects()].filter(r=>r.width&&r.height).map(r=>({x:r.x+scrollX,y:r.y+scrollY,w:r.width,h:r.height}));
     if(rects.length)items.push({text:node.textContent.trim(),color,size:parseFloat(style.fontSize),weight:parseInt(style.fontWeight)||400,rects});
    }
   }return items;
  });
  const hide=await page.addStyleTag({content:'*,.copy .callout{color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important}'});
  const bg=await page.screenshot({fullPage:true});await hide.evaluate(el=>el.remove());
  const {data,info}=await sharp(bg).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const contrast=samples.map(item=>{
   let min=Infinity;
   for(const r of item.rects){for(let y=Math.ceil(r.y+2);y<r.y+r.h-2;y+=5){for(let x=Math.ceil(r.x+2);x<r.x+r.w-2;x+=7){if(x<0||y<0||x>=info.width||y>=info.height)continue;const idx=(y*info.width+x)*info.channels;const l=lum([data[idx],data[idx+1],data[idx+2]]),fg=lum(item.color);min=Math.min(min,(Math.max(l,fg)+.05)/(Math.min(l,fg)+.05));}}}
   const threshold=item.size>=24||(item.size>=18.66&&item.weight>=700)?3:4.5;
   return{text:item.text,minContrast:Number(min.toFixed(2)),threshold};
  });
  result.contrastSampleFailures=contrast.filter(item=>item.minContrast<item.threshold);
  result.contrastTextRuns=contrast.length;
  await page.locator('.contact-draft>summary').click();await page.locator('.extra-fields>summary').click();
  result.expandedFormOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  result.previewSendDisabled=await page.locator('button[type=submit]').isDisabled();
  if(width!==360)await page.locator('.contact-draft').screenshot({path:`${out}/form-${width}.png`});
  report.push(result);
 }
 await page.goto('http://127.0.0.1:4190/brand-review-v4/',{waitUntil:'networkidle'});
 const documentText=await page.evaluate(()=>{
  const norm=el=>el.innerText.replace(/\n+/g,' ').replace(/\s+/g,' ').trim();
  const block=el=>el.matches('h1,h2')?'**'+norm(el)+'**':el.matches('a')?'Przycisk / odnośnik: '+norm(el):norm(el);
  let text='## Pierwszy ekran\n\n'+[...document.querySelectorAll('.hero-copy>p,.hero-copy>h1,.hero-copy .actions>a')].map(block).join('\n\n')+'\n\nPodpis przy fotografii: '+norm(document.querySelector('.hero-foot>p'));
  for(const el of document.querySelectorAll('.copy,.portfolio,.process,.contact>div')){
   const title=norm(el.querySelector('h2'));
   text+='\n\n## '+title+'\n\n';
   if(el.matches('.copy'))text+=[...el.querySelectorAll(':scope>p,:scope>a,:scope>.aside-note')].map(block).join('\n\n');
   if(el.matches('.portfolio'))text+=norm(el.querySelector('.intro'))+'\n\n'+[...el.querySelectorAll('.project')].map(p=>'- **'+norm(p.querySelector('h3'))+'**: '+norm(p.querySelector('p'))).join('\n')+'\n\n'+norm(el.querySelector(':scope>.caption'));
   if(el.matches('.process'))text+=norm(el.querySelector(':scope>p:not(.chapter)'))+'\n\n'+[...el.querySelectorAll('.care-steps li')].map(li=>'- **'+norm(li.querySelector('h3'))+'**: '+norm(li.querySelector('p'))).join('\n')+'\n\n'+block(el.querySelector('.text-link'));
   if(el.matches('.contact>div'))text+=norm(el.querySelector(':scope>p:not(.eyebrow)'))+'\n\n'+[...el.querySelectorAll(':scope>a')].map(block).join('\n\n');
  }return text;
 });
 fs.writeFileSync('docs/strona-glowna-teksty-v4.md','# Zielona Marka: teksty strony głównej v4\n\n14.09.2026. Redakcja po zaakceptowanym audycie, z delikatnym motywem natury. Lokalny podgląd, bez publikacji.\n\n'+documentText+'\n\n## Formularz kontaktowy\n\n**Kilka zdań na dobry początek.**\n\nOpisz swoją firmę i to, co chcesz zmienić. Szczegóły możemy ustalić w rozmowie.\n\nW pierwszym widoku: imię, e-mail i opis sprawy.\n\nPole opisu: **Co chcesz ułatwić w swojej firmie?**\n\nPodpowiedź: Np. chcę lepiej pokazać usługi, sprzedawać vouchery albo uporządkować zapytania.\n\nRozwinięcie: **Dodaj szczegóły, jeśli chcesz.** Telefon, firma, obecna strona, obszar zainteresowania, planowany termin i orientacyjny budżet, wszystkie opcjonalne.\n\nObszary: Strona WWW / Formularze i zapytania / CRM i obsługa klientów / Sklep i płatności / Kilka z tych rzeczy / Chcę najpierw porozmawiać.\n\nPrzycisk: **Wyślij wiadomość ↗**.\n\nPotwierdzenie po rzeczywistym przyjęciu wiadomości: **Dziękuję, wiadomość dotarła. Zapoznam się z Twoją sprawą i odezwę się w sprawie kolejnego kroku.**\n\nBłąd wysyłki: **Wiadomość nie została wysłana. Spróbuj ponownie albo zadzwoń: +48 450 458 466.**\n\nUwaga wdrożeniowa: obecny formularz v4 jest wyłącznie podglądem treści i układu, z wyłączoną wysyłką. Komunikaty sukcesu i błędu są tekstami do wdrożenia z obsługą rzeczywistej odpowiedzi serwera. Podpis dotyczący prywatności zachowano z v3; ten etap nie obejmuje zmian prawnych.\n\n## Stopka\n\nZielona Marka. Strony WWW i systemy dla firm.\n\nMarki i okolice. Zdalnie w całej Polsce.\n');
 const urls=await page.locator('a[href^="http://127.0.0.1:4180"]').evaluateAll(links=>[...new Set(links.map(link=>link.href))]);
 for(const url of urls){try{const response=await page.request.get(url,{timeout:10000});report.push({url,status:response.status()});}catch(error){report.push({url,error:error.message.split('\n')[0]});}}
 const response=await page.request.get('http://127.0.0.1:4190/brand-review-v4/');
 report.push({noindex:response.headers()['x-robots-tag']==='noindex, nofollow',pageErrors:errors,contrastMethod:'Conservative background samples from text rectangles with glyphs temporarily hidden; not a full WCAG audit.'});
 fs.writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser.close();}
