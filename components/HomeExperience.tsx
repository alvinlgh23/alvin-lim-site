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

const LAB_SYSTEMS = [
  ["Market Valuation Engine", "Macro · sector strength · overheat", "/lab/projects/market-valuation-engine"],
  ["On-Chain Market Intelligence", "Four-layer regime pipeline", "/lab/projects/on-chain-market-intelligence"],
  ["SGD-NEER Shadow Model", "Trade-weighted FX proxy", "/lab/projects/sgd-neer-shadow-model"],
  ["KOSPI Signal Monitor", "Semiconductors · FX · volatility", "/lab/projects/kospi-signal-monitor"],
  ["Phone Cycle Timing Engine", "Second-hand depreciation scenarios", "/lab/projects/phone-cycle-timing-engine"]
] as const;

const PATH_STAGES = [
  ["Law", "Universiti Kebangsaan Malaysia"],
  ["Economics", "Universiti Malaya"],
  ["A campus election", "November 2024"],
  ["Research", "Now"]
] as const;

const BACKSTAGE_RECORDS = [
  ["Before doors", "Live event & stage coordination"],
  ["On set", "Music-video & visual production"],
  ["Backstage", "Cue sheets & real-time problem solving"]
] as const;

const DIRECTORY = [
  ["Research", "What I'm trying to understand", "/research"],
  ["Archive", "How I got here", "/archive"],
  ["Chainstox Lab", "Working systems and experiments", "/lab"],
  ["Thoughts", "Short essays and notes", "/thoughts"],
  ["Now", "What I'm focused on", "/now"],
  ["Journey", "When things happened", "/journey"],
  ["Contact", "Get in touch", "/contact"]
] as const;

type RoomProps = {
  chapter: (typeof CHAPTERS)[number];
  dark?: boolean;
  exhibitFirst?: boolean;
  wall: React.ReactNode;
  exhibit: React.ReactNode;
};

/* One room: a wall text and a single exhibit. Nothing else. */
function Room({ chapter, dark = false, exhibitFirst = false, wall, exhibit }: RoomProps) {
  return (
    <section
      id={chapter.id}
      data-chapter-panel
      aria-label={chapter.label}
      className={`relative flex min-h-[calc(100svh-59px)] w-full shrink-0 scroll-mt-[59px] overflow-hidden border-b px-6 py-16 md:px-12 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:bg-transparent lg:px-16 lg:py-8 ${
        dark ? "border-white/15 bg-lab text-bone" : "border-rule/80 bg-ivory text-ink"
      }`}
    >
      {/* Mobile atmosphere (desktop uses the shared cross-dissolving stage) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
        <img
          src={chapter.photo}
          alt=""
          loading={chapter.index === 1 ? "eager" : "lazy"}
          decoding="async"
          className={`h-full w-full object-cover ${dark ? "opacity-40" : "opacity-20"}`}
        />
        <div className={`absolute inset-0 ${dark ? "bg-lab/80" : "bg-ivory/85"}`} />
      </div>

      <div className="relative z-10 m-auto grid w-full max-w-[1180px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
        <motion.div
          variants={roomReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.04}
          className={`lg:col-span-5 ${exhibitFirst ? "lg:order-2" : ""}`}
        >
          <p className={`archival-mono text-xs ${dark ? "text-moss" : "text-ember"}`}>
            {chapter.code.slice(0, 2)} — {chapter.label}
          </p>
          {wall}
        </motion.div>

        <motion.div
          variants={roomReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.16}
          className={`lg:col-span-7 ${exhibitFirst ? "lg:order-1" : ""}`}
        >
          {exhibit}
        </motion.div>
      </div>
    </section>
  );
}

/* A framed piece hung on the wall, with a small label underneath. */
function Frame({
  dark = false,
  label,
  children
}: {
  dark?: boolean;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0">
      <div
        className={`border p-7 md:p-10 xl:p-12 ${
          dark
            ? "border-bone/20 bg-[#121414] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
            : "border-ink/15 bg-ivory shadow-[0_40px_70px_-45px_rgba(17,17,16,0.45)]"
        }`}
      >
        {children}
      </div>
      <figcaption
        className={`mt-5 max-w-[46ch] text-sm leading-relaxed ${
          dark ? "text-bone/60" : "text-graphite"
        }`}
      >
        {label}
      </figcaption>
    </figure>
  );
}

function WallHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="editorial-serif mt-5 text-4xl font-normal leading-[1.05] md:text-5xl xl:text-[3.5rem]">
      {children}
    </h2>
  );
}

function WallCopy({ dark = false, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`mt-6 max-w-[40ch] space-y-4 text-base leading-[1.75] md:text-lg ${
        dark ? "text-bone/75" : "text-charcoal"
      }`}
    >
      {children}
    </div>
  );
}

function WallLink({
  href,
  dark = false,
  children
}: {
  href: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group mt-8 inline-flex items-center gap-3 border-b pb-1.5 text-sm font-medium tracking-[0.04em] transition-colors ${
        dark ? "border-bone/50 text-bone hover:border-bone" : "border-ink/50 text-ink hover:border-ink"
      }`}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
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
        className={`sticky top-[57px] z-30 h-[2px] w-full overflow-hidden transition-colors duration-300 lg:static ${
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
        {/* 01 — ENTRANCE WALL */}
        <Room
          chapter={CHAPTERS[0]}
          wall={
            <>
              <h1 className="editorial-serif mt-5 text-6xl font-normal leading-[0.98] tracking-[-0.022em] md:text-7xl xl:text-[5.5rem]">
                Hi, I&apos;m Alvin.
              </h1>
              <WallCopy>
                <p>I&apos;m an economics student at Universiti Malaya.</p>
                <p>
                  I spend much of my time exploring financial markets, technology, and the questions that connect them.
                </p>
                <p>
                  This is a small collection of things I&apos;ve worked on, places I&apos;ve been, and interests I&apos;ve followed along the way.
                </p>
              </WallCopy>
              <button
                type="button"
                onClick={() => scrollToChapter(1)}
                className="group mt-9 inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal"
              >
                <span>Enter the exhibition</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </>
          }
          exhibit={
            <Frame label="Alvin Lim — Kuala Lumpur. Seven rooms, in order.">
              <blockquote className="editorial-serif m-0 text-3xl italic leading-[1.3] text-ink md:text-4xl xl:text-[2.75rem]">
                “A curiosity about how things work — and how they could work better.”
              </blockquote>
            </Frame>
          }
        />

        {/* 02 — EDUCATION & DIRECTION */}
        <Room
          chapter={CHAPTERS[1]}
          exhibitFirst
          wall={
            <>
              <WallHeading>A different way of understanding systems.</WallHeading>
              <WallCopy>
                <p>
                  I first studied law, hoping to work on public policy and how resources could be better allocated. It turned out to be quite different from what I had imagined.
                </p>
                <p>
                  So I transferred to economics — and later, a campus election changed how I thought about politics too.
                </p>
              </WallCopy>
              <WallLink href="/archive/education">From law to economics</WallLink>
            </>
          }
          exhibit={
            <Frame
              label={
                <>
                  The path so far, in four stages. The third has{" "}
                  <Link href="/archive/campus-election" className="underline underline-offset-4 hover:text-ink">
                    its own record
                  </Link>
                  .
                </>
              }
            >
              <ol className="m-0 grid list-none gap-7 p-0 sm:grid-cols-4 sm:gap-0">
                {PATH_STAGES.map(([title, place], idx) => {
                  const isCurrent = idx === PATH_STAGES.length - 1;
                  return (
                    <li key={title} className="relative sm:pr-4">
                      <div className="flex items-center">
                        <span
                          aria-hidden="true"
                          className={`h-3 w-3 shrink-0 rounded-full border ${
                            isCurrent ? "border-ember bg-ember" : "border-ink bg-ivory"
                          }`}
                        />
                        <span
                          aria-hidden="true"
                          className={`ml-2 hidden h-px flex-1 sm:block ${
                            isCurrent ? "bg-transparent" : "bg-ink/30"
                          }`}
                        />
                      </div>
                      <p className="editorial-serif mt-4 text-2xl leading-tight text-ink">{title}</p>
                      <p className="mt-1.5 text-sm leading-snug text-graphite">{place}</p>
                    </li>
                  );
                })}
              </ol>
            </Frame>
          }
        />

        {/* 03 — SELECTED RESEARCH */}
        <Room
          chapter={CHAPTERS[2]}
          wall={
            <>
              <WallHeading>Questions worth testing.</WallHeading>
              <WallCopy>
                <p>
                  Some questions begin with a technology. Others begin with a market price that doesn&apos;t quite make sense.
                </p>
                <p>I explore them through research, data, and small systems built to test ideas.</p>
              </WallCopy>
              <WallLink href="/research">Open the research collection</WallLink>
            </>
          }
          exhibit={
            <Frame
              label={
                <>
                  <Link href="/research/sgd-neer" className="editorial-serif text-base italic text-ink underline-offset-4 hover:underline">
                    SGD-NEER Shadow Model
                  </Link>{" "}
                  — an independent attempt to trace Singapore&apos;s exchange-rate policy band. Sketch, not official data.
                </>
              }
            >
              <svg viewBox="0 0 440 190" className="block h-auto w-full" fill="none" role="img" aria-label="A line moving inside a rising policy band">
                <path d="M0 42 L440 18 L440 148 L0 172 Z" fill="#B8592A" fillOpacity="0.06" />
                <line x1="0" y1="42" x2="440" y2="18" stroke="#7D7A72" strokeDasharray="4 5" strokeWidth="1" />
                <line x1="0" y1="107" x2="440" y2="83" stroke="#111110" strokeOpacity="0.55" strokeWidth="1" />
                <line x1="0" y1="172" x2="440" y2="148" stroke="#7D7A72" strokeDasharray="4 5" strokeWidth="1" />
                <path
                  d="M0 128 C 40 118, 62 84, 104 92 S 168 132, 214 104 S 286 52, 330 66 S 404 96, 440 58"
                  stroke="#B8592A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="440" cy="58" r="4" fill="#B8592A" />
              </svg>
            </Frame>
          }
        />

        {/* 04 — CHAINSTOX LAB (THE DARK ROOM) */}
        <Room
          chapter={CHAPTERS[3]}
          dark
          exhibitFirst
          wall={
            <>
              <WallHeading>Chainstox Lab.</WallHeading>
              <WallCopy dark>
                <p>An independent space for exploring markets through research, data, and code.</p>
                <p>A place where research questions become working experiments, models, and tools.</p>
              </WallCopy>
              <WallLink href={VERIFIED_DESTINATIONS.chainstoxLab} dark>
                Enter the lab
              </WallLink>
            </>
          }
          exhibit={
            <Frame dark label="Five working systems. Each one opens.">
              <ul className="m-0 list-none divide-y divide-bone/12 p-0">
                {LAB_SYSTEMS.map(([name, spec, href]) => (
                  <li key={name} className="py-4 first:pt-0 last:pb-0">
                    <Link
                      href={href}
                      className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <span className="editorial-serif text-xl text-bone transition-colors group-hover:text-moss md:text-2xl">
                        {name}
                      </span>
                      <span className="text-sm text-bone/50">{spec}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Frame>
          }
        />

        {/* 05 — BEHIND THE SCENES */}
        <Room
          chapter={CHAPTERS[4]}
          wall={
            <>
              <WallHeading>Before the lights come on.</WallHeading>
              <WallCopy>
                <p>Different venues. Same last-minute chaos.</p>
                <p>
                  Moments from event work, productions, and the less visible parts of making things happen.
                </p>
              </WallCopy>
              <WallLink href="/archive/behind-the-scenes">Go behind the scenes</WallLink>
            </>
          }
          exhibit={
            <Frame label="A call sheet, of sorts — three kinds of work that happen before an audience arrives.">
              <ol className="m-0 list-none divide-y divide-ink/12 p-0">
                {BACKSTAGE_RECORDS.map(([when, what]) => (
                  <li key={when} className="grid gap-1 py-5 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6">
                    <span className="archival-mono text-xs text-ember">{when}</span>
                    <span className="editorial-serif text-2xl leading-snug text-ink md:text-[1.75rem]">
                      {what}
                    </span>
                  </li>
                ))}
              </ol>
            </Frame>
          }
        />

        {/* 06 — ELSEWHERE */}
        <Room
          chapter={CHAPTERS[5]}
          exhibitFirst
          wall={
            <>
              <WallHeading>Not everything fits into a category.</WallHeading>
              <WallCopy>
                <p>
                  Working in unfamiliar places, getting lost in new cities, and collecting small observations along the way.
                </p>
                <p>Some experiences become projects. Others are simply worth remembering.</p>
              </WallCopy>
              <WallLink href="/archive/elsewhere">Open the field journal</WallLink>
            </>
          }
          exhibit={
            <Frame label="Atlantic City, New Jersey — a summer of Work & Travel. Also in this room: cities and streets, and classical guitar.">
              <blockquote className="editorial-serif m-0 text-3xl italic leading-[1.32] text-ink md:text-4xl">
                “Boardwalk lights, practical problems, and the kind of learning that does not ask for permission first.”
              </blockquote>
            </Frame>
          }
        />

        {/* 07 — EXIT */}
        <Room
          chapter={CHAPTERS[6]}
          wall={
            <>
              <WallHeading>That&apos;s the exhibition. For now.</WallHeading>
              <WallCopy>
                <p>Still learning, still building, and still figuring things out.</p>
                <p>Thanks for looking around.</p>
              </WallCopy>
              <button
                type="button"
                onClick={() => scrollToChapter(0)}
                className="group mt-8 inline-flex items-center gap-3 border-b border-ink/50 pb-1.5 text-sm font-medium tracking-[0.04em] text-ink transition-colors hover:border-ink"
              >
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                <span>Back to the entrance</span>
              </button>
            </>
          }
          exhibit={
            <nav aria-label="Where to go next">
              <ul className="m-0 grid list-none gap-x-12 p-0 sm:grid-cols-2">
                {DIRECTORY.map(([name, note, href]) => (
                  <li key={name} className="border-t border-ink/15">
                    <Link href={href} className="group block py-4">
                      <span className="editorial-serif text-2xl text-ink underline-offset-4 group-hover:underline md:text-[1.75rem]">
                        {name}
                      </span>
                      <span className="mt-0.5 block text-sm text-graphite">{note}</span>
                    </Link>
                  </li>
                ))}
                <li className="border-t border-ink/15">
                  <a
                    href={VERIFIED_DESTINATIONS.githubProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="group block py-4"
                  >
                    <span className="editorial-serif text-2xl text-ink underline-offset-4 group-hover:underline md:text-[1.75rem]">
                      GitHub
                    </span>
                    <span className="mt-0.5 block text-sm text-graphite">@alvinlgh23 ↗</span>
                  </a>
                </li>
              </ul>
            </nav>
          }
        />
      </div>

      {/* Desktop room rail */}
      <div
        className={`relative z-20 hidden border-t px-10 py-2.5 transition-colors duration-300 lg:block ${
          isNocturnalDominant
            ? "border-white/15 bg-lab/95 text-bone backdrop-blur-md"
            : "border-rule bg-paper/95 text-ink backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-1">
            {CHAPTERS.map((chap, idx) => {
              const isCurrent = idx === activeChapter;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => scrollToChapter(idx)}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`Room ${chap.index}: ${chap.label}`}
                  className={`archival-mono whitespace-nowrap px-2.5 py-1 text-[11px] transition-all duration-200 ${
                    isCurrent
                      ? isNocturnalDominant
                        ? "bg-bone font-semibold text-ink"
                        : "bg-ink font-semibold text-ivory"
                      : isNocturnalDominant
                        ? "text-bone/50 hover:bg-white/5 hover:text-bone"
                        : "text-muted hover:bg-ivory hover:text-ink"
                  }`}
                >
                  0{chap.index}
                  {isCurrent ? <span> · {chap.label}</span> : null}
                </button>
              );
            })}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => scrollToChapter(activeChapter - 1)}
              disabled={activeChapter === 0}
              aria-label="Previous room"
              className="px-3 py-1 text-base transition-opacity hover:opacity-60 disabled:opacity-25"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollToChapter(activeChapter + 1)}
              disabled={activeChapter === CHAPTERS.length - 1}
              aria-label="Next room"
              className="px-3 py-1 text-base transition-opacity hover:opacity-60 disabled:opacity-25"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
