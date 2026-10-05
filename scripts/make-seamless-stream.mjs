import {writeFileSync} from 'node:fs';
import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
 const page=await browser.newPage();
 await page.goto('http://127.0.0.1:4180/',{waitUntil:'domcontentloaded'});
 const result=await page.evaluate(async()=>{
  const response=await fetch('/brand-review-v5/freesound_community-water-08-69295.mp3');
  const context=new AudioContext();
  const decoded=await context.decodeAudioData(await response.arrayBuffer());
  const overlap=Math.round(decoded.sampleRate*2.5);
  const count=decoded.length-overlap;
  const channels=Math.min(decoded.numberOfChannels,2);
  const bytes=new ArrayBuffer(44+count*channels*2);
  const view=new DataView(bytes);
  const ascii=(offset,value)=>{for(let i=0;i<value.length;i++)view.setUint8(offset+i,value.charCodeAt(i))};
  ascii(0,'RIFF');view.setUint32(4,bytes.byteLength-8,true);ascii(8,'WAVE');ascii(12,'fmt ');
  view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,channels,true);
  view.setUint32(24,decoded.sampleRate,true);view.setUint32(28,decoded.sampleRate*channels*2,true);
  view.setUint16(32,channels*2,true);view.setUint16(34,16,true);ascii(36,'data');view.setUint32(40,count*channels*2,true);
  let seamDifference=0;
  for(let channel=0;channel<channels;channel++){
   const source=decoded.getChannelData(channel);
   const first=source[count],last=source[count-1];
   seamDifference=Math.max(seamDifference,Math.abs(first-last));
   for(let i=0;i<count;i++){
    const t=i/overlap;
    const sample=i<overlap?source[count+i]*(1-t)+source[i]*t:source[i];
    view.setInt16(44+(i*channels+channel)*2,Math.round(Math.max(-1,Math.min(1,sample))*32767),true);
   }
  }
  await context.close();
  const blob=new Blob([bytes],{type:'audio/wav'});
  const data=await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(blob)});
  return {data,duration:count/decoded.sampleRate,seamDifference};
 });
 writeFileSync('public/brand-review-v5/water-08-seamless.wav',Buffer.from(result.data,'base64'));
 console.log(JSON.stringify({duration:result.duration,seamDifference:result.seamDifference}));
}finally{await browser.close()}
