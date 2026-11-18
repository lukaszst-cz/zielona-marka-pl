import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Opieka nad stroną, hosting i koszty utrzymania",
  description: "Ile kosztuje utrzymanie strony WWW? Porównaj opiekę od 79 zł netto miesięcznie, hosting, domenę, SSL i odnowienia. Zobacz pełny koszt w kalkulatorze marki Zielona Marka.",
  alternates: { canonical: "/opieka-nad-strona" },
  openGraph: { type: "website", url: "/opieka-nad-strona", title: "Opieka nad stroną, hosting i koszty utrzymania | Zielona Marka", description: "Ile kosztuje utrzymanie strony WWW? Porównaj opiekę od 79 zł netto miesięcznie, hosting, domenę, SSL i odnowienia. Zobacz pełny koszt w kalkulatorze marki Zielona Marka.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka: strony internetowe, DTP i rozwiązania dla firm" }] },
  twitter: { card: "summary_large_image", title: "Opieka nad stroną, hosting i koszty utrzymania | Zielona Marka", description: "Ile kosztuje utrzymanie strony WWW? Porównaj opiekę od 79 zł netto miesięcznie, hosting, domenę, SSL i odnowienia. Zobacz pełny koszt w kalkulatorze marki Zielona Marka.", images: ["/og.jpg"] },
};

const care = [
  {
    label: "MONITORING", title: "Opieka nad stroną", price: "od 79 zł",
    forWhom: "Dla każdej strony, która ma działać bez niespodzianek.",
    benefit: "Wiesz, czy strona jest dostępna i czy nie kończy się ważność certyfikatu lub domeny.",
    points: ["Kontrola dostępności strony i certyfikatu SSL", "Kontrola daty odnowienia domeny, gdy dane są dostępne", "Informacja o zauważonych problemach"],
    difference: "Sam monitoring. Zmiany treści i naprawy wyceniamy osobno, 150 zł netto za godzinę.",
    note: "Opieka jest opcjonalna i można ją wypowiedzieć do końca miesiąca."
  },
  {
    label: "GOOGLE / DANE FIRMY", title: "Profil Google", price: "od 299 zł",
    forWhom: "Dla firm, które chcą regularnie pojawiać się w Mapach Google i mieć aktualne dane.",
    benefit: "Profil firmy w Google jest aktualny i regularnie uzupełniany.",
    points: ["2 krótkie wpisy w Profilu Firmy Google miesięcznie", "Kontrola godzin, telefonu, adresu, kategorii i zdjęć", "Miesięczny raport: wyświetlenia, telefony i kliknięcia"],
    difference: "Obejmuje samą obsługę profilu. Założenie lub uporządkowanie zaniedbanego profilu wyceniamy osobno, od 390 zł.",
    note: "Zakładamy, że dostarczasz informacje i zdjęcia. Nie gwarantujemy pozycji w wynikach."
  },
  {
    label: "GOOGLE / STRONA", title: "Lokalna widoczność", price: "od 499 zł",
    forWhom: "Dla firm, które chcą regularnie wzmacniać obecność w okolicy.",
    benefit: "Profil i strona są regularnie uzupełniane o treści związane z Twoimi usługami i obszarem działania.",
    points: ["4 krótkie wpisy w Profilu Firmy Google miesięcznie", "Jeden tekst na stronę miesięcznie, około 400–600 słów", "Miesięczny raport i propozycja działań na kolejny miesiąc"],
    difference: "W porównaniu z Profilem Google dochodzą teksty na stronę i 4 wpisy zamiast 2.",
    note: "Nie gwarantujemy pozycji w wynikach wyszukiwania, bo o nich decyduje Google."
  },
] as const;

export default function CarePage() {
  return <><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />PO PUBLIKACJI / PRZEJRZYSTE KOSZTY</span><h1>Strona działa. <em>Opieka jest opcjonalna.</em></h1><p>Za projekt strony płacisz raz. Hosting jest w cenie pakietu, bez opłat miesięcznych, a domena jest Twoja. Opieka i obsługa Google są opcjonalne i rozliczane miesięcznie.</p><div className="hero-actions"><Link className="button" href="/oferta#kalkulator-pelnego-kosztu">Oblicz pełny koszt <span>↗</span></Link><a className="text-link" href="#pakiety-opieki">Porównaj opiekę ↓</a></div></section>
    <section className="section shell" id="pakiety-opieki"><div className="section-head"><div><span className="section-no">TRZY USŁUGI MIESIĘCZNE</span><h2>Wybierz tylko to, czego potrzebujesz.</h2></div><p>Ceny są orientacyjne i podane netto za miesiąc. Zanim podejmiesz decyzję, ustalimy zakres pomocy, technologie i czas reakcji. Nie musisz wybierać abonamentu.</p></div>
      <div className="extra-grid care-plans">{care.map((item, index) => <article className="care-plan-card" key={item.title}><span className="section-no">{item.label}</span><h3>{item.title}</h3><strong className="zm-care-price">{item.price} <small>netto / mies.</small></strong><p className="care-plan-audience">{item.forWhom}</p><p className="care-plan-benefit"><strong>Co zyskujesz?</strong> {item.benefit}</p><h4 className="zm-package-list-label">Co obejmuje pakiet?</h4><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul><p className="care-plan-difference"><strong>{index === 0 ? "Najważniejsze:" : "Za wyższą cenę:"}</strong> {item.difference}</p><p className="legal-note"><strong>Ważne:</strong> {item.note}</p><Link href={"/kontakt?pakiet=" + encodeURIComponent(item.title)}>Zapytaj o {item.title} ↗</Link></article>)}</div><p className="care-plans-disclaimer">W każdym pakiecie ustalamy obsługiwany system, sposób zgłaszania problemów i harmonogram kontroli. Niewykorzystane minuty nie przechodzą automatycznie na kolejny miesiąc, warunki potwierdzamy w ofercie.</p>
    </section>
    <section className="section mini-shop-section" id="hosting-domena"><div className="shell mini-shop-grid"><div><span className="section-no">KTO ZA CO PŁACI</span><h2>Hosting jest w cenie pakietu, domena jest Twoja.</h2><p>Strony stoją na naszej infrastrukturze bez opłat miesięcznych. Domena jest rejestrowana na Ciebie, a jej koszt płacisz rejestratorowi. Pomagamy podłączyć DNS i HTTPS oraz uruchomić stronę. Na życzenie przenosimy stronę na Twoje konto u dostawcy hostingu.</p><Link className="button" href="/oferta#kalkulator-pelnego-kosztu">Policz orientacyjny koszt <span>↗</span></Link></div>
      <div><h3>Elementy rachunku</h3><ul className="check-list"><li>Domena, opłata za rejestrację i osobna, niekiedy znacznie wyższa opłata za odnowienie</li><li>Hosting prostej strony u nas: w cenie pakietu, bez opłat miesięcznych</li><li>HTTPS i SSL: w cenie pakietu</li><li>Skrzynki pocztowe, kopie, licencje i płatne dodatki, według wybranego operatora</li><li>Opieka marki Zielona Marka: osobna, dobrowolna usługa</li></ul><p className="legal-note">Przykład ceny domeny .pl: OVHcloud podaje 16,69 zł netto za rejestrację i 58,99 zł netto za odnowienie; cyber_Folks 9,90 zł i 179 zł netto. Ceny zależą od dnia zamówienia, promocji i dostawcy. Źródła: <a href="https://www.ovhcloud.com/pl/domains/tld/pl/" target="_blank" rel="noreferrer">cennik OVHcloud ↗</a> i <a href="https://cyberfolks.pl/domeny/cennik/" target="_blank" rel="noreferrer">cennik cyber_Folks ↗</a>.</p></div></div></section>
    <section className="section shell" id="rozwoj"><div className="section-head"><div><span className="section-no">ROZWÓJ W TWOIM TEMPIE</span><h2>Zmiany i nowe funkcje bez obowiązkowego abonamentu.</h2></div><p>Potrzebujesz nowego zdjęcia, zmiany cennika albo kolejnej podstrony? Możesz zlecić to osobno, bez przechodzenia na stały abonament.</p></div><div className="extra-grid"><article><h3>Nowe treści i podstrony</h3><p>Oferta, przykłady realizacji i widoczność lokalna. Zakres ustalamy przed rozpoczęciem.</p><Link href="/modernizacja-strony">Modernizacja strony ↗</Link></article><article><h3>Formularze, sprzedaż i rezerwacje</h3><p>Wyceny online, vouchery, sklep lub kalendarz zapisów, zakres i koszt ustalamy osobno.</p><Link href="/oferta#wiecej">Zobacz rozwiązania ↗</Link></article><article><h3>DTP i materiały firmowe</h3><p>Ulotki, wizytówki i gazetki mogą korzystać z tych samych kolorów i treści co strona.</p><Link href="/dtp">Sprawdź DTP ↗</Link></article></div></section>
    <section className="section shell price-rules"><div><span className="section-no">BEZ UKRYTYCH OPŁAT</span><h2>Przed podpisaniem umowy ustalamy odpowiedzialność.</h2></div><ol><li><b>Własność kont</b>, domena, hosting i usługi zewnętrzne na dane klienta.</li><li><b>Zakres opieki</b>, jasno wskazujemy co obejmuje abonament, a co dodatkowe zlecenie.</li><li><b>Koszty odnowienia</b>, pokazujemy pierwszy i kolejny rok, nie tylko promocyjną cenę.</li><li><b>Bez gwarancji pozycji Google</b>, utrzymanie techniczne nie oznacza abonamentu na SEO.</li></ol></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
