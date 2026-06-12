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

  return (
    <main className="lab-shell lab-grid min-h-screen px-5 pb-24 pt-5 text-bone md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 py-5 text-sm text-bone/62">
        <Link className="flex items-center gap-3 font-semibold tracking-[0.18em] text-bone" href="/lab">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-harbor/40 bg-harbor/10 text-xs text-harbor">C</span>
          CHAINSTOX LAB
        </Link>
        <div className="flex items-center gap-5">
          <Link className="transition hover:text-bone" href="/">
            Home
          </Link>
          <Link className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-bone transition hover:border-harbor/50" href="/lab">
            Projects
          </Link>
        </div>
      </nav>

      <MotionSection className="mx-auto grid max-w-7xl gap-8 py-14 lg:grid-cols-[1fr_0.42fr] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2 text-xs text-bone/70">
            <span className="rounded-full border border-harbor/35 bg-harbor/10 px-3 py-1 text-harbor">{project.category}</span>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-bone/65">{project.type}</span>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-bone/65">{project.demoType}</span>
          </div>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.01] tracking-[-0.02em] text-bone md:text-7xl">{project.name}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-bone/64">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-full bg-bone px-5 py-3 font-medium text-ink transition hover:-translate-y-0.5 hover:bg-white" href="#demo">
              Open Demo
            </a>
            {project.githubUrl ? (
              <a className="rounded-full border border-white/15 bg-white/[0.025] px-5 py-3 font-medium text-bone transition hover:-translate-y-0.5 hover:border-harbor/55" href={project.githubUrl} rel="noreferrer" target="_blank">
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <aside className="lab-console rounded-xl p-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-bone/38">system card</p>
          <div className="mt-5 space-y-4 text-sm">
            {[
              ["Status", project.status],
              ["Category", project.category],
              ["Mode", project.demoType],
              ["Surface", project.type]
            ].map(([label, value]) => (
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3" key={label}>
                <span className="text-bone/42">{label}</span>
                <span className="text-right font-medium text-bone/82">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <span className="rounded-md border border-white/8 bg-white/[0.025] px-2.5 py-1 font-mono text-[11px] text-bone/48" key={tech}>{tech}</span>
            ))}
          </div>
        </aside>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl py-8" id="demo">
        <DemoPanel project={project} />
      </MotionSection>

      <MotionSection className="mx-auto grid max-w-7xl gap-4 py-14 md:grid-cols-2">
        {[
          ["How it works", project.howItWorks],
          ["Why it matters", project.whyItMatters],
          ["What I learned", project.whatILearned],
          ["Limitations", project.limitations]
        ].map(([title, copy]) => (
          <section className="lab-surface rounded-xl p-5" key={title}>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-harbor/70">{title}</p>
            <p className="mt-4 leading-7 text-bone/66">{copy}</p>
          </section>
        ))}
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl border-t border-white/10 pt-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-harbor/85">Continue Research</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-bone">Adjacent systems.</h2>
          </div>
          <Link className="text-sm font-medium text-bone/60 transition hover:text-bone" href="/lab">Back to Lab</Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {relatedProjects.map((item) => (
            <Link className="rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:-translate-y-1 hover:border-harbor/45" href={`/lab/projects/${item.slug}`} key={item.slug}>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-bone/35">{item.status}</p>
              <h3 className="mt-3 font-semibold text-bone">{item.name}</h3>
            </Link>
          ))}
        </div>
      </MotionSection>
    </main>
  );
}
