import Link from "next/link";
import { issues } from "@/lib/issues";
import { site } from "@/lib/site";
import { Container } from "./Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-bg-muted">
      <Container className="grid gap-10 py-14 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-ink">
            Concrete Curve
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            {site.descriptor}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              Issues
            </p>
            <ul className="space-y-2">
              {issues.map((issue) => (
                <li key={issue.slug}>
                  <Link
                    href={`/issues/${issue.slug}`}
                    className="text-ink transition-colors hover:text-accent"
                  >
                    {issue.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              Magazine
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-ink hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-ink hover:text-accent"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-ink hover:text-accent">
                  Privacy
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="text-ink hover:text-accent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="border-t border-border py-5">
        <p className="text-xs text-ink-muted">
          © {year} Concrete Curve. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
