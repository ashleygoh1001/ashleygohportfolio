import { ProjectSection } from "@/components/ProjectSection";
import { getAllProjects, getProjectsBySection } from "@/lib/projects";
import { getOrderedSections, getSiteSettings } from "@/lib/site";

export default async function HomePage() {
  const settings = await getSiteSettings();
  const sections = await getOrderedSections();

  const sectionBlocks = await Promise.all(
    sections.map(async (section) => ({
      section,
      projects: await getProjectsBySection(section.sectionId),
    }))
  );

  return (
    <main id="main-content">
      <section className="mx-auto max-w-6xl px-5 py-14 text-center md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight text-text-primary md:text-5xl">
            {settings.thesis}
          </h1>
          <p className="mx-auto mt-6 max-w-[70ch] text-text-secondary">
            {settings.intro}
          </p>
          <p className="mt-6 text-base font-semibold text-text-primary">
            Currently:{" "}
            <span className="font-medium text-text-secondary">
              {settings.currently}
            </span>
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-5 pb-20 md:px-8">
        {sectionBlocks.map(({ section, projects }) => (
          <ProjectSection
            key={section.sectionId}
            sectionId={section.sectionId}
            heading={section.heading}
            description={section.description}
            projects={projects}
          />
        ))}
      </div>
    </main>
  );
}
