import inventory from "@/content/project-inventory.json";

export type DemoType = "embedded-console" | "external-app" | "coming-soon";

export type Project = {
  name: string;
  slug: string;
  category: "Featured" | "Active" | "Experimental" | "Archive";
  status: string;
  type: string;
  description: string;
  techStack: string[];
  hasOwnUI: boolean;
  liveUrl: string;
  demoType: DemoType;
  githubUrl: string;
  featured: boolean;
  howItWorks: string;
  whyItMatters: string;
  whatILearned: string;
  limitations: string;
};

export const projects = inventory as Project[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured).slice(0, 5);
}

export function getLabProjects() {
  return projects.filter((project) => project.category !== "Archive");
}

export function getArchivedProjects() {
  return projects.filter((project) => project.category === "Archive");
}
