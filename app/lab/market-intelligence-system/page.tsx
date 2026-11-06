import type { Metadata } from "next";
import { MisProductShowcase } from "@/components/MisProductShowcase";

export const metadata: Metadata = {
  title: "Market Intelligence System (v1.0 Public Beta) | CHAINSTOX Lab",
  description:
    "Official CHAINSTOX product showcase: Market Intelligence System (v1.0 Public Beta) — a five-language financial research and market intelligence workstation for macro regime analysis, sector momentum, company research, and overheat monitoring.",
  openGraph: {
    title: "Market Intelligence System (v1.0 Public Beta) | CHAINSTOX Lab",
    description:
      "Financial research and market intelligence workstation featuring Macro Regime Analysis, Sector Momentum, Sector Deep Dive, Company Research, Overheat Monitor, Risk & Rotation, Full Market Report, and a five-language interface.",
    url: "https://alvin-lim.com/lab/market-intelligence-system",
    type: "website"
  }
};

export default function MarketIntelligenceSystemPage() {
  return <MisProductShowcase />;
}
