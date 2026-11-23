"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NOW, type NowItem } from "@/lib/now";
import { computeBand, loadExports, loadNeer, longDate, monthLabel, zoneText } from "@/lib/neer";

type Live = {
  neerGap: number;
  neerZone: string;
  neerAsOf: string;
  nextMas: string;
  exportMonth: string;
  exportNextMonth: string;
  chipShare: number;
  chipYoy: number;
};

function useLive() {
  const [live, setLive] = useState<Live | null>(null);
  useEffect(() => {
    Promise.all([loadNeer(), loadExports()])
      .then(([n, e]) => {
        const b = computeBand(n, n.modes[n.meta.default_mode].index, n.meta.default_band_pct);
        const last = e.months.length - 1;
        const chip = e.items.find((it) => it.en === "Semiconductors")!.series[last];
        const [y, m] = e.months[last].split("-").map(Number);
        const next = `${m === 12 ? y + 1 : y}-${String((m % 12) + 1).padStart(2, "0")}`;
        setLive({
          neerGap: b.gap,
          neerZone: zoneText(b.gap, n.meta.default_band_pct),
          neerAsOf: n.meta.last_date,
          nextMas: n.meta.next_review,
          exportMonth: monthLabel(e.months[last]),
          exportNextMonth: monthLabel(next),
          chipShare: chip.v / e.total[last].v,
          chipYoy: chip.yoy
        });
      })
      .catch(() => setLive(null));
  }, []);
  return live;
}

const sign = (v: number, d = 2) => `${v > 0 ? "+" : ""}${v.toFixed(d)}`;

function Status({ status }: { status?: NowItem["status"] }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[12px] text-white/60">
      {status === "live" ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7EE2A8] opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7EE2A8]" />
        </span>
      ) : null}
      {status}
    </span>
  );
}

function Card({ item, live }: { item: NowItem; live: Live | null }) {
  const metric =
    item.metric === "neer" && live
      ? `${sign(live.neerGap)}% vs centre — ${live.neerZone}`
      : item.metric === "exports" && live
        ? `Chips: ${Math.round(live.chipShare * 100)}% of exports in ${live.exportMonth}, ${sign(live.chipYoy, 0)}% y/y`
        : null;
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[17px] font-medium tracking-[-0.02em] text-[#F7F8F8]">{item.title}</p>
        <Status status={item.status} />
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-white/55">{item.note}</p>
      {item.metric ? (
        <p className="mt-4 rounded-lg border border-white/[0.07] bg-black/30 px-3 py-2 font-mono text-[12.5px] text-white/75">
          {metric ?? "loading…"}
        </p>
      ) : null}
    </>
  );
  const cls = "block rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-white/20 hover:bg-white/[0.05]";
  return item.href ? (
    <Link href={item.href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function Column({ label, hint, items, live }: { label: string; hint: string; items: NowItem[]; live: Live | null }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between border-b border-white/[0.08] pb-3">
        <p className="text-[15px] font-medium text-[#F7F8F8]">{label}</p>
        <p className="text-[12px] text-white/40">{hint}</p>
      </div>
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.title} item={it} live={live} />
        ))}
      </div>
    </div>
  );
}

export function NowBoard() {
  const live = useLive();
  const tracking: NowItem[] = [
    {
      title: "Next MAS policy statement",
      status: "scheduled",
      note: live ? `${live.nextMas} — the next chance for a slope or band change.` : "The next chance for a slope or band change.",
      href: "/research/sgd-neer"
    },
    {
      title: "Next Korea export release",
      status: "scheduled",
      note: live ? `${live.exportNextMonth} figures, due early next month from MOTIR.` : "Next month's figures from MOTIR.",
      href: "/lab/projects/kospi-signal-monitor"
    },
    ...NOW.reading
  ];

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/45">
        <span className="inline-flex items-center gap-2 text-white/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7EE2A8] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7EE2A8]" />
          </span>
          Status board
        </span>
        <span>Notes updated {longDate(NOW.updated)}</span>
        {live ? <span>Model data as of {longDate(live.neerAsOf)}</span> : null}
      </div>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-5">
        <Column label="Running" hint="Systems in motion" items={NOW.running} live={live} />
        <Column label="Tracking & reading" hint="Dates and data I'm watching" items={tracking} live={live} />
        <Column label="Next" hint="What I want to push" items={NOW.next} live={live} />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {NOW.also.map((it) => (
          <Card key={it.title} item={it} live={live} />
        ))}
      </div>
    </div>
  );
}
