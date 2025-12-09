/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: false,
  },

  // ✅ moved out of experimental in Next 16
  reactCompiler: false,

  // ✅ keep clean logging
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
