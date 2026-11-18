import type { Metadata } from "next";
import Link from "../SafeLink";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import { termsDate, termsSections } from "./terms";

export const metadata: Metadata = {
  title: "Warunki współpracy",
  description: "Szczegółowe warunki współpracy Zielona Marka: zakres pakietów, teksty, poprawki, płatności 30/70, prawa autorskie, hosting, domena, przekazanie strony, faktury Bizky i odpowiedzialność.",
  alternates: { canonical: "/warunki-wspolpracy" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <><SiteHeader /><main className="zm-public legal shell zm-terms">
    <span className="section-no">WARUNKI WSPÓŁPRACY · OBOWIĄZUJĄ OD {termsDate}</span>
    <h1>Warunki współpracy</h1>
    <p className="legal-lead">Opisujemy tu wszystko, co ustalamy z Klientem przy tworzeniu strony: co jest w cenie, czego nie ma, jak liczymy podstrony i teksty, kiedy i ile płacisz, czyja jest strona i co dzieje się po publikacji. Dokument dotyczy firm i działalności gospodarczych.</p>
    <nav className="zm-terms-toc" aria-label="Spis treści"><b>Spis treści</b><ol>{termsSections.map((section, index) => <li key={section.title}><a href={"#p" + (index + 1)}>{section.title}</a></li>)}</ol></nav>
    {termsSections.map((section, index) => <section key={section.title} id={"p" + (index + 1)}>
      <h2>{index + 1}. {section.title}</h2>
      <ol style={{ listStyle: "none", padding: 0 }}>{section.items.map((item, itemIndex) => <li key={itemIndex}><b>{index + 1}.{itemIndex + 1}.</b> {item}</li>)}</ol>
    </section>)}
    <p className="legal-note">Wersja z dnia {termsDate}. Powiązane dokumenty: <Link href="/oferta">oferta i cennik</Link>, <Link href="/cennik-dodatkow">cennik dodatków</Link>, <Link href="/polityka-prywatnosci">polityka prywatności</Link>. Pytania: kontakt@zielona-marka.pl.</p>
    <Link className="button" href="/kontakt">Zapytaj o wycenę <span>↗</span></Link>
  </main><SiteFooter /></>;
}
