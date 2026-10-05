import type { Metadata } from "next";
import Link from "../SafeLink";
import EstimateCalculator from "../EstimateCalculator";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import { corePackages } from "../site-data";

export const metadata: Metadata = { title: "Oferta Zielonej Marki | Strona, brief i CRM", description: "Strona, która prowadzi klienta do działania, formularz zbierający właściwe dane i Mały CRM dla lokalnej firmy.", alternates: { canonical: "/oferta" } };

const extras = [
  ["Wizytówka Google i widoczność w okolicy", "od 390 zł", "Porządek w danych firmy, usługach, opisie i kontakcie między Mapami Google a stroną. To podstawy lokalnego SEO, czyli widoczności w wyszukiwarce."],
  ["Teksty na stronę", "od 350 zł", "Pomoc w zamianie wiedzy o firmie w prostą ofertę, którą klient rozumie."],
  ["Opieka nad stroną", "249–490 zł / mies.", "Kontrola działania, formularzy, aktualizacji i drobne zmiany po publikacji."],
  ["Asystent zapytań FAQ i zbieranie kontaktów", "od 2 500 zł + od 199 zł / mies.", "Odpowiedzi z zatwierdzonej bazy wiedzy, kwalifikacja potrzeby oraz przekazanie kontaktu człowiekowi."],
  ["Przypomnienia SMS", "od 690 zł + koszt SMS", "Konfiguracja przypomnień o terminie, szablonu wiadomości i zgody klienta. Koszt SMS rozlicza wybrana bramka."],
  ["Backup na dysku klienta", "od 990 zł + 49 zł / mies.", "Automatyczna kopia danych na dysku Google klienta lub w innym uzgodnionym magazynie, wraz z kontrolą działania."],
  ["Mały CRM z wersją na telefon", "od 4 900 zł", "Klienci, zapytania, statusy, terminy, eksport danych i panel, który można dodać do ekranu telefonu jak aplikację."],
];

const offerStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Strony internetowe i obsługa zapytań dla małych firm",
  serviceType: ["Projektowanie stron internetowych", "Modernizacja stron", "Formularze wyceny", "Mały CRM", "Asystent zapytań"],
  provider: {
    "@type": "ProfessionalService",
    name: "Zielona Marka",
    url: "https://zielona-marka.pl",
    telephone: "+48 450 458 466",
  },
  areaServed: { "@type": "Country", name: "Polska" },
  url: "https://zielona-marka.pl/oferta",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pakiety Zielonej Marki",
    itemListElement: corePackages.map((item) => ({
      "@type": "Offer",
      name: item.title,
      description: item.lead,
      url: "https://zielona-marka.pl/oferta",
    })),
  },
};

export default function OfferPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerStructuredData) }} /><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />OD DOBREJ FIRMY DO DOBRZE PROWADZONEGO KLIENTA</span><h1>Wybierz efekt dla firmy, <em>nie technologię.</em></h1><p>Strona ma pokazać wartość Twojej pracy, formularz ma zebrać konkrety, a CRM ma dopilnować następnego kroku. Wszystkie ceny usług Zielonej Marki są cenami netto. Każda kwota jest punktem startu dla jasno określonego zakresu.</p><div className="hero-actions"><Link className="button" href="/kontakt">Poproś o dokładną wycenę <span>↗</span></Link><Link className="text-link" href="/poradnik/ile-kosztuje-strona-dla-malej-firmy">Jak powstaje cena strony? <span>↗</span></Link></div></section>

    <section className="section shell client-start-paths" aria-labelledby="client-start-title"><header><span className="section-no">DWA PUNKTY STARTU</span><h2 id="client-start-title">Zacznij od sytuacji, w której jest dziś Twoja firma.</h2><p>Nie musisz wiedzieć, jakiej technologii potrzebujesz. Wybierz kierunek, a pierwszy materiał dopasuję do realnego punktu wyjścia.</p></header><div><article><span>01 / FIRMA MA JUŻ STRONĘ</span><h3>Sprawdzamy, co konkretnie warto poprawić.</h3><p>Krótka ocena pokazuje najważniejszą przeszkodę na telefonie, w ofercie, kontakcie lub widoczności oraz proponuje pierwszy krok.</p><ul><li>ocena obecnej strony</li><li>priorytet poprawek</li><li>decyzja: modernizacja czy nowa wersja</li></ul><Link href="/modernizacja-strony#miniaudyt">Poproś o bezpłatną mini ocenę <i>↗</i></Link></article><article className="recommended"><span>02 / FIRMA POTRZEBUJE KIERUNKU</span><h3>Łączymy stronę z obsługą zapytań.</h3><p>Mapa Szans pokazuje drogę klienta od wejścia na stronę, przez formularz, aż do uporządkowanego kontaktu, statusu i wyniku.</p><ul><li>cel i układ strony</li><li>formularz zbierający konkrety</li><li>prosty proces obsługi po wysłaniu zapytania</li></ul><Link href="/kontakt">Ustalmy kierunek i proces <i>↗</i></Link><Link className="path-example" href="/demo/mapa-szans-zielona-marka">Zobacz przykład Mapy Szans</Link></article></div></section>

    <section className="section shell"><div className="core-package-grid offer-page-packages">{corePackages.map((item, index) => <article key={item.title} className={index === 1 ? "featured" : ""}><span>{item.label}</span><div className="package-number">0{index + 1}</div><h2>{item.title}</h2><b>{item.price}</b><p>{item.lead}</p><ul>{item.includes.map((line) => <li key={line}>{line}</li>)}</ul><small>{item.time}</small><Link href="/kontakt">Zapytaj o pakiet <i>↗</i></Link></article>)}</div></section>

    <section className="section start-package-section"><div className="shell start-package-grid"><div><span className="section-no">ZM START / OD 1 449 ZŁ NETTO</span><h2>Pełna strona dla firmy, która chce być dobrze znaleziona i łatwa do kontaktu.</h2><p>To nie jest wersja „okrojona”. Zakres jest celowo skupiony na jednej, dobrze zaprojektowanej stronie, zamiast na wielu podstronach i funkcjach, których mała firma jeszcze nie potrzebuje.</p><Link className="button" href="/kontakt">Zapytaj o ZM Start <span>↗</span></Link></div><div><h3>Co dokładnie otrzymujesz</h3><ul className="check-list"><li>indywidualny układ do około 6–7 sekcji</li><li>oferta, najważniejsze korzyści, proces i kontakt</li><li>menu, klikalny telefon, e-mail, WhatsApp oraz mapa lub obszar działania</li><li>formularz kontaktowy zabezpieczony przed prostym spamem</li><li>wersja na telefon, tablet i komputer</li><li>podstawy widoczności w Google: tytuł, opis, logiczne nagłówki, mapa strony i dane firmy</li><li>grafika do udostępniania, favicon oraz podłączenie domeny i HTTPS</li><li>dwie rundy poprawek, kontrola jakości (QA), publikacja, instrukcja i 14 dni wsparcia</li></ul><p className="legal-note">Cena startowa dotyczy strony z materiałami dostarczonymi przez klienta. Dodatkowe podstrony, sklep, rezerwacje, panel klienta, mały CRM, pełne teksty od zera oraz płatne usługi zewnętrzne ustalamy przed rozpoczęciem.</p></div></div></section>

    <section id="branze" className="section mini-shop-section"><div className="shell mini-shop-grid"><div><span className="section-no">TRZY SPRAWDZONE ŚCIEŻKI</span><h2>Inne dane zbiera warsztat, inne wykonawca, a inne salon beauty.</h2><p className="spaced-copy">W każdym wdrożeniu formularz i asystent zapytań wynikają z prawdziwego sposobu obsługi klienta.</p></div><div><h3>Wybierz przykład</h3><ul className="check-list"><li><Link href="/strony-dla-warsztatow">warsztat i detailing ↗</Link></li><li><Link href="/strony-dla-firm-uslugowych">remonty, instalacje i serwis ↗</Link></li><li><Link href="/strony-dla-beauty">beauty i usługi na termin ↗</Link></li><li><Link href="/asystent-zapytan">asystent i kwalifikacja zapytania ↗</Link></li></ul><p className="legal-note">Pokrewne branże dobieramy według procesu: wycena zdalna, przyjęcie zlecenia albo rezerwacja wizyty.</p></div></div></section>

    <section className="section crm-offer"><div className="shell crm-offer-grid"><div><span className="section-no">MAŁY CRM, WAŻNY FILAR OFERTY</span><h2>Strona zdobywa kontakt. Mały CRM pilnuje, żeby firma go nie zgubiła.</h2><p>Porządkuje klientów, zapytania, wyceny, statusy zleceń, terminy i następne działania. Może działać samodzielnie albo razem ze stroną i formularzami.</p></div><div><b>od 4 900 zł netto</b><span>zwykle 3–4 tygodnie</span><Link className="button" href="/maly-crm-dla-firm">Zobacz Mały CRM <i>↗</i></Link></div></div></section>

    <section id="mini-sklep" className="section mini-shop-section beauty-shop-section"><div className="shell mini-shop-grid"><div><span className="section-no">MINI SKLEP / 3–10 PRODUKTÓW</span><h2>Usługa może prowadzić do rezerwacji w Booksy, a produkt do bezpiecznego zakupu.</h2><p className="spaced-copy">Dla salonu beauty, fryzjera, gabinetu, twórcy lub lokalnej marki. Strona może sprzedawać kosmetyki, vouchery, zestawy pielęgnacyjne i inne wybrane produkty bez budowania wielkiego sklepu.</p><b className="shop-price">3 499–5 499 zł netto</b><p className="muted">Zwykle 3–5 tygodni, zależnie od materiałów i operatora płatności.</p></div><div><h3>Co obejmuje</h3><ul className="check-list"><li>około 3–10 produktów i warianty</li><li>koszyk oraz jeden operator płatności</li><li>odbiór osobisty lub proste formy dostawy</li><li>vouchery albo zestawy, jeśli zakres to przewiduje</li><li>osobna ścieżka „Umów usługę w Booksy”</li><li>wersja mobilna i test całego zakupu</li></ul><p className="legal-note">Sprzedawcą, właścicielem regulaminu, płatności i danych klientów pozostaje firma klienta. Nietypowe magazyny, subskrypcje i rozbudowane integracje wyceniamy osobno.</p></div></div></section>

    <section className="section shell"><div className="section-head"><div><span className="section-no">DODATKI, KTÓRE MAJĄ SENS</span><h2>Dobierane do realnej potrzeby.</h2></div><p>Nie dokładam funkcji tylko dlatego, że „można”. Każdy element ma pomóc zdobyć kontakt, uprościć obsługę albo utrzymać stronę w dobrej kondycji.</p></div><div className="extra-grid">{extras.map(([title, price, text]) => <article key={title}><span>{price}</span><h3>{title}</h3><p>{text}</p><Link href={title.includes("CRM") ? "/maly-crm-dla-firm" : title === "Opieka nad stroną" ? "/opieka-nad-strona" : "/kontakt"}>{title.includes("CRM") ? "Zobacz rozwiązanie" : "Zapytaj o zakres"} ↗</Link></article>)}</div></section>

    <section id="koszty-zewnetrzne" className="section external-costs"><div className="shell"><div className="section-head"><div><span className="section-no">JASNE KOSZTY ZEWNĘTRZNE</span><h2>Wiesz, kto za co płaci, przed uruchomieniem.</h2></div><p>W cenie wdrożenia jest uzgodniona praca projektowa i techniczna. Usługi dostawców zewnętrznych klient opłaca bezpośrednio, po akceptacji aktualnych stawek.</p></div><div className="external-cost-grid"><article><span>01</span><h3>Płatności w sklepie</h3><p>Integrujemy sklepy z Przelewy24, Tpay i Stripe. Umowę oraz konto u operatora zawiera klient; prowizja trafia bezpośrednio do operatora.</p><small>Przykładowo: Przelewy24 1,29% + 0,30 zł; Tpay Starter 1,59% + 0,39 zł; Stripe BLIK 1,6% + 1 zł za transakcję.</small></article><article><span>02</span><h3>SMS i rezerwacje</h3><p>Przypomnienia SMS są opcjonalne. Konfigurujemy je, a koszt wiadomości rozlicza bramka SMS wybrana przez klienta.</p><small>Przykład: SMSAPI ok. 0,14–0,17 zł netto za SMS przy małej skali. Booksy lub inny system rezerwacji ma własny plan klienta.</small></article><article><span>03</span><h3>Automatyzacja zapytań</h3><p>Asystent może działać według prostego scenariusza. Wariant rozszerzony wymaga własnego konta technicznego, miesięcznego limitu i zatwierdzonej bazy odpowiedzi.</p><small>Firma może korzystać z własnego konta technicznego albo wybrać obsługę od 199 zł netto miesięcznie. Prywatna subskrypcja rozmów nie jest wymagana.</small></article><article><span>04</span><h3>Backup i utrzymanie</h3><p>Eksport danych jest częścią CRM. Automatyczny backup na dysku Google klienta lub innym magazynie podłączamy opcjonalnie.</p><small>Backup od 990 zł netto za konfigurację + 49 zł netto miesięcznie za kontrolę. Domena, hosting i dodatkowa przestrzeń są uzgadniane osobno.</small></article></div><p className="legal-note external-note">Podane prowizje operatorów i koszty usług zewnętrznych są przykładami; mogą się zmienić. Przed uruchomieniem potwierdzamy aktualną stawkę i właściciela każdego konta.</p></div></section>

    <section className="section estimate-section"><div className="shell estimate-grid"><div><span className="section-no">SZYBKA WYCENA</span><h2>Sprawdź orientacyjny punkt startu.</h2><p className="spaced-copy">Wynik pomaga rozpocząć rozmowę. Dokładna oferta zależy od funkcji, materiałów, integracji i terminu.</p><p className="spaced-copy spaced-copy-follow">Nie musisz wpisywać budżetu w formularzu. Najpierw ustalimy, co ma zmienić się w&nbsp;firmie.</p></div><EstimateCalculator /></div></section>

    <section className="section shell price-rules"><div><span className="section-no">JASNE ZASADY 30/70</span><h2>Najpierw odbierasz gotową stronę, potem publikujemy ją u Ciebie.</h2></div><ol><li><b>30% zaliczki</b> po akceptacji zakresu i umowy rezerwuje termin i rozpoczyna pracę.</li><li><b>Wersja robocza</b> jest przedstawiana pod bezpiecznym adresem do akceptacji i dwóch rund poprawek.</li><li><b>70% po odbiorze i kontroli jakości (QA)</b> jest płatne przed publikacją na domenie lub serwerze klienta.</li><li><b>Publikacja i przekazanie</b> następują po pełnym rozliczeniu; koszty zewnętrzne są zatwierdzane osobno.</li></ol></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
