import { mkdirSync, writeFileSync, rmSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { dump as yamlDump } from "js-yaml";

const root = process.cwd();

function yamlStringify(obj) {
  return yamlDump(obj, { lineWidth: 120, noRefs: true });
}

function story(sections) {
  return sections.join("\n\n");
}

const projects = [
  {
    slug: "dartmouth-dining-uxr",
    yaml: {
      title: "Dartmouth Dining UXR Study",
      subtitle: "User research & service design · Course project",
      section: "design-research",
      order: 0,
      coverImage: "dartmouth-dining-uxr.svg",
      tags: ["User Research", "Service Design", "Python", "NLP"],
      role: "Lead researcher",
      timeline: "10 weeks",
      team: "Solo with faculty advisor",
      tools: "Surveys, diary study, Python (BERT, TF-IDF)",
      outcome:
        "Dining app + nutrition open office hours recommendations—both implemented",
      gallery: [
        {
          discriminant: "image",
          value: {
            image: "dartmouth-dining-uxr.svg",
            caption: "Research synthesis overview (placeholder visual)",
            alt: "Placeholder cover for Dartmouth Dining UXR study",
          },
        },
      ],
      links: [],
      featured: true,
    },
    fullStory: story([
      "## Problem",
      "Students experienced Dartmouth dining as fragmented—nutrition information, hours, and dietary needs were hard to act on in the moment.",
      "## Process",
      "I ran a mixed-methods study: competitive analysis, a 21-response population survey, and a five-day diary study with 14 participants over ten weeks. I synthesized with statistical testing, BERT sentiment analysis, and TF-IDF topic extraction.",
      "## Outcome",
      "Findings supported a dining app feature set and nutrition-focused open office hours—both were implemented by Dartmouth Dining.",
      "## What I learned",
      "Quant + qual together beat either alone when stakeholders need confidence *and* empathy.",
    ]),
  },
  {
    slug: "dartmouth-design-corps",
    yaml: {
      title: "Dartmouth Design Corps",
      subtitle: "Client UX engagements · Aug 2023–Mar 2025",
      section: "design-research",
      order: 1,
      coverImage: "dartmouth-design-corps.svg",
      tags: ["UX Design", "Client Work", "Research Synthesis"],
      role: "UX Designer",
      timeline: "Aug 2023 – Mar 2025",
      team: "4-person interdisciplinary teams",
      tools: "Figma, interviews, prototyping",
      outcome: "End-to-end deliverables for Dartmouth client orgs",
      gallery: [
        {
          discriminant: "image",
          value: {
            image: "dartmouth-design-corps.svg",
            caption: "Design Corps deliverable snapshot (placeholder)",
            alt: "Placeholder visual for Design Corps project",
          },
        },
      ],
      links: [],
      featured: true,
    },
    fullStory: story([
      "## Problem",
      "Campus and community partners needed design capacity—from framing ambiguous problems to shippable recommendations.",
      "## Process",
      "On four-person teams I led research and synthesis, translated insights into design directions, and iterated prototypes through client check-ins.",
      "## Outcome",
      "Multiple engagements moved from problem framing through final handoff with research-backed artifacts.",
      "## What I learned",
      "Client work is stakeholder management as much as craft—clarity early saves rework late.",
    ]),
  },
  {
    slug: "asl-fingerspelling-hand",
    yaml: {
      title: "Voice-controlled ASL Fingerspelling Hand",
      subtitle: "Accessibility · Physical computing",
      section: "making-prototyping",
      order: 0,
      coverImage: "asl-fingerspelling-hand.svg",
      tags: ["Accessibility", "Physical Prototyping", "Raspberry Pi", "Python"],
      role: "Designer & builder",
      timeline: "Multi-term project",
      team: "Solo",
      tools: "Raspberry Pi 4, servos, offline speech recognition",
      outcome: "Real-time fingerspelling from spoken input",
      gallery: [
        {
          discriminant: "image",
          value: {
            image: "asl-fingerspelling-hand.svg",
            caption: "Robotic hand prototype (placeholder)",
            alt: "Placeholder image for ASL fingerspelling hand project",
          },
        },
      ],
      links: [],
      featured: true,
    },
    designAndBuild:
      "I designed the interaction model, wrote the control software in Python on a Raspberry Pi 4, and documented a LEGO-style pictorial build manual so non-engineers could reproduce the hardware without reading code.",
    fullStory: story([
      "## Problem",
      "Fingerspelling practice tools rarely meet learners where they are—spoken language in, tactile ASL out.",
      "## Process",
      "I integrated offline speech recognition with a servo array to spell letters in real time, iterating on hand ergonomics and latency.",
      "## Outcome",
      "A working prototype plus a pictorial manual for reproduction by non-specialists.",
      "## What I learned",
      "Accessibility hardware needs documentation as a first-class deliverable—not an afterthought.",
    ]),
  },
  {
    slug: "build-a-box",
    yaml: {
      title: "Build-A-Box",
      subtitle: "Product & venture design · Next.js site",
      section: "making-prototyping",
      order: 1,
      coverImage: "build-a-box.svg",
      tags: ["Product Design", "Venture Design", "Next.js"],
      role: "Founder & designer-developer",
      timeline: "Venture studio project",
      team: "Small founding team",
      tools: "Figma, Cursor, Next.js, Vercel",
      outcome: "Concept, pitch framework, and live marketing site",
      gallery: [
        {
          discriminant: "image",
          value: {
            image: "build-a-box.svg",
            caption: "Product narrative boards (placeholder)",
            alt: "Placeholder visual for Build-A-Box",
          },
        },
      ],
      links: [],
      featured: true,
    },
    designAndBuild:
      "I designed the brand and product story in Figma, then built and deployed the marketing site end-to-end with **Cursor**, **Next.js**, and **Vercel**—no hand-off between design and implementation.",
    fullStory: story([
      "## Problem",
      "Moving generates waste—boxes are single-use while new furniture is expensive.",
      "## Process",
      "Developed the product concept, business model, and investor-facing pitch framework; validated narrative with peers and mentors.",
      "## Outcome",
      "Cohesive venture story plus a deployed site demonstrating the customer journey.",
      "## What I learned",
      "Shipping your own site forces discipline about scope—you keep only what helps someone decide.",
    ]),
  },
  {
    slug: "bank-of-america-automation",
    yaml: {
      title: "Bank of America automation & risk",
      subtitle: "Automation · IT risk · Analyst",
      section: "technical-automation",
      order: 0,
      coverImage: "bank-of-america-automation.svg",
      tags: ["Automation", "Python", "SQL", "Alteryx"],
      role: "Automation & IT Risk Analyst",
      timeline: "Summer 2025 – present",
      team: "Audit & risk partners",
      tools: "Alteryx, Python, SQL (Teradata)",
      outcome:
        "40+ hr/quarter task → 90 seconds for 90% of cases; SVP-facing consent audits",
      gallery: [
        {
          discriminant: "image",
          value: {
            image: "bank-of-america-automation.svg",
            caption: "Pipeline overview (placeholder)",
            alt: "Placeholder visual for Bank of America automation work",
          },
        },
      ],
      links: [],
      featured: true,
    },
    fullStory: story([
      "## Problem",
      "Auditors spent dozens of hours per quarter on repeatable data pulls and consent checks.",
      "## Process",
      "Built Alteryx and Python pipelines; partnered with an SVP on SQL-driven consumer consent compliance for CD and IRA workstreams.",
      "## Outcome",
      "Cut a recurring task from 40+ hours per auditor per quarter to about 90 seconds for most cases; selected by peer vote to present AI simulations to 1,000+ live and global virtual attendees.",
      "## What I learned",
      "Automation success is measured in auditor hours returned—and trust in the data path.",
    ]),
  },
  {
    slug: "high-honors-thesis-gabm",
    yaml: {
      title: "High Honors Thesis (GABM)",
      subtitle: "Generative agent-based modeling · Research",
      section: "technical-automation",
      order: 1,
      coverImage: "high-honors-thesis-gabm.svg",
      tags: ["AI Simulation", "Research", "Systems Thinking"],
      role: "Thesis author",
      timeline: "Senior year",
      team: "Faculty advisors",
      tools: "Simulation design, Python",
      outcome: "GABM framework for prioritizing research directions",
      gallery: [
        {
          discriminant: "image",
          value: {
            image: "high-honors-thesis-gabm.svg",
            caption: "Framework diagram (placeholder)",
            alt: "Placeholder visual for GABM thesis",
          },
        },
      ],
      links: [],
      featured: true,
    },
    fullStory: story([
      "## Problem",
      "Social scientists invest heavily before knowing if a research direction will pay off.",
      "## Process",
      "Proposed a generative agent-based modeling (GABM) framework to explore promising directions before committing time and funding.",
      "## Outcome",
      "High Honors thesis articulating the framework and evaluation plan.",
      "## What I learned",
      "Systems thinking is a design skill—models are interfaces to uncertainty.",
    ]),
  },
  {
    slug: "ml-lab-neural-scenes",
    yaml: {
      title: "ML Lab — neural scene reconstruction",
      subtitle: "Graphics research · Wetterhahn Symposium",
      section: "technical-automation",
      order: 2,
      coverImage: "ml-lab-neural-scenes.svg",
      tags: ["Machine Learning", "Graphics", "Research"],
      role: "Research implementer",
      timeline: "Lab project",
      team: "ML lab collaborators",
      tools: "Taichi, NVIDIA Instant-NGP",
      outcome: "3× training time reduction; symposium presentation",
      gallery: [
        {
          discriminant: "image",
          value: {
            image: "ml-lab-neural-scenes.svg",
            caption: "Neural scene reconstruction still (placeholder)",
            alt: "Placeholder visual for ML lab research",
          },
        },
      ],
      links: [],
      featured: true,
    },
    fullStory: story([
      "## Problem",
      "Neural scene reconstruction training was too slow for rapid iteration.",
      "## Process",
      "Implemented signed distance functions with Taichi and Instant-NGP, profiling bottlenecks.",
      "## Outcome",
      "Achieved roughly 3× reduction in training time; presented at the Wetterhahn Research Symposium.",
      "## What I learned",
      "Performance work is user research for researchers—latency shapes what questions they ask.",
    ]),
  },
  {
    slug: "design-thinking-ta",
    yaml: {
      title: "Design Thinking Teaching Assistant",
      subtitle: "Thayer School of Engineering · Apr 2024–Jun 2026",
      section: "teaching",
      order: 0,
      coverImage: "design-thinking-ta.svg",
      tags: ["Teaching", "Design Thinking", "Facilitation"],
      role: "Teaching Assistant",
      timeline: "Apr 2024 – Jun 2026",
      team: "Course staff",
      tools: "Facilitation, foam-core, generative AI workshops",
      outcome: "$1,500 DCAL grant; gen-AI final adopted by course",
      gallery: [
        {
          discriminant: "image",
          value: {
            image: "design-thinking-ta.svg",
            caption: "Studio facilitation (placeholder)",
            alt: "Placeholder visual for Design Thinking TA role",
          },
        },
      ],
      links: [],
      featured: true,
    },
    fullStory: story([
      "## Problem",
      "Teams needed structured support through six end-to-end HCD projects without losing rigor.",
      "## Process",
      "Mentored teams weekly; secured a $1,500 DCAL grant to design a generative AI design challenge adopted as the course final.",
      "## Outcome",
      "Students shipped six projects with stronger synthesis; course adopted the gen-AI final.",
      "## What I learned",
      "Teaching is UX for learning—feedback loops must be kind *and* specific.",
    ]),
  },
];

mkdirSync(join(root, "content/projects"), { recursive: true });
for (const dirent of readdirSync(join(root, "content/projects"))) {
  const full = join(root, "content/projects", dirent);
  if (statSync(full).isDirectory()) {
    rmSync(full, { recursive: true, force: true });
  }
  if (dirent.endsWith(".json")) {
    rmSync(full, { force: true });
  }
}

for (const p of projects) {
  const fm = { ...p.yaml };
  if (p.designAndBuild) {
    fm.designAndBuild = p.designAndBuild;
  }
  const frontmatter = yamlStringify(fm).trim();
  const body = p.fullStory;
  writeFileSync(
    join(root, "content/projects", `${p.slug}.mdoc`),
    `---\n${frontmatter}\n---\n\n${body}\n`
  );
}

writeFileSync(
  join(root, "content/siteSettings.json"),
  JSON.stringify({
    thesis: "I design with a keen eye, and I build what I design.",
    intro:
      "I'm Ashley Goh—a product and UX designer with a computer science background from Dartmouth (CS major, Human-Centered Design minor, Tuck Bridge Program). I work at the intersection of design research, making, and code.",
    currently:
      "Automation & IT Risk Analyst at Bank of America · looking for product design roles",
    email: "ashleyqgoh@gmail.com",
    linkedInUrl: "https://linkedin.com/in/ashleyqgoh",
    sections: [
      {
        sectionId: "design-research",
        heading: "Design Research",
        description:
          "Mixed-methods studies and synthesis that turn messy human data into decisions teams can act on.",
        order: 0,
      },
      {
        sectionId: "making-prototyping",
        heading: "Making & Prototyping",
        description:
          "Physical and digital prototypes—especially when accessibility and craft matter.",
        order: 1,
      },
      {
        sectionId: "technical-automation",
        heading: "Technical & Automation",
        description:
          "Pipelines, simulations, and automation that multiply impact beyond a single screen.",
        order: 2,
      },
      {
        sectionId: "teaching",
        heading: "Teaching",
        description:
          "Mentoring teams through human-centered design from framing through delivery.",
        order: 3,
      },
    ],
  },
  null,
  2
  )
);

mkdirSync(join(root, "content/about"), { recursive: true });
writeFileSync(
  join(root, "content/about/bio.mdoc"),
  `I'm a product and UX designer who loves the moment research clicks into a prototype—and the moment a prototype ships.

At Dartmouth I studied computer science and human-centered design, then kept building: client engagements, accessibility hardware, venture concepts, and automation at scale. I'm looking for product design roles where evidence, craft, and implementation travel together.`
);

writeFileSync(
  join(root, "content/about.json"),
  JSON.stringify(
    {
      beyondWork: [
        {
          title: "Painting",
          text: "Watercolor and ink studies—slow looking that feeds how I compose screens.",
        },
        {
          title: "Hiking",
          text: "White Mountains regular; long walks are where I untangle research threads.",
        },
        {
          title: "Making",
          text: "Electronics, sewing, and foam-core models when an idea needs to exist in the world.",
        },
      ],
      education:
        "Dartmouth College — B.A. Computer Science, Minor in Human-Centered Design\nTuck Bridge Program",
      skillsUx:
        "Figma, Adobe Creative Suite, user research & synthesis, rapid physical prototyping, generative AI for research / ideation / storytelling",
      skillsTechnical:
        "Python, SQL, JavaScript, React, Node.js, Java, C, R, MongoDB, AWS, Git, Alteryx, Excel",
      awards:
        "Certified Scrum Master (CSM)\nAlteryx Designer Core\nHackDartmouth IX 2024 — Best Use of AI in Education\nMathWorks Math Modeling Challenge 2021 — Honorable Mention",
    },
    null,
    2
  )
);

console.log("Seeded Keystatic content");
