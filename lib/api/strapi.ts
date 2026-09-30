import type { Locale } from "@/lib/content";
import type { Api } from "./types";

// Strapi v5 i18n locale registry ids, keyed by site locale
export const strapiLocale: Record<Locale, string> = {
  zh: "zh-Hans",
  en: "en",
};

function notImplemented(method: string): never {
  throw new Error(`strapiApi.${method} is not implemented yet (M4-1 / issue #25)`);
}

/** M1 空实现占位；fetch 封装、populate、字段映射在 M4-1（issue #25）落地。 */
export const strapiApi: Api = {
  getSiteSettings: () => notImplemented("getSiteSettings"),
  getHomePage: () => notImplemented("getHomePage"),
  getAboutPage: () => notImplemented("getAboutPage"),
  getContactPage: () => notImplemented("getContactPage"),
  listProjects: () => notImplemented("listProjects"),
  getProject: () => notImplemented("getProject"),
  listServices: () => notImplemented("listServices"),
  getService: () => notImplemented("getService"),
  listNews: () => notImplemented("listNews"),
  getNews: () => notImplemented("getNews"),
  submitContactForm: () => notImplemented("submitContactForm"),
};
