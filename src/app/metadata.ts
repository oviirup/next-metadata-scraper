import { SITE_NAME, SITE_URL } from '~/config/app'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  openGraph: {
    type: 'website',
    locale: 'en',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: [{ url: '/favicon.ico', sizes: '32' }],
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
}
