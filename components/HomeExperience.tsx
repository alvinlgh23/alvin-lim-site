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
    label: "THE ARTIST",
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

/* Entering the exhibition: the entrance wall rushes past, then the first room settles into view. */
const doorVariants = {
  closed: { scale: 1, opacity: 1 },
  leaving: {
    scale: 1.02,
    opacity: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 1, 1] as const }
  },
  arriving: {
    scale: [1.015, 1],
    opacity: [0, 1],
    transition: { duration: 1.2, delay: 0.35, ease: museumEase }
  },
  open: { scale: 1, opacity: 1 }
};

/* The doorway: the whole screen dims to black, holds a beat, then the gallery lights come up. */
const doorwayVariants = {
  closed: { opacity: 0 },
  leaving: { opacity: 1, transition: { duration: 0.7, ease: [0.4, 0, 1, 1] as const } },
  arriving: { opacity: 0, transition: { duration: 1.3, delay: 0.25, ease: museumEase } },
  open: { opacity: 0 }
};

const roomReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: museumEase }
  })
};

/* Document position from layout (offsetTop), so an in-flight transform cannot skew it. */
function layoutTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/* Zoom around the middle of what is on screen, not the middle of a tall mobile column. */
function viewportOrigin(track: HTMLElement | null) {
  if (!track || window.innerWidth >= 1024) return "50% 45%";
  const y = window.scrollY + window.innerHeight * 0.45 - layoutTop(track);
  return `50% ${Math.max(0, y).toFixed(0)}px`;
}

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
  ["Law", "Universiti Kebangsaan Malaysia", "2022"],
  ["Economics", "Universiti Malaya", "2023"],
  ["A campus election", "Universiti Malaya", "2024"],
  ["Research", "Independent", "Now"]
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

/* The entrance placard: four lines a recruiter can read in thirty seconds. */
const PLACARD_FACTS: [string, string][] = [
  ["Study", "Economics, Universiti Malaya · 2028"],
  ["Build", "Market models in Python & SQL"],
  ["Campus", "Student election candidate · UMFA investment competition"],
  ["Speak", "English, Malay, Chinese, basic Korean"]
];

type RoomProps = {
  chapter: (typeof CHAPTERS)[number];
  dark?: boolean;
  lab?: boolean;
  exhibitFirst?: boolean;
  wall: React.ReactNode;
  exhibit: React.ReactNode;
};

/* One room: a wall text and a single exhibit. Nothing else. */
function Room({ chapter, dark = false, lab = false, exhibitFirst = false, wall, exhibit }: RoomProps) {
  return (
    <section
      id={chapter.id}
      data-chapter-panel
      aria-label={chapter.label}
      className={`relative flex min-h-[calc(100svh-59px)] w-full shrink-0 scroll-mt-[59px] overflow-hidden border-b px-6 ${chapter.index === 1 ? "py-16 [@media(max-height:720px)]:py-8" : "py-16"} md:px-12 md:py-16 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:bg-transparent lg:px-16 lg:py-8 ${
        lab
          ? "border-white/15 bg-lab text-bone"
          : dark
            ? "border-transparent bg-transparent text-bone"
            : "border-ink/10 bg-white text-ink"
      }`}
    >
      <div className={`relative z-10 m-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-16 ${chapter.index === 1 ? "md:max-lg:max-w-[600px]" : ""}`}>
        <motion.div
          variants={roomReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.04}
          className={`lg:col-span-6 ${exhibitFirst ? "lg:order-2" : ""}`}
        >
          <p className={`archival-mono text-xs ${lab ? "text-moss" : "text-ember"}`}>
            {chapter.code.slice(0, 2)} — {chapter.label}
          </p>
          {wall}
        </motion.div>

        <motion.div
          variants={roomReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.32}
          className={`lg:col-span-6 ${exhibitFirst ? "lg:order-1" : ""}`}
        >
          {exhibit}
        </motion.div>
      </div>
    </section>
  );
}

/* A framed piece hung on the wall, with a museum wall label beside it. */
function Frame({
  dark = false,
  photo = false,
  label,
  children
}: {
  dark?: boolean;
  photo?: boolean;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className={`m-0 ${photo ? "mx-auto w-full lg:w-fit" : ""}`}>
      <div
        className={`${photo ? "p-3 md:p-4" : "p-8 md:p-12 xl:p-14"} ${
          dark
            ? "border border-white/20 bg-[#0F0F10] shadow-[0_30px_50px_-24px_rgba(0,0,0,0.95)]"
            : "border-2 border-[#151515] bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_28px_44px_-22px_rgba(0,0,0,0.55),0_70px_90px_-60px_rgba(0,0,0,0.4)]"
        }`}
      >
        {children}
      </div>
      <figcaption
        className={`ml-auto mt-8 w-fit max-w-[36ch] px-4 py-3 text-[13px] leading-relaxed ${
          dark
            ? "border border-white/10 bg-[#0F0F10] text-bone/65 shadow-[0_8px_16px_-10px_rgba(0,0,0,0.9)]"
            : "bg-white text-graphite shadow-[0_1px_2px_rgba(17,17,16,0.1),0_8px_16px_-10px_rgba(17,17,16,0.3)]"
        }`}
      >
        {label}
      </figcaption>
    </figure>
  );
}

function WallHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="editorial-serif mt-5 text-5xl font-normal leading-[1] tracking-[-0.025em] md:text-6xl xl:text-[4.75rem]">
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
  // The entrance is a threshold: rooms 02–07 do not exist until the visitor enters.
  const [entered, setEntered] = useState(false);
  const pendingEnter = useRef(false);
  // closed → leaving (walk toward the wall) → arriving (room 02 comes into focus) → open
  const [doorPhase, setDoorPhase] = useState<"closed" | "leaving" | "arriving" | "open">("closed");
  const [doorOrigin, setDoorOrigin] = useState("50% 45%");
  // Below 1024px the rooms stack vertically and the gallery light stays fixed while they scroll past
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const update = () => setStacked(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollToChapter = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(CHAPTERS.length - 1, index));
      if (!entered && clamped > 0) return;
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
    [prefersReducedMotion, entered]
  );

  const enterExhibition = useCallback(() => {
    if (entered) {
      scrollToChapter(1);
      return;
    }
    if (doorPhase !== "closed") return;
    if (prefersReducedMotion) {
      pendingEnter.current = true;
      setEntered(true);
      return;
    }
    setDoorOrigin(viewportOrigin(trackRef.current));
    setDoorPhase("leaving");
  }, [entered, doorPhase, prefersReducedMotion, scrollToChapter]);

  const handleDoorAnimationComplete = useCallback((phase: unknown) => {
    if (phase === "leaving") {
      pendingEnter.current = true;
      setEntered(true);
    } else if (phase === "arriving") {
      setDoorPhase("open");
    }
  }, []);

  // At the entrance the page does not scroll: the only way on is through the door.
  // Only locked when the entrance fits the screen, so a very short phone can still reach the button.
  useEffect(() => {
    if (entered) return;
    const html = document.documentElement;
    const previous = { overflow: html.style.overflow, overscroll: html.style.overscrollBehavior };
    const apply = () => {
      html.style.overflow = "";
      const fits = html.scrollHeight <= window.innerHeight + 2;
      html.style.overflow = fits ? "hidden" : "";
      html.style.overscrollBehavior = fits ? "none" : "";
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      html.style.overflow = previous.overflow;
      html.style.overscrollBehavior = previous.overscroll;
    };
  }, [entered]);

  // Once the rooms are mounted, stand the visitor in room 02 and let it come into focus
  useEffect(() => {
    if (!entered || !pendingEnter.current) return;
    pendingEnter.current = false;

    const track = trackRef.current;
    const target = document.getElementById(CHAPTERS[1].id);
    if (target) {
      if (window.innerWidth >= 1024 && track) {
        track.scrollTo({ left: target.offsetLeft, behavior: "instant" });
      } else {
        const header = document.querySelector("header");
        window.scrollTo({
          top: layoutTop(target) - (header?.getBoundingClientRect().height ?? 0),
          behavior: "instant"
        });
      }
    }
    setDoorOrigin(viewportOrigin(track));
    setActiveChapter(1);
    setContinuousIndex(1);
    setDoorPhase(prefersReducedMotion ? "open" : "arriving");
  }, [entered, prefersReducedMotion]);

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

  // Touch tablets in landscape get the horizontal gallery too; an up/down swipe walks between rooms
  const activeChapterRef = useRef(activeChapter);
  activeChapterRef.current = activeChapter;
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !entered) return;
    let start: { x: number; y: number; panel: HTMLElement | null; scrollTop: number } | null = null;

    const onStart = (event: TouchEvent) => {
      if (window.innerWidth < 1024 || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const panel = (event.target as HTMLElement | null)?.closest("[data-chapter-panel]") as HTMLElement | null;
      start = { x: touch.clientX, y: touch.clientY, panel, scrollTop: panel?.scrollTop ?? 0 };
    };

    const onEnd = (event: TouchEvent) => {
      if (!start || window.innerWidth < 1024) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      const { panel, scrollTop } = start;
      start = null;
      if (Math.abs(dy) < 60 || Math.abs(dy) < Math.abs(dx) * 1.3) return;
      // A room with its own scrolling content keeps the swipe until it reaches its top or bottom
      if (panel && panel.scrollHeight > panel.clientHeight + 4) {
        const moved = panel.scrollTop !== scrollTop;
        const atEdge =
          dy < 0
            ? panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2
            : panel.scrollTop <= 0;
        if (moved || !atEdge) return;
      }
      scrollToChapter(activeChapterRef.current + (dy < 0 ? 1 : -1));
    };

    track.addEventListener("touchstart", onStart, { passive: true });
    track.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      track.removeEventListener("touchstart", onStart);
      track.removeEventListener("touchend", onEnd);
    };
  }, [entered, scrollToChapter]);

  // Keyboard navigation on desktop (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (!entered) {
        if (event.key === "Enter" && tag !== "A" && tag !== "BUTTON") {
          event.preventDefault();
          enterExhibition();
        }
        return;
      }

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
  }, [activeChapter, scrollToChapter, entered, enterExhibition]);

  const currentChapterMeta = CHAPTERS[activeChapter] || CHAPTERS[0];

  // Special Chapter 03 -> Chapter 04 -> Chapter 05 nocturnal darkness interpolation (peaks at index 3.0)
  const darkProximity = Math.max(0, 1 - Math.abs(continuousIndex - 3));
  const nocturnalAlpha = smoothstep(0.08, 0.92, darkProximity);
  const isNocturnalDominant = stacked ? activeChapter === 3 : nocturnalAlpha > 0.52;

  // 0 at the entrance, 1 once inside the gallery
  const insideAlpha = smoothstep(0, 1, Math.min(1, continuousIndex));
  const isDarkChrome = stacked ? entered && activeChapter >= 1 : insideAlpha > 0.5 || isNocturnalDominant;
  // Stacked: room 01 and the lab paint their own walls, so the stage is simply the dark gallery once inside
  const stageInside = stacked ? (entered ? 1 : 0) : insideAlpha;
  const stageNocturnal = stacked ? 0 : nocturnalAlpha;
  // The light sits over the exhibit: left in rooms 02/04/06, right in the others, gliding between
  const exhibitSide = (roomIdx: number) => (roomIdx % 2 === 1 ? 27 : 73);
  const lowerRoom = Math.floor(continuousIndex);
  const roomBlend = smoothstep(0, 1, continuousIndex - lowerRoom);
  const spotlightX =
    exhibitSide(lowerRoom) + (exhibitSide(Math.min(CHAPTERS.length - 1, lowerRoom + 1)) - exhibitSide(lowerRoom)) * roomBlend;
  const overallProgress = Math.max(
    (activeChapter + 1) / CHAPTERS.length,
    (continuousIndex + 1) / CHAPTERS.length
  );

  return (
    <div className="exhibition-v2-shell relative min-h-screen bg-white text-ink lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
      <GlobalNav
        variant={isDarkChrome ? "dark" : "light"}
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
          isDarkChrome ? "bg-white/10" : "bg-rule/70"
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

      {/* Gallery architecture.
          The entrance is a flat, bright white wall. Past the threshold the gallery is dimmer:
          a grey wall, a floor, and a soft light that follows whichever side the exhibit hangs on.
          Around room 04 the gallery darkens into the lab and lightens again after. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 top-[59px] z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white" />

        <div
          className="absolute inset-0 bg-[#141415]"
          style={{
            opacity: stageInside,
            transition: doorPhase === "arriving" ? "opacity 900ms ease" : undefined
          }}
        >
          {/* Wall wash: brightest just under the ceiling slot, falling off toward the floor */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.12) 16%, rgba(255,255,255,0.03) 34%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.16) 83%)"
            }}
          />
          {/* A faint pool of light on the exhibit */}
          <div
            className="absolute inset-0"
            style={{
              background: stacked
                ? "radial-gradient(ellipse 75% 38% at 50% 34%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0) 75%)"
                : `radial-gradient(ellipse 34% 62% at ${spotlightX.toFixed(1)}% 36%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.1) 42%, rgba(255,255,255,0) 74%)`
            }}
          />
          {/* Corners fall into shadow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 85% at 50% 42%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.26) 100%)"
            }}
          />
          {/* Ceiling slot: light leaking out of the gap between wall and ceiling */}
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background: "rgba(255,255,255,1)",
              boxShadow:
                "0 0 10px 2px rgba(255,255,255,0.95), 0 0 34px 8px rgba(255,255,255,0.6), 0 0 120px 34px rgba(255,255,255,0.3)"
            }}
          />
          {/* Floor: the wall simply falls into shadow toward the bottom, no lit line across the exhibits */}
          <div
            className="absolute inset-x-0 bottom-0 h-[14%] lg:h-[22%]"
            style={{ background: "linear-gradient(180deg, rgba(6,6,7,0) 0%, rgba(6,6,7,0.55) 60%, rgba(6,6,7,0.8) 100%)" }}
          />
        </div>

        <div className="absolute inset-0 bg-lab" style={{ opacity: stageNocturnal }}>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 40% 60% at ${spotlightX.toFixed(1)}% 38%, rgba(236,228,215,0.13) 0%, rgba(236,228,215,0) 70%)`
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(180deg,rgba(5,5,6,0)_0%,rgba(5,5,6,0.85)_100%)]" />
        </div>
      </div>

      {/* Horizontal Exhibition Track on Desktop / Vertical Stack on Mobile */}
      <motion.div
        ref={trackRef}
        variants={doorVariants}
        initial={false}
        animate={doorPhase}
        onAnimationComplete={handleDoorAnimationComplete}
        style={{ transformOrigin: doorOrigin }}
        className={`exhibition-track relative z-10 flex-1 lg:flex lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:overflow-y-hidden ${
          doorPhase === "leaving" ? "pointer-events-none" : ""
        }`}
      >
        {/* 01 — ENTRANCE WALL */}
        <Room
          chapter={CHAPTERS[0]}
          wall={
            <>
              {/* The artist's placard: who he is in thirty seconds, then the CV, then the way in. */}
              <div className="mt-5 flex items-center gap-4 md:mt-7 md:items-end md:gap-7">
                {/* Phones: a small portrait beside the name; the framed portrait hangs on the right on desktop */}
                <img
                  src="/photos/portrait/alvin.webp"
                  alt=""
                  aria-hidden="true"
                  width={1260}
                  height={1408}
                  decoding="async"
                  className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-ink/15 min-[400px]:h-16 min-[400px]:w-16 md:h-44 md:w-36 md:rounded-none md:border-2 md:border-[#151515] md:bg-white md:p-1.5 md:shadow-[0_18px_30px_-18px_rgba(0,0,0,0.5)] md:ring-0 lg:hidden"
                  style={{ objectPosition: "48% 29%" }}
                />
                <div>
                  <h1 className="editorial-serif text-[2.75rem] font-normal leading-[0.95] tracking-[-0.035em] min-[400px]:text-[3.25rem] md:text-7xl xl:text-[6.5rem]">
                    Alvin Lim
                  </h1>
                  <p className="mt-1.5 flex items-baseline gap-3 text-sm text-graphite md:mt-3 md:text-base">
                    <span lang="zh-Hans" className="font-cjk-serif text-base text-ink md:text-xl">
                      林宜弘
                    </span>
                    <span className="archival-mono text-[11px] tracking-[0.12em] text-muted md:text-xs">LIM GI HONG</span>
                  </p>
                </div>
              </div>

              <p className="editorial-serif mt-5 max-w-[24ch] text-[1.3rem] leading-[1.3] tracking-[-0.01em] text-charcoal min-[400px]:text-[1.45rem] md:mt-8 md:text-[2rem]">
                I study economics and build my own tools for reading markets.
              </p>

              <dl className="mt-5 max-w-[46ch] border-t border-ink/15 text-[13px] leading-snug md:mt-8 md:text-[15px]">
                {PLACARD_FACTS.map(([term, detail]) => (
                  <div key={term} className="grid grid-cols-[4.25rem_1fr] gap-3 border-b border-ink/10 py-2 md:grid-cols-[5.5rem_1fr] md:py-2.5">
                    <dt className="archival-mono pt-px text-[10.5px] uppercase tracking-[0.14em] text-ember md:text-[11px]">{term}</dt>
                    <dd className="text-charcoal">{detail}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 grid grid-cols-[1.4fr_1fr_1fr] gap-1.5 sm:flex sm:flex-wrap sm:gap-2 md:mt-7">
                <a
                  href="/cv/Alvin-Lim-CV.pdf"
                  download="Alvin-Lim-CV.pdf"
                  className="group inline-flex items-center justify-center gap-2 border border-ink px-3 py-2.5 sm:px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-ivory"
                >
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                  <span className="whitespace-nowrap"><span className="max-[399px]:hidden">Download </span>CV</span>
                </a>
                <a
                  href={VERIFIED_DESTINATIONS.linkedinProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center border border-ink/20 px-3 py-2.5 sm:px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${VERIFIED_DESTINATIONS.email}`}
                  className="inline-flex items-center justify-center border border-ink/20 px-3 py-2.5 sm:px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
                >
                  Email
                </a>
              </div>

              <button
                type="button"
                onClick={enterExhibition}
                className="group mt-4 inline-flex w-full items-center justify-between gap-3 bg-ink px-6 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal sm:w-auto sm:justify-start md:mt-5"
              >
                <span>Enter the exhibition</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </>
          }
          exhibit={
            <div className="hidden lg:block">
              <Frame
                photo
                label={
                  <>
                    <span className="editorial-serif text-base italic text-ink">
                      “A curiosity about how things work — and how they could work better.”
                    </span>
                    <span className="mt-1 block">Alvin Lim, Kuala Lumpur.</span>
                  </>
                }
              >
                <img
                  src="/photos/portrait/alvin.webp"
                  alt="Alvin in a white T-shirt and lanyard, smiling and making peace signs with both hands in a lecture hall"
                  width={1260}
                  height={1408}
                  decoding="async"
                  fetchPriority="high"
                  className="block h-auto w-full lg:h-[min(56vh,520px)] lg:w-auto"
                />
              </Frame>
            </div>
          }
        />

        {entered ? (
          <>
        {/* 02 — EDUCATION & DIRECTION */}
        <Room
          chapter={CHAPTERS[1]}
          dark
          exhibitFirst
          wall={
            <>
              <WallHeading>A different way of understanding systems.</WallHeading>
              <WallCopy dark>
                <p>
                  I first studied law, hoping to work on public policy and how resources could be better allocated. It turned out to be quite different from what I had imagined.
                </p>
                <p>
                  So I transferred to economics — and later, a campus election changed how I thought about politics too.
                </p>
              </WallCopy>
              <WallLink href="/archive/education" dark>From law to economics</WallLink>
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
              <ol className="m-0 grid list-none gap-7 p-0 sm:grid-cols-4 sm:gap-0 lg:grid-cols-2 lg:gap-y-9 2xl:grid-cols-4 2xl:gap-y-0">
                {PATH_STAGES.map(([title, place, when], idx) => {
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
                          } ${idx % 2 === 1 ? "lg:max-2xl:bg-transparent" : ""}`}
                        />
                      </div>
                      <p className="editorial-serif mt-4 text-2xl leading-tight text-ink">{title}</p>
                      <p className="mt-1.5 text-sm leading-snug text-graphite">{place}</p>
                      <p className="archival-mono mt-2 text-xs text-ember">{when}</p>
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
          dark
          wall={
            <>
              <WallHeading>Questions worth testing.</WallHeading>
              <WallCopy dark>
                <p>
                  Some questions begin with a technology. Others begin with a market price that doesn&apos;t quite make sense.
                </p>
                <p>I explore them through research, data, and small systems built to test ideas.</p>
              </WallCopy>
              <WallLink href="/research" dark>Open the research collection</WallLink>
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
                <path d="M0 42 L440 18 L440 148 L0 172 Z" fill="#E63600" fillOpacity="0.06" />
                <line x1="0" y1="42" x2="440" y2="18" stroke="#767676" strokeDasharray="4 5" strokeWidth="1" />
                <line x1="0" y1="107" x2="440" y2="83" stroke="#0A0A0A" strokeOpacity="0.55" strokeWidth="1" />
                <line x1="0" y1="172" x2="440" y2="148" stroke="#767676" strokeDasharray="4 5" strokeWidth="1" />
                <path
                  d="M0 128 C 40 118, 62 84, 104 92 S 168 132, 214 104 S 286 52, 330 66 S 404 96, 440 58"
                  stroke="#E63600"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="440" cy="58" r="4" fill="#E63600" />
              </svg>
            </Frame>
          }
        />

        {/* 04 — CHAINSTOX LAB (THE DARK ROOM) */}
        <Room
          chapter={CHAPTERS[3]}
          dark
          lab
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
          dark
          wall={
            <>
              <WallHeading>Before the lights come on.</WallHeading>
              <WallCopy dark>
                <p>Different venues. Same last-minute chaos.</p>
                <p>
                  Moments from event work, productions, and the less visible parts of making things happen.
                </p>
              </WallCopy>
              <WallLink href="/archive/behind-the-scenes" dark>Go behind the scenes</WallLink>
            </>
          }
          exhibit={
            <Frame
              photo
              label="Hours before doors open: the rig is lit, the chairs are still stacked, and the crew is still on stage."
            >
              <img
                src="/photos/behind-the-scenes/pre-show-stage.webp"
                alt="An empty concert floor before doors: stacked black chairs in the foreground, lighting beams across a lit stage behind"
                width={1260}
                height={945}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full lg:w-[min(44vw,640px)]"
              />
            </Frame>
          }
        />

        {/* 06 — ELSEWHERE */}
        <Room
          chapter={CHAPTERS[5]}
          dark
          exhibitFirst
          wall={
            <>
              <WallHeading>Not everything fits into a category.</WallHeading>
              <WallCopy dark>
                <p>
                  Working in unfamiliar places, getting lost in new cities, and collecting small observations along the way.
                </p>
                <p>Some experiences become projects. Others are simply worth remembering.</p>
              </WallCopy>
              <WallLink href="/archive/elsewhere" dark>Open the field journal</WallLink>
            </>
          }
          exhibit={
            <Frame
              photo
              label="Board Wok, Atlantic City, New Jersey — Work & Travel, summer 2026."
            >
              <img
                src="/photos/atlantic-city/board-wok.webp"
                alt="Alvin in a chef's jacket and red apron in front of the Board Wok counter in Atlantic City"
                width={900}
                height={1600}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full lg:h-[min(58vh,540px)] lg:w-auto"
              />
            </Frame>
          }
        />

        {/* 07 — EXIT */}
        <Room
          chapter={CHAPTERS[6]}
          dark
          wall={
            <>
              <WallHeading>That&apos;s the exhibition. For now.</WallHeading>
              <WallCopy dark>
                <p>Still learning, still building, and still figuring things out.</p>
                <p>Thanks for looking around.</p>
              </WallCopy>
              <button
                type="button"
                onClick={() => scrollToChapter(0)}
                className="group mt-8 inline-flex items-center gap-3 border-b border-bone/50 pb-1.5 text-sm font-medium tracking-[0.04em] text-bone transition-colors hover:border-bone"
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
                  <li key={name} className="border-t border-white/15">
                    <Link href={href} className="group block py-4">
                      <span className="editorial-serif text-2xl text-bone underline-offset-4 group-hover:underline md:text-[1.75rem]">
                        {name}
                      </span>
                      <span className="mt-0.5 block text-sm text-bone/55">{note}</span>
                    </Link>
                  </li>
                ))}
                <li className="border-t border-white/15">
                  <a
                    href={VERIFIED_DESTINATIONS.githubProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="group block py-4"
                  >
                    <span className="editorial-serif text-2xl text-bone underline-offset-4 group-hover:underline md:text-[1.75rem]">
                      GitHub
                    </span>
                    <span className="mt-0.5 block text-sm text-bone/55">@alvinlgh23 ↗</span>
                  </a>
                </li>
              </ul>
            </nav>
          }
        />
          </>
        ) : null}
      </motion.div>

      {/* Doorway: a full-screen black veil, only present while entering */}
      <motion.div
        aria-hidden="true"
        variants={doorwayVariants}
        initial={false}
        animate={doorPhase}
        className={`pointer-events-none fixed inset-0 z-[70] bg-black ${
          doorPhase === "closed" || doorPhase === "open" ? "hidden" : ""
        }`}
      />

      {/* Desktop room rail */}
      <div
        className={`relative z-20 hidden border-t px-10 py-2.5 transition-colors duration-300 ${
          entered ? "lg:block" : ""
        } ${
          isDarkChrome
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
                      ? isDarkChrome
                        ? "bg-bone font-semibold text-ink"
                        : "bg-ink font-semibold text-ivory"
                      : isDarkChrome
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
