"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const StrandVisualization = dynamic(
  () =>
    import("@/components/StrandVisualization").then((m) => ({
      default: m.StrandVisualization,
    })),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative pt-16">
      <StrandVisualization variant="hero" heightClass="h-[85vh]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-ground-deep/90 pb-10 pt-32">
        <div className="pointer-events-auto mx-auto max-w-6xl px-5 md:px-8">
          <h1 className="display text-4xl uppercase text-paper md:text-6xl lg:text-7xl">
            Ashley Goh
          </h1>
          <p className="prose-width mt-4 text-lg text-muted md:text-xl">
            I turn messy data into things people can act on.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#work"
              className="inline-flex items-center bg-paper px-5 py-2.5 text-base font-medium text-ground-deep"
            >
              See the work
            </Link>
            <Link
              href="#data"
              className="inline-flex items-center border border-hairline bg-ground/60 px-5 py-2.5 text-base font-medium text-paper backdrop-blur-sm"
            >
              Explore the data
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
