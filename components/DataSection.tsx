"use client";

import dynamic from "next/dynamic";

const StrandVisualization = dynamic(
  () =>
    import("./StrandVisualization").then((m) => ({
      default: m.StrandVisualization,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[360px] items-center justify-center bg-ground text-sm text-muted">
        Loading data explorer…
      </div>
    ),
  }
);

export function DataSection() {
  return (
    <section id="data" className="border-t border-hairline px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="display mb-3 text-2xl text-paper md:text-3xl">
          A data self-portrait
        </h2>
        <p className="prose-width mb-8 text-base text-muted">
          Every part of my life is a dataset. These strands are jobs, hikes,
          code, art, music, and whatever is on my mind—mapped from 2011 to
          today and braided toward the capabilities I bring to research and
          design work.
        </p>
        <StrandVisualization
          variant="explorer"
          showCategoryBar
          showDetailPanel
          showDataTable
          heightClass="h-[min(70vh,560px)]"
        />
      </div>
    </section>
  );
}
