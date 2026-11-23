"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Topic = {
  tab: string;
  kicker: string;
  title: string;
  href: string;
  image: string;
  pos?: string;
  fit?: "cover" | "contain";
};

const DURATION = 7000;

/* A row of topics; the selected one fills a large picture card. Advances on its own until touched. */
export function TopicExplorer({ topics }: { topics: Topic[] }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
  }, []);
  useEffect(() => {
    if (!auto || hover) return;
    const id = setTimeout(() => setI((v) => (v + 1) % topics.length), DURATION);
    return () => clearTimeout(id);
  }, [i, auto, hover, topics.length]);

  const t = topics[i];

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {topics.map((topic, k) => (
          <button
            key={topic.tab}
            type="button"
            onClick={() => {
              setI(k);
              setAuto(false);
            }}
            className={`relative shrink-0 overflow-hidden px-4 py-2.5 text-lg tracking-[-0.015em] transition md:text-[1.35rem] ${
              k === i ? "bg-[#D6D6D6] text-black" : "bg-white text-[#666] hover:text-black"
            }`}
          >
            {k === i && auto && !hover ? (
              <motion.span
                key={`bar-${i}`}
                aria-hidden="true"
                className="absolute inset-y-0 left-0 bg-black/[0.08]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: DURATION / 1000, ease: "linear" }}
              />
            ) : null}
            <span className="relative">{topic.tab}</span>
          </button>
        ))}
      </div>

      <Link href={t.href} className="group relative mt-8 block aspect-[4/5] overflow-hidden bg-[#1A1A1A] sm:aspect-[16/10] lg:aspect-[16/8]">
        <AnimatePresence initial={false}>
          <motion.img
            key={t.image}
            src={t.image}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-0 h-full w-full transition-transform duration-[1.2s] group-hover:scale-[1.03] ${
              t.fit === "contain" ? "object-contain p-6 md:p-12" : "object-cover"
            }`}
            style={{ objectPosition: t.pos ?? "50% 50%" }}
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute left-4 top-4 max-w-[min(42rem,calc(100%-2rem))] bg-[#3A3A3A]/[0.96] p-6 text-white backdrop-blur-md md:left-8 md:top-8 md:p-8"
          >
            <p className="text-base uppercase tracking-[0.06em] md:text-xl">{t.kicker}</p>
            <p className="mt-4 text-3xl leading-[1.05] tracking-[-0.035em] md:text-[3.1rem]">
              {t.title} <span className="inline-block transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </Link>
    </div>
  );
}
