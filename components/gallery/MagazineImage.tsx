import Image from "next/image";
import type { Issue } from "@/lib/issues";
import { CoverPlaceholder, PagePlaceholder } from "./Placeholders";

type CoverImageProps = {
  issue: Issue;
  src: string | null;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function CoverImage({
  issue,
  src,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 90vw, 320px",
}: CoverImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={issue.coverAlt}
        width={400}
        height={560}
        className={`h-full w-full object-cover ${className}`}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <div className={`aspect-[400/560] overflow-hidden ${className}`}>
      <CoverPlaceholder issue={issue} />
      <span className="sr-only">{issue.coverAlt}</span>
    </div>
  );
}

type PageImageProps = {
  issueLabel: string;
  page: number;
  pageCount: number;
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
};

export function PageImage({
  issueLabel,
  page,
  pageCount,
  src,
  alt,
  className = "",
  priority = false,
  width = 153,
  height = 108,
  sizes = "(max-width: 768px) 45vw, 153px",
}: PageImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-full w-full object-cover ${className}`}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
      />
    );
  }

  return (
    <div className={`overflow-hidden bg-bg-muted ${className}`}>
      <PagePlaceholder
        issueLabel={issueLabel}
        page={page}
        pageCount={pageCount}
      />
      <span className="sr-only">{alt}</span>
    </div>
  );
}
