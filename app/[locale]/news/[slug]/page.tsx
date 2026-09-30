import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/sections/rich-text";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { defaultLocale, hasLocale, htmlLangOf, localizedHref } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function generateStaticParams() {
  const { items } = await api.listNews(defaultLocale);
  return items.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const article = await api.getNews(locale, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: PageProps<"/[locale]/news/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, article] = await Promise.all([
    getDictionary(locale),
    api.getNews(locale, slug),
  ]);
  if (!article) notFound();

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-20">
      <Container>
        <Link
          href={localizedHref(locale, "/news")}
          className="text-sm text-brand-600 transition-colors hover:text-brand-700"
        >
          ← {dict.news.back}
        </Link>

        <article className="mx-auto mt-6">
          <p className="text-xs tracking-caps uppercase text-ink-subtle">
            {new Intl.DateTimeFormat(htmlLangOf(locale), {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(article.date))}
          </p>
          <h1 className="mt-3 text-display-sm text-ink lg:text-display-md">
            {article.title}
          </h1>

          <Image
            src={article.cover.url}
            alt={article.cover.alternativeText ?? article.title}
            width={article.cover.width}
            height={article.cover.height}
            className="mt-10 aspect-[16/9] w-full rounded-card object-cover shadow-card"
            unoptimized
            priority
          />

          <div className="mt-12">
            <RichText text={article.content} />
          </div>
        </article>
      </Container>
    </main>
  );
}
