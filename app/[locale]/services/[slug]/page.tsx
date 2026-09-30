import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { defaultLocale, hasLocale, localizedHref } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function generateStaticParams() {
  const { items } = await api.listServices(defaultLocale);
  return items.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const service = await api.getService(locale, slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, service] = await Promise.all([
    getDictionary(locale),
    api.getService(locale, slug),
  ]);
  if (!service) notFound();

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-20">
      <Container className="max-w-measure">
        <Link
          href={localizedHref(locale, "/services")}
          className="text-sm text-brand-600 transition-colors hover:text-brand-700"
        >
          ← {dict.service.back}
        </Link>

        <h1 className="mt-6 text-display-sm text-ink lg:text-display-md">
          {service.title}
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-ink">{service.summary}</p>
        <p className="mt-8 text-lg leading-relaxed text-ink-muted">
          {service.detail}
        </p>
      </Container>
    </main>
  );
}
