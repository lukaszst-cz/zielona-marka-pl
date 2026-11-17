"""Tworzy lżejsze warianty okładek portfolio (480 i 800 px) oraz manifest dla ProjectCover.

Uruchomienie: python3 scripts/portfolio-image-variants.py
"""
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SOURCES = ["app/portfolio/catalog.ts", "app/portfolio/additionalCaseStudies.ts", "app/portfolio/websiteCaseStudies.ts"]
WIDTHS = [480, 800]
QUALITY = 74


def variant_path(src: str, width: int) -> str:
    return re.sub(r"\.(webp|jpe?g|png)$", f"-w{width}.webp", src)


def main() -> None:
    paths = set()
    for source in SOURCES:
        text = (ROOT / source).read_text(encoding="utf-8")
        paths.update(re.findall(r'"(/[^"]+\.(?:webp|jpe?g|png))"', text))
    manifest = {}
    for src in sorted(paths):
        file = PUBLIC / src.lstrip("/")
        if not file.exists() or re.search(r"-w\d+\.webp$", src):
            continue
        with Image.open(file) as image:
            width = image.width
            if width <= WIDTHS[-1] + 100:
                continue
            available = []
            for target in WIDTHS:
                out = PUBLIC / variant_path(src, target).lstrip("/")
                if not out.exists():
                    resized = image.convert("RGB").resize((target, round(image.height * target / width)), Image.LANCZOS)
                    resized.save(out, "WEBP", quality=QUALITY, method=6)
                available.append(target)
        manifest[src] = {"width": width, "variants": available}
    lines = ["/* Wygenerowane przez scripts/portfolio-image-variants.py */",
             "export const coverVariants: Record<string, { width: number; variants: number[] }> = " + json.dumps(manifest, indent=2, ensure_ascii=False) + ";", ""]
    (ROOT / "app/portfolio/coverVariants.ts").write_text("\n".join(lines), encoding="utf-8")
    print(f"{len(manifest)} okładek z wariantami")


if __name__ == "__main__":
    main()
