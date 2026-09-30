import { notFound } from "next/navigation";
import { RoutePlaceholder } from "@/components/sections/route-placeholder";
import { hasLocale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export default async function WorksPage({ params }: PageProps<"/[locale]/works">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <RoutePlaceholder title={dict.nav.works} note={dict.placeholder.building} />;
}
