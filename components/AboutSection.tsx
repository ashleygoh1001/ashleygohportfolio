export function AboutSection() {
  return (
    <>
      <section id="about" className="border-t border-hairline px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="display mb-6 text-2xl text-paper md:text-3xl">
            About
          </h2>
          <div className="prose-width space-y-4 text-base text-muted">
            <p>
              I&apos;m a UX researcher and designer with a computer science
              background. I work at the intersection of qualitative insight and
              systems thinking—turning messy human data into artifacts teams can
              act on.
            </p>
            <p>
              My path includes clinic research, transit wayfinding, museum
              accessibility work, and enough hiking to know that not every
              strand needs to terminate in a capability node. Some experiences
              just make you better at paying attention.
            </p>
            <p>
              I&apos;m looking for strategic design and UXR roles at
              consultancies and product teams where evidence beats adjectives.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-hairline px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="display mb-6 text-2xl text-paper md:text-3xl">
            Contact
          </h2>
          <div className="prose-width space-y-3 text-base">
            <p>
              <a
                href="mailto:ashley.goh@example.com"
                className="font-medium text-paper underline decoration-hairline underline-offset-4 hover:decoration-paper"
              >
                ashley.goh@example.com
              </a>
            </p>
            <p>
              <a
                href="/resume.pdf"
                className="font-medium text-paper underline decoration-hairline underline-offset-4 hover:decoration-paper"
              >
                Download résumé
              </a>
            </p>
            <p className="text-muted">
              Based in Boston · open to remote and hybrid
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
