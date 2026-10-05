# Zielona Marka 1.1.0, kopia i odtworzenie

Data przygotowania: 2026-10-01  
Status produkcji: opublikowana i zweryfikowana  
Adres: https://zielona-marka.pl/  
Cloudflare Worker: `zielona-marka`  
Identyfikator wdrożenia: `af2047b0-eae2-4f0a-8a83-90c39a248d49`

## Co jest źródłem prawdy

1. Aktualny kod, treści, media, konfiguracja, testy i dokumentacja znajdują się w pakiecie `ZIELONA-MARKA-1.1.0-ODTWORZENIE-2026-10-01.zip`.
2. Plik `00_AKTUALNA_WERSJA.txt` wskazuje bieżące wydanie.
3. Plik `00_STAN-PRODUKCJI-ZIELONA-MARKA-1.1.0-2026-09-30.md` opisuje publikację i wyniki kontroli.
4. Starsze paczki są archiwalne i nie powinny zastępować wydania 1.1.0.

## Zakres pakietu

Pakiet zawiera kod aplikacji, treści, media, konfigurację Cloudflare, migracje D1, testy, skrypty kontrolne i dokumentację. Nie zawiera `node_modules`, katalogów wynikowych `.next`, `.vinext`, `dist`, `.wrangler`, repozytorium `.git`, logów ani wartości sekretów.

## Wymagania do odtworzenia

- Windows PowerShell,
- Node.js w wersji co najmniej 22.13,
- konto Cloudflare z dostępem do domeny `zielona-marka.pl`, Workera i bazy D1,
- zależności instalowane na podstawie `package-lock.json`,
- wartości sekretów przechowywane wyłącznie w Cloudflare, a nie w archiwum.

Konfiguracja infrastruktury:

- Cloudflare account ID: `e706b41950d232c8fd95da6db0ac0d88`,
- D1 binding: `DB`,
- D1 database: `zielona-marka-db`,
- D1 database ID: `19eab308-f2a5-49c3-b122-9fde4d2907ac`,
- trasy: `zielona-marka.pl/*` i `www.zielona-marka.pl/*`.

## Sekrety wymagane w Cloudflare

Należy odtworzyć nazwy poniżej, ale ich wartości pozyskać z bezpiecznego menedżera haseł lub panelu właściciela. Nie wpisywać wartości do dokumentacji ani archiwum.

- `STUDIO_PASSWORD`,
- `STUDIO_SESSION_SECRET`,
- `RESEND_API_KEY`,
- `INQUIRY_NOTIFICATION_TO`,
- `INQUIRY_NOTIFICATION_FROM`.

Opcjonalnie środowisko może używać `SITE_URL`; na produkcji adresem jest `https://zielona-marka.pl`.

## Odtworzenie lokalne

1. Rozpakować archiwum do nowego katalogu.
2. Otworzyć PowerShell w katalogu projektu.
3. Zainstalować zależności: `npm ci`.
4. Zbudować stronę: `npm run build`.
5. Sprawdzić TypeScript: `.\\node_modules\\.bin\\tsc.cmd --noEmit`.
6. Uruchomić testy: `node --test tests\\rendered-html.test.mjs tests\\site-refinements.test.mjs`.
7. Uruchomić podgląd lokalny i ręcznie sprawdzić stronę główną, ofertę, realizacje, poradnik, formularz, widok mobilny i Studio.

## Odtworzenie Cloudflare

1. Zalogować Wrangler: `.\\node_modules\\.bin\\wrangler.cmd whoami`.
2. Potwierdzić konto, bazę D1, domenę i routing z `wrangler.jsonc`.
3. Potwierdzić obecność wymaganych sekretów: `.\\node_modules\\.bin\\wrangler.cmd secret list`.
4. Jeżeli sekretu brakuje, ustawić go interaktywnie poleceniem `.\\node_modules\\.bin\\wrangler.cmd secret put NAZWA_SEKRETU`. Nie wklejać wartości do logów.
5. Zbudować projekt: `npm run build`.
6. Publikować dopiero po akceptacji właściciela: `.\\node_modules\\.bin\\wrangler.cmd deploy --no-bundle --config wrangler.jsonc`.
7. Zapisać nowy identyfikator wdrożenia w dokumentacji i na karcie Notion.

## Kontrola po publikacji

- otworzyć publicznie `/`, `/oferta`, `/realizacje`, `/kontakt`, `/poradnik` i oba poradniki,
- sprawdzić `/sitemap.xml`, `/robots.txt` oraz `/poradnik/rss.xml`,
- sprawdzić wersje 390 px i 1440 px,
- potwierdzić przekierowanie `www` do domeny głównej,
- potwierdzić `noindex, nofollow` dla Studio,
- sprawdzić stronę 404,
- wykonać kontrolowane zgłoszenie formularza tylko za zgodą właściciela,
- nie uznawać samego HTTP 200 za pełny odbiór wizualny.

## Dane, które trzeba zachować poza archiwum

- dostęp do Cloudflare i DNS,
- bezpieczne wartości sekretów,
- dostęp do Resend i docelowej skrzynki e-mail,
- kopię bazy D1 lub możliwość jej eksportu,
- prawa do użytych zdjęć i materiałów,
- kartę projektu w Notion i kopię na Dysku Google.

## Integralność pakietu

Rozmiar i SHA-256 zostaną dopisane po utworzeniu archiwum. Przed odtworzeniem należy porównać sumę poleceniem:

`Get-FileHash -Algorithm SHA256 .\\ZIELONA-MARKA-1.1.0-ODTWORZENIE-2026-10-01.zip`

## Zasada wersjonowania

- `1.1.0` jest aktualną najważniejszą wersją produkcyjną,
- wersje o niższym numerze są archiwalne,
- następne zatwierdzone wydanie otrzymuje wyższy numer,
- nie nadpisywać starej kopii bez zachowania jej jako archiwalnej; aktualizować plik „aktualna wersja” i tworzyć nową paczkę oznaczoną datą.
