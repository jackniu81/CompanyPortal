export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export type Localized<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = "zh";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const htmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};

// Strapi v5 i18n uses IETFBCP47 registry locales: zh-Hans / en
export const strapiLocale: Record<Locale, string> = {
  zh: "zh-Hans",
  en: "en",
};

export function pick<T>(value: Localized<T>, locale: Locale = defaultLocale): T {
  return value[locale];
}

export function htmlLangOf(locale: Locale = defaultLocale): string {
  return htmlLang[locale];
}
