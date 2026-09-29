import { ProjectCard } from "@/components/ProjectCard";
import type { SectionId } from "@/keystatic.config";
import { sectionMeta } from "@/lib/theme";
import type { ProjectEntry } from "@/lib/projects";

type Props = {
  sectionId: SectionId;
  heading: string;
  description: string;
  projects: ProjectEntry[];
};

export function ProjectSection({
  sectionId,
  heading,
  description,
  projects,
}: Props) {
  if (projects.length === 0) return null;

  const accent = sectionMeta[sectionId].accent;

  return (
    <section
      id={sectionId === "design-research" ? "work" : undefined}
      className="scroll-mt-24"
      aria-labelledby={`section-${sectionId}`}
    >
      <div
        className="mb-6 h-1 w-16 rounded-full"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <h2
        id={`section-${sectionId}`}
        className="text-3xl font-extrabold text-text-primary md:text-4xl"
      >
        {heading}
      </h2>
      <p className="prose-width mt-3 text-text-secondary">{description}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            subtitle={project.subtitle}
            coverImage={project.coverImage}
            tags={project.tags ?? []}
            section={project.section as SectionId}
          />
        ))}
      </div>
    </section>
  );
}
