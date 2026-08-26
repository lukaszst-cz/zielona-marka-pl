export default function BrandSignature({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-signature${compact ? " compact" : ""}`} role="img" aria-label="Zielona Marka">
      <svg className="brand-apple" viewBox="0 0 32 32" focusable="false">
        <path className="brand-apple-line" d="M24.8 8.2C19.6 5.5 11.6 6.1 7.4 10.7C2.5 16.1 5.2 25.5 11.2 28.1C14.1 29.4 17 28.4 19 27.1" />
        <path className="brand-leaf" d="M18.2 5.7C20.1 2.7 23.1 1.9 26.7 2.4C25.4 5.8 23 7.4 19.5 7.7Z" />
        <path className="brand-leaf-line" d="M20.1 7.8C20.7 6.2 21.8 4.9 23.5 3.8" />
      </svg>
      <span className="brand-wordmark">
        <b>ZIELONA</b>
        <b>MARKA</b>
        <small>STRONY I SYSTEMY DLA FIRM</small>
      </span>
    </span>
  );
}
