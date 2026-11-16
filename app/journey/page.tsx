import type { Metadata } from "next";
import { LinkRow, NextRoom, PageIntro, PageShell, Prose, Section, TextLink } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Journey | Alvin Lim — A Personal Archive",
  description:
    "Chronological milestones across education, hardware curiosity, work & travel, and independent market research."
};

const CHRONOLOGY = [
  {
    period: "PRIMARY & SECONDARY SCHOOL",
    title: "Smartphone Specifications & Second-Hand Carousell Trading",
    location: "Malaysia",
    summary:
      "Began comparing mobile processor generations across iPhone releases, buying and reselling second-hand phones on Carousell, repairing faulty units, and testing an early two-step upward phone swap (iPhone 5 → Galaxy Note 3 ⇢ iPhone 6).",
    links: [
      { label: "Technology & Semiconductors", href: "/research/semiconductors" },
      { label: "Could I trade my way up?", href: "/research/markets#trade-my-way-up" }
    ]
  },
  {
    period: "PRE-TRANSFER UNIVERSITY STUDY",
    title: "Studying Law at Universiti Kebangsaan Malaysia (UKM)",
    location: "Bangi, Malaysia",
    summary:
      "Entered law school driven by an ambition to contribute to public policy, economic development, and resource allocation, before realizing legal studies differed from the systems-oriented work I had imagined.",
    links: [{ label: "Education & Direction (Part 01–02)", href: "/archive/education" }]
  },
  {
    period: "ACADEMIC TRANSITION",
    title: "Transfer to Universiti Malaya to Study Economics",
    location: "Kuala Lumpur, Malaysia",
    summary:
      "Transferred to the Faculty of Business and Economics at Universiti Malaya to examine incentives, markets, institutions, and resource allocation.",
    links: [{ label: "Education & Direction (Part 03)", href: "/archive/education" }]
  },
  {
    period: "PRODUCTION & LIVE EVENTS",
    title: "Event Operations & Production Set Support",
    location: "Venues & Studio Sets",
    summary:
      "Worked behind the scenes across live events, concerts, and music-video production environments—handling pre-show setup, stage transitions, and on-set logistics.",
    links: [{ label: "Behind the Scenes Collection", href: "/archive/behind-the-scenes" }]
  },
  {
    period: "SUMMER WORK & TRAVEL",
    title: "Work & Travel in Atlantic City & Urban Field Notes",
    location: "Atlantic City & New York, United States",
    summary:
      "Spent a summer working in Atlantic City, New Jersey, followed by travel and urban observations in New York and later South Korea.",
    links: [{ label: "Elsewhere Field Journal", href: "/archive/elsewhere" }]
  },
  {
    period: "NOVEMBER 2024",
    title: "Universiti Malaya Campus Election Candidacy",
    location: "Universiti Malaya · Faculty of Business and Economics",
    summary:
      "Selected to stand as an FBE student representative candidate with NewGen. Engaged with students and candidates across campus groups including UMANY and Demokrat. Was not elected, and subsequently chose to step away from politics.",
    links: [
      { label: "Campus Election 2024 Record", href: "/archive/campus-election" },
      { label: "Education & Direction (Part 04–05)", href: "/archive/education" }
    ]
  },
  {
    period: "PRESENT",
    title: "Independent Market Research & Chainstox Lab",
    location: "Universiti Malaya · Kuala Lumpur",
    summary:
      "Concentrating on economics, financial markets, semiconductor research, and building independent analytical systems in Chainstox Lab (Market Valuation Engine, On-Chain Market Intelligence, SGD-NEER Shadow Model).",
    links: [
      { label: "Research Collection", href: "/research" },
      { label: "Chainstox Lab", href: "/lab" }
    ]
  }
];

export default function JourneyPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Journey"
        title="When things happened."
        lede="The same story as the archive, in order. Each stop links to the place where it is told in full."
      />

      {CHRONOLOGY.map((item) => (
        <Section key={item.title} label={item.period} title={item.title}>
          <p className="archival-mono mb-5 text-xs text-muted">{item.location}</p>
          <Prose>
            <p>{item.summary}</p>
          </Prose>
          <LinkRow>
            {item.links.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </LinkRow>
        </Section>
      ))}

      <NextRoom href="/now" label="And where it stands today" title="Now" />
    </PageShell>
  );
}
