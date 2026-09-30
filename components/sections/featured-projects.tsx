"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/sections/project-card";
import { localizedHref, type Locale } from "@/lib/content";
import type { Project } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProjects({
  projects,
  locale,
  labels,
}: {
  projects: Project[];
  locale: Locale;
  labels: { heading: string; viewAll: string };
}) {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const visible = { opacity: 1, visibility: "visible" as const, y: 0 };
      gsap.fromTo(
        "[data-featured='header']",
        { y: 16, autoAlpha: 0 },
        {
          ...visible,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 32, autoAlpha: 0 },
          {
            ...visible,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          },
        );
      }
    },
    { scope: rootRef, dependencies: [projects] },
  );

  if (projects.length === 0) return null;
  return (
    <section ref={rootRef} className="py-16 lg:py-20">
      <Container>
        <div data-featured="header" className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium tracking-caps uppercase text-ink-subtle">
            {labels.heading}
          </h2>
          <Link
            href={localizedHref(locale, "/works")}
            className="text-sm text-brand-600 transition-colors hover:text-brand-700"
          >
            {labels.viewAll} →
          </Link>
        </div>
        <div ref={gridRef} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              href={localizedHref(locale, `/works/${project.slug}`)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
