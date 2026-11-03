import type { Metadata } from "next";
import { ResearchCaseStudyView } from "@/components/ResearchCaseStudyView";
import { RESEARCH_CASE_STUDIES } from "@/lib/archive-data";

const study = RESEARCH_CASE_STUDIES["onchain-intelligence"];

export const metadata: Metadata = {
  title: `${study.title} | Research Case Study — Alvin Lim`,
  description: study.shortDescription
};

export default function OnChainIntelligenceCaseStudyPage() {
  return <ResearchCaseStudyView study={study} />;
}
