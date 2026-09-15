"use client";

import type { Category } from "@/lib/types";
import { categories, categoryColors, categoryLabels } from "@/lib/tokens";

type Props = {
  active: Category | null;
  onChange: (category: Category | null) => void;
};

export function CategoryBar({ active, onChange }: Props) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="toolbar"
      aria-label="Filter strands by category"
    >
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
          active === null
            ? "bg-ground-lift text-paper"
            : "text-muted hover:text-paper"
        }`}
        aria-pressed={active === null}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(active === cat ? null : cat)}
          className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
            active === cat ? "text-paper" : "text-muted hover:text-paper"
          }`}
          style={{
            backgroundColor:
              active === cat ? `${categoryColors[cat]}33` : undefined,
            borderLeft:
              active === cat ? `3px solid ${categoryColors[cat]}` : undefined,
          }}
          aria-pressed={active === cat}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}
