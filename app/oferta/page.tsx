import type { Metadata } from "next";
import Link from "../SafeLink";
import EstimateCalculator from "../EstimateCalculator";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import { corePackages } from "../site-data";

export const metadata: Metadata = { title: "Oferta i ceny stron, formularzy i chatbotów", description: "Pakiety stron WWW, formularzy wyceny i chatbotów dla warsztatów, firm remontowych, instalatorów, beauty i usług lokalnych." };

const extras = [
  ["Wizytówka Google i widoczność w okolicy", "od 390 zł", "Porządek w danych firmy, usługach, opisie i kontakcie między Mapami Google a stroną. To podstawy lokalnego SEO, czyli widoczności w wyszukiwarce."],
  ["Teksty na stronę", "od 350 zł", "Pomoc w zamianie wiedzy o firmie w prostą ofertę, którą klient rozumie."],
  ["Opieka nad stroną", "249–490 zł / mies.", "Kontrola działania, formularzy, aktualizacji i drobne zmiany po publikacji."],
  ["Chatbot FAQ i zbieranie kontaktów", "od 2 500 zł + od 199 zł / mies.", "Odpowiedzi z zatwierdzonej bazy wiedzy, kwalifikacja potrzeby oraz przekazanie kontaktu człowiekowi."],
  ["Prosty panel zleceń (mały CRM)", "od 2 900 zł", "Klienci, zapytania, statusy, terminy i kolejny krok w jednym miejscu, zamiast w telefonach i notatkach."],
];

export default function OfferPage() {
  return <><SiteHeader /><main>
    <section className="page-hero shell"><span className="eyebrow"><i />OFERTA I CENY</span><h1>Wybierz efekt dla firmy, <em>nie technologię.</em></h1><p>Każda kwota jest punktem startu dla jasno określonego zakresu. Przed pracą dostajesz prostą propozycję: co wykonuję, ile to zajmie i ile kosztuje.</p><Link className="button" href="/kontakt">Poproś o dokładną wycenę <span>↗</span></Link></section>

    <section className="section shell"><div className="core-package-grid offer-page-packages">{corePackages.map((item, index) => <article key={item.title} className={index === 1 ? "featured" : ""}><span>{item.label}</span><div className="package-number">0{index + 1}</div><h2>{item.title}</h2><b>{item.price}</b><p>{item.lead}</p><ul>{item.includes.map((line) => <li key={line}>{line}</li>)}</ul><small>{item.time}</small><Link href="/kontakt">Zapytaj o pakiet <i>↗</i></Link></article>)}</div></section>

    <section id="branze" className="section mini-shop-section"><div className="shell mini-shop-grid"><div><span className="section-no">TRZY SPRAWDZONE ŚCIEŻKI</span><h2>Inne dane zbiera warsztat, inne wykonawca, a inne salon beauty.</h2><p className="spaced-copy">W każdym wdrożeniu formularz i chatbot wynikają z prawdziwego sposobu obsługi klienta.</p><div className="mini-shop-visual" aria-hidden="true"><i /><i /><i /></div></div><div><h3>Wybierz przykład</h3><ul className="check-list"><li><Link href="/strony-dla-warsztatow">warsztat i detailing ↗</Link></li><li><Link href="/strony-dla-firm-uslugowych">remonty, instalacje i serwis ↗</Link></li><li><Link href="/strony-dla-beauty">beauty i usługi na termin ↗</Link></li><li><Link href="/chatbot-dla-firm">chatbot i kwalifikacja zapytania ↗</Link></li></ul><p className="legal-note">Pokrewne branże dobieramy według procesu: wycena zdalna, przyjęcie zlecenia albo rezerwacja wizyty.</p></div></div></section>

    <section className="section shell"><div className="section-head"><div><span className="section-no">DODATKI, KTÓRE MAJĄ SENS</span><h2>Dobierane do realnej potrzeby.</h2></div><p>Nie dokładam funkcji tylko dlatego, że „można”. Każdy element ma pomóc zdobyć kontakt, uprościć obsługę albo utrzymać stronę w dobrej kondycji.</p></div><div className="extra-grid">{extras.map(([title, price, text]) => <article key={title}><span>{price}</span><h3>{title}</h3><p>{text}</p><Link href="/kontakt">Zapytaj o zakres ↗</Link></article>)}</div></section>

    <section className="section estimate-section"><div className="shell estimate-grid"><div><span className="section-no">SZYBKA WYCENA</span><h2>Sprawdź orientacyjny punkt startu.</h2><p className="spaced-copy">Wynik pomaga rozpocząć rozmowę. Dokładna oferta zależy od funkcji, materiałów, integracji i terminu.</p><p className="spaced-copy spaced-copy-follow">Nie musisz wpisywać budżetu w formularzu. Najpierw ustalimy, co ma zmienić się w&nbsp;firmie.</p></div><EstimateCalculator /></div></section>

    <section className="section shell price-rules"><div><span className="section-no">JASNE ZASADY 30/70</span><h2>Najpierw odbierasz gotową stronę, potem publikujemy ją u Ciebie.</h2></div><ol><li><b>30% zaliczki</b> po akceptacji zakresu i umowy rezerwuje termin i rozpoczyna pracę.</li><li><b>Wersja robocza</b> jest przedstawiana pod bezpiecznym adresem do akceptacji i dwóch rund poprawek.</li><li><b>70% po odbiorze i QA</b> jest płatne przed publikacją na domenie lub serwerze klienta.</li><li><b>Publikacja i przekazanie</b> następują po pełnym rozliczeniu; koszty zewnętrzne są zatwierdzane osobno.</li></ol></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
