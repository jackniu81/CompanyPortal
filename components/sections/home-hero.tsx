import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { localizedHref, type Locale } from "@/lib/content";
import type { HomePage } from "@/lib/api";

export function HomeHero({
  hero,
  locale,
}: {
  hero: HomePage["hero"];
  locale: Locale;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 lg:py-24">
        <div>
          <h1 className="text-display-sm text-ink lg:text-display-md">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-muted">
            {hero.subtitle}
          </p>
          <Link
            href={localizedHref(locale, hero.cta.href)}
            className="mt-8 inline-flex items-center rounded-field bg-primary px-5 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-brand-700"
          >
            {hero.cta.label}
          </Link>
        </div>
        <Image
          src={hero.image.url}
          alt={hero.image.alternativeText ?? hero.title}
          width={hero.image.width}
          height={hero.image.height}
          className="aspect-[16/9] w-full rounded-card object-cover shadow-card"
          unoptimized
          priority
        />
      </Container>
    </section>
  );
}
