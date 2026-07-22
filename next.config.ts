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
  ...(process.env.NODE_ENV === 'development' && { allowedDevOrigins: ['10.228.1.166'] }),

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            // VULN-09: Removed 'unsafe-eval' — Next.js Turbopack does not require it in production.
            // If a specific dependency breaks, identify it and document here rather than re-adding.
            // Removed 'http:' from img-src / connect-src / media-src — all assets are served over HTTPS.
            // 'unsafe-inline' is retained in script-src: Next.js injects inline __NEXT_DATA__ bootstrap
            // scripts that cannot be removed without a nonce-based CSP refactor.
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https: ws: wss:; media-src 'self' blob: data: https:; frame-src 'self' https://accounts.google.com;",
          }
        ],
      },
    ];
  },
};

export default nextConfig;

