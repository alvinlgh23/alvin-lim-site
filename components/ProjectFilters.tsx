"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

type Filter = "All" | "Featured" | "Active" | "Experimental" | "Research Engine" | "UI Demo" | "Simulated Output";

const filters: Filter[] = ["All", "Featured", "Active", "Experimental", "Research Engine", "UI Demo", "Simulated Output"];

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Featured") return project.featured;
      if (activeFilter === "Active" || activeFilter === "Experimental") return project.category === activeFilter;
      if (activeFilter === "Research Engine" || activeFilter === "UI Demo") return project.type === activeFilter;
      return project.demoType === "simulated-output";
    });
  }, [activeFilter, projects]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            className={`lab-focus-ring rounded-md border px-3.5 py-2 text-sm transition ${
              activeFilter === filter
                ? "lab-chip-active"
                : "lab-chip text-bone/68 hover:border-white/28 hover:text-bone"
            }`}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.div layout key={project.slug}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
