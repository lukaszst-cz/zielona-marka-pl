export default function BrandSignature({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-signature${compact ? " compact" : ""}`} role="img" aria-label="Zielona Marka">
      <img className="brand-apple" src="/logo-zielona-marka-transparent-v1.png" alt="" />
      <span className="brand-wordmark">
        <b>ZIELONA</b>
        <b>MARKA</b>
        <small>STRONY WWW I SYSTEMY DLA FIRM</small>
      </span>
    </span>
  );
}
