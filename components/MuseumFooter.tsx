import Link from "next/link";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

export function MuseumFooter({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

  return (
    <footer
      className={`border-t ${
        isDark ? "border-white/12 bg-lab text-bone" : "border-rule bg-paper/60 text-ink"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="archival-mono text-xs font-semibold tracking-[0.2em]">
              ALVIN LIM — A PERSONAL ARCHIVE
            </p>
            <p
              className={`editorial-serif mt-3 max-w-md text-lg italic leading-relaxed ${
                isDark ? "text-bone/75" : "text-charcoal"
              }`}
            >
              “A curiosity about how things work — and how they could work better.”
            </p>
            <p className={`archival-mono mt-4 text-[11px] ${isDark ? "text-bone/45" : "text-muted"}`}>
              UNIVERSITI MALAYA · ECONOMICS · KUALA LUMPUR
            </p>
          </div>

          <div>
            <p className={`archival-mono text-[11px] ${isDark ? "text-bone/45" : "text-muted"}`}>
              01 / RESEARCH
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="/research">
                  Research Collection
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/research/semiconductors">
                  Technology & Semiconductors
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/research/markets">
                  Markets & Valuation
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/research/macro">
                  Macroeconomics & Monetary Systems
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/research/market-valuation">
                  Market Valuation Engine
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/research/onchain-intelligence">
                  On-Chain Market Intelligence
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/research/sgd-neer">
                  SGD-NEER Shadow Model
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={`archival-mono text-[11px] ${isDark ? "text-bone/45" : "text-muted"}`}>
              02 / PERSONAL ARCHIVE
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="/archive">
                  Archive Index
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/archive/education">
                  Education & Direction
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/archive/campus-election">
                  Campus Election 2024
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/archive/behind-the-scenes">
                  Behind the Scenes
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/archive/elsewhere">
                  Elsewhere
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={`archival-mono text-[11px] ${isDark ? "text-bone/45" : "text-muted"}`}>
              03 / INDEX & DESTINATIONS
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="/">
                  Seven-Chapter Exhibition
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/lab">
                  Chainstox Lab ↗
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/thoughts">
                  Thoughts
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/now">
                  Now
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/journey">
                  Journey
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  className="hover:underline"
                  href={VERIFIED_DESTINATIONS.githubProfile}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub (@alvinlgh23) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-col justify-between gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center ${
            isDark ? "border-white/10 text-bone/45" : "border-rule text-muted"
          }`}
        >
          <span className="archival-mono text-[11px]">
            CATALOGUE EDITION · RESEARCH / ARCHIVE / ELSEWHERE
          </span>
          <span className="archival-mono text-[11px]">
            INDEPENDENT DIGITAL MUSEUM · NO FABRICATED RECORDS
          </span>
        </div>
      </div>
    </footer>
  );
}
