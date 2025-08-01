// next.config.js
module.exports = {
  output: 'standalone',
  images: {
    domains: ['play.google.com', 'developer.apple.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};
