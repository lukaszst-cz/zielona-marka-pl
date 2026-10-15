import type { Metadata } from "next";
import Link from "../SafeLink";
import QualityPrintButton from "../QualityPrintButton";
import { QaLocalNav, QaDocumentCards } from "../QaStandardsNavigation";
import { SiteHeader, SiteFooter, QuickWhatsApp } from "../SiteChrome";

export const metadata: Metadata = {
 title: "Standard kontroli jakości DTP i Prepress",
 description: "Szczegółowa lista kontroli przed drukiem: PDF/X, spady, TrimBox, BleedBox, ICC, CMYK, overprint, obrazy, proofy, kody i introligatornia.",
 alternates:{canonical:"/standard-dtp"},
  openGraph: { type: "website", url: "/standard-dtp", title: "Standard kontroli jakości DTP i prepress | Zielona Marka", description: "Szczegółowa lista kontroli przed drukiem: PDF/X, spady, TrimBox, BleedBox, ICC, CMYK, overprint, obrazy, proofy, kody i introligatornia.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Standard DTP marki Zielona Marka – przygotowanie plików do druku" }] },
  twitter: { card: "summary_large_image", title: "Standard kontroli jakości DTP i prepress | Zielona Marka", description: "Szczegółowa lista kontroli przed drukiem: PDF/X, spady, TrimBox, BleedBox, ICC, CMYK, overprint, obrazy, proofy, kody i introligatornia.", images: ["/og.jpg"] },
};
const checks=[
 {n:"01",title:"Brief i wymagania drukarni",items:["Format netto i otwarty, nakład, materiał i gramatura","Technologia druku, termin, liczba wersji i języków","Specyfikacja przekazana przez wybraną drukarnię","Falcowanie, oprawa, uszlachetnienia i warunki odbioru"]},
 {n:"02",title:"Treść i korekta",items:["Nazwy produktów, dane firmy i numery kontaktowe","Ceny, waluty, jednostki oraz daty promocji","Korekta językowa, kolejność stron i odsyłacze","Zatwierdzone teksty i licencje na wykorzystane materiały"]},
 {n:"03",title:"Typografia i projekt",items:["Osadzenie i poprawność użytych fontów","Drobny druk, kontrast i czytelność","Łamanie, dzielenie wyrazów i hierarchia tekstu","Brak niezamierzonych przesunięć i ukrytych elementów"]},
 {n:"04",title:"Spady, marginesy i geometria",items:["Format TrimBox, BleedBox i MediaBox","Spady zgodne z wymaganiami produkcyjnymi","Margines bezpieczeństwa istotnych elementów","Poprawna orientacja, liczba i kolejność stron"]},
 {n:"05",title:"Obrazy i grafika",items:["Efektywna rozdzielczość przy wymiarze wydruku","Brak utraty jakości, rozmyć i artefaktów","Prawidłowe kadry, maski i przezroczystości","Kompletne linki do ilustracji i grafik"]},
 {n:"06",title:"Kolor i separacje",items:["Poprawny profil ICC i docelowy warunek druku","Kontrola CMYK, RGB i ewentualnych konwersji","Prawidłowe kolory dodatkowe i oznaczenia Pantone","Weryfikacja pokrycia farbą i zachowania czerni"]},
 {n:"07",title:"Overprint i wykończenia",items:["Nadrukowywanie i wycinanie kolorów (knockout)","Kontrola bieli i elementów wielobarwnych","Osobne separacje lakieru, białego poddruku i złocenia","Wykrojniki, linie bigu i strefy klejenia"]},
 {n:"08",title:"PDF/X i preflight",items:["Właściwy format eksportu, np. PDF/X-4, jeśli wymagany","Output Intent oraz obecność niezbędnych danych","Osadzone fonty, właściwe boxy i prawidłowe separacje","Raport preflight bez błędów blokujących"]},
 {n:"09",title:"Falcowanie i introligatornia",items:["Układ stron, składki i sposób składania","Grzbiet, miejsce klejenia i naddatki","Perforacje, otwory, spawy i obszary montażowe","Kontrola na makiecie, jeśli jest wymagana"]},
 {n:"10",title:"QR, kody i personalizacja",items:["Prawidłowość odnośników i danych kodów","Skanowanie próbne kodu w odpowiednim rozmiarze","Czytelność przy docelowym kontraście","Test wersji i zmiennych danych, jeśli występują"]},
 {n:"11",title:"Proof i akceptacja",items:["Ocena wizualna w uzgodnionym zakresie","Soft proof z właściwym profilem i stanowiskiem","Hard-copy proof, gdy jest wymagany przez projekt","Akceptacja uprawnionej osoby i rejestr odstępstw"]},
 {n:"12",title:"Wydanie produkcyjne",items:["Kontrola gotowego PDF po eksporcie","Numer wersji, nazwa pliku i komplet materiałów","Przekazanie wymagań dodatkowych drukarni","Archiwizacja pliku, raportu i potwierdzeń"]},
];
export default function DtpStandardPage() {
  return <><SiteHeader /><main className="zm-public qa-page">
    <section className="page-hero shell qa-hero" aria-labelledby="qa-dtp-heading">
      <nav className="qa-crumbs" aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link><span aria-hidden="true">/</span><Link href="/standardy-jakosci">Jakość i normy</Link><span aria-hidden="true">/</span><span>DTP / Prepress</span></nav>
      <span className="eyebrow">STANDARDY / ZIELONA MARKA / ZM-DTP-QA-001</span>
      <h1 id="qa-dtp-heading">Przed drukiem <em>liczy się każdy szczegół.</em></h1>
      <p>QA (ang. Quality Assurance) oznacza zapewnianie jakości — czyli zaplanowane sprawdzenie materiału przed oddaniem do drukarni. W praktyce weryfikujemy treść, wymiary, zdjęcia, kolory i poprawność pliku PDF, aby wychwycić błędy przed drukiem.</p>
      <div className="hero-actions qa-hero-actions">
        <a className="button" href="/downloads/zielona-marka-standard-dtp-prepress-qa-v3-1.pdf" download>Pobierz checklistę DTP · PDF <span aria-hidden="true">↓</span></a>
        <a className="text-link" href="#lista">Zobacz 12 obszarów kontroli <span aria-hidden="true">↓</span></a>
        <QualityPrintButton />
      </div>
      <p className="qa-hero-detail">Dokument ZM-DTP-QA-001, wydanie 3.1, 18 stron (w tym zachowany materiał 3.0) i 73 kryteria. Własny standard kontroli przedprodukcyjnej; nie jest certyfikatem ISO.</p>
    </section>
    <QaLocalNav active="/standard-dtp" />

    <section className="section shell qa-section" id="dokumenty">
      <div className="section-head"><div><span className="section-no">DOKUMENTACJA / DRUK I STRONY WWW</span><h2>Pobierz standard do wykorzystania przy zleceniu.</h2></div><p>Materiały pozwalają ustalić, co będzie sprawdzane i w jaki sposób dokumentujemy wyniki. PDF-y są bezpłatne i dostępne bez formularza.</p></div>
      <QaDocumentCards />
    </section>

    <section className="section shell qa-section" id="lista">
      <div className="section-head"><div><span className="section-no">PREPRESS / 12 OBSZARÓW</span><h2>Co dokładnie sprawdzamy przed produkcją?</h2></div><p>Dobór kryteriów zależy od podłoża, technologii, uszlachetnień, sposobu introligatorni i zaakceptowanej specyfikacji drukarni.</p></div>
      <div className="qa-cards qa-cards--three">{checks.map(item => <article className="qa-card" key={item.n}><span className="qa-kicker">KONTROLA / {item.n}</span><h3>{item.title}</h3><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul></article>)}</div>
    </section>

    <section className="section shell qa-section" id="odbior">
      <div className="section-head"><div><span className="section-no">ODSTĘPSTWA / WYNIK KONTROLI</span><h2>Co robimy, gdy znajdziemy błąd?</h2></div><p>Nie kończymy na samym wykryciu problemu. Istotne błędy poprawiamy, powtarzamy kontrolę i zapisujemy status konkretnej wersji pliku.</p></div>
      <div className="qa-statuses">
        <div><strong>PASS</strong><p>Przeprowadzono test, wynik spełnia kryterium i został udokumentowany.</p></div>
        <div><strong>REWORK</strong><p>Plik wymaga korekty oraz ponownego sprawdzenia.</p></div>
        <div><strong>HOLD</strong><p>Wydanie wstrzymane do wyjaśnienia problemu lub otrzymania wymaganych danych.</p></div>
      </div>
      <p className="qa-note-p">Raport konkretnego zlecenia powinien zawierać wersję pliku, zakres kontroli, wynik preflight, odstępstwa i decyzję o wydaniu. Publiczna lista nie jest dowodem, że dowolny plik klienta przeszedł kontrolę.</p>
    </section>

    <section className="section shell qa-section" id="normy-iso">
      <div className="section-head"><div><span className="section-no">NORMY I TECHNOLOGIE DRUKU</span><h2>Punkty odniesienia ISO w prepress.</h2></div><p>Normy nie zastępują specyfikacji zakładu produkcyjnego. Wybieramy te, które rzeczywiście dotyczą danego materiału i procesu.</p></div>
      <div className="qa-cards">
        <article className="qa-card"><span className="qa-kicker">PDF/X</span><h3>ISO 15930-7</h3><p>Zasady przekazywania danych w formatach PDF/X-4 i PDF/X-4p.</p></article>
        <article className="qa-card"><span className="qa-kicker">OFFSET / PROOF</span><h3>ISO 12647-2 i 12647-7</h3><p>Parametry procesów drukarskich i określone wymagania dla cyfrowych proofów.</p></article>
        <article className="qa-card"><span className="qa-kicker">BARWA / WARUNKI OCENY</span><h3>ISO 13655 oraz ISO 3664</h3><p>Pomiary barwy i warunki wizualnej oceny odbitek w przewidzianych zastosowaniach.</p></article>
        <article className="qa-card"><span className="qa-kicker">OPAKOWANIA / ETYKIETY</span><h3>ISO 19593-1</h3><p>Struktura danych technologicznych PDF, np. dla wykrojników, bieli i lakierów.</p></article>
      </div>
      <div className="qa-standards-note"><strong>Bez mylenia pojęć:</strong> powyższe normy są technicznymi punktami odniesienia dla naszych procedur. Zielona Marka nie deklaruje certyfikacji ISO, akredytacji ani sprawdzenia każdej realizacji według wszystkich przywołanych standardów.</div>
      <div className="qa-link-stack"><Link href="/standardy-jakosci#iso">Jak opisujemy korzystanie z norm ISO ↗</Link><Link href="/standard-jakosci">Zasady sprawdzania stron i CRM ↗</Link></div>
    </section>

    <section className="section shell qa-section"><div className="qa-ending"><span className="section-no">DTP / WYDAJEMY PLIK PO KONTROLI</span><h2>Potrzebujesz projektu lub preflightu?</h2><p>Przygotujemy zakres kontroli i plik produkcyjny według specyfikacji Twojej drukarni.</p><div className="hero-actions"><Link className="button" href="/kontakt?pakiet=DTP%20i%20przygotowanie%20do%20druku">Zapytaj o kontrolę DTP <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/dtp">Zobacz ofertę DTP <span aria-hidden="true">↗</span></Link></div></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
