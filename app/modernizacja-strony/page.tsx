import type { Metadata } from "next";
import Link from "../SafeLink";
import ContactForm from "../ContactForm";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = { title: "Modernizacja strony internetowej", description: "Ocena starej strony i plan modernizacji: telefon, kontakt, oferta, szybkość oraz przygotowanie do Google." };

const symptoms = ["strona źle wygląda na telefonie", "oferta jest nieczytelna albo zbyt ogólna", "telefon i formularz nie są pod ręką", "klienci nie wiedzą, co zrobić dalej", "treści są nieaktualne", "strona działa wolno", "dane w Google i na stronie są niespójne", "nie wiadomo, skąd przychodzą zapytania"];
const fixes = ["odświeżenie układu, zdjęć i hierarchii treści", "pierwszy ekran z jasną ofertą i kontaktem", "klikalny telefon, WhatsApp i formularz", "wersja mobilna zaprojektowana świadomie", "sprawdzenie linków, formularzy oraz szybkości", "podstawy technicznego SEO i uporządkowane dane firmy"];

export default function ModernizationPage() {
  return <><SiteHeader /><main>
    <section className="page-hero shell"><span className="eyebrow"><i />MODERNIZACJA STRONY</span><h1>Twoja firma się rozwinęła. <em>Strona może ją dogonić.</em></h1><p>Nie każda stara strona wymaga budowania od zera. Najpierw sprawdzam, co blokuje kontakt i czy opłaca się poprawiać obecny serwis.</p><a className="button" href="#miniaudyt">Poproś o miniocenę <span>↓</span></a></section>
    <section className="section shell"><div className="section-head"><div><span className="section-no">ROZPOZNAJ PROBLEM</span><h2>Jeśli znasz choć dwa z tych objawów, warto przyjrzeć się stronie.</h2></div><p>Modernizacja nie polega na zmianie kolorów. Jej celem jest uproszczenie drogi klienta od wejścia na stronę do telefonu, wiadomości albo zakupu.</p></div><div className="symptom-grid">{symptoms.map((symptom, index) => <article key={symptom}><b>{String(index + 1).padStart(2, "0")}</b><span>{symptom}</span></article>)}</div></section>
    <section className="section dark-section"><div className="shell rebuild-grid"><div><span className="section-no">CO ZMIENIAMY</span><h2>Najpierw klient musi zrozumieć ofertę. <em>Dopiero potem zachwycać się wyglądem.</em></h2></div><ul className="check-list light-list">{fixes.map((fix) => <li key={fix}>{fix}</li>)}</ul></div></section>
    <section className="section shell decision-grid"><article><span>WARIANT 01</span><h2>Poprawiamy obecną stronę</h2><p>Wybieramy go, gdy techniczny fundament jest dobry, a problemem są przede wszystkim treść, wygląd, kontakt i wersja mobilna.</p><ul><li>krótszy czas realizacji</li><li>mniej kosztów</li><li>zachowanie obecnego adresu i treści</li></ul></article><article><span>WARIANT 02</span><h2>Budujemy od nowa</h2><p>To lepsza opcja, gdy strona jest bardzo wolna, trudna w edycji, niebezpieczna lub jej układ nie pozwala już spokojnie rosnąć.</p><ul><li>nowa struktura i kierunek wizualny</li><li>czyste przygotowanie do Google</li><li>prostsza rozbudowa w przyszłości</li></ul></article></section>
    <section className="section contact-section" id="miniaudyt"><div className="shell contact-grid"><div><span className="section-no">BEZPŁATNA MINI OCENA</span><h2>Wyślij adres strony. Wskażę, od czego warto zacząć.</h2><p>Otrzymasz krótką, konkretną odpowiedź dotyczącą telefonu, oferty, kontaktu i najważniejszego następnego kroku. Bez deklarowania budżetu.</p><Link className="text-link" href="/oferta">Zobacz pakiety modernizacji <span>↗</span></Link></div><div><ContactForm audit /></div></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
