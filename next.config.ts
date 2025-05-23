import { build } from '@oviirup/sprite'
import { isDev } from '~/config/env'
import type { NextConfig } from 'next'

// build sprite files once
if (!process.env.sprite_build_complete) {
  build({ watch: isDev })
  process.env.sprite_build_complete = 'TRUE'
}

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
