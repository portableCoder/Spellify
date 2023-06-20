/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/Spellify',
  assetPrefix: '/Spellify',
  distDir: 'dist'
}

module.exports = nextConfig
