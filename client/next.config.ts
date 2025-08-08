import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Temporarily disable optimization if needed
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "*.media.strapiapp.com",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "amazing-courage-61f53eefbb.media.strapiapp.com",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "heroic-champion-786a121493.media.strapiapp.com",
        pathname: "/**/*",
      },
    ],
    // Add this for better debugging
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
