import type { Metadata } from "next";
import { ResearchCaseStudyView } from "@/components/ResearchCaseStudyView";
import { RESEARCH_CASE_STUDIES } from "@/lib/archive-data";

const study = RESEARCH_CASE_STUDIES["market-valuation"];

export const metadata: Metadata = {
  title: `${study.title} | Research Case Study — Alvin Lim`,
  description: study.shortDescription
};

export default function MarketValuationCaseStudyPage() {
  return <ResearchCaseStudyView study={study} />;
}
