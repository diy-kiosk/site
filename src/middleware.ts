import { defineMiddleware } from 'astro:middleware';
import { locales, defaultLocale, isValidLocale, type Locale } from './i18n';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Skip for assets and API routes
  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_') ||
    pathname.includes('.')
  ) {
    return next();
  }

  // Check if already on a locale path
  const [, firstSegment] = pathname.split('/');
  if (isValidLocale(firstSegment)) {
    return next();
  }

  // Detect language from Accept-Language header
  const acceptLanguage = context.request.headers.get('Accept-Language') || '';
  let detectedLocale: Locale = defaultLocale;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      return {
        code: code.split('-')[0].toLowerCase(),
        quality: parseFloat(q.replace('q=', '')) || 1
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first matching locale
  for (const { code } of languages) {
    if (isValidLocale(code)) {
      detectedLocale = code;
      break;
    }
  }

  // Check for stored preference in cookie
  const langCookie = context.cookies.get('lang');
  if (langCookie && isValidLocale(langCookie.value)) {
    detectedLocale = langCookie.value as Locale;
  }

  // Redirect to detected locale
  const redirectPath = pathname === '/' ? `/${detectedLocale}` : `/${detectedLocale}${pathname}`;
  return context.redirect(redirectPath, 302);
});
