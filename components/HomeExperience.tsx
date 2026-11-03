"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

const CHAPTERS = [
  { index: 1, code: "01 / 07", label: "INTRODUCTION", id: "chapter-01" },
  { index: 2, code: "02 / 07", label: "EDUCATION & DIRECTION", id: "chapter-02" },
  { index: 3, code: "03 / 07", label: "SELECTED RESEARCH", id: "chapter-03" },
  { index: 4, code: "04 / 07", label: "INDEPENDENT RESEARCH", id: "chapter-04" },
  { index: 5, code: "05 / 07", label: "EXPERIENCES", id: "chapter-05" },
  { index: 6, code: "06 / 07", label: "FIELD NOTES", id: "chapter-06" },
  { index: 7, code: "07 / 07", label: "END OF EXHIBITION", id: "chapter-07" }
];

export function HomeExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const scrollToChapter = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(CHAPTERS.length - 1, index));
    setActiveChapter(clamped);

    const track = trackRef.current;
    if (!track) return;

    const isDesktop = window.innerWidth >= 1024;
    const targetEl = document.getElementById(CHAPTERS[clamped].id);

    if (isDesktop && targetEl) {
      track.scrollTo({
        left: targetEl.offsetLeft,
        behavior: "smooth"
      });
    } else if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Sync active chapter on desktop horizontal scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      const scrollLeft = track.scrollLeft;
      const width = track.clientWidth || 1;
      const nextIndex = Math.round(scrollLeft / width);
      if (nextIndex >= 0 && nextIndex < CHAPTERS.length) {
        setActiveChapter(nextIndex);
      }
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync active chapter on mobile vertical scroll
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerWidth >= 1024) return;
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
      // Only translate vertical wheel if vertical delta dominates horizontal delta
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        // Check if target is inside an internally scrollable container that still has scroll room
        const target = event.target as HTMLElement | null;
        const panel = target?.closest("[data-chapter-panel]") as HTMLElement | null;
        if (panel && panel.scrollHeight > panel.clientHeight + 4) {
          const atTop = panel.scrollTop <= 0 && event.deltaY < 0;
          const atBottom =
            panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2 && event.deltaY > 0;
          if (!atTop && !atBottom) {
            return; // allow internal vertical scroll
          }
        }
        event.preventDefault();
        track.scrollBy({
          left: event.deltaY * 1.15,
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

  return (
    <div className="min-h-screen bg-ivory text-ink lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
      <GlobalNav
        variant={activeChapter === 3 ? "dark" : "light"}
        exhibitionChapter={{
          current: currentChapterMeta.index,
          total: CHAPTERS.length,
          label: currentChapterMeta.label,
          onSelectChapter: scrollToChapter
        }}
      />

      {/* Horizontal Exhibition Track on Desktop / Vertical Stack on Mobile */}
      <div
        ref={trackRef}
        className="exhibition-track flex-1 lg:flex lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:overflow-y-hidden"
      >
        {/* =================================================================
            CHAPTER 01 — INTRODUCTION
        ================================================================= */}
        <section
          id="chapter-01"
          data-chapter-panel
          className="relative flex min-h-[calc(100vh-57px)] w-full shrink-0 flex-col justify-between border-b border-rule bg-ivory px-5 py-10 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r"
        >
          <div className="mx-auto w-full max-w-[1380px]">
            {/* Top Archival Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
              <span className="archival-mono text-xs text-ink">01 / 07 — INTRODUCTION</span>
              <span className="archival-mono text-[11px] text-muted">
                EXHIBITION OPENING SPREAD · KUALA LUMPUR / UNIVERSITI MALAYA
              </span>
            </div>

            {/* Asymmetric Editorial Opening Spread */}
            <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-start">
              {/* Left Column: Large Serif Headline + Narrow Text Column + Action */}
              <div className="lg:col-span-5">
                <p className="archival-mono text-[11px] text-muted">
                  PERSONAL ARCHIVE & EXHIBITION CATALOGUE
                </p>
                <h1 className="editorial-serif mt-3 text-5xl font-normal leading-[1.03] text-ink md:text-6xl xl:text-[4.25rem]">
                  Hi, I&apos;m Alvin.
                </h1>

                <div className="mt-7 max-w-[38ch] space-y-4 text-base leading-[1.75] text-charcoal md:text-[1.06rem]">
                  <p>I&apos;m Alvin, an economics student at Universiti Malaya.</p>
                  <p>
                    I spend much of my time exploring financial markets, technology, and the questions that connect them.
                  </p>
                  <p>
                    This is a small collection of things I&apos;ve worked on, places I&apos;ve been, and interests I&apos;ve followed along the way.
                  </p>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-rule pt-6">
                  <button
                    type="button"
                    onClick={() => scrollToChapter(1)}
                    className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ivory transition hover:bg-charcoal"
                  >
                    <span>Explore the exhibition</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <Link
                    href="/research"
                    className="archival-mono border border-rule bg-paper/70 px-4 py-3 text-[11px] text-ink transition hover:border-ink"
                  >
                    Research Index
                  </Link>
                  <Link
                    href="/archive"
                    className="archival-mono border border-rule bg-paper/70 px-4 py-3 text-[11px] text-ink transition hover:border-ink"
                  >
                    Personal Archive
                  </Link>
                </div>

                {/* Three Editorial Pillars Summary */}
                <div className="mt-8 grid gap-3 border-t border-rule pt-5 sm:grid-cols-3">
                  <div>
                    <p className="archival-mono text-[10px] text-muted">PILLAR 01</p>
                    <p className="editorial-serif mt-1 text-base font-medium text-ink">Research</p>
                    <p className="mt-0.5 text-xs text-graphite">What I&apos;m trying to understand.</p>
                  </div>
                  <div>
                    <p className="archival-mono text-[10px] text-muted">PILLAR 02</p>
                    <p className="editorial-serif mt-1 text-base font-medium text-ink">Archive</p>
                    <p className="mt-0.5 text-xs text-graphite">How I got here.</p>
                  </div>
                  <div>
                    <p className="archival-mono text-[10px] text-muted">PILLAR 03</p>
                    <p className="editorial-serif mt-1 text-base font-medium text-ink">Elsewhere</p>
                    <p className="mt-0.5 text-xs text-graphite">The things in between.</p>
                  </div>
                </div>
              </div>

              {/* Center Column: Non-person Editorial Portrait Specimen Card */}
              <div className="lg:col-span-4">
                <div className="specimen-sheet specimen-grid-bg flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between border-b border-rule pb-3">
                    <span className="archival-mono text-[10px] text-muted">
                      FIG. 01.A — SUBJECT DOSSIER
                    </span>
                    <span className="archival-mono border border-rule bg-ivory px-2 py-0.5 text-[10px] text-charcoal">
                      NON-PERSON RECORD
                    </span>
                  </div>

                  {/* Typographic & Architectural Monogram Specimen (Never a stock face) */}
                  <div className="my-6 border border-rule bg-ivory p-5">
                    <div className="flex items-baseline justify-between border-b border-rule pb-3">
                      <span className="editorial-serif text-4xl italic text-ink">A. L.</span>
                      <span className="archival-mono text-[10px] text-muted">CAT. NO. AL-2026</span>
                    </div>
                    <p className="editorial-serif mt-4 text-lg italic leading-relaxed text-charcoal">
                      “A curiosity about how things work — and how they could work better.”
                    </p>
                    <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-rule pt-4 text-xs">
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

                  <p className="archival-mono text-[10px] leading-relaxed text-muted">
                    PORTRAIT AREA NOTE: Authentic personal portrait slot reserved. Displayed as an archival identity card without stock imagery.
                  </p>
                </div>
              </div>

              {/* Right Column: Secondary Environmental Study & Catalogue Notes */}
              <div className="lg:col-span-3">
                <div className="border border-rule bg-paper/55 p-5">
                  <div className="flex items-center justify-between border-b border-rule pb-2.5">
                    <span className="archival-mono text-[10px] text-muted">
                      FIG. 01.B — ENVIRONMENT
                    </span>
                    <span className="archival-mono text-[10px] text-charcoal">3.1209° N, 101.6538° E</span>
                  </div>

                  {/* Architectural Meridian / Desk Diagram */}
                  <div className="my-4 border border-rule bg-ivory p-4">
                    <svg
                      viewBox="0 0 240 160"
                      className="h-36 w-full text-ink"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect x="8" y="8" width="224" height="144" stroke="#D7D2C6" strokeWidth="1" />
                      <line x1="8" y1="44" x2="232" y2="44" stroke="#D7D2C6" strokeWidth="1" />
                      <line x1="88" y1="8" x2="88" y2="152" stroke="#D7D2C6" strokeWidth="1" />
                      <circle cx="88" cy="96" r="38" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="88" cy="96" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M126 118 L156 84 L184 96 L216 58" stroke="#B8592A" strokeWidth="1.5" />
                      <circle cx="216" cy="58" r="3" fill="#B8592A" />
                      <text x="16" y="28" fill="#55534D" fontSize="8" fontFamily="monospace">
                        OBSERVATION FIELD // KL — UM
                      </text>
                      <text x="96" y="142" fill="#7D7A72" fontSize="7" fontFamily="monospace">
                        SYSTEMS · MARKETS · ARCHIVE
                      </text>
                    </svg>
                  </div>

                  <p className="text-xs leading-relaxed text-graphite">
                    Secondary environmental plate mapping the intersection of academic economics at Universiti Malaya, independent market tooling, and personal field notes.
                  </p>

                  <div className="mt-4 border-t border-rule pt-3">
                    <p className="archival-mono text-[10px] text-muted">EXHIBITION STRUCTURE</p>
                    <p className="mt-1 text-xs text-charcoal">
                      Seven horizontal rooms on desktop · Full collection essays below.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Chapter Progress Bar */}
          <div className="mx-auto mt-8 flex w-full max-w-[1380px] items-center justify-between border-t border-rule pt-4 text-xs text-muted">
            <span className="archival-mono text-[10px]">CHAPTER 01 OF 07 · INTRODUCTION</span>
            <button
              type="button"
              onClick={() => scrollToChapter(1)}
              className="archival-mono text-[11px] text-ink hover:underline"
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
          className="relative flex min-h-[calc(100vh-57px)] w-full shrink-0 flex-col justify-between border-b border-rule bg-paper/65 px-5 py-10 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r"
        >
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
              <span className="archival-mono text-xs text-ink">
                02 / 07 — EDUCATION & DIRECTION
              </span>
              <span className="archival-mono text-[11px] text-muted">
                ACADEMIC & INTELLECTUAL TRANSITION RECORD
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-start">
              {/* Left 5 cols: Approved narrative & cross-links */}
              <div className="lg:col-span-5">
                <p className="archival-mono text-[11px] text-ember">AUTOBIOGRAPHICAL SHIFT</p>
                <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.06] text-ink md:text-5xl">
                  A different way of understanding systems.
                </h2>

                <div className="mt-6 space-y-4 text-base leading-[1.75] text-charcoal">
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

                {/* Required Related Links */}
                <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/archive/education"
                    className="group inline-flex items-center justify-between gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.1em] uppercase text-ivory transition hover:bg-charcoal"
                  >
                    <span>From Law to Economics</span>
                    <span>↗</span>
                  </Link>
                  <Link
                    href="/archive/campus-election"
                    className="group inline-flex items-center justify-between gap-3 border border-ink bg-ivory px-5 py-3 text-xs font-medium tracking-[0.1em] uppercase text-ink transition hover:bg-stone/60"
                  >
                    <span>The 2024 Campus Election</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>

              {/* Right 7 cols: Four-Stage Typographic Transition Matrix (Law -> Economics -> Political Experience -> Research) */}
              <div className="lg:col-span-7">
                <div className="border border-rule bg-ivory p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-4">
                    <span className="archival-mono text-[11px] text-ink">
                      FIG. 02.A — DIRECTIONAL SHIFT: FOUR-STAGE PROGRESSION
                    </span>
                    <span className="archival-mono text-[10px] text-muted">
                      LAW → ECONOMICS → POLITICAL EXPERIENCE → RESEARCH
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="border border-rule bg-paper/45 p-5">
                      <div className="flex items-center justify-between">
                        <span className="archival-mono text-[10px] text-muted">STAGE 01</span>
                        <span className="archival-mono text-[10px] text-charcoal">UKM</span>
                      </div>
                      <h3 className="editorial-serif mt-2 text-2xl text-ink">Law</h3>
                      <p className="mt-2 text-xs leading-relaxed text-graphite">
                        Entered Universiti Kebangsaan Malaysia hoping to work on public policy, economic development, and resource allocation—before finding legal study differed from that systems-design ambition.
                      </p>
                    </div>

                    <div className="border border-rule bg-paper/45 p-5">
                      <div className="flex items-center justify-between">
                        <span className="archival-mono text-[10px] text-muted">STAGE 02</span>
                        <span className="archival-mono text-[10px] text-charcoal">UNIVERSITI MALAYA</span>
                      </div>
                      <h3 className="editorial-serif mt-2 text-2xl text-ink">Economics</h3>
                      <p className="mt-2 text-xs leading-relaxed text-graphite">
                        Transferred to Universiti Malaya (Faculty of Business and Economics) to study incentives, markets, institutions, and how resources are allocated.
                      </p>
                    </div>

                    <div className="border border-rule bg-paper/45 p-5">
                      <div className="flex items-center justify-between">
                        <span className="archival-mono text-[10px] text-muted">STAGE 03</span>
                        <span className="archival-mono text-[10px] text-charcoal">NOV 2024 · NEWGEN</span>
                      </div>
                      <h3 className="editorial-serif mt-2 text-2xl text-ink">
                        Political Experience
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-graphite">
                        Stood as an FBE student representative candidate in the 2024 campus election. Not elected; the firsthand experience clarified why political participation was not the path I wanted to pursue.
                      </p>
                    </div>

                    <div className="border border-ink bg-ivory p-5">
                      <div className="flex items-center justify-between">
                        <span className="archival-mono text-[10px] text-ember">STAGE 04 · CURRENT</span>
                        <span className="archival-mono text-[10px] text-ink">ACTIVE FOCUS</span>
                      </div>
                      <h3 className="editorial-serif mt-2 text-2xl text-ink">Research</h3>
                      <p className="mt-2 text-xs leading-relaxed text-charcoal">
                        Concentrating on evidence-driven inquiry across financial markets, valuation, monetary frameworks, and semiconductor technology.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-4 text-xs text-muted">
                    <span className="archival-mono text-[10px]">
                      FULL FIVE-PART ESSAY IN /ARCHIVE/EDUCATION
                    </span>
                    <span className="archival-mono text-[10px]">
                      CAMPAIGN RECORD IN /ARCHIVE/CAMPUS-ELECTION
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[1380px] items-center justify-between border-t border-rule pt-4 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(0)}
              className="archival-mono text-[11px] text-ink hover:underline"
            >
              ← PREV: 01 / INTRODUCTION
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 02 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(2)}
              className="archival-mono text-[11px] text-ink hover:underline"
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
          className="relative flex min-h-[calc(100vh-57px)] w-full shrink-0 flex-col justify-between border-b border-rule bg-ivory px-5 py-10 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r"
        >
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
              <span className="archival-mono text-xs text-ink">03 / 07 — SELECTED RESEARCH</span>
              <Link
                href="/research"
                className="archival-mono text-[11px] text-ink underline underline-offset-4"
              >
                OPEN FULL RESEARCH COLLECTION →
              </Link>
            </div>

            {/* Header + Intro */}
            <div className="mt-7 grid gap-6 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
              <div>
                <p className="archival-mono text-[11px] text-muted">RESEARCH EXHIBITION WALL</p>
                <h2 className="editorial-serif mt-2 text-4xl font-normal leading-[1.05] text-ink md:text-5xl">
                  Questions worth testing.
                </h2>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-charcoal md:text-base">
                <p>
                  Some questions begin with a technology. Others begin with a market price that doesn&apos;t quite make sense.
                </p>
                <p>
                  I explore them through research, data, and small systems built to test ideas.
                </p>
              </div>
            </div>

            {/* Three Visually Distinct Research Artifacts + Secondary Research Entry */}
            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              {/* Artifact 01: Asymmetric Layered Diagnostic Sheet */}
              <article className="flex flex-col justify-between border border-ink bg-paper/75 p-6 lg:col-span-4">
                <div>
                  <div className="flex items-center justify-between border-b border-rule pb-3">
                    <span className="archival-mono text-[10px] text-ember">
                      ARTIFACT 01 · MARKETS / VALUATION
                    </span>
                    <span className="archival-mono text-[10px] text-muted">FIG. 03.1</span>
                  </div>
                  <h3 className="editorial-serif mt-4 text-2xl text-ink md:text-3xl">
                    Market Valuation Engine
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal">
                    Exploring market conditions, valuation, and the signals that shape risk and expectations.
                  </p>

                  {/* Analytical Layer Diagram */}
                  <div className="mt-5 space-y-1.5 border border-rule bg-ivory p-3.5 font-mono text-[11px]">
                    <div className="flex justify-between border-b border-rule pb-1">
                      <span className="text-muted">L1 // LIQUIDITY</span>
                      <span className="text-ink">10Y · DXY · VIX</span>
                    </div>
                    <div className="flex justify-between border-b border-rule pb-1">
                      <span className="text-muted">L2 // ROTATION</span>
                      <span className="text-ink">SECTOR RS vs SPY</span>
                    </div>
                    <div className="flex justify-between border-b border-rule pb-1">
                      <span className="text-muted">L3 // VALUATION</span>
                      <span className="text-ink">FWD PE EXPANSION</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">L4 // POSITIONING</span>
                      <span className="text-ember">OVERHEAT / CHASE RISK</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-rule pt-4">
                  <Link
                    href="/research/market-valuation"
                    className="archival-mono inline-flex items-center gap-2 text-xs font-semibold text-ink hover:underline"
                  >
                    <span>Inspect Case Study</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>

              {/* Artifact 02: Dark-Accent Ontology Matrix Specimen */}
              <article className="flex flex-col justify-between border border-rule bg-ivory p-6 lg:col-span-4">
                <div>
                  <div className="flex items-center justify-between border-b border-rule pb-3">
                    <span className="archival-mono text-[10px] text-ink">
                      ARTIFACT 02 · CRYPTO / MARKET STRUCTURE
                    </span>
                    <span className="archival-mono text-[10px] text-muted">FIG. 03.2</span>
                  </div>
                  <h3 className="editorial-serif mt-4 text-2xl text-ink md:text-3xl">
                    On-Chain Market Intelligence
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal">
                    Investigating liquidity, capital flows, and market structure through on-chain data.
                  </p>

                  {/* 4-Vote Structural Matrix */}
                  <div className="mt-5 grid grid-cols-2 gap-2 border border-rule bg-paper/60 p-3.5 font-mono text-[10px]">
                    <div className="border border-rule bg-ivory p-2">
                      <p className="text-muted">COHORT P/L</p>
                      <p className="mt-1 text-ink">SOPR · RHODL</p>
                    </div>
                    <div className="border border-rule bg-ivory p-2">
                      <p className="text-muted">VENUE FLOW</p>
                      <p className="mt-1 text-ink">EXCHANGE NET</p>
                    </div>
                    <div className="border border-rule bg-ivory p-2">
                      <p className="text-muted">ROTATION</p>
                      <p className="mt-1 text-ink">LTH / STH SUPPLY</p>
                    </div>
                    <div className="border border-rule bg-ivory p-2">
                      <p className="text-muted">ONTOLOGY</p>
                      <p className="mt-1 text-ink">7-STATE REGIME</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-rule pt-4">
                  <Link
                    href="/research/onchain-intelligence"
                    className="archival-mono inline-flex items-center gap-2 text-xs font-semibold text-ink hover:underline"
                  >
                    <span>Inspect Case Study</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>

              {/* Artifact 03 + Secondary Semiconductor Entry Stacked */}
              <div className="flex flex-col gap-6 lg:col-span-4">
                <article className="flex flex-1 flex-col justify-between border border-rule bg-paper/45 p-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-rule pb-2.5">
                      <span className="archival-mono text-[10px] text-ink">
                        ARTIFACT 03 · MACRO / EXCHANGE RATES
                      </span>
                      <span className="archival-mono text-[10px] text-muted">FIG. 03.3</span>
                    </div>
                    <h3 className="editorial-serif mt-3 text-2xl text-ink">
                      SGD-NEER Shadow Model
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal">
                      An independent attempt to understand Singapore&apos;s exchange-rate-based monetary framework.
                    </p>

                    {/* Policy Band Corridor SVG */}
                    <div className="mt-4 border border-rule bg-ivory px-3 py-2">
                      <svg
                        viewBox="0 0 220 52"
                        className="h-11 w-full"
                        fill="none"
                        aria-hidden="true"
                      >
                        <line x1="0" y1="10" x2="220" y2="6" stroke="#7D7A72" strokeDasharray="3 3" strokeWidth="1" />
                        <line x1="0" y1="28" x2="220" y2="24" stroke="#111110" strokeWidth="1" />
                        <line x1="0" y1="46" x2="220" y2="42" stroke="#7D7A72" strokeDasharray="3 3" strokeWidth="1" />
                        <path
                          d="M0 32 Q 45 18, 90 25 T 165 15 T 220 20"
                          stroke="#B8592A"
                          strokeWidth="1.75"
                          fill="none"
                        />
                      </svg>
                      <p className="archival-mono text-[9px] text-muted">
                        INDEPENDENT TRADE-WEIGHTED PROXY CORRIDOR (NON-MAS)
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-rule pt-3">
                    <Link
                      href="/research/sgd-neer"
                      className="archival-mono inline-flex items-center gap-2 text-xs font-semibold text-ink hover:underline"
                    >
                      <span>Inspect Case Study</span>
                      <span>→</span>
                    </Link>
                  </div>
                </article>

                {/* Secondary Research Entry: Semiconductor Research */}
                <article className="border border-rule bg-ivory p-5">
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
                      className="archival-mono shrink-0 text-[11px] text-ink underline underline-offset-4"
                    >
                      Open Dossier →
                    </Link>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-graphite">
                    From mobile SoC evolution to chip architecture and semiconductor industry economics.
                  </p>
                </article>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[1380px] items-center justify-between border-t border-rule pt-4 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(1)}
              className="archival-mono text-[11px] text-ink hover:underline"
            >
              ← PREV: 02 / EDUCATION & DIRECTION
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 03 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(3)}
              className="archival-mono text-[11px] text-ink hover:underline"
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
          className="dark-specimen-grid-bg relative flex min-h-[calc(100vh-57px)] w-full shrink-0 flex-col justify-between border-b border-white/15 bg-lab px-5 py-10 text-bone md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r"
        >
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
              <span className="archival-mono text-xs text-bone">
                04 / 07 — INDEPENDENT RESEARCH
              </span>
              <span className="archival-mono text-[11px] text-bone/50">
                CHAINSTOX LAB · RESEARCH INFRASTRUCTURE & WORKING EXPERIMENTS
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:items-center">
              {/* Left 5 cols: Dramatic Dark Editorial Copy */}
              <div className="lg:col-span-5">
                <p className="archival-mono text-[11px] text-moss">
                  CHAPTER 04 // WORKING RESEARCH SPACE
                </p>
                <h2 className="editorial-serif mt-3 text-5xl font-normal leading-[1.03] text-bone md:text-6xl">
                  Chainstox Lab.
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-bone/90 md:text-xl">
                  An independent space for exploring markets through research, data, and code.
                </p>
                <p className="mt-4 text-base leading-relaxed text-bone/65">
                  A place where research questions become working experiments, analytical models, and tools.
                </p>

                <div className="mt-9 flex flex-wrap gap-4 border-t border-white/15 pt-6">
                  <Link
                    href={VERIFIED_DESTINATIONS.chainstoxLab}
                    className="group inline-flex items-center gap-3 bg-bone px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-ink transition hover:bg-white"
                  >
                    <span>Explore Chainstox Lab</span>
                    <span>↗</span>
                  </Link>
                  <Link
                    href="/lab/projects/market-valuation-engine"
                    className="archival-mono border border-white/20 bg-white/[0.03] px-4 py-3 text-[11px] text-bone transition hover:border-bone/50"
                  >
                    Embedded Console
                  </Link>
                </div>
              </div>

              {/* Right 7 cols: Technical Annotations & System Registry Table */}
              <div className="lg:col-span-7">
                <div className="border border-white/15 bg-lab-surface p-6 md:p-8">
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
                        className="grid items-center gap-3 py-3.5 transition hover:bg-white/[0.03] sm:grid-cols-[0.18fr_0.42fr_0.4fr]"
                      >
                        <span className="text-bone/45">{code}</span>
                        <span className="font-sans font-medium text-bone">{name}</span>
                        <span className="text-right text-[11px] text-bone/60">{spec} ↗</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 border-t border-white/12 pt-5 sm:grid-cols-3">
                    <div className="border border-white/10 bg-black/30 p-3">
                      <p className="archival-mono text-[9px] text-bone/45">PRINCIPLE 01</p>
                      <p className="mt-1 text-xs text-bone/85">Regimes over isolated predictions</p>
                    </div>
                    <div className="border border-white/10 bg-black/30 p-3">
                      <p className="archival-mono text-[9px] text-bone/45">PRINCIPLE 02</p>
                      <p className="mt-1 text-xs text-bone/85">Transparent proxy boundaries</p>
                    </div>
                    <div className="border border-white/10 bg-black/30 p-3">
                      <p className="archival-mono text-[9px] text-bone/45">PRINCIPLE 03</p>
                      <p className="mt-1 text-xs text-bone/85">Explicit source & signal coverage</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[1380px] items-center justify-between border-t border-white/15 pt-4 text-xs text-bone/55">
            <button
              type="button"
              onClick={() => scrollToChapter(2)}
              className="archival-mono text-[11px] text-bone hover:underline"
            >
              ← PREV: 03 / SELECTED RESEARCH
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 04 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(4)}
              className="archival-mono text-[11px] text-bone hover:underline"
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
          className="relative flex min-h-[calc(100vh-57px)] w-full shrink-0 flex-col justify-between border-b border-rule bg-ivory px-5 py-10 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r"
        >
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
              <span className="archival-mono text-xs text-ink">05 / 07 — EXPERIENCES</span>
              <span className="archival-mono text-[11px] text-muted">
                DOCUMENTARY SEQUENCE · PRODUCTION & EVENT LOGS
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-start">
              {/* Left 4 cols: Approved Copy + CTA */}
              <div className="lg:col-span-4">
                <p className="archival-mono text-[11px] text-muted">BEHIND THE SCENES</p>
                <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.06] text-ink md:text-5xl">
                  Before the lights come on.
                </h2>

                <div className="mt-6 space-y-4 text-base leading-[1.75] text-charcoal">
                  <p>Different venues. Same last-minute chaos.</p>
                  <p>
                    A collection of moments from event work, productions, and the less visible parts of making things happen.
                  </p>
                </div>

                <div className="mt-8 border-t border-rule pt-6">
                  <Link
                    href="/archive/behind-the-scenes"
                    className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ivory transition hover:bg-charcoal"
                  >
                    <span>Explore Behind the Scenes</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>

              {/* Right 8 cols: Documentary Contact-Sheet Sequence (No giant gray boxes) */}
              <div className="lg:col-span-8">
                <div className="grid gap-5 md:grid-cols-3">
                  {/* Frame 01 */}
                  <article className="flex flex-col justify-between border border-rule bg-paper/65 p-5">
                    <div>
                      <div className="flex items-center justify-between border-b border-rule pb-2.5">
                        <span className="archival-mono text-[10px] text-muted">FRAME 05.A</span>
                        <span className="archival-mono text-[10px] text-charcoal">VENUE FLOOR</span>
                      </div>
                      <div className="my-4 border border-rule bg-ivory p-4">
                        <p className="archival-mono text-[10px] text-ember">CALL SHEET // PRE-DOORS</p>
                        <p className="editorial-serif mt-2 text-lg text-ink">
                          Live Event & Stage Coordination
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-graphite">
                          Audio-visual checks, floor markings, cable runs, and timing adjustments in the hours before an audience enters the room.
                        </p>
                      </div>
                    </div>
                    <p className="archival-mono text-[10px] text-muted">
                      STATUS: ARCHIVAL CONTACT SHEET RECORD
                    </p>
                  </article>

                  {/* Frame 02 */}
                  <article className="flex flex-col justify-between border border-rule bg-paper/65 p-5">
                    <div>
                      <div className="flex items-center justify-between border-b border-rule pb-2.5">
                        <span className="archival-mono text-[10px] text-muted">FRAME 05.B</span>
                        <span className="archival-mono text-[10px] text-charcoal">SET ENVIRONMENT</span>
                      </div>
                      <div className="my-4 border border-rule bg-ivory p-4">
                        <p className="archival-mono text-[10px] text-ember">PRODUCTION LOG // SET</p>
                        <p className="editorial-serif mt-2 text-lg text-ink">
                          Music-Video & Visual Production
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-graphite">
                          Lighting resets, camera blocking, and long takes where three minutes of finished footage require a full day of coordination on set.
                        </p>
                      </div>
                    </div>
                    <p className="archival-mono text-[10px] text-muted">
                      ROLE: ON-SET PRODUCTION SUPPORT
                    </p>
                  </article>

                  {/* Frame 03 */}
                  <article className="flex flex-col justify-between border border-rule bg-paper/65 p-5">
                    <div>
                      <div className="flex items-center justify-between border-b border-rule pb-2.5">
                        <span className="archival-mono text-[10px] text-muted">FRAME 05.C</span>
                        <span className="archival-mono text-[10px] text-charcoal">BACKSTAGE</span>
                      </div>
                      <div className="my-4 border border-rule bg-ivory p-4">
                        <p className="archival-mono text-[10px] text-ember">OPERATIONS // CUES</p>
                        <p className="editorial-serif mt-2 text-lg text-ink">
                          Cue Sheets & Real-Time Problem Solving
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-graphite">
                          Observing how live environments depend on quiet preparation, clear communication under pressure, and unglamorous logistics.
                        </p>
                      </div>
                    </div>
                    <p className="archival-mono text-[10px] text-muted">
                      COLLECTION: /ARCHIVE/BEHIND-THE-SCENES
                    </p>
                  </article>
                </div>

                {/* Archival Note Strip */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-rule bg-paper/40 px-5 py-3.5 text-xs text-graphite">
                  <span>
                    Documentary negatives and event photographs are catalogued by venue, production type, and field notes inside the full collection.
                  </span>
                  <Link
                    href="/archive/behind-the-scenes"
                    className="archival-mono text-[11px] text-ink underline underline-offset-4"
                  >
                    OPEN ARCHIVE →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[1380px] items-center justify-between border-t border-rule pt-4 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(3)}
              className="archival-mono text-[11px] text-ink hover:underline"
            >
              ← PREV: 04 / CHAINSTOX LAB
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 05 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(5)}
              className="archival-mono text-[11px] text-ink hover:underline"
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
          className="relative flex min-h-[calc(100vh-57px)] w-full shrink-0 flex-col justify-between border-b border-rule bg-paper/55 px-5 py-10 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto lg:border-b-0 lg:border-r"
        >
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
              <span className="archival-mono text-xs text-ink">06 / 07 — FIELD NOTES</span>
              <span className="archival-mono text-[11px] text-muted">
                ELSEWHERE · WORK & TRAVEL, CITIES, ARCHITECTURE, MUSIC
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-start">
              {/* Left 5 cols: Exact Copy + CTA */}
              <div className="lg:col-span-5">
                <p className="archival-mono text-[11px] text-ember">PERSONAL FIELD JOURNAL</p>
                <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.06] text-ink md:text-5xl">
                  Not everything fits into a category.
                </h2>

                <div className="mt-6 space-y-4 text-base leading-[1.75] text-charcoal">
                  <p>
                    Working in unfamiliar places, getting lost in new cities, and collecting small observations along the way.
                  </p>
                  <p>
                    Some experiences become projects. Others are simply worth remembering.
                  </p>
                </div>

                <div className="mt-8 border-t border-rule pt-6">
                  <Link
                    href="/archive/elsewhere"
                    className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ivory transition hover:bg-charcoal"
                  >
                    <span>Explore the Archive</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>

              {/* Right 7 cols: Asymmetric Field Journal Spread */}
              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                {/* Entry 1: Atlantic City Work & Travel */}
                <article className="border border-rule bg-ivory p-6 sm:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                    <span className="archival-mono text-[10px] text-ember">
                      FIELD NOTE 01 · WORK & TRAVEL
                    </span>
                    <span className="archival-mono text-[10px] text-muted">
                      ATLANTIC CITY, NEW JERSEY · UNITED STATES
                    </span>
                  </div>
                  <h3 className="editorial-serif mt-3 text-2xl text-ink">
                    Atlantic City Work & Travel
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">
                    A summer working abroad in the United States—boardwalk shifts, unfamiliar schedules, and the quiet independence that comes from navigating daily work far from home.
                  </p>
                </article>

                {/* Entry 2: Cities & Urban Observations */}
                <article className="border border-rule bg-ivory p-5">
                  <div className="flex items-center justify-between border-b border-rule pb-2.5">
                    <span className="archival-mono text-[10px] text-muted">FIELD NOTE 02</span>
                    <span className="archival-mono text-[10px] text-charcoal">CITIES & STREETS</span>
                  </div>
                  <h3 className="editorial-serif mt-3 text-xl text-ink">
                    Architecture & Urban Observations
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-graphite">
                    Walking through New York, Kuala Lumpur, and Seoul—paying attention to transit grids, building density, and how cities organize everyday life.
                  </p>
                </article>

                {/* Entry 3: Music & Classical Guitar */}
                <article className="border border-rule bg-ivory p-5">
                  <div className="flex items-center justify-between border-b border-rule pb-2.5">
                    <span className="archival-mono text-[10px] text-muted">FIELD NOTE 03</span>
                    <span className="archival-mono text-[10px] text-charcoal">PRACTICE</span>
                  </div>
                  <h3 className="editorial-serif mt-3 text-xl text-ink">
                    Music & Classical Guitar
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-graphite">
                    The slow, unhurried discipline of classical guitar practice—repeating phrasing and fingerings away from screens and market tickers.
                  </p>
                </article>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[1380px] items-center justify-between border-t border-rule pt-4 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(4)}
              className="archival-mono text-[11px] text-ink hover:underline"
            >
              ← PREV: 05 / BEHIND THE SCENES
            </button>
            <span className="archival-mono text-[10px]">CHAPTER 06 OF 07</span>
            <button
              type="button"
              onClick={() => scrollToChapter(6)}
              className="archival-mono text-[11px] text-ink hover:underline"
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
          className="relative flex min-h-[calc(100vh-57px)] w-full shrink-0 flex-col justify-between bg-ivory px-5 py-10 md:px-10 lg:h-full lg:w-screen lg:snap-start lg:overflow-y-auto"
        >
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
              <span className="archival-mono text-xs text-ink">07 / 07 — END OF EXHIBITION</span>
              <span className="archival-mono text-[11px] text-muted">
                CATALOGUE COLOPHON & COMPLETE DIRECTORY
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:items-start">
              {/* Left 5 cols: Closing Statement */}
              <div className="lg:col-span-5">
                <p className="archival-mono text-[11px] text-muted">CLOSING SPREAD</p>
                <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.06] text-ink md:text-5xl">
                  That&apos;s the exhibition. For now.
                </h2>

                <div className="mt-6 space-y-4 text-base leading-[1.75] text-charcoal md:text-lg">
                  <p>Still learning, still building, and still figuring things out.</p>
                  <p>Thanks for looking around.</p>
                </div>

                <div className="mt-8 border-t border-rule pt-6">
                  <button
                    type="button"
                    onClick={() => scrollToChapter(0)}
                    className="archival-mono border border-rule bg-paper px-4 py-2.5 text-xs text-ink transition hover:border-ink"
                  >
                    ↺ Return to Chapter 01
                  </button>
                </div>
              </div>

              {/* Right 7 cols: Museum Catalogue Final Exhibition Index */}
              <div className="grid gap-8 border border-rule bg-paper/65 p-6 md:grid-cols-2 md:p-8 lg:col-span-7">
                {/* EXPLORE Column */}
                <div>
                  <p className="archival-mono border-b border-rule pb-3 text-xs font-semibold text-ink">
                    EXPLORE
                  </p>
                  <ul className="mt-4 divide-y divide-rule">
                    <li className="py-3.5">
                      <Link href="/research" className="group flex items-baseline justify-between">
                        <div>
                          <span className="editorial-serif text-2xl text-ink group-hover:underline">
                            Research
                          </span>
                          <p className="mt-1 text-xs text-graphite">
                            What I&apos;m trying to understand — Semiconductors, Markets, Macro, and Case Studies.
                          </p>
                        </div>
                        <span className="archival-mono text-xs text-muted group-hover:text-ink">→</span>
                      </Link>
                    </li>
                    <li className="py-3.5">
                      <Link href="/archive" className="group flex items-baseline justify-between">
                        <div>
                          <span className="editorial-serif text-2xl text-ink group-hover:underline">
                            Archive
                          </span>
                          <p className="mt-1 text-xs text-graphite">
                            How I got here — Education, 2024 Campus Election, Behind the Scenes, and Elsewhere.
                          </p>
                        </div>
                        <span className="archival-mono text-xs text-muted group-hover:text-ink">→</span>
                      </Link>
                    </li>
                    <li className="py-3.5">
                      <Link href="/lab" className="group flex items-baseline justify-between">
                        <div>
                          <span className="editorial-serif text-2xl text-ink group-hover:underline">
                            Chainstox Lab
                          </span>
                          <p className="mt-1 text-xs text-graphite">
                            Independent research systems, analytical models, and working experiments.
                          </p>
                        </div>
                        <span className="archival-mono text-xs text-muted group-hover:text-ink">↗</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* ELSEWHERE Column */}
                <div>
                  <p className="archival-mono border-b border-rule pb-3 text-xs font-semibold text-ink">
                    ELSEWHERE
                  </p>
                  <ul className="mt-4 divide-y divide-rule">
                    <li className="py-3">
                      <Link href="/thoughts" className="group flex items-center justify-between">
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
                      <Link href="/now" className="group flex items-center justify-between">
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
                      <Link href="/journey" className="group flex items-center justify-between">
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
                      <Link href="/contact" className="group flex items-center justify-between">
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
                        className="group flex items-center justify-between"
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
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[1380px] items-center justify-between border-t border-rule pt-4 text-xs text-muted">
            <button
              type="button"
              onClick={() => scrollToChapter(5)}
              className="archival-mono text-[11px] text-ink hover:underline"
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
        className={`hidden border-t px-10 py-2.5 lg:block ${
          activeChapter === 3
            ? "border-white/15 bg-lab text-bone"
            : "border-rule bg-paper/90 text-ink"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <div className="flex items-center gap-2">
            {CHAPTERS.map((chap, idx) => {
              const isCurrent = idx === activeChapter;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => scrollToChapter(idx)}
                  className={`archival-mono px-2.5 py-1 text-[10px] transition ${
                    isCurrent
                      ? activeChapter === 3
                        ? "bg-bone text-ink font-semibold"
                        : "bg-ink text-ivory font-semibold"
                      : activeChapter === 3
                        ? "text-bone/50 hover:text-bone"
                        : "text-muted hover:text-ink"
                  }`}
                >
                  0{chap.index} · {chap.label}
                </button>
              );
            })}
          </div>
          <span
            className={`archival-mono text-[10px] ${
              activeChapter === 3 ? "text-bone/45" : "text-muted"
            }`}
          >
            SCROLL OR USE ← → KEYS TO NAVIGATE CHAPTERS
          </span>
        </div>
      </div>
    </div>
  );
}
