import chromium from '@sparticuz/chromium-min'
import puppeteer from 'puppeteer-core'
import { scraperRules } from './rules'
import { Metadata } from './types'
import { processRules, zUrlSchema } from './utils'

export async function createBrowserInstance() {
  const isDev = process.env.NODE_ENV === 'development'
  return puppeteer.launch({
    args: isDev ? puppeteer.defaultArgs() : chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: isDev
      ? process.env.CHROME_BIN
      : await chromium.executablePath(process.env.CHROME_PACKAGE),
    headless: chromium.headless,
  })
}

export async function getMetadata(requestUrl: string) {
  // validate input URL
  const parsedURL = zUrlSchema.safeParse(requestUrl)
  if (!parsedURL.success) {
    throw new Error(parsedURL.error.message)
  }

  // initialize
  const browser = await createBrowserInstance()
  const page = await browser.newPage()
  await page.goto(parsedURL.data)

  // loop through rules and construct metadata
  const metadata: Metadata = {}
  for (const [key, rule] of Object.entries(scraperRules)) {
    const value = await processRules(rule, {
      page,
      url: parsedURL.data,
      origin: new URL(parsedURL.data).origin,
      html: await page.content(),
    })

    if (value !== null) {
      // @ts-expect-error -> Ignore type error, we know value is compatible with Metadata
      metadata[key] = value
    }
  }

  return metadata
}
