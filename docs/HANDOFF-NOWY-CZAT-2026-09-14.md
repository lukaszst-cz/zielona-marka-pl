# Kontynuacja Zielonej Marki w nowym zadaniu

14.09.2026. Użytkownik wyraźnie poprosił o dalszą pracę w nowym czacie.

## Zasady i bieżący stan

- Projekt: `C:\Users\User\OneDrive\Documents\ChatGPT\PRACA\zielona-marka-full-fix`, gałąź `codex/organic-home-prototype`, wiele niezatwierdzonych zmian w katalogu roboczym. Nie resetować, nie nadpisywać i nie zaczynać od zera.
- Praca lokalna. NIE publikować, nie pushować, nie wdrażać Cloudflare i nie operować na produkcyjnej bazie.
- Teksty v4 ZATWIERDZONE. Użytkownik wyjaśnił, że nie chce kolejnego audytu ani redakcji. `docs/strona-glowna-teksty-v4.md`. Nie zmieniać nagłówków i akapitów pod pretekstem kolejnego prototypu.
- Uzgodniona oprawa: fotografie mokrych paproci, mocna głębia zieleni, cały długi layout, biało-zielona bezszeryfowa typografia. Referencje: `C:\Users\User\Downloads\strona www_astra_v1.jpeg` i `strona www_astra_v2.jpeg`. Jasna, marmurowa/szeryfowa poprzednia propozycja jest odrzucona.
- Animacja i wizualizacje mają znaczącą rolę. Użytkownik zatwierdził efekt spokojnego filmu prowadzonego scrollem, pokazującego usługi, zapytanie, CRM i opiekę, z zachowaniem kontroli przewijania i czytelności.

## Najnowsze pliki, powstały w aktywnej części starego zadania

- `docs/plan-domkniecia-strony-2026-09-14.md`: menu, kolejność scen i orientacyjny harmonogram. Wspólny nagłówek starej aplikacji przeczytano w `app/SiteChrome.tsx`.
- `public/brand-review-v5/logo-fern-proof.png`: wygenerowany i pokazany użytkownikowi nowy WARIANT logo. Podwójny biały kontur oryginalnego jabłka, motyw przeglądarki/węzłów i linii automatyzacji, paproć zamiast listka, biały napis. To raster z tłem, propozycja, nie finalny dokładny wektor. Nie twierdzić, że sylwetka jest identyczna z oryginałem ani że znak został zaakceptowany. W nowej stronie wciąż jest wcześniejsze logo v3, celowo nie podmieniono go przed oceną.
- Właściwy ORYGINAŁ: `public/logo-zielona-marka-transparent-v1.png`. Widać szeroką otwartą wstęgę jabłka, górny listek i przeglądarkę z węzłami oraz wychodzącymi liniami. Uproszczony znak v3 nie odwzorowuje wszystkich tych elementów. Favicon SVG i facebook-logo SVG są innymi uproszczeniami.
- Logo powstało natywnym imagegen jako edycja oryginału (pierwsze wywołanie miało timeout sandbox runner, ponowienie powiodło się). Natywny plik: `C:\Users\User\.codex\generated_images\01a09a92-7af3-7303-9bf2-a77ad65f5ca6\exec-2177dd97-79e9-4e5b-a32a-d0788b6ffe4e.png`. Skopiowany do projektu. Nie generować kolejnych zdjęć bez potrzeby.
- `public/brand-review-v5/index.html`, `motion.css`, `motion.js`: PIERWSZY DZIAŁAJĄCY podgląd scrollytelling. Generowany skryptem `scripts/build-motion-preview.mjs` na bazie v4. Pięć scen (strona, formularz, zakup, CRM, relacja). Desktop ma sticky panel i płynne przejścia, mobile ujawnia wizualizacje w kolejnych sekcjach. Ruch można wyłączyć, preferencja systemowa i brak JS pozostawiają pełną treść. Delikatne przesunięcie tła. Jest to pierwsza choreografia, nie pełne docelowe wyreżyserowanie wszystkich interakcji.
- Adres: `http://127.0.0.1:4190/brand-review-v5/`. Poprzedni v4: `http://127.0.0.1:4190/brand-review-v4/`. Dotychczasowa właściwa aplikacja działała na `http://127.0.0.1:4180` i nadal ma stary niezaakceptowany layout. V5 nie została jeszcze przeniesiona do React/app.
- Formularz v4/v5 jest oznaczonym podglądem z wyłączoną wysyłką. Starsza aplikacja ma istniejący ContactForm i lokalny backend; trzeba wykorzystać je przy integracji.

## Test właśnie zakończony

`scripts/check-motion-preview.mjs` zakończył się kodem 0. Wszystkie 32 kontrole w `outputs/brand-review-v5/report.json` przeszły: copy v4 zachowane przy 1440/390/360, zero overflow, pięć aktywowanych scen na każdej szerokości, ręczne i systemowe ograniczenie ruchu, obrazy, brak błędów JS, fallback bez JS. Zrzuty scen zapisane w tym samym folderze. WAŻNE: nie obejrzano jeszcze ręcznie tych najnowszych zrzutów v5; to pierwszy krok nowego zadania przed prezentacją podglądu. Nie powtarzać wszystkich testów bez zmiany lub znalezienia problemu.

## Następne kroki

1. Obejrzeć zrzuty v5, poprawić tylko rzeczywiste problemy, pokazać działający podgląd użytkownikowi. Nie czekać na ponowną zgodę na już uzgodnioną pracę.
2. Dokończyć logo wektorowe po ocenie przedstawionego wariantu. Reszta pracy nie zależy od finalnego znaku.
3. Przenieść uzgodnioną stronę i sekwencje do właściwej aplikacji. Zachować oryginalne materiały, adresy, funkcje i SEO. Menu grupuje starą ofertę, nie usuwa podstron. Strefa klienta i PL/EN pozostają dostępne. Porozmawiajmy = telefon +48 450 458 466, zaproszenie do napisania = osobny formularz.
4. Wspólny wygląd podstron, odrębne projekty portfolio, integracja formularza z lokalnym CRM, kontrola dostępności/wydajności/SEO i przekazanie do oceny.
5. Punkt przywrócenia: pełna kopia Google Drive NIEPOTWIERDZONA w ostatnich zapisach, Notion zawiera dokumentację, uploady części archiwum były pending, eksport DNS/reguł Cloudflare miał 403. Nie twierdzić, że kopia jest gotowa. Patrz `docs/redesign-status.md`. W bieżącym kroku nie sprawdzano chmury na żywo.

## Narzędzia i serwery

Node: `C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe`.

Statyczny podgląd 4190: `node scripts/serve-brand-review.mjs` (sesja źródłowa 5349, jeśli przetrwała). Serwuje wyłącznie katalog public i dodaje noindex. Nie restartować bez sprawdzenia czy działa.

Przeglądarka: Playwright z bundled runtime, skrypty istniejące pokazują import. Gdy shell/browser zawiedzie przez sandbox, eskalować zgodnie z instrukcjami, nie obchodzić blokady.

Przed przebudową aplikacji zatrzymać tylko jej własny podgląd wrangler na 4180, bo blokuje dist na Windows. Nie zabijać wszystkich Node. Opis komend w `docs/redesign-status.md`.

## Komunikacja o czasie

Podano wstępnie 12–20 h aktywnej pracy na dokończenie zasadniczej reszty, z wykorzystaniem obecnej aplikacji i istniejących demonstracji, bez czekania na decyzje/dostępy/transfery. To estymacja, nie termin kalendarzowy ani obietnica automatycznej pracy przez noc. Użytkownik chce konkretów i efektów, nie ponawianych planów. Krótkie informacje o realnym postępie, bez ponownego audytu zatwierdzonych tekstów.
