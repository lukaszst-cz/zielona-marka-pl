import {writeFileSync} from 'node:fs';
import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
 const page=await browser.newPage();
 await page.goto('http://127.0.0.1:4180/',{waitUntil:'domcontentloaded'});
 const frames=await page.evaluate(async()=>{
  const video=document.createElement('video');
  video.src='/brand-review-v5/fern-moss-stream-20260919.mp4';
  video.muted=true;
  await new Promise((resolve,reject)=>{video.addEventListener('loadedmetadata',resolve,{once:true});video.addEventListener('error',reject,{once:true})});
  video.currentTime=3;
  await new Promise(resolve=>video.addEventListener('seeked',resolve,{once:true}));
  const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;
  canvas.getContext('2d').drawImage(video,0,0);
  const water=document.createElement('canvas');water.width=video.videoWidth;water.height=Math.round(video.videoHeight*.53);
  water.getContext('2d').drawImage(video,0,video.videoHeight-water.height,water.width,water.height,0,0,water.width,water.height);
  return {full:canvas.toDataURL('image/webp',.9).split(',')[1],water:water.toDataURL('image/webp',.9).split(',')[1]};
 });
 writeFileSync('public/brand-review-v5/stream-still.webp',Buffer.from(frames.full,'base64'));
 writeFileSync('public/brand-review-v5/stream-water-bottom.webp',Buffer.from(frames.water,'base64'));
}finally{await browser.close()}
