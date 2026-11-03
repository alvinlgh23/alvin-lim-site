import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Elsewhere | Personal Archive — Alvin Lim",
  description:
    "Elsewhere, for a while. Work & Travel in Atlantic City, urban field notes, and personal interests."
};

export default function ElsewherePage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link href="/archive" className="archival-mono hover:text-ink">
              PERSONAL ARCHIVE
            </Link>
            <span>/</span>
            <span className="archival-mono text-ink">ELSEWHERE</span>
          </div>
          <span className="archival-mono text-[11px] text-muted">
            PILLAR III · THE THINGS IN BETWEEN
          </span>
        </div>

        {/* Hero */}
        <header className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="archival-mono text-xs text-ember">
              PERSONAL FIELD JOURNAL // ARCHIVE 04
            </p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              Elsewhere, for a while.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-charcoal md:text-lg">
              Working in unfamiliar places, walking through cities, and keeping track of personal interests outside formal study and market research.
            </p>
          </div>
        </header>

        {/* =====================================================================
            01 — WORK & TRAVEL (ATLANTIC CITY, UNITED STATES)
        ===================================================================== */}
        <section className="border-b border-rule py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-ember">01 — WORK & TRAVEL</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink md:text-4xl">
                Atlantic City, United States.
              </h2>
            </div>
            <span className="archival-mono border border-rule bg-paper px-3 py-1 text-[10px] text-charcoal">
              J-1 WORK & TRAVEL RECORD · NEW JERSEY, USA
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="border border-ink bg-paper/65 p-6 md:p-8 lg:col-span-7">
              <p className="archival-mono text-[10px] text-muted">
                FIELD DISPATCH // ATLANTIC CITY BOARDWALK & SHIFT WORK
              </p>
              <div className="mt-4 space-y-4 text-base leading-[1.8] text-charcoal">
                <p>
                  Participating in the Work & Travel program in the United States meant stepping completely outside the familiar rhythm of university lectures in Malaysia and spending a summer working in Atlantic City, New Jersey.
                </p>
                <p>
                  Daily life revolved around shift schedules, uniforms, boardwalk crowds, and learning how to handle practical responsibilities in an unfamiliar environment with strangers who quickly became coworkers.
                </p>
                <p>
                  Atlantic City was loud and fast-paced on the surface, yet the experience itself taught a quieter kind of independence—solving everyday problems on your own before they ever turn into a story.
                </p>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-5">
              <div className="specimen-sheet p-6">
                <div className="flex items-center justify-between border-b border-rule pb-2.5">
                  <span className="archival-mono text-[10px] text-ink">
                    LOG 01.A — LOCATION METADATA
                  </span>
                  <span className="archival-mono text-[10px] text-muted">39.3643° N, 74.4229° W</span>
                </div>
                <dl className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-rule pb-2">
                    <dt className="text-graphite">Program</dt>
                    <dd className="font-medium text-ink">Summer Work & Travel (USA)</dd>
                  </div>
                  <div className="flex justify-between border-b border-rule pb-2">
                    <dt className="text-graphite">Primary Base</dt>
                    <dd className="font-medium text-ink">Atlantic City, New Jersey</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-graphite">Context</dt>
                    <dd className="text-charcoal">Seasonal shift work & independent travel</dd>
                  </div>
                </dl>
              </div>

              <div className="border border-rule bg-ivory p-5">
                <p className="archival-mono text-[10px] text-muted">OBSERVATION</p>
                <p className="editorial-serif mt-2 text-lg italic text-ink">
                  “Boardwalk lights, practical problems, and the kind of learning that does not ask for permission first.”
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            02 — PLACES & FIELD NOTES
        ===================================================================== */}
        <section className="border-b border-rule py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-ink">02 — PLACES & FIELD NOTES</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink md:text-4xl">
                Cities, streets, architecture, and everyday observations.
              </h2>
            </div>
            <span className="archival-mono text-[11px] text-muted">
              FIELD NOTEBOOK ENTRIES
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Field Note 01: New York */}
            <article className="flex flex-col justify-between border border-rule bg-ivory p-6">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-ember">NOTE 02.1 // NEW YORK</span>
                  <span className="archival-mono text-[10px] text-muted">UNITED STATES</span>
                </div>
                <h3 className="editorial-serif mt-4 text-2xl text-ink">
                  Scale, Density & Looking Up
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Walking across Manhattan after working in New Jersey—noticing how vertical density, subway transit, and street-level commerce compress an enormous amount of human ambition into a few square miles.
                </p>
              </div>
              <div className="mt-6 border-t border-rule pt-3 text-xs text-muted">
                <span className="archival-mono text-[10px]">
                  URBAN OBSERVATION · SKYLINE & TRANSIT GRID
                </span>
              </div>
            </article>

            {/* Field Note 02: Kuala Lumpur & Selangor */}
            <article className="flex flex-col justify-between border border-rule bg-ivory p-6">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-ink">
                    NOTE 02.2 // KUALA LUMPUR
                  </span>
                  <span className="archival-mono text-[10px] text-muted">MALAYSIA</span>
                </div>
                <h3 className="editorial-serif mt-4 text-2xl text-ink">
                  Infrastructure & Everyday Movement
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Commuting between Klang, Petaling Jaya, and the Universiti Malaya campus—observing how rail extensions, highway bottlenecks, and neighborhood commercial districts shape daily economic life.
                </p>
              </div>
              <div className="mt-6 border-t border-rule pt-3 text-xs text-muted">
                <span className="archival-mono text-[10px]">
                  HOME FIELD · URBAN PLANNING & RESOURCE FLOW
                </span>
              </div>
            </article>

            {/* Field Note 03: Korea */}
            <article className="flex flex-col justify-between border border-rule bg-ivory p-6">
              <div>
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="archival-mono text-[10px] text-ink">
                    NOTE 02.3 // KOREA
                  </span>
                  <span className="archival-mono text-[10px] text-muted">EAST ASIA</span>
                </div>
                <h3 className="editorial-serif mt-4 text-2xl text-ink">
                  Industrial & Cultural Intersections
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  Exploring South Korea both as a place to travel and as an economic case study where semiconductor manufacturing, export discipline, and cultural industries intersect—later inspiring the KOSPI Signal Monitor.
                </p>
              </div>
              <div className="mt-6 border-t border-rule pt-3 text-xs text-muted">
                <span className="archival-mono text-[10px]">
                  TRAVEL & RESEARCH TRACE · SEOUL
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================================
            03 — PERSONAL INTERESTS
        ===================================================================== */}
        <section className="pt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-ember">03 — PERSONAL INTERESTS</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink md:text-4xl">
                Music, guitar, and tactile problem-solving.
              </h2>
            </div>
            <span className="archival-mono text-[11px] text-muted">
              OFF-SCREEN DISCIPLINES
            </span>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Classical Guitar */}
            <article className="border border-rule bg-paper/60 p-7">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="archival-mono text-[10px] text-ink">
                  INTEREST 03.A // CLASSICAL GUITAR & MUSIC
                </span>
                <span className="archival-mono text-[10px] text-muted">PRACTICE</span>
              </div>
              <h3 className="editorial-serif mt-4 text-2xl text-ink md:text-3xl">
                Classical Guitar
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal">
                Practicing classical guitar offers a counterbalance to analytical and digital work. Progress on the instrument cannot be rushed—it comes from slow repetition, attention to tone and finger placement, and patience over months and years.
              </p>
            </article>

            {/* Hardware Tinkering & Collections */}
            <article className="border border-rule bg-paper/60 p-7">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="archival-mono text-[10px] text-ink">
                  INTEREST 03.B // DEVICES & REPAIR
                </span>
                <span className="archival-mono text-[10px] text-muted">HARDWARE</span>
              </div>
              <h3 className="editorial-serif mt-4 text-2xl text-ink md:text-3xl">
                Consumer Hardware & Device Teardowns
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal">
                Long before building Python valuation scripts, curiosity meant opening up faulty second-hand smartphones, replacing components, and seeing how consumer electronics are put together on the inside.
              </p>
              <div className="mt-5 border-t border-rule pt-4">
                <Link
                  href="/research/semiconductors"
                  className="archival-mono text-xs text-ink underline underline-offset-4"
                >
                  Connected: From smartphones to silicon →
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
