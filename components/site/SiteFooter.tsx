import Link from "next/link";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

const COLS = [
  {
    heading: "Work",
    links: [
      ["Research", "/research"],
      ["Chainstox Lab", "/lab"],
      ["SGD-NEER Shadow Model", "/research/sgd-neer"],
      ["Markets & Valuation", "/research/markets"],
      ["Semiconductors", "/research/semiconductors"]
    ]
  },
  {
    heading: "Life",
    links: [
      ["Journey", "/journey"],
      ["Campus Election", "/archive/campus-election"],
      ["Behind the Scenes", "/archive/behind-the-scenes"],
      ["Elsewhere", "/archive/elsewhere"],
      ["Education", "/archive/education"]
    ]
  },
  {
    heading: "Alvin",
    links: [
      ["Now", "/now"],
      ["Thoughts", "/thoughts"],
      ["Archive", "/archive"],
      ["Contact", "/contact"]
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em]">Alvin Lim</p>
            <p className="mt-5 max-w-sm text-white/55">
              Economics at Universiti Malaya. I build my own tools for reading markets.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href="/cv/Alvin-Lim-CV.pdf"
                download="Alvin-Lim-CV.pdf"
                className="bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/85"
              >
                Download CV
              </a>
              <a
                href={`mailto:${VERIFIED_DESTINATIONS.email}`}
                className="border border-white/30 px-6 py-3 text-sm transition hover:border-white"
              >
                Email
              </a>
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.heading}>
              <p className="border-b border-white/15 pb-3 text-xs uppercase tracking-[0.08em] text-white/45">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-white/80 transition hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Alvin Lim · Kuala Lumpur</p>
          <div className="flex gap-6">
            <a href={VERIFIED_DESTINATIONS.linkedinProfile} target="_blank" rel="noreferrer" className="transition hover:text-white">
              LinkedIn ↗
            </a>
            <a href={VERIFIED_DESTINATIONS.githubProfile} target="_blank" rel="noreferrer" className="transition hover:text-white">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
