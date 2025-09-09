import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow Wikimedia images used in article fixtures
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      // Add other trusted hosts here if needed (e.g., your Supabase storage domain)
    ],
  },
}

export default nextConfig
