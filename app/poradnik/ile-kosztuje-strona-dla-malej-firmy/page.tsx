import type { Metadata } from "next";
import Link from "../../SafeLink";
import RelatedServices from "../../RelatedServices";
import { GuideAuthor, GuideBreadcrumbs, GuideFaq } from "../../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "Ile kosztuje strona dla małej firmy?",
  description: "Sprawdź, od czego zależy koszt strony dla małej firmy, co zawiera wycena i kiedy wystarczy prosta strona, a kiedy potrzebne są formularze lub CRM.",
  alternates: { canonical: "/poradnik/ile-kosztuje-strona-dla-malej-firmy" },
  openGraph: { type: "article", title: "Ile kosztuje strona internetowa dla małej firmy?", description: "Trzy warianty, zakres i koszty, które mogą pojawić się osobno.", url: "/poradnik/ile-kosztuje-strona-dla-malej-firmy", publishedTime: "2026-09-30", modifiedTime: "2026-09-30", images: [{ url: "/og-ile-kosztuje-strona-dla-malej-firmy.png", width: 1200, height: 630, alt: "Ile kosztuje strona dla małej firmy, poradnik Zielonej Marki" }] },
  twitter: { card: "summary_large_image", images: ["/og-ile-kosztuje-strona-dla-malej-firmy.png"] },
};

const factors = [
  ["Liczba i cel podstron", "Jedna dobrze ułożona strona kosztuje mniej niż serwis z osobnymi usługami, realizacjami, poradnikiem i rozbudowaną strukturą lokalną."],
  ["Gotowość materiałów", "Cena jest niższa, gdy firma ma aktualne zdjęcia, logo i konkretne informacje. Pisanie całej oferty od zera jest osobnym zakresem."],
  ["Formularz i obsługa zapytań", "Prosty kontakt różni się od formularza zbierającego rodzaj usługi, termin, lokalizację, zdjęcia i zgodę na kontakt."],
  ["Sklep, płatności i rezerwacje", "Koszyk, operator płatności, dostawa, vouchery albo połączenie z systemem rezerwacji wymagają wdrożenia i pełnego testu ścieżki."],
  ["Zaplecze firmy", "CRM, statusy zleceń, panel klienta, role użytkowników i automatyczne przypomnienia są kolejnym etapem, a nie zwykłą podstroną."],
  ["Termin i nietypowe integracje", "Pilny start, migracja danych lub połączenie z używanym programem mogą zmienić czas oraz koszt realizacji."],
] as const;

const faq = [
  ["Czy domena i hosting są w cenie strony?", "Podłączenie domeny i HTTPS może być częścią wdrożenia. Samą domenę, hosting oraz płatne usługi dostawców klient opłaca zgodnie z ustalonym zakresem i aktualnym cennikiem dostawcy."],
  ["Czy można zacząć od jednej strony?", "Tak. Dla wielu małych firm jedna dobrze ułożona strona z ofertą, procesem, kontaktem i formularzem jest rozsądniejsza niż kilka pustych podstron."],
  ["Czy cena obejmuje telefon, tablet i komputer?", "Tak. Każdy wskazany wariant strony jest przygotowywany oraz sprawdzany na podstawowych szerokościach telefonu, tabletu i komputera."],
  ["Ile kosztuje późniejsza rozbudowa?", "Koszt zależy od nowego zakresu. Dodatkowa usługa, sklep, formularz, CRM albo integracja są wyceniane przed rozpoczęciem kolejnego etapu."],
  ["Czy mogę wykorzystać posiadaną domenę?", "Tak. Jeżeli firma jest właścicielem domeny i ma dostęp do jej ustawień, można ją podłączyć do nowej lub zmodernizowanej strony."],
] as const;

const packages = [
  ["01", "ZM Start", "od 1 449 zł netto", "Jedna kompletna, przewijana strona dla lokalnej firmy usługowej.", ["około 6–7 sekcji", "telefon, e-mail, WhatsApp i formularz", "wersja mobilna i podstawy Google", "publikacja, testy i 14 dni wsparcia"]],
  ["02", "ZM LeadFlow", "od 4 490 zł netto", "Strona do 6 podstron i formularz, który zbiera konkrety potrzebne do rozmowy lub wyceny.", ["indywidualny układ i treści", "termin, opis i możliwość dodania zdjęć", "lokalne SEO i mierzenie zapytań", "zwykle 10–14 dni roboczych"]],
  ["03", "ZM Flow", "od 6 900 zł netto", "Strona, formularz i asystent zapytań połączone z prostym obiegiem kontaktów.", ["kwalifikacja powtarzalnych pytań", "zatwierdzona baza odpowiedzi", "przekazanie sprawy człowiekowi", "możliwość dalszej automatyzacji"]],
] as const;

export default function WebsiteCostGuidePage() {
  const article = { "@context": "https://schema.org", "@type": "Article", "@id": "https://zielona-marka.pl/poradnik/ile-kosztuje-strona-dla-malej-firmy#article", headline: "Ile kosztuje strona internetowa dla małej firmy?", description: metadata.description, image: "https://zielona-marka.pl/og-ile-kosztuje-strona-dla-malej-firmy.png", datePublished: "2026-09-30", dateModified: "2026-09-30", author: { "@id": "https://zielona-marka.pl/#lukasz-staniewicz" }, publisher: { "@id": "https://zielona-marka.pl/#business" }, mainEntityOfPage: "https://zielona-marka.pl/poradnik/ile-kosztuje-strona-dla-malej-firmy" };
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" }, { "@type": "ListItem", position: 2, name: "Poradniki", item: "https://zielona-marka.pl/poradnik" }, { "@type": "ListItem", position: 3, name: "Ile kosztuje strona dla małej firmy?", item: "https://zielona-marka.pl/poradnik/ile-kosztuje-strona-dla-malej-firmy" }] };
  const faqData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <><SiteHeader /><main className="zm-public guide-page cost-guide-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    <article>
      <header className="page-hero shell"><GuideBreadcrumbs current="Ile kosztuje strona dla małej firmy?" /><span className="eyebrow"><i />PORADNIK DLA MAŁEJ FIRMY</span><h1>Ile kosztuje strona internetowa <em>dla małej firmy?</em></h1><p>Najkrótsza odpowiedź: tyle, ile wymaga cel strony. Prosta strona usługowa może zaczynać się od 1 449 zł netto. Więcej kosztują dodatkowe podstrony, teksty, rozbudowany formularz, sklep albo zaplecze do obsługi zapytań.</p><div className="hero-actions"><a className="button" href="#warianty">Porównaj warianty <span>↓</span></a><Link className="text-link" href="/kontakt">Poproś o dokładną wycenę <span>↗</span></Link></div></header>
      <section className="section shell guide-intro"><div><span className="section-no">CENA BEZ NIEDOMÓWIEŃ</span><h2>Nie płacisz za liczbę pikseli. Płacisz za zakres pracy i odpowiedzialność.</h2></div><p>Dobra wycena obejmuje nie tylko wygląd. Trzeba ułożyć ofertę, zaprojektować drogę klienta, przygotować telefon, tablet i komputer, sprawdzić formularze, zadbać o podstawy Google, opublikować stronę i skontrolować ją przed odbiorem.</p></section>
      <section className="section guide-reasons"><div className="shell"><div className="section-head"><div><span className="section-no">CO ZMIENIA CENĘ</span><h2>Sześć elementów, które naprawdę wpływają na koszt.</h2></div><p>Najtańsza oferta nie zawsze obejmuje te same czynności. Przed porównaniem warto sprawdzić zakres, liczbę poprawek, testy i pomoc przy publikacji.</p></div><ol>{factors.map(([title, text], index) => <li key={title}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
      <section className="section shell cost-packages" id="warianty"><div className="section-head"><div><span className="section-no">TRZY PRAKTYCZNE PUNKTY STARTU</span><h2>Zakres dobieramy do sytuacji firmy.</h2></div><p>Ceny są kwotami netto i punktami startu. Dokładny zakres oraz koszt potwierdzamy przed rozpoczęciem pracy.</p></div><div>{packages.map(([number, title, price, lead, items]) => <article key={title}><span>{number}</span><h3>{title}</h3><strong>{price}</strong><p>{lead}</p><ul>{items.map(item => <li key={item}>{item}</li>)}</ul><Link href="/oferta">Zobacz pełny zakres ↗</Link></article>)}</div></section>
      <section className="section shell guide-check cost-external"><div><span className="section-no">CO MOŻE BYĆ PŁATNE OSOBNO</span><h2>Wdrożenie strony i usługi zewnętrzne to nie zawsze ten sam rachunek.</h2><p>Przed startem ustalamy, które konta i abonamenty należą do firmy. Ceny dostawców mogą się zmieniać, dlatego nie ukrywam ich w jednej niejasnej kwocie.</p></div><ul><li><b>1.</b> Domena i hosting, jeśli firma jeszcze ich nie ma.</li><li><b>2.</b> Operator płatności, system rezerwacji lub bramka SMS.</li><li><b>3.</b> Płatne zdjęcia, sesja fotograficzna albo zakup materiałów.</li><li><b>4.</b> Stała opieka, aktualizacje i rozwój po okresie wsparcia.</li><li><b>5.</b> Nietypowe integracje, migracja danych i dodatkowe role użytkowników.</li></ul></section>
      <GuideFaq items={faq} />
      <div className="shell"><GuideAuthor published="30.09.2026" updated="30.09.2026" /></div>
      <section className="section guide-cta"><div className="shell"><span className="section-no">DOKŁADNA WYCENA BEZ ZGADYWANIA</span><h2>Opisz firmę i cel strony w kilku zdaniach.</h2><p>Najpierw ustalimy, co klient powinien znaleźć i zrobić. Potem otrzymasz zakres oraz cenę, zanim rozpoczniemy pracę.</p><Link className="button" href="/kontakt">Poproś o wycenę <span>↗</span></Link></div></section>
    </article>
    <RelatedServices items={[{ href: "/oferta", label: "Porównaj pełną ofertę", text: "Zobacz zakres pakietów, dodatków oraz koszty usług zewnętrznych." }, { href: "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan", label: "Dlaczego nie ma zapytań?", text: "Sprawdź siedem przeszkód, które mogą osłabiać obecną stronę." }, { href: "/modernizacja-strony", label: "Nowa strona czy poprawki?", text: "Sprawdź, kiedy warto modernizować istniejący serwis." }]} />
  </main><QuickWhatsApp /><SiteFooter /></>;
}
