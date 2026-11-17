# -*- coding: utf-8 -*-
"""Grafiki kafelków dla arkuszy Excel w portfolio (SVG, 4:3)."""
import sys
from xml.sax.saxutils import escape

ICONS = {
    "warsztat": '<path d="M-62 40 L22 -44 A46 46 0 0 1 70 -88 L42 -60 L50 -30 L80 -38 L108 -66 A46 46 0 0 1 64 -18 L-20 66 A28 28 0 0 1 -62 40 Z"/>',
    "kawiarnia": '<path d="M-78 -40 H52 V30 A50 50 0 0 1 2 80 H-28 A50 50 0 0 1 -78 30 Z"/><path d="M52 -20 H70 A26 26 0 0 1 70 32 H52"/><path d="M-50 -70 q12 -14 0 -28 M-12 -70 q12 -14 0 -28 M26 -70 q12 -14 0 -28"/>',
    "stomatologia": '<path d="M-60 -70 C-90 -70 -96 -30 -84 0 C-72 30 -66 90 -44 92 C-24 94 -26 34 0 34 C26 34 24 94 44 92 C66 90 72 30 84 0 C96 -30 90 -70 60 -70 C36 -70 24 -56 0 -56 C-24 -56 -36 -70 -60 -70 Z"/>',
    "hurtownia": '<path d="M-96 -20 L0 -80 L96 -20 V88 H-96 Z"/><path d="M-60 88 V20 H60 V88"/><path d="M-60 44 H60 M-60 66 H60"/>',
    "remonty": '<rect x="-80" y="-86" width="140" height="56" rx="10"/><path d="M60 -58 H86 V0 H0 V40"/><rect x="-14" y="40" width="28" height="56" rx="6"/>',
    "budowa": '<path d="M-70 92 V-80 M-70 -80 H96 M-70 -50 L-30 -80 M80 -80 V-20"/><rect x="62" y="-20" width="36" height="28" rx="4"/><path d="M-100 92 H-40 M-70 -80 L-110 -50 H-70"/>',
    "deweloper": '<path d="M-90 0 L0 -80 L90 0"/><path d="M-66 -20 V88 H66 V-20"/><circle cx="-6" cy="34" r="20"/><path d="M14 34 H52 M40 34 V52"/>',
    "printflow": '<rect x="-60" y="-90" width="120" height="60" rx="6"/><rect x="-96" y="-30" width="192" height="80" rx="14"/><rect x="-60" y="20" width="120" height="70" rx="6"/><path d="M-36 46 H36 M-36 66 H20"/>',
    "transportflow": '<rect x="-100" y="-56" width="120" height="100" rx="8"/><path d="M20 -24 H64 L96 12 V44 H20 Z"/><circle cx="-60" cy="58" r="18"/><circle cx="62" cy="58" r="18"/>',
    "dashboard": '<path d="M-96 88 H96"/><rect x="-80" y="10" width="34" height="70" rx="5"/><rect x="-24" y="-40" width="34" height="120" rx="5"/><rect x="32" y="-86" width="34" height="166" rx="5"/>',
    "wycena": '<rect x="-70" y="-92" width="140" height="184" rx="16"/><rect x="-48" y="-70" width="96" height="40" rx="6"/><path d="M-40 0 h0 M0 0 h0 M40 0 h0 M-40 34 h0 M0 34 h0 M40 34 h0 M-40 68 h0 M0 68 h0 M40 68 h0" stroke-width="20" stroke-linecap="round"/>',
    "crm": '<circle cx="-34" cy="-40" r="30"/><path d="M-94 70 C-94 20 -64 0 -34 0 C-4 0 26 20 26 70"/><circle cx="46" cy="-24" r="24"/><path d="M20 22 C30 14 38 12 46 12 C74 12 96 32 96 70"/>',
}


def svg(title, subtitle, icon, chips, accent="#b6eb8a", accent2="#2dd4bf"):
    t = escape(title)
    s = escape(subtitle)
    # tytuł w maksymalnie dwóch liniach
    words, lines, cur = t.split(" "), [], ""
    for wd in words:
        if len(cur + " " + wd) > 16 and cur:
            lines.append(cur); cur = wd
        else:
            cur = (cur + " " + wd).strip()
    lines.append(cur)
    # nie zostawiaj krótkiego słowa na końcu linii
    for i in range(len(lines) - 1):
        last = lines[i].split(" ")[-1]
        if len(last) <= 2 and " " in lines[i]:
            lines[i] = lines[i][: -len(last) - 1]
            lines[i + 1] = last + " " + lines[i + 1]
    ty = 520 - (len(lines) - 1) * 46
    title_svg = "".join(f'<text x="830" y="{ty + i*96}" font-size="84" font-weight="800" fill="#ffffff" letter-spacing="-2.5">{ln}</text>' for i, ln in enumerate(lines))
    sub_y = ty + len(lines) * 96 + 6
    chip_svg, x = "", 830
    for c in chips:
        w = len(c) * 13.5 + 52
        chip_svg += (f'<g transform="translate({x:.0f} {sub_y + 70})"><rect width="{w:.0f}" height="54" rx="27" fill="#ffffff" fill-opacity=".07" stroke="{accent}" stroke-opacity=".45"/>'
                     f'<circle cx="24" cy="27" r="5" fill="{accent}"/><text x="{w/2 + 9:.0f}" y="35" text-anchor="middle" font-size="22" font-weight="600" fill="#eafbe1">{escape(c)}</text></g>')
        x += w + 14
    # perspektywiczna siatka podłogi
    floor = ""
    for i in range(-12, 13):
        floor += f'<path d="M{800 + i*40} 820 L{800 + i*170} 1240"/>'
    for j, y in enumerate([830, 850, 878, 914, 960, 1018, 1090, 1180]):
        floor += f'<path d="M-100 {y} H1700" stroke-opacity="{0.25 + j*0.08:.2f}"/>'
    # siatka arkusza na tylnym panelu
    cells = ""
    for r in range(5):
        for c in range(4):
            hl = (r == 2 and c == 2)
            cells += (f'<rect x="{28 + c*112}" y="{70 + r*50}" width="100" height="38" rx="8" '
                      f'fill="{accent if hl else "#ffffff"}" fill-opacity="{0.9 if hl else (0.16 if r == 0 else 0.07)}" '
                      f'{"filter=\'url(#neon)\'" if hl else ""}/>')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" font-family="Inter, Segoe UI, Arial, sans-serif" role="img" aria-label="{t}: arkusz Excel do pobrania">
<defs>
  <radialGradient id="m1" cx=".18" cy=".2" r=".6"><stop offset="0" stop-color="{accent}" stop-opacity=".55"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></radialGradient>
  <radialGradient id="m2" cx=".92" cy=".95" r=".65"><stop offset="0" stop-color="{accent2}" stop-opacity=".45"/><stop offset="1" stop-color="{accent2}" stop-opacity="0"/></radialGradient>
  <radialGradient id="m3" cx=".55" cy=".45" r=".5"><stop offset="0" stop-color="#10b981" stop-opacity=".25"/><stop offset="1" stop-color="#10b981" stop-opacity="0"/></radialGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".18"/><stop offset="1" stop-color="#ffffff" stop-opacity=".04"/></linearGradient>
  <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".08"/><stop offset="1" stop-color="{accent}" stop-opacity=".5"/></linearGradient>
  <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{accent}" stop-opacity=".55"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></linearGradient>
  <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{accent}"/><stop offset="1" stop-color="{accent2}"/></linearGradient>
  <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient>
  <mask id="fm"><rect y="800" width="1600" height="400" fill="url(#fade)"/></mask>
  <filter id="neon" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="30" stdDeviation="30" flood-color="#000" flood-opacity=".55"/></filter>
</defs>
<rect width="1600" height="1200" fill="#061a12"/>
<rect width="1600" height="1200" fill="url(#m1)"/>
<rect width="1600" height="1200" fill="url(#m2)"/>
<rect width="1600" height="1200" fill="url(#m3)"/>
<g stroke="{accent}" stroke-opacity=".35" stroke-width="1.5" fill="none" mask="url(#fm)">{floor}</g>

<g transform="translate(0 120)">
<g transform="translate(110 250) rotate(-7 260 180)" filter="url(#soft)">
  <rect width="500" height="340" rx="30" fill="url(#glass)" stroke="url(#edge)" stroke-width="2"/>
  <circle cx="40" cy="36" r="7" fill="#ff6b6b" fill-opacity=".8"/><circle cx="62" cy="36" r="7" fill="#ffd166" fill-opacity=".8"/><circle cx="84" cy="36" r="7" fill="{accent}" fill-opacity=".9"/>
  <text x="470" y="44" text-anchor="end" font-size="20" font-weight="700" fill="#ffffff" fill-opacity=".7" letter-spacing="3">XLSX</text>
  {cells}
</g>

<g transform="translate(330 540) rotate(5 210 150)" filter="url(#soft)">
  <rect width="430" height="300" rx="30" fill="#0b2a1e" fill-opacity=".72"/>
  <rect width="430" height="300" rx="30" fill="url(#glass)" stroke="url(#edge)" stroke-width="2"/>
  <path d="M30 230 C80 220 100 170 150 178 C200 186 220 120 270 126 C320 132 340 70 400 64 L400 270 L30 270 Z" fill="url(#spark)"/>
  <path d="M30 230 C80 220 100 170 150 178 C200 186 220 120 270 126 C320 132 340 70 400 64" fill="none" stroke="{accent}" stroke-width="6" stroke-linecap="round" filter="url(#neon)"/>
  <circle cx="400" cy="64" r="10" fill="#ffffff" filter="url(#neon)"/>
  <text x="34" y="62" font-size="22" font-weight="700" fill="#ffffff" fill-opacity=".75" letter-spacing="2">KPI</text>
</g>

<g transform="translate(640 300)">
  <circle r="150" fill="#061a12" fill-opacity=".55"/>
  <circle r="128" fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="22"/>
  <circle r="128" fill="none" stroke="url(#ring)" stroke-width="22" stroke-linecap="round" stroke-dasharray="560 804" transform="rotate(-90)" filter="url(#neon)"/>
  <g fill="none" stroke="#ffffff" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" transform="scale(.66)">{ICONS[icon]}</g>
</g>

<g transform="translate(830 {ty - 150})">
  <rect width="372" height="52" rx="26" fill="{accent}" fill-opacity=".14" stroke="{accent}" stroke-opacity=".6"/>
  <circle cx="28" cy="26" r="7" fill="{accent}" filter="url(#neon)"/>
  <text x="200" y="34" text-anchor="middle" font-size="20" font-weight="700" fill="{accent}" letter-spacing="3.5">DO POBRANIA · XLSX</text>
</g>
{title_svg}
<text x="830" y="{sub_y}" font-size="34" fill="#cfe9d6" fill-opacity=".9">{s}</text>
{chip_svg}
</g>
</svg>'''


ACCENTS = {
    "excel-kawiarnia": ("#ffd166", "#ff8a5b"), "excel-stomatologia": ("#7dd3fc", "#a78bfa"),
    "excel-hurtownia": ("#b6eb8a", "#38bdf8"), "excel-remonty": ("#fbbf24", "#b6eb8a"),
    "excel-budowa": ("#fb923c", "#facc15"), "excel-deweloper": ("#c4b5fd", "#2dd4bf"),
    "excel-printflow": ("#f472b6", "#b6eb8a"), "excel-transportflow": ("#38bdf8", "#b6eb8a"),
    "excel-dashboard": ("#2dd4bf", "#b6eb8a"), "excel-wycena": ("#b6eb8a", "#facc15"), "excel-crm": ("#a78bfa", "#2dd4bf"),
}

CHIPS = {"excel-printflow": ["Role", "KPI", "Faktury"], "excel-transportflow": ["Role", "KPI", "Faktury"],
         "excel-dashboard": ["Role", "KPI", "Terminy"], "excel-wycena": ["Warianty", "VAT", "Zaliczka"],
         "excel-crm": ["Lejek", "Role", "Przypomnienia"]}

TILES = [
    ("excel-warsztat", "Warsztat samochodowy", "Od przyjęcia auta do gwarancji", "warsztat"),
    ("excel-kawiarnia", "Kawiarnia i bistro", "Utarg, food cost i stali goście", "kawiarnia"),
    ("excel-stomatologia", "Gabinet stomatologiczny", "Wizyty, plany leczenia, kontrole", "stomatologia"),
    ("excel-hurtownia", "Hurtownia materiałów", "Oferty, magazyn, należności", "hurtownia"),
    ("excel-remonty", "Firma remontowa", "Kosztorys, ekipy, odbiory", "remonty"),
    ("excel-budowa", "Firma budowlana", "Budżet budowy, podwykonawcy", "budowa"),
    ("excel-deweloper", "Mały deweloper", "Lokale, wpłaty, odbiory", "deweloper"),
    ("excel-printflow", "PrintFlow 360", "Drukarnia od zapytania do faktury", "printflow"),
    ("excel-transportflow", "TransportFlow 360", "Wycena trasy, przewóz, wynik", "transportflow"),
    ("excel-dashboard", "Dashboard operacyjny", "Zlecenia, terminy, obciążenie", "dashboard"),
    ("excel-wycena", "Kalkulator wariantów oferty", "Trzy warianty ceny jednej oferty", "wycena"),
    ("excel-crm", "Rejestr kontaktów", "Lejek sprzedaży bez CRM", "crm"),
]

if __name__ == "__main__":
    out = sys.argv[1]
    for slug, title, sub, icon in TILES:
        acc = ACCENTS.get(slug, ("#b6eb8a", "#2dd4bf"))
        open(f"{out}/{slug}-kafelek.svg", "w", encoding="utf-8").write(svg(title, sub, icon, CHIPS.get(slug, ["Role", "KPI", "VAT i podatki"]), *acc))
    print(len(TILES), "kafelków")
