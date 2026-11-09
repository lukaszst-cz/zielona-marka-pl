/* eslint-disable @next/next/no-img-element -- Podglądy to istniejące statyczne grafiki WebP i SVG, bez potrzeby zewnętrznego optymalizatora. */
import Link from "../SafeLink";
import "../portfolio/teaser.css";

const examples = [
  { name: "OKRUCH", type: "Modernizacja przed i po", image: "/concept-samples-v2/okruch-before-after-1280.webp", slug: "okruch" },
  { name: "SZLAK", type: "Logo i identyfikacja", image: "/concept-samples-v2/logo-1280.webp", slug: "szlak" },
  { name: "PELETON", type: "Gazetka reklamowa", image: "/concept-samples-v2/promo-1280.webp", slug: "peleton" },
];

export default function ConceptShowcase() {
  return <section className="section zm-concept-gallery zmp-teaser" id="mozliwosci" aria-labelledby="zm-concept-gallery-heading">
    <div className="shell">
      <div className="zv5-gallery-intro">
        <div><span className="zv5-kicker">PRZYKŁADY I PORTFOLIO</span><h2 id="zm-concept-gallery-heading">Zobacz projekty.<br/><em>Wybierz własny kierunek.</em></h2></div>
        <p>Pełne portfolio stron, gazetek, logo, aplikacji i arkuszy Excel ma teraz jedno miejsce. Poniżej trzy przykłady z galerii koncepcyjnej.</p>
      </div>
      <div className="zmp-teaser-grid">
        {examples.map(item=><Link className="zmp-teaser-card" key={item.slug} href={`/portfolio/${item.slug}`}>
          <img src={item.image} alt={`Własna koncepcja Zielonej Marki: ${item.name}`} loading="lazy" width={640} height={426}/>
          <span><small>{item.type}</small><strong>{item.name}</strong><b>Zobacz projekt ↗</b></span>
        </Link>)}
      </div>
      <div className="zmp-teaser-bottom">
        <p>To koncepcje pokazowe fikcyjnych marek, nie wdrożenia wykonane dla klientów.</p>
        <Link className="zmp-teaser-main-link" href="/portfolio">Zobacz całe portfolio i przygotuj PDF ↗</Link>
      </div>
    </div>
  </section>;
}
