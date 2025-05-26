import { Metadata, ScraperRuleSet } from './types'
import { getAbsoluteUrl } from './utils'

export const scraperRules: Record<keyof Metadata, ScraperRuleSet> = {
  title: {
    targets: {
      'meta[property="og:title"][content]': 'attr:content',
      'meta[name="og:title"][content]': 'attr:content',
      'meta[property="twitter:title"][content]': 'attr:content',
      'meta[name="twitter:title"][content]': 'attr:content',
      'title': 'text',
    },
  },
  description: {
    targets: {
      'meta[property="og:description"][content]': 'attr:content',
      'meta[name="og:description"][content]': 'attr:content',
      'meta[property="twitter:description"][content]': 'attr:content',
      'meta[name="twitter:description"][content]': 'attr:content',
      'meta[name="description"][content]': 'attr:content',
    },
  },
  language: {
    targets: {
      'html[lang]': 'attr:lang',
      'meta[property="language" i][content]': 'attr:content',
      'meta[name="language" i][content]': 'attr:content',
      'meta[property="og:locale"][content]': 'attr:content',
      'meta[name="og:locale"][content]': 'attr:content',
    },

    transform: (value) => value.split('-')[0].toLowerCase(),
  },
  type: {
    targets: {
      'meta[property="og:type"][content]': 'attr:content',
      'meta[name="og:type"][content]': 'attr:content',
      'meta[property="medium"][content]': 'attr:content',
      'meta[name="medium"][content]': 'attr:content',
    },
  },
  url: {
    targets: {
      'meta[property="og:url"][content]': 'attr:content',
      'meta[name="og:url"][content]': 'attr:content',
      'meta[property="al:web:url"][content]': 'attr:content',
      'meta[name="al:web:url"][content]': 'attr:content',
      'link[rel="canonical"][href]': 'attr:href',
    },
    defaultValue: (ctx) => ctx.url,
    transform: (value, ctx) => getAbsoluteUrl(ctx.origin, value),
  },
  keywords: {
    targets: {
      'meta[property="keywords" i][content]': 'attr:content',
      'meta[name="keywords" i][content]': 'attr:content',
      'meta[property="parsely-tags"][content]': 'attr:content',
      'meta[name="parsely-tags"][content]': 'attr:content',
      'meta[property="sailthru.tags"][content]': 'attr:content',
      'meta[name="sailthru.tags"][content]': 'attr:content',
      'meta[property="article:tag" i][content]': 'attr:content',
      'meta[name="article:tag" i][content]': 'attr:content',
      'meta[property="book:tag" i][content]': 'attr:content',
      'meta[name="book:tag" i][content]': 'attr:content',
      'meta[property="topic" i][content]': 'attr:content',
      'meta[name="topic" i][content]': 'attr:content',
    },
    transform: (value) => value.split(',').map((item) => item.trim()),
  },
  icon: {
    targets: {
      'link[rel="apple-touch-icon"][href]': 'attr:href',
      'link[rel="apple-touch-icon-precomposed"][href]': 'attr:href',
      'link[rel="icon" i][href]': 'attr:href',
      'link[rel="fluid-icon"][href]': 'attr:href',
      'link[rel="shortcut icon"][href]': 'attr:href',
      'link[rel="Shortcut Icon"][href]': 'attr:href',
      'link[rel="mask-icon"][href]': 'attr:href',
    },
    defaultValue: (ctx) => getAbsoluteUrl(ctx.origin, '/favicon.ico'),
    transform: (value, ctx) => getAbsoluteUrl(ctx.origin, value),
  },
  image: {
    targets: {
      'meta[property="og:image:secure_url"][content]': 'attr:content',
      'meta[name="og:image:secure_url"][content]': 'attr:content',
      'meta[property="og:image:url"][content]': 'attr:content',
      'meta[name="og:image:url"][content]': 'attr:content',
      'meta[property="og:image"][content]': 'attr:content',
      'meta[name="og:image"][content]': 'attr:content',
      'meta[property="twitter:image"][content]': 'attr:content',
      'meta[name="twitter:image"][content]': 'attr:content',
      'meta[property="twitter:image:src"][content]': 'attr:content',
      'meta[name="twitter:image:src"][content]': 'attr:content',
      'meta[property="thumbnail"][content]': 'attr:content',
      'meta[name="thumbnail"][content]': 'attr:content',
      'meta[property="sailthru.image.full"][content]': 'attr:content',
      'meta[name="sailthru.image.full"][content]': 'attr:content',
    },
    transform: (value, ctx) => getAbsoluteUrl(ctx.origin, value),
  },
}
