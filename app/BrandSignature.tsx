export default function BrandSignature({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-signature${compact ? " compact" : ""}`} role="img" aria-label="Zielona Marka">
      <svg className="brand-apple" viewBox="0 0 170 170" focusable="false">
        <defs>
          <linearGradient id="brandAppleRibbon" x1="38" y1="35" x2="115" y2="158" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A8D83E" />
            <stop offset="0.48" stopColor="#72BE36" />
            <stop offset="1" stopColor="#078B4A" />
          </linearGradient>
          <linearGradient id="brandAppleLeaf" x1="91" y1="5" x2="116" y2="41" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A8D83E" />
            <stop offset="1" stopColor="#4BAE37" />
          </linearGradient>
        </defs>
        <path className="brand-apple-outline" d="M154 57C132 40 103 38 78 49C54 37 28 44 15 67C-2 97 10 136 36 153C53 164 68 153 81 145C98 158 123 162 149 146" />
        <path className="brand-apple-ribbon" d="M154 57C132 40 103 38 78 49C54 37 28 44 15 67C-2 97 10 136 36 153C53 164 68 153 81 145C98 158 123 162 149 146" />
        <path className="brand-leaf" d="M84 39C86 18 104 1 133 2C126 24 110 38 86 42Z" />
        <path className="brand-leaf-line" d="M91 36C101 25 112 15 125 7" />
      </svg>
      <span className="brand-wordmark">
        <b>ZIELONA</b>
        <b>MARKA</b>
        <small>STRONY I SYSTEMY DLA FIRM</small>
      </span>
    </span>
  );
}
