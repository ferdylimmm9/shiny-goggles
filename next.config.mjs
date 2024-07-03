import nextPWA from '@ducanh2912/next-pwa';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const runtimeCaching = nextPWA.runtimeCaching;
const withPWA = nextPWA({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV !== 'production',
  cacheOnFrontEndNav: true,
  dynamicStartUrlRedirect: true,
  workboxOptions: { runtimeCaching },
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@phosphor-icons/react': {
      transform: '@phosphor-icons/react/{{member}}',
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    // https://github.com/vercel/next.js/issues/1791#issuecomment-805595853
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        source: '/:all*(js)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },
});

export default withVanillaExtract(nextConfig);
