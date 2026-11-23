"use client";

import { useEffect, useMemo, useState } from "react";
import { loadExports, monthLabel, type ExportsData } from "@/lib/neer";

const PICKS = ["Semiconductors", "Computers", "Petroleum products", "Cars", "Ships"];

/* Korea's monthly exports: total bars with the selected product's share lit up. Hover or tap a month. */
export function ExportsChart() {
  const [data, setData] = useState<ExportsData | null>(null);
  const [pick, setPick] = useState("Semiconductors");
  const [hover, setHover] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadExports().then(setData).catch(() => setError(true));
  }, []);

  const view = useMemo(() => {
    if (!data) return null;
    const item = data.items.find((it) => it.en === pick) ?? data.items[0];
    const max = Math.max(...data.total.map((t) => t.v));
    return { item, max };
  }, [data, pick]);

  if (error) return <p className="p-8 text-sm text-white/50">Data could not be loaded.</p>;
  if (!data || !view) return <div className="h-[340px] animate-pulse rounded-2xl bg-white/[0.03]" />;

  const last = data.months.length - 1;
  const i = hover ?? last;
  const total = data.total[i];
  const part = view.item.series[i];
  const usd = (v: number) => `$${(v / 10).toFixed(1)}B`;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{monthLabel(data.months[i])}</p>
          <p className="mt-1 text-2xl font-medium tracking-tight text-white md:text-3xl">
            {usd(part.v)}
            <span className="ml-3 text-base text-white/55">
              {view.item.en} · {part.yoy > 0 ? "+" : ""}
              {part.yoy.toFixed(1)}% y/y
            </span>
          </p>
          <p className="mt-1 text-sm text-white/45">
            {Math.round((part.v / total.v) * 100)}% of all exports ({usd(total.v)}, {total.yoy > 0 ? "+" : ""}
            {total.yoy.toFixed(1)}% y/y)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PICKS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPick(p)}
              className={`rounded-full px-3.5 py-1.5 text-xs transition ${
                pick === p ? "bg-white text-black" : "bg-white/[0.06] text-white/65 hover:bg-white/[0.12] hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div
        className="mt-6 flex h-[260px] items-end gap-[6px] md:gap-2"
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Korea monthly exports with ${view.item.en} highlighted, ${data.months[0]} to ${data.months[last]}`}
      >
        {data.months.map((m, k) => {
          const t = data.total[k].v;
          const p = view.item.series[k].v;
          const active = k === i;
          return (
            <button
              key={m}
              type="button"
              onPointerEnter={() => setHover(k)}
              onFocus={() => setHover(k)}
              onClick={() => setHover(k)}
              aria-label={`${monthLabel(m)}: ${view.item.en} ${usd(p)} of ${usd(t)}`}
              className="group relative flex h-full flex-1 flex-col justify-end"
            >
              <div
                className={`relative w-full overflow-hidden rounded-t-md transition-colors duration-200 ${
                  active ? "bg-white/25" : "bg-white/[0.09] group-hover:bg-white/15"
                }`}
                style={{ height: `${(t / view.max) * 100}%` }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 bg-white transition-[height] duration-500 ease-out"
                  style={{ height: `${(p / t) * 100}%`, opacity: active ? 1 : 0.7 }}
                />
              </div>
              <span className="mt-2 hidden font-mono text-[10px] text-white/35 sm:block">{monthLabel(m).split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-white/35">
        Source: MOTIR monthly export releases (20 major items). Bars: total exports; white: {view.item.en}.
      </p>
    </div>
  );
}
