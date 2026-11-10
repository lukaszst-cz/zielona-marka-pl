"use client";

import { useEffect, useRef } from "react";

/**
 * Siatka punktów w tle sceny z portfolio. Przez prostokąt przechodzi
 * ukośna fala od lewego górnego rogu do prawego dolnego: punkty na jej
 * grzbiecie rozjaśniają się i lekko rosną, reszta przygasa.
 */
export default function StageDots() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gap = 26;
    let width = 0, height = 0, cols = 0, rows = 0, frame = 0, running = true;

    const measure = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const box = host.getBoundingClientRect();
      width = box.width;
      height = box.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      cols = Math.ceil(width / gap) + 1;
      rows = Math.ceil(height / gap) + 1;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;
      const span = width + height;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gap + (row % 2 ? gap / 2 : 0);
          const y = row * gap;
          if (x > width + gap) continue;
          const diagonal = (x + y) / span;
          const wave = reduced ? .5 : 0.5 + 0.5 * Math.sin(diagonal * 9 - t * 1.25);
          const crest = Math.pow(wave, 2.6);
          const fade = 1 - Math.min(1, Math.max(0, (y - height * .5) / (height * .5)));
          const alpha = (.05 + .5 * crest) * (.2 + .8 * fade);
          if (alpha < .02) continue;
          const radius = 1 + crest * 1.5;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${crest > .62 ? "214,251,99" : "150,226,168"},${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
      if (!reduced && running) frame = requestAnimationFrame(draw);
    };

    measure();
    frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(() => {
      measure();
      if (reduced) requestAnimationFrame(draw);
    });
    observer.observe(host);
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!reduced) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="zmx-dotfield" aria-hidden="true" />;
}
