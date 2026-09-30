import type { tokenSwatches } from "@/content/scaffold";

export function TokenStrip({ swatches }: { swatches: typeof tokenSwatches }) {
  return (
    <div className="grid grid-cols-3 gap-3 xs:grid-cols-6">
      {swatches.map((swatch) => (
        <div key={swatch.name.en} className="flex items-center gap-2">
          <span className={`size-8 rounded-field ring-1 ring-line ${swatch.className}`} />
          <span className="text-xs leading-tight text-ink-muted">
            {swatch.name.zh}
            <span className="block text-ink-subtle">{swatch.name.en}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
