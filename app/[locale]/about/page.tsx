import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { hasLocale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, about] = await Promise.all([
    getDictionary(locale),
    api.getAboutPage(locale),
  ]);

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-20">
      <Container>
        <h1 className="text-display-sm text-ink lg:text-display-md">
          {about.title}
        </h1>
        <p className="mt-8 max-w-measure text-xl leading-relaxed text-ink-muted">
          {about.intro}
        </p>

        <section className="mt-16">
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            {dict.about.teamHeading}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.team.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-card"
              >
                <span
                  aria-hidden
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-lg font-medium text-brand-700"
                >
                  {member.name.trim().slice(0, 1)}
                </span>
                <div>
                  <p className="font-medium text-ink">{member.name}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            {dict.about.timelineHeading}
          </h2>
          <ol className="mt-6 max-w-measure border-l border-line">
            {about.timeline.map((item) => (
              <li key={`${item.year}-${item.event}`} className="relative pb-8 pl-6 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-brand-500"
                />
                <p className="text-sm font-medium tracking-caps text-brand-600">
                  {item.year}
                </p>
                <p className="mt-1 text-base leading-relaxed text-ink">
                  {item.event}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </main>
  );
}
