export const locales = ['en', 'de', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Language names translated according to the current locale
export const localeNamesTranslated: Record<Locale, Record<Locale, string>> = {
  en: {
    en: 'English',
    de: 'German',
    ar: 'Arabic'
  },
  de: {
    en: 'Englisch',
    de: 'Deutsch',
    ar: 'Arabisch'
  },
  ar: {
    en: 'الإنجليزية',
    de: 'الألمانية',
    ar: 'العربية'
  }
};
