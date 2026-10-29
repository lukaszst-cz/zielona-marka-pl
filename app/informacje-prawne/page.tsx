import type { Metadata } from "next";
import Link from "../SafeLink";
import { SiteHeader, SiteFooter } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Informacje prawne i fakturowanie",
  description: "Dane Zielonej Marki, kontakt do Łukasza Staniewicza i informacje o fakturowaniu przez Bizky Freelance.",
  alternates: { canonical: "/informacje-prawne" },
  robots: { index: false, follow: true },
};

export default function LegalInformation() {
  return <><SiteHeader /><main className="zm-public legal shell zm-legal-information">
    <span className="section-no">DANE I ROZLICZENIA · AKTUALIZACJA 29.10.2026</span>
    <h1>Informacje prawne</h1>
    <p className="legal-lead">Kontakt w sprawie projektu i dane podmiotu obsługującego fakturowanie, w jednym miejscu.</p>
    <div className="zm-legal-grid">
      <section aria-labelledby="legal-brand"><span className="zm-legal-label">PROJEKT I KONTAKT</span><h2 id="legal-brand">Zielona Marka</h2>
        <p>Projektowanie i modernizacja stron internetowych</p>
        <p><strong>Łukasz Staniewicz</strong><br />Marki, woj. mazowieckie</p>
        <ul><li><a href="https://zielona-marka.pl/">zielona-marka.pl</a></li><li><a href="mailto:kontakt@zielona-marka.pl">kontakt@zielona-marka.pl</a></li><li>Telefon: <a href="tel:+48450458466">+48 450 458 466</a></li><li>WhatsApp: <a href="https://wa.me/48603806833" target="_blank" rel="noopener noreferrer">+48 603 806 833 ↗</a></li></ul>
      </section>
      <section aria-labelledby="legal-billing"><span className="zm-legal-label">FAKTUROWANIE PRZEZ BIZKY FREELANCE</span><h2 id="legal-billing">Podmiot obsługujący fakturowanie</h2>
        <p><strong>Bizky sp. z o.o.</strong><br /><small>Wcześniejsza nazwa: beChange sp. z o.o.</small></p>
        <address>Al. Księcia Józefa Poniatowskiego 1<br />klatka K4, poziom 1<br />03-901 Warszawa</address>
        <dl><div><dt>NIP</dt><dd>7010150265</dd></div><div><dt>KRS</dt><dd>0000312229</dd></div></dl>
        <p className="zm-legal-note">Dane tej spółki dotyczą rozliczeń przez Bizky Freelance. Zakres projektu i sposób rozliczenia ustalam z Tobą przed rozpoczęciem współpracy.</p>
        <a className="zm-legal-source" href="https://bizky.ai/regulamin-bizky-one-time/" target="_blank" rel="noopener noreferrer">Regulamin Bizky Freelance ↗</a>
      </section>
    </div>
    <p>W sprawach projektu i kontaktu ze mną korzystaj z danych Zielonej Marki podanych powyżej.</p>
    <div className="zm-legal-actions"><Link className="button" href="/kontakt">Przejdź do kontaktu <span>↗</span></Link><Link href="/polityka-prywatnosci">Polityka prywatności</Link></div>
  </main><SiteFooter /></>;
}
