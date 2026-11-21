import {Browser} from 'file:///C:/Users/Dado/.claude/skills/synced/3a16b5e4-5360-47a1-9849-5808e22eabe5_72fe8b1d-01e1-4239-a75c-bf5d22c21c41/design-taste-frontend/scripts/lib/cdp.mjs';
import {readFile,writeFile} from 'node:fs/promises';
const browser=await Browser.launch();try{const page=await browser.newPage();
for(const [input,output,w,h] of [['campos-do-parque-estadual-do-tainhas.jpg','hero-mobile.webp',600,1266],['pedra-dos-tres-pontos-es-01.jpg','origem-mobile.webp',640,427]]){
const data=(await readFile('assets/'+input)).toString('base64');const encoded=await page.eval(async({data,w,h})=>{const img=new Image();img.src='data:image/jpeg;base64,'+data;await img.decode();const c=document.createElement('canvas');c.width=w;c.height=h;const ratio=Math.max(w/img.width,h/img.height);const sw=w/ratio,sh=h/ratio;c.getContext('2d').drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,0,0,w,h);return c.toDataURL('image/webp',.75).split(',')[1]},{data,w,h});await writeFile('assets/'+output,Buffer.from(encoded,'base64'));console.log(output,Buffer.from(encoded,'base64').length)}
}finally{await browser.close()}
