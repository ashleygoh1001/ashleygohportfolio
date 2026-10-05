import Link from "next/link";
import { EmbeddedFrame } from "@/components/EmbeddedFrame";
import { ProjectImageLightbox } from "@/components/ProjectImageLightbox";
import { MarkdocContent } from "@/components/MarkdocContent";
import { getAdjacentProjects } from "@/lib/projects";
import { sectionMeta } from "@/lib/theme";
import { resolveProjectImage } from "@/lib/images";
import type { SectionId } from "@/keystatic.config";

type Project = NonNullable<Awaited<ReturnType<typeof import("@/lib/projects").getProject>>>;

export async function CaseStudyView({ project }: { project: Project }) {
  const { prev, next } = await getAdjacentProjects(project.slug);
  const section = project.section as SectionId;
  const accent = sectionMeta[section].accent;
  const cover = resolveProjectImage(project.coverImage);
  let showDesignBuild = Boolean(project.designAndBuild?.trim());
  const presentationLink = project.links?.find((link) =>
    link.url?.includes("docs.google.com/presentation/d/")
  );
  const presentationId = presentationLink?.url?.match(
    /\/presentation\/d\/([^/]+)/
  )?.[1];
  const websiteLink = ["asl-fingerspelling-hand", "build-a-box"].includes(project.slug)
    ? project.links?.find((link) => link.url === "https://aslhand.vercel.app/")
      ?? project.links?.find((link) => link.url === "https://build-a-box-site.vercel.app/")
    : undefined;
  const pdfUrl = project.slug === "high-honors-thesis-gabm"
    ? "/files/high-honors-thesis-gabm.pdf"
    : undefined;
  const pdfEmbed = pdfUrl
    ? `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`
    : undefined;
  const embedSrc = presentationId
    ? `https://docs.google.com/presentation/d/${presentationId}/embed`
    : websiteLink?.url ?? pdfEmbed;

  return (
    <article>
      <header className="mx-auto max-w-6xl px-5 pt-10 md:px-8">
        <p className="text-sm font-bold text-text-secondary">{project.subtitle}</p>
        <h1 className="mt-2 text-4xl font-extrabold text-text-primary md:text-5xl">
          {project.title}
        </h1>
        {embedSrc && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border-warm bg-cream">
            <EmbeddedFrame
              src={embedSrc}
              title={
                presentationLink?.label ?? websiteLink?.label ?? "Embedded project"
              }
            />
            {(websiteLink || pdfEmbed) && (
              <div className="absolute left-3 top-3 z-10 flex items-center gap-3 rounded-full border border-border-warm bg-surface/95 px-3 py-1.5 text-sm font-bold text-text-primary shadow-sm">
                <span>{websiteLink ? "Embedded website" : "Embedded PDF"}</span>
                <a
                  href={websiteLink?.url ?? pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-text-secondary"
                >
                    {websiteLink ? "Open site" : "Open PDF"}
                </a>
              </div>
            )}
          </div>
        )}
        {!embedSrc && cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border-warm bg-cream">
            <ProjectImageLightbox
              src={cover}
              alt={`${project.title} cover image`}
              title={project.title}
            />
          </div>
        )}
      </header>

      <section
        aria-label="At a glance"
        className="mx-auto mt-10 max-w-6xl px-5 md:px-8"
      >
        <div className="grid gap-4 rounded-2xl border border-border-warm bg-surface p-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Role", project.role],
            ["Timeline", project.timeline],
            ["Team", project.team],
            ["Tools", project.tools],
            ["Outcome", project.outcome],
          ].map(([label, value]) => (
            <div key={label} className={label === "Outcome" ? "lg:col-span-2" : ""}>
              <p className="text-sm font-bold text-text-secondary">{label}</p>
              <p className="mt-1 font-semibold text-text-primary">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {showDesignBuild && (
        <aside
          className="mx-auto mt-14 max-w-6xl px-5 md:px-8"
          aria-label="Design and build"
        >
          <div
            className="rounded-2xl border border-border-warm p-6 md:p-8"
            style={{
              backgroundColor: `color-mix(in srgb, ${accent} 18%, white)`,
            }}
          >
            <h2 className="text-xl font-extrabold text-text-primary">
              Design and Build
            </h2>
            <div className="mt-3 whitespace-pre-line text-text-secondary">
              {project.designAndBuild}
            </div>
          </div>
        </aside>
      )}

      <section className="mx-auto mt-14 max-w-6xl px-5 md:px-8">
        <div>
          <MarkdocContent content={project.fullStory} />
        </div>
        {project.links && project.links.length > 0 && (
          <div className="mt-10 border-t border-border-warm pt-6">
            <h3 className="text-lg font-extrabold text-text-primary">Links</h3>
            <ul className="mt-3 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <li key={`${link.label}-${link.url}`}>
                  <a
                    href={link.url ?? "#"}
                    className="font-semibold text-text-primary underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <nav
        aria-label="Project navigation"
        className="mx-auto mt-16 flex max-w-6xl flex-col gap-4 border-t border-border-warm px-5 py-10 sm:flex-row sm:justify-between md:px-8"
      >
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="font-semibold text-text-primary underline-offset-4 hover:underline"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="font-semibold text-text-primary underline-offset-4 hover:underline sm:text-right"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
