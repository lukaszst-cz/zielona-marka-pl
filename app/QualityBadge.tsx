export default function QualityBadge() {
  return <div className="zm-quality-mark" aria-label="QA, standard kontroli jakości Zielonej Marki">
    <span>STANDARD<br />ZIELONEJ MARKI</span>
    <svg viewBox="0 0 80 80" width="62" height="62" aria-hidden="true"><path d="M40 7 66 18v22c0 15-14 26-26 33C28 66 14 55 14 40V18Z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m27 39 9 9 18-20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <strong>QA</strong><small>KONTROLA JAKOŚCI<br />PRZED PUBLIKACJĄ</small>
  </div>;
}
