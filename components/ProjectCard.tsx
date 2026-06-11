import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-lg border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-ember/50 hover:bg-white/[0.06]">
      <div>
        <div className="mb-5 flex flex-wrap gap-2 text-xs text-bone/70">
          <span className="rounded-full border border-ember/35 bg-ember/10 px-3 py-1 text-ember">
            {project.category}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {project.demoType}
          </span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-bone/75">
            {project.status}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-bone">{project.name}</h3>
        <p className="mt-2 text-sm text-bone/60">{project.type}</p>
        <p className="mt-4 leading-7 text-bone/72">{project.description}</p>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link className="rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition hover:bg-white" href={`/lab/projects/${project.slug}`}>
          {project.demoType === "ui-demo" ? "Try Demo" : "View Demo"}
        </Link>
        <Link className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-bone transition hover:border-bone/50" href={`/lab/projects/${project.slug}`}>
          Learn More
        </Link>
        {project.githubUrl ? (
          <a className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-bone/75 transition hover:border-bone/50 hover:text-bone" href={project.githubUrl} rel="noreferrer" target="_blank">
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  );
}
