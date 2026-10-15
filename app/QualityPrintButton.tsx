"use client";

export default function QualityPrintButton() {
  return <button type="button" className="qa-print-action" onClick={() => window.print()}>
    Zapisz jako PDF / drukuj <span aria-hidden="true">↗</span>
  </button>;
}
