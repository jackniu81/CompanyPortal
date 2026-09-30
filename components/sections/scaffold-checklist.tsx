import { StatusBadge } from "@/components/ui/status-badge";
import type { ChecklistItem } from "@/content/scaffold";

export function ScaffoldChecklist({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="grid gap-4 xs:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.label.en}
          className="rounded-card border border-line bg-canvas p-5 shadow-card"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-medium text-ink">{item.label.zh}</div>
            <StatusBadge tone={item.done ? "done" : "pending"}>
              {item.done ? "已完成" : "待办"}
            </StatusBadge>
          </div>
          <p className="mt-1 text-sm text-ink-subtle">{item.label.en}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.detail.zh}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-subtle">{item.detail.en}</p>
        </li>
      ))}
    </ul>
  );
}
