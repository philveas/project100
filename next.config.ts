// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Use SSR-compatible standalone build for Firebase Hosting
  output: "standalone",

  // ✅ Allow dynamic server actions
 experimental: {
  serverActions: {},
},

  // ✅ Configure images for both local and remote sources
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

export default nextConfig;
