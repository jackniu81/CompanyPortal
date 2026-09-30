import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { localizedHref, type Locale } from "@/lib/content";
import type { Project } from "@/lib/api";

export function FeaturedProjects({
  projects,
  locale,
  labels,
}: {
  projects: Project[];
  locale: Locale;
  labels: { heading: string; viewAll: string };
}) {
  if (projects.length === 0) return null;
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            {labels.heading}
          </h2>
          <Link
            href={localizedHref(locale, "/works")}
            className="text-sm text-brand-600 transition-colors hover:text-brand-700"
          >
            {labels.viewAll} →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-card border border-line bg-surface shadow-card transition-shadow hover:shadow-lift"
            >
              <Image
                src={project.cover.url}
                alt={project.cover.alternativeText ?? project.title}
                width={project.cover.width}
                height={project.cover.height}
                className="aspect-[16/10] w-full object-cover"
                unoptimized
              />
              <div className="p-5">
                <p className="text-xs tracking-caps uppercase text-ink-subtle">
                  {project.category} · {project.year}
                </p>
                <h3 className="mt-2 text-lg font-medium text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
