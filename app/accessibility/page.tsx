import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility information for the Concrete Curve magazine gallery, including keyboard navigation, focus handling, and how to report barriers.",
  alternates: {
    canonical: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <main id="main" className="pb-20">
      <Container className="max-w-3xl pt-12 sm:pt-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Accessibility
        </h1>
        <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
          Concrete Curve is designed so readers can explore the magazine without
          unnecessary barriers. We aim to meet WCAG 2.2 Level AA practices where
          practical for an image-led archive.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Keyboard and viewer
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-ink-muted">
            <li>
              A skip link at the top of every page jumps focus to the main
              content.
            </li>
            <li>
              Issue galleries are reachable through standard links — not
              JavaScript-only actions.
            </li>
            <li>
              In the full-screen page viewer: Escape closes the dialog; Left and
              Right arrows move between pages; focus is trapped within the
              viewer while it is open.
            </li>
            <li>
              When the viewer closes, keyboard focus returns to the thumbnail
              that opened it.
            </li>
          </ul>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Images and text
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-ink-muted">
            <li>
              Covers and pages use real image elements with descriptive
              alternative text when artwork is available.
            </li>
            <li>
              Until final magazine scans are published, numbered placeholders
              keep page structure clear.
            </li>
            <li>
              Motion is subtle and respects{" "}
              <code className="rounded-sm bg-bg-muted px-1.5 py-0.5 text-sm text-ink">
                prefers-reduced-motion
              </code>
              .
            </li>
          </ul>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Report a barrier
          </h2>
          <p className="text-ink-muted">
            If you encounter an accessibility problem, please{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              email us
            </a>
            . Include the page URL and what you were trying to do. We take these
            reports seriously and will work on a fix.
          </p>
          <p className="text-ink-muted">
            You can also return to the{" "}
            <Link
              href="/"
              className="text-accent underline-offset-4 hover:underline"
            >
              homepage
            </Link>{" "}
            or browse the{" "}
            <Link
              href="/#issues"
              className="text-accent underline-offset-4 hover:underline"
            >
              issue collection
            </Link>
            .
          </p>
        </section>
      </Container>
    </main>
  );
}
