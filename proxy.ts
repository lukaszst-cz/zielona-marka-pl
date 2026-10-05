import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = new URL(request.url);
  if (["www.zielona-marka.pl", "zielona-marka.pl"].includes(url.hostname) && (url.hostname.startsWith("www.") || url.protocol !== "https:")) {
    url.hostname = "zielona-marka.pl";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-zm-language", url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "pl");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ["/((?!assets/|_next/|brand-review-|demo/routeflow/|demo/auto-naprawa/).*)"] };
