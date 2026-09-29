import { reader } from "@/lib/keystatic";
import {
  sectionMeta,
  sectionOrderDefault,
} from "@/lib/theme";
import type { SectionId } from "@/keystatic.config";

export async function getSiteSettings() {
  const settings = await reader.singletons.siteSettings.read();
  const defaults = getDefaultSiteSettings();
  if (!settings) {
    return defaults;
  }
  return {
    thesis: settings.thesis || defaults.thesis,
    intro: settings.intro || defaults.intro,
    currently: settings.currently || defaults.currently,
    email: settings.email || defaults.email,
    linkedInUrl: settings.linkedInUrl || defaults.linkedInUrl,
    resume: settings.resume ?? defaults.resume,
    sections: settings.sections?.length ? settings.sections : defaults.sections,
  };
}

export async function getAboutContent() {
  const about = await reader.singletons.about.read();
  return about ?? getDefaultAbout();
}

export type SiteSectionConfig = {
  sectionId: SectionId;
  heading: string;
  description: string;
  order: number;
};

export async function getOrderedSections(): Promise<SiteSectionConfig[]> {
  const settings = await getSiteSettings();
  const sections = settings.sections?.length
    ? settings.sections
    : getDefaultSections();

  return [...sections]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((s) => ({
      sectionId: s.sectionId as SectionId,
      heading: s.heading || sectionMeta[s.sectionId as SectionId]?.label || "",
      description: s.description || "",
      order: s.order ?? 0,
    }));
}

function getDefaultSections() {
  return [
    {
      sectionId: "design-research" as const,
      heading: "Design Research",
      description:
        "Mixed-methods studies and synthesis that turn messy human data into decisions teams can act on.",
      order: 0,
    },
    {
      sectionId: "making-prototyping" as const,
      heading: "Making & Prototyping",
      description:
        "Physical and digital prototypes that make ideas tangible—especially for accessibility and play.",
      order: 1,
    },
    {
      sectionId: "technical-automation" as const,
      heading: "Technical & Automation",
      description:
        "Pipelines, research systems, and automation work that scales impact beyond a single screen.",
      order: 2,
    },
    {
      sectionId: "teaching" as const,
      heading: "Teaching",
      description:
        "Mentoring teams through human-centered design from framing through final delivery.",
      order: 3,
    },
  ];
}

function getDefaultSiteSettings() {
  return {
    thesis: "I design with a keen eye, and I build what I design.",
    intro:
      "I’m Ashley Goh—a product and UX designer with a computer science background from Dartmouth. I work at the intersection of design research, making, and code, with a bias toward evidence over adjectives.",
    currently:
      "Automation & IT Risk Analyst at Bank of America · looking for product design roles",
    email: "ashleyqgoh@gmail.com",
    linkedInUrl: "https://linkedin.com/in/ashleyqgoh",
    resume: null as string | null,
    sections: getDefaultSections(),
  };
}

function getDefaultAbout() {
  return {
    photo: null as string | null,
    lineArtPortrait: null as string | null,
    bio: null,
    beyondWork: [] as {
      title: string;
      text: string;
      image: string | null;
    }[],
    education: "",
    skillsUx: "",
    skillsTechnical: "",
    awards: "",
  };
}

export { sectionOrderDefault };
