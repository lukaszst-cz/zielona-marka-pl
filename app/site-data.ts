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
    note: "Projekt koncepcyjny / demonstracja",
    description: "Spokojna strona usługowa z prostą drogą do kontaktu i rezerwacji.",
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
    note: "Projekt koncepcyjny / demonstracja",
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
    note: "Projekt koncepcyjny / demonstracja",
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
    note: "Projekt koncepcyjny / demonstracja",
    description: "Strona warsztatu, portal klienta, kosztorysy, faktury i widok dla kierownika.",
    imageUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/auto-naprawa-preview/assets/workshop-hero.png",
    websiteUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/auto-naprawa-preview/",
    backendUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/auto-naprawa-preview/portal/?role=manager",
    primaryLabel: "Zobacz stronę",
    secondaryLabel: "Zobacz zaplecze",
  },
  {
    n: "05",
    name: "RouteFlow Transport",
    type: "Transport i logistyka",
    note: "Projekt koncepcyjny / demonstracja",
    description: "Odrębny serwis i Control Tower dla zleceń, kierowców, dokumentów oraz wyników firmy.",
    imageUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/transport-preview/assets/transport-hero.png",
    websiteUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/transport-preview/",
    backendUrl: "https://lukaszst-cz.github.io/operations-office-portfolio/transport-preview/portal/?role=manager",
    primaryLabel: "Zobacz stronę",
    secondaryLabel: "Zobacz zaplecze",
  },
];

export const corePackages = [
  {
    label: "PAKIET 01",
    title: "ZM Start",
    price: "od 2 900 zł netto",
    time: "zwykle 7 dni roboczych",
    lead: "Jedna konkretna strona dla lokalnej firmy, która ma prowadzić z Google do telefonu lub zapytania.",
    includes: ["strona One Page z ofertą i kontaktem", "telefon, WhatsApp, mapa i formularz", "podstawy lokalnego SEO i mierzenie zapytań", "testy jakości przed publikacją"],
  },
  {
    label: "PAKIET 02",
    title: "ZM LeadFlow",
    price: "od 4 900 zł netto",
    time: "zwykle 10–14 dni roboczych",
    lead: "Strona i formularz kwalifikujący, dzięki którym firma otrzymuje kompletne zgłoszenia zamiast ogólnych pytań.",
    includes: ["do 6 podstron i indywidualny układ", "formularz z opisem, terminem i możliwością dodania zdjęć", "lokalne SEO, analityka i przygotowanie Profilu Firmy Google", "raport QA i 14 dni wsparcia startowego"],
  },
  {
    label: "PAKIET 03",
    title: "ZM Flow AI",
    price: "od 7 900 zł netto",
    time: "zwykle 14–21 dni roboczych",
    lead: "Strona, formularz i chatbot połączone z prostym obiegiem zapytań w firmie.",
    includes: ["strona oraz formularz kwalifikujący", "chatbot oparty na zatwierdzonej bazie odpowiedzi", "przekazanie zgłoszeń do właściciela lub zespołu", "analityka, testy i wdrożenie z możliwością dalszej rozbudowy"],
  },
];

export const socialLinks = {
  facebook: "https://www.facebook.com/StudioGraficzneZielonaMarka",
  instagram: "https://www.instagram.com/zielona.marka.pl/",
  github: "https://github.com/lukaszst-cz",
};

export const processSteps = [
  ["01", "Brief i cel", "Krótka rozmowa, najważniejszy problem i ustalenie zakresu."],
  ["02", "Struktura i treści", "Porządkujemy ofertę oraz decydujemy, co klient ma zrobić na stronie."],
  ["03", "Jeden kierunek projektu", "Otrzymujesz konkretny układ strony i widok mobilny do akceptacji."],
  ["04", "Wdrożenie", "Powstaje działająca strona, formularze, kontakt i uzgodnione funkcje."],
  ["05", "Testy jakości", "Sprawdzam telefon, komputer, linki, formularze, szybkość i podstawy SEO."],
  ["06", "Odbiór, 70% i publikacja", "Po akceptacji i rozliczeniu pozostałych 70% publikuję stronę na serwerze klienta, przekazuję dostępy, instrukcję i 14 dni wsparcia."],
] as const;
