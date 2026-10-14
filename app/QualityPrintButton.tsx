"use client";

export default function QualityPrintButton() {
  return <button type="button" className="zm-manual__print" onClick={() => window.print()}>
    Zapisz jako PDF / drukuj <span aria-hidden="true">↗</span>
  </button>;
}
