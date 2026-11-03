import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Thoughts | Alvin Lim — A Personal Archive",
  description: "Essays, ideas, observations, and reflections on markets, technology, and systems."
};

const ESSAY_NOTES = [
  {
    code: "NOTE 001 // VALUATION & EPISTEMOLOGY",
    title: "Intuition first. Evidence next.",
    category: "MARKETS & VALUATION",
    excerpt:
      "My earliest judgments about value came from familiarity rather than formal models. Today, intuition can still give me a starting point, but I try to understand why a judgment might be right — and what could prove it wrong.",
    relatedHref: "/research/markets#trade-my-way-up",
    relatedLabel: "Read: Could I trade my way up? ↗"
  },
  {
    code: "NOTE 002 // MARKET STRUCTURE",
    title: "Why regimes matter more than isolated price predictions",
    category: "RESEARCH SYSTEMS",
    excerpt:
      "Markets are easier to reason about when signals are grouped into liquidity, flow, and positioning regimes instead of treated as isolated triggers. A useful research tool separates signal, narrative, and action.",
    relatedHref: "/research/market-valuation",
    relatedLabel: "Inspect: Market Valuation Engine →"
  },
  {
    code: "NOTE 003 // MODELING HUMILITY",
    title: "Stating clearly what a model cannot know",
    category: "MACRO & MONETARY SYSTEMS",
    excerpt:
      "When studying an exchange-rate framework like Singapore's S$NEER, official basket weights and band parameters are undisclosed. Good independent modeling means making proxy assumptions visible rather than hiding behind confident language.",
    relatedHref: "/research/sgd-neer",
    relatedLabel: "Inspect: SGD-NEER Shadow Model →"
  },
  {
    code: "NOTE 004 // DIRECTION & SYSTEMS",
    title: "Choosing evidence-driven work over political theater",
    category: "PERSONAL ARCHIVE",
    excerpt:
      "Moving from law to economics—and later stepping away from student politics after the 2024 campus election—clarified the kind of work I want to do: quiet, analytical, and grounded in evidence.",
    relatedHref: "/archive/education",
    relatedLabel: "Read: Education & Direction →"
  }
];

export default function ThoughtsPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <span className="archival-mono text-xs text-ink">
            THOUGHTS — ESSAYS, IDEAS, OBSERVATIONS & REFLECTIONS
          </span>
          <span className="archival-mono text-[11px] text-muted">
            WORKING NOTEBOOK
          </span>
        </div>

        <header className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="archival-mono text-xs text-ember">THOUGHTS</p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              Reflections on systems, value, and learning.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-charcoal md:text-lg">
              Short essays, working notes, and reflections connecting research questions in financial markets and technology with personal experiences from the archive.
            </p>
          </div>
        </header>

        <section className="divide-y divide-rule">
          {ESSAY_NOTES.map((note) => (
            <article
              key={note.code}
              className="grid gap-8 py-12 lg:grid-cols-12 lg:items-start"
            >
              <div className="lg:col-span-4">
                <span className="archival-mono text-xs text-ember">{note.code}</span>
                <p className="archival-mono mt-2 text-[10px] text-muted">{note.category}</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="editorial-serif text-3xl text-ink">{note.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-[1.8] text-charcoal">
                  {note.excerpt}
                </p>
                <div className="mt-6">
                  <Link
                    href={note.relatedHref}
                    className="archival-mono text-xs font-semibold text-ink underline underline-offset-4"
                  >
                    {note.relatedLabel}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
