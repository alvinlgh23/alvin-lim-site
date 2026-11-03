import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Macroeconomics & Monetary Systems | Alvin Lim — A Personal Archive",
  description:
    "Understanding the bigger picture: an exploration of exchange rates, monetary systems, liquidity, and the economic conditions shaping financial markets."
};

export default function MacroeconomicsPage() {
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
            <span className="archival-mono text-ink">MACROECONOMICS & MONETARY SYSTEMS</span>
          </div>
          <span className="archival-mono text-[11px] text-muted">
            RESEARCH AREA 03 · EXCHANGE RATES, LIQUIDITY & POLICY FRAMEWORKS
          </span>
        </div>

        {/* Hero & Exact Copy */}
        <section className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="archival-mono text-xs text-ember">
              MACROECONOMICS & MONETARY SYSTEMS
            </p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              Understanding the bigger picture.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal md:text-xl">
              An exploration of exchange rates, monetary systems, liquidity, and the economic conditions shaping financial markets.
            </p>

            <div className="mt-9 flex flex-wrap gap-4 border-t border-rule pt-6">
              <Link
                href="/research/sgd-neer"
                className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ivory transition hover:bg-charcoal"
              >
                <span>Inspect SGD-NEER Shadow Model</span>
                <span>→</span>
              </Link>
              <Link
                href="/lab/projects/sgd-neer-shadow-model"
                className="archival-mono border border-rule bg-paper px-4 py-3 text-xs text-ink transition hover:border-ink"
              >
                Open in Chainstox Lab ↗
              </Link>
            </div>
          </div>

          {/* Comparative Monetary Regime Diagram: Interest-Rate vs Exchange-Rate Target */}
          <div className="lg:col-span-6">
            <div className="specimen-sheet specimen-grid-bg p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="archival-mono text-[10px] text-ink">
                  FIG. M.01 — MONETARY TRANSMISSION ARCHITECTURES
                </span>
                <span className="archival-mono text-[10px] text-muted">CONCEPTUAL COMPARISON</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="border border-rule bg-ivory p-4">
                  <span className="archival-mono text-[10px] text-muted">CONVENTIONAL REGIME</span>
                  <h3 className="editorial-serif mt-1.5 text-xl text-ink">
                    Interest-Rate Targeting
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-graphite">
                    Policy instrument: Overnight policy rate (e.g., Fed Funds). Transmission operates primarily through domestic borrowing costs, yield curves, and credit creation.
                  </p>
                </div>

                <div className="border border-ink bg-ivory p-4">
                  <span className="archival-mono text-[10px] text-ember">SMALL OPEN ECONOMY (MAS)</span>
                  <h3 className="editorial-serif mt-1.5 text-xl text-ink">
                    BBC Exchange-Rate Framework
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal">
                    Policy instrument: Basket, Band, and Crawl (S$NEER). Because traded goods dominate domestic prices, the trade-weighted exchange rate serves as the primary nominal anchor.
                  </p>
                </div>
              </div>

              <div className="mt-4 border border-rule bg-ivory p-4">
                <p className="archival-mono text-[10px] text-muted">
                  ANALYTICAL IMPLICATION FOR RESEARCHERS
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-graphite">
                  When a central bank manages a currency basket within an undisclosed band, independent observers must construct transparent trade-weighted proxies to study exchange-rate pressure while clearly acknowledging what remains unobservable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Research: SGD-NEER Shadow Model */}
        <section className="border-b border-rule py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-muted">01 / FEATURED RESEARCH</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink md:text-4xl">
                SGD-NEER Shadow Model
              </h2>
            </div>
            <span className="archival-mono border border-rule bg-paper px-3 py-1 text-[10px] text-charcoal">
              INDEPENDENT PROXY · NON-OFFICIAL MAS MODEL
            </span>
          </div>

          <div className="mt-8 grid gap-8 border border-ink bg-paper/65 p-6 md:p-9 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="archival-mono text-[11px] text-ember">
                CASE STUDY // MACRO / MONETARY SYSTEMS
              </p>
              <h3 className="editorial-serif mt-3 text-3xl text-ink">
                Modeling a policy corridor without official basket weights.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal">
                An independent attempt to understand Singapore&apos;s exchange-rate-based monetary framework by building a geometric trade-weighted SGD index across observable partner currencies and estimating a reference policy band.
              </p>

              <ul className="mt-6 space-y-2 border-t border-rule pt-4 text-xs text-charcoal">
                <li className="flex items-center gap-2">
                  <span className="archival-mono text-muted">01.</span>
                  <span>Trade-weighted geometric index across observable bilateral SGD crosses</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="archival-mono text-muted">02.</span>
                  <span>Rolling policy center estimation, fixed reference band, and vol-adjusted stress band</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="archival-mono text-muted">03.</span>
                  <span>Strict epistemic distinction between independent proxy weights and undisclosed MAS data</span>
                </li>
              </ul>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-rule pt-5">
                <Link
                  href="/research/sgd-neer"
                  className="archival-mono bg-ink px-5 py-3 text-xs text-ivory transition hover:bg-charcoal"
                >
                  Read Full Case Study →
                </Link>
                <a
                  href="https://github.com/alvinlgh23/SGD-NEER-shadow-model"
                  target="_blank"
                  rel="noreferrer"
                  className="archival-mono border border-ink/25 bg-ivory px-4 py-3 text-xs text-ink transition hover:bg-stone/50"
                >
                  GitHub Repository ↗
                </a>
              </div>
            </div>

            {/* Conceptual Policy Band Diagram */}
            <div className="lg:col-span-6">
              <div className="border border-rule bg-ivory p-6">
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-ink">
                    FIG. M.02 — CONCEPTUAL S$NEER POLICY CORRIDOR SCHEMA
                  </span>
                  <span className="archival-mono text-[10px] text-muted">ILLUSTRATIVE SCHEMA</span>
                </div>

                <svg
                  viewBox="0 0 420 190"
                  className="mt-4 h-44 w-full"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Grid lines */}
                  <line x1="30" y1="30" x2="400" y2="30" stroke="#E5E0D4" strokeWidth="1" />
                  <line x1="30" y1="95" x2="400" y2="95" stroke="#E5E0D4" strokeWidth="1" />
                  <line x1="30" y1="160" x2="400" y2="160" stroke="#E5E0D4" strokeWidth="1" />

                  {/* Upper Band */}
                  <line
                    x1="30"
                    y1="58"
                    x2="400"
                    y2="28"
                    stroke="#55534D"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                  {/* Policy Center (Crawl) */}
                  <line x1="30" y1="102" x2="400" y2="72" stroke="#111110" strokeWidth="1.5" />
                  {/* Lower Band */}
                  <line
                    x1="30"
                    y1="146"
                    x2="400"
                    y2="116"
                    stroke="#55534D"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />

                  {/* Illustrative Proxy Path */}
                  <path
                    d="M 30 112 Q 90 82, 145 92 T 255 62 T 340 54 T 400 44"
                    stroke="#B8592A"
                    strokeWidth="2"
                    fill="none"
                  />

                  <text x="35" y="22" fill="#7D7A72" fontSize="8" fontFamily="monospace">
                    UPPER BOUND (ESTIMATED REFERENCE CORRIDOR)
                  </text>
                  <text x="35" y="176" fill="#7D7A72" fontSize="8" fontFamily="monospace">
                    LOWER BOUND · SLOPE = APPRECIATION CRAWL RATE
                  </text>
                </svg>

                <p className="mt-3 border-t border-rule pt-3 text-[11px] leading-relaxed text-muted">
                  Schematic illustration of a crawling exchange-rate band (Basket, Band, Crawl). Exact MAS parameters are undisclosed; the Shadow Model estimates a transparent proxy corridor from public FX data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Analytical Notes on Macro & Cross-Market Linkages */}
        <section className="pt-14">
          <p className="archival-mono text-xs text-muted">
            02 / ANALYTICAL NOTES & CROSS-MARKET CONNECTIONS
          </p>
          <h2 className="editorial-serif mt-2 text-3xl text-ink">
            How macro conditions connect to market structure.
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="border border-rule bg-paper/50 p-6">
              <span className="archival-mono text-[10px] text-muted">NOTE 01 · LIQUIDITY</span>
              <h3 className="editorial-serif mt-2 text-2xl text-ink">
                Rates, Dollar Direction & Risk Appetite
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Long-end Treasury yields, DXY trend, and carry conditions form the first analytical layer in both the Market Valuation Engine and the On-Chain Market Intelligence pipeline.
              </p>
            </article>

            <article className="border border-rule bg-paper/50 p-6">
              <span className="archival-mono text-[10px] text-muted">NOTE 02 · REGIONAL FX</span>
              <h3 className="editorial-serif mt-2 text-2xl text-ink">
                Trade Weights & Asian Export Cycles
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Exchange rates in trade-reliant Asian economies interact closely with semiconductor export cycles and cross-border capital flows, explored alongside the KOSPI Signal Monitor.
              </p>
            </article>

            <article className="border border-rule bg-paper/50 p-6">
              <span className="archival-mono text-[10px] text-muted">NOTE 03 · HUMILITY</span>
              <h3 className="editorial-serif mt-2 text-2xl text-ink">
                Stating What Cannot Be Known
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Macroeconomic data is noisy and policy rules are often partially opaque. Useful independent models document their proxy assumptions upfront rather than projecting false precision.
              </p>
            </article>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
