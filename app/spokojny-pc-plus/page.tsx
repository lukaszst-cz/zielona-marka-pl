import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "SpokojnyPC+ i SpokojnyMobile+ | Zielona Marka",
  description: "Spokojny+ to lokalne aplikacje dla Windows i Androida: ocena kondycji urządzenia, zrozumiałe wyjaśnienia i bezpieczne działania.",
  alternates: { canonical: "/spokojny-pc-plus" },
  openGraph: { title: "Spokojny+ | Zielona Marka", description: "Lokalna ocena kondycji komputera i telefonu bez agresywnego czyszczenia.", images: [{ url: "/program-spokojny-pc-plus-photo-v3.png", alt: "Spokojny+" }] },
};

const capabilities = [
  ["01", "Spokojny wynik", "Czytelna ocena kondycji urządzenia 0–100 oraz krótkie wyjaśnienie."],
  ["02", "Lokalny punkt odniesienia", "Kolejne pomiary komputera pomagają zauważyć faktyczne odchylenie."],
  ["03", "Co się zmieniło", "Historia kondycji i zmian pomaga znaleźć problem bez przeklikiwania ustawień."],
  ["04", "Bezpieczne działania", "Program nie udaje agresywnego cleanera. Działania wymagają decyzji użytkownika."],
] as const;

export default function SpokojnyPcPlusPage() {
  return <><SiteHeader /><main className="zm-public spokojny-page">
    <section className="page-hero shell spokojny-hero"><div><span className="eyebrow"><i />SPOKOJNY+ · WYDANIA TESTOWE RC1</span><h1>SpokojnyPC+.<br /><em>Najpierw diagnoza, potem działanie.</em></h1><p>Lokalny opiekun urządzenia dla osób, które chcą zrozumieć stan komputera bez straszenia, automatycznego usuwania i wymaganego konta w chmurze.</p><div className="hero-actions"><a className="button" href="#zakres">Zobacz zakres <span>↓</span></a><a href="#mobile">Wersja Android ↗</a><Link href="/praktyczne-narzedzia">Wróć do programów ↗</Link></div></div><figure className="spokojny-cover"><img src="/program-spokojny-pc-plus-photo-v3.png" alt="Spokojny+ na komputerze i telefonie" /><figcaption>Windows 3.2.0 RC1 i Android 1.0.0 RC1 to wydania testowe. Opisujemy potwierdzony zakres, nie obiecujemy funkcji na przyszłość.</figcaption></figure></section>
    <section id="zakres" className="section shell"><div className="section-head"><div><span className="section-no">AKTUALNY ZAKRES</span><h2>Stan urządzenia bez zgadywania.</h2></div><p>Wersja dla Windows zbiera lokalne sygnały o kondycji komputera. Zamiast obiecywać „optymalizację jednym kliknięciem”, pokazuje kontekst i prowadzi do bezpiecznych decyzji.</p></div><div className="timeline">{capabilities.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="section operations-section"><div className="shell operations-grid"><div><span className="section-no">WINDOWS 3.2.0 RC1</span><h2>Rzeczy, które są w programie.</h2><p>Dashboard, wynik kondycji, bateria, dysk, sieć, bezpieczeństwo, procesy, autostart, historia pomiarów, raport diagnostyczny, Storage Radar, Network Doctor i bezpieczne skróty do ustawień systemu.</p></div><div className="spokojny-checklist"><span>✓ dane i historia lokalnie</span><span>✓ brak wymaganego konta i chmury</span><span>✓ bez automatycznego zamykania procesów</span><span>✓ potwierdzenie przed działaniami systemowymi</span></div></div></section>
    <section id="mobile" className="section shell spokojny-mobile"><div><span className="section-no">SPOKOJNYMOBILE+ · ANDROID 1.0.0 RC1</span><h2>Spokojna kontrola także na telefonie.</h2><p>Osobna aplikacja Android pokazuje lokalny wynik kondycji, pamięć, baterię i sieć. Smart Check tłumaczy wyniki, a DeviceLink służy do łączenia znanych urządzeń po potwierdzeniu parowania.</p></div><div><b>TESTOWY APK DO POBRANIA</b><p>Plik instalacyjny dla Androida arm64 jest w osobnym publicznym repo. To przedpremierowe wydanie podpisane w trybie debug. Na stronie pobierania znajdziesz sumę SHA-256, instrukcję i ograniczenia. Prywatny kod źródłowy pozostaje oddzielony.</p><a className="button" href="https://github.com/lukaszst-cz/spokojny-mobile-plus-download/releases/tag/v1.0.0-rc1" target="_blank" rel="noreferrer">Pobierz wydanie testowe <span>↗</span></a></div></section>
    <section className="section shell next-project"><span className="section-no">STATUS</span><h2>Projekt jest aktywnie rozwijany.</h2><p>Android 1.0.0 RC1 jest dostępny do testów. Nie traktuj go jako stabilnego wydania ani automatycznej aktualizacji starszej instalacji. Wersji Windows nie udostępniam tu jeszcze do pobrania.</p><Link className="button" href="/kontakt">Zapytaj o rozwój programu <span>↗</span></Link></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
