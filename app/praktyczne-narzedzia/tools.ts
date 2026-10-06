export type PracticalTool = {
  category: "narzedzia" | "flow" | "programy";
  name: string;
  status: "bezpłatne narzędzie online" | "bezpłatna demonstracja" | "bezpłatny kod i dokumentacja" | "bezpłatny pilot PWA" | "program dla Windows · stabilne wydania" | "program Windows i aplikacja Android w rozwoju" | "aplikacja PWA na telefon i komputer";
  problem: string;
  benefit: string;
  freeDetails: string;
  imageUrl: string;
  primaryUrl: string;
  primaryLabel: string;
  repositoryUrl?: string;
  scope: string[];
};

export const practicalTools: PracticalTool[] = [
  {
    category: "narzedzia",
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
    category: "narzedzia",
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
    category: "flow",
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
    category: "flow",
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
  {
    category: "programy",
    name: "Aktywnik+",
    status: "bezpłatny pilot PWA",
    problem: "Dla siebie, dla rodziny albo pilotażowo dla szkoły czy klubu potrzebny jest spokojny sposób zapisywania aktywności, bez rankingów i porównywania.",
    benefit: "Prowadzi prosty dziennik aktywności w trybie osobistym lub rodzinnym, z widokiem dziecka, lokalnie chronioną strefą rodzica i raportami.",
    freeDetails: "Pilot jest bezpłatny. To aplikacja PWA, więc działa w przeglądarce na komputerze, telefonie i tablecie. Przed wykorzystaniem w szkole trzeba zapoznać się z warunkami pilota.",
    imageUrl: "/program-aktywnik-plus-cover.svg",
    primaryUrl: "https://aktywnik-plus.vercel.app",
    primaryLabel: "Otwórz pilotaż Aktywnik+",
    repositoryUrl: "https://github.com/lukaszst-cz/aktywnik-plus",
    scope: ["tryb dla siebie", "tryb rodzinny z PIN-em rodzica", "wpisy i podgląd tygodnia", "PWA na komputer, telefon i tablet"],
  },
  {
    category: "programy",
    name: "DocPilot",
    status: "program dla Windows · stabilne wydania",
    problem: "Dokumenty, terminy i akcje łatwo rozchodzą się po folderach, e-mailach i prywatnych notatkach.",
    benefit: "Porządkuje lokalne dokumenty, wspiera OCR, wyszukiwanie, terminy oraz bezpieczną automatyzację pracy na plikach.",
    freeDetails: "Na GitHubie są instalator Windows, wersja przenośna, sumy kontrolne i instrukcja. Najnowsze stabilne wydanie to v4.0.0. Dane pozostają lokalnie.",
    imageUrl: "/program-docpilot-cover.svg",
    primaryUrl: "https://github.com/lukaszst-cz/docpilot",
    primaryLabel: "Pobierz DocPilot z GitHuba",
    repositoryUrl: "https://github.com/lukaszst-cz/docpilot",
    scope: ["OCR i wyszukiwanie", "terminy oraz akcje", "lokalne przechowywanie danych", "Windows: instalator i wersja przenośna"],
  },
  {
    category: "programy",
    name: "SpokojnyPC+",
    status: "program Windows i aplikacja Android w rozwoju",
    problem: "Stan komputera jest zwykle rozproszony między ustawieniami, procesami, autostartem i komunikatami systemu, więc trudno spokojnie ocenić, co naprawdę wymaga uwagi.",
    benefit: "Pokazuje lokalny wynik kondycji urządzenia, porównuje pomiary z własnym baseline, wyjaśnia odchylenia i prowadzi do bezpiecznych działań zamiast agresywnego czyszczenia.",
    freeDetails: "Strona portfolio pokazuje aktualny, rzeczywisty zakres: wersję Windows 2.8.0 oraz rozwijany klient Android. Program jest projektowany local-first, bez wymaganego konta i chmury.",
    imageUrl: "/program-spokojny-pc-plus-cover.svg",
    primaryUrl: "/spokojny-pc-plus",
    primaryLabel: "Poznaj SpokojnyPC+",
    scope: ["wynik kondycji i lokalny baseline", "RAM, dysk, sieć, bateria i bezpieczeństwo", "Startup Radar oraz historia zmian", "Windows 2.8.0 i rozwijany klient Android"],
  },
];

export const additionalProjects = [
  {
    name: "CzyToŚciema?",
    status: "aplikacja PWA na telefon, komputer i tablet",
    purpose: "Pomaga ostrożnie ocenić podejrzane SMS-y, e-maile, linki, zdjęcia oraz kody QR bez wysyłania analizowanej treści na serwer.",
    access: "Publiczne repozytorium zawiera kod, opis ograniczeń i aplikację działającą lokalnie w przeglądarce, także offline po pełnym pobraniu.",
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
