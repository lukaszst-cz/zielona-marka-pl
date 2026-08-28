import Link from "./SafeLink";
import LeadFlowDemo from "./LeadFlowDemo";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "./SiteChrome";

type Variant = "auto" | "home" | "beauty";

const data = {
  auto: {
    eyebrow: "STRONY DLA WARSZTATÓW I DETAILINGU",
    title: "Klient opisuje auto i usterkę. Ty dostajesz konkretne zgłoszenie.",
    lead: "Strona warsztatu może zebrać markę i model pojazdu, objawy, zdjęcia oraz oczekiwany termin jeszcze przed pierwszym telefonem.",
    outcomes: ["mniej niepełnych pytań o cenę", "zdjęcia i dane auta przy zgłoszeniu", "czytelna oferta usług i obszar działania", "telefon, formularz i Google w jednej ścieżce"],
    related: "Warsztaty mechaniczne, detailing, wulkanizacja, klimatyzacja, blacharstwo, lakiernictwo, serwisy motocykli i pomoc drogowa.",
  },
  home: {
    eyebrow: "STRONY DLA WYKONAWCÓW I INSTALATORÓW",
    title: "Lokalizacja, zakres prac i zdjęcia przed pierwszą wyceną.",
    lead: "Klient przekazuje informacje, których naprawdę potrzebujesz: rodzaj zlecenia, pilność, miejsce, oczekiwany termin i zdjęcia.",
    outcomes: ["mniej wielokrotnego dopytywania", "lepsza wstępna kwalifikacja zleceń", "widoczny obszar dojazdu", "porządek w zapytaniach z Google i Facebooka"],
    related: "Hydraulicy, elektrycy, klimatyzacja, pompy ciepła, remonty, serwis AGD, dachy, elewacje, ogrodzenia, brukarstwo i meble na wymiar.",
  },
  beauty: {
    eyebrow: "STRONY DLA BEAUTY I USŁUG NA TERMIN",
    title: "Od znalezienia usługi do rezerwacji bez szukania informacji.",
    lead: "Klient poznaje zabiegi, efekty i przygotowanie do wizyty na stronie marki, a termin rezerwuje w Booksy, innym systemie albo przez prosty formularz — zależnie od wyboru salonu.",
    outcomes: ["czytelna oferta i portfolio poza marketplace", "opcjonalny widget lub przycisk Booksy", "rezerwacja przez używany system albo formularz", "sprzedaż kosmetyków, voucherów lub zestawów"],
    related: "Salony kosmetyczne, fryzjerzy i barberzy, paznokcie, brwi i rzęsy, masaż, wellness, trenerzy, fizjoterapia oraz inne usługi umawiane na termin.",
  },
} as const;

export default function IndustryLanding({ variant }: { variant: Variant }) {
  const c = data[variant];
  return <><SiteHeader /><main>
    <section className={`industry-sales-hero industry-sales-${variant}`}><div className="shell"><span className="eyebrow"><i />{c.eyebrow}</span><h1>{c.title}</h1><p>{c.lead}</p><div className="hero-actions"><a className="button" href="#demo">Wypróbuj formularz <span>↓</span></a><Link className="text-link" href="/kontakt">Zapytaj o wdrożenie <span>↗</span></Link></div></div></section>
    <section className="section shell industry-outcomes"><div><span className="section-no">CO ZYSKUJE FIRMA</span><h2>Nie tylko nowy wygląd. Lepszy pierwszy kontakt.</h2><p>{c.related}</p></div><ul>{c.outcomes.map((item, index) => <li key={item}><b>0{index + 1}</b>{item}</li>)}</ul></section>
    <section className="section leadflow-section" id="demo"><div className="shell leadflow-grid"><div><span className="section-no">ZOBACZ ŚCIEŻKĘ KLIENTA</span><h2>{variant === "beauty" ? "Strona pomaga wybrać usługę, a sposób rezerwacji dobieramy do salonu." : "Krótki formularz zamienia ogólne pytanie w uporządkowane zgłoszenie."}</h2><p>{variant === "beauty" ? "Jeśli salon używa Booksy, osadzamy jego widget lub przycisk i nie kopiujemy kalendarza. Jeśli nie chce Booksy, możemy podłączyć inny system, formularz prośby o termin, telefon albo WhatsApp." : "To bezpieczna demonstracja — wpisane dane pozostają w przeglądarce i nie są wysyłane. W prawdziwej wersji zgłoszenie trafia do e-maila lub panelu firmy."}</p></div><LeadFlowDemo variant={variant} /></div></section>
    {variant === "beauty" && <section className="section shell beauty-commerce"><div><span className="section-no">REZERWACJE + SPRZEDAŻ PRODUKTÓW</span><h2>Booksy jest opcją. Własna marka i sprzedaż nie zależą od jednej platformy.</h2><p>Salon może korzystać z Booksy, innego kalendarza albo prostego formularza. Niezależnie od tego strona może oferować kosmetyki do pielęgnacji domowej, vouchery, zestawy prezentowe lub produkty używane po zabiegu.</p></div><div><Link className="button" href="/oferta#mini-sklep">Zobacz Mini sklep <span>↗</span></Link><small>Integracja Booksy i sklep są oddzielnymi, opcjonalnymi rozszerzeniami.</small></div></section>}
    <section className="section shell industry-package"><div><span className="section-no">REKOMENDOWANY PAKIET</span><h2>ZM LeadFlow</h2><p>Strona do 6 podstron, formularz kwalifikujący, lokalne SEO, analityka, QA i 14 dni wsparcia.</p></div><div><strong>od 4 900 zł netto</strong><span>10–14 dni roboczych</span><small>30% na start · 70% po odbiorze i QA, przed publikacją</small><Link className="button" href="/kontakt">Porozmawiajmy o Twojej firmie <b>↗</b></Link></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
