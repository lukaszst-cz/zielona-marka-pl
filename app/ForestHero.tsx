"use client";
import { useEffect, useRef, useState } from "react";

/* Ciche tło filmowe. Bez górnej belki odtwarzania i diagnostyki. */
export default function ForestHero() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = true;
    let intent = false;

    const update = () => {
      if (reducedMotion.matches || document.hidden || !visible || connection?.saveData || !intent) {
        element.pause();
        return;
      }
      if (!element.getAttribute("src")) {
        element.src = window.matchMedia("(max-width: 700px)").matches
          ? "/brand-review-v5/fern-moss-stream-mobile-20260929.mp4"
          : "/brand-review-v5/fern-moss-stream-20260919.mp4";
      }
      void element.play().catch(() => {});
    };
    const onIntent = () => { intent = true; update(); };
    const onScroll = () => { if (window.scrollY > 48) onIntent(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    reducedMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onIntent, { passive: true, once: true });
    window.addEventListener("keydown", onIntent, { once: true });
    update();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onIntent);
      window.removeEventListener("keydown", onIntent);
      element.pause();
    };
  }, []);

  return <div className={`zmh-living-forest${ready ? " is-media-ready" : ""}`} aria-hidden="true">
    <video ref={video} muted loop playsInline preload="none" onPlaying={() => setReady(true)} className={ready ? "is-ready" : ""} />
  </div>;
}
