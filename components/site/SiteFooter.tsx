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
    heading: "More",
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
    <footer className="border-t border-white/[0.08] bg-[#08090A] text-[#F7F8F8]">
      <div className="mx-auto max-w-[1240px] px-5 pb-10 pt-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.02em]">Alvin Lim</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Economics at Universiti Malaya. I build my own tools for reading markets.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.heading}>
              <p className="text-[13px] font-medium text-[#F7F8F8]">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-white/50 transition hover:text-[#F7F8F8]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/40">
          <p>© {new Date().getFullYear()} Alvin Lim · Kuala Lumpur</p>
          <div className="flex gap-5">
            <a href={`mailto:${VERIFIED_DESTINATIONS.email}`} className="transition hover:text-white">
              Email
            </a>
            <a href={VERIFIED_DESTINATIONS.linkedinProfile} target="_blank" rel="noreferrer" className="transition hover:text-white">
              LinkedIn
            </a>
            <a href={VERIFIED_DESTINATIONS.githubProfile} target="_blank" rel="noreferrer" className="transition hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
