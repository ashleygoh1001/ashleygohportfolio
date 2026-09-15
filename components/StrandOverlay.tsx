"use client";

import { scaleTime } from "d3-scale";
import type { LaidOutStrand, Capability, CapabilityId } from "@/lib/types";
import type { Category } from "@/lib/types";
import { TIME_START, TIME_END } from "@/lib/strands";
import { formatStrandLabel } from "@/lib/strands";

type Props = {
  laidOut: LaidOutStrand[];
  capabilities: Capability[];
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  vertical: boolean;
  hoveredId: string | null;
  hoveredCap: CapabilityId | null;
  activeCategory: Category | null;
  onStrandHover: (id: string | null) => void;
  onStrandSelect: (strand: LaidOutStrand) => void;
  onCapHover: (id: CapabilityId | null) => void;
  focusedCap: CapabilityId | null;
  focusedStrandId: string | null;
  onCapFocus: (id: CapabilityId) => void;
  onStrandFocus: (id: string) => void;
};

export function StrandOverlay({
  laidOut,
  capabilities,
  width,
  height,
  padding,
  vertical,
  hoveredId,
  hoveredCap,
  activeCategory,
  onStrandHover,
  onStrandSelect,
  onCapHover,
  focusedCap,
  focusedStrandId,
  onCapFocus,
  onStrandFocus,
}: Props) {
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const timeScale = scaleTime()
    .domain([TIME_START, TIME_END])
    .range(
      vertical
        ? [padding.top + innerH, padding.top]
        : [padding.left, padding.left + innerW]
    );

  const years = [2011, 2015, 2019, 2023, 2026];
  const hoveredStrand = laidOut.find((s) => s.id === hoveredId);

  const visibleStrands = laidOut.filter(
    (s) => !activeCategory || s.category === activeCategory
  );

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width={width}
      height={height}
      aria-hidden="true"
    >
      {years.map((year) => {
        const x = vertical ? padding.left : timeScale(new Date(`${year}-06-01`));
        const y = vertical
          ? timeScale(new Date(`${year}-06-01`))
          : height - padding.bottom + 16;
        return vertical ? (
          <g key={year}>
            <line
              x1={padding.left}
              x2={padding.left + innerW}
              y1={y}
              y2={y}
              stroke="var(--hairline)"
              strokeWidth={1}
            />
            <text
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              fill="var(--muted)"
              fontSize={12}
              fontWeight={500}
            >
              {year}
            </text>
          </g>
        ) : (
          <g key={year}>
            <line
              x1={x}
              x2={x}
              y1={padding.top}
              y2={height - padding.bottom}
              stroke="var(--hairline)"
              strokeWidth={1}
            />
            <text
              x={x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fill="var(--muted)"
              fontSize={12}
              fontWeight={500}
            >
              {year}
            </text>
          </g>
        );
      })}

      {visibleStrands.map((strand) => (
        <path
          key={strand.id}
          d={strand.pathD}
          fill="none"
          stroke="transparent"
          strokeWidth={14}
          tabIndex={focusedStrandId === strand.id ? 0 : -1}
          className="cursor-pointer"
          onMouseEnter={() => onStrandHover(strand.id)}
          onMouseLeave={() => onStrandHover(null)}
          onFocus={() => {
            onStrandFocus(strand.id);
            onStrandHover(strand.id);
          }}
          onBlur={() => onStrandHover(null)}
          onClick={() => onStrandSelect(strand)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onStrandSelect(strand);
            }
          }}
        />
      ))}

      {capabilities.map((cap) => {
        const y = padding.top + cap.y * innerH;
        const x = width - padding.right + 8;
        const isHovered = hoveredCap === cap.id;
        const isFocused = focusedCap === cap.id;

        return (
          <g key={cap.id}>
            <circle
              cx={x}
              cy={y}
              r={isHovered || isFocused ? 7 : 5}
              fill={isHovered || isFocused ? "var(--paper)" : "var(--ground-lift)"}
              stroke="var(--paper)"
              strokeWidth={1.5}
              tabIndex={0}
              className="cursor-pointer"
              onMouseEnter={() => onCapHover(cap.id)}
              onMouseLeave={() => onCapHover(null)}
              onFocus={() => onCapFocus(cap.id)}
              onBlur={() => onCapHover(null)}
            />
            <text
              x={x - 12}
              y={y + 4}
              textAnchor="end"
              fill={isHovered || isFocused ? "var(--paper)" : "var(--muted)"}
              fontSize={11}
              fontWeight={500}
            >
              {cap.label}
            </text>
          </g>
        );
      })}

      {hoveredStrand && (
        <g role="tooltip">
          <rect
            x={Math.max(padding.left, hoveredStrand.endX - 180)}
            y={hoveredStrand.endY - 36}
            width={176}
            height={32}
            rx={4}
            fill="var(--ground-lift)"
            stroke="var(--hairline)"
          />
          <text
            x={Math.max(padding.left + 8, hoveredStrand.endX - 172)}
            y={hoveredStrand.endY - 16}
            fill="var(--paper)"
            fontSize={11}
            fontWeight={500}
          >
            {formatStrandLabel(hoveredStrand).slice(0, 42)}
          </text>
        </g>
      )}
    </svg>
  );
}
