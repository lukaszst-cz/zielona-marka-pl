"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zm_analytics_consent";
const MEASUREMENT_ID = "G-CYFQ326JRF";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
};

function loadAnalytics() {
  const analyticsWindow = window as AnalyticsWindow;
  if (document.querySelector(`script[data-zm-ga="${MEASUREMENT_ID}"]`)) return;

  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.gtag = (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
  analyticsWindow.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", MEASUREMENT_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.zmGa = MEASUREMENT_ID;
  document.head.appendChild(script);
}

function removeAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) continue;
    for (const domain of ["", ".zielona-marka.pl", "zielona-marka.pl"]) {
      document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""} SameSite=Lax`;
    }
  }
}

export function trackAnalyticsEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || localStorage.getItem(STORAGE_KEY) !== "accepted") return;
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.("event", name, params);
}

export function CookieSettingsLink() {
  return <button className="cookie-settings-link" type="button" onClick={() => window.dispatchEvent(new Event("zm-open-cookie-settings"))}>Ustawienia cookies</button>;
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<"accepted" | "denied" | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as "accepted" | "denied" | null;
    setChoice(saved);
    if (saved === "accepted") loadAnalytics();
    const showSettings = () => setOpen(true);
    window.addEventListener("zm-open-cookie-settings", showSettings);
    return () => window.removeEventListener("zm-open-cookie-settings", showSettings);
  }, []);

  function save(next: "accepted" | "denied") {
    localStorage.setItem(STORAGE_KEY, next);
    setChoice(next);
    setOpen(false);
    if (next === "accepted") loadAnalytics();
    else removeAnalyticsCookies();
  }

  if (choice && !open) return null;

  return (
    <aside className="cookie-banner" aria-label="Ustawienia plików cookie">
      <div>
        <span>PRYWATNOŚĆ I POMIAR</span>
        <b>Pomóż nam zrozumieć, jak działa strona.</b>
        <p>Za Twoją zgodą używamy Google Analytics, aby anonimowo sprawdzać odwiedziny i wysłane zapytania. Nie używamy reklam ani profilowania.</p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="cookie-decline" onClick={() => save("denied")}>Tylko niezbędne</button>
        <button type="button" className="cookie-accept" onClick={() => save("accepted")}>Akceptuję analitykę</button>
        <a href="/polityka-prywatnosci">Dowiedz się więcej</a>
      </div>
    </aside>
  );
}
