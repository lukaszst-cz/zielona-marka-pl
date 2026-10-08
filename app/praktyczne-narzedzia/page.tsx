import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import { practicalTools } from "./tools";

export const metadata: Metadata = {
  title: "Narzędzia dla firm i Strefa Free",
  description: "Narzędzia dla firm, bezpłatne programy i odnośnik do projektów Flow. Sprawdź dostępne wersje, zakres i ograniczenia każdego projektu.",
  alternates: { canonical: "/praktyczne-narzedzia" },
  openGraph: {
    title: "Praktyczne narzędzia i aplikacje | Zielona Marka",
    description: "Sprawdź bezpłatne narzędzia, demonstracje i kod projektów Zielonej Marki.",
    images: [{ url: "/og.jpg", alt: "Praktyczne narzędzia i aplikacje Zielonej Marki" }],
  },
};

export default function PracticalToolsPage() {
  const developmentTools = practicalTools.filter((tool) => tool.name.startsWith("Spokojny"));
  const availableTools = practicalTools.filter((tool) => !developmentTools.includes(tool));
  const toolGroups = [
    {
      category: "narzedzia" as const,
      eyebrow: "NARZĘDZIA DLA FIRM",
      title: "Mniej ręcznego przepisywania. Więcej pewności przed wysłaniem.",
      description: "Proste narzędzia do pracy z zapytaniami i dokumentami. Wspierają decyzję człowieka, nie zastępują jej.",
    },
    {
      category: "programy" as const,
      eyebrow: "STREFA FREE",
      title: "Bezpłatne programy do sprawdzenia i używania.",
      description: "Wybierz program i zobacz, jaką wersję możesz dziś otworzyć, pobrać lub uruchomić samodzielnie.",
    },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Praktyczne narzędzia i aplikacje Zielonej Marki",
    url: "https://zielona-marka.pl/praktyczne-narzedzia",
    numberOfItems: availableTools.length,
    itemListElement: availableTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: tool.name === "DocPilot" || tool.name === "SpokojnyPC+" ? "Windows" : tool.name === "SpokojnyMobile+" ? "Android" : "Web",
        description: `${tool.problem} ${tool.benefit}`,
        url: tool.primaryUrl.startsWith("http") ? tool.primaryUrl : `https://zielona-marka.pl${tool.primaryUrl}`,
        ...(tool.repositoryUrl && tool.name !== "SpokojnyMobile+" ? { codeRepository: tool.repositoryUrl } : {}),
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "PLN", description: tool.freeDetails },
        author: { "@type": "Organization", name: "Zielona Marka", url: "https://zielona-marka.pl", logo: "https://zielona-marka.pl/logo-zielona-marka-transparent-v1.png" },
      },
    })),
  };
  const renderToolCard = (tool: (typeof practicalTools)[number], index: number) => <article className="project-case" key={tool.name}>
    <div className={`project-case-image${tool.logoUrl ? " photo-program-card" : ""}`}><img className="project-card-media" src={tool.imageUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" /><span>{tool.status}</span>{tool.logoUrl && <img className="program-card-logo" src={tool.logoUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" />}<b>{String(index + 1).padStart(2, "0")}</b></div>
    <div><small>{tool.status}</small><h2>{tool.name}</h2><p><b>Do czego służy:</b> {tool.benefit}</p><p className="tool-free-note"><b>{tool.name === "SpokojnyPC+" ? "Aktualny stan:" : "Bezpłatnie dostępne teraz:"}</b> {tool.freeDetails}</p><ul className="tool-scope">{tool.scope.map(item => <li key={item}>{item}</li>)}</ul><div className="project-case-links"><a className="button" href={tool.primaryUrl} target={tool.primaryUrl.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{tool.primaryLabel} <span>↗</span></a>{tool.repositoryUrl && tool.repositoryUrl !== tool.primaryUrl && <a className="text-link" href={tool.repositoryUrl} target="_blank" rel="noreferrer">{tool.name === "SpokojnyMobile+" ? "Repo wydaniowe i instrukcja" : "Kod i dokumentacja na GitHubie"} <span>↗</span></a>}</div></div>
  </article>;

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <SiteHeader />
    <main className="zm-public practical-tools-page">
      <section className="page-hero shell"><span className="eyebrow"><i />NARZĘDZIA DLA FIRM · STREFA FREE · PROJEKTY FLOW</span><h1>Sprawdź projekty. <em>Wybierz to, z czego możesz korzystać już dziś.</em></h1><p>Tworzę narzędzia dla firm, aplikacje do codziennego użytku i demonstracje całych procesów. Przy każdym projekcie podaję, co jest dostępne bezpłatnie, na jakiej platformie działa i czy jest to gotowy program, pilotaż, demonstracja czy kod.</p><div className="practical-hero-links"><a className="button" href="#narzedzia">Narzędzia dla firm <span>↓</span></a><a href="#strefa-free">Strefa Free ↓</a><Link href="/projekty-flow">Projekty Flow ↗</Link><a href="https://github.com/lukaszst-cz" target="_blank" rel="noreferrer">Zobacz moje projekty na GitHubie ↗</a></div><p className="practical-github-note">Na GitHubie znajdziesz między innymi kod i opisy DocPilot, Aktywnik+, CzyToŚciema?, PrintFlow i TransportFlow. Dostępna wersja każdego projektu jest opisana poniżej.</p></section>

      <section id="narzedzia" className="section shell practical-tool-groups">{toolGroups.map((group) => {
        const groupTools = availableTools.filter((tool) => tool.category === group.category);
        return <div id={group.category === "programy" ? "strefa-free" : undefined} className="practical-tool-group" key={group.category}><div className="section-head"><div><span className="section-no">{group.eyebrow}</span><h2>{group.title}</h2></div><p>{group.description}</p></div><div className="project-list">{groupTools.map((tool) => renderToolCard(tool, availableTools.indexOf(tool)))}</div></div>;
      })}</section>

      <section className="section flow-hub-teaser"><div className="shell operations-grid"><div><span className="section-no">PROJEKTY FLOW</span><h2>PrintFlow, TransportFlow i WorkshopFlow.</h2><p>Trzy demonstracje przebiegu pracy w firmie, każda z własną grafiką i opisem. Zobacz, co można obejrzeć bezpłatnie oraz gdzie udostępniam kod i dokumentację.</p></div><div><Link className="button" href="/projekty-flow">Zobacz projekty Flow <span>↗</span></Link><p className="flow-hub-note">Pełne karty projektów znajdują się na jednej, osobnej stronie.</p></div></div></section>

      <section className="section operations-section"><div className="shell operations-grid"><div><span className="section-no">JASNE ZASADY</span><h2>Bezpłatny dostęp nie oznacza gotowego wdrożenia dla każdej firmy.</h2><p>Narzędzia i demonstracje służą do samodzielnego sprawdzenia pomysłu. Nie wysyłają wiadomości bez decyzji użytkownika i nie zastępują kontroli człowieka.</p></div><div><a href="https://github.com/lukaszst-cz" target="_blank" rel="noreferrer">Zobacz profil GitHub ↗</a><Link href="/realizacje">Zobacz pozostałe projekty ↗</Link></div></div></section>
      {developmentTools.length > 0 && <section className="section shell practical-development"><div className="section-head"><div><span className="section-no">WYDANIA TESTOWE</span><h2>Spokojny+ na komputer i telefon.</h2></div><p>Bezpłatny APK SpokojnyMobile+ 1.0.0 RC1 jest już w osobnym publicznym repo, z sumą kontrolną i opisem ograniczeń. To wersja przedpremierowa. Instalator Windows nie jest tutaj publicznie udostępniony.</p></div><div className="project-list">{developmentTools.map((tool, index) => renderToolCard(tool, availableTools.length + index))}</div></section>}
      <section className="section shell next-project"><span className="section-no">PODOBNY PROBLEM W TWOJEJ FIRMIE</span><h2>Najpierw ustalmy, gdzie ginie czas albo informacja.</h2><p>Opisz krótko obecny sposób pracy. Sprawdzimy, czy wystarczy formularz, prosty status sprawy czy osobne narzędzie.</p><Link className="button" href="/kontakt">Opisz swoją sytuację <span>↗</span></Link></section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
