import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { deliverInquiryOnce, inquiryDeliveryStates, saveInquiryOnce } from '../app/inquiry-journal.mjs';
function database() {
 const db=new DatabaseSync(':memory:');
 db.exec("CREATE TABLE inquiry_deliveries(id INTEGER PRIMARY KEY AUTOINCREMENT,inquiry_id INTEGER,state TEXT,created_at TEXT,provider_status TEXT)");
 db.exec("CREATE TABLE inquiries(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email TEXT,company TEXT,budget TEXT,message TEXT,status TEXT,created_at TEXT)");
 const binding = {
  prepare(sql) {
   return {
    bind(...args) {
     const statement = db.prepare(sql);
     return { async first() { return statement.get(...args) || null; }, async run() { return statement.run(...args); } };
    },
    async all() { return { results: db.prepare(sql).all() }; }
   };
  }
 };
 return {db,binding};
}
test('simultaneous requests contact the mail provider once and keep a durable acknowledgement',async()=>{
 const {db,binding}=database();let calls=0;let release;
 const wait=new Promise(resolve=>{release=resolve});
 const first=deliverInquiryOnce(binding,101,async()=>{calls++;await wait;return 'smtp_accepted'});
 await new Promise(resolve=>setTimeout(resolve,0));
 const second=await deliverInquiryOnce(binding,101,async()=>{calls++});
 assert.equal(second.confirmed,false);assert.equal(calls,1);
 release();assert.equal((await first).confirmed,true);
 assert.equal((await deliverInquiryOnce(binding,101,async()=>{calls++})).confirmed,true);
 assert.equal(calls,1);assert.equal((await inquiryDeliveryStates(binding)).get(101),'sent');db.close();
});
test('ambiguous SMTP failures are visible and are never automatically replayed',async()=>{
 const {db,binding}=database();let calls=0;
 assert.equal((await deliverInquiryOnce(binding,102,async()=>{calls++;throw Error('connection lost after DATA')})).confirmed,false);
 assert.equal((await deliverInquiryOnce(binding,102,async()=>{calls++})).confirmed,false);
 assert.equal(calls,1);assert.equal((await inquiryDeliveryStates(binding)).get(102),'failed');db.close();
});
test('old saved inquiries without delivery evidence do not trigger historical mail replay',async()=>{
 const {db,binding}=database();let calls=0;
 assert.equal((await deliverInquiryOnce(binding,103,async()=>{calls++},{duplicate:true})).confirmed,false);
 assert.equal(calls,0);assert.equal(db.prepare('SELECT count(*) AS n FROM inquiry_deliveries').get().n,0);db.close();
});
test('lost acknowledgement write does not authorize a second SMTP attempt',async()=>{
 const {db,binding}=database();let calls=0;
 const faulty={prepare(sql){if(sql.startsWith('UPDATE'))return {bind(){return {async run(){throw Error('database unavailable')}}}};return binding.prepare(sql)}};
 assert.equal((await deliverInquiryOnce(faulty,104,async()=>{calls++;return 'smtp_accepted'})).confirmed,false);
 assert.equal((await deliverInquiryOnce(binding,104,async()=>{calls++})).confirmed,false);
 assert.equal(calls,1);assert.equal((await inquiryDeliveryStates(binding)).get(104),'pending');db.close();
});

test('simultaneous identical submissions save one inquiry and share its reference',async()=>{
 const {db,binding}=database();
 const data={name:'Test',email:'test@example.test',company:'',budget:'',message:'A normal inquiry'};
 const cutoff=new Date(Date.now()-600000).toISOString();
 const results=await Promise.all([saveInquiryOnce(binding,data,cutoff),saveInquiryOnce(binding,data,cutoff)]);
 assert.equal(results[0].id,results[1].id);
 assert.equal(results.filter(row=>row.duplicate).length,1);
 assert.equal(db.prepare('SELECT count(*) AS n FROM inquiries').get().n,1);
 db.close();
});
