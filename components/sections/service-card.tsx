import Link from "next/link";
import type { Service } from "@/lib/api";

export function ServiceCard({
  service,
  href,
}: {
  service: Service;
  href?: string;
}) {
  return (
    <article className="relative rounded-card border border-line bg-canvas p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <h3 className="text-lg font-medium text-ink">
        {href ? (
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {service.title}
          </Link>
        ) : (
          service.title
        )}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {service.summary}
      </p>
    </article>
  );
}
