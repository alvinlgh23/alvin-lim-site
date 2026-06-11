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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(217,130,75,0.14),transparent_34%),#10100e] px-5 pb-24 pt-6 md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-5 text-sm text-bone/70">
        <Link className="font-semibold tracking-[0.18em] text-bone" href="/lab">
          CHAINSTOX LAB
        </Link>
        <div className="flex items-center gap-5">
          <Link className="transition hover:text-bone" href="/">
            Home
          </Link>
          <Link className="transition hover:text-bone" href="/lab">
            Projects
          </Link>
        </div>
      </nav>

      <MotionSection className="mx-auto max-w-6xl py-16">
        <div className="flex flex-wrap gap-2 text-xs text-bone/70">
          <span className="rounded-full border border-ember/35 bg-ember/10 px-3 py-1 text-ember">{project.category}</span>
          <span className="rounded-full border border-white/10 px-3 py-1">{project.type}</span>
          <span className="rounded-full border border-white/10 px-3 py-1">{project.demoType}</span>
        </div>
        <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-tight text-bone md:text-7xl">{project.name}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-bone/68">{project.description}</p>
        <p className="mt-6 inline-flex rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-sm font-medium text-ember">Status: {project.status}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="rounded-full bg-bone px-5 py-3 font-medium text-ink transition hover:bg-white" href="#demo">
            Try Demo
          </a>
          {project.githubUrl ? (
            <a className="rounded-full border border-white/15 px-5 py-3 font-medium text-bone transition hover:border-bone/50" href={project.githubUrl} rel="noreferrer" target="_blank">
              GitHub
            </a>
          ) : null}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl py-8" id="demo">
        <DemoPanel project={project} />
      </MotionSection>

      <MotionSection className="mx-auto grid max-w-6xl gap-4 py-14 md:grid-cols-2">
        {[
          ["How it works", project.howItWorks],
          ["Why it matters", project.whyItMatters],
          ["What I learned", project.whatILearned],
          ["Limitations", project.limitations]
        ].map(([title, copy]) => (
          <section className="rounded-lg border border-white/10 bg-white/[0.035] p-5" key={title}>
            <h2 className="text-xl font-semibold text-bone">{title}</h2>
            <p className="mt-4 leading-7 text-bone/68">{copy}</p>
          </section>
        ))}
      </MotionSection>

      <section className="mx-auto max-w-6xl border-t border-white/10 pt-8">
        <p className="text-sm text-bone/50">Tech stack</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-bone/70" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
