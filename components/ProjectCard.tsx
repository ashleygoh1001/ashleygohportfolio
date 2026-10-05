import Image from "next/image";
import Link from "next/link";
import type { SectionId } from "@/keystatic.config";
import { resolveProjectImage } from "@/lib/images";
import { sectionMeta } from "@/lib/theme";

type Props = {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string | null;
  tags: readonly string[];
  section: SectionId;
};

export function ProjectCard({
  slug,
  title,
  subtitle,
  coverImage,
  tags,
  section,
}: Props) {
  const accent = sectionMeta[section].accent;
  const cover = resolveProjectImage(coverImage);

  return (
    <Link
      href={`/work/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-warm bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[color:var(--card-accent)] hover:shadow-[var(--shadow-hover)] motion-reduce:transition-none motion-reduce:hover:transform-none"
      style={{ ["--card-accent" as string]: accent }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-cream">
        {cover ? (
          <>
            <Image
              src={cover}
              alt=""
              fill
              className="object-cover brightness-75 transition-[filter] duration-300 group-hover:brightness-90"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{ backgroundColor: accent }}
            />
          </>
        ) : (
          <div
            className="flex h-full items-center justify-center p-6 text-center text-lg font-extrabold text-text-primary"
            style={{ backgroundColor: `color-mix(in srgb, ${accent} 28%, white)` }}
          >
            {title}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-xl font-extrabold text-text-primary">{title}</h3>
          <p className="mt-1 text-base text-text-secondary">{subtitle}</p>
        </div>
        <ul className="mt-auto flex flex-wrap gap-2" aria-label="Skills">
          {tags.slice(0, 4).map((tag) => (
            <li key={tag}>
              <span
                className="inline-block rounded-full px-2.5 py-1 text-sm font-semibold text-text-primary"
                style={{
                  backgroundColor: `color-mix(in srgb, ${accent} 35%, white)`,
                }}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
