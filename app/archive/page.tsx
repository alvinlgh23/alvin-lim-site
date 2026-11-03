import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";
import { ARCHIVE_COLLECTION_ENTRIES } from "@/lib/archive-data";

export const metadata: Metadata = {
  title: "Personal Archive | Alvin Lim — A Personal Archive",
  description:
    "A few things outside the usual categories. A collection of experiences, places, and interests that have shaped different parts of my life."
};

export default function PersonalArchivePage() {
  const [education, election, bts, elsewhere] = ARCHIVE_COLLECTION_ENTRIES;

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* Top Archival Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <span className="archival-mono text-xs text-ink">
            COLLECTION 02 — PERSONAL ARCHIVE & DOCUMENTARY RECORDS
          </span>
          <span className="archival-mono text-[11px] text-muted">
            PILLAR II: HOW I GOT HERE · PILLAR III: THE THINGS IN BETWEEN
          </span>
        </div>

        {/* Hero & Exact Introduction */}
        <section className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="archival-mono text-xs text-ember">PERSONAL ARCHIVE</p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              A few things outside the usual categories.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-charcoal md:text-xl">
              A collection of experiences, places, and interests that have shaped different parts of my life.
            </p>
          </div>
        </section>

        {/* Asymmetric Editorial Collection Entries (Avoid identical cards) */}
        <section className="space-y-10 py-14">
          {/* Row 1: Education & Direction (7 cols) + Campus Election (5 cols) */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Entry 01: Education & Direction */}
            <article className="flex flex-col justify-between border border-ink bg-paper/75 p-7 md:p-9 lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                  <span className="archival-mono text-[11px] text-ember">
                    {education.catalogNumber}
                  </span>
                  <span className="archival-mono text-[10px] text-muted">
                    {education.date}
                  </span>
                </div>

                <h2 className="editorial-serif mt-5 text-3xl text-ink md:text-5xl">
                  {education.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal md:text-lg">
                  {education.summary}
                </p>

                <div className="mt-6 border-t border-rule pt-5">
                  <p className="archival-mono text-[10px] text-muted">
                    FIVE-PART ESSAY SEQUENCE
                  </p>
                  <ul className="mt-3 grid gap-2 text-xs text-charcoal sm:grid-cols-2">
                    {education.highlights.map((item) => (
                      <li key={item} className="border border-rule bg-ivory p-2.5">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-rule pt-5">
                <span className="archival-mono text-[10px] text-muted">
                  FORMAT: {education.editorialFormat}
                </span>
                <Link
                  href={education.route}
                  className="archival-mono bg-ink px-5 py-3 text-xs text-ivory transition hover:bg-charcoal"
                >
                  Read Essay →
                </Link>
              </div>
            </article>

            {/* Entry 02: Campus Election */}
            <article className="flex flex-col justify-between border border-rule bg-ivory p-7 md:p-9 lg:col-span-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                  <span className="archival-mono text-[11px] text-ink">
                    {election.catalogNumber}
                  </span>
                  <span className="archival-mono text-[10px] text-muted">
                    {election.date}
                  </span>
                </div>

                <h2 className="editorial-serif mt-5 text-3xl text-ink md:text-4xl">
                  {election.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-charcoal">
                  {election.summary}
                </p>

                <div className="mt-6 border border-rule bg-paper/55 p-4">
                  <p className="archival-mono text-[10px] text-muted">ARCHIVAL DOSSIER</p>
                  <ul className="mt-2.5 space-y-2 text-xs text-charcoal">
                    {election.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="archival-mono text-muted">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-rule pt-5">
                <span className="archival-mono text-[10px] text-muted">
                  UNIVERSITI MALAYA · NOV 2024
                </span>
                <Link
                  href={election.route}
                  className="archival-mono border border-ink bg-ivory px-4 py-2.5 text-xs text-ink transition hover:bg-ink hover:text-ivory"
                >
                  Open Record →
                </Link>
              </div>
            </article>
          </div>

          {/* Row 2: Behind the Scenes (5 cols) + Elsewhere (7 cols) */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Entry 03: Behind the Scenes */}
            <article className="flex flex-col justify-between border border-rule bg-ivory p-7 md:p-9 lg:col-span-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                  <span className="archival-mono text-[11px] text-ink">
                    {bts.catalogNumber}
                  </span>
                  <span className="archival-mono text-[10px] text-muted">
                    PRODUCTION LOGS
                  </span>
                </div>

                <h2 className="editorial-serif mt-5 text-3xl text-ink md:text-4xl">
                  {bts.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-charcoal">
                  {bts.summary}
                </p>

                <div className="mt-6 space-y-2 border-t border-rule pt-4 text-xs text-graphite">
                  {bts.highlights.map((item, idx) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b border-rule pb-2"
                    >
                      <span className="archival-mono text-[10px] text-muted">
                        SEQ 0{idx + 1}
                      </span>
                      <span className="text-right text-charcoal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-rule pt-5">
                <span className="archival-mono text-[10px] text-muted">
                  CONTACT SHEET & NOTES
                </span>
                <Link
                  href={bts.route}
                  className="archival-mono border border-ink bg-ivory px-4 py-2.5 text-xs text-ink transition hover:bg-ink hover:text-ivory"
                >
                  Explore Collection →
                </Link>
              </div>
            </article>

            {/* Entry 04: Elsewhere */}
            <article className="flex flex-col justify-between border border-rule bg-paper/65 p-7 md:p-9 lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                  <span className="archival-mono text-[11px] text-ember">
                    {elsewhere.catalogNumber}
                  </span>
                  <span className="archival-mono text-[10px] text-muted">
                    {elsewhere.location}
                  </span>
                </div>

                <h2 className="editorial-serif mt-5 text-3xl text-ink md:text-5xl">
                  {elsewhere.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal md:text-lg">
                  {elsewhere.summary}
                </p>

                <div className="mt-6 grid gap-3 border-t border-rule pt-5 sm:grid-cols-3">
                  <div className="border border-rule bg-ivory p-4">
                    <span className="archival-mono text-[10px] text-ember">01 // WORK & TRAVEL</span>
                    <p className="editorial-serif mt-1.5 text-lg text-ink">Atlantic City, US</p>
                    <p className="mt-1 text-xs text-graphite">
                      Summer work, boardwalk shifts, and everyday independence.
                    </p>
                  </div>
                  <div className="border border-rule bg-ivory p-4">
                    <span className="archival-mono text-[10px] text-ink">02 // FIELD NOTES</span>
                    <p className="editorial-serif mt-1.5 text-lg text-ink">Cities & Streets</p>
                    <p className="mt-1 text-xs text-graphite">
                      Architecture, urban density, and transit observations.
                    </p>
                  </div>
                  <div className="border border-rule bg-ivory p-4">
                    <span className="archival-mono text-[10px] text-ink">03 // INTERESTS</span>
                    <p className="editorial-serif mt-1.5 text-lg text-ink">Music & Guitar</p>
                    <p className="mt-1 text-xs text-graphite">
                      Classical guitar practice and personal collections.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-rule pt-5">
                <span className="archival-mono text-[10px] text-muted">
                  FORMAT: {elsewhere.editorialFormat}
                </span>
                <Link
                  href={elsewhere.route}
                  className="archival-mono bg-ink px-5 py-3 text-xs text-ivory transition hover:bg-charcoal"
                >
                  Open Field Journal →
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Cross-Link to Chronological Journey */}
        <section className="border-t border-rule pt-12">
          <div className="flex flex-col justify-between gap-6 border border-rule bg-paper/45 p-6 md:flex-row md:items-center md:p-8">
            <div>
              <p className="archival-mono text-xs text-muted">
                CHRONOLOGICAL INDEX VS. NARRATIVE ARCHIVE
              </p>
              <h3 className="editorial-serif mt-2 text-2xl text-ink">
                Looking for the chronological milestone log?
              </h3>
              <p className="mt-1 text-sm text-graphite">
                While the Personal Archive explores experiences in essay and documentary form, the Journey page records when each transition happened chronologically.
              </p>
            </div>
            <Link
              href="/journey"
              className="archival-mono shrink-0 border border-ink bg-ivory px-5 py-3 text-xs text-ink transition hover:bg-ink hover:text-ivory"
            >
              Open Chronological Journey →
            </Link>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
