import type { Metadata } from "next";
import Link from "../SafeLink";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import { addOns } from "../site-data";

const description = "Pełny cennik dodatków do pakietów stron internetowych Zielona Marka: teksty, formularze, sekcje, podstrony, Profil Firmy Google, panel edycji, wersje językowe i rozwiązania dodatkowe. Ceny netto.";

export const metadata: Metadata = {
  title: "Cennik dodatków do stron internetowych",
  description,
  alternates: { canonical: "/cennik-dodatkow" },
  openGraph: { type: "website", url: "/cennik-dodatkow", title: "Cennik dodatków do stron internetowych | Zielona Marka", description, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka: cennik dodatków" }] },
};

export default function AddOnsPage() {
  return <><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />CENNIK DODATKÓW</span><h1>Dobierz do pakietu <em>tylko to, czego potrzebujesz.</em></h1><p>Wszystkie ceny są cenami netto, do których doliczamy 23% VAT. Przy słowie „od” ostateczną kwotę podajemy w ofercie po rozmowie, zanim cokolwiek zamówisz.</p><div className="hero-actions"><Link className="button" href="/oferta#pakiety">Cennik pakietów stron <span>↗</span></Link><Link className="text-link" href="/kontakt">Poproś o wycenę ↗</Link></div></section>
    <section className="section shell" aria-labelledby="addon-table-title"><div className="section-head"><div><span className="section-no">PEŁNA LISTA</span><h2 id="addon-table-title">Dodatki, ceny i pakiety, których dotyczą.</h2></div><p>Dodatki jednorazowe dolicza się do ceny pakietu. Pozycje miesięczne są rozliczane osobno i można je w każdej chwili wypowiedzieć.</p></div>
      <div className="zm-compare" style={{ marginTop: 0 }}><div className="zm-compare-scroll" style={{ paddingTop: 16 }}><table>
        <thead><tr><th scope="col">Dodatek</th><th scope="col">Dotyczy</th><th scope="col">Cena netto</th><th scope="col">Co obejmuje</th></tr></thead>
        <tbody>{addOns.map((item) => <tr key={item.title}><th scope="row">{item.title}</th><td>{item.scope}</td><td><b>{item.price}</b></td><td>{item.text}</td></tr>)}</tbody>
      </table></div></div>
      <p className="legal-note">Kwoty netto powiększamy o 23% VAT. Faktury wystawia Bizky sp. z o.o. Dodatki w pakietach wyższych poziomów, które są w ich cenie, oznaczono w opisie dodatku. Zasady liczenia podstron, sekcji i słów opisują <Link href="/warunki-wspolpracy">warunki współpracy</Link>.</p>
      <p style={{ marginTop: 18 }}><Link className="button" href="/kontakt">Zapytaj o wycenę z dodatkami <span>↗</span></Link></p>
    </section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
