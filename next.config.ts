import '~/config/env'
import type { NextConfig } from 'next'

const config: NextConfig = {
  devIndicators: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  logging: {
    fetches: { fullUrl: true, hmrRefreshes: true },
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default config
