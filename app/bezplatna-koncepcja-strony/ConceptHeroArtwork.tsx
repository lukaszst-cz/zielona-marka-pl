/** Fictional illustrative layout. No claim that this is a delivered client project. */
const Fern = ({ className = "" }: { className?: string }) => <span className={`zv5-fern ${className}`} aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</span>;

export default function ConceptHeroArtwork() {
  return <div className="zv5-hero-art" role="img" aria-label="Przykładowy projekt strony forma. dla fikcyjnego studia roślin oraz jego wersja na telefon.">
    <div className="zv5-desktop">
      <div className="zv5-browser-bar"><span className="zv5-browser-dots"><i/><i/><i/></span><span>Przykładowy projekt · studio zieleni</span><small>www.twojafirma.pl</small></div>
      <div className="zv5-site">
        <div className="zv5-site-head"><b>forma<span>.</span></b><small>STUDIO ROŚLIN · WNĘTRZA</small><span aria-hidden="true">☰</span></div>
        <div className="zv5-site-content">
          <div className="zv5-site-copy"><small>PRZESTRZEŃ, W KTÓREJ ODDYCHASZ</small><strong>Żyj trochę<br/><em>wolniej.</em></strong><span>Naturalnie piękne wnętrza. Więcej spokoju każdego dnia.</span><b>Poznaj nas ↗</b></div>
          <div className="zv5-site-visual"><span className="zv5-rings"/><Fern className="zv5-fern-one"/><Fern className="zv5-fern-two"/><small>natural spaces</small></div>
        </div>
        <div className="zv5-site-bottom"><span>EST. 2026</span><span>01 / 04. HISTORIA MARKI</span></div>
      </div>
    </div>
    <div className="zv5-phone">
      <span className="zv5-phone-notch"/>
      <div className="zv5-phone-head">forma<span>.</span><i aria-hidden="true">☰</i></div>
      <div className="zv5-phone-photo"><Fern className="zv5-fern-phone"/></div>
      <div className="zv5-phone-body"><small>ZIELONE MIEJSCE</small><b>Twoja chwila spokoju.</b><span>Odkryj możliwości ↗</span></div>
    </div>
    <div className="zv5-hero-note"><span aria-hidden="true">✳</span><div><b>Nowy kierunek</b><small>Jedna przemyślana propozycja</small></div></div>
    <p className="zv5-example-label">PRZYKŁAD KONCEPCYJNY. NIE REALIZACJA KLIENTA</p>
  </div>;
}
