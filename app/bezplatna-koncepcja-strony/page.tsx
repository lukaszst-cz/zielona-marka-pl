import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import ConceptRequestForm from "./ConceptRequestForm";
import "./koncepcja.css";

export const metadata: Metadata = {
  title: "Bezpłatna koncepcja strony, logo lub gazetki",
  description: "Zamów bezpłatny pomysł na nowy wygląd strony, logo, gazetkę reklamową lub sprzedażową. Jeden poglądowy kierunek, bez zobowiązań.",
  alternates: { canonical: "/bezplatna-koncepcja-strony" },
  openGraph: {
    type: "website",
    url: "/bezplatna-koncepcja-strony",
    title: "Bezpłatna koncepcja wizualna | Zielona Marka",
    description: "Koncepcja strony, logo i materiałów reklamowych. Prześlij krótki brief i poznaj możliwy kierunek zmian.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka – strony internetowe i rozwiązania dla firm" }]
  }
};

const benefits = [
  ["01", "Zobacz konkretny pomysł", "Jedna indywidualna wizualizacja pozwoli Ci zobaczyć wybrany kierunek, zanim zdecydujesz się na projekt."],
  ["02", "Poznaj możliwe korzyści", "Krótko wyjaśnię, jak wybrany kierunek może poprawić rozpoznawalność, czytelność oferty lub zachęcić do kontaktu i zakupu."],
  ["03", "Zdecyduj bez presji", "Sam wybierzesz, czy chcesz rozmawiać o dalszych pracach. Nie musisz od razu podawać budżetu."]
] as const;

const faq = [
  ["Czy naprawdę nic nie płacę?", "Tak. Pierwsza, poglądowa koncepcja jest bezpłatna i niezobowiązująca. Jeżeli zaproponuję płatne prace, ich zakres i cenę uzgodnimy osobno."],
  ["Czy otrzymam gotowy projekt do wdrożenia lub druku?", "Nie. Bezpłatna propozycja to jeden poglądowy kierunek, np. ekran WWW, szkic logo albo okładka lub strona gazetki. Gotowe pliki produkcyjne, kod i pełną identyfikację wyceniamy osobno."],
  ["Czy potrzebuję obecnej strony lub gotowego logo?", "Nie. Wystarczy opis działalności. Jeśli masz dotychczasową stronę, logo lub gazetkę, prześlij publiczny link do materiału, by można było odnieść się do aktualnego wyglądu."],
  ["Czy mogę samodzielnie wygenerować podgląd?", "Tak, w ZM Studio możesz samodzielnie złożyć przykładowy układ strony WWW. W przypadku logo i gazetek formularz służy do zgłoszenia indywidualnej propozycji, a nie automatycznego generowania gotowego projektu."],
  ["Kiedy otrzymam odpowiedź?", "Najpierw potwierdzę zakres i możliwość przygotowania bezpłatnej koncepcji. Termin przekażę w odpowiedzi na zgłoszenie."],
] as const;

export default function FreeConceptPage() {
  return <>
    <SiteHeader />
    <main className="zm-public zm-concept">
      <section className="page-hero shell zm-concept-hero" aria-labelledby="koncept-title">
        <div className="zm-concept-hero-grid">
          <div>
            <span className="eyebrow"><i />ZIELONA MARKA · BEZPŁATNE KONCEPCJE</span>
            <h1 id="koncept-title">Zobacz swoją firmę <em>w nowej odsłonie.</em></h1>
            <p className="zm-concept-lead">Chcesz odświeżyć obecną stronę, logo lub gazetkę? A może potrzebujesz nowego projektu? Wybierz rodzaj materiału, a zaproponuję <strong>jeden indywidualny kierunek wizualny</strong> bez opłat i zobowiązań.</p>
            <div className="hero-actions zm-concept-actions"><a className="button" href="#zgloszenie">Zamów bezpłatną koncepcję <span aria-hidden="true">↗</span></a><Link href="/projektuj-strone#zm-konfigurator" className="text-link">Samodzielnie stwórz podgląd WWW ↗</Link></div>
            <p className="zm-concept-calm">Jedna propozycja poglądowa · Bez podawania budżetu · Bez zobowiązań</p>
          </div>
          <div className="zm-concept-visual" aria-label="Graficzna ilustracja propozycji odświeżenia wyglądu strony">
            <div className="zm-concept-browser">
              <div className="zm-concept-browser-top"><span>● ● ●</span><b>PRZYKŁADOWY KIERUNEK</b></div>
              <div className="zm-concept-browser-content">
                <div className="zm-concept-browser-nav"><span>✳ TWOJA FIRMA</span><small>Oferta &nbsp; O firmie &nbsp; Kontakt</small></div>
                <div className="zm-concept-browser-content-main"><small>PROJEKT KONCEPCYJNY</small><strong>Twoja oferta.<br /><i>Nowe spojrzenie.</i></strong><span>Poznawaj pomysły, zanim zdecydujesz.</span><b>Sprawdź możliwości ↗</b></div>
              </div>
            </div>
            <div className="zm-concept-visual-tag"><b>01 /</b> Jeden czytelny pomysł <span>— przygotowany dla Twojej firmy</span></div>
          </div>
        </div>
      </section>

      <section className="section shell zm-concept-benefits" aria-labelledby="koncept-benefits">
        <div className="zm-concept-section-head"><p>CO ZYSKUJESZ</p><h2 id="koncept-benefits">Najpierw zobacz.<br />Potem zdecyduj.</h2></div>
        <div className="zm-concept-benefit-grid">{benefits.map(([n, title, desc]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </section>

      <section className="section shell zm-concept-services" aria-labelledby="koncept-rodzaje">
        <div className="zm-concept-section-head"><p>WYBIERZ MATERIAŁ</p><h2 id="koncept-rodzaje">Od strony WWW po <em>materiały sprzedażowe.</em></h2>
          <p>Każda propozycja dotyczy jednego wybranego materiału. Nie musisz od razu zamawiać pełnego projektu.</p></div>
        <div className="zm-concept-service-grid">
          <article><span>01 / WWW</span><h3>Nowy wygląd obecnej strony</h3><p>Poglądowy projekt pierwszego ekranu lub wybranej sekcji istniejącej strony z czytelniejszą ofertą i kontaktem.</p><a href="#zgloszenie">Zgłoś obecną stronę ↗</a></article>
          <article><span>02 / WWW</span><h3>Strona dla nowej firmy</h3><p>Wstępny kierunek wizualny dla firmy bez witryny. Możesz też samodzielnie zobaczyć podgląd w ZM Studio.</p><Link href="/projektuj-strone#zm-konfigurator">Uruchom podgląd WWW ↗</Link></article>
          <article><span>03 / IDENTYFIKACJA</span><h3>Koncepcja logo</h3><p>Jeden kierunek znaku lub odświeżenia obecnego logo, dopasowany do charakteru marki.</p><Link href="/bezplatna-koncepcja-strony?typ=logo#zgloszenie">Poproś o pomysł na logo ↗</Link></article>
          <article><span>04 / REKLAMA</span><h3>Gazetka reklamowa</h3><p>Poglądowy układ okładki lub strony gazetki prezentującej usługi, aktualności i ofertę firmy.</p><Link href="/bezplatna-koncepcja-strony?typ=promo#zgloszenie">Zgłoś gazetkę reklamową ↗</Link></article>
          <article><span>05 / SPRZEDAŻ</span><h3>Gazetka sprzedażowa</h3><p>Przykładowy układ produktów, promocji, cen i wezwań do zakupu, z myślą o czytelności oferty.</p><Link href="/bezplatna-koncepcja-strony?typ=sales#zgloszenie">Zgłoś gazetkę sprzedażową ↗</Link></article>
        </div>
        <p className="zm-concept-services-foot">Podgląd WWW w ZM Studio działa samodzielnie. Pozostałe pomysły wymagają przesłania briefu i potwierdzenia przyjęcia zgłoszenia.</p>
      </section>

      <section className="section dark-section zm-concept-scope" aria-labelledby="koncept-scope">
        <div className="shell zm-concept-scope-grid">
          <div><p className="zm-concept-kicker">JAK TO DZIAŁA</p><h2 id="koncept-scope">Trzy proste kroki.<br /><em>Jasny rezultat.</em></h2><p>Nie potrzebujesz gotowej specyfikacji. Wystarczy adres obecnej strony, link do dotychczasowych materiałów lub kilka zdań o firmie.</p><Link href="#zgloszenie">Przejdź do krótkiego formularza ↗</Link></div>
          <ol><li><span>01</span><div><h3>Opisujesz firmę</h3><p>Wybierasz stronę, logo albo gazetkę i opisujesz, czego potrzebujesz.</p></div></li><li><span>02</span><div><h3>Przygotowuję kierunek</h3><p>Sprawdzam możliwość przyjęcia zgłoszenia i opracowuję jeden poglądowy kierunek oraz krótką rekomendację.</p></div></li><li><span>03</span><div><h3>Otrzymujesz materiał</h3><p>Jeśli potwierdzę realizację, prześlę materiał na Twój e-mail. O dalszej współpracy zdecydujesz samodzielnie.</p></div></li></ol>
        </div>
      </section>

      <section className="section shell zm-concept-request" id="zgloszenie" aria-labelledby="koncept-form">
        <div className="zm-concept-request-intro"><p className="zm-concept-kicker">KRÓTKI BRIEF · OKOŁO 1 MINUTY</p><h2 id="koncept-form">Pokaż mi swoją firmę.<br /><em>Resztę zaproponuję.</em></h2><p>Wybierz materiał: strona WWW, logo lub gazetka. Opisz firmę i dodaj opcjonalny link do obecnego projektu. Nie pytam o budżet ani nie zapisuję Cię do newslettera. Potwierdzę możliwość przygotowania koncepcji i dalszy krok.</p><div className="zm-concept-request-note"><strong>Co obejmuje bezpłatna propozycja?</strong><span>Jeden poglądowy kierunek wybranego materiału • krótkie uzasadnienie • rekomendacja dalszych działań</span></div></div>
        <ConceptRequestForm />
      </section>

      <section className="section shell zm-concept-faq" aria-labelledby="koncept-faq">
        <div className="zm-concept-section-head"><p>PYTANIA I ODPOWIEDZI</p><h2 id="koncept-faq">Wszystko jasno,<br />bez drobnego druku.</h2></div>
        <div className="zm-concept-faq-items">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        <p className="zm-concept-disclaimer">Koncepcja ma charakter poglądowy. Nie obejmuje kompletnych plików do druku, pełnego projektu logo, kodu strony, nieograniczonych poprawek ani audytu technicznego. Przyjęcie zgłoszenia i termin potwierdzam indywidualnie.</p>
      </section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
