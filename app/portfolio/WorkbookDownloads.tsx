import Link from "../SafeLink";
import { findPortfolioItem, type PortfolioItem } from "./catalog";
import { relatedWorkbookIds } from "./relatedWorkbooks";

type DownloadableWorkbook = {
  url: string;
  title: string;
  description: string;
  slug?: string;
  format?: "XLSX" | "PDF";
};

export default function WorkbookDownloads({ item }: { item: PortfolioItem }) {
  if (item.category === "excel") return null;

  const linked = relatedWorkbookIds(item)
    .map(findPortfolioItem)
    .filter((workbook): workbook is PortfolioItem => Boolean(workbook?.downloadUrl));

  const files: DownloadableWorkbook[] = [];

  if (item.downloadUrl && !linked.some(workbook => workbook.downloadUrl === item.downloadUrl)) {
    files.push({
      url: item.downloadUrl,
      title: item.slug === "centrum-budowlane-pwa" ? "Model finansowy Centrum Budowlanego" : "Przebieg pracy w Excelu",
      description: item.slug === "centrum-budowlane-pwa"
        ? "Przykładowe koszty zespołu i floty, marże oraz wynik finansowy."
        : "Przykładowy arkusz pokazujący możliwy przebieg pracy związany z tym projektem.",
    });
  }

  if (item.workflowUrl) {
    files.push({
      url: item.workflowUrl,
      title: item.workflowLabel ?? "Kompletny Workflow 360",
      description: "Dokumentacja pełnego przebiegu pracy, zakresu modułów, finansów, kontroli i etapów przyszłego wdrożenia.",
      format: "PDF",
    });
  }

  for (const workbook of linked) {
    if (!workbook.downloadUrl || files.some(file => file.url === workbook.downloadUrl)) continue;
    files.push({
      url: workbook.downloadUrl,
      title: workbook.title,
      description: workbook.summary,
      slug: workbook.slug,
    });
  }

  if (files.length === 0) return null;

  return <section id="zmp-arkusze" className="shell zmp-related-workbooks zmx-reveal" aria-labelledby="zmp-arkusze-title">
    <span className="zmp-overline">MATERIAŁY DO POBRANIA</span>
    <h2 id="zmp-arkusze-title">{item.workflowUrl ? "Workflow 360 i Excel do pobrania" : "Arkusze Excel do tego projektu"}</h2>
    <p>Pobierz przykładowe pliki i sprawdź, jak można uporządkować związane z projektem zadania, kalkulacje lub rozliczenia.</p>
    <div className="zmp-workbooks-list">
      {files.map(file => <article key={file.url} className="zmp-workbook-row">
        <span aria-hidden="true">{file.format ?? "XLSX"}</span>
        <div className="zmp-workbook-description">
          <strong>{file.title}</strong>
          <p>{file.description}</p>
          {file.slug && <Link href={`/portfolio/${file.slug}`}>Zobacz opis arkusza ↗</Link>}
        </div>
        <a className="zmp-btn zmp-btn-outline" href={file.url} download>Pobierz {file.format ?? "XLSX"} ↓</a>
      </article>)}
    </div>
    <p className="zmp-workbook-note">Pliki zawierają dane przykładowe. Pokazane arkusze nie są automatycznie połączone z witrynami ani wdrożone u firm przedstawionych w portfolio.</p>
  </section>;
}
