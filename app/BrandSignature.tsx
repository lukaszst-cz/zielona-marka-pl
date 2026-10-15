import Image from "next/image";

export default function BrandSignature({ compact = false, botanical = false }: { compact?: boolean; botanical?: boolean }) {
  return <span className={`brand-signature${compact ? " compact" : ""}${botanical ? " brand-botanical" : ""}`} role="img" aria-label="Zielona Marka">
    <Image className="brand-apple" src="/logo-fern-automation-white.svg" width={96} height={98} alt="" unoptimized />
    <span className="brand-wordmark"><b>ZIELONA</b><b>MARKA</b><small><span>STRONY I SKLEPY WWW · SYSTEMY CRM · DTP</span><span>DLA FIRM</span></small></span>
  </span>;
}
