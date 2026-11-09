"use client";

import Link from "../SafeLink";

export default function PrintControls() {
  return <div className="zmp-print-controls" aria-label="Przygotuj załącznik do wiadomości">
    <div><strong>Portfolio gotowe do zapisania</strong><small>W oknie drukowania wybierz „Zapisz jako PDF”. Plik możesz załączyć do wiadomości e-mail.</small></div>
    <button type="button" onClick={() => window.print()}>Drukuj / zapisz PDF ↗</button>
    <Link href="/portfolio">Wróć do galerii</Link>
  </div>;
}
