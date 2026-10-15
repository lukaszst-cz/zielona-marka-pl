import Link from "./SafeLink";

const pages = [
  { href: "/standardy-jakosci", label: "Jakość i normy" },
  { href: "/standard-jakosci", label: "Standard WWW / CRM" },
  { href: "/standard-dtp", label: "Standard DTP" },
  { href: "/raport-qa", label: "Przykładowy raport QA" },
] as const;

export function QaLocalNav({ active }: { active: string }) {
  return <nav className="qa-local-nav shell" aria-label="Nawigacja po standardach jakości">
    {pages.map(item => <Link key={item.href} href={item.href} aria-current={active === item.href ? "page" : undefined}>{item.label}<span aria-hidden="true"> ↗</span></Link>)}
  </nav>;
}

const manuals = [
  { number: "01 / PROCEDURA", name: "Standard jakości WWW, sklepów i CRM", pages: "PDF · 10 stron · wersja 3", description: "Osiem etapów współpracy, kontrole funkcjonalne, techniczne, bezpieczeństwo, odbiór i zasady dokumentowania wyników.", href: "/downloads/zielona-marka-standard-jakosci-www-dtp-crm.pdf", details: "/standard-jakosci" },
  { number: "02 / PREPRESS", name: "Standard DTP — 73 punkty kontroli", pages: "PDF · 15 stron · wersja 3", description: "Dwanaście obszarów: treść, spady, typografia, obrazy, ICC, separacje, PDF/X, proof, kody i wydanie produkcyjne.", href: "/downloads/zielona-marka-standard-dtp-prepress-qa.pdf", details: "/standard-dtp" },
] as const;

export function QaDocumentCards() {
  return <div className="qa-documents">
    {manuals.map(doc => <article className="qa-document" key={doc.href}>
      <span className="qa-kicker">{doc.number}</span>
      <h3>{doc.name}</h3>
      <p>{doc.description}</p>
      <small>{doc.pages}</small>
      <div className="qa-document-links">
        <a className="button" href={doc.href} download>Pobierz PDF <span aria-hidden="true">↓</span></a>
        <Link className="text-link" href={doc.details}>Zobacz opis na stronie <span aria-hidden="true">↗</span></Link>
      </div>
    </article>)}
  </div>;
}
