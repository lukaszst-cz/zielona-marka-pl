import Link from "../SafeLink";
import { findPortfolioItem, type PortfolioItem } from "./catalog";

type WorkflowStage = {
  name: string;
  description: string;
};

type WorkflowConnection = {
  id: string;
  heading: string;
  overview: string;
  projectSlugs: readonly string[];
  featuredProjects: readonly string[];
  workbookSlug: string | null;
  stages: readonly [WorkflowStage, WorkflowStage, WorkflowStage];
};

const connections: readonly WorkflowConnection[] = [
  {
    id: "hurtownia",
    heading: "Od zapytania o materiały do zaplanowanej dostawy",
    overview: "W tym modelu katalog i lista produktów są początkiem obsługi zamówienia. Osobny arkusz pokazuje, jak firma może uporządkować wycenę, magazyn i transport.",
    projectSlugs: ["phu-marecki", "phu-marecki-aplikacja", "navoro-hurt", "nexio-elektro", "budrivo", "materivo", "materivo-eko"],
    featuredProjects: ["phu-marecki", "navoro-hurt", "nexio-elektro"],
    workbookSlug: "excel-hurtownia",
    stages: [
      { name: "Katalog i zapytanie", description: "Klient wybiera materiały i przekazuje listę do wyceny." },
      { name: "Oferta i kompletacja", description: "Handlowiec sprawdza ceny, marżę oraz dostępność produktów." },
      { name: "Dostawa i rozliczenie", description: "Magazyn przygotowuje wydanie, a biuro kontroluje płatność." },
    ],
  },
  {
    id: "centrum-budowlane",
    heading: "Jedno zamówienie, wiele działów centrum budowlanego",
    overview: "Aplikacja Centrum Budowlane prezentuje drogę zamówienia przez sprzedaż, magazyn, tartak i transport HDS. Do demonstracji dołączono oddzielny model finansowy Excel.",
    projectSlugs: ["centrum-budowlane-pwa"],
    featuredProjects: [],
    workbookSlug: null,
    stages: [
      { name: "Zamówienie i wycena", description: "Inwestor składa zapytanie, a dział handlowy przygotowuje ofertę." },
      { name: "Magazyn, tartak i HDS", description: "Działy obsługują dokumenty PZ i WZ, produkcję oraz dostawę." },
      { name: "Koszty i wynik", description: "Model Excel pozwala przeanalizować przykładowe koszty floty, pracowników i marże." },
    ],
  },
  {
    id: "stomatologia",
    heading: "Od informacji o zabiegach do organizacji gabinetu",
    overview: "Strona gabinetu pomaga pacjentowi poznać usługi i sposób kontaktu. Arkusz przedstawia osobny przykład planowania wizyt, prac laboratoryjnych i kosztów placówki.",
    projectSlugs: ["aurea-smile", "solident"],
    featuredProjects: ["aurea-smile", "solident"],
    workbookSlug: "excel-stomatologia",
    stages: [
      { name: "Oferta i kontakt", description: "Pacjent znajduje zakres zabiegów i dane gabinetu." },
      { name: "Grafik i plan leczenia", description: "Zespół porządkuje terminy i zadania organizacyjne." },
      { name: "Koszty i kontrola", description: "Arkusz pokazuje rozliczenia oraz terminy prac i przeglądów." },
    ],
  },
  {
    id: "remonty",
    heading: "Od zapytania o remont do odbioru prac",
    overview: "Przykład łączy prezentację usług remontowych z możliwym zapleczem biura: wizją lokalną, kosztorysem, harmonogramem i płatnościami etapowymi.",
    projectSlugs: ["solidom"],
    featuredProjects: ["solidom"],
    workbookSlug: "excel-remonty",
    stages: [
      { name: "Strona i zapytanie", description: "Klient poznaje usługi i opisuje planowany zakres remontu." },
      { name: "Kosztorys i ekipy", description: "Firma układa wycenę, materiały oraz terminy prac." },
      { name: "Odbiór i płatności", description: "Arkusz porządkuje etapy realizacji, faktury i gwarancje." },
    ],
  },
  {
    id: "budowa",
    heading: "Budżet i harmonogram większej inwestycji",
    overview: "Arkusz budowlany pokazuje szerszy zakres niż prosty remont: budżety budów, podwykonawców, sprzęt, faktury etapowe i kaucje. SOLIDOM to przykład sposobu prezentacji takiej firmy w internecie, nie wdrożenie tego arkusza.",
    projectSlugs: [],
    featuredProjects: ["solidom"],
    workbookSlug: "excel-budowa",
    stages: [
      { name: "Wizytówka wykonawcy", description: "Odbiorca poznaje kompetencje firmy i jej przykładowe realizacje." },
      { name: "Budowy i podwykonawcy", description: "Zespół planuje koszty, zadania, terminy oraz sprzęt." },
      { name: "Kontrola inwestycji", description: "Arkusz zbiera wydatki, kaucje i płatności etapowe." },
    ],
  },
  {
    id: "gastronomia",
    heading: "Od menu i rezerwacji do kontroli kosztów lokalu",
    overview: "Bistro Forma przedstawia stronę, na której gość znajduje menu i kontakt. Arkusz uzupełnia ten przykład o dostawy, receptury, food cost, straty i utarg.",
    projectSlugs: ["bistro-forma"],
    featuredProjects: ["bistro-forma"],
    workbookSlug: "excel-kawiarnia",
    stages: [
      { name: "Menu i kontakt", description: "Gość sprawdza ofertę, godziny i sposób rezerwacji." },
      { name: "Zakupy i przygotowanie", description: "Lokal planuje dostawy, receptury i koszty składników." },
      { name: "Sprzedaż i wynik", description: "Arkusz zestawia utarg, straty i rentowność pozycji menu." },
    ],
  },
  {
    id: "deweloper",
    heading: "Od wyboru mieszkania do obsługi sprzedaży",
    overview: "Karty lokali i zapytanie kupującego to część widoczna na stronie. Przykładowy arkusz pokazuje też dostępność mieszkań, harmonogram wpłat i odbiory.",
    projectSlugs: ["dom-dobry"],
    featuredProjects: ["dom-dobry"],
    workbookSlug: "excel-deweloper",
    stages: [
      { name: "Prezentacja lokali", description: "Kupujący porównuje mieszkania i wysyła zapytanie." },
      { name: "Rezerwacja i wpłaty", description: "Biuro porządkuje statusy sprzedaży i terminy płatności." },
      { name: "Budżet i odbiory", description: "Arkusz zestawia koszty inwestycji i zgłoszone wady." },
    ],
  },
  {
    id: "warsztat",
    heading: "Od przyjęcia samochodu do wydania i rozliczenia",
    overview: "WorkshopFlow i Auto Naprawa pokazują możliwy obieg zlecenia warsztatowego. Arkusz Excel rozpisuje czynności doradcy, mechanika, magazynu i biura.",
    projectSlugs: ["workshopflow", "auto-naprawa"],
    featuredProjects: ["workshopflow", "auto-naprawa"],
    workbookSlug: "excel-warsztat",
    stages: [
      { name: "Zgłoszenie i przyjęcie", description: "Doradca zapisuje pojazd, problem i uzgodniony zakres." },
      { name: "Naprawa i części", description: "Mechanik aktualizuje prace, a magazyn kontroluje materiały." },
      { name: "Wydanie i rozliczenie", description: "Biuro podsumowuje koszt, zgodę klienta i płatność." },
    ],
  },
  {
    id: "drukarnia",
    heading: "Zlecenie drukarskie od zapytania do faktury",
    overview: "PrintFlow 360 pokazuje podział odpowiedzialności między biurem, produkcją i kontrolą jakości. Towarzyszący mu arkusz pozwala prześledzić te same etapy na danych przykładowych.",
    projectSlugs: ["printflow"],
    featuredProjects: ["printflow"],
    workbookSlug: "excel-printflow",
    stages: [
      { name: "Zapytanie i wycena", description: "Biuro zapisuje produkt, nakład, termin oraz kalkulację." },
      { name: "Produkcja i jakość", description: "Zespół odnotowuje wykonanie i kontrolę zamówienia." },
      { name: "Wysyłka i faktura", description: "Arkusz domyka przekazanie produktu i rozliczenie." },
    ],
  },
  {
    id: "transport",
    heading: "Zlecenie transportowe z kontrolą kosztu i marży",
    overview: "TransportFlow 360 pokazuje pracę dyspozytora, kierowcy i biura. Arkusz rozwija przykład o koszty trasy, paliwo, dokumenty dostawy i wynik przewozu.",
    projectSlugs: ["transportflow"],
    featuredProjects: ["transportflow"],
    workbookSlug: "excel-transportflow",
    stages: [
      { name: "Trasa i wycena", description: "Dyspozytor planuje przewóz, czas oraz stawkę." },
      { name: "Przejazd i dokumenty", description: "Kierowca rejestruje przejazd i potwierdzenie dostawy." },
      { name: "Faktura i marża", description: "Biuro zestawia koszty z przychodem ze zlecenia." },
    ],
  },
];

const individualContext: Record<string, string> = {
  "phu-marecki": "Po wyborze materiałów z katalogu PHU Marecki można prześledzić, jak wyglądałaby ich wycena i obsługa przez hurtownię.",
  "phu-marecki-aplikacja": "Lista materiałów zapisana na telefonie to dobry punkt wyjścia do pokazania dalszej obsługi zamówienia w hurtowni.",
  "navoro-hurt": "Katalog i gazetka NAVORO HURT pokazują ofertę, a arkusz rozwija scenariusz pracy handlowca i magazynu.",
  "nexio-elektro": "W NEXIO ELEKTRO punktem wyjścia jest asortyment dla instalatora. Arkusz pokazuje przykładową obsługę zamówienia B2B.",
  "budrivo": "Kalkulator elewacji BUDRIVO pomaga przygotować listę materiałów. Dalej można prześledzić proces wyceny i dostawy.",
  "materivo": "Rozbudowany katalog MATERIVO można zestawić z arkuszem pracy hurtowni, bez udawania integracji systemów.",
  "materivo-eko": "Prostsza strona MATERIVO nadal może prowadzić do uporządkowanej obsługi zapytań poza witryną.",
  "aurea-smile": "Przykład AUREA SMILE pokazuje ścieżkę pacjenta na stronie. Osobny arkusz przedstawia organizację pracy gabinetu.",
  "solident": "SOLIDENT ułatwia znalezienie usług i kontaktu. Arkusz ilustruje możliwe zaplecze organizacyjne gabinetu.",
  "solidom": "Za prezentacją usług i realizacji SOLIDOM można pokazać dalszy etap pracy: kosztorys, harmonogram i odbiór remontu.",
  "bistro-forma": "Strona Bistro Forma służy gościowi, a osobny arkusz pokazuje codzienne zadania związane z prowadzeniem lokalu.",
  "dom-dobry": "Dom Dobry przedstawia wybór lokali. Arkusz uzupełnia prezentację o przykładowy proces sprzedaży i rozliczeń.",
  "workshopflow": "Portal WorkshopFlow pokazuje obieg zgłoszeń. W Excelu można zobaczyć, jak zadania są podzielone między role.",
  "auto-naprawa": "Portal Auto Naprawa koncentruje się na zleceniu klienta. Arkusz pokazuje możliwą organizację naprawy i rozliczenia.",
  "printflow": "Przykład PrintFlow pokazuje przejście od wyceny druku do faktury. Arkusz rozpisuje etapy dla poszczególnych ról.",
  "transportflow": "TransportFlow łączy w demonstracji trasę, dokumenty i rozliczenie. W Excelu można sprawdzić szczegóły kalkulacji przewozu.",
};

export default function WorkflowConnections({ item }: { item: PortfolioItem }) {
  const isWorkbook = item.category === "excel";
  const connection = connections.find(group => isWorkbook
    ? group.workbookSlug === item.slug
    : group.projectSlugs.includes(item.slug));
  if (!connection) return null;

  const workbook = connection.workbookSlug ? findPortfolioItem(connection.workbookSlug) : item;
  const examples = connection.featuredProjects
    .map(slug => findPortfolioItem(slug))
    .filter((project): project is PortfolioItem => Boolean(project));

  return <section className="shell zmp-workflow zmx-reveal" aria-labelledby={"zmp-workflow-" + connection.id}>
    <div className="zmp-workflow-heading">
      <div>
        <span className="zmp-overline">{isWorkbook ? "ARKUSZ I JEGO ZASTOSOWANIE" : "STRONA I PRZYKŁADOWE ZAPLECZE"}</span>
        <h2 id={"zmp-workflow-" + connection.id}>{connection.heading}</h2>
      </div>
      <p>{!isWorkbook && individualContext[item.slug] ? individualContext[item.slug] : connection.overview}</p>
    </div>
    <ol className="zmp-workflow-steps" aria-label="Trzy etapy przykładowego procesu">
      {connection.stages.map((stage, index) => <li key={stage.name}>
        <span className="zmp-workflow-number">0{index + 1}</span>
        <h3>{stage.name}</h3>
        <p>{stage.description}</p>
      </li>)}
    </ol>
    <div className="zmp-workflow-links">
      {isWorkbook ? <>
        <div>
          <strong>Gdzie można wykorzystać taki proces?</strong>
          <p>Zobacz powiązane przykłady stron lub aplikacji z portfolio.</p>
        </div>
        <nav aria-label="Przykładowe strony związane z arkuszem">
          {examples.map(project => <Link key={project.slug} href={"/portfolio/" + project.slug}>
            {project.title}<span aria-hidden="true"> ↗</span>
          </Link>)}
        </nav>
      </> : <>
        <div>
          <strong>Sprawdź przykładowe zaplecze</strong>
          <p>Opis powiązanego arkusza znajdziesz poniżej, a pliki do pobrania w sekcji nad opisem procesu.</p>
        </div>
        <nav aria-label="Arkusz i narzędzia powiązane z projektem">
          {connection.workbookSlug && workbook && <Link href={"/portfolio/" + workbook.slug}>
            Zobacz arkusz: {workbook.title}<span aria-hidden="true"> ↗</span>
          </Link>}
          {!connection.workbookSlug && <Link href="/projekty-flow">Zobacz inne procesy i narzędzia <span aria-hidden="true">↗</span></Link>}
        </nav>
      </>}
    </div>
    <p className="zmp-workflow-note">Przykład demonstracyjny. Arkusz i witryna nie wymieniają automatycznie danych. Pokazane procesy nie są potwierdzonymi wdrożeniami u firm przedstawionych w portfolio.</p>
  </section>;
}
