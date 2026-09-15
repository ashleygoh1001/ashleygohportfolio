"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { LaidOutStrand } from "@/lib/types";
import { categoryLabels } from "@/lib/tokens";

type Props = {
  strand: LaidOutStrand | null;
  onClose: () => void;
};

export function DetailPanel({ strand, onClose }: Props) {
  return (
    <AnimatePresence>
      {strand && (
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="mt-6 border border-hairline bg-ground-lift p-5 md:p-6"
          aria-live="polite"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted">
                {categoryLabels[strand.category]}
              </p>
              <h3 className="display text-xl text-paper md:text-2xl">
                {strand.label}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {strand.start.slice(0, 7)}
                {strand.end ? ` – ${strand.end.slice(0, 7)}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-muted hover:text-paper"
              aria-label="Close detail panel"
            >
              Close
            </button>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {Object.entries(strand.detail).map(([key, value]) => (
              <div key={key}>
                <dt className="text-sm font-medium text-muted">{key}</dt>
                <dd className="text-base text-paper">{String(value)}</dd>
              </div>
            ))}
          </dl>
          {strand.leadsTo.length > 0 && (
            <p className="mt-4 text-sm text-muted">
              Connects to: {strand.leadsTo.join(", ")}
            </p>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
