import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: "/trackmyprop",
        destination: "https://trackmyprop.app",
        permanent: true,
      },
      {
        source: "/trackmyprop/:path*",
        destination: "https://trackmyprop.app/:path*",
        permanent: true,
      },
      {
        source: "/proptracker",
        destination: "/trackmyprop",
        permanent: true,
      },
      {
        source: "/proptracker/:path*",
        destination: "/trackmyprop/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
