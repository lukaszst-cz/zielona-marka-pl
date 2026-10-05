export default function BrandSignature({ compact = false, botanical = false }: { compact?: boolean; botanical?: boolean }) {
  return <span className={`brand-signature${compact ? " compact" : ""}${botanical ? " brand-botanical" : ""}`} role="img" aria-label="Zielona Marka">
    <img className="brand-apple" src="/logo-fern-automation-white.svg" width="96" height="98" alt="" />
    <span className="brand-wordmark"><b>ZIELONA</b><b>MARKA</b><small>STRONY WWW I SYSTEMY DLA FIRM</small></span>
  </span>;
}
