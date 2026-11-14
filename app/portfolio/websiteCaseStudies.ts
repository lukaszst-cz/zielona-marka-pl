/** Szczegóły projektów z kategorii Strony WWW.
 * Stan SOLIDOM zweryfikowany w opublikowanym kodzie HTML/CSS/JS.
 * Pozostałe opisy powstały z katalogu i zweryfikowanych stron, bez dopisywania wdrożeń.
 */
export type WebsiteCaseStudy = {
  visual: string;
  flow: string;
  technical: string;
  scope: string;
  version?: string;
  sources?: { label: string; url: string }[];
};
export const websiteCaseStudies: Record<string, WebsiteCaseStudy> = {
  "budrivo": {
    "visual": "Fotografie materiałów, elewacji i mieszalni kolorów. Kategorie odpowiadają rzeczywistym pytaniom osoby remontującej dom.",
    "flow": "Od poznania materiałów przez kalkulator powierzchni elewacji do listy i zapytania. Gazetka uzupełnia ofertę.",
    "technical": "W działającej publikacji potwierdzono sekcje katalogu, mieszalni, dostawy i kalkulatora elewacji. Nie potwierdzono integracji z magazynem.",
    "scope": "Opublikowana, interaktywna koncepcja hurtowni budowlanej."
  },
  "navoro-hurt": {
    "visual": "Silne fotografie produktów i kolorystyka promocji, połączone z czytelną nawigacją B2B.",
    "flow": "Klient przegląda 17 produktów i otwiera lub pobiera ośmiostronicową gazetkę. Oferta jest połączona z przygotowaniem zapytania.",
    "technical": "Witryna prezentuje kampanię produktową, katalog, gazetkę i sekcję współpracy hurtowej. Dane produktowe nie są potwierdzonym stanem magazynowym.",
    "scope": "Opublikowana koncepcja B2B z katalogiem i gazetką PDF."
  },
  "nexio-elektro": {
    "visual": "Techniczny układ, fotografie osprzętu, czytelne kategorie i wyraźne wejście do gazetki.",
    "flow": "Instalator przegląda kategorie, wyszukuje materiały, korzysta z własnej listy i przechodzi do gazetki.",
    "technical": "Zweryfikowano działającą witrynę z wyszukiwaniem, strefą wykonawcy i listą. Gazetka produktowa ma 16 stron. Nie potwierdzono integracji ERP.",
    "scope": "Opublikowana koncepcja elektrotechnicznego katalogu i gazetki."
  },
  "materivo": {
    "visual": "Porównanie estetyki premium i ekonomicznej dla podobnej oferty. Duże fotografie, kategorie i oferta materiałowa.",
    "flow": "Klient przechodzi przez produkty, katalog, listę materiałów i ofertę promocyjną. Dwa warianty pokazują różne sposoby prezentacji.",
    "technical": "Zweryfikowano działającą wersję premium z kategoriami, galerią produktów i gazetką. Wariant ekonomiczny jest odrębną koncepcją.",
    "scope": "Dwa kierunki prezentacji hurtowni budowlanej, premium i ekonomiczny."
  },
  "aurea-smile": {
    "visual": "Stonowane, ciemne tło i złote detale. Ostre zdjęcia medyczne, duże odstępy i sześć czytelnych specjalizacji.",
    "flow": "Pacjent wybiera potrzebę, poznaje zakres zabiegów, etapy pierwszej wizyty i informacje o gabinecie.",
    "technical": "Potwierdzono opublikowane sekcje specjalizacji, zespołu i pierwszej wizyty. Kalendarz wskazany w dokumentacji jest demonstracją, a nie systemem przyjęć.",
    "scope": "Wersja v7 koncepcyjnej witryny stomatologicznej, opublikowana na Vercel."
  },
  "solidom": {
    "visual": "Duże fotografie budowy i wnętrz, granatowa kolorystyka, pomarańczowe akcenty i mocna typografia Manrope. Responsywny układ, cztery etapy współpracy ze zdjęciami oraz pełnowymiarowa galeria.",
    "flow": "Użytkownik poznaje ofertę, filtruje realizacje, powiększa zdjęcia, przegląda etapy prac i FAQ, a następnie sprawdza formularz. Nagłówek i karty wchodzą płynnie, zdjęcie otwierające porusza się przy przewijaniu. Pasek postępu i aktywne etapy ułatwiają orientację.",
    "technical": "HTML, CSS i JavaScript bez frameworka. Pięć liczników animowanych przez requestAnimationFrame; IntersectionObserver uruchamia wejścia kart. Galeria ma filtry i okna dialogowe, opinie karuzelę sterowaną przyciskami, a PWA manifest, ikony i service-worker. Uwzględniono prefers-reduced-motion. Formularz sprawdza walidację, nie wysyła ani nie zapisuje danych.",
    "scope": "Finalna, zaakceptowana wersja z 14 listopada 2026 r. działająca na Vercel. Marka SOLIDOM i dane o realizacjach mają charakter poglądowy.",
    "version": "Ostateczna wersja, 14 listopada 2026",
    "sources": [
      {
        "label": "Kod na GitHubie",
        "url": "https://github.com/lukaszst-cz/zielona-marka-public-portfolio/tree/main/demos/solidom"
      },
      {
        "label": "Archiwum na Dysku Google",
        "url": "https://drive.google.com/drive/folders/1dgsa9MAx-I0d5mk6-1rtQ-u153QvVkDT"
      }
    ]
  },
  "solident": {
    "visual": "Jasny, ciepły projekt gabinetu: fotografie, karty usług, zrozumiałe komunikaty dla pacjenta.",
    "flow": "Od wyboru usługi i informacji o pierwszej wizycie do planowania konsultacji. Osobne sekcje pomagają przygotować się do zabiegu.",
    "technical": "Potwierdzono działający układ usług i ścieżkę pierwszej wizyty. Rejestracja z zaliczką jest elementem koncepcji, nie potwierdzonym systemem płatności.",
    "scope": "Opublikowana koncepcja gabinetu stomatologicznego."
  },
  "black-harbor": {
    "visual": "Ciemna, fotograficzna oprawa detailingu. Zdjęcia efektów lakieru, oszczędna typografia i kontrastujące przyciski.",
    "flow": "Klient wybiera usługę, poznaje efekt, przegląda zakres i przechodzi do wyceny lub planowania terminu.",
    "technical": "W działającej witrynie potwierdzono sekcje usług, efektów, wyceny i kontaktu. Nie potwierdzono rzeczywistej rezerwacji terminów.",
    "scope": "Opublikowana strona koncepcyjna studia detailingu."
  },
  "eltravia": {
    "visual": "Kontrastowa identyfikacja elektrotechniczna: fotografie osprzętu, wyraźne nagłówki i podział usług.",
    "flow": "Wykonawca sprawdza ofertę, strefę dla instalatorów oraz kalkulator planowania przewodu.",
    "technical": "Zweryfikowano opublikowaną ofertę elektryczną i sekcję kalkulacji. To demonstracja, bez potwierdzonej integracji magazynowej.",
    "scope": "Opublikowana koncepcja premium branży elektrycznej."
  },
  "natura-studio": {
    "visual": "Spokojna typografia, jasne tło i fotografia usług wellness. Układ ułatwia zapoznanie się z zabiegami.",
    "flow": "Klientka wybiera usługę i przechodzi do ścieżki rezerwacji, a właścicielka może zobaczyć pokaz zaplecza.",
    "technical": "W katalogu potwierdzono ofertę, ścieżkę rezerwacji i demonstracyjny terminarz. Nie zweryfikowano rzeczywistego kalendarza ani płatności.",
    "scope": "Interaktywna prezentacja branży beauty w serwisie Zielonej Marki."
  },
  "bistro-forma": {
    "visual": "Układ restauracyjny: fotografie dań, czytelna karta i podstawowe informacje o lokalu.",
    "flow": "Gość poznaje menu i godziny, sprawdza dojazd i wybiera kontakt lub ścieżkę rezerwacji.",
    "technical": "Katalog potwierdza menu i pokaz zaplecza. Brak potwierdzonej integracji z systemem rezerwacji stolików.",
    "scope": "Interaktywna demonstracja strony gastronomicznej."
  },
  "dom-dobry": {
    "visual": "Karty mieszkań z naciskiem na metraż, piętro, cenę i czytelną dostępność.",
    "flow": "Kupujący porównuje lokale i przygotowuje zapytanie dotyczące wybranego mieszkania.",
    "technical": "Katalog potwierdza karty mieszkań, przykładowe statusy i zapytanie. Nie zweryfikowano połączenia z ofertą dewelopera.",
    "scope": "Interaktywna koncepcja prezentacji inwestycji mieszkaniowej."
  },
  "styk": {
    "visual": "Jedna silna fotografia, prosta typografia i telefon w najbardziej widocznym miejscu.",
    "flow": "Projekt prowadzi użytkownika od zakresu usług elektrycznych do szybkiego kontaktu.",
    "technical": "Dostępne wizualizacje na laptop i telefon. Brak potwierdzonej publikacji działającej strony.",
    "scope": "Koncepcja graficzna desktop i mobile."
  },
  "glina": {
    "visual": "Minimalistyczny kierunek ceramiczny: dużo przestrzeni, spokojne liternictwo i fotografie naczyń.",
    "flow": "Oglądający poznaje wyroby pracowni, a zdjęcia stają się główną osią układu.",
    "technical": "Widoki desktop i mobile. Nie potwierdzono wdrożenia sklepu, koszyka ani płatności.",
    "scope": "Koncepcja graficzna desktop i mobile."
  },
  "trop": {
    "visual": "Przejrzysta witryna weterynaryjna, w której telefon, dyżur i godziny otwarcia są na pierwszym planie.",
    "flow": "Opiekun zwierzęcia szybko znajduje pomoc, kontakt i podstawowy zakres usług.",
    "technical": "Dostępne makiety desktop i mobile. Brak potwierdzenia wdrożonej strony lub rejestracji.",
    "scope": "Koncepcja graficzna desktop i mobile."
  }
};
