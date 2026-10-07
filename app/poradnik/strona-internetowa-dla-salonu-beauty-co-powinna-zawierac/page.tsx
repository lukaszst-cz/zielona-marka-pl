import type { Metadata } from "next";
import Link from "../../SafeLink";
import RelatedServices from "../../RelatedServices";
import { GuideAuthor, GuideBreadcrumbs, GuideFaq } from "../../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "Co powinna zawierać strona salonu beauty?",
  description: "Praktyczny przewodnik dla salonu beauty: oferta, cennik, efekty, rezerwacja, przygotowanie do wizyty, lokalne SEO oraz vouchery i produkty.",
  alternates: { canonical: "/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac" },
  openGraph: {
    type: "article",
    title: "Co powinna zawierać strona internetowa salonu beauty?",
    description: "Praktyczny przewodnik po stronie salonu beauty: oferta, rezerwacja, efekty, ceny i lokalna widoczność.",
    url: "/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac",
    publishedTime: "2026-10-07",
    modifiedTime: "2026-10-07",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

const elements = [
  ["01", "Oferta podzielona na konkretne zabiegi", "Klient powinien szybko znaleźć interesującą usługę bez przebijania się przez ogólny opis salonu. Warto grupować zabiegi logicznie: twarz, ciało, brwi i rzęsy, włosy, masaż albo inne rzeczywiste kategorie używane w danym miejscu."],
  ["02", "Cena albo jasna zasada wyceny", "Jeżeli zabieg ma stałą cenę, warto ją pokazać. Jeżeli koszt zależy od wariantu, czasu lub konsultacji, lepiej podać widełki i wyjaśnić, od czego zależą. Brak informacji o cenie często zmusza klienta do dodatkowej wiadomości tylko po to, żeby poznać podstawy."],
  ["03", "Efekty i zdjęcia, które można zweryfikować", "W branży beauty zdjęcia są ważnym dowodem jakości. Najlepiej pokazywać prawdziwe wnętrze, zespół oraz efekty wykonanych usług za zgodą klientów. Galeria nie powinna zastępować opisu zabiegu — ma go uzupełniać."],
  ["04", "Prosta droga do rezerwacji", "Jeżeli salon korzysta z Booksy lub innego systemu, strona może prowadzić do istniejącego kalendarza zamiast budować drugi. Jeżeli nie ma systemu rezerwacji, można użyć telefonu, WhatsApp albo krótkiego formularza prośby o termin."],
  ["05", "Przygotowanie do wizyty i informacje po zabiegu", "Klient często chce wiedzieć, czy trzeba coś zrobić przed wizytą, ile potrwa zabieg i czego unikać później. Takie informacje zmniejszają liczbę powtarzalnych pytań i pomagają klientowi przygotować się do usługi."],
  ["06", "Zespół i kwalifikacje bez przesady", "Przy usługach wymagających zaufania warto przedstawić osoby wykonujące zabiegi, ich specjalizacje i realne kwalifikacje. Nie trzeba tworzyć rozbudowanych życiorysów — ważniejsze są informacje, które pomagają wybrać właściwą osobę lub usługę."],
  ["07", "Adres, godziny i lokalna widoczność", "Salon działa lokalnie, dlatego adres, mapa, godziny, telefon i rzeczywisty obszar działania powinny być łatwo dostępne. Te same dane warto utrzymywać spójnie na stronie, w Profilu Firmy Google i w używanym systemie rezerwacji."],
  ["08", "Wersja mobilna i szybkie CTA", "Duża część klientów trafia na stronę z telefonu po przejściu z Google, Instagrama lub linku z profilu. Przycisk rezerwacji, telefon, cennik i oferta muszą być wygodne na małym ekranie."],
  ["09", "Vouchery i wybrane produkty jako osobna ścieżka", "Jeżeli salon sprzedaje vouchery, kosmetyki lub zestawy do pielęgnacji domowej, warto oddzielić tę ścieżkę od rezerwacji usług. Klient powinien od razu wiedzieć, co można kupić online, a co wymaga wizyty w salonie."],
] as const;

const faq = [
  ["Czy strona ma zastąpić Booksy?", "Nie musi. Jeżeli salon dobrze korzysta z Booksy lub innego kalendarza, strona może budować markę, wyjaśniać zabiegi i kierować do istniejącego systemu rezerwacji."],
  ["Czy warto pokazywać pełny cennik?", "Warto pokazać aktualne ceny usług o stałym zakresie. Przy zabiegach zależnych od wariantu lub konsultacji można podać widełki i wyjaśnić zasady wyceny."],
  ["Czy galeria efektów wystarczy zamiast opisów usług?", "Nie. Zdjęcia pomagają ocenić jakość i styl, ale klient nadal potrzebuje informacji o przebiegu zabiegu, cenie, czasie, przygotowaniu oraz sposobie rezerwacji."],
  ["Czy salon potrzebuje sklepu internetowego?", "Nie każdy. Mini sklep ma sens, gdy salon realnie sprzedaje vouchery, kosmetyki lub niewielką liczbę produktów. Nie warto budować rozbudowanego e-commerce bez realnego procesu sprzedaży i obsługi zamówień."],
  ["Jak połączyć stronę z lokalnym SEO?", "Najpierw zadbaj o spójne dane firmy, czytelne usługi, adres, godziny, Profil Firmy Google i strony odpowiadające na rzeczywiste potrzeby klientów. Lokalna widoczność rozwija się z czasem i zależy również od konkurencji oraz opinii."],
] as const;

export default function BeautyWebsiteGuidePage() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Co powinna zawierać strona internetowa salonu beauty?",
    description: metadata.description,
    image: "https://zielona-marka.pl/og.jpg",
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    author: { "@id": "https://zielona-marka.pl/#lukasz-staniewicz" },
    publisher: { "@id": "https://zielona-marka.pl/#business" },
    mainEntityOfPage: "https://zielona-marka.pl/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac",
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
      { "@type": "ListItem", position: 2, name: "Poradniki", item: "https://zielona-marka.pl/poradnik" },
      { "@type": "ListItem", position: 3, name: "Strona internetowa salonu beauty" },
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
        <GuideBreadcrumbs current="Strona internetowa salonu beauty" />
        <span className="eyebrow"><i />PORADNIK DLA SALONU BEAUTY</span>
        <h1>Co powinna zawierać strona internetowa <em>salonu beauty?</em></h1>
        <p>Dobra strona salonu nie ma konkurować z Instagramem ani kalendarzem rezerwacji. Powinna połączyć markę, ofertę, ceny, efekty, przygotowanie do wizyty i prostą drogę do rezerwacji w jednym miejscu.</p>
        <div className="hero-actions"><a className="button" href="#lista">Zobacz 9 elementów <span>↓</span></a><Link className="text-link" href="/strony-dla-beauty">Zobacz ofertę dla beauty <span>↗</span></Link></div>
      </header>

      <section className="section shell guide-intro">
        <div><span className="section-no">NAJPIERW DECYZJA KLIENTA</span><h2>Strona ma pomóc wybrać usługę i przejść do rezerwacji bez szukania informacji w kilku miejscach.</h2></div>
        <p>Klient powinien móc sprawdzić zabieg, cenę, efekty, przygotowanie i dostępny sposób rezerwacji bez pisania kilku osobnych wiadomości. Im mniej niepewności przed umówieniem wizyty, tym prostsza jest decyzja.</p>
      </section>

      <section className="section guide-reasons" id="lista">
        <div className="shell">
          <div className="section-head"><div><span className="section-no">9 ELEMENTÓW STRONY SALONU BEAUTY</span><h2>Wygląd ma wspierać wybór, a nie zasłaniać informacje.</h2></div><p>Estetyka jest ważna, ale powinna prowadzić klienta do konkretu: co robicie, ile to kosztuje, jakie są efekty i jak zarezerwować wizytę.</p></div>
          <ol>{elements.map(([number, title, text]) => <li key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="section shell guide-check">
        <div><span className="section-no">REZERWACJA</span><h2>Nie buduj drugiego kalendarza, jeśli pierwszy działa.</h2><p>Jeżeli salon ma już Booksy lub inny system, najczęściej lepiej połączyć stronę z istniejącym procesem. Własna strona odpowiada wtedy za markę, ofertę i treści, a kalendarz za dostępność terminów.</p></div>
        <ul>
          <li><b>1.</b> Jeden czytelny przycisk „Umów wizytę”.</li>
          <li><b>2.</b> Rezerwacja przez używany system albo prosty formularz.</li>
          <li><b>3.</b> Telefon i wiadomość jako alternatywa.</li>
          <li><b>4.</b> Brak dwóch niezależnych kalendarzy z różnymi terminami.</li>
          <li><b>5.</b> Informacja, co klient powinien przygotować przed wizytą.</li>
        </ul>
      </section>

      <section className="section shell guide-intro">
        <div><span className="section-no">USŁUGA I SPRZEDAŻ</span><h2>Rezerwacja zabiegu i zakup vouchera to dwie różne intencje.</h2></div>
        <p>Klient umawiający wizytę potrzebuje terminu i informacji o zabiegu. Osoba kupująca prezent chce szybko wybrać voucher, zapłacić i dostać jasną informację o realizacji. Jeżeli salon sprzedaje produkty, warto potraktować je jako trzecią, prostą ścieżkę zamiast mieszać wszystko w jednym formularzu.</p>
      </section>

      <GuideFaq items={faq} />
      <div className="shell"><GuideAuthor published="07.10.2026" updated="07.10.2026" /></div>

      <section className="section guide-cta"><div className="shell">
        <span className="section-no">CHCESZ UŁOŻYĆ ŚCIEŻKĘ KLIENTA?</span>
        <h2>Połącz ofertę, rezerwację i sprzedaż bez dokładania chaosu.</h2>
        <p>Możemy zacząć od samej strony i rezerwacji, a vouchery, produkty lub kolejne funkcje dodać wtedy, gdy salon rzeczywiście ich potrzebuje.</p>
        <Link className="button" href="/strony-dla-beauty">Strony dla salonów beauty <span>↗</span></Link>
      </div></section>
    </article>
    <RelatedServices items={[
      { href: "/strony-dla-beauty", label: "Strona dla salonu beauty", text: "Zobacz zakres strony, rezerwacji i prezentacji usług dla salonu." },
      { href: "/oferta#mini-sklep", label: "Vouchery i mini sklep", text: "Sprawdź wariant sprzedaży wybranych produktów, zestawów i voucherów." },
      { href: "/strony-internetowe", label: "Widoczność lokalna", text: "Zobacz, jak strona i Profil Firmy Google mogą tworzyć spójną drogę lokalnego klienta." },
    ]} />
  </main><QuickWhatsApp /><SiteFooter /></>;
}
