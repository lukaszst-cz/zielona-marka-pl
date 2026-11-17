# -*- coding: utf-8 -*-
"""Kafelki arkuszy w stylu zdjęć z portfolio: biurko, laptop z prawdziwym arkuszem na ekranie,
ikona arkusza i ikona branży. Bazą jest zdjęcie fleet-ops-desk z portfolio."""
import sys, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
sys.path.insert(0, __file__.rsplit("/", 1)[0])
from kafelki import ICONS, ACCENTS, TILES

BASE = "public/portfolio/kadry/fleet-ops-desk.webp"
SCREEN = [(898, 118), (1300, 132), (1265, 400), (832, 360)]  # TL, TR, BR, BL na zdjęciu bazowym
CROPS = [(500, 40, 1340, 670), (560, 70, 1360, 670), (470, 20, 1350, 680)]


def coeffs(dst, src):
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); B.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); B.append(v)
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()


def badge_svg(svg, size, path):
    open("/tmp/b.svg", "w").write(svg)
    subprocess.run(["rsvg-convert", "-w", str(size), "-h", str(size), "/tmp/b.svg", "-o", path], check=True)
    return Image.open(path).convert("RGBA")


def sheet_icon(size, accent):
    cells = "".join(f'<rect x="{34 + c*40}" y="{58 + r*30}" width="34" height="24" rx="4" fill="#ffffff" fill-opacity="{0.95 if r == 0 else 0.7}"/>' for r in range(3) for c in range(3))
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2fbf71"/><stop offset="1" stop-color="#0f6b3c"/></linearGradient>
<filter id="s"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-opacity=".45"/></filter></defs>
<rect x="14" y="14" width="172" height="172" rx="40" fill="url(#g)" filter="url(#s)"/><rect x="14" y="14" width="172" height="86" rx="40" fill="#fff" fill-opacity=".12"/>
{cells}<text x="100" y="172" text-anchor="middle" font-family="Arial" font-weight="800" font-size="28" fill="#fff" letter-spacing="3">XLSX</text></svg>'''
    return badge_svg(svg, size, "/tmp/sheet.png")


def industry_icon(size, icon, accent):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-130 -130 260 260"><defs><filter id="s"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-opacity=".45"/></filter></defs>
<circle r="118" fill="{accent}" filter="url(#s)"/><circle r="118" fill="#fff" fill-opacity=".12"/>
<g fill="none" stroke="#0b2e21" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" transform="scale(.72)">{ICONS[icon]}</g></svg>'''
    return badge_svg(svg, size, "/tmp/ind.png")


def make(slug, icon, screen_img, out, variant):
    base = Image.open(BASE).convert("RGB")
    scr = Image.open(screen_img).convert("RGB")
    W, H = base.size
    # treść ekranu: lekko przyciemniona i z odblaskiem, wstawiona w perspektywie
    scr = ImageEnhance.Brightness(scr).enhance(0.93)
    src = [(0, 0), (scr.width, 0), (scr.width, scr.height), (0, scr.height)]
    warped = scr.transform((W, H), Image.PERSPECTIVE, coeffs(SCREEN, src), Image.BICUBIC)
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).polygon(SCREEN, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(0.8))
    base.paste(warped, (0, 0), mask)
    glare = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    gd = ImageDraw.Draw(glare)
    gd.polygon([SCREEN[0], (SCREEN[0][0] + 160, SCREEN[0][1] + 4), (SCREEN[3][0] + 40, SCREEN[3][1]), SCREEN[3]], fill=(255, 255, 255, 26))
    base = Image.alpha_composite(base.convert("RGBA"), glare).convert("RGB")
    # kadr 4:3 i powiększenie
    x0, y0, x1, y1 = CROPS[variant % len(CROPS)]
    img = base.crop((x0, y0, x1, y1)).resize((1600, 1200), Image.LANCZOS)
    img = ImageEnhance.Sharpness(img).enhance(1.25)
    acc = ACCENTS.get(slug, ("#b6eb8a", "#2dd4bf"))[0]
    # delikatny kolor branży w rogu
    tint = Image.new("RGBA", img.size, (0, 0, 0, 0))
    td = ImageDraw.Draw(tint)
    r, g, b = int(acc[1:3], 16), int(acc[3:5], 16), int(acc[5:7], 16)
    for i in range(40):
        td.ellipse([-600 + i * 8, 700 + i * 8, 700 - i * 8, 2000 - i * 8], fill=(r, g, b, 2))
    img = Image.alpha_composite(img.convert("RGBA"), tint)
    # ikony na blacie po lewej, z dala od znacznika kategorii i strzałki na karcie
    ic = sheet_icon(230, acc)
    img.alpha_composite(ic, (70, 770))
    ib = industry_icon(210, icon, acc)
    img.alpha_composite(ib, (290, 800))
    img.convert("RGB").save(out, "WEBP", quality=88)


if __name__ == "__main__":
    shots = dict(a.split("=") for a in sys.argv[2:])
    for i, (slug, title, sub, icon) in enumerate(TILES):
        if slug in shots:
            make(slug, icon, shots[slug], f"{sys.argv[1]}/{slug}-kafelek.webp", i)
            print(slug)
