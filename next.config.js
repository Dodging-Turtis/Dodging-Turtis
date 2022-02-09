/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['opensea.mypinata.cloud'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};
