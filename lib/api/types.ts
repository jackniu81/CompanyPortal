import type { Locale, Localized } from "@/lib/content";

export interface Media {
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  cover: Media;
  gallery: Media[];
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  icon?: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  cover: Media;
  excerpt: string;
  content: string;
}

export interface SiteSettings {
  siteName: string;
  logo: Media;
  nav: { label: string; href: string }[];
  footer: {
    address: string;
    email: string;
    phone: string;
    copyright: string;
    social: { label: string; href: string }[];
  };
}

export interface HomePage {
  hero: {
    title: string;
    subtitle: string;
    image: Media;
    cta: { label: string; href: string };
  };
  featuredProjects: Project[];
  servicePreview: Service[];
  aboutPreview: string;
}

export interface AboutPage {
  title: string;
  intro: string;
  team: { name: string; role: string; photo?: Media }[];
  timeline: { year: string; event: string }[];
}

export interface ContactPage {
  title: string;
  info: {
    address: string;
    email: string;
    phone: string;
    hours: string;
  };
  formConfig: {
    fields: ("name" | "email" | "phone" | "company" | "message")[];
    required: ("name" | "email" | "phone" | "company" | "message")[];
    submitLabel: string;
  };
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  sourcePage?: string;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  category?: string;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** 页面/组件只依赖此接口；mock 与 Strapi 各实现一份，locale 透传。 */
export interface Api {
  getSiteSettings(locale: Locale): Promise<SiteSettings>;
  getHomePage(locale: Locale): Promise<HomePage>;
  getAboutPage(locale: Locale): Promise<AboutPage>;
  getContactPage(locale: Locale): Promise<ContactPage>;
  listProjects(locale: Locale, params?: ListParams): Promise<Paged<Project>>;
  getProject(locale: Locale, slug: string): Promise<Project | null>;
  listServices(locale: Locale, params?: ListParams): Promise<Paged<Service>>;
  getService(locale: Locale, slug: string): Promise<Service | null>;
  listNews(locale: Locale, params?: ListParams): Promise<Paged<NewsArticle>>;
  getNews(locale: Locale, slug: string): Promise<NewsArticle | null>;
  submitContactForm(input: ContactFormInput): Promise<{ ok: boolean; id?: string; error?: string }>;
}

export type LocalizedData<T> = Localized<T>;
