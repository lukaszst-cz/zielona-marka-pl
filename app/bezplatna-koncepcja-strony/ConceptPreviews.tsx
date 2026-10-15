import type { ReactNode } from "react";

type Kind = "existing" | "new" | "logo" | "promo" | "sales";

// Decorative previews use fictional example brands. They do not represent client projects.
export function ConceptHeroPreview() {
  return <div className="zc-hero-stage" aria-hidden="true">
    <div className="zc-hero-browser">
      <div className="zc-hero-toolbar">
        <span className="zc-hero-dots"><i /><i /><i /></span>
        <span>Przykładowy podgląd WWW</span>
        <span className="zc-hero-live">KONCEPCJA</span>
      </div>
      <div className="zc-hero-site">
        <div className="zc-hero-site-nav"><b>NATURA<span>STUDIO</span></b><span>O nas · Oferta · Kontakt</span></div>
        <div className="zc-hero-site-grid">
          <div className="zc-hero-site-copy"><small>PRZYKŁADOWA STRONA USŁUGOWA</small><strong>Spokój, który <em>zostaje z Tobą.</em></strong><span>Oferta, w której szybko odnajdziesz to, czego potrzebujesz.</span><b>Poznaj usługi ↗</b></div>
          <div className="zc-hero-site-photo" />
        </div>
        <div className="zc-hero-site-foot"><span>01 / Oferta</span><span>02 / O nas</span><span>03 / Kontakt</span></div>
      </div>
    </div>
    <div className="zc-hero-mobile">
      <div className="zc-hero-mobile-top"><i /> <span>Widok mobilny</span><i /></div>
      <div className="zc-hero-mobile-photo" />
      <div className="zc-hero-mobile-copy"><small>NATURA STUDIO</small><b>Dobrze tu być.</b><span>Zabiegi · Pielęgnacja</span><i>Sprawdź ofertę ↗</i></div>
    </div>
    <div className="zc-hero-caption"><b>WWW</b><span>Jeden pomysł. Dwa widoki.</span></div>
  </div>;
}

function SampleFrame({ children, kind }: { children: ReactNode; kind: Kind }) {
  return <div className={`zc-sample zc-sample-${kind}`} aria-hidden="true">{children}</div>;
}

export function ConceptTilePreview({ kind }: { kind: Kind }) {
  if (kind === "existing") {
    return <SampleFrame kind={kind}><div className="zc-sample-before"><small>OBECNA STRONA</small><span>Usługi / Kontakt</span><i /><i /><i /></div><b className="zc-sample-arrow">→</b><div className="zc-sample-after"><small>NOWA KONCEPCJA</small><strong>Twoja oferta,<br />od pierwszej chwili.</strong><span>Przejrzyste usługi ↗</span></div></SampleFrame>;
  }
  if (kind === "new") {
    return <SampleFrame kind={kind}><div className="zc-sample-new-head"><b>NATURA STUDIO</b><span>Menu ☰</span></div><div className="zc-sample-new-body"><div><small>PRZYKŁADOWA STRONA</small><strong>Dobry początek.</strong><span>Odkryj ofertę ↗</span></div><i /></div></SampleFrame>;
  }
  if (kind === "logo") {
    return <SampleFrame kind={kind}><div className="zc-sample-logo-main"><b>L</b><div><strong>LUMI</strong><span>PRACOWNIA WNĘTRZ</span></div></div><div className="zc-sample-logo-footer"><span>Symbol</span><span>Typografia</span><span>Kolor</span></div></SampleFrame>;
  }
  if (kind === "promo") {
    return <SampleFrame kind={kind}><div className="zc-sample-promo-sheet"><small>PRZYKŁADOWA OKŁADKA</small><strong>Nowe<br /><em>pomysły.</em></strong><span>Usługi · Inspiracje · Aktualności</span><b>ODKRYJ WIĘCEJ ↗</b></div><div className="zc-sample-promo-strip">KONCEPCJA GAZETKI REKLAMOWEJ</div></SampleFrame>;
  }
  return <SampleFrame kind={kind}><div className="zc-sample-sales-header"><small>KATALOG / DEMO</small><strong>Oferta, którą łatwo wybrać.</strong></div><div className="zc-sample-sales-items"><div><i /><b>PRODUKT 01</b><span>Opis i korzyści</span></div><div><i /><b>PRODUKT 02</b><span>Opis i korzyści</span></div><div><i /><b>PRODUKT 03</b><span>Opis i korzyści</span></div></div></SampleFrame>;
}
