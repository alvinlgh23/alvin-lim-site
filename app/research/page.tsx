import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Research Collection | Alvin Lim — A Personal Archive",
  description: "Research into technology, markets, and the systems connecting them."
};

export default function ResearchCollectionPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* Top Catalogue Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <span className="archival-mono text-xs text-ink">
            COLLECTION 01 — RESEARCH JOURNAL & INDEX
          </span>
          <span className="archival-mono text-[11px] text-muted">
            PILLAR I: WHAT I&apos;M TRYING TO UNDERSTAND
          </span>
        </div>

        {/* Hero Spread & Research Philosophy */}
        <section className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="archival-mono text-xs text-ember">RESEARCH COLLECTION</p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              Curiosity leads. Evidence decides.
            </h1>
            <p className="editorial-serif mt-5 text-xl italic text-charcoal md:text-2xl">
              Research into technology, markets, and the systems connecting them.
            </p>

            {/* Methodological Flow Diagram */}
            <div className="mt-10 border border-rule bg-paper/65 p-6">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="archival-mono text-[10px] text-ink">
                  FIG. R.01 — TWO-DIRECTIONAL INQUIRY LOOP
                </span>
                <span className="archival-mono text-[10px] text-muted">METHODOLOGY</span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="border border-rule bg-ivory p-4">
                  <p className="archival-mono text-[10px] text-ember">PATH A // BOTTOM-UP</p>
                  <p className="editorial-serif mt-1.5 text-lg text-ink">
                    Technology → Industry → Valuation
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-graphite">
                    Start with a hardware or technical shift, trace its commercial implications, and examine how markets price those possibilities.
                  </p>
                </div>
                <div className="border border-rule bg-ivory p-4">
                  <p className="archival-mono text-[10px] text-ink">PATH B // TOP-DOWN</p>
                  <p className="editorial-serif mt-1.5 text-lg text-ink">
                    Price Signal → Evidence → Revision
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-graphite">
                    Start with a market price or regime that seems difficult to explain, test the underlying assumptions, and revise when evidence disagrees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Exact Approved Research Philosophy Copy */}
          <div className="lg:col-span-6">
            <div className="specimen-sheet p-7 md:p-9">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="archival-mono text-xs text-ink">RESEARCH PHILOSOPHY</span>
                <span className="archival-mono text-[10px] text-muted">EDITORIAL STATEMENT</span>
              </div>
              <div className="mt-6 space-y-5 text-base leading-[1.8] text-charcoal md:text-[1.06rem]">
                <p>
                  My research often begins with curiosity about a technology, an industry, or a change that might reshape how things work.
                </p>
                <p>
                  I usually start by understanding the technology or industry itself, then explore its commercial implications and how markets are valuing those possibilities.
                </p>
                <p>
                  Sometimes, the process begins the other way around — with an instinct that something may be mispriced.
                </p>
                <p>
                  In either case, I try to move beyond the initial impression, investigate the evidence, challenge my assumptions, and revise my view when necessary.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three Research Areas — Distinctive Editorial Compositions */}
        <section className="border-b border-rule py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-muted">01 / RESEARCH AREAS</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink md:text-4xl">
                Three interconnected domains of inquiry.
              </h2>
            </div>
            <span className="archival-mono text-[11px] text-muted">
              SILICON · VALUATION · MONETARY SYSTEMS
            </span>
          </div>

          <div className="mt-10 space-y-6">
            {/* Area 01: Technology & Semiconductors (Horizontal Split Dossier) */}
            <article className="grid gap-6 border border-rule bg-paper/50 p-6 md:p-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-3">
                <span className="archival-mono text-[11px] text-ember">AREA 01 // HARDWARE & INDUSTRY</span>
                <p className="archival-mono mt-2 text-[10px] text-muted">
                  MOBILE SOC · ARCHITECTURE · FOUNDRY ECONOMICS
                </p>
              </div>
              <div className="lg:col-span-6">
                <h3 className="editorial-serif text-3xl text-ink">
                  Technology & Semiconductors
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal">
                  Chip architecture, computing technologies, technical progress, and their wider industrial implications.
                </p>
              </div>
              <div className="flex lg:col-span-3 lg:justify-end">
                <Link
                  href="/research/semiconductors"
                  className="archival-mono inline-flex items-center gap-3 border border-ink bg-ivory px-5 py-3 text-xs text-ink transition hover:bg-ink hover:text-ivory"
                >
                  <span>Explore Semiconductors</span>
                  <span>→</span>
                </Link>
              </div>
            </article>

            {/* Area 02: Markets & Valuation (Asymmetric Two-Column Feature) */}
            <div className="grid gap-6 lg:grid-cols-12">
              <article className="flex flex-col justify-between border border-ink bg-ivory p-6 md:p-8 lg:col-span-7">
                <div>
                  <div className="flex items-center justify-between border-b border-rule pb-3">
                    <span className="archival-mono text-[11px] text-ink">
                      AREA 02 // EXPECTATIONS & RISK
                    </span>
                    <span className="archival-mono text-[10px] text-muted">
                      EQUITIES · CRYPTO · SECOND-HAND MARKETS
                    </span>
                  </div>
                  <h3 className="editorial-serif mt-5 text-3xl text-ink md:text-4xl">
                    Markets & Valuation
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal">
                    Understanding market expectations, business fundamentals, risk, and the relationship between price and value.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-rule pt-4 text-xs text-graphite">
                    <div>
                      <span className="archival-mono text-[10px] text-muted">SECTIONS</span>
                      <p className="mt-1 text-charcoal">
                        01 Market Valuation · 02 Market Structure
                      </p>
                    </div>
                    <div>
                      <span className="archival-mono text-[10px] text-muted">FIELD EXPERIMENT</span>
                      <p className="mt-1 text-charcoal">
                        03 Tech & Business · 04 Could I trade my way up?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3 border-t border-rule pt-5">
                  <Link
                    href="/research/markets"
                    className="archival-mono inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs text-ivory transition hover:bg-charcoal"
                  >
                    <span>Explore Markets & Valuation</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/research/markets#trade-my-way-up"
                    className="archival-mono inline-flex items-center gap-2 border border-rule bg-paper px-4 py-3 text-xs text-ink transition hover:border-ink"
                  >
                    <span>Smartphone Trading Experiment</span>
                    <span>↗</span>
                  </Link>
                </div>
              </article>

              {/* Area 03: Macroeconomics & Monetary Systems */}
              <article className="flex flex-col justify-between border border-rule bg-paper/75 p-6 md:p-8 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between border-b border-rule pb-3">
                    <span className="archival-mono text-[11px] text-ink">
                      AREA 03 // MONETARY FRAMEWORKS
                    </span>
                    <span className="archival-mono text-[10px] text-muted">FX · LIQUIDITY</span>
                  </div>
                  <h3 className="editorial-serif mt-5 text-3xl text-ink">
                    Macroeconomics & Monetary Systems
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal">
                    Exchange rates, monetary frameworks, liquidity, and the forces shaping economic conditions.
                  </p>
                  <div className="mt-5 border border-rule bg-ivory p-4">
                    <p className="archival-mono text-[10px] text-muted">FEATURED MODEL</p>
                    <p className="mt-1 text-xs text-charcoal">
                      SGD-NEER Shadow Model — Trade-weighted exchange rate corridor study.
                    </p>
                  </div>
                </div>
                <div className="mt-7 border-t border-rule pt-5">
                  <Link
                    href="/research/macro"
                    className="archival-mono inline-flex items-center gap-3 border border-ink bg-ivory px-5 py-3 text-xs text-ink transition hover:bg-ink hover:text-ivory"
                  >
                    <span>Explore Macroeconomics</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Selected Research — Case Studies & Ongoing Dossier */}
        <section className="border-b border-rule py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-muted">02 / SELECTED RESEARCH</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink md:text-4xl">
                Research case studies & active investigations.
              </h2>
            </div>
            <Link
              href="/lab"
              className="archival-mono border border-rule bg-paper px-4 py-2.5 text-xs text-ink transition hover:border-ink"
            >
              Open Chainstox Lab ↗
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* 1. Market Valuation Engine */}
            <article className="flex flex-col justify-between border border-rule bg-ivory p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-ember">
                    MARKETS / VALUATION
                  </span>
                  <span className="archival-mono text-[10px] text-muted">CASE STUDY 01</span>
                </div>
                <h3 className="editorial-serif mt-4 text-3xl text-ink">
                  Market Valuation Engine
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Exploring market conditions, valuation, and the signals that shape risk and expectations across macro liquidity, sector rotation, and positioning heat.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                <span className="archival-mono text-[10px] text-muted">
                  PYTHON · YFINANCE · CLI CONSOLE
                </span>
                <Link
                  href="/research/market-valuation"
                  className="archival-mono text-xs font-semibold text-ink hover:underline"
                >
                  Read Case Study →
                </Link>
              </div>
            </article>

            {/* 2. On-Chain Market Intelligence */}
            <article className="flex flex-col justify-between border border-rule bg-ivory p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-ink">
                    CRYPTO / MARKET STRUCTURE
                  </span>
                  <span className="archival-mono text-[10px] text-muted">CASE STUDY 02</span>
                </div>
                <h3 className="editorial-serif mt-4 text-3xl text-ink">
                  On-Chain Market Intelligence
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Investigating liquidity, capital flows, and market structure through on-chain data, holder cohort behavior, and explainable regime classification.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                <span className="archival-mono text-[10px] text-muted">
                  PYTHON · DUNE SQL · 7-STATE REGIME
                </span>
                <Link
                  href="/research/onchain-intelligence"
                  className="archival-mono text-xs font-semibold text-ink hover:underline"
                >
                  Read Case Study →
                </Link>
              </div>
            </article>

            {/* 3. SGD-NEER Shadow Model */}
            <article className="flex flex-col justify-between border border-rule bg-ivory p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-ink">
                    MACRO / MONETARY SYSTEMS
                  </span>
                  <span className="archival-mono text-[10px] text-muted">CASE STUDY 03</span>
                </div>
                <h3 className="editorial-serif mt-4 text-3xl text-ink">
                  SGD-NEER Shadow Model
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  An independent attempt to understand Singapore&apos;s exchange-rate-based monetary framework through a transparent trade-weighted proxy basket.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                <span className="archival-mono text-[10px] text-muted">
                  FX BASKET PROXY · POLICY CORRIDOR
                </span>
                <Link
                  href="/research/sgd-neer"
                  className="archival-mono text-xs font-semibold text-ink hover:underline"
                >
                  Read Case Study →
                </Link>
              </div>
            </article>

            {/* 4. Semiconductor Research */}
            <article className="flex flex-col justify-between border border-rule bg-paper/60 p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-ember">
                    TECHNOLOGY & SEMICONDUCTORS
                  </span>
                  <span className="archival-mono border border-ember/40 bg-ember/10 px-2 py-0.5 text-[10px] text-ember">
                    Research in progress
                  </span>
                </div>
                <h3 className="editorial-serif mt-4 text-3xl text-ink">
                  Semiconductor Research
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Tracing how smartphone processor comparisons evolved into planned research directions across mobile SoC evolution, chip architecture, and industry economics.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                <span className="archival-mono text-[10px] text-muted">
                  PLANNED DIRECTIONS · DOSSIER
                </span>
                <Link
                  href="/research/semiconductors"
                  className="archival-mono text-xs font-semibold text-ink hover:underline"
                >
                  Open Semiconductor Dossier →
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Research Note 001 */}
        <section className="pt-14">
          <div className="mx-auto max-w-4xl border border-ink bg-paper/75 p-7 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-4">
              <span className="archival-mono text-xs font-semibold text-ember">
                RESEARCH NOTE 001
              </span>
              <span className="archival-mono text-[10px] text-muted">
                EPISTEMOLOGY & VALUATION HABITS
              </span>
            </div>

            <h2 className="editorial-serif mt-5 text-3xl text-ink md:text-4xl">
              Intuition first. Evidence next.
            </h2>

            <p className="mt-5 text-base leading-[1.8] text-charcoal md:text-lg">
              My earliest judgments about value came from familiarity rather than formal models. Today, intuition can still give me a starting point, but I try to understand why a judgment might be right — and what could prove it wrong.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-4 text-xs text-muted">
              <span className="archival-mono text-[10px]">
                SEE ALSO: SECONDARY MARKET TRADING RECORD
              </span>
              <Link
                href="/research/markets#trade-my-way-up"
                className="archival-mono text-[11px] text-ink underline underline-offset-4"
              >
                Could I trade my way up? ↗
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
