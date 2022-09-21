/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};
