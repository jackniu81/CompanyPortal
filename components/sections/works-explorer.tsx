"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/sections/project-card";
import { localizedHref, type Locale } from "@/lib/content";
import type { Project } from "@/lib/api";

const PAGE_SIZE = 6;

export function WorksExplorer({
  projects,
  locale,
  labels,
}: {
  projects: Project[];
  locale: Locale;
  labels: {
    all: string;
    prev: string;
    next: string;
    paginationLabel: string;
  };
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))],
    [projects],
  );

  const filtered = useMemo(
    () => (category ? projects.filter((p) => p.category === category) : projects),
    [projects, category],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function selectCategory(next: string | null) {
    setCategory(next);
    setPage(1);
  }

  const chip = "rounded-full px-4 py-1.5 text-sm transition-colors";

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group">
        <button
          type="button"
          onClick={() => selectCategory(null)}
          aria-pressed={category === null}
          className={`${chip} ${
            category === null
              ? "bg-primary text-on-primary"
              : "bg-surface-strong text-ink-muted hover:text-ink"
          }`}
        >
          {labels.all}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => selectCategory(c)}
            aria-pressed={category === c}
            className={`${chip} ${
              category === c
                ? "bg-primary text-on-primary"
                : "bg-surface-strong text-ink-muted hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            href={localizedHref(locale, `/works/${project.slug}`)}
          />
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
            className="rounded-field px-4 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-strong hover:text-ink disabled:pointer-events-none disabled:opacity-40"
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
            className="rounded-field px-4 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-strong hover:text-ink disabled:pointer-events-none disabled:opacity-40"
          >
            {labels.next} →
          </button>
        </nav>
      )}
    </div>
  );
}
