"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Research", href: "/research" },
  { label: "Lab", href: "/lab" },
  { label: "Journey", href: "/journey" },
  { label: "Archive", href: "/archive" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/contact" }
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? "border-white/[0.08] bg-[#08090A]/80 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2.5 text-[#F7F8F8]" aria-label="Alvin Lim, home">
            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
              <rect x="1" y="1" width="22" height="22" rx="6" fill="#F7F8F8" />
              <path d="M6 16 L10.5 11.5 L13.5 14 L18 8.5" fill="none" stroke="#08090A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[17px] font-semibold tracking-[-0.02em]">Alvin Lim</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-1.5 text-[14px] transition ${
                  active(l.href) ? "text-[#F7F8F8]" : "text-white/55 hover:text-[#F7F8F8]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/cv/Alvin-Lim-CV.pdf"
              download="Alvin-Lim-CV.pdf"
              className="rounded-full bg-[#F7F8F8] px-4 py-2 text-[14px] font-medium text-[#08090A] transition hover:bg-white"
            >
              Download CV
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 md:hidden"
            >
              <span className={`absolute h-[1.5px] w-4 bg-white transition ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-4 bg-white transition ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-[#08090A] px-5 pt-4 md:hidden"
            aria-label="Menu"
          >
            {[{ label: "Home", href: "/" }, ...LINKS].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center justify-between border-b border-white/[0.08] py-4 text-2xl tracking-[-0.02em] text-[#F7F8F8]">
                {l.label}
                <span className="text-white/35">→</span>
              </Link>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
