import type { Metadata } from "next";
import Link from "../../SafeLink";
import { GuideAuthor, GuideBreadcrumbs } from "../../GuideElements";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../../SiteChrome";

export const metadata: Metadata = {
  title: "Ile kosztuje projekt gazetki reklamowej? Skład i aktualizacje",
  description: "Od czego zależy cena projektu gazetki reklamowej? Liczba stron, produkty, zdjęcia, teksty, pliki do druku i rabaty za kolejne wydania. Sprawdź kalkulator DTP.",
  alternates: { canonical: "/poradnik/ile-kosztuje-projekt-gazetki" },
};

const faq = [
  ["Czy projekt gazetki obejmuje jej druk?", "Nie. Wycenę projektu, składu i przygotowania produkcyjnego oddzielamy od kosztów drukarni, papieru, uszlachetniania i dostawy."],
  ["Czy regularne gazetki są tańsze?", "Mogą być. Zyskujemy, gdy pozostają format, identyfikacja wizualna, makieta i część elementów. W Zielonej Marce rabat progresywny rośnie z kolejnymi wydaniami, zależnie od zakresu zmian."],
  ["Czy wystarczy arkusz z produktami i cenami?", "To dobry punkt wyjścia. Przydatne będą jeszcze zdjęcia lub numery produktów, nazwy, opisy, warianty, daty obowiązywania promocji i informacja o kolejności ważności treści."],
  ["Jak przygotować pliki do drukarni?", "Parametry PDF, spady, profile i kolory dodatkowe ustala się według wymagań konkretnej drukarni. Plik po eksporcie przechodzi kontrolę techniczną."],
];

export default function PriceGuideDtp() {
  const structured = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Ile kosztuje projekt gazetki reklamowej?",
    datePublished: "2026-10-14",
    dateModified: "2026-10-14",
    author: { "@id": "https://zielona-marka.pl/#lukasz-st-cz" },
    publisher: { "@id": "https://zielona-marka.pl/#business" },
    mainEntityOfPage: "https://zielona-marka.pl/poradnik/ile-kosztuje-projekt-gazetki",
    description: metadata.description,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://zielona-marka.pl/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://zielona-marka.pl/poradnik" },
      { "@type": "ListItem", position: 3, name: "Ile kosztuje projekt gazetki reklamowej?", item: "https://zielona-marka.pl/poradnik/ile-kosztuje-projekt-gazetki" },
    ],
  };
  return <><SiteHeader/><main className="zm-public guide-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    <article>
      <header className="page-hero shell"><GuideBreadcrumbs current="Ile kosztuje projekt gazetki reklamowej?" /><span className="eyebrow"><i/>PORADNIK DTP / CENNIK</span>
        <h1>Ile kosztuje projekt gazetki reklamowej <em>i jak obniżyć cenę kolejnych wydań?</em></h1>
        <p>Przy składzie gazetki największe znaczenie ma nie tylko liczba stron. Liczy się również gotowość danych produktowych, liczba zdjęć do obróbki, dostępność makiety, terminy oraz zakres zmian w kolejnych wydaniach.</p>
        <div className="hero-actions"><Link className="button" href="/dtp#kalkulator-dtp">Oblicz koszt gazetki ↗</Link><Link className="text-link" href="/dtp">Cała oferta DTP ↗</Link></div>
      </header>
      <aside className="shell zm-guide-highlights" aria-label="Najważniejsze informacje z artykułu">
        <div><span>01 / W PIGUŁCE</span><h2>Co wpływa na koszt?</h2><p>Liczba stron, produkty, zdjęcia, stan materiałów i liczba rund poprawek.</p></div>
        <div><span>02 / W PIGUŁCE</span><h2>Czego nie obejmuje?</h2><p>Sam projekt nie zawiera kosztu druku, papieru, dostawy ani licencji.</p></div>
        <div><span>03 / W PIGUŁCE</span><h2>Jak obniżyć koszt?</h2><p>Stała makieta i uporządkowane dane pozwalają ograniczać pracę nad kolejnymi wydaniami.</p></div>
      </aside>
      <section className="section shell guide-intro"><div><span className="section-no">JAK POWSTAJE WYCENA</span><h2>Ta sama liczba stron może oznaczać zupełnie inną ilość pracy.</h2></div>
        <p>Ośmiostronicowa gazetka z gotowym szablonem, uporządkowanym arkuszem Excel i przygotowanymi zdjęciami wymaga mniej pracy niż ośmiostronicowy projekt z niekompletnymi cenami, zdjęciami różnej jakości i bez określonego układu. Różnice dotyczą przygotowania, składu, weryfikacji i poprawek.</p></section>
      <section className="section shell"><div className="section-head"><div><span className="section-no">CO WPŁYWA NA CENĘ</span><h2>Sześć rzeczy, które warto przekazać przed zamówieniem.</h2></div></div>
        <div className="local-benefit-grid">
          <article><b>01</b><h3>Format i objętość</h3><p>Format A4, A5 lub DL, liczba stron bądź paneli oraz sposób składania.</p></article>
          <article><b>02</b><h3>Produkty i ceny</h3><p>Liczba pozycji, wariantów i zmian cen, najlepiej w uporządkowanym arkuszu.</p></article>
          <article><b>03</b><h3>Teksty i zdjęcia</h3><p>Czy opisy są gotowe, a zdjęcia mają jakość odpowiednią do planowanego wydruku.</p></article>
          <article><b>04</b><h3>Projekt graficzny</h3><p>Czy istnieje gotowy szablon, czy trzeba zaprojektować makietę od zera.</p></article>
          <article><b>05</b><h3>Korekty i terminy</h3><p>Liczba rund poprawek, możliwość weryfikacji cen przez klienta i data przekazania plików.</p></article>
          <article><b>06</b><h3>Częstotliwość</h3><p>Czy gazetka będzie jednorazowa, comiesięczna, dwutygodniowa czy cotygodniowa.</p></article>
        </div>
      </section>
      <section className="section mini-shop-section"><div className="shell mini-shop-grid"><div><span className="section-no">RABATY ZA STAŁĄ WSPÓŁPRACĘ</span><h2>Wycena kolejnych wydań może maleć, jeśli oszczędzamy czas na makiecie.</h2>
        <p>Model progresywny premiuje powtarzalność: pierwsze wydanie powstaje z ustaleniem struktury, a późniejsze korzystają z gotowych elementów. Przy niewielkiej liczbie zmian rabat na powtarzalne prace nad składem może rosnąć nawet do 40%. Przy dużych zmianach limit jest niższy.</p>
        <p>Nie rabatujemy automatycznie pisania nowych tekstów, pilnych prac, zakupu zdjęć czy niestandardowej produkcji. Przed rozpoczęciem ustalamy liczbę wydań i sposób dostarczania materiałów.</p>
        <Link className="button" href="/dtp#kalkulator-dtp">Zobacz kolejne ceny w kalkulatorze ↗</Link></div>
        <div><h3>Jak obniżyć koszt pracy?</h3><ul className="check-list">
          <li>Jedna, uporządkowana baza produktów i cen</li>
          <li>Stałe wymiary i szablon między wydaniami</li>
          <li>Zdjęcia nazwane numerami produktów lub SKU</li>
          <li>Jeden zestaw zbiorczych poprawek od klienta</li>
          <li>Ustalona data zamknięcia zmian przed eksportem PDF</li>
        </ul></div></div>
      </section>
      <section className="section shell"><div className="section-head"><div><span className="section-no">OD SKŁADU DO DRUKARNI</span><h2>Ostateczna cena druku to osobna decyzja.</h2></div></div>
        <p>Przy zapytaniu do drukarni znaczenie mają nakład, papier, gramatura, kolorystyka, falcowanie, uszlachetnienie, oprawa i transport. Najlepiej znać te parametry zanim ostatecznie przygotuje się pliki produkcyjne. Profil ICC, wymagana odmiana PDF/X, spady i marginesy sprawdza się według specyfikacji drukarni.</p></section>
      <section className="section shell faq-page"><div className="section-head"><div><span className="section-no">PYTANIA PRZED ZAMÓWIENIEM</span><h2>Odpowiedzi w jednym miejscu.</h2></div></div>
        <div className="faq-list">{faq.map(([q,a],i)=><details key={q} open={i===0}><summary><span>{String(i+1).padStart(2,"0")}</span>{q}<i>+</i></summary><p>{a}</p></details>)}</div>
      </section>
            <div className="shell zm-article-author-wrap"><GuideAuthor published="14 października 2026" updated="14 października 2026" /></div>
      <section className="section guide-cta"><div className="shell"><span className="section-no">WYCENA Z PEŁNYM ZAKRESEM</span><h2>Wybierz liczbę stron, materiały i cykl wydań.</h2><p>Kalkulator pokaże pierwszy koszt, prognozę następnych wydań i sumę serii. Nie musisz znać wszystkich szczegółów — można je doprecyzować przed zleceniem.</p><Link className="button" href="/dtp#kalkulator-dtp">Otwórz konfigurator DTP ↗</Link></div></section>
    </article>
  </main><QuickWhatsApp/><SiteFooter/></>;
}
