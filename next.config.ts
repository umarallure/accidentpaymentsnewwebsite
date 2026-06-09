import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow testing the dev server from other devices on the LAN (e.g. a phone at
  // http://192.168.x.x:3000). Next.js 16 blocks cross-origin requests to dev
  // resources (/_next/*, HMR) by default, which otherwise prevents the client
  // JS bundle from loading on a phone — leaving the menu, typing effect and
  // scroll-reveal sections dead. Dev-only; ignored in production builds.
  allowedDevOrigins: [
    "192.168.0.233",
    "192.168.0.*",
    "192.168.1.*",
    "10.0.0.*",
  ],
};

export default nextConfig;
