import fs from 'node:fs';
const source=fs.readFileSync('public/brand-review-v4/index.html','utf8');
const start=source.indexOf(' <section class="story" id="opowiesc"');
const end=source.indexOf('</div>\n<div class="lower-forest">',start);
if(start<0||end<0)throw new Error('Source section boundaries not found');
let page=source.slice(0,start)+`<div class="motion-intro wrap"><p>Przewijaj, aby zobaczyć, jak łączą się kolejne etapy.</p><button type="button" id="motion-toggle" aria-pressed="false">Ogranicz ruch</button></div>
<div class="cinema wrap"><div class="cinema-chapters">`+source.slice(start,end)+`</div><aside class="cinema-stage" aria-hidden="true"><div class="cinema-screen"><div class="cinema-status"><span>STRONA · PROCES · RELACJA</span><span class="cinema-counter">01 / 05</span></div><div class="cinema-shots"></div><div class="cinema-rail"><span></span></div><div class="cinema-dots"><i></i><i></i><i></i><i></i><i></i></div></div></aside></div>\n`+source.slice(end);
page=page.replace('href="refinement.css"','href="../brand-review-v4/refinement.css"').replace('</head>','<link rel="stylesheet" href="motion.css"><script src="motion.js" defer></script></head>');
page=page.replace('Podgląd v4','Podgląd ruchu v5').replace('LOKALNY PODGLĄD V4','LOKALNY PODGLĄD RUCHU V5').replace('TEKSTY PO AUDYCIE / 14.09.2026','ZATWIERDZONE TEKSTY V4 / 14.09.2026').replace('href="../brand-review-v3/">Poprzednia wersja','href="../brand-review-v4/">Wersja bez animacji');
fs.writeFileSync('public/brand-review-v5/index.html',page);
console.log('Motion preview built from approved v4 copy.');
