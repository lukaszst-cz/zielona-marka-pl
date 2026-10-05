# Raport publikacji Zielonej Marki

Data: 5 października 2026  
Domena: https://zielona-marka.pl  
Cloudflare Worker: `zielona-marka`  
Wersja Cloudflare: `f877b757-de48-47e2-93b1-3cbc6fd9e473`

## Opublikowany zakres

- poprawki technicznego SEO i linkowania wewnętrznego,
- unikalne treści i metadane lokalnych podstron,
- bezpośrednie przekierowanie `/chatbot-dla-firm` do `/asystent-zapytan`,
- dane strukturalne i uzupełnione informacje o projektach,
- strona `/praktyczne-narzedzia`,
- właściwe odnośniki do demonstracji i repozytoriów GitHub,
- jasne oznaczenie bezpłatnego zakresu narzędzi,
- osobne grafiki dla Lead & Offer Copilot, Document Checker, PrintFlow 360 i TransportFlow 360,
- pomiar rozpoczęcia, próby wysłania, powodzenia i błędu formularza bez zapisywania treści pól,
- odroczone ładowanie filmu strony głównej.

## Weryfikacja przed publikacją

- build zakończony poprawnie,
- 22 z 22 testów zaliczone,
- pełny audyt lokalny: 40 tras, 80 widoków, 0 problemów,
- porównanie 22 niezmienianych podstron z produkcyjną wersją bazową: 0 różnic.

## Weryfikacja po publikacji

- 34 publiczne strony z mapy witryny: bez problemów z metadanymi,
- 85 linków wewnętrznych: bez błędów,
- 45 tras na telefonie, tablecie i komputerze, łącznie 135 widoków: 0 błędów i 0 ostrzeżeń,
- trzy zbyt długie tytuły wyników Google zostały skrócone i ponownie sprawdzone na opublikowanej stronie,
- nowe grafiki projektów: HTTP 200,
- cztery odrzucone zrzuty ekranów: HTTP 404,
- `/chatbot-dla-firm`: bezpośrednie przekierowanie HTTP 308,
- bezpieczny test formularza: niepoprawne dane zostały odrzucone kodem HTTP 400 i niczego nie zapisano.

## Google Search Console

- mapa `https://zielona-marka.pl/sitemap.xml` została ponownie przesłana 5 października 2026,
- Search Console potwierdził: „Mapa witryny została przesłana pomyślnie”,
- przed ponownym zgłoszeniem ostatni odczyt miał status „Sukces” i 32 wykryte strony,
- strona główna była widoczna jako znajdująca się w indeksie Google.

Google potrzebuje czasu na ponowne odwiedzenie mapy i uwzględnienie nowych adresów. Aktualizacja liczby wykrytych stron nie jest natychmiastowa.

## GitHub

- kod znajduje się w repozytorium `lukaszst-cz/zielona-marka-pl`,
- gałąź publikacyjna: `codex/published-unified-2026-10-05`,
- pull request do `main`: https://github.com/lukaszst-cz/zielona-marka-pl/pull/2,
- główna gałąź nie została nadpisana bezpośrednio.

## Czego nie wykonano

- nie wysłano testowego zgłoszenia z prawidłowymi danymi, aby nie tworzyć fałszywego kontaktu w produkcyjnej bazie,
- nie zmieniano danych produkcyjnej bazy D1.

## Strumyk na stronie głównej

Film ze strumykiem jest obecnie ładowany dopiero po pierwszej świadomej interakcji: przewinięciu strony o ponad 48 pikseli, kliknięciu lub naciśnięciu klawisza. To celowa optymalizacja pierwszego ładowania strony. Tryb ograniczonego ruchu i oszczędzanie danych nadal mają pierwszeństwo.

Jeżeli w przyszłości ma ponownie ruszać automatycznie, zmianę należy wykonać w `app/ForestHero.tsx`. Funkcja `update()` wstrzymuje film, dopóki `userIntent.current` ma wartość `false`, a `markIntent()` zmienia tę wartość po interakcji. Bezpieczny wariant przywrócenia automatycznego startu powinien:

1. po pierwszym renderowaniu ustawić zamiar odtworzenia bez wymagania przewinięcia,
2. nadal respektować `prefers-reduced-motion`, `saveData`, widoczność karty i ręczne zatrzymanie filmu,
3. pozostawić lżejszy plik filmu dla telefonów,
4. po zmianie ponownie sprawdzić LCP, ruch mobilny, brak pobrania dźwięku bez decyzji użytkownika i kontrolki zatrzymania filmu.

Ta decyzja powinna zostać opisana również w końcowej dokumentacji Notion jako świadomy kompromis między ruchem tła a szybkością pierwszego ekranu.
