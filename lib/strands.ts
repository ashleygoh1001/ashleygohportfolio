import { scaleTime, scaleLinear } from "d3-scale";
import { line, curveBumpX } from "d3-shape";
import type {
  Capability,
  CapabilityId,
  Category,
  LaidOutStrand,
  Strand,
} from "./types";
import { categoryColors } from "./tokens";

import capabilitiesData from "@/data/capabilities.json";
import workData from "@/data/work.json";
import codeData from "@/data/code.json";
import trailData from "@/data/trail.json";
import artData from "@/data/art.json";
import soundData from "@/data/sound.json";
import mindData from "@/data/mind.json";

export const TIME_START = new Date("2011-01-01");
export const TIME_END = new Date();

export const capabilities = capabilitiesData as Capability[];

const allRaw: Strand[] = [
  ...(workData as unknown as Strand[]),
  ...(codeData as unknown as Strand[]),
  ...(trailData as unknown as Strand[]),
  ...(artData as unknown as Strand[]),
  ...(soundData as unknown as Strand[]),
  ...(mindData as unknown as Strand[]),
];

export function loadStrands(): Strand[] {
  return allRaw;
}

export function sampleStrands(strands: Strand[], max: number): Strand[] {
  if (strands.length <= max) return strands;
  const step = strands.length / max;
  const sampled: Strand[] = [];
  for (let i = 0; i < max; i++) {
    sampled.push(strands[Math.floor(i * step)]);
  }
  return sampled;
}

function parseDate(value: string): Date {
  if (value.length === 7) return new Date(`${value}-15`);
  return new Date(value);
}

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getCapabilityY(
  capId: CapabilityId,
  height: number,
  padding: { top: number; bottom: number }
): number {
  const cap = capabilities.find((c) => c.id === capId);
  const yNorm = cap?.y ?? 0.5;
  return padding.top + yNorm * (height - padding.top - padding.bottom);
}

export type LayoutOptions = {
  width: number;
  height: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  vertical?: boolean;
};

const defaultPadding = { top: 48, right: 160, bottom: 40, left: 56 };

export function layoutStrands(
  strands: Strand[],
  options: LayoutOptions
): LaidOutStrand[] {
  const padding = options.padding ?? defaultPadding;
  const { width, height, vertical = false } = options;

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const timeScale = scaleTime()
    .domain([TIME_START, TIME_END])
    .range(vertical ? [padding.top + innerH, padding.top] : [padding.left, padding.left + innerW]);

  const ySpread = scaleLinear().domain([0, 1]).range([0, innerH]);

  const lineGen = line<[number, number]>()
    .x((d) => d[0])
    .y((d) => d[1])
    .curve(curveBumpX);

  return strands.map((strand) => {
    const startDate = parseDate(strand.start);
    const endDate = strand.end ? parseDate(strand.end) : startDate;
    const jitter = ((hashId(strand.id) % 100) / 100 - 0.5) * 16;
    const phase = (hashId(strand.id) % 360) * (Math.PI / 180);

    const spread = ySpread((hashId(strand.id) % 1000) / 1000);
    const startY = padding.top + spread + jitter;

    let endX: number;
    let endY: number;

    if (strand.leadsTo.length > 0) {
      const capId = strand.leadsTo[hashId(strand.id) % strand.leadsTo.length];
      endX = vertical ? padding.left + innerW * 0.85 : width - padding.right + 20;
      endY = getCapabilityY(capId, height, padding);
    } else {
      endX = vertical ? padding.left + innerW : width - padding.right * 0.3;
      endY = padding.top + spread * 0.6 + jitter * 0.5;
    }

    const startX = vertical ? padding.left + spread * 0.3 : timeScale(startDate);
    const midT = vertical ? padding.top + innerH * 0.5 : timeScale(
      new Date((startDate.getTime() + endDate.getTime()) / 2)
    );

    const points: [number, number][] = vertical
      ? [
          [startX, timeScale(startDate)],
          [padding.left + innerW * 0.45 + jitter, midT],
          [endX - 20, endY],
          [endX, endY],
        ]
      : [
          [startX, startY],
          [startX + (endX - startX) * 0.35, startY + jitter * 0.4],
          [startX + (endX - startX) * 0.65, endY + jitter * 0.2],
          [endX, endY],
        ];

    const strokeWidth = 1 + strand.weight * 4;
    const pathD = lineGen(points) ?? "";

    return {
      ...strand,
      pathD,
      pathPoints: points,
      strokeWidth,
      color: categoryColors[strand.category],
      startX: points[0][0],
      startY: points[0][1],
      endX,
      endY,
      jitter,
      phase,
    };
  });
}

export function filterStrandsByCategory(
  strands: Strand[],
  category: Category | null
): Strand[] {
  if (!category) return strands;
  return strands.filter((s) => s.category === category);
}

export function getStrandsForCapability(
  laidOut: LaidOutStrand[],
  capId: CapabilityId
): LaidOutStrand[] {
  return laidOut.filter((s) => s.leadsTo.includes(capId));
}

export function getCategoryAlpha(category: Category): number {
  const offsets: Record<Category, number> = {
    work: 0.55,
    code: 0.5,
    trail: 0.45,
    art: 0.4,
    sound: 0.38,
    mind: 0.42,
  };
  return offsets[category];
}

export function formatStrandLabel(strand: Strand): string {
  const range = strand.end
    ? `${strand.start.slice(0, 7)}–${strand.end.slice(0, 7)}`
    : strand.start.slice(0, 7);
  const category = strand.category.charAt(0).toUpperCase() + strand.category.slice(1);
  return `${category}: ${strand.label}, ${range}`;
}
