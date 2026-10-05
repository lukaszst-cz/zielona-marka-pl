# Zielona Marka 1.1.0, stan produkcji

Data publikacji: 2026-09-30  
Status: OPUBLIKOWANA I SPRAWDZONA

## Wydanie

- produkcja: `https://zielona-marka.pl/`,
- Cloudflare Worker: `zielona-marka`,
- identyfikator wdrożenia: `af2047b0-eae2-4f0a-8a83-90c39a248d49`,
- build produkcyjny: OK,
- TypeScript: OK,
- testy automatyczne: 19/19.

## Najważniejsze zmiany

- Dodano dział `/poradnik` i dwa poradniki odpowiadające na realne pytania klientów.
- Dodano FAQ, autora, daty, breadcrumbs, indywidualne grafiki Open Graph oraz schema `Article`, `FAQPage`, `BreadcrumbList`, `CollectionPage` i `ItemList`.
- Podpis autora ma formę „Łukasz Staniewicz | Zielona Marka”.
- Dodano kanał RSS `/poradnik/rss.xml` oraz wskazanie go w metadanych.
- Dodano pomocną stronę błędu 404.
- Rozbudowano linkowanie wewnętrzne, mapę witryny i anonimowy pomiar przejść do poradników oraz formularza.
- Poprawiono cztery stare odnośniki do demonstracji.
- Poprawiono kontrast kafelków poradników i mobilne marginesy treści.
- Studio lokalnie pokazuje ekran logowania zamiast błędu 500 przy braku środowiska Cloudflare.
- Endpointy API są wyłączone z indeksowania, a prywatne strony zwracają `noindex, nofollow`.

## Weryfikacja produkcji

- pełny crawl: 32 strony, 82 odnośniki, 0 problemów,
- kontrola responsywna: 38 tras przy 390 px i 1440 px, 76 widoków, 0 problemów,
- strona główna, kontakt, współpraca, poradniki, RSS, sitemap i robots: HTTP 200,
- własna strona błędu: HTTP 404 z działającą nawigacją,
- `www.zielona-marka.pl` przekierowuje 301 do `zielona-marka.pl`,
- Studio zwraca `X-Robots-Tag: noindex, nofollow`,
- niepełne zgłoszenie testowe do API zostało poprawnie odrzucone kodem 400 i nie zapisano go.

## Obsługa przez następne 1–3 miesiące

Strona nie wymaga obowiązkowych zmian układu ani treści. Wystarczy obserwować zapytania i Google Search Console. Nowy poradnik warto dodać dopiero wtedy, gdy odpowiada na rzeczywiste pytanie klienta.

## Czynności zewnętrzne

- zgłoszenie lub ponowne przesłanie sitemap w Google Search Console: do wykonania,
- obserwacja indeksacji nowych poradników: do wykonania przez kolejne tygodnie,
- prawdziwa wysyłka formularza do docelowej skrzynki nie była wykonywana podczas kontroli, aby nie tworzyć fałszywego leada,
- aktualizacja Notion wymaga ponownego uwierzytelnienia połączenia.
