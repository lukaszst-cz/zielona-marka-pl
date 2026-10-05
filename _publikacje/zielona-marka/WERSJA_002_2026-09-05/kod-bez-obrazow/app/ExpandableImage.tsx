"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = { src: string; alt: string };

export default function ExpandableImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return <>
    <button className="expandable-image" type="button" onClick={() => setOpen(true)} aria-label={`Powiększ zdjęcie: ${alt}`}>
      <img src={src} alt={alt} loading="lazy" />
      <span>Powiększ zdjęcie</span>
    </button>
    {open && createPortal(<div className="image-lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
      <button className="image-lightbox-close" type="button" aria-label="Zamknij podgląd zdjęcia">×</button>
      <img src={src} alt={alt} />
      <p>Kliknij zdjęcie lub tło, aby wrócić do strony.</p>
    </div>, document.body)}
  </>;
}
