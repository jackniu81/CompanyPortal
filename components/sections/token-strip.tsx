import type { tokenSwatches } from "@/content/scaffold";
import { pick, type Locale } from "@/lib/content";

export function TokenStrip({
  swatches,
  locale,
}: {
  swatches: typeof tokenSwatches;
  locale: Locale;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 xs:grid-cols-6">
      {swatches.map((swatch) => (
        <div key={swatch.name.en} className="flex items-center gap-2">
          <span className={`size-8 rounded-field ring-1 ring-line ${swatch.className}`} />
          <span className="text-xs leading-tight text-ink-muted">
            {pick(swatch.name, locale)}
          </span>
        </div>
      ))}
    </div>
  );
}
