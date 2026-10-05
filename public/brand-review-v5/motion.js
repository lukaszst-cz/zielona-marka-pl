(()=>{
 const root=document.documentElement,container=document.querySelector('.cinema'),stages=[...document.querySelectorAll('.cinema-chapters>.story')],screen=document.querySelector('.cinema-screen'),holder=document.querySelector('.cinema-shots'),toggle=document.getElementById('motion-toggle');
 if(!container||!stages.length||!holder||!toggle)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let manualOff=false,enabled=false,frame=0,visible=false,current=-1;
 stages.forEach((stage,index)=>{const shot=document.createElement('div');shot.className='cine-shot';shot.dataset.stage=String(index);shot.innerHTML=stage.querySelector('.visual').innerHTML;holder.append(shot);});
 const shots=[...holder.children],dots=[...document.querySelectorAll('.cinema-dots i')];
 const update=()=>{
  frame=0;if(!enabled)return;
  const probe=innerHeight*.46;let active=0,local=0;
  stages.forEach((stage,index)=>{const r=stage.getBoundingClientRect();if(r.top<probe){active=index;local=Math.min(1,Math.max(0,(probe-r.top)/r.height));}});
  if(active!==current){current=active;stages.forEach((stage,index)=>{stage.classList.toggle('is-current',index===active);stage.classList.toggle('is-past',index<active);shots[index].classList.toggle('is-current',index===active);dots[index].classList.toggle('is-current',index<=active);});document.querySelector('.cinema-counter').textContent=`${String(active+1).padStart(2,'0')} / 05`;}
  screen.style.setProperty('--film-progress',String((active+local)/stages.length));screen.style.setProperty('--scene-drift',String(local));root.style.setProperty('--forest-drift',String(Math.min(1,scrollY/Math.max(1,container.offsetTop+container.offsetHeight))));
 };
 const schedule=()=>{if(enabled&&visible&&!frame)frame=requestAnimationFrame(update);};
 const configure=()=>{enabled=!reduced.matches&&!manualOff;root.classList.toggle('cinema-enhanced',enabled);toggle.setAttribute('aria-pressed',String(!enabled));toggle.textContent=enabled?'Ogranicz ruch':'Włącz animacje';toggle.disabled=reduced.matches;if(reduced.matches)toggle.textContent='Ruch ograniczony';if(!enabled){cancelAnimationFrame(frame);frame=0;root.style.removeProperty('--forest-drift');}else update();};
 toggle.addEventListener('click',()=>{manualOff=!manualOff;configure();});reduced.addEventListener('change',configure);
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;root.classList.toggle('motion-outside',!visible);if(visible)schedule();},{rootMargin:'200px 0px'});observer.observe(container);
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});configure();
})();
