import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io", // UploadThing CDN
      },
      {
        protocol: "https",
        hostname: "**.utscdn.io", // UploadThing CDN (alternate)
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: ['10.228.1.166'],
};

export default nextConfig;

