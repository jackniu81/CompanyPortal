import type { MetadataRoute } from "next";
import { api } from "@/lib/api";
import { defaultLocale, htmlLangOf, locales } from "@/lib/content";

// 站点根地址；NEXT_PUBLIC_SITE_URL 未配置时退化为本地开发地址
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/works", priority: 0.8, changeFrequency: "weekly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/news", priority: 0.8, changeFrequency: "daily" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
];

function urlFor(locale: string, path: string): string {
  return `${siteUrl}/${locale}${path}`;
}

function alternatesFor(path: string): Record<string, string> {
  return Object.fromEntries(locales.map((l) => [htmlLangOf(l), urlFor(l, path)]));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: urlFor(defaultLocale, path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages: alternatesFor(path) },
  }));

  // 详情 slug 以默认语言内容为准（Strapi 中 slug 各语言共用）
  const [projects, services, news] = await Promise.all([
    api.listProjects(defaultLocale),
    api.listServices(defaultLocale),
    api.listNews(defaultLocale),
  ]);

  const details: { path: string; lastModified?: Date }[] = [
    ...projects.items.map((p) => ({ path: `/works/${p.slug}` })),
    ...services.items.map((s) => ({ path: `/services/${s.slug}` })),
    ...news.items.map((n) => ({ path: `/news/${n.slug}`, lastModified: new Date(n.date) })),
  ];

  for (const { path, lastModified } of details) {
    entries.push({
      url: urlFor(defaultLocale, path),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: alternatesFor(path) },
    });
  }

  return entries;
}
