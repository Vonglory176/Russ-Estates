import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "**.strapiapp.com", // *Strapi Domain-Name Here*
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
