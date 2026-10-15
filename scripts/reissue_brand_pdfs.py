"""Generate visually checked corrected copies of published PDF edition 3.1.
Historic originals remain unchanged; never run against unexpected inputs.
"""
from __future__ import annotations
from collections import Counter
from hashlib import sha1
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
FILES = [
 ("zielona-marka-standard-jakosci-www-dtp-crm-v3-1.pdf", "zielona-marka-standard-jakosci-www-dtp-crm-v3-1-korekta.pdf", "556ef2b25e7b67378ac3592f20f6023a8a92e7d3", 2),
 ("zielona-marka-standard-dtp-prepress-qa-v3-1.pdf", "zielona-marka-standard-dtp-prepress-qa-v3-1-korekta.pdf", "c92870d6ef7d5c3b4ea7cee0772dc739585bc097", 2),
]
OLD = "Zielonej Marki"
NEW = "Zielona Marka"

def git_sha(data):
 return sha1(f"blob {len(data)}\\0".encode("ascii")+data).hexdigest()

def sample_background(page, rect):
 pix = page.get_pixmap(matrix=fitz.Matrix(1,1), colorspace=fitz.csRGB, alpha=False)
 samples=[]
 for x,y in [(rect.x0-5,rect.y0+rect.height/2),(rect.x1+5,rect.y0+rect.height/2),(rect.x0+rect.width/2,rect.y0-5),(rect.x0+rect.width/2,rect.y1+5)]:
  x,y=int(x),int(y)
  if 0<=x<pix.width and 0<=y<pix.height:
   start=(y*pix.width+x)*3
   samples.append(tuple(pix.samples[start:start+3]))
 rgb=Counter(samples).most_common(1)[0][0] if samples else (255,255,255)
 return tuple(n/255 for n in rgb)

def replace_one_file(src, dst, original_sha, expected_count):
 raw=src.read_bytes()
 if git_sha(raw)!=original_sha: raise ValueError("Source PDF changed: "+str(src))
 pdf=fitz.open(src)
 found=sum(len(p.search_for(OLD)) for p in pdf)
 if found!=expected_count: raise ValueError(f"Expected {expected_count} matches, got {found}: {src.name}")
 modified=set()
 for i,p in enumerate(pdf):
  for area in p.search_for(OLD):
   spans=[s for b in p.get_text("dict")["blocks"] if "lines" in b for line in b["lines"] for s in line["spans"] if fitz.Rect(s["bbox"]).intersects(area)]
   if not spans: raise ValueError(f"Font extraction failed on page {i+1}")
   span=min(spans,key=lambda s:abs(fitz.Rect(s["bbox"]).y0-area.y0))
   font="hebo" if any(x in span["font"].lower() for x in ("bold","heavy","black")) else "helv"
   replacement=NEW.upper() if OLD.upper() in span["text"] else NEW
   color=tuple(((span["color"]>>shift)&255)/255 for shift in (16,8,0))
   y=span["origin"][1]
   background=sample_background(p,area)
   p.add_redact_annot(area,fill=background)
   p.apply_redactions(images=0,graphics=0,text=0)
   p.insert_text(fitz.Point(area.x0,y),replacement,fontsize=span["size"],fontname=font,color=color,overlay=True)
   modified.add(i)
 original_pages=len(pdf)
 pdf.set_metadata({**pdf.metadata,"subject":"Korekta redakcyjna nazwy marki; treść i numer wydania 3.1 bez zmian"})
 pdf.save(dst,garbage=4,deflate=True)
 pdf.close()
 with fitz.open(src) as prior, fitz.open(dst) as current:
  if len(current)!=original_pages or sum(len(p.search_for(OLD)) for p in current)!=0:
   raise ValueError("Page count changed or old branding remains")
  if sum(len(p.search_for(NEW)) for p in current)<expected_count:
   raise ValueError("Missing corrected wording")
  for i in range(original_pages):
   x=prior[i].get_pixmap(matrix=fitz.Matrix(.7,.7),alpha=False)
   y=current[i].get_pixmap(matrix=fitz.Matrix(.7,.7),alpha=False)
   if (x.width,x.height)!=(y.width,y.height): raise ValueError("Page dimensions changed")
   delta=sum(a!=b for a,b in zip(x.samples,y.samples))/len(x.samples)
   bound=.025 if i in modified else .006
   if delta>bound: raise ValueError(f"Page {i+1} changed beyond safe visual threshold: {delta:.2%}")
   if i in modified: print(f"Page {i+1}: {delta:.3%} pixels changed")
 print(f"PASS {dst.name}: corrected {expected_count} phrases, {original_pages} pages preserved")

def main():
 out_dir=ROOT/"public"/"downloads"
 for old,new,sha,count in FILES:
  replace_one_file(out_dir/old,out_dir/new,sha,count)

if __name__=="__main__": main()
