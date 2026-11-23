"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Systems", href: "#systems" },
  { label: "Live data", href: "#live" },
  { label: "MIS v1.0", href: "/lab/market-intelligence-system" },
  { label: "Research", href: "/research" },
  { label: "Exhibition", href: "/" },
  { label: "Contact", href: "/contact" }
];

export function LabNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? "bg-black/60 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
          <Link href="/lab" className="group flex items-center gap-3" aria-label="Chainstox Lab">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 transition group-hover:border-white/50">
              {/* Mark: a rising signal through a box */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M3 17 L9 11 L13 14 L21 5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="21" cy="5" r="1.6" fill="white" />
              </svg>
            </span>
            <span className="text-[13px] font-semibold tracking-[0.22em] text-white">CHAINSTOX</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] text-white backdrop-blur-md transition hover:bg-white/[0.16]"
          >
            <span className={`absolute h-[1.5px] w-4 bg-white transition ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-[1.5px] w-4 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-[1.5px] w-4 bg-white transition ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex items-center bg-black/90 backdrop-blur-2xl"
          >
            <nav className="mx-auto w-full max-w-[1400px] px-6 md:px-12" aria-label="Lab menu">
              {LINKS.map((link, k) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * k, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 border-b border-white/[0.08] py-4 text-4xl font-medium tracking-tight text-white/80 transition hover:text-white md:text-6xl"
                  >
                    <span className="font-mono text-xs text-white/30">0{k + 1}</span>
                    {link.label}
                    <span className="ml-auto text-2xl opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
