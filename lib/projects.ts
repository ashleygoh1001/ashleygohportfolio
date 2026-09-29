import { reader } from "@/lib/keystatic";
import type { SectionId } from "@/keystatic.config";

export type ProjectEntry = Awaited<
  ReturnType<typeof getAllProjects>
>[number];

export async function getAllProjects() {
  const projects = await reader.collections.projects.all();
  return projects
    .map((p) => ({
      slug: p.slug,
      ...p.entry,
    }))
    .sort((a, b) => {
      if (a.section !== b.section) {
        return a.section.localeCompare(b.section);
      }
      return (a.order ?? 0) - (b.order ?? 0);
    });
}

export async function getProject(slug: string) {
  const project = await reader.collections.projects.read(slug);
  if (!project) return null;
  return { slug, ...project };
}

export async function getProjectsBySection(section: SectionId) {
  const all = await getAllProjects();
  return all
    .filter((p) => p.section === section)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getAdjacentProjects(slug: string) {
  const all = await getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
