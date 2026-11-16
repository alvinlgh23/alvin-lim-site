import type { Metadata } from "next";
import { LinkRow, NextRoom, PageIntro, PageShell, Prose, Section, TextLink } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Thoughts | Alvin Lim — A Personal Archive",
  description: "Essays, ideas, observations, and reflections on markets, technology, and systems."
};

const ESSAY_NOTES = [
  {
    code: "NOTE 001 // VALUATION & EPISTEMOLOGY",
    title: "Intuition first. Evidence next.",
    category: "MARKETS & VALUATION",
    excerpt:
      "My earliest judgments about value came from familiarity rather than formal models. Today, intuition can still give me a starting point, but I try to understand why a judgment might be right — and what could prove it wrong.",
    relatedHref: "/research/markets#trade-my-way-up",
    relatedLabel: "Could I trade my way up?"
  },
  {
    code: "NOTE 002 // MARKET STRUCTURE",
    title: "Why regimes matter more than isolated price predictions",
    category: "RESEARCH SYSTEMS",
    excerpt:
      "Markets are easier to reason about when signals are grouped into liquidity, flow, and positioning regimes instead of treated as isolated triggers. A useful research tool separates signal, narrative, and action.",
    relatedHref: "/research/market-valuation",
    relatedLabel: "Market Valuation Engine"
  },
  {
    code: "NOTE 003 // MODELING HUMILITY",
    title: "Stating clearly what a model cannot know",
    category: "MACRO & MONETARY SYSTEMS",
    excerpt:
      "When studying an exchange-rate framework like Singapore's S$NEER, official basket weights and band parameters are undisclosed. Good independent modeling means making proxy assumptions visible rather than hiding behind confident language.",
    relatedHref: "/research/sgd-neer",
    relatedLabel: "SGD-NEER Shadow Model"
  },
  {
    code: "NOTE 004 // DIRECTION & SYSTEMS",
    title: "Choosing evidence-driven work over political theater",
    category: "PERSONAL ARCHIVE",
    excerpt:
      "Moving from law to economics—and later stepping away from student politics after the 2024 campus election—clarified the kind of work I want to do: quiet, analytical, and grounded in evidence.",
    relatedHref: "/archive/education",
    relatedLabel: "Education & Direction"
  }
];

export default function ThoughtsPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Thoughts"
        title="Notes on systems, value, and learning."
        lede="Short working notes that connect the research with the experiences behind it."
      />

      {ESSAY_NOTES.map((note) => (
        <Section key={note.code} label={note.category} title={note.title}>
          <Prose>
            <p>{note.excerpt}</p>
          </Prose>
          <LinkRow>
            <TextLink href={note.relatedHref}>{note.relatedLabel}</TextLink>
          </LinkRow>
        </Section>
      ))}

      <NextRoom href="/research" label="Where these notes come from" title="Research" />
    </PageShell>
  );
}
