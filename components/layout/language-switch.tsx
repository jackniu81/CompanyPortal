"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/content";

export function LanguageSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const rest = pathname.slice(`/${locale}`.length);

  return (
    <nav aria-label={label} className="flex items-center gap-1 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          prefetch={false}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-field px-2 py-1 transition-colors ${
            l === locale
              ? "bg-brand-700 text-white"
              : "text-ink-muted hover:bg-surface-strong hover:text-ink"
          }`}
        >
          {l === "zh" ? "中文" : "EN"}
        </Link>
      ))}
    </nav>
  );
}
