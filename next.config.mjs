/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
   /* pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      disable:process.env.NODE_ENV == 'development'
    }, */
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'lyvecityclub.com',
      },
      {
        hostname: '*.lyvecityclub.com',
      },
      {
        hostname: 'spotlists.com',
      },
      {
        hostname: '*.spotlists.com',
      },
    ],
      //domains: ['spotlists.com','jaribu.spotlists.com','staging.lyvecityclub.com','lyvecityclub.com'],
      deviceSizes: [320, 480, 575, 640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256]
    },
    // We don't use trailing slashes on URLs from the Node.js Website
  trailingSlash: false,
  // We don't want to redirect with trailing slashes
  skipTrailingSlashRedirect: true,

};

export default nextConfig;
