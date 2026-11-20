"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type GlobalNavProps = {
  variant?: "light" | "dark";
  exhibitionChapter?: {
    current: number;
    total: number;
    label: string;
    onSelectChapter?: (index: number) => void;
  };
};

const PRIMARY_LINKS = [
  { label: "Exhibition", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" }
];

const SECONDARY_LINKS = [
  { label: "Chainstox Lab", href: "/lab" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Now", href: "/now" },
  { label: "Journey", href: "/journey" }
];

const DESKTOP_SECONDARY_LINKS = SECONDARY_LINKS.slice(0, 1);

export function GlobalNav({ variant = "light", exhibitionChapter }: GlobalNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = variant === "dark";

  // On the exhibition itself a link to "/" goes nowhere, so walk the visitor back to the entrance instead
  const backToEntrance = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    if (href !== "/" || pathname !== "/" || !exhibitionChapter?.onSelectChapter) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    const select = exhibitionChapter.onSelectChapter;
    // Let the mobile drawer close first so the page doesn't shift under the scroll
    requestAnimationFrame(() => requestAnimationFrame(() => select(0)));
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        isDark
          ? "border-white/12 bg-lab/95 text-bone backdrop-blur-md"
          : "border-rule bg-ivory/95 text-ink backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3.5 md:px-10">
        {/* Brand Identity */}
        <div className="flex items-center gap-4">
          <Link href="/" onClick={backToEntrance("/")} className="group flex items-baseline gap-2.5">
            <span className="archival-mono text-xs font-semibold tracking-[0.2em]">
              ALVIN LIM
            </span>
            <span className={`text-xs ${isDark ? "text-bone/35" : "text-muted"}`}>/</span>
            <span
              className={`editorial-serif text-sm italic transition-colors ${
                isDark ? "text-bone/75 group-hover:text-bone" : "text-graphite group-hover:text-ink"
              }`}
            >
              A Personal Archive
            </span>
          </Link>

          {exhibitionChapter ? (
            <div
              className={`hidden items-center gap-2 border-l pl-4 lg:flex ${
                isDark ? "border-white/15" : "border-rule"
              }`}
            >
              <span
                className={`archival-mono text-[11px] ${
                  isDark ? "text-bone/60" : "text-muted"
                }`}
              >
                0{exhibitionChapter.current} / 0{exhibitionChapter.total} — {exhibitionChapter.label}
              </span>
            </div>
          ) : null}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary Navigation">
          <div className="flex items-center gap-6">
            {PRIMARY_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={backToEntrance(item.href)}
                  className={`relative py-1 text-xs font-medium tracking-[0.08em] uppercase transition-colors ${
                    active
                      ? isDark
                        ? "text-bone font-semibold"
                        : "text-ink font-semibold"
                      : isDark
                        ? "text-bone/60 hover:text-bone"
                        : "text-graphite hover:text-ink"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isDark ? "bg-bone" : "bg-ink"
                      }`}
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>

          <span className={`h-3.5 w-px ${isDark ? "bg-white/15" : "bg-rule"}`} aria-hidden="true" />

          <div className="flex items-center gap-4">
            {DESKTOP_SECONDARY_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`archival-mono text-[11px] transition-colors ${
                    active
                      ? isDark
                        ? "text-bone underline underline-offset-4"
                        : "text-ink underline underline-offset-4"
                      : isDark
                        ? "text-bone/45 hover:text-bone/85"
                        : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={`archival-mono inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] md:hidden ${
            isDark
              ? "border-white/20 text-bone hover:bg-white/5"
              : "border-rule text-ink hover:bg-paper"
          }`}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span>{mobileMenuOpen ? "Close" : "Index"}</span>
          <span>{mobileMenuOpen ? "×" : "≡"}</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen ? (
        <div
          className={`border-t px-5 py-6 md:hidden ${
            isDark ? "border-white/12 bg-lab text-bone" : "border-rule bg-ivory text-ink"
          }`}
        >
          <p className={`archival-mono text-[11px] ${isDark ? "text-bone/45" : "text-muted"}`}>
            PRIMARY COLLECTIONS
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {PRIMARY_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={backToEntrance(item.href)}
                  className={`border px-3.5 py-2.5 text-sm font-medium ${
                    active
                      ? isDark
                        ? "border-bone bg-bone text-ink"
                        : "border-ink bg-ink text-ivory"
                      : isDark
                        ? "border-white/15 text-bone/80"
                        : "border-rule bg-paper/60 text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <p className={`archival-mono mt-6 text-[11px] ${isDark ? "text-bone/45" : "text-muted"}`}>
            CATALOGUE & LAB DESTINATIONS
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {SECONDARY_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`archival-mono border px-3 py-1.5 text-[11px] ${
                  isDark
                    ? "border-white/15 text-bone/75"
                    : "border-rule bg-paper/40 text-graphite"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
