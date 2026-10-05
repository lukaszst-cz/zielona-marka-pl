import fs from 'node:fs';import path from 'node:path';import {execFileSync} from 'node:child_process';
const config=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const curlConfig=process.argv[2]+'.curl';
fs.writeFileSync(curlConfig,[`url = ${JSON.stringify(config.upload_url)}`,...Object.entries(config.upload_headers).map(([k,v])=>`header = ${JSON.stringify(k+': '+v)}`)].join('\n'));
try{
 const status=execFileSync('curl.exe',['--config',curlConfig,'--silent','--show-error','--max-time','60','--connect-timeout','10','--form',`file=@${process.argv[3]}`,'--output',process.argv[4],'--write-out','%{http_code}'],{timeout:65000,encoding:'utf8'});
 console.log(JSON.stringify({status,filename:path.basename(process.argv[3])}));if(!status.startsWith('2'))process.exitCode=1;
}finally{fs.unlinkSync(curlConfig);}
