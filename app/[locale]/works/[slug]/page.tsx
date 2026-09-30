import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { defaultLocale, hasLocale, localizedHref } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function generateStaticParams() {
  const { items } = await api.listProjects(defaultLocale);
  return items.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/works/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const project = await api.getProject(locale, slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/[locale]/works/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, project, all] = await Promise.all([
    getDictionary(locale),
    api.getProject(locale, slug),
    api.listProjects(locale),
  ]);
  if (!project) notFound();

  const index = all.items.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? all.items[index - 1] : null;
  const next = index >= 0 && index < all.items.length - 1 ? all.items[index + 1] : null;

  const navLink =
    "inline-flex max-w-full min-w-0 items-center gap-2 rounded-field border border-line bg-surface px-4 py-3 text-sm text-ink-muted transition-colors hover:border-brand-300 hover:text-ink";

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-20">
      <Container>
        <Link
          href={localizedHref(locale, "/works")}
          className="text-sm text-brand-600 transition-colors hover:text-brand-700"
        >
          ← {dict.project.back}
        </Link>

        <h1 className="mt-6 text-display-sm text-ink lg:text-display-md">
          {project.title}
        </h1>

        <Image
          src={project.cover.url}
          alt={project.cover.alternativeText ?? project.title}
          width={project.cover.width}
          height={project.cover.height}
          className="mt-10 aspect-[16/9] w-full rounded-card object-cover shadow-card"
          preload
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          <div>
            <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
              {dict.project.descriptionHeading}
            </h2>
            <p className="mt-4 max-w-measure text-lg leading-relaxed text-ink-muted">
              {project.description}
            </p>

            <h2 className="mt-12 text-sm font-medium tracking-caps uppercase text-ink-subtle">
              {dict.project.galleryHeading}
            </h2>
            <div className="mt-5">
              <ProjectGallery
                images={project.gallery}
                alt={project.title}
                labels={{
                  close: dict.project.close,
                  prev: dict.project.prevImage,
                  next: dict.project.nextImage,
                  counter: dict.project.counter,
                }}
              />
            </div>
          </div>

          <aside>
            <dl className="rounded-card border border-line bg-surface p-5 text-sm shadow-card">
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-ink-subtle">{dict.project.category}</dt>
                <dd className="min-w-0 break-words text-right font-medium text-ink">{project.category}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-ink-subtle">{dict.project.year}</dt>
                <dd className="min-w-0 break-words text-right font-medium text-ink">{project.year}</dd>
              </div>
              <div className="flex justify-between gap-4 pt-3">
                <dt className="text-ink-subtle">{dict.project.client}</dt>
                <dd className="min-w-0 break-words text-right font-medium text-ink">{project.client}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <nav
          aria-label={dict.works.paginationLabel}
          className="mt-14 flex flex-wrap items-stretch justify-between gap-4 border-t border-line pt-8"
        >
          {prev ? (
            <Link
              href={localizedHref(locale, `/works/${prev.slug}`)}
              className={navLink}
            >
              ← <span><span className="block text-xs text-ink-subtle">{dict.project.prevProject}</span>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={localizedHref(locale, `/works/${next.slug}`)}
              className={`${navLink} text-right`}
            >
              <span>
                <span className="block text-xs text-ink-subtle">{dict.project.nextProject}</span>
                {next.title}
              </span>
              →
            </Link>
          )}
        </nav>
      </Container>
    </main>
  );
}
