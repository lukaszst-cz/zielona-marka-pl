# ZM-QMS 3.1 — generator raportów QA

**Status:** operacyjny wzór narzędzia, bez certyfikacji ISO.

## Instalacja (Windows i Linux)

1. Zainstaluj Python 3.11 lub nowszy.
2. Uruchom `python -m pip install -r docs/qms/requirements-qms.txt`.
3. Skopiuj `docs/qms/szablony/raport-qms.example.json` do prywatnego folderu projektu i wypełnij **rzeczywistymi** wynikami.
4. Wykonaj `python scripts/qms_report.py --input "Prywatne\projekt.json" --output "Prywatne\raport-qa.pdf"`.
5. Sprawdź PDF, podpisz decyzję o odbiorze we właściwym rejestrze i zarchiwizuj go w prywatnym Drive.

## Mechanizmy ochronne

- Test ma wynik PASS tylko z datą, testerem, metodą i dowodem.
- N/D wymaga uzasadnienia; krytyczne kryterium nie może być automatycznie pominięte.
- Decyzja G2=GO wymaga braku nierozwiązanych HOLD/REWORK/NIE SPRAWDZONO oraz danych autoryzowanej osoby, daty i dowodu decyzji.
- Generator nie wysyła danych do sieci. Wynik zapisuje lokalnie. Nie używaj folderów `public`, `app` ani katalogów publicznej dokumentacji do przechowywania raportów klientów.
- Testy jednostkowe: `python -m unittest discover -s tests -p test_qms_report.py`.

## Notion i Drive

Notion [centrum jakości](https://app.notion.com/p/3fa72bf39ceb8191b992cd091745ec7d), [projekty](https://app.notion.com/p/0134a1bed4e247cdb8aa0e49c11767af), [kontrole](https://app.notion.com/p/f561b22f9a594003940a5862d4923a03), [niezgodności](https://app.notion.com/p/16af5c22758e448cb36f4a782eaa7c45). Każdy rekord powinien podawać ID projektu, wersję, wynik i dowód.

**Ograniczenie automatyzacji:** generator przekształca lokalnie przygotowany JSON w PDF. Bez prywatnych danych uwierzytelniających i skonfigurowanego wyzwalacza nie pobiera samoczynnie rekordów z Notion ani nie publikuje wyników na Drive. Można go uruchamiać na żądanie, używając zebranych danych. Nie uruchamia się autonomicznie przy każdej zmianie rekordu.
