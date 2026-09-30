import { ScaffoldChecklist } from "@/components/sections/scaffold-checklist";
import { TokenStrip } from "@/components/sections/token-strip";
import { Container } from "@/components/ui/container";
import { scaffoldChecklist, siteCopy, tokenSwatches } from "@/content/scaffold";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-y-14 py-16 lg:gap-y-20 lg:py-24">
      <Container>
        <p className="text-xs font-medium tracking-caps uppercase text-ink-subtle">
          M1 · Scaffold
        </p>
        <h1 className="mt-4 max-w-measure text-display-sm text-ink lg:text-display-md">
          {siteCopy.zh.name}
        </h1>
        <p
          lang="en"
          className="mt-2 max-w-measure text-xl font-light text-ink-subtle sm:text-2xl"
        >
          {siteCopy.en.name}
        </p>
        <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-muted">
          {siteCopy.zh.summary}
          <span lang="en" className="mt-1 block text-ink-subtle">
            {siteCopy.en.summary}
          </span>
        </p>
        <p className="mt-6 text-sm text-ink-subtle">{siteCopy.zh.tagline}</p>
      </Container>

      <section>
        <Container>
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            脚手架验收 / Checklist
          </h2>
          <div className="mt-5">
            <ScaffoldChecklist items={scaffoldChecklist} />
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            设计令牌 / Design tokens
          </h2>
          <div className="mt-5 rounded-card border border-line bg-surface p-5 shadow-card">
            <TokenStrip swatches={tokenSwatches} />
          </div>
        </Container>
      </section>
    </main>
  );
}
