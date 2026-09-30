"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { localizedHref, type Locale } from "@/lib/content";
import type { HomePage } from "@/lib/api";

export function HomeHero({
  hero,
  locale,
}: {
  hero: HomePage["hero"];
  locale: Locale;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap
      .timeline({ defaults: { ease: "power3.out", duration: 0.7 } })
      .from("[data-hero='title']", { y: 24, autoAlpha: 0 })
      .from("[data-hero='subtitle']", { y: 20, autoAlpha: 0 }, "-=0.45")
      .from("[data-hero='cta']", { y: 16, autoAlpha: 0 }, "-=0.45")
      .from("[data-hero='image']", { scale: 0.96, autoAlpha: 0, duration: 0.9 }, "-=0.5");
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="border-b border-line bg-surface">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 lg:py-24">
        <div>
          <h1 data-hero="title" className="text-display-sm text-ink lg:text-display-md">
            {hero.title}
          </h1>
          <p data-hero="subtitle" className="mt-6 max-w-measure text-lg leading-relaxed text-ink-muted">
            {hero.subtitle}
          </p>
          <Link
            data-hero="cta"
            href={localizedHref(locale, hero.cta.href)}
            className="mt-8 inline-flex items-center rounded-field bg-primary px-5 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-brand-700"
          >
            {hero.cta.label}
          </Link>
        </div>
        <Image
          data-hero="image"
          src={hero.image.url}
          alt={hero.image.alternativeText ?? hero.title}
          width={hero.image.width}
          height={hero.image.height}
          className="aspect-[16/9] w-full rounded-card object-cover shadow-card"
          preload
        />
      </Container>
    </section>
  );
}
