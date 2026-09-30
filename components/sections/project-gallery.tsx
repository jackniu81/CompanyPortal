"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Media } from "@/lib/api";

export function ProjectGallery({
  images,
  alt,
  labels,
}: {
  images: Media[];
  alt: string;
  labels: { close: string; prev: string; next: string; counter: string };
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;

  const show = useCallback(
    (next: number) => {
      setOpenIndex((current) =>
        current === null ? current : (next + images.length) % images.length,
      );
    },
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const current = openIndex;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") show(current + 1);
      if (e.key === "ArrowLeft") show(current - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, show]);

  if (images.length === 0) return null;

  const navBtn =
    "rounded-field bg-brand-800/80 px-4 py-2 text-sm text-canvas transition-colors hover:bg-brand-700";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image, i) => (
        <button
          key={image.url}
          type="button"
          onClick={() => setOpenIndex(i)}
          aria-label={`${alt} (${i + 1})`}
          className="group relative block aspect-[16/9] overflow-hidden rounded-card border border-line"
        >
          <Image
            src={image.url}
            alt={image.alternativeText ?? alt}
            fill
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </button>
      ))}

      {open && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-brand-950/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative aspect-[16/9] max-h-[70vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex].url}
              alt={images[openIndex].alternativeText ?? alt}
              fill
              sizes="1024px"
              className="rounded-card object-contain"
              loading="eager"
            />
          </div>
          <div
            className="flex flex-wrap items-center justify-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className={navBtn} onClick={() => show(openIndex - 1)}>
              ← {labels.prev}
            </button>
            <span className="text-sm text-brand-200">
              {labels.counter.replace("%d", String(openIndex + 1))} / {images.length}
            </span>
            <button type="button" className={navBtn} onClick={() => show(openIndex + 1)}>
              {labels.next} →
            </button>
            <button
              type="button"
              className={`${navBtn} ml-2`}
              onClick={() => setOpenIndex(null)}
              autoFocus
            >
              {labels.close} (Esc)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
