import type { Metadata } from "next";
import ContactForm from "../ContactForm";
import ExpandableImage from "../ExpandableImage";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = { title: "Kontakt i wycena", description: "Skontaktuj się z Zieloną Marką w sprawie strony, formularza wyceny, modernizacji lub prostego zaplecza dla lokalnej firmy usługowej.", alternates: { canonical: "/kontakt" } };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ wyslano?: string }> }) {
  const { wyslano } = await searchParams;
  return <><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />KONTAKT I WYCENA</span><h1>Opowiedz mi o&nbsp;swojej firmie. <em>Resztę uporządkujemy razem.</em></h1><p>Wystarczy kilka zdań: czym zajmuje się firma, jak dziś trafiają do niej klienci i czego brakuje w pierwszym kontakcie. Odpowiadam najpóźniej w następnym dniu roboczym.</p></section>
    <section className="section contact-section"><div className="shell contact-grid"><div><span className="section-no">KRÓTKA ROZMOWA</span><h2>Wybierz wygodny sposób kontaktu.</h2><p>Możemy spotkać się online przez Google Meet, zadzwonić, napisać e-mail lub WhatsApp. Lokalnie: Warszawa, Targówek, Ząbki, Marki, Kobyłka, Zielonka, Radzymin, Wołomin, Nieporęt i Legionowo. Zdalnie: cała Polska.</p><div className="contact-direct"><a href="tel:+48450458466"><small>M:</small><strong>+48 450 458 466</strong></a><a href="mailto:kontakt@zielona-marka.pl"><small>E-mail:</small><strong>kontakt@zielona-marka.pl</strong></a><a href="https://wa.me/48603806833?text=Dzień%20dobry%2C%20chcę%20porozmawiać%20o%20stronie%20dla%20mojej%20firmy." target="_blank" rel="noreferrer"><small>WhatsApp:</small><strong>Napisz wiadomość ↗</strong></a></div><aside className="contact-person"><ExpandableImage src="/lukasz-kontakt-naturalny-20260919.png" previewSrc="/lukasz-kontakt-naturalny-20260919.webp" width={1142} height={1377} alt="Łukasz, osoba kontaktowa w Zielonej Marce" /><div><span>PO DRUGIEJ STRONIE KONTAKTU</span><h3>Porozmawiamy bezpośrednio?</h3><p>Najpierw chcę dobrze zrozumieć Twoją firmę. Potem wspólnie wybierzemy prosty, realny następny krok, bez presji i&nbsp;bez technicznego żargonu.</p></div></aside></div><div><span className="contact-form-kicker">KRÓTKI BRIEF · OKOŁO 1 MINUTY</span>{wyslano === "1" && <div className="form-success" role="status"><b>Dziękuję, wiadomość dotarła.</b><p>Zapoznam się z Twoją sprawą i odezwę się w sprawie kolejnego kroku.</p></div>}<ContactForm /></div></div></section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}

