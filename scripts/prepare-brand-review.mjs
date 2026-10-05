import {createRequire} from 'node:module';import fs from 'node:fs';
const sharp=createRequire(import.meta.url)('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const dir='public/brand-review-v3';
await sharp(`${dir}/forest-continuous.png`).webp({quality:88}).toFile(`${dir}/forest-continuous.webp`);
const logo=fs.readFileSync(`${dir}/logo-white.svg`);
await sharp(logo,{density:180}).png().toFile(`${dir}/logo-white.png`);
console.log(JSON.stringify({backgroundBytes:fs.statSync(`${dir}/forest-continuous.webp`).size,logoBytes:fs.statSync(`${dir}/logo-white.svg`).size}));
