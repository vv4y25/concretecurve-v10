"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./Container";

const primaryNav = [
  { href: "/#issues", label: "Issues", match: "/" },
  { href: "/about", label: "About", match: "/about" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isCurrent = (match: string) => {
    if (match === "/") return pathname === "/";
    return pathname === match || pathname.startsWith(`${match}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg/90 backdrop-blur-md transition-colors ${
        scrolled ? "border-border" : "border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          Concrete Curve
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors hover:text-accent ${
                isCurrent(item.match) ? "text-accent" : "text-ink-muted"
              }`}
              aria-current={isCurrent(item.match) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/accessibility"
            className="text-sm tracking-wide text-ink-muted transition-colors hover:text-accent"
          >
            Accessibility
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-sm border border-border px-3 py-1.5 text-sm text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-bg md:hidden"
          aria-label="Mobile"
        >
          <Container className="flex flex-col gap-1 py-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-2 py-2.5 text-base text-ink hover:bg-bg-muted"
                aria-current={isCurrent(item.match) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/accessibility"
              className="rounded-sm px-2 py-2.5 text-base text-ink hover:bg-bg-muted"
            >
              Accessibility
            </Link>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
