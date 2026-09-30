import { notFound } from "next/navigation";
import { ScaffoldChecklist } from "@/components/sections/scaffold-checklist";
import { TokenStrip } from "@/components/sections/token-strip";
import { Container } from "@/components/ui/container";
import { scaffoldChecklist, tokenSwatches } from "@/content/scaffold";
import { hasLocale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main className="flex flex-1 flex-col gap-y-14 py-16 lg:gap-y-20 lg:py-24">
      <Container>
        <p className="text-xs font-medium tracking-caps uppercase text-ink-subtle">
          {dict.home.eyebrow}
        </p>
        <h1 className="mt-4 max-w-measure text-display-sm text-ink lg:text-display-md">
          {dict.home.name}
        </h1>
        <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-muted">
          {dict.home.summary}
        </p>
        <p className="mt-6 text-sm text-ink-subtle">{dict.home.tagline}</p>
      </Container>

      <section>
        <Container>
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            {dict.home.checklistHeading}
          </h2>
          <div className="mt-5">
            <ScaffoldChecklist items={scaffoldChecklist} dict={dict} locale={locale} />
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            {dict.home.tokensHeading}
          </h2>
          <div className="mt-5 rounded-card border border-line bg-surface p-5 shadow-card">
            <TokenStrip swatches={tokenSwatches} locale={locale} />
          </div>
        </Container>
      </section>
    </main>
  );
}
