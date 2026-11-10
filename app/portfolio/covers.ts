/**
 * Okładki prac: to, co w danym projekcie najlepsze, pokazujemy wprost ze źródła.
 * - "live": demonstracja renderowana na żywo w ramce, przycięta do najlepszego kadru,
 * - brak wpisu: zostaje autorska grafika z katalogu.
 * Ramka jest tylko ozdobą okładki; klikalny pozostaje odnośnik do pracy.
 */
export type CoverPlan = {
  live?: string;
  /** Przesunięcie kadru w pikselach strony, gdy najlepszy fragment leży poniżej nagłówka. */
  top?: number;
  /** Szerokość renderowanej strony; mniejsza wartość powiększa treść na okładce. */
  width?: number;
  /** Przesunięcie kadru w bok, gdy najciekawszy fragment leży z prawej strony. */
  leftOffset?: number;
  /** Powiększenie kadru: 1 pokazuje całą szerokość strony, 1.6 zbliża do fragmentu. */
  zoom?: number;
};

export const projectCovers: Record<string, CoverPlan> = {
  budrivo: { live: "https://budrivo.vercel.app", top: 70 },
  "navoro-hurt": { live: "https://navoro-hurt-koncepcja.vercel.app", top: 60 },
  "nexio-elektro": { live: "https://nexio-elektro.vercel.app", top: 60 },
  materivo: { live: "https://materivo-pro.vercel.app", top: 60 },
  solidom: { live: "https://solidom.vercel.app", top: 50 },
  solident: { live: "https://solident-mu.vercel.app", top: 50 },
  "black-harbor": { live: "https://blackharbor.vercel.app", top: 70, leftOffset: 330, zoom: 1.5, width: 1500 },
  eltravia: { live: "https://eltravia-premium.vercel.app", top: 40 },
  "natura-studio": { live: "/realizacje/natura-studio", top: 40 },
  "bistro-forma": { live: "/realizacje/bistro-forma", top: 40 },
  "dom-dobry": { live: "/realizacje/dom-dobry", top: 40 },
  "gazetka-navoro": { live: "https://navoro-hurt-koncepcja.vercel.app/gazetka.html", top: 0 },
  "gazetka-nexio": { live: "https://nexio-elektro.vercel.app/gazetka.html", top: 0 },
  "gazetka-budrivo": { live: "https://budrivo.vercel.app/gazetka.html", top: 0 },
  "gazetka-materivo": { live: "https://materivo-eko.vercel.app", top: 70 },
  transportflow: { live: "/realizacje/transportflow", top: 0, width: 1340 },
  "auto-naprawa": { live: "/demo/auto-naprawa/", top: 0, width: 1340 },
  "lead-offer-copilot": { live: "https://lead-offer-zm.pages.dev/", top: 0, width: 1340 },
  "document-checker": { live: "https://document-checker-zm.pages.dev/", top: 0, width: 1340 },
};

export function coverFor(slug: string): CoverPlan | undefined {
  return projectCovers[slug];
}
