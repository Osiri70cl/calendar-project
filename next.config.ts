const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  experimental: {
    webpackBuildWorker: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // output: "standalone",
};

module.exports = nextConfig;
