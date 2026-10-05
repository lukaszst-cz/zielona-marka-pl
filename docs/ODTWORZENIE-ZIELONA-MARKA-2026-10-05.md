# Zielona Marka: kompletna instrukcja odtworzenia

Stan kopii: 5 października 2026  
Strona: https://zielona-marka.pl  
Repozytorium: https://github.com/lukaszst-cz/zielona-marka-pl  
Gałąź kopii: `codex/published-unified-2026-10-05`  
Pull request: https://github.com/lukaszst-cz/zielona-marka-pl/pull/2  
Cloudflare Worker: `zielona-marka`  
Wersja wdrożona: `f877b757-de48-47e2-93b1-3cbc6fd9e473`

## Co zawiera kopia

Archiwum zawiera kompletny kod strony, wszystkie publiczne obrazy i filmy, style, podstrony, demonstracje, testy, migracje bazy, konfigurację Cloudflare oraz dokumentację. Jest to źródło pozwalające zbudować stronę ponownie i wdrożyć ją na właściwe konto.

Kopia nie zawiera:

- haseł, tokenów i kluczy API,
- wartości zmiennych środowiskowych,
- produkcyjnej zawartości bazy D1,
- katalogów `node_modules`, `.git`, `dist`, `.wrangler` i `outputs`,
- lokalnych logów i plików tymczasowych.

Brak tych danych jest celowy. Sekrety należy ponownie dodać z bezpiecznego menedżera lub panelu Cloudflare. Nie wolno wpisywać ich do repozytorium ani dokumentacji Notion.

## Wymagania

- Node.js co najmniej 22.13,
- pnpm 11.19.0,
- dostęp do konta Cloudflare obsługującego domenę `zielona-marka.pl`,
- dostęp do bazy D1 `zielona-marka-db`,
- dostęp do repozytorium `lukaszst-cz/zielona-marka-pl`.

## Odtworzenie lokalne

1. Rozpakuj archiwum do nowego katalogu.
2. Otwórz terminal w rozpakowanym katalogu.
3. Włącz właściwą wersję pnpm:

   ```powershell
   corepack enable
   corepack prepare pnpm@11.19.0 --activate
   ```

4. Zainstaluj zależności:

   ```powershell
   pnpm install --frozen-lockfile
   ```

5. Zbuduj stronę i uruchom testy:

   ```powershell
   pnpm test
   ```

6. Uruchom podgląd lokalny:

   ```powershell
   pnpm dev
   ```

7. Sprawdź stronę główną, `/praktyczne-narzedzia`, `/realizacje`, `/poradnik`, formularz kontaktowy i wersję mobilną.

W stanie zapisanym w tej kopii przechodziły 22 z 22 testów.

## Odtworzenie na Cloudflare

1. Zaloguj Wrangler do właściwego konta Cloudflare.
2. Sprawdź w `wrangler.jsonc`, czy Worker nazywa się `zielona-marka`, a wiązanie `DB` wskazuje bazę `zielona-marka-db`.
3. Dodaj wymagane sekrety przez panel Cloudflare lub polecenie `wrangler secret put`. Nie zapisuj ich w plikach projektu.
4. Zbuduj stronę:

   ```powershell
   pnpm run build
   ```

5. Wdróż gotową wersję:

   ```powershell
   pnpm exec wrangler deploy --no-bundle --config wrangler.jsonc
   ```

6. Po wdrożeniu sprawdź publicznie:

   - https://zielona-marka.pl/
   - https://zielona-marka.pl/praktyczne-narzedzia
   - https://zielona-marka.pl/realizacje
   - https://zielona-marka.pl/poradnik
   - https://zielona-marka.pl/sitemap.xml
   - https://zielona-marka.pl/robots.txt

7. Uruchom audyt:

   ```powershell
   node scripts/audit-public-html.mjs https://zielona-marka.pl
   node scripts/strict-seo-visual-audit-20260928.mjs https://zielona-marka.pl
   ```

Weryfikacja wersji zapisanej w kopii objęła 34 publiczne strony, 85 linków i 135 widoków na telefonie, tablecie oraz komputerze. Wynik końcowy: 0 błędów i 0 ostrzeżeń.

## Google Search Console

Mapa https://zielona-marka.pl/sitemap.xml została ponownie przesłana 5 października 2026. Search Console potwierdził prawidłowe przesłanie. Po ponownym wdrożeniu należy zgłosić tę samą mapę i poczekać na ponowne odczytanie adresów przez Google.

## GitHub i sposób dalszej pracy

Aktualna kopia została wysłana na gałąź `codex/published-unified-2026-10-05`. Pull request nr 2 prowadzi do gałęzi `main`. Nie należy nadpisywać `main` na siłę. Zmiany powinny przejść przez pull request oraz test GitHub Actions.

## Strumyk na stronie głównej

Film ze strumykiem jest obecnie uruchamiany po pierwszej świadomej interakcji użytkownika: przewinięciu strony o ponad 48 pikseli, kliknięciu albo naciśnięciu klawisza. Jest to celowa optymalizacja pierwszego ładowania strony.

Kod odpowiedzialny za zachowanie znajduje się w `app/ForestHero.tsx`:

- `userIntent.current` informuje, czy użytkownik wykonał pierwszą interakcję,
- `markIntent()` zapisuje tę interakcję,
- `update()` nie rozpoczyna filmu, dopóki nie ma zamiaru użytkownika,
- próg przewinięcia jest zapisany jako `scrollY > 48`.

Jeżeli strumyk ma ponownie ruszać automatycznie po otwarciu strony, należy zmienić inicjalizację zamiaru odtworzenia albo wywołać go po pierwszym renderowaniu. Trzeba przy tym zachować:

- obsługę `prefers-reduced-motion`,
- oszczędzanie danych `saveData`,
- zatrzymanie filmu, gdy karta nie jest widoczna,
- ręczne zatrzymanie filmu,
- lżejszy plik filmu na telefonach,
- dźwięk dostępny dopiero po kliknięciu użytkownika.

Po zmianie trzeba ponownie sprawdzić szybkość pierwszego ekranu, LCP, pobieranie danych na telefonie, sterowanie filmem i brak automatycznego dźwięku.

## Kontrola integralności archiwum

Po pobraniu kopii porównaj jej sumę SHA-256 z wartością zapisaną w dołączonym pliku `SHA256.txt` i w dokumentacji Notion. Jeżeli wartości są różne, archiwum jest uszkodzone lub nie jest tą samą wersją.

## Powiązane dokumenty

- `docs/RAPORT-PUBLIKACJI-2026-10-05.md`
- `docs/ODTWORZENIE-ZIELONA-MARKA-2026-10-05.md`
- https://zielona-marka.pl
- https://github.com/lukaszst-cz/zielona-marka-pl
- https://github.com/lukaszst-cz/zielona-marka-pl/pull/2

