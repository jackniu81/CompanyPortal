import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "@/components/sections/service-card";
import { localizedHref, type Locale } from "@/lib/content";
import type { Service } from "@/lib/api";

export function ServicesPreview({
  services,
  locale,
  labels,
}: {
  services: Service[];
  locale: Locale;
  labels: { heading: string; viewAll: string };
}) {
  if (services.length === 0) return null;
  return (
    <section className="border-y border-line bg-surface py-16 lg:py-20">
      <Container>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            {labels.heading}
          </h2>
          <Link
            href={localizedHref(locale, "/services")}
            className="text-sm text-brand-600 transition-colors hover:text-brand-700"
          >
            {labels.viewAll} →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              href={localizedHref(locale, `/services/${service.slug}`)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
