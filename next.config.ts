import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  async redirects() { return [{ source: "/chatbot-dla-firm", destination: "https://zielona-marka.pl/asystent-zapytan", permanent: true }]; },
  async headers() {
    const privatePaths = ["/studio", "/studio/:path*", "/status", "/status/:path*", "/demo", "/demo/:path*", "/umowa-przykladowa", "/koncepcja-zielonej-marki"];
    const securityHeaders = [
      {key: "X-Content-Type-Options", value: "nosniff"},
      {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
      {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()"},
      {key: "X-Frame-Options", value: "SAMEORIGIN"},
      {key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains"},
      {key: "Content-Security-Policy", value: contentSecurityPolicy},
    ];
    return [{source: "/brand-review-v5/:path*", headers: [{key: "Cache-Control", value: "public, max-age=31536000, immutable"}]}, {source: "/brand-review-v3/:path*", headers: [{key: "Cache-Control", value: "public, max-age=31536000, immutable"}]}, {source: "/", headers: securityHeaders}, {source: "/:path*", headers: securityHeaders}, ...privatePaths.map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }))];
  },
};

export default nextConfig;
