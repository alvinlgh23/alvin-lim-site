import Link from "next/link";
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
  "on-chain-market-intelligence": "On-chain, liquidity, flow, and narrative signals compressed into a regime map.",
  "market-valuation-engine": "Macro conditions, sector heat, and company chase risk in one inspectable output.",
  "sgd-neer-shadow-model": "A transparent SGD basket proxy for studying MAS-style policy pressure.",
  "kospi-signal-monitor": "Korea equity intelligence across semiconductors, FX, exports, and volatility."
};

const labMetrics = [
  ["Systems", "08"],
  ["External UIs", "04"],
  ["Embedded", "01"],
  ["Coming soon", "03"]
];

const consoleRows = [
  ["hub", "Central index for separate research apps", "online"],
  ["market", "Embedded console retained in this site", "preview"],
  ["ui apps", "Launch out to deployed project surfaces", "external"],
  ["source", "GitHub remains the project record", "linked"]
];

export default function LabPage() {
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const labProjects = projects.filter((project) => project.category !== "Archive");
  const primaryProject = featuredProjects[0];

  return (
    <main className="lab-shell lab-grid min-h-screen px-4 pb-24 pt-4 text-bone md:px-8">
      <nav className="lab-topbar sticky top-4 z-20 mx-auto flex max-w-7xl items-center justify-between rounded-lg px-3 py-3 text-sm text-bone/62">
        <Link className="lab-focus-ring flex items-center gap-3 rounded-md px-2 py-1.5 font-semibold tracking-[0.16em] text-bone" href="/">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] font-mono text-xs text-bone">CL</span>
          <span className="hidden sm:inline">CHAINSTOX LAB</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone" href="/">
            Home
          </Link>
          <a className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone" href="#projects">
            Systems
          </a>
          <a className="lab-button-secondary lab-focus-ring rounded-md px-3 py-2 text-bone transition hover:border-bone/30" href="#index">
            Index
          </a>
        </div>
      </nav>

      <MotionSection className="mx-auto grid max-w-7xl gap-8 pb-14 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-moss/20 bg-moss/10 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.16em] text-moss/90">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            Central Lab Hub
          </div>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.97] tracking-[-0.02em] text-bone md:text-7xl">
            A launch hub for research systems and deployed project apps.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-bone/62">
            Chainstox Lab now acts as the central map. UI-heavy projects live in their own codebases and deployments; Market Intelligence stays embedded here while the backend runner evolves.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {primaryProject ? (
              <Link className="lab-button-primary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white" href={`/lab/projects/${primaryProject.slug}`}>
                Open Market Console
              </Link>
            ) : null}
            <a className="lab-button-secondary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:border-bone/30" href="#projects">
              Browse systems
            </a>
          </div>
        </div>

        <div className="lab-console overflow-hidden rounded-lg">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/36">chainstox://lab</p>
              <p className="mt-1 text-sm text-bone/60">Hub and deployment map</p>
            </div>
            <span className="rounded-md border border-moss/25 bg-moss/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-moss/85">
              online
            </span>
          </div>
          <div className="grid grid-cols-2 border-b border-white/8 md:grid-cols-4">
            {labMetrics.map(([label, value]) => (
              <div className="border-r border-white/8 p-4 last:border-r-0" key={label}>
                <p className="font-mono text-2xl font-semibold text-bone">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-bone/36">{label}</p>
              </div>
            ))}
          </div>
          <div className="p-5">
            <div className="grid grid-cols-[0.45fr_1fr_0.34fr] border-b border-white/8 pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/34">
              <span>signal</span>
              <span>read</span>
              <span className="text-right">state</span>
            </div>
            <div className="divide-y divide-white/8">
              {consoleRows.map(([signal, read, state]) => (
                <div className="grid grid-cols-[0.45fr_1fr_0.34fr] gap-3 py-3 text-sm" key={signal}>
                  <span className="font-mono text-bone/70">{signal}</span>
                  <span className="text-bone/68">{read}</span>
                  <span className="text-right font-mono text-xs uppercase tracking-[0.12em] text-moss/85">{state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <div className="lab-hairline mx-auto h-px max-w-7xl" />

      <MotionSection className="mx-auto max-w-7xl py-14" id="projects">
        <div className="mb-8 grid gap-5 md:grid-cols-[0.72fr_0.28fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/38">Featured Systems</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.01em] text-bone md:text-5xl">
              Project apps stay separate; this hub points to them.
            </h2>
          </div>
          <p className="text-sm leading-6 text-bone/50">
            External UI projects launch out to their own deployments and source repos. The embedded console is reserved for Market Intelligence.
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
                  <span className="lab-chip rounded-md px-2.5 py-1 text-xs text-bone/74">{project.type}</span>
                  <span className="rounded-md border border-moss/20 bg-moss/10 px-2.5 py-1 text-xs text-moss/90">{project.status}</span>
                </div>
                <span className="font-mono text-xs text-bone/28">0{index + 1}</span>
              </div>
              <h3 className="mt-9 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.01em] text-bone md:text-3xl">{project.name}</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-bone/60">{thesisBySlug[project.slug]}</p>
              <div className="mt-7 grid gap-2 border-y border-white/8 py-4 font-mono text-xs text-bone/42 sm:grid-cols-2">
                <span>category / {project.category}</span>
                <span>surface / {project.demoType}</span>
                <span>stack / {project.techStack.slice(0, 2).join(" + ")}</span>
                <span>status / {project.status.toLowerCase()}</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.demoType === "external-app" && project.liveUrl ? (
                  <a className="lab-button-primary lab-focus-ring rounded-md px-3.5 py-2 text-sm font-medium transition hover:bg-white" href={project.liveUrl} rel="noreferrer" target="_blank">
                    Launch App
                  </a>
                ) : (
                  <Link className="lab-button-primary lab-focus-ring rounded-md px-3.5 py-2 text-sm font-medium transition hover:bg-white" href={`/lab/projects/${project.slug}`}>
                    {project.demoType === "embedded-console" ? "Open Console" : project.demoType === "external-app" ? "App Preview" : "Details"}
                  </Link>
                )}
                {project.githubUrl ? (
                  <a className="rounded-md border border-white/10 px-3.5 py-2 text-sm font-medium text-bone/60 transition hover:border-bone/28 hover:text-bone" href={project.githubUrl} rel="noreferrer" target="_blank">
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
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/38">Project Index</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-bone md:text-5xl">Current lab surface.</h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-bone/34">external apps / embedded console / source</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {labProjects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl py-12">
        <div className="lab-console rounded-lg p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/38">Operating Principles</p>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {["Regimes over predictions", "Probabilities over certainty", "Systems over isolated signals"].map((principle) => (
              <div className="rounded-lg border border-white/10 bg-white/[0.025] p-5" key={principle}>
                <h3 className="text-lg font-semibold text-bone">{principle}</h3>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <section className="mx-auto max-w-7xl border-t border-white/10 pt-8 text-sm leading-6 text-bone/42">
        Chainstox Lab is a hub. External apps are deployed separately; embedded outputs are experimental and are not financial advice.
      </section>
    </main>
  );
}
