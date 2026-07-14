"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageImage } from "@/components/gallery/MagazineImage";
import type { Issue } from "@/lib/issues";
import type { ResolvedPage } from "@/lib/images";

type ThumbnailGalleryProps = {
  issue: Issue;
  pages: ResolvedPage[];
};

export function ThumbnailGallery({ issue, pages }: ThumbnailGalleryProps) {
  const searchParams = useSearchParams();
  const activePage = Number.parseInt(searchParams.get("page") ?? "", 10);

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {pages.map((page, index) => {
        const isActive = activePage === page.page;
        const href = `/issues/${issue.slug}?page=${page.page}`;
        const alt = `Open Concrete Curve ${issue.label}, page ${page.page} of ${issue.pageCount}`;

        return (
          <li key={page.page}>
            <Link
              id={`thumb-${issue.slug}-${page.page}`}
              href={href}
              scroll={false}
              className={`group block overflow-hidden rounded-sm border bg-bg-elevated transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive
                  ? "border-accent"
                  : "border-border hover:border-accent/60"
              }`}
              aria-label={alt}
              aria-current={isActive ? "true" : undefined}
            >
              <div className="aspect-[153/108] overflow-hidden">
                <PageImage
                  issueLabel={issue.label}
                  page={page.page}
                  pageCount={issue.pageCount}
                  src={page.src}
                  alt={`Concrete Curve ${issue.label}, page ${page.page}`}
                  priority={index < 6}
                  width={153}
                  height={108}
                />
              </div>
              <p className="border-t border-border px-2 py-1.5 text-center text-xs text-ink-muted group-hover:text-accent">
                Page {page.page}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
