import type { Metadata } from "next";
import Link from "../SafeLink";
import QualityPrintButton from "../QualityPrintButton";
import { QaLocalNav, QaDocumentCards } from "../QaStandardsNavigation";
import { SiteHeader, SiteFooter, QuickWhatsApp } from "../SiteChrome";

export const metadata: Metadata = {
 title: "Standard jakości – jak realizujemy projekty",
 description: "Zobacz osiem etapów realizacji stron WWW, sklepów, grafiki i systemów oraz zasady kontroli jakości Zielonej Marki. Własne procedury inspirowane normami ISO.",
 alternates: {canonical:"/standard-jakosci"},
  openGraph: { type: "website", url: "/standard-jakosci", title: "Standard jakości projektów WWW i systemów | Zielona Marka", description: "Zobacz osiem etapów realizacji stron WWW, sklepów, grafiki i systemów oraz zasady kontroli jakości Zielonej Marki. Własne procedury inspirowane normami ISO.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Standard jakości projektów Zielonej Marki – etapy realizacji i kontroli" }] },
  twitter: { card: "summary_large_image", title: "Standard jakości projektów WWW i systemów | Zielona Marka", description: "Zobacz osiem etapów realizacji stron WWW, sklepów, grafiki i systemów oraz zasady kontroli jakości Zielonej Marki. Własne procedury inspirowane normami ISO.", images: ["/og.jpg"] },
};
const steps=[
 ["01","Zapytanie i kwalifikacja","Poznajemy firmę, cel projektu, termin i wstępny zakres."],
 ["02","Brief i wymagania","Ustalamy odbiorców, funkcje, treści, ryzyka i oczekiwane rezultaty."],
 ["03","Wycena i zasady","Potwierdzamy zakres, harmonogram, cenę i sposób zatwierdzania zmian."],
 ["04","Projekt i kierunek","Przedstawiamy strukturę, wygląd i główne ścieżki użytkownika."],
 ["05","Realizacja","Wykonujemy projekt, uzgodnione funkcje, treści i integracje."],
 ["06","Kontrola jakości","Sprawdzamy działanie oraz kryteria techniczne właściwe dla produktu."],
 ["07","Odbiór i publikacja","Akceptujemy wersję końcową, publikujemy i przekazujemy dokumentację."],
 ["08","Wsparcie i rozwój","Uzgadniamy opiekę, analizujemy zgłoszenia i doskonalimy procedury."],
] as const;
const tracks=[
 {num:"01 / WWW",title:"Strony i landing page",items:["Responsywność, czytelność i dostępność","Linki, formularze i ścieżka kontaktu","Metadane, mapa strony i indeksowanie","Wydajność, HTTPS i testy po publikacji"],href:"/raport-qa",cta:"Przykładowy raport kontroli jakości"},
 {num:"02 / E-COMMERCE",title:"Sklepy internetowe",items:["Koszyk i pełna ścieżka zamówienia","Testy płatności, wyjątków i powiadomień","Dostępność i prywatność w uzgodnionym zakresie","Role użytkowników i zabezpieczenia"],href:"/oferta",cta:"Zobacz ofertę"},
 {num:"03 / PREPRESS",title:"Grafika i DTP",items:["Treść, typografia, fonty i obrazy","Spady, PDF/X, ICC i separacje","Overprint, lakier, wykrojniki i falcowanie","Proofing, akceptacja i plik produkcyjny"],href:"/standard-dtp",cta:"Pełny standard DTP"},
 {num:"04 / SYSTEMY",title:"CRM i automatyzacje",items:["Mapa procesów i wymagań","Role, uprawnienia, integralność danych","Integracje, scenariusze błędów i kopie zapasowe","Testy odbiorowe i przekazanie dostępu"],href:"/maly-crm-dla-firm",cta:"Poznaj CRM"},
];
export default function QualityStandardPage() {
  return <><SiteHeader /><main className="zm-public qa-page">
    <section className="page-hero shell qa-hero" aria-labelledby="qa-main-heading">
      <nav className="qa-crumbs" aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link><span aria-hidden="true">/</span><Link href="/standardy-jakosci">Jakość i normy</Link><span aria-hidden="true">/</span><span>Standard projektów</span></nav>
      <span className="eyebrow">STANDARDY ZIELONEJ MARKI / ZM-QMS-001</span>
      <h1 id="qa-main-heading">Dobry projekt powstaje w <em>dobrze prowadzonym procesie.</em></h1>
      <p>QA (ang. Quality Assurance) to zapewnianie jakości. W praktyce ustalamy wymagania, sprawdzamy działanie strony lub systemu, poprawiamy wykryte błędy i potwierdzamy wynik przed przekazaniem projektu. Zobacz kolejne etapy i pobierz opis procedur.</p>
      <div className="hero-actions qa-hero-actions">
        <a className="button" href="/downloads/zielona-marka-standard-jakosci-www-dtp-crm.pdf" download>Pobierz standard jakości · PDF <span aria-hidden="true">↓</span></a>
        <a className="text-link" href="#etapy">Poznaj 8 etapów <span aria-hidden="true">↓</span></a>
        <QualityPrintButton />
      </div>
      <p className="qa-hero-detail">Dokument ZM-QMS-001, wydanie 3.0, 10 stron. Własny standard pracy; nie jest to certyfikat ISO.</p>
    </section>
    <QaLocalNav active="/standard-jakosci" />

    <section className="section shell qa-section" id="dokumenty" aria-labelledby="qa-files-heading">
      <div className="section-head"><div><span className="section-no">DOKUMENTACJA DO POBRANIA</span><h2 id="qa-files-heading">Zasady zapisane, nie tylko opisane.</h2></div><p>Dwa aktualne dokumenty firmowe obejmują proces tworzenia stron i systemów oraz osobną kontrolę materiałów przygotowywanych do druku.</p></div>
      <QaDocumentCards />
    </section>

    <section className="section shell qa-section" id="etapy">
      <div className="section-head"><div><span className="section-no">OD ZAPYTANIA DO OPIEKI</span><h2>Osiem etapów. Jedna zasada jakości.</h2></div><p>Zakres kontroli wynika z rodzaju produktu i ryzyk projektu. Małe realizacje również przechodzą adekwatne sprawdzenia.</p></div>
      <div className="qa-timeline">{steps.map(([n, title, description]) => <div className="qa-step" key={n}><span>{n}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div>
    </section>

    <section className="section shell qa-section" id="kontrola">
      <div className="section-head"><div><span className="section-no">ZAKRES TESTÓW</span><h2>Co sprawdzamy w poszczególnych realizacjach?</h2></div><p>Testy techniczne są różne dla strony firmowej, sklepu, DTP i CRM. Nie przedstawiamy jednej listy jako obowiązkowej dla wszystkich produktów.</p></div>
      <div className="qa-cards">{tracks.map(track => <article className="qa-card" key={track.num}><span className="qa-kicker">{track.num}</span><h3>{track.title}</h3><ul>{track.items.map(item => <li key={item}>{item}</li>)}</ul><Link className="text-link" href={track.href}>{track.cta} <span aria-hidden="true">↗</span></Link></article>)}</div>
    </section>

    <section className="section shell qa-section" id="wyniki">
      <div className="section-head"><div><span className="section-no">KONTROLA I DECYZJA</span><h2>Wynik kontroli jakości musi mieć uzasadnienie.</h2></div><p>Sama checklista nie jest dowodem kontroli. Wyniki konkretnego projektu wymagają sprawdzenia i zapisania informacji o teście.</p></div>
      <div className="qa-statuses">
        <div><strong>PASS — sprawdzone</strong><p>Wymaganie spełnione, a wynik kontroli potwierdzony w dokumentacji.</p></div>
        <div><strong>REWORK — poprawa</strong><p>Zidentyfikowana niezgodność wymaga poprawki i powtórzenia testu.</p></div>
        <div><strong>HOLD — wstrzymanie</strong><p>Etap zatrzymujemy, jeżeli brakuje specyfikacji, akceptacji lub bezpieczeństwa wykonania.</p></div>
      </div>
      <p className="qa-note-p">Początkowy status punktu to „NIE SPRAWDZONO”. „N/D” oznacza brak zastosowania danego kryterium i wymaga uzasadnienia.</p>
      <p><Link className="text-link" href="/raport-qa">Zobacz przykładowy raport kontroli jakości <span aria-hidden="true">↗</span></Link></p>
    </section>

    <section className="section shell qa-section" id="normy-iso">
      <div className="section-head"><div><span className="section-no">JAKOŚĆ I STANDARDY TECHNICZNE</span><h2>Jak korzystamy z norm ISO?</h2></div><p>Odnosimy procedury do właściwych norm i dobrych praktyk. Rzeczywiste wymagania zależą od technologii, zakresu i ustaleń projektu.</p></div>
      <div className="qa-cards qa-cards--three">
        <article className="qa-card"><span className="qa-kicker">ZARZĄDZANIE</span><h3>ISO 9001:2026</h3><p>Uporządkowanie procesu, identyfikowanie ryzyka, dokumentowanie odbioru i doskonalenie pracy.</p></article>
        <article className="qa-card"><span className="qa-kicker">PRODUKT CYFROWY</span><h3>ISO/IEC 25010:2023</h3><p>Model cech jakości produktu cyfrowego, pomocny przy projektowaniu zakresu kontroli systemu.</p></article>
        <article className="qa-card"><span className="qa-kicker">POLIGRAFIA</span><h3>ISO 15930 i 12647</h3><p>Odpowiednie standardy wymiany plików produkcyjnych i kontroli procesów drukarskich, stosownie do wymagań drukarni.</p></article>
      </div>
      <div className="qa-standards-note"><strong>Ważne rozróżnienie:</strong> Zielona Marka korzysta z własnych procedur inspirowanych zasadami tych norm. Nie deklarujemy certyfikacji ISO 9001, akredytacji ani zewnętrznego audytu. Nie każdy punkt norm ma zastosowanie do każdej realizacji.</div>
      <div className="qa-link-stack"><Link href="/standardy-jakosci#iso">Wyjaśnienie ISO i zakres stosowania ↗</Link><Link href="/standard-dtp">Normy techniczne DTP ↗</Link></div>
    </section>
    <section className="section shell qa-section"><div className="qa-ending"><span className="section-no">POROZMAWIAJMY O JAKOŚCI</span><h2>Wiesz, co będzie sprawdzane.</h2><p>Przed realizacją ustalamy zakres, wymagania i sposób odbioru — odpowiednio do potrzeb Twojej firmy.</p><div className="hero-actions"><Link className="button" href="/kontakt">Opowiedz o projekcie <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/standardy-jakosci">Zobacz centrum jakości <span aria-hidden="true">↗</span></Link></div></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
