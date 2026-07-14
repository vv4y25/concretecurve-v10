import Link from "next/link";
import { CoverImage } from "@/components/gallery/MagazineImage";
import { ThreeCoverComposition } from "@/components/gallery/Placeholders";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { issues, totalPages } from "@/lib/issues";
import { resolveCoverSrc } from "@/lib/images";
import { homeSeo, site } from "@/lib/site";

export default function HomePage() {
  const covers = issues.map((issue) => ({
    issue,
    src: resolveCoverSrc(issue.slug),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    description: homeSeo.description,
    url: site.url,
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero-wash relative overflow-hidden border-b border-border">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div className="animate-fade-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Independent magazine. Open archive.
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
              Three issues. {totalPages} pages worth exploring.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Concrete Curve is made to be seen slowly. Browse every issue, open
              any page, and follow whatever catches your eye.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#issues">Explore the issues</Button>
              <Button href="/about" variant="secondary">
                About Concrete Curve
              </Button>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Issue 01: 52 pages · Issue 02: 37 pages · Issue 03: 74 pages
            </p>
          </div>

          <div className="animate-fade-in animate-delay-1">
            <ThreeCoverComposition issues={issues} />
            <p className="sr-only">
              The covers of Concrete Curve Issues 01, 02, and 03 arranged side by
              side.
            </p>
          </div>
        </Container>
      </section>

      <section id="issues" className="scroll-mt-24 py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Choose an issue and step inside"
            description="Each issue has its own rhythm. Start at the beginning, jump to a page, or wander through the full gallery."
            className="animate-fade-up"
          />

          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {covers.map(({ issue, src }, index) => (
              <li
                key={issue.slug}
                className={`animate-fade-up border border-border bg-bg-elevated ${
                  index === 0
                    ? ""
                    : index === 1
                      ? "animate-delay-1"
                      : "animate-delay-2"
                }`}
              >
                <article className="flex h-full flex-col">
                  <Link
                    href={`/issues/${issue.slug}`}
                    className="block overflow-hidden border-b border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <CoverImage issue={issue} src={src} priority={index === 0} />
                  </Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                        {issue.label}
                      </p>
                      {issue.isLatest ? (
                        <span className="rounded-sm bg-accent-soft/40 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-accent">
                          Latest issue
                        </span>
                      ) : null}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-ink">
                      <Link
                        href={`/issues/${issue.slug}`}
                        className="transition-colors hover:text-accent"
                      >
                        {issue.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      {issue.season} · {issue.pageCount} pages
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                      {issue.summary}
                    </p>
                    <div className="mt-6">
                      <Button href={`/issues/${issue.slug}`} variant="secondary">
                        Open {issue.label}
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-border bg-bg-muted py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Take it page by page"
            description="Choose an issue, select any thumbnail, and the page will open in a larger viewer. Move forward or back with the on-screen controls or your arrow keys. Close the viewer whenever you want to return to the full gallery."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              "Pick an issue",
              "Open any page",
              "Keep browsing at your own pace",
            ].map((step, index) => (
              <li key={step} className="border-l-2 border-accent-soft pl-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  Step {index + 1}
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-ink">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <SectionHeading
            title="A magazine built around material and place"
            description="Concrete Curve is an independent, image-led magazine about architecture, material culture, and the outdoor rooms that give cities their character. We bring together photographers, writers, builders, and designers through thoughtful stories and pages meant to be seen slowly. This online archive keeps every issue within reach, whether you are finding Concrete Curve for the first time or returning to a page you remember."
          />
          <div>
            <Button href="/about" variant="secondary">
              Read our story
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-bg-muted py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            More from Concrete Curve
          </h2>
          <ul className="mt-6 space-y-3">
            {issues.map((issue) => (
              <li key={issue.slug}>
                <Link
                  href={`/issues/${issue.slug}`}
                  className="text-base text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Browse {issue.label} — {issue.pageCount} pages
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/about"
                className="text-base text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                About the magazine
              </Link>
            </li>
          </ul>
        </Container>
      </section>
    </main>
  );
}
