import type { Metadata } from "next";
import Link from "../../SafeLink";
import RelatedServices from "../../RelatedServices";
import { GuideAuthor, GuideBreadcrumbs, GuideFaq } from "../../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "Co powinna mieć strona firmy usługowej?",
  description: "Praktyczny przewodnik dla firmy usługowej: zakres prac, obszar działania, realizacje, proces wyceny, formularz z lokalizacją i zdjęciami oraz lokalne SEO.",
  alternates: { canonical: "/poradnik/co-powinna-miec-strona-firmy-uslugowej" },
  openGraph: {
    type: "article",
    title: "Co powinna mieć strona firmy usługowej?",
    description: "Zakres usług, realizacje, wycena, formularz, obszar działania i lokalna widoczność — bez zbędnych elementów.",
    url: "/poradnik/co-powinna-miec-strona-firmy-uslugowej",
    publishedTime: "2026-10-07",
    modifiedTime: "2026-10-07",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

const elements = [
  ["01", "Konkretny zakres usług", "Pierwszy ekran powinien jasno mówić, czym firma się zajmuje i dla kogo pracuje. Zamiast ogólnego hasła „kompleksowe usługi” lepiej wymienić rzeczywiste specjalizacje: remonty łazienek, instalacje, klimatyzacja, hydraulika, elektryka, serwis albo inny konkretny zakres."],
  ["02", "Obszar działania", "Klient powinien szybko sprawdzić, czy firma dojedzie do jego miejscowości lub dzielnicy. Warto podać realny zasięg, a przy usługach wyjazdowych również zasady dojazdu, jeśli wpływają na cenę lub minimalny zakres zlecenia."],
  ["03", "Realizacje z krótkim opisem", "Same zdjęcia są lepsze niż brak dowodów, ale więcej wartości daje zdjęcie z informacją: co wykonano, jaki był zakres, gdzie realizowano zlecenie i jaki problem rozwiązano. Nie trzeba publikować danych klienta ani dokładnego adresu."],
  ["04", "Proces wyceny", "Klient chce wiedzieć, co dzieje się po wysłaniu zapytania. Warto opisać, czy najpierw odbywa się rozmowa, oględziny, przesłanie zdjęć, czy orientacyjna wycena zdalna. Jasny proces ogranicza przypadkowe zapytania i oczekiwania, których firma nie może spełnić."],
  ["05", "Formularz z informacjami potrzebnymi do oceny", "Dobry formularz powinien zbierać tylko dane, które pomagają zrobić kolejny krok: typ usługi, lokalizację, przybliżony zakres lub metraż, preferowany termin oraz możliwość dodania zdjęć. Dzięki temu firma może przygotować się do rozmowy lub zdecydować, czy potrzebne są oględziny."],
  ["06", "Czynniki wpływające na cenę", "Nie każdą usługę da się wycenić online. Można jednak wyjaśnić, od czego zależy koszt: zakres prac, metraż, materiały, dojazd, stopień trudności, pilność albo stan istniejącej instalacji. To lepsze niż publikowanie jednej kwoty dla bardzo różnych zleceń."],
  ["07", "Dowody zaufania", "Prawdziwe opinie, zdjęcia zespołu, uprawnienia, certyfikaty, ubezpieczenie lub opis doświadczenia mają sens wtedy, gdy są aktualne i możliwe do zweryfikowania. Nie warto tworzyć anonimowych rekomendacji tylko po to, by zapełnić sekcję."],
  ["08", "Telefon i kontakt mobilny", "Przy pilnych usługach telefon nadal jest ważny. Powinien być klikalny i łatwo dostępny na smartfonie. Przy większych zleceniach formularz lub WhatsApp mogą zebrać więcej danych bez długiej rozmowy na początku."],
  ["09", "Lokalne SEO oparte na prawdziwym zasięgu", "Strona powinna jasno łączyć usługę z miejscem, w którym firma rzeczywiście działa. Profil Firmy Google, dane kontaktowe, lokalne podstrony i realizacje powinny być spójne. Sama podmiana nazwy miasta w kilku kopiach tej samej strony nie tworzy wartościowej lokalnej treści."],
] as const;

const faq = [
  ["Czy każda usługa potrzebuje osobnej podstrony?", "Nie. Osobne strony mają sens wtedy, gdy usługi różnią się intencją klienta, zakresem i pytaniami. Przy kilku prostych usługach jedna dobrze uporządkowana strona może wystarczyć."],
  ["Czy trzeba publikować cennik?", "Nie zawsze. Gdy usługa ma stałą cenę, warto ją pokazać. Przy zleceniach indywidualnych lepiej opisać czynniki wpływające na koszt i sposób przygotowania wyceny."],
  ["Jakie pola powinien mieć formularz wyceny?", "Najczęściej: rodzaj usługi, lokalizacja, krótki opis, przybliżony zakres lub metraż, preferowany termin i dane kontaktowe. Zdjęcia warto dodać tylko wtedy, gdy pomagają w pierwszej ocenie."],
  ["Czy realizacje powinny mieć lokalizację?", "Można podawać miasto lub dzielnicę, jeżeli nie narusza to prywatności klienta. Lokalny kontekst pomaga użytkownikowi zobaczyć, że firma pracuje w jego rejonie."],
  ["Czy strona wystarczy do lokalnego SEO?", "Nie. Strona jest jednym z elementów. Ważne są też Profil Firmy Google, spójne dane, opinie, realne realizacje i konsekwentne budowanie widoczności w obszarze, w którym firma faktycznie działa."],
] as const;

export default function ServiceBusinessGuidePage() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Co powinna mieć strona firmy usługowej?",
    description: metadata.description,
    image: "https://zielona-marka.pl/og.jpg",
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    author: { "@id": "https://zielona-marka.pl/#lukasz-staniewicz" },
    publisher: { "@id": "https://zielona-marka.pl/#business" },
    mainEntityOfPage: "https://zielona-marka.pl/poradnik/co-powinna-miec-strona-firmy-uslugowej",
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
      { "@type": "ListItem", position: 2, name: "Poradniki", item: "https://zielona-marka.pl/poradnik" },
      { "@type": "ListItem", position: 3, name: "Strona firmy usługowej" },
    ],
  };
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return <><SiteHeader /><main className="zm-public guide-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    <article>
      <header className="page-hero shell">
        <GuideBreadcrumbs current="Strona firmy usługowej" />
        <span className="eyebrow"><i />PORADNIK DLA FIRMY USŁUGOWEJ</span>
        <h1>Co powinna zawierać strona internetowa <em>firmy usługowej?</em></h1>
        <p>Dobra strona wykonawcy nie musi opowiadać całej historii firmy. Powinna szybko pokazać zakres prac, obszar działania, dowody wykonanych realizacji oraz sposób, w jaki klient może przekazać dane potrzebne do pierwszej wyceny.</p>
        <div className="hero-actions"><a className="button" href="#lista">Zobacz 9 elementów <span>↓</span></a><Link className="text-link" href="/strony-dla-firm-uslugowych">Zobacz ofertę dla firm usługowych <span>↗</span></Link></div>
      </header>

      <section className="section shell guide-intro">
        <div><span className="section-no">KLIENT SZUKA WYKONAWCY, NIE OGÓLNEGO HASŁA</span><h2>Najpierw musi sprawdzić, czy robisz dokładnie to, czego potrzebuje, i czy działasz w jego okolicy.</h2></div>
        <p>Przy usługach wyjazdowych decyzja często zaczyna się od trzech rzeczy: zakresu, lokalizacji i dostępnego terminu. Strona powinna uporządkować te informacje zanim klient zadzwoni albo wyśle zdjęcia.</p>
      </section>

      <section className="section guide-reasons" id="lista">
        <div className="shell">
          <div className="section-head"><div><span className="section-no">9 ELEMENTÓW STRONY FIRMY USŁUGOWEJ</span><h2>Każdy element powinien skracać drogę do dobrej wyceny.</h2></div><p>Najlepsza struktura zależy od procesu firmy. Inaczej pracuje hydraulik, inaczej ekipa remontowa, a jeszcze inaczej serwis klimatyzacji — ale podstawowe pytania klienta są podobne.</p></div>
          <ol>{elements.map(([number, title, text]) => <li key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="section shell guide-check">
        <div><span className="section-no">FORMULARZ DO WYCENY</span><h2>Najpierw zbierz informacje, które naprawdę pomagają ocenić zlecenie.</h2><p>Formularz nie powinien udawać pełnego kosztorysu. Ma dać firmie wystarczająco dużo danych, żeby zdecydować, czy można odpowiedzieć zdalnie, czy potrzebne są oględziny.</p></div>
        <ul>
          <li><b>1.</b> Rodzaj usługi lub problemu.</li>
          <li><b>2.</b> Miejscowość i adres albo dzielnica.</li>
          <li><b>3.</b> Przybliżony zakres, metraż lub liczba elementów.</li>
          <li><b>4.</b> Preferowany termin.</li>
          <li><b>5.</b> Zdjęcia lub pliki, jeśli pomagają w ocenie.</li>
        </ul>
      </section>

      <section className="section shell guide-intro">
        <div><span className="section-no">LOKALNA WIDOCZNOŚĆ</span><h2>Usługa + miejsce + dowód pracy daje więcej niż sama nazwa miasta.</h2></div>
        <p>Jeżeli firma działa lokalnie, warto pokazywać rzeczywiste realizacje, obsługiwane dzielnice i miejscowości oraz jasne zasady dojazdu. Lokalna podstrona powinna wnosić konkretny kontekst, a nie być kopią innej strony z podmienioną nazwą miasta.</p>
      </section>

      <GuideFaq items={faq} />
      <div className="shell"><GuideAuthor published="07.10.2026" updated="07.10.2026" /></div>

      <section className="section guide-cta"><div className="shell">
        <span className="section-no">CHCESZ LEPSZE ZAPYTANIA?</span>
        <h2>Połącz ofertę, obszar działania i formularz w jedną prostą ścieżkę.</h2>
        <p>Najpierw ustalamy, jakie dane są potrzebne przed wyceną. Potem dopiero projektujemy stronę i formularz, zamiast dokładać pola bez celu.</p>
        <Link className="button" href="/strony-dla-firm-uslugowych">Strony dla firm usługowych <span>↗</span></Link>
      </div></section>
    </article>
    <RelatedServices items={[
      { href: "/strony-dla-firm-uslugowych", label: "Strona dla firmy usługowej", text: "Zobacz rozwiązanie z ofertą, obszarem działania i formularzem do pierwszej wyceny." },
      { href: "/modernizacja-strony", label: "Modernizacja obecnej strony", text: "Sprawdź, co warto poprawić, jeśli obecna strona już działa, ale nie daje dobrych zapytań." },
      { href: "/maly-crm-dla-firm", label: "Porządek po zapytaniu", text: "Uporządkuj kontakty, wyceny, terminy i statusy, gdy formularzy zaczyna być więcej." },
    ]} />
  </main><QuickWhatsApp /><SiteFooter /></>;
}
