import type { SectionId } from "@/keystatic.config";

export const sectionMeta: Record<
  SectionId,
  { label: string; accent: string; accentName: string }
> = {
  "design-research": {
    label: "Design Research",
    accent: "var(--accent-coral)",
    accentName: "coral",
  },
  "making-prototyping": {
    label: "Making & Prototyping",
    accent: "var(--accent-sunflower)",
    accentName: "sunflower",
  },
  "technical-automation": {
    label: "Technical & Automation",
    accent: "var(--accent-periwinkle)",
    accentName: "periwinkle",
  },
  teaching: {
    label: "Teaching",
    accent: "var(--accent-sage)",
    accentName: "sage",
  },
};

export const sectionOrderDefault: SectionId[] = [
  "design-research",
  "making-prototyping",
  "technical-automation",
  "teaching",
];
