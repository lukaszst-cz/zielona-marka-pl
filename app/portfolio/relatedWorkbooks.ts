import type { PortfolioItem } from "./catalog";

/* Powiązania tematyczne, bez sugerowania wdrożenia lub integracji arkuszy z witryną. */
export const relatedWorkbookSlugs: Record<string, readonly string[]> = {
  "printflow": ["excel-printflow"],
  "transportflow": ["excel-transportflow"],
  "workshopflow": ["excel-warsztat"],
  "auto-naprawa": ["excel-warsztat"],
  "phu-marecki": ["excel-hurtownia"],
  "phu-marecki-aplikacja": ["excel-hurtownia"],
  "navoro-hurt": ["excel-hurtownia"],
  "nexio-elektro": ["excel-hurtownia"],
  "budrivo": ["excel-hurtownia"],
  "materivo": ["excel-hurtownia"],
  "materivo-eko": ["excel-hurtownia"],
  "aurea-smile": ["excel-stomatologia"],
  "solident": ["excel-stomatologia"],
  "bistro-forma": ["excel-kawiarnia"],
  "okruch": ["excel-kawiarnia"],
  "solidom": ["excel-remonty", "excel-budowa"],
  "dom-dobry": ["excel-deweloper"],
  "lead-offer-copilot": ["excel-wycena", "excel-crm"],
  "centrum-budowlane-pwa": ["excel-dashboard"],
};

export function relatedWorkbookIds(item: PortfolioItem): readonly string[] {
  return relatedWorkbookSlugs[item.slug] ?? [];
}
