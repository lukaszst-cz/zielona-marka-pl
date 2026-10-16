import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import ConceptRequestForm from "./ConceptRequestForm";
import ConceptHeroArtwork from "./ConceptHeroArtwork";
import ConceptShowcase from "./ConceptShowcase";
import "./koncepcja.css";
import "./concept-v5-hero.css";
import "./concept-v5-showcase.css";
import "./concept-botanical-preview.css";
import "./concept-unified-ui.css";

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

const benefits = [
  ["01", "Zobacz konkretny pomysł", "Zamiast wyobrażać sobie zmianę, zobaczysz ją na przykładzie dopasowanym do Twojej firmy."],
  ["02", "Poznaj możliwe korzyści", "Do wizualizacji dodam krótkie uzasadnienie, co warto podkreślić, uprościć albo pokazać klientowi od razu."],
  ["03", "Zdecyduj bez presji", "Obejrzysz propozycję i sam zdecydujesz, czy chcesz ją rozwijać. O budżecie możemy porozmawiać później."]
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
            <span className="eyebrow"><i />BEZPŁATNA KONCEPCJA WIZUALNA</span>
            <h1 id="koncept-title">Zanim zamówisz,<br/><em>zobacz, co</em><br/>jest możliwe.</h1>
            <p className="zm-concept-lead">Masz stronę, która nie pokazuje już, jak dobra jest Twoja firma? A może logo lub gazetka potrzebują świeżego spojrzenia? Opowiedz mi o działalności, przygotuję <strong>jedną poglądową koncepcję wizualną.</strong> Bez opłaty i zobowiązania do dalszych prac.</p>
            <div className="hero-actions zm-concept-actions"><a className="button" href="#zgloszenie">Chcę zobaczyć koncepcję <span aria-hidden="true">↗</span></a><a href="#mozliwosci" className="text-link">Zobacz przykłady ↓</a></div>
            <p className="zm-concept-calm">01 Indywidualnie · 02 Bez budżetu na start · 03 Bez zobowiązań</p>
          </div>
          <div className="zm-concept-visual"><ConceptHeroArtwork /></div>
        </div>
      </section>

      <section className="section shell zm-concept-benefits" aria-labelledby="koncept-benefits">
        <div className="zm-concept-section-head"><p>CO ZYSKUJESZ</p><h2 id="koncept-benefits">Najpierw zobacz.<br />Potem zdecyduj.</h2></div>
        <div className="zm-concept-benefit-grid">{benefits.map(([n, title, desc]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </section>

      <ConceptShowcase />

      <section className="section dark-section zm-concept-scope" aria-labelledby="koncept-scope">
        <div className="shell zm-concept-scope-grid">
          <div><p className="zm-concept-kicker">JAK TO DZIAŁA</p><h2 id="koncept-scope">Trzy proste kroki.<br /><em>Jasny rezultat.</em></h2><p>Wystarczy link do obecnej strony, zdjęcie gazetki albo kilka zdań o firmie. Nie potrzebuję od Ciebie gotowego projektu ani listy technicznych wymagań.</p><Link href="#zgloszenie">Przejdź do krótkiego formularza ↗</Link></div>
          <ol><li><span>01</span><div><h3>Opisujesz firmę</h3><p>Wybierasz jeden materiał i pokazujesz mi, czym zajmuje się Twoja firma.</p></div></li><li><span>02</span><div><h3>Przygotowuję kierunek</h3><p>Najpierw potwierdzę, czy mogę przyjąć zgłoszenie. Następnie przygotuję jeden kierunek wizualny z krótkim wyjaśnieniem pomysłu.</p></div></li><li><span>03</span><div><h3>Otrzymujesz materiał</h3><p>Po przygotowaniu wyślę koncepcję na wskazany adres e-mail. Możesz na tym poprzestać albo porozmawiać o kolejnym etapie.</p></div></li></ol>
        </div>
      </section>

      <section className="section shell zm-concept-request" id="zgloszenie" aria-labelledby="koncept-form">
        <div className="zm-concept-request-intro"><p className="zm-concept-kicker">KRÓTKI BRIEF · OKOŁO 1 MINUTY</p><h2 id="koncept-form">Opowiedz mi o firmie.<br /><em>Pokażę Ci pomysł.</em></h2><p>Wybierz stronę, logo albo gazetkę i napisz kilka słów o działalności. Jeśli masz obecne materiały, dodaj link. Nie musisz podawać budżetu ani zapisywać się na newsletter, odpowiem, czy mogę przygotować koncepcję i w jakim terminie.</p><div className="zm-concept-request-note"><strong>Co obejmuje bezpłatna propozycja?</strong><span>Jeden poglądowy kierunek wybranego materiału • krótkie uzasadnienie • rekomendacja dalszych działań</span></div></div>
        <ConceptRequestForm />
      </section>

      <section className="section shell zm-concept-faq" aria-labelledby="koncept-faq">
        <div className="zm-concept-section-head"><p>PYTANIA I ODPOWIEDZI</p><h2 id="koncept-faq">Wszystko jasno,<br />bez drobnego druku.</h2></div>
        <div className="zm-concept-faq-items">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        <p className="zm-concept-disclaimer">Bezpłatna koncepcja pokazuje jeden możliwy kierunek. Nie jest gotowym plikiem do druku, pełnym projektem logo, kodem strony ani audytem technicznym; nie obejmuje też nieograniczonych poprawek. Możliwość realizacji i termin potwierdzam indywidualnie.</p>
      </section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
