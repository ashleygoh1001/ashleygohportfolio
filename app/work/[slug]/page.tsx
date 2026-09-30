import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { getAllProjects, getProject } from "@/lib/projects";
import { resolveProjectImage } from "@/lib/images";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: project.coverImage
        ? [{ url: resolveProjectImage(project.coverImage)! }]
        : undefined,
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main id="main-content">
      <CaseStudyView project={project} />
    </main>
  );
}
