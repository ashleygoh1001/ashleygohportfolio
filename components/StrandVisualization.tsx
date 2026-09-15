"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Category, CapabilityId, LaidOutStrand, Strand } from "@/lib/types";
import {
  capabilities,
  layoutStrands,
  loadStrands,
  sampleStrands,
  getStrandsForCapability,
} from "@/lib/strands";
import { StrandCanvas } from "./StrandCanvas";
import { StrandOverlay } from "./StrandOverlay";
import { CategoryBar } from "./CategoryBar";
import { DetailPanel } from "./DetailPanel";
import { DataTableFallback } from "./DataTableFallback";

type Props = {
  variant?: "hero" | "explorer";
  className?: string;
  showCategoryBar?: boolean;
  showDetailPanel?: boolean;
  showDataTable?: boolean;
  heightClass?: string;
};

const PADDING = { top: 48, right: 160, bottom: 40, left: 56 };

export function StrandVisualization({
  variant = "hero",
  className = "",
  showCategoryBar = false,
  showDetailPanel = false,
  showDataTable = false,
  heightClass = "h-[85vh]",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredCap, setHoveredCap] = useState<CapabilityId | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selected, setSelected] = useState<LaidOutStrand | null>(null);
  const [focusedCap, setFocusedCap] = useState<CapabilityId | null>(null);
  const [focusedStrandId, setFocusedStrandId] = useState<string | null>(null);
  const [drawProgress, setDrawProgress] = useState(0);
  const [driftPhase, setDriftPhase] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [vertical, setVertical] = useState(false);

  const allStrands = useMemo(() => loadStrands(), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      setSize({ width: el.clientWidth, height: el.clientHeight });
      setVertical(window.innerWidth < 768);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const strands: Strand[] = useMemo(() => {
    const base = vertical ? sampleStrands(allStrands, 80) : allStrands;
    return activeCategory
      ? base.filter((s) => s.category === activeCategory)
      : base;
  }, [allStrands, vertical, activeCategory]);

  const laidOut = useMemo(
    () =>
      size.width > 0
        ? layoutStrands(strands, {
            width: size.width,
            height: size.height,
            padding: PADDING,
            vertical,
          })
        : [],
    [strands, size, vertical]
  );

  const highlightedIds = useMemo(() => {
    if (hoveredCap) {
      return new Set(getStrandsForCapability(laidOut, hoveredCap).map((s) => s.id));
    }
    return null;
  }, [hoveredCap, laidOut]);

  useEffect(() => {
    if (reducedMotion) {
      setDrawProgress(1);
      return;
    }

    let frame: number;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setDrawProgress(p);
      setDriftPhase(((now - start) % 30000) / 30000);
      if (p < 1) frame = requestAnimationFrame(tick);
      else {
        const driftLoop = () => {
          setDriftPhase((performance.now() % 30000) / 30000);
          frame = requestAnimationFrame(driftLoop);
        };
        frame = requestAnimationFrame(driftLoop);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, vertical]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!focusedCap) return;
      const capStrands = getStrandsForCapability(laidOut, focusedCap);
      if (capStrands.length === 0) return;

      const idx = capStrands.findIndex((s) => s.id === focusedStrandId);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = capStrands[(idx + 1) % capStrands.length];
        setFocusedStrandId(next.id);
        setHoveredId(next.id);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev =
          capStrands[(idx - 1 + capStrands.length) % capStrands.length];
        setFocusedStrandId(prev.id);
        setHoveredId(prev.id);
      } else if (e.key === "Enter" && focusedStrandId) {
        const strand = capStrands.find((s) => s.id === focusedStrandId);
        if (strand) {
          setSelected(strand);
        }
      }
    },
    [focusedCap, focusedStrandId, laidOut]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleStrandSelect = (strand: LaidOutStrand) => {
    if (showDetailPanel) setSelected(strand);
  };

  return (
    <div className={className}>
      {showCategoryBar && (
        <div className="mb-6">
          <CategoryBar active={activeCategory} onChange={setActiveCategory} />
        </div>
      )}

      <figure className="relative">
        <div
          ref={containerRef}
          className={`relative w-full overflow-hidden bg-ground ${heightClass} ${
            variant === "hero" ? "min-h-[420px]" : "min-h-[360px]"
          }`}
        >
          {size.width > 0 && (
            <>
              <StrandCanvas
                laidOut={laidOut}
                width={size.width}
                height={size.height}
                hoveredId={hoveredId}
                highlightedIds={highlightedIds}
                activeCategory={activeCategory}
                drawProgress={drawProgress}
                driftPhase={driftPhase}
                reducedMotion={reducedMotion}
                vertical={vertical}
              />
              <StrandOverlay
                laidOut={laidOut}
                capabilities={capabilities}
                width={size.width}
                height={size.height}
                padding={PADDING}
                vertical={vertical}
                hoveredId={hoveredId}
                hoveredCap={hoveredCap}
                activeCategory={activeCategory}
                onStrandHover={setHoveredId}
                onStrandSelect={handleStrandSelect}
                onCapHover={setHoveredCap}
                focusedCap={focusedCap}
                focusedStrandId={focusedStrandId}
                onCapFocus={setFocusedCap}
                onStrandFocus={setFocusedStrandId}
              />
            </>
          )}
        </div>
        <figcaption className="sr-only">
          A timeline visualization from 2011 to today showing life experiences
          as colored strands flowing toward professional capability nodes
          including research, synthesis, prototyping, systems thinking,
          teaching, and building.
        </figcaption>
      </figure>

      {showDetailPanel && (
        <DetailPanel strand={selected} onClose={() => setSelected(null)} />
      )}

      {showDataTable && <DataTableFallback strands={allStrands} />}
    </div>
  );
}
