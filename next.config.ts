import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Produce a fully static export during `next build`
  output: 'export',

  // Next/Image needs this for static export
  images: { unoptimized: true },
};

export default nextConfig;
