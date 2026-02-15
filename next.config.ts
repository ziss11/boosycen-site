import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Allow local images from /public directory
    // Images uploaded to /public/projects/ will work automatically
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS images (for external URLs if needed)
      },
    ],
  },
  experimental: {
    // Increase body size limit for file uploads
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
