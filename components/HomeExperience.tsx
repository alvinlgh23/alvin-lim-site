"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

const CHAPTERS = [
  {
    index: 1,
    code: "01 / 07",
    label: "INTRODUCTION",
    id: "chapter-01",
    photo: "/exhibition/chapter-01-intro.webp",
    objectPosition: "52% 48%"
  },
  {
    index: 2,
    code: "02 / 07",
    label: "EDUCATION & DIRECTION",
    id: "chapter-02",
    photo: "/exhibition/chapter-02-education.webp",
    objectPosition: "50% 45%"
  },
  {
    index: 3,
    code: "03 / 07",
    label: "SELECTED RESEARCH",
    id: "chapter-03",
    photo: "/exhibition/chapter-03-research.webp",
    objectPosition: "56% 50%"
  },
  {
    index: 4,
    code: "04 / 07",
    label: "INDEPENDENT RESEARCH",
    id: "chapter-04",
    photo: "/exhibition/chapter-04-lab.webp",
    objectPosition: "50% 48%"
  },
  {
    index: 5,
    code: "05 / 07",
    label: "EXPERIENCES",
    id: "chapter-05",
    photo: "/exhibition/chapter-05-bts.webp",
    objectPosition: "55% 44%"
  },
  {
    index: 6,
    code: "06 / 07",
    label: "FIELD NOTES",
    id: "chapter-06",
    photo: "/exhibition/chapter-06-elsewhere.webp",
    objectPosition: "48% 52%"
  },
  {
    index: 7,
    code: "07 / 07",
    label: "END OF EXHIBITION",
    id: "chapter-07",
    photo: "/exhibition/chapter-07-closing.webp",
    objectPosition: "50% 45%"
  }
];

const museumEase = [0.22, 1, 0.36, 1] as const;

const roomReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: museumEase }
  })
};

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0 || 1)));
  return t * t * (3 - 2 * t);
}

export function HomeExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState(0);
  // Continuous chapter index from 0.0 to 6.0 synced to real scroll position
  const [continuousIndex, setContinuousIndex] = useState(0);

  const scrollToChapter = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(CHAPTERS.length - 1, index));
      setActiveChapter(clamped);

      const track = trackRef.current;
      if (!track) return;

      const isDesktop = window.innerWidth >= 1024;
      const targetEl = document.getElementById(CHAPTERS[clamped].id);
      const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

      if (isDesktop && targetEl) {
        track.scrollTo({
          left: targetEl.offsetLeft,
          behavior: scrollBehavior
        });
      } else if (targetEl) {
        targetEl.scrollIntoView({ behavior: scrollBehavior, block: "start" });
      }
    },
    [prefersReducedMotion]
  );

  // Sync active chapter and continuous float index on desktop horizontal scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollLeft = track.scrollLeft;
        const width = track.clientWidth || 1;
        const floatIdx = Math.max(0, Math.min(CHAPTERS.length - 1, scrollLeft / width));
        setContinuousIndex(floatIdx);

        const nextIndex = Math.round(floatIdx);
        if (nextIndex >= 0 && nextIndex < CHAPTERS.length) {
          setActiveChapter(nextIndex);
        }
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sync active chapter and continuous index on mobile vertical scroll
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerWidth >= 1024) return;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setContinuousIndex(progress * (CHAPTERS.length - 1));

      let current = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            current = i;
          }
        }
      }
      setActiveChapter(current);
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // Desktop wheel-to-horizontal translation when vertical scroll inside a panel isn't needed
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        const target = event.target as HTMLElement | null;
        const panel = target?.closest("[data-chapter-panel]") as HTMLElement | null;
        if (panel && panel.scrollHeight > panel.clientHeight + 4) {
          const atTop = panel.scrollTop <= 0 && event.deltaY < 0;
          const atBottom =
            panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2 && event.deltaY > 0;
          if (!atTop && !atBottom) {
            return;
          }
        }
        event.preventDefault();
        track.scrollBy({
          left: event.deltaY * 1.18,
          behavior: "auto"
        });
      }
    };

    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, []);

  // Keyboard navigation on desktop (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToChapter(activeChapter + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToChapter(activeChapter - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapter, scrollToChapter]);

  const currentChapterMeta = CHAPTERS[activeChapter] || CHAPTERS[0];

  // Special Chapter 03 -> Chapter 04 -> Chapter 05 nocturnal darkness interpolation (peaks at index 3.0)
  const darkProximity = Math.max(0, 1 - Math.abs(continuousIndex - 3));
  const nocturnalAlpha = smoothstep(0.08, 0.92, darkProximity);
  const isNocturnalDominant = nocturnalAlpha > 0.52;
  const overallProgress = Math.max(
    (activeChapter + 1) / CHAPTERS.length,
    (continuousIndex + 1) / CHAPTERS.length
  );

  return (
    <div className="exhibition-v2-shell relative min-h-screen bg-ivory text-ink lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
      {/* Exhibition-Scoped Photographic Immersion & Museum Lighting Styles */}
      <style>{`
        .exhibition-v2-plaque {
          background-color: rgba(247, 244, 237, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.78) inset,
            0 22px 54px -24px rgba(17, 17, 16, 0.16);
        }
        .exhibition-v2-plaque-paper {
          background-color: rgba(239, 236, 227, 0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.72) inset,
            0 20px 48px -24px rgba(17, 17, 16, 0.14);
        }
        .exhibition-v2-plaque-dark {
          background-color: rgba(18, 20, 20, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            0 1px 0 rgba(236, 228, 215, 0.12) inset,
            0 28px 72px -22px rgba(0, 0, 0, 0.72);
        }
        .exhibition-v2-frame-mat {
          box-shadow:
            0 0 0 1px rgba(17, 17, 16, 0.09),
            0 14px 36px -18px rgba(17, 17, 16, 0.18);
        }
        .exhibition-v2-photo-window {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 16, 0.18);
          background-color: #E5E0D4;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.65) inset,
            0 18px 44px -20px rgba(17, 17, 16, 0.22);
        }
        .exhibition-v2-photo-window-dark {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(236, 228, 215, 0.2);
          background-color: #0E0F0F;
          box-shadow:
            0 1px 0 rgba(236, 228, 215, 0.1) inset,
            0 22px 54px -20px rgba(0, 0, 0, 0.75);
        }
        .exhibition-v2-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .group:hover .exhibition-v2-photo-img {
          transform: scale(1.035);
        }
        @media (prefers-reduced-motion: reduce) {
          .exhibition-v2-photo-img {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <GlobalNav
        variant={isNocturnalDominant ? "dark" : "light"}
        exhibitionChapter={{
          current: currentChapterMeta.index,
          total: CHAPTERS.length,
          label: currentChapterMeta.label,
          onSelectChapter: scrollToChapter
        }}
      />

      {/* Continuous Top Gallery Progress Hairline */}
      <div
        aria-hidden="true"
        className={`relative z-30 h-[2px] w-full overflow-hidden transition-colors duration-300 ${
          isNocturnalDominant ? "bg-white/10" : "bg-rule/70"
        }`}
      >
        <motion.div
          className={`h-full origin-left transition-colors duration-300 ${
            isNocturnalDominant ? "bg-moss" : "bg-ember"
          }`}
          animate={{ scaleX: overallProgress }}
          transition={{ duration: 0.25, ease: museumEase }}
        />
      </div>

      {/* =====================================================================
          DESKTOP SCROLL-LINKED CROSS-DISSOLVE PHOTOGRAPHIC STAGE
          Smoothly fades adjacent chapter background plates & interpolates
          the warm-ivory gallery into the dark Chainstox Lab observatory (Ch 04)
      ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 top-[59px] z-0 hidden overflow-hidden lg:block"
      >
        {/* Base Warm Ivory Canvas */}
        <div className="absolute inset-0 bg-ivory" />

        {/* 7 Chapter Full-Bleed Atmospheric Photographic Plates */}
        {CHAPTERS.map((chap, idx) => {
          const dist = Math.abs(continuousIndex - idx);
          const rawWeight = Math.max(0, 1 - dist);
          const weight = smoothstep(0, 1, rawWeight);
          const signedDelta = continuousIndex - idx;
          const parallaxX = prefersReducedMotion ? 0 : signedDelta * -38;
          const scale = prefersReducedMotion ? 1 : 1 + (1 - weight) * 0.045;
          const isDarkChap = idx === 3;

          return (
            <div
              key={chap.id}
              className="absolute inset-0 will-change-[opacity,transform]"
              style={{
                opacity: weight,
                transform: `translate3d(${parallaxX.toFixed(1)}px, 0, 0) scale(${scale.toFixed(4)})`
              }}
            >
              <img
                src={chap.photo}
                alt=""
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                className="h-full w-full object-cover"
                style={{
                  objectPosition: chap.objectPosition,
                  opacity: isDarkChap ? 0.58 : 0.34
                }}
              />
            </div>
          );
        })}

        {/* Warm Editorial Museum Veil (fades out smoothly as Chapter 04 approaches) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 1 - nocturnalAlpha,
            background:
              "radial-gradient(circle at 18% 16%, rgba(247, 244, 237, 0.42) 0%, rgba(247, 244, 237, 0.76) 58%, rgba(239, 236, 227, 0.88) 100%)"
          }}
        />

        {/* Nocturnal Chainstox Lab Veil (gradually fades in between Chapter 03 -> 04 and out 04 -> 05) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: nocturnalAlpha,
            background:
              "radial-gradient(circle at 24% 22%, rgba(14, 15, 15, 0.52) 0%, rgba(11, 13, 13, 0.84) 64%, rgba(9, 10, 10, 0.92) 100%)"
          }}
        />
      </div>

      {/* Horizontal Exhibition Track on Desktop / Vertical Stack on Mobile */}
      <div
        ref={trackRef}
        className="exhibition-track relative z-10 flex-1 lg:flex lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:overflow-y-hidden"
      >
        {/* =================================================================
            CHAPTER 01 — INTRODUCTION
        ================================================================= */}
        <section
          id="chapter-01"
          data-chapter-panel
          className="relative flex min-h-[calc(100vh-59px)] w-full shrink-0 flex-col justify-between overflow-hidden border-b border-rule/80 bg-ivory/85 px-5 py-9 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-transparent"
        >
          {/* Mobile Atmospheric Photographic Backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
            <img
              src="/exhibition/chapter-01-intro.webp"
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/75 to-ivory/95" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            {/* Top Archival Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 pb-3.5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ember" />
                <span className="archival-mono text-xs font-semibold text-ink">
                  01 / 07 — INTRODUCTION
                </span>
              </div>
              <span className="archival-mono text-[11px] text-muted">
                EXHIBITION OPENING SPREAD · KUALA LUMPUR / UNIVERSITI MALAYA
              </span>
            </div>

            {/* Asymmetric Editorial Opening Spread */}
            <div className="mt-7 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left Column (5 cols): Large Serif Headline + Narrow Text Column + Action */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.03}
                className="exhibition-v2-plaque flex flex-col justify-between border border-ink/15 p-6 md:p-8 lg:col-span-5"
              >
                <div>
                  <div className="inline-flex items-center gap-2 border border-rule bg-paper/90 px-3 py-1">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-ink" />
                    <p className="archival-mono text-[10px] text-muted">
                      PERSONAL ARCHIVE & EXHIBITION CATALOGUE
                    </p>
                  </div>

                  <h1 className="editorial-serif mt-4 text-5xl font-normal leading-[1.01] tracking-[-0.022em] text-ink md:text-6xl xl:text-[4.35rem]">
                    Hi, I&apos;m Alvin.
                  </h1>

                  <div className="mt-6 max-w-[39ch] space-y-4 border-l-2 border-ink/80 pl-5 text-base leading-[1.76] text-charcoal md:text-[1.05rem]">
                    <p>I&apos;m Alvin, an economics student at Universiti Malaya.</p>
                    <p>
                      I spend much of my time exploring financial markets, technology, and the questions that connect them.
                    </p>
                    <p>
                      This is a small collection of things I&apos;ve worked on, places I&apos;ve been, and interests I&apos;ve followed along the way.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-rule pt-6">
                    <button
                      type="button"
                      onClick={() => scrollToChapter(1)}
                      className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ivory shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal"
                    >
                      <span>Explore the exhibition</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                    <Link
                      href="/research"
                      className="archival-mono border border-ink/25 bg-ivory px-4 py-3 text-[11px] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-paper"
                    >
                      Research Index
                    </Link>
                    <Link
                      href="/archive"
                      className="archival-mono border border-ink/25 bg-ivory px-4 py-3 text-[11px] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-paper"
                    >
                      Personal Archive
                    </Link>
                  </div>
                </div>

                {/* Three Editorial Pillars Summary */}
                <div className="mt-8 grid gap-3 border-t border-ink/15 pt-5 sm:grid-cols-3">
                  <div className="border-l border-rule pl-3">
                    <p className="archival-mono text-[10px] text-ember">PILLAR 01</p>
                    <p className="editorial-serif mt-1 text-base font-medium text-ink">Research</p>
                    <p className="mt-0.5 text-xs leading-snug text-graphite">
                      What I&apos;m trying to understand.
                    </p>
                  </div>
                  <div className="border-l border-rule pl-3">
                    <p className="archival-mono text-[10px] text-ink">PILLAR 02</p>
                    <p className="editorial-serif mt-1 text-base font-medium text-ink">Archive</p>
                    <p className="mt-0.5 text-xs leading-snug text-graphite">How I got here.</p>
                  </div>
                  <div className="border-l border-rule pl-3">
                    <p className="archival-mono text-[10px] text-ink">PILLAR 03</p>
                    <p className="editorial-serif mt-1 text-base font-medium text-ink">Elsewhere</p>
                    <p className="mt-0.5 text-xs leading-snug text-graphite">
                      The things in between.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Center Column (4 cols): Identity Card Dossier + Integrated Photographic Study */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.11}
                className="flex lg:col-span-4"
              >
                <div className="exhibition-v2-plaque-paper specimen-grid-bg group relative flex w-full flex-col justify-between border border-ink/20 p-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-rule pb-3">
                      <span className="archival-mono text-[10px] text-muted">
                        FIG. 01.A — SUBJECT DOSSIER
                      </span>
                      <span className="archival-mono border border-ink/20 bg-ivory px-2 py-0.5 text-[10px] text-charcoal">
                        NON-PERSON RECORD
                      </span>
                    </div>

                    {/* Framed Photographic & Identity Plate */}
                    <div className="exhibition-v2-photo-window mt-4 h-36 w-full">
                      <img
                        src="/exhibition/chapter-01-intro.webp"
                        alt=""
                        loading="eager"
                        decoding="async"
                        className="exhibition-v2-photo-img object-left-top"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                    </div>

                    <div className="exhibition-v2-frame-mat mt-4 border border-ink/20 bg-ivory p-5">
                      <div className="flex items-baseline justify-between border-b border-rule pb-3">
                        <span className="editorial-serif text-4xl italic text-ink">A. L.</span>
                        <span className="archival-mono text-[10px] text-muted">CAT. NO. AL-2026</span>
                      </div>
                      <p className="editorial-serif mt-3.5 text-lg italic leading-relaxed text-charcoal">
                        “A curiosity about how things work — and how they could work better.”
                      </p>
                      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-rule pt-3.5 text-xs">
                        <div>
                          <dt className="archival-mono text-[9px] text-muted">INSTITUTION</dt>
                          <dd className="mt-1 font-medium text-ink">Universiti Malaya</dd>
                        </div>
                        <div>
                          <dt className="archival-mono text-[9px] text-muted">DISCIPLINE</dt>
                          <dd className="mt-1 font-medium text-ink">Economics (FBE)</dd>
                        </div>
                        <div>
                          <dt className="archival-mono text-[9px] text-muted">FOCUS AREAS</dt>
                          <dd className="mt-1 text-charcoal">Markets · Silicon · Macro</dd>
                        </div>
                        <div>
                          <dt className="archival-mono text-[9px] text-muted">INDEPENDENT LAB</dt>
                          <dd className="mt-1 text-charcoal">Chainstox Lab</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <p className="archival-mono mt-4 border-t border-rule pt-3 text-[10px] leading-relaxed text-muted">
                    PORTRAIT AREA NOTE: Authentic personal portrait slot reserved. Displayed as an archival identity card without stock imagery.
                  </p>
                </div>
              </motion.div>

              {/* Right Column (3 cols): Secondary Environmental Photograph & Meridian Study */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.18}
                className="flex lg:col-span-3"
              >
                <div className="exhibition-v2-plaque group flex w-full flex-col justify-between border border-ink/20 p-5">
                  <div>
                    <div className="flex items-center justify-between border-b border-rule pb-2.5">
                      <span className="archival-mono text-[10px] text-muted">
                        FIG. 01.B — ENVIRONMENT
                      </span>
                      <span className="archival-mono text-[10px] text-charcoal">
                        3.1209° N, 101.6538° E
                      </span>
                    </div>

                    {/* Layered Documentary Environmental Photograph + Meridian Overlay */}
                    <div className="exhibition-v2-photo-window my-4 h-48 w-full">
                      <img
                        src="/exhibition/chapter-01-intro.webp"
                        alt=""
                        loading="eager"
                        decoding="async"
                        className="exhibition-v2-photo-img object-right-bottom"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory/90 via-ivory/35 to-transparent" />
                      <div className="pointer-events-none absolute inset-0 p-3">
                        <svg
                          viewBox="0 0 240 160"
                          className="h-full w-full text-ink"
                          fill="none"
                          aria-hidden="true"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="224"
                            height="144"
                            stroke="#111110"
                            strokeOpacity="0.28"
                            strokeWidth="1"
                          />
                          <line
                            x1="8"
                            y1="44"
                            x2="232"
                            y2="44"
                            stroke="#111110"
                            strokeOpacity="0.22"
                            strokeWidth="1"
                          />
                          <line
                            x1="88"
                            y1="8"
                            x2="88"
                            y2="152"
                            stroke="#111110"
                            strokeOpacity="0.22"
                            strokeWidth="1"
                          />
                          <circle cx="88" cy="96" r="38" stroke="currentColor" strokeWidth="1.25" />
                          <circle
                            cx="88"
                            cy="96"
                            r="18"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                          />
                          <path
                            d="M126 118 L156 84 L184 96 L216 58"
                            stroke="#B8592A"
                            strokeWidth="1.8"
                          />
                          <circle cx="216" cy="58" r="3.2" fill="#B8592A" />
                          <text x="16" y="28" fill="#111110" fontSize="8" fontFamily="monospace">
                            OBSERVATION FIELD // KL — UM
                          </text>
                          <text x="96" y="142" fill="#2C2B28" fontSize="7" fontFamily="monospace">
                            SYSTEMS · MARKETS · ARCHIVE
                          </text>
                        </svg>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-graphite">
                      Secondary environmental plate mapping the intersection of academic economics at Universiti Malaya, independent market tooling, and personal field notes.
                    </p>
                  </div>

                  <div className="mt-4 border-t border-rule pt-3">
                    <p className="archival-mono text-[10px] text-muted">EXHIBITION STRUCTURE</p>
                    <p className="mt-1 text-xs text-charcoal">
                      Seven horizontal rooms on desktop · Full collection essays below.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Chapter Progress Bar */}
          <div className="relative z-10 mx-auto mt-7 flex w-full max-w-[1400px] items-center justify-between border-t border-ink/20 pt-3.5 text-xs text-muted">
            <span className="archival-mono text-[10px]">CHAPTER 01 OF 07 · INTRODUCTION</span>
            <button
              type="button"
              onClick={() => scrollToChapter(1)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              NEXT: 02 / EDUCATION & DIRECTION →
            </button>
          </div>
        </section>

        {/* =================================================================
            CHAPTER 02 — EDUCATION & DIRECTION
        ================================================================= */}
        <section
          id="chapter-02"
          data-chapter-panel
          className="relative flex min-h-[calc(100vh-59px)] w-full shrink-0 flex-col justify-between overflow-hidden border-b border-rule/80 bg-paper/85 px-5 py-9 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-transparent"
        >
          {/* Mobile Atmospheric Photographic Backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
            <img
              src="/exhibition/chapter-02-education.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-ivory/80 to-paper/95" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 pb-3.5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink" />
                <span className="archival-mono text-xs font-semibold text-ink">
                  02 / 07 — EDUCATION & DIRECTION
                </span>
              </div>
              <span className="archival-mono text-[11px] text-muted">
                ACADEMIC & INTELLECTUAL TRANSITION RECORD
              </span>
            </div>

            <div className="mt-7 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left 5 cols: Approved narrative & cross-links */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.04}
                className="exhibition-v2-plaque flex flex-col justify-between border border-ink/20 p-6 md:p-8 lg:col-span-5"
              >
                <div>
                  <p className="archival-mono text-[11px] text-ember">AUTOBIOGRAPHICAL SHIFT</p>
                  <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-5xl">
                    A different way of understanding systems.
                  </h2>

                  <div className="mt-6 space-y-4 text-base leading-[1.76] text-charcoal">
                    <p>
                      I originally studied law at Universiti Kebangsaan Malaysia, driven by an interest in public policy, economic development, and how resources could be better allocated.
                    </p>
                    <p>
                      But studying law turned out to be quite different from what I had imagined.
                    </p>
                    <p>
                      I eventually transferred to Universiti Malaya to study economics. Later, participating in a campus election also changed how I thought about political involvement.
                    </p>
                    <p>Today, my focus is on research, markets, and technology.</p>
                  </div>
                </div>

                {/* Required Related Links */}
                <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/archive/education"
                    className="group inline-flex items-center justify-between gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.1em] uppercase text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:bg-charcoal"
                  >
                    <span>From Law to Economics</span>
                    <span>↗</span>
                  </Link>
                  <Link
                    href="/archive/campus-election"
                    className="group inline-flex items-center justify-between gap-3 border border-ink bg-ivory px-5 py-3 text-xs font-medium tracking-[0.1em] uppercase text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone/60"
                  >
                    <span>The 2024 Campus Election</span>
                    <span>↗</span>
                  </Link>
                </div>
              </motion.div>

              {/* Right 7 cols: University Architectural Photograph + Four-Stage Progression Matrix */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.12}
                className="flex lg:col-span-7"
              >
                <div className="exhibition-v2-plaque group flex w-full flex-col justify-between border border-ink/20 p-6 md:p-7">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3.5">
                      <span className="archival-mono text-[11px] font-semibold text-ink">
                        FIG. 02.A — DIRECTIONAL SHIFT: FOUR-STAGE PROGRESSION
                      </span>
                      <span className="archival-mono border border-rule bg-paper px-2.5 py-0.5 text-[10px] text-muted">
                        LAW → ECONOMICS → POLITICAL EXPERIENCE → RESEARCH
                      </span>
                    </div>

                    {/* Panoramic Campus Colonnade Architectural Photograph */}
                    <div className="exhibition-v2-photo-window mt-4 h-36 w-full md:h-40">
                      <img
                        src="/exhibition/chapter-02-education.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="exhibition-v2-photo-img object-center"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-ink/25" />
                    </div>

                    <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                      <div className="border border-rule bg-paper/70 p-4 transition-colors hover:border-ink/40">
                        <div className="flex items-center justify-between">
                          <span className="archival-mono text-[10px] text-muted">STAGE 01</span>
                          <span className="archival-mono text-[10px] text-charcoal">UKM</span>
                        </div>
                        <h3 className="editorial-serif mt-1.5 text-2xl text-ink">Law</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-graphite">
                          Entered Universiti Kebangsaan Malaysia hoping to work on public policy, economic development, and resource allocation—before finding legal study differed from that systems-design ambition.
                        </p>
                      </div>

                      <div className="border border-rule bg-paper/70 p-4 transition-colors hover:border-ink/40">
                        <div className="flex items-center justify-between">
                          <span className="archival-mono text-[10px] text-muted">STAGE 02</span>
                          <span className="archival-mono text-[10px] text-charcoal">
                            UNIVERSITI MALAYA
                          </span>
                        </div>
                        <h3 className="editorial-serif mt-1.5 text-2xl text-ink">Economics</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-graphite">
                          Transferred to Universiti Malaya (Faculty of Business and Economics) to study incentives, markets, institutions, and how resources are allocated.
                        </p>
                      </div>

                      <div className="border border-rule bg-paper/70 p-4 transition-colors hover:border-ink/40">
                        <div className="flex items-center justify-between">
                          <span className="archival-mono text-[10px] text-muted">STAGE 03</span>
                          <span className="archival-mono text-[10px] text-charcoal">
                            NOV 2024 · NEWGEN
                          </span>
                        </div>
                        <h3 className="editorial-serif mt-1.5 text-2xl text-ink">
                          Political Experience
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-graphite">
                          Stood as an FBE student representative candidate in the 2024 campus election. Not elected; the firsthand experience clarified why political participation was not the path I wanted to pursue.
                        </p>
                      </div>

                      <div className="exhibition-v2-frame-mat border-2 border-ink bg-ivory p-4">
                        <div className="flex items-center justify-between">
                          <span className="archival-mono text-[10px] font-semibold text-ember">
                            STAGE 04 · CURRENT
                          </span>
                          <span className="archival-mono bg-ink px-2 py-0.5 text-[10px] text-ivory">
                            ACTIVE FOCUS
                          </span>
                        </div>
                        <h3 className="editorial-serif mt-1.5 text-2xl text-ink">Research</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-charcoal">
                          Concentrating on evidence-driven inquiry across financial markets, valuation, monetary frameworks, and semiconductor technology.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-3.5 text-xs text-muted">
                    <span className="archival-mono text-[10px]">
                      FULL FIVE-PART ESSAY IN /ARCHIVE/EDUCATION
                    </span>
                    <span className="archival-mono text-[10px]">
                      CAMPAIGN RECORD IN /ARCHIVE/CAMPUS-ELECTION
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-7 flex w-full max-w-[1400px] items-center justify-between border-t border-ink/20 pt-3.5 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(0)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              ← PREV: 01 / INTRODUCTION
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 02 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(2)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              NEXT: 03 / SELECTED RESEARCH →
            </button>
          </div>
        </section>

        {/* =================================================================
            CHAPTER 03 — SELECTED RESEARCH
        ================================================================= */}
        <section
          id="chapter-03"
          data-chapter-panel
          className="relative flex min-h-[calc(100vh-59px)] w-full shrink-0 flex-col justify-between overflow-hidden border-b border-rule/80 bg-ivory/85 px-5 py-9 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-transparent"
        >
          {/* Mobile Atmospheric Photographic Backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
            <img
              src="/exhibition/chapter-03-research.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/75 to-ivory/95" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 pb-3.5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ember" />
                <span className="archival-mono text-xs font-semibold text-ink">
                  03 / 07 — SELECTED RESEARCH
                </span>
              </div>
              <Link
                href="/research"
                className="archival-mono border border-ink/25 bg-ivory px-3 py-1 text-[11px] text-ink transition hover:border-ink hover:bg-paper"
              >
                OPEN FULL RESEARCH COLLECTION →
              </Link>
            </div>

            {/* Header + Intro + Integrated Silicon/Optical Photographic Banner */}
            <motion.div
              variants={roomReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.04}
              className="exhibition-v2-plaque group mt-6 grid gap-6 border border-ink/20 p-5 md:p-6 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-4">
                <p className="archival-mono text-[11px] text-ember">RESEARCH EXHIBITION WALL</p>
                <h2 className="editorial-serif mt-1.5 text-4xl font-normal leading-[1.04] text-ink md:text-5xl">
                  Questions worth testing.
                </h2>
              </div>
              <div className="space-y-2 border-l border-rule pl-5 text-sm leading-relaxed text-charcoal lg:col-span-5">
                <p>
                  Some questions begin with a technology. Others begin with a market price that doesn&apos;t quite make sense.
                </p>
                <p>
                  I explore them through research, data, and small systems built to test ideas.
                </p>
              </div>
              <div className="exhibition-v2-photo-window h-28 w-full lg:col-span-3">
                <img
                  src="/exhibition/chapter-03-research.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="exhibition-v2-photo-img object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/35 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Three Visually Distinct Research Artifacts + Secondary Research Entry */}
            <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-stretch">
              {/* Artifact 01: Asymmetric Layered Diagnostic Sheet */}
              <motion.article
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.1}
                className="exhibition-v2-plaque flex flex-col justify-between border-2 border-ink p-6 transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-4"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-ink/20 pb-3">
                    <span className="archival-mono text-[10px] font-semibold text-ember">
                      ARTIFACT 01 · MARKETS / VALUATION
                    </span>
                    <span className="archival-mono border border-rule bg-ivory px-2 py-0.5 text-[10px] text-muted">
                      FIG. 03.1
                    </span>
                  </div>
                  <h3 className="editorial-serif mt-4 text-2xl text-ink md:text-3xl">
                    Market Valuation Engine
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-charcoal">
                    Exploring market conditions, valuation, and the signals that shape risk and expectations.
                  </p>

                  {/* Analytical Layer Diagram */}
                  <div className="exhibition-v2-frame-mat mt-5 space-y-2 border border-ink/20 bg-ivory p-4 font-mono text-[11px]">
                    <div className="flex items-center justify-between border-b border-rule pb-1.5">
                      <span className="text-muted">L1 // LIQUIDITY</span>
                      <span className="font-medium text-ink">10Y · DXY · VIX</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-rule pb-1.5">
                      <span className="text-muted">L2 // ROTATION</span>
                      <span className="font-medium text-ink">SECTOR RS vs SPY</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-rule pb-1.5">
                      <span className="text-muted">L3 // VALUATION</span>
                      <span className="font-medium text-ink">FWD PE EXPANSION</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">L4 // POSITIONING</span>
                      <span className="font-semibold text-ember">OVERHEAT / CHASE RISK</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-ink/15 pt-4">
                  <Link
                    href="/research/market-valuation"
                    className="archival-mono group inline-flex w-full items-center justify-between bg-ink px-4 py-2.5 text-xs font-semibold text-ivory transition hover:bg-charcoal"
                  >
                    <span>Inspect Case Study</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.article>

              {/* Artifact 02: Dark-Accent Ontology Matrix Specimen */}
              <motion.article
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.16}
                className="exhibition-v2-plaque specimen-grid-bg flex flex-col justify-between border border-ink/25 p-6 transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-4"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-rule pb-3">
                    <span className="archival-mono text-[10px] font-semibold text-ink">
                      ARTIFACT 02 · CRYPTO / MARKET STRUCTURE
                    </span>
                    <span className="archival-mono border border-rule bg-paper px-2 py-0.5 text-[10px] text-muted">
                      FIG. 03.2
                    </span>
                  </div>
                  <h3 className="editorial-serif mt-4 text-2xl text-ink md:text-3xl">
                    On-Chain Market Intelligence
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-charcoal">
                    Investigating liquidity, capital flows, and market structure through on-chain data.
                  </p>

                  {/* 4-Vote Structural Matrix */}
                  <div className="exhibition-v2-frame-mat mt-5 grid grid-cols-2 gap-2.5 border border-ink/15 bg-paper/75 p-3.5 font-mono text-[10px]">
                    <div className="border border-rule bg-ivory p-2.5">
                      <p className="text-muted">COHORT P/L</p>
                      <p className="mt-1 font-medium text-ink">SOPR · RHODL</p>
                    </div>
                    <div className="border border-rule bg-ivory p-2.5">
                      <p className="text-muted">VENUE FLOW</p>
                      <p className="mt-1 font-medium text-ink">EXCHANGE NET</p>
                    </div>
                    <div className="border border-rule bg-ivory p-2.5">
                      <p className="text-muted">ROTATION</p>
                      <p className="mt-1 font-medium text-ink">LTH / STH SUPPLY</p>
                    </div>
                    <div className="border border-ink/30 bg-ivory p-2.5">
                      <p className="text-ember">ONTOLOGY</p>
                      <p className="mt-1 font-medium text-ink">7-STATE REGIME</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-rule pt-4">
                  <Link
                    href="/research/onchain-intelligence"
                    className="archival-mono group inline-flex w-full items-center justify-between border border-ink bg-ivory px-4 py-2.5 text-xs font-semibold text-ink transition hover:bg-ink hover:text-ivory"
                  >
                    <span>Inspect Case Study</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.article>

              {/* Artifact 03 + Secondary Semiconductor Entry Stacked */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.22}
                className="flex flex-col gap-5 lg:col-span-4"
              >
                <article className="exhibition-v2-plaque-paper flex flex-1 flex-col justify-between border border-ink/20 p-6 transition-transform duration-300 hover:-translate-y-0.5">
                  <div>
                    <div className="flex items-center justify-between border-b border-rule pb-2.5">
                      <span className="archival-mono text-[10px] font-semibold text-ink">
                        ARTIFACT 03 · MACRO / EXCHANGE RATES
                      </span>
                      <span className="archival-mono border border-rule bg-ivory px-2 py-0.5 text-[10px] text-muted">
                        FIG. 03.3
                      </span>
                    </div>
                    <h3 className="editorial-serif mt-3 text-2xl text-ink">
                      SGD-NEER Shadow Model
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal">
                      An independent attempt to understand Singapore&apos;s exchange-rate-based monetary framework.
                    </p>

                    {/* Policy Band Corridor SVG */}
                    <div className="exhibition-v2-frame-mat mt-4 border border-ink/15 bg-ivory px-3.5 py-2.5">
                      <svg
                        viewBox="0 0 220 52"
                        className="h-11 w-full"
                        fill="none"
                        aria-hidden="true"
                      >
                        <line
                          x1="0"
                          y1="10"
                          x2="220"
                          y2="6"
                          stroke="#7D7A72"
                          strokeDasharray="3 3"
                          strokeWidth="1"
                        />
                        <line x1="0" y1="28" x2="220" y2="24" stroke="#111110" strokeWidth="1" />
                        <line
                          x1="0"
                          y1="46"
                          x2="220"
                          y2="42"
                          stroke="#7D7A72"
                          strokeDasharray="3 3"
                          strokeWidth="1"
                        />
                        <path
                          d="M0 32 Q 45 18, 90 25 T 165 15 T 220 20"
                          stroke="#B8592A"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      <p className="archival-mono mt-1 text-[9px] text-muted">
                        INDEPENDENT TRADE-WEIGHTED PROXY CORRIDOR (NON-MAS)
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-rule pt-3">
                    <Link
                      href="/research/sgd-neer"
                      className="archival-mono group inline-flex items-center gap-2 text-xs font-semibold text-ink hover:underline"
                    >
                      <span>Inspect Case Study</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>

                {/* Secondary Research Entry: Semiconductor Research */}
                <article className="exhibition-v2-plaque border border-ink/25 p-5 transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="archival-mono text-[10px] text-muted">
                      SECONDARY RESEARCH ENTRY
                    </span>
                    <span className="archival-mono border border-ember/40 bg-ember/10 px-2 py-0.5 text-[10px] text-ember">
                      Research in progress
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-baseline justify-between gap-4">
                    <h4 className="editorial-serif text-xl text-ink">Semiconductor Research</h4>
                    <Link
                      href="/research/semiconductors"
                      className="archival-mono shrink-0 text-[11px] font-semibold text-ink underline underline-offset-4"
                    >
                      Open Dossier →
                    </Link>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-graphite">
                    From mobile SoC evolution to chip architecture and semiconductor industry economics.
                  </p>
                </article>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-7 flex w-full max-w-[1400px] items-center justify-between border-t border-ink/20 pt-3.5 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(1)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              ← PREV: 02 / EDUCATION & DIRECTION
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 03 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(3)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              NEXT: 04 / CHAINSTOX LAB →
            </button>
          </div>
        </section>

        {/* =================================================================
            CHAPTER 04 — CHAINSTOX LAB (DARK EDITORIAL CHAPTER)
        ================================================================= */}
        <section
          id="chapter-04"
          data-chapter-panel
          className="dark-specimen-grid-bg relative flex min-h-[calc(100vh-59px)] w-full shrink-0 flex-col justify-between overflow-hidden border-b border-white/15 bg-lab px-5 py-9 text-bone md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-transparent"
        >
          {/* Mobile Atmospheric Photographic Backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
            <img
              src="/exhibition/chapter-04-lab.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-lab/80 via-lab/75 to-lab/95" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-3.5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-moss" />
                <span className="archival-mono text-xs font-semibold text-bone">
                  04 / 07 — INDEPENDENT RESEARCH
                </span>
              </div>
              <span className="archival-mono text-[11px] text-bone/50">
                CHAINSTOX LAB · RESEARCH INFRASTRUCTURE & WORKING EXPERIMENTS
              </span>
            </div>

            <div className="mt-7 grid gap-9 lg:mt-9 lg:grid-cols-12 lg:items-stretch">
              {/* Left 5 cols: Dramatic Dark Editorial Copy + Nocturnal Lab Photographic Window */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.04}
                className="exhibition-v2-plaque-dark group flex flex-col justify-between border border-white/15 p-6 md:p-8 lg:col-span-5"
              >
                <div>
                  <div className="inline-flex items-center gap-2 border border-moss/30 bg-moss/10 px-3 py-1">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-moss" />
                    <p className="archival-mono text-[11px] text-moss">
                      CHAPTER 04 // WORKING RESEARCH SPACE
                    </p>
                  </div>

                  <h2 className="editorial-serif mt-4 text-5xl font-normal leading-[1.02] text-bone md:text-6xl">
                    Chainstox Lab.
                  </h2>

                  <p className="mt-5 border-l-2 border-moss/60 pl-5 text-lg leading-relaxed text-bone/90 md:text-xl">
                    An independent space for exploring markets through research, data, and code.
                  </p>
                  <p className="mt-3.5 pl-5 text-base leading-relaxed text-bone/65">
                    A place where research questions become working experiments, analytical models, and tools.
                  </p>

                  {/* Nocturnal Observatory Photographic Plate */}
                  <div className="exhibition-v2-photo-window-dark mt-6 h-36 w-full">
                    <img
                      src="/exhibition/chapter-04-lab.webp"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="exhibition-v2-photo-img object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lab/80 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-4 border-t border-white/15 pt-5">
                  <Link
                    href={VERIFIED_DESTINATIONS.chainstoxLab}
                    className="group inline-flex items-center gap-3 bg-bone px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
                  >
                    <span>Explore Chainstox Lab</span>
                    <span>↗</span>
                  </Link>
                  <Link
                    href="/lab/projects/market-valuation-engine"
                    className="archival-mono border border-white/20 bg-white/[0.04] px-4 py-3 text-[11px] text-bone transition-all duration-200 hover:-translate-y-0.5 hover:border-bone/60 hover:bg-white/[0.08]"
                  >
                    Embedded Console
                  </Link>
                </div>
              </motion.div>

              {/* Right 7 cols: Technical Annotations & System Registry Table */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.12}
                className="flex lg:col-span-7"
              >
                <div className="exhibition-v2-plaque-dark flex w-full flex-col justify-between border border-white/15 p-6 md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/12 pb-4">
                      <div>
                        <p className="archival-mono text-[11px] text-bone">
                          FIG. 04.A — ACTIVE RESEARCH SYSTEMS & REPOSITORIES
                        </p>
                        <p className="mt-1 text-xs text-bone/55">
                          Verified tools and analytical engines indexed in Chainstox Lab
                        </p>
                      </div>
                      <span className="archival-mono border border-moss/30 bg-moss/10 px-2.5 py-1 text-[10px] text-moss">
                        08 SYSTEMS INDEXED
                      </span>
                    </div>

                    <div className="mt-5 divide-y divide-white/10 font-mono text-xs">
                      {[
                        [
                          "SYS-01",
                          "Market Valuation Engine",
                          "Macro · Sector RS · Overheat CLI",
                          "/lab/projects/market-valuation-engine"
                        ],
                        [
                          "SYS-02",
                          "On-Chain Market Intelligence",
                          "4-Layer Regime & Dune SQL Pipeline",
                          "/lab/projects/on-chain-market-intelligence"
                        ],
                        [
                          "SYS-03",
                          "SGD-NEER Shadow Model",
                          "Trade-Weighted Geometric FX Proxy",
                          "/lab/projects/sgd-neer-shadow-model"
                        ],
                        [
                          "SYS-04",
                          "KOSPI Signal Monitor",
                          "Semiconductors · FX · GARCH Diagnostics",
                          "/lab/projects/kospi-signal-monitor"
                        ],
                        [
                          "SYS-05",
                          "Phone Cycle Timing Engine",
                          "Secondary Market Depreciation Scenarios",
                          "/lab/projects/phone-cycle-timing-engine"
                        ]
                      ].map(([code, name, spec, href]) => (
                        <Link
                          key={code}
                          href={href}
                          className="group grid items-center gap-3 px-2 py-3.5 transition-colors hover:bg-white/[0.04] sm:grid-cols-[0.18fr_0.42fr_0.4fr]"
                        >
                          <span className="text-bone/45 group-hover:text-moss">{code}</span>
                          <span className="font-sans font-medium text-bone">{name}</span>
                          <span className="text-right text-[11px] text-bone/60 group-hover:text-bone">
                            {spec} ↗
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 border-t border-white/12 pt-5 sm:grid-cols-3">
                    <div className="border border-white/10 bg-black/35 p-3.5">
                      <p className="archival-mono text-[9px] text-bone/45">PRINCIPLE 01</p>
                      <p className="mt-1 text-xs text-bone/85">Regimes over isolated predictions</p>
                    </div>
                    <div className="border border-white/10 bg-black/35 p-3.5">
                      <p className="archival-mono text-[9px] text-bone/45">PRINCIPLE 02</p>
                      <p className="mt-1 text-xs text-bone/85">Transparent proxy boundaries</p>
                    </div>
                    <div className="border border-white/10 bg-black/35 p-3.5">
                      <p className="archival-mono text-[9px] text-bone/45">PRINCIPLE 03</p>
                      <p className="mt-1 text-xs text-bone/85">Explicit source & signal coverage</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-7 flex w-full max-w-[1400px] items-center justify-between border-t border-white/15 pt-3.5 text-xs text-bone/55">
            <button
              type="button"
              onClick={() => scrollToChapter(2)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-bone transition hover:border-white/20 hover:bg-white/5"
            >
              ← PREV: 03 / SELECTED RESEARCH
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 04 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(4)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-bone transition hover:border-white/20 hover:bg-white/5"
            >
              NEXT: 05 / BEHIND THE SCENES →
            </button>
          </div>
        </section>

        {/* =================================================================
            CHAPTER 05 — BEHIND THE SCENES
        ================================================================= */}
        <section
          id="chapter-05"
          data-chapter-panel
          className="relative flex min-h-[calc(100vh-59px)] w-full shrink-0 flex-col justify-between overflow-hidden border-b border-rule/80 bg-ivory/85 px-5 py-9 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-transparent"
        >
          {/* Mobile Atmospheric Photographic Backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
            <img
              src="/exhibition/chapter-05-bts.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-32"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/75 to-ivory/95" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 pb-3.5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ember" />
                <span className="archival-mono text-xs font-semibold text-ink">
                  05 / 07 — EXPERIENCES
                </span>
              </div>
              <span className="archival-mono text-[11px] text-muted">
                DOCUMENTARY SEQUENCE · PRODUCTION & EVENT LOGS
              </span>
            </div>

            <div className="mt-7 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left 4 cols: Approved Copy + Documentary Stage Rigging Plate + CTA */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.04}
                className="exhibition-v2-plaque group flex flex-col justify-between border border-ink/20 p-6 md:p-8 lg:col-span-4"
              >
                <div>
                  <p className="archival-mono text-[11px] text-ember">BEHIND THE SCENES</p>
                  <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-5xl">
                    Before the lights come on.
                  </h2>

                  <div className="mt-5 space-y-4 border-l-2 border-ink/75 pl-4 text-base leading-[1.76] text-charcoal">
                    <p>Different venues. Same last-minute chaos.</p>
                    <p>
                      A collection of moments from event work, productions, and the less visible parts of making things happen.
                    </p>
                  </div>

                  {/* Documentary Stage Rigging Photographic Plate */}
                  <div className="exhibition-v2-photo-window mt-6 h-36 w-full">
                    <img
                      src="/exhibition/chapter-05-bts.webp"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="exhibition-v2-photo-img object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="mt-7 border-t border-rule pt-5">
                  <Link
                    href="/archive/behind-the-scenes"
                    className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:bg-charcoal"
                  >
                    <span>Explore Behind the Scenes</span>
                    <span>↗</span>
                  </Link>
                </div>
              </motion.div>

              {/* Right 8 cols: 35mm Documentary Contact-Sheet Sequence */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.12}
                className="flex flex-col justify-between lg:col-span-8"
              >
                <div className="grid gap-5 md:grid-cols-3">
                  {/* Frame 01 */}
                  <article className="exhibition-v2-plaque group flex flex-col justify-between border border-ink/20 p-5 transition-transform duration-300 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between border-b border-rule pb-2.5">
                        <span className="archival-mono text-[10px] font-semibold text-ink">
                          FRAME 05.A
                        </span>
                        <span className="archival-mono border border-rule bg-paper px-2 py-0.5 text-[10px] text-charcoal">
                          VENUE FLOOR
                        </span>
                      </div>
                      <div className="exhibition-v2-photo-window mt-3.5 h-24 w-full">
                        <img
                          src="/exhibition/chapter-05-bts.webp"
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="exhibition-v2-photo-img object-left"
                        />
                      </div>
                      <div className="exhibition-v2-frame-mat my-3.5 border border-rule bg-paper/70 p-4">
                        <p className="archival-mono text-[10px] text-ember">
                          CALL SHEET // PRE-DOORS
                        </p>
                        <p className="editorial-serif mt-1.5 text-lg text-ink">
                          Live Event & Stage Coordination
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-graphite">
                          Audio-visual checks, floor markings, cable runs, and timing adjustments in the hours before an audience enters the room.
                        </p>
                      </div>
                    </div>
                    <p className="archival-mono border-t border-rule pt-2.5 text-[10px] text-muted">
                      STATUS: ARCHIVAL CONTACT SHEET RECORD
                    </p>
                  </article>

                  {/* Frame 02 */}
                  <article className="exhibition-v2-plaque group flex flex-col justify-between border border-ink/20 p-5 transition-transform duration-300 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between border-b border-rule pb-2.5">
                        <span className="archival-mono text-[10px] font-semibold text-ink">
                          FRAME 05.B
                        </span>
                        <span className="archival-mono border border-rule bg-paper px-2 py-0.5 text-[10px] text-charcoal">
                          SET ENVIRONMENT
                        </span>
                      </div>
                      <div className="exhibition-v2-photo-window mt-3.5 h-24 w-full">
                        <img
                          src="/exhibition/chapter-05-bts.webp"
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="exhibition-v2-photo-img object-center"
                        />
                      </div>
                      <div className="exhibition-v2-frame-mat my-3.5 border border-rule bg-paper/70 p-4">
                        <p className="archival-mono text-[10px] text-ember">
                          PRODUCTION LOG // SET
                        </p>
                        <p className="editorial-serif mt-1.5 text-lg text-ink">
                          Music-Video & Visual Production
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-graphite">
                          Lighting resets, camera blocking, and long takes where three minutes of finished footage require a full day of coordination on set.
                        </p>
                      </div>
                    </div>
                    <p className="archival-mono border-t border-rule pt-2.5 text-[10px] text-muted">
                      ROLE: ON-SET PRODUCTION SUPPORT
                    </p>
                  </article>

                  {/* Frame 03 */}
                  <article className="exhibition-v2-plaque group flex flex-col justify-between border border-ink/20 p-5 transition-transform duration-300 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between border-b border-rule pb-2.5">
                        <span className="archival-mono text-[10px] font-semibold text-ink">
                          FRAME 05.C
                        </span>
                        <span className="archival-mono border border-rule bg-paper px-2 py-0.5 text-[10px] text-charcoal">
                          BACKSTAGE
                        </span>
                      </div>
                      <div className="exhibition-v2-photo-window mt-3.5 h-24 w-full">
                        <img
                          src="/exhibition/chapter-05-bts.webp"
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="exhibition-v2-photo-img object-right"
                        />
                      </div>
                      <div className="exhibition-v2-frame-mat my-3.5 border border-rule bg-paper/70 p-4">
                        <p className="archival-mono text-[10px] text-ember">OPERATIONS // CUES</p>
                        <p className="editorial-serif mt-1.5 text-lg text-ink">
                          Cue Sheets & Real-Time Problem Solving
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-graphite">
                          Observing how live environments depend on quiet preparation, clear communication under pressure, and unglamorous logistics.
                        </p>
                      </div>
                    </div>
                    <p className="archival-mono border-t border-rule pt-2.5 text-[10px] text-muted">
                      COLLECTION: /ARCHIVE/BEHIND-THE-SCENES
                    </p>
                  </article>
                </div>

                {/* Archival Note Strip */}
                <div className="exhibition-v2-plaque mt-5 flex flex-wrap items-center justify-between gap-4 border border-ink/20 px-5 py-4 text-xs text-graphite">
                  <span>
                    Documentary negatives and event photographs are catalogued by venue, production type, and field notes inside the full collection.
                  </span>
                  <Link
                    href="/archive/behind-the-scenes"
                    className="archival-mono text-[11px] font-semibold text-ink underline underline-offset-4"
                  >
                    OPEN ARCHIVE →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-7 flex w-full max-w-[1400px] items-center justify-between border-t border-ink/20 pt-3.5 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(3)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              ← PREV: 04 / CHAINSTOX LAB
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 05 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(5)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              NEXT: 06 / ELSEWHERE →
            </button>
          </div>
        </section>

        {/* =================================================================
            CHAPTER 06 — ELSEWHERE
        ================================================================= */}
        <section
          id="chapter-06"
          data-chapter-panel
          className="relative flex min-h-[calc(100vh-59px)] w-full shrink-0 flex-col justify-between overflow-hidden border-b border-rule/80 bg-paper/85 px-5 py-9 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-transparent"
        >
          {/* Mobile Atmospheric Photographic Backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
            <img
              src="/exhibition/chapter-06-elsewhere.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-32"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-ivory/80 to-paper/95" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 pb-3.5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink" />
                <span className="archival-mono text-xs font-semibold text-ink">
                  06 / 07 — FIELD NOTES
                </span>
              </div>
              <span className="archival-mono text-[11px] text-muted">
                ELSEWHERE · WORK & TRAVEL, CITIES, ARCHITECTURE, MUSIC
              </span>
            </div>

            <div className="mt-7 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left 5 cols: Exact Copy + Field Journal Photographic Plate + CTA */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.04}
                className="exhibition-v2-plaque group flex flex-col justify-between border border-ink/20 p-6 md:p-8 lg:col-span-5"
              >
                <div>
                  <p className="archival-mono text-[11px] text-ember">PERSONAL FIELD JOURNAL</p>
                  <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-5xl">
                    Not everything fits into a category.
                  </h2>

                  <div className="mt-5 space-y-4 border-l-2 border-ember/70 pl-4 text-base leading-[1.76] text-charcoal">
                    <p>
                      Working in unfamiliar places, getting lost in new cities, and collecting small observations along the way.
                    </p>
                    <p>
                      Some experiences become projects. Others are simply worth remembering.
                    </p>
                  </div>

                  {/* Coastal Boardwalk Field Journal Photograph */}
                  <div className="exhibition-v2-photo-window mt-6 h-36 w-full">
                    <img
                      src="/exhibition/chapter-06-elsewhere.webp"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="exhibition-v2-photo-img object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="mt-7 border-t border-rule pt-5">
                  <Link
                    href="/archive/elsewhere"
                    className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:bg-charcoal"
                  >
                    <span>Explore the Archive</span>
                    <span>↗</span>
                  </Link>
                </div>
              </motion.div>

              {/* Right 7 cols: Asymmetric Field Journal Spread */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.12}
                className="grid gap-5 sm:grid-cols-2 lg:col-span-7"
              >
                {/* Entry 1: Atlantic City Work & Travel */}
                <article className="exhibition-v2-plaque group border-2 border-ink p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                    <span className="archival-mono text-[10px] font-semibold text-ember">
                      FIELD NOTE 01 · WORK & TRAVEL
                    </span>
                    <span className="archival-mono border border-rule bg-paper px-2.5 py-0.5 text-[10px] text-muted">
                      ATLANTIC CITY, NEW JERSEY · UNITED STATES
                    </span>
                  </div>

                  <div className="mt-4 grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                    <div>
                      <h3 className="editorial-serif text-2xl text-ink md:text-3xl">
                        Atlantic City Work & Travel
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-charcoal">
                        A summer working abroad in the United States—boardwalk shifts, unfamiliar schedules, and the quiet independence that comes from navigating daily work far from home.
                      </p>
                    </div>
                    <div className="exhibition-v2-photo-window h-28 w-full">
                      <img
                        src="/exhibition/chapter-06-elsewhere.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="exhibition-v2-photo-img object-right-bottom"
                      />
                    </div>
                  </div>
                </article>

                {/* Entry 2: Cities & Urban Observations */}
                <article className="exhibition-v2-plaque flex flex-col justify-between border border-ink/20 p-6 transition-transform duration-300 hover:-translate-y-0.5">
                  <div>
                    <div className="flex items-center justify-between border-b border-rule pb-2.5">
                      <span className="archival-mono text-[10px] text-muted">FIELD NOTE 02</span>
                      <span className="archival-mono border border-rule bg-paper px-2 py-0.5 text-[10px] text-charcoal">
                        CITIES & STREETS
                      </span>
                    </div>
                    <h3 className="editorial-serif mt-3.5 text-xl text-ink md:text-2xl">
                      Architecture & Urban Observations
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-graphite">
                      Walking through New York, Kuala Lumpur, and Seoul—paying attention to transit grids, building density, and how cities organize everyday life.
                    </p>
                  </div>
                </article>

                {/* Entry 3: Music & Classical Guitar */}
                <article className="exhibition-v2-plaque flex flex-col justify-between border border-ink/20 p-6 transition-transform duration-300 hover:-translate-y-0.5">
                  <div>
                    <div className="flex items-center justify-between border-b border-rule pb-2.5">
                      <span className="archival-mono text-[10px] text-muted">FIELD NOTE 03</span>
                      <span className="archival-mono border border-rule bg-paper px-2 py-0.5 text-[10px] text-charcoal">
                        PRACTICE
                      </span>
                    </div>
                    <h3 className="editorial-serif mt-3.5 text-xl text-ink md:text-2xl">
                      Music & Classical Guitar
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-graphite">
                      The slow, unhurried discipline of classical guitar practice—repeating phrasing and fingerings away from screens and market tickers.
                    </p>
                  </div>
                </article>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-7 flex w-full max-w-[1400px] items-center justify-between border-t border-ink/20 pt-3.5 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(4)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              ← PREV: 05 / BEHIND THE SCENES
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 06 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(6)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              NEXT: 07 / CLOSING →
            </button>
          </div>
        </section>

        {/* =================================================================
            CHAPTER 07 — CLOSING & FINAL EXHIBITION INDEX
        ================================================================= */}
        <section
          id="chapter-07"
          data-chapter-panel
          className="relative flex min-h-[calc(100vh-59px)] w-full shrink-0 flex-col justify-between overflow-hidden bg-ivory/85 px-5 py-9 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:bg-transparent"
        >
          {/* Mobile Atmospheric Photographic Backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
            <img
              src="/exhibition/chapter-07-closing.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-32"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/75 to-ivory/95" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 pb-3.5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ember" />
                <span className="archival-mono text-xs font-semibold text-ink">
                  07 / 07 — END OF EXHIBITION
                </span>
              </div>
              <span className="archival-mono text-[11px] text-muted">
                CATALOGUE COLOPHON & COMPLETE DIRECTORY
              </span>
            </div>

            <div className="mt-7 grid gap-9 lg:mt-9 lg:grid-cols-12 lg:items-stretch">
              {/* Left 5 cols: Closing Statement + Contemplative Gallery Enfilade Photograph */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.04}
                className="exhibition-v2-plaque group flex flex-col justify-between border border-ink/20 p-6 md:p-8 lg:col-span-5"
              >
                <div>
                  <p className="archival-mono text-[11px] text-ember">CLOSING SPREAD</p>
                  <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-5xl">
                    That&apos;s the exhibition. For now.
                  </h2>

                  <div className="mt-5 space-y-4 border-l-2 border-ink/80 pl-5 text-base leading-[1.76] text-charcoal md:text-lg">
                    <p>Still learning, still building, and still figuring things out.</p>
                    <p>Thanks for looking around.</p>
                  </div>

                  {/* Contemplative Gallery Enfilade Photographic Plate */}
                  <div className="exhibition-v2-photo-window mt-6 h-40 w-full">
                    <img
                      src="/exhibition/chapter-07-closing.webp"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="exhibition-v2-photo-img object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory/55 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="mt-7 border-t border-rule pt-5">
                  <button
                    type="button"
                    onClick={() => scrollToChapter(0)}
                    className="archival-mono border border-ink bg-ivory px-4 py-2.5 text-xs font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-ivory"
                  >
                    ↺ Return to Chapter 01
                  </button>
                </div>
              </motion.div>

              {/* Right 7 cols: Museum Catalogue Final Exhibition Index */}
              <motion.div
                variants={roomReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.12}
                className="exhibition-v2-plaque grid gap-8 border-2 border-ink p-6 md:grid-cols-2 md:p-8 lg:col-span-7"
              >
                {/* EXPLORE Column */}
                <div>
                  <p className="archival-mono border-b border-ink/20 pb-3 text-xs font-semibold text-ink">
                    EXPLORE
                  </p>
                  <ul className="mt-4 divide-y divide-rule">
                    <li className="py-3.5">
                      <Link
                        href="/research"
                        className="group flex items-baseline justify-between gap-3 transition-transform duration-200 hover:translate-x-1"
                      >
                        <div>
                          <span className="editorial-serif text-2xl text-ink group-hover:underline">
                            Research
                          </span>
                          <p className="mt-1 text-xs leading-relaxed text-graphite">
                            What I&apos;m trying to understand — Semiconductors, Markets, Macro, and Case Studies.
                          </p>
                        </div>
                        <span className="archival-mono text-xs text-muted group-hover:text-ink">
                          →
                        </span>
                      </Link>
                    </li>
                    <li className="py-3.5">
                      <Link
                        href="/archive"
                        className="group flex items-baseline justify-between gap-3 transition-transform duration-200 hover:translate-x-1"
                      >
                        <div>
                          <span className="editorial-serif text-2xl text-ink group-hover:underline">
                            Archive
                          </span>
                          <p className="mt-1 text-xs leading-relaxed text-graphite">
                            How I got here — Education, 2024 Campus Election, Behind the Scenes, and Elsewhere.
                          </p>
                        </div>
                        <span className="archival-mono text-xs text-muted group-hover:text-ink">
                          →
                        </span>
                      </Link>
                    </li>
                    <li className="py-3.5">
                      <Link
                        href="/lab"
                        className="group flex items-baseline justify-between gap-3 transition-transform duration-200 hover:translate-x-1"
                      >
                        <div>
                          <span className="editorial-serif text-2xl text-ink group-hover:underline">
                            Chainstox Lab
                          </span>
                          <p className="mt-1 text-xs leading-relaxed text-graphite">
                            Independent research systems, analytical models, and working experiments.
                          </p>
                        </div>
                        <span className="archival-mono text-xs text-muted group-hover:text-ink">
                          ↗
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* ELSEWHERE Column */}
                <div>
                  <p className="archival-mono border-b border-ink/20 pb-3 text-xs font-semibold text-ink">
                    ELSEWHERE
                  </p>
                  <ul className="mt-4 divide-y divide-rule">
                    <li className="py-3">
                      <Link
                        href="/thoughts"
                        className="group flex items-center justify-between transition-transform duration-200 hover:translate-x-1"
                      >
                        <div>
                          <span className="editorial-serif text-xl text-ink group-hover:underline">
                            Thoughts
                          </span>
                          <span className="ml-2 text-xs text-graphite">
                            Essays, ideas & reflections
                          </span>
                        </div>
                        <span className="archival-mono text-xs text-muted">→</span>
                      </Link>
                    </li>
                    <li className="py-3">
                      <Link
                        href="/now"
                        className="group flex items-center justify-between transition-transform duration-200 hover:translate-x-1"
                      >
                        <div>
                          <span className="editorial-serif text-xl text-ink group-hover:underline">
                            Now
                          </span>
                          <span className="ml-2 text-xs text-graphite">
                            Current focus & reading
                          </span>
                        </div>
                        <span className="archival-mono text-xs text-muted">→</span>
                      </Link>
                    </li>
                    <li className="py-3">
                      <Link
                        href="/journey"
                        className="group flex items-center justify-between transition-transform duration-200 hover:translate-x-1"
                      >
                        <div>
                          <span className="editorial-serif text-xl text-ink group-hover:underline">
                            Journey
                          </span>
                          <span className="ml-2 text-xs text-graphite">
                            Chronological milestones
                          </span>
                        </div>
                        <span className="archival-mono text-xs text-muted">→</span>
                      </Link>
                    </li>
                    <li className="py-3">
                      <Link
                        href="/contact"
                        className="group flex items-center justify-between transition-transform duration-200 hover:translate-x-1"
                      >
                        <div>
                          <span className="editorial-serif text-xl text-ink group-hover:underline">
                            Contact
                          </span>
                          <span className="ml-2 text-xs text-graphite">Get in touch</span>
                        </div>
                        <span className="archival-mono text-xs text-muted">→</span>
                      </Link>
                    </li>
                    <li className="py-3">
                      <a
                        href={VERIFIED_DESTINATIONS.githubProfile}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between transition-transform duration-200 hover:translate-x-1"
                      >
                        <div>
                          <span className="editorial-serif text-xl text-ink group-hover:underline">
                            GitHub
                          </span>
                          <span className="ml-2 text-xs text-graphite">@alvinlgh23</span>
                        </div>
                        <span className="archival-mono text-xs text-muted">↗</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-7 flex w-full max-w-[1400px] items-center justify-between border-t border-ink/20 pt-3.5 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(5)}
              className="archival-mono inline-flex items-center gap-2 border border-transparent px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-rule hover:bg-ivory"
            >
              ← PREV: 06 / ELSEWHERE
            </button>
            <span className="archival-mono text-[10px]">
              ALVIN LIM — A PERSONAL ARCHIVE · CHAPTER 07 OF 07
            </span>
          </div>
        </section>
      </div>

      {/* Desktop Chapter Progress Rail at Bottom */}
      <div
        className={`relative z-20 hidden border-t px-10 py-2.5 transition-colors duration-300 lg:block ${
          isNocturnalDominant
            ? "border-white/15 bg-lab/95 text-bone backdrop-blur-md"
            : "border-rule bg-paper/95 text-ink backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <div className="flex items-center gap-1.5">
            {CHAPTERS.map((chap, idx) => {
              const isCurrent = idx === activeChapter;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => scrollToChapter(idx)}
                  className={`archival-mono px-2.5 py-1 text-[10px] transition-all duration-200 ${
                    isCurrent
                      ? isNocturnalDominant
                        ? "bg-bone text-ink font-semibold shadow-sm"
                        : "bg-ink text-ivory font-semibold shadow-sm"
                      : isNocturnalDominant
                        ? "text-bone/50 hover:bg-white/5 hover:text-bone"
                        : "text-muted hover:bg-ivory hover:text-ink"
                  }`}
                >
                  0{chap.index} · {chap.label}
                </button>
              );
            })}
          </div>
          <span
            className={`archival-mono text-[10px] ${
              isNocturnalDominant ? "text-bone/45" : "text-muted"
            }`}
          >
            SCROLL OR USE ← → KEYS TO NAVIGATE CHAPTERS
          </span>
        </div>
      </div>
    </div>
  );
}
