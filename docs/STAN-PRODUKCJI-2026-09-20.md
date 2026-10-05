# Zielona Marka: najnowsza wersja, 2026-09-20

Status: OPUBLIKOWANA I SPRAWDZONA w zakresie opisanym poniżej.
Produkcja: https://zielona-marka.pl/
Cloudflare Version ID: 85640ba8-348b-419e-bca9-cc54007df764

## Zmiany tego wydania
- Usunięto dodatkową lewą osłonę i rozmyty panel tekstu na polskiej stronie głównej. Naturalnie ciemny fragment filmu pozostaje częścią ujęcia.
- Logo bez poświaty po najechaniu; PL/EN jako czytelny przełącznik bez świecenia.
- Jaśniejsze i pogrubione menu, ciemna półprzezroczysta górna belka.
- Poprawiona typografia i czytelność hero; spokojniejsze animacje i reakcje projektów.
- Paproć, mech i płynący potok pozostają na stronie.

## Faktycznie wykonane kontrole
- Zapisany build zawiera ostatnie zmiany źródeł.
- 5/5 testów rendered-html i local-city-grammar zaliczonych.
- Audyt produkcji: 27 stron, 68 linków, issues: [].
- Przegląd hero na komputerze i telefonie 390 px, brak poziomego przewijania.
- Logo hover: brak box-shadow/filter; reduced-motion: wyłączona animacja wejścia.
- Odczyt na produkcji: obie osłony wyłączone, wideo readyState 4 i odtwarzane.
- To wydanie dotyczy wyglądu. Nie wykonano ponownie pełnego testu wysyłki e-mail, płatności ani zewnętrznych integracji.

## Źródło i odtworzenie
Aktualny katalog: C:\Users\User\OneDrive\Documents\ChatGPT\PRACA\zielona-marka-full-fix
Prototypy V05/V06 i wcześniejsze wpisy są historyczne, nie zastępują tego wydania.
Kod: ZIELONA-MARKA-KOD-FINAL-2026-09-20.zip (app, db, worker, konfiguracja, lockfile, testy, dokumentacja).
Osobne istniejące archiwa obrazów, demonstracji i części filmu pozostają w folderze Drive.
Archiwum kodu nie zawiera public, node_modules, bazy danych, poświadczeń ani sekretów. Nie jest samodzielną kopią całego konta Cloudflare.
Pełny katalog public pozostaje lokalnie. Nie zakładać, że wcześniejsze paczki mediów obejmują każdy historyczny plik public.

1. Rozpakuj kod do osobnego katalogu. Odtwórz public z kopii mediów, zachowując ścieżki.
2. Film połącz binarnie z part1 i part2 do public/brand-review-v5/fern-moss-stream-20260919.mp4.
3. Wymagany Node >=22.13 oraz npm ci z package-lock.json.
4. Uruchom lokalny vinext build, następnie node --test tests/rendered-html.test.mjs tests/local-city-grammar.test.mjs.
5. Sprawdź wizualnie stronę, kontakt i mobile, dopiero potem wrangler deploy --no-bundle --config wrangler.jsonc.
6. Dostęp Cloudflare i konfigurację sekretów odtwórz oddzielnie, nie zapisuj ich w archiwum.
7. Po wdrożeniu: node scripts/audit-public-html.mjs https://zielona-marka.pl i kontrola w przeglądarce.

## Zasady dalszej pracy
Zachować czytelność, naturalne tło i spokojne efekty. Nie przywracać lewej zasłony ani poświat logo/języka.
Zachować zapas 7% limitu pięciogodzinnego, kontrolować go przed większym etapem.
Nie oznaczać publikacji lub kopii jako zakończonych bez odczytu wyniku.
