"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zm_analytics_consent";
const MEASUREMENT_ID = "G-CYFQ326JRF";

type AnalyticsWindow = Window & {
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
  __zmAnalyticsReady?: boolean;
};

function analyticsReady() {
  const analyticsWindow = window as AnalyticsWindow;
  if (analyticsWindow.__zmAnalyticsReady) return;
  analyticsWindow.__zmAnalyticsReady = true;
  window.dispatchEvent(new Event("zm-analytics-ready"));
}

function grantAnalyticsConsent() {
  (window as AnalyticsWindow).gtag?.("consent", "update", { analytics_storage: "granted" });
}

function loadAnalytics() {
  const analyticsWindow = window as AnalyticsWindow;
  const existingScript = document.querySelector<HTMLScriptElement>(`script[data-zm-ga="${MEASUREMENT_ID}"]`);
  if (existingScript) {
    grantAnalyticsConsent();
    if (existingScript.dataset.zmGaReady === "true") analyticsReady();
    else existingScript.addEventListener("load", analyticsReady, { once: true });
    return;
  }

  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  // Match Google's installation snippet exactly: the external tag expects
  // command arguments, rather than a nested array created by an arrow function.
  analyticsWindow.gtag = function gtag() { analyticsWindow.dataLayer?.push(arguments); };
  analyticsWindow.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  grantAnalyticsConsent();
  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", MEASUREMENT_ID, { anonymize_ip: true, send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.zmGa = MEASUREMENT_ID;
  script.addEventListener("load", () => {
    script.dataset.zmGaReady = "true";
    analyticsReady();
  }, { once: true });
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
  if (typeof window === "undefined") return;
  try { if (localStorage.getItem(STORAGE_KEY) !== "accepted") return; } catch { return; }
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.("event", name, { send_to: MEASUREMENT_ID, ...params });
}

export function CookieSettingsLink({ english = false }: { english?: boolean }) {
  return <button className="cookie-settings-link" type="button" onClick={() => window.dispatchEvent(new Event("zm-open-cookie-settings"))}>{english ? "Cookie settings" : "Ustawienia cookies"}</button>;
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<"accepted" | "denied" | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: "accepted" | "denied" | null = null;
    try { const value = localStorage.getItem(STORAGE_KEY); if (value === "accepted" || value === "denied") saved = value; } catch {}
    const choiceTimer = window.setTimeout(() => { setChoice(saved); setReady(true); }, 0);
    if (saved === "accepted") loadAnalytics();
    const showSettings = () => setOpen(true);
    window.addEventListener("zm-open-cookie-settings", showSettings);
    return () => {
      window.clearTimeout(choiceTimer);
      window.removeEventListener("zm-open-cookie-settings", showSettings);
    };
  }, []);

  function save(next: "accepted" | "denied") {
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    setChoice(next);
    setOpen(false);
    if (next === "accepted") loadAnalytics();
    else {
      (window as AnalyticsWindow).gtag?.("consent", "update", { analytics_storage: "denied" });
      removeAnalyticsCookies();
    }
  }

  if (!ready || (choice && !open)) return null;

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
