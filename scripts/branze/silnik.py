# -*- coding: utf-8 -*-
"""Wspólny silnik arkuszy branżowych Zielonej Marki.
Każdy plik ma: instrukcję, role, założenia z podatkami, proces branżowy,
koszty stałe, urządzenia i leasingi, pracowników, pozyskanie klientów,
obsługę posprzedażową, wynik miesiąca z VAT i podatkiem, próg rentowności,
KPI, słowniki i wzory dokumentów. Dane w wierszach są przykładowe."""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter as L
from openpyxl.formatting.rule import CellIsRule

ARIAL = "Arial"
GREEN = "1D6F42"
HEAD = PatternFill("solid", fgColor="E6F1E8")
INPUT = PatternFill("solid", fgColor="FFF9D6")
RED = PatternFill("solid", fgColor="FFD6D6")
THIN = Side(style="thin", color="C9D4CC")
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
MONEY = '#,##0.00 "zł"'
FMT = {"money": MONEY, "date": "yyyy-mm-dd", "pct": "0%", "num": "#,##0.0", "int": "#,##0", "in": None}
N = 150  # wiersze robocze w arkuszach procesu
Z = "Założenia"
OD, DO = f"{Z}!$B$3", f"{Z}!$B$4"
VAT_S, VAT_ODL, PIT, ZUS, ZDR, PRAC = (f"{Z}!$B$5", f"{Z}!$B$6", f"{Z}!$B$7",
                                       f"{Z}!$B$8", f"{Z}!$B$9", f"{Z}!$B$10")


def q(name):
    return "'" + name + "'"


def P(i):
    """Adres i-tego parametru branżowego w Założeniach (od 1)."""
    return f"{Z}!$B${12 + i}"


def sub(formula):
    return formula.replace("{OD}", OD).replace("{DO}", DO)


def font(bold=False, color=None, size=11, italic=False):
    return Font(name=ARIAL, bold=bold, size=size, color=color, italic=italic)


def header(ws, cols, row=1):
    for i, (label, width, _t) in enumerate(cols, start=1):
        c = ws.cell(row=row, column=i, value=label)
        c.font = font(True, "14432B")
        c.fill = HEAD
        c.border = BOX
        c.alignment = Alignment(vertical="center", wrap_text=True)
        ws.column_dimensions[L(i)].width = width
    ws.row_dimensions[row].height = 32
    ws.freeze_panes = ws.cell(row=row + 1, column=1)


def table(ws, cols, rows, formulas, nrows=N, start=2):
    """Tabela z kolumnami wejściowymi (żółte) i liczonymi (zielone)."""
    header(ws, cols, start - 1)
    fcols = set(formulas)
    for r in range(start, start + nrows):
        idx = r - start
        data = rows[idx] if idx < len(rows) else None
        for ci, (_l, _w, t) in enumerate(cols, start=1):
            c = ws.cell(row=r, column=ci)
            c.border = BOX
            if ci in fcols:
                c.value = sub(formulas[ci].replace("{r}", str(r)))
                c.font = font(color=GREEN)
            else:
                if data is not None and ci - 1 < len(data) and data[ci - 1] is not None:
                    v = data[ci - 1]
                    c.value = sub(v) if isinstance(v, str) else v
                c.font = font()
                c.fill = INPUT
            if FMT.get(t):
                c.number_format = FMT[t]


def section(ws, row, text, col=1):
    ws.cell(row=row, column=col, value=text).font = font(True, GREEN, 13)


def kv(ws, row, label, formula, fmt=None, note=None):
    a = ws.cell(row=row, column=1, value=label)
    a.font = font(True)
    b = ws.cell(row=row, column=2, value=sub(formula) if isinstance(formula, str) else formula)
    b.font = font(True, GREEN)
    b.border = BOX
    if fmt:
        b.number_format = FMT.get(fmt, fmt)
    if note:
        ws.cell(row=row, column=3, value=note).font = font(italic=True, color="5B6A78", size=10)


def add_list(ws, ref, target):
    dv = DataValidation(type="list", formula1=f"={ref}", allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(target)


def build(cfg):
    wb = Workbook()
    wb.remove(wb.active)
    dicts = dict(cfg["dicts"])
    dicts.setdefault("Kategorie kosztów", ["Lokal", "Media", "Ubezpieczenia", "Licencje i abonamenty",
                                           "Usługi zewnętrzne", "Opłaty urzędowe", "Pojazdy", "Inne"])
    dicts.setdefault("Formy urządzeń", ["Własne", "Leasing", "Najem", "Kredyt"])
    dicts.setdefault("Formy zatrudnienia", ["Umowa o pracę", "Umowa zlecenie", "B2B", "Właściciel"])
    dicts.setdefault("Posprzedaż rodzaj", cfg.get("after_types", ["Gwarancja", "Reklamacja", "Przypomnienie", "Prośba o opinię", "Ponowna sprzedaż"]))
    dicts.setdefault("Posprzedaż status", ["Zaplanowane", "W toku", "Załatwione", "Odrzucone"])
    names = list(dicts)

    def dref(name):
        i = names.index(name) + 1
        return f"Słowniki!${L(i)}$2:${L(i)}${len(dicts[name]) + 1}"

    # ---------- Założenia
    zal = wb.create_sheet(Z)
    zal.column_dimensions["A"].width = 46
    zal.column_dimensions["B"].width = 18
    zal.column_dimensions["C"].width = 70
    section(zal, 1, "Założenia i podatki. Wpisz swoje wartości w żółte pola.")
    base_rows = [
        ("Pierwszy dzień miesiąca raportu", "=DATE(YEAR(TODAY()),MONTH(TODAY()),1)", "date", "Zmień na inny miesiąc, żeby zobaczyć jego wynik."),
        ("Ostatni dzień miesiąca raportu", "=EOMONTH(B3,0)", "date", "Liczy się samo."),
        ("Stawka VAT od sprzedaży", cfg["vat_sales"], "pct", cfg["vat_note"]),
        ("Czy odliczasz VAT od zakupów (1 tak, 0 nie)", cfg.get("vat_deduct", 1), "int", "Przy sprzedaży zwolnionej z VAT zwykle 0. Ustal z księgową."),
        ("Stawka podatku dochodowego", cfg.get("pit", 0.19), "pct", "Przykład dla podatku liniowego. Skala, ryczałt i CIT mają inne zasady. Ustal z księgową."),
        ("ZUS właściciela miesięcznie", cfg.get("zus", 1800), "money", "Kwota przykładowa. Zmienia się co roku, wpisz swoją z deklaracji."),
        ("Składka zdrowotna miesięcznie", cfg.get("zdr", 800), "money", "Kwota przykładowa. Zależy od formy opodatkowania i dochodu."),
        ("Koszt pracodawcy ponad wynagrodzenie brutto", 0.2048, "pct", "Przybliżenie składek pracodawcy przy umowie o pracę. Sprawdź u księgowej."),
    ]
    for i, (lab, val, t, note) in enumerate(base_rows, start=3):
        zal.cell(row=i, column=1, value=lab).font = font(True)
        c = zal.cell(row=i, column=2, value=val)
        c.font = font(color=GREEN if i == 4 else None)
        if i != 4:
            c.fill = INPUT
        c.border = BOX
        c.number_format = FMT[t] or "General"
        zal.cell(row=i, column=3, value=note).font = font(italic=True, color="5B6A78", size=10)
    section(zal, 12, "Parametry branży")
    for i, (lab, val, t, note) in enumerate(cfg["params"], start=1):
        r = 12 + i
        zal.cell(row=r, column=1, value=lab).font = font(True)
        c = zal.cell(row=r, column=2, value=val)
        c.font = font()
        c.fill = INPUT
        c.border = BOX
        c.number_format = FMT[t] or "General"
        zal.cell(row=r, column=3, value=note).font = font(italic=True, color="5B6A78", size=10)
    zal.sheet_view.showGridLines = False

    # ---------- proces branżowy
    proc = {}
    for spec in cfg["process"]:
        ws = wb.create_sheet(spec["name"])
        table(ws, spec["cols"], spec["rows"], spec.get("formulas", {}))
        for (col, op, formula) in spec.get("red", []):
            ws.conditional_formatting.add(f"{col}2:{col}{N+1}", CellIsRule(operator=op, formula=[sub(formula)], fill=RED))
        for (col, dname) in spec.get("lists", []):
            add_list(ws, dref(dname), f"{col}2:{col}{N+1}")
        proc[spec["name"]] = ws

    # ---------- Koszty stałe
    ks = wb.create_sheet("Koszty stałe")
    cols = [("Kategoria", 20, "in"), ("Pozycja", 40, "in"), ("Kwota netto miesięcznie", 18, "money"),
            ("Stawka VAT", 11, "pct"), ("VAT do odliczenia", 16, "money"), ("Brutto", 15, "money"),
            ("Umowa do", 13, "date"), ("Uwagi", 46, "in")]
    rows = [[k, p, a, v, None, None, d, u] for (k, p, a, v, d, u) in cfg["fixed"]]
    table(ks, cols, rows, {5: f'=IF(C{{r}}="","",C{{r}}*D{{r}}*{VAT_ODL})', 6: '=IF(C{r}="","",C{r}*(1+D{r}))'}, nrows=60)
    add_list(ks, dref("Kategorie kosztów"), "A2:A61")

    # ---------- Urządzenia i leasingi
    ur = wb.create_sheet("Urządzenia i leasingi")
    cols = [("Urządzenie", 34, "in"), ("Forma", 12, "in"), ("Wartość netto", 15, "money"), ("Data zakupu", 13, "date"),
            ("Okres amortyzacji (mies.)", 14, "int"), ("Rata lub czynsz netto", 16, "money"), ("Koszt miesięczny", 16, "money"),
            ("Koniec umowy", 13, "date"), ("Następny przegląd", 15, "date"), ("Dni do przeglądu", 13, "int"),
            ("Ubezpieczenie rocznie", 15, "money"), ("Wymagania i uwagi", 48, "in")]
    rows = [[n, f, w, d, o, ra, None, k, pr, None, ub, u] for (n, f, w, d, o, ra, k, pr, ub, u) in cfg["devices"]]
    table(ur, cols, rows, {
        7: '=IF(A{r}="","",IF(B{r}="Własne",IFERROR(C{r}/E{r},0),F{r})+K{r}/12)',
        10: '=IF(OR(A{r}="",I{r}=""),"",I{r}-TODAY())'}, nrows=40)
    ur.conditional_formatting.add("J2:J41", CellIsRule(operator="lessThan", formula=["30"], fill=RED))
    add_list(ur, dref("Formy urządzeń"), "B2:B41")

    # ---------- Pracownicy
    pr = wb.create_sheet("Pracownicy")
    cols = [("Osoba lub stanowisko", 26, "in"), ("Rola w pliku", 24, "in"), ("Forma", 18, "in"),
            ("Wynagrodzenie brutto lub faktura netto", 20, "money"), ("Koszt firmy miesięcznie", 18, "money"),
            ("Godziny w miesiącu", 12, "int"), ("Koszt godziny", 14, "money"), ("Uwagi", 40, "in")]
    rows = [[o, r, f, w, None, g, None, u] for (o, r, f, w, g, u) in cfg["staff"]]
    table(pr, cols, rows, {
        5: f'=IF(A{{r}}="","",IF(C{{r}}="Umowa o pracę",D{{r}}*(1+{PRAC}),IF(C{{r}}="Właściciel",0,D{{r}})))',
        7: '=IF(OR(A{r}="",F{r}="",F{r}=0),"",E{r}/F{r})'}, nrows=30)
    add_list(pr, dref("Formy zatrudnienia"), "C2:C31")

    # ---------- Pozyskanie klientów
    po = wb.create_sheet("Pozyskanie klientów")
    cols = [("Kanał", 24, "in"), ("Gdzie są klienci i co robić", 60, "in"), ("Koszt miesięczny", 15, "money"),
            ("Zapytania w miesiącu", 13, "int"), ("Nowi klienci", 11, "int"), ("Średnia wartość klienta", 16, "money"),
            ("Koszt pozyskania klienta", 16, "money"), ("Skuteczność", 12, "pct"), ("Przychód z kanału", 16, "money"),
            ("Zwrot z wydatku", 13, "num")]
    rows = [[k, g, c, z, n, w] for (k, g, c, z, n, w) in cfg["channels"]]
    table(po, cols, rows, {
        7: '=IF(OR(A{r}="",E{r}="",E{r}=0),"",C{r}/E{r})',
        8: '=IF(OR(A{r}="",D{r}="",D{r}=0),"",E{r}/D{r})',
        9: '=IF(A{r}="","",E{r}*F{r})',
        10: '=IF(OR(A{r}="",C{r}="",C{r}=0),"",I{r}/C{r})'}, nrows=30)
    for r in range(2, 32):
        po.cell(row=r, column=2).alignment = Alignment(wrap_text=True, vertical="top")

    # ---------- Posprzedaż
    ps = wb.create_sheet("Obsługa posprzedażowa")
    cols = [("Klient", 22, "in"), ("Nr zlecenia lub sprawy", 16, "in"), ("Rodzaj", 16, "in"), ("Co trzeba zrobić", 46, "in"),
            ("Data zdarzenia", 13, "date"), ("Termin", 13, "date"), ("Dni do terminu", 12, "int"), ("Odpowiada", 16, "in"),
            ("Status", 13, "in"), ("Koszt dla firmy", 14, "money")]
    rows = [[k, n, ro, co, d, t, None, o, s, kk] for (k, n, ro, co, d, t, o, s, kk) in cfg["after"]]
    table(ps, cols, rows, {7: '=IF(OR(A{r}="",F{r}=""),"",IF(I{r}="Załatwione","załatwione",F{r}-TODAY()))'}, nrows=120)
    ps.conditional_formatting.add("G2:G121", CellIsRule(operator="lessThan", formula=["0"], fill=RED))
    add_list(ps, dref("Posprzedaż rodzaj"), "C2:C121")
    add_list(ps, dref("Posprzedaż status"), "I2:I121")

    # ---------- Wynik i podatki
    w = wb.create_sheet("Wynik i podatki")
    w.column_dimensions["A"].width = 50
    w.column_dimensions["B"].width = 20
    w.column_dimensions["C"].width = 70
    section(w, 1, "Wynik miesiąca wskazanego w Założeniach")
    kv(w, 2, "Miesiąc od", f"={OD}", "date")
    kv(w, 3, "Miesiąc do", f"={DO}", "date")
    section(w, 5, "Sprzedaż")
    kv(w, 6, "Przychód netto", cfg["revenue"], "money", cfg.get("revenue_note"))
    kv(w, 7, "Koszty zmienne", "=(" + cfg["variable"].lstrip("=") + ")+(" + cfg["vat_in"] + f")*(1-{VAT_ODL})", "money",
       (cfg.get("variable_note") or "") + " Gdy nie odliczasz VAT, VAT od zakupów doliczamy do kosztu.")
    kv(w, 8, "Marża na sprzedaży", "=B6-B7", "money")
    kv(w, 9, "Marża w procentach", '=IFERROR(B8/B6,0)', "pct")
    section(w, 11, "Koszty firmy w miesiącu")
    kv(w, 12, "Koszty stałe", f"=SUM('Koszty stałe'!C2:C61)+SUMPRODUCT('Koszty stałe'!C2:C61,'Koszty stałe'!D2:D61)*(1-{VAT_ODL})", "money",
       "Netto. Gdy nie odliczasz VAT, doliczamy go do kosztu.")
    kv(w, 13, "Urządzenia, leasingi i ubezpieczenia sprzętu", "=SUM('Urządzenia i leasingi'!G2:G41)", "money")
    kv(w, 14, "Wynagrodzenia z narzutami", "=SUM(Pracownicy!E2:E31)", "money")
    kv(w, 15, "Marketing i pozyskanie klientów", "=SUM('Pozyskanie klientów'!C2:C31)", "money")
    kv(w, 16, "Koszty posprzedażowe (gwarancje, reklamacje)",
       f"=SUMIFS('Obsługa posprzedażowa'!J2:J121,'Obsługa posprzedażowa'!E2:E121,\">=\"&{OD},'Obsługa posprzedażowa'!E2:E121,\"<=\"&{DO})", "money")
    kv(w, 17, "ZUS właściciela", f"={ZUS}", "money")
    kv(w, 18, "Koszty razem (bez zmiennych)", "=SUM(B12:B17)", "money")
    section(w, 20, "Zysk i podatek dochodowy")
    kv(w, 21, "Zysk przed podatkiem", "=B8-B18", "money")
    kv(w, 22, "Podatek dochodowy (szacunek)", f"=MAX(0,B21)*{PIT}", "money", "Uproszczenie: stawka z Założeń razy dodatni zysk.")
    kv(w, 23, "Składka zdrowotna", f"={ZDR}", "money")
    kv(w, 24, "Zostaje w firmie po podatkach", "=B21-B22-B23", "money")
    section(w, 26, "VAT w miesiącu")
    kv(w, 27, "VAT należny od sprzedaży", f"=B6*{VAT_S}", "money")
    kv(w, 28, "VAT naliczony od zakupów i kosztów",
       f"=({cfg['vat_in']})*{VAT_ODL}+SUM('Koszty stałe'!E2:E61)", "money", cfg.get("vat_in_note"))
    kv(w, 29, "VAT do zapłaty (lub nadwyżka, gdy ujemny)", "=B27-B28", "money", "Termin: zwykle do 25. dnia następnego miesiąca. Sprawdź z księgową.")
    section(w, 31, "Próg rentowności")
    unit, sold, margin = cfg["unit"]
    kv(w, 32, f"Marża na jednostkę: {unit}", margin, "money")
    kv(w, 33, f"Sprzedane w miesiącu: {unit}", sold, "num")
    kv(w, 34, f"Potrzeba, żeby pokryć koszty: {unit}", "=IFERROR((B18+B23)/B32,0)", "num",
       "Tyle jednostek musisz sprzedać, żeby pokryć koszty stałe, wynagrodzenia, marketing i składki.")
    kv(w, 35, "Zapas ponad próg", "=IFERROR(B33/B34-1,0)", "pct", "Ujemny oznacza, że w tym miesiącu firma nie zarabia.")
    w.conditional_formatting.add("B21", CellIsRule(operator="lessThan", formula=["0"], fill=RED))
    w.conditional_formatting.add("B35", CellIsRule(operator="lessThan", formula=["0"], fill=RED))
    w.sheet_view.showGridLines = False

    # ---------- KPI
    k = wb.create_sheet("KPI")
    k.column_dimensions["A"].width = 50
    k.column_dimensions["B"].width = 20
    k.column_dimensions["C"].width = 60
    section(k, 1, "Najważniejsze liczby")
    r = 3
    for (lab, f, fmt, *note) in cfg["kpi"]:
        if lab.startswith("#"):
            section(k, r, lab[1:].strip())
        else:
            kv(k, r, lab, f, fmt, note[0] if note else None)
        r += 1
    r += 1
    section(k, r, "Firma jako całość"); r += 1
    kv(k, r, "Zysk przed podatkiem w miesiącu", "='Wynik i podatki'!B21", "money"); r += 1
    kv(k, r, "Zapas ponad próg rentowności", "='Wynik i podatki'!B35", "pct"); r += 1
    kv(k, r, "VAT do zapłaty", "='Wynik i podatki'!B29", "money"); r += 1
    kv(k, r, "Średni koszt pozyskania klienta", "=IFERROR(SUM('Pozyskanie klientów'!C2:C31)/SUM('Pozyskanie klientów'!E2:E31),0)", "money"); r += 1
    kv(k, r, "Urządzenia z przeglądem w ciągu 30 dni", "=COUNTIFS('Urządzenia i leasingi'!J2:J41,\"<30\",'Urządzenia i leasingi'!A2:A41,\"<>\")", "int"); r += 1
    kv(k, r, "Otwarte sprawy posprzedażowe", "=COUNTIFS('Obsługa posprzedażowa'!I2:I121,\"<>Załatwione\",'Obsługa posprzedażowa'!A2:A121,\"<>\")", "int"); r += 1
    kv(k, r, "Sprawy posprzedażowe po terminie", "=COUNTIF('Obsługa posprzedażowa'!G2:G121,\"<0\")", "int")
    k.sheet_view.showGridLines = False

    # ---------- Wzory dokumentów
    wz = wb.create_sheet("Wzory dokumentów")
    wz.column_dimensions["A"].width = 120
    wz["A1"] = "Wzory dokumentów"
    wz["A1"].font = font(True, GREEN, 16)
    wz["A2"] = ("To są wzory do dopasowania, a nie porada prawna. Przed użyciem daj je do sprawdzenia prawnikowi "
                "i uzupełnij pola w nawiasach kwadratowych.")
    wz["A2"].font = font(italic=True, color="9C2B2B")
    wz["A2"].alignment = Alignment(wrap_text=True)
    r = 4
    for title, lines in cfg["templates"]:
        c = wz.cell(row=r, column=1, value=title)
        c.font = font(True, "FFFFFF", 13)
        c.fill = PatternFill("solid", fgColor=GREEN)
        r += 1
        for line in lines:
            c = wz.cell(row=r, column=1, value=line)
            c.font = font(bold=line.endswith(":") or line.startswith("§"))
            c.alignment = Alignment(wrap_text=True, vertical="top")
            r += 1
        r += 1
    wz.sheet_view.showGridLines = False

    # ---------- Role
    ro = wb.create_sheet("Role")
    for col, width in (("A", 28), ("B", 52), ("C", 28), ("D", 52)):
        ro.column_dimensions[col].width = width
    ro["A1"] = cfg["title"] + ", podział pracy w pliku"
    ro["A1"].font = font(True, GREEN, 15)
    for i, label in enumerate(["Rola", "Za co odpowiada", "Swój arkusz", "Co wypełnia"], start=1):
        c = ro.cell(row=3, column=i, value=label)
        c.font = font(True)
        c.fill = HEAD
        c.border = BOX
    roles = list(cfg["roles"]) + [
        ["Właściciel", "Ustala stawki, koszty stałe, urządzenia, pracowników i kanały pozyskania klientów. Czyta wynik i KPI.",
         "Założenia, Koszty stałe, Urządzenia i leasingi, Pracownicy, Pozyskanie klientów", "Żółte pola w tych arkuszach"],
        ["Obsługa klienta", "Prowadzi sprawy po sprzedaży: gwarancje, reklamacje, przypomnienia i prośby o opinię.",
         "Obsługa posprzedażowa", "Klient, rodzaj, co zrobić, terminy, status, koszt"],
        ["Księgowa", "Sprawdza stawki podatków i VAT oraz czyta wynik miesiąca.", "Założenia, Wynik i podatki", "Stawki podatkowe"],
    ]
    for rr, row in enumerate(roles, start=4):
        for i, v in enumerate(row, start=1):
            c = ro.cell(row=rr, column=i, value=v)
            c.font = font(bold=(i == 1))
            c.border = BOX
            c.alignment = Alignment(wrap_text=True, vertical="top")
    ro.sheet_view.showGridLines = False

    # ---------- Słowniki
    sl = wb.create_sheet("Słowniki")
    for i, name in enumerate(names, start=1):
        sl.column_dimensions[L(i)].width = max(18, len(name) + 4)
        c = sl.cell(row=1, column=i, value=name)
        c.font = font(True, "14432B")
        c.fill = HEAD
        for j, v in enumerate(dicts[name], start=2):
            sl.cell(row=j, column=i, value=v).font = font()
    sl.sheet_view.showGridLines = False

    # listy w arkuszach procesu odwołują się do słowników (po utworzeniu nazw)
    # ---------- Instrukcja
    ins = wb.create_sheet("Instrukcja", 0)
    ins.column_dimensions["A"].width = 120
    ins["A1"] = cfg["title"]
    ins["A1"].font = font(True, GREEN, 18)
    lines = cfg["intro"] + [
        "",
        "Co jest w pliku:",
        "Role: kto wypełnia który arkusz.",
        "Założenia: miesiąc raportu, VAT, podatek dochodowy, ZUS, składka zdrowotna i parametry branży.",
        "Arkusze z numerami: cały proces pracy, od pierwszego kontaktu do rozliczenia, każdy dla innej roli.",
        "Koszty stałe, Urządzenia i leasingi, Pracownicy: wszystko, co firma płaci co miesiąc, także raty, przeglądy i ubezpieczenia sprzętu.",
        "Pozyskanie klientów: gdzie są klienci, ile kosztuje każdy kanał i ile przynosi.",
        "Obsługa posprzedażowa: gwarancje, reklamacje, przypomnienia i opinie, z terminami.",
        "Wynik i podatki: przychód, koszty, zysk, podatek dochodowy, VAT do zapłaty i próg rentowności.",
        "KPI: najważniejsze liczby na jednym ekranie.",
        "Wzory dokumentów: umowy i protokoły do dopasowania.",
        "",
        "Jak używać:",
        "1. Wypełniaj tylko jasnożółte komórki. Zielone liczą się same. Czerwone pola oznaczają, że coś wymaga reakcji.",
        "2. Zacznij od Założeń: wpisz swoje stawki podatku, ZUS i parametry branży. Kwoty w pliku są przykładowe.",
        "3. Listy wyboru zmienisz w arkuszu Słowniki, bez ruszania formuł.",
        "4. Wynik liczy miesiąc wskazany w Założeniach. Zmień datę, żeby zobaczyć inny miesiąc.",
        "5. Wiersze przykładowe pokazują, jak dane przechodzą między rolami. Skasuj je przed pracą na swoich danych.",
        "   Przykład ma tylko kilka zleceń, a koszty stałe za cały miesiąc, dlatego wynik w przykładzie wychodzi na minusie.",
        "   Po wpisaniu pełnego miesiąca zobaczysz prawdziwy wynik i to, ile brakuje do progu rentowności.",
        "",
        "Ważne:",
        "Podatki są policzone w uproszczeniu i służą do planowania, a nie do rozliczeń z urzędem. Stawki i zasady ustal z księgową.",
        "Wzory dokumentów nie są poradą prawną. Daj je do sprawdzenia prawnikowi.",
        "",
        "Plik przygotowała Zielona Marka, zielona-marka.pl. Możesz go używać i zmieniać u siebie za darmo.",
    ]
    for i, line in enumerate(lines, start=3):
        c = ins.cell(row=i, column=1, value=line)
        c.font = font(bold=line.endswith(":"))
        c.alignment = Alignment(wrap_text=True)
    ins.sheet_view.showGridLines = False

    # kolejność arkuszy: Instrukcja, Role, Założenia, proces..., reszta
    order = ["Instrukcja", "Role", Z] + [s["name"] for s in cfg["process"]] + [
        "Koszty stałe", "Urządzenia i leasingi", "Pracownicy", "Pozyskanie klientów",
        "Obsługa posprzedażowa", "Wynik i podatki", "KPI", "Wzory dokumentów", "Słowniki"]
    wb._sheets = [wb[n] for n in order]
    for ws in wb.worksheets:
        ws.sheet_view.tabSelected = False
    wb.active = 0
    wb.worksheets[0].sheet_view.tabSelected = True
    # listy w procesie (słowniki istnieją już pod znanymi adresami)
    wb.save(cfg["file"])
    return cfg["file"]
