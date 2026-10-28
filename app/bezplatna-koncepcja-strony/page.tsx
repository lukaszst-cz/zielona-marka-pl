import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import ConceptRequestForm from "./ConceptRequestForm";
import ConceptHeroArtwork from "./ConceptHeroArtwork";
import ConceptShowcase from "./ConceptShowcase";
import "./concept-page.css";
import "./concept-image-preview.css";

export const metadata: Metadata = {
  title: "Bezpłatna koncepcja strony, logo lub gazetki",
  description: "Zobacz pomysł na nowy wygląd strony, logo lub gazetki swojej firmy. Jedna poglądowa koncepcja, bez opłaty i obowiązku dalszej współpracy.",
  alternates: { canonical: "/bezplatna-koncepcja-strony" },
  openGraph: {
    type: "website",
    url: "/bezplatna-koncepcja-strony",
    title: "Bezpłatna koncepcja wizualna | Zielona Marka",
    description: "Pokaż swoją firmę i zobacz, jak może wyglądać jej nowa odsłona. Jedna bezpłatna koncepcja strony, logo lub gazetki.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka: strony internetowe i rozwiązania dla firm" }]
  }
};

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
            <span className="eyebrow"><i />BEZPŁATNA KONCEPCJA WIZUALNA</span>
            <h1 id="koncept-title">Twoja firma.<br /><em>W nowej odsłonie.</em></h1>
            <p className="zm-concept-lead">Masz stronę, która nie pokazuje już tego, co oferujesz? Zostaw link i e-mail. Zaproponuję <strong>inny sposób pokazania Twojej firmy</strong> i prześlę poglądową koncepcję. Możesz też poprosić o pomysł na logo lub gazetkę. Możliwość przygotowania i termin potwierdzę w odpowiedzi.</p>
            <div className="hero-actions zm-concept-actions"><a className="button" href="#zgloszenie">Pokaż mi pomysł dla mojej firmy <span aria-hidden="true">↗</span></a><a href="#mozliwosci" className="text-link">Zobacz przykłady ↓</a></div>
            <p className="zm-concept-calm">Jedna propozycja. Bez podawania budżetu i bez zobowiązań.</p>
          </div>
          <div className="zm-concept-visual"><ConceptHeroArtwork /></div>
        </div>
      </section>

      <ConceptShowcase />

      <section className="section dark-section zm-concept-scope" aria-labelledby="koncept-scope">
        <div className="shell zm-concept-scope-grid">
          <div><p className="zm-concept-kicker">JAK TO DZIAŁA</p><h2 id="koncept-scope">Trzy proste kroki.<br /><em>Jasny rezultat.</em></h2><p>Wystarczy link do obecnej strony, zdjęcie gazetki albo kilka zdań o firmie. Nie potrzebuję od Ciebie gotowego projektu ani listy technicznych wymagań.</p><Link href="#zgloszenie">Przejdź do krótkiego formularza ↗</Link></div>
          <ol><li><span>01</span><div><h3>Opisujesz firmę</h3><p>Podajesz e-mail oraz link do strony albo krótki opis działalności.</p></div></li><li><span>02</span><div><h3>Przygotowuję kierunek</h3><p>Najpierw potwierdzę, czy mogę przyjąć zgłoszenie. Następnie przygotuję jeden kierunek wizualny z krótkim wyjaśnieniem pomysłu.</p></div></li><li><span>03</span><div><h3>Otrzymujesz materiał</h3><p>Po przygotowaniu wyślę koncepcję na wskazany adres e-mail. Możesz na tym poprzestać albo porozmawiać o kolejnym etapie.</p></div></li></ol>
        </div>
      </section>

      <section className="section shell zm-concept-request" id="zgloszenie" aria-labelledby="koncept-form">
        <div className="zm-concept-request-intro"><p className="zm-concept-kicker">DWA POLA · BEZ OPŁATY</p><h2 id="koncept-form">Jak mogłaby wyglądać<br /><em>Twoja firma?</em></h2><p>Podaj e-mail i link do strony albo kilka słów o działalności. Na ten adres otrzymasz odpowiedź, a po potwierdzeniu zgłoszenia także przygotowany podgląd. Bez rozmowy sprzedażowej na start, bez newslettera i bez obowiązku zamawiania projektu.</p><div className="zm-concept-request-note"><strong>Co obejmuje bezpłatna propozycja?</strong><span>Jeden poglądowy kierunek wybranego materiału • krótkie uzasadnienie • rekomendacja dalszych działań</span></div></div>
        <ConceptRequestForm />
      </section>

      <section className="section shell zm-concept-faq" aria-labelledby="koncept-faq">
        <div className="zm-concept-section-head"><p>PYTANIA I ODPOWIEDZI</p><h2 id="koncept-faq">Wszystko jasno,<br />bez drobnego druku.</h2></div>
        <div className="faq-list zm-concept-faq-items">{faq.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div>
        <p className="zm-concept-disclaimer">Bezpłatna koncepcja pokazuje jeden możliwy kierunek. Nie jest gotowym plikiem do druku, pełnym projektem logo, kodem strony ani audytem technicznym; nie obejmuje też nieograniczonych poprawek. Możliwość realizacji i termin potwierdzam indywidualnie.</p>
      </section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
