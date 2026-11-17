# -*- coding: utf-8 -*-
"""Generuje arkusze Excela do pobrania z portfolio Zielonej Marki.
Każdy plik ma instrukcję, słowniki z listami wyboru, kilka przykładowych
wierszy i podsumowanie liczone formułami. Dane są przykładowe."""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter
from openpyxl.formatting.rule import CellIsRule

ARIAL = "Arial"
GREEN = "1D6F42"
HEAD = PatternFill("solid", fgColor="E6F1E8")
INPUT = PatternFill("solid", fgColor="FFF9D6")
THIN = Side(style="thin", color="C9D4CC")
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
ROWS = 200


def base(ws):
    ws.sheet_view.showGridLines = True
    return ws


def head(ws, labels, widths, row=1):
    for i, (label, width) in enumerate(zip(labels, widths), start=1):
        c = ws.cell(row=row, column=i, value=label)
        c.font = Font(name=ARIAL, bold=True, size=11, color="14432B")
        c.fill = HEAD
        c.border = BOX
        c.alignment = Alignment(vertical="center", wrap_text=True)
        ws.column_dimensions[get_column_letter(i)].width = width
    ws.row_dimensions[row].height = 30
    ws.freeze_panes = ws.cell(row=row + 1, column=1)


def put(ws, row, values, money=(), dates=(), pct=(), formula_cols=()):
    for i, v in enumerate(values, start=1):
        c = ws.cell(row=row, column=i, value=v)
        c.font = Font(name=ARIAL, size=11)
        c.border = BOX
        if i in money:
            c.number_format = '#,##0.00 "zł"'
        if i in dates:
            c.number_format = 'yyyy-mm-dd'
        if i in pct:
            c.number_format = '0%'
        if i not in formula_cols and not (isinstance(v, str) and v.startswith("=")):
            c.fill = INPUT


def instrukcja(wb, title, lines):
    ws = wb.create_sheet("Instrukcja", 0)
    ws.column_dimensions["A"].width = 112
    ws["A1"] = title
    ws["A1"].font = Font(name=ARIAL, bold=True, size=16, color=GREEN)
    r = 3
    for line in lines:
        ws.cell(row=r, column=1, value=line).font = Font(name=ARIAL, size=11, bold=line.endswith(":"))
        ws.cell(row=r, column=1).alignment = Alignment(wrap_text=True, vertical="top")
        r += 1
    ws.sheet_view.showGridLines = False
    if "Role" in wb.sheetnames:
        role = wb["Role"]
        wb.move_sheet(role, offset=1 - wb.sheetnames.index("Role"))
    return ws


def slowniki(wb, columns):
    ws = wb.create_sheet("Słowniki")
    for i, (name, values) in enumerate(columns.items(), start=1):
        col = get_column_letter(i)
        ws.column_dimensions[col].width = max(18, len(name) + 6)
        c = ws.cell(row=1, column=i, value=name)
        c.font = Font(name=ARIAL, bold=True, color="14432B")
        c.fill = HEAD
        for j, v in enumerate(values, start=2):
            ws.cell(row=j, column=i, value=v).font = Font(name=ARIAL, size=11)
    ws.sheet_view.showGridLines = False
    return ws


def lista(ws, src_range, target):
    dv = DataValidation(type="list", formula1=f"={src_range}", allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(target)


def kpi(ws, row, label, formula, fmt=None):
    a = ws.cell(row=row, column=1, value=label)
    a.font = Font(name=ARIAL, bold=True, size=11)
    b = ws.cell(row=row, column=2, value=formula)
    b.font = Font(name=ARIAL, size=11, color=GREEN, bold=True)
    if fmt:
        b.number_format = fmt


def naglowek_sekcji(ws, row, text):
    c = ws.cell(row=row, column=1, value=text)
    c.font = Font(name=ARIAL, bold=True, size=13, color=GREEN)


# ---------------------------------------------------------------- PrintFlow
def role_sheet(wb, rows, title):
    ws = wb.create_sheet("Role")
    for col, width in (("A", 26), ("B", 46), ("C", 24), ("D", 44)):
        ws.column_dimensions[col].width = width
    ws["A1"] = title
    ws["A1"].font = Font(name=ARIAL, bold=True, size=15, color=GREEN)
    for i, label in enumerate(["Rola", "Za co odpowiada", "Swój arkusz", "Kolumny, które wypełnia"], start=1):
        c = ws.cell(row=3, column=i, value=label)
        c.font = Font(name=ARIAL, bold=True)
        c.fill = HEAD
        c.border = BOX
        c.alignment = Alignment(wrap_text=True, vertical="center")
    for r, row in enumerate(rows, start=4):
        for i, v in enumerate(row, start=1):
            c = ws.cell(row=r, column=i, value=v)
            c.font = Font(name=ARIAL, size=11, bold=(i == 1))
            c.border = BOX
            c.alignment = Alignment(wrap_text=True, vertical="top")
        ws.row_dimensions[r].height = 34
    ws.cell(row=len(rows) + 5, column=1,
            value="Każdy wypełnia tylko swój arkusz. Dane przechodzą dalej same, po numerze zlecenia.").font = Font(name=ARIAL, italic=True, size=11)
    ws.sheet_view.showGridLines = False
    return ws


def wiersze_robocze(ws, cols, first_free, last_row, dates=(), money=(), pct=(), formula_cols=()):
    for r in range(first_free, last_row + 1):
        for col in range(1, cols + 1):
            cell = ws.cell(row=r, column=col)
            cell.border = BOX
            cell.font = Font(name=ARIAL, size=11, color=GREEN) if col in formula_cols else Font(name=ARIAL, size=11)
            if col not in formula_cols:
                cell.fill = INPUT
            if col in dates:
                cell.number_format = 'yyyy-mm-dd'
            if col in money:
                cell.number_format = '#,##0.00 "zł"'
            if col in pct:
                cell.number_format = '0%'


def printflow(path):
    N = 120
    wb = Workbook()
    wb.remove(wb.active)

    # 1. BIURO: zapytania i wyceny
    z = base(wb.create_sheet("1 Zapytania i wyceny"))
    head(z, ["Nr zapytania", "Data", "Klient", "Produkt", "Nakład", "Termin klienta",
             "Cena jedn. netto", "Wartość netto", "Status wyceny", "Nr zlecenia", "Uwagi"],
         [14, 13, 24, 22, 10, 14, 15, 15, 17, 13, 28])
    przyklady = [
        ["ZP-001", "=TODAY()-6", "Przykładowa piekarnia", "Ulotki A5", 5000, "=TODAY()+1", 0.42, None, "Zaakceptowane", "DR-001", "Papier kreda 170 g"],
        ["ZP-002", "=TODAY()-5", "Warsztat przy trasie", "Wizytówki", 1000, "=TODAY()+4", 0.35, None, "Zaakceptowane", "DR-002", "Lakier wybiórczy"],
        ["ZP-003", "=TODAY()-4", "Hurtownia budowlana", "Gazetka 8 stron", 3000, "=TODAY()+10", 1.85, None, "Wycenione", "", "Czeka na korektę klienta"],
        ["ZP-004", "=TODAY()-1", "Gabinet stomatologiczny", "Teczki firmowe", 300, "=TODAY()+13", 4.2, None, "Nowe", "", ""],
    ]
    for i, row in enumerate(przyklady, start=2):
        put(z, i, row, money=(7, 8), dates=(2, 6), formula_cols=(8,))
    for r in range(2, N + 2):
        z.cell(row=r, column=8, value=f'=IF(A{r}="","",E{r}*G{r})').number_format = '#,##0.00 "zł"'
    wiersze_robocze(z, 11, len(przyklady) + 2, N + 1, dates=(2, 6), money=(7, 8), formula_cols=(8,))

    # 2. PRODUKCJA
    p = base(wb.create_sheet("2 Produkcja"))
    head(p, ["Nr zlecenia", "Nr zapytania", "Klient", "Produkt", "Nakład", "Maszyna",
             "Operator", "Start druku", "Koniec druku", "Status", "Godziny maszyny"],
         [13, 14, 24, 22, 10, 18, 16, 14, 14, 16, 15])
    prod = [
        ["DR-001", "ZP-001", None, None, None, "Offset B2", "Jan K.", "=TODAY()-3", "=TODAY()-2", "Gotowe", 6],
        ["DR-002", "ZP-002", None, None, None, "Cyfrowa SRA3", "Marek W.", "=TODAY()-2", "", "W druku", 2],
    ]
    for i, row in enumerate(prod, start=2):
        put(p, i, row, dates=(8, 9), formula_cols=(3, 4, 5))
    for r in range(2, N + 2):
        for col, src in ((3, "C"), (4, "D"), (5, "E")):
            p.cell(row=r, column=col,
                   value=f'=IFERROR(IF($B{r}="","",INDEX(\'1 Zapytania i wyceny\'!${src}$2:${src}${N+1},MATCH($B{r},\'1 Zapytania i wyceny\'!$A$2:$A${N+1},0))),"")')
    wiersze_robocze(p, 11, len(prod) + 2, N + 1, dates=(8, 9), formula_cols=(3, 4, 5))

    # 3. KONTROLA JAKOSCI
    k = base(wb.create_sheet("3 Kontrola jakości"))
    head(k, ["Nr zlecenia", "Kontroler", "Data kontroli", "Wynik", "Braki (szt.)",
             "Nakład", "Udział braków", "Co poprawić"],
         [13, 18, 15, 16, 13, 10, 14, 44])
    kj = [
        ["DR-001", "Anna N.", "=TODAY()-2", "Przyjęte", 25, None, None, ""],
        ["DR-002", "Anna N.", "=TODAY()-1", "Do poprawy", 0, None, None, "Zbyt ciemny spad na rewersie"],
    ]
    for i, row in enumerate(kj, start=2):
        put(k, i, row, dates=(3,), pct=(7,), formula_cols=(6, 7))
    for r in range(2, N + 2):
        k.cell(row=r, column=6,
               value=f'=IFERROR(IF($A{r}="","",INDEX(\'2 Produkcja\'!$E$2:$E${N+1},MATCH($A{r},\'2 Produkcja\'!$A$2:$A${N+1},0))),"")')
        c = k.cell(row=r, column=7, value=f'=IFERROR(IF(OR($A{r}="",$F{r}=""),"",E{r}/F{r}),"")')
        c.number_format = '0.0%'
    wiersze_robocze(k, 8, len(kj) + 2, N + 1, dates=(3,), formula_cols=(6, 7))
    k.conditional_formatting.add(f"G2:G{N+1}", CellIsRule(operator="greaterThan", formula=["0.02"], fill=PatternFill("solid", fgColor="FFD6D6")))

    # 4. WYSYLKI I FAKTURY
    f = base(wb.create_sheet("4 Wysyłka i faktura"))
    head(f, ["Nr zlecenia", "Data wysyłki", "Przewoźnik", "Nr listu przewozowego",
             "Faktura nr", "Data faktury", "Netto", "VAT 23%", "Brutto", "Zapłacono",
             "Do zapłaty", "Status płatności"],
         [13, 14, 18, 22, 14, 14, 14, 13, 14, 14, 14, 18])
    fv = [
        ["DR-001", "=TODAY()-1", "Kurier", "PX-883121", "FV 1/2026", "=TODAY()-1", None, None, None, 0, None, None],
    ]
    for i, row in enumerate(fv, start=2):
        put(f, i, row, dates=(2, 6), money=(7, 8, 9, 10, 11), formula_cols=(7, 8, 9, 11, 12))
    for r in range(2, N + 2):
        f.cell(row=r, column=7,
               value=f'=IFERROR(IF($A{r}="","",INDEX(\'1 Zapytania i wyceny\'!$H$2:$H${N+1},MATCH($A{r},\'1 Zapytania i wyceny\'!$J$2:$J${N+1},0))),"")').number_format = '#,##0.00 "zł"'
        f.cell(row=r, column=8, value=f'=IF(G{r}="","",G{r}*0.23)').number_format = '#,##0.00 "zł"'
        f.cell(row=r, column=9, value=f'=IF(G{r}="","",G{r}+H{r})').number_format = '#,##0.00 "zł"'
        f.cell(row=r, column=11, value=f'=IF(I{r}="","",I{r}-J{r})').number_format = '#,##0.00 "zł"'
        f.cell(row=r, column=12, value=f'=IF(A{r}="","",IF(K{r}<=0,"Zapłacone",IF(J{r}>0,"Częściowo","Nieopłacone")))')
    wiersze_robocze(f, 12, len(fv) + 2, N + 1, dates=(2, 6), money=(7, 8, 9, 10, 11), formula_cols=(7, 8, 9, 11, 12))

    # KPI
    s = base(wb.create_sheet("KPI"))
    for col, width in (("A", 44), ("B", 20), ("C", 20)):
        s.column_dimensions[col].width = width
    naglowek_sekcji(s, 1, "Cały przepływ w liczbach")
    kpi(s, 3, "Zapytania w pliku", "=COUNTA('1 Zapytania i wyceny'!A2:A121)")
    kpi(s, 4, "Wyceny bez decyzji klienta", '=COUNTIF(\'1 Zapytania i wyceny\'!I2:I121,"Wycenione")')
    kpi(s, 5, "Zaakceptowane zapytania", '=COUNTIF(\'1 Zapytania i wyceny\'!I2:I121,"Zaakceptowane")')
    kpi(s, 6, "Skuteczność wycen", '=IFERROR(COUNTIF(\'1 Zapytania i wyceny\'!I2:I121,"Zaakceptowane")/COUNTA(\'1 Zapytania i wyceny\'!A2:A121),0)', '0%')
    kpi(s, 7, "Wartość netto zaakceptowanych", '=SUMIF(\'1 Zapytania i wyceny\'!I2:I121,"Zaakceptowane",\'1 Zapytania i wyceny\'!H2:H121)', '#,##0.00 "zł"')
    naglowek_sekcji(s, 9, "Produkcja i jakość")
    kpi(s, 10, "Zlecenia w druku", '=COUNTIF(\'2 Produkcja\'!J2:J121,"W druku")')
    kpi(s, 11, "Zlecenia gotowe", '=COUNTIF(\'2 Produkcja\'!J2:J121,"Gotowe")')
    kpi(s, 12, "Godziny maszyn razem", "=SUM('2 Produkcja'!K2:K121)", '#,##0.0')
    kpi(s, 13, "Kontrole do poprawy", '=COUNTIF(\'3 Kontrola jakości\'!D2:D121,"Do poprawy")')
    kpi(s, 14, "Braki razem (szt.)", "=SUM('3 Kontrola jakości'!E2:E121)", '#,##0')
    naglowek_sekcji(s, 16, "Pieniądze")
    kpi(s, 17, "Zafakturowano netto", "=SUM('4 Wysyłka i faktura'!G2:G121)", '#,##0.00 "zł"')
    kpi(s, 18, "Zapłacono", "=SUM('4 Wysyłka i faktura'!J2:J121)", '#,##0.00 "zł"')
    kpi(s, 19, "Do zapłaty", "=SUM('4 Wysyłka i faktura'!K2:K121)", '#,##0.00 "zł"')
    kpi(s, 20, "Faktury nieopłacone", '=COUNTIF(\'4 Wysyłka i faktura\'!L2:L121,"Nieopłacone")')
    kpi(s, 21, "Zaakceptowane bez wysyłki", '=COUNTIF(\'1 Zapytania i wyceny\'!I2:I121,"Zaakceptowane")-COUNTA(\'4 Wysyłka i faktura\'!A2:A121)')
    s.sheet_view.showGridLines = False

    role_sheet(wb, [
        ["Biuro, handlowiec", "Przyjmuje zapytanie, wycenia, pilnuje decyzji klienta i nadaje numer zlecenia.", "1 Zapytania i wyceny", "Nr zapytania, data, klient, produkt, nakład, termin, cena jednostkowa, status wyceny, nr zlecenia"],
        ["Produkcja, operator", "Prowadzi zlecenie na maszynie i odnotowuje start, koniec oraz godziny.", "2 Produkcja", "Nr zlecenia, nr zapytania, maszyna, operator, start, koniec, status, godziny"],
        ["Kontrola jakości", "Sprawdza nakład przed wysyłką i zapisuje braki oraz co poprawić.", "3 Kontrola jakości", "Nr zlecenia, kontroler, data, wynik, braki, co poprawić"],
        ["Biuro, rozliczenia", "Wysyła, fakturuje i pilnuje zapłaty.", "4 Wysyłka i faktura", "Nr zlecenia, data wysyłki, przewoźnik, nr listu, faktura, data, zapłacono"],
        ["Właściciel, kierownik", "Czyta KPI i widzi, gdzie proces stoi.", "KPI", "Nic nie wpisuje, arkusz liczy sam"],
    ], "PrintFlow 360, podział pracy w pliku")

    slowniki(wb, {
        "Statusy wyceny": ["Nowe", "Wycenione", "Zaakceptowane", "Odrzucone"],
        "Produkty": ["Ulotki A5", "Wizytówki", "Gazetka 8 stron", "Teczki firmowe", "Plakaty B2", "Naklejki", "Katalog", "Baner"],
        "Statusy produkcji": ["Kolejka", "W druku", "Po druku", "Gotowe", "Wstrzymane"],
        "Wynik kontroli": ["Przyjęte", "Do poprawy", "Odrzucone"],
        "Maszyny": ["Offset B2", "Cyfrowa SRA3", "Ploter", "Zewnętrzny podwykonawca"],
        "Przewoźnicy": ["Kurier", "Odbiór własny", "Transport własny", "Paczkomat"],
    })
    lista(z, "Słowniki!$A$2:$A$5", f"I2:I{N+1}")
    lista(z, "Słowniki!$B$2:$B$9", f"D2:D{N+1}")
    lista(p, "Słowniki!$C$2:$C$6", f"J2:J{N+1}")
    lista(p, "Słowniki!$E$2:$E$5", f"F2:F{N+1}")
    lista(k, "Słowniki!$D$2:$D$4", f"D2:D{N+1}")
    lista(f, "Słowniki!$F$2:$F$5", f"C2:C{N+1}")

    instrukcja(wb, "PrintFlow 360, proces od zapytania do zapłaty", [
        "Do czego to służy:",
        "Ten plik odwzorowuje proces z PrintFlow 360: zapytanie, wycena, produkcja, kontrola jakości, wysyłka i faktura.",
        "Każdy etap ma swój arkusz i swoją rolę, a dane przechodzą między arkuszami po numerze zlecenia.",
        "",
        "Jak używać:",
        "1. Zajrzyj do arkusza Role. Tam jest napisane, kto wypełnia który arkusz i które kolumny.",
        "2. Wypełniaj tylko jasnożółte komórki. Zielone liczą się same, w tym klient, produkt i nakład przeniesione z zapytania.",
        "3. Biuro nadaje numer zlecenia w kolumnie Nr zlecenia po akceptacji wyceny. Ten numer spina wszystkie etapy.",
        "4. Statusy i słowniki wybierasz z listy. Listy zmienisz w arkuszu Słowniki, bez ruszania formuł.",
        "5. Arkusz KPI pokazuje skuteczność wycen, stan produkcji, braki i pieniądze do odzyskania.",
        "",
        "Założenia wpisane w formuły:",
        "VAT liczony stawką 23 procent. Wartość netto to nakład razy cena jednostkowa. Udział braków powyżej dwóch procent podświetla się na czerwono.",
        "Wiersze przykładowe pokazują, jak dane wędrują między etapami. Skasuj je przed pracą na swoich zleceniach.",
        "",
        "Plik przygotowała Zielona Marka, zielona-marka.pl. Opis projektu: github.com/lukaszst-cz/printflow-360",
    ])
    wb.save(path)


# ------------------------------------------------------------ TransportFlow
def transportflow(path):
    N = 120
    wb = Workbook()
    wb.remove(wb.active)

    zal = base(wb.create_sheet("Założenia"))
    zal.column_dimensions["A"].width = 44
    zal.column_dimensions["B"].width = 16
    naglowek_sekcji(zal, 1, "Stawki i normy")
    dane = [("Cena litra paliwa", 6.4, '#,##0.00 "zł"'),
            ("Norma spalania (l / 100 km)", 28, '#,##0.0'),
            ("Opłaty drogowe na 100 km", 22, '#,##0.00 "zł"'),
            ("Stawka VAT", 0.23, '0%'),
            ("Minimalna marża", 0.12, '0%')]
    for i, (label, value, fmt) in enumerate(dane, start=3):
        zal.cell(row=i, column=1, value=label).font = Font(name=ARIAL, bold=True, size=11)
        c = zal.cell(row=i, column=2, value=value)
        c.font = Font(name=ARIAL, size=11)
        c.fill = INPUT
        c.border = BOX
        c.number_format = fmt
    zal.sheet_view.showGridLines = False

    # 1. DYSPOZYTOR: kalkulacja
    k = base(wb.create_sheet("1 Kalkulacja trasy"))
    head(k, ["Nr zlecenia", "Data zapytania", "Zleceniodawca", "Trasa", "Kilometry",
             "Stawka za km", "Fracht netto", "Paliwo (szacunek)", "Opłaty (szacunek)",
             "Marża szacowana", "Decyzja"],
         [13, 15, 24, 26, 11, 13, 14, 16, 16, 16, 16])
    kal = [
        ["TF-001", "=TODAY()-2", "Przykładowy spedytor", "Marki - Poznań", 320, 5.8, None, None, None, None, "Przyjęte"],
        ["TF-002", "=TODAY()-1", "Hurtownia budowlana", "Warszawa - Gdańsk", 380, 6.3, None, None, None, None, "Przyjęte"],
        ["TF-003", "=TODAY()", "Producent okien", "Radzymin - Łódź", 150, 10.6, None, None, None, None, "Wycenione"],
        ["TF-004", "=TODAY()", "Sklep ogrodniczy", "Marki - Lublin", 190, 11.0, None, None, None, None, "Przyjęte"],
    ]
    for i, row in enumerate(kal, start=2):
        put(k, i, row, money=(6, 7, 8, 9), dates=(2,), pct=(10,), formula_cols=(7, 8, 9, 10))
    for r in range(2, N + 2):
        k.cell(row=r, column=7, value=f'=IF(A{r}="","",E{r}*F{r})').number_format = '#,##0.00 "zł"'
        k.cell(row=r, column=8, value=f'=IF(A{r}="","",E{r}/100*Założenia!$B$4*Założenia!$B$3)').number_format = '#,##0.00 "zł"'
        k.cell(row=r, column=9, value=f'=IF(A{r}="","",E{r}/100*Założenia!$B$5)').number_format = '#,##0.00 "zł"'
        c = k.cell(row=r, column=10, value=f'=IFERROR(IF(A{r}="","",(G{r}-H{r}-I{r})/G{r}),"")')
        c.number_format = '0%'
    wiersze_robocze(k, 11, len(kal) + 2, N + 1, dates=(2,), money=(6, 7, 8, 9), formula_cols=(7, 8, 9, 10))
    k.conditional_formatting.add(f"J2:J{N+1}", CellIsRule(operator="lessThan", formula=["Założenia!$B$7"], fill=PatternFill("solid", fgColor="FFD6D6")))

    # 2. KIEROWCA: przewozy
    p = base(wb.create_sheet("2 Przewóz"))
    head(p, ["Nr zlecenia", "Kierowca", "Pojazd", "Data załadunku", "Data dostawy",
             "Kilometry rzeczywiste", "Paliwo (litry)", "Opłaty drogowe", "Status", "Uwagi z trasy"],
         [13, 16, 14, 15, 14, 18, 15, 15, 15, 34])
    prz = [
        ["TF-001", "Jan K.", "WZ 1234A", "=TODAY()-1", "=TODAY()", 326, 92, 95, "Dostarczone", "Rozładunek 40 min"],
        ["TF-002", "Marek W.", "WZ 5678B", "=TODAY()", "=TODAY()+1", 0, 0, 0, "W trasie", ""],
        ["TF-004", "Piotr S.", "WZ 9012C", "=TODAY()-3", "=TODAY()-2", 194, 54, 60, "Dostarczone", ""],
    ]
    for i, row in enumerate(prz, start=2):
        put(p, i, row, money=(8,), dates=(4, 5))
    wiersze_robocze(p, 10, len(prz) + 2, N + 1, dates=(4, 5), money=(8,))

    # 3. BIURO: rozliczenie
    r3 = base(wb.create_sheet("3 Rozliczenie"))
    head(r3, ["Nr zlecenia", "Fracht netto", "Koszt paliwa", "Opłaty drogowe", "Wynik",
              "Stawka za km", "Faktura nr", "Data faktury", "Brutto", "Zapłacono",
              "Do zapłaty", "Status płatności"],
         [13, 14, 14, 14, 14, 13, 14, 14, 14, 14, 14, 18])
    roz = [
        ["TF-001", None, None, None, None, None, "FV 11/2026", "=TODAY()", None, 0, None, None],
        ["TF-004", None, None, None, None, None, "FV 12/2026", "=TODAY()-1", None, 2583, None, None],
    ]
    for i, row in enumerate(roz, start=2):
        put(r3, i, row, money=(2, 3, 4, 5, 6, 9, 10, 11), dates=(8,), formula_cols=(2, 3, 4, 5, 6, 9, 11, 12))
    for r in range(2, N + 2):
        r3.cell(row=r, column=2,
                value=f'=IFERROR(IF($A{r}="","",INDEX(\'1 Kalkulacja trasy\'!$G$2:$G${N+1},MATCH($A{r},\'1 Kalkulacja trasy\'!$A$2:$A${N+1},0))),"")').number_format = '#,##0.00 "zł"'
        r3.cell(row=r, column=3,
                value=f'=IFERROR(IF($A{r}="","",INDEX(\'2 Przewóz\'!$G$2:$G${N+1},MATCH($A{r},\'2 Przewóz\'!$A$2:$A${N+1},0))*Założenia!$B$3),"")').number_format = '#,##0.00 "zł"'
        r3.cell(row=r, column=4,
                value=f'=IFERROR(IF($A{r}="","",INDEX(\'2 Przewóz\'!$H$2:$H${N+1},MATCH($A{r},\'2 Przewóz\'!$A$2:$A${N+1},0))),"")').number_format = '#,##0.00 "zł"'
        r3.cell(row=r, column=5, value=f'=IF(B{r}="","",B{r}-C{r}-D{r})').number_format = '#,##0.00 "zł"'
        r3.cell(row=r, column=6,
                value=f'=IFERROR(IF($A{r}="","",B{r}/INDEX(\'2 Przewóz\'!$F$2:$F${N+1},MATCH($A{r},\'2 Przewóz\'!$A$2:$A${N+1},0))),"")').number_format = '#,##0.00 "zł"'
        r3.cell(row=r, column=9, value=f'=IF(B{r}="","",B{r}*(1+Założenia!$B$6))').number_format = '#,##0.00 "zł"'
        r3.cell(row=r, column=11, value=f'=IF(I{r}="","",I{r}-J{r})').number_format = '#,##0.00 "zł"'
        r3.cell(row=r, column=12, value=f'=IF(A{r}="","",IF(K{r}<=0,"Zapłacone",IF(J{r}>0,"Częściowo","Nieopłacone")))')
    wiersze_robocze(r3, 12, len(roz) + 2, N + 1, dates=(8,), money=(2, 3, 4, 5, 6, 9, 10, 11), formula_cols=(2, 3, 4, 5, 6, 9, 11, 12))
    r3.conditional_formatting.add(f"E2:E{N+1}", CellIsRule(operator="lessThan", formula=["0"], fill=PatternFill("solid", fgColor="FFD6D6")))

    s = base(wb.create_sheet("KPI"))
    for col, width in (("A", 44), ("B", 20), ("C", 20), ("D", 18)):
        s.column_dimensions[col].width = width
    naglowek_sekcji(s, 1, "Przewozy w liczbach")
    kpi(s, 3, "Wyceny w pliku", "=COUNTA('1 Kalkulacja trasy'!A2:A121)")
    kpi(s, 4, "Przyjęte zlecenia", '=COUNTIF(\'1 Kalkulacja trasy\'!K2:K121,"Przyjęte")')
    kpi(s, 5, "Wyceny bez decyzji", '=COUNTIF(\'1 Kalkulacja trasy\'!K2:K121,"Wycenione")')
    kpi(s, 6, "Zlecenia w trasie", '=COUNTIF(\'2 Przewóz\'!I2:I121,"W trasie")')
    kpi(s, 7, "Dostarczone", '=COUNTIF(\'2 Przewóz\'!I2:I121,"Dostarczone")')
    naglowek_sekcji(s, 9, "Kilometry i paliwo")
    kpi(s, 10, "Kilometry rzeczywiste", "=SUM('2 Przewóz'!F2:F121)", '#,##0')
    kpi(s, 11, "Paliwo (litry)", "=SUM('2 Przewóz'!G2:G121)", '#,##0')
    kpi(s, 12, "Średnie spalanie (l / 100 km)", "=IFERROR(SUM('2 Przewóz'!G2:G121)/SUM('2 Przewóz'!F2:F121)*100,0)", '#,##0.0')
    kpi(s, 13, "Różnica wobec normy", "=IFERROR(SUM('2 Przewóz'!G2:G121)/SUM('2 Przewóz'!F2:F121)*100-Założenia!$B$4,0)", '#,##0.0')
    naglowek_sekcji(s, 15, "Pieniądze")
    kpi(s, 16, "Fracht netto rozliczony", "=SUM('3 Rozliczenie'!B2:B121)", '#,##0.00 "zł"')
    kpi(s, 17, "Koszty paliwa i opłat", "=SUM('3 Rozliczenie'!C2:C121)+SUM('3 Rozliczenie'!D2:D121)", '#,##0.00 "zł"')
    kpi(s, 18, "Wynik po kosztach", "=SUM('3 Rozliczenie'!E2:E121)", '#,##0.00 "zł"')
    kpi(s, 19, "Marża na rozliczonych", "=IFERROR(SUM('3 Rozliczenie'!E2:E121)/SUM('3 Rozliczenie'!B2:B121),0)", '0%')
    kpi(s, 20, "Do zapłaty od klientów", "=SUM('3 Rozliczenie'!K2:K121)", '#,##0.00 "zł"')
    kpi(s, 21, "Dostarczone bez faktury", "=COUNTIF('2 Przewóz'!I2:I121,\"Dostarczone\")-COUNTA('3 Rozliczenie'!A2:A121)")
    naglowek_sekcji(s, 23, "Wynik na kierowcę")
    for i, label in enumerate(["Kierowca", "Przewozy", "Kilometry", "Paliwo (l)"], start=1):
        c = s.cell(row=24, column=i, value=label)
        c.font = Font(name=ARIAL, bold=True)
        c.fill = HEAD
    for i, name in enumerate(["Jan K.", "Marek W.", "Piotr S.", ""], start=25):
        s.cell(row=i, column=1, value=name).fill = INPUT
        s.cell(row=i, column=1).font = Font(name=ARIAL, size=11)
        s.cell(row=i, column=2, value=f'=IF(A{i}="","",COUNTIF(\'2 Przewóz\'!$B$2:$B$121,A{i}))')
        s.cell(row=i, column=3, value=f'=IF(A{i}="","",SUMIF(\'2 Przewóz\'!$B$2:$B$121,A{i},\'2 Przewóz\'!$F$2:$F$121))').number_format = '#,##0'
        s.cell(row=i, column=4, value=f'=IF(A{i}="","",SUMIF(\'2 Przewóz\'!$B$2:$B$121,A{i},\'2 Przewóz\'!$G$2:$G$121))').number_format = '#,##0'
    s.sheet_view.showGridLines = False

    role_sheet(wb, [
        ["Dyspozytor", "Wycenia trasę, sprawdza marżę i decyduje, czy zlecenie przyjąć.", "1 Kalkulacja trasy", "Nr zlecenia, data, zleceniodawca, trasa, kilometry, stawka za km, decyzja"],
        ["Kierowca", "Zapisuje przebieg trasy: kilometry, paliwo, opłaty i status.", "2 Przewóz", "Nr zlecenia, kierowca, pojazd, daty, kilometry, paliwo, opłaty, status, uwagi"],
        ["Biuro, rozliczenia", "Fakturuje i pilnuje zapłaty. Koszty pobiera z arkusza kierowcy.", "3 Rozliczenie", "Nr zlecenia, faktura, data faktury, zapłacono"],
        ["Właściciel, kierownik", "Czyta KPI: marżę, spalanie wobec normy i pieniądze do odzyskania.", "KPI", "Tylko nazwiska kierowców w tabeli na dole"],
    ], "TransportFlow 360, podział pracy w pliku")

    slowniki(wb, {
        "Decyzje": ["Nowe", "Wycenione", "Przyjęte", "Odrzucone"],
        "Statusy przewozu": ["Zaplanowane", "W trasie", "Dostarczone", "Anulowane"],
        "Kierowcy": ["Jan K.", "Marek W.", "Piotr S."],
        "Pojazdy": ["WZ 1234A", "WZ 5678B", "WZ 9012C"],
    })
    lista(k, "Słowniki!$A$2:$A$5", f"K2:K{N+1}")
    lista(p, "Słowniki!$B$2:$B$5", f"I2:I{N+1}")
    lista(p, "Słowniki!$C$2:$C$4", f"B2:B{N+1}")
    lista(p, "Słowniki!$D$2:$D$4", f"C2:C{N+1}")

    instrukcja(wb, "TransportFlow 360, od wyceny trasy do zapłaty", [
        "Do czego to służy:",
        "Plik odwzorowuje proces z TransportFlow 360: kalkulacja trasy, przewóz, dokumenty i rozliczenie wyniku.",
        "Każda rola ma swój arkusz, a dane spina numer zlecenia.",
        "",
        "Jak używać:",
        "1. Zajrzyj do arkusza Role, tam jest napisane, kto wypełnia który arkusz.",
        "2. W arkuszu Założenia ustaw cenę paliwa, normę spalania, opłaty na 100 km, VAT i minimalną marżę. To jedyne miejsce ze stawkami.",
        "3. Dyspozytor wycenia trasę. Marża poniżej minimalnej podświetla się na czerwono, zanim zlecenie zostanie przyjęte.",
        "4. Kierowca wpisuje kilometry rzeczywiste, zatankowane litry i opłaty.",
        "5. Biuro widzi w arkuszu Rozliczenie gotowy wynik: fracht minus paliwo i opłaty, plus brutto i kwotę do zapłaty.",
        "6. Arkusz KPI porównuje realne spalanie z normą i pokazuje, co dostarczono, a jeszcze nie zafakturowano.",
        "",
        "Założenia wpisane w formuły:",
        "Koszt paliwa to zatankowane litry razy cena litra z Założeń. Szacunek przy wycenie liczy się z normy spalania, a nie z faktycznego tankowania.",
        "Wiersze przykładowe pokazują przepływ. Skasuj je przed pracą na swoich zleceniach.",
        "",
        "Plik przygotowała Zielona Marka, zielona-marka.pl. Opis projektu: github.com/lukaszst-cz/transportflow-360",
    ])
    wb.save(path)


# --------------------------------------------------------------- Dashboard
def dashboard(path):
    wb = Workbook()
    wb.remove(wb.active)
    z = base(wb.create_sheet("Zlecenia"))
    head(z, ["Numer", "Klient", "Osoba odpowiedzialna", "Data przyjęcia", "Termin",
             "Etap", "Priorytet", "Wartość netto", "Zafakturowano", "Do zafakturowania",
             "Dni w realizacji", "Opóźnienie (dni)"],
         [11, 24, 22, 14, 13, 18, 12, 14, 14, 17, 14, 14])
    przyklady = [
        ["ZL-001", "Przykładowy klient", "Łukasz", "=TODAY()-9", "=TODAY()+5", "W realizacji", "Wysoki", 2400, 0, None, None, None],
        ["ZL-002", "Warsztat mechaniczny", "Łukasz", "=TODAY()-8", "=TODAY()+3", "Czeka na klienta", "Średni", 1750, 500, None, None, None],
        ["ZL-003", "Drukarnia", "Podwykonawca", "=TODAY()-7", "=TODAY()-1", "Zakończone", "Średni", 980, 980, None, None, None],
        ["ZL-004", "Hurtownia elektryczna", "Łukasz", "=TODAY()-1", "=TODAY()+13", "Nowe", "Niski", 3200, 0, None, None, None],
    ]
    for i, row in enumerate(przyklady, start=2):
        put(z, i, row, money=(8, 9, 10), dates=(4, 5), formula_cols=(10, 11, 12))
    for r in range(2, ROWS + 2):
        z.cell(row=r, column=10, value=f'=IF(A{r}="","",H{r}-I{r})').number_format = '#,##0.00 "zł"'
        z.cell(row=r, column=11, value=f'=IF(OR(A{r}="",D{r}=""),"",TODAY()-D{r})')
        z.cell(row=r, column=12, value=f'=IF(OR(A{r}="",E{r}=""),"",IF(F{r}="Zakończone",0,MAX(0,TODAY()-E{r})))')
        for col in range(1, 13):
            cell = z.cell(row=r, column=col)
            cell.border = BOX
            cell.font = Font(name=ARIAL, size=11, color="1D6F42") if col in (10, 11, 12) else Font(name=ARIAL, size=11)
            if col not in (10, 11, 12) and r > len(przyklady) + 1:
                cell.fill = INPUT
            if col in (4, 5):
                cell.number_format = 'yyyy-mm-dd'
            if col in (8, 9):
                cell.number_format = '#,##0.00 "zł"'
    z.conditional_formatting.add(f"L2:L{ROWS+1}", CellIsRule(operator="greaterThan", formula=["0"], fill=PatternFill("solid", fgColor="FFD6D6")))
    w = base(wb.create_sheet("Wskaźniki"))
    for col, width in (("A", 42), ("B", 20), ("C", 18), ("D", 18)):
        w.column_dimensions[col].width = width
    naglowek_sekcji(w, 1, "Stan na dziś")
    kpi(w, 3, "Data odczytu", "=TODAY()", 'yyyy-mm-dd')
    kpi(w, 4, "Zlecenia w pliku", "=COUNTA(Zlecenia!A2:A201)")
    kpi(w, 5, "W toku", '=COUNTIFS(Zlecenia!F2:F201,"<>Zakończone",Zlecenia!A2:A201,"<>")')
    kpi(w, 6, "Po terminie", '=COUNTIFS(Zlecenia!L2:L201,">0")')
    kpi(w, 7, "Wartość zleceń w toku", '=SUMIFS(Zlecenia!H2:H201,Zlecenia!F2:F201,"<>Zakończone")', '#,##0.00 "zł"')
    kpi(w, 8, "Do zafakturowania", "=SUM(Zlecenia!J2:J201)", '#,##0.00 "zł"')
    kpi(w, 9, "Średni czas w realizacji (dni)", '=IFERROR(AVERAGEIFS(Zlecenia!K2:K201,Zlecenia!F2:F201,"<>Zakończone"),0)', '0.0')
    naglowek_sekcji(w, 11, "Etapy")
    for i, label in enumerate(["Etap", "Liczba", "Wartość netto", "Udział"], start=1):
        c = w.cell(row=12, column=i, value=label)
        c.font = Font(name=ARIAL, bold=True)
        c.fill = HEAD
    etapy = ["Nowe", "W realizacji", "Czeka na klienta", "Do odbioru", "Zakończone"]
    for i, et in enumerate(etapy, start=13):
        w.cell(row=i, column=1, value=et).font = Font(name=ARIAL, size=11)
        w.cell(row=i, column=2, value=f'=COUNTIF(Zlecenia!$F$2:$F$201,A{i})')
        v = w.cell(row=i, column=3, value=f'=SUMIF(Zlecenia!$F$2:$F$201,A{i},Zlecenia!$H$2:$H$201)')
        v.number_format = '#,##0.00 "zł"'
        u = w.cell(row=i, column=4, value=f'=IFERROR(B{i}/COUNTA(Zlecenia!$A$2:$A$201),0)')
        u.number_format = '0%'
    naglowek_sekcji(w, 20, "Obciążenie osób")
    for i, label in enumerate(["Osoba", "Zlecenia w toku", "Wartość w toku"], start=1):
        c = w.cell(row=21, column=i, value=label)
        c.font = Font(name=ARIAL, bold=True)
        c.fill = HEAD
    for i, person in enumerate(["Łukasz", "Podwykonawca", "", ""], start=22):
        w.cell(row=i, column=1, value=person).fill = INPUT
        w.cell(row=i, column=1).font = Font(name=ARIAL, size=11)
        w.cell(row=i, column=2, value=f'=IF(A{i}="","",COUNTIFS(Zlecenia!$C$2:$C$201,A{i},Zlecenia!$F$2:$F$201,"<>Zakończone"))')
        v = w.cell(row=i, column=3, value=f'=IF(A{i}="","",SUMIFS(Zlecenia!$H$2:$H$201,Zlecenia!$C$2:$C$201,A{i},Zlecenia!$F$2:$F$201,"<>Zakończone"))')
        v.number_format = '#,##0.00 "zł"'
    w.sheet_view.showGridLines = False
    slowniki(wb, {"Etapy": etapy, "Priorytety": ["Wysoki", "Średni", "Niski"], "Osoby": ["Łukasz", "Podwykonawca"]})
    lista(z, "Słowniki!$A$2:$A$6", f"F2:F{ROWS+1}")
    lista(z, "Słowniki!$B$2:$B$4", f"G2:G{ROWS+1}")
    lista(z, "Słowniki!$C$2:$C$3", f"C2:C{ROWS+1}")
    role_sheet(wb, [
        ["Osoba prowadząca zlecenie", "Wpisuje zlecenie, przesuwa etap i odnotowuje, ile już zafakturowano.", "Zlecenia", "Numer, klient, osoba, daty, etap, priorytet, wartość, zafakturowano"],
        ["Właściciel, kierownik", "Patrzy, co stoi, co jest po terminie i kto ma za dużo na głowie.", "Wskaźniki", "Tylko imiona w tabeli Obciążenie osób"],
        ["Biuro", "Pilnuje kwoty do zafakturowania i uzupełnia słowniki.", "Słowniki", "Etapy, priorytety, osoby"],
    ], "Dashboard operacyjny, podział pracy w pliku")
    instrukcja(wb, "Dashboard operacyjny, zlecenia i wskaźniki", [
        "Do czego to służy:",
        "Jeden arkusz na zlecenia i drugi, który sam liczy, ile jest w toku, co jest po terminie i ile zostało do zafakturowania.",
        "",
        "Jak używać:",
        "1. Wpisuj zlecenia w arkuszu Zlecenia, w jasnożółtych komórkach.",
        "2. Etap, priorytet i osobę wybierasz z listy. Listy zmienisz w arkuszu Słowniki.",
        "3. Czerwone pole w kolumnie Opóźnienie oznacza przekroczony termin.",
        "4. Arkusz Wskaźniki czyta wszystko sam. W tabeli Obciążenie osób wpisz imiona tak jak w kolumnie Osoba odpowiedzialna.",
        "",
        "Założenia wpisane w formuły:",
        "Zlecenie jest w toku, dopóki etap nie brzmi Zakończone. Opóźnienie to liczba dni po terminie, liczona od dzisiejszej daty.",
        "Pierwsze cztery wiersze to dane przykładowe.",
        "",
        "Plik przygotowała Zielona Marka, zielona-marka.pl.",
    ])
    wb.save(path)


# ---------------------------------------------------------------- Kalkulator
def kalkulator(path):
    wb = Workbook()
    wb.remove(wb.active)
    zal = base(wb.create_sheet("Założenia"))
    zal.column_dimensions["A"].width = 40
    zal.column_dimensions["B"].width = 18
    naglowek_sekcji(zal, 1, "Stawki i parametry")
    dane = [("Stawka VAT", 0.23, '0%'), ("Stawka godzinowa", 120, '#,##0.00 "zł"'),
            ("Rabat dla wariantu podstawowego", 0.0, '0%'),
            ("Rabat dla wariantu rozszerzonego", 0.05, '0%'),
            ("Rabat dla wariantu premium", 0.1, '0%'),
            ("Zaliczka", 0.3, '0%')]
    for i, (label, value, fmt) in enumerate(dane, start=3):
        zal.cell(row=i, column=1, value=label).font = Font(name=ARIAL, bold=True, size=11)
        c = zal.cell(row=i, column=2, value=value)
        c.font = Font(name=ARIAL, size=11)
        c.fill = INPUT
        c.number_format = fmt
        c.border = BOX
    zal.sheet_view.showGridLines = False
    w = base(wb.create_sheet("Wycena"))
    head(w, ["Pozycja", "Opis", "Ilość", "Jednostka", "Cena jedn. netto", "Rabat",
             "Wartość netto", "VAT", "Brutto", "Godziny", "Koszt godzin"],
         [26, 34, 9, 13, 16, 10, 15, 13, 15, 10, 15])
    pozycje = [
        ["Strona WWW", "Wizytówka z formularzem zapytań", 1, "szt.", 1449, 0, None, None, None, 10, None],
        ["Gazetka", "Osiem stron, plik PDF do druku", 1, "szt.", 900, 0.1, None, None, None, 8, None],
        ["Logo", "Znak, wersje do druku i na ekran", 1, "szt.", 600, 0, None, None, None, 6, None],
        ["Opieka", "Pakiet miesięczny, aktualizacje", 12, "mies.", 120, 0.05, None, None, None, 1, None],
    ]
    for i, row in enumerate(pozycje, start=2):
        put(w, i, row, money=(5, 7, 8, 9, 11), pct=(6,), formula_cols=(7, 8, 9, 11))
    for r in range(2, 61):
        w.cell(row=r, column=7, value=f'=IF(A{r}="","",C{r}*E{r}*(1-F{r}))').number_format = '#,##0.00 "zł"'
        w.cell(row=r, column=8, value=f'=IF(G{r}="","",G{r}*Założenia!$B$3)').number_format = '#,##0.00 "zł"'
        w.cell(row=r, column=9, value=f'=IF(G{r}="","",G{r}+H{r})').number_format = '#,##0.00 "zł"'
        w.cell(row=r, column=11, value=f'=IF(J{r}="","",J{r}*C{r}*Założenia!$B$4)').number_format = '#,##0.00 "zł"'
        for col in range(1, 12):
            cell = w.cell(row=r, column=col)
            cell.border = BOX
            cell.font = Font(name=ARIAL, size=11, color="1D6F42") if col in (7, 8, 9, 11) else Font(name=ARIAL, size=11)
            if col not in (7, 8, 9, 11) and r > len(pozycje) + 1:
                cell.fill = INPUT
            if col == 5:
                cell.number_format = '#,##0.00 "zł"'
            if col == 6:
                cell.number_format = '0%'
    w.cell(row=62, column=1, value="Razem").font = Font(name=ARIAL, bold=True, size=12)
    for col, letter in ((7, "G"), (8, "H"), (9, "I"), (11, "K")):
        c = w.cell(row=62, column=col, value=f'=SUM({letter}2:{letter}61)')
        c.font = Font(name=ARIAL, bold=True, size=12, color=GREEN)
        c.number_format = '#,##0.00 "zł"'
    war = base(wb.create_sheet("Warianty"))
    for col, width in (("A", 30), ("B", 18), ("C", 18), ("D", 18), ("E", 20)):
        war.column_dimensions[col].width = width
    naglowek_sekcji(war, 1, "Trzy warianty tej samej oferty")
    for i, label in enumerate(["Wariant", "Rabat", "Netto", "Brutto", "Zaliczka"], start=1):
        c = war.cell(row=3, column=i, value=label)
        c.font = Font(name=ARIAL, bold=True)
        c.fill = HEAD
    warianty = [("Podstawowy", "Założenia!$B$5"), ("Rozszerzony", "Założenia!$B$6"), ("Premium", "Założenia!$B$7")]
    for i, (name, rabat) in enumerate(warianty, start=4):
        war.cell(row=i, column=1, value=name).font = Font(name=ARIAL, size=11, bold=True)
        r = war.cell(row=i, column=2, value=f'={rabat}')
        r.number_format = '0%'
        n = war.cell(row=i, column=3, value=f'=Wycena!$G$62*(1-B{i})')
        n.number_format = '#,##0.00 "zł"'
        b = war.cell(row=i, column=4, value=f'=C{i}*(1+Założenia!$B$3)')
        b.number_format = '#,##0.00 "zł"'
        z = war.cell(row=i, column=5, value=f'=D{i}*Założenia!$B$8')
        z.number_format = '#,##0.00 "zł"'
    war.cell(row=9, column=1, value="Różnica między premium a podstawowym").font = Font(name=ARIAL, bold=True)
    d = war.cell(row=9, column=3, value="=C4-C6")
    d.number_format = '#,##0.00 "zł"'
    d.font = Font(name=ARIAL, bold=True, color=GREEN)
    war.sheet_view.showGridLines = False
    slowniki(wb, {"Jednostki": ["szt.", "mies.", "godz.", "strona", "komplet"]})
    lista(w, "Słowniki!$A$2:$A$6", "D2:D61")
    role_sheet(wb, [
        ["Właściciel", "Ustala stawki: VAT, godzinę pracy, rabaty wariantów i zaliczkę.", "Założenia", "Wszystkie żółte pola"],
        ["Handlowiec", "Rozpisuje ofertę na pozycje i sprawdza, czy cena pokrywa godziny.", "Wycena", "Pozycja, opis, ilość, jednostka, cena, rabat, godziny"],
        ["Handlowiec i klient", "Porównują trzy warianty ceny tej samej oferty.", "Warianty", "Nic nie wpisują, arkusz liczy sam"],
    ], "Kalkulator wariantów, podział pracy w pliku")
    instrukcja(wb, "Kalkulator wariantów oferty", [
        "Do czego to służy:",
        "Policzysz ofertę pozycja po pozycji, a potem zobaczysz trzy warianty ceny bez przepisywania liczb.",
        "",
        "Jak używać:",
        "1. W arkuszu Założenia ustaw VAT, stawkę godzinową, rabaty i zaliczkę. To jedyne miejsce, gdzie zmieniasz stawki.",
        "2. W arkuszu Wycena wpisuj pozycje w jasnożółtych komórkach. Wartość netto, VAT, brutto i koszt godzin liczą się same.",
        "3. Wiersz Razem na dole sumuje całą ofertę.",
        "4. Arkusz Warianty pokazuje trzy ceny tej samej oferty z rabatami z Założeń i wysokość zaliczki.",
        "",
        "Założenia wpisane w formuły:",
        "Wartość netto to ilość razy cena razy jeden minus rabat. Koszt godzin służy do sprawdzenia, czy cena pokrywa pracę.",
        "Cztery pierwsze pozycje to przykład. Skasuj je przed pracą na swojej ofercie.",
        "",
        "Plik przygotowała Zielona Marka, zielona-marka.pl.",
    ])
    wb.save(path)


# ------------------------------------------------------------------- Rejestr
def rejestr(path):
    wb = Workbook()
    wb.remove(wb.active)
    k = base(wb.create_sheet("Kontakty"))
    head(k, ["Firma", "Osoba", "Telefon", "E-mail", "Źródło", "Etap", "Data pierwszego kontaktu",
             "Ostatni kontakt", "Następny krok", "Termin następnego kroku", "Szansa", "Wartość oferty",
             "Wartość ważona", "Dni bez kontaktu"],
         [26, 20, 15, 26, 16, 16, 18, 15, 28, 18, 10, 15, 15, 15])
    przyklady = [
        ["Przykładowa firma", "Jan Kowalski", "600 000 000", "jan@przyklad.pl", "Polecenie", "Oferta", "=TODAY()-9", "=TODAY()-7", "Wysłać ofertę", "=TODAY()+1", 0.6, 4800, None, None],
        ["Hurtownia budowlana", "Anna Nowak", "600 000 001", "biuro@przyklad.pl", "Telefon", "Rozmowa", "=TODAY()-20", "=TODAY()-18", "Przypomnieć w piątek", "=TODAY()+2", 0.3, 9000, None, None],
        ["Warsztat przy trasie", "Marek Zieliński", "600 000 002", "warsztat@przyklad.pl", "Strona WWW", "Nowy", "=TODAY()-5", "=TODAY()-5", "Zadzwonić", "=TODAY()", 0.2, 2600, None, None],
        ["Gabinet stomatologiczny", "Ewa Lis", "600 000 003", "gabinet@przyklad.pl", "Polecenie", "Zlecenie", "=TODAY()-11", "=TODAY()-2", "Umowa do podpisu", "=TODAY()+3", 0.9, 5400, None, None],
    ]
    for i, row in enumerate(przyklady, start=2):
        put(k, i, row, money=(12, 13), dates=(7, 8, 10), pct=(11,), formula_cols=(13, 14))
    for r in range(2, ROWS + 2):
        k.cell(row=r, column=13, value=f'=IF(A{r}="","",L{r}*K{r})').number_format = '#,##0.00 "zł"'
        k.cell(row=r, column=14, value=f'=IF(OR(A{r}="",H{r}=""),"",TODAY()-H{r})')
        for col in range(1, 15):
            cell = k.cell(row=r, column=col)
            cell.border = BOX
            cell.font = Font(name=ARIAL, size=11, color="1D6F42") if col in (13, 14) else Font(name=ARIAL, size=11)
            if col not in (13, 14) and r > len(przyklady) + 1:
                cell.fill = INPUT
            if col in (7, 8, 10):
                cell.number_format = 'yyyy-mm-dd'
            if col == 11:
                cell.number_format = '0%'
            if col == 12:
                cell.number_format = '#,##0.00 "zł"'
    k.conditional_formatting.add(f"N2:N{ROWS+1}", CellIsRule(operator="greaterThan", formula=["14"], fill=PatternFill("solid", fgColor="FFD6D6")))
    d = base(wb.create_sheet("Działania"))
    head(d, ["Data", "Firma", "Rodzaj", "Co ustalono", "Następny krok", "Termin"],
         [14, 26, 16, 44, 32, 14])
    dzialania = [
        ["=TODAY()-7", "Przykładowa firma", "Telefon", "Potrzebuje strony z formularzem zapytań", "Wysłać ofertę", "=TODAY()+1"],
        ["=TODAY()-18", "Hurtownia budowlana", "Spotkanie", "Interesuje ich gazetka i katalog", "Przypomnieć w piątek", "=TODAY()+2"],
        ["=TODAY()-2", "Gabinet stomatologiczny", "E-mail", "Zaakceptowali wycenę", "Umowa do podpisu", "=TODAY()+3"],
    ]
    for i, row in enumerate(dzialania, start=2):
        put(d, i, row, dates=(1, 6))
    for r in range(len(dzialania) + 2, 121):
        for col in range(1, 7):
            cell = d.cell(row=r, column=col)
            cell.border = BOX
            cell.fill = INPUT
            cell.font = Font(name=ARIAL, size=11)
            if col in (1, 6):
                cell.number_format = 'yyyy-mm-dd'
    s = base(wb.create_sheet("Podsumowanie"))
    for col, width in (("A", 40), ("B", 18), ("C", 20), ("D", 20)):
        s.column_dimensions[col].width = width
    naglowek_sekcji(s, 1, "Lejek i zaległości")
    kpi(s, 3, "Kontaktów w pliku", "=COUNTA(Kontakty!A2:A201)")
    kpi(s, 4, "Wartość wszystkich ofert", "=SUM(Kontakty!L2:L201)", '#,##0.00 "zł"')
    kpi(s, 5, "Wartość ważona szansą", "=SUM(Kontakty!M2:M201)", '#,##0.00 "zł"')
    kpi(s, 6, "Bez kontaktu ponad 14 dni", '=COUNTIFS(Kontakty!N2:N201,">14")')
    kpi(s, 7, "Zlecenia zdobyte", '=COUNTIF(Kontakty!F2:F201,"Zlecenie")')
    kpi(s, 8, "Skuteczność", '=IFERROR(COUNTIF(Kontakty!F2:F201,"Zlecenie")/COUNTA(Kontakty!A2:A201),0)', '0%')
    naglowek_sekcji(s, 10, "Etapy")
    for i, label in enumerate(["Etap", "Liczba", "Wartość ofert", "Wartość ważona"], start=1):
        c = s.cell(row=11, column=i, value=label)
        c.font = Font(name=ARIAL, bold=True)
        c.fill = HEAD
    etapy = ["Nowy", "Rozmowa", "Oferta", "Negocjacje", "Zlecenie", "Odpadł"]
    for i, et in enumerate(etapy, start=12):
        s.cell(row=i, column=1, value=et).font = Font(name=ARIAL, size=11)
        s.cell(row=i, column=2, value=f'=COUNTIF(Kontakty!$F$2:$F$201,A{i})')
        for col, src in ((3, "L"), (4, "M")):
            c = s.cell(row=i, column=col, value=f'=SUMIF(Kontakty!$F$2:$F$201,A{i},Kontakty!${src}$2:${src}$201)')
            c.number_format = '#,##0.00 "zł"'
    naglowek_sekcji(s, 20, "Skąd przychodzą klienci")
    for i, label in enumerate(["Źródło", "Liczba", "Zlecenia"], start=1):
        c = s.cell(row=21, column=i, value=label)
        c.font = Font(name=ARIAL, bold=True)
        c.fill = HEAD
    zrodla = ["Polecenie", "Telefon", "Strona WWW", "Targi", "Inne"]
    for i, zr in enumerate(zrodla, start=22):
        s.cell(row=i, column=1, value=zr).font = Font(name=ARIAL, size=11)
        s.cell(row=i, column=2, value=f'=COUNTIF(Kontakty!$E$2:$E$201,A{i})')
        s.cell(row=i, column=3, value=f'=COUNTIFS(Kontakty!$E$2:$E$201,A{i},Kontakty!$F$2:$F$201,"Zlecenie")')
    s.sheet_view.showGridLines = False
    slowniki(wb, {"Etapy": etapy, "Źródła": zrodla, "Rodzaje działań": ["Telefon", "E-mail", "Spotkanie", "Oferta", "Wiadomość"]})
    lista(k, "Słowniki!$A$2:$A$7", f"F2:F{ROWS+1}")
    lista(k, "Słowniki!$B$2:$B$6", f"E2:E{ROWS+1}")
    lista(d, "Słowniki!$C$2:$C$6", "C2:C120")
    role_sheet(wb, [
        ["Handlowiec", "Dopisuje firmy, ustawia etap, szansę i następny krok.", "Kontakty", "Firma, osoba, dane kontaktowe, źródło, etap, daty, następny krok, szansa, wartość"],
        ["Każdy, kto rozmawiał z klientem", "Zapisuje, co ustalono, żeby nikt nie dzwonił dwa razy w tej samej sprawie.", "Działania", "Data, firma, rodzaj, co ustalono, następny krok, termin"],
        ["Właściciel", "Czyta lejek, skuteczność i źródła klientów.", "Podsumowanie", "Nic nie wpisuje, arkusz liczy sam"],
    ], "Rejestr kontaktów, podział pracy w pliku")
    instrukcja(wb, "Rejestr kontaktów i działań", [
        "Do czego to służy:",
        "Jedno miejsce na firmy, z którymi rozmawiasz, i na to, co z nimi ustalono. Plik sam pilnuje, o kim zapomniałeś.",
        "",
        "Jak używać:",
        "1. Firmy wpisuj w arkuszu Kontakty, rozmowy w arkuszu Działania.",
        "2. Etap, źródło i rodzaj działania wybierasz z listy. Listy zmienisz w arkuszu Słowniki.",
        "3. Kolumna Szansa to prawdopodobieństwo w procentach. Wartość ważona liczy się sama i mówi, ile realnie wisi w ofertach.",
        "4. Czerwone pole w kolumnie Dni bez kontaktu oznacza, że od ostatniej rozmowy minęły ponad dwa tygodnie.",
        "5. Arkusz Podsumowanie pokazuje lejek, skuteczność i to, skąd przychodzą klienci.",
        "",
        "Założenia wpisane w formuły:",
        "Wartość ważona to wartość oferty razy szansa. Skuteczność to liczba zleceń podzielona przez liczbę kontaktów.",
        "Pierwsze wiersze to dane przykładowe.",
        "",
        "Plik przygotowała Zielona Marka, zielona-marka.pl.",
    ])
    wb.save(path)


if __name__ == "__main__":
    printflow("public/pliki/printflow-360-zielona-marka.xlsx")
    transportflow("public/pliki/transportflow-360-zielona-marka.xlsx")
    dashboard("public/pliki/dashboard-operacyjny-zielona-marka.xlsx")
    kalkulator("public/pliki/kalkulator-wariantow-oferty-zielona-marka.xlsx")
    rejestr("public/pliki/rejestr-kontaktow-zielona-marka.xlsx")
    print("gotowe")
