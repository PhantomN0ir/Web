(async()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let skip=reduce;
  addEventListener('click',()=>skip=true);
  addEventListener('keydown',()=>skip=true);
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const items=[...document.querySelectorAll('[data-type]')].map(e=>({e,t:e.textContent.replace(/\n$/,'')}));
  items.forEach(i=>{i.e.textContent='';i.e.classList.add('pending')});
  const cur=document.createElement('span');cur.className='cursor';
  for(const {e,t} of items){
    e.classList.remove('pending');
    e.append(cur);
    const byLine=e.dataset.mode==='line';
    const parts=byLine?t.split('\n').map(l=>l+'\n'):[...t];
    for(const p of parts){
      cur.before(document.createTextNode(p));
      if(!skip) await sleep(byLine?55:(+e.dataset.speed||22));
    }
    if(!skip) await sleep(+e.dataset.pause||180);
  }
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'));
})();
