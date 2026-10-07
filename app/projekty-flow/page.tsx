import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Projekty Flow | demonstracje procesów",
  description: "Publiczne demonstracje procesów PrintFlow, TransportFlow i WorkshopFlow oraz moduły kontroli procesu.",
  alternates: { canonical: "/projekty-flow" },
};

const flowProjects = [
  { name: "PrintFlow 360", label: "ORDER-TO-CASH", description: "Model procesu od zapytania i wyceny, przez produkcję oraz kontrolę jakości, do wysyłki i faktury. Łączy portal PWA, Excel, KPI i podział odpowiedzialności.", freeAccess: "Bezpłatnie: kod, dokumentacja i materiały demonstracyjne na GitHubie. Nie jest to gotowe wdrożenie dla firmy.", image: "/tool-printflow-360-v2.jpg", primaryUrl: "https://github.com/lukaszst-cz/printflow-360", primaryLabel: "Zobacz kod i opis" },
  { name: "TransportFlow 360", label: "TRANSPORT", description: "Demonstracja przebiegu od kalkulacji trasy, przez realizację przewozu i dokumenty, do faktury oraz podsumowania wyniku.", freeAccess: "Bezpłatnie: demonstracja w przeglądarce oraz kod i dokumentacja na GitHubie. Dane i kwoty w pokazie są przykładowe.", image: "/tool-transportflow-360-v2.jpg", primaryUrl: "/demo/transport", primaryLabel: "Otwórz demonstrację", repositoryUrl: "https://github.com/lukaszst-cz/transportflow-360" },
  { name: "WorkshopFlow 360", label: "WARSZTAT", description: "Portal i proces obsługi warsztatu samochodowego na danych demonstracyjnych. Pokazuje przejście od zgłoszenia do uporządkowanej obsługi sprawy.", freeAccess: "Bezpłatnie: kod, opis i materiały demonstracyjne na GitHubie. Projekt nie obsługuje prawdziwych klientów warsztatu.", image: "/tool-workshopflow-360-photo.png", primaryUrl: "https://github.com/lukaszst-cz/workshopflow-360", primaryLabel: "Zobacz kod i opis" },
] as const;

export default function FlowProjectsPage() {
  return <><SiteHeader /><main className="zm-public flow-projects-page">
    <section className="page-hero shell"><span className="eyebrow"><i />PROJEKTY FLOW</span><h1>Nie pojedyncze ekrany. <em>Cały przepływ pracy.</em></h1><p>Te projekty są oddzielone od katalogu programów, bo pokazują przejście informacji przez firmę: od zgłoszenia, przez zadanie i kontrolę, do rozliczenia.</p><a className="button" href="#projekty">Zobacz projekty <span>↓</span></a></section>
    <section id="projekty" className="section shell"><div className="project-list">{flowProjects.map((project, index) => <article className="project-case" key={project.name}><div className="project-case-image" style={{ backgroundImage: `linear-gradient(115deg,rgba(10,31,22,.68),rgba(10,31,22,.10)),url(${project.image})` }}><span>{project.label}</span><b>{String(index + 1).padStart(2, "0")}</b></div><div><small>{project.label}</small><h2>{project.name}</h2><p>{project.description}</p><p className="flow-free-note">{project.freeAccess}</p><div className="project-case-links"><a className="button" href={project.primaryUrl} target={project.primaryUrl.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.primaryLabel} <span>↗</span></a>{"repositoryUrl" in project && project.repositoryUrl && <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">Kod na GitHubie <span>↗</span></a>}</div></div></article>)}</div></section>
    <section className="section operations-section"><div className="shell operations-grid"><div><span className="section-no">MODUŁY KONTROLNE</span><h2>Osobne zaplecze dla produkcji i transportu.</h2><p>Publiczne demonstracje PrintFlow Control Center oraz TransportFlow Control Center skupiają się na kontroli procesu. To aplikacje Python i SQLite z danymi demonstracyjnymi, przeznaczone do uruchomienia lokalnego.</p></div><div><a href="https://github.com/lukaszst-cz/printflow-control-center" target="_blank" rel="noreferrer">PrintFlow Control Center ↗</a><a href="https://github.com/lukaszst-cz/transportflow-control-center" target="_blank" rel="noreferrer">TransportFlow Control Center ↗</a></div></div></section>
    <section className="section shell next-project"><span className="section-no">PODOBNY PROCES</span><h2>Najpierw mapa pracy, potem narzędzie.</h2><p>Jeżeli informacje giną między telefonem, arkuszem, dokumentem i e-mailem, zaczynamy od ustalenia przebiegu sprawy.</p><Link className="button" href="/kontakt">Opisz swój proces <span>↗</span></Link></section>
    <section className="section shell flow-back-link"><span className="section-no">WIĘCEJ NARZĘDZI</span><h2>Szukasz programu lub narzędzia do samodzielnego sprawdzenia?</h2><p>W Strefie Free znajdziesz Aktywnik+, DocPilot, CzyToŚciema? oraz opisy pozostałych projektów.</p><Link className="button" href="/praktyczne-narzedzia#strefa-free">Przejdź do Strefy Free <span>↗</span></Link></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
