import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Opieka nad stroną, hosting i koszty utrzymania",
  description: "Ile kosztuje utrzymanie strony WWW? Porównaj opiekę od 79 zł netto miesięcznie, hosting, domenę, SSL i odnowienia. Zobacz pełny koszt w kalkulatorze marki Zielona Marka.",
  alternates: { canonical: "/opieka-nad-strona" },
  openGraph: { type: "website", url: "/opieka-nad-strona", title: "Opieka nad stroną, hosting i koszty utrzymania | Zielona Marka", description: "Ile kosztuje utrzymanie strony WWW? Porównaj opiekę od 79 zł netto miesięcznie, hosting, domenę, SSL i odnowienia. Zobacz pełny koszt w kalkulatorze marki Zielona Marka.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka – strony internetowe, DTP i rozwiązania dla firm" }] },
  twitter: { card: "summary_large_image", title: "Opieka nad stroną, hosting i koszty utrzymania | Zielona Marka", description: "Ile kosztuje utrzymanie strony WWW? Porównaj opiekę od 79 zł netto miesięcznie, hosting, domenę, SSL i odnowienia. Zobacz pełny koszt w kalkulatorze marki Zielona Marka.", images: ["/og.jpg"] },
};

const care = [
  {
    label: "MINI / STRONA STATYCZNA", title: "Opieka Mini", price: "79 zł",
    forWhom: "Dla prostej strony wizytówkowej, która nie wymaga regularnego dodawania treści.",
    benefit: "Wiesz, czy strona jest dostępna i czy nie kończy się ważność domeny.",
    points: ["Comiesięczna kontrola dostępności strony i HTTPS", "Kontrola daty odnowienia domeny, gdy dane są dostępne", "Informacja, gdy podczas kontroli zauważę problem"],
    difference: "Podstawowy nadzór — bez zmian treści, napraw i aktualizacji systemu.",
    note: "Wyłącznie proste strony statyczne. Prace naprawcze i zmiany rozliczane oddzielnie."
  },
  {
    label: "STANDARD / MAŁA FIRMA", title: "Opieka Standard", price: "249 zł",
    forWhom: "Dla firm, które przyjmują zapytania ze strony i okresowo aktualizują ofertę.",
    benefit: "Oprócz kontroli dostępności sprawdzam formularz i pomagam utrzymać aktualną treść.",
    points: ["Comiesięczna kontrola dostępności, HTTPS i działania formularza", "Uzgodnione aktualizacje, jeśli wymaga ich technologia", "Kontrola podstawowych kopii zapasowych", "Do 30 minut drobnych zmian treści miesięcznie"],
    difference: "W porównaniu z Mini dochodzi kontrola formularza, podstawowych kopii i czas na drobne zmiany.",
    note: "Większe prace, licencje, płatne wtyczki i koszty usług zewnętrznych osobno."
  },
  {
    label: "PLUS / AKTYWNA STRONA", title: "Opieka Plus", price: "490 zł",
    forWhom: "Dla firm często zmieniających ofertę i oczekujących regularnej informacji o stanie strony.",
    benefit: "Masz więcej czasu na zmiany oraz krótkie podsumowanie, co warto poprawić w następnej kolejności.",
    points: ["Kontrola strony i formularzy w uzgodnionej częstotliwości", "Uzgodnione aktualizacje i kontrola możliwości odtworzenia kopii", "Do 60 minut drobnych zmian miesięcznie", "Krótkie miesięczne podsumowanie i lista priorytetów"],
    difference: "W porównaniu ze Standard: dwukrotnie więcej czasu na zmiany, uzgodniona częstotliwość kontroli i miesięczny raport.",
    note: "Nowe moduły, duże przebudowy i gwarantowana całodobowa reakcja nie są w pakiecie."
  },
] as const;

export default function CarePage() {
  return <><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />PO PUBLIKACJI / PRZEJRZYSTE KOSZTY</span><h1>Strona działa. <em>Wiesz, ile kosztuje jej utrzymanie.</em></h1><p>Projekt strony to wydatek jednorazowy. Domena, hosting i opcjonalna opieka mogą wracać co miesiąc lub co rok. Oddzielam te koszty, żebyś przed startem znał również cenę odnowienia usług.</p><div className="hero-actions"><Link className="button" href="/oferta#kalkulator-pelnego-kosztu">Oblicz pełny koszt <span>↗</span></Link><a className="text-link" href="#pakiety-opieki">Porównaj opiekę ↓</a></div></section>
    <section className="section shell" id="pakiety-opieki"><div className="section-head"><div><span className="section-no">TRZY WARIANTY OPIEKI</span><h2>Wybierz tyle wsparcia, ile rzeczywiście potrzebujesz.</h2></div><p>Podane ceny to orientacyjne stawki miesięczne netto. Zakres, obsługiwane technologie i warunki reakcji potwierdzamy przed zawarciem umowy. Opieka jest dobrowolna.</p></div>
      <div className="extra-grid care-plans">{care.map((item, index) => <article className="care-plan-card" key={item.title}><span className="section-no">{item.label}</span><h3>{item.title}</h3><strong className="zm-care-price">{item.price} <small>netto / mies.</small></strong><p className="care-plan-audience">{item.forWhom}</p><p className="care-plan-benefit"><strong>Co zyskujesz?</strong> {item.benefit}</p><h4 className="zm-package-list-label">Co obejmuje pakiet?</h4><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul><p className="care-plan-difference"><strong>{index === 0 ? "Najważniejsze:" : "Za wyższą cenę:"}</strong> {item.difference}</p><p className="legal-note"><strong>Ważne:</strong> {item.note}</p><Link href={"/kontakt?pakiet=" + encodeURIComponent(item.title)}>Zapytaj o {item.title} ↗</Link></article>)}</div><p className="care-plans-disclaimer">W każdym pakiecie ustalamy obsługiwany system, sposób zgłaszania problemów i harmonogram kontroli. Niewykorzystane minuty nie przechodzą automatycznie na kolejny miesiąc — warunki potwierdzamy w ofercie.</p>
    </section>
    <section className="section mini-shop-section" id="hosting-domena"><div className="shell mini-shop-grid"><div><span className="section-no">KTO ZA CO PŁACI</span><h2>Hosting i domena to usługi operatora, nie abonament za projekt.</h2><p>Najbezpieczniej, gdy domena i hosting są zarejestrowane na firmę klienta. Pomagam dobrać technologię, podłączyć DNS i HTTPS oraz uruchomić stronę. To, czy hosting jest bezpłatny, współdzielony czy bardziej rozbudowany, zależy od funkcji strony.</p><Link className="button" href="/oferta#kalkulator-pelnego-kosztu">Policz koszty trzech lat <span>↗</span></Link></div>
      <div><h3>Elementy rachunku</h3><ul className="check-list"><li>Domena – opłata za rejestrację i osobna, niekiedy znacznie wyższa opłata za odnowienie</li><li>Hosting – może być bezpłatny przy prostym statycznym serwisie albo płatny zgodnie z planem dostawcy</li><li>HTTPS i SSL – często bez osobnej opłaty, jeśli pakiet obejmuje darmowy certyfikat</li><li>Skrzynki pocztowe, kopie, licencje i płatne dodatki – według wybranego operatora</li><li>Opieka marki Zielona Marka – osobna, dobrowolna usługa</li></ul><p className="legal-note">Przykład ceny domeny .pl: OVHcloud podaje 16,69 zł netto za rejestrację i 58,99 zł netto za odnowienie; cyber_Folks 9,90 zł i 179 zł netto. Ceny zależą od dnia zamówienia, promocji i dostawcy. Źródła: <a href="https://www.ovhcloud.com/pl/domains/tld/pl/" target="_blank" rel="noreferrer">cennik OVHcloud ↗</a> i <a href="https://cyberfolks.pl/domeny/cennik/" target="_blank" rel="noreferrer">cennik cyber_Folks ↗</a>.</p></div></div></section>
    <section className="section shell" id="rozwoj"><div className="section-head"><div><span className="section-no">ROZWÓJ W TWOIM TEMPIE</span><h2>Zmiany i nowe funkcje bez obowiązkowego abonamentu.</h2></div><p>Możesz zlecać pojedyncze poprawki albo rozszerzyć stronę, gdy Twoja firma rzeczywiście ich potrzebuje.</p></div><div className="extra-grid"><article><h3>Nowe treści i podstrony</h3><p>Oferta, przykłady realizacji i widoczność lokalna. Zakres ustalamy przed rozpoczęciem.</p><Link href="/modernizacja-strony">Modernizacja strony ↗</Link></article><article><h3>Formularze, sprzedaż i rezerwacje</h3><p>Wyceny online, vouchery, sklep lub kalendarz zapisów – wdrożenie osobno.</p><Link href="/oferta#mini-sklep">Zobacz rozwiązania ↗</Link></article><article><h3>DTP i materiały firmowe</h3><p>Ulotki, wizytówki i gazetki mogą korzystać z tych samych kolorów i treści co strona.</p><Link href="/dtp">Sprawdź DTP ↗</Link></article></div></section>
    <section className="section shell price-rules"><div><span className="section-no">BEZ UKRYTYCH OPŁAT</span><h2>Przed podpisaniem umowy ustalamy odpowiedzialność.</h2></div><ol><li><b>Własność kont</b> – domena, hosting i usługi zewnętrzne na dane klienta.</li><li><b>Zakres opieki</b> – jasno wskazujemy co obejmuje abonament, a co dodatkowe zlecenie.</li><li><b>Koszty odnowienia</b> – pokazujemy pierwszy i kolejny rok, nie tylko promocyjną cenę.</li><li><b>Bez gwarancji pozycji Google</b> – utrzymanie techniczne nie oznacza abonamentu na SEO.</li></ol></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
