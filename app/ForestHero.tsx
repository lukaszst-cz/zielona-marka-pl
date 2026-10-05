"use client";
import {useCallback,useEffect,useRef,useState} from 'react';

export default function ForestHero(){
 const video=useRef<HTMLVideoElement>(null);
 const audio=useRef<HTMLAudioElement|null>(null);
 const userMuted=useRef(false);
 const soundAttempt=useRef(0);
 const userIntent=useRef(false);
 const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(false);
 const [ready,setReady]=useState(false);
 const [playing,setPlaying]=useState(false);
 const [soundOn,setSoundOn]=useState(false);
 const [inView,setInView]=useState(true);
 useEffect(()=>{
  try{userMuted.current=localStorage.getItem('zm-stream-muted')==='true'}catch{/* Storage may be unavailable. */}
 },[]);
 useEffect(()=>()=>{audio.current?.pause();audio.current=null},[]);
 useEffect(()=>{
  const sound=audio.current;
  if(!sound)return;
  if(!soundOn||paused||reduced||!inView){sound.pause();return;}
  sound.play().catch(()=>setSoundOn(false));
 },[soundOn,paused,reduced,inView]);
 const startSound=useCallback(()=>{
  if(userMuted.current)return;
  const attempt=++soundAttempt.current;
  if(!audio.current){
   const sound=new Audio('/brand-review-v5/freesound_community-water-08-69295.mp3');
   sound.loop=true;
   sound.volume=.15;
   sound.playbackRate=1;
   audio.current=sound;
  }
  audio.current.play().then(()=>{if(attempt===soundAttempt.current)setSoundOn(true)}).catch(()=>{if(attempt===soundAttempt.current)setSoundOn(false)});
 },[]);
 useEffect(()=>{
  if(userMuted.current)return;
  startSound();
  const resume=()=>startSound();
  addEventListener('pointerdown',resume,{once:true,passive:true});
  addEventListener('keydown',resume,{once:true});
  return()=>{removeEventListener('pointerdown',resume);removeEventListener('keydown',resume)};
 },[startSound]);
 const toggleSound=()=>{
  if(soundOn){soundAttempt.current++;userMuted.current=true;try{localStorage.setItem('zm-stream-muted','true')}catch{/* Storage may be unavailable. */}setSoundOn(false);return;}
  userMuted.current=false;try{localStorage.setItem('zm-stream-muted','false')}catch{/* Storage may be unavailable. */}startSound();
 };
 useEffect(()=>{
  const el=video.current;if(!el)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
  let visible=true;
  const updateControls=()=>{const rect=el.getBoundingClientRect();setInView(rect.top<innerHeight*.9&&rect.bottom>innerHeight*.65)};
  const update=()=>{setReduced(media.matches);if(media.matches||paused||document.hidden||!visible||connection?.saveData||!userIntent.current){el.pause();return;}if(!el.getAttribute('src'))el.src=matchMedia('(max-width: 700px)').matches?'/brand-review-v5/fern-moss-stream-mobile-20260929.mp4':'/brand-review-v5/fern-moss-stream-20260919.mp4';el.play().catch(()=>{});};
  const markIntent=()=>{userIntent.current=true;update()};
  const onScroll=()=>{updateControls();if(scrollY>48)markIntent()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;updateControls();update()});observer.observe(el);
  media.addEventListener('change',update);document.addEventListener('visibilitychange',update);window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('pointerdown',markIntent,{once:true,passive:true});window.addEventListener('keydown',markIntent,{once:true});window.addEventListener('resize',updateControls);updateControls();update();
  return()=>{observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);window.removeEventListener('scroll',onScroll);window.removeEventListener('pointerdown',markIntent);window.removeEventListener('keydown',markIntent);window.removeEventListener('resize',updateControls);el.pause();};
 },[paused]);
 return <><div className={`zmh-living-forest${ready?' is-media-ready':''}`} aria-hidden="true"><video ref={video} muted loop playsInline preload="none" onPlaying={()=>{setReady(true);setPlaying(true)}} onPause={()=>setPlaying(false)} className={ready?'is-ready':''}/></div><div className={`zmh-media-controls${inView?' is-visible':''}`}>{!reduced&&<button className="zmh-sound-control" type="button" onClick={toggleSound} aria-label={soundOn?'Wycisz dźwięk strumyka':'Włącz dźwięk strumyka'} aria-pressed={soundOn}><span className="zmh-control-icon" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 9v6h4l4 3V6L8 9H4Z"/><path d={soundOn ? "M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" : "m16 9 6 6m0-6-6 6"}/></svg></span><span className="zmh-control-label">{soundOn?'Wycisz dźwięk strumyka':'Włącz dźwięk strumyka'}</span></button>}<button className="zmh-film-control" type="button" onClick={()=>setPaused(p=>!p)} aria-label={reduced?'Spokojny widok':paused?'Ożyw tło':'Zatrzymaj tło'} aria-pressed={paused||reduced} disabled={reduced}><span className="zmh-control-icon" aria-hidden="true">{reduced?'•':paused?'▶':'Ⅱ'}</span><span className="zmh-control-label">{reduced?'Spokojny widok':paused?'Ożyw tło':'Zatrzymaj tło'}</span></button></div></>;
}
