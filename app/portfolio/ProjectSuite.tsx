import Image from "next/image";
import type { PortfolioItem } from "./catalog";

export default function ProjectSuite({ item }: { item: PortfolioItem }) {
  if (!item.pwaUrl) return null;

  const description = item.slug === "eltravia"
    ? "Uzupełnienie witryny hurtowni: panel do testowania CRM, ofert, zamówień i pracy magazynu."
    : "Uzupełnienie witryny studia detailingu: CRM klientów i pojazdów oraz program BLACK HARBOR CLUB.";

  return (
    <section className="shell zmp-project-suite zmx-reveal" aria-labelledby="zmp-project-suite-heading">
      <span className="zmp-overline">DODATEK DO STRONY WWW</span>
      <h2 id="zmp-project-suite-heading">Aplikacja PWA do przetestowania</h2>
      <p>{description}</p>
      {item.pwaPreviewDesktop && (
        <figure className="zmp-project-suite-preview">
          <Image
            src={item.pwaPreviewDesktop}
            alt={`Panel aplikacji ${item.title} na komputerze`}
            width={1200}
            height={750}
            sizes="(max-width: 940px) 100vw, 940px"
          />
        </figure>
      )}
      <a className="zmp-btn zmp-btn-outline" href={item.pwaUrl} target="_blank" rel="noopener noreferrer">
        Przetestuj aplikację ↗
      </a>
      <p className="zmp-project-suite-note">Wersja pokazowa z lokalnym zapisem danych, bez wspólnej bazy i kont pracowników.</p>
    </section>
  );
}
