"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { computeBand, loadExports, loadNeer, monthLabel, zoneText } from "@/lib/neer";

export type WorkItem = {
  kicker: string;
  title: string;
  note: string;
  href: string;
  image?: string;
  wide?: boolean;
  stat?: [string, string];
  /** Which live reading to reveal on hover. */
  metric?: "neer" | "exports" | "lab" | "research";
};

function useMetrics() {
  const [m, setM] = useState<Record<string, string>>({});
  useEffect(() => {
    Promise.all([loadNeer(), loadExports()])
      .then(([n, e]) => {
        const b = computeBand(n, n.modes[n.meta.default_mode].index, n.meta.default_band_pct);
        const last = e.months.length - 1;
        const chip = e.items.find((it) => it.en === "Semiconductors")!.series[last];
        setM({
          neer: `Now ${b.gap > 0 ? "+" : ""}${b.gap.toFixed(2)}% vs centre · ${zoneText(b.gap, n.meta.default_band_pct)}`,
          exports: `Chips $${(chip.v / 10).toFixed(1)}B in ${monthLabel(e.months[last])} · ${chip.yoy > 0 ? "+" : ""}${chip.yoy.toFixed(0)}% y/y`,
          lab: "Live: the S$NEER band and Korea exports, recomputed in your browser",
          research: "FX · Korea · semiconductors · on-chain · valuation · macro"
        });
      })
      .catch(() => setM({}));
  }, []);
  return m;
}

/* Selected work as a bento. Hovering (or, on touch screens, always) reveals each piece's key reading. */
export function WorkGrid({ items }: { items: WorkItem[] }) {
  const metrics = useMetrics();
  return (
    <div className="mt-12 grid gap-3 md:grid-cols-3">
      {items.map((w) => {
        const reading = w.metric ? metrics[w.metric] : undefined;
        return (
          <Link
            key={w.title}
            href={w.href}
            className={`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition duration-300 hover:border-white/20 hover:bg-white/[0.05] ${
              w.wide ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            {w.image ? (
              <div className="relative m-1.5 flex-1 overflow-hidden rounded-[12px]">
                <img
                  src={w.image}
                  alt=""
                  aria-hidden="true"
                  className="h-full min-h-[240px] w-full object-cover object-[50%_10%] transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {reading ? (
                  <p className="absolute inset-x-3 bottom-3 rounded-lg border border-white/15 bg-black/75 px-3 py-2 font-mono text-[12.5px] text-white backdrop-blur-md transition duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#7EE2A8] align-middle" />
                    {reading}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="px-7 pt-7">
                <p className="text-[3.6rem] font-medium leading-none tracking-[-0.05em] text-[#F7F8F8]">{w.stat?.[0]}</p>
                <p className="mt-2 max-w-[24ch] text-sm text-white/45">{w.stat?.[1]}</p>
              </div>
            )}
            <div className="p-7">
              <p className="text-[13px] text-white/45">{w.kicker}</p>
              <p className="mt-2 text-xl font-medium tracking-[-0.03em] text-[#F7F8F8] md:text-2xl">
                {w.title} <span className="inline-block text-white/40 transition group-hover:translate-x-1 group-hover:text-white">→</span>
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{w.note}</p>
              {reading && !w.image ? (
                <p className="mt-4 overflow-hidden font-mono text-[12.5px] text-white/75 transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#7EE2A8] align-middle" />
                  {reading}
                </p>
              ) : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
