// Public estimate model. Prices are indicative net amounts, not a binding offer.
export const dtpKinds = [
  { id: "folder", name: "Folder składany", base: 260, page: 65, minPages: 4, defaultPages: 4 },
  { id: "gazetka", name: "Gazetka promocyjna", base: 160, page: 85, minPages: 4, defaultPages: 8 },
  { id: "katalog", name: "Katalog produktów", base: 190, page: 100, minPages: 4, defaultPages: 12 },
  { id: "ulotka", name: "Ulotka", base: 180, page: 69, minPages: 1, defaultPages: 1 },
  { id: "wizytowka", name: "Wizytówka", base: 79, page: 35, minPages: 2, defaultPages: 2 },
  { id: "preflight", name: "Kontrola gotowego PDF", base: 73, page: 6, minPages: 1, defaultPages: 1 },
];
export const dtpFormats = [
  { id: "a6", name: "A6", factor: .95 },
  { id: "a5", name: "A5", factor: 1 },
  { id: "a4", name: "A4", factor: 1 },
  { id: "a3", name: "A3", factor: 1.25 },
  { id: "dl", name: "DL", factor: 1 },
  { id: "custom", name: "Inny format – do potwierdzenia", factor: 1.15 },
];
export const periodOptions = [
  { id: "once", name: "Jednorazowo" },
  { id: "monthly", name: "Raz w miesiącu" },
  { id: "biweekly", name: "Co dwa tygodnie" },
  { id: "weekly", name: "Co tydzień" },
];
export const asMoney = (n) => new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(n) + " zł";
const limit = (v, min, max) => Math.min(max, Math.max(min, Number.isFinite(Number(v)) ? Number(v) : min));
const round = (v) => Math.ceil(Math.max(0, v));

export function priceDtp(raw = {}) {
  const kind = dtpKinds.find((v) => v.id === raw.kind) ?? dtpKinds[0];
  const format = dtpFormats.find((v) => v.id === raw.format) ?? dtpFormats[2];
  let pages = Math.floor(limit(raw.pages ?? kind.defaultPages, kind.minPages, 64));
  if (kind.id === "wizytowka") pages = 2;
  if (kind.id === "ulotka") pages = Math.min(2, pages);
  const count = Math.floor(limit(raw.editions ?? 3, 2, 24));
  const recurring = raw.frequency && raw.frequency !== "once" && kind.id !== "preflight";
  const imageFiles = Math.floor(limit(raw.imageFiles ?? 0, 0, 200));
  const textFiles = Math.floor(limit(raw.textFiles ?? 0, 0, 200));
  const products = Math.floor(limit(raw.products ?? 0, 0, 1000));
  const correctionRounds = Math.floor(limit(raw.correctionRounds ?? 1, 1, 3));
  const special = kind.id === "preflight";
  const baseLayout = round((kind.base + pages * kind.page) * format.factor);
  const fromScratch = special ? 0 : raw.projectStatus === "none" ? (kind.id === "wizytowka" ? 90 : 190) : raw.projectStatus === "reference" ? 75 : 0;
  const textWork = special ? 0 : raw.textStatus === "writing" ? 80 + pages * 40 : raw.textStatus === "partial" ? 40 + pages * 14 : 0;
  const graphicsWork = special ? 0 : raw.imageStatus === "retouch" ? Math.min(imageFiles, 25) * 12 : 0;
  const missingPictures = special ? 0 : Math.floor(limit(raw.stockPhotos ?? 0, 0, 20)) * 30;
  const additionsForProducts = !special && (kind.id === "gazetka" || kind.id === "katalog") ? Math.max(0, Math.ceil((products - 20) / 10)) * 45 : 0;
  const variants = special ? 0 : Math.max(0, Math.floor(limit(raw.versions ?? 1, 1, 5)) - 1) * round(baseLayout * .35);
  const corrections = (correctionRounds - 1) * (special ? 35 : 80);
  const lineItems = [
    { name: "Projekt / skład i przygotowanie produkcyjne", amount: baseLayout },
    { name: "Opracowanie koncepcji i makiety", amount: fromScratch },
    { name: "Opracowanie tekstów", amount: textWork },
    { name: "Korekta / obróbka otrzymanych grafik", amount: graphicsWork },
    { name: "Dobór zdjęć (bez kosztu licencji)", amount: missingPictures },
    { name: "Dodatkowe pozycje produktowe", amount: additionsForProducts },
    { name: "Warianty językowe lub wersje materiału", amount: variants },
    { name: "Dodatkowe rundy zmian", amount: corrections },
  ].filter((item) => item.amount);
  const regular = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const expressExtra = raw.urgent ? round(regular * .25) : 0;
  if (expressExtra) lineItems.push({ name: "Tryb pilny (+25%, po potwierdzeniu dostępności)", amount: expressExtra });
  const oneOff = round(regular + expressExtra);
  // Loyalty applies only to repeatable layout work. New writing, image licenses,
  // rush work and other independently scoped items are never discounted.
  const loyalty = {
    minor: { firstRepeat: .18, step: .04, cap: .40 },
    medium: { firstRepeat: .12, step: .03, cap: .30 },
    major: { firstRepeat: .05, step: .02, cap: .15 },
  };
  const tier = loyalty[raw.changeLevel] ?? loyalty.medium;
  const eligible = special ? 0 : baseLayout;
  const series = Array.from({ length: recurring ? count : 1 }, (_, index) => {
    const number = index + 1;
    const discount = !recurring ? 0 : index === 0 ? .05 : Math.min(tier.cap, tier.firstRepeat + (index - 1) * tier.step);
    const savings = Math.floor(eligible * discount);
    const price = oneOff - savings;
    return { number, discountPercent: Math.round(discount * 100), amount: price, savings };
  });
  const first = series[0].amount;
  const next = series.length > 1 ? series[1].amount : 0;
  const total = series.reduce((sum, edition) => sum + edition.amount, 0);
  const saved = oneOff * series.length - total;
  return {
    kind, format, pages, textFiles, imageFiles, products, recurring: Boolean(recurring), count: series.length,
    oneOff, first, next, total, saved, series,
    firstDiscountPercent: series[0].discountPercent,
    renewalDiscountPercent: series.length > 1 ? series[1].discountPercent : 0,
    maximumDiscountPercent: Math.round(tier.cap * 100),
    lineItems, eligible,
    needsReview: raw.format === "custom" || raw.urgent || pages >= 32 || products > 150 || raw.finish === "nietypowe",
  };
}
