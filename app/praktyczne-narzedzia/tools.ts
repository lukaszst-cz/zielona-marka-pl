export type PracticalTool = {
  category: "narzedzia" | "programy";
  name: string;
  status: "bezpłatne narzędzie online" | "bezpłatna demonstracja" | "bezpłatny kod i dokumentacja" | "bezpłatny pilot PWA" | "program dla Windows · stabilne wydania" | "program Windows · wydanie testowe" | "aplikacja Android · wydanie testowe" | "aplikacja PWA na telefon i komputer";
  problem: string;
  benefit: string;
  freeDetails: string;
  imageUrl: string;
  logoUrl?: string;
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
    category: "programy",
    name: "Aktywnik+",
    status: "bezpłatny pilot PWA",
    problem: "Dzieci chętniej wracają do ruchu, kiedy mogą zapamiętać własne małe przygody, bez rankingu, presji i porównywania z innymi.",
    benefit: "Aktywnik+ zamienia wpisy o aktywności w przyjazny dziennik dla dziecka i rodziny. Dziecko widzi swój tydzień, a rodzic ma osobną, chronioną PIN-em strefę z przeglądem i raportami.",
    freeDetails: "Pilot jest bezpłatny. To aplikacja PWA, więc działa w przeglądarce na komputerze, telefonie i tablecie. Przed wykorzystaniem w szkole trzeba zapoznać się z warunkami pilota.",
    imageUrl: "/program-aktywnik-plus-photo-v3.png",
    logoUrl: "/aktywnik-plus-wordmark.svg",
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
    imageUrl: "/program-docpilot-photo-v3.png",
    logoUrl: "/docpilot-icon.png",
    primaryUrl: "https://github.com/lukaszst-cz/docpilot",
    primaryLabel: "Pobierz DocPilot z GitHuba",
    repositoryUrl: "https://github.com/lukaszst-cz/docpilot",
    scope: ["OCR i wyszukiwanie", "terminy oraz akcje", "lokalne przechowywanie danych", "Windows: instalator i wersja przenośna"],
  },
  {
    category: "programy",
    name: "SpokojnyPC+",
    status: "program Windows · wydanie testowe",
    problem: "Stan komputera jest zwykle rozproszony między ustawieniami, procesami, autostartem i komunikatami systemu, więc trudno spokojnie ocenić, co naprawdę wymaga uwagi.",
    benefit: "Pokazuje lokalny wynik kondycji urządzenia, porównuje pomiary z własnym baseline, wyjaśnia odchylenia i prowadzi do bezpiecznych działań zamiast agresywnego czyszczenia.",
    freeDetails: "Dostępna jest wersja testowa 3.2.0 RC1 dla Windows. Kod źródłowy pozostaje prywatny; publicznego instalatora nie udostępniam jeszcze na tej stronie.",
    imageUrl: "/program-spokojny-pc-plus-photo-v3.png",
    logoUrl: "/spokojny-pc-plus-icon.svg",
    primaryUrl: "/spokojny-pc-plus",
    primaryLabel: "Poznaj SpokojnyPC+",
    scope: ["wynik kondycji i lokalny baseline", "RAM, dysk, sieć, bateria i bezpieczeństwo", "Startup Radar oraz historia zmian", "Windows 3.2.0 RC1 i osobna aplikacja Android RC1"],
  },
  {
    category: "programy",
    name: "SpokojnyMobile+",
    status: "aplikacja Android · wydanie testowe",
    problem: "Informacje o stanie telefonu są rozproszone, a wiele aplikacji obiecuje czyszczenie zamiast spokojnego wyjaśnienia problemu.",
    benefit: "Pokazuje lokalną ocenę kondycji telefonu, dane o pamięci, baterii i sieci oraz podpowiada bezpieczne kroki. DeviceLink pozwala połączyć znane urządzenia po potwierdzeniu.",
    freeDetails: "Bezpłatny APK Android 1.0.0 RC1 dla arm64 pobierzesz z osobnego publicznego repo. To wersja testowa podpisana w trybie debug, nie stabilne wydanie. Na stronie wydania jest suma SHA-256 i opis ograniczeń.",
    imageUrl: "/program-spokojny-pc-plus-photo-v3.png",
    logoUrl: "/spokojny-pc-plus-icon.svg",
    primaryUrl: "https://github.com/lukaszst-cz/spokojny-mobile-plus-download/releases/tag/v1.0.0-rc1",
    primaryLabel: "Pobierz APK testowy z GitHuba",
    repositoryUrl: "https://github.com/lukaszst-cz/spokojny-mobile-plus-download",
    scope: ["Android 1.0.0 RC1", "Smart Check i lokalny wynik", "pamięć, bateria i sieć", "DeviceLink z potwierdzeniem parowania"],
  },
  {
    category: "programy",
    name: "CzyToŚciema?",
    status: "aplikacja PWA na telefon i komputer",
    problem: "Podejrzane wiadomości, linki, zdjęcia i kody QR trudno ocenić pod presją czasu.",
    benefit: "Pomaga zauważyć sygnały ostrzegawcze, wyjaśnia ograniczenia oceny i proponuje bezpieczny następny krok. Analiza treści odbywa się lokalnie.",
    freeDetails: "Bezpłatny kod i instrukcja są na GitHubie. Aplikacja działa w przeglądarce, także offline po pełnym pobraniu potrzebnych plików. Wynik nie potwierdza bezpieczeństwa wiadomości.",
    imageUrl: "/program-czy-to-sciema-photo-v3.png",
    logoUrl: "/czy-to-sciema-icon.svg",
    primaryUrl: "https://github.com/lukaszst-cz/czy-to-sciema",
    primaryLabel: "Zobacz aplikację i kod",
    repositoryUrl: "https://github.com/lukaszst-cz/czy-to-sciema",
    scope: ["SMS i e-mail", "linki i kody QR", "obrazy i lokalny OCR", "PWA na telefon, tablet i komputer"],
  },
  {
    category: "programy",
    name: "Fleet Ops Desk",
    status: "bezpłatny kod i dokumentacja",
    problem: "Sprawy floty, dokumenty i terminy trudno kontrolować w rozproszonych plikach.",
    benefit: "Pokazuje demonstracyjną ewidencję floty, umów najmu i leasingu, terminów dokumentów oraz podstawową analizę kosztów.",
    freeDetails: "Bezpłatnie dostępny jest kod Python i SQLite, instrukcja uruchomienia lokalnego oraz anonimowe dane demonstracyjne. To projekt pokazowy, a nie gotowy system dla firmy.",
    imageUrl: "/program-fleet-ops-desk-photo-v3.png",
    logoUrl: "/fleet-ops-desk-icon.svg",
    primaryUrl: "https://github.com/lukaszst-cz/fleet-ops-desk",
    primaryLabel: "Zobacz kod i instrukcję",
    repositoryUrl: "https://github.com/lukaszst-cz/fleet-ops-desk",
    scope: ["ewidencja floty", "terminy dokumentów", "umowy i koszty", "lokalne uruchomienie kodu"],
  },
];
