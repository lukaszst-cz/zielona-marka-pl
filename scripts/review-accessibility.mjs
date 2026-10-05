import{chromium}from'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';import fs from'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const checks=[];const base=process.argv[2]||'http://127.0.0.1:4180';
page.on('pageerror',e=>checks.push({name:'javascript',ok:false,error:e.message}));
await page.addInitScript(()=>{window.__cls=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__cls+=e.value;}).observe({type:'layout-shift',buffered:true});});
await page.goto(base+'/kontakt',{waitUntil:'networkidle'});checks.push({name:'contact-layout-shift',ok:await page.evaluate(()=>window.__cls<.1),value:await page.evaluate(()=>window.__cls)});
if(await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).count())await page.getByRole('button',{name:'Tylko niezbędne',exact:true}).click();
const photo=page.locator('.expandable-image');await photo.scrollIntoViewIfNeeded();await photo.focus();await page.keyboard.press('Enter');await page.getByRole('dialog').waitFor();
checks.push({name:'photo-dialog-focus',ok:await page.getByRole('button',{name:'Zamknij podgląd zdjęcia'}).evaluate(e=>e===document.activeElement)});
await page.keyboard.press('Tab');checks.push({name:'photo-dialog-trap',ok:await page.evaluate(()=>!!document.activeElement?.closest('dialog'))});
await page.keyboard.press('Escape');checks.push({name:'photo-focus-restored',ok:await photo.evaluate(e=>e===document.activeElement)});
await page.locator('.contact-form').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.documentElement.classList.contains('contact-form-visible'));
checks.push({name:'floats-do-not-cover-form',ok:!await page.locator('.whatsapp-float').isVisible()&&!await page.locator('.demo-assistant-trigger').isVisible()});
await page.screenshot({path:'outputs/design-review/contact-form-uncovered.png'});
await page.goto(base,{waitUntil:'networkidle'});await page.getByRole('button',{name:'Wypróbuj asystenta',exact:true}).click();
checks.push({name:'assistant-initial-focus',ok:await page.getByRole('button',{name:'Zamknij asystenta',exact:true}).evaluate(e=>e===document.activeElement)});
await page.keyboard.press('Escape');checks.push({name:'assistant-escape',ok:await page.getByRole('button',{name:'Wypróbuj asystenta',exact:true}).evaluate(e=>e===document.activeElement)});
await page.getByRole('button',{name:'Wypróbuj asystenta',exact:true}).click();await page.getByRole('button',{name:'Nowa strona',exact:true}).click();await page.getByRole('button',{name:'Inna firma usługowa',exact:true}).click();
const form=page.locator('.assistant-lead-form');await form.locator('[name="name"]').fill('Lokalny test offline');await form.locator('[name="email"]').fill('offline@example.invalid');await form.locator('[type="checkbox"]').check();await page.route('**/api/inquiries',r=>r.abort('internetdisconnected'));
await form.getByRole('button',{name:'Wyślij zgłoszenie'}).click();await form.getByRole('alert').waitFor();checks.push({name:'assistant-network-recovery',ok:await form.getByRole('button',{name:'Wyślij zgłoszenie'}).isEnabled()});await page.unroute('**/api/inquiries');
for(const path of ['/oferta','/maly-crm-dla-firm','/demo/natura-strona','/demo/bistro-strona','/demo/dom-strona'])for(const width of [360,390,1440]){
 await page.setViewportSize({width,height:844});await page.goto(base+path,{waitUntil:'networkidle'});checks.push({name:path+'@'+width,ok:await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)});
}
fs.writeFileSync('outputs/design-review/accessibility-report.json',JSON.stringify(checks,null,2));console.log(JSON.stringify(checks,null,2));await browser.close();
