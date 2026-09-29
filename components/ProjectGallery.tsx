import Image from "next/image";
import { resolveProjectImage } from "@/lib/images";
import { VideoEmbedFacade } from "@/components/VideoEmbedFacade";

type GalleryBlock =
  | {
      discriminant: "image";
      value: { image: string | null; caption: string; alt: string };
    }
  | {
      discriminant: "videoEmbed";
      value: { url: string; caption: string; title: string };
    }
  | {
      discriminant: "videoFile";
      value: { file: string | null; caption: string };
    };

export function ProjectGallery({ items }: { items: readonly GalleryBlock[] }) {
  if (!items?.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, index) => {
        if (item.discriminant === "image" && item.value.image) {
          const src = resolveProjectImage(item.value.image);
          if (!src) return null;
          return (
            <figure
              key={index}
              className="overflow-hidden rounded-2xl border border-border-warm bg-surface md:col-span-2"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={src}
                  alt={item.value.alt || item.value.caption || "Project image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
              {item.value.caption && (
                <figcaption className="px-4 py-3 text-sm text-text-secondary">
                  {item.value.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        if (item.discriminant === "videoEmbed") {
          return (
            <div key={index} className="md:col-span-2">
              <VideoEmbedFacade
                url={item.value.url}
                title={item.value.title || "Project video"}
                caption={item.value.caption}
              />
            </div>
          );
        }
        if (item.discriminant === "videoFile" && item.value.file) {
          return (
            <figure
              key={index}
              className="overflow-hidden rounded-2xl border border-border-warm bg-surface md:col-span-2"
            >
              <video
                controls
                preload="none"
                className="w-full"
                src={item.value.file}
              >
                <track kind="captions" />
              </video>
              {item.value.caption && (
                <figcaption className="px-4 py-3 text-sm text-text-secondary">
                  {item.value.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}
