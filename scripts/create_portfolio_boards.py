from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1] / "public"
WIDTH, HEIGHT = 1600, 1150
ARIAL_BOLD = Path("C:/Windows/Fonts/arialbd.ttf")
ARIAL = Path("C:/Windows/Fonts/arial.ttf")
GEORGIA = Path("C:/Windows/Fonts/georgia.ttf")


def font(path: Path, size: int):
    return ImageFont.truetype(str(path), size)


def board(source: str, output: str, title: str, subtitle: str, badge: str, bg1: str, bg2: str, accent: str):
    canvas = Image.new("RGB", (WIDTH, HEIGHT), bg1)
    draw = ImageDraw.Draw(canvas)

    # Subtle brand background, intentionally minimal so the real screen remains central.
    for radius, alpha in ((270, 18), (150, 25)):
        layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        layer_draw = ImageDraw.Draw(layer)
        layer_draw.ellipse((WIDTH - radius * 1.1, -radius * .55, WIDTH + radius * .9, radius * 1.45), fill=(*ImageColor.getrgb(accent), alpha))
        canvas = Image.alpha_composite(canvas.convert("RGBA"), layer).convert("RGB")
    draw = ImageDraw.Draw(canvas)
    draw.text((72, 55), "ZIELONA MARKA / PORTFOLIO", font=font(ARIAL_BOLD, 22), fill=(238, 247, 241))

    screen = Image.open(ROOT / source).convert("RGB")
    screen_ratio = screen.width / screen.height
    frame_w, frame_h = 1460, 822
    desired_ratio = frame_w / (frame_h - 48)
    if screen_ratio > desired_ratio:
        crop_w = int(screen.height * desired_ratio)
        left = (screen.width - crop_w) // 2
        screen = screen.crop((left, 0, left + crop_w, screen.height))
    else:
        crop_h = int(screen.width / desired_ratio)
        top = (screen.height - crop_h) // 2
        screen = screen.crop((0, top, screen.width, top + crop_h))
    screen = screen.resize((frame_w, frame_h - 48), Image.Resampling.LANCZOS)

    shadow = Image.new("RGBA", (frame_w + 60, frame_h + 70), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((30, 25, frame_w + 30, frame_h + 25), radius=24, fill=(0, 17, 10, 130))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    canvas.paste(shadow, (40, 106), shadow)

    frame = Image.new("RGB", (frame_w, frame_h), "#ffffff")
    frame_draw = ImageDraw.Draw(frame)
    frame_draw.rounded_rectangle((0, 0, frame_w - 1, frame_h - 1), radius=23, fill="#ffffff", outline="#dfe7e1", width=2)
    frame_draw.rounded_rectangle((0, 0, frame_w - 1, 48), radius=23, fill="#edf1ee")
    frame_draw.rectangle((0, 24, frame_w - 1, 48), fill="#edf1ee")
    for x in (35, 59, 83):
        frame_draw.ellipse((x, 17, x + 14, 31), fill="#c3cec6")
    frame.paste(screen, (0, 48))
    canvas.paste(frame, (70, 125))

    badge_box = (70, 1000, 305, 1046)
    draw.rounded_rectangle(badge_box, radius=23, fill=accent)
    draw.text((95, 1013), badge, font=font(ARIAL_BOLD, 17), fill=bg1)
    draw.text((70, 1080), title, font=font(GEORGIA, 47), fill="#ffffff")
    subtitle_font = font(ARIAL, 22)
    subtitle_width = draw.textbbox((0, 0), subtitle, font=subtitle_font)[2]
    draw.text((1530 - subtitle_width, 1088), subtitle, font=subtitle_font, fill="#ecf5ef")

    canvas.save(ROOT / output, "PNG", optimize=True)


if __name__ == "__main__":
    from PIL import ImageColor
    board("portfolio-zielona-marka-live.png", "portfolio-board-zielona-marka.png", "Zielona Marka", "Strona firmowa • formularz wyceny • mały CRM", "STRONA MARKI", "#133b2a", "#245b42", "#d8f04a")
    board("portfolio-auto-naprawa-live.png", "portfolio-board-auto-naprawa.png", "Auto Naprawa", "Strona serwisu • portal klienta", "DEMONSTRACJA", "#1f2326", "#704027", "#ff7b3b")
    board("portfolio-routeflow-live.png", "portfolio-board-routeflow.png", "RouteFlow Transport", "Strona transportowa • centrum operacyjne", "DEMONSTRACJA", "#0d2931", "#244650", "#d8f04a")
