import type { ReactNode } from "react";

const tones = {
  done: "bg-brand-50 text-brand-700 ring-brand-200",
  pending: "bg-surface-strong text-ink-muted ring-line",
} as const;

export type StatusBadgeTone = keyof typeof tones;

export function StatusBadge({
  tone,
  children,
}: {
  tone: StatusBadgeTone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${tone === "done" ? "bg-brand-500" : "bg-ink-subtle"}`}
      />
      {children}
    </span>
  );
}
