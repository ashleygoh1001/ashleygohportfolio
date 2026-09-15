import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { categoryColors } from "@/lib/tokens";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: `${study.title} — Ashley Goh`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const accent = categoryColors[study.category];

  const sections = [
    { key: "situation", title: "The situation" },
    { key: "discovery", title: "What I did to find out" },
    { key: "insight", title: "What I found that changed the framing" },
    { key: "made", title: "What I made" },
    { key: "outcome", title: "What happened" },
  ] as const;

  return (
    <main className="px-5 pb-24 pt-24 md:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/#work"
          className="text-sm font-medium text-muted hover:text-paper"
        >
          Back to work
        </Link>

        <header className="mt-8 border-l-4 pl-5" style={{ borderColor: accent }}>
          <p className="text-sm font-medium text-muted">{study.subtitle}</p>
          <h1 className="display mt-2 text-3xl text-paper md:text-4xl">
            {study.title}
          </h1>
          <p className="prose-width mt-4 text-lg text-muted">{study.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-6">
            {study.stats.map((stat) => (
              <li key={stat.label}>
                <span
                  className="display block text-2xl"
                  style={{ color: accent }}
                >
                  {stat.value}
                </span>
                <span className="text-sm text-muted">{stat.label}</span>
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.key}>
              <h2 className="display text-xl text-paper md:text-2xl">
                {section.title}
              </h2>
              <p
                className={`prose-width mt-4 text-base text-muted ${
                  section.key === "insight" ? "md:text-lg" : ""
                }`}
              >
                {study.sections[section.key]}
              </p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
