import Link from "next/link";
import Image from "next/image";
import { ProjectGallery } from "@/components/ProjectGallery";
import { GoogleSlidesEmbed } from "@/components/GoogleSlidesEmbed";
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

  return (
    <article>
      <header className="mx-auto max-w-6xl px-5 pt-10 md:px-8">
        <p className="text-sm font-bold text-text-secondary">{project.subtitle}</p>
        <h1 className="mt-2 text-4xl font-extrabold text-text-primary md:text-5xl">
          {project.title}
        </h1>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border-warm bg-cream">
          {presentationId ? (
            <GoogleSlidesEmbed
              src={`https://docs.google.com/presentation/d/${presentationId}/embed`}
              title={presentationLink?.label ?? "Google Slides presentation"}
            />
          ) : cover ? (
            <Image
              src={cover}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center bg-cream p-8 text-2xl font-extrabold"
            >
              {project.title}
            </div>
          )}
        </div>
      </header>

      <section
        aria-label="At a glance"
        className="mx-auto mt-10 max-w-6xl px-5 md:px-8"
      >
        <div className="grid gap-4 rounded-2xl border border-border-warm bg-surface p-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Role", project.role],
            ["Timeline", project.timeline],
            ["Team", project.team],
            ["Tools", project.tools],
            ["Outcome", project.outcome],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-sm font-bold text-text-secondary">{label}</p>
              <p className="mt-1 font-semibold text-text-primary">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="mx-auto mt-14 max-w-6xl px-5 md:px-8">
          <h2 className="text-2xl font-extrabold text-text-primary">
            Visual summary
          </h2>
          <p className="mt-2 text-text-secondary">
            Skim the highlights—captions carry the narrative at a glance.
          </p>
          <div className="mt-8">
            <ProjectGallery items={(project.gallery ?? []) as never} />
          </div>
        </section>
      )}

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
              Design + build
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
