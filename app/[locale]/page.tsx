import { notFound } from "next/navigation";
import { AboutPreview, HomeCta } from "@/components/sections/home-about-cta";
import { HomeHero } from "@/components/sections/home-hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesPreview } from "@/components/sections/services-preview";
import { api } from "@/lib/api";
import { hasLocale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, home] = await Promise.all([
    getDictionary(locale),
    api.getHomePage(locale),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <HomeHero hero={home.hero} locale={locale} />
      <FeaturedProjects
        projects={home.featuredProjects}
        locale={locale}
        labels={{
          heading: dict.home.featuredHeading,
          viewAll: dict.home.viewAllWorks,
        }}
      />
      <ServicesPreview
        services={home.servicePreview}
        locale={locale}
        labels={{
          heading: dict.home.servicesHeading,
          viewAll: dict.home.viewAllServices,
        }}
      />
      <AboutPreview
        text={home.aboutPreview}
        locale={locale}
        labels={{
          heading: dict.home.aboutHeading,
          learnMore: dict.home.learnMore,
        }}
      />
      <HomeCta
        locale={locale}
        labels={{
          heading: dict.home.ctaHeading,
          body: dict.home.ctaBody,
          action: dict.home.ctaLabel,
        }}
      />
    </main>
  );
}
