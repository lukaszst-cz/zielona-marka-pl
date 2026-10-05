# Zielona Marka 1.0.1, stan produkcji

Data publikacji: 2026-09-29  
Data zamknięcia dokumentacji: 2026-09-30

## Status

Wersja 1.0.1 została zaakceptowana, opublikowana i zweryfikowana na `https://zielona-marka.pl/`.

- Cloudflare Worker: `zielona-marka`
- Identyfikator wdrożenia: `7471b908-baad-411e-b643-938562261a60`
- Build produkcyjny: OK
- TypeScript: OK
- Testy automatyczne: 14/14

## Zakres wersji 1.0.1

- Dodano długie cache dla wersjonowanych zasobów `/_next/static/*`.
- Odroczono pobieranie niekrytycznych grafik strony głównej.
- Zachowano natychmiastowe tło pierwszego ekranu jako stabilny obraz zastępczy.
- Zachowano lekki film mobilny o rozmiarze 497 740 B.
- Powiększono aktywne pola dotykowe małych elementów na telefonie i tablecie.
- Zachowano zaakceptowany wygląd, menu, przejście między ekranami, sekcję bezpłatnych materiałów, portfolio i zaplecza demonstracyjne.

## Weryfikacja produkcji

- 19 kontrolowanych adresów i zasobów: HTTP 200.
- Strona główna zawiera mini audyt i Mapę Szans.
- Oferta zawiera dane strukturalne `Service` i `OfferCatalog`.
- Realizacja zawiera dane strukturalne `CreativeWork`.
- Widoki demo, status i studio mają `noindex, nofollow`.
- Sitemap: 29 adresów publicznych, bez tras prywatnych i demonstracyjnych.
- `robots.txt`: poprawny.
- Film mobilny jest pobierany po rozpoczęciu pracy sekcji hero.
- Niekrytyczne grafiki drzewa i strumienia nie są pobierane podczas pierwszego renderu.
- Pole zgody formularza ma aktywną wysokość 53 px na widoku 390 px.

## Ograniczenia i dalsze czynności

- Nie wykonano prawdziwej wysyłki formularza do docelowej skrzynki e-mail.
- Nie uzyskano oficjalnego raportu Lighthouse ani danych CrUX.
- Nie wysłano sitemap do Google Search Console.
- Nie zmieniano Profilu Firmy Google ani kanałów społecznościowych.

## Punkt wznowienia

Aktualną produkcją jest wersja 1.0.1 z identyfikatorem wdrożenia `7471b908-baad-411e-b643-938562261a60`. Kolejne zmiany należy rozpocząć od tej wersji, wykonać lokalny podgląd i testy, uzyskać akceptację, opublikować, sprawdzić produkcję i utworzyć nową datowaną paczkę.
