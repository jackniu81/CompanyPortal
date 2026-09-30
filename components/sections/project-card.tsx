import Image from "next/image";
import type { Project } from "@/lib/api";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Image
        src={project.cover.url}
        alt={project.cover.alternativeText ?? project.title}
        width={project.cover.width}
        height={project.cover.height}
        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        unoptimized
      />
      <div className="p-5">
        <p className="text-xs tracking-caps uppercase text-ink-subtle">
          {project.category} · {project.year}
        </p>
        <h3 className="mt-2 text-lg font-medium text-ink">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>
      </div>
    </article>
  );
}
