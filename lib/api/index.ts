import { mockApi } from "./mock";
import { strapiApi } from "./strapi";
import type { Api } from "./types";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const api: Api = useMock ? mockApi : strapiApi;

export type {
  AboutPage,
  Api,
  ContactFormInput,
  ContactPage,
  HomePage,
  ListParams,
  Media,
  NewsArticle,
  Paged,
  Project,
  Service,
  SiteSettings,
} from "./types";
