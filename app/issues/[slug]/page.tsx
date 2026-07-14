import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageViewer } from "@/components/gallery/PageViewer";
import { ThumbnailGallery } from "@/components/gallery/ThumbnailGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  getAdjacentIssues,
  getIssue,
  issues,
  type IssueSlug,
} from "@/lib/issues";
import { resolveCoverSrc, resolveIssuePages } from "@/lib/images";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return issues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) return {};

  const title = `Concrete Curve ${issue.label} | Read the ${issue.pageCount}-Page Magazine`;
  const description = `Explore Concrete Curve ${issue.label}, featuring ${issue.title}. Browse all ${issue.pageCount} pages in the complete online gallery.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/issues/${issue.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${site.url}/issues/${issue.slug}`,
    },
  };
}

export default async function IssuePage({ params }: PageProps) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();

  const pages = resolveIssuePages(issue.slug, issue.pageCount);
  const { next } = getAdjacentIssues(issue.slug as IssueSlug);
  const coverSrc = resolveCoverSrc(issue.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PublicationIssue",
    name: `Concrete Curve ${issue.label}: ${issue.title}`,
    issueNumber: String(issue.number),
    datePublished: issue.season,
    description: issue.intro,
    isPartOf: {
      "@type": "Periodical",
      name: site.name,
    },
    numberOfPages: issue.pageCount,
    url: `${site.url}/issues/${issue.slug}`,
    ...(coverSrc
      ? { image: `${site.url}${coverSrc}` }
      : {}),
  };

  return (
    <main id="main" className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#issues" className="hover:text-accent">
                Issues
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink" aria-current="page">
              {issue.label}
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {issue.label}
            {issue.isLatest ? " · Latest issue" : ""}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Concrete Curve {issue.label}: {issue.title}
          </h1>
          <p className="mt-3 text-sm text-ink-muted">
            {issue.season} · {issue.pageCount} pages
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
            {issue.intro}
          </p>
          <div className="mt-8">
            <Button href={`/issues/${issue.slug}?page=1`}>
              Start with page 1
            </Button>
          </div>
        </header>

        <section className="mt-14" aria-labelledby="gallery-heading">
          <h2
            id="gallery-heading"
            className="font-display text-2xl font-semibold text-ink sm:text-3xl"
          >
            Browse all {issue.pageCount} pages
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Select a page to open the larger view.
          </p>
          <div className="mt-8">
            <Suspense fallback={<p className="text-ink-muted">Loading gallery…</p>}>
              <ThumbnailGallery issue={issue} pages={pages} />
            </Suspense>
          </div>
        </section>

        <nav
          className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Issue navigation"
        >
          <Link
            href="/#issues"
            className="text-ink underline-offset-4 hover:text-accent hover:underline"
          >
            Back to all issues
          </Link>
          {next ? (
            <Link
              href={`/issues/${next.slug}`}
              className="text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              Next issue: Concrete Curve {next.label}
            </Link>
          ) : null}
        </nav>
      </Container>

      <Suspense fallback={null}>
        <PageViewer issue={issue} pages={pages} />
      </Suspense>
    </main>
  );
}
