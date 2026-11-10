/* eslint-disable @next/next/no-img-element -- Okładki prac to autorskie materiały i publiczne demonstracje. */
"use client";

import { useEffect, useRef, useState } from "react";
import { coverFor } from "./covers";

/* Jednocześnie renderujemy tylko kilka żywych okładek, żeby strona pozostała lekka. */
const MAX_LIVE_FRAMES = 6;
const live = new Set<string>();
const DEFAULT_RENDER_WIDTH = 1280;
const FRAME_TIMEOUT_MS = 6000;

function canRenderLive() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  return true;
}

type Props = {
  slug: string;
  title: string;
  image?: string;
  alt?: string;
  /** Scena karuzeli wymusza żywą okładkę dla pracy na wierzchu, katalog czeka na przewinięcie. */
  priority?: boolean;
  /** Katalog uruchamia ramki dopiero od szerokości biurkowej. */
  minWidth?: number;
};

export default function ProjectCover({ slug, title, image, alt, priority = false, minWidth = 900 }: Props) {
  const plan = coverFor(slug);
  const hostRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [armed, setArmed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [geometry, setGeometry] = useState<{ scale: number; height: number } | null>(null);

  const renderWidth = plan?.width || DEFAULT_RENDER_WIDTH;
  const cropTop = plan?.top || 0;
  const cropLeft = plan?.leftOffset || 0;
  const zoom = plan?.zoom || 1;
  const source = plan?.live;

  /* Uzbrajamy ramkę, gdy okładka jest w polu widzenia i mieści się w limicie. */
  useEffect(() => {
    if (!source || failed) return;
    const host = hostRef.current;
    if (!host || !canRenderLive()) return;
    if (!priority && window.innerWidth < minWidth) return;

    let claimed = false;
    const claim = () => {
      if (claimed) return;
      if (!priority && live.size >= MAX_LIVE_FRAMES) return;
      claimed = true;
      live.add(slug);
      setArmed(true);
    };
    const release = () => {
      if (!claimed) return;
      claimed = false;
      live.delete(slug);
      setArmed(false);
      setLoaded(false);
    };

    if (priority) {
      claim();
      return () => release();
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => (entry.isIntersecting ? claim() : release()));
    }, { rootMargin: "120px 0px", threshold: .2 });
    observer.observe(host);
    return () => { observer.disconnect(); release(); };
  }, [source, slug, priority, minWidth, failed]);

  /* Skala kadru wynika z rzeczywistej szerokości okładki. */
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !armed) return;
    const measure = () => {
      const box = host.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const scale = (box.width / renderWidth) * zoom;
      setGeometry({ scale, height: Math.ceil(box.height / scale) + cropTop });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, [armed, renderWidth, cropTop, zoom]);

  /* Gdy demonstracja nie chce się osadzić, zostaje autorska grafika. */
  useEffect(() => {
    if (!armed || loaded) return;
    timeoutRef.current = setTimeout(() => setFailed(true), FRAME_TIMEOUT_MS);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [armed, loaded]);

  useEffect(() => () => { live.delete(slug); }, [slug]);

  return <span className="zmx-cover" ref={hostRef} data-live={armed && loaded ? "on" : undefined}>
    <img className="zmx-cover-poster" src={image} alt={alt || `Podgląd projektu ${title}`} loading={priority ? "eager" : "lazy"} draggable={false} />
    {armed && !failed && <span className="zmx-cover-frame" aria-hidden="true">
      <iframe
        src={source}
        title={`Podgląd demonstracji ${title}`}
        loading="lazy"
        tabIndex={-1}
        scrolling="no"
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => setLoaded(true)}
        style={geometry ? {
          width: `${renderWidth}px`,
          height: `${geometry.height}px`,
          transform: `scale(${geometry.scale}) translate(-${cropLeft}px, -${cropTop}px)`,
        } : { width: `${renderWidth}px`, height: "100%", opacity: 0 }} />
    </span>}
    {armed && loaded && !failed && <span className="zmx-live-badge" aria-hidden="true">na żywo</span>}
  </span>;
}
