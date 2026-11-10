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

    const stage = document.querySelector<HTMLElement>(".zmx-detail-stage");
    const onStageMove = (event: PointerEvent) => {
      if (!stage || event.pointerType !== "mouse") return;
      const box = stage.getBoundingClientRect();
      const px = (event.clientX - box.left) / box.width;
      const py = (event.clientY - box.top) / box.height;
      stage.style.setProperty("--zmx-rx", `${(py - .5) * -6}deg`);
      stage.style.setProperty("--zmx-ry", `${(px - .5) * 8}deg`);
    };
    const onStageLeave = () => {
      stage?.style.setProperty("--zmx-rx", "0deg");
      stage?.style.setProperty("--zmx-ry", "0deg");
    };
    stage?.addEventListener("pointermove", onStageMove);
    stage?.addEventListener("pointerleave", onStageLeave);
    return () => {
      observer.disconnect();
      stage?.removeEventListener("pointermove", onStageMove);
      stage?.removeEventListener("pointerleave", onStageLeave);
    };
  }, []);

  return null;
}
