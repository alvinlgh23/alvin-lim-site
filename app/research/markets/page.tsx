import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";
import { SmartphoneTradingDiagram } from "@/components/SmartphoneTradingDiagram";

export const metadata: Metadata = {
  title: "Markets & Valuation | Alvin Lim — A Personal Archive",
  description:
    "What is the market pricing in? And what might it be missing? Research into valuation, market structure, technology, and second-hand market experiments."
};

export default function MarketsValuationPage() {
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
            <span className="archival-mono text-ink">MARKETS & VALUATION</span>
          </div>
          <span className="archival-mono text-[11px] text-muted">
            RESEARCH AREA 02 · PRICE, EXPECTATIONS & MARKET FRICTIONS
          </span>
        </div>

        {/* Hero & Exact Opening Copy */}
        <section className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="archival-mono text-xs text-ember">MARKETS & VALUATION</p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              What is the market pricing in?
            </h1>
            <p className="editorial-serif mt-3 text-2xl italic text-charcoal md:text-4xl">
              And what might it be missing?
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="specimen-sheet p-7 md:p-8">
              <p className="archival-mono text-[10px] text-muted">OPENING STATEMENT</p>
              <div className="mt-4 space-y-4 text-base leading-[1.8] text-charcoal md:text-[1.06rem]">
                <p>
                  I&apos;m interested in how markets assign value to companies, technologies, and future expectations.
                </p>
                <p>
                  Sometimes my research begins with a technological development that I believe deserves closer attention. Other times, it begins with a market price that seems difficult to explain.
                </p>
                <p>
                  I use financial analysis, market data, and independent research tools to investigate those questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sections 01, 02, 03 */}
        <section className="border-b border-rule py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-muted">SECTIONS 01 — 03 / CORE INQUIRIES</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink md:text-4xl">
                Valuation, market structure, and technological change.
              </h2>
            </div>
            <a
              href="#trade-my-way-up"
              className="archival-mono text-xs text-ink underline underline-offset-4"
            >
              Jump to 04 — Notes on Price & Value ↓
            </a>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* 01 — Market Valuation */}
            <article className="flex flex-col justify-between border border-ink bg-ivory p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[11px] text-ember">01 — MARKET VALUATION</span>
                  <span className="archival-mono text-[10px] text-muted">EQUITIES & MACRO</span>
                </div>
                <h3 className="editorial-serif mt-5 text-2xl text-ink md:text-3xl">
                  Market Valuation
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Research into valuation, growth expectations, market conditions, and risk.
                </p>
                <div className="mt-5 border-t border-rule pt-4 text-xs leading-relaxed text-graphite">
                  Examining how liquidity regimes, sector relative strength, and forward multiple expansion interact—and separating durable fundamental quality from narrative chase risk.
                </div>
              </div>

              <div className="mt-7 border-t border-rule pt-4">
                <Link
                  href="/research/market-valuation"
                  className="archival-mono inline-flex items-center gap-2 text-xs font-semibold text-ink hover:underline"
                >
                  <span>Market Valuation Engine</span>
                  <span>→</span>
                </Link>
              </div>
            </article>

            {/* 02 — Market Structure */}
            <article className="flex flex-col justify-between border border-rule bg-paper/55 p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[11px] text-ink">02 — MARKET STRUCTURE</span>
                  <span className="archival-mono text-[10px] text-muted">ON-CHAIN & FLOWS</span>
                </div>
                <h3 className="editorial-serif mt-5 text-2xl text-ink md:text-3xl">
                  Market Structure
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Research into liquidity, on-chain capital flows, and cryptocurrency market structure.
                </p>
                <div className="mt-5 border-t border-rule pt-4 text-xs leading-relaxed text-graphite">
                  Investigating how holder cohorts, exchange net flows, and macro liquidity conditions combine into distinct market regimes rather than isolated price ticks.
                </div>
              </div>

              <div className="mt-7 border-t border-rule pt-4">
                <Link
                  href="/research/onchain-intelligence"
                  className="archival-mono inline-flex items-center gap-2 text-xs font-semibold text-ink hover:underline"
                >
                  <span>On-Chain Market Intelligence</span>
                  <span>→</span>
                </Link>
              </div>
            </article>

            {/* 03 — Technology & Business */}
            <article className="flex flex-col justify-between border border-rule bg-paper/55 p-6 md:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[11px] text-ink">
                    03 — TECHNOLOGY & BUSINESS
                  </span>
                  <span className="archival-mono text-[10px] text-muted">SILICON & INDUSTRY</span>
                </div>
                <h3 className="editorial-serif mt-5 text-2xl text-ink md:text-3xl">
                  Technology & Business
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Research into technological progress, competition, business models, and valuation.
                </p>
                <div className="mt-5 border-t border-rule pt-4 text-xs leading-relaxed text-graphite">
                  Connecting hardware evolution—from smartphone processors to foundry economics—with competitive advantage and how public markets value technical roadmaps.
                </div>
              </div>

              <div className="mt-7 border-t border-rule pt-4">
                <Link
                  href="/research/semiconductors"
                  className="archival-mono inline-flex items-center gap-2 text-xs font-semibold text-ink hover:underline"
                >
                  <span>Semiconductor Research</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Section 04 — Notes on Price & Value: The Smartphone Trading Experiment */}
        <section id="trade-my-way-up" className="scroll-mt-24 pt-16">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
            <span className="archival-mono text-xs text-ember">
              04 — NOTES ON PRICE & VALUE // AN EARLY EXPERIMENT / SECOND-HAND MARKETS
            </span>
            <span className="archival-mono text-[11px] text-muted">
              ANCHOR: #TRADE-MY-WAY-UP
            </span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Title & Subtitle */}
            <div className="lg:col-span-5">
              <p className="archival-mono text-xs text-muted">
                AN EARLY EXPERIMENT / SECOND-HAND MARKETS
              </p>
              <h2 className="editorial-serif mt-3 text-4xl font-normal leading-[1.06] text-ink md:text-5xl">
                Could I trade my way up?
              </h2>
              <p className="editorial-serif mt-3 text-xl italic text-charcoal md:text-2xl">
                An early experiment in second-hand markets.
              </p>

              <div className="mt-8 border border-rule bg-paper/60 p-5">
                <p className="archival-mono text-[10px] text-muted">EXPERIMENT SUMMARY</p>
                <dl className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-rule pb-2">
                    <dt className="text-graphite">Initial Asset</dt>
                    <dd className="font-medium text-ink">iPhone 5 (16GB)</dd>
                  </div>
                  <div className="flex justify-between border-b border-rule pb-2">
                    <dt className="text-graphite">First Exchange</dt>
                    <dd className="font-medium text-ink">Samsung Galaxy Note 3 (Succeeded)</dd>
                  </div>
                  <div className="flex justify-between border-b border-rule pb-2">
                    <dt className="text-graphite">Second Exchange Attempt</dt>
                    <dd className="font-medium text-ember">iPhone 6 (Unsuccessful)</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-graphite">Key Friction</dt>
                    <dd className="text-charcoal">Device condition & counterparty matching</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Exact Approved Narrative Copy */}
            <div className="lg:col-span-7">
              <div className="border-l-2 border-ink bg-paper/45 p-6 md:p-9">
                <div className="space-y-4 text-base leading-[1.82] text-charcoal md:text-[1.06rem]">
                  <p>
                    When I was younger, I wondered whether I could keep upgrading my phone simply by trading it for another one.
                  </p>
                  <p>
                    I had noticed that Android phones often seemed to depreciate faster than iPhones in the second-hand market I was familiar with.
                  </p>
                  <p>
                    My idea was simple: exchange my iPhone 5 (16GB) for a newer Android flagship, then trade that for a newer iPhone.
                  </p>
                  <p>
                    The first step actually worked. I managed to exchange my iPhone 5 for a Samsung Galaxy Note 3.
                  </p>
                  <p>
                    The second step didn&apos;t. I couldn&apos;t trade the Note 3 for an iPhone 6, partly because the Note 3 wasn&apos;t in particularly good condition.
                  </p>
                  <p>
                    Looking back, I had identified a potential difference in how brands were valued, but I hadn&apos;t fully accounted for the condition of the individual device.
                  </p>
                  <p>
                    It was a small, unsuccessful experiment in trading upward — and an early reminder that an apparent price difference doesn&apos;t necessarily translate into a real opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Required Editorial Trading Diagram */}
          <SmartphoneTradingDiagram />

          {/* Analytical Notes — What the Experiment Revealed */}
          <div className="mt-12 border-t border-rule pt-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="archival-mono text-xs text-ember">
                WHAT THE EXPERIMENT REVEALED
              </p>
              <span className="archival-mono text-[10px] text-muted">
                RETROSPECTIVE INTERPRETATIONS · NOT FORMAL RESEARCH AT THE TIME
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <article className="border border-rule bg-paper/55 p-6">
                <span className="archival-mono text-[10px] text-muted">OBSERVATION 01</span>
                <h3 className="editorial-serif mt-2 text-2xl text-ink">Relative Valuation</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  The idea came from observing differences in resale value between Android devices and iPhones.
                </p>
              </article>

              <article className="border border-rule bg-paper/55 p-6">
                <span className="archival-mono text-[10px] text-muted">OBSERVATION 02</span>
                <h3 className="editorial-serif mt-2 text-2xl text-ink">Device Condition</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  The Galaxy Note 3&apos;s physical condition affected its practical exchange value.
                </p>
              </article>

              <article className="border border-rule bg-paper/55 p-6">
                <span className="archival-mono text-[10px] text-muted">OBSERVATION 03</span>
                <h3 className="editorial-serif mt-2 text-2xl text-ink">Market Frictions</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  An apparent opportunity depends on finding someone willing to accept the proposed trade.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
