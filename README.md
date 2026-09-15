# Ashley Goh — Portfolio

Personal portfolio for Ashley Goh, UX researcher and designer with a CS background. The site argues that every part of life is a dataset—and proves it with an interactive strand visualization built on Canvas 2D.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS with design tokens as CSS custom properties
- d3-scale, d3-shape, d3-array for layout math
- Framer Motion for UI transitions only

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:43123](http://localhost:43123).

## Project structure

```
app/
  page.tsx              Home — hero, work index, data explorer
  work/[slug]/page.tsx  Case study pages
components/
  StrandCanvas.tsx      Canvas 2D strand renderer
  StrandOverlay.tsx     SVG axis, nodes, hit targets
  StrandVisualization.tsx  Combined visualization + interaction
data/
  *.json                One file per dataset category
lib/
  strands.ts            Loading, layout, filtering
  case-studies.ts       Case study content
```

## Deploy

Deploy to Vercel:

```bash
npm run build
```

## Data

Strand data lives in `/data`. Regenerate sample datasets with:

```bash
node scripts/generate-data.mjs
```
