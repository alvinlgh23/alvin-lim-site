"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MENU = [
  {
    heading: "Work",
    links: [
      { label: "Research", href: "/research", note: "FX, Korea, on-chain, valuation" },
      { label: "Chainstox Lab", href: "/lab", note: "The systems, running live" },
      { label: "SGD-NEER Shadow Model", href: "/research/sgd-neer", note: "Singapore's hidden band" }
    ]
  },
  {
    heading: "Life",
    links: [
      { label: "Journey", href: "/journey", note: "Law, economics, and what came between" },
      { label: "Campus Election", href: "/archive/campus-election", note: "Universiti Malaya, 2024" },
      { label: "Behind the Scenes", href: "/archive/behind-the-scenes", note: "Concert crew and a music video" },
      { label: "Elsewhere", href: "/archive/elsewhere", note: "Atlantic City, guitar" },
      { label: "Education", href: "/archive/education", note: "UKM to UM" }
    ]
  },
  {
    heading: "Alvin",
    links: [
      { label: "Now", href: "/now", note: "What I'm working on" },
      { label: "Thoughts", href: "/thoughts", note: "Notes and essays" },
      { label: "Archive", href: "/archive", note: "Everything, in one place" },
      { label: "Contact", href: "/contact", note: "Email, LinkedIn, GitHub" }
    ]
  }
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
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
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 bg-[#2A2A2A]/55 py-2.5 pl-4 pr-2.5 text-white backdrop-blur-xl md:py-3 md:pl-6 md:pr-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Alvin Lim, home">
            <span className="flex h-6 w-6 items-center justify-center border border-white/80 text-[11px] font-semibold tracking-tight">
              AL
            </span>
            <span className="text-[19px] font-medium tracking-[-0.02em] md:text-[21px]">Alvin Lim</span>
          </Link>
          <div className="flex items-stretch gap-2">
            <a
              href="/cv/Alvin-Lim-CV.pdf"
              download="Alvin-Lim-CV.pdf"
              className="hidden items-center bg-white px-5 text-[15px] font-medium text-black transition hover:bg-white/85 sm:flex md:px-12"
            >
              Download CV
            </a>
            <Link
              href="/contact"
              aria-label="Contact"
              className="hidden h-11 w-11 items-center justify-center border border-white/60 bg-white text-black transition hover:bg-white/85 md:flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M3 6h18v12H3z M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center bg-white text-black transition hover:bg-white/85"
            >
              <span className={`absolute h-[1.5px] w-5 bg-black transition ${open ? "rotate-45" : "-translate-y-[6px]"}`} />
              <span className={`absolute h-[1.5px] w-5 bg-black transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-[1.5px] w-5 bg-black transition ${open ? "-rotate-45" : "translate-y-[6px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#111111] text-white"
          >
            <div className="mx-auto grid max-w-[1600px] gap-12 px-6 pb-16 pt-32 md:grid-cols-3 md:px-10 md:pt-40">
              {MENU.map((col, c) => (
                <motion.div
                  key={col.heading}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * c, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="border-b border-white/20 pb-3 text-sm uppercase tracking-[0.08em] text-white/50">{col.heading}</p>
                  <ul className="mt-2">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="group block border-b border-white/10 py-4">
                          <span className="flex items-center justify-between text-2xl tracking-[-0.02em] md:text-[1.7rem]">
                            {l.label}
                            <span className="text-lg text-white/40 transition group-hover:translate-x-1 group-hover:text-white">→</span>
                          </span>
                          <span className="mt-1 block text-sm text-white/45">{l.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
