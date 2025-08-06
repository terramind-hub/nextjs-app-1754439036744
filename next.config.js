/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org', 'via.placeholder.com'],
    unoptimized: true
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig