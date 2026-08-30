import Link from "./SafeLink";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export default function NotFound() {
  return <><SiteHeader /><main className="shell not-found"><span className="section-no">BŁĄD 404</span><h1>Ta strona nie istnieje lub została przeniesiona.</h1><p>Wróć do strony głównej albo zobacz projekty demonstracyjne.</p><div><Link className="button" href="/">Strona główna <span>↗</span></Link><Link className="text-link" href="/realizacje">Realizacje <span>↗</span></Link></div></main><SiteFooter /></>;
}
