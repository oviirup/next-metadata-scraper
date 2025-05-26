import type { Page } from 'puppeteer-core'

export type Metadata = {
  title?: string
  description?: string
  icon?: string
  image?: string
  keywords?: string[]
  language?: string
  type?: string
  url?: string
}

export type ScraperTarget = {
  [key: string]: 'text' | 'html' | `attr:${string}`
}

export type ScraperContext = {
  page: Page
  url: string
  origin: string
  html: string
}

export type ScraperRuleSet = {
  targets: ScraperTarget
  defaultValue?: string | ((ctx: ScraperContext) => Awaitable<any>)
  transform?: (value: string, ctx: ScraperContext) => Awaitable<any>
}

type Awaitable<T> = T | PromiseLike<T>
