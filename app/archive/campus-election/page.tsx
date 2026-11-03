import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Campus Election 2024 | Personal Archive — Alvin Lim",
  description:
    "On the campaign trail: Universiti Malaya · November 2024. Historical record of standing as a student representative candidate for the Faculty of Business and Economics."
};

export default function CampusElectionPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* Newspaper / Archival Dossier Masthead */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link href="/archive" className="archival-mono hover:text-ink">
              PERSONAL ARCHIVE
            </Link>
            <span>/</span>
            <span className="archival-mono text-ink">CAMPUS LIFE</span>
          </div>
          <span className="archival-mono border border-rule bg-paper px-3 py-1 text-[10px] text-charcoal">
            Universiti Malaya · November 2024
          </span>
        </div>

        {/* Masthead Title & Metadata Strip */}
        <header className="border-b-2 border-ink py-10">
          <p className="archival-mono text-xs text-ember">
            PERSONAL ARCHIVE / CAMPUS LIFE
          </p>
          <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h1 className="editorial-serif text-5xl font-normal leading-[1.03] text-ink md:text-7xl">
              On the campaign trail.
            </h1>
            <div className="border-l border-rule pl-5">
              <p className="archival-mono text-xs font-semibold text-ink">
                Universiti Malaya · November 2024
              </p>
              <p className="mt-1 text-xs text-graphite">
                Faculty of Business and Economics (FBE) · Student Representative Candidacy
              </p>
            </div>
          </div>
        </header>

        {/* Newspaper-Like Editorial Spread */}
        <section className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-start">
          {/* Left 7 Columns: Primary Documentary Plate & Supporting Archival Frames */}
          <div className="space-y-6 lg:col-span-7">
            {/* Primary Archival Plate */}
            <figure className="specimen-sheet specimen-grid-bg p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                <span className="archival-mono text-[10px] text-ink">
                  PLATE 2024.01 — PRIMARY CAMPAIGN RECORD
                </span>
                <span className="archival-mono border border-rule bg-ivory px-2 py-0.5 text-[10px] text-muted">
                  AUTHENTIC PHOTOGRAPH SLOT · NON-FABRICATED
                </span>
              </div>

              <div className="my-6 border border-rule bg-ivory p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="archival-mono text-[10px] text-ember">
                      CANDIDATE DOSSIER // NOV 2024
                    </p>
                    <h2 className="editorial-serif mt-2 text-2xl text-ink md:text-3xl">
                      Faculty of Business and Economics Seat
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal">
                      Selected to stand with NewGen during the November 2024 Universiti Malaya campus elections—engaging directly with students across lecture halls, faculty walkways, and open campus forums.
                    </p>
                  </div>
                  <dl className="space-y-2.5 border-t border-rule pt-4 text-xs md:border-l md:border-t-0 md:pl-5 md:pt-0">
                    <div>
                      <dt className="archival-mono text-[9px] text-muted">UNIVERSITY</dt>
                      <dd className="mt-0.5 font-medium text-ink">Universiti Malaya (UM)</dd>
                    </div>
                    <div>
                      <dt className="archival-mono text-[9px] text-muted">CONSTITUENCY</dt>
                      <dd className="mt-0.5 font-medium text-ink">
                        Faculty of Business & Economics
                      </dd>
                    </div>
                    <div>
                      <dt className="archival-mono text-[9px] text-muted">PLATFORM</dt>
                      <dd className="mt-0.5 text-charcoal">NewGen Candidate</dd>
                    </div>
                    <div>
                      <dt className="archival-mono text-[9px] text-muted">ELECTION OUTCOME</dt>
                      <dd className="mt-0.5 font-medium text-ember">Candidate (Not Elected)</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                <span>
                  Archival Note: Dedicated slot for authentic November 2024 campaign photography. No fabricated campaign imagery is used.
                </span>
                <span className="archival-mono text-[10px]">REF: UM-FBE-2024-11</span>
              </figcaption>
            </figure>

            {/* Supporting Documentary Plates */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border border-rule bg-paper/55 p-5">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="archival-mono text-[10px] text-muted">PLATE 2024.02</span>
                  <span className="archival-mono text-[10px] text-charcoal">CAMPUS DIALOGUE</span>
                </div>
                <h3 className="editorial-serif mt-3 text-xl text-ink">
                  Cross-Platform Conversations
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-graphite">
                  Field conversations with students, teammates, and candidates from other campus groups including UMANY and Demokrat across differing platforms.
                </p>
              </div>

              <div className="border border-rule bg-paper/55 p-5">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="archival-mono text-[10px] text-muted">PLATE 2024.03</span>
                  <span className="archival-mono text-[10px] text-charcoal">POST-CAMPAIGN</span>
                </div>
                <h3 className="editorial-serif mt-3 text-xl text-ink">
                  Reconsidering Direction
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-graphite">
                  Evaluating firsthand experience of student representation and deciding to concentrate on academic inquiry and independent market research.
                </p>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Exact Four-Section Historical Narrative */}
          <div className="space-y-8 lg:col-span-5">
            {/* 01 The Candidacy */}
            <article className="border-b border-rule pb-7">
              <p className="archival-mono text-xs text-ember">01 / THE CANDIDACY</p>
              <h2 className="editorial-serif mt-2 text-2xl text-ink">The Candidacy</h2>
              <div className="mt-3 space-y-3 text-base leading-[1.8] text-charcoal">
                <p>
                  In November 2024, I stood as a student representative candidate for the Faculty of Business and Economics at Universiti Malaya with NewGen.
                </p>
                <p>
                  I was selected to run as a candidate, and the experience introduced me to the practical side of student representation.
                </p>
              </div>
            </article>

            {/* 02 The Campaign */}
            <article className="border-b border-rule pb-7">
              <p className="archival-mono text-xs text-ink">02 / THE CAMPAIGN</p>
              <h2 className="editorial-serif mt-2 text-2xl text-ink">The Campaign</h2>
              <div className="mt-3 space-y-3 text-base leading-[1.8] text-charcoal">
                <p>
                  The campaign involved listening to students, working with teammates, and engaging with candidates from other groups, including UMANY and Demokrat.
                </p>
                <p>
                  Although we approached the election from different platforms, those conversations were an important part of the experience.
                </p>
              </div>
            </article>

            {/* 03 The Outcome */}
            <article className="border-b border-rule pb-7">
              <p className="archival-mono text-xs text-ember">03 / THE OUTCOME</p>
              <h2 className="editorial-serif mt-2 text-2xl text-ink">The Outcome</h2>
              <div className="mt-3 space-y-3 text-base leading-[1.8] text-charcoal">
                <p>I was not elected.</p>
                <p>
                  Nevertheless, the experience gave me a clearer understanding of political participation and helped me reconsider whether it was the direction I wanted to pursue.
                </p>
              </div>
            </article>

            {/* 04 Looking Back */}
            <article>
              <p className="archival-mono text-xs text-ink">04 / LOOKING BACK</p>
              <h2 className="editorial-serif mt-2 text-2xl text-ink">Looking Back</h2>
              <div className="mt-3 space-y-3 text-base leading-[1.8] text-charcoal">
                <p>
                  I eventually chose to move away from politics and concentrate on my academic interests and independent research.
                </p>
                <p>
                  I still value the conversations, teamwork, and experience of participating in the election.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Cross-Links */}
        <section className="pt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-rule bg-paper/50 p-6">
            <div>
              <p className="archival-mono text-[10px] text-muted">CONNECTED ARCHIVE ESSAY</p>
              <p className="editorial-serif mt-1 text-2xl text-ink">
                Read how the 2024 campaign fit into the broader transition from Law to Economics.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/archive/education"
                className="archival-mono bg-ink px-5 py-3 text-xs text-ivory transition hover:bg-charcoal"
              >
                ← Education & Direction
              </Link>
              <Link
                href="/archive/behind-the-scenes"
                className="archival-mono border border-ink bg-ivory px-5 py-3 text-xs text-ink transition hover:bg-ink hover:text-ivory"
              >
                Next: Behind the Scenes →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
