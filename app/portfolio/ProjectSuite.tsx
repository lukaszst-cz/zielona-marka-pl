import Image from "next/image";
import type { PortfolioItem } from "./catalog";

export default function ProjectSuite({ item }: { item: PortfolioItem }) {
  if (!item.demoUrl || !item.pwaUrl) return null;

  const eltravia = item.slug === "eltravia";
  const siteDescription = eltravia
    ? "Rozbudowana witryna hurtowni: katalog, gazetka produktowa, kalkulator kabli i oferta dla instalatorów."
    : "Prezentacja studia detailingu: zakres usług, fotografie efektów, wycena i kontakt.";
  const appDescription = eltravia
    ? "CRM B2B, kontrahenci, oferty, zamówienia, rezerwacje, PZ/WZ, portal instalatora i program partnerski."
    : "CRM dla studia: zapytania, klienci, pojazdy, etapy sprzedaży i program lojalnościowy BLACK HARBOR CLUB.";

  return (
    <section className="shell zmp-project-suite zmx-reveal" aria-labelledby="zmp-project-suite-heading" data-project={item.slug}>
      <div className="zmp-project-suite-heading">
        <div>
          <span className="zmp-overline">JEDEN PROJEKT / DWIE APLIKACJE</span>
          <h2 id="zmp-project-suite-heading">Strona WWW i aplikacja PWA</h2>
          <p>Obie części są dostępne do sprawdzenia. Wybierz prezentację oferty albo otwórz panel i przetestuj jego funkcje.</p>
        </div>
      </div>
      <div className="zmp-project-suite-options">
        <article>
          <span className="zmp-project-suite-number">01 / STRONA WWW</span>
          <h3>Witryna i oferta</h3>
          <p>{siteDescription}</p>
          <a className="zmp-btn zmp-btn-strong" href={item.demoUrl} target="_blank" rel="noopener noreferrer">
            Otwórz stronę WWW ↗
          </a>
        </article>
        <article>
          <span className="zmp-project-suite-number">02 / APLIKACJA PWA</span>
          <h3>Panel operacyjny 360</h3>
          <p>{appDescription}</p>
          <div className="zmp-project-suite-actions">
            <a className="zmp-btn zmp-btn-strong" href={item.pwaUrl} target="_blank" rel="noopener noreferrer">
              Przetestuj aplikację ↗
            </a>
            {item.pwaArchiveUrl && (
              <a className="zmp-btn zmp-btn-outline" href={item.pwaArchiveUrl} download>
                Pobierz pliki PWA (ZIP) ↓
              </a>
            )}
          </div>
          <p className="zmp-project-suite-install">Na telefonie otwórz aplikację w przeglądarce i dodaj ją do ekranu głównego.</p>
        </article>
      </div>
      {(item.pwaPreviewDesktop || item.pwaPreviewMobile) && (
        <div className="zmp-project-suite-previews" aria-label="Widoki aplikacji PWA">
          {item.pwaPreviewDesktop && <figure>
            <Image src={item.pwaPreviewDesktop} alt={`Widok aplikacji PWA ${item.title} na komputerze`} width={1200} height={750} sizes="(max-width: 860px) 100vw, 65vw" />
            <figcaption>Panel na komputerze</figcaption>
          </figure>}
          {item.pwaPreviewMobile && <figure>
            <Image src={item.pwaPreviewMobile} alt={`Widok aplikacji PWA ${item.title} na telefonie`} width={420} height={860} sizes="(max-width: 860px) 70vw, 28vw" />
            <figcaption>Widok na telefonie</figcaption>
          </figure>}
        </div>
      )}
      <p className="zmp-project-suite-note">Demonstracja na przykładowych danych. Aplikacja zapisuje informacje lokalnie w przeglądarce. Nie ma kont pracowników, współdzielonej bazy ani integracji finansowych. Szczegółowy Workflow 360 oraz kalkulator Excel pobierzesz poniżej tej sekcji.</p>
    </section>
  );
}
