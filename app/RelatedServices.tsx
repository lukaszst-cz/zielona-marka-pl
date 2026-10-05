import Link from "./SafeLink";

type Item = { href: string; label: string; text: string };

export default function RelatedServices({ items }: { items: Item[] }) {
  return <section className="section shell seo-related" aria-labelledby="seo-related-title">
    <div className="section-head"><div><span className="section-no">NASTĘPNY SENSOWNY KROK</span><h2 id="seo-related-title">Sprawdź rozwiązanie dopasowane do obecnej sytuacji firmy.</h2></div><p>Nie każda firma potrzebuje nowej strony i systemu naraz. Wybierz problem, który chcesz rozwiązać jako pierwszy.</p></div>
    <div className="seo-related-grid">{items.map((item, index) => <Link href={item.href} key={item.href}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.text}</p><b>Czytaj więcej ↗</b></Link>)}</div>
  </section>;
}
