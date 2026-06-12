import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group lab-surface flex h-full flex-col justify-between overflow-hidden rounded-xl p-5 transition duration-300 hover:-translate-y-1 hover:border-harbor/45">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2 text-xs text-bone/70">
            <span className="rounded-full border border-harbor/35 bg-harbor/10 px-3 py-1 text-harbor">
              {project.category}
            </span>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-bone/65">
              {project.status}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone/28">{project.demoType}</span>
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-bone">{project.name}</h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-bone/36">{project.type}</p>
        <p className="mt-4 leading-7 text-bone/62">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span className="rounded-md border border-white/8 bg-black/20 px-2.5 py-1 font-mono text-[11px] text-bone/42" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-7 flex flex-wrap gap-3 border-t border-white/8 pt-5">
        <Link className="rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition hover:bg-white" href={`/lab/projects/${project.slug}`}>
          {project.demoType === "ui-demo" ? "Try Demo" : "View Demo"}
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
  );
}
