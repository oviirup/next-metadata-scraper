import { env, isDev, isPreview } from '~/config/env'

export const SITE_NAME = 'Next Template'
export const SITE_DESC = 'Simple Next.js template to get started quickly'

export const DOMAIN = 'oviirup.vercel.app'

export const SITE_DOMAIN = isDev
  ? `localhost:${env.PORT}`
  : isPreview
    ? env.VERCEL_URL
    : DOMAIN

export const SITE_URL = isDev
  ? `http://${SITE_DOMAIN}/`
  : `https://${SITE_DOMAIN}/`
