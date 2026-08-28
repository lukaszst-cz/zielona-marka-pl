import Link from "../SafeLink";
import BrandSignature from "../BrandSignature";
import { requireStudioOwner } from "../studio/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Przykładowy draft umowy",
  description: "Przykładowy zakres umowy na stronę, system lub automatyzację dla firmy.",
};

const clauses = [
  ["1. Strony i dokumenty", "Wykonawca: Łukasz Staniewicz, działający pod marką Zielona Marka, kontakt: kontakt@zielona-marka.pl, +48 450 458 466. Klient i jego dane wpisywane są w wersji finalnej. Umowę uzupełniają zaakceptowana oferta, zakres prac i ewentualny brief."],
  ["2. Cel i zakres", "Celem jest wykonanie strony internetowej, systemu lub automatyzacji opisanych w załączniku do umowy. Załącznik wskazuje liczbę widoków lub podstron, funkcje, integracje, materiały, technologię, wersje językowe, harmonogram, cenę i liczbę rund poprawek. Elementy niewymienione w zakresie nie są objęte ceną podstawową."],
  ["3. Materiały i współpraca", "Klient przekazuje materiały, do których ma prawa, oraz terminowo akceptuje kolejne etapy. Wykonawca może pomóc zaplanować treści i dobrać legalne zdjęcia licencjonowane. Odpowiedzialność za zgodność przekazanych tekstów, znaków, zdjęć, cenników i informacji branżowych z prawem oraz stanem faktycznym pozostaje po stronie Klienta."],
  ["4. Etapy i termin", "Praca przebiega przez brief i zakres, projekt, realizację, uporządkowane poprawki, testy jakości (QA), publikację i przekazanie. Typowe terminy podane na stronie są orientacyjne; wiążący termin wpisuje się do oferty. Termin ulega odpowiedniemu przesunięciu, gdy oczekiwanie dotyczy materiałów, odpowiedzi, akceptacji lub decyzji Klienta."],
  ["5. Poprawki i zmiana zakresu", "W cenie są rundy poprawek wskazane w ofercie. Jedna runda to zebrany zestaw uwag do udostępnionej wersji. Nowe funkcje, dodatkowe widoki, integracje, treści, języki lub zmiana wcześniej zaakceptowanego kierunku są wyceniane przed rozpoczęciem i wymagają akceptacji Klienta."],
  ["6. Wynagrodzenie i rozliczenie", "Cena jest wskazana w zaakceptowanej ofercie. Klient wpłaca 30% zaliczki po akceptacji zakresu i umowy; jej zaksięgowanie rezerwuje termin i rozpoczyna realizację. Pozostałe 70% jest płatne po zaakceptowaniu gotowej wersji i zakończeniu uzgodnionych testów jakości (QA), przed publikacją na domenie lub serwerze Klienta. Publikacja i przekazanie uzgodnionych dostępów następują po pełnym rozliczeniu. Koszty zewnętrzne, takie jak domena, płatne licencje, hosting, sesja zdjęciowa lub płatne narzędzia, są ujmowane wyłącznie po wyraźnej akceptacji Klienta."],
  ["7. Domena, hosting i dostępy", "Domena oraz kluczowe konta powinny należeć do Klienta. Wykonawca może pomóc w konfiguracji hostingu, DNS, SSL, poczty i publikacji w ramach ustalonego zakresu. Klient zachowuje bezpiecznie swoje hasła i uprawnienia; Wykonawca nie przyjmuje odpowiedzialności za blokady lub warunki narzucone przez zewnętrznych dostawców."],
  ["8. SEO, widoczność i analityka", "W ramach uzgodnionego pakietu strona otrzymuje techniczne podstawy SEO: logiczną strukturę, metadane, indeksowanie, mapę strony, wersję mobilną oraz podstawy wydajności. To przygotowuje stronę do dalszego pozycjonowania, ale nie jest gwarancją konkretnej pozycji w Google ani liczby zapytań. Dalsze SEO, reklamy, wizytówka Google i treści są osobnymi działaniami, jeśli nie wpisano ich do zakresu."],
  ["9. Testy i odbiór", "Przed publikacją Wykonawca wykonuje uzgodnione testy jakości (QA), w szczególności sprawdzenie responsywności, formularzy, podstawowej dostępności, działania linków i wydajności. Raport QA opisuje faktycznie wykonane kontrole, a nie obiecuje stałych wyników zależnych od urządzenia, sieci lub usług zewnętrznych. Klient zgłasza istotne niezgodności z zakresem w terminie wpisanym do oferty."],
  ["10. Publikacja, przekazanie i opieka", "Po odbiorze i rozliczeniu Wykonawca publikuje rozwiązanie oraz przekazuje uzgodnione dostępy, instrukcję i materiały. Opieka może obejmować monitoring, aktualizacje, kopie bezpieczeństwa, test formularzy, drobne zmiany treści i podsumowanie. Zakres opieki, limit drobnych zmian, czas reakcji oraz koszt są zawsze osobno wskazane; nowe funkcje nie są opieką."],
  ["11. Prawa do efektów pracy", "Zasady korzystania z kodu, projektu, tekstów i innych rezultatów określa oferta. Jeżeli strony chcą przenieść autorskie prawa majątkowe, finalna umowa precyzyjnie wskaże pola eksploatacji i zachowa wymaganą formę. Elementy pochodzące z licencji zewnętrznych podlegają warunkom ich licencjodawców."],
  ["12. Dane osobowe i poufność", "Strony wykorzystują dane kontaktowe i materiały wyłącznie do przygotowania, realizacji oraz rozliczenia współpracy. Szczegóły działania formularza i Strefy Klienta opisuje polityka prywatności Zielonej Marki. Dane dostępowe, materiały robocze i informacje handlowe nie są udostępniane osobom nieuprawnionym, z wyjątkiem sytuacji wymaganych prawem lub potrzebnych do działania uzgodnionych usług."],
  ["13. Konsument i postanowienia końcowe", "Jeżeli Klient jest konsumentem, finalna umowa zawierana na odległość uwzględnia wymagane informacje o prawie odstąpienia. Rozpoczęcie usługi przed upływem ustawowego terminu następuje wyłącznie na wyraźne żądanie i po przekazaniu właściwych informacji. Ten dokument jest wzorem informacyjnym, nie zawiera danych stron, ceny ani zakresu konkretnego projektu i nie stanowi porady prawnej."],
];

export default async function SampleContract() {
  const user = await requireStudioOwner();
  if (!user) return <main className="studio-denied"><div><span className="section-no">PRYWATNY DOKUMENT</span><h1>Zaloguj się do Studio pracy.</h1><p>Wzór umowy jest dostępny wyłącznie dla właściciela Zielonej Marki.</p><form className="studio-login-form" method="post" action="/api/studio/session"><label>E-mail<input name="email" type="email" defaultValue="lukasz.staniewicz@gmail.com" required autoComplete="username" /></label><label>Hasło<input name="password" type="password" required autoComplete="current-password" /></label><button className="button" type="submit">Zaloguj się <span>↗</span></button></form><Link href="/">Wróć na stronę</Link></div></main>;
  return <main className="contract-page">
    <header className="contract-header shell">
      <Link className="brand" href="/"><BrandSignature /></Link>
      <Link href="/#kontakt" className="contract-contact">Masz projekt? Wyślij brief ↗</Link>
    </header>
    <article className="contract-document">
      <span className="section-no">DOKUMENT INFORMACYJNY / WERSJA PRZYKŁADOWA</span>
      <h1>Przykładowy draft umowy</h1>
      <p className="contract-lead">Tak wygląda przejrzysta umowa, zanim uzupełnimy ją o Twój zakres, cenę, terminy i dane stron.</p>
      <aside className="contract-warning"><b>Ważne:</b> to prywatny wzór do rozmowy i wglądu. Finalny dokument zawsze dopasowuję do konkretnego zlecenia; przy nietypowym zakresie lub współpracy z konsumentem warto skonsultować go z prawnikiem.</aside>
      <section className="contract-summary" aria-label="Co obejmuje wzór"><b>Co jest zabezpieczone w umowie?</b><span>zakres i terminy</span><span>poprawki i rozliczenie</span><span>SEO i QA</span><span>dostępy i przekazanie</span><span>opieka i prawa</span></section>
      <div className="contract-clauses">
        {clauses.map(([title, body]) => <section key={title}><h2>§ {title}</h2><p>{body}</p></section>)}
      </div>
      <section className="contract-signatures"><div><span>WYKONAWCA</span><b>Łukasz Staniewicz / Zielona Marka</b><i>miejsce na podpis</i></div><div><span>KLIENT</span><b>[imię, firma lub nazwa podmiotu]</b><i>miejsce na podpis</i></div></section>
      <p className="contract-sources">Przy tworzeniu finalnej umowy uwzględnia się m.in. zasady dotyczące praw autorskich oraz praw konsumenta. Źródła informacyjne: ISAP i UOKiK.</p>
      <div className="contract-actions"><Link className="button" href="/#kontakt">Zapytaj o umowę do projektu <span>↗</span></Link><Link className="text-link" href="/polityka-prywatnosci">Zobacz politykę prywatności <span>→</span></Link></div>
    </article>
  </main>;
}
