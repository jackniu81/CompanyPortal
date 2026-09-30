import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { NewsList } from "@/components/sections/news-list";
import { api } from "@/lib/api";
import { hasLocale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pageMeta.news.title,
    description: dict.pageMeta.news.description,
  };
}

export default async function NewsPage({
  params,
}: PageProps<"/[locale]/news">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, articles] = await Promise.all([
    getDictionary(locale),
    api.listNews(locale),
  ]);

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-20">
      <Container>
        <h1 className="text-display-sm text-ink lg:text-display-md">
          {dict.nav.news}
        </h1>
        <div className="mt-10">
          <NewsList
            articles={articles.items}
            locale={locale}
            labels={{
              prev: dict.news.prev,
              next: dict.news.next,
              paginationLabel: dict.news.paginationLabel,
            }}
          />
        </div>
      </Container>
    </main>
  );
}
