import assert from 'node:assert/strict';
const {chromium}=await import(process.env.BROWSER_QA_PLAYWRIGHT_ENTRY || 'playwright');
const base=process.env.BROWSER_QA_URL || 'http://127.0.0.1:8788';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try {
 for(const item of [{path:'/',selector:'#krotki-brief form'},{path:'/kontakt',selector:'form.contact-form'},{path:'/bezplatna-koncepcja-strony',selector:'form.zm-concept-form'},{path:'/',selector:'form.assistant-lead-form',assistant:true}]) {
  const page=await browser.newPage({viewport:{width:390,height:844}});
  let posts=0;const bodies=[];let fail=false;
  await page.route('**/api/inquiries',async route=>{
   if(route.request().method()==='GET')return route.abort('timedout');
   posts++;bodies.push(route.request().postData());
   return route.fulfill(fail?{status:500,json:{error:'Testowy błąd zapisu. Spróbuj ponownie.'}}:{status:201,json:{ok:true,reference:71}});
  });
  await page.goto(base+item.path,{waitUntil:'domcontentloaded'});
  const cookie=page.getByRole('button',{name:'Tylko niezbędne',exact:true});
  await cookie.waitFor({state:"visible"});await cookie.click();
  if(item.assistant){
   await page.getByRole('button',{name:'Wypróbuj asystenta',exact:true}).click();
   await page.locator('.assistant-options').getByRole('button',{name:'Nowa strona',exact:true}).click();
   await page.locator('.assistant-options').getByRole('button',{name:'Warsztat / detailing',exact:true}).click();
  }
  const form=page.locator(item.selector);
  await form.waitFor({state:'visible'});
  await page.waitForFunction(selector=>document.querySelector(selector)?.getAttribute('action')==='/api/inquiries',item.selector);
  const name=form.locator('input[name=name]:not([type=hidden])');if(await name.count())await name.fill('Osoba testowa');
  await form.locator('input[name=email]').fill('visitor@example.test');
  const select=form.locator('select[name=projectType]');if(await select.isVisible())await select.selectOption({label:item.path==='/kontakt'?'Strona WWW szyta na miarę':'Strona WWW'});
  const text=form.locator('textarea[name=details],textarea[name=message]');await text.fill('Potrzebuję strony warsztatu z formularzem kontaktowym.');
  await form.locator('input[name=consent]').check();
  fail=true;await form.getByRole('button',{name:/^Wyślij zgłoszenie/}).click();
  await form.getByRole('alert').waitFor({state:'visible'});
  assert.match(await text.inputValue(),/Potrzebuję strony/,'The form must retain the message on failure');
  fail=false;await form.getByRole('button',{name:/^Wyślij zgłoszenie/}).click();
  await form.getByRole('button',{name:/^Zgłoszenie zapisane/}).waitFor({state:'visible'});
  assert.ok(await form.getByRole('button',{name:/^Zgłoszenie zapisane/}).isDisabled());
  assert.match(await form.getByRole('status').innerText(),/nr 71/);
  assert.equal(posts,2,'Exactly one request per deliberate attempt');
  assert.ok(bodies.every(body=>body.includes('name="consent"')&&body.includes('name="formTitle"')));
  assert.ok(!page.url().startsWith('mailto:'),'A failed readiness check must never open the mail application');
  await page.close();
  console.log('PASS mocked server transport, retained fields and acknowledgement: '+item.selector);
 }
} finally {await browser.close();}
