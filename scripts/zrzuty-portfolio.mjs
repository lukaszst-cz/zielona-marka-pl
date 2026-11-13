/**
 * Zrzuty pierwszych ekranów demonstracji do okładek portfolio.
 *
 * Uruchomienie: node scripts/zrzuty-portfolio.mjs [slug ...]
 * Bez argumentów robi wszystkie pozycje z listy poniżej.
 *
 * Wymaga dostępu sieciowego do domen demonstracji (vercel.app, pages.dev)
 * oraz przeglądarki Chrome pod CHROME_PATH lub /usr/bin/google-chrome.
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import puppeteer from "puppeteer-core";

const uruchom = promisify(execFile);

const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const KATALOG = path.join(process.cwd(), "public/portfolio/kadry");
const SZEROKOSC = 1440;
const WYSOKOSC = 900;

/** top: ile pikseli strony pominąć od góry, gdy najlepszy kadr leży niżej. */
const strony = [
  { slug: "black-harbor", url: "https://blackharbor.vercel.app", plik: "black-harbor-ekran" },
  { slug: "solidom", url: "https://solidom.vercel.app", plik: "solidom-ekran" },
  { slug: "navoro-hurt", url: "https://navoro-hurt-koncepcja.vercel.app", plik: "navoro-hurt-ekran" },
  { slug: "aurea-smile", url: "https://aurea-smile.vercel.app", plik: "aurea-smile-ekran" },
  { slug: "budrivo", url: "https://budrivo.vercel.app", plik: "budrivo-ekran" },
  { slug: "nexio-elektro", url: "https://nexio-elektro.vercel.app", plik: "nexio-elektro-ekran" },
  { slug: "materivo", url: "https://materivo-pro.vercel.app", plik: "materivo-ekran" },
  { slug: "solident", url: "https://solident-mu.vercel.app", plik: "solident-ekran" },
  { slug: "eltravia", url: "https://eltravia-premium.vercel.app", plik: "eltravia" },
];

/* Pasek Zielonej Marki i typowe belki zgód zasłaniają kadr, więc chowamy je przed zrzutem. */
const UKRYJ = `#zielona-marka-pasek,[id*="cookie"],[class*="cookie-banner"],[class*="cookiebar"],[aria-label*="cookie" i]{display:none!important}
html{scroll-behavior:auto!important}
*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important}`;

async function zrzut(browser, wpis) {
  const page = await browser.newPage();
  await page.setViewport({ width: SZEROKOSC, height: WYSOKOSC, deviceScaleFactor: 2 });
  await page.goto(wpis.url, { waitUntil: "networkidle2", timeout: 60_000 });
  await page.addStyleTag({ content: UKRYJ });
  if (wpis.top) await page.evaluate(y => window.scrollTo(0, y), wpis.top);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; })));
  });
  await new Promise(r => setTimeout(r, 1500));
  const bufor = await page.screenshot({ type: "png" });
  const png = path.join(KATALOG, `${wpis.plik}.png`);
  await writeFile(png, bufor);
  await page.close();
  /* Okładka na stronie ma 1400 px szerokości; WebP waży wtedy kilkadziesiąt kilobajtów. */
  const webp = path.join(KATALOG, `${wpis.plik}.webp`);
  await uruchom("convert", [png, "-resize", "1400x", "-quality", "86", "-strip", webp]);
  await rm(png);
  return webp;
}

const wybrane = process.argv.slice(2);
const lista = wybrane.length ? strony.filter(s => wybrane.includes(s.slug)) : strony;
await mkdir(KATALOG, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars", "--force-color-profile=srgb"] });
for (const wpis of lista) {
  try {
    console.log("zapisano", await zrzut(browser, wpis));
  } catch (blad) {
    console.error("blad", wpis.slug, blad.message);
  }
}
await browser.close();
