"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/photos/behind-the-scenes/pre-show-stage.webp", pos: "50% 45%" },
  { src: "/photos/campus-election/speech.webp", pos: "50% 35%" },
  { src: "/photos/elsewhere/guitar-performance.webp", pos: "50% 40%" },
  { src: "/photos/campus-election/lecture-theatre-session.webp", pos: "50% 40%" }
];

/* Full-bleed moving picture: slow push-in on each photograph, crossfading. Pausable. */
export function HomeHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-black text-white">
      <AnimatePresence initial={false}>
        <motion.img
          key={SLIDES[i].src}
          src={SLIDES[i].src}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.72 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className={`absolute inset-0 h-full w-full object-cover ${paused ? "" : "animate-[kenburns_8s_linear_both]"}`}
          style={{ objectPosition: SLIDES[i].pos }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/45" />

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-24 md:px-10 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm uppercase tracking-[0.1em] text-white/75"
        >
          Economics · Universiti Malaya · Kuala Lumpur
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[14ch] text-[3.4rem] font-normal leading-[0.94] tracking-[-0.045em] sm:text-7xl md:text-[7.5rem] xl:text-[9rem]"
        >
          I build my own tools for reading markets.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex gap-2 sm:hidden"
        >
          <a href="/cv/Alvin-Lim-CV.pdf" download="Alvin-Lim-CV.pdf" className="bg-white px-6 py-3.5 text-[15px] font-medium text-black">
            Download CV ↓
          </a>
          <a href="#explore" className="border border-white/70 px-6 py-3.5 text-[15px] text-white">
            Explore
          </a>
        </motion.div>
      </div>

      <a
        href="#explore"
        aria-label="Scroll down"
        className="absolute bottom-7 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/70 transition hover:bg-white hover:text-black"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </a>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play background" : "Pause background"}
        className="absolute bottom-8 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 transition hover:bg-white hover:text-black md:right-10"
      >
        {paused ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
          </svg>
        )}
      </button>
    </section>
  );
}
