import Link from "./SafeLink";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export default function NotFound() {
  return <><SiteHeader /><main className="zm-public"><section className="page-hero shell"><span className="eyebrow"><i />BŁĄD 404</span><h1>Tej strony tutaj <em>nie ma.</em></h1><p>Adres mógł się zmienić albo zawierać literówkę. Wróć do strony głównej, przejdź do oferty lub wybierz jeden z praktycznych poradników.</p><div className="hero-actions"><Link className="button" href="/">Wróć na stronę główną <span>↗</span></Link><Link className="text-link" href="/poradnik">Zobacz poradniki <span>↗</span></Link></div></section></main><SiteFooter /></>;
}
