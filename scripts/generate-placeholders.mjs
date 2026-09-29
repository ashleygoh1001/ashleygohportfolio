import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const imgDir = join(root, "public/images/projects");
mkdirSync(imgDir, { recursive: true });

const accents = {
  "design-research": "#FF7A59",
  "making-prototyping": "#FFC93C",
  "technical-automation": "#7B8CFF",
  teaching: "#7BC67E",
};

const projects = [
  ["dartmouth-dining-uxr", "Dartmouth Dining UXR", "design-research"],
  ["dartmouth-design-corps", "Design Corps", "design-research"],
  ["asl-fingerspelling-hand", "ASL Fingerspelling Hand", "making-prototyping"],
  ["build-a-box", "Build-A-Box", "making-prototyping"],
  ["bank-of-america-automation", "Bank of America", "technical-automation"],
  ["high-honors-thesis-gabm", "High Honors Thesis", "technical-automation"],
  ["ml-lab-neural-scenes", "ML Lab Research", "technical-automation"],
  ["design-thinking-ta", "Design Thinking TA", "teaching"],
];

for (const [slug, title, section] of projects) {
  const color = accents[section];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750" role="img" aria-label="${title} placeholder">
  <rect width="1200" height="750" fill="${color}" opacity="0.35"/>
  <rect width="1200" height="750" fill="#FFF8F0" opacity="0.45"/>
  <text x="600" y="380" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="42" font-weight="800" fill="#2B2A33">${title}</text>
</svg>`;
  writeFileSync(join(imgDir, `${slug}.svg`), svg);
}

mkdirSync(join(root, "public/images/about"), { recursive: true });
mkdirSync(join(root, "public/files"), { recursive: true });
writeFileSync(join(root, "public/files/.gitkeep"), "");
writeFileSync(join(root, "public/images/about/.gitkeep"), "");

console.log("Generated placeholder images");
