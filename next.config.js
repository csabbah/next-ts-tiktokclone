/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["imgpile.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
