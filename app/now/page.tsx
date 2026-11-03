import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Now | Alvin Lim — A Personal Archive",
  description: "Current projects, academic focus at Universiti Malaya, and active research directions."
};

export default function NowPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <span className="archival-mono text-xs text-ink">
            NOW — CURRENT PROJECTS & RESEARCH FOCUS
          </span>
          <span className="archival-mono text-[11px] text-muted">
            UNIVERSITI MALAYA · KUALA LUMPUR
          </span>
        </div>

        <header className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="archival-mono text-xs text-ember">NOW</p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              What I&apos;m focused on right now.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-charcoal md:text-lg">
              A snapshot of current academic work, active research systems in Chainstox Lab, and planned investigations.
            </p>
          </div>
        </header>

        <section className="grid gap-8 py-14 md:grid-cols-2">
          {/* 01 Academic Focus */}
          <article className="border border-rule bg-paper/60 p-7">
            <span className="archival-mono text-xs text-ember">01 // ACADEMIC STUDIES</span>
            <h2 className="editorial-serif mt-3 text-3xl text-ink">
              Economics at Universiti Malaya
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              Studying economics at the Faculty of Business and Economics, Universiti Malaya—focusing on incentives, market structure, monetary institutions, and resource allocation.
            </p>
            <div className="mt-6 border-t border-rule pt-4">
              <Link
                href="/archive/education"
                className="archival-mono text-xs text-ink underline underline-offset-4"
              >
                Read: Education & Direction →
              </Link>
            </div>
          </article>

          {/* 02 Chainstox Lab Systems */}
          <article className="border border-rule bg-paper/60 p-7">
            <span className="archival-mono text-xs text-ink">02 // INDEPENDENT LAB</span>
            <h2 className="editorial-serif mt-3 text-3xl text-ink">
              Chainstox Lab Research Systems
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              Refining the Market Valuation Engine, On-Chain Market Intelligence pipeline, and SGD-NEER Shadow Model to test market expectations and liquidity conditions.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 border-t border-rule pt-4">
              <Link
                href="/research"
                className="archival-mono text-xs text-ink underline underline-offset-4"
              >
                Research Collection →
              </Link>
              <Link
                href="/lab"
                className="archival-mono text-xs text-ink underline underline-offset-4"
              >
                Chainstox Lab ↗
              </Link>
            </div>
          </article>

          {/* 03 Semiconductor Agenda */}
          <article className="border border-rule bg-ivory p-7">
            <span className="archival-mono text-xs text-ink">
              03 // PLANNED RESEARCH AGENDA
            </span>
            <h2 className="editorial-serif mt-3 text-3xl text-ink">
              Semiconductor Industry & Architecture
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              Organizing research notes on mobile SoC evolution, chip architecture trade-offs, and the industrial economics of leading-edge semiconductor manufacturing.
            </p>
            <div className="mt-6 border-t border-rule pt-4">
              <Link
                href="/research/semiconductors"
                className="archival-mono text-xs text-ink underline underline-offset-4"
              >
                Open Semiconductor Dossier →
              </Link>
            </div>
          </article>

          {/* 04 Off-Screen Practice */}
          <article className="border border-rule bg-ivory p-7">
            <span className="archival-mono text-xs text-ink">04 // ELSEWHERE</span>
            <h2 className="editorial-serif mt-3 text-3xl text-ink">
              Classical Guitar & Field Notes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              Continuing regular classical guitar practice and documenting field observations across cities, architecture, and everyday systems.
            </p>
            <div className="mt-6 border-t border-rule pt-4">
              <Link
                href="/archive/elsewhere"
                className="archival-mono text-xs text-ink underline underline-offset-4"
              >
                Explore Elsewhere →
              </Link>
            </div>
          </article>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
