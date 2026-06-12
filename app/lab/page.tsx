import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const featuredSlugs = [
  "on-chain-market-intelligence",
  "market-valuation-engine",
  "sgd-neer-shadow-model",
  "kospi-signal-monitor"
];

const thesisBySlug: Record<string, string> = {
  "on-chain-market-intelligence": "Crypto regimes are clearer when on-chain, liquidity, flows, and narratives are scored together.",
  "market-valuation-engine": "Valuation only matters when it is read beside liquidity, rotation, quality, and crowding.",
  "sgd-neer-shadow-model": "Singapore dollar policy can be studied through a transparent proxy, even when the official basket is hidden.",
  "kospi-signal-monitor": "Korean equity signals need to connect semiconductors, FX, exports, volatility, and culture-linked proxies."
};

const categoryBySlug: Record<string, string> = {
  "on-chain-market-intelligence": "Crypto Market Structure",
  "market-valuation-engine": "Market Intelligence",
  "sgd-neer-shadow-model": "Macro / FX",
  "kospi-signal-monitor": "Equity Signals"
};

const labPillars = [
  ["Macro", "FX pressure, liquidity, rates"],
  ["Signals", "equity leadership, breadth, flows"],
  ["Structure", "crypto regimes, narratives, positioning"],
  ["Decisions", "rules, thresholds, caveats"]
];

const consoleLines = [
  ["/scan macro", "liquidity regime: selective risk appetite"],
  ["/rank sectors", "semis leadership · utilities defensive bid"],
  ["/check NVDA", "quality rerating · valuation heat visible"],
  ["/shadow neer", "SGD proxy near estimated policy centre"]
];

export default function LabPage() {
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const labProjects = projects.filter((project) => project.category !== "Archive");
  const firstFeatured = featuredProjects[1] || featuredProjects[0];

  return (
    <main className="lab-shell lab-grid min-h-screen px-5 pb-24 pt-5 text-bone md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 py-5 text-sm text-bone/62">
        <Link className="flex items-center gap-3 font-semibold tracking-[0.18em] text-bone" href="/">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-harbor/40 bg-harbor/10 text-xs text-harbor">C</span>
          CHAINSTOX LAB
        </Link>
        <div className="flex items-center gap-5">
          <Link className="transition hover:text-bone" href="/">
            Home
          </Link>
          <Link className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-bone transition hover:border-harbor/50" href="/lab">
            Console
          </Link>
        </div>
      </nav>

      <MotionSection className="mx-auto grid min-h-[78vh] max-w-7xl gap-8 py-14 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-harbor/30 bg-harbor/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-harbor">
            <span className="h-1.5 w-1.5 rounded-full bg-moss shadow-[0_0_16px_rgba(127,149,113,0.9)]" />
            Research Product Layer
          </div>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.02em] text-bone md:text-7xl">
            Market intelligence systems, not dashboards for decoration.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-bone/64 md:text-xl">
            A focused lab for macro/FX, equity signals, crypto market structure, valuation frameworks, and decision automation.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {firstFeatured ? (
              <Link className="rounded-full bg-bone px-5 py-3 font-medium text-ink transition hover:-translate-y-0.5 hover:bg-white" href={`/lab/projects/${firstFeatured.slug}`}>
                Open Market Console
              </Link>
            ) : null}
            <a className="rounded-full border border-white/15 bg-white/[0.025] px-5 py-3 font-medium text-bone transition hover:-translate-y-0.5 hover:border-harbor/55" href="#projects">
              View Research Systems
            </a>
          </div>
          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {labPillars.map(([label, value]) => (
              <div className="lab-surface rounded-lg p-4" key={label}>
                <p className="text-xs uppercase tracking-[0.2em] text-harbor/80">{label}</p>
                <p className="mt-2 text-sm leading-6 text-bone/68">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lab-console overflow-hidden rounded-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-ember/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-harbor/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-moss/80" />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-bone/38">chainstox://research</p>
          </div>
          <div className="lab-terminal-lines p-5 font-mono text-sm">
            <div className="mb-6 rounded-lg border border-white/8 bg-black/30 p-4">
              <p className="text-bone/42">system status</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["4 featured", "8 systems", "1 live demo"].map((item) => (
                  <div className="rounded-md border border-white/8 bg-white/[0.025] px-3 py-2 text-bone/76" key={item}>{item}</div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {consoleLines.map(([command, output]) => (
                <div key={command}>
                  <p><span className="text-moss">$</span> <span className="text-bone">{command}</span></p>
                  <p className="mt-1 pl-4 text-bone/48">{output}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl py-12" id="projects">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-harbor/85">Featured Systems</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-bone md:text-5xl">Research products with a point of view.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-bone/50">Each system is built around a narrow question, explicit assumptions, and output that can be inspected.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              className="group lab-surface relative overflow-hidden rounded-xl p-6 transition duration-300 hover:-translate-y-1 hover:border-harbor/45"
              key={project.slug}
            >
              <div className="absolute right-5 top-5 font-mono text-xs text-bone/24">0{index + 1}</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-harbor/35 bg-harbor/10 px-3 py-1 text-harbor">{categoryBySlug[project.slug]}</span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-bone/65">{project.status}</span>
              </div>
              <h3 className="mt-8 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.01em] text-bone md:text-3xl">{project.name}</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-bone/62">{thesisBySlug[project.slug]}</p>
              <div className="mt-6 grid gap-2 border-y border-white/8 py-4 font-mono text-xs text-bone/45 sm:grid-cols-2">
                <span>type: {project.type}</span>
                <span>demo: {project.demoType}</span>
                <span>stack: {project.techStack.slice(0, 2).join(" + ")}</span>
                <span>status: {project.status.toLowerCase()}</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition hover:bg-white" href={`/lab/projects/${project.slug}`}>
                  Try Demo
                </Link>
                <Link className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-bone transition hover:border-harbor/55" href={`/lab/projects/${project.slug}`}>
                  Learn More
                </Link>
                {project.githubUrl ? (
                  <a className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-bone/70 transition hover:border-bone/45 hover:text-bone" href={project.githubUrl} rel="noreferrer" target="_blank">
                    GitHub
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-harbor/85">Project Index</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-bone md:text-5xl">Current research surface.</h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/35">filtered / active / inspectable</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {labProjects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl py-16">
        <div className="lab-console rounded-xl p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-harbor/85">Operating Principles</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Regimes over predictions", "Probabilities over certainty", "Systems over isolated signals"].map((principle) => (
              <div className="rounded-lg border border-white/10 bg-white/[0.025] p-5" key={principle}>
                <h3 className="text-xl font-semibold text-bone">{principle}</h3>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-bone/60">
            Chainstox Lab is built around the belief that markets should be interpreted as systems, not isolated price movements.
          </p>
        </div>
      </MotionSection>

      <section className="mx-auto max-w-7xl border-t border-white/10 pt-8 text-sm leading-6 text-bone/45">
        These demos are experimental research interfaces. Simulated outputs are for presentation only and are not financial advice.
      </section>
    </main>
  );
}
