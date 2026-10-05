# Poprawki po odbiorze właściciela, 15.09.2026

Stan: W TRAKCIE. Poprzednie stwierdzenie ukończenia całego zakresu było błędne. Nie przedstawiać całości jako gotowej.

Zachować zatwierdzone polskie teksty v4, fotograficzny kierunek paproci, wszystkie trasy i oryginały. Bez publikacji, push, produkcyjnej bazy i zewnętrznych zmian.

## Kolejka do zamknięcia

- Naprawić kolizje CSS na stronie głównej. Nazwy klas zostały przeniesione do prefiksu zmh-, ale trwa weryfikacja. Kopie poprzednich plików: outputs/before-feedback-20260915.
- Sceny CRM/relacja: podpisy mieszczą się w ramce, ikony i strzałki mają odrębne style.
- Sekcja współpracy: poprawny blok, zdjęcie Łukasza w czytelnym kadrze, trzy etapy poniżej.
- Dobry grunt: wyższy kontrast i spokojne tło. Instrukcja przewijania: padding po bokach.
- Podmienić uproszczone logo v3 na zamówiony znak z paprocią i automatyzacją. Aktualne polecenie właściciela autoryzuje podmianę. Źródło wariantu: public/brand-review-v5/logo-fern-proof.png, oryginał zachowany.
- Spójne nowe menu i stopka: wszystkie drogi oferty i branż, klient, PL/EN, kontakt i prywatność.
- Przenieść cały publiczny serwis, portfolio i EN do nowej szaty. Zachować indywidualny charakter demo i funkcje prywatnych paneli.
- Testy pełnej długości wszystkich tras: 1440/390/360, brak overflow, czytelność, obrazy, klawiatura, ograniczony ruch, formularz sukces/błąd i odczyt lokalnego CRM, SEO.
- Zaktualizować raport odbioru, uruchomić sprawdzony podgląd, dopiero wtedy zamknąć automat.

Automatyzacja aktywna: zielona-marka-pe-ne-poprawki-i-odbi-r, co godzinę, bieżący wątek. Przy limicie zachować stan i wznowić przy kolejnym uruchomieniu. Nie zużywać resetów bez zgody.

Podgląd node outputs/home-v5-qa/review-server.mjs służy wizualnej kontroli zbudowanej aplikacji, NIE ma bazy. Do formularza użyć wrangler.preview.jsonc z lokalną D1. Poprzedni test z przechwyconym HTTP 200 nie jest dowodem zapisu CRM.

## Postęp 15.09, po testach porannych

- Wprowadzone i skompilowane: prefiks zmh-, SVG paproć/przeglądarka/automatyzacja, wspólne menu i stopka, nowa EN z pięcioma etapami, zdjęcie we współpracy, ramki CRM i relacji, Dobry grunt i padding instrukcji.
- Potwierdzone wizualnie: główna 1440, CRM w stanie po animacji, współpraca ze zdjęciem, stopka, hero 390, mobilna oferta i portfolio. Pomiar całych głównych tras przy 390 i 360: bez overflow z wyjątkiem starego logo na prywatności przy 360.
- Następnie poprawiono prywatność na SiteHeader/SiteFooter oraz kontrast legal-note, booksy-note, workflow-preview-card, crm-phone, etykiet formularza i przypisów kosztów. Te poprawki wymagają końcowego odczytu w przeglądarce.
- Dodano zamykanie menu po wyborze linku, kliknięciu poza menu i Escape. Skorygowano proporcje zdjęcia głównego na 1000x563. Obserwator przycisków obejmuje też stopkę i hero-foot.
- Build po ostatnich poprawkach: OK. 4 testy rendered-html: OK. ESLint zmienionych komponentów: 0 błędów, 3 ostrzeżenia img.
- Formularz HomeContactForm: wysłanie przez przeglądarkę na localhost + komunikat sukcesu + odczyt lokalnej D1 potwierdzone. Rekord id 4, qa-20260915@example.test, status Nowe, wiadomość TEST LOKALNY QA 20260915.
- Lokalna D1: .wrangler/design-test, konfiguracja wrangler.preview.jsonc, migracje aktualne. Serwer wrangler uruchomiony na 127.0.0.1:4180. Serwer node bez bazy wyłączony.
- Pozostałe odbiory: ścieżka błędu formularza, zwykły ContactForm, menu/klawiatura, live zmiana prefers-reduced-motion, no-JS, desktop wszystkich podstron, pozostałe miasta i strony realizacje/[slug], końcowy kontrast i pełne zrzuty tras, linki/SEO.
- NIE UZNANO CAŁOŚCI ZA GOTOWĄ. Nie opublikowano, nie pushowano, nie używano produkcyjnej D1.

## Rezerwa limitu, nowe polecenie właściciela

Zostawić co najmniej 15% każdego limitu konta. Sprawdzać usage, zatrzymać wcześniej z marginesem. Automat zielona-marka-pe-ne-poprawki-i-odbi-r został WSTRZYMANY (PAUSED). Nie wznawiać automatycznie; dalsze wznowienie po decyzji właściciela. Odczyt przed ostatnią partią prac: pozostałe 57% pięciogodzinnego, 34% tygodniowego.

## Punkt zatrzymania, rezerwa 15%

Właściciel polecił zachować 15% limitu. Zatrzymano z marginesem: ostatni odczyt 20% pozostałego limitu pięciogodzinnego i 28% tygodniowego. Automat PAUSED, wznowienie po decyzji właściciela.

Dodatkowo potwierdzone na najnowszym buildzie:
- 360 px: oferta, prywatność, beauty, CRM i kontakt mają overflow = 0. Prywatność korzysta ze wspólnego menu/stopki. Poprawione powierzchnie kart mają tło rgb(12,48,32), etykiety formularzy rgb(230,239,223).
- Zwykły ContactForm: kontrolowana utrata sieci pokazuje błąd i pozwala ponowić. Po przywróceniu sieci poprawny komunikat sukcesu oraz odczyt D1: id 5, qa-brief-20260915@example.test, status Nowe. Nie wysyłano danych na zewnętrzne adresy.
- Przywrócono sieć i standardowy rozmiar przeglądarki po emulacji. Podgląd http://127.0.0.1:4180/ pozostawiony do kontynuacji.

Do wykonania w następnym limicie: pełne zrzuty i końcowy przegląd desktop/mobile wszystkich tras (dotąd są pomiary wielu tras, nie kompletny odbiór wizualny), pozostałe miasta i realizacje/[slug], test menu/Escape/klawiatury, zmiany prefers-reduced-motion w trakcie i no-JS, błąd HomeContactForm, linki/SEO. Sprawdzić w stabilnym widoku ukrywanie pływających przycisków przy stopce: narzędzie zrzutów potrafiło pokazać inną pozycję przewinięcia niż następujący po nim odczyt DOM, więc nie ma końcowego potwierdzenia. Nie deklarować całości gotowej. Nie publikować ani pushować.

## Wznowienie 19.09
Właściciel zniósł rezerwę 15% limitu i polecił pracować do końca. Budżet Higgsfield bez zmian. Dodano zdjęcie nr 5 do kontaktu (oryginał PNG zachowany, WebP 100844 B) i czterozdaniowy opis właściciela na głównej. Build i 4 testy renderowania OK. Lokalny podgląd 4180 działa po uruchomieniu z uprawnieniem do odczytu folderów. Trwa końcowy odbiór i przygotowanie leśnej animacji.
