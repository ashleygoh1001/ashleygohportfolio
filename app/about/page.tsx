import Image from "next/image";
import { MarkdocContent } from "@/components/MarkdocContent";
import { getAboutContent } from "@/lib/site";
import { resolveAboutImage } from "@/lib/images";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ashley Goh — product and UX designer with a CS background from Dartmouth.",
};

export default async function AboutPage() {
  const about = await getAboutContent();
  const photo = resolveAboutImage(about.photo);
  const lineArtPortrait = resolveAboutImage(about.lineArtPortrait);

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          {photo && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border-warm bg-surface">
              <Image
                src={photo}
                alt="Ashley Goh"
                fill
                className="object-cover"
                sizes="280px"
                priority
              />
            </div>
          )}
          {lineArtPortrait && (
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border-warm bg-surface">
              <Image
                src={lineArtPortrait}
                alt="Line art portrait of Ashley Goh"
                fill
                className="object-contain p-4"
                sizes="280px"
              />
            </div>
          )}
          {!photo && !lineArtPortrait && (
            <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-dashed border-border-warm bg-surface p-6 text-center text-sm text-text-secondary">
              Add a photo or line-art portrait in Keystatic
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-text-primary">About</h1>
          {about.bio ? (
            <div className="prose-width mt-6">
              <MarkdocContent content={about.bio} />
            </div>
          ) : (
            <p className="prose-width mt-6 text-text-secondary">
              Bio content coming soon—edit in Keystatic.
            </p>
          )}

          <section className="mt-14" aria-labelledby="beyond-work">
            <h2
              id="beyond-work"
              className="text-2xl font-extrabold text-text-primary"
            >
              Beyond work
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(about.beyondWork ?? []).map((item) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-border-warm bg-surface"
                >
                  {item.image && (
                    <div className="relative aspect-[3/2] w-full">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 100vw, 320px"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-text-secondary">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="background">
            <h2
              id="background"
              className="text-2xl font-extrabold text-text-primary"
            >
              Background
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border-warm bg-surface p-5">
                <h3 className="font-extrabold text-text-primary">Education</h3>
                <p className="mt-2 whitespace-pre-line text-text-secondary">
                  {about.education}
                </p>
              </div>
              <div className="rounded-2xl border border-border-warm bg-surface p-5">
                <h3 className="font-extrabold text-text-primary">UX / Design</h3>
                <p className="mt-2 whitespace-pre-line text-text-secondary">
                  {about.skillsUx}
                </p>
              </div>
              <div className="rounded-2xl border border-border-warm bg-surface p-5 md:col-span-2">
                <h3 className="font-extrabold text-text-primary">Technical</h3>
                <p className="mt-2 whitespace-pre-line text-text-secondary">
                  {about.skillsTechnical}
                </p>
              </div>
              <div className="rounded-2xl border border-border-warm bg-surface p-5 md:col-span-2">
                <h3 className="font-extrabold text-text-primary">
                  Certifications & awards
                </h3>
                <p className="mt-2 whitespace-pre-line text-text-secondary">
                  {about.awards}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
