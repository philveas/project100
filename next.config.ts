import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Dynamic rendering for Firebase Functions
  output: "standalone", // Enables SSR via Firebase backend

  // ✅ Disable image optimization (Firebase handles this separately)
  images: {
    unoptimized: true,
  },

  // ✅ Enable React strict mode (recommended for production)
  reactStrictMode: true,

  // ✅ Suppress build errors from ESLint during CI/CD
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Optimize performance and runtime
  typescript: {
    ignoreBuildErrors: false, // optional: set true if you need to bypass TS build blocking
  },

  // ✅ Ensure correct environment and stability
  poweredByHeader: false,
};

export default nextConfig;
