import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ /*protocol: 'https',*/ hostname: 'res.cloudinary.com' }]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  reactStrictMode: false
}

export default nextConfig
