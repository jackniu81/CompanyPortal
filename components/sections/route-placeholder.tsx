import { Container } from "@/components/ui/container";

export function RoutePlaceholder({ title, note }: { title: string; note: string }) {
  return (
    <main className="flex flex-1 items-center justify-center py-24">
      <Container className="text-center">
        <h1 className="text-display-sm text-ink">{title}</h1>
        <p className="mt-4 text-sm text-ink-muted">{note}</p>
      </Container>
    </main>
  );
}
