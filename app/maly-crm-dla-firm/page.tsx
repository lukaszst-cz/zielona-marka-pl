import type { Metadata } from "next";
import Link from "../SafeLink";
import ContactForm from "../ContactForm";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = { title: "Mały CRM dla lokalnej firmy", description: "Prosty CRM do klientów, zapytań, wycen, zleceń, terminów i następnych działań dla małych firm usługowych.", alternates: { canonical: "/maly-crm-dla-firm" } };

const modules = [
  ["01", "Zapytania", "Wszystkie formularze i kontakty w jednej kolejce, z informacją skąd przyszły."],
  ["02", "Następny krok", "Przy każdym kliencie wiadomo, kto i kiedy ma oddzwonić, wysłać wycenę albo się przypomnieć."],
  ["03", "Status zlecenia", "Nowe, wycena, zaakceptowane, realizacja, odbiór i rozliczenie — etapy dopasowane do firmy."],
  ["04", "Terminy", "Daty wizyt, realizacji i ponownych kontaktów bez pilnowania wszystkiego w pamięci."],
  ["05", "Historia klienta", "Kontakt, ustalenia, wartość oferty i wykonane prace dostępne w jednym miejscu."],
  ["06", "Proste wyniki", "Liczba zapytań, wysłanych ofert, przyjętych zleceń i ich wartość bez skomplikowanych raportów."],
];

export default function SmallCrmPage() {
  return <><SiteHeader /><main>
    <section className="page-hero shell crm-page-hero"><span className="eyebrow"><i />MAŁY CRM DLA FIRMY USŁUGOWEJ</span><h1>Każdy klient ma status. <em>Każde zapytanie ma następny krok.</em></h1><p>Mały CRM porządkuje klientów, wyceny, zlecenia i terminy bez wdrażania rozbudowanego systemu korporacyjnego. Zaczynamy od procesu, który naprawdę działa w Twojej firmie.</p><div className="hero-actions"><a className="button" href="#moduly">Zobacz, co porządkuje <span>↓</span></a><Link className="text-link" href="/usprawnienia-firmy#film">Film demonstracyjny <span>↗</span></Link></div></section>
    <section className="section crm-problem"><div className="shell crm-problem-grid"><div><span className="section-no">KIEDY MA SENS</span><h2>Firma ma zapytania, ale część z nich ginie między telefonem, e-mailem i notatkami.</h2></div><ul className="check-list"><li>nie wiadomo, komu trzeba odpowiedzieć</li><li>wyceny nie mają zaplanowanego przypomnienia</li><li>statusy zleceń są tylko w głowie właściciela</li><li>klienci dzwonią, żeby zapytać o etap</li><li>trudno policzyć, ile zapytań kończy się sprzedażą</li></ul></div></section>
    <section className="section shell" id="moduly"><div className="section-head"><div><span className="section-no">TYLKO POTRZEBNE MODUŁY</span><h2>Najpierw prosty porządek. Potem ewentualna rozbudowa.</h2></div><p>Nie sprzedaję wielkiego systemu na zapas. Wybieramy 3–6 elementów, które zdejmują z firmy najwięcej ręcznej pracy.</p></div><div className="crm-module-grid">{modules.map(([number,title,text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section crm-flow"><div className="shell"><span>FORMULARZ</span><i>→</i><span>NOWY KONTAKT</span><i>→</i><span>WYCENA</span><i>→</i><span>ZLECENIE</span><i>→</i><span>ROZLICZENIE</span></div></section>
    <section className="section shell industry-package"><div><span className="section-no">PUNKT STARTU</span><h2>Mały CRM</h2><p>Klienci, zapytania, statusy, terminy i następny krok. Dokładny zakres ustalamy po krótkiej mapie procesu.</p></div><div><strong>od 2 900 zł netto</strong><span>zwykle 2–4 tygodnie</span><small>Może działać samodzielnie albo razem ze stroną ZM LeadFlow.</small><Link className="button" href="#crm-kontakt">Sprawdź swój proces <b>↗</b></Link></div></section>
    <section className="section contact-section" id="crm-kontakt"><div className="shell contact-grid"><div><span className="section-no">KRÓTKA ANALIZA</span><h2>Powiedz, gdzie dziś zapisujesz klientów i zlecenia.</h2><p>Wskażę najmniejszy sensowny zakres CRM. Nie musisz znać technologii ani mieć gotowej specyfikacji.</p></div><ContactForm /></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
