import type { Metadata } from "next";
import Link from "next/link";
import { DemoCards } from "@/components/lab/DemoCards";
import { ExportsChart } from "@/components/lab/ExportsChart";
import { LabHero } from "@/components/lab/LabHero";
import { LabNav } from "@/components/lab/LabNav";
import { NeerBandChart } from "@/components/lab/NeerBandChart";
import { Reveal } from "@/components/lab/Reveal";
import { TiltCard } from "@/components/lab/TiltCard";
import { projects, type Project } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Chainstox Lab — Research systems for reading markets",
  description:
    "Chainstox Lab builds research systems for macro, FX, equities and on-chain markets — in Python, on real data."
};

const featuredSlugs = ["sgd-neer-shadow-model", "kospi-signal-monitor", "on-chain-market-intelligence", "market-valuation-engine"];

const thesisBySlug: Record<string, string> = {
  "on-chain-market-intelligence":
    "Regime research across on-chain behaviour, liquidity conditions, capital flow and narrative rotation.",
  "market-valuation-engine": "Macro, sector, valuation and positioning signals organised into one market-structure read.",
  "sgd-neer-shadow-model": "A transparent basket proxy for Singapore's exchange-rate policy band — rebuilt from public FX.",
  "kospi-signal-monitor": "Korea equity signals across semiconductors, FX, exports and volatility."
};

const MIS_MODULES = [
  ["01", "Macro Regime", "10Y/2Y yields · DXY · VIX · carry"],
  ["02", "Sector Momentum", "1M / 3M / 6M relative strength vs SPY"],
  ["03", "Sector Deep Dive", "Breadth · PE expansion · quality"],
  ["04", "Company Research", "Revenue & margin acceleration · FCF"],
  ["05", "Overheat Monitor", "200-day distance · forward PE stretch"],
  ["06", "Risk & Rotation", "Leadership durability · capital rotation"],
  ["07", "Full Market Report", "One end-to-end synthesis"]
];

function projectHref(p: Project) {
  return p.slug === "market-intelligence-system" ? "/lab/market-intelligence-system" : `/lab/projects/${p.slug}`;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65">{children}</span>
  );
}

export default function LabPage() {
  const featured = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
  const others = projects.filter((p) => p.category !== "Archive" && !featuredSlugs.includes(p.slug));

  return (
    <main className="min-h-screen bg-black font-sans text-white antialiased selection:bg-white selection:text-black">
      <LabNav />
      <LabHero />

      {/* Three live cards, like a product's first glance */}
      <Reveal className="relative z-10 mx-auto -mt-16 max-w-[1400px] px-5 md:px-8">
        <DemoCards />
      </Reveal>

      {/* Live data */}
      <Reveal id="live" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pt-32 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Live from the lab</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
          Not screenshots. The models, running.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/55">
          Hover or tap any point. Change the assumptions. Every number below is computed in your browser from the same
          data the Python models use.
        </p>

        <div className="mt-14 grid gap-4">
          <div className="rounded-[28px] border border-white/[0.08] bg-[#0B0B0C] p-6 md:p-10">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Pill>FX · Singapore</Pill>
                  <Pill>Python · OLS · piecewise band</Pill>
                </div>
                <h3 className="mt-4 text-2xl font-medium tracking-tight md:text-3xl">Shadow S$NEER policy band</h3>
                <p className="mt-2 max-w-2xl text-white/55">
                  MAS manages the Singapore dollar against a secret basket inside an unpublished band. This model infers
                  the basket from 12 currencies and rebuilds the band from every policy statement.
                </p>
              </div>
              <Link
                href="/lab/projects/sgd-neer-shadow-model"
                className="rounded-full bg-white/[0.08] px-5 py-2.5 text-sm text-white transition hover:bg-white/[0.14]"
              >
                How it works ›
              </Link>
            </div>
            <NeerBandChart />
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-[#0B0B0C] p-6 md:p-10">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Pill>Equities · Korea</Pill>
                  <Pill>MOTIR export releases</Pill>
                </div>
                <h3 className="mt-4 text-2xl font-medium tracking-tight md:text-3xl">Korea export tracker</h3>
                <p className="mt-2 max-w-2xl text-white/55">
                  The export side of the KOSPI Signal Monitor: 20 product groups, every month, straight from the trade
                  ministry&apos;s releases. Pick a product to see how much of the country it carries.
                </p>
              </div>
              <Link
                href="/lab/projects/kospi-signal-monitor"
                className="rounded-full bg-white/[0.08] px-5 py-2.5 text-sm text-white transition hover:bg-white/[0.14]"
              >
                How it works ›
              </Link>
            </div>
            <ExportsChart />
          </div>
        </div>
      </Reveal>

      {/* Systems */}
      <Reveal id="systems" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pt-36 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Systems</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
          Independent systems, one research stack.
        </h2>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {featured.map((p, k) => (
            <TiltCard key={p.slug} className="min-h-[320px]">
              <Link href={projectHref(p)} className="flex h-full flex-col justify-between p-7 md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Pill>{p.type}</Pill>
                    <Pill>{p.status}</Pill>
                  </div>
                  <span className="font-mono text-xs text-white/30">0{k + 1}</span>
                </div>
                <div className="mt-16">
                  <h3 className="text-2xl font-medium tracking-tight md:text-[2rem]">{p.name}</h3>
                  <p className="mt-3 max-w-xl text-white/55">{thesisBySlug[p.slug] ?? p.description}</p>
                  <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
                    Open <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>

        {others.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {others.map((p) => (
              <TiltCard key={p.slug} max={4}>
                <Link href={projectHref(p)} className="flex h-full flex-col p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">{p.category}</p>
                  <h3 className="mt-3 text-lg font-medium">{p.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-white/50">{p.description}</p>
                </Link>
              </TiltCard>
            ))}
          </div>
        ) : null}
      </Reveal>

      {/* Flagship product */}
      <Reveal className="mx-auto max-w-[1400px] px-5 pt-36 md:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0B0B0C] p-7 md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,138,91,0.18),transparent_65%)]"
          />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>First Chainstox product</Pill>
                <Pill>v1.0 public beta</Pill>
              </div>
              <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
                Market Intelligence System
              </h2>
              <p className="mt-6 max-w-xl text-lg text-white/55">
                A standalone research workstation: macro liquidity, sector momentum, company fundamentals, overheat and
                rotation risk — in five languages. A research tool, not a trading signal.
              </p>
              <Link
                href="/lab/market-intelligence-system"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black transition hover:bg-white/90"
              >
                Product showcase ›
              </Link>
            </div>
            <ol className="divide-y divide-white/[0.07] rounded-2xl border border-white/[0.08] bg-black/40">
              {MIS_MODULES.map(([no, name, spec]) => (
                <li key={no} className="grid grid-cols-[2.5rem_1fr] gap-x-3 px-5 py-3.5 sm:grid-cols-[2.5rem_11rem_1fr]">
                  <span className="font-mono text-xs text-white/30">{no}</span>
                  <span className="text-sm text-white">{name}</span>
                  <span className="col-start-2 text-sm text-white/45 sm:col-start-auto">{spec}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>

      {/* Principles */}
      <Reveal className="mx-auto max-w-[1400px] px-5 py-36 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["Regimes", "over predictions."],
            ["Probabilities", "over certainty."],
            ["Systems", "over isolated signals."]
          ].map(([a, b]) => (
            <p key={a} className="text-3xl font-medium leading-tight tracking-[-0.02em] md:text-4xl">
              {a} <span className="text-white/40">{b}</span>
            </p>
          ))}
        </div>
      </Reveal>

      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-10 text-sm text-white/40 md:px-8">
          <p>Chainstox Lab · research interfaces, not financial advice.</p>
          <div className="flex gap-6">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/research" className="transition hover:text-white">
              Research
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
