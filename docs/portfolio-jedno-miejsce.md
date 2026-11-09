# Portfolio Zielonej Marki: jedna galeria, wiele formatów

Stan roboczy: 9 listopada 2026. Zmiany wyłącznie na gałęzi roboczej, bez publikacji.

## Architektura

- `/portfolio`: pełna galeria z sześcioma filtrami, wyszukiwarką, karuzelą i wyborem projektów.
- `/portfolio/[slug]`: indeksowalna karta projektu, opis, funkcje i link do demonstracji.
- `/portfolio/druk`: skład A4 do zapisania jako PDF w oknie drukowania przeglądarki.
- `/realizacje`: przekierowanie starej listy na `/portfolio`; podstrony `/realizacje/[slug]` nadal działają.
- `/bezplatna-koncepcja-strony`: tylko trzy przykładowe projekty i przycisk do pełnego portfolio.
- Nawigacja główna kieruje do `/portfolio`, osobne landingi usług i demonstracje pozostają dostępne.

## Źródło danych

**Jeden plik**: `app/portfolio/catalog.ts`.

Zawiera wszystkie karty (slug, tytuł, kategoria, branża, opis, szczegóły, funkcje, opcjonalna grafika i link do demonstracji). Korzystają z niego jednocześnie galeria, strony projektów, sitemap i eksport A4.

### Dodanie nowego projektu

1. Skopiuj istniejący wpis w tablicy `portfolioItems`.
2. Ustaw unikatowy `slug`, np. `nowa-strona-dla-sklepu`, i zwięzły `title`.
3. Wybierz `category`: `www`, `gazetki`, `logo`, `przed-po`, `aplikacje` lub `excel`.
4. Wpisz faktycznie potwierdzone `industry`, `summary`, `explanation` i `features`.
5. Jeśli istnieje publiczna demonstracja, dodaj `demoUrl`. Jeśli przygotowano własną grafikę, umieść ją w `public/` i wpisz `image`.
6. Ustaw odpowiedni `status`. `featured: true` umieszcza projekt w karuzeli.
7. Przygotuj PR, sprawdź podgląd mobilny, linki i skład PDF. Dopiero po akceptacji publikuj.

**To wersja z centralnym rejestrem plikowym, nie panel CMS.** CMS z formularzem dodawania bez edycji kodu wymaga osobnego, chronionego zaplecza. Nie łączymy go z istniejącą tabelą projektów klientów bez analizy prywatności.

## Przygotowanie portfolio dla klienta

1. Otwórz `/portfolio`.
2. Wybierz wstępny zestaw: handel i hurtownie, usługi, DTP albo systemy i Excel.
3. Zaznacz lub odznacz poszczególne prace. Możesz zmienić filtr i wyszukiwać, wybór pozostanie zachowany.
4. Kliknij **Otwórz zestaw do PDF**. W oknie drukowania wybierz **Zapisz jako PDF**.
5. Plik PDF można przesłać klientowi jako załącznik. Przyciskiem **Kopiuj link** udostępnisz adres pokazujący wybrane prace.

Jeśli nie wybierzesz żadnych prac, widok druku obejmie cały katalog. Przy licznych projektach zaleca się zestawy branżowe, ponieważ pełny PDF będzie długi.

## Zakres i ograniczenia

- 15 dotychczasowych ilustracji: PION, FORMA, OKRUCH, STYK, GLINA, TROP, SZLAK, ŁODYGA, PALONA, PELETON, POGŁOS, DALEJ, DOBRY KOSZYK, MODUŁ, ZIELONY SEZON.
- Gazetki powiązane ze stronami: NAVORO HURT (8 stron i 17 produktów, wersja zweryfikowana w poprzednich pracach), NEXIO ELEKTRO (16 stron), BUDRIVO, MATERIVO (wariant ekonomiczny).
- Programy, systemy i skoroszyty są opisane zgodnie z zakresem demonstracyjnym. Brak publicznego linku do prywatnego arkusza jest celowy.
- Materiały oparte na koncepcjach fikcyjnych marek nie są przedstawiane jako realizacje wykonane dla klientów.
- Nie publikuj pełnych danych klientów, cen z prywatnych wycen ani materiałów firm rzeczywistych, na które nie ma zgody. Nazwy historyczne są wyłączone z publicznego katalogu.
- Oryginalny biały logotyp SVG został skopiowany z firmowej identyfikacji wizualnej w Google Drive; żaden generator nie odtwarzał go z opisu.

## Kontrola przed publikacją

- Uruchom `npm run lint` i `npm test`.
- Sprawdź strony `/portfolio`, `/portfolio/okruch`, `/portfolio/budrivo`, `/portfolio/druk?projekty=okruch,szlak` oraz wydruk PDF w Chromium.
- Sprawdź mobilność (360, 768 i 1440 px), nawigację klawiaturą i zmniejszony ruch.
- Zweryfikuj wszystkie publiczne `demoUrl` oraz czy opisy gazetek odzwierciedlają aktualne wdrożenia.
- Sprawdź metadane, sitemap, przekierowanie `/realizacje` oraz to, że dokumenty drukowane nie są indeksowane.
- Nie łącz gałęzi z `main` bez zaakceptowania podglądu i możliwości rollbacku.

## Odświeżenie fotografii, 9 listopada 2026

Sześć nowych fotografii koncepcyjnych utworzono specjalnie do demonstracji Zielonej Marki. Pliki są przechowywane lokalnie w repozytorium, bez zależności od adresów generatora. Trzy starsze pliki `public/concept-natura.jpg`, `public/concept-bistro.jpg` i `public/concept-dom.jpg` zostały zastąpione nową zawartością, a `public/portfolio/{black-harbor,solidom,solident}-foto-20261109.webp` są nowymi zasobami dla kart portfolio.

Fotografie są ilustracjami wygenerowanymi do fikcyjnych projektów, nie przedstawiają faktycznych lokali, zrealizowanych budynków ani prac dla rzeczywistych klientów. Nie zastępują autentycznych zrzutów stron BUDRIVO, MATERIVO czy Aktywnik+. Weryfikacja wizualna przed publikacją i akceptacja właściciela strony nadal obowiązują.
