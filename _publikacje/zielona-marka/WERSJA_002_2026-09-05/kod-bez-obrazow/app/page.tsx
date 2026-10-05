import type { Metadata } from "next";
import Link from "./SafeLink";
import ContactForm from "./ContactForm";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "./SiteChrome";
import { corePackages, projects } from "./site-data";

export const metadata: Metadata = {
  title: "Strony internetowe dla lokalnych firm usługowych",
  description: "Strony, formularze wyceny i chatboty dla warsztatów, ekip remontowych, instalatorów, branży beauty i firm usługowych z Marek oraz okolic.",
  alternates: { canonical: "/", languages: { pl: "/", en: "/en" } },
};

const problems = [
  ["01", "Klienci podają za mało informacji", "Formularz zbiera rodzaj usługi, termin, lokalizację i zdjęcia potrzebne do pierwszej oceny."],
  ["02", "Strona nie prowadzi do kontaktu", "Porządkuję ofertę, przyciski oraz drogę od Google i Facebooka do konkretnego zgłoszenia."],
  ["03", "Zapytania giną w telefonach i wiadomościach", "Łączę formularz, e-mail i prosty następny krok, aby każde zgłoszenie miało właściciela."],
  ["04", "Te same pytania zabierają czas", "Chatbot odpowiada z zatwierdzonej bazy wiedzy, zbiera kontakt i przekazuje rozmowę człowiekowi."],
];

export default function Home() {
  return <>
    <SiteHeader />
    <main id="top">
      <section className="sales-hero shell">
        <div className="eyebrow"><span />STRONY WWW · FORMULARZE WYCENY · MAŁY CRM</div>
        <p className="sales-hero-kicker">Dla warsztatów, ekip remontowych, branży beauty i lokalnych firm usługowych.</p>
        <h1>Tworzę cyfrowe miejsca, <em>w których marki rosną.</em></h1>
        <p className="sales-hero-copy">Projektuję szybkie, charakterystyczne strony, formularze i małe CRM-y, które pomagają firmom zdobywać klientów i nie gubić żadnego zapytania.</p>
        <div className="hero-actions">
          <Link className="button" href="/kontakt">Sprawdź rozwiązanie dla firmy <span>↗</span></Link>
          <Link className="text-link" href="/strony-internetowe-marki">Działamy w Markach i okolicy <span>↓</span></Link>
        </div>
        <div className="sales-hero-proof" aria-label="Najważniejsze zasady Zielonej Marki"><span>Jasny zakres</span><span>30% na start · 70% przed publikacją</span><span>Kontrola jakości (QA) i 14 dni wsparcia</span></div>
      </section>

      <section className="section shell niche-section" id="dla-kogo">
        <div className="section-head"><div><span className="section-no">TRZY GŁÓWNE KIERUNKI</span><h2>Rozwiązanie dopasowane do sposobu obsługi klienta.</h2></div><p>Formularz, treść i kolejne kroki wynikają z tego, czy firma wycenia zlecenia, przyjmuje pojazdy czy umawia wizyty.</p></div>
        <div className="niche-grid niche-grid-three">
          <article><span>01 / MOTORYZACJA</span><h3>Warsztaty i detailing</h3><p>Marka i model auta, usterka, preferowany termin, zdjęcia oraz kontakt w jednym zgłoszeniu.</p><Link className="button" href="/strony-dla-warsztatow">Zobacz demonstrację <b>↗</b></Link></article>
          <article><span>02 / USŁUGI DLA DOMU</span><h3>Remonty i instalacje</h3><p>Rodzaj prac, lokalizacja, pilność, zdjęcia miejsca i oczekiwany termin bez wielokrotnego dopytywania.</p><Link className="button" href="/strony-dla-firm-uslugowych">Zobacz demonstrację <b>↗</b></Link></article>
          <article><span>03 / WIZYTY</span><h3>Beauty i pokrewne usługi</h3><p>Oferta, wybór zabiegu, rezerwacja, przypomnienie i prośba o opinię w jednej spójnej ścieżce.</p><Link className="button" href="/strony-dla-beauty">Zobacz demonstrację <b>↗</b></Link></article>
        </div>
      </section>

      <section className="problem-section"><div className="shell">
        <div className="section-head"><div><span className="section-no">ZACZNIJ OD PROBLEMU</span><h2>Co dziś zabiera czas albo blokuje sprzedaż?</h2></div><p>Technologia jest narzędziem. Najpierw ustalamy, czego brakuje klientom i czego potrzebuje firma, żeby szybko odpowiedzieć.</p></div>
        <div className="problem-grid">{problems.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><Link href={number === "02" ? "/modernizacja-strony" : number === "04" ? "/chatbot-dla-firm" : "/oferta"}>Zobacz rozwiązanie <b>↗</b></Link></article>)}</div>
      </div></section>

      <section className="rebuild-banner dark-section"><div className="shell rebuild-grid"><div><span className="section-no">MODERNIZACJA ZAMIAST ZMIANY DLA ZMIANY</span><h2>Stara strona nie zawsze wymaga budowy od zera. <em>Najpierw sprawdzam, co warto poprawić.</em></h2></div><div><p>Ocenię widok na telefonie, ofertę, kontakt, szybkość i przygotowanie do Google. Potem dostaniesz prostą odpowiedź: poprawiamy czy budujemy od nowa.</p><Link className="button button-light" href="/modernizacja-strony">Sprawdź obecną stronę <span>↗</span></Link></div></div></section>

      <section className="section founder-section">
        <div className="shell founder-grid"><div className="founder-heading"><span className="section-no">POZNAJMY SIĘ</span><h2>Mam na imię Łukasz. Od 2011 roku prowadzę działalność, a&nbsp;od 2014 zawodowo pracuję z&nbsp;kodem.</h2></div><div className="founder-body"><div className="founder-copy"><div className="founder-prose"><p>W praktyce projektuję strony, formularze, integracje i&nbsp;proste narzędzia, które pomagają firmom sprawniej obsługiwać zapytania. Prowadzenie własnej firmy nauczyło mnie też patrzeć na rozwiązania od strony człowieka, który ma mało czasu, dużo spraw do załatwienia i&nbsp;potrzebuje konkretu.</p><p>Pracowałem przy projektach dla firm i&nbsp;instytucji publicznych, w&nbsp;tym przy audytach dla sektora bankowego. Szczegóły takich projektów pozostają poufne, ale to doświadczenie nauczyło mnie dokładności, odpowiedzialności i&nbsp;patrzenia na cały proces, nie tylko na ekran.</p><p>Dziś wykorzystuję to doświadczenie, tworząc dla firm strony, formularze i&nbsp;proste zaplecza do obsługi zapytań. Zaczynam od tego, co klient Twojej firmy ma znaleźć, zrozumieć i&nbsp;zrobić. Dopiero potem dobieram sposób wykonania.</p><p>Mam też doświadczenie w&nbsp;kontroli jakości (QA, ang. Quality Assurance). Przed publikacją sprawdzam najważniejsze ścieżki klienta, formularze, kontakt oraz działanie strony na telefonie i&nbsp;komputerze.</p><p>Po publikacji mogę też podłączyć pomiar ruchu za zgodą odwiedzających. Pokazuje on, skąd ludzie trafiają na stronę, które podstrony oglądają i&nbsp;które działania prowadzą do kontaktu. W razie potrzeby dodaję anonimowe mapy kliknięć i&nbsp;przewijania, aby poprawiać układ na podstawie faktycznego korzystania ze strony.</p></div></div><figure className="founder-visual founder-feature-photo"><img src="/spotkanie-online-przygotowanie-projektu-zielona-marka.png" alt="Łukasz prowadzący konsultację projektu przez Google Meet" loading="lazy" /><figcaption>Konsultacja online, wspólne ustalenie kierunku i kolejnych kroków projektu.</figcaption></figure><figure className="founder-process-photo"><img src="/mapa-procesu-zielona-marka.png" alt="Mapa procesu obsługi klienta" loading="lazy" /><div className="founder-process-labels" aria-label="Etapy procesu"><span>Zapytanie</span><span>Wycena</span><span>Realizacja</span><span>Odbiór</span></div><figcaption>Każde zapytanie ma kolejny, jasny krok.</figcaption></figure></div><div className="founder-tech-full"><p className="founder-tech-intro"><b>Technologię dobieram do celu.</b> Poniżej pokazuję, co oznaczają nazwy narzędzi i&nbsp;jak mogą pomóc firmie w&nbsp;codziennej pracy.</p><ul><li><b>HTML i&nbsp;CSS — struktura oraz wygląd strony</b><span>Ustawiają czytelną treść, hierarchię nagłówków, kolory, układ i&nbsp;wersję wygodną na telefonie.</span></li><li><b>JavaScript, TypeScript i&nbsp;React — strona, która reaguje</b><span>Obsługują formularze, kalkulatory, menu i&nbsp;inne elementy interaktywne. TypeScript pomaga wychwycić część błędów przed publikacją, a&nbsp;React porządkuje większe widoki.</span></li><li><b>Java, PHP i&nbsp;Python — logika działająca w&nbsp;tle</b><span>Pozwalają tworzyć zasady działania formularzy, automatyczne wiadomości, wyceny, integracje oraz funkcje zaplecza firmy.</span></li><li><b>API i&nbsp;webhooki — połączenie używanych narzędzi</b><span>Dane z&nbsp;formularza mogą trafić do poczty, kalendarza, arkusza albo CRM-u bez ręcznego przepisywania.</span></li><li><b>SQL i&nbsp;Cloudflare D1 — uporządkowane dane</b><span>Tworzą bezpieczniejsze miejsce na kontakty, zapytania, statusy zleceń i&nbsp;następne działania zespołu.</span></li><li><b>WordPress, Gutenberg i&nbsp;motyw blokowy — samodzielna edycja</b><span>Motyw określa wygląd strony, a&nbsp;edytor blokowy pozwala firmie zmieniać teksty, zdjęcia, ofertę, nagłówek i&nbsp;stopkę bez edytowania kodu.</span></li><li><b>PHP, MySQL i&nbsp;pola własne WordPressa — treść oraz funkcje</b><span>PHP uruchamia logikę WordPressa, MySQL przechowuje treść, a&nbsp;pola własne pomagają uporządkować usługi, realizacje, cenniki i&nbsp;często zadawane pytania.</span></li><li><b>WordPress REST API — integracje bez przepisywania danych</b><span>Umożliwia połączenie formularza WordPressa z&nbsp;pocztą, kalendarzem, arkuszem, CRM-em albo innym zatwierdzonym systemem.</span></li><li><b>Excel, Google Sheets i&nbsp;raporty — liczby w&nbsp;jednym miejscu</b><span>Pomagają uporządkować koszty, terminy, sprzedaż i&nbsp;powtarzalne zestawienia bez budowania dużego systemu.</span></li><li><b>QA, bezpieczeństwo i&nbsp;analityka — kontrola po publikacji</b><span>Przed startem sprawdzam ścieżkę klienta, formularze, telefon i&nbsp;komputer. HTTPS, SMTP, ochrona przed spamem, cache i&nbsp;kopie zapasowe pomagają utrzymać stronę w&nbsp;dobrej kondycji, a&nbsp;narzędzia Google mierzą wejścia oraz zapytania.</span></li></ul><div className="hero-actions founder-actions"><Link className="button" href="/jak-pracuje">Zobacz, jak pracuję <span>↗</span></Link><a className="text-link" href="https://github.com/lukaszst-cz" target="_blank" rel="noreferrer">Publiczne projekty na GitHubie <span>↗</span></a></div></div></div>
      </section>

      <section className="section shell">
        <div className="section-head"><div><span className="section-no">PROJEKTY DEMONSTRACYJNE</span><h2>Zobacz stronę i proces, zanim porozmawiamy o wdrożeniu.</h2></div><p>Każdy projekt pokazowy jest jasno oznaczony. Demonstracje nie są przedstawiane jako realizacje prawdziwych klientów.</p></div>
        <div className="project-preview-grid">{projects.filter(project => project.name === "Auto Naprawa" || project.name === "Natura Studio" || project.name === "RouteFlow Transport").map((project) => <article key={project.name} className="project-preview"><div className="project-preview-image" style={{ backgroundImage: `linear-gradient(180deg,rgba(10,31,22,.08),rgba(10,31,22,.78)),url(${project.imageUrl})` }}><span>{project.note}</span><b>{project.n}</b></div><div><small>{project.type}</small><h3>{project.name}</h3><p>{project.description}</p><Link href="/realizacje">Zobacz demonstrację <b>↗</b></Link></div></article>)}</div>
        <Link className="section-link" href="/realizacje">Zobacz wszystkie projekty demonstracyjne <span>↗</span></Link>
      </section>

      <section className="section offer-teaser"><div className="shell"><div className="section-head"><div><span className="section-no">TRZY PROSTE PAKIETY</span><h2>Strona, system zapytań albo pełny przepływ.</h2></div><p>Najczęściej rekomenduję ZM LeadFlow: stronę połączoną z formularzem, który zbiera dane potrzebne do pierwszej rozmowy, wyceny lub rezerwacji.</p></div>
        <div className="core-package-grid">{corePackages.map((item, index) => <article key={item.title} className={index === 1 ? "featured" : ""}><span>{item.label}</span><div className="package-number">0{index + 1}</div><h3>{item.title}</h3><b>{item.price}</b><p>{item.lead}</p><ul>{item.includes.slice(0, 3).map((line) => <li key={line}>{line}</li>)}</ul><small>{item.time}</small><Link href="/oferta">Poznaj zakres <i>↗</i></Link></article>)}</div>
      </div></section>

      <section className="section shell more-services"><div className="section-head"><div><span className="section-no">PEŁNA OFERTA ZOSTAJE</span><h2>Strona może być pierwszym etapem większego usprawnienia.</h2></div><p>Główne branże ułatwiają rozpoczęcie rozmowy. Pozostałe rozwiązania są nadal dostępne i mają własne miejsca na stronie.</p></div><div className="more-services-grid"><Link href="/usprawnienia-firmy#automatyzacje"><span>01</span><h3>Automatyzacje i integracje</h3><p>Formularze, e-mail, kalendarz, arkusze i używane systemy zaczynają współpracować.</p><b>Zobacz możliwości ↗</b></Link><Link href="/maly-crm-dla-firm"><span>02</span><h3>Mały CRM i statusy</h3><p>Klienci, zapytania, zlecenia, terminy i następny krok w jednym miejscu.</p><b>Zobacz Mały CRM ↗</b></Link><Link href="/oferta#mini-sklep"><span>03</span><h3>Mini sklep i vouchery</h3><p>Sprzedaż kilku produktów, zestawów lub voucherów bez budowania wielkiego sklepu.</p><b>Zobacz zakres ↗</b></Link><Link href="/strony-internetowe-marki"><span>04</span><h3>Google i widoczność lokalna</h3><p>Spójne dane, usługi, obszar działania, Search Console i mierzenie zapytań.</p><b>Zobacz lokalne SEO ↗</b></Link></div></section>

      <section className="chatbot-band dark-section"><div className="shell chatbot-band-grid"><div><span className="section-no">CHATBOT DEMONSTRACYJNY</span><h2>Najpierw wypróbuj go <em>na naszej stronie.</em></h2><p>Asystent w prawym dolnym rogu pokaże, jak rozpoznać potrzebę klienta, zebrać kontakt i przekazać uporządkowane zgłoszenie.</p></div><div><button className="button button-light" type="button" data-open-demo-chat>Uruchom chatbota <span>↗</span></button><Link href="/chatbot-dla-firm">Jak działa wdrożenie <span>→</span></Link></div></div></section>

      <section className="section crm-home"><div className="shell crm-home-grid"><div><span className="section-no">MAŁY CRM DLA FIRMY</span><h2>Zapytanie nie kończy się w skrzynce. <em>Dostaje status i następny krok.</em></h2><p>Prosty panel pokazuje, kto czeka na odpowiedź, komu wysłano wycenę, które zlecenie jest w realizacji i kiedy trzeba wrócić do klienta. Bez wdrażania dużego, drogiego systemu.</p><div className="hero-actions"><Link className="button" href="/maly-crm-dla-firm">Zobacz Mały CRM <span>↗</span></Link><Link className="text-link" href="/usprawnienia-firmy#film">Obejrzyj film 20 s <span>→</span></Link></div></div><div className="crm-home-board" aria-label="Przykładowy lejek Małego CRM"><header><span>DZISIAJ / ZAPYTANIA</span><b>4 aktywne</b></header><article><i>01</i><div><b>Nowe zapytanie</b><small>oddzwoń do 12:00</small></div><span>NOWE</span></article><article><i>02</i><div><b>Wycena wysłana</b><small>przypomnienie jutro</small></div><span>OFERTA</span></article><article><i>03</i><div><b>Zlecenie przyjęte</b><small>termin: piątek</small></div><span>REALIZACJA</span></article><footer>Każdy klient ma właściciela i kolejny krok.</footer></div></div></section>

      <section className="section quality-section"><div className="shell quality-grid"><div><span className="section-no">GOTOWA DO STARTU</span><h2>Przed publikacją sprawdzam to, czego klient nie powinien sam pilnować.</h2><p>Kontrola jakości (QA) obejmuje najważniejsze elementy strony, zanim zobaczy ją pierwszy klient.</p><Link href="/jak-pracuje">Zobacz proces i zasady 30/70 <b>↗</b></Link></div><ul><li><b>01</b>Telefon, tablet i komputer</li><li><b>02</b>Formularze, linki i kontakt</li><li><b>03</b>Szybkość oraz stabilność</li><li><b>04</b>Podstawy SEO i Google</li><li><b>05</b>Dostępność i czytelność</li><li><b>06</b>Pełna ścieżka klienta</li></ul></div></section>

      <section className="section contact-section" id="kontakt"><div className="shell contact-grid"><div><span className="section-no">ZACZNIJMY</span><h2>Opowiedz, jak dziś trafiają do Ciebie klienci.</h2><p>Odpowiadam najpóźniej w następnym dniu roboczym. Możemy rozmawiać telefonicznie, przez Google Meet, e-mail lub WhatsApp.</p><div className="contact-direct"><a href="tel:+48450458466"><small>M:</small><strong>+48 450 458 466</strong></a><a href="mailto:kontakt@zielona-marka.pl"><small>E-mail:</small><strong>kontakt@zielona-marka.pl</strong></a></div></div><div><span className="contact-form-kicker">KRÓTKI BRIEF · OKOŁO 1 MINUTY</span><ContactForm /></div></div></section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}






