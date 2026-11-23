"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { MarketField } from "@/components/lab/MarketField";

const rise: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: d, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export function LabHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-24 pt-28">
      <div className="absolute inset-0">
        <MarketField />
        {/* Keep the type readable: darken the centre, fade the field into the page */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgba(0,0,0,0.85),rgba(0,0,0,0.25)_70%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div variants={rise} initial="hidden" animate="show" custom={0.1}>
          <Link
            href="/lab/market-intelligence-system"
            className="group inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-1.5 pr-2 text-sm text-white/85 backdrop-blur-md transition hover:border-white/25"
          >
            <span className="rounded-full bg-[#FF6A3D]/15 px-2.5 py-0.5 text-xs font-medium text-[#FF8A5B]">New</span>
            Market Intelligence System
            <span className="text-white/45">v1.0 public beta</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] transition group-hover:bg-white/[0.16]">↗</span>
          </Link>
        </motion.div>

        <motion.h1
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.25}
          className="mt-9 text-[2.9rem] font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl md:text-[5.5rem]"
        >
          Research systems
          <br />
          for reading{" "}
          <span className="relative inline-block">
            markets
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-white/70 md:-bottom-2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          .
        </motion.h1>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
        >
          Macro, FX, equities and on-chain.
          <br className="hidden sm:block" /> Built in Python, run on real data.
        </motion.p>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.6}
          className="mt-11 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#live"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black transition hover:bg-white/90"
          >
            See it live
            <span className="transition group-hover:translate-x-0.5">›</span>
          </a>
          <a
            href="#systems"
            className="inline-flex items-center rounded-full bg-white/[0.08] px-7 py-3.5 text-[15px] font-medium text-white backdrop-blur-md transition hover:bg-white/[0.14]"
          >
            Browse the systems
          </a>
        </motion.div>
      </div>
    </section>
  );
}
