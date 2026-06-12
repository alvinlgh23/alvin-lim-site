import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

function primaryAction(project: Project) {
  if (project.demoType === "embedded-console") return "Open Console";
  if (project.demoType === "external-app") return project.liveUrl ? "Launch Product →" : "Launch Pending";
  return "Demo Coming Soon";
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group lab-surface flex h-full flex-col justify-between overflow-hidden rounded-lg p-5 transition duration-300 hover:-translate-y-0.5 hover:border-bone/22">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2 text-xs text-bone/68">
            <span className="lab-chip rounded-md px-2.5 py-1 text-bone/78">
              {project.category}
            </span>
            <span className="rounded-md border border-moss/20 bg-moss/10 px-2.5 py-1 text-moss/90">
              {project.status}
            </span>
          </div>
          <span className="lab-eyebrow text-[11px] text-bone/30">{project.demoType}</span>
        </div>
        <h3 className="lab-section-title mt-6 text-xl text-bone">{project.name}</h3>
        <p className="lab-eyebrow mt-2 text-xs text-bone/36">{project.type}</p>
        <p className="lab-copy mt-4 text-bone/60">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span className="lab-kbd rounded-md px-2.5 py-1 font-mono text-[11px] text-bone/44" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-7 flex flex-wrap gap-3 border-t border-white/8 pt-5">
        {project.demoType === "external-app" && project.liveUrl ? (
          <a className="lab-button-primary lab-focus-ring rounded-md px-3.5 py-2 text-sm font-medium transition hover:bg-white" href={project.liveUrl} rel="noreferrer" target="_blank">
            {primaryAction(project)}
          </a>
        ) : (
          <Link
            className={`lab-focus-ring rounded-md px-3.5 py-2 text-sm font-medium transition ${
              project.demoType === "embedded-console" ? "lab-button-primary hover:bg-white" : "border border-white/10 bg-white/[0.025] text-bone/42"
            }`}
            href={`/lab/projects/${project.slug}`}
          >
            {primaryAction(project)}
          </Link>
        )}
        <Link className="lab-button-secondary lab-focus-ring rounded-md px-3.5 py-2 text-sm font-medium transition hover:border-bone/30" href={`/lab/projects/${project.slug}`}>
          Details
        </Link>
        {project.githubUrl ? (
          <a className="rounded-md border border-white/10 px-3.5 py-2 text-sm font-medium text-bone/60 transition hover:border-bone/28 hover:text-bone" href={project.githubUrl} rel="noreferrer" target="_blank">
            GitHub
          </a>
        ) : project.demoType === "coming-soon" ? (
          <span className="rounded-md border border-white/10 px-3.5 py-2 text-sm font-medium text-bone/38">
            Source coming soon
          </span>
        ) : null}
      </div>
    </article>
  );
}
