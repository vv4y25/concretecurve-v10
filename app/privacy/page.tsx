import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy information for the Concrete Curve website. This static archive does not run a newsletter signup or advertising trackers.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="pb-20">
      <Container className="max-w-3xl pt-12 sm:pt-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Privacy
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
          <p>
            Concrete Curve publishes a static magazine archive. We do not
            currently offer a newsletter signup, account system, or shopping
            cart on this site.
          </p>
          <p>
            Like most websites, hosting providers and analytics tools (if added
            later) may process technical data such as IP address, browser type,
            and pages visited. We will update this page when any analytics or
            form processing is introduced.
          </p>
          <p>
            If you email us at{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {site.contactEmail}
            </a>
            , we will use your message only to respond and will not sell your
            contact information.
          </p>
          <p className="text-sm">
            Last updated: July 13, 2026.
          </p>
        </div>
      </Container>
    </main>
  );
}
