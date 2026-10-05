import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
import fs from 'node:fs';
for(const [from,to,width] of [['zielona-marka-hero-paprocie-v1.png','zielona-marka-hero-paprocie.webp',1024],['zielona-marka-przejscie-las-v1.png','zielona-marka-przejscie-las.webp',1600],['lukasz-zielona-marka-strona-glowna-20260908.png','lukasz-zielona-marka-strona-glowna-20260908.webp',1000],['portfolio-board-routeflow.png','portfolio-board-routeflow.webp',900]]){
 await sharp(`public/${from}`).resize({width,withoutEnlargement:true}).webp({quality:78}).toFile(`public/${to}`);
 console.log(to,fs.statSync(`public/${to}`).size);
}
