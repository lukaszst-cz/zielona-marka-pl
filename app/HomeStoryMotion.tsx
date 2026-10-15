"use client";

import { useEffect, useRef, useState } from "react";

export default function HomeStoryMotion() {
  const holderRef = useRef<HTMLDivElement>(null);
  const [motionOff, setMotionOff] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".zm-v5");
    const container = root?.querySelector<HTMLElement>(".zmh-cinema");
    const stages = root ? Array.from(root.querySelectorAll<HTMLElement>(".zmh-cinema-chapters > .zmh-story")) : [];
    const screen = root?.querySelector<HTMLElement>(".zmh-cinema-screen");
    const counter = root?.querySelector<HTMLElement>(".cinema-counter");
    const dots = root ? Array.from(root.querySelectorAll<HTMLElement>(".zmh-cinema-dots i")) : [];
    const holder = holderRef.current;
    if (!root || !container || !screen || !holder || !stages.length) return;

    // Copy only our authored, static presentation nodes; no HTML string parsing.
    const fragment = document.createDocumentFragment();
    const shots = stages.map((stage, index) => {
      const shot = document.createElement("div");
      shot.className = "zmh-cine-shot";
      shot.dataset.stage = String(index);
      const visual = stage.querySelector<HTMLElement>(".zmh-visual");
      if (visual) {
        const content = visual.cloneNode(true) as HTMLElement;
        // The carousel is an aria-hidden visual; the narrative remains in the chapters.
        content.setAttribute("aria-hidden", "true");
        shot.appendChild(content);
      }
      fragment.appendChild(shot);
      return shot;
    });
    holder.replaceChildren(fragment);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let current = -1;

    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.46;
      let active = 0;
      let local = 0;
      stages.forEach((stage, index) => {
        const rect = stage.getBoundingClientRect();
        if (rect.top < probe) {
          active = index;
          local = Math.min(1, Math.max(0, (probe - rect.top) / rect.height));
        }
      });
      if (active !== current) {
        current = active;
        stages.forEach((stage, index) => {
          stage.classList.toggle("zmh-is-current", index === active);
          stage.classList.toggle("zmh-is-past", index < active);
          shots[index]?.classList.toggle("zmh-is-current", index === active);
          dots[index]?.classList.toggle("zmh-is-current", index <= active);
        });
        if (counter) counter.textContent = `${String(active + 1).padStart(2, "0")} / ${String(stages.length).padStart(2, "0")}`;
      }
      screen.style.setProperty("--film-progress", String((active + local) / stages.length));
      screen.style.setProperty("--scene-drift", String(local));
      const entry = Math.min(1, Math.max(0, (window.innerHeight - container.getBoundingClientRect().top) / (window.innerHeight * .8)));
      screen.style.setProperty("--portal-entry", String(entry));
      root.style.setProperty("--forest-drift", String(Math.min(1, window.scrollY / Math.max(1, container.offsetTop + container.offsetHeight))));
    };
    let enabled = !media.matches && !motionOff;
    root.classList.toggle("zmh-cinema-enhanced", enabled);
    setReduced(media.matches);
    if (enabled) update();
    else root.style.removeProperty("--forest-drift");
    const schedule = () => {
      if (enabled && visible && !document.hidden && !frame) frame = window.requestAnimationFrame(update);
    };
    const preferenceChanged = () => {
      enabled = !media.matches && !motionOff;
      setReduced(media.matches);
      root.classList.toggle("zmh-cinema-enhanced", enabled);
      if (enabled) update();
      else {
        window.cancelAnimationFrame(frame);
        frame = 0;
        root.style.removeProperty("--forest-drift");
      }
    };
    media.addEventListener("change", preferenceChanged);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      root.classList.toggle("zmh-motion-outside", !visible);
      if (visible) schedule();
    }, { rootMargin: "200px 0px" });
    observer.observe(container);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", preferenceChanged);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      window.cancelAnimationFrame(frame);
      root.classList.remove("zmh-cinema-enhanced", "zmh-motion-outside");
      root.style.removeProperty("--forest-drift");
      ["--portal-entry", "--scene-drift", "--film-progress"].forEach(property => screen.style.removeProperty(property));
    };
  }, [motionOff]);

  return <>
    <div className="zmh-motion-intro zmh-wrap">
      <p>Przewijaj, aby zobaczyć, jak łączą się kolejne etapy.</p>
      <button type="button" onClick={() => setMotionOff(value => !value)} aria-pressed={motionOff || reduced} disabled={reduced}>
        {reduced ? "Ruch ograniczony" : motionOff ? "Włącz animacje" : "Ogranicz ruch"}
      </button>
    </div>
    <aside className="zmh-cinema-stage" aria-hidden="true">
      <div className="zmh-cinema-screen">
        <div className="zmh-cinema-status"><span>STRONA · PROCES · RELACJA</span><span className="cinema-counter">01 / 05</span></div>
        <div className="zmh-cinema-shots" ref={holderRef} />
        <div className="zmh-cinema-rail"><span /></div>
        <div className="zmh-cinema-dots"><i /><i /><i /><i /><i /></div>
      </div>
    </aside>
  </>;
}
