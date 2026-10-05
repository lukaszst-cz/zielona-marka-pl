import fs from 'node:fs/promises';
const base=process.argv[2]||'http://127.0.0.1:4180';
const sitemap=await (await fetch(`${base}/sitemap.xml`)).text();
const routes=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
if(!routes.length)throw Error('Empty sitemap');
const pages=[],issues=[],links=new Map();
const attr=(html,tag,key,value,target)=>{
 for(const match of html.matchAll(new RegExp(`<${tag}\\b[^>]*>`,'g'))){const attrs=Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));if(attrs[key]===value)return attrs[target];}
};
for(const route of routes){
 const response=await fetch(base+route),html=await response.text();
 const row={route,status:response.status,title:html.match(/<title>(.*?)<\/title>/)?.[1],description:attr(html,'meta','name','description','content'),canonical:attr(html,'link','rel','canonical','href'),h1:[...html.matchAll(/<h1\b/g)].length};
 pages.push(row);
 if(row.status!==200||!row.title||!row.description||row.h1!==1||row.canonical?.replace(/\/$/,'')!=='https://zielona-marka.pl'+(route==='/'?'':route))issues.push({type:'metadata',...row});
 if(attr(html,'meta','name','robots','content')?.includes('noindex'))issues.push({type:'noindex-in-sitemap',route});
 for(const m of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)){const u=new URL(m[1].replaceAll('&amp;','&'),base+route);if(u.origin===base||u.origin==='https://zielona-marka.pl')links.set(u.pathname+u.search+u.hash,route);}
}
for(const key of ['title','description']){const seen=new Map();for(const page of pages){if(seen.has(page[key]))issues.push({type:'duplicate-'+key,routes:[seen.get(page[key]),page.route]});seen.set(page[key],page.route);}}
for(const [link,from] of links){const url=new URL(link,base);const res=await fetch(base+url.pathname+url.search);const html=await res.text();if(!res.ok||url.hash&&!html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`))issues.push({type:'link',link,from,status:res.status});}
const result={at:new Date().toISOString(),pages,linksChecked:links.size,issues};
await fs.mkdir('outputs/home-v5-qa',{recursive:true});await fs.writeFile(`outputs/home-v5-qa/${base.startsWith('https:')?'production-20260920':'seo-20260919'}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({pages:pages.length,links:links.size,issues},null,2));
