import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Concrete Curve, an independent magazine of architecture, material culture, and place — and the open archive of its issues.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main id="main" className="pb-20">
      <Container className="max-w-3xl pt-12 sm:pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          About the magazine
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          A magazine built around material and place
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
          <p>
            Concrete Curve is an independent, image-led magazine about
            architecture, material culture, and the outdoor rooms that give
            cities their character. It is made for readers who want to linger —
            photographers, designers, builders, and anyone curious about how
            heavy materials become welcoming places.
          </p>
          <p>
            Each issue brings together essays, visits, and visual sequences
            shaped slowly: coastal housing and soft edges in Issue 01, alleys
            and pocket parks in Issue 02, mass and warmth in Issue 03. The
            editorial point of view privileges specificity over slogans —
            names, sites, crafts, and the people who keep them.
          </p>
          <p>
            This website is the open archive. All three issues stay reachable,
            page by page, without a paywall or a carousel. Whether you are
            discovering Concrete Curve for the first time or returning to a
            spread you remember, the gallery is meant to stay out of the
            magazine&apos;s way.
          </p>
          <p>
            Concrete Curve is limited-run and independently published. New
            issues arrive when the stories are ready — not on a fixed calendar.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/#issues">Explore the issues</Button>
          <Button href={`mailto:${site.contactEmail}`} variant="secondary">
            Contact the editors
          </Button>
        </div>
      </Container>
    </main>
  );
}
