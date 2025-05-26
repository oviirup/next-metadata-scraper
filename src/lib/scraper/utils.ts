import { z } from 'zod'
import { ScraperContext, ScraperRuleSet, ScraperTarget } from './types'

export const zUrlSchema = z
  .string()
  .trim()
  .min(1, 'URL cannot be empty')
  .max(2048, 'URL cannot exceed 2048 characters')
  .regex(
    /^(https?:\/\/|\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/.*)?$/,
    'Invalid URL format',
  )
  .transform((value) => {
    if (value.startsWith('//')) return `https:${value}`
    if (!/^(https?:\/\/)/.test(value)) return `https://${value}`
    return value
  })

export async function processRules(
  ruleset: ScraperRuleSet,
  ctx: ScraperContext,
) {
  const { targets, defaultValue, transform } = ruleset
  let value: string | null | undefined
  // loop through each rule in the ruleset
  for (const [selector, attr] of Object.entries(targets)) {
    value = await ctx.page
      .$eval(selector, getPageContent, attr)
      .catch(() => null)
    // if value is found, break the loop
    if (value) break
  }
  // apply default value if set
  if (!value && defaultValue) {
    value =
      typeof defaultValue === 'function'
        ? await defaultValue(ctx)
        : defaultValue
  }
  // apply transformation if set
  if (value && transform) {
    value = await transform(value, ctx)
  }
  // return the final value
  return value
}

export function getPageContent(el: Element, property: ScraperTarget[string]) {
  switch (property) {
    case 'text':
      return el.textContent?.trim()
    case 'html':
      return el.innerHTML
    default:
      if (property.startsWith('attr:')) {
        const attr = property.replace(/^attr:/, '')
        return el.getAttribute(attr)?.trim()
      }
      return null
  }
}

export function getAbsoluteUrl(baseUrl: string, relativeUrl: string) {
  return new URL(relativeUrl, baseUrl).toString()
}
