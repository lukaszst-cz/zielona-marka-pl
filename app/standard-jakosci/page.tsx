import type { Metadata } from "next";
import Link from "../SafeLink";
import QualityPrintButton from "../QualityPrintButton";
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
 {num:"01 / WWW",title:"Strony i landing page",items:["Responsywność, czytelność i dostępność","Linki, formularze i ścieżka kontaktu","Metadane, mapa strony i indeksowanie","Wydajność, HTTPS i testy po publikacji"],href:"/raport-qa",cta:"Przykładowy raport QA"},
 {num:"02 / E-COMMERCE",title:"Sklepy internetowe",items:["Koszyk i pełna ścieżka zamówienia","Testy płatności, wyjątków i powiadomień","Dostępność i prywatność w uzgodnionym zakresie","Role użytkowników i zabezpieczenia"],href:"/oferta",cta:"Zobacz ofertę"},
 {num:"03 / PREPRESS",title:"Grafika i DTP",items:["Treść, typografia, fonty i obrazy","Spady, PDF/X, ICC i separacje","Overprint, lakier, wykrojniki i falcowanie","Proofing, akceptacja i plik produkcyjny"],href:"/standard-dtp",cta:"Pełny standard DTP"},
 {num:"04 / SYSTEMY",title:"CRM i automatyzacje",items:["Mapa procesów i wymagań","Role, uprawnienia, integralność danych","Integracje, scenariusze błędów i kopie zapasowe","Testy odbiorowe i przekazanie dostępu"],href:"/maly-crm-dla-firm",cta:"Poznaj CRM"},
];
export default function QualityStandardPage(){return <><SiteHeader/><main className="zm-manual">
<section className="zm-manual__hero"><div className="zm-manual__inner"><span className="zm-manual__label">ZM-QMS-001 / STANDARD JAKOŚCI ZIELONEJ MARKI</span>
<h1>Dobry projekt powstaje w <em>dobrze prowadzonym procesie.</em></h1>
<p>Sprawdź, co dzieje się od pierwszego zapytania do odbioru. Każda realizacja ma określony zakres, etapy i właściwe dla niej punkty kontroli.</p>
<div className="zm-manual__actions"><a href="/downloads/zielona-marka-standard-jakosci-www-dtp-crm.pdf" download>Pobierz standard jakości (PDF, 10 stron) ↓</a><a href="#etapy">Zobacz osiem etapów ↓</a><QualityPrintButton/></div>
</div></section>
<div className="zm-manual__content">
<section className="zm-manual__section" id="etapy"><h2>Osiem etapów. Jedna zasada jakości.</h2>
<p className="zm-manual__intro">Nie pomijamy kontroli dlatego, że projekt jest mały. Dostosowujemy liczbę testów do rodzaju zamówienia i poziomu ryzyka.</p>
<div className="zm-manual__steps">{steps.map(([n,t,d])=><div className="zm-manual__step" key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
</section>
<section className="zm-manual__section"><h2>Co dokładnie podlega kontroli?</h2><p className="zm-manual__intro">Podstawowa lista kontrolna jest wspólna organizacyjnie; testy techniczne zależą od produktu.</p>
<div className="zm-manual__grid zm-manual__grid--2">{tracks.map(track=><article className="zm-manual__tile" key={track.num}><span>{track.num}</span><h3>{track.title}</h3><ul>{track.items.map(item=><li key={item}>{item}</li>)}</ul><p style={{marginTop:18}}><Link href={track.href}>{track.cta} ↗</Link></p></article>)}</div></section>
<section className="zm-manual__section"><h2>Kontrola nie kończy się na deklaracji.</h2>
<div className="zm-manual__rules"><div className="zm-manual__rule"><strong>PASS</strong><p>Kontrola przeprowadzona, wymaganie spełnione i potwierdzone wynikiem.</p></div><div className="zm-manual__rule"><strong>REWORK</strong><p>Wystąpiła niezgodność; poprawiamy ją i powtarzamy odpowiedni test.</p></div><div className="zm-manual__rule"><strong>HOLD</strong><p>Wstrzymujemy etap, jeżeli brak decyzji lub ryzyko nie pozwala bezpiecznie kontynuować.</p></div></div>
<p className="zm-manual__intro" style={{marginTop:20}}>Klient otrzymuje zakres, możliwość akceptacji i — gdy jest to przewidziane w uzgodnieniach — raport zawierający rzeczywiście wykonane testy, a nie automatycznie zaznaczone wyniki.</p></section>
<section className="zm-manual__section"><h2>Jak odnosimy się do ISO?</h2>
<div className="zm-manual__notice"><strong>Transparentnie:</strong> to własne procedury Zielonej Marki, opracowane z wykorzystaniem zasad zarządzania jakością znanych z ISO 9001:2026 oraz odpowiednich norm dla oprogramowania i poligrafii. Nie oznacza to uzyskania certyfikatu ISO 9001, zewnętrznego audytu ani akredytacji. Nie używamy logo ISO.</div>
<p className="zm-manual__intro">Wykorzystywane punkty odniesienia obejmują ISO 9001:2026 (zarządzanie procesem), ISO/IEC 25010:2023 (model jakości produktu ICT) i — w pracach graficznych — odpowiednie części ISO 15930 i ISO 12647. Zastosowanie zawsze zależy od zakresu i technologii projektu.</p></section>
<div className="zm-manual__ending"><h2>Chcesz zobaczyć standard w praktyce?</h2><p>Zacznij od opisu potrzeb swojej firmy. Przygotujemy zakres, a następnie omówimy punkty kontroli i sposób odbioru.</p><Link href="/kontakt">Porozmawiajmy o projekcie ↗</Link></div>
</div></main><QuickWhatsApp/><SiteFooter/></>}
