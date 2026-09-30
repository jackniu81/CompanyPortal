import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/sections/project-card";
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
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
