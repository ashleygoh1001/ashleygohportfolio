import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const dataDir = join(process.cwd(), "data");
mkdirSync(dataDir, { recursive: true });

const capabilities = [
  { id: "research", label: "research & interviewing", y: 0.1 },
  { id: "synthesis", label: "synthesis", y: 0.26 },
  { id: "prototyping", label: "prototyping", y: 0.42 },
  { id: "systems", label: "systems thinking", y: 0.58 },
  { id: "teaching", label: "teaching", y: 0.74 },
  { id: "building", label: "building", y: 0.9 },
];

const work = [
  { id: "sbux", category: "work", label: "Starbucks barista", start: "2020-11", end: "2022-08", weight: 0.7, detail: { "hours/week": "20–40", "worked with": 4, "what it taught me": "Reading people fast under time pressure" }, leadsTo: ["research", "systems"] },
  { id: "library-desk", category: "work", label: "University library desk", start: "2019-09", end: "2020-05", weight: 0.4, detail: { "hours/week": "10", role: "Front desk & reserves" }, leadsTo: ["research"] },
  { id: "ux-intern-acme", category: "work", label: "UX research intern, Acme Health", start: "2022-06", end: "2022-08", weight: 0.85, detail: { team: "3 researchers", method: "Contextual inquiry" }, leadsTo: ["research", "synthesis"] },
  { id: "research-asst", category: "work", label: "Grad research assistant", start: "2023-01", end: "2024-05", weight: 0.75, detail: { lab: "Human-Computer Interaction", focus: "Accessibility" }, leadsTo: ["research", "synthesis", "building"] },
  { id: "design-fellow", category: "work", label: "Design fellow, City Transit Authority", start: "2023-06", end: "2023-08", weight: 0.8, detail: { deliverable: "Wayfinding audit", stakeholders: 12 }, leadsTo: ["research", "prototyping", "systems"] },
  { id: "ta-intro-ux", category: "work", label: "TA, Intro to UX Methods", start: "2024-01", end: "2024-05", weight: 0.6, detail: { students: 28, sessions: "Weekly studio" }, leadsTo: ["teaching", "synthesis"] },
  { id: "freelance-uxr", category: "work", label: "Freelance UX researcher", start: "2024-06", end: "2025-03", weight: 0.65, detail: { clients: 3, domains: "Healthcare, civic tech" }, leadsTo: ["research", "synthesis", "prototyping"] },
  { id: "museum-contract", category: "work", label: "Contract researcher, Community Museum", start: "2024-09", end: "2025-01", weight: 0.7, detail: { study: "Audio guide usability", participants: 16 }, leadsTo: ["research", "synthesis"] },
  { id: "soccer-ref", category: "work", label: "Youth soccer referee", start: "2017-04", end: "2019-11", weight: 0.5, detail: { games: "~120", "age groups": "U10–U14" }, leadsTo: ["systems"] },
  { id: "peer-tutor", category: "work", label: "Peer writing tutor", start: "2018-09", end: "2019-05", weight: 0.45, detail: { sessions: "2/week", focus: "Clarity under constraint" }, leadsTo: ["teaching", "synthesis"] },
  { id: "hackathon-mentor", category: "work", label: "Hackathon design mentor", start: "2023-10", end: "2023-10", weight: 0.35, detail: { event: "Health hack weekend", teams: 6 }, leadsTo: ["teaching", "prototyping"] },
  { id: "clinic-redesign", category: "work", label: "Lead researcher, clinic check-in", start: "2025-01", end: "2025-06", weight: 0.9, detail: { interviews: 22, prototypes: 4 }, leadsTo: ["research", "synthesis", "prototyping", "systems"] },
];

const codeMilestones = [
  ["js-6th", "JavaScript (first line)", "2015-09", "2015-12", 0.3, { grade: "6th", duration: "3 months" }, ["building"]],
  ["scratch", "Scratch games", "2014-03", "2015-06", 0.25, { platform: "Scratch 2.0" }, ["building"]],
  ["python-intro", "Python basics", "2017-01", "2017-06", 0.4, { course: "CS101", project: "Text adventure" }, ["building"]],
  ["html-css", "HTML & CSS", "2018-02", "2018-05", 0.35, { project: "Personal blog theme" }, ["building", "prototyping"]],
  ["java-oop", "Java & OOP", "2018-09", "2019-05", 0.5, { course: "Data structures" }, ["building", "systems"]],
  ["react-first", "First React app", "2020-01", "2020-04", 0.45, { project: "Study group scheduler" }, ["building", "prototyping"]],
  ["figma-plugins", "Figma plugin scripting", "2021-03", "2021-06", 0.4, { plugins: 2 }, ["building", "prototyping"]],
  ["d3-viz", "D3 visualization course", "2021-09", "2021-12", 0.55, { project: "Transit delay viz" }, ["building", "systems"]],
  ["typescript", "TypeScript migration", "2022-02", "2022-05", 0.5, { context: "Research tooling" }, ["building"]],
  ["node-api", "Node REST APIs", "2022-09", "2023-01", 0.45, { project: "Interview transcript tagger" }, ["building"]],
  ["sql-analytics", "SQL for analytics", "2023-03", "2023-05", 0.4, { queries: "Cohort funnels" }, ["systems", "building"] ],
  ["p5-creative", "p5.js generative sketches", "2023-08", "2023-10", 0.35, { sketches: 12 }, ["prototyping"]],
  ["next-portfolio", "This portfolio", "2025-08", "2025-09", 0.6, { stack: "Next.js + Canvas" }, ["building", "prototyping"]],
  ["accessibility-audit", "axe-core automation", "2024-03", "2024-04", 0.4, { repos: 3 }, ["building", "systems"]],
  ["git-workflow", "Git branching workflows", "2019-06", "2019-08", 0.3, { context: "Team projects" }, ["systems"]],
  ["r-stats", "R for survey analysis", "2023-01", "2023-04", 0.45, { packages: "tidyverse, ggplot2" }, ["synthesis", "building"]],
  ["arduino", "Arduino sensors", "2019-03", "2019-05", 0.35, { project: "Ambient noise logger" }, ["building"]],
  ["swift-ui", "SwiftUI prototypes", "2024-07", "2024-08", 0.4, { prototypes: 2 }, ["prototyping", "building"]],
  ["web-audio", "Web Audio API", "2024-11", "2025-01", 0.35, { project: "Sonification experiments" }, ["building"]],
  ["testing-jest", "Jest component tests", "2023-11", "2024-01", 0.35, { coverage: "UI primitives" }, ["building"]],
];

const code = codeMilestones.map(([id, label, start, end, weight, detail, leadsTo]) => ({
  id, category: "code", label, start, end, weight, detail, leadsTo,
}));

const nhPeaks = ["Mt. Washington", "Mt. Lafayette", "Mt. Garfield", "Mt. Moosilauke", "Cannon Mountain", "Mt. Jefferson", "Mt. Adams", "Mt. Madison", "Franconia Ridge", "Mt. Hale", "Mt. Tom", "Mt. Field", "Mt. Willey", "Mt. Osceola", "Mt. Tecumseh", "Mt. Passaconaway", "Mt. Whiteface", "Mt. Tripyramid", "Mt. Carrigain", "Mt. Bond"];
const otherPeaks = ["Half Dome", "Mt. Whitney", "Angels Landing", "Mt. Rainier (camp Muir)", "Old Rag", "Mt. Katahdin", "Grays Peak", "Mt. Elbert", "Harpers Ferry", "Breakneck Ridge", "Bear Mountain", "Storm King", "Cadillac Mountain", "Camel's Hump", "Mt. Mansfield", "Max Patch", "Grayson Highlands", "Shenandoah Old Rag", "Mt. Mitchell", "Clingmans Dome"];
const allPeaks = [...nhPeaks, ...otherPeaks];

const trail = allPeaks.map((name, i) => {
  const year = 2016 + (i % 9);
  const month = String((i % 12) + 1).padStart(2, "0");
  return {
    id: `trail-${i}`,
    category: "trail",
    label: name,
    start: `${year}-${month}`,
    weight: 0.3 + (i % 7) * 0.1,
    detail: { elevation: `${4000 + (i * 137) % 3000} ft`, state: i < 20 ? "NH" : "Various" },
    leadsTo: i % 5 === 0 ? ["systems"] : i % 7 === 0 ? ["research"] : [],
  };
});

const artMediums = ["watercolor", "ink", "charcoal", "digital", "collage", "printmaking"];
const art = Array.from({ length: 40 }, (_, i) => ({
  id: `art-${i}`,
  category: "art",
  label: `${artMediums[i % artMediums.length]} study ${i + 1}`,
  start: `${2017 + (i % 8)}-${String((i % 12) + 1).padStart(2, "0")}`,
  weight: 0.25 + (i % 5) * 0.12,
  detail: { medium: artMediums[i % artMediums.length], hours: 2 + (i % 8) * 3 },
  leadsTo: i % 4 === 0 ? ["prototyping"] : i % 6 === 0 ? ["synthesis"] : [],
}));

const albums = [
  "Kind of Blue", "Blonde", "To Pimp a Butterfly", "In Rainbows", "Discovery", "Illmatic",
  "Homogenic", "OK Computer", "Ctrl", "Channel Orange", "Melodrama", "Rumours", "Abbey Road",
  "The Miseducation of Lauryn Hill", "Back to Black", "Random Access Memories", "Currents",
  "Teen Dream", "Carrie & Lowell", "Bon Iver", "Hozier", "A Seat at the Table", "ANTI",
  "Lemonade", "Future Nostalgia", "Punisher", "Fetch the Bolt Cutters", "Heaven or Las Vegas",
  "Love Deluxe", "The Suburbs", "Funeral", "For Emma", "Black Messiah", "Visions", "Norman Fucking Rockwell",
  "When We All Fall Asleep", "IGOR", "Dawn FM", "Golden Hour", "SOUR", "Happier Than Ever",
  "Planet Her", "30", "Renaissance", "Midnights", "Guts", "The Record", "Hit Me Hard and Soft",
  "Brat", "Cowboy Carter", "Short n' Sweet", "Chromakopia",
];

const sound = albums.map((album, i) => ({
  id: `sound-${i}`,
  category: "sound",
  label: album,
  start: `${2015 + (i % 10)}-${String((i * 3 % 12) + 1).padStart(2, "0")}`,
  weight: 0.2 + (i % 6) * 0.1,
  detail: { format: i % 3 === 0 ? "Vinyl" : "Streaming", replays: 5 + (i % 20) },
  leadsTo: i % 8 === 0 ? ["synthesis"] : [],
}));

const mindTopics = [
  "Participatory design in civic tech", "Calm technology", "Research ops at scale",
  "Wayfinding without signage", "Interview fatigue", "Mixed-methods triangulation",
  "Design ethics in AI products", "Sensory-friendly museum experiences",
  "Remote diary studies", "Service blueprinting", "Evidence-based portfolio craft",
  "Trauma-informed interviewing", "Data physicalization", "Accessibility heuristics",
  "Strategic foresight methods", "Behavioral journey mapping", "Research repository hygiene",
  "Inclusive recruitment panels", "Prototype fidelity tradeoffs", "Stakeholder alignment workshops",
  "Cross-cultural UX", "Design systems governance", "Measuring research impact",
  "Slow hiking as thinking time", "Watercolor as synthesis tool", "Teaching critique without cruelty",
  "Open-source research tooling", "Consent UX patterns", "Dark patterns audit frameworks",
  "Portfolio as argument",
];

const mind = mindTopics.map((topic, i) => ({
  id: `mind-${i}`,
  category: "mind",
  label: topic,
  start: `${2024 + (i % 2)}-${String((i % 12) + 1).padStart(2, "0")}`,
  weight: 0.35 + (i % 4) * 0.1,
  detail: { status: i % 3 === 0 ? "Reading" : i % 3 === 1 ? "Writing" : "Experimenting" },
  leadsTo: ["research", "synthesis", "systems"].slice(0, 1 + (i % 3)),
}));

writeFileSync(join(dataDir, "capabilities.json"), JSON.stringify(capabilities, null, 2));
writeFileSync(join(dataDir, "work.json"), JSON.stringify(work, null, 2));
writeFileSync(join(dataDir, "code.json"), JSON.stringify(code, null, 2));
writeFileSync(join(dataDir, "trail.json"), JSON.stringify(trail, null, 2));
writeFileSync(join(dataDir, "art.json"), JSON.stringify(art, null, 2));
writeFileSync(join(dataDir, "sound.json"), JSON.stringify(sound, null, 2));
writeFileSync(join(dataDir, "mind.json"), JSON.stringify(mind, null, 2));

const total = work.length + code.length + trail.length + art.length + sound.length + mind.length;
console.log(`Generated ${total} strands`);
