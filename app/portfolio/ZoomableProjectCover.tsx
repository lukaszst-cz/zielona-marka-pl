/* eslint-disable @next/next/no-img-element -- Pełnowymiarowe obrazy w natywnym oknie dialogowym. */
"use client";

import { useRef, type MouseEvent } from "react";
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

  function openPreview() {
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
      onClick={closeOnBackdrop}>
      <div className="zmx-zoom-dialog-inner">
        <div className="zmx-zoom-dialog-heading">
          <strong>{title}</strong>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Zamknij powiększenie">Zamknij ×</button>
        </div>
        <img src={image} alt={alt || `Powiększony obraz projektu ${title}`} />
        <p>Pełny kadr projektu. Naciśnij Esc lub przycisk Zamknij, aby wrócić do opisu.</p>
      </div>
    </dialog>
  </>;
}
