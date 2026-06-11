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
  "market-valuation-engine": "Valuation Framework",
  "sgd-neer-shadow-model": "Macro / FX",
  "kospi-signal-monitor": "Equity Signals"
};

export default function LabPage() {
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const labProjects = projects.filter((project) => project.category !== "Archive");
  const firstFeatured = featuredProjects[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(100,127,145,0.16),transparent_34%),linear-gradient(180deg,#10100e_0%,#12130f_48%,#0e100f_100%)] px-5 pb-24 pt-6 md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-5 text-sm text-bone/70">
        <Link className="font-semibold tracking-[0.18em] text-bone" href="/">
          ALVIN LIM
        </Link>
        <div className="flex items-center gap-5">
          <Link className="transition hover:text-bone" href="/">
            Home
          </Link>
          <Link className="transition hover:text-bone" href="/lab">
            Lab
          </Link>
        </div>
      </nav>

      <MotionSection className="mx-auto grid min-h-[78vh] max-w-6xl gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-harbor">CHAINSTOX LAB</p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] text-bone md:text-7xl">
            Research interfaces for markets and decision systems.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-bone/68">
            Market structure, macro/FX, equity signals, crypto regimes, and valuation frameworks.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {firstFeatured ? (
              <Link className="rounded-full bg-bone px-5 py-3 font-medium text-ink transition hover:bg-white" href={`/lab/projects/${firstFeatured.slug}`}>
                Try Featured Demo
              </Link>
            ) : null}
            <a className="rounded-full border border-white/15 px-5 py-3 font-medium text-bone transition hover:border-bone/50" href="#projects">
              Explore Projects
            </a>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#151611]/90 p-5 shadow-glow">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Signals", "Equity + macro"],
              ["Regimes", "Crypto + liquidity"],
              ["FX", "SGD policy proxy"],
              ["Valuation", "Crowding + quality"]
            ].map(([label, value]) => (
              <div className="rounded-md border border-white/10 bg-black/18 p-4" key={label}>
                <p className="text-xs uppercase tracking-[0.2em] text-ember/75">{label}</p>
                <p className="mt-3 text-lg font-semibold text-bone">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-white/10 pt-5">
            <p className="text-sm leading-6 text-bone/58">
              Each project is a small research instrument: inputs, assumptions, output, caveats.
            </p>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl py-12" id="projects">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-ember/80">Featured Projects</p>
            <h2 className="mt-3 text-3xl font-semibold text-bone md:text-5xl">Four research tracks.</h2>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <article
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-ember/45 hover:bg-white/[0.055]"
              key={project.slug}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ember via-harbor to-moss opacity-80" />
              <div className="grid gap-3 text-xs sm:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-md border border-ember/35 bg-ember/10 p-3">
                  <p className="uppercase tracking-[0.18em] text-ember/70">Category</p>
                  <p className="mt-2 font-medium text-ember">
                  {categoryBySlug[project.slug]}
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/14 p-3">
                  <p className="uppercase tracking-[0.18em] text-bone/40">Status</p>
                  <p className="mt-2 text-bone/68">
                  {project.status}
                  </p>
                </div>
              </div>
              <h3 className="mt-7 text-2xl font-semibold leading-tight text-bone md:text-3xl">{project.name}</h3>
              <div className="mt-5 border-l border-ember/45 pl-4">
                <p className="text-xs uppercase tracking-[0.2em] text-ember/70">Thesis</p>
                <p className="mt-2 max-w-2xl text-lg leading-7 text-bone/74">{thesisBySlug[project.slug]}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span className="rounded-full bg-black/24 px-3 py-1 text-xs text-bone/50" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-bone transition hover:border-bone/50"
                  href={`/lab/projects/${project.slug}`}
                >
                  Learn More
                </Link>
                <Link
                  className="rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition hover:bg-white"
                  href={`/lab/projects/${project.slug}`}
                >
                  Try Demo
                </Link>
                {project.githubUrl ? (
                  <a
                    className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-bone/75 transition hover:border-bone/50 hover:text-bone"
                    href={project.githubUrl}
                    rel="noreferrer"
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

      <MotionSection className="mx-auto max-w-6xl py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-ember/80">Project Index</p>
          <h2 className="mt-3 text-3xl font-semibold text-bone md:text-5xl">All current lab work.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {labProjects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto grid max-w-6xl gap-4 py-16 md:grid-cols-3">
        <div className="md:col-span-3">
          <p className="text-sm uppercase tracking-[0.24em] text-ember/80">Method</p>
        </div>
        {["Regimes over predictions", "Probabilities over certainty", "Systems over isolated signals"].map((principle) => (
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5" key={principle}>
            <h3 className="text-xl font-semibold text-bone">{principle}</h3>
          </div>
        ))}
        <p className="mt-4 max-w-3xl text-lg leading-8 text-bone/68 md:col-span-3">
          Chainstox Lab is built around the belief that markets should be interpreted as systems, not isolated price movements.
        </p>
      </MotionSection>

      <section className="mx-auto max-w-6xl border-t border-white/10 pt-8 text-sm leading-6 text-bone/55">
        These demos are experimental research interfaces. Simulated outputs are for presentation only and are not financial advice.
      </section>
    </main>
  );
}
