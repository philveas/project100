// next.config.ts
import type { NextConfig } from "next";
import withPWA from "next-pwa";

// Wrap config with PWA
const withPWAModule = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // avoids service worker issues locally
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Enable Server Actions
  experimental: {
    serverActions: {},
  },

  // Image optimisations
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.veasacoustics.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

// Export wrapped config
export default withPWAModule(nextConfig);
