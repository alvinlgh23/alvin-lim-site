import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

export const metadata: Metadata = {
  title: "Contact | Alvin Lim — A Personal Archive",
  description:
    "Let's get in touch. If you'd like to talk about research, technology, a project, or something interesting, feel free to reach out."
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        {/* Top Archival Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <span className="archival-mono text-xs text-ink">
            CORRESPONDENCE & VERIFIED DESTINATIONS
          </span>
          <span className="archival-mono text-[11px] text-muted">
            UNIVERSITI MALAYA · KUALA LUMPUR
          </span>
        </div>

        <section className="grid gap-12 py-14 lg:grid-cols-12 lg:items-start">
          {/* Left 6 Cols: Exact Approved Copy */}
          <div className="lg:col-span-6">
            <p className="archival-mono text-xs text-ember">CONTACT</p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              Let&apos;s get in touch.
            </h1>

            <div className="mt-6 max-w-xl space-y-4 text-lg leading-[1.8] text-charcoal md:text-xl">
              <p>Thanks for visiting.</p>
              <p>
                If you&apos;d like to talk about research, technology, a project, or something interesting, feel free to reach out.
              </p>
            </div>

            <div className="mt-10 border-t border-rule pt-6 text-xs text-graphite">
              <p className="archival-mono text-[10px] text-muted">CORRESPONDENCE TOPICS</p>
              <p className="mt-2 leading-relaxed">
                Market structure & valuation research · Semiconductor industry & hardware · Macroeconomic & FX frameworks · Independent analytical tools · Academic collaborations.
              </p>
            </div>
          </div>

          {/* Right 6 Cols: Minimal Editorial Directory */}
          <div className="lg:col-span-6">
            <div className="specimen-sheet p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="archival-mono text-xs text-ink">DIRECTORY</span>
                <span className="archival-mono text-[10px] text-muted">
                  WHERE TO FIND ME
                </span>
              </div>

              <div className="divide-y divide-rule">
                {/* Email */}
                <div className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <p className="archival-mono text-[10px] text-ember">01 // EMAIL</p>
                      <h2 className="editorial-serif mt-1 text-2xl text-ink">Email</h2>
                      <p className="mt-1 text-xs text-graphite">The most direct way to reach me.</p>
                    </div>
                    <a
                      href={`mailto:${VERIFIED_DESTINATIONS.email}`}
                      className="shrink-0 bg-ink px-4 py-2.5 font-mono text-xs text-ivory transition hover:bg-charcoal"
                    >
                      {VERIFIED_DESTINATIONS.email}
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <p className="archival-mono text-[10px] text-ember">02 // LINKEDIN</p>
                      <h2 className="editorial-serif mt-1 text-2xl text-ink">LinkedIn</h2>
                      <p className="mt-1 text-xs text-graphite">
                        Background, education, and professional updates.
                      </p>
                    </div>
                    <a
                      href={VERIFIED_DESTINATIONS.linkedinProfile}
                      target="_blank"
                      rel="noreferrer"
                      className="archival-mono shrink-0 border border-ink bg-ivory px-4 py-2.5 text-xs text-ink transition hover:bg-ink hover:text-ivory"
                    >
                      Open profile ↗
                    </a>
                  </div>
                </div>

                {/* 1. GitHub (Verified) */}
                <div className="py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="archival-mono text-[10px] text-ember">03 // GITHUB</p>
                      <h2 className="editorial-serif mt-1 text-2xl text-ink">GitHub</h2>
                      <p className="mt-1 text-xs text-graphite">
                        Source repositories for Market Valuation Engine, On-Chain Market Intelligence, SGD-NEER Shadow Model, and KOSPI Signal Monitor.
                      </p>
                    </div>
                    <a
                      href={VERIFIED_DESTINATIONS.githubProfile}
                      target="_blank"
                      rel="noreferrer"
                      className="archival-mono shrink-0 border border-ink bg-ivory px-4 py-2.5 text-xs text-ink transition hover:bg-ink hover:text-ivory"
                    >
                      @alvinlgh23 ↗
                    </a>
                  </div>
                </div>

                {/* 2. Chainstox Lab (Verified) */}
                <div className="py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="archival-mono text-[10px] text-ember">
                        04 // CHAINSTOX LAB
                      </p>
                      <h2 className="editorial-serif mt-1 text-2xl text-ink">Chainstox Lab</h2>
                      <p className="mt-1 text-xs text-graphite">
                        Independent research space, interactive system index, and embedded Market Intelligence console.
                      </p>
                    </div>
                    <Link
                      href={VERIFIED_DESTINATIONS.chainstoxLab}
                      className="archival-mono shrink-0 border border-ink bg-ivory px-4 py-2.5 text-xs text-ink transition hover:bg-ink hover:text-ivory"
                    >
                      Open Lab ↗
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
