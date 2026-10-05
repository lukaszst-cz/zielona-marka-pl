"use client";
import {useEffect} from "react";

export default function FloatingContactVisibility(){
  useEffect(()=>{
    const forms=document.querySelectorAll('.contact-form, .zmh-form-surface form, .zmh-free-start, .zm-footer, .zmh-hero-foot, .zmh-motion-intro');
    const visible=new Set<Element>();
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);});
      document.documentElement.classList.toggle('contact-form-visible',visible.size>0);
    },{threshold:0});
    forms.forEach(form=>observer.observe(form));
    return()=>{observer.disconnect();document.documentElement.classList.remove('contact-form-visible');};
  },[]);
  return null;
}


