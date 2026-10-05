import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
for(let sheet=0;sheet<3;sheet++){
 const parts=[];
 for(let i=0;i<9;i++){
  const input=await sharp(`outputs/design-review/top-${String(sheet*9+i).padStart(2,'0')}.png`).resize(480,320).toBuffer();
  parts.push({input,left:i%3*480,top:Math.floor(i/3)*320});
 }
 await sharp({create:{width:1440,height:960,channels:3,background:'#fff'}}).composite(parts).png().toFile(`outputs/design-review/sheet-${sheet}.png`);
}
