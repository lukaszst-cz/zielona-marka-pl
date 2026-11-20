/**
 * Jedno źródło danych dla galerii, stron projektów i zestawów PDF.
 * Dodanie projektu: skopiuj wpis, nadaj unikalny slug i wskaż tylko potwierdzone materiały.
 * Nie dodawaj danych rzeczywistych klientów ani nie sugeruj, że demonstracja była wdrożeniem.
 */
export const portfolioCategories = [
  { id: "www", label: "Strony WWW" },
  { id: "gazetki", label: "Gazetki i katalogi" },
  { id: "logo", label: "Logo i identyfikacja" },
  { id: "przed-po", label: "Przed i po" },
  { id: "aplikacje", label: "Aplikacje i workflow" },
  { id: "excel", label: "Excel i kalkulatory" },
] as const;

export type PortfolioCategory = typeof portfolioCategories[number]["id"];
export type PortfolioItem = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  industry: string;
  summary: string;
  explanation: string;
  features: string[];
  demoUrl?: string;
  pwaUrl?: string;
  pwaArchiveUrl?: string;
  pwaPreviewDesktop?: string;
  pwaPreviewMobile?: string;
  workflowUrl?: string;
  workflowLabel?: string;
  image?: string;
  /** Grafika na kafelek w galerii, gdy w środku ma być prawdziwy zrzut. */
  cardImage?: string;
  alt?: string;
  status: string;
  featured?: boolean;
  /** Prace, które można wziąć i używać: "github" to publiczne repozytorium
      do pobrania, "online" to narzędzie działające w przeglądarce bez konta. */
  openAccess?: "github" | "online";
  /** Gotowy plik do pobrania, na przykład pusty szablon arkusza. */
  downloadUrl?: string;
  downloadLabel?: string;
};
const katalog: PortfolioItem[] = [
  {
    "slug": "fornir-forma",
    "title": "FORNIR & FORMA",
    "category": "www",
    "industry": "Meble na wymiar i wnętrza",
    "summary": "Strona pracowni mebli na wymiar z rozbudowaną galerią wnętrz, próbnikiem materiałów i kalkulatorem orientacyjnej wyceny.",
    "explanation": "Fotografie kuchni, garderób i zabudów prowadzą od inspiracji do wyboru materiałów. Użytkownik może porównać realizacje, sprawdzić orientacyjny budżet i przygotować zapytanie.",
    "features": [
      "Galeria 32 kadrów z filtrowaniem i powiększaniem",
      "Interaktywny próbnik materiałów",
      "Kalkulator wyceny poglądowej",
      "Opis etapów współpracy i FAQ",
      "Responsywna strona i kontakt marki Zielona Marka"
    ],
    "demoUrl": "/demo/fornir-forma/index.html",
    "image": "/portfolio/kadry/fornir-forma-ekran.webp",
    "alt": "Podgląd strony FORNIR & FORMA: luksusowa kuchnia, ciemna nawigacja, typografia i sekcja wyceny",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "uvset-360",
    "title": "UVSET 360°",
    "category": "www",
    "industry": "Poligrafia i produkcja B2B",
    "summary": "Interaktywna strona drukarni przemysłowej: porównanie technologii, proces produkcyjny, galeria druku i kalkulator B2B.",
    "explanation": "Projekt przedstawia technologie LED UV oraz offset, uszlachetnienia, introligatornię i przygotowanie plików. Moduły prowadzą odbiorcę od technologii do parametrów zlecenia i kontaktu.",
    "features": [
      "Galeria 20 kadrów z filtrami i powiększaniem",
      "Porównanie technologii LED UV i offset",
      "Sześć interaktywnych etapów workflow",
      "Orientacyjny kalkulator B2B",
      "Checklista przygotowania plików DTP"
    ],
    "demoUrl": "/demo/uvset-360/index.html",
    "image": "/portfolio/kadry/uvset-360-ekran.webp",
    "alt": "Podgląd strony UVSET 360°: industrialna drukarnia, kolorystyka CMYK i techniczna nawigacja",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "centrum-budowlane-pwa",
    "title": "Centrum Budowlane, system PWA",
    "category": "aplikacje",
    "industry": "Budownictwo, hurt B2B i logistyka HDS",
    "summary": "Interaktywna aplikacja PWA dla centrum budowlanego: materiały, elektryka, tartak, magazyn, flota HDS, obieg dokumentów i finanse.",
    "explanation": "Autorska demonstracja wspólnego obiegu pracy od zamówienia inwestora przez wycenę, zakupy, PZ, WZ, produkcję tartaku i transport HDS do dokumentu POD i rozliczenia. W pakiecie dostępny model finansowy Excel z kosztami pracowników, floty, marżami i podatkami.",
    "features": [
      "Jedenaście profili ról z różnymi ekranami i zadaniami",
      "Zamówienia B2B, inwestorzy, limity kredytowe i marże",
      "Magazyn, PZ, WZ, zakupy, rezerwacje i tartak",
      "Przykładowa flota sześciu samochodów, w tym trzech HDS",
      "Obieg dokumentów kierowca, biuro, szkoda, rozliczenie",
      "Import CSV, XLSX, TSV i HTML oraz lokalny zapis",
      "Model finansowy Excel do pobrania"
    ],
    "image": "/portfolio/centrum-budowlane-dashboard.webp",
    "cardImage": "/portfolio/centrum-budowlane-dashboard.webp",
    "alt": "Oryginalna grafika koncepcyjna Centrum Budowlane z granatowo-czerwonym pulpitem, hurtownią, tartakiem, elektryką, transportem HDS i planem publikacji",
    "status": "interaktywne demo na Vercelu i GitHub Pages, dane demonstracyjne, publiczne repozytorium GitHub",
    "demoUrl": "https://centrum-budowlane-pwa.vercel.app/app/",
    "openAccess": "online",
    "downloadUrl": "/pliki/centrum-budowlane-model-finansowy-2026.xlsx",
    "downloadLabel": "Pobierz model finansowy Excel",
    "featured": true
  },
  {
    "slug": "phu-marecki",
    "title": "PHU MARECKI",
    "category": "www",
    "industry": "Budownictwo i materiały",
    "summary": "Strona centrum budowlanego z gazetką, katalogiem i listą do wyceny, a obok niej osobna aplikacja na telefon.",
    "explanation": "Klient przegląda gazetkę jak w sklepie, dokłada materiały do listy, podaje ilości i wysyła jedno zapytanie zamiast dzwonić po ceny.",
    "features": [
      "Gazetka interaktywna z działami",
      "Katalog 18 pozycji z wyszukiwarką",
      "Lista do wyceny z ilościami",
      "Zapytanie o transport",
      "Aplikacja PWA na telefon"
    ],
    "demoUrl": "https://phu-marecki.vercel.app",
    "image": "/portfolio/kadry/phu-marecki-ekran.webp",
    "alt": "Pierwszy ekran strony PHU Marecki",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/hurtownia-elektryczna-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "featured": true
  },
  {
    "slug": "budrivo",
    "title": "BUDRIVO",
    "category": "www",
    "industry": "Budownictwo i materiały",
    "summary": "Hurtownia budowlana, w której klient sam policzy koszt elewacji.",
    "explanation": "Katalog i kalkulator liczą za klienta, więc zapytanie trafia już gotowe.",
    "features": [
      "Katalog materiałów",
      "Kalkulator",
      "Gazetka w serwisie",
      "Wizualizacja elewacji"
    ],
    "demoUrl": "https://budrivo.vercel.app",
    "image": "/portfolio/kadry/budrivo-ekran.webp",
    "alt": "Pierwszy ekran serwisu BUDRIVO",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/hurtownia-elektryczna-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "featured": true
  },
  {
    "slug": "phu-marecki-aplikacja",
    "title": "PHU Marecki, aplikacja na telefon",
    "category": "aplikacje",
    "industry": "Budownictwo i materiały",
    "summary": "Aplikacja na telefon dla klientów hurtowni: inwestora, kierownika budowy i wykonawcy, który kupuje u PHU Marecki materiały.",
    "explanation": "Klient przegląda ofertę i gazetkę na budowie, dokłada materiały do listy z ilościami i wysyła zapytanie o wycenę i transport. Lista zostaje w telefonie, więc może do niej wrócić.",
    "features": [
      "Pięć ekranów: główna, oferta, gazetka, lista, więcej",
      "Gazetka na sześć stron",
      "Lista zapisana w telefonie",
      "Instalacja na ekranie głównym (PWA)"
    ],
    "demoUrl": "https://phu-marecki.vercel.app/app.html",
    "image": "/portfolio/kadry/phu-marecki-aplikacja.webp",
    "alt": "Trzy ekrany aplikacji PHU Marecki na telefonie: gazetka, ekran główny i oferta",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/hurtownia-elektryczna-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
  },
  {
    "slug": "navoro-hurt",
    "title": "NAVORO HURT",
    "category": "www",
    "industry": "Hurtownie i handel B2B",
    "summary": "Serwis hurtowni, gdzie cały asortyment i aktualna gazetka leżą pod jednym adresem.",
    "explanation": "Odbiorca B2B przegląda 17 produktów i pobiera ośmiostronicową gazetkę, zamiast prosić handlowca o plik.",
    "features": [
      "Katalog 17 produktów",
      "Gazetka 8-stronicowa PDF",
      "Oglądanie i pobieranie gazetki"
    ],
    "demoUrl": "https://navoro-hurt-koncepcja.vercel.app",
    "image": "/portfolio/kadry/navoro-hurt-ekran.webp",
    "alt": "Pierwszy ekran serwisu NAVORO HURT",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/hurtownia-elektryczna-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "featured": true
  },
  {
    "slug": "nexio-elektro",
    "title": "NEXIO ELEKTRO",
    "category": "www",
    "industry": "Elektrotechnika",
    "summary": "Oferta elektryczna poukładana pod instalatora, nie pod katalog.",
    "explanation": "Ze strony głównej prowadzi krótka droga do szesnastostronicowej gazetki z pełnym asortymentem.",
    "features": [
      "Prezentacja asortymentu",
      "Gazetka 16-stronicowa",
      "Nawigacja do gazetki ze strony głównej"
    ],
    "demoUrl": "https://nexio-elektro.vercel.app",
    "image": "/portfolio/kadry/nexio-elektro-ekran.webp",
    "alt": "Pierwszy ekran serwisu NEXIO ELEKTRO",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/hurtownia-elektryczna-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "featured": true
  },
  {
    "slug": "materivo",
    "title": "MATERIVO",
    "category": "www",
    "industry": "Materiały budowlane",
    "summary": "Ta sama hurtownia budowlana w dwóch odsłonach: premium i ekonomicznej.",
    "explanation": "Dobrze widać, jak zmiana stylu zmienia odbiór identycznej oferty i tych samych promocji.",
    "features": [
      "Wariant Premium",
      "Wariant Ekonomiczny",
      "Oferta budowlana",
      "Gazetka online w wariancie ekonomicznym"
    ],
    "demoUrl": "https://materivo-pro.vercel.app",
    "image": "/portfolio/kadry/materivo-ekran.webp",
    "alt": "Pierwszy ekran serwisu MATERIVO w wersji premium",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/hurtownia-elektryczna-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "featured": true
  },
  {
    "slug": "materivo-eko",
    "title": "MATERIVO Ekonomiczna",
    "category": "www",
    "industry": "Budownictwo i materiały",
    "summary": "Tańsza wersja strony hurtowni: wszystko na jednej stronie, z gazetką w środku.",
    "explanation": "Ten sam asortyment co w wersji Pro, ale bez katalogu z filtrami i bez koszyka zapytań.",
    "features": [
      "Gazetka online",
      "Kategorie asortymentu",
      "Formularz zapytania"
    ],
    "demoUrl": "https://materivo-eko.vercel.app",
    "image": "/portfolio/kadry/materivo-eko-ekran.webp",
    "alt": "Pierwszy ekran strony MATERIVO w wersji ekonomicznej",
    "status": "demonstracja, dane syntetyczne",
    "downloadUrl": "/pliki/hurtownia-elektryczna-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
  },
  {
    "slug": "aurea-smile",
    "title": "AUREA SMILE",
    "category": "www",
    "industry": "Stomatologia premium",
    "summary": "Klinika stomatologiczna, która sprzedaje spokój, a nie zabiegi.",
    "explanation": "Ciemna, złocona oprawa i sześć kafli specjalizacji prowadzą pacjenta od pierwszej konsultacji do konkretnej usługi.",
    "features": [
      "Sześć specjalizacji",
      "Ścieżka konsultacji",
      "Cennik i wiedza"
    ],
    "demoUrl": "https://aurea-smile.vercel.app",
    "image": "/portfolio/kadry/aurea-smile-ekran.webp",
    "alt": "Pierwszy ekran strony kliniki AUREA SMILE",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/gabinet-stomatologiczny-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
  },
  {
    "slug": "solidom",
    "title": "SOLIDOM",
    "category": "www",
    "industry": "Budownictwo i remonty",
    "summary": "Finalna strona marki budowlanej z galerią, animacjami i prostą drogą do kontaktu.",
    "explanation": "Duże fotografie, granatowa paleta z pomarańczowymi akcentami, animowane wejścia sekcji, filtry galerii, cztery etapy ze zdjęciami, liczniki i formularz testowy prowadzą od poznania usług do kontaktu.",
    "features": [
      "Wyraziste zdjęcia i galeria realizacji",
      "Przejrzysta oferta usług",
      "Animowane liczniki i karuzela opinii",
      "Filtrowana galeria i formularz",
      "Wersja mobilna, animacje i PWA"
    ],
    "demoUrl": "https://solidom.vercel.app",
    "image": "/portfolio/kadry/solidom-ekran.webp",
    "alt": "Podgląd strony SOLIDOM z dużą fotografią i ofertą usług budowlanych",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/firma-remontowa-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "featured": true
  },
  {
    "slug": "solident",
    "title": "SOLIDENT",
    "category": "www",
    "industry": "Stomatologia",
    "summary": "Gabinet stomatologiczny z ofertą i wszystkim, co pacjent chce wiedzieć przed wizytą.",
    "explanation": "Usługi, przygotowanie do zabiegu i telefon siedzą tam, gdzie pacjent ich szuka.",
    "features": [
      "Zakres usług",
      "Informacje dla pacjenta",
      "Kontakt"
    ],
    "demoUrl": "https://solident-mu.vercel.app",
    "image": "/portfolio/kadry/solident-ekran.webp",
    "alt": "Pierwszy ekran strony gabinetu SOLIDENT",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/gabinet-stomatologiczny-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
  },
  {
    "slug": "beata-beauty-atelier",
    "title": "BEATA Beauty Atelier",
    "category": "www",
    "industry": "Beauty i pielęgnacja",
    "summary": "Koncepcja strony atelier beauty z prezentacją oferty i demonstracyjną ścieżką rezerwacji.",
    "explanation": "Nieoficjalna demonstracja marki Zielona Marka. Pokazuje sposób przedstawienia salonu i oferty w oprawie wizualnej dopasowanej do usług beauty. Rezerwacje służą wyłącznie do prezentacji interfejsu i nie trafiają do systemu rezerwacyjnego.",
    "features": [
      "Autorska oprawa wizualna atelier",
      "Prezentacja usług i zdjęć",
      "Demonstracyjna ścieżka rezerwacji",
      "Wersja do obejrzenia w przeglądarce"
    ],
    "demoUrl": "https://beata-beauty-atelier.vercel.app/",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JF0bAXNGCfkXeILZKHayHagGgi/9ae8465b-773b-40f2-b0cd-b4c6993faa66.png",
    "alt": "Zrzut ekranu BEATA Beauty Atelier: różowa kompozycja perfum i hasło Piękno w Twoim rytmie",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "kordon-barber-studio",
    "title": "KORDON Barber Studio",
    "category": "www",
    "industry": "Usługi fryzjerskie i barbering",
    "summary": "Koncepcja strony salonu barberskiego z ofertą usług, prezentacją kosmetyków i przykładowymi rezerwacjami.",
    "explanation": "Nieoficjalna demonstracja marki Zielona Marka. Strona łączy charakterystyczną oprawę salonu z ofertą i kartami kosmetyków. Koszyk i rezerwacje są demonstracyjne: nie ma integracji z Booksy, magazynem ani płatnościami. Formularz przygotowuje wiadomość w programie pocztowym.",
    "features": [
      "Prezentacja usług barberskich",
      "Karty produktów i fotografie",
      "Demonstracyjny koszyk i rezerwacje",
      "Formularz otwierający program pocztowy"
    ],
    "demoUrl": "https://kordon-barber-studio-zielona-marka.vercel.app/",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JF0bAXNGCfkXeILZKHayHagGgi/addcea12-ae99-406d-9947-089b3d0b79e9.jpg",
    "alt": "Zrzut ekranu KORDON Barber Studio: Barbering z charakterem",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "black-harbor",
    "title": "BLACK HARBOR",
    "category": "www",
    "industry": "Auto detailing i obsługa klienta",
    "summary": "Fotograficzna strona WWW studia auto detailingu z ofertą usług, prezentacją efektów, pakietami i ścieżką wyceny.",
    "explanation": "Najpierw powstała strona WWW studia detailingu, z fotograficzną prezentacją usług, pakietów i efektów pracy. Układ prowadzi od poznania oferty do wyceny i kontaktu, także na telefonie. Jako uzupełnienie przygotowano osobną aplikację CRM PWA, w której można przetestować obsługę zapytań, klientów i pojazdów oraz program BLACK HARBOR CLUB. Workflow 360 i Excel opisują zaplecze organizacyjne i koszty firmy. Aplikacja przechowuje dane lokalnie i nie jest połączona z rzeczywistymi płatnościami ani kalendarzem.",
    "features": [
      "Strona WWW: czytelne pakiety usług i zakres prac",
      "Fotograficzna prezentacja efektów detailingu",
      "Ścieżka do wyceny, kontaktu i obsługa urządzeń mobilnych",
      "Workflow 360 i model kosztów do pobrania",
      "Responsywny układ i dopracowana nawigacja między usługami"
    ],
    "demoUrl": "https://blackharbor.vercel.app/",
    "pwaUrl": "https://black-harbor-360-crm.vercel.app/",
    "pwaArchiveUrl": "/pliki/black-harbor-360-pwa.zip",
    "pwaPreviewDesktop": "/portfolio/black-harbor-360-desktop.webp",
    "pwaPreviewMobile": "/portfolio/black-harbor-360-mobile.webp",
    "workflowUrl": "/pliki/black-harbor-360-workflow.pdf",
    "workflowLabel": "Workflow 360 studia detailingu",
    "downloadUrl": "/pliki/black-harbor-360-kalkulator.xlsx",
    "downloadLabel": "Pobierz kalkulator finansowy XLSX",
    "image": "/portfolio/kadry/black-harbor-ekran.webp",
    "alt": "Pierwszy ekran koncepcyjnej strony BLACK HARBOR",
    "status": "strona WWW i PWA do testów, dane lokalne i przykładowe",
    "openAccess": "online"
  },
  {
    "slug": "eltravia",
    "title": "ELTRAVIA | Wersja rozbudowana",
    "category": "www",
    "industry": "Hurtownia elektrotechniczna B2B",
    "summary": "Rozbudowana strona WWW hurtowni elektrotechnicznej z katalogiem produktów, gazetką i narzędziami dla instalatorów B2B.",
    "explanation": "Głównym elementem projektu jest strona WWW dla hurtowni elektrotechnicznej, z rozbudowanym katalogiem, gazetką produktową, kalkulatorem kabli i narzędziami B2B. Układ porządkuje asortyment i ułatwia instalatorom przygotowanie zapytania. Oddzielna aplikacja ELTRAVIA 360 PWA stanowi dodatek do strony i pozwala przetestować obsługę kontrahentów, ofert, zamówień oraz magazynu. Workflow 360 opisuje procesy hurtowni w polskich realiach, a Excel służy do modelowania kosztów, marż i przepływów. Pliki nie synchronizują się automatycznie z aplikacją.",
    "features": [
      "Strona WWW: sześć grup asortymentu elektrotechnicznego",
      "Katalog, gazetka i kalkulator doboru przewodów",
      "Narzędzia i ścieżka zapytania dla instalatorów B2B",
      "Workflow 360 i kalkulator finansowy Excel",
      "Responsywny układ kategorii i przejrzysta nawigacja po ofercie"
    ],
    "demoUrl": "https://eltravia-rozbudowana.vercel.app/",
    "pwaUrl": "https://eltravia-360-pwa.vercel.app/",
    "pwaArchiveUrl": "/pliki/eltravia-360-pwa.zip",
    "pwaPreviewDesktop": "/portfolio/eltravia-360-desktop.webp",
    "pwaPreviewMobile": "/portfolio/eltravia-360-mobile.webp",
    "workflowUrl": "/pliki/eltravia-360-workflow.pdf",
    "workflowLabel": "Workflow 360 hurtowni elektrotechnicznej",
    "downloadUrl": "/pliki/eltravia-360-kalkulator.xlsx",
    "downloadLabel": "Pobierz kalkulator Excel XLSX",
    "image": "/portfolio/kadry/eltravia.webp",
    "alt": "Strona ELTRAVIA z ofertą elektrotechniczną i katalogiem",
    "status": "strona WWW i PWA do testów, dane lokalne i przykładowe",
    "openAccess": "online"
  },
  {
    "slug": "natura-studio",
    "title": "Natura Studio",
    "category": "www",
    "industry": "Wellness i beauty",
    "summary": "Studio zabiegowe z ofertą i obsługą wizyt po stronie właścicielki.",
    "explanation": "Koncepcja pokazuje drogę od czytelnej listy zabiegów do wyboru terminu oraz pomysł na zaplecze właścicielki. Dzięki podziałowi na ofertę i terminarz odbiorca szybciej rozumie sposób umawiania wizyty. To demonstracja procesu, nie działający system rezerwacji prawdziwego salonu.",
    "features": [
      "Oferta zabiegów",
      "Ścieżka rezerwacji",
      "Demo zaplecza"
    ],
    "demoUrl": "/realizacje/natura-studio",
    "image": "/concept-natura.jpg",
    "alt": "Prezentacja koncepcyjna projektu Natura Studio",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "bistro-forma",
    "title": "Bistro Forma",
    "category": "www",
    "industry": "Gastronomia",
    "summary": "Lokal gastronomiczny z menu i rezerwacją w zasięgu jednego kliknięcia.",
    "explanation": "Na jednej stronie zebrano menu, godziny, dojazd i ścieżkę kontaktu w sprawie stolika. Gość może łatwiej znaleźć podstawowe informacje przed wizytą. Zaprezentowano koncepcję i przykładowe zaplecze, bez potwierdzenia połączenia z systemem rezerwacyjnym lokalu.",
    "features": [
      "Menu",
      "Informacje dla gości",
      "Demo zaplecza"
    ],
    "demoUrl": "/realizacje/bistro-forma",
    "image": "/concept-bistro.jpg",
    "alt": "Prezentacja koncepcyjna projektu Bistro Forma",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/kawiarnia-bistro-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
  },
  {
    "slug": "dom-dobry",
    "title": "Dom Dobry",
    "category": "www",
    "industry": "Nieruchomości",
    "summary": "Inwestycja mieszkaniowa z kartami lokali i ich dostępnością.",
    "explanation": "Karty lokali zestawiają metraż, piętro, cenę i przykładową dostępność w łatwym do porównania układzie. Taki sposób prezentacji ułatwia znalezienie odpowiedniego mieszkania i przygotowanie zapytania. Dane są fikcyjne, nie pochodzą z prawdziwej inwestycji.",
    "features": [
      "Karty lokali",
      "Przykładowa dostępność",
      "Zapytanie"
    ],
    "demoUrl": "/realizacje/dom-dobry",
    "image": "/concept-dom.jpg",
    "alt": "Prezentacja koncepcyjna projektu Dom Dobry",
    "status": "projekt demonstracyjny",
    "downloadUrl": "/pliki/maly-deweloper-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
  },
  {
    "slug": "pion",
    "title": "PION",
    "category": "przed-po",
    "industry": "Modernizacja stron",
    "summary": "Ścianka wspinaczkowa przed i po przebudowie strony.",
    "explanation": "Po lewej gąszcz informacji, po prawej jasna oferta i godziny otwarcia. To projekt demonstracyjny: oba widoki, przed i po, zaprojektowaliśmy sami.",
    "features": [
      "Porównanie przed i po",
      "Nowa hierarchia informacji"
    ],
    "image": "/concept-samples-v2/existing-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu PION",
    "status": "symulacja wizualna"
  },
  {
    "slug": "forma",
    "title": "FORMA",
    "category": "przed-po",
    "industry": "Ogrody i projektowanie",
    "summary": "Pracownia ogrodów po uporządkowaniu strony.",
    "explanation": "Mniej ozdobników, więcej zdjęć realizacji i prosta droga do wyceny. To projekt demonstracyjny, oba warianty są nasze.",
    "features": [
      "Porównanie przed i po",
      "Prezentacja usług"
    ],
    "image": "/concept-samples-v2/garden-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu FORMA",
    "status": "symulacja wizualna"
  },
  {
    "slug": "okruch",
    "title": "OKRUCH",
    "category": "przed-po",
    "industry": "Piekarnia i gastronomia",
    "summary": "Piekarnia OKRUCH w starej i nowej odsłonie.",
    "explanation": "Zmiana typografii i zdjęć robi tu większą różnicę niż nowe treści. To projekt demonstracyjny, a nie przebudowa cudzej strony: stara i nowa wersja są nasze.",
    "features": [
      "Układ przed i po",
      "Zdjęcia i typografia",
      "Koncepcja strony"
    ],
    "image": "/concept-samples-v2/okruch-before-after-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu OKRUCH",
    "status": "symulacja wizualna",
    "downloadUrl": "/pliki/kawiarnia-bistro-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "featured": true
  },
  {
    "slug": "styk",
    "title": "STYK",
    "category": "www",
    "industry": "Elektrotechnika",
    "summary": "Nowa firma elektryczna, która od pierwszego dnia musi wyglądać solidnie.",
    "explanation": "Projekt stawia na jedno mocne zdjęcie, krótki opis usług i łatwo dostępny numer telefonu. Pokazuje, jak na komputerze i telefonie ograniczyć liczbę kroków do kontaktu z wykonawcą. Materiał jest makietą graficzną, a nie wdrożoną stroną firmy.",
    "features": [
      "Projekt graficzny",
      "Widok desktop i mobile"
    ],
    "image": "/concept-samples-v2/styk-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu STYK",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "glina",
    "title": "GLINA",
    "category": "www",
    "industry": "Rękodzieło",
    "summary": "Pracownia ceramiki, w której zdjęcia prowadzą cały układ.",
    "explanation": "Fotografie ceramiki prowadzą wzrok, a oszczędne podpisy i większe odstępy pomagają skupić uwagę na wyrobach. Pokazano koncepcję widoku na komputerze i telefonie. Nie jest to potwierdzony sklep internetowy z koszykiem i płatnościami.",
    "features": [
      "Koncepcja WWW",
      "Widok desktop i mobile"
    ],
    "image": "/concept-samples-v2/glina-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu GLINA",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "trop",
    "title": "TROP",
    "category": "www",
    "industry": "Weterynaria",
    "summary": "Gabinet weterynaryjny z informacjami, których szuka się w pośpiechu.",
    "explanation": "Godziny przyjęć, telefon i informacje o dyżurze umieszczono na pierwszym planie, bo właściciel zwierzęcia często szuka ich w pośpiechu. Układ ogranicza czas potrzebny na znalezienie kontaktu. To koncepcja wizualna, bez rzeczywistego systemu wizyt i dyżurów.",
    "features": [
      "Koncepcja WWW",
      "Widok desktop i mobile"
    ],
    "image": "/concept-samples-v2/trop-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu TROP",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "szlak",
    "title": "SZLAK",
    "category": "logo",
    "industry": "Identyfikacja wizualna",
    "summary": "Znak dla marki outdoorowej razem z jego życiem na materiałach.",
    "explanation": "Pokazano podstawową i odwróconą wersję znaku na metce i wizytówce. Odbiorca może ocenić, czy identyfikacja zachowuje czytelność przy różnych rozmiarach i tłach. Projekt jest wizualizacją, bez potwierdzonego zestawu plików produkcyjnych.",
    "features": [
      "Znak",
      "Wersja odwrócona",
      "Metka i wizytówka"
    ],
    "image": "/concept-samples-v2/logo-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu SZLAK",
    "status": "materiał koncepcyjny",
    "featured": true
  },
  {
    "slug": "lodyga",
    "title": "ŁODYGA",
    "category": "logo",
    "industry": "Identyfikacja wizualna",
    "summary": "Kwiaciarnia ŁODYGA: znak, który dobrze wygląda też na papierze i wstążce.",
    "explanation": "Koncepcja łączy logo kwiaciarni z wizytówką i elementami opakowania. Dzięki temu można zobaczyć spójność marki od pierwszego kontaktu po wręczenie bukietu. Pokazane nośniki są makietami, a nie potwierdzonymi wydrukami.",
    "features": [
      "Logo",
      "Wizytówka",
      "Opakowania"
    ],
    "image": "/concept-samples-v2/florist-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu ŁODYGA",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "palona",
    "title": "PALONA",
    "category": "logo",
    "industry": "Identyfikacja wizualna",
    "summary": "Palarnia kawy z identyfikacją rozpisaną na opakowania.",
    "explanation": "Znak, etykieta i opakowanie mają wspólną hierarchię informacji i charakter graficzny. Klient może wyobrazić sobie markę na półce oraz ocenić czytelność etykiety. Materiał nie jest gotową specyfikacją drukarską.",
    "features": [
      "Znak",
      "Opakowania",
      "Materiały firmowe"
    ],
    "image": "/concept-samples-v2/palona-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu PALONA",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "peleton",
    "title": "PELETON",
    "category": "gazetki",
    "industry": "Handel i reklama",
    "summary": "Gazetka sklepu rowerowego na początek sezonu.",
    "explanation": "Okładka przyciąga uwagę ofertą sezonową, a rozkładówka porządkuje modele i informacje o serwisie. Taki układ pomaga szybciej porównać grupy produktów. Ceny i oferta są przykładowe, a projekt ma charakter koncepcyjny.",
    "features": [
      "Okładka",
      "Rozkładówka",
      "Oferta usług"
    ],
    "image": "/concept-samples-v2/promo-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu PELETON",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "poglos",
    "title": "POGŁOS",
    "category": "gazetki",
    "industry": "Kultura i wydarzenia",
    "summary": "Gazetka muzyczna z mocną okładką.",
    "explanation": "Wyrazisty nagłówek i duże fotografie nadają okładce charakter wydarzenia, a rozkładówka porządkuje program. Odbiorca łatwiej odróżnia najważniejsze informacje od materiału ilustracyjnego. To projekt układu, nie publikacja rzeczywistego festiwalu.",
    "features": [
      "Okładka",
      "Rozkładówka",
      "Typografia"
    ],
    "image": "/concept-samples-v2/music-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu POGŁOS",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "dalej",
    "title": "DALEJ",
    "category": "gazetki",
    "industry": "Turystyka",
    "summary": "Katalog biura podróży z kierunkami na sezon.",
    "explanation": "Duże zdjęcia kierunków, krótkie bloki tekstu i wyraźne śródtytuły pomagają przeglądać przykładowe wyjazdy. Układ pokazuje sposób prezentacji katalogu bez zatłoczonych stron. Nie zawiera prawdziwych ofert ani rezerwacji.",
    "features": [
      "Okładka",
      "Układ redakcyjny",
      "Rozkładówka"
    ],
    "image": "/concept-samples-v2/dalej-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu DALEJ",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "dobry-koszyk",
    "title": "DOBRY KOSZYK",
    "category": "gazetki",
    "industry": "FMCG i handel",
    "summary": "Gazetka delikatesów z ofertą tygodnia.",
    "explanation": "Układ pokazuje tygodniową ofertę w kolejności, w jakiej klient przegląda produkty i ceny. Hierarchia promocji ułatwia odnalezienie wybranych kategorii. Kwoty i produkty są przykładowe, nie stanowią aktualnej gazetki sklepu.",
    "features": [
      "Okładka",
      "Rozkładówka produktowa",
      "Hierarchia cen"
    ],
    "image": "/concept-samples-v2/sales-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu DOBRY KOSZYK",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "modul",
    "title": "MODUŁ",
    "category": "gazetki",
    "industry": "Meble i wyposażenie",
    "summary": "Katalog mebli, w którym asortyment ma się czym pochwalić.",
    "explanation": "Koncepcja katalogu porządkuje kolekcje mebli zdjęciami, nagłówkami i krótkimi informacjami. Dzięki temu łatwiej porównać charakter poszczególnych linii produktowych. Pokazane rozkładówki są makietą, a nie pełnym katalogiem handlowym.",
    "features": [
      "Gazetka meblowa",
      "Układ oferty",
      "Okładka"
    ],
    "image": "/concept-samples-v2/furniture-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu MODUŁ",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "zielony-sezon",
    "title": "ZIELONY SEZON",
    "category": "gazetki",
    "industry": "Ogród",
    "summary": "Gazetka ogrodnicza na wiosnę i lato.",
    "explanation": "Przykładową ofertę wiosenno-letnią podzielono na rośliny, narzędzia i akcesoria. Czytelny podział i oznaczenia cen pomagają szybko przeglądać asortyment. To projekt gazetki sezonowej z danymi demonstracyjnymi.",
    "features": [
      "Gazetka sezonowa",
      "Produkty",
      "Przykładowe ceny"
    ],
    "image": "/concept-samples-v2/garden-catalogue-1280.webp",
    "alt": "Prezentacja koncepcyjna projektu ZIELONY SEZON",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "gazetka-navoro",
    "title": "Gazetka NAVORO HURT",
    "category": "gazetki",
    "industry": "Hurtownie i handel B2B",
    "summary": "Ośmiostronicowa gazetka wpięta wprost w stronę hurtowni NAVORO.",
    "explanation": "Klient przegląda ją w przeglądarce albo pobiera PDF, bez proszenia o plik mailem.",
    "features": [
      "8-stronicowy PDF",
      "Przeglądanie stron",
      "Pobranie pliku ze strony demo"
    ],
    "demoUrl": "https://navoro-hurt-koncepcja.vercel.app",
    "image": "/portfolio/kadry/gazetka-navoro.webp",
    "alt": "Okładka gazetki promocyjnej NAVORO HURT",
    "status": "materiał koncepcyjny",
    "featured": true
  },
  {
    "slug": "gazetka-nexio",
    "title": "Gazetka NEXIO ELEKTRO",
    "category": "gazetki",
    "industry": "Elektrotechnika",
    "summary": "Szesnaście stron oferty elektrycznej dostępnych prosto ze strony głównej.",
    "explanation": "Jedno kliknięcie z menu prowadzi do pełnego materiału promocyjnego.",
    "features": [
      "16 stron",
      "Przejście z witryny do gazetki",
      "Oferta produktowa"
    ],
    "demoUrl": "https://nexio-elektro.vercel.app/gazetka.html",
    "image": "/portfolio/kadry/gazetka-nexio.webp",
    "alt": "Rozkładówka gazetki NEXIO ELEKTRO",
    "status": "materiał koncepcyjny",
    "featured": true
  },
  {
    "slug": "gazetka-budrivo",
    "title": "Gazetka BUDRIVO",
    "category": "gazetki",
    "industry": "Budownictwo",
    "summary": "Gazetka BUDRIVO działająca obok katalogu i kalkulatora.",
    "explanation": "Promocje i produkty trzymają jedną linię graficzną ze stroną.",
    "features": [
      "Oferta produktowa",
      "Przejście z witryny",
      "Połączenie z katalogiem"
    ],
    "demoUrl": "https://budrivo.vercel.app",
    "image": "/portfolio/kadry/gazetka-budrivo.webp",
    "alt": "Sekcja gazetki promocyjnej na stronie BUDRIVO",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "gazetka-materivo",
    "title": "Gazetka MATERIVO",
    "category": "gazetki",
    "industry": "Materiał budowlany",
    "summary": "Gazetka online w ekonomicznej odsłonie MATERIVO.",
    "explanation": "Strona i materiał promocyjny powstały razem, więc wyglądają jak jedna marka.",
    "features": [
      "Gazetka online",
      "Oferta produktowa",
      "Integracja z serwisem"
    ],
    "demoUrl": "https://materivo-eko.vercel.app",
    "image": "/portfolio/kadry/gazetka-materivo.webp",
    "alt": "Gazetka online w serwisie MATERIVO",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "printflow",
    "title": "PrintFlow 360",
    "category": "aplikacje",
    "industry": "Poligrafia i produkcja",
    "summary": "Drukarnia od zapytania do faktury: wycena, produkcja, kontrola jakości, rozliczenie.",
    "explanation": "Portal z przebiegiem zlecenia i powiązany skoroszyt Excel na tych samych danych.",
    "features": [
      "Proces Order-to-Cash",
      "Dane demonstracyjne",
      "KPI i dokumentacja"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/printflow-360",
    "image": "/portfolio/kadry/printflow.webp",
    "alt": "Prezentacja koncepcyjna projektu PrintFlow 360",
    "status": "narzędzie lub demonstracja",
    "downloadUrl": "/pliki/printflow-360-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "transportflow",
    "title": "TransportFlow 360",
    "category": "aplikacje",
    "industry": "Transport i logistyka",
    "summary": "Zlecenie transportowe od kalkulacji po rozliczenie kierowcy.",
    "explanation": "Role, pojazdy, trasy i dokumenty w jednym panelu, z kosztem i marżą na końcu.",
    "features": [
      "Panel demonstracyjny",
      "Koszty i marża",
      "Przykładowe dokumenty"
    ],
    "demoUrl": "/realizacje/transportflow",
    "image": "/portfolio/kadry/transportflow-ekran.webp",
    "alt": "TransportFlow 360: etapy zlecenia, trasa, koszty i marża",
    "status": "narzędzie lub demonstracja",
    "downloadUrl": "/pliki/transportflow-360-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
  },
  {
    "slug": "workshopflow",
    "title": "WorkshopFlow 360",
    "category": "aplikacje",
    "industry": "Serwis samochodowy",
    "summary": "Warsztat i obieg zgłoszeń: przyjęcie, naprawa, wydanie auta.",
    "explanation": "Statusy zleceń widzi i mechanik, i osoba przyjmująca samochód.",
    "features": [
      "Statusy zleceń",
      "Kolejne etapy obsługi",
      "Dane testowe"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/workshopflow-360",
    "image": "/portfolio/kadry/workshopflow.webp",
    "alt": "Prezentacja koncepcyjna projektu WorkshopFlow 360",
    "status": "narzędzie lub demonstracja",
    "downloadUrl": "/pliki/warsztat-samochodowy-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "auto-naprawa",
    "title": "Auto Naprawa",
    "category": "aplikacje",
    "industry": "Warsztat",
    "summary": "Portal warsztatowy ze zgłoszeniami i kosztorysami.",
    "explanation": "Klient śledzi naprawę, kierownik ma podgląd na wszystkie zlecenia.",
    "features": [
      "Portal klienta",
      "Wycena",
      "Status naprawy"
    ],
    "demoUrl": "/demo/auto-naprawa/",
    "image": "/portfolio/kadry/auto-naprawa-ekran.webp",
    "alt": "Pierwszy ekran portalu Auto Naprawa",
    "status": "narzędzie lub demonstracja",
    "downloadUrl": "/pliki/warsztat-samochodowy-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
  },
  {
    "slug": "lead-offer-copilot",
    "title": "Lead & Offer Copilot",
    "category": "aplikacje",
    "industry": "Ofertowanie",
    "summary": "Narzędzie, które porządkuje zapytanie i podsuwa szkic oferty.",
    "explanation": "Wskazuje, czego brakuje w mailu od klienta, i proponuje tekst do Twojej korekty.",
    "features": [
      "Analiza zapytania",
      "Lista braków",
      "Szkic odpowiedzi"
    ],
    "demoUrl": "https://lead-offer-zm.pages.dev/",
    "image": "/portfolio/kadry/lead-offer-copilot.webp",
    "alt": "Prezentacja koncepcyjna projektu Lead & Offer Copilot",
    "status": "narzędzie lub demonstracja",
    "openAccess": "online"
  },
  {
    "slug": "document-checker",
    "title": "Document Checker",
    "category": "aplikacje",
    "industry": "Kontrola dokumentów",
    "summary": "Szybkie sprawdzenie Excela, CSV i PDF przed wysłaniem.",
    "explanation": "Wyłapuje rozjazdy kwot i puste pola, liczy w przeglądarce, bez wysyłania plików na serwer.",
    "features": [
      "XLSX, CSV, PDF",
      "Kontrola formatów",
      "Praca w przeglądarce"
    ],
    "demoUrl": "https://document-checker-zm.pages.dev/",
    "image": "/portfolio/kadry/document-checker.webp",
    "alt": "Prezentacja koncepcyjna projektu Document Checker",
    "status": "narzędzie lub demonstracja",
    "openAccess": "online"
  },
  {
    "slug": "docpilot",
    "title": "DocPilot",
    "category": "aplikacje",
    "industry": "Zarządzanie dokumentami",
    "summary": "Program do dokumentów, wyszukiwania i pilnowania terminów.",
    "explanation": "Rozpoznaje tekst ze skanów i szuka po treści, a dane zostają na Twoim dysku.",
    "features": [
      "OCR",
      "Wyszukiwanie",
      "Terminy"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/docpilot",
    "image": "/portfolio/kadry/docpilot.webp",
    "alt": "Prezentacja koncepcyjna projektu DocPilot",
    "status": "narzędzie lub demonstracja",
    "openAccess": "github"
  },
  {
    "slug": "aktywnik-plus",
    "title": "Aktywnik+",
    "category": "aplikacje",
    "industry": "Edukacja i aktywność",
    "summary": "Aplikacja PWA do aktywności dla siebie i dla rodziny, w fazie pilotażu.",
    "explanation": "Wersja 0.5.0-beta.4: tryb Dla siebie i Rodzina, zapis lokalny, eksport danych, logowanie Magic Link oraz pilotażowa synchronizacja powiązanych profili. Wdrożenie szkolne wymaga dodatkowych testów i uzgodnień dotyczących danych.",
    "features": [
      "Dziennik aktywności",
      "Tryb rodzinny",
      "PWA"
    ],
    "demoUrl": "https://aktywnik-plus.vercel.app",
    "image": "/portfolio/kadry/aktywnik-plus-ekran.webp",
    "alt": "Trzy ekrany aplikacji Aktywnik+ na telefonie",
    "status": "aplikacja rozwijana, beta 0.5.0-beta.4",
    "openAccess": "online",
    "featured": true
  },
  {
    "slug": "czy-to-sciema",
    "title": "CzyToŚciema?",
    "category": "aplikacje",
    "industry": "Bezpieczeństwo cyfrowe",
    "summary": "Sprawdzanie podejrzanych wiadomości, linków i kodów QR.",
    "explanation": "Pokazuje sygnały ostrzegawcze w treści, ale nie zastąpi ostrożności.",
    "features": [
      "SMS i e-mail",
      "Linki i QR",
      "Lokalna analiza"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/czy-to-sciema",
    "image": "/portfolio/kadry/czy-to-sciema.webp",
    "alt": "Prezentacja koncepcyjna projektu CzyToŚciema?",
    "status": "narzędzie lub demonstracja",
    "openAccess": "github"
  },
  {
    "slug": "fleet-ops-desk",
    "title": "Fleet Ops Desk",
    "category": "aplikacje",
    "industry": "Flota i administracja",
    "summary": "Ewidencja floty: pojazdy, umowy, terminy i koszty.",
    "explanation": "Python i SQLite, z przypomnieniem o kończących się przeglądach i polisach.",
    "features": [
      "Pojazdy i umowy",
      "Terminy",
      "Analizy kosztów"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/fleet-ops-desk",
    "image": "/portfolio/kadry/fleet-ops-desk.webp",
    "alt": "Prezentacja koncepcyjna projektu Fleet Ops Desk",
    "status": "narzędzie lub demonstracja",
    "openAccess": "github"
  },
  {
    "slug": "excel-warsztat",
    "title": "Warsztat samochodowy: przebieg pracy w Excelu",
    "category": "excel",
    "industry": "Serwis samochodowy",
    "summary": "Cały warsztat w jednym pliku: przyjęcie auta, naprawa, części, kosztorys ze zgodą klienta, wydanie, gwarancja i przypomnienia.",
    "explanation": "Ten sam proces co w WorkshopFlow 360 i Auto Naprawa. Obok koszty warsztatu, leasingi i przeglądy UDT, ludzie, pozyskanie klientów, VAT, podatek i próg rentowności w roboczogodzinach.",
    "features": [
      "Arkusze dla doradcy, mechanika, magazynu i biura",
      "Alarm, gdy kosztorys przekracza zgodę klienta",
      "Koszty, leasingi i przeglądy urządzeń",
      "Wynik, VAT i próg rentowności",
      "Wzory zlecenia, protokołu i gwarancji"
    ],
    "image": "/portfolio/kadry/excel-warsztat-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-warsztat-kafelek.webp",
    "alt": "Prawdziwy podgląd arkusza: Warsztat samochodowy: przebieg pracy w Excelu",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/warsztat-samochodowy-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-kawiarnia",
    "title": "Kawiarnia i bistro: przebieg pracy w Excelu",
    "category": "excel",
    "industry": "Gastronomia",
    "summary": "Rezerwacje i przyjęcia, utarg według kanałów, dostawy z terminami ważności, food cost każdej pozycji w karcie i straty.",
    "explanation": "Proces jak w Bistro Forma. Obok koszty lokalu, zezwolenia i opłaty za muzykę, sprzęt z przeglądami, zespół, pozyskanie gości, VAT według stawek i próg rentowności w paragonach.",
    "features": [
      "Rezerwacje z zadatkiem",
      "Utarg dzienny i różnice w kasie",
      "Food cost z alarmem",
      "Dostawy z terminami ważności",
      "Wzór umowy na przyjęcie i karta HACCP"
    ],
    "image": "/portfolio/kadry/excel-kawiarnia-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-kawiarnia-kafelek.webp",
    "alt": "Prawdziwy podgląd arkusza: Kawiarnia i bistro: przebieg pracy w Excelu",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/kawiarnia-bistro-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-stomatologia",
    "title": "Gabinet stomatologiczny: przebieg pracy w Excelu",
    "category": "excel",
    "industry": "Stomatologia",
    "summary": "Cennik z czasem zabiegu, grafik wizyt z nieobecnościami, plany leczenia z akceptacją, płatności i prace laboratoryjne.",
    "explanation": "Proces jak w AUREA SMILE i SOLIDENT. Uwzględnia zwolnienie z VAT, testy RTG i walidację autoklawu, zakaz reklamy lekarzy i przypomnienia o kontrolach.",
    "features": [
      "Grafik wizyt i odsetek nieobecności",
      "Plany leczenia z akceptacją",
      "Obłożenie foteli",
      "Przeglądy RTG i autoklawu",
      "Wzory planu leczenia, zgody i gwarancji"
    ],
    "image": "/portfolio/kadry/excel-stomatologia-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-stomatologia-kafelek.webp",
    "alt": "Prawdziwy podgląd arkusza: Gabinet stomatologiczny: przebieg pracy w Excelu",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/gabinet-stomatologiczny-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-hurtownia",
    "title": "Hurtownia materiałów: przebieg pracy w Excelu",
    "category": "excel",
    "industry": "Hurtownie i handel B2B",
    "summary": "Zapytania i oferty z marżą, magazyn ze stanami minimalnymi, kompletacja, dostawy z HDS, faktury z kredytem kupieckim.",
    "explanation": "Proces jak w NAVORO HURT, NEXIO ELEKTRO, MATERIVO i PHU Marecki. Obok koszty magazynu, wózki i HDS pod dozorem UDT, kanały pozyskania instalatorów i firm budowlanych, rabaty roczne.",
    "features": [
      "Oferty z alarmem niskiej marży",
      "Stany minimalne i zamówienia",
      "Dostawy i rozładunek HDS",
      "Należności po terminie",
      "Wzory warunków sprzedaży i umowy z instalatorem"
    ],
    "image": "/portfolio/kadry/excel-hurtownia-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-hurtownia-kafelek.webp",
    "alt": "Prawdziwy podgląd arkusza: Hurtownia materiałów: przebieg pracy w Excelu",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/hurtownia-elektryczna-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-remonty",
    "title": "Firma remontowa: przebieg pracy w Excelu",
    "category": "excel",
    "industry": "Budownictwo i remonty",
    "summary": "Zapytania i wizje lokalne, kosztorys pomieszczenie po pomieszczeniu z marżą, harmonogram ekip, zakupy, odbiory i płatności etapowe.",
    "explanation": "Obok koszty firmy, bus i sprzęt, ekipy, kanały pozyskania klientów, VAT 8 lub 23 procent i gwarancja z przeglądem po roku.",
    "features": [
      "Kosztorys z marżą na każdej pozycji",
      "Harmonogram ekip i opóźnienia",
      "Odbiory i płatności etapowe",
      "Gwarancja i przegląd po roku",
      "Wzory umowy, protokołu i prac dodatkowych"
    ],
    "image": "/portfolio/kadry/excel-remonty-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-remonty-kafelek.webp",
    "alt": "Prawdziwy podgląd arkusza: Firma remontowa: przebieg pracy w Excelu",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/firma-remontowa-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-budowa",
    "title": "Firma budowlana: przebieg pracy w Excelu",
    "category": "excel",
    "industry": "Budownictwo",
    "summary": "Budowy z wartościami i terminami, budżet każdej budowy z przekroczeniami, dziennik prac, podwykonawcy z kaucjami i faktury etapowe.",
    "explanation": "Obok sprzęt z UDT i przeglądami, przetargi i inne źródła zleceń, kaucje inwestora, rękojmia i zwroty kaucji podwykonawcom.",
    "features": [
      "Budżet budowy z alarmem przekroczeń",
      "Podwykonawcy, kaucje i OC",
      "Faktury etapowe i kaucja inwestora",
      "Rękojmia i przeglądy gwarancyjne",
      "Wzory umów i protokołu odbioru"
    ],
    "image": "/portfolio/kadry/excel-budowa-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-budowa-kafelek.webp",
    "alt": "Prawdziwy podgląd arkusza: Firma budowlana: przebieg pracy w Excelu",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/firma-budowlana-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-deweloper",
    "title": "Mały deweloper: przebieg pracy w Excelu",
    "category": "excel",
    "industry": "Nieruchomości",
    "summary": "Lokale z cenami i marżą, klienci od kontaktu do aktu, harmonogram wpłat na rachunek powierniczy, budżet budowy i odbiory z wadami.",
    "explanation": "Proces jak w Dom Dobry. Uwzględnia limit opłaty rezerwacyjnej, składkę na fundusz gwarancyjny, VAT 8 i 23 procent oraz terminy na usunięcie wad.",
    "features": [
      "Statusy lokali i marża na m²",
      "Limit opłaty rezerwacyjnej",
      "Wpłaty i zaległości",
      "Budżet etapów budowy",
      "Wzory umowy rezerwacyjnej i protokołu odbioru"
    ],
    "image": "/portfolio/kadry/excel-deweloper-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-deweloper-kafelek.webp",
    "alt": "Prawdziwy podgląd arkusza: Mały deweloper: przebieg pracy w Excelu",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/maly-deweloper-zielona-marka.xlsx",
    "downloadLabel": "Pobierz przebieg pracy (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-printflow",
    "title": "Arkusz Excel PrintFlow 360",
    "category": "excel",
    "industry": "Poligrafia i produkcja",
    "summary": "Ten sam proces co w PrintFlow 360, rozpisany na role: zapytanie, produkcja, kontrola jakości, wysyłka i faktura.",
    "explanation": "Biuro, produkcja i kontrola jakości mają osobne arkusze. Numer zlecenia przenosi klienta, produkt i nakład dalej, a KPI pokazuje skuteczność wycen, braki i pieniądze do odzyskania.",
    "features": [
      "Arkusze dla pięciu ról",
      "Dane przechodzą po numerze zlecenia",
      "Kontrola jakości i braki",
      "Faktury i płatności",
      "KPI całego procesu"
    ],
    "image": "/portfolio/kadry/excel-printflow-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-printflow-kafelek.webp",
    "alt": "Arkusz PrintFlow 360: zapytania i wyceny z kartami ról na dole",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/printflow-360-zielona-marka.xlsx",
    "downloadLabel": "Pobierz arkusz PrintFlow (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-transportflow",
    "title": "Arkusz Excel TransportFlow 360",
    "category": "excel",
    "industry": "Transport i logistyka",
    "summary": "Ten sam proces co w TransportFlow 360: dyspozytor wycenia trasę, kierowca zapisuje przejazd, biuro rozlicza.",
    "explanation": "Marża poniżej progu świeci się na czerwono jeszcze przed przyjęciem zlecenia. Koszt paliwa liczy się z litrów wpisanych przez kierowcę, a KPI porównuje spalanie z normą.",
    "features": [
      "Arkusze dla dyspozytora, kierowcy i biura",
      "Stawki w jednym miejscu",
      "Wynik i stawka za kilometr",
      "Spalanie wobec normy",
      "Faktury i płatności"
    ],
    "image": "/portfolio/kadry/excel-transportflow-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-transportflow-kafelek.webp",
    "alt": "Arkusz TransportFlow 360: rozliczenie przewozów z wynikiem i stawką za kilometr",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/transportflow-360-zielona-marka.xlsx",
    "downloadLabel": "Pobierz arkusz TransportFlow (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-dashboard",
    "title": "Dashboard operacyjny",
    "category": "excel",
    "industry": "Zarządzanie procesem",
    "summary": "Zlecenia w jednym arkuszu, a obok wskaźniki, które liczą się same.",
    "explanation": "Widać, co jest w toku, co po terminie, ile zostało do zafakturowania i kto ma najwięcej na głowie. Bez dodatkowych programów.",
    "features": [
      "Etapy i priorytety z listy",
      "Opóźnienia na czerwono",
      "Do zafakturowania",
      "Obciążenie osób",
      "Podział na role"
    ],
    "image": "/portfolio/kadry/excel-dashboard-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-dashboard-kafelek.webp",
    "alt": "Dashboard operacyjny: zlecenia, etapy i opóźnienia",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/dashboard-operacyjny-zielona-marka.xlsx",
    "downloadLabel": "Pobierz dashboard (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-wycena",
    "title": "Kalkulator wariantów oferty",
    "category": "excel",
    "industry": "Wyceny usług",
    "summary": "Oferta rozpisana na pozycje i od razu w trzech wariantach ceny.",
    "explanation": "Stawki, VAT i rabaty ustawia się w jednym arkuszu. Kalkulator pokazuje też koszt godzin, żeby było widać, czy cena pokrywa pracę.",
    "features": [
      "Założenia w jednym miejscu",
      "Wycena pozycja po pozycji",
      "Trzy warianty i zaliczka",
      "Koszt godzin pracy",
      "Podział na role"
    ],
    "image": "/portfolio/kadry/excel-wycena-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-wycena-kafelek.webp",
    "alt": "Kalkulator wariantów oferty: wycena pozycja po pozycji",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/kalkulator-wariantow-oferty-zielona-marka.xlsx",
    "downloadLabel": "Pobierz kalkulator (XLSX)",
    "openAccess": "github"
  },
  {
    "slug": "excel-crm",
    "title": "Rejestr kontaktów i działań w Excelu",
    "category": "excel",
    "industry": "Sprzedaż i CRM",
    "summary": "Firmy, rozmowy i kolejne kroki w jednym pliku, z lejkiem sprzedaży.",
    "explanation": "Dla firmy, której pełny CRM na razie się nie opłaca. Plik liczy wartość ofert ważoną szansą i podświetla kontakty, do których nikt nie dzwonił od dwóch tygodni.",
    "features": [
      "Kontakty i dziennik działań",
      "Wartość ważona szansą",
      "Zaległe kontakty na czerwono",
      "Lejek i źródła klientów",
      "Podział na role"
    ],
    "image": "/portfolio/kadry/excel-crm-ekran.webp",
    "cardImage": "/portfolio/kadry/excel-crm-kafelek.webp",
    "alt": "Rejestr kontaktów: etapy, szansa i wartość ważona",
    "status": "gotowy plik, dane przykładowe",
    "downloadUrl": "/pliki/rejestr-kontaktow-zielona-marka.xlsx",
    "downloadLabel": "Pobierz rejestr (XLSX)",
    "openAccess": "github"
  },
];

/* Kolejność katalogu: strony i powiązane materiały, następnie aplikacje, narzędzia i koncepcje. */
const kolejnosc = [
  "black-harbor",
  "phu-marecki",
  "phu-marecki-aplikacja",
  "kordon-barber-studio",
  "eltravia",
  "aurea-smile",
  "beata-beauty-atelier",
  "fornir-forma",
  "uvset-360",
  "solidom",
  "centrum-budowlane-pwa",
  "navoro-hurt",
  "gazetka-navoro",
  "nexio-elektro",
  "gazetka-nexio",
  "solident",
  "materivo",
  "materivo-eko",
  "gazetka-materivo",
  "budrivo",
  "gazetka-budrivo",
  "auto-naprawa",
  "printflow",
  "transportflow",
  "workshopflow",
  "lead-offer-copilot",
  "document-checker",
  "docpilot",
  "fleet-ops-desk",
  "aktywnik-plus",
  "czy-to-sciema",
  "excel-dashboard",
  "excel-wycena",
  "excel-crm",
  "excel-hurtownia",
  "excel-budowa",
  "excel-deweloper",
  "excel-remonty",
  "excel-stomatologia",
  "excel-warsztat",
  "excel-kawiarnia",
  "excel-printflow",
  "excel-transportflow",
  "natura-studio",
  "bistro-forma",
  "dom-dobry",
  "styk",
  "glina",
  "trop",
  "szlak",
  "lodyga",
  "palona",
  "peleton",
  "poglos",
  "dalej",
  "dobry-koszyk",
  "modul",
  "zielony-sezon",
  "pion",
  "forma",
  "okruch",
];
const pozycja = (slug: string) => {
  const i = kolejnosc.indexOf(slug);
  return i === -1 ? kolejnosc.length : i;
};
export const portfolioItems: PortfolioItem[] = katalog
  .map((item, index) => ({ item, index }))
  .sort((a, b) => pozycja(a.item.slug) - pozycja(b.item.slug) || a.index - b.index)
  .map(({ item }) => item);

export function findPortfolioItem(slug: string) {
  return portfolioItems.find(item => item.slug === slug);
}
export const featuredPortfolioItems = portfolioItems.filter(item => item.featured);

/** Polska odmiana liczebnika dla liczby projektów. */
export function liczbaProjektow(liczba: number) {
  const dziesiatki = liczba % 100;
  const jednosci = liczba % 10;
  const forma = liczba === 1 ? "projekt" : jednosci >= 2 && jednosci <= 4 && !(dziesiatki >= 12 && dziesiatki <= 14) ? "projekty" : "projektów";
  return `${liczba} ${forma}`;
}
