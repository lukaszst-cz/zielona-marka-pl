import type { Metadata } from "next";
import Link from "../../SafeLink";
import { GuideAuthor, GuideBreadcrumbs } from "../../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "Jak uporządkować zapytania klientów bez rozbudowanego CRM?",
  description: "Prosty proces obsługi klientów: formularz, status zapytania, właściciel sprawy, termin odpowiedzi i przypomnienie. Praktyczny poradnik dla małej firmy.",
  alternates: { canonical: "/poradnik/jak-uporzadkowac-zapytania-klientow" },
  openGraph: { type: "article", url: "/poradnik/jak-uporzadkowac-zapytania-klientow", title: "Jak uporządkować zapytania klientów bez rozbudowanego CRM? | Zielona Marka", description: "Prosty proces obsługi klientów: formularz, status zapytania, właściciel sprawy, termin odpowiedzi i przypomnienie. Praktyczny poradnik dla małej firmy.", images: [{ url: "/og-poradniki-zielona-marka.png", width: 1200, height: 630, alt: "Blog Zielonej Marki – poradniki dla firm" }], publishedTime: "2026-10-14", modifiedTime: "2026-10-14" },
  twitter: { card: "summary_large_image", title: "Jak uporządkować zapytania klientów bez rozbudowanego CRM? | Zielona Marka", description: "Prosty proces obsługi klientów: formularz, status zapytania, właściciel sprawy, termin odpowiedzi i przypomnienie. Praktyczny poradnik dla małej firmy.", images: ["/og-poradniki-zielona-marka.png"] },
};

const steps = [
  ["01", "Zbieraj minimum użytecznych danych", "Imię, sposób kontaktu, rodzaj usługi, oczekiwany termin i krótki opis potrzeby. Dodatkowe pola dodawaj tylko wtedy, gdy naprawdę wpływają na wycenę."],
  ["02", "Nadaj zapytaniu jeden status", "Na początek wystarczy zestaw: nowe, do wyjaśnienia, wycenione, oczekuje na decyzję, przyjęte, zamknięte. Status powinien jasno wskazywać, kto wykonuje następne działanie."],
  ["03", "Zapisz termin następnego kontaktu", "Sama etykieta „wysłana wycena” nie wystarczy. Dodaj datę przypomnienia, osobę odpowiedzialną i ostatnią odpowiedź od klienta."],
  ["04", "Przygotuj krótkie szablony odpowiedzi", "Zapytanie o brakujące szczegóły, potwierdzenie otrzymania zgłoszenia i podsumowanie zakresu. Szablony oszczędzają czas, ale powinny umożliwiać normalną rozmowę."],
  ["05", "Kontroluj źródła zapytań", "Warto wiedzieć, czy klient trafił przez Google, polecenie, formularz czy telefon. Sprawdzaj przede wszystkim wartościowe zapytania i zawarte zlecenia, a nie samą liczbę kliknięć."],
] as const;

const questions = [
  ["Czy mała firma od razu potrzebuje CRM?", "Nie. Jeżeli liczba zgłoszeń jest niewielka, prosta tabela z jasnymi statusami i terminami często wystarczy. CRM staje się przydatny, gdy zgłoszenia pochodzą z wielu kanałów albo bierze w nich udział kilka osób."],
  ["Czy da się połączyć formularz ze stroną i CRM?", "Tak. Po zatwierdzeniu pól formularza można przekazywać zgłoszenia do małego panelu, przypisywać status i termin kontaktu. Zakres zależy od technologii strony."],
  ["Co z danymi osobowymi?", "Zbieraj tylko potrzebne dane, określ cel, podstawę i okres przechowywania, zabezpiecz dostęp oraz zadbaj o obowiązki informacyjne. W razie wątpliwości dotyczących RODO ustal zasady z odpowiednim specjalistą."],
] as const;

export default function ClientInquiriesGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Jak uporządkować zapytania klientów bez rozbudowanego CRM?",
    datePublished: "2026-10-14",
    dateModified: "2026-10-14",
    author: { "@id": "https://zielona-marka.pl/#lukasz-st-cz" },
    publisher: { "@id": "https://zielona-marka.pl/#business" },
    mainEntityOfPage: "https://zielona-marka.pl/poradnik/jak-uporzadkowac-zapytania-klientow",
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://zielona-marka.pl/poradnik" },
      { "@type": "ListItem", position: 3, name: "Jak uporządkować zapytania klientów?", item: "https://zielona-marka.pl/poradnik/jak-uporzadkowac-zapytania-klientow" },
    ],
  };
  return <><SiteHeader /><main className="zm-public guide-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    <article>
      <header className="page-hero shell"><GuideBreadcrumbs current="Jak uporządkować zapytania klientów?" /><span className="eyebrow"><i />PORADNIK DLA FIRM · 14.10.2026 · 6 MIN</span>
        <h1>Zapytania klientów nie powinny ginąć <em>między skrzynką a telefonem.</em></h1>
        <p>Klient prosi o wycenę, ktoś oddzwania, potem przychodzi kolejna wiadomość. Bez wspólnego miejsca na statusy i terminy łatwo zgubić kolejne działanie. Nie trzeba jednak zaczynać od wielkiego systemu.</p>
        <div className="hero-actions"><Link className="button" href="/maly-crm-dla-firm">Zobacz mały CRM ↗</Link><Link className="text-link" href="/poradnik">Wróć do bloga ↗</Link></div>
      </header>
      <section className="section shell"><div className="section-head"><div><span className="section-no">PROSTY PROCES SPRZEDAŻOWY</span><h2>Pięć kroków, które mogą uporządkować pracę.</h2></div><p>Zamiast rozbudowanego wdrożenia zacznij od informacji potrzebnych do udzielenia odpowiedzi i sprawdzenia, czy klient otrzymał propozycję.</p></div>
        <div className="about-proof-list">{steps.map(([no, title, description]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section className="section mini-shop-section"><div className="shell mini-shop-grid">
        <div><span className="section-no">PRZYKŁADOWY OBIEG ZAPYTANIA</span><h2>Formularz, wycena i następny krok.</h2>
          <p>Na stronie klient podaje podstawowe informacje o usłudze. Zgłoszenie trafia do panelu, otrzymuje status „nowe” i osobę odpowiedzialną. Po wysłaniu oferty ustawiany jest termin kontaktu. Gdy sprawa zostanie zamknięta, pozostaje historia podjętych działań.</p>
          <Link className="button" href="/usprawnienia-firmy">Zobacz usprawnienia firmy ↗</Link>
        </div>
        <div><h3>Minimalne pola w rejestrze</h3><ul className="check-list">
          <li>Nazwa lub identyfikator klienta i kontakt</li><li>Data i kanał otrzymania zapytania</li>
          <li>Rodzaj usługi oraz krótki opis potrzeby</li><li>Osoba odpowiedzialna i status</li>
          <li>Termin następnego działania</li><li>Wynik i uwagi po zakończeniu sprawy</li>
        </ul></div>
      </div></section>
      <section className="section shell faq-page"><div className="section-head"><div><span className="section-no">PYTANIA PRAKTYCZNE</span><h2>Czy CRM musi być skomplikowany?</h2></div></div>
        <div className="faq-list">{questions.map(([q, a], i) => <details key={q} open={i === 0}><summary><span>{String(i + 1).padStart(2, "0")}</span>{q}<i>+</i></summary><p>{a}</p></details>)}</div>
      </section>
            <div className="shell zm-article-author-wrap"><GuideAuthor published="14 października 2026" updated="14 października 2026" /></div>
      <section className="section guide-cta"><div className="shell"><span className="section-no">UPORZĄDKOWANE ZGŁOSZENIA</span>
        <h2>Chcesz prostszy proces od pierwszego kontaktu do wyceny?</h2>
        <p>Możemy zacząć od poprawienia formularza albo zbudować lekki rejestr klientów i statusów. Technologię dobieramy do sposobu pracy firmy.</p>
        <Link className="button" href="/kontakt?pakiet=Formularz%20i%20obsluga%20zapytan">Porozmawiajmy o potrzebach ↗</Link></div></section>
    </article>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
