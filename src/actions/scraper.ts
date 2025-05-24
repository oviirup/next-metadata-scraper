'use server'

import chromium from '@sparticuz/chromium-min'
import puppeteer from 'puppeteer-core'
import { z } from 'zod'

const zUrl = z
  .string()
  .url('Invalid URL, please enter a valid URL')
  .max(1024, 'URL is too long, please enter a shorter URL')

const isDev = process.env.NODE_ENV === 'development'

export async function getChromeExecutablePath() {
  return isDev
    ? process.env.CHROME_BIN
    : await chromium.executablePath(process.env.CHROME_PACKAGE)
}

export async function getSiteMetadata(targetUrl: string) {
  const parsedUrl = zUrl.safeParse(targetUrl)
  if (!parsedUrl.success) {
    return { error: parsedUrl.error.format() }
  }

  const browser = await puppeteer.launch({
    args: isDev ? puppeteer.defaultArgs() : chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: isDev
      ? process.env.CHROME_BIN
      : await chromium.executablePath(process.env.CHROME_PACKAGE),
    headless: chromium.headless,
  })

  const page = await browser.newPage()
  await page.goto(targetUrl)
  const pageTitle = await page.title()

  const hostname = new URL(targetUrl).hostname

  console.log('URL domain:', hostname)

  // get description ->

  const descriptionMetaTags = [
    'meta[name="description"]',
    'meta[name="og:description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
    'meta[property="twitter:description"]',
  ]
  let description: string | null = null
  for (const tag of descriptionMetaTags) {
    description = await page
      .$eval(tag, (meta) => meta.getAttribute('content'))
      .catch(() => null)
    if (description) break
  }

  // get image ->
  const imageMetaTags = [
    'meta[name="og:image"]',
    'meta[property="og:image"]',
    'meta[name="twitter:image"]',
    'meta[property="twitter:image"]',
  ]
  let image: string | null = null
  for (const tag of imageMetaTags) {
    image = await page
      .$eval(tag, (meta) => meta.getAttribute('content'))
      .catch(() => null)
    if (image) break
  }

  await browser.close()

  console.log({
    title: pageTitle,
    description,
    image,
    url: targetUrl,
  })

  return {
    title: pageTitle,
    description,
    image,
    url: targetUrl,
  }
}
