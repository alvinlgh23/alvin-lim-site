import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Technology & Semiconductors | Alvin Lim — A Personal Archive",
  description:
    "From smartphones to silicon: mobile SoC evolution, chip architecture, and the economics of the semiconductor industry."
};

export default function SemiconductorsPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link href="/research" className="archival-mono hover:text-ink">
              RESEARCH
            </Link>
            <span>/</span>
            <span className="archival-mono text-ink">TECHNOLOGY & SEMICONDUCTORS</span>
          </div>
          <span className="archival-mono border border-ember/40 bg-ember/10 px-2.5 py-1 text-[10px] text-ember">
            STATUS: RESEARCH IN PROGRESS
          </span>
        </div>

        {/* Hero & Where It Started */}
        <section className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="archival-mono text-xs text-muted">
              RESEARCH AREA 01 // SILICON & COMPUTING
            </p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              From smartphones to silicon.
            </h1>

            <div className="mt-8 border-l-2 border-ink bg-paper/70 p-6 md:p-8">
              <p className="archival-mono text-[11px] text-muted">01 / WHERE IT STARTED</p>
              <div className="mt-4 space-y-4 text-base leading-[1.8] text-charcoal md:text-[1.06rem]">
                <p>My interest in semiconductors began with smartphones.</p>
                <p>
                  Since primary school, I have enjoyed comparing phone specifications and following how each generation of iPhone processors evolved.
                </p>
                <p>
                  Over time, that curiosity expanded beyond individual devices into questions about chip architecture, computing performance, and the semiconductor industry.
                </p>
              </div>
            </div>
          </div>

          {/* Conceptual Silicon Hierarchy Diagram */}
          <div className="lg:col-span-6">
            <div className="specimen-sheet specimen-grid-bg p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="archival-mono text-[10px] text-ink">
                  FIG. S.01 — ANALYTICAL SCOPE: DEVICE TO FOUNDRY
                </span>
                <span className="archival-mono text-[10px] text-muted">CONCEPTUAL MAP</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="border border-rule bg-ivory p-4">
                  <div className="flex items-center justify-between">
                    <span className="archival-mono text-[10px] text-muted">LEVEL 01 · CONSUMER HARDWARE</span>
                    <span className="archival-mono text-[10px] text-charcoal">ORIGIN OF CURIOSITY</span>
                  </div>
                  <p className="editorial-serif mt-1.5 text-xl text-ink">
                    Smartphone Specifications & Generation Cycles
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-graphite">
                    Comparing mobile processor generations, sustained thermal performance, battery efficiency, and secondary-market resale behavior.
                  </p>
                </div>

                <div className="border border-rule bg-ivory p-4">
                  <div className="flex items-center justify-between">
                    <span className="archival-mono text-[10px] text-muted">LEVEL 02 · SILICON DESIGN</span>
                    <span className="archival-mono text-[10px] text-charcoal">TECHNICAL LAYER</span>
                  </div>
                  <p className="editorial-serif mt-1.5 text-xl text-ink">
                    SoC Die Layout & Microarchitecture
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-graphite">
                    CPU/GPU/NPU core allocation, memory bandwidth constraints, instruction-set efficiency, and node shrink trade-offs.
                  </p>
                </div>

                <div className="border border-rule bg-ivory p-4">
                  <div className="flex items-center justify-between">
                    <span className="archival-mono text-[10px] text-muted">LEVEL 03 · INDUSTRIAL STRUCTURE</span>
                    <span className="archival-mono text-[10px] text-charcoal">ECONOMIC LAYER</span>
                  </div>
                  <p className="editorial-serif mt-1.5 text-xl text-ink">
                    Foundry Economics, Capital Intensity & Supply Chains
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-graphite">
                    Leading-edge lithography bottlenecks, fab utilization, design-to-manufacturing specialization, and market valuation of semiconductor cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Directions — Explicitly Marked as Planned */}
        <section className="border-b border-rule py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-muted">02 / RESEARCH DIRECTIONS</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink md:text-4xl">
                Planned areas of investigation.
              </h2>
            </div>
            <span className="archival-mono text-[11px] text-muted">
              WORKING AGENDA · NOT PRESENTED AS COMPLETED PUBLICATIONS
            </span>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Direction 01 */}
            <article className="flex flex-col justify-between border border-rule bg-paper/55 p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-muted">DIRECTION 01</span>
                  <span className="archival-mono border border-rule bg-ivory px-2.5 py-0.5 text-[10px] text-charcoal">
                    Status: Planned
                  </span>
                </div>
                <h3 className="editorial-serif mt-5 text-2xl text-ink">
                  Mobile SoC Evolution
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Understanding how mobile processors evolve across generations.
                </p>
              </div>
              <div className="mt-6 border-t border-rule pt-4 text-xs text-muted">
                <span className="archival-mono text-[10px]">
                  SCOPE: A-SERIES & FLAGSHIP SOC GENERATIONAL PROGRESSION
                </span>
              </div>
            </article>

            {/* Direction 02 */}
            <article className="flex flex-col justify-between border border-rule bg-paper/55 p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-muted">DIRECTION 02</span>
                  <span className="archival-mono border border-rule bg-ivory px-2.5 py-0.5 text-[10px] text-charcoal">
                    Status: Planned
                  </span>
                </div>
                <h3 className="editorial-serif mt-5 text-2xl text-ink">
                  Chip Architecture
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Exploring architectural design, computing efficiency, and hardware trade-offs.
                </p>
              </div>
              <div className="mt-6 border-t border-rule pt-4 text-xs text-muted">
                <span className="archival-mono text-[10px]">
                  SCOPE: COMPUTE DENSITY, MEMORY HIERARCHY & EFFICIENCY
                </span>
              </div>
            </article>

            {/* Direction 03 */}
            <article className="flex flex-col justify-between border border-rule bg-paper/55 p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-muted">DIRECTION 03</span>
                  <span className="archival-mono border border-rule bg-ivory px-2.5 py-0.5 text-[10px] text-charcoal">
                    Status: Planned
                  </span>
                </div>
                <h3 className="editorial-serif mt-5 text-2xl text-ink">
                  Semiconductor Industry
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Examining technical progress, competition, and the economics of semiconductor development.
                </p>
              </div>
              <div className="mt-6 border-t border-rule pt-4 text-xs text-muted">
                <span className="archival-mono text-[10px]">
                  SCOPE: CAPEX CYCLES, FOUNDRY MOATS & SUPPLY CHAINS
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* Price and Value — Secondary-School Carousell Experience & Bridge to Markets */}
        <section className="pt-14">
          <div className="grid gap-10 border border-ink bg-paper/75 p-7 md:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="archival-mono text-xs text-ember">
                03 / PRICE AND VALUE — SECOND-HAND HARDWARE MARKETS
              </p>
              <h2 className="editorial-serif mt-3 text-3xl text-ink md:text-4xl">
                Product familiarity as an early lens on value.
              </h2>

              <div className="mt-5 space-y-4 text-base leading-[1.8] text-charcoal">
                <p>
                  During secondary school, I also spent time buying and reselling second-hand phones through Carousell, occasionally repairing faulty devices before selling them.
                </p>
                <p>
                  Back then, my decisions were mostly instinctive. I knew the products well, and that familiarity gave me a sense of what they might be worth.
                </p>
                <p>
                  It was a practical experience that still influences how I think about price and value today.
                </p>
              </div>

              <div className="mt-8 border-t border-rule pt-6">
                <Link
                  href="/research/markets#trade-my-way-up"
                  className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ivory transition hover:bg-charcoal"
                >
                  <span>Could I trade my way up?</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

            {/* Connected Lab Systems & Cross-Links */}
            <div className="lg:col-span-5">
              <div className="border border-rule bg-ivory p-6">
                <p className="archival-mono text-[10px] text-muted">
                  CONNECTED RESEARCH & LAB TOOLS
                </p>
                <div className="mt-4 divide-y divide-rule">
                  <div className="py-3.5">
                    <Link
                      href="/research/markets#trade-my-way-up"
                      className="group flex items-baseline justify-between"
                    >
                      <div>
                        <p className="editorial-serif text-lg text-ink group-hover:underline">
                          The Smartphone Trading Experiment
                        </p>
                        <p className="mt-1 text-xs text-graphite">
                          iPhone 5 → Galaxy Note 3 ⇢ iPhone 6 exchange record in Markets & Valuation.
                        </p>
                      </div>
                      <span className="archival-mono text-xs text-muted">↗</span>
                    </Link>
                  </div>
                  <div className="py-3.5">
                    <Link
                      href="/lab/projects/phone-cycle-timing-engine"
                      className="group flex items-baseline justify-between"
                    >
                      <div>
                        <p className="editorial-serif text-lg text-ink group-hover:underline">
                          Phone Cycle Timing Engine
                        </p>
                        <p className="mt-1 text-xs text-graphite">
                          Chainstox Lab scenario tool modeling smartphone depreciation and release-cycle shocks.
                        </p>
                      </div>
                      <span className="archival-mono text-xs text-muted">↗</span>
                    </Link>
                  </div>
                  <div className="py-3.5">
                    <Link
                      href="/lab/projects/kospi-signal-monitor"
                      className="group flex items-baseline justify-between"
                    >
                      <div>
                        <p className="editorial-serif text-lg text-ink group-hover:underline">
                          KOSPI Signal Monitor
                        </p>
                        <p className="mt-1 text-xs text-graphite">
                          Testing relationships between Korean equities, semiconductor exports, and FX.
                        </p>
                      </div>
                      <span className="archival-mono text-xs text-muted">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
