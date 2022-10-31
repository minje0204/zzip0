/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false
};

module.exports = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true
  }
};
