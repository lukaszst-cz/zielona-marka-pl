import type { Metadata } from "next";
import Link from "../../SafeLink";
import RelatedServices from "../../RelatedServices";
import { GuideAuthor, GuideBreadcrumbs, GuideFaq } from "../../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "Co powinna zawierać strona warsztatu?",
  description: "Praktyczna lista dla warsztatu i detailingu: usługi, telefon, lokalizacja, formularz z danymi auta, zdjęcia, opinie i lokalna widoczność.",
  alternates: { canonical: "/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac" },
  openGraph: {
    type: "article",
    title: "Co powinna zawierać strona internetowa warsztatu?",
    description: "Praktyczna lista elementów strony warsztatu samochodowego i studia detailingu.",
    url: "/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac",
    publishedTime: "2026-10-07",
    modifiedTime: "2026-10-07",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

const elements = [
  ["01", "Zakres usług napisany po ludzku", "Klient powinien szybko sprawdzić, czy wykonujesz dokładnie tę usługę, której potrzebuje. Zamiast jednego ogólnego hasła „mechanika pojazdowa” pokaż najważniejsze kategorie: diagnostyka, hamulce, zawieszenie, klimatyzacja, serwis olejowy, wulkanizacja, detailing albo inne realne specjalizacje warsztatu."],
  ["02", "Telefon widoczny od pierwszego ekranu", "W motoryzacji część spraw jest pilna. Klikalny numer telefonu powinien być łatwy do znalezienia na telefonie, bez szukania go w stopce. Formularz nie ma zastępować rozmowy — ma pomóc tam, gdzie do oceny potrzebne są dodatkowe informacje."],
  ["03", "Lokalizacja, dojazd i godziny", "Adres, mapa, godziny pracy oraz informacja o zasadach przyjęcia auta ograniczają pytania, na które strona może odpowiedzieć od razu. Jeżeli warsztat obsługuje kilka miejscowości albo oferuje usługę z dojazdem, warto podać rzeczywisty zasięg."],
  ["04", "Formularz, który zbiera właściwe dane", "Dobry formularz może zapytać o markę i model auta, rodzaj problemu lub usługę, preferowany termin oraz dane kontaktowe. Przy wycenach przydają się również zdjęcia. Dzięki temu pierwsza odpowiedź może być konkretniejsza niż „proszę zadzwonić”."],
  ["05", "Orientacyjne zasady ceny", "Nie każdą naprawę da się wycenić przed diagnozą. Mimo to warto wyjaśnić, które usługi mają stałą cenę lub widełki, a które wymagają oględzin. Jasne zasady są lepsze niż obietnica ceny, której później nie da się utrzymać."],
  ["06", "Prawdziwe zdjęcia i dowody pracy", "Zdjęcia warsztatu, stanowisk, sprzętu i wykonanych prac pomagają klientowi ocenić, czy firma wygląda wiarygodnie. Opinie powinny pochodzić z prawdziwego źródła — najlepiej prowadzić do Profilu Firmy Google zamiast tworzyć anonimowe cytaty bez możliwości weryfikacji."],
  ["07", "Wersja mobilna bez przeszkód", "Kierowca często trafia na stronę z telefonu. Numer, adres, usługi i przycisk kontaktu muszą działać wygodnie na małym ekranie. Formularz powinien być krótki i nie wymagać informacji, których klient nie ma przy sobie."],
  ["08", "Lokalna widoczność połączona z Profilem Firmy Google", "Strona i Profil Firmy Google pełnią różne role. Profil pomaga znaleźć firmę w wynikach lokalnych i mapach, a strona daje miejsce na pełny zakres usług, zasady kontaktu, zdjęcia, formularz i szczegółowe odpowiedzi. Dane firmy powinny być spójne w obu miejscach."],
] as const;

const faq = [
  ["Czy warsztat potrzebuje osobnej strony dla każdej usługi?", "Nie zawsze. Jeżeli warsztat ma kilka najważniejszych specjalizacji i każda z nich odpowiada na inne pytania klientów, osobne podstrony mogą mieć sens. Przy mniejszej ofercie jedna dobrze uporządkowana strona może być wystarczająca."],
  ["Czy formularz powinien zastąpić telefon?", "Nie. W sprawach pilnych telefon jest często najszybszy. Formularz jest szczególnie przydatny przy wycenach i zgłoszeniach, w których potrzebne są dane auta, opis problemu, termin albo zdjęcia."],
  ["Czy warto pokazywać ceny usług warsztatu?", "Warto pokazać ceny lub widełki tam, gdzie zakres jest przewidywalny. Przy naprawach wymagających diagnozy lepiej jasno opisać sposób ustalania ceny niż publikować kwotę, która może wprowadzać w błąd."],
  ["Czy sama wizytówka Google wystarczy?", "Profil Firmy Google jest bardzo ważny dla lokalnej widoczności, ale strona daje więcej miejsca na opis usług, proces, zdjęcia, formularze i treści odpowiadające na konkretne potrzeby klientów. Najlepiej, gdy oba elementy są spójne."],
  ["Jakie dane warto zbierać przed oddzwonieniem?", "Najczęściej wystarczą marka i model auta, rodzaj usługi lub problemu, preferowany termin oraz telefon lub e-mail. Przy niektórych usługach warto umożliwić dodanie zdjęć."],
] as const;

export default function WorkshopWebsiteGuidePage() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Co powinna zawierać strona internetowa warsztatu?",
    description: metadata.description,
    image: "https://zielona-marka.pl/og.jpg",
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    author: { "@id": "https://zielona-marka.pl/#lukasz-staniewicz" },
    publisher: { "@id": "https://zielona-marka.pl/#business" },
    mainEntityOfPage: "https://zielona-marka.pl/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac",
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
      { "@type": "ListItem", position: 2, name: "Poradniki", item: "https://zielona-marka.pl/poradnik" },
      { "@type": "ListItem", position: 3, name: "Strona internetowa dla warsztatu" },
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
        <GuideBreadcrumbs current="Strona internetowa dla warsztatu" />
        <span className="eyebrow"><i />PORADNIK DLA WARSZTATU I DETAILINGU</span>
        <h1>Co powinna zawierać strona internetowa <em>warsztatu?</em></h1>
        <p>Dobra strona warsztatu nie musi być rozbudowanym portalem. Powinna szybko odpowiedzieć na pytania kierowcy: czy wykonujesz potrzebną usługę, gdzie jesteś, jak się skontaktować i jakie informacje podać, żeby rozmowa zaczęła się od konkretów.</p>
        <div className="hero-actions"><a className="button" href="#lista">Zobacz 8 elementów <span>↓</span></a><Link className="text-link" href="/strony-dla-warsztatow">Zobacz ofertę dla warsztatów <span>↗</span></Link></div>
      </header>

      <section className="section shell guide-intro">
        <div><span className="section-no">NAJPIERW POTRZEBA KLIENTA</span><h2>Strona ma skrócić drogę od wyszukania usługi do rozmowy z warsztatem.</h2></div>
        <p>Klient nie powinien zgadywać, czy naprawiasz jego typ usterki, czy przyjmujesz konkretną markę auta ani gdzie znajduje się warsztat. Najważniejsze informacje powinny pojawić się zanim użytkownik zacznie przeglądać galerię albo historię firmy.</p>
      </section>

      <section className="section guide-reasons" id="lista">
        <div className="shell">
          <div className="section-head"><div><span className="section-no">8 ELEMENTÓW DOBREJ STRONY WARSZTATU</span><h2>Każdy element powinien odpowiadać na konkretne pytanie klienta.</h2></div><p>Nie wszystko musi być osobną podstroną. Ważniejsze jest to, żeby informacje były kompletne, aktualne i łatwe do znalezienia na telefonie.</p></div>
          <ol>{elements.map(([number, title, text]) => <li key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="section shell guide-check">
        <div><span className="section-no">FORMULARZ WARSZTATOWY</span><h2>Nie pytaj klienta o wszystko. Pytaj o to, co pomaga zrobić następny krok.</h2><p>Formularz ma przygotować rozmowę, a nie być egzaminem. Im większa liczba obowiązkowych pól, tym większe ryzyko, że kierowca zrezygnuje i po prostu zadzwoni gdzie indziej.</p></div>
        <ul>
          <li><b>1.</b> Marka i model samochodu.</li>
          <li><b>2.</b> Usługa albo krótki opis problemu.</li>
          <li><b>3.</b> Preferowany termin.</li>
          <li><b>4.</b> Telefon lub e-mail do odpowiedzi.</li>
          <li><b>5.</b> Zdjęcia tylko wtedy, gdy rzeczywiście pomagają w ocenie.</li>
        </ul>
      </section>

      <section className="section shell guide-intro">
        <div><span className="section-no">STRONA + PROFIL FIRMY GOOGLE</span><h2>Nie wybieraj jednego. Połącz oba miejsca.</h2></div>
        <p>Profil Firmy Google pomaga pokazać lokalizację, godziny, opinie i podstawowe dane firmy w wynikach lokalnych. Strona może rozwinąć ofertę, opisać specjalizacje, pokazać zdjęcia, odpowiedzieć na pytania i zebrać zgłoszenie. Numer telefonu, adres, godziny i adres strony powinny być aktualne i spójne.</p>
      </section>

      <GuideFaq items={faq} />
      <div className="shell"><GuideAuthor published="07.10.2026" updated="07.10.2026" /></div>

      <section className="section guide-cta"><div className="shell">
        <span className="section-no">CHCESZ SPRAWDZIĆ SWOJĄ STRONĘ?</span>
        <h2>Zacznij od najważniejszej przeszkody.</h2>
        <p>Jeżeli warsztat ma już stronę, sprawdzimy najpierw wersję mobilną, zakres usług, kontakt i drogę klienta do zgłoszenia. Jeżeli strony jeszcze nie ma, ustalimy prosty zakres startowy.</p>
        <Link className="button" href="/strony-dla-warsztatow">Strony dla warsztatów <span>↗</span></Link>
      </div></section>
    </article>
    <RelatedServices items={[
      { href: "/strony-dla-warsztatow", label: "Strona dla warsztatu", text: "Zobacz zakres rozwiązania z formularzem dopasowanym do branży auto." },
      { href: "/strony-internetowe", label: "Widoczność lokalna", text: "Sprawdź, jak łączyć stronę z lokalnym obszarem działania firmy." },
      { href: "/modernizacja-strony", label: "Modernizacja strony", text: "Masz już serwis? Sprawdź, kiedy wystarczą poprawki, a kiedy lepsza będzie nowa wersja." },
    ]} />
  </main><QuickWhatsApp /><SiteFooter /></>;
}
