# Zielona Marka, stan produkcji 2026-09-29

## Status

- Status wydania: **WDROŻONE I SPRAWDZONE**.
- Adres produkcyjny: https://zielona-marka.pl/
- Cloudflare Worker: `zielona-marka`.
- Identyfikator wdrożenia: `679a27a2-b728-45fa-aa55-411ab132c18e`.
- Źródło robocze: `zielona-marka-full-fix`.
- Data publikacji: 2026-09-29.

## Najważniejsze zmiany

### Strona główna i nawigacja

- Naprawiono nakładanie się pierwszego ekranu na rozwijane menu Oferta. Wszystkie pozycje menu są teraz klikalne.
- Zmniejszono grubość fontu nawigacji, aby menu było lżejsze wizualnie.
- Zachowano zaakceptowany kierunek wizualny: mokre paprocie, głęboka zieleń, białe i limonkowe akcenty oraz spokojny ruch.
- Uporządkowano sterowanie filmem i dźwiękiem strumyka. Dźwięk pozostaje pod kontrolą użytkownika.
- Zamiast dużego zielonego pasa zachowano subtelniejsze przejście między pierwszym i drugim ekranem.

### Bezpłatny materiał na pierwszy kontakt

- Dodano widoczną sekcję: **„Zobacz pierwszą szansę dla swojej firmy. Bezpłatnie.”**
- Przygotowano dwie ścieżki:
  1. bezpłatny mini audyt dla firmy, która ma już stronę,
  2. bezpłatna Mapa Szans dla firmy, która potrzebuje kierunku i połączenia strony z obsługą zapytań.
- Teksty opisują korzyść dla klienta, zakres materiału i brak zobowiązania do dalszej współpracy.
- Dodano przykładowy mini audyt Zielonej Marki i przykładową Mapę Szans.
- Na telefonie przyciski kontaktowe nie zasłaniają tej sekcji.

### Portfolio i zaplecza techniczne

- Ujednolicono prezentację zaplecza technicznego w projektach Natura Studio, Bistro Forma, Dom Dobry, Auto Naprawa i RouteFlow.
- Zwiększono czytelność bieżącej pracy, automatyzacji, map procesów, rezerwacji, operacji, tras i obciążeń.
- Wzmocniono kontrast kart, przycisków, opisów i elementów na jasnym tle.
- Dodano delikatny ruch kart portfolio po najechaniu.
- Uproszczono nagłówki podstron portfolio i zapleczy, pozostawiając czytelny powrót do strony głównej.
- Zachowano jasne oznaczenie, że prezentowane realizacje są koncepcjami demonstracyjnymi, a nie wdrożeniami klientów.

### Mobile, wydajność i dostępność

- Dodano osobny film mobilny `fern-moss-stream-mobile-20260929.mp4`.
- Rozmiar filmu mobilnego: 497 740 B zamiast 3 522 635 B, czyli około 86% mniej.
- Film mobilny ma rozdzielczość 854 x 480 i zachowuje sześci sekundowy efekt wizualny.
- Zachowano obsługę ograniczenia transferu oraz `prefers-reduced-motion`.
- Najważniejsze elementy dotykowe mają co najmniej 44 px.
- Poprawiono pola wyboru, ustawienia plików cookie, filtry oraz przyciski w zapleczach.
- Sprawdzono układ dla szerokości 390, 768, 850, 851, 1024 i 1440 px.

### SEO i indeksowanie

- `robots.txt` pozwala wyszukiwarkom dotrzeć do stron demonstracyjnych po to, aby odczytać `noindex`.
- Strony demo, studio oraz status mają `noindex, nofollow`.
- Prywatne i demonstracyjne ścieżki są wyłączone z mapy witryny.
- Mapa witryny zawiera 29 stron publicznych.
- Na stronie Oferta dodano dane strukturalne `Service` i `OfferCatalog`.
- Na stronach projektów dodano `CreativeWork` z oznaczeniem koncepcji projektu.
- Zachowano kanoniczne adresy URL oraz indywidualne tytuły i opisy stron.

## Wyniki kontroli wydania

- `vinext build`: zaliczony.
- TypeScript `tsc --noEmit`: zaliczony.
- Testy automatyczne: 12 z 12 zaliczonych.
- Audyt produkcyjny: 29 stron i 78 linków wewnętrznych, 0 wykrytych problemów.
- Menu: brak zasłoniętych lub nieklikalnych pozycji na sześciu sprawdzonych szerokościach.
- Mobilny film: HTTP 200, 497 740 B, poprawne odtwarzanie na telefonie.
- Zaplecza statyczne Auto Naprawa i RouteFlow: HTTP 200 dla wersji katalogowych i `index.html`.
- Strony demo, status i studio: HTTP 200 oraz potwierdzony `noindex, nofollow`.
- Kontrola wizualna strony głównej i nowej sekcji wykonana na telefonie oraz komputerze.

## Pliki dowodowe

- `outputs/verification-20260929/report.json`, raport menu i filmu.
- `outputs/verification-20260929/home-390.png`, podgląd strony głównej na telefonie.
- `outputs/verification-20260929/home-1440.png`, podgląd strony głównej na komputerze.
- `outputs/verification-20260929/free-start-390.png`, sekcja bezpłatnych materiałów na telefonie.
- `outputs/verification-20260929/free-start-1440.png`, sekcja bezpłatnych materiałów na komputerze.
- `outputs/home-v5-qa/production-20260920.json`, aktualny wynik audytu produkcyjnego wygenerowany przez skrypt kontrolny.

## Odtworzenie projektu

1. Rozpakować archiwum do osobnego katalogu.
2. Zainstalować Node.js w wersji co najmniej 22.13.
3. Uruchomić `npm ci`.
4. Uruchomić `vinext build`.
5. Uruchomić `tsc --noEmit`.
6. Uruchomić testy z katalogu `tests`.
7. Sprawdzić stronę lokalnie przed publikacją.
8. Publikować przez Wrangler dopiero po osobnej akceptacji i z prawidłowym dostępem do konta Cloudflare.

Archiwum nie zawiera `node_modules`, katalogu `.git`, lokalnych logów Wranglera ani sekretów konta Cloudflare. Dostęp do Cloudflare i bazy D1 trzeba odtworzyć osobno.

## Poza zakresem wykonanego wydania

- Nie wysłano mapy witryny do Google Search Console.
- Nie uzyskano nowego oficjalnego raportu Lighthouse ani danych CrUX.
- Nie zmieniano Profilu Firmy Google ani kanałów społecznościowych.
- Nie wykonywano testowej wysyłki formularza do prawdziwego odbiorcy.

## Zasada kolejnych zmian

Punktem wyjścia jest wersja produkcyjna z 2026-09-29 i identyfikator wdrożenia `679a27a2-b728-45fa-aa55-411ab132c18e`. Każdą kolejną zmianę należy najpierw pokazać lokalnie, przetestować, zaakceptować, a dopiero potem publikować i zapisać jako nową datowaną wersję.
