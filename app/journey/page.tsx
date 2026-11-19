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
    period: "OCTOBER 2022",
    title: "Studying Law at Universiti Kebangsaan Malaysia (UKM)",
    location: "Bangi, Malaysia",
    summary:
      "Entered law school driven by an ambition to contribute to public policy, economic development, and resource allocation, before realizing legal studies differed from the systems-oriented work I had imagined.",
    links: [{ label: "Education & Direction (Part 01–02)", href: "/archive/education" }]
  },
  {
    period: "OCTOBER 2023",
    title: "Transfer to Universiti Malaya to Study Economics",
    location: "Kuala Lumpur, Malaysia",
    summary:
      "Transferred to the Faculty of Business and Economics at Universiti Malaya to examine incentives, markets, institutions, and resource allocation.",
    links: [{ label: "Education & Direction (Part 03)", href: "/archive/education" }]
  },
  {
    period: "2023 – 2024",
    title: "Concert Crew & a Music-Video Role",
    location: "Malaysia & Singapore",
    summary:
      "Worked as crew on Taylor Swift's The Eras Tour in Singapore (2024), Jay Chou's concerts in Malaysia (2023 and 2024), Coldplay in Malaysia (2024), and the 9Wave music festival at Sunway (2023), among many other shows — handling pre-show setup and stage transitions — and stepped in front of the camera for a small role in a music video.",
    links: [{ label: "Behind the Scenes Collection", href: "/archive/behind-the-scenes" }]
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
    period: "SUMMER 2026",
    title: "Work & Travel in Atlantic City",
    location: "Atlantic City & New York, United States",
    summary:
      "Spent the summer working behind a food counter in Atlantic City, New Jersey, with time in New York along the way.",
    links: [{ label: "Elsewhere Field Journal", href: "/archive/elsewhere" }]
  },
  {
    period: "PRESENT",
    title: "Independent Market Research & Chainstox Lab",
    location: "Universiti Malaya · Kuala Lumpur",
    summary:
      "Studying economics at Universiti Malaya, expected to graduate in 2028, while building independent analytical systems in Chainstox Lab (Market Valuation Engine, On-Chain Market Intelligence, SGD-NEER Shadow Model).",
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
