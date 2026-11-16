import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Behind the Scenes | Personal Archive — Alvin Lim",
  description:
    "Before the lights come on. A collection of moments from events, productions, and the work that happens away from the spotlight."
};

const PRODUCTION_RECORDS = [
  {
    code: "RECORD 01 // LIVE EVENT OPERATIONS",
    title: "Venue Preparation & Pre-Show Floor Logistics",
    date: "Event Production Sequence",
    location: "Live Event & Concert Venues",
    involvement: "Event Crew & Backstage Coordination",
    caption:
      "Hours before doors open: stage markings, equipment load-ins, audio-visual checks, and last-minute schedule adjustments.",
    narrative:
      "Audiences experience a live event as a seamless two-hour sequence, but the reality backstage is built on checklists, physical setup, and solving unexpected hardware or timing problems before the house lights dim."
  },
  {
    code: "RECORD 02 // VISUAL & MUSIC-VIDEO PRODUCTION",
    title: "On-Set Production & Lighting Resets",
    date: "Production Set Record",
    location: "Studio & Location Shoots",
    involvement: "Production Support & Set Operations",
    caption:
      "Between takes on set: camera blocking, lighting adjustments, cable management, and keeping a shoot moving on schedule.",
    narrative:
      "Working on music-video and visual production sets offered a close look at how creative work relies on disciplined logistics—where a few seconds of finished screen time require hours of patient coordination behind the camera."
  },
  {
    code: "RECORD 03 // CUE SHEETS & STAGE MANAGEMENT",
    title: "Backstage Transitions Under Time Pressure",
    date: "Show-Run Documentation",
    location: "Backstage & Control Areas",
    involvement: "Transition & Cue Support",
    caption:
      "Different venues, same last-minute chaos: coordinating transitions when schedules compress during a live run.",
    narrative:
      "Regardless of the venue size, the most valuable habit backstage is staying calm when a cue shifts—communicating clearly with the team and fixing what needs fixing without adding noise."
  }
];

export default function BehindTheScenesPage() {
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
            <span className="archival-mono text-ink">BEHIND THE SCENES</span>
          </div>
          <span className="archival-mono text-[11px] text-muted">
            ARCHIVE 03 · DOCUMENTARY PRODUCTION COLLECTION
          </span>
        </div>

        {/* Hero & Exact Introduction */}
        <header className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="archival-mono text-xs text-ember">
              PERSONAL ARCHIVE / EXPERIENCES
            </p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              Before the lights come on.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-charcoal md:text-xl">
              A collection of moments from events, productions, and the work that happens away from the spotlight.
            </p>
          </div>
        </header>

        {/* Documentary Production Records — Varied Editorial Layout */}
        <section className="divide-y divide-rule">
          {PRODUCTION_RECORDS.map((entry, idx) => (
            <article
              key={entry.code}
              className="grid gap-8 py-14 lg:grid-cols-12 lg:items-start"
            >
              {/* Left 4 Cols: Metadata Dossier */}
              <div className="lg:col-span-4">
                <span className="archival-mono text-xs text-ember">{entry.code}</span>
                <h2 className="editorial-serif mt-3 text-3xl text-ink">{entry.title}</h2>

                <dl className="mt-6 divide-y divide-rule border-t border-rule text-xs">
                  <div className="flex justify-between py-2.5">
                    <dt className="archival-mono text-[10px] text-muted">SEQUENCE</dt>
                    <dd className="text-charcoal">{entry.date}</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="archival-mono text-[10px] text-muted">ENVIRONMENT</dt>
                    <dd className="text-charcoal">{entry.location}</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="archival-mono text-[10px] text-muted">INVOLVEMENT</dt>
                    <dd className="font-medium text-ink">{entry.involvement}</dd>
                  </div>
                </dl>
              </div>

              {/* Right 8 Cols: Documentary Contact Sheet & Narrative */}
              <div className="lg:col-span-8">
                <div className="grid gap-6 border border-rule bg-paper/60 p-6 md:p-8 lg:grid-cols-12">
                  {/* Compact Typographic Contact Frame (Never a giant empty gray box) */}
                  <div className="flex flex-col justify-between border border-rule bg-ivory p-5 lg:col-span-5">
                    <div className="flex items-center justify-between border-b border-rule pb-2.5">
                      <span className="archival-mono text-[10px] text-ink">
                        CONTACT FRAME 0{idx + 1}
                      </span>
                      <span className="archival-mono text-[9px] text-muted">35MM LOG</span>
                    </div>

                    <div className="my-4">
                      {/* Technical stage/lighting schematic */}
                      <svg
                        viewBox="0 0 220 90"
                        className="h-20 w-full text-ink"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect x="4" y="4" width="212" height="82" stroke="#D7D2C6" strokeWidth="1" />
                        <line x1="24" y1="20" x2="196" y2="20" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="55" cy="20" r="4" fill="#B8592A" />
                        <circle cx="110" cy="20" r="4" fill="currentColor" />
                        <circle cx="165" cy="20" r="4" fill="#B8592A" />
                        <path d="M55 24 L35 76 M55 24 L75 76" stroke="#7D7A72" strokeDasharray="2 2" />
                        <path d="M110 24 L90 76 M110 24 L130 76" stroke="#7D7A72" strokeDasharray="2 2" />
                        <path d="M165 24 L145 76 M165 24 L185 76" stroke="#7D7A72" strokeDasharray="2 2" />
                      </svg>
                    </div>

                    <p className="text-xs italic leading-relaxed text-graphite">
                      “{entry.caption}”
                    </p>
                  </div>

                  {/* Narrative & Field Notes */}
                  <div className="flex flex-col justify-between lg:col-span-7">
                    <div>
                      <p className="archival-mono text-[10px] text-muted">PRODUCTION NARRATIVE</p>
                      <p className="mt-3 text-base leading-[1.8] text-charcoal">
                        {entry.narrative}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Continuation Footer */}
        <section className="border-t border-rule pt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-rule bg-paper/50 p-6">
            <div>
              <p className="archival-mono text-[10px] text-muted">NEXT COLLECTION IN ARCHIVE</p>
              <p className="editorial-serif mt-1 text-2xl text-ink">
                Elsewhere — Work & Travel in Atlantic City, urban field notes, and personal interests.
              </p>
            </div>
            <Link
              href="/archive/elsewhere"
              className="archival-mono bg-ink px-5 py-3 text-xs text-ivory transition hover:bg-charcoal"
            >
              Explore Elsewhere →
            </Link>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
