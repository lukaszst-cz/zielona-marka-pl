import type { Metadata } from "next";
import Link from "../SafeLink";
import TotalCostCalculator from "../TotalCostCalculator";
import { QuickWhatsApp, SiteFooter, SiteHeader } from "../SiteChrome";
import { addOns, corePackages, monthlyServices, moreCapabilities, packageStandards } from "../site-data";
import ProcessStandard from "../ProcessStandard";

const description = "Cztery poziomy stron: Wizytówka od 899 zł, Strona jednostronicowa od 1 449 zł, Strona firmowa od 2 999 zł i rozbudowana od 4 499 zł netto. Hosting bez opłat miesięcznych, jasny zakres i dodatki.";

export const metadata: Metadata = { title: "Strony internetowe: cennik i zakres pakietów", description, alternates: { canonical: "/oferta" },
  openGraph: { type: "website", url: "/oferta", title: "Strony internetowe: cennik i zakres pakietów | Zielona Marka", description, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Zielona Marka: strony internetowe, DTP i rozwiązania dla firm" }] },
  twitter: { card: "summary_large_image", title: "Strony internetowe: cennik i zakres pakietów | Zielona Marka", description, images: ["/og.jpg"] }, };

const featuredAddOns = addOns.filter((item) => item.featured);

const faq = [
  ["Czy muszę mieć gotowe teksty?", "Nie. W Wizytówce teksty dostarczasz Ty, a my je poprawiamy. Od Strony jednostronicowej piszemy je za Ciebie, na podstawie ankiety albo rozmowy, a Ty zatwierdzasz ich prawdziwość. Teksty do Wizytówki możemy też napisać jako dodatek."],
  ["Ile kosztuje domena i czy będzie moja?", "Domena jest zawsze rejestrowana na Ciebie, więc jesteś jej właścicielem. Jej koszt płacisz rejestratorowi według jego cennika, zwykle kilkanaście do kilkudziesięciu złotych rocznie."],
  ["Czy za hosting trzeba płacić co miesiąc?", "Nie. Strony stoją na naszej infrastrukturze i w pakiecie nie ma opłat miesięcznych za hosting ani certyfikat SSL. Szczegóły są w warunkach współpracy."],
  ["Czy strona będzie moja?", "Tak. Po zapłacie całości przenosimy na Ciebie autorskie prawa majątkowe do projektu, kodu i tekstów. Na życzenie przekazujemy pliki strony i przenosimy ją na Twoje konto u dostawcy hostingu."],
  ["Kto wystawia fakturę?", "Faktury VAT wystawia Bizky sp. z o.o., czyli platforma, przez którą rozliczamy usługi marki Zielona Marka. To zwykła faktura VAT, którą możesz zaliczyć do kosztów firmy. Dane są w stopce i w warunkach współpracy."],
  ["Co dzieje się po publikacji?", "Przez 30 dni wprowadzamy drobne poprawki, a przez 3 miesiące bezpłatnie usuwamy błędy w naszym wykonaniu. Potem możesz zamówić opiekę od 79 zł miesięcznie albo pojedyncze zmiany."],
  ["Czy mogę później przejść na wyższy pakiet?", "Tak, w każdej chwili. Dopłacasz różnicę w cenach pakietów, a to, co już powstało, wykorzystujemy w nowej wersji strony."],
] as const;

const offerStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Strony internetowe dla małych firm",
  serviceType: ["Projektowanie stron internetowych", "Modernizacja stron", "Lokalna widoczność w Google", "Opieka nad stroną"],
  provider: { "@type": "ProfessionalService", name: "Zielona Marka", url: "https://zielona-marka.pl", telephone: "+48 450 458 466" },
  areaServed: { "@type": "Country", name: "Polska" },
  url: "https://zielona-marka.pl/oferta",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pakiety stron internetowych Zielona Marka",
    itemListElement: corePackages.map((item) => ({
      "@type": "Offer", name: item.title, description: item.lead,
      price: item.priceNet, priceCurrency: "PLN", url: "https://zielona-marka.pl/oferta#" + item.slug,
    })),
  },
};

export default function OfferPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerStructuredData) }} /><SiteHeader /><main className="zm-public">
    <section className="page-hero shell"><span className="eyebrow"><i />STRONY DLA FIRM Z MAREK I OKOLIC</span><h1>Wybierz poziom strony, <em>którego potrzebujesz teraz.</em></h1><p>Cztery pakiety, jasne ceny i dokładny opis tego, co dostajesz. Wszystkie kwoty są netto, a przy każdej podajemy też cenę brutto. Hosting jest w cenie, bez opłat miesięcznych.</p><div className="hero-actions"><Link className="button" href="/kontakt">Poproś o dokładną wycenę <span>↗</span></Link><Link className="text-link" href="/cennik-dodatkow">Cennik dodatków ↗</Link><Link className="text-link" href="/portfolio?kategoria=www">Zobacz portfolio stron ↗</Link></div></section>

    <section className="section shell" id="pakiety" aria-labelledby="levels-title"><div className="zm-levels-intro"><span className="section-no">CZTERY POZIOMY</span><h2 id="levels-title">Strona rośnie razem z firmą.</h2><p>Wybierasz poziom, którego potrzebujesz teraz, a na wyższy przechodzisz w każdej chwili, dopłacając różnicę. Każdy kolejny pakiet zawiera wszystko z poprzedniego.</p></div>
      <div className="zm-levels">{corePackages.map((item, index) => <article id={item.slug} key={item.slug} className={"zm-level" + (index === 2 ? " is-featured" : "")}>
        <span className="zm-level-tag">{item.level}</span>
        <h3 className="zm-level-title">{item.title}</h3>
        <p className="zm-level-kind">{item.kind}</p>
        <b className="zm-level-price">{item.price}<small>{item.priceGross}</small></b>
        <p className="zm-level-lead">{item.lead}</p>
        <h4>W cenie</h4>
        <ul>{item.includes.map((line) => <li key={line}>{line}</li>)}</ul>
        <h4>Teksty</h4>
        <p className="zm-level-note">{item.texts}</p>
        <h4>Czego pakiet nie obejmuje</h4>
        <p className="zm-level-note">{item.limits}</p>
        <p className="zm-level-time">Termin: {item.time}</p>
        <Link className="button" href={"/kontakt?pakiet=" + encodeURIComponent(item.title)}>Zapytaj o ten pakiet <span>↗</span></Link>
      </article>)}</div>
      <p className="legal-note">Ceny są cenami wyjściowymi i dotyczą zakresu opisanego powyżej. Liczbę podstron liczymy łącznie ze stroną główną i kontaktem, jeśli mają osobne adresy. Limity słów, zasady poprawek i wyłączenia opisują <Link href="/warunki-wspolpracy">warunki współpracy</Link>.</p>
    </section>

    <section className="section shell" aria-labelledby="standards-title"><div className="section-head"><div><span className="section-no">W KAŻDYM PAKIECIE</span><h2 id="standards-title">Te rzeczy mają wszyscy klienci.</h2></div><p>Nie musisz się zastanawiać, czy wersja na telefon, certyfikat SSL albo uruchomienie strony są płatne osobno.</p></div>
      <ul className="zm-standards">{packageStandards.map(([name, text]) => <li key={name}><b>{name.toUpperCase()}</b>{text}</li>)}</ul>
      <details className="zm-compare"><summary>Porównaj pakiety w tabeli</summary><div className="zm-compare-scroll"><table>
        <thead><tr><th scope="col">Co dostajesz</th>{corePackages.map((item) => <th scope="col" key={item.slug}>{item.title}</th>)}</tr></thead>
        <tbody>
          <tr><th scope="row">Cena netto</th>{corePackages.map((item) => <td key={item.slug}>{item.price}</td>)}</tr>
          <tr><th scope="row">Zakres</th><td>1 strona, 3 sekcje</td><td>1 strona, 6–7 sekcji</td><td>do 6 podstron</td><td>do 12 podstron</td></tr>
          <tr><th scope="row">Formularz kontaktowy</th><td>dodatek</td><td>tak</td><td>tak, dopasowany do branży</td><td>tak, osobne dla usług</td></tr>
          <tr><th scope="row">Teksty</th><td>od Ciebie</td><td>piszemy z ankiety</td><td>piszemy po rozmowie</td><td>piszemy według planu</td></tr>
          <tr><th scope="row">Rundy poprawek</th><td>1</td><td>2</td><td>2</td><td>2</td></tr>
          <tr><th scope="row">Powiązanie z Profilem Firmy Google</th><td>dodatek</td><td>dodatek</td><td>tak</td><td>tak</td></tr>
          <tr><th scope="row">Teksty pod Google i asystentów AI</th><td>dodatek</td><td>dodatek</td><td>tak</td><td>tak</td></tr>
          <tr><th scope="row">Podstrony miast i dzielnic</th><td>nie</td><td>nie</td><td>nie</td><td>tak</td></tr>
          <tr><th scope="row">Porady lub aktualności</th><td>nie</td><td>nie</td><td>nie</td><td>tak</td></tr>
          <tr><th scope="row">Termin</th>{corePackages.map((item) => <td key={item.slug}>{item.time}</td>)}</tr>
        </tbody></table></div></details>
    </section>

    <section id="modernizacja" className="section shell" aria-labelledby="modernizacja-title"><div className="section-head"><div><span className="section-no">MASZ JUŻ STRONĘ?</span><h2 id="modernizacja-title">Nie zawsze trzeba robić ją od początku.</h2></div><p>Jeśli Twoja strona wygląda przestarzale, źle działa na telefonie albo utrudnia klientom znalezienie informacji, najpierw sprawdzimy, co można poprawić, co warto zachować i czy modernizacja będzie bardziej opłacalna niż nowa strona.</p></div>
      <div className="client-start-paths"><div><article className="recommended"><span>MODERNIZACJA STRONY</span><h3>Wycena indywidualna po bezpłatnej ocenie.</h3><p>Koszt zależy od technologii, stanu kodu, dostępu do panelu i zakresu zmian, dlatego nie podajemy sztywnej ceny z góry. Bezpłatna miniocena obejmuje najważniejsze problemy i proponowany kierunek.</p><ul><li>ocena wyglądu, wersji na telefon i ścieżki kontaktu</li><li>decyzja: poprawki, większa przebudowa albo nowa strona</li><li>konkretna cena i termin przed rozpoczęciem prac</li></ul><Link href="/modernizacja-strony#miniaudyt">Poproś o bezpłatną miniocenę <i>↗</i></Link></article></div></div>
    </section>

    <section id="opieka-i-seo" className="section shell" aria-labelledby="monthly-title"><div className="section-head"><div><span className="section-no">PO PUBLIKACJI</span><h2 id="monthly-title">Opieka i widoczność w Google. Opcjonalnie.</h2></div><p>Obie usługi są dobrowolne i można je zamówić niezależnie od nowej strony, także dla stron wykonanych przez kogoś innego.</p></div>
      <div className="zm-monthly">{monthlyServices.map((item) => <article key={item.title}><h3>{item.title}</h3><b>{item.price}<small>{item.unit}</small></b><p>{item.lead}</p><p className="zm-monthly-note">{item.note}</p><Link className="text-link" href={item.href}>Zapytaj o zakres ↗</Link></article>)}</div>
      <details className="zm-compare"><summary>Co dokładnie jest w lokalnej widoczności</summary><div className="zm-compare-scroll"><ul className="check-list"><li>4 krótkie wpisy w Profilu Firmy Google, przygotowane z Twoich informacji i zdjęć</li><li>jeden tekst na stronę, około 400–600 słów, związany z Twoimi usługami i obszarem działania</li><li>publikacja tekstu, jeśli system strony pozwala na to bez dodatkowych prac programistycznych</li><li>kontrola aktualności danych firmy w profilu: godziny, telefon, adres, kategorie i zdjęcia</li><li>miesięczny raport: wyświetlenia, telefony i kliknięcia oraz propozycja działań na kolejny miesiąc</li></ul><p className="legal-note">Zakładamy, że dostarczasz informacje, zdjęcia i podstawowe materiały. Założenie lub większe uporządkowanie zaniedbanego profilu wyceniamy osobno, od 390 zł. Nie gwarantujemy pozycji w wynikach wyszukiwania, bo o nich decyduje Google. Sprzedajemy regularną obsługę treści i profilu oraz monitorowanie wyników.</p></div></details>
    </section>

    <section id="dodatki" className="section shell" aria-labelledby="addons-title"><div className="section-head"><div><span className="section-no">DOBIERZ DO PAKIETU</span><h2 id="addons-title">Najczęściej wybierane dodatki.</h2></div><p>Dzięki nim od razu widzisz, ile może kosztować rozbudowa pakietu. Ceny są wyjściowe, netto.</p></div>
      <div className="zm-addon-list">{featuredAddOns.map((item) => <article key={item.title}><h3>{item.title}</h3><b>{item.price}</b><small>Dotyczy: {item.scope}</small><p>{item.text}</p></article>)}</div>
      <p style={{ marginTop: 18 }}><Link className="button" href="/cennik-dodatkow">Zobacz pełny cennik dodatków <span>↗</span></Link></p>
    </section>

    <section id="wiecej" className="section shell" aria-labelledby="more-title"><div className="section-head"><div><span className="section-no">POTRZEBUJESZ CZEGOŚ WIĘCEJ?</span><h2 id="more-title">Sklepy, systemy i automatyzacje wyceniamy indywidualnie.</h2></div><p>Zakres i cenę ustalamy po rozmowie o potrzebach Twojej firmy. Orientacyjne kwoty „od” są w cenniku dodatków.</p></div>
      <ul className="zm-capabilities">{moreCapabilities.map(([name, text]) => <li key={name}><b>{name}</b>{text}</li>)}</ul>
      <Link className="button" href="/kontakt">Opisz, czego potrzebujesz, a przygotujemy wycenę <span>↗</span></Link>
    </section>

    <section id="branze" className="section mini-shop-section"><div className="shell mini-shop-grid"><div><span className="section-no">TRZY SPRAWDZONE ŚCIEŻKI</span><h2>Inne dane zbiera warsztat, inne wykonawca, a inne salon beauty.</h2><p className="spaced-copy">W każdym wdrożeniu formularz wynika z prawdziwego sposobu obsługi klienta.</p></div><div><h3>Wybierz przykład</h3><ul className="check-list"><li><Link href="/strony-dla-warsztatow">warsztat i detailing ↗</Link></li><li><Link href="/strony-dla-firm-uslugowych">remonty, instalacje i serwis ↗</Link></li><li><Link href="/strony-dla-beauty">beauty i usługi na termin ↗</Link></li></ul><p className="legal-note">Pokrewne branże dobieramy według procesu: wycena zdalna, przyjęcie zlecenia albo rezerwacja wizyty.</p></div></div></section>

    <section className="section shell" aria-labelledby="pelny-koszt-title"><div className="section-head"><div><span className="section-no">ORIENTACYJNA WYCENA</span><h2 id="pelny-koszt-title">Złóż swój pakiet w trzech krokach.</h2></div><p>Wybierz pakiet, opcje i zobacz kwotę jednorazową oraz miesięczną. Całość możesz wysłać w jednym zapytaniu.</p></div><TotalCostCalculator /></section>

    <ProcessStandard variant="offer" />

    <section className="section shell price-rules"><div><span className="section-no">JASNE ZASADY PŁATNOŚCI 30/70</span><h2>Najpierw odbierasz gotową stronę, potem ją publikujemy.</h2></div><ol><li><b>30% zaliczki</b> po akceptacji zakresu rezerwuje termin i rozpoczyna pracę.</li><li><b>Wersja robocza</b> jest przedstawiana pod bezpiecznym adresem do akceptacji i uzgodnionych rund poprawek.</li><li><b>70% po odbiorze</b> i sprawdzeniu działania strony jest płatne przed publikacją na Twojej domenie.</li><li><b>Publikacja i przekazanie</b> następują po pełnym rozliczeniu. Koszty zewnętrzne, takie jak domena, zatwierdzasz osobno.</li></ol></section>

    <section id="faq" className="section shell zm-faq" aria-labelledby="faq-title"><div className="section-head"><div><span className="section-no">NAJCZĘSTSZE PYTANIA</span><h2 id="faq-title">Zanim zapytasz.</h2></div></div>
      {faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
      <p className="zm-billing-note">Usługi marki Zielona Marka rozliczamy przez platformę Bizky sp. z o.o., która wystawia faktury VAT. Pełne zasady współpracy: <Link href="/warunki-wspolpracy">warunki współpracy</Link>.</p>
    </section>
  </main><QuickWhatsApp /><SiteFooter /></>;
}
