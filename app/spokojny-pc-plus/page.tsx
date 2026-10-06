import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "SpokojnyPC+ | lokalny opiekun urządzenia",
  description: "SpokojnyPC+ to rozwijany lokalny opiekun urządzeń: ocena kondycji Windows, bezpieczne rekomendacje oraz fundament pod połączenie z telefonem.",
  alternates: { canonical: "/spokojny-pc-plus" },
  openGraph: {
    title: "SpokojnyPC+ | Zielona Marka",
    description: "Local-first program do spokojnej oceny kondycji urządzenia i bezpiecznych działań.",
    images: [{ url: "/program-spokojny-pc-plus-cover.svg", alt: "SpokojnyPC+" }],
  },
};

const capabilities = [
  ["01", "Spokojny wynik", "Czytelna ocena kondycji urządzenia 0–100 oraz krótkie, konkretne wyjaśnienie."],
  ["02", "Lokalny baseline", "Kolejne pomiary tworzą punkt odniesienia, dzięki któremu łatwiej zauważyć faktyczne odchylenie."],
  ["03", "Co się zmieniło", "Historia kondycji, ważniejsze zmiany systemowe i pomoc w wychwyceniu problemu bez przeklikiwania ustawień."],
  ["04", "Bezpieczne działania", "Program nie udaje agresywnego cleanera. Działania przechodzą przez zasady bezpieczeństwa i wymagają decyzji użytkownika."],
] as const;

export default function SpokojnyPcPlusPage() {
  return <>
    <SiteHeader />
    <main className="zm-public spokojny-page">
      <section className="page-hero shell spokojny-hero"><div><span className="eyebrow"><i />PROGRAM NIEZALEŻNY · WERSJA WINDOWS 2.8.0</span><h1>SpokojnyPC+.<br /><em>Najpierw diagnoza, potem działanie.</em></h1><p>Lokalny opiekun urządzenia dla osób, które chcą zrozumieć stan komputera bez straszenia, automatycznego usuwania i wysyłania danych do zewnętrznej usługi.</p><div className="hero-actions"><a className="button" href="#zakres">Zobacz aktualny zakres <span>↓</span></a><Link href="/praktyczne-narzedzia">Wróć do programów ↗</Link></div></div><figure className="spokojny-cover"><img src="/program-spokojny-pc-plus-cover.svg" alt="Ilustracja SpokojnyPC+" /><figcaption>SpokojnyPC+ jest rozwijanym produktem. Ten opis przedstawia bieżący, potwierdzony zakres, nie obietnicę funkcji na przyszłość.</figcaption></figure></section>

      <section id="zakres" className="section shell"><div className="section-head"><div><span className="section-no">AKTUALNY ZAKRES</span><h2>Stan urządzenia bez zgadywania.</h2></div><p>Wersja dla Windows zbiera lokalne sygnały o kondycji komputera. Zamiast obiecywać „optymalizację jednym kliknięciem”, pokazuje kontekst i prowadzi do bezpiecznych decyzji.</p></div><div className="timeline">{capabilities.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="section operations-section"><div className="shell operations-grid"><div><span className="section-no">WINDOWS 2.8.0</span><h2>Rzeczy, które już są w programie.</h2><p>Dashboard z odświeżanym stanem, bateria, dysk, sieć, bezpieczeństwo, procesy, autostart, historia kondycji, raport diagnostyczny, Storage Radar, Network Doctor oraz bezpieczne skróty do właściwych ustawień systemu.</p></div><div className="spokojny-checklist"><span>✓ dane i historia lokalnie</span><span>✓ brak wymaganego konta oraz chmury</span><span>✓ bez automatycznego force-kill procesów</span><span>✓ jasne potwierdzenie przed działaniami systemowymi</span></div></div></section>

      <section className="section shell spokojny-mobile"><div><span className="section-no">SPOKOJNY+</span><h2>Jeden kierunek dla komputera i telefonu.</h2><p>SpokojnyPC+ jest pierwszym klientem większego projektu Spokojny+. Powstaje też klient Android, który korzysta ze wspólnego rdzenia do lokalnej oceny stanu urządzenia i bezpiecznego parowania znanych urządzeń.</p></div><div><b>Android 0.1</b><p>Wersja rozwojowa obejmuje podstawowe informacje o telefonie, pamięci, baterii i sieci oraz ekran DeviceLink. Nie przedstawiam jej jako gotowego produktu do pobrania.</p></div></section>

      <section className="section shell next-project"><span className="section-no">STATUS</span><h2>Program jest aktywnie rozwijany.</h2><p>Na stronie pokazuję wyłącznie opis aktualnego zakresu. Gdy publiczne wydanie będzie gotowe, dodamy tu bezpośredni i sprawdzony link do pobrania.</p><Link className="button" href="/kontakt">Zapytaj o rozwój programu <span>↗</span></Link></section>
    </main>
    <QuickWhatsApp />
    <SiteFooter />
  </>;
}
