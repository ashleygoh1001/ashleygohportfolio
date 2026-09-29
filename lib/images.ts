export function resolveProjectImage(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("/")) return path;
  return `/images/projects/${path}`;
}

export function resolveAboutImage(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("/")) return path;
  return `/images/about/${path}`;
}
