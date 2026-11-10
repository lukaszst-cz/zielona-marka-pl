"use client";

import { useEffect } from "react";

/**
 * Ruch na podstronie pracy: sekcje wchodzą przy przewijaniu, a światło
 * w nagłówku podąża za kursorem. Wszystko gaśnie przy prefers-reduced-motion.
 */
export default function DetailMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parts = Array.from(document.querySelectorAll<HTMLElement>(".zmx-reveal"));
    if (reduced || typeof IntersectionObserver === "undefined") {
      parts.forEach(part => part.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -70px 0px", threshold: .15 });
    parts.forEach(part => observer.observe(part));

    const hero = document.querySelector<HTMLElement>(".zmp-detail-hero");
    const onMove = (event: PointerEvent) => {
      if (!hero || event.pointerType !== "mouse") return;
      const box = hero.getBoundingClientRect();
      hero.style.setProperty("--zmx-hx", `${((event.clientX - box.left) / box.width) * 100}%`);
      hero.style.setProperty("--zmx-hy", `${((event.clientY - box.top) / box.height) * 100}%`);
    };
    hero?.addEventListener("pointermove", onMove);
    return () => {
      observer.disconnect();
      hero?.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
