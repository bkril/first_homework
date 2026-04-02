import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale

  const requestedLocale = typeof requested === 'string' ? requested : routing.defaultLocale

  const locale = (routing.locales as readonly string[]).includes(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale

  const messages = (await import(`../../../translations/${locale}.json`)).default

  return {
    locale,
    messages,
  }
})
