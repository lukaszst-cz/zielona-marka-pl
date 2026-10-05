import fs from 'node:fs';
import {createRequire} from 'node:module';
const req=createRequire(import.meta.url);const vr=createRequire(req.resolve('vite'));const postcss=vr('postcss');
const root=postcss.parse(fs.readFileSync('app/home-v5.css','utf8'));const names=new Set();
root.walkRules(rule=>{if(rule.parent.type==='atrule'&&/keyframes$/.test(rule.parent.name))return;rule.selector.replace(/\.([a-zA-Z_][\w-]*)/g,(_,n)=>{if(n!=='zm-v5')names.add(n);return _});});
const map=n=>names.has(n)?'zmh-'+n:n;
root.walkRules(rule=>{rule.selector=rule.selector.replace(/\.([a-zA-Z_][\w-]*)/g,(_,n)=>'.'+map(n));});
fs.writeFileSync('app/home-v5.css',root.toString());
for(const file of ['app/OrganicHome.tsx','app/HomeContactForm.tsx','app/HomeStoryMotion.tsx']){let s=fs.readFileSync(file,'utf8');s=s.replace(/className="([^"]*)"/g,(_,v)=>'className="'+v.split(' ').map(map).join(' ')+'"');if(file.includes('OrganicHome'))s=s.replace('"active flow-item" : "flow-item"','"zmh-active zmh-flow-item" : "zmh-flow-item"');if(file.includes('HomeStoryMotion'))s=s.replace(/"([^"\n]*)"/g,(_,v)=>'"'+(v.includes('.')?v.replace(/\.([a-zA-Z_][\w-]*)/g,(a,n)=>'.'+map(n)):map(v))+'"');fs.writeFileSync(file,s)}
