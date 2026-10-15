# Cloudflare Workers Builds — diagnostyka wdrożeń Zielonej Marki

Stan diagnozy: 15 października 2026 r. Ten dokument **nie potwierdza ustalenia przyczyny błędu**: GitHub udostępnia jedynie status integracji Workers Builds, a pełny log należy odczytać w Cloudflare.

## Co wiemy

- Projekt to Vinext + Vite + Cloudflare Workers, a nie statyczny katalog HTML.
- `npm test` uruchamia `vinext build` oraz testy lokalnego Workera.
- W gałęziach przeglądowych `vinext build`, przygotowanie wygenerowanego pliku `dist/server/wrangler.json` i `wrangler deploy --no-bundle --dry-run` potrafią zakończyć się sukcesem; **dry-run nie publikuje** i nie dowodzi, że konto produkcyjne akceptuje upload.
- Workers Builds sukces: `5b07fd5` (15.10); niepowodzenie: nowsze `d3099497` i niektóre wcześniejsze commity. Błędy obserwowano także na gałęziach PR.
- Nie należy przypisywać awarii jednemu arkuszowi CSS bez odczytania fazy błędu i pełnego logu.

## Pierwszy krok: Cloudflare dashboard, tylko odczyt

1. Workers & Pages → Worker `zielona-marka` → Deployments → View Build History.
2. Porównaj ostatni udany build commit `5b07fd5` i nieudany commit `d3099497`. Zanotuj: data, krok błędu (install/build/deploy/upload), polecenia i ostatnie 40–80 linii logu. **Nie kopiuj tokenów, sekretów ani danych użytkowników**.
3. Settings → Build: odczytaj Git branch, Root directory, Node, Build command, Deploy command, Preview deploy command i dostępność odpowiedniego API tokenu. Nie zmieniaj tokenu przed zlokalizowaniem problemu.
4. Nie wykonuj `Retry` w nieskończoność. Jeden retry nieudanego commitu może pomóc odróżnić przejściową usterkę środowiska od powtarzalnej awarii konkretnej komendy.

## Porównanie z repozytorium

W tym projekcie komendy o sprawdzonej składni to:

```bash
npm ci
npm run build
node scripts/prepare-vinext-wrangler-config.mjs
npx --no-install wrangler deploy --config dist/server/wrangler.json --no-bundle --dry-run
```

Poprzedza to prawdziwą publikację. **Nie używaj `--dry-run` jako deploy command produkcyjnego**, ponieważ niczego nie opublikuje.

Jeżeli log pokaże błąd _entry point_, _legacy_env_, błędne ścieżki modłów lub upload mimo poprawnego builda, sprawdź czy ustawienie Cloudflare używa `npx wrangler deploy` (komenda domyślna) zamiast jawnego, wygenerowanego pliku Vinext. Wówczas kandydatem do zweryfikowania na osobnym podglądzie jest:

- Build command: `npm run build` (po instalacji zależności przez Cloudflare).
- Deploy command: `node scripts/prepare-vinext-wrangler-config.mjs && npx --no-install wrangler deploy --config dist/server/wrangler.json --no-bundle --keep-vars`.

To propozycja **warunkowa**, niepotwierdzona konfiguracja obecnego konta Cloudflare. Przed jej zastosowaniem potwierdź, że build rzeczywiście generuje `dist/server/wrangler.json` oraz poprawne bindingi `DB`, `ASSETS`, a deploy nie nadpisze sekretów. Nie zamieniaj komendy Preview i Production bez zrozumienia różnicy.

## Interpretacja logów

| Sygnał | Dalsza kontrola |
| --- | --- |
| `npm ci` / instalacja kończy się błędem | wersja Node/npm, cache, registry, lockfile |
| `vinext build` nie przechodzi | pierwsza linia rzeczywistego błędu bundlera, pamięć i limit czasu |
| `Missing entry-point` lub nie znaleziono `dist` | Build command, Root directory, ścieżka z config i kolejność build → deploy |
| `legacy_env` / konflikt konfiguracji | `prepare-vinext-wrangler-config.mjs`, wersja Wrangler, nazwa Workera |
| błąd `upload`, uprawnień, D1 lub zasobów | bindingi, API token, wielkość pakietu; bez wypisywania sekretów |
| czasami FAIL, czasami SUCCESS bez zmian kodu | powtórzenie identycznego SHA, ewentualnie cache/build environment platformy |

## Odbiór po usunięciu blokady

1. Zielone CI + preflight Workera na **tym samym SHA**, który ma być wdrożony.
2. Udany Cloudflare Workers Build z tym samym SHA.
3. Sprawdzenie produkcji: /, /poradnik, /bezplatna-koncepcja-strony, /oferta, /dtp, /projektuj-strone, PDF, formularz testowany bez danych rzeczywistych.
4. Chromium: 320/390/768/1024/1440 px, pełne zrzuty, działające odnośniki i brak nakładania się interfejsu.
5. Dopiero po tych czynnościach oznacz wdrożenie i wizualny odbiór jako zakończone.

Dokumentacja dostawcy:
- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/
