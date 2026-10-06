"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackAnalyticsEvent } from "./CookieConsent";

export default function SiteTracking() {
  const pathname = usePathname();
  const lastPageView = useRef<string | null>(null);

  useEffect(() => {
    const sendPageView = () => {
      const pageKey = `${pathname}:${document.title}`;
      if (lastPageView.current === pageKey) return;
      lastPageView.current = pageKey;
      trackAnalyticsEvent("page_view", { page_path: pathname, page_title: document.title });
    };
    window.addEventListener("zm-analytics-ready", sendPageView);
    if ((window as Window & { __zmAnalyticsReady?: boolean }).__zmAnalyticsReady) sendPageView();
    return () => window.removeEventListener("zm-analytics-ready", sendPageView);
  }, [pathname]);

  useEffect(() => {
    let sent50 = false;
    let sent90 = false;
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0) return;
      const depth = Math.round(window.scrollY / available * 100);
      if (!sent50 && depth >= 50) { sent50 = true; trackAnalyticsEvent("scroll_depth", { percent_scrolled: 50 }); }
      if (!sent90 && depth >= 90) { sent90 = true; trackAnalyticsEvent("scroll_depth", { percent_scrolled: 90 }); }
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("/poradnik") && !pathname.startsWith("/poradnik")) trackAnalyticsEvent("guide_entry_click", { link_url: href, source_path: pathname });
      if (pathname.startsWith("/poradnik") && href.startsWith("/") && !href.startsWith("/poradnik")) trackAnalyticsEvent("guide_cta_click", { link_url: href, source_path: pathname, link_text: (link.textContent ?? "").trim().slice(0, 80) });
      if (href.startsWith("tel:")) trackAnalyticsEvent("contact_click", { method: "phone", link_url: href });
      else if (href.startsWith("mailto:")) trackAnalyticsEvent("contact_click", { method: "email", link_url: href });
      else if (href.includes("wa.me/")) trackAnalyticsEvent("contact_click", { method: "whatsapp", link_url: href });
      else if (link.target === "_blank") trackAnalyticsEvent("outbound_click", { link_url: link.href });
      else if (href.includes("/kontakt") || href.startsWith("#lokalny-kontakt")) trackAnalyticsEvent("cta_click", { link_url: href, link_text: (link.textContent ?? "").trim().slice(0, 80) });
    };
    let formStarted = false;
    const onFormFocus = (event: FocusEvent) => {
      if (formStarted || !(event.target as Element | null)?.closest("form.contact-form")) return;
      formStarted = true;
      trackAnalyticsEvent("form_start", { page_path: pathname });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFormFocus);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("click", onClick); document.removeEventListener("focusin", onFormFocus); };
  }, [pathname]);

  return null;
}
