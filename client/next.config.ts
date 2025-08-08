import type { NextConfig } from "next";

const getStrapiDomains = () => {
  const domains = [
    "amazing-courage-61f53eefbb.media.strapiapp.com", // Production
    "heroic-champion-786a121493.media.strapiapp.com", // Staging
  ];
  
  return domains.map(domain => ({
    protocol: "https" as const,
    hostname: domain,
    pathname: "/**/*",
  }));
};

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
      ...getStrapiDomains(),
    ],

    // Add this for better debugging
    // dangerouslyAllowSVG: true,
    // contentDispositionType: 'attachment',
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // // Add these for better external image handling
    // minimumCacheTTL: 60,
    // formats: ['image/webp', 'image/avif'],
    // // Custom loader for Strapi images (alternative approach)
    // loader: 'default',
    // loaderFile: undefined,
  },
};

export default nextConfig;
