import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const privatePaths = ["/studio/:path*", "/status/:path*", "/demo/:path*", "/umowa-przykladowa"];
    return privatePaths.map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};

export default nextConfig;
