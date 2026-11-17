/* eslint-disable @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- Pełny obraz w natywnym dialogu: klawisz Escape działa domyślnie, kliknięcie w tło zamyka modal, jest też dostępny przycisk zamknięcia. */
"use client";

import { useRef, useState, type MouseEvent } from "react";
import ProjectCover from "./ProjectCover";

type Props = {
  slug: string;
  title: string;
  image: string;
  alt?: string;
};

/** Kliknięcie w kadr podstrony otwiera pełny obraz. Escape i tło zamykają dialog. */
export default function ZoomableProjectCover({ slug, title, image, alt }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function openPreview() {
    setIsOpen(true);
    dialog.current?.showModal();
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) dialog.current?.close();
  }

  return <>
    <button
      type="button"
      className="zmx-zoom-trigger"
      onClick={openPreview}
      aria-label={`Powiększ obraz projektu ${title}`}
      aria-haspopup="dialog">
      <span className="zmx-detail-stage">
        <ProjectCover slug={slug} title={title} image={image} alt={alt} priority />
      </span>
      <span className="zmx-zoom-hint" aria-hidden="true">Powiększ obraz ↗</span>
    </button>
    <dialog
      ref={dialog}
      className="zmx-zoom-dialog"
      aria-label={`Powiększony obraz projektu ${title}`}
      onClick={closeOnBackdrop}
      onClose={() => setIsOpen(false)}>
      <div className="zmx-zoom-dialog-inner">
        <div className="zmx-zoom-dialog-heading">
          <strong>{title}</strong>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Zamknij powiększenie">Zamknij ×</button>
        </div>
        {isOpen && <img src={image} alt={alt || `Powiększony obraz projektu ${title}`} />}
        <p>Pełny kadr projektu. Naciśnij Esc lub przycisk Zamknij, aby wrócić do opisu.</p>
      </div>
    </dialog>
  </>;
}
