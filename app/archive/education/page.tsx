import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Education & Direction | Personal Archive — Alvin Lim",
  description:
    "A different way of understanding systems: a five-part autobiographical essay on transitioning from law at UKM to economics at Universiti Malaya."
};

export default function EducationDirectionPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link href="/archive" className="archival-mono hover:text-ink">
              ARCHIVE
            </Link>
            <span>/</span>
            <span className="archival-mono text-ink">EDUCATION & DIRECTION</span>
          </div>
          <span className="archival-mono text-[11px] text-muted">
            AUTOBIOGRAPHICAL ESSAY · FIVE PARTS
          </span>
        </div>

        {/* Essay Title Header */}
        <header className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="archival-mono text-xs text-ember">
              ARCHIVE 01 // EDUCATION & DIRECTION
            </p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              A different way of understanding systems.
            </h1>
          </div>
          <div className="lg:col-span-4">
            <div className="border-l border-rule pl-5 text-xs text-graphite">
              <p className="archival-mono text-[10px] text-muted">ESSAY PROGRESSION</p>
              <p className="mt-1.5 leading-relaxed">
                01 An Early Ambition → 02 Choosing Law → 03 Entering Economics → 04 The Campus Election → 05 Choosing Another Direction
              </p>
            </div>
          </div>
        </header>

        {/* Five-Part Autobiographical Essay */}
        <div className="divide-y divide-rule">
          {/* PART 01 */}
          <section className="grid gap-8 py-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="archival-mono text-xs text-ember">01 — AN EARLY AMBITION</span>
              <p className="archival-mono mt-2 text-[10px] text-muted">
                ECONOMIC POLICY, INFRASTRUCTURE & SYSTEMS
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="max-w-2xl space-y-5 text-lg leading-[1.85] text-charcoal">
                <p>
                  Before I became interested in financial research, I had a different ambition.
                </p>
                <p>
                  I wanted to help shape how Malaysia developed — from economic policies and resource allocation to the planning of cities and infrastructure.
                </p>
                <p>
                  I used to imagine urban planning almost like building a city in Minecraft, thinking about how everything could fit together more efficiently.
                </p>
              </div>
            </div>
          </section>

          {/* PART 02 */}
          <section className="grid gap-8 py-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="archival-mono text-xs text-ink">02 — CHOOSING LAW</span>
              <p className="archival-mono mt-2 text-[10px] text-muted">
                UNIVERSITI KEBANGSAAN MALAYSIA (UKM)
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="max-w-2xl space-y-5 text-lg leading-[1.85] text-charcoal">
                <p>
                  That ambition initially led me to study law at Universiti Kebangsaan Malaysia.
                </p>
                <p>
                  Once I began, however, I realised that studying law was quite different from the kind of policy and planning work I had imagined.
                </p>
                <p>
                  I eventually decided to change direction and transferred to Universiti Malaya to study economics.
                </p>
              </div>
            </div>
          </section>

          {/* PART 03 */}
          <section className="grid gap-8 py-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="archival-mono text-xs text-ink">03 — ENTERING ECONOMICS</span>
              <p className="archival-mono mt-2 text-[10px] text-muted">
                UNIVERSITI MALAYA · FACULTY OF BUSINESS AND ECONOMICS
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="max-w-2xl space-y-5 text-lg leading-[1.85] text-charcoal">
                <p>
                  Economics offered another way to explore questions about incentives, markets, institutions, and how resources are allocated.
                </p>
                <p>
                  It also became a foundation for my growing interest in financial markets and independent research.
                </p>
              </div>
            </div>
          </section>

          {/* PART 04 */}
          <section className="grid gap-8 py-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="archival-mono text-xs text-ink">04 — THE CAMPUS ELECTION</span>
              <p className="archival-mono mt-2 text-[10px] text-muted">
                NOVEMBER 2024 · STUDENT REPRESENTATIVE CANDIDACY
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="max-w-2xl space-y-5 text-lg leading-[1.85] text-charcoal">
                <p>
                  In 2024, I was selected to stand as a Faculty of Business and Economics student representative candidate with NewGen at Universiti Malaya.
                </p>
                <p>
                  The campaign gave me firsthand experience with student representation and conversations across different campus groups.
                </p>
                <p>It also changed how I viewed political participation.</p>
              </div>

              <div className="mt-7">
                <Link
                  href="/archive/campus-election"
                  className="group inline-flex items-center gap-3 border border-ink bg-paper px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase text-ink transition hover:bg-ink hover:text-ivory"
                >
                  <span>Read the 2024 Campaign Record</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </section>

          {/* PART 05 */}
          <section className="grid gap-8 py-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="archival-mono text-xs text-ember">
                05 — CHOOSING ANOTHER DIRECTION
              </span>
              <p className="archival-mono mt-2 text-[10px] text-muted">
                PRESENT FOCUS · RESEARCH, MARKETS & TECHNOLOGY
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="max-w-2xl space-y-5 text-lg leading-[1.85] text-charcoal">
                <p>
                  Through that experience, I found that the political environment I encountered did not align with the kind of efficiency-focused, evidence-driven work I had originally imagined.
                </p>
                <p>
                  I eventually decided to step away from political participation and focus my efforts on economics, financial markets, technology, and research.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Continuation */}
        <section className="border-t border-rule pt-12">
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/archive/campus-election"
              className="group border border-rule bg-paper/55 p-6 transition hover:border-ink"
            >
              <span className="archival-mono text-[10px] text-muted">NEXT IN ARCHIVE</span>
              <h3 className="editorial-serif mt-2 text-2xl text-ink group-hover:underline">
                Campus Election 2024 →
              </h3>
              <p className="mt-1.5 text-xs text-graphite">
                The full historical record of the November 2024 candidacy at Universiti Malaya.
              </p>
            </Link>

            <Link
              href="/research"
              className="group border border-rule bg-paper/55 p-6 transition hover:border-ink"
            >
              <span className="archival-mono text-[10px] text-muted">RESEARCH COLLECTION</span>
              <h3 className="editorial-serif mt-2 text-2xl text-ink group-hover:underline">
                Curiosity leads. Evidence decides. →
              </h3>
              <p className="mt-1.5 text-xs text-graphite">
                Explore current work across semiconductors, valuation, and monetary systems.
              </p>
            </Link>

            <Link
              href="/journey"
              className="group border border-rule bg-paper/55 p-6 transition hover:border-ink"
            >
              <span className="archival-mono text-[10px] text-muted">CHRONOLOGY</span>
              <h3 className="editorial-serif mt-2 text-2xl text-ink group-hover:underline">
                Journey Milestones →
              </h3>
              <p className="mt-1.5 text-xs text-graphite">
                View the chronological sequence connecting academic and personal milestones.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
