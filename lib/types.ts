export type Category = "work" | "code" | "trail" | "art" | "sound" | "mind";

export type CapabilityId =
  | "research"
  | "synthesis"
  | "prototyping"
  | "systems"
  | "teaching"
  | "building";

export type Strand = {
  id: string;
  category: Category;
  label: string;
  start: string;
  end?: string;
  weight: number;
  detail: Record<string, string | number>;
  leadsTo: CapabilityId[];
};

export type Capability = {
  id: CapabilityId;
  label: string;
  y: number;
};

export type LaidOutStrand = Strand & {
  pathD: string;
  pathPoints: [number, number][];
  strokeWidth: number;
  color: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  jitter: number;
  phase: number;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  image: string;
  summary: string;
  sections: {
    situation: string;
    discovery: string;
    insight: string;
    made: string;
    outcome: string;
  };
  stats: { label: string; value: string }[];
};
