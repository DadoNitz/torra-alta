import {Browser} from 'file:///C:/Users/Dado/.claude/skills/synced/3a16b5e4-5360-47a1-9849-5808e22eabe5_72fe8b1d-01e1-4239-a75c-bf5d22c21c41/design-taste-frontend/scripts/lib/cdp.mjs';
import {readFile,writeFile,readdir} from 'node:fs/promises';
const browser=await Browser.launch();
try {
 const page=await browser.newPage();
 for(const file of await readdir('assets')){
  if(!file.endsWith('.jpg') || file.startsWith('a-worker'))continue;
  const data=(await readFile('assets/'+file)).toString('base64');
  const output=await page.eval(async ({data,max})=>{
   const image=new Image();image.src='data:image/jpeg;base64,'+data;await image.decode();
   const ratio=Math.min(1,max/image.width);
   const canvas=document.createElement('canvas');canvas.width=Math.round(image.width*ratio);canvas.height=Math.round(image.height*ratio);
   canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
   return canvas.toDataURL('image/webp',.82).split(',')[1];
  },{data,max:file.startsWith('campos')?1600:1280});
  await writeFile('assets/'+file.replace('.jpg','.webp'),Buffer.from(output,'base64'));
  console.log(file,Buffer.from(output,'base64').length);
 }
}finally{await browser.close()}
