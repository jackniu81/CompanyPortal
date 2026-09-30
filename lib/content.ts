export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export type Localized<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = "zh";

const htmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};

export function pick<T>(value: Localized<T>, locale: Locale = defaultLocale): T {
  return value[locale];
}

export function htmlLangOf(locale: Locale = defaultLocale): string {
  return htmlLang[locale];
}
