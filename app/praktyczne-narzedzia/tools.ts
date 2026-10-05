export type PracticalTool = {
  name: string;
  status: "bezpłatne narzędzie online" | "bezpłatna demonstracja" | "bezpłatny kod i dokumentacja";
  problem: string;
  benefit: string;
  freeDetails: string;
  imageUrl: string;
  primaryUrl: string;
  primaryLabel: string;
  repositoryUrl: string;
  scope: string[];
};

export const practicalTools: PracticalTool[] = [
  {
    name: "Lead & Offer Copilot",
    status: "bezpłatne narzędzie online",
    problem: "Zapytanie przychodzi bez części danych, a odpowiedź i oferta powstają pod presją czasu.",
    benefit: "Porządkuje wiadomość, wskazuje braki i przygotowuje szkic do sprawdzenia przez człowieka. Niczego sam nie wysyła.",
    freeDetails: "Bezpłatnie otworzysz narzędzie w przeglądarce i sprawdzisz je na danych testowych. Wdrożenie dla firmy nie jest częścią bezpłatnego dostępu.",
    imageUrl: "/tool-lead-offer-copilot-v2.jpg",
    primaryUrl: "https://lead-offer-zm.pages.dev/",
    primaryLabel: "Otwórz bezpłatne narzędzie",
    repositoryUrl: "https://github.com/lukaszst-cz/lead-offer-copilot",
    scope: ["analiza zapytania", "lista braków", "szkic odpowiedzi", "lokalna kolejka spraw"],
  },
  {
    name: "Document Checker",
    status: "bezpłatne narzędzie online",
    problem: "Przed wysłaniem zestawienia łatwo przeoczyć brakujące pole, błędny e-mail albo rozbieżność kwot.",
    benefit: "Wykonuje wstępną kontrolę CSV, Excela i PDF. Raport pomaga znaleźć miejsca, które nadal trzeba sprawdzić ręcznie.",
    freeDetails: "Bezpłatnie sprawdzisz plik w przeglądarce. Plik jest przetwarzany lokalnie, a wynik nie zastępuje kontroli księgowej ani prawnej.",
    imageUrl: "/tool-document-checker-v2.jpg",
    primaryUrl: "https://document-checker-zm.pages.dev/",
    primaryLabel: "Otwórz bezpłatne narzędzie",
    repositoryUrl: "https://github.com/lukaszst-cz/document-checker",
    scope: ["CSV, Excel i PDF", "NIP, daty i e-mail", "kwoty netto, VAT i brutto", "lokalne przetwarzanie pliku"],
  },
  {
    name: "PrintFlow 360",
    status: "bezpłatny kod i dokumentacja",
    problem: "Oferta, produkcja, jakość, wysyłka i faktura są prowadzone w osobnych plikach, więc trudno zobaczyć cały przebieg zlecenia.",
    benefit: "Pokazuje model Order-to-Cash z portalem PWA, Excelem, KPI i podziałem odpowiedzialności.",
    freeDetails: "Bezpłatnie udostępniony jest kod, opis procesu i materiały demonstracyjne w repozytorium GitHub. Dopasowanie systemu do firmy jest osobnym zakresem.",
    imageUrl: "/tool-printflow-360-v2.jpg",
    primaryUrl: "https://github.com/lukaszst-cz/printflow-360",
    primaryLabel: "Zobacz bezpłatny kod i opis",
    repositoryUrl: "https://github.com/lukaszst-cz/printflow-360",
    scope: ["portal PWA", "44 arkusze Excela", "dashboard KPI", "RACI i materiały QA"],
  },
  {
    name: "TransportFlow 360",
    status: "bezpłatna demonstracja",
    problem: "Dane o trasie, aucie, kierowcy, dokumentach i płatności rozchodzą się między telefonem, wiadomościami i arkuszami.",
    benefit: "Łączy przykład wyceny, realizacji przewozu, dokumentów, faktury i wyników w jednym opisanym procesie.",
    freeDetails: "Bezpłatnie obejrzysz demonstrację na stronie Zielonej Marki oraz kod i dokumentację na GitHubie. Dane, trasy i kwoty są przykładowe.",
    imageUrl: "/tool-transportflow-360-v2.jpg",
    primaryUrl: "/demo/transport",
    primaryLabel: "Otwórz bezpłatną demonstrację",
    repositoryUrl: "https://github.com/lukaszst-cz/transportflow-360",
    scope: ["kalkulator transportowy", "portal PWA", "flota i dokumenty", "Excel i kontrola jakości"],
  },
];

export const additionalProjects = [
  {
    name: "DocPilot",
    status: "bezpłatny program dla Windows",
    purpose: "Porządkuje lokalne dokumenty, odczytuje je przez OCR, pilnuje terminów i pomaga przygotować bezpieczną kopię archiwum.",
    access: "Na GitHubie są instalator Windows, wersja przenośna, sumy kontrolne i instrukcja. Program przechowuje dane lokalnie.",
    url: "https://github.com/lukaszst-cz/docpilot",
  },
  {
    name: "CzyToŚciema?",
    status: "kod i dokumentacja",
    purpose: "Sprawdza podejrzane wiadomości, linki, obrazy i kody QR. Analiza działa lokalnie w przeglądarce.",
    access: "Na tym etapie publicznie pokazuję kod, sposób działania i ograniczenia. Nie kieruję jeszcze do osobnej wersji online.",
    url: "https://github.com/lukaszst-cz/czy-to-sciema",
  },
  {
    name: "Fleet Ops Desk",
    status: "kod demonstracyjnej aplikacji",
    purpose: "Pokazuje ewidencję floty, umowy najmu i leasingu, terminy dokumentów oraz podstawową analizę kosztów.",
    access: "Repozytorium zawiera aplikację Python i SQLite z anonimowymi danymi demonstracyjnymi oraz instrukcję uruchomienia lokalnego.",
    url: "https://github.com/lukaszst-cz/fleet-ops-desk",
  },
] as const;
