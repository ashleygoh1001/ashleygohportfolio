import Link from "next/link";
import { caseStudies } from "@/lib/case-studies";
import { categoryColors } from "@/lib/tokens";

export function WorkSection() {
  return (
    <section id="work" className="border-t border-hairline px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="display mb-10 text-2xl text-paper md:text-3xl">
          Selected work
        </h2>
        <div className="flex flex-col gap-12 md:gap-16">
          {caseStudies.map((study, i) => (
            <article
              key={study.slug}
              className="grid gap-6 md:grid-cols-2 md:gap-10"
            >
              <div
                className={`aspect-[4/3] bg-ground-lift ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
                style={{
                  borderLeft: `4px solid ${categoryColors[study.category]}`,
                }}
                aria-hidden="true"
              >
                <div className="flex h-full items-end p-5">
                  <span
                    className="text-sm font-medium"
                    style={{ color: categoryColors[study.category] }}
                  >
                    {study.subtitle}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col justify-center ${
                  i % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <h3 className="display text-xl text-paper md:text-2xl">
                  {study.title}
                </h3>
                <p className="prose-width mt-3 text-base text-muted">
                  {study.summary}
                </p>
                <Link
                  href={`/work/${study.slug}`}
                  className="mt-5 inline-flex text-base font-medium text-paper underline decoration-hairline underline-offset-4 hover:decoration-paper"
                >
                  Read case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
