import{createRequire}from'node:module';import fs from'node:fs';
const sharp=createRequire(import.meta.url)('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
for(const[name,width]of[['logo-zielona-marka-transparent-v1',240],['lukasz-zielona-marka-kontakt-20260908',900],['lukasz-zielona-marka-jak-pracuje-20260908',1000]]){
 const original=await sharp(`public/${name}.png`).metadata();
 await sharp(`public/${name}.png`).resize({width,withoutEnlargement:true}).webp(name.startsWith('logo')?{lossless:true}:{quality:82}).toFile(`public/${name}.webp`);
 const resized=await sharp(`public/${name}.webp`).metadata();console.log({name,original:{width:original.width,height:original.height},resized:{width:resized.width,height:resized.height},bytes:fs.statSync(`public/${name}.webp`).size});
}
