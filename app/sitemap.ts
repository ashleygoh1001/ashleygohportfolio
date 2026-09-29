import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashleygohportfolio.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    ...projectUrls,
  ];
}
