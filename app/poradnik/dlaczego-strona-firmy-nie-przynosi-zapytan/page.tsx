import type { Metadata } from "next";
import Link from "../../SafeLink";
import RelatedServices from "../../RelatedServices";
import { GuideAuthor, GuideBreadcrumbs, GuideFaq } from "../../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "Dlaczego strona nie zdobywa zapytań? 7 przyczyn",
  description: "Praktyczna lista siedmiu powodów, przez które strona firmy usługowej nie pozyskuje zapytań, oraz kolejność poprawek.",
  alternates: { canonical: "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan" },
  openGraph: { type: "article", title: "Dlaczego strona firmy nie przynosi zapytań?", description: "Siedem przyczyn i praktyczna kolejność poprawek.", url: "/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan", publishedTime: "2026-09-30", modifiedTime: "2026-09-30", images: [{ url: "/og-dlaczego-strona-nie-przynosi-zapytan.png", width: 1200, height: 630, alt: "Dlaczego strona firmy nie przynosi zapytań, poradnik Zielonej Marki" }] },
  twitter: { card: "summary_large_image", images: ["/og-dlaczego-strona-nie-przynosi-zapytan.png"] },
};

const reasons = [
  ["Nie wiadomo od razu, czym zajmuje się firma", "Pierwszy ekran powinien w kilku sekundach wyjaśnić usługę, obszar działania i następny krok. Ogólne hasło bez konkretu zmusza klienta do szukania."],
  ["Oferta opisuje firmę, a nie decyzję klienta", "Klient chce rozpoznać swój problem, zobaczyć zakres usługi i dowiedzieć się, co wydarzy się po kontakcie."],
  ["Kontakt jest schowany albo niewygodny", "Na telefonie numer, formularz i przycisk działania powinny być łatwe do znalezienia i kliknięcia bez powiększania ekranu."],
  ["Brakuje dowodów i konkretów", "Zdjęcia pracy, jasny proces, zakres odpowiedzialności, opinie oraz prawdziwe realizacje zmniejszają ryzyko po stronie klienta."],
  ["Strona nie odpowiada na lokalne pytania", "Firma usługowa powinna jasno podać obszar dojazdu, miejscowości, rodzaje zleceń i najczęstsze warunki współpracy."],
  ["Wersja mobilna tylko mieści się na ekranie", "Samo zwężenie układu nie wystarcza. Tekst, przyciski, formularz, menu i multimedia muszą być wygodne przy obsłudze kciukiem."],
  ["Nikt nie mierzy drogi do zapytania", "Bez sprawdzenia kliknięć, formularzy i źródeł ruchu trudno odróżnić brak odwiedzin od problemu z ofertą lub kontaktem."],
] as const;

const faq = [
  ["Po czym poznać, że strona wymaga modernizacji?", "Najczęstsze sygnały to nieczytelna oferta na telefonie, ukryty kontakt, przestarzałe informacje, wolne działanie, niedziałający formularz i brak jasnego następnego kroku."],
  ["Czy reklama pomoże stronie, która nie zdobywa zapytań?", "Reklama może zwiększyć liczbę odwiedzin, ale nie naprawi niezrozumiałej oferty ani trudnego kontaktu. Najpierw warto usunąć przeszkody na stronie."],
  ["Jak samodzielnie sprawdzić formularz?", "Wyślij test na telefonie i komputerze, sprawdź komunikat po wysłaniu, zapis zgody, dotarcie wiadomości oraz to, czy firma wie, kto ma odpowiedzieć."],
  ["Kiedy można ocenić efekt zmian?", "Działanie formularza sprawdzamy od razu. Widoczność i zachowanie użytkowników oceniamy na podstawie danych zbieranych przez kilka tygodni, zależnie od ruchu na stronie."],
] as const;

export default function GuidePage() {
  const article = { "@context": "https://schema.org", "@type": "Article", "@id": "https://zielona-marka.pl/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan#article", headline: "Dlaczego strona firmy nie przynosi zapytań? 7 najczęstszych przyczyn", description: metadata.description, image: "https://zielona-marka.pl/og-dlaczego-strona-nie-przynosi-zapytan.png", datePublished: "2026-09-30", dateModified: "2026-09-30", author: { "@id": "https://zielona-marka.pl/#lukasz-staniewicz" }, publisher: { "@id": "https://zielona-marka.pl/#business" }, mainEntityOfPage: "https://zielona-marka.pl/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan" };
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" }, { "@type": "ListItem", position: 2, name: "Poradniki", item: "https://zielona-marka.pl/poradnik" }, { "@type": "ListItem", position: 3, name: "Dlaczego strona firmy nie przynosi zapytań?", item: "https://zielona-marka.pl/poradnik/dlaczego-strona-firmy-nie-przynosi-zapytan" }] };
  const faqData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <><SiteHeader /><main className="zm-public guide-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    <article>
      <header className="page-hero shell"><GuideBreadcrumbs current="Dlaczego strona nie przynosi zapytań?" /><span className="eyebrow"><i />PORADNIK DLA FIRMY USŁUGOWEJ</span><h1>Dlaczego strona firmy <em>nie przynosi zapytań?</em></h1><p>Najczęściej nie chodzi o jeden błąd. Problem powstaje wtedy, gdy klient nie rozumie oferty, nie znajduje potwierdzenia jakości albo nie wie, co zrobić dalej.</p><div className="hero-actions"><a className="button" href="#lista">Sprawdź 7 przyczyn <span>↓</span></a><Link className="text-link" href="/modernizacja-strony#miniaudyt">Poproś o bezpłatną mini ocenę <span>↗</span></Link></div></header>
      <section className="section shell guide-intro"><div><span className="section-no">SZYBKA DIAGNOZA</span><h2>Zacznij od zachowania klienta, nie od zmiany kolorów.</h2></div><p>Otwórz stronę na telefonie i spróbuj w 30 sekund odpowiedzieć: co firma robi, dla kogo, na jakim obszarze, dlaczego warto jej zaufać i jak wysłać konkretne zapytanie. Każda brakująca odpowiedź zwiększa ryzyko wyjścia ze strony.</p></section>
      <section className="section guide-reasons" id="lista"><div className="shell"><div className="section-head"><div><span className="section-no">7 NAJCZĘSTSZYCH PRZYCZYN</span><h2>Co sprawdzić przed inwestycją w reklamę.</h2></div><p>Reklama może zwiększyć ruch, ale nie naprawi nieczytelnej oferty ani niedziałającej drogi kontaktu.</p></div><ol>{reasons.map(([title, text], index) => <li key={title}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
      <section className="section shell guide-check"><div><span className="section-no">KOLEJNOŚĆ POPRAWEK</span><h2>Najpierw usuń przeszkody. Potem buduj widoczność.</h2><p>Rozsądna kolejność to: działający kontakt, jasna oferta, dobra wersja mobilna, dowody zaufania, podstawy technicznego SEO, treści odpowiadające na pytania klientów i dopiero później szersza promocja.</p></div><ul><li><b>1.</b> Sprawdź formularz, telefon i e-mail.</li><li><b>2.</b> Uprość pierwszy ekran i ofertę.</li><li><b>3.</b> Dodaj prawdziwe przykłady pracy.</li><li><b>4.</b> Połącz podstrony tematycznymi linkami.</li><li><b>5.</b> Mierz zapytania i poprawiaj na podstawie danych.</li></ul></section>
      <GuideFaq items={faq} />
      <div className="shell"><GuideAuthor published="30.09.2026" updated="30.09.2026" /></div>
      <section className="section guide-cta"><div className="shell"><span className="section-no">BEZPŁATNY PIERWSZY KROK</span><h2>Chcesz wiedzieć, co blokuje zapytania na Twojej stronie?</h2><p>Wyślij adres strony. W krótkiej mini ocenie wskażę najważniejszą przeszkodę i sensowną kolejność działania, bez deklarowania budżetu.</p><Link className="button" href="/modernizacja-strony#miniaudyt">Poproś o mini ocenę <span>↗</span></Link></div></section>
    </article>
    <RelatedServices items={[{ href: "/modernizacja-strony", label: "Modernizacja strony", text: "Gdy obecna strona ma potencjał, ale utrudnia kontakt." }, { href: "/poradnik/ile-kosztuje-strona-dla-malej-firmy", label: "Ile kosztuje strona?", text: "Poznaj warianty, zakres i koszty, które mogą pojawić się osobno." }, { href: "/maly-crm-dla-firm", label: "Porządek po zapytaniu", text: "Gdy kontaktów jest więcej i trzeba pilnować następnego kroku." }]} />
  </main><QuickWhatsApp /><SiteFooter /></>;
}
