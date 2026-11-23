"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { bandEvents, computeBand, longDate, loadNeer, zoneText, type NeerData } from "@/lib/neer";

const W = 1000;
const H = 420;
const PAD = { l: 48, r: 16, t: 18, b: 34 };

/* Interactive shadow S$NEER: hover to read any day, drag the band width, switch the basket. */
export function NeerBandChart({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<NeerData | null>(null);
  const [mode, setMode] = useState<string>("");
  const [band, setBand] = useState(2);
  const [hover, setHover] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    loadNeer()
      .then((d) => {
        setData(d);
        setMode(d.meta.default_mode);
        setBand(d.meta.default_band_pct);
      })
      .catch(() => setError(true));
  }, []);

  const model = useMemo(() => {
    if (!data || !mode) return null;
    const index = data.modes[mode].index;
    const b = computeBand(data, index, band);
    const lo = Math.min(...b.lower, ...index) - 0.6;
    const hi = Math.max(...b.upper, ...index) + 0.6;
    const n = index.length;
    const x = (i: number) => PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r);
    const y = (v: number) => PAD.t + (1 - (v - lo) / (hi - lo)) * (H - PAD.t - PAD.b);
    const path = (arr: number[]) => arr.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
    const area =
      b.upper.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("") +
      b.lower
        .map((v, i) => [i, v] as const)
        .reverse()
        .map(([i, v]) => `L${x(i).toFixed(1)},${y(v).toFixed(1)}`)
        .join("") +
      "Z";
    // Segments where the index sits outside the band
    let outside = "";
    let open = false;
    index.forEach((v, i) => {
      if (Math.abs(b.deviation[i]) > band) {
        outside += `${open ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
        open = true;
      } else open = false;
    });
    const ticks: { v: number; y: number }[] = [];
    for (let v = Math.ceil(lo); v <= hi; v += 2) ticks.push({ v, y: y(v) });
    const years = data.dates
      .map((d, i) => [d, i] as const)
      .filter(([d], i, arr) => i === 0 || d.slice(0, 4) !== arr[i - 1][0].slice(0, 4))
      .map(([d, i]) => ({ label: d.slice(0, 4), x: x(i) }));
    const events = bandEvents(data)
      .filter((e) => e.date >= data.dates[0])
      .map((e) => ({ ...e, x: x(data.dates.findIndex((d) => d >= e.date)) }));
    return { index, b, x, y, path, area, outside, ticks, years, events, n };
  }, [data, mode, band]);

  const onMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!model || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (model.n - 1));
    setHover(Math.max(0, Math.min(model.n - 1, i)));
  };

  if (error) return <p className="p-8 text-sm text-white/50">Data could not be loaded.</p>;
  if (!data || !model) return <div className="h-[340px] animate-pulse rounded-2xl bg-white/[0.03]" />;

  const i = hover ?? model.n - 1;
  const dev = model.b.deviation[i];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{longDate(data.dates[i])}</p>
          <p className="mt-1 text-2xl font-medium tracking-tight text-white md:text-3xl">
            {model.index[i].toFixed(2)}
            <span className={`ml-3 text-base ${Math.abs(dev) > band ? "text-[#FF8A5B]" : "text-white/55"}`}>
              {dev > 0 ? "+" : ""}
              {dev.toFixed(2)}% vs centre
            </span>
          </p>
        </div>
        {!compact ? (
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(data.modes).map(([key, m]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`rounded-full px-3.5 py-1.5 text-xs transition ${
                  mode === key ? "bg-white text-black" : "bg-white/[0.06] text-white/65 hover:bg-white/[0.12] hover:text-white"
                }`}
              >
                {m.label.replace("Inferred, ", "").replace(" window", "")}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="mt-5 w-full touch-none select-none"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Shadow S$NEER index with an estimated ±${band}% policy band, ${data.meta.first_date} to ${data.meta.last_date}`}
      >
        {model.ticks.map((t) => (
          <g key={t.v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={t.y} y2={t.y} stroke="rgba(255,255,255,0.06)" />
            <text x={PAD.l - 10} y={t.y + 4} textAnchor="end" className="fill-white/35 font-mono text-[11px]">
              {t.v}
            </text>
          </g>
        ))}
        {model.years.map((yr) => (
          <text key={yr.label} x={yr.x} y={H - 10} className="fill-white/35 font-mono text-[11px]">
            {yr.label}
          </text>
        ))}
        {!compact
          ? model.events.map((e) => (
              <line
                key={e.date}
                x1={e.x}
                x2={e.x}
                y1={PAD.t}
                y2={H - PAD.b}
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray={e.verified ? undefined : "3 4"}
              />
            ))
          : null}
        <path d={model.area} fill="rgba(255,255,255,0.07)" />
        <path d={model.path(model.b.center)} fill="none" stroke="rgba(255,255,255,0.35)" strokeDasharray="2 5" strokeWidth={1.2} />
        <path d={model.path(model.index)} fill="none" stroke="#FFFFFF" strokeWidth={1.8} />
        <path d={model.outside} fill="none" stroke="#FF8A5B" strokeWidth={2.4} />
        <line x1={model.x(i)} x2={model.x(i)} y1={PAD.t} y2={H - PAD.b} stroke="rgba(255,255,255,0.35)" />
        <circle cx={model.x(i)} cy={model.y(model.index[i])} r={5} fill="#000" stroke="#fff" strokeWidth={2} />
      </svg>

      {!compact ? (
        <div className="mt-5 grid gap-5 border-t border-white/[0.08] pt-5 md:grid-cols-[1fr_auto] md:items-center">
          <label className="flex items-center gap-4 text-sm text-white/60">
            <span className="whitespace-nowrap">Band width</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.25}
              value={band}
              onChange={(e) => setBand(parseFloat(e.target.value))}
              className="w-full max-w-[260px] accent-white"
            />
            <span className="w-14 font-mono text-white">±{band}%</span>
          </label>
          <p className="text-sm text-white/55">
            Today: <span className="text-white">{zoneText(model.b.gap, band)}</span> · outside the band on{" "}
            <span className="text-white">{Math.round(model.b.share * 100)}%</span> of days
          </p>
        </div>
      ) : null}
    </div>
  );
}
