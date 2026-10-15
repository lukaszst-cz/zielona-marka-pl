import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import ConceptRequestForm from "./ConceptRequestForm";
import "./koncepcja.css";

export const metadata: Metadata = {
  title: "Bezpłatna koncepcja strony WWW – zobacz możliwy kierunek",
  description: "Prześlij stronę lub opisz firmę. Przygotuję bezpłatną, poglądową propozycję jej wyglądu i trzy konkretne korzyści. Bez budżetu i zobowiązań.",
  alternates: { canonical: "/bezplatna-koncepcja-strony" },
  openGraph: {
    type: "website",
    url: "/bezplatna-koncepcja-strony",
    title: "Zobacz swoją firmę w nowej odsłonie | Zielona Marka",
    description: "Bezpłatna koncepcja wyglądu strony dla Twojej firmy. Prześlij adres WWW i poznaj możliwy kierunek zmian.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka – strony internetowe i rozwiązania dla firm" }]
  }
};

const benefits = [
  ["01", "Zobacz konkretny pomysł", "Jedna indywidualna wizualizacja pozwoli Ci zobaczyć wybrany kierunek, zanim zdecydujesz się na projekt."],
  ["02", "Poznaj możliwe korzyści", "Wskażę trzy rzeczy, które nowy układ może ułatwić Twoim klientom: znalezienie oferty, kontakt lub zakup."],
  ["03", "Zdecyduj bez presji", "Sam wybierzesz, czy chcesz rozmawiać o dalszych pracach. Nie musisz od razu podawać budżetu."]
] as const;

const faq = [
  ["Czy naprawdę nic nie płacę?", "Tak. Pierwsza, poglądowa koncepcja jest bezpłatna i niezobowiązująca. Jeżeli zaproponuję płatne prace, ich zakres i cenę uzgodnimy osobno."],
  ["Czy dostanę gotową stronę?", "Nie. Przygotowuję jeden wizualny kierunek, np. pierwszego ekranu lub wybranej sekcji, oraz krótkie omówienie. To materiał do oceny, nie kod gotowej strony."],
  ["Czy muszę mieć istniejącą stronę?", "Nie. Możesz zgłosić firmę, która dopiero potrzebuje strony, i krótko opisać jej ofertę."],
  ["Czy muszę zmienić dotychczasowy system?", "Nie zakładamy tego z góry. Jeśli masz już stronę lub sklep, najpierw sprawdzamy możliwości obecnego rozwiązania."],
  ["Kiedy otrzymam odpowiedź?", "Najpierw potwierdzę zakres i możliwość przygotowania bezpłatnej koncepcji. Termin przekażę w odpowiedzi na zgłoszenie."],
] as const;

export default function FreeConceptPage() {
  return <>
    <SiteHeader />
    <main className="zm-concept">
      <section className="zm-concept-hero" aria-labelledby="koncept-title">
        <div className="zm-concept-shell zm-concept-hero-grid">
          <div>
            <p className="zm-concept-kicker"><span aria-hidden="true">✳</span> ZIELONA MARKA / BEZPŁATNA KONCEPCJA WWW</p>
            <h1 id="koncept-title">Zobacz swoją firmę <em>w nowej odsłonie.</em></h1>
            <p className="zm-concept-lead">Masz stronę, ale zastanawiasz się, jak mogłaby wyglądać inaczej? A może dopiero zaczynasz? Przygotuję dla Ciebie <strong>jedną poglądową koncepcję wizualną</strong>, dopasowaną do charakteru firmy.</p>
            <div className="zm-concept-actions"><a className="zm-concept-primary" href="#zgloszenie">Zamów bezpłatną koncepcję <span aria-hidden="true">↗</span></a><Link href="/realizacje" className="zm-concept-secondary">Zobacz przykłady projektów ↗</Link></div>
            <p className="zm-concept-calm">Bez opłat · Bez zobowiązań · Bez konieczności podawania budżetu</p>
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

      <section className="zm-concept-benefits zm-concept-shell" aria-labelledby="koncept-benefits">
        <div className="zm-concept-section-head"><p>CO ZYSKUJESZ</p><h2 id="koncept-benefits">Najpierw zobacz.<br />Potem zdecyduj.</h2></div>
        <div className="zm-concept-benefit-grid">{benefits.map(([n, title, desc]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </section>

      <section className="zm-concept-scope" aria-labelledby="koncept-scope">
        <div className="zm-concept-shell zm-concept-scope-grid">
          <div><p className="zm-concept-kicker">JAK TO DZIAŁA</p><h2 id="koncept-scope">Trzy proste kroki.<br /><em>Jasny rezultat.</em></h2><p>Nie potrzebujesz gotowej specyfikacji. Wystarczy adres aktualnej strony albo kilka zdań o firmie i tym, co chcesz pokazać klientom.</p><Link href="#zgloszenie">Przejdź do krótkiego formularza ↗</Link></div>
          <ol><li><span>01</span><div><h3>Opisujesz firmę</h3><p>Podajesz adres WWW lub krótko przedstawiasz ofertę i potrzebę.</p></div></li><li><span>02</span><div><h3>Przygotowuję kierunek</h3><p>Analizuję zgłoszenie i, jeśli mogę je przyjąć, opracowuję jeden poglądowy widok oraz trzy korzyści.</p></div></li><li><span>03</span><div><h3>Otrzymujesz materiał</h3><p>Wyślę go na podany e-mail. Ty zdecydujesz, czy chcesz rozmawiać o pełnym wdrożeniu.</p></div></li></ol>
        </div>
      </section>

      <section className="zm-concept-request zm-concept-shell" id="zgloszenie" aria-labelledby="koncept-form">
        <div className="zm-concept-request-intro"><p className="zm-concept-kicker">KRÓTKI BRIEF · OKOŁO 1 MINUTY</p><h2 id="koncept-form">Pokaż mi swoją firmę.<br /><em>Resztę zaproponuję.</em></h2><p>Wypełnij krótki formularz. Nie proszę o budżet i nie zapisuję Cię automatycznie do newslettera. W odpowiedzi otrzymasz informację o możliwości przygotowania koncepcji i dalszym kroku.</p><div className="zm-concept-request-note"><strong>Co obejmuje bezpłatna propozycja?</strong><span>Jeden poglądowy widok lub sekcja • trzy potencjalne korzyści • krótka rekomendacja</span></div></div>
        <ConceptRequestForm />
      </section>

      <section className="zm-concept-faq zm-concept-shell" aria-labelledby="koncept-faq">
        <div className="zm-concept-section-head"><p>PYTANIA I ODPOWIEDZI</p><h2 id="koncept-faq">Wszystko jasno,<br />bez drobnego druku.</h2></div>
        <div className="zm-concept-faq-items">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        <p className="zm-concept-disclaimer">Materiał ma charakter poglądowy. Nie obejmuje pełnego projektu graficznego, kodu strony, nieograniczonych poprawek ani audytu technicznego. Możliwość przygotowania koncepcji potwierdzam po zapoznaniu się ze zgłoszeniem.</p>
      </section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
