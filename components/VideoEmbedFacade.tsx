"use client";

import { useState } from "react";

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const id =
        u.searchParams.get("v") ??
        (u.hostname.includes("youtu.be") ? u.pathname.slice(1) : null);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

type Props = {
  url: string;
  title: string;
  caption?: string;
};

export function VideoEmbedFacade({ url, title, caption }: Props) {
  const [active, setActive] = useState(false);
  const embed = getEmbedUrl(url);

  if (!embed) {
    return (
      <p className="text-text-secondary">
        <a href={url} className="underline">
          Watch video
        </a>
      </p>
    );
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-border-warm bg-surface">
      {!active ? (
        <button
          type="button"
          className="flex w-full flex-col items-start gap-2 p-6 text-left transition-colors hover:bg-cream"
          onClick={() => setActive(true)}
        >
          <span className="rounded-full bg-accent-periwinkle px-3 py-1 text-sm font-bold text-text-primary">
            Load video
          </span>
          <span className="font-extrabold text-text-primary">{title}</span>
          {caption && (
            <figcaption className="text-sm text-text-secondary">
              {caption}
            </figcaption>
          )}
        </button>
      ) : (
        <div className="aspect-video w-full">
          <iframe
            src={embed}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      {active && caption && (
        <figcaption className="border-t border-border-warm px-4 py-3 text-sm text-text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
