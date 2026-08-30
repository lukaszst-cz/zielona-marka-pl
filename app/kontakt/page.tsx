import type { Metadata } from "next";
import ContactForm from "../ContactForm";
import { QuickContact, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = { title: "Kontakt i wycena", description: "Skontaktuj się z Zieloną Marką w sprawie strony, formularza wyceny, modernizacji lub asystenta dla lokalnej firmy usługowej." };

export default function ContactPage() {
  return <><SiteHeader /><main>
    <section className="page-hero shell"><span className="eyebrow"><i />KONTAKT I WYCENA</span><h1>Opowiedz mi o swojej firmie. <em>Resztę uporządkujemy razem.</em></h1><p>Wystarczy kilka zdań: czym zajmuje się firma, jak dziś trafiają do niej klienci i czego brakuje w pierwszym kontakcie. Odpowiadam najpóźniej w następnym dniu roboczym.</p></section>
    <section className="section contact-section"><div className="shell contact-grid"><div><span className="section-no">KRÓTKA ROZMOWA</span><h2>Wybierz wygodny sposób kontaktu.</h2><p>Możemy spotkać się online przez Google Meet, zadzwonić, napisać e-mail lub WhatsApp. Lokalnie: Ząbki, Marki, Warszawa, Kobyłka, Zielonka, Radzymin, Wołomin, Nieporęt i Legionowo. Zdalnie: cała Polska.</p><div className="contact-direct"><a href="tel:+48450458466"><small>M:</small><strong>+48 450 458 466</strong></a><a href="mailto:kontakt@zielona-marka.pl"><small>E-mail:</small><strong>kontakt@zielona-marka.pl</strong></a><a href="https://wa.me/48603806833?text=Dzień%20dobry%2C%20chcę%20porozmawiać%20o%20stronie%20dla%20mojej%20firmy." target="_blank" rel="noreferrer"><small>WhatsApp:</small><strong>Napisz wiadomość ↗</strong></a></div></div><div><span className="contact-form-kicker">KRÓTKI BRIEF · OKOŁO 1 MINUTY</span><ContactForm /></div></div></section>
  </main><QuickContact /><SiteFooter /></>;
}
