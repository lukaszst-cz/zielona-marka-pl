import test from 'node:test';
import assert from 'node:assert/strict';
import { inquiryFormEnabled } from '../app/inquiry-config.mjs';
import { sendInquiryNotification } from '../app/inquiry-notification.mjs';
const runtime={DB:{},INQUIRY_FORM_ENABLED:'1',RESEND_API_KEY:'test-only-key',INQUIRY_NOTIFICATION_FROM:'forms@example.test',INQUIRY_NOTIFICATION_TO:'owner@example.test'};
const data={id:42,name:'Example',email:'visitor@example.test',company:'',message:'A website inquiry'};
test('server forms require explicit activation and every runtime binding',()=>{
 assert.equal(inquiryFormEnabled(runtime),true);
 for(const key of Object.keys(runtime)){assert.equal(inquiryFormEnabled({...runtime,[key]:undefined}),false,key);}
 assert.equal(inquiryFormEnabled({...runtime,INQUIRY_FORM_ENABLED:'0'}),false);
});
test('missing provider configuration sends nothing',async()=>{
 let calls=0;
 await assert.rejects(sendInquiryNotification(data,{},async()=>{calls++;}),/not configured/);
 assert.equal(calls,0);
});
test('owner receives fixed configured address and visitor is only reply-to',async()=>{
 let options;
 const result=await sendInquiryNotification(data,runtime,async(url,init)=>{assert.equal(url,'https://api.resend.com/emails');options=init;return Response.json({id:'provider-42'});});
 const body=JSON.parse(options.body);
 assert.deepEqual(body.to,['owner@example.test']);
 assert.equal(body.reply_to,'visitor@example.test');
 assert.equal(options.headers['Idempotency-Key'],'zm-inquiry-42');
 assert.deepEqual(result,{providerId:'provider-42'});
});
test('transient provider failure retries with the same idempotency key',async()=>{
 let calls=0;const keys=[];
 await sendInquiryNotification(data,runtime,async(url,init)=>{keys.push(init.headers['Idempotency-Key']);return ++calls===1?new Response('',{status:503}):Response.json({id:'accepted'});});
 assert.equal(calls,2);assert.deepEqual(keys,['zm-inquiry-42','zm-inquiry-42']);
});
test('invalid credentials and permanent provider errors are not retried',async()=>{
 let calls=0;
 await assert.rejects(sendInquiryNotification(data,runtime,async()=>{calls++;return new Response('',{status:401});}),/rejected/);
 assert.equal(calls,1);
});
test('HTTP success without a provider id is never reported as accepted',async()=>{
 await assert.rejects(sendInquiryNotification(data,runtime,async()=>Response.json({})),/acknowledgement/);
});
test('persistent failures do not turn into a success after the retry',async()=>{
 let calls=0;
 await assert.rejects(sendInquiryNotification(data,runtime,async()=>{calls++;throw new Error('network unavailable');}),/network unavailable/);
 assert.equal(calls,2);
});

test('existing home.pl secret enables SMTP without Resend or copying its value',()=>{
 assert.equal(inquiryFormEnabled({DB:{},INQUIRY_FORM_ENABLED:'1',SMTP_PASSWORD:'test-only'}),true);
 assert.equal(inquiryFormEnabled({DB:{},SMTP_PASSWORD:'test-only'}),false);
 assert.equal(inquiryFormEnabled({INQUIRY_FORM_ENABLED:'1',SMTP_PASSWORD:'test-only'}),false);
});
