import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

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
      { label: "Technology & Semiconductors →", href: "/research/semiconductors" },
      { label: "Could I trade my way up? ↗", href: "/research/markets#trade-my-way-up" }
    ]
  },
  {
    period: "PRE-TRANSFER UNIVERSITY STUDY",
    title: "Studying Law at Universiti Kebangsaan Malaysia (UKM)",
    location: "Bangi, Malaysia",
    summary:
      "Entered law school driven by an ambition to contribute to public policy, economic development, and resource allocation, before realizing legal studies differed from the systems-oriented work I had imagined.",
    links: [{ label: "Education & Direction (Part 01–02) →", href: "/archive/education" }]
  },
  {
    period: "ACADEMIC TRANSITION",
    title: "Transfer to Universiti Malaya to Study Economics",
    location: "Kuala Lumpur, Malaysia",
    summary:
      "Transferred to the Faculty of Business and Economics at Universiti Malaya to examine incentives, markets, institutions, and resource allocation.",
    links: [{ label: "Education & Direction (Part 03) →", href: "/archive/education" }]
  },
  {
    period: "PRODUCTION & LIVE EVENTS",
    title: "Event Operations & Production Set Support",
    location: "Venues & Studio Sets",
    summary:
      "Worked behind the scenes across live events, concerts, and music-video production environments—handling pre-show setup, stage transitions, and on-set logistics.",
    links: [{ label: "Behind the Scenes Collection →", href: "/archive/behind-the-scenes" }]
  },
  {
    period: "SUMMER WORK & TRAVEL",
    title: "Work & Travel in Atlantic City & Urban Field Notes",
    location: "Atlantic City & New York, United States",
    summary:
      "Spent a summer working in Atlantic City, New Jersey, followed by travel and urban observations in New York and later South Korea.",
    links: [{ label: "Elsewhere Field Journal →", href: "/archive/elsewhere" }]
  },
  {
    period: "NOVEMBER 2024",
    title: "Universiti Malaya Campus Election Candidacy",
    location: "Universiti Malaya · Faculty of Business and Economics",
    summary:
      "Selected to stand as an FBE student representative candidate with NewGen. Engaged with students and candidates across campus groups including UMANY and Demokrat. Was not elected, and subsequently chose to step away from politics.",
    links: [
      { label: "Campus Election 2024 Record →", href: "/archive/campus-election" },
      { label: "Education & Direction (Part 04–05) →", href: "/archive/education" }
    ]
  },
  {
    period: "PRESENT",
    title: "Independent Market Research & Chainstox Lab",
    location: "Universiti Malaya · Kuala Lumpur",
    summary:
      "Concentrating on economics, financial markets, semiconductor research, and building independent analytical systems in Chainstox Lab (Market Valuation Engine, On-Chain Market Intelligence, SGD-NEER Shadow Model).",
    links: [
      { label: "Research Collection →", href: "/research" },
      { label: "Chainstox Lab ↗", href: "/lab" }
    ]
  }
];

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <span className="archival-mono text-xs text-ink">
            JOURNEY — CHRONOLOGICAL MILESTONE LOG
          </span>
          <span className="archival-mono text-[11px] text-muted">
            CHRONOLOGY VS. ARCHIVE DEPTH
          </span>
        </div>

        <header className="grid gap-10 border-b border-rule py-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="archival-mono text-xs text-ember">JOURNEY</p>
            <h1 className="editorial-serif mt-3 text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
              When things happened.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-charcoal md:text-lg">
              Journey records the chronological sequence of milestones. Each entry cross-links to the Research or Personal Archive pages where those experiences are examined in greater depth.
            </p>
          </div>
        </header>

        <section className="divide-y divide-rule">
          {CHRONOLOGY.map((item, idx) => (
            <article
              key={item.title}
              className="grid gap-6 py-10 lg:grid-cols-12 lg:items-start"
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="archival-mono border border-rule bg-paper px-2 py-0.5 text-[10px] text-charcoal">
                    0{idx + 1}
                  </span>
                  <span className="archival-mono text-xs text-ember">{item.period}</span>
                </div>
                <p className="archival-mono mt-2 text-[10px] text-muted">{item.location}</p>
              </div>

              <div className="lg:col-span-8">
                <h2 className="editorial-serif text-2xl text-ink md:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal">
                  {item.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="archival-mono text-xs font-semibold text-ink underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <MuseumFooter />
    </div>
  );
}
