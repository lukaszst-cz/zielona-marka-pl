import type { Metadata } from "next";
import ContactForm from "../ContactForm";
import ExpandableImage from "../ExpandableImage";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = { title: "Kontakt i wycena", description: "Napisz bezpośrednio do osoby, która zaprojektuje Twoją stronę. Opowiedz o firmie, a wspólnie ustalimy zakres i możliwości współpracy.", alternates: { canonical: "/kontakt" },
  openGraph: { type: "website", url: "/kontakt", title: "Kontakt i wycena | Zielona Marka", description: "Napisz bezpośrednio do osoby, która zaprojektuje Twoją stronę. Opowiedz o firmie, a wspólnie ustalimy zakres i możliwości współpracy.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka: strony internetowe, DTP i rozwiązania dla firm" }] },
  twitter: { card: "summary_large_image", title: "Kontakt i wycena | Zielona Marka", description: "Napisz bezpośrednio do osoby, która zaprojektuje Twoją stronę. Opowiedz o firmie, a wspólnie ustalimy zakres i możliwości współpracy.", images: ["/og.jpg"] }, };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ pakiet?: string; wycena?: string }> }) {
  const { pakiet, wycena } = await searchParams;
  return <><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />KONTAKT I WYCENA</span><h1>Opowiedz mi o&nbsp;swojej firmie. <em>Resztę uporządkujemy razem.</em></h1><p>Nie potrzebujesz gotowego briefu. Napisz, czym zajmuje się firma i czego dziś brakuje na stronie albo w obsłudze klientów. Odpowiem najpóźniej w następnym dniu roboczym.</p></section>
    <section className="section contact-section"><div className="shell contact-grid"><div><span className="section-no">KRÓTKA ROZMOWA</span><h2>Wybierz wygodny sposób kontaktu.</h2><p>Wolisz telefon, wiadomość czy krótkie spotkanie w Google Meet? Wybierz wygodną formę. Pracuję lokalnie w Warszawie i okolicznych miejscowościach, a zdalnie, z firmami w całej Polsce.</p><div className="contact-direct"><a href="tel:+48450458466"><small>M:</small><strong>+48 450 458 466</strong></a><a href="mailto:kontakt@zielona-marka.pl"><small>E-mail:</small><strong>kontakt@zielona-marka.pl</strong></a><a href="https://wa.me/48603806833?text=Dzień%20dobry%2C%20chcę%20porozmawiać%20o%20stronie%20dla%20mojej%20firmy." target="_blank" rel="noreferrer"><small>WhatsApp:</small><strong>Napisz wiadomość ↗</strong></a></div><aside className="contact-person"><ExpandableImage src="/lukasz-kontakt-naturalny-20260919.png" previewSrc="/lukasz-kontakt-naturalny-20260919.webp" width={1142} height={1377} alt="Łukasz, osoba kontaktowa w Zielonej Marce" /><div><span>PO DRUGIEJ STRONIE KONTAKTU</span><h3>Porozmawiamy bezpośrednio?</h3><p>To ja odpisuję na Twoją wiadomość i rozmawiam o projekcie. Nie przekazuję sprawy między działami, ustalamy potrzeby bezpośrednio.</p></div></aside></div><div><span className="contact-form-kicker">KRÓTKI BRIEF · OKOŁO 1 MINUTY</span><ContactForm initialPackage={pakiet?.slice(0,180)} initialEstimate={wycena?.slice(0,1200)} /></div></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}

