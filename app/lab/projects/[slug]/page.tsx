import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoPanel } from "@/components/DemoPanel";
import { MotionSection } from "@/components/MotionSection";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  return {
    title: project ? `${project.name} | Chainstox Lab` : "Project | Chainstox Lab",
    description: project?.description
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects.filter((item) => item.slug !== project.slug && item.category !== "Archive").slice(0, 3);
  const stats = [
    ["Status", project.status],
    ["Category", project.category],
    ["Mode", project.demoType],
    ["Surface", project.type]
  ];

  return (
    <main className="lab-shell lab-grid min-h-screen px-4 pb-24 pt-4 text-bone md:px-8">
      <nav className="lab-topbar sticky top-4 z-20 mx-auto flex max-w-7xl items-center justify-between rounded-lg px-3 py-3 text-sm text-bone/62">
        <Link className="lab-focus-ring flex items-center gap-3 rounded-md px-2 py-1.5 font-semibold tracking-[0.16em] text-bone" href="/lab">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] font-mono text-xs text-bone">CL</span>
          <span className="hidden sm:inline">CHAINSTOX LAB</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone" href="/">
            Home
          </Link>
          <Link className="lab-button-secondary lab-focus-ring rounded-md px-3 py-2 text-bone transition hover:border-bone/30" href="/lab">
            Lab
          </Link>
        </div>
      </nav>

      <MotionSection className="mx-auto grid max-w-7xl gap-8 pb-12 pt-16 lg:grid-cols-[1fr_0.42fr] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2 text-xs text-bone/70">
            <span className="lab-chip rounded-md px-2.5 py-1 text-bone/74">{project.category}</span>
            <span className="rounded-md border border-moss/20 bg-moss/10 px-2.5 py-1 text-moss/90">{project.status}</span>
            <span className="lab-chip rounded-md px-2.5 py-1 text-bone/60">{project.demoType}</span>
          </div>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.02em] text-bone md:text-7xl">{project.name}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-bone/62">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="lab-button-primary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white" href="#demo">
              Open demo
            </a>
            {project.githubUrl ? (
              <a className="lab-button-secondary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:border-bone/30" href={project.githubUrl} rel="noreferrer" target="_blank">
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <aside className="lab-console rounded-lg p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/36">system card</p>
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-bone/44">v0</span>
          </div>
          <div className="mt-5 divide-y divide-white/8 text-sm">
            {stats.map(([label, value]) => (
              <div className="grid grid-cols-[0.4fr_0.6fr] gap-4 py-3" key={label}>
                <span className="text-bone/42">{label}</span>
                <span className="text-right font-medium text-bone/82">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 6).map((tech) => (
              <span className="lab-kbd rounded-md px-2.5 py-1 font-mono text-[11px] text-bone/46" key={tech}>{tech}</span>
            ))}
          </div>
        </aside>
      </MotionSection>

      <div className="lab-hairline mx-auto h-px max-w-7xl" />

      <MotionSection className="mx-auto max-w-7xl py-12" id="demo">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/38">Interactive Surface</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-bone">Demo console.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-bone/48">Inputs are constrained and outputs preserve the project’s original research format.</p>
        </div>
        <DemoPanel project={project} />
      </MotionSection>

      <MotionSection className="mx-auto grid max-w-7xl gap-4 py-12 md:grid-cols-2">
        {[
          ["How it works", project.howItWorks],
          ["Why it matters", project.whyItMatters],
          ["What I learned", project.whatILearned],
          ["Limitations", project.limitations]
        ].map(([title, copy]) => (
          <section className="lab-surface rounded-lg p-5" key={title}>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-bone/38">{title}</p>
            <p className="mt-4 leading-7 text-bone/62">{copy}</p>
          </section>
        ))}
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl border-t border-white/10 pt-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/38">Continue Research</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-bone">Adjacent systems.</h2>
          </div>
          <Link className="lab-focus-ring rounded-md px-3 py-2 text-sm font-medium text-bone/60 transition hover:bg-white/[0.05] hover:text-bone" href="/lab">
            Back to lab
          </Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {relatedProjects.map((item) => (
            <Link className="lab-surface rounded-lg p-4 transition hover:-translate-y-0.5 hover:border-bone/22" href={`/lab/projects/${item.slug}`} key={item.slug}>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-bone/35">{item.status}</p>
              <h3 className="mt-3 font-semibold leading-tight text-bone">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-bone/48">{item.type}</p>
            </Link>
          ))}
        </div>
      </MotionSection>
    </main>
  );
}
