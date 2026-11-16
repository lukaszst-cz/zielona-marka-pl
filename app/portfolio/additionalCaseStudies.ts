/** Opisy pozostałych 31 pozycji portfolio. 
 * Kategorie: modernizacje koncepcyjne, logo, gazetki, aplikacje, Excel.
 * Zapisano stan potwierdzony katalogiem i dokumentacją powiązanych repozytoriów.
 */
import type { WebsiteCaseStudy } from "./websiteCaseStudies";
export const additionalCaseStudies: Record<string, WebsiteCaseStudy> = {
  "pion": {
    "visual": "Makieta modernizacji strony ścianki wspinaczkowej. Zestawiono zagęszczony układ informacyjny z uporządkowaną wersją, w której mocniej wyeksponowano ofertę, godziny otwarcia i kontakt.",
    "flow": "Oglądający porównuje dwa sposoby prowadzenia użytkownika: szukanie najważniejszych informacji w gęstym układzie oraz bezpośrednie odnalezienie oferty i godzin po zmianie hierarchii.",
    "technical": "Przedstawiono zestawienie graficzne przed i po. Oba widoki powstały do tej demonstracji. Nie ma potwierdzenia modyfikacji rzeczywistej witryny ani wdrożenia produkcyjnego.",
    "scope": "Autorska symulacja wizualna modernizacji, bez udziału rzeczywistego klienta."
  },
  "forma": {
    "visual": "Koncepcja odświeżenia strony pracowni ogrodów. W odmienionym wariancie ograniczono ozdobniki, zwiększono znaczenie fotografii projektów i uporządkowano drogę do wyceny.",
    "flow": "Porównanie pomaga zobaczyć, jak zmiana proporcji zdjęć, odstępów i rozmieszczenia przycisków ułatwia przeglądanie realizacji oraz przejście do zapytania.",
    "technical": "Zachowano formę zestawienia dwóch zaprojektowanych makiet. Brak potwierdzonego kodu produkcyjnego, integracji formularza i wdrożenia u istniejącej pracowni.",
    "scope": "Wizualizacja przed i po, przygotowana specjalnie do portfolio."
  },
  "okruch": {
    "visual": "Porównanie wizualnego wizerunku piekarni. W nowej odsłonie czytelniejsza typografia, fotografie wypieków i prostszy układ zastępują zagęszczoną prezentację.",
    "flow": "Klient od razu widzi ofertę piekarni i może szybciej rozpoznać charakter miejsca; porównanie pokazuje wpływ fotografii, proporcji i hierarchii na odbiór strony.",
    "technical": "Obie strony porównania są własnymi koncepcjami graficznymi, nie zrzutami witryny prawdziwej piekarni. Nie potwierdzono działającego sklepu ani systemu zamówień.",
    "scope": "Autorskie studium zmiany kierunku wizualnego, z widokami przed i po."
  },
  "szlak": {
    "visual": "Identyfikacja marki outdoorowej zaplanowana od prostego znaku po materiały firmowe. Pokazano wariant podstawowy i odwrócony oraz umieszczenie logo na metce i wizytówce.",
    "flow": "Znak powinien działać zarówno w małej skali na metce, jak i w większym układzie. Przykłady użycia pokazują czytelność identyfikacji w różnych kontekstach.",
    "technical": "Zakres katalogowy obejmuje koncepcję znaku i wizualizacje zastosowań. Brak potwierdzenia przekazania plików wektorowych, księgi znaku czy produkcji drukowanych materiałów.",
    "scope": "Koncepcyjna identyfikacja wizualna i zestaw makiet jej zastosowania."
  },
  "lodyga": {
    "visual": "Spójny kierunek identyfikacji kwiaciarni, w którym znak, wizytówka oraz opakowania i wstążki tworzą jedną estetykę marki.",
    "flow": "Przykłady ułożenia logo na różnych formatach pokazują, jak marka może towarzyszyć klientowi od wizytówki po wręczenie bukietu.",
    "technical": "W katalogu potwierdzono wizualizację logo oraz materiałów firmowych. Nie zweryfikowano specyfikacji druku, produkcji opakowań ani gotowego systemu plików identyfikacyjnych.",
    "scope": "Autorska koncepcja identyfikacji kwiaciarni."
  },
  "palona": {
    "visual": "Projekt rozpoznawalnego charakteru palarni kawy, rozwinięty na etykiety paczek i elementy materiałów firmowych. Znak zachowuje spójność na małych i dużych nośnikach.",
    "flow": "Projekt przedstawia kontakt z marką przy wyborze opakowania, odczytywaniu etykiety i oglądaniu materiałów promocyjnych.",
    "technical": "Pokazano kierunek graficzny znaku, etykiety i opakowań. Nie potwierdzono realizacji produkcyjnej, specyfikacji fleksografii ani przekazania plików drukarskich.",
    "scope": "Materiał koncepcyjny identyfikacji i opakowań kawy."
  },
  "peleton": {
    "visual": "Sezonowa gazetka sklepu rowerowego z okładką, rozkładówką modeli rowerów i stroną o serwisie. Zdjęcia produktów i ceny podlegają wyraźnej hierarchii.",
    "flow": "Odbiorca najpierw widzi sezonową ofertę, następnie porównuje rowery i poznaje usługi serwisowe. Układ wspiera szybkie skanowanie informacji.",
    "technical": "Przygotowano wizualizację projektu wydawniczego w postaci przykładowych stron. Nie potwierdzono kompletnego, gotowego do drukarni pliku ani rzeczywistych promocji.",
    "scope": "Przykładowa gazetka handlowa, materiał graficzny."
  },
  "poglos": {
    "visual": "Kontrastowy kierunek wydawniczy dla klubu lub wydarzenia muzycznego: mocna okładka, duże kadry i ekspresyjna typografia na rozkładówkach.",
    "flow": "Odbiorca rozpoznaje wydarzenie po okładce, a następnie przegląda szczegóły programu i informacje wizualne w zorganizowanej rozkładówce.",
    "technical": "Katalog potwierdza koncepcyjne projekty okładki i rozkładówki. Nie zweryfikowano pełnego składu, gotowego PDF-u drukarskiego ani realnego wydarzenia.",
    "scope": "Autorski projekt layoutu gazetki muzycznej."
  },
  "dalej": {
    "visual": "Katalog turystyczny wykorzystujący rytm dużych zdjęć kierunków podróży, krótkie bloki redakcyjne i przejrzyste rozkładówki.",
    "flow": "Układ pozwala przeglądać kierunki sezonowe i czytać opisy wyjazdów bez zagęszczonych kolumn tekstu.",
    "technical": "Pokazano koncepcję redakcyjnego składu okładki i rozkładówek. Nie potwierdzono powiązania z prawdziwą ofertą, rezerwacjami ani pełnej wersji do druku.",
    "scope": "Materiał koncepcyjny katalogu biura podróży."
  },
  "dobry-koszyk": {
    "visual": "Gazetka delikatesów z ofertą tygodniową, projektowana pod szybką orientację w cenach. Zdjęcia produktów, wartości cenowe i oznaczenia promocji mają zróżnicowane znaczenie.",
    "flow": "Klient skanuje produkty i ceny w naturalnej kolejności, bez konieczności studiowania długich opisów. Przykładowe ceny nie są rzeczywistą ofertą sklepu.",
    "technical": "Zakres to makiety okładki i rozkładówki produktowej. Nie potwierdzono publikacji rzeczywistej gazetki ani przygotowania kompletu do dystrybucji.",
    "scope": "Demonstracja projektu gazetki FMCG z danymi przykładowymi."
  },
  "modul": {
    "visual": "Uporządkowany katalog mebli. Okładka i strony kolekcji stawiają na duże zdjęcia produktów oraz czytelny podział asortymentu zamiast wielu drobnych opisów.",
    "flow": "Odbiorca poznaje styl kolekcji, porównuje poszczególne zestawy i może łatwo odnaleźć grupę wyposażenia.",
    "technical": "Przygotowano demonstracyjne układy okładki i rozkładówek. Nie potwierdzono rzeczywistych kodów produktów, cen, drukowanych nakładów ani kompletu plików produkcyjnych.",
    "scope": "Wizualizacja projektu katalogu meblowego."
  },
  "zielony-sezon": {
    "visual": "Gazetka ogrodnicza o sezonowej kompozycji. Kategorie roślin i narzędzi połączono z widocznymi zdjęciami oraz przykładowymi cenami.",
    "flow": "Czytelnik może szybko przejść między grupami produktów związanymi z wiosennymi i letnimi pracami ogrodowymi.",
    "technical": "Jest to wizualizacja redakcyjnego układu promocji. Nie potwierdzono rzeczywistych stanów, ważności ofert ani gotowej pełnej paczki drukarskiej.",
    "scope": "Materiał koncepcyjny gazetki sezonowej."
  },
  "gazetka-navoro": {
    "visual": "Gazetka promocyjna zaprojektowana w tej samej oprawie co witryna NAVORO HURT. Duże zdjęcia i wyrazista ekspozycja produktów zapewniają ciągłość z kampanią na stronie.",
    "flow": "Odbiorca hurtowy otwiera materiał z witryny, przegląda osiem stron i może pobrać PDF do dalszego wykorzystania.",
    "technical": "Potwierdzono w katalogu ośmiostronicowy PDF oraz przeglądanie i pobieranie w ramach działającego serwisu. Materiał ofertowy jest poglądowy.",
    "scope": "Interaktywna publikacja i ośmiostronicowy PDF powiązany ze stroną NAVORO HURT."
  },
  "gazetka-nexio": {
    "visual": "Szesnastostronicowa oferta elektrotechniczna z czytelnymi kategoriami materiałów i jednorodną typografią techniczną.",
    "flow": "Przejście z głównej strony NEXIO ELEKTRO pozwala użytkownikowi szybko odnaleźć pełną gazetkę i poznać asortyment.",
    "technical": "Katalog potwierdza 16 stron materiału oraz przejście do gazetki pod osobnym adresem serwisu. Nie zweryfikowano połączenia z bieżącym stanem magazynowym.",
    "scope": "Cyfrowa gazetka produktowa dostępna z witryny branży elektro."
  },
  "gazetka-budrivo": {
    "visual": "Projekt materiału promocyjnego BUDRIVO zachowuje kolory, sposób prezentacji produktów i hierarchię serwisu hurtowni budowlanej.",
    "flow": "Klient przegląda promocje w sąsiedztwie katalogu i kalkulatora elewacji, nie opuszczając znanej struktury informacji.",
    "technical": "Gazetka jest powiązana z demonstracyjną witryną BUDRIVO. Zakres opisany w katalogu nie potwierdza rzeczywistej aktualizacji cen lub automatycznego importu produktów.",
    "scope": "Demonstracyjna gazetka powiązana z katalogiem materiałów budowlanych."
  },
  "gazetka-materivo": {
    "visual": "Gazetka online dopasowana do ekonomicznej odsłony MATERIVO. Układ produktowy i nawigacja powtarzają rozpoznawalny język strony.",
    "flow": "Odbiorca przechodzi ze strony sklepu do promocji, porównuje propozycje i wraca do reszty asortymentu.",
    "technical": "Katalog dokumentuje działającą gazetkę online w wariancie ekonomicznym. Nie potwierdzono integracji z ERP, automatycznej aktualizacji cen i stanów.",
    "scope": "Cyfrowa gazetka produktowa zintegrowana wizualnie z koncepcją WWW."
  },
  "printflow": {
    "visual": "Procesowy interfejs dla drukarni, obejmujący zlecenie, kalkulator i pulpity wskaźników. Układ organizuje dane wokół kolejnych etapów pracy zamiast izolowanych formularzy.",
    "flow": "Użytkownik przechodzi przez ofertowanie, przygotowanie, produkcję, kontrolę jakości, logistykę i fakturę. Wskaźniki oraz odpowiedzialności RACI ułatwiają obserwację kosztów i terminów.",
    "technical": "Repozytorium potwierdza portal PWA, pracownię KPI, kalkulator, dokumentację procesu, zestaw testów oraz powiązany skoroszyt 44 arkuszy. Rozwiązanie korzysta z danych syntetycznych, a nie zleceń realnej drukarni.",
    "scope": "Działający projekt demonstracyjny Order-to-Cash z kodem na GitHubie.",
    "sources": [
      {
        "label": "Kod i dokumentacja projektu",
        "url": "https://github.com/lukaszst-cz/printflow-360"
      }
    ]
  },
  "transportflow": {
    "visual": "Pulpit logistyczny organizujący trasy, role, pojazdy i koszty w jednej ścieżce. Układ ma wspierać operacyjną orientację w zleceniu.",
    "flow": "Od kalkulacji trasy i przydziału zasobów, przez przewóz i dokumenty, do rozliczenia kosztów i marży.",
    "technical": "Katalog potwierdza panel demonstracyjny, dane tras i przykładowe dokumenty. Nie zweryfikowano połączenia z GPS, mapą live, prawdziwą flotą ani zewnętrzną księgowością.",
    "scope": "Demonstracja procesu logistycznego i marżowości transportu."
  },
  "workshopflow": {
    "visual": "Portal warsztatowy pokazujący etapy obsługi pojazdu z osobnymi widokami ról, w tym klienta i kierownika.",
    "flow": "Przebieg od rezerwacji i diagnozy, przez kosztorys, zgodę na naprawę, części, realizację i kontrolę jakości, do faktury i wydania pojazdu.",
    "technical": "Repozytorium potwierdza portal ról, dziewięć ról w testach, syntetyczne dane oraz walidację JavaScript i podstaw dostępności. Publiczny portal nie ma realnego logowania ani serwerowego RBAC; wybór roli i zgoda klienta są lokalną symulacją.",
    "scope": "Opublikowany interaktywny model warsztatu samochodowego, kod dostępny na GitHubie.",
    "sources": [
      {
        "label": "Kod i dokumentacja projektu",
        "url": "https://github.com/lukaszst-cz/workshopflow-360"
      }
    ]
  },
  "auto-naprawa": {
    "visual": "Wizualny portal obsługi napraw, oddzielający perspektywę klienta od widoku osoby zarządzającej zgłoszeniami i kosztorysami.",
    "flow": "Klient może obejrzeć stan naprawy i wycenę, a kierownik przegląda zlecenia w jednym układzie.",
    "technical": "Katalog potwierdza działającą demonstrację w serwisie Zielona Marka, z portalem klienta, wyceną i statusem naprawy. Integracja z prawdziwym warsztatem i obsługą faktur nie została zweryfikowana.",
    "scope": "Witrynowa demonstracja portalu warsztatowego."
  },
  "lead-offer-copilot": {
    "visual": "Narzędzie ofertowe z naciskiem na czytelne przedstawienie braków w zapytaniu oraz propozycję odpowiedzi do korekty.",
    "flow": "Użytkownik wprowadza zapytanie klienta, otrzymuje listę wymaganych doprecyzowań i szkic odpowiedzi przed wysłaniem oferty.",
    "technical": "Katalog wskazuje publiczną aplikację internetową. Bez kontroli wewnętrznego kodu nie potwierdzono sposobu analizy wiadomości ani tego, czy wykorzystywany jest model AI lub zewnętrzne API.",
    "scope": "Publicznie dostępny demonstracyjny asystent analizy zapytań i szkicowania ofert."
  },
  "document-checker": {
    "visual": "Zadaniowy interfejs kontroli plików: wybranie dokumentu, wynik sprawdzenia i lista wykrytych niezgodności.",
    "flow": "Użytkownik otwiera Excel, CSV lub PDF i sprawdza niekompletne pola, formaty oraz rozbieżności przed przekazaniem dokumentu.",
    "technical": "Opis w katalogu deklaruje analizę w przeglądarce, bez wysyłania plików na serwer. Obsługiwane są XLSX, CSV i PDF. Nie przeprowadzono niezależnego audytu implementacji bezpieczeństwa danych.",
    "scope": "Publiczne narzędzie do wstępnej kontroli dokumentów i arkuszy."
  },
  "docpilot": {
    "visual": "Lokalna aplikacja do dokumentów oparta na kolekcji, wyszukiwarce, podglądzie odczytanych informacji i ekranie terminów. Interfejs ma rozdzielać sugestię od faktycznej zmiany pliku.",
    "flow": "Po dodaniu skanu lub PDF program wykrywa typ dokumentu, datę, kwotę i termin, sugeruje nazwę i kategorię, umożliwia wyszukiwanie i ręczne zatwierdzenie dalszych działań.",
    "technical": "Repozytorium dokumentuje lokalne OCR, indeksowanie i wyszukiwanie oraz stabilną wersję Windows v4.0.0. Rozwijana warstwa LifePilot Preview 5.0 dodaje kolejkę działań i eksport ProofPack, ale nie jest wydaniem stabilnym. Integracje z Notion lub kalendarzem wymagają osobnej konfiguracji.",
    "scope": "Rzeczywista aplikacja desktopowa z publicznym stabilnym wydaniem Windows; LifePilot pozostaje preview.",
    "sources": [
      {
        "label": "Kod i dokumentacja projektu",
        "url": "https://github.com/lukaszst-cz/docpilot"
      }
    ],
    "version": "Stabilny DocPilot 4.0.0; LifePilot 5.0 w przygotowaniu"
  },
  "aktywnik-plus": {
    "visual": "Responsywna aplikacja do ewidencji aktywności osobistych i rodzinnych, ze statusem tygodnia i prostymi wejściami do dziennika.",
    "flow": "Osoba korzystająca wybiera tryb dla siebie albo rodzinny, zapisuje aktywności i może wyeksportować dane. Projekt przewiduje pracę offline.",
    "technical": "Katalog wskazuje PWA w fazie pilotażu 0.5.0-beta.4, zapis bez internetu i eksport. Synchronizacja pozostaje w budowie, więc nie należy opisywać jej jako kompletnej funkcji.",
    "scope": "Rozwijana publiczna aplikacja PWA, wersja beta, nie zakończony produkt komercyjny.",
    "version": "Beta 0.5.0-beta.4"
  },
  "czy-to-sciema": {
    "visual": "Przystępny, responsywny interfejs sprawdzania podejrzanych wiadomości. Zamiast oceny procentowej pokazuje konkretne sygnały i bezpieczny następny krok.",
    "flow": "Użytkownik wkleja SMS, e-mail albo link, ewentualnie dodaje zdjęcie lub QR, sprawdza odczytany tekst i otrzymuje zestaw ostrzeżeń oraz raport do udostępnienia.",
    "technical": "Repozytorium potwierdza PWA, lokalną analizę treści, OCR w Web Workerze, dekodowanie QR przez jsQR i testy na trzech silnikach przeglądarek. Aplikacja nie odwiedza podejrzanych stron; analiza nie daje gwarancji bezpieczeństwa. Tryb offline zależy od pobrania modeli.",
    "scope": "Funkcjonalna aplikacja do edukacyjnej oceny ryzyka wiadomości, publiczny kod na GitHubie.",
    "sources": [
      {
        "label": "Kod i dokumentacja projektu",
        "url": "https://github.com/lukaszst-cz/czy-to-sciema"
      }
    ]
  },
  "fleet-ops-desk": {
    "visual": "Operacyjny pulpit z listą pojazdów, statusami najmu, kartami kosztów i wskaźnikami floty. Użytkownik widzi najpierw zakres danych potrzebnych do decyzji.",
    "flow": "Od wprowadzenia pojazdu i przypisania do używania, przez serwis, paliwo i koszty, do rozliczenia leasingu lub najmu.",
    "technical": "Repozytorium potwierdza aplikację Python 3 + SQLite, lokalne API, filtrowanie i dashboard. Próbka obejmuje 18 pojazdów i syntetyczne rekordy kosztów. Publiczny pokaz jest statyczny, a aplikacja z bazą uruchamiana lokalnie.",
    "scope": "Demonstracyjne narzędzie flotowe i statyczny podgląd, bez realnych danych firmowych.",
    "sources": [
      {
        "label": "Kod i dokumentacja projektu",
        "url": "https://github.com/lukaszst-cz/fleet-ops-desk"
      }
    ]
  },
  "excel-printflow": {
    "visual": "Skoroszyt organizujący informacje drukarni od wyceny i danych produkcyjnych po KPI i podsumowania. Nacisk położono na czytelność arkuszy, spójność kolumn i wyniku.",
    "flow": "Osoba planująca zlecenie sprawdza koszty, etapy i wynik miesiąca na podstawie powiązanych zestawień.",
    "technical": "Powiązane repozytorium PrintFlow 360 potwierdza demonstracyjny skoroszyt 44 arkuszy. Dane są syntetyczne. Bez indywidualnego przeglądu formuł nie deklarowano dodatkowych automatyzacji.",
    "scope": "Arkusz stanowiący część szerszej demonstracji procesu poligraficznego."
  },
  "excel-transportflow": {
    "visual": "Arkusz transportowy z rozbiciem kosztów trasy, marży i wyniku. Wskaźniki mają pokazywać źródła kosztu w czytelnym zestawieniu.",
    "flow": "Użytkownik analizuje pozycje kosztów przewozu i porównuje je z przychodem, żeby lepiej rozumieć marżę zlecenia.",
    "technical": "Katalog potwierdza kalkulacje kosztów, marżę i raportowanie na danych testowych. Nie zweryfikowano konkretnego pliku XLSX ani każdej formuły.",
    "scope": "Demonstracyjny model arkuszowy do kalkulowania rentowności transportu."
  },
  "excel-dashboard": {
    "visual": "Pulpit operacyjny z podsumowaniami, wykresami i KPI budowanymi w ramach skoroszytu. Układ ogranicza szukanie informacji w tabelach.",
    "flow": "Odbiorca przechodzi od danych źródłowych do wskaźników i zestawień, żeby szybciej zauważyć zmiany w wyniku.",
    "technical": "Katalog wskazuje formuły, wykresy i zestawienia Excel oparte na danych syntetycznych. Nie potwierdzono niezależnie użytej wersji Excela ani pliku źródłowego.",
    "scope": "Koncepcja dashboardu operacyjnego w arkuszu."
  },
  "excel-wycena": {
    "visual": "Kalkulator trzech wariantów oferty. Układ pokazuje zakres i koszt obok siebie, aby klient łatwo dostrzegał różnice między pakietami.",
    "flow": "Osoba przygotowująca wycenę zestawia założenia i koszty w wariantach, a odbiorca może porównać je bez czytania wielu osobnych plików.",
    "technical": "Katalog potwierdza kalkulację kosztów i porównywanie wariantów. Bez weryfikacji skoroszytu nie przypisano automatycznej aktualizacji cenników ani integracji CRM.",
    "scope": "Demonstracyjny model arkuszowego kalkulatora ofert."
  },
  "excel-crm": {
    "visual": "Prosty rejestr handlowy w arkuszu, z listą kontaktów, statusami spraw i kolejnymi krokami. Zamiast rozbudowanego interfejsu CRM zastosowano prostą tabelę.",
    "flow": "Użytkownik filtruje kontakty, aktualizuje status i planuje następne działanie, bez konieczności wdrażania pełnego systemu CRM.",
    "technical": "Katalog potwierdza filtrację i plan działań na danych fikcyjnych. Nie zweryfikowano synchronizacji z pocztą lub kalendarzem ani automatycznych powiadomień.",
    "scope": "Demonstracyjny rejestr relacji i zadań w Excelu."
  }
};
