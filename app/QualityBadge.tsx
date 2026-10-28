import "./quality-badge.css";

export default function QualityBadge() {
  return <aside className="zm-quality-mark zm-quality-mark--current" aria-label="QA, czyli zapewnianie jakości. Wewnętrzny standard Zielona Marka, wydanie 3.1.">
    <span className="zm-quality-mark__brand">ZIELONA MARKA <b>STANDARD 3.1</b></span>
    <svg viewBox="0 0 96 96" width="76" height="76" fill="none" aria-hidden="true"><circle cx="48" cy="48" r="42" stroke="currentColor" strokeOpacity=".2" /><path d="M48 13 74 24v23c0 17-14 29-26 36-12-7-26-19-26-36V24Z" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeWidth="1.5" /><path d="m34 47 10 10 20-23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="80" cy="19" r="4" fill="currentColor" /></svg>
    <strong>QA <span>Zapewnianie jakości</span></strong>
    <small>Ustalenia · Kontrola · Odbiór</small>
    <p>Wewnętrzny standard pracy przed publikacją.</p>
  </aside>;
}
