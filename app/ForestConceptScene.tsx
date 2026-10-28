import Image from "next/image";
import BrandSignature from "./BrandSignature";
import Link from "./SafeLink";

export default function ForestConceptScene() {
  return <div className="zm-forest-concept-scene" aria-label="Strona, identyfikacja i gazetka w jednym kierunku wizualnym">
    <span className="zm-scene-caption">POMYSŁ, KTÓRY MOŻESZ ZOBACZYĆ.</span>
    <Link className="zm-scene-laptop" href="/bezplatna-koncepcja-strony?typ=new#mozliwosci"><span className="zm-scene-browser"><i /><i /><i /><b>STRONA TWOJEJ FIRMY</b></span><span className="zm-scene-webpage"><BrandSignature compact /><strong>Twoja firma.<br /><em>Nowa perspektywa.</em></strong><small>Oferta, którą łatwo poznać.<br />Kontakt, który łatwo znaleźć.</small><b>Zobacz możliwości ↗</b></span><span className="zm-scene-laptop-base" /></Link>
    <Link className="zm-scene-brand-card" href="/bezplatna-koncepcja-strony?typ=logo#mozliwosci"><BrandSignature compact /><small>JEDEN ROZPOZNAWALNY STYL</small><span>Logo i identyfikacja ↗</span></Link>
    <Link className="zm-scene-print" href="/bezplatna-koncepcja-strony?typ=promo#mozliwosci"><Image src="/concept-samples-v2/music-640.webp" width={1536} height={1024} alt="Przykładowa gazetka POGŁOS, okładka i otwarty środek" unoptimized /><span>Materiały do druku ↗</span></Link>
    <span className="zm-scene-bottom">WWW <i /> IDENTYFIKACJA <i /> DRUK</span>
  </div>;
}
