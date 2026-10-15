import type { Metadata } from "next";
import Link from "../SafeLink";
import QualityPrintButton from "../QualityPrintButton";
import { SiteHeader, SiteFooter, QuickWhatsApp } from "../SiteChrome";

export const metadata: Metadata = {
 title: "Standard kontroli jakości DTP i Prepress",
 description: "Szczegółowa lista kontroli przed drukiem: PDF/X, spady, TrimBox, BleedBox, ICC, CMYK, overprint, obrazy, proofy, kody i introligatornia.",
 alternates:{canonical:"/standard-dtp"},
  openGraph: { type: "website", url: "/standard-dtp", title: "Standard kontroli jakości DTP i prepress | Zielona Marka", description: "Szczegółowa lista kontroli przed drukiem: PDF/X, spady, TrimBox, BleedBox, ICC, CMYK, overprint, obrazy, proofy, kody i introligatornia.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Standard DTP Zielonej Marki – przygotowanie plików do druku" }] },
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
export default function DtpStandardPage(){return <><SiteHeader/><main className="zm-manual">
<section className="zm-manual__hero"><div className="zm-manual__inner"><span className="zm-manual__label">ZM-DTP-QA-001 / DTP • PREPRESS • DRUK</span>
<h1>Przed drukiem <em>liczy się każdy szczegół.</em></h1>
<p>Przed oddaniem materiału do produkcji sprawdzamy treść, geometrię, jakość obrazów, kolorystykę, PDF i wymagania konkretnej drukarni. Poniżej pokazujemy 12 obszarów kontroli jakości.</p>
<div className="zm-manual__actions"><a href="/downloads/zielona-marka-standard-dtp-prepress-qa.pdf" download>Pobierz standard DTP (PDF, 15 stron) ↓</a><a href="#lista">Zobacz checklistę ↓</a><QualityPrintButton/></div>
</div></section>
<div className="zm-manual__content">
<section className="zm-manual__section" id="lista"><h2>12 obszarów QA przed produkcją</h2><p className="zm-manual__intro">Nie wszystkie kontrole dotyczą każdego materiału. O ich zastosowaniu decydują produkt, technologia druku, sposób wykończenia i zaakceptowana specyfikacja. Parametrów technicznych nie ustalamy w oderwaniu od wymagań drukarni.</p>
<div className="zm-manual__grid">{checks.map(item=><article className="zm-manual__tile" key={item.n}><span>QA / {item.n}</span><h3>{item.title}</h3><ul>{item.items.map(i=><li key={i}>{i}</li>)}</ul></article>)}</div>
</section>
<section className="zm-manual__section"><h2>Co dzieje się, gdy wykryjemy błąd?</h2>
<div className="zm-manual__rules"><div className="zm-manual__rule"><strong>PASS</strong><p>Kontrola zakończona pozytywnie; zapisujemy wynik.</p></div><div className="zm-manual__rule"><strong>REWORK</strong><p>Poprawiamy plik i powtarzamy odpowiednią kontrolę.</p></div><div className="zm-manual__rule"><strong>HOLD</strong><p>Wstrzymujemy wydanie do uzyskania specyfikacji lub decyzji.</p></div></div>
<p className="zm-manual__intro">W raporcie konkretnego zlecenia podajemy numer wersji, zakres, wynik preflight, wykryte niezgodności, sposób ich usunięcia i datę akceptacji. Ta publiczna lista pokazuje metodę, a nie potwierdza przebadania dowolnego pliku.</p></section>
<section className="zm-manual__section"><h2>Normy wykorzystywane jako punkty odniesienia</h2>
<div className="zm-manual__grid zm-manual__grid--2">
<article className="zm-manual__tile"><span>PDF/X</span><h3>ISO 15930-7:2010</h3><p>Wymiana danych drukarskich w formacie PDF/X-4 i PDF/X-4p.</p></article>
<article className="zm-manual__tile"><span>OFFSET / PROOF</span><h3>ISO 12647-2 i 12647-7</h3><p>Parametry druku offsetowego oraz wymagania dla cyfrowych proofów hard-copy.</p></article>
<article className="zm-manual__tile"><span>BARWA / OŚWIETLENIE</span><h3>ISO 13655:2017 i ISO 3664:2025</h3><p>Pomiary barwometryczne i właściwe warunki oglądania odbitek. ISO 3664:2025 nie normuje soft proofu.</p></article>
<article className="zm-manual__tile"><span>OPAKOWANIA I ETYKIETY</span><h3>ISO 19593-1:2026</h3><p>Opis danych technologicznych w PDF, m.in. linii cięcia, bieli i lakieru.</p></article>
</div>
<div className="zm-manual__notice" style={{marginTop:22}}><strong>Informacja o standardzie:</strong> lista kontrolna jest własnym opracowaniem Zielonej Marki, inspirowanym odpowiednimi normami. Nie stanowi certyfikatu ISO, akredytacji ani zapewnienia zgodności każdej realizacji z wszystkimi wymienionymi normami.</div>
</section>
<div className="zm-manual__ending"><h2>Masz plik do sprawdzenia?</h2><p>Przygotujemy preflight lub kompletny plik produkcyjny, zgodnie z wymaganiami Twojej drukarni.</p><Link href="/kontakt?pakiet=DTP%20i%20przygotowanie%20do%20druku">Zapytaj o kontrolę DTP ↗</Link></div>
</div></main><QuickWhatsApp/><SiteFooter/></>}
