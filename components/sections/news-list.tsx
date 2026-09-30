"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { htmlLangOf, localizedHref, type Locale } from "@/lib/content";
import type { NewsArticle } from "@/lib/api";

const PAGE_SIZE = 2;

export function NewsList({
  articles,
  locale,
  labels,
}: {
  articles: NewsArticle[];
  locale: Locale;
  labels: { prev: string; next: string; paginationLabel: string };
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = articles.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const navBtn =
    "rounded-field px-4 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-strong hover:text-ink disabled:pointer-events-none disabled:opacity-40";

  return (
    <div>
      <div className="grid gap-6">
        {visible.map((article) => (
          <article
            key={article.slug}
            className="group relative grid gap-5 overflow-hidden rounded-card border border-line bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:p-6"
          >
            <Image
              src={article.cover.url}
              alt={article.cover.alternativeText ?? article.title}
              width={article.cover.width}
              height={article.cover.height}
              className="aspect-[16/9] w-full rounded-field object-cover"
              unoptimized
            />
            <div>
              <p className="text-xs tracking-caps uppercase text-ink-subtle">
                {new Intl.DateTimeFormat(htmlLangOf(locale), {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(article.date))}
              </p>
              <h2 className="mt-2 text-xl font-medium text-ink">
                <Link
                  href={localizedHref(locale, `/news/${article.slug}`)}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                {article.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>

      {pageCount > 1 && (
        <nav
          aria-label={labels.paginationLabel}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className={navBtn}
          >
            ← {labels.prev}
          </button>
          <span className="text-sm text-ink-subtle">
            {safePage} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={safePage >= pageCount}
            className={navBtn}
          >
            {labels.next} →
          </button>
        </nav>
      )}
    </div>
  );
}
