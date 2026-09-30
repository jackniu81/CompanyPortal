import { notFound } from "next/navigation";
import { RoutePlaceholder } from "@/components/sections/route-placeholder";
import { hasLocale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <RoutePlaceholder title={dict.nav.about} note={dict.placeholder.building} />;
}
