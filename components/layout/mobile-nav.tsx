"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type MobileNavItem = { label: string; href: string };

export function MobileNav({
  items,
  label,
  closeLabel,
}: {
  items: MobileNavItem[];
  label: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // 路由变化（含浏览器前进/后退）时收起面板：渲染期同步状态，避免 effect 里 setState
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? closeLabel : label}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-field text-ink transition-colors hover:bg-surface-strong"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      {open && (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 top-14 z-40 bg-ink/20"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav-panel"
            aria-label={label}
            className="fixed inset-x-0 top-14 z-50 border-b border-line bg-canvas shadow-lift"
          >
            <ul className="mx-auto flex max-w-page flex-col px-4 py-2 xs:px-8 lg:px-12">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                    className="block rounded-field px-3 py-3 text-base text-ink transition-colors hover:bg-surface-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
