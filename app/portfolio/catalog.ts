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
};
export const portfolioItems: PortfolioItem[] = [
  {
    "slug": "budrivo",
    "title": "BUDRIVO",
    "category": "www",
    "industry": "Budownictwo i materiały",
    "summary": "Strona produktowo-usługowa z katalogiem materiałów, kalkulatorem, wizualizacją elewacji i gazetką.",
    "explanation": "Pokazujemy powiązanie strony firmowej z ofertą produktową oraz narzędziami pomagającymi przygotować zapytanie.",
    "features": [
      "Katalog materiałów",
      "Kalkulator",
      "Gazetka w serwisie",
      "Wizualizacja elewacji"
    ],
    "demoUrl": "https://budrivo.vercel.app",
    "status": "projekt demonstracyjny",
    "featured": true
  },
  {
    "slug": "navoro-hurt",
    "title": "NAVORO HURT",
    "category": "www",
    "industry": "Hurtownie i handel B2B",
    "summary": "Demonstracyjny serwis hurtowni z katalogiem produktów oraz gazetką promocyjną.",
    "explanation": "Projekt pokazuje, jak odbiorca hurtowy może przeglądać asortyment i materiały ofertowe w jednym miejscu.",
    "features": [
      "Katalog 17 produktów",
      "Gazetka 8-stronicowa PDF",
      "Oglądanie i pobieranie gazetki"
    ],
    "demoUrl": "https://navoro-hurt-koncepcja.vercel.app",
    "status": "projekt demonstracyjny",
    "featured": true
  },
  {
    "slug": "nexio-elektro",
    "title": "NEXIO ELEKTRO",
    "category": "www",
    "industry": "Elektrotechnika",
    "summary": "Prezentacja oferty elektrycznej połączona z katalogiem i rozbudowaną gazetką.",
    "explanation": "Punktem wyjścia jest szybkie znalezienie odpowiedniego działu oferty i przejście do materiału promocyjnego.",
    "features": [
      "Prezentacja asortymentu",
      "Gazetka 16-stronicowa",
      "Nawigacja do gazetki ze strony głównej"
    ],
    "demoUrl": "https://nexio-elektro.vercel.app",
    "status": "projekt demonstracyjny",
    "featured": true
  },
  {
    "slug": "materivo",
    "title": "MATERIVO",
    "category": "www",
    "industry": "Materiały budowlane",
    "summary": "Koncepcja hurtowni budowlanej w dwóch wariantach estetycznych: Premium i Ekonomicznym.",
    "explanation": "Jedna rodzina demonstracji pozwala porównać sposób eksponowania produktów oraz komunikowania promocji.",
    "features": [
      "Wariant Premium",
      "Wariant Ekonomiczny",
      "Oferta budowlana",
      "Gazetka online w wariancie ekonomicznym"
    ],
    "demoUrl": "https://materivo-pro.vercel.app",
    "status": "projekt demonstracyjny",
    "featured": true
  },
  {
    "slug": "solidom",
    "title": "SOLIDOM",
    "category": "www",
    "industry": "Usługi budowlane",
    "summary": "Demonstracyjna prezentacja usług i realizacji firmy budowlano-remontowej.",
    "explanation": "Przykład witryny nastawionej na czytelną ofertę i kontakt z wykonawcą.",
    "features": [
      "Oferta usług",
      "Prezentacja projektów",
      "Kontakt"
    ],
    "demoUrl": "https://solidom.vercel.app",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "solident",
    "title": "SOLIDENT",
    "category": "www",
    "industry": "Stomatologia",
    "summary": "Koncepcja witryny dla placówki stomatologicznej.",
    "explanation": "Pokazuje uporządkowanie oferty medycznej i informacji potrzebnych przed wizytą.",
    "features": [
      "Zakres usług",
      "Informacje dla pacjenta",
      "Kontakt"
    ],
    "demoUrl": "https://solident-mu.vercel.app",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "black-harbor",
    "title": "BLACK HARBOR",
    "category": "www",
    "industry": "Auto detailing",
    "summary": "Wizualna prezentacja pakietów detailingu i efektów prac.",
    "explanation": "Projekt skoncentrowany na ofercie usług, zapytaniu o wycenę i prezentacji efektów.",
    "features": [
      "Pakiety usług",
      "Galeria efektów",
      "Ścieżka wyceny"
    ],
    "demoUrl": "https://blackharbor.vercel.app",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "eltravia",
    "title": "ELTRAVIA Premium",
    "category": "www",
    "industry": "Usługi elektroinstalacyjne",
    "summary": "Alternatywny kierunek witryny dla branży elektrycznej.",
    "explanation": "Przykład wizualnego pozycjonowania marki technicznej na rynku usług premium.",
    "features": [
      "Prezentacja usług",
      "Wyrazisty kierunek graficzny",
      "Kontakt"
    ],
    "demoUrl": "https://eltravia-premium.vercel.app",
    "status": "projekt demonstracyjny"
  },
  {
    "slug": "natura-studio",
    "title": "Natura Studio",
    "category": "www",
    "industry": "Wellness i beauty",
    "summary": "Demonstracja strony zabiegowej z ofertą i przykładową obsługą wizyt.",
    "explanation": "Koncepcja strony i zaplecza firmy usługowej z naciskiem na wybór zabiegu.",
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
    "summary": "Demonstracja witryny lokalu gastronomicznego.",
    "explanation": "Ułatwia przejście od menu i informacji o lokalu do zapytania lub rezerwacji.",
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
    "summary": "Koncepcyjna prezentacja inwestycji i mieszkań.",
    "explanation": "Scenariusz porównywania lokali, parametrów i dostępności.",
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
    "summary": "Symulowana modernizacja strony obiektu wspinaczkowego.",
    "explanation": "Pokazuje zmianę kompozycji i czytelności oferty. Stan „przed” jest fikcyjny.",
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
    "summary": "Porównanie koncepcyjne strony pracowni ogrodów.",
    "explanation": "Projekt obrazuje zmianę wizualną i uproszczenie układu treści.",
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
    "summary": "Autorska symulacja przebudowy strony piekarni OKRUCH.",
    "explanation": "Porównanie przedstawia dwa fikcyjne projekty, a nie przed i po pracy u rzeczywistego klienta.",
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
    "summary": "Wizualizacja strony nowej firmy elektrycznej.",
    "explanation": "Koncepcja widoku na laptopie i telefonie, bez działającego zaplecza.",
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
    "summary": "Wizualizacja strony pracowni ceramiki.",
    "explanation": "Projekt przedstawia przykładową estetykę i układ strony.",
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
    "summary": "Wizualizacja strony gabinetu weterynaryjnego.",
    "explanation": "Koncepcja pokazuje organizację komunikacji usług i kontaktu.",
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
    "summary": "Koncepcja znaku i jego zastosowań na materiałach marki.",
    "explanation": "Pokazujemy znak, wersję odwróconą oraz przykłady użycia.",
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
    "summary": "Koncepcja identyfikacji kwiaciarni.",
    "explanation": "Znak i zastosowania na papierze, opakowaniach oraz wizytówkach.",
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
    "summary": "Identyfikacja palarni kawy.",
    "explanation": "Zestawienie znaku z projektami opakowań i materiałów firmowych.",
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
    "summary": "Koncepcja gazetki promocyjnej sklepu rowerowego.",
    "explanation": "Przykładowe okładka, usługi i rozkładówka reklamowa.",
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
    "summary": "Wizualizacja gazetki muzycznej.",
    "explanation": "Projekt pokazuje charakterystyczną okładkę oraz środek publikacji.",
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
    "summary": "Koncepcja gazetki podróżniczej.",
    "explanation": "Pokazuje układ materiału promocyjnego biura podróży.",
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
    "summary": "Gazetka produktowa delikatesów.",
    "explanation": "Przykładowa oferta z produktami i fikcyjnymi cenami.",
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
    "summary": "Koncepcja gazetki meblowej.",
    "explanation": "Pokazuje ekspozycję asortymentu, okładkę i rozkładówkę.",
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
    "summary": "Koncepcja gazetki ogrodniczej.",
    "explanation": "Przykładowy układ sezonowej oferty produktów z cenami.",
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
    "summary": "Gazetka promocyjna umieszczona w demonstracyjnej witrynie hurtowni NAVORO HURT.",
    "explanation": "W projekcie połączono katalog 17 produktów z 8-stronicową gazetką PDF dostępną do przeglądania i pobrania na stronie demonstracyjnej.",
    "features": [
      "8-stronicowy PDF",
      "Przeglądanie stron",
      "Pobranie pliku ze strony demo"
    ],
    "demoUrl": "https://navoro-hurt-koncepcja.vercel.app",
    "status": "materiał koncepcyjny",
    "featured": true
  },
  {
    "slug": "gazetka-nexio",
    "title": "Gazetka NEXIO ELEKTRO",
    "category": "gazetki",
    "industry": "Elektrotechnika",
    "summary": "16-stronicowa gazetka dostępna z witryny demonstracyjnej NEXIO ELEKTRO.",
    "explanation": "Prezentacja rozbudowanej oferty produktowej z poziomu strony internetowej.",
    "features": [
      "16 stron",
      "Przejście z witryny do gazetki",
      "Oferta produktowa"
    ],
    "demoUrl": "https://nexio-elektro.vercel.app/gazetka.html",
    "status": "materiał koncepcyjny",
    "featured": true
  },
  {
    "slug": "gazetka-budrivo",
    "title": "Gazetka BUDRIVO",
    "category": "gazetki",
    "industry": "Budownictwo",
    "summary": "Gazetka zintegrowana z demonstracyjnym serwisem BUDRIVO.",
    "explanation": "Pokazuje, jak promocyjny materiał produktowy może funkcjonować obok katalogu i kalkulatora.",
    "features": [
      "Oferta produktowa",
      "Przejście z witryny",
      "Połączenie z katalogiem"
    ],
    "demoUrl": "https://budrivo.vercel.app",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "gazetka-materivo",
    "title": "Gazetka MATERIVO",
    "category": "gazetki",
    "industry": "Materiał budowlany",
    "summary": "Gazetka online w wariancie ekonomicznym MATERIVO.",
    "explanation": "Wspólny projekt strony i materiału promocyjnego dla sklepu budowlanego.",
    "features": [
      "Gazetka online",
      "Oferta produktowa",
      "Integracja z serwisem"
    ],
    "demoUrl": "https://materivo-eko.vercel.app",
    "status": "materiał koncepcyjny"
  },
  {
    "slug": "printflow",
    "title": "PrintFlow 360",
    "category": "aplikacje",
    "industry": "Poligrafia i produkcja",
    "summary": "Demonstracja procesu od zapytania i wyceny przez produkcję i kontrolę jakości do faktury.",
    "explanation": "Wariant obejmuje portal, scenariusz przebiegu pracy oraz powiązany skoroszyt Excel.",
    "features": [
      "Proces Order-to-Cash",
      "Dane demonstracyjne",
      "KPI i dokumentacja"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/printflow-360",
    "image": "/tool-printflow-360-v2.jpg",
    "alt": "Prezentacja koncepcyjna projektu PrintFlow 360",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "transportflow",
    "title": "TransportFlow 360",
    "category": "aplikacje",
    "industry": "Transport i logistyka",
    "summary": "Przebieg zlecenia transportowego od kalkulacji do rozliczenia.",
    "explanation": "Przykładowe role, pojazdy, trasy, dokumenty i wyniki.",
    "features": [
      "Panel demonstracyjny",
      "Koszty i marża",
      "Przykładowe dokumenty"
    ],
    "demoUrl": "/realizacje/transportflow",
    "image": "/tool-transportflow-360-v2.jpg",
    "alt": "Prezentacja koncepcyjna projektu TransportFlow 360",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "workshopflow",
    "title": "WorkshopFlow 360",
    "category": "aplikacje",
    "industry": "Serwis samochodowy",
    "summary": "Demonstracja obiegu zgłoszeń i napraw w warsztacie.",
    "explanation": "Proces obejmuje etap przyjęcia, pracy i przekazania pojazdu.",
    "features": [
      "Statusy zleceń",
      "Kolejne etapy obsługi",
      "Dane testowe"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/workshopflow-360",
    "image": "/tool-workshopflow-360-photo.png",
    "alt": "Prezentacja koncepcyjna projektu WorkshopFlow 360",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "auto-naprawa",
    "title": "Auto Naprawa",
    "category": "aplikacje",
    "industry": "Warsztat",
    "summary": "Demonstracja portalu obsługi zgłoszeń i kosztorysów warsztatowych.",
    "explanation": "Przykładowy proces obsługi naprawy oraz panel kierownika.",
    "features": [
      "Portal klienta",
      "Wycena",
      "Status naprawy"
    ],
    "demoUrl": "/demo/auto-naprawa/",
    "image": "/portfolio-auto-naprawa-live.png",
    "alt": "Prezentacja koncepcyjna projektu Auto Naprawa",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "lead-offer-copilot",
    "title": "Lead & Offer Copilot",
    "category": "aplikacje",
    "industry": "Ofertowanie",
    "summary": "Narzędzie do uporządkowania zapytania i przygotowania szkicu oferty.",
    "explanation": "Analizuje braki danych i proponuje tekst do ręcznego sprawdzenia.",
    "features": [
      "Analiza zapytania",
      "Lista braków",
      "Szkic odpowiedzi"
    ],
    "demoUrl": "https://lead-offer-zm.pages.dev/",
    "image": "/tool-lead-offer-copilot-v2.jpg",
    "alt": "Prezentacja koncepcyjna projektu Lead & Offer Copilot",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "document-checker",
    "title": "Document Checker",
    "category": "aplikacje",
    "industry": "Kontrola dokumentów",
    "summary": "Lokalna wstępna weryfikacja danych w Excelu, CSV i PDF.",
    "explanation": "Pomaga znaleźć niezgodności kwot i pól przed wysłaniem.",
    "features": [
      "XLSX, CSV, PDF",
      "Kontrola formatów",
      "Praca w przeglądarce"
    ],
    "demoUrl": "https://document-checker-zm.pages.dev/",
    "image": "/tool-document-checker-v2.jpg",
    "alt": "Prezentacja koncepcyjna projektu Document Checker",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "docpilot",
    "title": "DocPilot",
    "category": "aplikacje",
    "industry": "Zarządzanie dokumentami",
    "summary": "Program do pracy z dokumentami, wyszukiwaniem i terminami.",
    "explanation": "Pokazuje pracę na plikach i OCR z lokalnym przechowywaniem danych.",
    "features": [
      "OCR",
      "Wyszukiwanie",
      "Terminy"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/docpilot",
    "image": "/program-docpilot-photo-v3.png",
    "alt": "Prezentacja koncepcyjna projektu DocPilot",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "aktywnik-plus",
    "title": "Aktywnik+",
    "category": "aplikacje",
    "industry": "Edukacja i aktywność",
    "summary": "Aplikacja PWA do prowadzenia dziennika aktywności.",
    "explanation": "Przykładowe widoki dla dziecka i rodziny.",
    "features": [
      "Dziennik aktywności",
      "Tryb rodzinny",
      "PWA"
    ],
    "demoUrl": "https://aktywnik-plus.vercel.app",
    "image": "/program-aktywnik-plus-photo-v3.png",
    "alt": "Prezentacja koncepcyjna projektu Aktywnik+",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "czy-to-sciema",
    "title": "CzyToŚciema?",
    "category": "aplikacje",
    "industry": "Bezpieczeństwo cyfrowe",
    "summary": "Projekt sprawdzania sygnałów ostrzegawczych w treściach i linkach.",
    "explanation": "Pomaga ocenić podejrzane wiadomości, ale nie daje gwarancji bezpieczeństwa.",
    "features": [
      "SMS i e-mail",
      "Linki i QR",
      "Lokalna analiza"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/czy-to-sciema",
    "image": "/program-czy-to-sciema-photo-v3.png",
    "alt": "Prezentacja koncepcyjna projektu CzyToŚciema?",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "fleet-ops-desk",
    "title": "Fleet Ops Desk",
    "category": "aplikacje",
    "industry": "Flota i administracja",
    "summary": "Demonstracyjna ewidencja floty, dokumentów i kosztów.",
    "explanation": "Projekt Python i SQLite z przykładowymi danymi.",
    "features": [
      "Pojazdy i umowy",
      "Terminy",
      "Analizy kosztów"
    ],
    "demoUrl": "https://github.com/lukaszst-cz/fleet-ops-desk",
    "image": "/program-fleet-ops-desk-photo-v3.png",
    "alt": "Prezentacja koncepcyjna projektu Fleet Ops Desk",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "zm-studio",
    "title": "ZM Studio",
    "category": "aplikacje",
    "industry": "Projektowanie WWW",
    "summary": "Konfigurator wyglądu i orientacyjnego zakresu strony.",
    "explanation": "Pozwala przetestować układ, wybrać funkcje oraz przygotować zapytanie.",
    "features": [
      "Konfigurator",
      "Orientacyjny koszt",
      "Brief"
    ],
    "demoUrl": "/projektuj-strone",
    "image": "/portfolio-board-zielona-marka.png",
    "alt": "Prezentacja koncepcyjna projektu ZM Studio",
    "status": "narzędzie lub demonstracja"
  },
  {
    "slug": "excel-printflow",
    "title": "Arkusz Excel PrintFlow 360",
    "category": "excel",
    "industry": "Poligrafia i produkcja",
    "summary": "Skoroszyt demonstracyjny do kalkulacji, produkcji i raportowania.",
    "explanation": "W portfolio pokazujemy przykłady pracy na syntetycznych danych.",
    "features": [
      "Kalkulacje",
      "Raportowanie",
      "Zestawienia KPI"
    ],
    "image": "/tool-printflow-360-v2.jpg",
    "alt": "Prezentacja koncepcyjna projektu Arkusz Excel PrintFlow 360",
    "status": "demonstracja, dane syntetyczne"
  },
  {
    "slug": "excel-transportflow",
    "title": "Arkusz Excel TransportFlow 360",
    "category": "excel",
    "industry": "Transport i logistyka",
    "summary": "Skoroszyt do analizy przykładowych zleceń i kosztów transportu.",
    "explanation": "Pomaga pokazać sposób liczenia kosztów, marży i wskaźników.",
    "features": [
      "Koszty tras",
      "Marża",
      "Raportowanie"
    ],
    "image": "/tool-transportflow-360-v2.jpg",
    "alt": "Prezentacja koncepcyjna projektu Arkusz Excel TransportFlow 360",
    "status": "demonstracja, dane syntetyczne"
  },
  {
    "slug": "excel-dashboard",
    "title": "Dashboard operacyjny",
    "category": "excel",
    "industry": "Zarządzanie procesem",
    "summary": "Przykładowy panel zestawień i wskaźników w Excelu.",
    "explanation": "Pokazuje możliwy sposób zestawiania danych operacyjnych; pliki źródłowe nie są publiczne.",
    "features": [
      "Zestawienia",
      "KPI",
      "Wykresy"
    ],
    "status": "demonstracja, dane syntetyczne"
  },
  {
    "slug": "excel-wycena",
    "title": "Kalkulator wariantów oferty",
    "category": "excel",
    "industry": "Wyceny usług",
    "summary": "Przykładowy arkusz porównujący zakres i koszty wariantów usługi.",
    "explanation": "Do portfolio trafi wyłącznie anonimowy wariant demonstracyjny, bez wycen konkretnych firm.",
    "features": [
      "Warianty zakresu",
      "Kalkulacja kosztów",
      "Porównanie"
    ],
    "status": "demonstracja, dane syntetyczne"
  },
  {
    "slug": "excel-crm",
    "title": "Rejestr kontaktów i działań w Excelu",
    "category": "excel",
    "industry": "Sprzedaż i CRM",
    "summary": "Przykład uporządkowania kontaktów, statusów i kolejnych działań.",
    "explanation": "Publiczny opis i zrzuty będą oparte wyłącznie na fikcyjnych danych, bez baz prospektów.",
    "features": [
      "Status kontaktu",
      "Plan działań",
      "Filtry"
    ],
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
