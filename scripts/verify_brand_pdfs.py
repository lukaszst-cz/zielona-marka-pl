#!/usr/bin/env python3
"""Audit branding in public PDF downloads.

Legacy v3.0/v3.1 PDF releases are pinned by their exact Git blob hashes until
their editable sources can be reissued. Any replaced or new PDF must contain
only the invariant brand name. Tracking: GitHub issue #96.
"""

from __future__ import annotations

from hashlib import sha1
from pathlib import Path
import re
import sys

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "public" / "downloads"
BRAND_RE = re.compile(r"zielon[a-ząćęłńóśźż]+\s+mark[a-ząćęłńóśźż]+", re.IGNORECASE)

# Explicit grandfathered versions: never broaden this list without review.
LEGACY_PDF_BLOB_SHA = {
    "zielona-marka-standard-dtp-prepress-qa-v3-1.pdf": "c92870d6ef7d5c3b4ea7cee0772dc739585bc097",
    "zielona-marka-standard-dtp-prepress-qa.pdf": "80288f2c690321406d3f328877c5409611140607",
    "zielona-marka-standard-jakosci-www-dtp-crm-v3-1.pdf": "556ef2b25e7b67378ac3592f20f6023a8a92e7d3",
    "zielona-marka-standard-jakosci-www-dtp-crm.pdf": "ea74a607a8a0218561464df6b0eeac2bd4c4a3de",
}
APPROVED = {"Zielona Marka", "ZIELONA MARKA"}


def git_blob_sha(raw: bytes) -> str:
    return sha1(f"blob {len(raw)}\0".encode("ascii") + raw).hexdigest()


def audit() -> int:
    paths = sorted(PDF_DIR.glob("*.pdf"))
    if not paths:
        print("FAIL: no PDF files found in public/downloads", file=sys.stderr)
        return 1

    failed = []
    pending = []
    for path in paths:
        data = path.read_bytes()
        try:
            reader = PdfReader(path, strict=False)
            pages = [page.extract_text() or "" for page in reader.pages]
        except Exception as exc:
            failed.append(f"{path.name}: unreadable PDF ({exc})")
            continue
        if not pages or sum(len(text.strip()) for text in pages) < 100:
            failed.append(f"{path.name}: PDF text unavailable for branding audit")
            continue

        bad = []
        for page_no, text in enumerate(pages, 1):
            for match in BRAND_RE.finditer(text):
                if match.group() not in APPROVED:
                    bad.append(f"page {page_no}: {match.group()!r}")

        sha = git_blob_sha(data)
        if not bad:
            print(f"PASS {path.name}: invariant brand name")
        elif LEGACY_PDF_BLOB_SHA.get(path.name) == sha:
            pending.append((path.name, bad))
            print(f"KNOWN LEGACY {path.name}: {len(bad)} outdated names (issue #96)")
        else:
            failed.append(f"{path.name}: updated PDF has outdated brand forms: " + "; ".join(bad))

    if pending:
        print("\nHistorical PDF editions requiring a new verified release (issue #96):")
        for name, bad in pending:
            print(f"  - {name} ({', '.join(bad)})")
    if failed:
        print("\nBrand PDF audit FAILED:")
        for item in failed:
            print(f"  - {item}")
        return 1
    print(f"\nChecked {len(paths)} public PDFs. New or changed releases are required to use only 'Zielona Marka'.")
    return 0


if __name__ == "__main__":
    sys.exit(audit())
