import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "@/components/sections/service-card";
import { api } from "@/lib/api";
import { hasLocale, localizedHref } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, services] = await Promise.all([
    getDictionary(locale),
    api.listServices(locale),
  ]);

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-20">
      <Container>
        <h1 className="text-display-sm text-ink lg:text-display-md">
          {dict.nav.services}
        </h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {services.items.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              href={localizedHref(locale, `/services/${service.slug}`)}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
