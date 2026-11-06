import Link from "next/link";
import { MisLaunchButton } from "@/components/MisLaunchButton";
import { MotionSection } from "@/components/MotionSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const featuredSlugs = [
  "market-valuation-engine",
  "on-chain-market-intelligence",
  "kospi-signal-monitor",
  "sgd-neer-shadow-model"
];

const thesisBySlug: Record<string, string> = {
  "on-chain-market-intelligence":
    "Regime research across on-chain behavior, liquidity conditions, capital flow, and narrative rotation.",
  "market-valuation-engine":
    "Macro, sector, valuation, and positioning signals organized into a market-structure read.",
  "sgd-neer-shadow-model":
    "A transparent SGD basket proxy for studying Singapore exchange-rate policy pressure.",
  "kospi-signal-monitor":
    "Korea equity signal research across semiconductors, FX, exports, and volatility."
};

const labMetrics = [
  ["Official Product", "01"],
  ["Systems", "09"],
  ["External UIs", "05"],
  ["Embedded", "01"]
];

const consoleRows = [
  ["mis v1.0", "Market Intelligence System workstation (Public Beta)", "featured"],
  ["hub", "Central index for independent research systems", "online"],
  ["market", "Embedded market-intelligence CLI console", "preview"],
  ["ui apps", "Separate deployed analytical interfaces", "external"],
  ["source", "Repository records and implementation notes", "linked"]
];

const misCapabilities = [
  "Macro Regime Analysis",
  "Sector Momentum",
  "Sector Deep Dive",
  "Company Research",
  "Overheat Monitor",
  "Risk & Rotation",
  "Full Market Report",
  "Five-language interface"
];

export default function LabPage() {
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const labProjects = projects.filter((project) => project.category !== "Archive");

  return (
    <main className="lab-shell lab-grid min-h-screen px-4 pb-24 pt-4 text-bone md:px-8">
      <nav className="lab-topbar sticky top-4 z-20 mx-auto flex max-w-7xl items-center justify-between rounded-lg px-3 py-3 text-sm text-bone/62">
        <Link
          className="lab-focus-ring lab-wordmark flex items-center gap-3 rounded-md px-2 py-1.5 font-semibold text-bone"
          href="/"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] font-mono text-xs text-bone">
            CL
          </span>
          <span className="hidden sm:inline">CHAINSTOX LAB</span>
        </Link>
        <div className="flex flex-wrap items-center gap-1">
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone"
            href="/"
          >
            Exhibition
          </Link>
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone"
            href="/research"
          >
            Research
          </Link>
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone"
            href="/archive"
          >
            Archive
          </Link>
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 text-moss transition hover:bg-white/[0.05] hover:text-bone"
            href="/lab/market-intelligence-system"
          >
            MIS v1.0
          </Link>
          <a
            className="lab-button-secondary lab-focus-ring rounded-md px-3 py-2 text-bone transition hover:border-bone/30"
            href="#index"
          >
            Index
          </a>
        </div>
      </nav>

      <MotionSection className="mx-auto grid max-w-7xl gap-8 pb-14 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
        <div>
          <div className="lab-eyebrow inline-flex items-center gap-2 rounded-md border border-moss/20 bg-moss/10 px-2.5 py-1 text-xs text-moss/90">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            Research Systems Group
          </div>
          <h1 className="lab-hero-title mt-7 max-w-4xl text-[2.6rem] text-bone md:text-[4.8rem]">
            Market Intelligence Infrastructure
          </h1>
          <p className="lab-copy mt-7 max-w-2xl text-lg text-bone/62">
            Chainstox Lab develops research systems for market structure, macro intelligence, valuation analysis, signal generation, and decision frameworks across public markets and digital assets.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              className="lab-button-primary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white"
              href="/lab/market-intelligence-system"
            >
              Explore MIS v1.0 Showcase
            </Link>
            <a
              className="lab-button-secondary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:border-bone/30"
              href="#projects"
            >
              Browse systems
            </a>
          </div>
        </div>

        <div className="lab-console overflow-hidden rounded-lg">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div>
              <p className="lab-eyebrow text-xs text-bone/36">chainstox://lab</p>
              <p className="mt-1 text-sm text-bone/60">Hub and deployment map</p>
            </div>
            <span className="lab-eyebrow rounded-md border border-moss/25 bg-moss/10 px-2.5 py-1 text-[11px] text-moss/85">
              online
            </span>
          </div>
          <div className="grid grid-cols-2 border-b border-white/8 md:grid-cols-4">
            {labMetrics.map(([label, value]) => (
              <div className="border-r border-white/8 p-4 last:border-r-0" key={label}>
                <p className="font-mono text-2xl font-medium text-bone">{value}</p>
                <p className="lab-eyebrow mt-1 text-xs text-bone/36">{label}</p>
              </div>
            ))}
          </div>
          <div className="p-5">
            <div className="lab-eyebrow grid grid-cols-[0.45fr_1fr_0.34fr] border-b border-white/8 pb-2 text-[11px] text-bone/34">
              <span>signal</span>
              <span>read</span>
              <span className="text-right">state</span>
            </div>
            <div className="divide-y divide-white/8">
              {consoleRows.map(([signal, read, state]) => (
                <div
                  className="grid grid-cols-[0.45fr_1fr_0.34fr] gap-3 py-3 text-sm"
                  key={signal}
                >
                  <span className="font-mono text-bone/70">{signal}</span>
                  <span className="text-bone/68">{read}</span>
                  <span className="lab-eyebrow text-right text-xs text-moss/85">{state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <div className="lab-hairline mx-auto h-px max-w-7xl" />

      {/* =====================================================================
          FIRST FEATURED CHAINSTOX PRODUCT — MARKET INTELLIGENCE SYSTEM (MIS)
      ===================================================================== */}
      <MotionSection className="mx-auto max-w-7xl py-14" id="featured-product">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="lab-eyebrow inline-flex items-center gap-2 rounded-md border border-moss/30 bg-moss/10 px-3 py-1 text-xs text-moss">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" />
              FIRST OFFICIAL CHAINSTOX PRODUCT
            </span>
            <span className="lab-chip rounded-md px-2.5 py-1 font-mono text-xs text-bone/80">
              v1.0 Public Beta
            </span>
          </div>
          <span className="font-mono text-xs text-bone/45">
            STANDALONE WORKSTATION · https://mis.alvin-lim.com
          </span>
        </div>

        <article className="lab-console overflow-hidden rounded-lg border border-moss/25 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="lab-eyebrow text-xs text-bone/45">
                CHAINSTOX // FINANCIAL RESEARCH & MARKET INTELLIGENCE WORKSTATION
              </p>
              <h2 className="lab-section-title mt-3 text-3xl text-bone md:text-[2.65rem]">
                Market Intelligence System
              </h2>
              <p className="lab-copy mt-4 max-w-2xl text-base text-bone/68">
                An independently deployed market intelligence workstation designed to evaluate macro liquidity regimes, sector momentum, sector deep dives, company fundamentals, positioning overheat, and rotation risks across a five-language interface.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {misCapabilities.map((feature) => (
                  <span
                    key={feature}
                    className="lab-kbd rounded-md px-2.5 py-1 font-mono text-xs text-bone/72"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-start gap-3 border-t border-white/10 pt-6">
                <MisLaunchButton label="Launch Application" variant="primary" />
                <Link
                  href="/lab/market-intelligence-system"
                  className="lab-button-secondary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:border-bone/30"
                >
                  Product Showcase & Architecture →
                </Link>
              </div>
            </div>

            {/* Real Workstation Schema Preview Card */}
            <div className="rounded-lg border border-white/12 bg-black/45 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <span className="text-bone/75">mis.alvin-lim.com // WORKSTATION OVERVIEW</span>
                <span className="text-moss">5-LANG UI</span>
              </div>
              <div className="mt-4 space-y-2.5 font-mono text-xs">
                {[
                  ["01 · Macro Regime", "10Y/2Y yields · DXY 3M · VIX · Carry conditions"],
                  ["02 · Sector Momentum", "1M / 3M / 6M relative strength leaderboard vs SPY"],
                  ["03 · Sector Deep Dive", "Breadth participation · PE expansion · Quality screen"],
                  ["04 · Company Research", "Revenue & margin acceleration · FCF · Narrative read"],
                  ["05 · Overheat Monitor", "200MA distance · Fwd PE stretch · Chase-risk stage"],
                  ["06 · Risk & Rotation", "Leadership durability & capital rotation diagnostics"],
                  ["07 · Full Market Report", "Unified end-to-end market intelligence synthesis"]
                ].map(([mod, spec]) => (
                  <div
                    key={mod}
                    className="grid gap-1 border-b border-white/[0.06] pb-2 last:border-b-0 last:pb-0 sm:grid-cols-[0.42fr_0.58fr]"
                  >
                    <span className="text-bone/50">{mod}</span>
                    <span className="text-bone/85">{spec}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-white/10 pt-3 text-[11px] text-bone/45">
                Positioned strictly as a financial research workstation — not an automated trading or guaranteed investment recommendation system.
              </p>
            </div>
          </div>
        </article>
      </MotionSection>

      <div className="lab-hairline mx-auto h-px max-w-7xl" />

      <MotionSection className="mx-auto max-w-7xl py-14" id="projects">
        <div className="mb-8 grid gap-5 md:grid-cols-[0.72fr_0.28fr] md:items-end">
          <div>
            <p className="lab-eyebrow text-xs text-bone/38">Featured Systems</p>
            <h2 className="lab-section-title mt-3 max-w-3xl text-3xl text-bone md:text-[2.65rem]">
              Independent systems for market research and signal evaluation.
            </h2>
          </div>
          <p className="lab-copy text-sm text-bone/50">
            Each interface is maintained as a separate project surface. This hub provides the research index, source links, and the embedded Market Intelligence console.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              className="group lab-surface relative overflow-hidden rounded-lg p-6 transition duration-300 hover:-translate-y-0.5 hover:border-bone/22"
              key={project.slug}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="lab-chip rounded-md px-2.5 py-1 text-xs text-bone/74">
                    {project.type}
                  </span>
                  <span className="rounded-md border border-moss/20 bg-moss/10 px-2.5 py-1 text-xs text-moss/90">
                    {project.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-bone/28">0{index + 1}</span>
              </div>
              <h3 className="lab-section-title mt-9 max-w-xl text-2xl text-bone md:text-[1.8rem]">
                {project.name}
              </h3>
              <p className="lab-copy mt-4 max-w-2xl text-base text-bone/60">
                {thesisBySlug[project.slug]}
              </p>
              <div className="mt-7 grid gap-2 border-y border-white/8 py-4 font-mono text-xs text-bone/42 sm:grid-cols-2">
                <span>category / {project.category}</span>
                <span>surface / {project.demoType}</span>
                <span>stack / {project.techStack.slice(0, 2).join(" + ")}</span>
                <span>status / {project.status.toLowerCase()}</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.demoType === "external-app" && project.liveUrl ? (
                  <a
                    className="lab-button-primary lab-focus-ring rounded-md px-3.5 py-2 text-sm font-medium transition hover:bg-white"
                    href={project.liveUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Launch App
                  </a>
                ) : (
                  <Link
                    className="lab-button-primary lab-focus-ring rounded-md px-3.5 py-2 text-sm font-medium transition hover:bg-white"
                    href={`/lab/projects/${project.slug}`}
                  >
                    {project.demoType === "embedded-console"
                      ? "Open Console"
                      : project.demoType === "external-app"
                        ? "App Preview"
                        : "Details"}
                  </Link>
                )}
                {project.githubUrl ? (
                  <a
                    className="rounded-md border border-white/10 px-3.5 py-2 text-sm font-medium text-bone/60 transition hover:border-bone/28 hover:text-bone"
                    href={project.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl py-14" id="index">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="lab-eyebrow text-xs text-bone/38">Project Index</p>
            <h2 className="lab-section-title mt-3 text-3xl text-bone md:text-[2.65rem]">
              Current research surface.
            </h2>
          </div>
          <p className="lab-eyebrow text-xs text-bone/34">
            external apps / embedded console / source
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {labProjects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl py-12">
        <div className="lab-console rounded-lg p-6 md:p-8">
          <p className="lab-eyebrow text-xs text-bone/38">Operating Principles</p>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {[
              "Regimes over predictions",
              "Probabilities over certainty",
              "Systems over isolated signals"
            ].map((principle) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.025] p-5"
                key={principle}
              >
                <h3 className="lab-section-title text-lg text-bone">{principle}</h3>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <section className="lab-copy mx-auto max-w-7xl border-t border-white/10 pt-8 text-sm text-bone/42">
        Chainstox Lab is a research hub. External applications are deployed separately; embedded outputs are experimental research interfaces and are not financial advice.
      </section>
    </main>
  );
}
