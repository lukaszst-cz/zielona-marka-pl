import Image from "next/image";
import Link from "./SafeLink";
import HomeContactForm from "./HomeContactForm";
import ForestHero from "./ForestHero";
import LivingPortal from "./LivingPortal";
import HomeStoryMotion from "./HomeStoryMotion";
import HomeOffersCarousel from "./HomeOffersCarousel";
import ProcessStandard from "./ProcessStandard";
import { QuickWhatsApp, SiteHeader, SiteFooter } from "./SiteChrome";
import "./home-v5.css";
import "./home-carousel.css";
import "./home-calm-story.css";
import "./home-layout-repair.css";
import "./home-scroll-editorial.css";
import "./home-nature-finish.css";

function WebsiteVisual() {
  return <div className="zmh-visual"><p className="zmh-caption">Przykładowa strona dla branży beauty · demonstracja</p><div className="zmh-website zmh-glass"><div className="zmh-mini-nav"><b>✳ Natura Studio</b><span>O nas  Oferta  Kontakt</span></div><div className="zmh-site-interior"><span>CHWILA DLA SIEBIE</span><h3>Spokojniej.<br />Bliżej siebie.</h3><p>Pielęgnacja. Relaks. Naturalne piękno.</p><span className="zmh-sample-button">Poznaj zabiegi ↗</span></div></div></div>;
}

function FormVisual() {
  return <div className="zmh-visual zmh-calm-form-scene">
    <div className="zmh-calm-form zmh-glass" aria-label="Przykładowy, nieaktywny podgląd formularza zapytania">
      <div className="zmh-calm-form-top"><span><i aria-hidden="true" /> NATURA STUDIO / DEMONSTRACJA</span><span>01 / ZAPYTANIE</span></div>
      <div className="zmh-calm-form-body">
        <div className="zmh-calm-form-intro"><small>PROSTA DROGA DO KONTAKTU</small><h3>Opowiedz, czego potrzebujesz.</h3><p>Kilka jasnych pytań. Bez zbędnego dopytywania.</p><span className="zmh-calm-form-time">Więcej czasu na rozmowę.</span></div>
        <div className="zmh-calm-form-fields" aria-hidden="true">
          <div><small>RODZAJ USŁUGI</small><span>Wybierz dogodną usługę <i>⌄</i></span></div>
          <div><small>TERMIN</small><span>Ustalmy odpowiedni dzień <i>▦</i></span></div>
          <div><small>WIADOMOŚĆ</small><span>Krótko opisz swoją potrzebę…</span></div>
          <strong>Prześlij zapytanie <span>↗</span></strong>
        </div>
      </div>
      <div className="zmh-calm-form-foot"><span>Przejrzysta oferta</span><i aria-hidden="true" /><span>Jeden spokojny krok dalej</span></div>
    </div>
    <p className="zmh-caption zmh-bottom-caption">Poglądowa prezentacja formularza — bez przesyłania danych.</p>
  </div>;
}

function CommerceVisual() {
  return <div className="zmh-visual zmh-calm-commerce-scene">
    <div className="zmh-commerce zmh-glass">
      <div className="zmh-voucher"><small>NATURA STUDIO / KONCEPCJA</small><strong>Podaruj<br />chwilę spokoju.</strong><span>VOUCHER PODARUNKOWY</span></div>
      <div className="zmh-commerce-copy"><p className="zmh-caption">PRZYKŁADOWY SKLEP</p><h3>Małe przyjemności.<br />Prosta droga do zakupu.</h3><p>Wybór → Koszyk → Płatność</p><small>Poglądowy przykład zakupu vouchera, bez prawdziwej transakcji.</small></div>
    </div>
  </div>;
}

function FlowVisual({ aftercare = false }: { aftercare?: boolean }) {
  const steps = aftercare
    ? [
      { number: "01", title: "Usługa zakończona", hint: "Wiemy, co zrobiono", state: "Gotowe" },
      { number: "02", title: "Dobra rozmowa", hint: "Naturalny kontakt po wizycie", state: "Kontakt" },
      { number: "03", title: "Kolejny termin", hint: "Bez szukania ustaleń", state: "Plan" },
    ]
    : [
      { number: "01", title: "Nowe zapytanie", hint: "Wszystkie informacje razem", state: "Odebrane" },
      { number: "02", title: "Spokojna wycena", hint: "Jasny następny krok", state: "W toku" },
      { number: "03", title: "Realizacja", hint: "Termin i status pod ręką", state: "Plan" },
    ];
  return <div className="zmh-visual zmh-calm-flow-scene">
    <div className="zmh-calm-flow zmh-glass">
      <div className="zmh-calm-flow-top"><span><i aria-hidden="true" /> TWOJA FIRMA / DEMONSTRACJA</span><span>{aftercare ? "RELACJE" : "UPORZĄDKOWANA OBSŁUGA"}</span></div>
      <div className="zmh-calm-flow-body">
        <div className="zmh-calm-flow-message"><small>{aftercare ? "PO WYKONANEJ USŁUDZE" : "JEDNO MIEJSCE NA USTALENIA"}</small><h3>{aftercare ? <>Relacje, które<br />warto pielęgnować.</> : <>Więcej porządku.<br />Więcej oddechu.</>}</h3><p>{aftercare ? "Dobrze wracać do klientów z troską — we właściwym momencie." : "Sprawy układają się w czytelną kolejność. Nic nie musi krążyć w głowie."}</p><span className="zmh-calm-flow-promise">Czas na to, co ważne.</span></div>
        <ol className="zmh-calm-flow-steps">{steps.map((item, index) => <li key={item.number} className={index === 0 ? "is-first" : ""}><span className="zmh-calm-step-number">{item.number}</span><div><strong>{item.title}</strong><small>{item.hint}</small></div><span className="zmh-calm-step-state">{item.state}</span></li>)}</ol>
      </div>
      <div className="zmh-calm-flow-bottom"><span>Wszystko na swoim miejscu</span><span>✳ Spokojny rytm pracy</span></div>
    </div>
    <p className="zmh-caption zmh-bottom-caption">{aftercare ? "Przykładowy scenariusz opieki po wykonanej usłudze." : "Demonstracja przebiegu zapytania w systemie CRM."}</p>
  </div>;
}

export function OrganicHome() {
  return <main className="zm-v5">
    <a className="zmh-skip" href="#opowiesc">Przejdź do treści</a>
    <div className="zmh-forest" id="start">
      <div className="zmh-opening"><ForestHero /><SiteHeader />
      <section className="zmh-hero zmh-wrap" aria-labelledby="hero-title">
        <div className="zmh-hero-copy"><p className="zmh-eyebrow">STRONY I SKLEPY WWW · SYSTEMY CRM · DTP DLA FIRM</p><h1 id="hero-title">Masz dobrą firmę.<br /><em>Pokażmy ją z dobrej strony.</em></h1><p className="zmh-lead">Projektuję strony WWW dla firm usługowych. Pomagam też uporządkować zapytania, sprzedaż i obsługę klientów.</p><p className="zmh-service-line"><Link href="/oferta#branze">Formularze</Link> · <Link href="/oferta#mini-sklep">Sklepy i płatności</Link> · <Link href="/maly-crm-dla-firm">Systemy CRM</Link></p><p className="zmh-offer-proof">Dla <Link href="/strony-internetowe">lokalnych firm usługowych z Warszawy i okolic</Link> · od 899 zł netto za prostą wizytówkę · zakres dobieramy do firmy*</p><div className="zmh-actions"><a className="zmh-pill" href="/kontakt">Porozmawiajmy o stronie <span aria-hidden="true">↗</span></a><Link className="zmh-quiet" href="/oferta#zm-mini">ZM Mini — od 899 zł netto ↗</Link><Link className="zmh-quiet zmh-studio-entry" href="/projektuj-strone">Zaprojektuj przykładową stronę ↗</Link></div><p className="zmh-trust-note">Od pierwszej rozmowy pracujesz bezpośrednio ze mną.<br /> Gotową stronę oglądasz i zatwierdzasz przed publikacją.</p><p className="zmh-price-note">*Cena ZM Mini od 899 zł netto dotyczy prostej strony z 3 sekcjami w sprawdzonym układzie, na materiałach klienta. Bez formularza i dodatkowych podstron. Domena, hosting i opieka są rozliczane osobno.</p></div>
        <div className="zmh-hero-foot"><span className="zmh-aside-note">TWÓJ POMYSŁ.<br />WSPÓLNY KIERUNEK.</span><p>Dobry grunt<br />dla Twoich<br />pomysłów.</p></div>
      </section>
      </div><div className="zmh-scene-transition" aria-hidden="true"><span /></div><LivingPortal />
      <div className="zmh-scroll-content">
      <HomeOffersCarousel />
      <nav className="zmh-social-panel zmh-wrap" aria-label="Zielona Marka w mediach społecznościowych"><div><strong>Bądźmy w kontakcie</strong><span>Zobacz aktualności i projekty marki Zielona Marka również poza stroną.</span></div><div className="zmh-social-panel-links"><a href="https://www.facebook.com/zielonamarka" target="_blank" rel="noopener noreferrer"><Image src="/podpis-email/icon-facebook.png" width={27} height={27} alt="" unoptimized />Facebook ↗</a><a href="https://www.instagram.com/zielona.marka.pl/" target="_blank" rel="noopener noreferrer"><Image src="/podpis-email/icon-instagram.png" width={27} height={27} alt="" unoptimized />Instagram ↗</a><a href="https://www.google.com/maps/search/?api=1&amp;query=Zielona%20Marka%20strony%20WWW%20Warszawa" target="_blank" rel="noopener noreferrer"><Image src="/podpis-email/icon-google.png" width={27} height={27} alt="" unoptimized />Znajdź w Google ↗</a><a href="https://github.com/lukaszst-cz" target="_blank" rel="noopener noreferrer"><Image src="/icon-github-zielona-marka.svg" width={27} height={27} alt="" unoptimized />GitHub ↗</a></div></nav>
      <section className="zmh-quick-brief zmh-wrap" id="krotki-brief" aria-labelledby="krotki-brief-title"><div className="zmh-quick-brief-copy"><p className="zmh-eyebrow">KRÓTKI BRIEF · OKOŁO 1 MINUTY</p><h2 id="krotki-brief-title">Masz już kierunek?<br /><em>Opisz go w kilku zdaniach.</em></h2><p>Nie musisz znać nazw funkcji ani gotowego rozwiązania. Napisz, czym zajmuje się firma i co chcesz ułatwić klientom lub sobie.</p><ul><li>odpowiadam najpóźniej w następnym dniu roboczym</li><li>bez zobowiązań i bez publikacji przed akceptacją</li></ul></div><div className="zmh-form-surface"><HomeContactForm /></div></section>
      <div className="zmh-cinema zmh-wrap">
        <div className="zmh-cinema-chapters">
          <section className="zmh-story" id="twoja-strona" aria-labelledby="strona-title"><div className="zmh-wrap zmh-split"><div className="zmh-copy"><p className="zmh-chapter">01 / TWOJA STRONA</p><h2 id="strona-title">Strona, na której<br />łatwo Cię zrozumieć.</h2><p>Klient widzi, co oferujesz, dla kogo pracujesz i jak się z Tobą skontaktować. Układam treść, zdjęcia i nawigację tak, żeby tworzyły spójną opowieść o Twojej firmie.</p><p className="zmh-callout">Wybieramy to, czego potrzebujesz.<br />Od samej strony po połączone z nią narzędzia.</p><Link className="zmh-text-link" href="/oferta">Co obejmuje strona WWW ↗</Link><p className="zmh-callout"><Link href="/projektuj-strone">Zobacz interaktywny podgląd i zaprojektuj przykładową stronę ↗</Link></p><p className="zmh-callout">Sprawdź też <Link href="/oferta#kalkulator-pelnego-kosztu">całkowity koszt uruchomienia i utrzymania strony</Link> oraz <Link href="/dtp">wizytówki i ulotki do druku</Link>.</p><p className="zmh-callout">Zobacz przykłady dla: <Link href="/strony-dla-firm-uslugowych">firm usługowych</Link>, <Link href="/strony-dla-warsztatow">warsztatów i detailingu</Link> oraz <Link href="/strony-dla-beauty">branży beauty</Link>.</p></div><WebsiteVisual /></div></section>
          <section className="zmh-story" aria-labelledby="formularze-title"><div className="zmh-wrap zmh-split"><div className="zmh-copy"><p className="zmh-chapter">02 / FORMULARZE</p><h2 id="formularze-title">Mniej dopytywania.<br />Więcej konkretów.</h2><p>Usługa, preferowany termin, kilka zdań o potrzebie. Dobrze dobrany formularz pomaga klientowi opisać sprawę, a Tobie przygotować rozmowę lub wycenę.</p><span className="zmh-aside-note">WIĘCEJ MIEJSCA<br />NA DOBRĄ ROZMOWĘ.</span></div><FormVisual /></div></section>
          <section className="zmh-story" aria-labelledby="sprzedaz-title"><div className="zmh-wrap zmh-split"><div className="zmh-copy"><p className="zmh-chapter">03 / SKLEP I PŁATNOŚCI</p><h2 id="sprzedaz-title">Twoja oferta sięga<br />dalej niż wizyta.</h2><p>Kosmetyk polecony po zabiegu. Voucher dla kogoś bliskiego. Produkt, po który klient chce wrócić. Łączę stronę ze sklepem i płatnościami online, żeby można było kupić go także z domu.</p><Link className="zmh-text-link" href="/oferta#mini-sklep">Co obejmuje sklep z płatnościami ↗</Link></div><CommerceVisual /></div></section>
          <section className="zmh-story" aria-labelledby="crm-title"><div className="zmh-wrap zmh-split"><div className="zmh-copy"><p className="zmh-chapter">04 / CRM I OBSŁUGA ZLECEŃ</p><h2 id="crm-title">Zapytanie przyszło.<br />Wiadomo, co dalej.</h2><p>Gdy ustalenia mają swoje miejsce, łatwiej zaplanować dzień. CRM to system, w którym łączę kontakty, wyceny, terminy i statusy zleceń. Wiesz, komu odpowiedzieć i co jest już zrobione.</p><Link className="zmh-text-link" href="/maly-crm-dla-firm">Zobacz, jak działa CRM ↗</Link></div><FlowVisual /></div></section>
          <section className="zmh-story zmh-relationships" aria-labelledby="relacje-title"><div className="zmh-wrap zmh-split"><div className="zmh-copy"><p className="zmh-chapter">05 / KONTAKT PO USŁUDZE</p><h2 id="relacje-title">Dobre relacje<br />warto pielęgnować.</h2><p>Po wykonanej usłudze zostaje miejsce na pytanie, czy wszystko w porządku, prośbę o opinię albo przypomnienie o kolejnym terminie. Pomagam zaplanować taki kontakt i połączyć go z obsługą zleceń.</p></div><FlowVisual aftercare /></div></section>
        </div>
        <HomeStoryMotion />
      </div>
      </div>
    </div>
    <div className="zmh-lower-forest">
      <section className="zmh-portfolio zmh-wrap" id="projekty" aria-labelledby="projekty-title"><div className="zmh-section-heading"><div><p className="zmh-eyebrow">PROJEKTY DEMONSTRACYJNE</p><h2 id="projekty-title">Zobacz, zanim zdecydujesz.</h2></div><div className="zmh-section-actions"><Link className="zmh-pill zmh-outline" href="/realizacje">Obejrzyj projekty ↗</Link><Link className="zmh-text-link" href="/praktyczne-narzedzia">Praktyczne narzędzia i aplikacje ↗</Link></div></div><p className="zmh-intro">Sprawdź, jak strona pomaga wybrać usługę, zaplanować wizytę albo znaleźć mieszkanie. Każdy przykład odpowiada na inną potrzebę.</p><div className="zmh-projects"><Link className="zmh-project zmh-glass" href="/demo/natura-strona"><Image src="/concept-natura.jpg" width={600} height={400} alt="Wnętrze demonstracyjnego studia wellness" unoptimized /><div><small>DEMONSTRACJA / BEAUTY</small><h3>Natura Studio</h3><p>Wybór zabiegu zaczyna się od jasnego opisu. Strona pokazuje usługi, ceny i drogę do umówienia wizyty.</p><span>Obejrzyj stronę studia ↗</span></div></Link><Link className="zmh-project zmh-glass zmh-bistro" href="/demo/bistro-strona"><Image src="/concept-bistro.jpg" width={600} height={400} alt="Wnętrze demonstracyjnej restauracji" unoptimized /><div><small>DEMONSTRACJA / GASTRONOMIA</small><h3>Bistro Forma</h3><p>Gość chce poczuć klimat miejsca i zaplanować wizytę. Strona łączy menu z informacją o rezerwacji.</p><span>Obejrzyj stronę restauracji ↗</span></div></Link></div><div className="zmh-more-projects"><Link href="/demo/dom-strona">Dom Dobry / mieszkania i dostępność ↗</Link><Link href="/realizacje/transportflow">TransportFlow / proces firmy transportowej ↗</Link></div><p className="zmh-caption">Opisy koncepcji: <Link href="/realizacje/natura-studio">Natura Studio</Link> · <Link href="/realizacje/bistro-forma">Bistro Forma</Link> · <Link href="/realizacje/dom-dobry">Dom Dobry</Link></p><p className="zmh-caption">Autorskie demonstracje możliwości. Nie są realizacjami dla klientów.</p></section>
      <section className="zmh-process zmh-wrap" id="proces" aria-labelledby="proces-title"><p className="zmh-chapter">WSPÓŁPRACA / ZIELONA MARKA</p><h2 id="proces-title">Spokojny proces.<br />Wspólny kierunek.</h2><p>Nazywam się Łukasz Staniewicz. Tworzę strony i proste narzędzia, które ułatwiają kontakt z klientami i codzienną pracę firmy. Zaczynam od rozmowy o tym, czego potrzebujesz, a potem proponuję rozwiązanie i zakres prac. Rozmawiasz bezpośrednio ze mną i wiesz, co przygotowujemy oraz co będziesz zatwierdzać.</p><figure className="zmh-founder-photo"><Image src="/lukasz-zielona-marka-strona-glowna-20260908.webp" width={1000} height={563} alt="Łukasz Staniewicz podczas pracy nad projektem strony" unoptimized /><figcaption>Rozmawiasz bezpośrednio ze mną, od pomysłu po gotową stronę.</figcaption></figure><ol className="zmh-care-steps"><li><span>01</span><h3>Ustalamy zakres</h3><p>Wybieramy potrzebne funkcje i uzgadniamy zakres przed rozpoczęciem prac.</p></li><li><span>02</span><h3>Przygotowuję projekt</h3><p>Układam treści, wygląd i narzędzia. Ty oglądasz gotową propozycję.</p></li><li><span>03</span><h3>Ty zatwierdzasz</h3><p>Sprawdzam działanie strony. Publikacja następuje po Twojej akceptacji.</p></li></ol><Link className="zmh-text-link" href="/jak-pracuje">Przeczytaj zasady współpracy ↗</Link></section>
      <ProcessStandard variant="home" />
      <div className="zmh-wrap zmh-quality-resources"><Link href="/standardy-jakosci" className="zmh-text-link">Poznaj standardy jakości i normy ISO — PDF-y do pobrania ↗</Link></div>
      <section className="zmh-story zmh-grow" aria-labelledby="rozwoj-title"><div className="zmh-wrap zmh-split"><div className="zmh-copy"><p className="zmh-chapter">PO PUBLIKACJI / OPIEKA NAD STRONĄ</p><h2 id="rozwoj-title">Rozwój w rytmie<br />Twojej firmy.</h2><p>Nowa usługa, pomysł na sprzedaż, wygodniejszy sposób obsługi. Stronę można rozbudować, gdy pojawi się taka potrzeba. Dalszą opiekę i nowe funkcje ustalamy osobno, w zakresie dopasowanym do Twojej firmy.</p></div><div className="zmh-growth-words"><Link href="/opieka-nad-strona">Opieka ↗</Link><Link href="/usprawnienia-firmy#automatyzacje">Usprawnienia ↗</Link><Link href="/opieka-nad-strona#rozwoj">Rozwój ↗</Link></div></div></section>
      <section className="zmh-contact zmh-wrap" id="kontakt" aria-labelledby="kontakt-title"><LivingPortal contact /><div><p className="zmh-eyebrow">ZACZNIJMY OD ROZMOWY</p><h2 id="kontakt-title">Zróbmy miejsce<br />na <em>dobrą zmianę.</em></h2><p>Opowiedz, czym zajmuje się Twoja firma i co chcesz ułatwić sobie lub klientom. Wystarczy kilka zdań. Pomogę Ci wybrać kierunek i ustalić, od czego warto zacząć.</p><a className="zmh-pill" href="tel:+48450458466">Porozmawiajmy ↗</a><a className="zmh-phone" href="tel:+48450458466">+48 450 458 466</a><a className="zmh-text-link" href="#krotki-brief">Wolisz napisać? Wróć do krótkiego briefu ↑</a></div></section>
      <QuickWhatsApp />
      <SiteFooter />
    </div>
  </main>;
}
