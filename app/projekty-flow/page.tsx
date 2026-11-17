import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import "./workbooks.css";

export const metadata: Metadata = {
  title: "Procesy pracy i arkusze Excel dla firm | Zielona Marka",
  description: "Zobacz demonstracje obiegu zleceń w drukarni, transporcie i warsztacie. Projekty Flow, przykładowe arkusze Excel i sposoby organizacji pracy firmy.",
  alternates: { canonical: "/projekty-flow" },
  openGraph: {
    type: "website",
    url: "/projekty-flow",
    title: "Projekty Flow: obieg zleceń i arkusze Excel | Zielona Marka",
    description: "Przykłady procesów PrintFlow, TransportFlow i WorkshopFlow. Zobacz aplikacje, etapy pracy i powiązane arkusze Excel.",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projekty Flow: obieg zleceń i arkusze Excel | Zielona Marka",
    description: "Przykłady procesów PrintFlow, TransportFlow i WorkshopFlow. Zobacz aplikacje, etapy pracy i powiązane arkusze Excel.",
    images: ["/og.jpg"],
  },
};

const flowProjects = [
  { name: "PrintFlow 360", label: "ORDER-TO-CASH", description: "Model procesu od zapytania i wyceny, przez produkcję oraz kontrolę jakości, do wysyłki i faktury. Łączy portal PWA, Excel, KPI i podział odpowiedzialności.", freeAccess: "Bezpłatnie: kod, dokumentacja i materiały demonstracyjne na GitHubie. Nie jest to gotowe wdrożenie dla firmy.", image: "/tool-printflow-360-v2.jpg", primaryUrl: "https://github.com/lukaszst-cz/printflow-360", primaryLabel: "Zobacz kod i opis", portfolioSlug: "printflow", workbookSlug: "excel-printflow" },
  { name: "TransportFlow 360", label: "TRANSPORT", description: "Demonstracja przebiegu od kalkulacji trasy, przez realizację przewozu i dokumenty, do faktury oraz podsumowania wyniku.", freeAccess: "Bezpłatnie: demonstracja w przeglądarce oraz kod i dokumentacja na GitHubie. Dane i kwoty w pokazie są przykładowe.", image: "/tool-transportflow-360-v2.jpg", primaryUrl: "/demo/transport", primaryLabel: "Otwórz demonstrację", repositoryUrl: "https://github.com/lukaszst-cz/transportflow-360", portfolioSlug: "transportflow", workbookSlug: "excel-transportflow" },
  { name: "WorkshopFlow 360", label: "WARSZTAT", description: "Portal i proces obsługi warsztatu samochodowego na danych demonstracyjnych. Pokazuje przejście od zgłoszenia do uporządkowanej obsługi sprawy.", freeAccess: "Bezpłatnie: kod, opis i materiały demonstracyjne na GitHubie. Projekt nie obsługuje prawdziwych klientów warsztatu.", image: "/tool-workshopflow-360-photo.png", primaryUrl: "https://github.com/lukaszst-cz/workshopflow-360", primaryLabel: "Zobacz kod i opis", portfolioSlug: "workshopflow", workbookSlug: "excel-warsztat" },
] as const;

const everydayWorkbooks = [
  { slug: "excel-dashboard", name: "Dashboard operacyjny", description: "Zlecenia, terminy i wynik pracy firmy w jednym widoku." },
  { slug: "excel-wycena", name: "Kalkulator wariantów oferty", description: "Trzy wersje wyceny, koszt pracy i porównanie marży." },
  { slug: "excel-crm", name: "Rejestr kontaktów i działań", description: "Klienci, szanse sprzedaży i zadania do wykonania." },
] as const;

export default function FlowProjectsPage() {
  return <><SiteHeader /><main className="zm-public flow-projects-page">
    <section className="page-hero shell"><span className="eyebrow"><i />PROJEKTY FLOW</span><h1>Od zgłoszenia do rozliczenia. <em>Zobacz cały proces.</em></h1><p>Zobacz przykładowe obiegi zleceń w drukarni, transporcie i warsztacie. Przy każdym projekcie znajdziesz opis procesu oraz arkusz Excel, który pokazuje zadania i dane na kolejnych etapach.</p><a className="button" href="#projekty">Zobacz projekty <span>↓</span></a><p><Link href="/portfolio?kategoria=aplikacje">Pozostałe systemy i aplikacje w portfolio ↗</Link></p></section>
    <section id="projekty" className="section shell"><div className="project-list">{flowProjects.map((project, index) => <article className="project-case" key={project.name}><div className="project-case-image" style={{ backgroundImage: `linear-gradient(115deg,rgba(10,31,22,.68),rgba(10,31,22,.10)),url(${project.image})` }}><span>{project.label}</span><b>{String(index + 1).padStart(2, "0")}</b></div><div><small>{project.label}</small><h2>{project.name}</h2><p>{project.description}</p><p className="flow-free-note">{project.freeAccess}</p><div className="project-case-links"><a className="button" href={project.primaryUrl} target={project.primaryUrl.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.primaryLabel} <span>↗</span></a>{"repositoryUrl" in project && project.repositoryUrl && <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">Kod na GitHubie <span>↗</span></a>}<Link className="text-link" href={"/portfolio/" + project.portfolioSlug}>Opis procesu w portfolio ↗</Link><Link className="text-link" href={"/portfolio/" + project.workbookSlug}>Przykładowy arkusz Excel ↗</Link></div></div></article>)}</div></section>
    <section className="section shell flow-workbooks" aria-labelledby="flow-workbooks-title">
      <div className="section-head"><div><span className="section-no">EXCEL W PRAKTYCE</span><h2 id="flow-workbooks-title">Proste narzędzia, od których można zacząć.</h2></div>
      <p>Nie każdy proces wymaga od razu osobnej aplikacji. Te trzy arkusze pokazują, jak porządkować zlecenia, oferty i kontakt z klientami.</p></div>
      <div className="flow-workbook-grid">{everydayWorkbooks.map((workbook, index) =>
        <article key={workbook.slug}><span>0{index + 1} / NARZĘDZIE</span><h3>{workbook.name}</h3><p>{workbook.description}</p>
          <Link href={"/portfolio/" + workbook.slug}>Zobacz opis i pobierz arkusz ↗</Link>
        </article>)}</div>
      <p className="flow-workbooks-more"><Link href="/portfolio?kategoria=excel">Zobacz także branżowe arkusze dla hurtowni, gastronomii, gabinetów i firm budowlanych ↗</Link></p>
      <p className="flow-workbooks-note">Wszystkie pokazy korzystają z danych przykładowych. Arkusze nie są automatycznie synchronizowane z aplikacjami ani podłączone do rzeczywistych firm.</p>
    </section>
    <section className="section operations-section"><div className="shell operations-grid"><div><span className="section-no">MODUŁY KONTROLNE</span><h2>Osobne zaplecze dla produkcji i transportu.</h2><p>Publiczne demonstracje PrintFlow Control Center oraz TransportFlow Control Center skupiają się na kontroli procesu. To aplikacje Python i SQLite z danymi demonstracyjnymi, przeznaczone do uruchomienia lokalnego.</p></div><div><a href="https://github.com/lukaszst-cz/printflow-control-center" target="_blank" rel="noreferrer">PrintFlow Control Center ↗</a><a href="https://github.com/lukaszst-cz/transportflow-control-center" target="_blank" rel="noreferrer">TransportFlow Control Center ↗</a></div></div></section>
    <section className="section shell next-project"><span className="section-no">PODOBNY PROCES</span><h2>Najpierw mapa pracy, potem narzędzie.</h2><p>Jeśli jedna sprawa krąży między telefonem, Excelem a pocztą, zacznijmy od narysowania jej drogi. Dopiero potem wybierzemy narzędzie.</p><Link className="button" href="/kontakt">Opisz swój proces <span>↗</span></Link></section>
    <section className="section shell flow-back-link"><span className="section-no">WIĘCEJ NARZĘDZI</span><h2>Szukasz programu lub narzędzia do samodzielnego sprawdzenia?</h2><p>W Strefie Free znajdziesz Aktywnik+, DocPilot, CzyToŚciema? oraz opisy pozostałych projektów.</p><Link className="button" href="/praktyczne-narzedzia#strefa-free">Przejdź do Strefy Free <span>↗</span></Link></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
