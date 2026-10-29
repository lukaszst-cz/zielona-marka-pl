import test from 'node:test';
import assert from 'node:assert/strict';
import { isSameSiteMutation, privateJson, limitedFormData, limitedRequestBody } from '../app/request-security.mjs';
import { toPublicProject } from '../app/public-project.mjs';
test('published portfolio cannot disclose client, contract or access-token fields',()=>{
 const row={id:1,title:'Demo',type:'WWW',description:'Opis',imageUrl:'/image.webp',websiteUrl:'https://example.test',updatedAt:'2026-10-29',clientEmail:'private@example.test',clientAddress:'PRIVATE',clientNip:'PRIVATE',publicCode:'SECRET',contractNumber:'PRIVATE',price:12000,clientNote:'PRIVATE',futurePrivateField:'PRIVATE'};
 const result=toPublicProject(row);
 assert.deepEqual(Object.keys(result).sort(),['id','title','type','description','imageUrl','websiteUrl','updatedAt'].sort());
 assert.ok(!JSON.stringify(result).includes('PRIVATE')&&!JSON.stringify(result).includes('SECRET'));
});
test('rejects cross-origin browser mutations and malformed origins',()=>{
 const req=(headers)=>new Request('https://zielona-marka.pl/api/studio',{method:'POST',headers});
 assert.equal(isSameSiteMutation(req({origin:'https://attacker.test'})),false);
 assert.equal(isSameSiteMutation(req({origin:'null'})),false);
 assert.equal(isSameSiteMutation(req({'sec-fetch-site':'cross-site'})),false);
 assert.equal(isSameSiteMutation(req({origin:'https://zielona-marka.pl','sec-fetch-site':'same-origin'})),true);
 assert.equal(isSameSiteMutation(req({})),true);
});
test('all private JSON responses prohibit shared and browser caching, including errors',()=>{
 for(const status of [200,201,400,403]){
  const r=privateJson({ok:status<300},{status});
  assert.match(r.headers.get('cache-control'),/private, no-store/);
  assert.equal(r.headers.get('vary'),'Cookie');
  assert.equal(r.headers.get('x-robots-tag'),'noindex, nofollow');
 }
});

test('login body is bounded even when Content-Length is missing',async()=>{
 const headers={'Content-Type':'application/x-www-form-urlencoded'};
 const good=await limitedFormData(new Request('https://example.test/login',{method:'POST',headers,body:'email=test%40example.test&password=test'}));
 assert.equal(good.get('email'),'test@example.test');
 const body=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(4097));controller.close();}});
 const large=new Request('https://example.test/login',{method:'POST',headers,body,duplex:'half'});
 assert.equal(large.headers.get('Content-Length'),null);
 await assert.rejects(limitedFormData(large),RangeError);
});

test('public inquiry payload is bounded by bytes before multipart or JSON parsing', async()=>{
 const headers={'Content-Type':'multipart/form-data; boundary=test'};
 const body=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(20001));controller.close();}});
 const request=new Request('https://example.test/inquiries',{method:'POST',headers,body,duplex:'half'});
 await assert.rejects(limitedRequestBody(request,20000),RangeError);
 const value=await limitedRequestBody(new Request('https://example.test/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"name":"test"}'}),20000);
 assert.deepEqual(await value.json(),{name:'test'});
});

test('edge limiter rejects exhaustion and infrastructure failures without exposing raw IP keys',async()=>{
 const {checkEdgeRateLimit}=await import('../app/edge-rate-limit.mjs');
 const request=new Request('https://example.test/login',{headers:{'CF-Connecting-IP':'192.0.2.10'}});
 let seen;
 const runtime={LIMIT:{async limit(value){seen=value.key;return {success:false}}}};
 assert.deepEqual(await checkEdgeRateLimit(runtime,'LIMIT',request),{available:true,allowed:false});
 assert.ok(!seen.includes('192.0.2.10'));
 assert.deepEqual(await checkEdgeRateLimit({},'LIMIT',request),{available:false,allowed:false});
 assert.deepEqual(await checkEdgeRateLimit({LIMIT:{async limit(){throw Error('down')}}},'LIMIT',request),{available:false,allowed:false});
 assert.deepEqual(await checkEdgeRateLimit({},'LIMIT',new Request('http://localhost/login')),{available:true,allowed:true});
});
