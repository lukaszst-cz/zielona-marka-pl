#!/usr/bin/env python3
"""Generate an offline, evidence-backed QA PDF from private JSON records.

Install: python -m pip install 'reportlab>=4.2,<5'
Usage: python scripts/qms_report.py --input /private/project.json --output /private/report.pdf
No network calls. Never commit real customer data or generated reports to public Git.
"""
import argparse
import json
import re
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

STATUS = {'PASS', 'REWORK', 'HOLD', 'NIE SPRAWDZONO', 'N/D'}
BAD = {'REWORK', 'HOLD', 'NIE SPRAWDZONO'}
GREEN = colors.HexColor('#174c37')
DARK = colors.HexColor('#203629')
LIGHT = colors.HexColor('#eaf3e9')
GRAY = colors.HexColor('#69756e')


def require(data, key):
    value = str(data.get(key) or '').strip()
    if not value:
        raise ValueError(f'Brak wymaganego pola: {key}')
    return value


def validate(data):
    """Only approve genuine verified results and explicit authorized release decisions."""
    for field in ('project_id', 'product', 'version', 'report_date'):
        require(data, field)
    tests = data.get('tests')
    if not isinstance(tests, list) or not tests:
        raise ValueError('Raport wymaga co najmniej jednej rzeczywistej kontroli')
    ids = set()
    for n, test in enumerate(tests, start=1):
        if not isinstance(test, dict):
            raise ValueError(f'Test {n} musi być obiektem')
        ident = require(test, 'id')
        require(test, 'criterion')
        if ident in ids:
            raise ValueError(f'Powtórzony identyfikator testu: {ident}')
        ids.add(ident)
        status = require(test, 'status').upper()
        if status not in STATUS:
            raise ValueError(f'Nieznany status dla {ident}: {status}')
        if status == 'PASS':
            for key in ('method', 'evidence', 'performed_at', 'tester'):
                require(test, key)
        if status == 'N/D':
            require(test, 'reason')
            if bool(test.get('critical')):
                raise ValueError(f'Krytycznego testu {ident} nie wolno wyłączyć bez odrębnej decyzji')
    release = str(data.get('release_decision') or 'NIE USTALONO').upper()
    if release not in {'GO', 'HOLD', 'NIE USTALONO'}:
        raise ValueError('release_decision = GO / HOLD / NIE USTALONO')
    if release == 'GO':
        if any(t['status'].upper() in BAD for t in tests):
            raise ValueError('GO blokują kontrole NIE SPRAWDZONO, REWORK i HOLD')
        for key in ('approved_by', 'approval_date', 'approval_evidence'):
            require(data, key)
    return release


def font_names():
    options = [
        (Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'), Path('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')),
        (Path('C:/Windows/Fonts/arial.ttf'), Path('C:/Windows/Fonts/arialbd.ttf')),
    ]
    for regular, bold in options:
        if regular.exists() and bold.exists():
            pdfmetrics.registerFont(TTFont('QMS-Regular', str(regular)))
            pdfmetrics.registerFont(TTFont('QMS-Bold', str(bold)))
            return 'QMS-Regular', 'QMS-Bold'
    # Compatible fallback: users without fonts should install a Unicode sans font.
    raise RuntimeError('Brak fontu Unicode: DejaVu Sans (Linux) lub Arial (Windows)')


def make_pdf(data, dest):
    release = validate(data)
    regular, bold = font_names()
    h = ParagraphStyle('heading', fontName=bold, fontSize=21, leading=27, textColor=GREEN, spaceAfter=15)
    h2 = ParagraphStyle('h2', fontName=bold, fontSize=12, leading=17, textColor=GREEN, spaceBefore=15, spaceAfter=8)
    p = ParagraphStyle('body', fontName=regular, fontSize=8.5, leading=13.5, textColor=DARK, spaceAfter=7)
    small = ParagraphStyle('small', fontName=regular, fontSize=7.6, leading=11.5, textColor=DARK)
    wh = ParagraphStyle('white', fontName=bold, fontSize=8, leading=12, textColor=colors.white)
    def sp(value):
        return escape(str(value or '—')).replace('\n', '<br/>')
    rows = [
        [Paragraph('Pole', wh), Paragraph('Wartość', wh)],
        [Paragraph('Projekt', small), Paragraph(sp(data['project_id'])+' / '+sp(data['product']), small)],
        [Paragraph('Wersja', small), Paragraph(sp(data['version']), small)],
        [Paragraph('Data raportu', small), Paragraph(sp(data['report_date']), small)],
        [Paragraph('Decyzja G2', small), Paragraph(sp(release), small)],
        [Paragraph('Osoba zatwierdzająca', small), Paragraph(sp(data.get('approved_by')), small)],
        [Paragraph('Akceptacja', small), Paragraph(sp(data.get('approval_date')), small)],
    ]
    def tab(rows, widths):
        t = Table(rows, colWidths=widths, repeatRows=1, hAlign='LEFT')
        t.setStyle(TableStyle([
            ('BACKGROUND',(0,0),(-1,0),GREEN),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,LIGHT]),
            ('LINEBELOW',(0,0),(-1,-1),.45,colors.HexColor('#d8e3d8')),
            ('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),
            ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8)]))
        return t
    story = [Paragraph('ZIELONA MARKA  /  ZM-QMS-F02 /  WYNIKI RZECZYWISTEGO ZLECENIA',small),Spacer(1,9),
             Paragraph('Raport kontroli jakości',h),tab(rows,[140,365]),Spacer(1,14)]
    if release != 'GO':
        story.append(Paragraph('<b>STATUS:</b> Nie przyznano zgody na wydanie G2. Dokument nie jest protokołem odbioru końcowego.',p))
    story.append(Paragraph('Kryteria i wyniki',h2))
    items = [[Paragraph('Test / kryterium',wh),Paragraph('Status i potwierdzenie',wh)]]
    for t in data['tests']:
        summary = sp(t['id'])+' — '+sp(t['criterion'])
        detail = '<b>'+sp(t['status'])+'</b>'
        detail += '<br/>Metoda: '+sp(t.get('method'))
        detail += '<br/>Tester: '+sp(t.get('tester'))+' / '+sp(t.get('performed_at'))
        detail += '<br/>Dowód: '+sp(t.get('evidence'))
        if t.get('reason'):
            detail += '<br/>Uzasadnienie: '+sp(t['reason'])
        items.append([Paragraph(summary,small),Paragraph(detail,small)])
    story.append(tab(items,[245,260]))
    story.append(Spacer(1,10))
    story.append(Paragraph('Zakres i ograniczenia',h2))
    story.append(Paragraph(sp(data.get('scope') or 'Kontrole dotyczą tylko wskazanej wersji i udokumentowanego zakresu.'),p))
    story.append(Paragraph('Dowody poza raportem przechowujemy w prywatnej przestrzeni z odpowiednim dostępem. Nie publikować raportów klientów na GitHub ani nie traktować ich jako certyfikatu ISO.',small))
    dest = Path(dest)
    if 'public' in dest.parts or 'app' in dest.parts or ('docs' in dest.parts and 'private' not in dest.parts and 'records' not in dest.parts):
        raise ValueError('Raport z danymi projektu nie może trafić do publicznego drzewa repozytorium')
    dest.parent.mkdir(parents=True,exist_ok=True)
    def footer(canvas, doc):
        canvas.setFillColor(GREEN); canvas.rect(0,A4[1]-6,A4[0],6,stroke=0,fill=1)
        canvas.setFont(regular,7);canvas.setFillColor(GRAY)
        canvas.drawString(44,28,'ZIELONA MARKA / QA / tylko do wskazanego projektu i wersji')
        canvas.drawRightString(A4[0]-44,28,f'Strona {doc.page}')
    doc = SimpleDocTemplate(str(dest),pagesize=A4,leftMargin=44,rightMargin=44,topMargin=45,bottomMargin=50,
                            title=f'Raport QA - {data["project_id"]}',author='Zielona Marka')
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    return dest


def main():
    parser = argparse.ArgumentParser(description='Lokalny generator raportów QA. Bez połączeń sieciowych.')
    parser.add_argument('--input', required=True, help='Prywatny plik JSON z rzeczywistymi wynikami')
    parser.add_argument('--output', required=True, help='Prywatna ścieżka raportu PDF')
    args = parser.parse_args()
    data=json.loads(Path(args.input).read_text(encoding='utf-8-sig'))
    result=make_pdf(data,args.output)
    print(f'Zapisano raport: {result}')

if __name__ == '__main__':
    main()
