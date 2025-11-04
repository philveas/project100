import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ For Firebase Hosting (static export)
  output: "standalone",

  // ✅ Disable image optimization during build
  images: {
    unoptimized: true,
  },

  // ✅ No experimental features at all
  experimental: {},

  // ✅ Optional: speed up builds
  reactStrictMode: false,
};

export default nextConfig;
