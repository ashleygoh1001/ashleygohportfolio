"use client";

import { useEffect, useRef, useCallback } from "react";
import type { LaidOutStrand } from "@/lib/types";
import type { Category } from "@/lib/types";
import { getCategoryAlpha, TIME_START, TIME_END } from "@/lib/strands";
import { categories } from "@/lib/tokens";

type Props = {
  laidOut: LaidOutStrand[];
  width: number;
  height: number;
  hoveredId: string | null;
  highlightedIds: Set<string> | null;
  activeCategory: Category | null;
  drawProgress: number;
  driftPhase: number;
  reducedMotion: boolean;
  vertical: boolean;
};

const categoryDelay: Record<Category, number> = Object.fromEntries(
  categories.map((c, i) => [c, i * 0.08])
) as Record<Category, number>;

export function StrandCanvas({
  laidOut,
  width,
  height,
  hoveredId,
  highlightedIds,
  activeCategory,
  drawProgress,
  driftPhase,
  reducedMotion,
  vertical,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const driftAmp = reducedMotion ? 0 : 3.5;
    const driftY = Math.sin(driftPhase * Math.PI * 2) * driftAmp;

    for (const strand of laidOut) {
      if (activeCategory && strand.category !== activeCategory) continue;

      const isHovered = hoveredId === strand.id;
      const isHighlighted =
        highlightedIds === null || highlightedIds.has(strand.id);
      const isDimmed =
        hoveredId !== null && !isHovered && !isHighlighted;

      let alpha = getCategoryAlpha(strand.category);
      if (isHovered) alpha = 1;
      else if (isDimmed) alpha = 0.12;
      else if (highlightedIds !== null && isHighlighted) alpha = 0.85;

      const catProgress = reducedMotion
        ? 1
        : Math.min(
            1,
            Math.max(0, (drawProgress - categoryDelay[strand.category]) / 0.6)
          );

      if (catProgress <= 0) continue;

      ctx.save();
      if (!reducedMotion && catProgress < 1) {
        const clipEdge = vertical
          ? height * catProgress
          : width * catProgress;
        ctx.beginPath();
        if (vertical) {
          ctx.rect(0, height - clipEdge, width, clipEdge);
        } else {
          ctx.rect(0, 0, clipEdge, height);
        }
        ctx.clip();
      }

      ctx.strokeStyle = strand.color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = strand.strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const path = new Path2D(strand.pathD);
      ctx.translate(0, Math.sin(strand.phase + driftPhase * Math.PI * 2) * driftY);
      ctx.stroke(path);
      ctx.restore();
    }
  }, [
    laidOut,
    width,
    height,
    hoveredId,
    highlightedIds,
    activeCategory,
    drawProgress,
    driftPhase,
    reducedMotion,
    vertical,
  ]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}

export function useDrawAnimation(enabled: boolean) {
  const startRef = useRef<number | null>(null);
  const progressRef = useRef(1);
  const driftRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      progressRef.current = 1;
      return;
    }

    progressRef.current = 0;
    startRef.current = null;

    let frame: number;
    const duration = 2200;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      progressRef.current = Math.min(1, elapsed / duration);
      driftRef.current = (now % 30000) / 30000;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  return { duration: 2200 };
}

export function formatAxisLabel(date: Date): string {
  return date.getFullYear().toString();
}

export { TIME_START, TIME_END };
