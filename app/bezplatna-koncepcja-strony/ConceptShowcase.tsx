/* eslint-disable @next/next/no-img-element -- Podgląd to istniejąca statyczna grafika WebP, bez potrzeby zewnętrznego optymalizatora. */
import Link from "../SafeLink";
import "../portfolio/teaser.css";

/* Jedna koncepcja jako dowód. Wszystkie prace mieszkają w portfolio, żeby nie prowadzić dwóch galerii. */
export default function ConceptShowcase() {
  return <section className="section zm-concept-gallery zmp-teaser" id="mozliwosci" aria-labelledby="zm-concept-gallery-heading">
    <div className="shell">
      <div className="zv5-gallery-intro">
        <div><span className="zv5-kicker">TAK TO WYGLĄDA</span><h2 id="zm-concept-gallery-heading">Jedna strona.<br/><em>Stara i nowa wersja obok siebie.</em></h2></div>
        <p>Tak wygląda gotowa koncepcja: ten sam zakres usług i te same treści, pokazane w układzie, który prowadzi klienta do kontaktu. Poniżej przykład dla fikcyjnej marki OKRUCH.</p>
      </div>
      <div className="zm-concept-proof">
        <img src="/concept-samples-v2/okruch-before-after-1280.webp" alt="Porównanie starej i nowej wersji strony fikcyjnej marki OKRUCH" loading="lazy" width={1280} height={853} />
      </div>
      <div className="zmp-teaser-bottom">
        <p>To koncepcja pokazowa fikcyjnej marki, nie wdrożenie wykonane dla klienta.</p>
        <Link className="zmp-teaser-main-link" href="/portfolio">Zobacz wszystkie prace w portfolio ↗</Link>
      </div>
    </div>
  </section>;
}
