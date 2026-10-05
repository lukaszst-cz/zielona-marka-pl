import fs from 'node:fs';import path from 'node:path';
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)])}
for(const p of walk('app').filter(p=>p.endsWith('.tsx'))){if(/(?:demo|studio|status)[\\/]/.test(p)||p.includes('OrganicHome'))continue;let s=fs.readFileSync(p,'utf8');if(s.includes('SiteHeader')||p.endsWith('en\\page.tsx')||p.endsWith('polityka-prywatnosci\\page.tsx')){s=s.replace(/<main(?: className="([^"]*)")?>/g,(_,c)=>`<main className="zm-public${c?' '+c:''}">`);fs.writeFileSync(p,s)}}
const p='app/layout.tsx';let s=fs.readFileSync(p,'utf8');s=s.replace('import "./brand-system.css";','import "./brand-system.css";\nimport "./fern-public.css";');fs.writeFileSync(p,s);
