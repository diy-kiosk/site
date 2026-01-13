import en from './locales/en.json';
import vi from './locales/vi.json';
import sv from './locales/sv.json';

export const locales = ['en', 'vi', 'sv'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  sv: 'Svenska'
};

const translations: Record<Locale, typeof en> = { en, vi, sv };

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, langCode] = url.pathname.split('/');
  if (isValidLocale(langCode)) {
    return langCode;
  }
  return defaultLocale;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Remove existing locale prefix if present
  const pathWithoutLocale = locales.some(l => cleanPath.startsWith(`${l}/`) || cleanPath === l)
    ? cleanPath.replace(/^(en|vi|sv)(\/|$)/, '')
    : cleanPath;
  return `/${locale}/${pathWithoutLocale}`.replace(/\/$/, '') || `/${locale}`;
}

// Helper to get all locale paths for static generation
export function getStaticPaths() {
  return locales.map((locale) => ({ params: { lang: locale } }));
}
