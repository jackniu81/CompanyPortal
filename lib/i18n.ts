import "server-only";
import type zh from "../content/dictionaries/zh.json";
import { hasLocale, type Locale } from "./content";

const dictionaries: Record<Locale, () => Promise<typeof zh>> = {
  zh: () => import("../content/dictionaries/zh.json").then((m) => m.default),
  en: () => import("../content/dictionaries/en.json").then((m) => m.default),
};

export type Dictionary = typeof zh;

export async function getDictionary(locale: string): Promise<Dictionary> {
  if (!hasLocale(locale)) throw new Error(`Unknown locale: ${locale}`);
  return dictionaries[locale]();
}
