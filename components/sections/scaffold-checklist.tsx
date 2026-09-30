import { StatusBadge } from "@/components/ui/status-badge";
import type { ChecklistItem } from "@/content/scaffold";
import { pick, type Locale } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";

export function ScaffoldChecklist({
  items,
  dict,
  locale,
}: {
  items: ChecklistItem[];
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <ul className="grid gap-4 xs:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.label.en}
          className="rounded-card border border-line bg-canvas p-5 shadow-card"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-medium text-ink">{pick(item.label, locale)}</div>
            <StatusBadge tone={item.done ? "done" : "pending"}>
              {item.done ? dict.common.done : dict.common.pending}
            </StatusBadge>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {pick(item.detail, locale)}
          </p>
        </li>
      ))}
    </ul>
  );
}
