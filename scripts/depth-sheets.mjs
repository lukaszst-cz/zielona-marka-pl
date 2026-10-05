import {createRequire} from 'node:module';import fs from 'node:fs';
const sharp=createRequire(import.meta.url)('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const report=JSON.parse(fs.readFileSync('outputs/design-review/depth/report.json'));
for(let r=0;r<report.length;r++){
 const shots=report[r].shots;for(let start=0;start<shots.length;start+=6){const batch=shots.slice(start,start+6);const parts=[];
 for(let i=0;i<batch.length;i++)parts.push({input:await sharp(`outputs/design-review/depth/${batch[i]}.png`).resize(390,844).toBuffer(),left:(i%3)*390,top:Math.floor(i/3)*844});
 await sharp({create:{width:1170,height:Math.ceil(batch.length/3)*844,channels:3,background:'#fff'}}).composite(parts).png().toFile(`outputs/design-review/depth/sheet-${r}-${start}.png`);
 }
}
