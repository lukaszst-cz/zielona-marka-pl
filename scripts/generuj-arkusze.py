"""Puste szablony arkuszy do pobrania z portfolio.

Uruchomienie: python3 scripts/generuj-arkusze.py
Pliki trafiają do public/pliki/ i są podpięte w app/portfolio/catalog.ts.
"""
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

KATALOG = Path(__file__).resolve().parent.parent / "public" / "pliki"
KATALOG.mkdir(parents=True, exist_ok=True)

NAGLOWEK = PatternFill("solid", fgColor="14492F")
DO_WYPELNIENIA = PatternFill("solid", fgColor="FFF4C2")
BIALY = Font(name="Arial", size=11, bold=True, color="FFFFFF")
ZWYKLY = Font(name="Arial", size=11)
TYTUL = Font(name="Arial", size=14, bold=True, color="14492F")
RAMKA = Border(*[Side(style="thin", color="C9D8C4")] * 4)


def instrukcja(wb, tytul, do_czego, kroki, kolumny):
    ws = wb.create_sheet("Instrukcja", 0)
    ws.column_dimensions["A"].width = 26
    ws.column_dimensions["B"].width = 92
    ws["A1"] = tytul
    ws["A1"].font = TYTUL
    ws["A2"] = "Szablon Zielonej Marki, zielona-marka.pl"
    ws["A2"].font = Font(name="Arial", size=10, color="4A6A4A")
    wiersz = 4
    ws[f"A{wiersz}"] = "Do czego służy"
    ws[f"A{wiersz}"].font = Font(name="Arial", size=11, bold=True)
    ws[f"B{wiersz}"] = do_czego
    ws[f"B{wiersz}"].alignment = Alignment(wrap_text=True, vertical="top")
    ws.row_dimensions[wiersz].height = 46
    wiersz += 2
    ws[f"A{wiersz}"] = "Jak zacząć"
    ws[f"A{wiersz}"].font = Font(name="Arial", size=11, bold=True)
    for krok in kroki:
        ws[f"B{wiersz}"] = krok
        ws[f"B{wiersz}"].font = ZWYKLY
        wiersz += 1
    wiersz += 1
    ws[f"A{wiersz}"] = "Kolumny"
    ws[f"A{wiersz}"].font = Font(name="Arial", size=11, bold=True)
    for nazwa, opis in kolumny:
        ws[f"B{wiersz}"] = f"{nazwa}: {opis}"
        ws[f"B{wiersz}"].font = ZWYKLY
        wiersz += 1
    wiersz += 1
    ws[f"B{wiersz}"] = "Pola na żółtym tle wypełniasz sam. Pozostałe liczą się same i lepiej ich nie nadpisywać."
    ws[f"B{wiersz}"].font = Font(name="Arial", size=10, italic=True, color="7A5C00")
    return ws


def tabela(ws, naglowki, przyklad, szerokosci):
    for i, (naglowek, szerokosc) in enumerate(zip(naglowki, szerokosci), start=1):
        komorka = ws.cell(row=1, column=i, value=naglowek)
        komorka.font = BIALY
        komorka.fill = NAGLOWEK
        komorka.alignment = Alignment(vertical="center", wrap_text=True)
        ws.column_dimensions[get_column_letter(i)].width = szerokosc
    ws.row_dimensions[1].height = 28
    for i, wartosc in enumerate(przyklad, start=1):
        komorka = ws.cell(row=2, column=i, value=wartosc)
        komorka.font = ZWYKLY
        komorka.border = RAMKA
        if not (isinstance(wartosc, str) and wartosc.startswith("=")):
            komorka.fill = DO_WYPELNIENIA
    ws.freeze_panes = "A2"


def dashboard():
    wb = Workbook(); wb.remove(wb.active)
    ws = wb.create_sheet("Zlecenia")
    tabela(ws,
           ["Numer", "Klient", "Data przyjęcia", "Termin", "Status", "Wartość netto", "Opóźnienie (dni)"],
           ["ZL-001", "Przykładowy klient", "2026-01-07", "2026-01-21", "W realizacji", 2400,
            '=IF(E2="Zakończone",0,MAX(0,TODAY()-D2))'],
           [12, 30, 16, 14, 16, 16, 18])
    for wiersz in range(3, 201):
        ws.cell(row=wiersz, column=7, value=f'=IF(B{wiersz}="","",IF(E{wiersz}="Zakończone",0,MAX(0,TODAY()-D{wiersz})))').font = ZWYKLY
    ws.cell(row=2, column=6).number_format = "#,##0.00 zł"

    kpi = wb.create_sheet("Wskaźniki")
    kpi.column_dimensions["A"].width = 34
    kpi.column_dimensions["B"].width = 20
    pozycje = [
        ("Liczba zleceń", '=COUNTA(Zlecenia!B2:B200)'),
        ("W realizacji", '=COUNTIF(Zlecenia!E2:E200,"W realizacji")'),
        ("Zakończone", '=COUNTIF(Zlecenia!E2:E200,"Zakończone")'),
        ("Wartość netto razem", '=SUM(Zlecenia!F2:F200)'),
        ("Średnia wartość zlecenia", '=IFERROR(AVERAGE(Zlecenia!F2:F200),0)'),
        ("Zlecenia po terminie", '=COUNTIF(Zlecenia!G2:G200,">0")'),
        ("Udział opóźnionych", '=IFERROR(COUNTIF(Zlecenia!G2:G200,">0")/COUNTA(Zlecenia!B2:B200),0)'),
    ]
    kpi["A1"] = "Wskaźnik"; kpi["B1"] = "Wartość"
    for komorka in ("A1", "B1"):
        kpi[komorka].font = BIALY; kpi[komorka].fill = NAGLOWEK
    for i, (nazwa, formula) in enumerate(pozycje, start=2):
        kpi.cell(row=i, column=1, value=nazwa).font = ZWYKLY
        komorka = kpi.cell(row=i, column=2, value=formula)
        komorka.font = ZWYKLY
        if "Wartość" in nazwa or "Średnia" in nazwa:
            komorka.number_format = "#,##0.00 zł"
        if nazwa == "Udział opóźnionych":
            komorka.number_format = "0.0%"

    instrukcja(wb, "Dashboard operacyjny",
               "Prosty panel do pilnowania zleceń: wpisujesz zlecenia w jednym arkuszu, a wskaźniki liczą się same.",
               ["1. Wypełnij arkusz Zlecenia, jeden wiersz to jedno zlecenie.",
                "2. W kolumnie Status używaj wartości: Nowe, W realizacji, Zakończone.",
                "3. Zajrzyj do arkusza Wskaźniki, liczby przeliczą się automatycznie."],
               [("Numer", "Twoje oznaczenie zlecenia"),
                ("Termin", "Data, do której zlecenie ma być gotowe"),
                ("Opóźnienie", "Liczy się samo na podstawie terminu i statusu")])
    wb.save(KATALOG / "dashboard-operacyjny-zielona-marka.xlsx")


def wycena():
    wb = Workbook(); wb.remove(wb.active)
    ws = wb.create_sheet("Wycena")
    tabela(ws,
           ["Pozycja", "Opis", "Ilość", "Cena jednostkowa", "Rabat %", "Wartość netto", "VAT 23%", "Brutto"],
           ["Strona WWW", "Wizytówka z formularzem", 1, 1449, 0,
            "=C2*D2*(1-E2)", "=F2*0.23", "=F2+G2"],
           [22, 34, 10, 18, 10, 16, 14, 16])
    for wiersz in range(3, 61):
        ws.cell(row=wiersz, column=6, value=f'=IF(A{wiersz}="","",C{wiersz}*D{wiersz}*(1-E{wiersz}))').font = ZWYKLY
        ws.cell(row=wiersz, column=7, value=f'=IF(F{wiersz}="","",F{wiersz}*0.23)').font = ZWYKLY
        ws.cell(row=wiersz, column=8, value=f'=IF(F{wiersz}="","",F{wiersz}+G{wiersz})').font = ZWYKLY
    for kolumna in ("D", "F", "G", "H"):
        for wiersz in range(2, 61):
            ws[f"{kolumna}{wiersz}"].number_format = "#,##0.00 zł"
    for wiersz in range(2, 61):
        ws[f"E{wiersz}"].number_format = "0%"
    ws["A62"] = "Razem"; ws["A62"].font = Font(name="Arial", size=11, bold=True)
    ws["F62"] = "=SUM(F2:F60)"; ws["G62"] = "=SUM(G2:G60)"; ws["H62"] = "=SUM(H2:H60)"
    for kolumna in ("F", "G", "H"):
        ws[f"{kolumna}62"].font = Font(name="Arial", size=11, bold=True)
        ws[f"{kolumna}62"].number_format = "#,##0.00 zł"

    warianty = wb.create_sheet("Warianty")
    warianty.column_dimensions["A"].width = 24
    warianty.column_dimensions["B"].width = 18
    warianty["A1"] = "Wariant"; warianty["B1"] = "Wartość brutto"
    for komorka in ("A1", "B1"):
        warianty[komorka].font = BIALY; warianty[komorka].fill = NAGLOWEK
    for i, nazwa in enumerate(["Podstawowy", "Rozszerzony", "Pełny"], start=2):
        warianty.cell(row=i, column=1, value=nazwa).font = ZWYKLY
        komorka = warianty.cell(row=i, column=2, value=0)
        komorka.font = ZWYKLY; komorka.fill = DO_WYPELNIENIA; komorka.number_format = "#,##0.00 zł"
    warianty["A6"] = "Różnica między pełnym a podstawowym"
    warianty["B6"] = "=B4-B2"; warianty["B6"].number_format = "#,##0.00 zł"

    instrukcja(wb, "Kalkulator wariantów oferty",
               "Składasz ofertę z pozycji, a arkusz liczy wartość netto, VAT i brutto oraz porównuje warianty.",
               ["1. Wpisz pozycje oferty w arkuszu Wycena.",
                "2. Rabat podawaj jako procent, na przykład 10%.",
                "3. Wartości wariantów przepisz do arkusza Warianty, żeby porównać je obok siebie."],
               [("Ilość", "Liczba sztuk lub godzin"),
                ("Rabat %", "Zniżka dla tej pozycji"),
                ("Wartość netto", "Liczy się sama z ilości, ceny i rabatu")])
    wb.save(KATALOG / "kalkulator-wariantow-oferty-zielona-marka.xlsx")


def crm():
    wb = Workbook(); wb.remove(wb.active)
    ws = wb.create_sheet("Kontakty")
    tabela(ws,
           ["Firma", "Osoba", "Telefon", "E-mail", "Źródło", "Etap", "Data kontaktu", "Następny krok", "Data następnego kroku", "Notatki"],
           ["Przykładowa firma", "Jan Kowalski", "600 000 000", "jan@przyklad.pl", "Polecenie", "Rozmowa",
            "2026-01-07", "Wysłać ofertę", "2026-01-10", "Pytał o stronę z katalogiem"],
           [26, 20, 16, 26, 16, 16, 16, 26, 20, 40])
    etapy = wb.create_sheet("Podsumowanie")
    etapy.column_dimensions["A"].width = 28
    etapy.column_dimensions["B"].width = 14
    etapy["A1"] = "Etap"; etapy["B1"] = "Liczba"
    for komorka in ("A1", "B1"):
        etapy[komorka].font = BIALY; etapy[komorka].fill = NAGLOWEK
    for i, nazwa in enumerate(["Nowy", "Rozmowa", "Oferta", "Realizacja", "Zamknięty"], start=2):
        etapy.cell(row=i, column=1, value=nazwa).font = ZWYKLY
        etapy.cell(row=i, column=2, value=f'=COUNTIF(Kontakty!F2:F500,A{i})').font = ZWYKLY
    etapy["A8"] = "Kontakty bez następnego kroku"
    etapy["B8"] = '=COUNTIFS(Kontakty!A2:A500,"<>",Kontakty!H2:H500,"")'
    etapy["A9"] = "Zaplanowane na najbliższe 7 dni"
    etapy["B9"] = '=COUNTIFS(Kontakty!I2:I500,">="&TODAY(),Kontakty!I2:I500,"<="&TODAY()+7)'
    instrukcja(wb, "Rejestr kontaktów i działań",
               "Jedno miejsce na zapytania i rozmowy: kto, kiedy, na jakim etapie i co trzeba zrobić dalej.",
               ["1. Każdy kontakt to jeden wiersz w arkuszu Kontakty.",
                "2. W kolumnie Etap używaj wartości: Nowy, Rozmowa, Oferta, Realizacja, Zamknięty.",
                "3. Zawsze wpisuj następny krok i jego datę, to pilnuje, żeby nic nie zginęło."],
               [("Źródło", "Skąd przyszedł kontakt, na przykład strona, polecenie, telefon"),
                ("Następny krok", "Konkretna czynność, nie ogólnik"),
                ("Podsumowanie", "Liczy etapy i pokazuje kontakty bez zaplanowanego kroku")])
    wb.save(KATALOG / "rejestr-kontaktow-zielona-marka.xlsx")


def flow(nazwa_pliku, tytul, do_czego, naglowki, przyklad, szerokosci, kroki, kolumny, kolumna_wartosci):
    wb = Workbook(); wb.remove(wb.active)
    ws = wb.create_sheet("Zlecenia")
    tabela(ws, naglowki, przyklad, szerokosci)
    podsum = wb.create_sheet("Podsumowanie")
    podsum.column_dimensions["A"].width = 32
    podsum.column_dimensions["B"].width = 18
    podsum["A1"] = "Wskaźnik"; podsum["B1"] = "Wartość"
    for komorka in ("A1", "B1"):
        podsum[komorka].font = BIALY; podsum[komorka].fill = NAGLOWEK
    pozycje = [
        ("Liczba zleceń", '=COUNTA(Zlecenia!A2:A500)'),
        ("W toku", '=COUNTIF(Zlecenia!E2:E500,"W toku")'),
        ("Zakończone", '=COUNTIF(Zlecenia!E2:E500,"Zakończone")'),
        ("Wartość razem", f'=SUM(Zlecenia!{kolumna_wartosci}2:{kolumna_wartosci}500)'),
        ("Średnia wartość", f'=IFERROR(AVERAGE(Zlecenia!{kolumna_wartosci}2:{kolumna_wartosci}500),0)'),
    ]
    for i, (nazwa, formula) in enumerate(pozycje, start=2):
        podsum.cell(row=i, column=1, value=nazwa).font = ZWYKLY
        komorka = podsum.cell(row=i, column=2, value=formula)
        komorka.font = ZWYKLY
        if "artość" in nazwa:
            komorka.number_format = "#,##0.00 zł"
    instrukcja(wb, tytul, do_czego, kroki, kolumny)
    wb.save(KATALOG / nazwa_pliku)


dashboard()
wycena()
crm()
flow("printflow-360-zielona-marka.xlsx", "PrintFlow 360",
     "Obieg zleceń w drukarni albo studiu DTP: od przyjęcia pliku po wydanie gotowej pracy.",
     ["Numer", "Klient", "Rodzaj pracy", "Nakład", "Status", "Termin", "Wartość netto", "Uwagi"],
     ["PF-001", "Przykładowy klient", "Ulotka A5", 500, "W toku", "2026-01-21", 680, "Papier 170 g"],
     [12, 26, 22, 12, 14, 14, 16, 34],
     ["1. Jedno zlecenie to jeden wiersz w arkuszu Zlecenia.",
      "2. W kolumnie Status używaj wartości: Nowe, W toku, Zakończone.",
      "3. Arkusz Podsumowanie liczy zlecenia i wartości sam."],
     [("Rodzaj pracy", "Co drukujemy, na przykład ulotka, wizytówka, katalog"),
      ("Nakład", "Liczba egzemplarzy"),
      ("Uwagi", "Papier, uszlachetnienia, ustalenia z klientem")],
     "G")
flow("transportflow-360-zielona-marka.xlsx", "TransportFlow 360",
     "Zlecenia transportowe w jednym miejscu: trasa, termin, kierowca i rozliczenie.",
     ["Numer", "Zleceniodawca", "Trasa", "Data załadunku", "Status", "Kierowca", "Fracht netto", "Uwagi"],
     ["TF-001", "Przykładowy spedytor", "Marki - Poznań", "2026-01-09", "W toku", "Jan K.", 1850, "Paleta 1,2 t"],
     [12, 26, 26, 16, 14, 18, 16, 30],
     ["1. Jedno zlecenie to jeden wiersz w arkuszu Zlecenia.",
      "2. W kolumnie Status używaj wartości: Nowe, W toku, Zakończone.",
      "3. Arkusz Podsumowanie liczy liczbę kursów i wartość frachtu."],
     [("Trasa", "Miejsce załadunku i rozładunku"),
      ("Fracht netto", "Umówiona stawka za kurs"),
      ("Uwagi", "Waga, rodzaj ładunku, ustalenia")],
     "G")
print("gotowe")
