import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import { processSteps } from "../site-data";

export const metadata: Metadata = { title: "Jak pracuję", description: "Jasny proces od briefu do publikacji strony: projekt, poprawki, QA, SEO techniczne i opieka." };

const faq = [
  ["Czy musimy spotykać się osobiście?", "Nie. Współpraca może odbywać się przez Google Meet, telefon, e-mail i WhatsApp. Działam lokalnie, ale realizuję projekty zdalnie dla firm z całej Polski."],
  ["Czy mogę samodzielnie edytować treść?", "Tak, jeśli projekt tego wymaga. Przed startem wybieramy prosty sposób aktualizacji, np. WordPress, albo ustalamy zakres opieki nad stroną."],
  ["Ile propozycji projektu otrzymam?", "Pracujemy na jednym, dopasowanym kierunku projektu. Dzięki temu zamiast wybierać przypadkowy szablon, poprawiamy rozwiązanie przygotowane dla Twojej firmy."],
  ["Ile poprawek obejmuje projekt?", "W uzgodnionym zakresie są dwie rundy poprawek. Nowe funkcje, kolejne podstrony lub zmiana kierunku po akceptacji są wyceniane osobno przed rozpoczęciem."],
  ["Czy strona będzie widoczna w Google?", "Przygotowuję techniczne podstawy: strukturę, opisy, wersję mobilną, szybkość i możliwość zgłoszenia strony do Google. Nie obiecuję konkretnej pozycji, ponieważ zależy ona też od konkurencji i dalszych działań."],
  ["Co oznacza QA?", "QA to końcowa kontrola jakości. Sprawdzam telefon, komputer, formularze, linki, szybkość, podstawową dostępność oraz pełną ścieżkę klienta."],
  ["Co dzieje się po publikacji?", "Przekazuję uzgodnione dostępy, instrukcję i 14 dni podstawowego wsparcia startowego. Dalsza opieka jest opcjonalna."],
  ["Jak wygląda płatność 30/70?", "30% zaliczki po akceptacji zakresu i umowy rezerwuje termin i rozpoczyna pracę. Pozostałe 70% jest płatne po akceptacji gotowej wersji i testach QA, przed publikacją na domenie lub serwerze klienta."],
  ["Kto jest właścicielem domeny i strony?", "Domena, konto hostingu, konto płatności i inne konta powinny należeć do klienta. Po rozliczeniu klient otrzymuje uzgodniony efekt pracy oraz dostępy."],
];

export default function HowWeWorkPage() {
  return <><SiteHeader /><main>
    <section className="page-hero shell"><span className="eyebrow"><i />JAK PRACUJĘ</span><h1>Jasne decyzje od pierwszej rozmowy <em>do działającej strony.</em></h1><p>Nie musisz prowadzić projektu technicznie. Wiesz, czego potrzebuję od Ciebie, co robię na danym etapie i kiedy podejmujemy decyzję.</p><Link className="button" href="/kontakt">Zacznij od briefu <span>↗</span></Link></section>
    <section className="section shell"><div className="section-head"><div><span className="section-no">PROCES</span><h2>Od pomysłu do publikacji.</h2></div><p>Typowa mała strona firmowa zajmuje zwykle 1–3 tygodnie od otrzymania materiałów. Dokładny termin zależy od zakresu i szybkości decyzji.</p></div><div className="timeline">{processSteps.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="section qa-section"><div className="shell qa-grid"><div><span className="section-no">TESTY JAKOŚCI / QA</span><h2>Strona jest testowana, zanim zacznie pracować na Twoją firmę.</h2><p className="spaced-copy">Na koniec otrzymujesz proste podsumowanie kontroli: co zostało sprawdzone i&nbsp;co jest gotowe do startu.</p><div className="qa-seal" aria-hidden="true"><span>QA</span><b>✓</b></div></div><div><ul className="check-list"><li>telefon, tablet i komputer</li><li>formularze, e-mail, numer telefonu i WhatsApp</li><li>linki, przekierowania i podstawowe błędy</li><li>szybkość oraz stabilność</li><li>przygotowanie do Google i mapa strony</li><li>podstawowa dostępność oraz czytelność</li></ul><p><b>Lighthouse</b> to test Google sprawdzający m.in. szybkość, dostępność i techniczną jakość strony. Jest narzędziem kontroli, a nie gwarancją pozycji w wyszukiwarce.</p></div></div></section>
    <section className="section shell seo-grid"><div><span className="section-no">GOTOWA DO DALSZEGO SEO</span><h2>Po starcie nie trzeba naprawiać podstaw.</h2></div><div><p>Strona otrzymuje logiczną strukturę, poprawne adresy, tytuły i opisy, mapę strony, wersję mobilną, szybkie działanie i możliwość podłączenia narzędzi Google.</p><p>Widoczność w Google rozwija się później przez treści, lokalną wiarygodność, opinie i dalsze działania. Uczciwie nie gwarantuję konkretnej pozycji.</p></div></section>
    <section className="section rules-section"><div className="shell rules-grid"><article><span>30%</span><h3>Zaliczka na start</h3><p>Po akceptacji zakresu i umowy rezerwuję termin oraz rozpoczynam pracę.</p></article><article><span>70%</span><h3>Przed publikacją</h3><p>Po odbiorze gotowej wersji i testach QA, przed publikacją na serwerze klienta.</p></article><article><span>02</span><h3>Dwie rundy poprawek</h3><p>Uwagi zbieramy i wprowadzamy w jasno określonym zakresie.</p></article><article><span>14</span><h3>Dni wsparcia startowego</h3><p>Po publikacji pomagam spokojnie przejść przez pierwsze dni działania strony.</p></article></div></section>
    <section className="section shell faq-page"><div className="section-head"><div><span className="section-no">FAQ</span><h2>Najważniejsze odpowiedzi przed startem.</h2></div><p>Krótko, konkretnie i bez technicznego żargonu.</p></div><div className="faq-list">{faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
