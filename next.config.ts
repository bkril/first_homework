import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thesportsdb.com",
      },
      {
        protocol: "https",
        hostname: "r2.thesportsdb.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);