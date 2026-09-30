import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui/container";
import { localizedHref, type Locale } from "@/lib/content";
import type { SiteSettings } from "@/lib/api";

export function SiteHeader({
  locale,
  settings,
  labels,
  languageSwitch,
}: {
  locale: Locale;
  settings: SiteSettings;
  labels: { mainNav: string; menu: string; closeMenu: string };
  languageSwitch: ReactNode;
}) {
  const items = settings.nav.map((item) => ({
    label: item.label,
    href: localizedHref(locale, item.href),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas">
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}`}
            aria-label={settings.siteName}
            className="flex items-center"
          >
            <Image
              src={settings.logo.url}
              alt={settings.logo.alternativeText ?? settings.siteName}
              width={settings.logo.width}
              height={settings.logo.height}
              className="h-8 w-auto"
              unoptimized
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <nav
            aria-label={labels.mainNav}
            className="hidden items-center gap-1 lg:flex"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-field px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-strong hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {languageSwitch}
          <MobileNav items={items} label={labels.menu} closeLabel={labels.closeMenu} />
        </div>
      </Container>
    </header>
  );
}
