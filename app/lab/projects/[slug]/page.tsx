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
    ["Own UI", project.hasOwnUI ? "Yes" : "No"],
    ["Surface", project.type]
  ];
  const isExternalApp = project.demoType === "external-app";
  const isEmbeddedConsole = project.demoType === "embedded-console";

  return (
    <main className="lab-shell lab-grid min-h-screen px-4 pb-24 pt-4 text-bone md:px-8">
      <nav className="lab-topbar sticky top-4 z-20 mx-auto flex max-w-7xl items-center justify-between rounded-lg px-3 py-3 text-sm text-bone/62">
        <Link className="lab-focus-ring lab-wordmark flex items-center gap-3 rounded-md px-2 py-1.5 font-semibold text-bone" href="/lab">
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
          <h1 className="lab-hero-title mt-7 max-w-5xl text-[2.55rem] text-bone md:text-[4.35rem]">{project.name}</h1>
          <p className="lab-copy mt-6 max-w-3xl text-lg text-bone/62 md:text-xl">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {isExternalApp ? (
              project.liveUrl ? (
                <a className="lab-button-primary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white" href={project.liveUrl} rel="noreferrer" target="_blank">
                  Launch Product →
                </a>
              ) : (
                <span className="rounded-md border border-white/10 bg-white/[0.025] px-4 py-3 font-medium text-bone/42">
                  Launch pending
                </span>
              )
            ) : isEmbeddedConsole ? (
              <a className="lab-button-primary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white" href="#demo">
                Open console
              </a>
            ) : (
              <span className="rounded-md border border-white/10 bg-white/[0.025] px-4 py-3 font-medium text-bone/42">
                Demo coming soon
              </span>
            )}
            {project.githubUrl ? (
              <a className="lab-button-secondary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:border-bone/30" href={project.githubUrl} rel="noreferrer" target="_blank">
                GitHub
              </a>
            ) : (
              <span className="rounded-md border border-white/10 bg-white/[0.025] px-4 py-3 font-medium text-bone/42">
                Source coming soon
              </span>
            )}
          </div>
        </div>

        <aside className="lab-console rounded-lg p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="lab-eyebrow text-xs text-bone/36">system card</p>
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

      {isEmbeddedConsole ? (
        <MotionSection className="mx-auto max-w-7xl py-12" id="demo">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="lab-eyebrow text-xs text-bone/38">Embedded Surface</p>
              <h2 className="lab-section-title mt-3 text-3xl text-bone">Market Intelligence console.</h2>
            </div>
            <p className="lab-copy max-w-md text-sm text-bone/48">This is the only project console currently embedded in alvin-lim.com.</p>
          </div>
          <DemoPanel project={project} />
        </MotionSection>
      ) : (
        <MotionSection className="mx-auto max-w-7xl py-12" id="demo">
          <div className="grid gap-4 lg:grid-cols-[0.72fr_0.28fr]">
            <section className="lab-console min-w-0 overflow-hidden rounded-lg p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="lab-eyebrow text-xs text-bone/36">
                  {isExternalApp ? "External App Surface" : "Pending Surface"}
                </p>
                <span className="lab-eyebrow rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-bone/42">
                  {project.status}
                </span>
              </div>
              <div className="mt-6 rounded-lg border border-white/10 bg-black/24 p-4">
                <div className="grid min-h-64 place-items-center rounded-md border border-white/8 bg-[linear-gradient(135deg,rgba(236,228,215,0.07),rgba(100,127,145,0.06)),linear-gradient(90deg,rgba(236,228,215,0.04)_1px,transparent_1px)] bg-[size:100%_100%,32px_32px] p-6 text-center">
                  <div>
                    <p className="lab-eyebrow text-xs text-bone/36">Static Preview</p>
                    <h2 className="lab-section-title mt-3 text-2xl text-bone">{project.name}</h2>
                    <p className="lab-copy mx-auto mt-3 max-w-md text-sm text-bone/52">
                      The analytical interface is maintained in its own deployment and codebase. This page records the system boundary, source, and launch state.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <aside className="lab-surface rounded-lg p-5">
              <p className="lab-eyebrow text-xs text-bone/38">Actions</p>
              <div className="mt-5 flex flex-col gap-3">
                {isExternalApp && project.liveUrl ? (
                  <a className="lab-button-primary lab-focus-ring rounded-md px-4 py-3 text-center font-medium transition hover:bg-white" href={project.liveUrl} rel="noreferrer" target="_blank">
                    Launch Product →
                  </a>
                ) : (
                  <span className="rounded-md border border-white/10 bg-white/[0.025] px-4 py-3 text-center font-medium text-bone/42">
                    {isExternalApp ? "Launch pending" : "Demo coming soon"}
                  </span>
                )}
                {project.githubUrl ? (
                  <a className="lab-button-secondary lab-focus-ring rounded-md px-4 py-3 text-center font-medium transition hover:border-bone/30" href={project.githubUrl} rel="noreferrer" target="_blank">
                    GitHub
                  </a>
                ) : (
                  <span className="rounded-md border border-white/10 bg-white/[0.025] px-4 py-3 text-center font-medium text-bone/42">
                    Source coming soon
                  </span>
                )}
              </div>
              <p className="lab-copy mt-5 text-sm text-bone/50">
                {isExternalApp
                  ? project.liveUrl
                    ? "This project is maintained in its own deployment and linked from Chainstox Lab as an external research product."
                    : "This project has its own analytical interface. Add a deployment URL in project metadata to activate the launch button."
                  : "This system is indexed in the lab while its source or demo surface is still being prepared."}
              </p>
            </aside>
          </div>
        </MotionSection>
      )}

      <MotionSection className="mx-auto grid max-w-7xl gap-4 py-12 md:grid-cols-2">
        {[
          ["How it works", project.howItWorks],
          ["Why it matters", project.whyItMatters],
          ["What I learned", project.whatILearned],
          ["Limitations", project.limitations]
        ].map(([title, copy]) => (
          <section className="lab-surface rounded-lg p-5" key={title}>
            <p className="lab-eyebrow text-xs text-bone/38">{title}</p>
            <p className="lab-copy mt-4 text-bone/62">{copy}</p>
          </section>
        ))}
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl border-t border-white/10 pt-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="lab-eyebrow text-xs text-bone/38">Continue Research</p>
            <h2 className="lab-section-title mt-3 text-3xl text-bone">Adjacent systems.</h2>
          </div>
          <Link className="lab-focus-ring rounded-md px-3 py-2 text-sm font-medium text-bone/60 transition hover:bg-white/[0.05] hover:text-bone" href="/lab">
            Back to lab
          </Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {relatedProjects.map((item) => (
            <Link className="lab-surface rounded-lg p-4 transition hover:-translate-y-0.5 hover:border-bone/22" href={`/lab/projects/${item.slug}`} key={item.slug}>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-bone/35">{item.status}</p>
              <h3 className="lab-section-title mt-3 text-base text-bone">{item.name}</h3>
              <p className="lab-copy mt-2 text-sm text-bone/48">{item.type}</p>
            </Link>
          ))}
        </div>
      </MotionSection>
    </main>
  );
}
