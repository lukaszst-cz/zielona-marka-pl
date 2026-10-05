"use client";

import { useEffect } from "react";

export default function OrganicMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const elements = document.querySelectorAll<HTMLElement>(".organic-statement>div,.organic-path-grid article,.organic-solution>div,.organic-founder>*,.organic-portfolio-grid article");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("organic-await");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    elements.forEach(element => {
      // Content is visible without JavaScript and is never hidden after it enters the viewport.
      if (element.getBoundingClientRect().top < innerHeight) return;
      element.classList.add("organic-reveal", "organic-await");
      observer.observe(element);
    });
    const reveal = () => elements.forEach(element => element.classList.remove("organic-await"));
    preference.addEventListener("change", reveal);
    return () => { observer.disconnect(); preference.removeEventListener("change", reveal); reveal(); };
  }, []);
  return null;
}
