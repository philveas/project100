// next.config.ts

const nextConfig = {
  // ✅ Enable SSR for Firebase Functions (dynamic pages + Firestore)
  output: "standalone",

  // ✅ Disable Next.js image optimization (Firebase Hosting will serve images directly)
  images: {
    unoptimized: true,
  },

  // ✅ Recommended for production
  reactStrictMode: true,

  // ✅ TypeScript options
  typescript: {
    ignoreBuildErrors: false, // set true only if you have temporary TS issues
  },

  // ✅ Security & header cleanup
  poweredByHeader: false,
};

export default nextConfig;
