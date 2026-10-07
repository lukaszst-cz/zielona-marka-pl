import Link from "./SafeLink";
import LeadFlowDemo from "./LeadFlowDemo";
import WorkflowPreview from "./WorkflowPreview";
import RelatedServices from "./RelatedServices";
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
    lead: "Klient poznaje zabiegi, efekty i przygotowanie do wizyty na stronie marki, a termin rezerwuje w Booksy, innym systemie albo przez prosty formularz, zależnie od wyboru salonu.",
    outcomes: ["czytelna oferta i portfolio poza marketplace", "opcjonalny widget lub przycisk Booksy", "rezerwacja przez używany system albo formularz", "sprzedaż kosmetyków, voucherów lub zestawów"],
    related: "Salony kosmetyczne, fryzjerzy i barberzy, paznokcie, brwi i rzęsy, masaż, wellness, trenerzy, fizjoterapia oraz inne usługi umawiane na termin.",
  },
} as const;

export default function IndustryLanding({ variant }: { variant: Variant }) {
  const c = data[variant];
  return <><SiteHeader /><main className="zm-public">
    <section className={`industry-sales-hero industry-sales-${variant}`}><div className="shell"><span className="eyebrow"><i />{c.eyebrow}</span><h1>{c.title}</h1><p>{c.lead}</p><div className="hero-actions"><a className="button" href="#demo">Wypróbuj formularz <span>↓</span></a><Link className="text-link" href="/kontakt">Zapytaj o wdrożenie <span>↗</span></Link></div></div></section>
    <section className="section shell industry-outcomes"><div><span className="section-no">CO ZYSKUJE FIRMA</span><h2>Nie tylko nowy wygląd. Lepszy pierwszy kontakt.</h2><p>{c.related}</p></div><ul>{c.outcomes.map((item, index) => <li key={item}><b>0{index + 1}</b>{item}</li>)}</ul></section>
    {variant === "auto" && <section className="section shell industry-explainer"><div><span className="section-no">STRONA WARSZTATU W PRAKTYCE</span><h2>Klient wie, gdzie trafić. Ty wiesz, czego dotyczy sprawa.</h2></div><div><p>Dobra strona warsztatu nie zastępuje rozmowy z mechanikiem. Ułatwia jej początek: pokazuje usługi, obszar działania, najważniejsze opinie oraz wygodny kontakt. Formularz może zebrać markę auta, opis problemu, zdjęcia i preferowany termin.</p><p>Jeżeli zapytań jest więcej, można później dodać proste zaplecze: listę spraw, status „do wyceny”, „umówione” lub „zakończone” i krótkie notatki. To mały CRM, czyli prosty porządek w codziennej pracy, a nie kosztowny system dla dużej korporacji.</p></div></section>}
    <section className="section leadflow-section" id="demo"><div className="shell leadflow-grid"><div><span className="section-no">ZOBACZ ŚCIEŻKĘ KLIENTA</span><h2>{variant === "beauty" ? "Strona pomaga wybrać usługę, a sposób rezerwacji dobieramy do salonu." : "Krótki formularz zamienia ogólne pytanie w uporządkowane zgłoszenie."}</h2><p>{variant === "beauty" ? "Jeśli salon używa Booksy, osadzamy jego widget lub przycisk i nie kopiujemy kalendarza. Jeśli nie chce Booksy, możemy podłączyć inny system, formularz prośby o termin, telefon albo WhatsApp." : "To bezpieczna demonstracja, wpisane dane pozostają w przeglądarce i nie są wysyłane. W prawdziwej wersji zgłoszenie trafia do e-maila lub panelu firmy."}</p></div><LeadFlowDemo variant={variant} /></div></section>
    <WorkflowPreview variant={variant} />
    {variant === "beauty" && <section className="section shell beauty-commerce"><div><span className="section-no">REZERWACJE + SPRZEDAŻ PRODUKTÓW</span><h2>Booksy jest opcją. Własna marka i sprzedaż nie zależą od jednej platformy.</h2><p>Salon może korzystać z Booksy, innego kalendarza albo prostego formularza. Niezależnie od tego strona może oferować kosmetyki do pielęgnacji domowej, vouchery, zestawy prezentowe lub produkty używane po zabiegu.</p></div><div><Link className="button" href="/oferta#mini-sklep">Zobacz Mini sklep <span>↗</span></Link><small>Integracja Booksy i sklep są oddzielnymi, opcjonalnymi rozszerzeniami.</small></div></section>}
    {variant === "home" && <section className="section shell service-decision"><div><span className="section-no">STRONA, KTÓRA POMAGA WYBRAĆ WYKONAWCĘ</span><h2>Klient dostaje odpowiedzi przed pierwszym telefonem.</h2><p>Zakres usług, obszar dojazdu, sposób wyceny, przykłady pracy i prosty formularz budują pewność, że firma obsługuje właśnie takie zlecenie.</p></div><ul><li><b>Oferta</b><span>konkretne rodzaje prac i sytuacje klienta</span></li><li><b>Zaufanie</b><span>prawdziwe zdjęcia, proces i warunki współpracy</span></li><li><b>Zapytanie</b><span>lokalizacja, termin, opis oraz zdjęcia w jednym miejscu</span></li></ul></section>}
    <section className="section shell industry-package"><div><span className="section-no">REKOMENDOWANY PAKIET</span><h2>ZM LeadFlow</h2><p>Strona do 6 podstron, formularz kwalifikujący, widoczność lokalna w Google, analityka, kontrola jakości (QA) i 14 dni wsparcia.</p></div><div><strong>od 4 490 zł netto</strong><span>10–14 dni roboczych</span><small>30% na start · 70% po odbiorze i kontroli jakości (QA), przed publikacją</small><Link className="button" href="/kontakt">Porozmawiajmy o Twojej firmie <b>↗</b></Link></div></section>
    {variant === "auto" && <RelatedServices items={[{ href: "/poradnik/strona-internetowa-dla-warsztatu-co-powinna-zawierac", label: "Co powinna zawierać strona warsztatu?", text: "Praktyczna lista: usługi, telefon, lokalizacja, formularz, zdjęcia i lokalna widoczność." }, { href: "/strony-internetowe", label: "Widoczność lokalna", text: "Zobacz, jak połączyć stronę warsztatu z rzeczywistym obszarem działania." }, { href: "/maly-crm-dla-firm", label: "Porządek po zgłoszeniu", text: "Uporządkuj kontakty, wyceny, terminy i statusy po wysłaniu formularza." }]} />}
    {variant === "beauty" && <RelatedServices items={[{ href: "/poradnik/strona-internetowa-dla-salonu-beauty-co-powinna-zawierac", label: "Co powinna zawierać strona salonu beauty?", text: "Oferta, ceny, efekty, rezerwacja, przygotowanie do wizyty i lokalna widoczność w jednym miejscu." }, { href: "/oferta#mini-sklep", label: "Vouchery i produkty", text: "Zobacz wariant mini sklepu dla wybranych produktów, zestawów i voucherów." }, { href: "/strony-internetowe", label: "Widoczność lokalna", text: "Połącz stronę z rzeczywistym obszarem działania salonu i Profilem Firmy Google." }]} />}
    {variant === "home" && <RelatedServices items={[{ href: "/poradnik/co-powinna-miec-strona-firmy-uslugowej", label: "Co powinna mieć strona firmy usługowej?", text: "Zakres usług, realizacje, obszar działania, formularz wyceny i lokalna widoczność w jednym miejscu." }, { href: "/modernizacja-strony", label: "Masz już stronę?", text: "Sprawdź, czy lepiej ją poprawić, czy zbudować od nowa." }, { href: "/maly-crm-dla-firm", label: "Co po wysłaniu formularza?", text: "Uporządkuj kontakt, wycenę i następny krok." }]} />}
  </main><QuickWhatsApp /><SiteFooter /></>;
}
