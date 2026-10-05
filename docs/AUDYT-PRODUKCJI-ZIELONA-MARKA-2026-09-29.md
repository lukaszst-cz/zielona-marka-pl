# Audyt opublikowanej strony Zielona Marka

Data audytu: 29 września 2026 r.  
Adres produkcyjny: https://zielona-marka.pl/  
Zakres: SEO techniczne, indeksowanie, wygląd responsywny, menu i interakcje, formularz, wydajność, bezpieczeństwo oraz zaplecza demonstracyjne.

## Wniosek

Opublikowana wersja działa prawidłowo i nie ma obecnie błędów krytycznych wymagających wycofania publikacji. Najważniejsze elementy strony, menu, podstrony oferty, realizacje, formularz, wersja mobilna oraz zaplecza demonstracyjne przeszły kontrole produkcyjne.

Pozostały trzy realne usprawnienia optymalizacyjne. Nie blokują one działania strony:

1. Ograniczyć wczesne pobieranie grafik używanych niżej na stronie głównej, około 902 kB danych.
2. Powiększyć aktywne pole kilku drugorzędnych linków i zgód na telefonie.
3. Ustawić długie cache dla wersjonowanych plików CSS i JavaScript w `/_next/static/`.

## Wyniki audytu

### SEO i indeksowanie

- Sprawdzono 29 publicznych podstron i 78 linków wewnętrznych.
- Nie znaleziono błędów w tytułach, opisach, nagłówkach H1, adresach kanonicznych ani dyrektywach indeksowania.
- `sitemap.xml` zawiera 29 publicznych adresów.
- Strony demonstracyjne, statusowe i techniczne są wyłączone z indeksowania przez `X-Robots-Tag: noindex, nofollow` i nie występują w mapie strony.
- Dane strukturalne JSON-LD są poprawne. Oferta zawiera `Service` i `OfferCatalog`, realizacje zawierają `CreativeWork`.
- Wszystkie kontrolowane adresy produkcyjne zwróciły HTTP 200.

### Wygląd i responsywność

- Wykonano 126 widoków dla 42 tras w szerokościach 390 px, 768 px i 1440 px.
- Nie znaleziono poziomego przewijania, kolizji treści, uciętych napisów, brakujących grafik ani błędów JavaScript.
- Strona główna, oferta, realizacje, Natura Studio i RouteFlow zostały dodatkowo sprawdzone na zrzutach ekranu.
- Animacje są wyłączane przy ustawieniu systemowym ograniczającym ruch.

### Menu i interakcje

- Menu sprawdzono na szerokościach 390, 768, 850, 851, 1024 i 1440 px.
- Wszystkie pozycje menu są widoczne i klikalne. Menu nie jest zasłaniane przez pierwszy ekran strony.
- Obsługa menu klawiaturą działa na telefonie i komputerze, a aktywny element ma widoczne oznaczenie fokusu.
- Okno asystenta otrzymuje fokus, a klawisz Escape zamyka je i przywraca fokus.

### Formularz kontaktowy

- Formularz wysyła dane metodą POST do `/api/inquiries`.
- Wszystkie widoczne pola mają poprawnie przypisane etykiety.
- Pola wymagane są oznaczone, a nieprawidłowe dane są odrzucane z kodem HTTP 400.
- Nie wysłano prawdziwego zapytania, dlatego dostarczenie wiadomości do docelowej skrzynki nie było testowane w tym audycie.

### Zaplecza demonstracyjne

Sprawdzono Natura Studio, Bistro, Dom Dobry, Auto Naprawa, zaplecze transportowe i RouteFlow na komputerze oraz telefonie.

- Wszystkie widoki zwracają HTTP 200.
- Nie ma poziomego przewijania, niedziałających obrazów ani błędów JavaScript.
- Nie znaleziono jasnych, nieczytelnych kafelków ani tekstu mniejszego niż 10 px w głównej części widoku.
- Sekcje „Bieżąca praca”, „Automatyzacja” i „Mapa procesu” są czytelne i mają właściwą hierarchię.

### Wydajność

Pomiar laboratoryjny wykonano w Chromium, po trzy zimne uruchomienia na profil. Profil mobilny symulował ekran 390 x 844 px, opóźnienie 100 ms, pobieranie 4 Mb/s i czterokrotne spowolnienie procesora. Są to pomiary własne, nie oficjalny wynik Lighthouse ani dane CrUX.

| Profil | TTFB | FCP | LCP | CLS | TBT | Transfer |
|---|---:|---:|---:|---:|---:|---:|
| Telefon, mediana | 267 ms | 1 588 ms | 2 320 ms | 0 | 73 ms | 1,72 MB |
| Komputer, mediana | 282 ms | 1 100 ms | 1 916 ms | 0 | 92 ms | 1,22 MB |

Mediana LCP mieści się w zalecanym progu 2,5 s, ale wynik mobilny ma tylko około 180 ms zapasu. Wyniki były zmienne: w jednym zimnym uruchomieniu mobilnym LCP wyniósł 4,0 s, a w jednym uruchomieniu komputerowym 3,04 s. Oznacza to, że strona działa szybko w typowym pomiarze, ale warto jeszcze ograniczyć zasoby pobierane przed wyświetleniem dalszych sekcji.

Mobilny film tła waży około 498 kB i jest odtwarzany poprawnie. To znacznie lżejsza wersja niż film komputerowy o wielkości około 3,52 MB.

Największe zasoby pobierane wcześnie na telefonie:

- `forest-continuous.webp`, około 343 kB,
- `user-stream-tree-optimized.webp`, około 266 kB,
- `concept-natura.jpg`, około 190 kB,
- `stream-water-bottom.webp`, około 104 kB.

Łącznie to około 902 kB. Ich opóźnione ładowanie jest największą pozostałą możliwością poprawy wydajności strony głównej.

### Bezpieczeństwo i cache

- Ruch HTTP jest przekierowywany do HTTPS.
- Wersja `www` jest przekierowywana do głównej domeny.
- Aktywne są HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` i `Permissions-Policy`.
- Film mobilny ma długie cache: `max-age=31536000, immutable`.
- Wersjonowane pliki CSS i JavaScript mają obecnie `max-age=0, must-revalidate`. Dla plików z hashem w nazwie warto ustawić długie cache z `immutable`.
- CSP zawiera `unsafe-inline`. Można w przyszłości przejść na nonce lub hashe, ale to zmiana niskiego priorytetu i wymaga osobnego testu zgodności z frameworkiem.

## Rekomendacje według priorytetu

### Priorytet średni

1. Opóźnić pobieranie grafik używanych niżej na stronie głównej. Cel: zmniejszenie transferu początkowego o maksymalnie około 902 kB oraz większy zapas dla LCP na wolniejszych telefonach.
2. Powiększyć efektywne pole kliknięcia wybranych drugorzędnych odnośników na telefonie, przede wszystkim „Zapytaj o pakiet”, „Zapytaj o zakres”, link przy zgodzie oraz drobne odnośniki w stopce. Główne przyciski już mają prawidłowy rozmiar.

### Priorytet niski

3. Ustawić dla `/_next/static/*` cache `public, max-age=31536000, immutable`.
4. Rozważyć CSP z nonce lub hashami zamiast `unsafe-inline` po osobnych testach.
5. Wykonać jedno kontrolowane, prawdziwe zgłoszenie formularza i potwierdzić odebranie wiadomości w docelowej skrzynce.

## Ograniczenia pomiaru

- Moduł Chrome DevTools MCP nie był dostępny w tej sesji, więc nie można było uruchomić oficjalnego śladu Lighthouse.
- Publiczne API PageSpeed Insights zwróciło HTTP 429 z powodu niedostępnego limitu zapytań.
- Nie uzyskano danych terenowych CrUX ani wyniku Google PageSpeed. Podane liczby pochodzą z bezpośredniego pomiaru laboratoryjnego w Chromium.

## Materiały techniczne

- `outputs/production-audit-20260929/performance.json`
- `outputs/production-audit-20260929/interactions.json`
- `outputs/strict-seo-visual-production-20260929/report.json`
- `outputs/backoffice-review-20260928/production-20260929/report.json`
- zrzuty ekranów telefonu, tabletu i komputera w katalogach audytu

W czasie audytu nie wprowadzono żadnych nowych zmian na produkcji.
