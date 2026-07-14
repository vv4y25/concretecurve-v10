"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { PageImage } from "@/components/gallery/MagazineImage";
import type { Issue } from "@/lib/issues";
import type { ResolvedPage } from "@/lib/images";

type PageViewerProps = {
  issue: Issue;
  pages: ResolvedPage[];
};

export function PageViewer({ issue, pages }: PageViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const pageParam = searchParams.get("page");
  const pageNumber = pageParam ? Number.parseInt(pageParam, 10) : NaN;
  const isOpen =
    Number.isFinite(pageNumber) &&
    pageNumber >= 1 &&
    pageNumber <= issue.pageCount;

  const current = isOpen ? pages[pageNumber - 1] : null;

  const closeViewer = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const query = params.toString();
    router.replace(query ? `?${query}` : `/issues/${issue.slug}`, {
      scroll: false,
    });
  }, [issue.slug, router, searchParams]);

  const goToPage = useCallback(
    (nextPage: number) => {
      if (nextPage < 1) {
        setStatus("You are at the first page.");
        return;
      }
      if (nextPage > issue.pageCount) {
        setStatus("That is the last page in this issue.");
        return;
      }
      setStatus(null);
      setImageError(false);
      setZoom(1);
      setFit(true);
      router.replace(`?page=${nextPage}`, { scroll: false });
    },
    [issue.pageCount, router],
  );

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      (document.activeElement as HTMLElement | null) ?? null;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPage(pageNumber - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToPage(pageNumber + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeViewer, goToPage, isOpen, pageNumber]);

  useEffect(() => {
    if (!isOpen) {
      setStatus(null);
      setImageError(false);
      setZoom(1);
      setFit(true);
    }
  }, [isOpen]);

  if (!isOpen || !current) return null;

  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-ink/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={onDialogKeyDown}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-ink px-4 py-3 text-bg-elevated sm:px-6">
        <div>
          <p id={titleId} className="font-display text-lg font-semibold">
            Concrete Curve {issue.label}
          </p>
          <p className="text-sm text-bg-elevated/75" aria-live="polite">
            Page {pageNumber} of {issue.pageCount}
            {status ? ` · ${status}` : ""}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={closeViewer}
          className="rounded-sm border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
        >
          Close viewer
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
        <div
          className="origin-center transition-transform duration-200"
          style={{
            transform: fit ? "none" : `scale(${zoom})`,
            width: fit ? "min(100%, 1224px)" : undefined,
          }}
        >
          {imageError ? (
            <div className="rounded-sm border border-white/15 bg-ink/60 px-6 py-16 text-center text-bg-elevated">
              <p>This page did not load. Try again, or move to the next page.</p>
            </div>
          ) : (
            <div
              className="overflow-hidden rounded-sm bg-bg-elevated shadow-2xl"
              onErrorCapture={() => setImageError(true)}
            >
              <p className="sr-only" aria-live="polite">
                Opening page {pageNumber}...
              </p>
              <PageImage
                issueLabel={issue.label}
                page={current.page}
                pageCount={issue.pageCount}
                src={current.src}
                alt={`Concrete Curve ${issue.label}, page ${pageNumber}: magazine page`}
                width={1224}
                height={864}
                priority
                className="aspect-[1224/864] w-full max-w-[min(100vw-2rem,1224px)]"
                sizes="(max-width: 1280px) 92vw, 1224px"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-white/10 bg-ink px-4 py-3 text-bg-elevated sm:gap-3 sm:px-6">
        <button
          type="button"
          className="rounded-sm border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10 disabled:opacity-40"
          onClick={() => goToPage(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          Previous page
        </button>
        <button
          type="button"
          className="rounded-sm border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10 disabled:opacity-40"
          onClick={() => goToPage(pageNumber + 1)}
          disabled={pageNumber >= issue.pageCount}
        >
          Next page
        </button>
        <button
          type="button"
          className="rounded-sm border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
          onClick={() => {
            setFit(true);
            setZoom(1);
          }}
        >
          Fit to screen
        </button>
        <button
          type="button"
          className="rounded-sm border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
          onClick={() => {
            setFit(false);
            setZoom((value) => Math.max(0.5, Number((value - 0.25).toFixed(2))));
          }}
        >
          Zoom out
        </button>
        <button
          type="button"
          className="rounded-sm border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
          onClick={() => {
            setFit(false);
            setZoom((value) => Math.min(3, Number((value + 0.25).toFixed(2))));
          }}
        >
          Zoom in
        </button>
      </div>
    </div>
  );
}
