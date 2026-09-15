import type { Category } from "./types";

export const colors = {
  groundDeep: "#0E1320",
  ground: "#151B2E",
  groundLift: "#1E263F",
  paper: "#E8E6DF",
  muted: "#9BA4BC",
  hairline: "#2B3452",
} as const;

export const categoryColors: Record<Category, string> = {
  work: "#FF5B6E",
  code: "#FFC94A",
  trail: "#4ADE9E",
  art: "#C36BFF",
  sound: "#3FB8FF",
  mind: "#FF9A3F",
};

export const categoryLabels: Record<Category, string> = {
  work: "Work",
  code: "Code",
  trail: "Trail",
  art: "Art",
  sound: "Sound",
  mind: "Mind",
};

export const categories: Category[] = [
  "work",
  "code",
  "trail",
  "art",
  "sound",
  "mind",
];

export const typeScale = {
  xs: "0.8125rem",
  sm: "1rem",
  base: "1.25rem",
  lg: "1.5625rem",
  xl: "1.9375rem",
  "2xl": "2.4375rem",
  "3xl": "3.8125rem",
  "4xl": "6rem",
} as const;
