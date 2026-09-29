import {
  collection,
  config,
  fields,
  singleton,
} from "@keystatic/core";

const sectionOptions = [
  { label: "Design Research", value: "design-research" },
  { label: "Making & Prototyping", value: "making-prototyping" },
  { label: "Technical & Automation", value: "technical-automation" },
  { label: "Teaching", value: "teaching" },
] as const;

const storage =
  process.env.NODE_ENV === "production" &&
  process.env.KEYSTATIC_GITHUB_REPO
    ? {
        kind: "github" as const,
        repo: process.env.KEYSTATIC_GITHUB_REPO as `${string}/${string}`,
      }
    : { kind: "local" as const };

export default config({
  storage,
  ui: {
    brand: { name: "Ashley Goh Portfolio" },
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "fullStory" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({ label: "Subtitle" }),
        section: fields.select({
          label: "Section",
          options: [...sectionOptions],
          defaultValue: "design-research",
        }),
        order: fields.integer({
          label: "Order within section",
          defaultValue: 0,
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Skill tags",
        }),
        role: fields.text({ label: "Role (at a glance)" }),
        timeline: fields.text({ label: "Timeline" }),
        team: fields.text({ label: "Team" }),
        tools: fields.text({ label: "Tools / skills" }),
        outcome: fields.text({ label: "Outcome (short)" }),
        gallery: fields.blocks(
          {
            image: {
              label: "Image",
              schema: fields.object({
                image: fields.image({
                  label: "Image",
                  directory: "public/images/projects",
                  publicPath: "/images/projects/",
                }),
                caption: fields.text({ label: "Caption" }),
                alt: fields.text({ label: "Alt text" }),
              }),
            },
            videoEmbed: {
              label: "Video embed (YouTube/Vimeo)",
              schema: fields.object({
                url: fields.url({ label: "Video URL" }),
                caption: fields.text({ label: "Caption" }),
                title: fields.text({
                  label: "Accessible title",
                  defaultValue: "Project video",
                }),
              }),
            },
            videoFile: {
              label: "Uploaded MP4",
              schema: fields.object({
                file: fields.file({
                  label: "Video file",
                  directory: "public/videos",
                  publicPath: "/videos/",
                }),
                caption: fields.text({ label: "Caption" }),
              }),
            },
          },
          { label: "Visual summary gallery" }
        ),
        designAndBuild: fields.text({
          label: "Design + build callout (optional)",
          multiline: true,
        }),
        fullStory: fields.markdoc({
          label: "The full story",
          options: {
            image: {
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            },
          },
        }),
        links: fields.array(
          fields.object(
            {
              label: fields.text({ label: "Label" }),
              url: fields.url({ label: "URL" }),
            },
            { label: "Link" }
          ),
          { label: "External links" }
        ),
        featured: fields.checkbox({
          label: "Featured on home",
          defaultValue: true,
        }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: "Site settings",
      path: "content/siteSettings",
      format: { data: "json" },
      schema: {
        thesis: fields.text({ label: "Thesis line" }),
        intro: fields.text({ label: "Intro paragraph", multiline: true }),
        currently: fields.text({ label: "Currently line" }),
        email: fields.text({ label: "Email" }),
        linkedInUrl: fields.url({ label: "LinkedIn URL" }),
        resume: fields.file({
          label: "Resume PDF",
          directory: "public/files",
          publicPath: "/files/",
        }),
        sections: fields.array(
          fields.object(
            {
              sectionId: fields.select({
                label: "Section",
                options: [...sectionOptions],
                defaultValue: "design-research",
              }),
              heading: fields.text({ label: "Heading" }),
              description: fields.text({
                label: "One-sentence description",
                multiline: true,
              }),
              order: fields.integer({
                label: "Display order",
                defaultValue: 0,
              }),
            },
            { label: "Section" }
          ),
          { label: "Project sections" }
        ),
      },
    }),
    about: singleton({
      label: "About page",
      path: "content/about",
      format: { data: "json" },
      schema: {
        photo: fields.image({
          label: "Photo",
          directory: "public/images/about",
          publicPath: "/images/about/",
        }),
        lineArtPortrait: fields.image({
          label: "Line art portrait (optional)",
          directory: "public/images/about",
          publicPath: "/images/about/",
        }),
        bio: fields.markdoc({
          label: "Bio",
          options: {
            image: {
              directory: "public/images/about",
              publicPath: "/images/about/",
            },
          },
        }),
        beyondWork: fields.array(
          fields.object(
            {
              title: fields.text({ label: "Title" }),
              text: fields.text({ label: "Text", multiline: true }),
              image: fields.image({
                label: "Image (optional)",
                directory: "public/images/about",
                publicPath: "/images/about/",
              }),
            },
            { label: "Interest" }
          ),
          { label: "Beyond work" }
        ),
        education: fields.text({ label: "Education", multiline: true }),
        skillsUx: fields.text({ label: "UX / Design skills", multiline: true }),
        skillsTechnical: fields.text({
          label: "Technical skills",
          multiline: true,
        }),
        awards: fields.text({
          label: "Certifications & awards",
          multiline: true,
        }),
      },
    }),
  },
});

export type SectionId = (typeof sectionOptions)[number]["value"];
