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
  image?: string;
  alt?: string;
  status: string;
  featured?: boolean;
  /** Prace, które można wziąć i używać: "github" to publiczne repozytorium
      do pobrania, "online" to narzędzie działające w przeglądarce bez konta. */
  openAccess?: "github" | "online";
};
export const portfolioItems: PortfolioItem[] = [
  {
    "slug": "budrivo",
    "title": "BUDRIVO",
    "category": "www",
    "industry": "Budownictwo i materiały",
    "summary": "Hurtownia budowlana, w której klient sam znajdzie materiał, policzy koszt i zobaczy elewację w swoim kolorze.",
    "explanation": "Katalog, kalkulator i gazetka pracują w jednym miejscu, więc zapytanie przychodzi już z numerem produktu i metrażem.",
    "features": [
      "Katalog materiałów",
      "Kalkulator",
      "Gazetka w serwisie",
      "Wizualizacja elewacji"
    ],
    "demoUrl": "https://budrivo.vercel.app",
    "image": "/portfolio/budrivo-autentyczny-podglad.png",
    "alt": "Rzeczywisty ekran demonstracyjnej strony BUDRIVO",
    "status": "projekt demonstracyjny",
    "featured": true
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
    "image": "/portfolio/kadry/navoro-hurt.webp",
    "alt": "Strona główna hurtowni NAVORO z kampanią produktową",
    "status": "projekt demonstracyjny",
    "featured": true
  },
  {
    "slug": "nexio-elektro",
    "title": "NEXIO ELEKTRO",
    "category": "www",
    "industry": "Elektrotechnika",
    "summary": "Oferta elektryczna poukładana tak, żeby instalator w kilka sekund trafił do swojego działu.",
    "explanation": "Ze strony głównej prowadzi krótka droga do szesnastostronicowej gazetki z pełnym asortymentem.",
    "features": [
      "Prezentacja asortymentu",
      "Gazetka 16-stronicowa",
      "Nawigacja do gazetki ze strony głównej"
    ],
    "demoUrl": "https://nexio-elektro.vercel.app",
    "image": "/portfolio/kadry/nexio-elektro.webp",
    "alt": "Strona główna NEXIO ELEKTRO z katalogiem materiałów",
    "status": "projekt demonstracyjny",
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
    "image": "/portfolio/materivo-autentyczny-podglad.png",
    "alt": "Rzeczywisty ekran demonstracyjnej strony MATERIVO",
    "status": "projekt demonstracyjny",
    "featured": true
  },
  {
    "slug": "solidom",
    "title": "SOLIDOM",
    "category": "www",
    "industry": "Usługi budowlane",
    "summary": "Firma budowlano-remontowa z czytelną ofertą i realizacjami na pierwszym planie.",
    "explanation": "Układ prowadzi od zakresu prac do kontaktu, bez przewijania przez ścianę tekstu.",
    "features": [
      "Oferta usług",
      "Prezentacja projektów",
      "Kontakt"
    ],
    "demoUrl": "https://solidom.vercel.app",
    "image": "/portfolio/kadry/solidom.webp",
    "alt": "Strona główna SOLIDOM z realizacją domu jednorodzinnego",
    "status": "projekt demonstracyjny"
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
    "image": "/portfolio/kadry/solident.webp",
    "alt": "Strona główna gabinetu SOLIDENT",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "black-harbor",
    "title": "BLACK HARBOR",
    "category": "www",
    "industry": "Auto detailing",
    "summary": "Detailing pokazany efektami: pakiety, zdjęcia przed i po, szybka wycena.",
    "explanation": "Ciemna oprawa zdjęć robi tu robotę, której w tej branży nie zastąpi żaden opis.",
    "features": [
      "Pakiety usług",
      "Galeria efektów",
      "Ścieżka wyceny"
    ],
    "demoUrl": "https://blackharbor.vercel.app",
    "image": "/portfolio/black-harbor-kadr.webp",
    "alt": "Samochód po korekcie lakieru na stronie BLACK HARBOR",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "eltravia",
    "title": "ELTRAVIA Premium",
    "category": "www",
    "industry": "Usługi elektroinstalacyjne",
    "summary": "Druga, ostrzejsza droga dla firmy elektrycznej: marka techniczna w wersji premium.",
    "explanation": "Przykład na to, że ta sama usługa może wyglądać na podstawową albo na ekskluzywną.",
    "features": [
      "Prezentacja usług",
      "Wyrazisty kierunek graficzny",
      "Kontakt"
    ],
    "demoUrl": "https://eltravia-premium.vercel.app",
    "image": "/portfolio/kadry/eltravia.webp",
    "alt": "Strona główna ELTRAVIA w wersji premium",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "natura-studio",
    "title": "Natura Studio",
    "category": "www",
    "industry": "Wellness i beauty",
    "summary": "Studio zabiegowe z ofertą i obsługą wizyt po stronie właścicielki.",
    "explanation": "Klientka wybiera zabieg i się umawia, a za kulisami widać terminarz.",
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
    "explanation": "Gość sprawdza kartę, godziny i dojazd, a potem pisze albo rezerwuje stolik.",
    "features": [
      "Menu",
      "Informacje dla gości",
      "Demo zaplecza"
    ],
    "demoUrl": "/realizacje/bistro-forma",
    "image": "/concept-bistro.jpg",
    "alt": "Prezentacja koncepcyjna projektu Bistro Forma",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "dom-dobry",
    "title": "Dom Dobry",
    "category": "www",
    "industry": "Nieruchomości",
    "summary": "Inwestycja mieszkaniowa z kartami lokali i ich dostępnością.",
    "explanation": "Kupujący porównuje metraż, piętro i cenę zamiast prosić o PDF z ofertą.",
    "features": [
      "Karty lokali",
      "Przykładowa dostępność",
      "Zapytanie"
    ],
    "demoUrl": "/realizacje/dom-dobry",
    "image": "/concept-dom.jpg",
    "alt": "Prezentacja koncepcyjna projektu Dom Dobry",
    "status": "projekt demonstracyjny"
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
    "featured": true
  },
  {
    "slug": "styk",
    "title": "STYK",
    "category": "www",
    "industry": "Elektrotechnika",
    "summary": "Nowa firma elektryczna, która od pierwszego dnia musi wyglądać solidnie.",
    "explanation": "Widok na laptopie i telefonie, oparty na jednym mocnym zdjęciu i telefonie w zasięgu kciuka.",
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
    "explanation": "Spokojna typografia i dużo powietrza, żeby nic nie konkurowało z naczyniami.",
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
    "explanation": "Godziny, dyżur i numer telefonu na wierzchu, reszta oferty niżej.",
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
    "explanation": "Wersja podstawowa, odwrócona, metka i wizytówka, czyli wszystko, o co poprosi drukarnia.",
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
    "explanation": "Logo, wizytówka i opakowania złożone w jeden spójny zestaw.",
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
    "explanation": "Znak, etykieta paczki i materiały firmowe trzymają jeden charakter.",
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
    "explanation": "Okładka, rozkładówka z rowerami i strona serwisu, czyli to, po co klient sięga najpierw.",
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
    "explanation": "Wyrazista typografia i duże kadry, w sam raz dla klubu albo festiwalu.",
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
    "explanation": "Układ redakcyjny, który pozwala opisać wyjazd bez ściany tekstu.",
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
    "explanation": "Produkty i hierarchia promocji poukładane tak, jak czyta je klient przy półce. Ceny są przykładowe.",
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
    "explanation": "Okładka i rozkładówki pokazują kolekcje bez tłoku na stronie.",
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
    "explanation": "Sezonowa oferta z cenami, rozpisana na kategorie roślin i narzędzi.",
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
    "image": "/portfolio/kadry/transportflow.webp",
    "alt": "Prezentacja koncepcyjna projektu TransportFlow 360",
    "status": "narzędzie lub demonstracja"
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
    "image": "/portfolio/kadry/auto-naprawa.webp",
    "alt": "Prezentacja koncepcyjna projektu Auto Naprawa",
    "status": "narzędzie lub demonstracja"
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
    "explanation": "Wersja 0.5.0-beta.4: tryb Dla siebie, tryb Rodzina, zapis bez internetu, eksport danych i synchronizacja w budowie.",
    "features": [
      "Dziennik aktywności",
      "Tryb rodzinny",
      "PWA"
    ],
    "demoUrl": "https://aktywnik-plus.vercel.app",
    "image": "/portfolio/aktywnik-plus-okladka.svg",
    "alt": "Okładka Aktywnika+: znak aplikacji i widok dziennika aktywności",
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
    "slug": "excel-printflow",
    "title": "Arkusz Excel PrintFlow 360",
    "category": "excel",
    "industry": "Poligrafia i produkcja",
    "summary": "Skoroszyt do kalkulacji, produkcji i raportów drukarni.",
    "explanation": "Formuły liczą koszt zlecenia, a zestawienia pokazują wynik miesiąca. Liczby w przykładzie są wymyślone.",
    "features": [
      "Kalkulacje",
      "Raportowanie",
      "Zestawienia KPI"
    ],
    "image": "/portfolio/kadry/printflow.webp",
    "alt": "Prezentacja koncepcyjna projektu Arkusz Excel PrintFlow 360",
    "status": "demonstracja, dane syntetyczne"
  },
  {
    "slug": "excel-transportflow",
    "title": "Arkusz Excel TransportFlow 360",
    "category": "excel",
    "industry": "Transport i logistyka",
    "summary": "Arkusz do liczenia kosztów tras, marży i wyniku przewoźnika.",
    "explanation": "Widać w nim, skąd bierze się wynik na zleceniu, pozycja po pozycji.",
    "features": [
      "Koszty tras",
      "Marża",
      "Raportowanie"
    ],
    "image": "/portfolio/kadry/transportflow.webp",
    "alt": "Prezentacja koncepcyjna projektu Arkusz Excel TransportFlow 360",
    "status": "demonstracja, dane syntetyczne"
  },
  {
    "slug": "excel-dashboard",
    "title": "Dashboard operacyjny",
    "category": "excel",
    "industry": "Zarządzanie procesem",
    "summary": "Panel wskaźników operacyjnych w samym Excelu.",
    "explanation": "Zestawienia i wykresy liczą się z arkusza danych, bez dodatkowych narzędzi.",
    "features": [
      "Zestawienia",
      "KPI",
      "Wykresy"
    ],
    "image": "/portfolio/excel-dashboard.svg",
    "alt": "Autorska wizualizacja arkusza kalkulacyjnego, dane przykładowe",
    "status": "demonstracja, dane syntetyczne"
  },
  {
    "slug": "excel-wycena",
    "title": "Kalkulator wariantów oferty",
    "category": "excel",
    "industry": "Wyceny usług",
    "summary": "Kalkulator wariantów oferty: zakres obok kosztu.",
    "explanation": "Porównuje trzy warianty usługi i pokazuje klientowi, za co dokładnie płaci.",
    "features": [
      "Warianty zakresu",
      "Kalkulacja kosztów",
      "Porównanie"
    ],
    "image": "/portfolio/excel-wycena.svg",
    "alt": "Autorska wizualizacja arkusza kalkulacyjnego, dane przykładowe",
    "status": "demonstracja, dane syntetyczne"
  },
  {
    "slug": "excel-crm",
    "title": "Rejestr kontaktów i działań w Excelu",
    "category": "excel",
    "industry": "Sprzedaż i CRM",
    "summary": "Prosty rejestr kontaktów, statusów i kolejnych kroków.",
    "explanation": "Dla firmy, której pełny CRM na razie zwyczajnie się nie opłaca. Dane w przykładzie są fikcyjne.",
    "features": [
      "Status kontaktu",
      "Plan działań",
      "Filtry"
    ],
    "image": "/portfolio/excel-crm.svg",
    "alt": "Autorska wizualizacja arkusza kalkulacyjnego, dane przykładowe",
    "status": "demonstracja, dane syntetyczne"
  },
];

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
