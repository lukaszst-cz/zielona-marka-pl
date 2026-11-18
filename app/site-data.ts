export type Project = {
  n: string;
  name: string;
  type: string;
  note: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  backendUrl?: string;
  primaryLabel: string;
  secondaryLabel?: string;
};

export const projects: Project[] = [
  {
    n: "01",
    name: "Natura Studio",
    type: "Wellness i uroda",
    note: "Projekt koncepcyjny, demonstracja",
    description: "Jasna oferta zabiegów, przyjemne zdjęcia i wygodna droga do umówienia wizyty.",
    imageUrl: "/concept-natura.jpg",
    websiteUrl: "/demo/natura-strona",
    backendUrl: "/demo/natura",
    primaryLabel: "Zobacz stronę",
    secondaryLabel: "Zobacz zaplecze",
  },
  {
    n: "02",
    name: "Bistro Forma",
    type: "Gastronomia",
    note: "Projekt koncepcyjny, demonstracja",
    description: "Menu, klimat miejsca, rezerwacja stolika i codzienna obsługa w jednym kierunku.",
    imageUrl: "/concept-bistro.jpg",
    websiteUrl: "/demo/bistro-strona",
    backendUrl: "/demo/bistro",
    primaryLabel: "Zobacz stronę",
    secondaryLabel: "Zobacz zaplecze",
  },
  {
    n: "03",
    name: "Dom Dobry",
    type: "Nieruchomości",
    note: "Projekt koncepcyjny, demonstracja",
    description: "Czytelna prezentacja inwestycji, dostępności i drogi od oglądania do zapytania.",
    imageUrl: "/concept-dom.jpg",
    websiteUrl: "/demo/dom-strona",
    backendUrl: "/demo/dom",
    primaryLabel: "Zobacz stronę",
    secondaryLabel: "Zobacz zaplecze",
  },
  {
    n: "04",
    name: "Auto Naprawa",
    type: "Warsztat i obsługa klienta",
    note: "Projekt koncepcyjny, demonstracja",
    description: "Strona warsztatu, portal klienta, kosztorysy, faktury i widok dla kierownika.",
    imageUrl: "/demo/auto-naprawa/assets/workshop-hero.png",
    websiteUrl: "/demo/auto-naprawa/",
    backendUrl: "/demo/auto-naprawa/portal/?role=manager",
    primaryLabel: "Zobacz stronę",
    secondaryLabel: "Zobacz zaplecze",
  },
  {
    n: "05",
    name: "RouteFlow Transport",
    type: "Transport i logistyka",
    note: "Projekt koncepcyjny, demonstracja",
    description: "Odrębny serwis i Control Tower dla zleceń, kierowców, dokumentów oraz wyników firmy.",
    imageUrl: "/demo/routeflow/assets/transport-hero.png",
    websiteUrl: "/demo/routeflow/",
    backendUrl: "/demo/routeflow/portal/?role=manager",
    primaryLabel: "Zobacz stronę",
    secondaryLabel: "Zobacz zaplecze",
  },
];

export type CorePackage = {
  level: string;
  title: string;
  kind: string;
  slug: string;
  priceNet: number;
  price: string;
  priceGross: string;
  time: string;
  lead: string;
  includes: string[];
  texts: string;
  limits: string;
};

export const corePackages: CorePackage[] = [
  {
    level: "POZIOM 1 Z 4",
    title: "Wizytówka",
    kind: "Jedna strona, 3 sekcje",
    slug: "wizytowka",
    priceNet: 899,
    price: "od 899 zł netto",
    priceGross: "1 105,77 zł brutto",
    time: "2–4 dni robocze od przekazania materiałów",
    lead: "Dla firmy, która chce być widoczna w internecie i łatwa do znalezienia.",
    includes: [
      "jedna strona z 3 sekcjami: oferta, o firmie i kontakt",
      "dopasowanie do Twojego logo i kolorów",
      "przycisk do dzwonienia, adres e-mail i mapa dojazdu",
      "wersja na telefon, tablet i komputer",
      "podstawowe ustawienia pod Google: tytuł, opis, nagłówki i mapa witryny",
      "certyfikat SSL oraz hosting bez opłat miesięcznych",
      "podłączenie domeny i publikacja",
      "jedna runda poprawek",
    ],
    texts: "Teksty i zdjęcia dostarczasz Ty, a my poprawiamy je i układamy na stronie.",
    limits: "Pakiet nie obejmuje formularza kontaktowego ani pisania tekstów od zera. Oba można dobrać jako dodatek.",
  },
  {
    level: "POZIOM 2 Z 4",
    title: "Strona jednostronicowa",
    kind: "Jedna przewijana strona, 6–7 sekcji",
    slug: "jednostronicowa",
    priceNet: 1449,
    price: "od 1 449 zł netto",
    priceGross: "1 782,27 zł brutto",
    time: "7–14 dni roboczych",
    lead: "Dla małej firmy, która chce pokazać pełną ofertę i dostawać zapytania.",
    includes: [
      "wszystko z Wizytówki",
      "6–7 sekcji, na przykład usługi, o nas, realizacje, opinie, pytania i kontakt",
      "formularz kontaktowy z powiadomieniem na e-mail",
      "przycisk WhatsApp oraz klikalny telefon w menu",
      "indywidualnie dobrany układ, zamiast gotowego szablonu",
      "dwie rundy poprawek",
    ],
    texts: "Teksty piszemy my, na podstawie krótkiej ankiety o Twojej firmie.",
    limits: "Wszystko mieści się na jednej przewijanej stronie. Osobne podstrony dla każdej usługi są dostępne od poziomu 3.",
  },
  {
    level: "POZIOM 3 Z 4",
    title: "Strona firmowa",
    kind: "Do 6 podstron",
    slug: "firmowa",
    priceNet: 2999,
    price: "od 2 999 zł netto",
    priceGross: "3 688,77 zł brutto",
    time: "10–14 dni roboczych",
    lead: "Dla firmy z kilkoma usługami, która chce mieć osobną podstronę dla każdej z nich.",
    includes: [
      "wszystko ze Strony jednostronicowej",
      "do 6 podstron, na przykład strona główna, trzy usługi, realizacje i kontakt",
      "osobny opis każdej usługi, przygotowany pod wyszukiwanie w Google",
      "galeria realizacji oraz opinie klientów",
      "sekcja pytań i odpowiedzi",
      "formularz zapytań z polami dopasowanymi do Twojej branży",
      "podstawy widoczności lokalnej: dane firmy dla Google i powiązanie z Profilem Firmy Google",
      "statystyki odwiedzin",
      "treści i dane strony przygotowane tak, aby Google oraz asystenci AI łatwo rozumieli, czym się zajmujesz i gdzie działasz",
    ],
    texts: "Teksty przygotowujemy po rozmowie trwającej 15–20 minut albo po wypełnieniu formularza, jeśli wolisz pisemnie.",
    limits: "Panel do samodzielnej edycji, sklep i integracje z innymi systemami wyceniamy osobno.",
  },
  {
    level: "POZIOM 4 Z 4",
    title: "Strona rozbudowana",
    kind: "Do 12 podstron",
    slug: "rozbudowana",
    priceNet: 4499,
    price: "od 4 499 zł netto",
    priceGross: "5 533,77 zł brutto",
    time: "3–4 tygodnie",
    lead: "Dla firmy z szeroką ofertą, wieloma kategoriami usług lub kilkoma obszarami działania.",
    includes: [
      "wszystko ze Strony firmowej",
      "do 12 podstron",
      "plan strony ułożony pod to, czego klienci szukają w Google",
      "podstrony dla miast lub dzielnic, w których działasz",
      "dział porad lub aktualności, gotowy na kolejne wpisy",
      "osobne formularze dla różnych usług",
    ],
    texts: "Teksty przygotowujemy według wcześniej zaakceptowanego planu strony.",
    limits: "Panel do samodzielnej edycji, integracje oraz zaawansowane funkcje wyceniamy osobno.",
  },
];

export const packageStandards = [
  ["Wygląd", "Projekt dopasowany do firmy i branży. Wizytówka korzysta ze sprawdzonego układu, pozostałe poziomy mają układ dobierany indywidualnie."],
  ["Urządzenia", "Wersja na telefon, tablet i komputer w każdym pakiecie."],
  ["Podstawy SEO", "Tytuły stron, opisy, nagłówki, czytelne adresy, mapa witryny i ustawienia indeksowania, odpowiednio do zakresu."],
  ["Hosting", "Hosting bez opłat miesięcznych na naszej infrastrukturze, wraz z certyfikatem SSL."],
  ["Domena", "Rejestrowana na Ciebie, Ty jesteś jej właścicielem. Koszt domeny pokrywasz według cennika rejestratora."],
  ["Publikacja", "Podłączenie uzgodnionej domeny, uruchomienie HTTPS i testy działania przed startem."],
  ["Poprawki", "Jedna runda w Wizytówce, dwie rundy w pozostałych pakietach."],
  ["Po publikacji", "30 dni drobnych poprawek oraz 3 miesiące bezpłatnego usuwania błędów w naszym wykonaniu."],
  ["Przekazanie", "Dostępy, krótka instrukcja i przeniesienie praw do projektu po zapłacie całości."],
] as const;

export const monthlyServices = [
  {
    title: "Opieka nad stroną",
    price: "od 79 zł",
    unit: "miesięcznie netto",
    lead: "Kontrola dostępności strony, certyfikatu SSL i terminu domeny oraz zgłaszanie zauważonych problemów.",
    note: "Zmiany treści, naprawy i obsługa systemów CMS wyceniane są osobno.",
    href: "/opieka-nad-strona",
  },
  {
    title: "Profil Google",
    price: "od 299 zł",
    unit: "miesięcznie netto",
    lead: "2 wpisy w Profilu Firmy Google, kontrola danych firmy, pomoc w odpowiedziach na opinie i krótki raport.",
    note: "Dla firm, które chcą zacząć od samej wizytówki Google.",
    href: "/kontakt?usluga=Profil%20Google",
  },
  {
    title: "Lokalna widoczność",
    price: "od 499 zł",
    unit: "miesięcznie netto",
    lead: "4 wpisy w Profilu Firmy Google, jeden tekst na stronę (400–600 słów), publikacja treści i raport z komentarzem.",
    note: "Nie gwarantujemy konkretnych pozycji w wynikach wyszukiwania, bo decyduje o nich Google.",
    href: "/kontakt?usluga=Lokalna%20widoczno%C5%9B%C4%87",
  },
];

export const moreCapabilities = [
  ["Sklep internetowy", "Sprzedaż online z płatnościami i wysyłką."],
  ["Rezerwacje i płatności", "Klient sam wybiera termin i płaci przez stronę."],
  ["Panel zapytań i klientów", "Wszystkie zgłoszenia w jednym miejscu, ze statusami i terminami."],
  ["Automatyczne powiadomienia", "Przypomnienia SMS i e-mail dla Twoich klientów."],
  ["Asystent na stronie", "Odpowiada na częste pytania, także poza godzinami pracy."],
  ["Materiały do druku", "Wizytówki, ulotki i katalogi spójne ze stroną."],
] as const;

export const socialLinks = {
  facebook: "https://www.facebook.com/zielonamarka",
  instagram: "https://www.instagram.com/zielona.marka.pl/",
  github: "https://github.com/lukaszst-cz",
};

export const processSteps = [
  ["01", "Brief i cel", "Krótka rozmowa, najważniejszy problem i ustalenie zakresu."],
  ["02", "Struktura i treści", "Porządkujemy ofertę oraz decydujemy, co klient ma zrobić na stronie."],
  ["03", "Jeden kierunek projektu", "Otrzymujesz konkretny układ strony i widok mobilny do akceptacji."],
  ["04", "Wdrożenie", "Powstaje działająca strona, formularze, kontakt i uzgodnione funkcje."],
  ["05", "Testy jakości", "Sprawdzam telefon, komputer, linki, formularze, szybkość i podstawy SEO."],
  ["06", "Odbiór, 70% i publikacja", "Po akceptacji i rozliczeniu pozostałych 70% publikujemy stronę, przekazujemy dostępy i instrukcję. Przez 30 dni wprowadzamy drobne poprawki, a przez 3 miesiące usuwamy błędy."],
] as const;

export type AddOn = { title: string; scope: string; price: string; text: string; featured?: boolean };

export const addOns: AddOn[] = [
  { title: "Teksty po rozmowie lub mailu", scope: "Wizytówka", price: "+249 zł", text: "Piszemy teksty na podstawie krótkiej rozmowy albo maila o Twojej firmie. W wyższych pakietach teksty są już w cenie.", featured: true },
  { title: "Formularz kontaktowy", scope: "Wizytówka", price: "+149 zł", text: "Formularz z powiadomieniem na e-mail. Od Strony jednostronicowej jest w cenie pakietu.", featured: true },
  { title: "Dodatkowa sekcja", scope: "Wizytówka, Jednostronicowa", price: "+149 zł", text: "Kolejna sekcja na stronie, na przykład realizacje, opinie albo pytania i odpowiedzi.", featured: true },
  { title: "Teksty pod Google i asystentów AI", scope: "Wizytówka, Jednostronicowa", price: "+290 zł", text: "Treści, nagłówki i dane strony ułożone tak, aby Google i asystenci AI łatwo rozumieli, czym się zajmujesz i gdzie działasz. W Stronie firmowej i rozbudowanej jest w cenie.", featured: true },
  { title: "Powiązanie z Profilem Firmy Google", scope: "Wizytówka, Jednostronicowa", price: "+149 zł", text: "Spójne dane firmy, mapa, link do opinii i dane strukturalne. W Stronie firmowej i rozbudowanej jest w cenie.", featured: true },
  { title: "Galeria realizacji", scope: "Wizytówka, Jednostronicowa", price: "+199 zł", text: "Galeria zdjęć Twoich realizacji z opisami." },
  { title: "Dodatkowa podstrona z tekstem", scope: "Firmowa, Rozbudowana", price: "+349 zł", text: "Kolejna podstrona z tekstem, zdjęciami i wpisem w mapie witryny." },
  { title: "Założenie lub uporządkowanie Profilu Firmy Google", scope: "Wszystkie pakiety", price: "od 390 zł", text: "Weryfikacja, kategorie, opis, usługi i zdjęcia. Wykonywane jednorazowo, niezależnie od pakietu." },
  { title: "Panel do samodzielnej edycji", scope: "Firmowa, Rozbudowana", price: "od 990 zł", text: "Możesz sam zmieniać teksty, zdjęcia i ofertę bez udziału wykonawcy. Zakres zależy od liczby edytowanych elementów." },
  { title: "Wersja w innym języku", scope: "Wszystkie pakiety", price: "od 30% ceny pakietu", text: "Pełna wersja strony w drugim języku wraz z przełącznikiem." },
  { title: "Realizacja ekspresowa", scope: "Wszystkie pakiety", price: "+25%", text: "Skrócony termin wykonania, jeśli kalendarz na to pozwala. Potwierdzamy go przed startem." },
  { title: "Przypomnienia SMS", scope: "Wszystkie pakiety", price: "od 690 zł + koszt SMS", text: "Konfiguracja przypomnień o terminie oraz szablonu wiadomości. Koszt wiadomości rozlicza bramka SMS." },
  { title: "Kopia zapasowa na dysku klienta", scope: "Wszystkie pakiety", price: "od 990 zł + 49 zł/mies.", text: "Automatyczna kopia danych na Twoim dysku Google lub w innym uzgodnionym magazynie, wraz z kontrolą działania." },
  { title: "Asystent odpowiadający na pytania", scope: "Wszystkie pakiety", price: "od 2 500 zł + od 199 zł/mies.", text: "Odpowiedzi z zatwierdzonej bazy wiedzy i przekazanie kontaktu człowiekowi. Miesięczna część obejmuje obsługę techniczną." },
  { title: "Mini sklep (3–10 produktów)", scope: "Osobny projekt", price: "3 499–5 499 zł", text: "Koszyk, jeden operator płatności i proste formy dostawy. Sprzedawcą pozostaje firma klienta." },
  { title: "Mały CRM", scope: "Osobny projekt", price: "od 4 900 zł", text: "Klienci, zapytania, statusy, terminy, eksport danych i wersja na telefon." },
  { title: "Materiały do druku (DTP)", scope: "Osobna usługa", price: "od 79 zł", text: "Wizytówki, ulotki i pliki do druku. Druk jest rozliczany osobno." },
];
