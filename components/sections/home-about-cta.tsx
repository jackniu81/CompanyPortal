import Link from "next/link";
import { Container } from "@/components/ui/container";
import { localizedHref, type Locale } from "@/lib/content";

export function AboutPreview({
  text,
  locale,
  labels,
}: {
  text: string;
  locale: Locale;
  labels: { heading: string; learnMore: string };
}) {
  return (
    <section className="py-16 lg:py-20">
      <Container className="max-w-measure text-center">
        <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
          {labels.heading}
        </h2>
        <p className="mt-5 text-xl leading-relaxed text-ink">{text}</p>
        <Link
          href={localizedHref(locale, "/about")}
          className="mt-6 inline-flex text-sm text-brand-600 transition-colors hover:text-brand-700"
        >
          {labels.learnMore} →
        </Link>
      </Container>
    </section>
  );
}

export function HomeCta({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { heading: string; body: string; action: string };
}) {
  return (
    <section className="bg-brand-900 py-16 text-canvas lg:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-display-sm lg:text-display-md">{labels.heading}</h2>
        <p className="max-w-measure text-brand-200">{labels.body}</p>
        <Link
          href={localizedHref(locale, "/contact")}
          className="inline-flex items-center rounded-field bg-accent-500 px-6 py-3 text-sm font-medium text-brand-950 transition-colors hover:bg-accent-400"
        >
          {labels.action}
        </Link>
      </Container>
    </section>
  );
}
