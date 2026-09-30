import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { WorksExplorer } from "@/components/sections/works-explorer";
import { api } from "@/lib/api";
import { hasLocale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export default async function WorksPage({ params }: PageProps<"/[locale]/works">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, projects] = await Promise.all([
    getDictionary(locale),
    api.listProjects(locale),
  ]);

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-20">
      <Container>
        <h1 className="text-display-sm text-ink lg:text-display-md">
          {dict.nav.works}
        </h1>
        <div className="mt-10">
          <WorksExplorer
            projects={projects.items}
            locale={locale}
            labels={{
              all: dict.works.all,
              prev: dict.works.prev,
              next: dict.works.next,
              paginationLabel: dict.works.paginationLabel,
            }}
          />
        </div>
      </Container>
    </main>
  );
}
