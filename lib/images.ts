import { existsSync } from "fs";
import path from "path";
import type { IssueSlug } from "./issues";
import { padPage } from "./issues";

/**
 * Stable public paths for magazine assets.
 * Drop real WebP files into these locations to replace SVG placeholders.
 *
 * Cover:  /images/issues/{slug}/cover.webp
 * Pages:  /images/issues/{slug}/pages/page-001.webp …
 */
export function coverPublicPath(slug: IssueSlug): string {
  return `/images/issues/${slug}/cover.webp`;
}

export function pagePublicPath(slug: IssueSlug, page: number): string {
  return `/images/issues/${slug}/pages/page-${padPage(page)}.webp`;
}

function publicFileExists(publicPath: string): boolean {
  const diskPath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  return existsSync(diskPath);
}

export function resolveCoverSrc(slug: IssueSlug): string | null {
  const src = coverPublicPath(slug);
  return publicFileExists(src) ? src : null;
}

export function resolvePageSrc(slug: IssueSlug, page: number): string | null {
  const src = pagePublicPath(slug, page);
  return publicFileExists(src) ? src : null;
}

export type ResolvedPage = {
  page: number;
  src: string | null;
};

export function resolveIssuePages(
  slug: IssueSlug,
  pageCount: number,
): ResolvedPage[] {
  return Array.from({ length: pageCount }, (_, i) => {
    const page = i + 1;
    return { page, src: resolvePageSrc(slug, page) };
  });
}
