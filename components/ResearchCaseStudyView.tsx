import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";
import type { ResearchCaseStudyRecord } from "@/lib/archive-data";

export function ResearchCaseStudyView({ study }: { study: ResearchCaseStudyRecord }) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* Breadcrumb & Archival Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link href="/research" className="archival-mono hover:text-ink">
              RESEARCH COLLECTION
            </Link>
            <span>/</span>
            <span className="archival-mono text-ink">{study.category}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="archival-mono border border-rule bg-paper px-2.5 py-1 text-[10px] text-charcoal">
              {study.figureNumber}
            </span>
            <span className="archival-mono border border-ink/20 bg-ivory px-2.5 py-1 text-[10px] text-ink">
              {study.status}
            </span>
          </div>
        </div>

        {/* Project Identity & Research Question Spread */}
        <section className="grid gap-10 border-b border-rule py-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div>
            <p className="archival-mono text-xs text-muted">{study.category}</p>
            <h1 className="editorial-serif mt-4 text-4xl font-normal leading-[1.06] text-ink md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal md:text-xl">
              {study.shortDescription}
            </p>

            {/* Primary Research Question Callout */}
            <div className="mt-10 border-l-2 border-ink bg-paper/75 p-6 md:p-8">
              <p className="archival-mono text-[11px] text-muted">01 / CENTRAL RESEARCH QUESTION</p>
              <p className="editorial-serif mt-3 text-xl italic leading-relaxed text-ink md:text-2xl">
                “{study.researchQuestion}”
              </p>
            </div>
          </div>

          {/* Archival Dossier Metadata Card */}
          <aside className="specimen-sheet p-6 md:p-7">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <span className="archival-mono text-[11px] text-ink">PROJECT DOSSIER</span>
              <span className="archival-mono text-[10px] text-muted">VERIFIED RECORD</span>
            </div>

            <dl className="mt-5 divide-y divide-rule text-xs">
              <div className="py-3">
                <dt className="archival-mono text-[10px] text-muted">DISCIPLINE</dt>
                <dd className="mt-1 font-medium text-ink">{study.category}</dd>
              </div>
              <div className="py-3">
                <dt className="archival-mono text-[10px] text-muted">SYSTEM STATUS</dt>
                <dd className="mt-1 text-charcoal">{study.status}</dd>
              </div>
              <div className="py-3">
                <dt className="archival-mono text-[10px] text-muted">TECHNICAL STACK</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {study.system.stack.map((tech) => (
                    <span
                      key={tech}
                      className="archival-mono border border-rule bg-ivory px-2 py-0.5 text-[10px] text-charcoal"
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="py-3">
                <dt className="archival-mono text-[10px] text-muted">OUTPUT SURFACE</dt>
                <dd className="mt-1 text-charcoal">{study.output.format}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-2.5 border-t border-rule pt-5">
              <Link
                href={study.labRoute}
                className="archival-mono inline-flex items-center justify-between bg-ink px-4 py-3 text-xs text-ivory transition hover:bg-charcoal"
              >
                <span>Open in Chainstox Lab</span>
                <span>↗</span>
              </Link>
              {study.githubUrl ? (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="archival-mono inline-flex items-center justify-between border border-ink/25 bg-ivory px-4 py-3 text-xs text-ink transition hover:bg-stone/50"
                >
                  <span>Inspect Source Repository (GitHub)</span>
                  <span>↗</span>
                </a>
              ) : null}
            </div>
          </aside>
        </section>

        {/* 02 Context & 03 Approach */}
        <section className="grid gap-10 border-b border-rule py-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="archival-mono text-xs text-muted">02 — 03 / CONTEXT & APPROACH</p>
            <h2 className="editorial-serif mt-3 text-2xl text-ink md:text-3xl">
              Framing the problem before building the system.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:col-span-9">
            <div className="border-t border-rule pt-5">
              <p className="archival-mono text-[11px] text-muted">02 / RESEARCH CONTEXT</p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-charcoal">
                {study.context.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border-t border-rule pt-5">
              <p className="archival-mono text-[11px] text-muted">03 / ANALYTICAL APPROACH</p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-charcoal">
                {study.approach.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 Methodology & Analytical Layers */}
        <section className="border-b border-rule py-14">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="archival-mono text-xs text-muted">04 / METHODOLOGY & STRUCTURAL LAYERS</p>
              <h2 className="editorial-serif mt-3 text-3xl text-ink md:text-4xl">
                How signals are organized and interpreted.
              </h2>
            </div>
            <span className="archival-mono text-[11px] text-muted">
              TRANSPARENT RULE & PROXY ARCHITECTURE
            </span>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {study.methodology.map((item) => (
              <article
                key={item.layer}
                className="flex flex-col justify-between border border-rule bg-paper/55 p-6 md:p-7"
              >
                <div>
                  <p className="archival-mono text-[11px] text-ember">{item.layer}</p>
                  <h3 className="editorial-serif mt-2 text-2xl text-ink">{item.focus}</h3>
                  <div className="mt-5 border-t border-rule pt-4">
                    <p className="archival-mono text-[10px] text-muted">OBSERVED SIGNALS & INPUTS</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal">{item.signals}</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-rule pt-4">
                  <p className="archival-mono text-[10px] text-muted">ANALYTICAL ROLE</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-graphite">{item.interpretation}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 05 System Architecture & 06 Output Specimen */}
        <section className="grid gap-10 border-b border-rule py-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="archival-mono text-xs text-muted">05 / SYSTEM ARCHITECTURE</p>
            <h2 className="editorial-serif mt-3 text-3xl text-ink">
              Pipeline & implementation boundary.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              {study.system.architectureSummary}
            </p>

            <div className="mt-8 border border-rule bg-paper/50 p-6">
              <p className="archival-mono text-[11px] text-ink">DATA INPUTS</p>
              <ul className="mt-3 space-y-2 text-sm text-charcoal">
                {study.system.inputs.map((input) => (
                  <li key={input} className="flex items-start gap-2.5">
                    <span className="archival-mono mt-1 text-[10px] text-muted">—</span>
                    <span>{input}</span>
                  </li>
                ))}
              </ul>

              <p className="archival-mono mt-6 border-t border-rule pt-5 text-[11px] text-ink">
                EXECUTION SEQUENCE
              </p>
              <ol className="mt-3 space-y-2.5 text-sm text-charcoal">
                {study.system.pipelineSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="archival-mono mt-0.5 text-[11px] text-muted">
                      0{index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* 06 Output Specimen */}
          <div>
            <p className="archival-mono text-xs text-muted">06 / SYSTEM OUTPUT STRUCTURE</p>
            <h2 className="editorial-serif mt-3 text-3xl text-ink">
              Analytical schema & diagnostic surface.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-graphite">
              Rather than presenting fabricated historical backtests, the specimen below documents the actual diagnostic structure generated by the system.
            </p>

            <div className="mt-6 border border-ink bg-lab p-6 text-bone">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
                <span className="archival-mono text-[11px] text-bone/80">
                  {study.output.sampleHeader}
                </span>
                <span className="archival-mono border border-white/20 px-2 py-0.5 text-[10px] text-bone/60">
                  SCHEMA SPECIMEN
                </span>
              </div>

              <div className="mt-4 divide-y divide-white/10 font-mono text-xs">
                {study.output.sampleLines.map(([label, value]) => (
                  <div key={label} className="grid gap-2 py-3 sm:grid-cols-[0.38fr_0.62fr]">
                    <span className="text-bone/50">{label}</span>
                    <span className="text-bone/90">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-bone/65">
                {study.output.interpretationNote}
              </div>
            </div>
          </div>
        </section>

        {/* 07 Methodological Limitations */}
        <section className="grid gap-10 border-b border-rule py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="archival-mono text-xs text-ember">07 / LIMITATIONS & EPISTEMIC BOUNDARIES</p>
            <h2 className="editorial-serif mt-3 text-3xl text-ink">
              What the model does not claim to know.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              Every independent research tool operates under data constraints and simplifying assumptions. Documenting those boundaries explicitly is part of the work.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-4">
              {study.limitations.map((limitation, idx) => (
                <div
                  key={idx}
                  className=" grid gap-3 border border-rule bg-paper/60 p-5 sm:grid-cols-[auto_1fr]"
                >
                  <span className="archival-mono text-xs text-ember">LIMITATION 0{idx + 1}</span>
                  <p className="text-sm leading-relaxed text-charcoal">{limitation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 Related Research & Continuation */}
        <section className="pt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="archival-mono text-xs text-muted">08 / RELATED RESEARCH & CONTINUATION</p>
              <h2 className="editorial-serif mt-2 text-3xl text-ink">
                Connected inquiries in the collection.
              </h2>
            </div>
            <Link
              href="/research"
              className="archival-mono border border-rule bg-paper px-4 py-2.5 text-xs text-ink transition hover:border-ink"
            >
              ← Return to Research Collection
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {study.relatedResearch.map((rel) => (
              <Link
                key={rel.href}
                href={rel.href}
                className="group flex flex-col justify-between border border-rule bg-paper/40 p-6 transition hover:border-ink hover:bg-paper"
              >
                <div>
                  <span className="archival-mono text-[10px] text-muted">{rel.category}</span>
                  <h3 className="editorial-serif mt-3 text-2xl text-ink group-hover:underline">
                    {rel.title}
                  </h3>
                </div>
                <span className="archival-mono mt-6 inline-flex items-center gap-2 text-xs text-charcoal">
                  <span>Open Record</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
