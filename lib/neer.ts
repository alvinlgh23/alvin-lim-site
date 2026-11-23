/*
  Shadow S$NEER policy band — a TypeScript port of computeBand() in the NEER project's
  docs/app.js (itself a mirror of policy_band.build_piecewise_center). Same rules, so the
  site reproduces the Python numbers on default settings.
*/

export type NeerEvent = {
  date: string;
  action: "slope_up" | "slope_down" | "recentre" | "hold";
  slope_after: number;
  note: string;
  verified: boolean;
  off_cycle: boolean;
};

export type NeerData = {
  meta: {
    generated_utc: string;
    first_date: string;
    last_date: string;
    next_review: string;
    default_band_pct: number;
    initial_slope_pct: number;
    recentre_lookback: number;
    default_mode: string;
    python_check: Record<string, { latest_deviation_pct: number; share_outside_band: number }>;
  };
  dates: string[];
  modes: Record<string, { label: string; index: number[] }>;
  events: NeerEvent[];
  weights: { currencies: string[]; ols: Record<string, { coef: number; se: number }> };
  fit: { full_r2: number; latest_r2: number; window_weeks: number };
};

export type Band = {
  center: number[];
  upper: number[];
  lower: number[];
  deviation: number[];
  share: number;
  gap: number;
};

const DAY_MS = 86400000;

export function bandEvents(data: NeerData) {
  return data.events.filter((e) => e.action !== "hold");
}

export function computeBand(data: NeerData, index: number[], bandPct: number): Band {
  const dates = data.dates;
  const n = dates.length;
  const events = bandEvents(data);
  const slopeAt = (iso: string) => {
    let slope = data.meta.initial_slope_pct;
    for (const e of events) if (e.date <= iso) slope = e.slope_after;
    return slope;
  };

  const t = dates.map((d) => Date.parse(`${d}T00:00:00Z`));
  const logI = index.map(Math.log);
  const growth = new Float64Array(n);
  for (let i = 1; i < n; i++) {
    const days = Math.max((t[i] - t[i - 1]) / DAY_MS, 0);
    growth[i] = growth[i - 1] + ((slopeAt(dates[i]) / 100) * days) / 365.25;
  }

  const recentres = events.filter((e) => e.action === "recentre" && e.date > dates[0] && e.date <= dates[n - 1]);
  const bounds = [0, ...recentres.map((e) => dates.findIndex((d) => d >= e.date)), n];

  const logC = new Float64Array(n);
  let offset = 0;
  for (let i = bounds[0]; i < bounds[1]; i++) offset += logI[i] - growth[i];
  offset /= bounds[1] - bounds[0];
  for (let i = bounds[0]; i < bounds[1]; i++) logC[i] = offset + growth[i];

  const lookback = data.meta.recentre_lookback;
  for (let k = 1; k < bounds.length - 1; k++) {
    const start = bounds[k];
    const end = bounds[k + 1];
    const lo = Math.max(start - lookback, 0);
    let level = logI[start];
    if (start > lo) {
      let s = 0;
      for (let i = lo; i < start; i++) s += logI[i];
      level = s / (start - lo);
    }
    for (let i = start; i < end; i++) logC[i] = level + growth[i] - growth[start];
  }

  const half = bandPct / 100;
  const center = Array.from(logC, Math.exp);
  const upper = center.map((c) => c * (1 + half));
  const lower = center.map((c) => c * (1 - half));
  const deviation = index.map((v, i) => (v / center[i] - 1) * 100);
  const outside = deviation.filter((d) => Math.abs(d) > bandPct).length;
  return { center, upper, lower, deviation, share: outside / n, gap: deviation[n - 1] };
}

export function zoneText(gap: number, bandPct: number) {
  if (gap > bandPct) return "above the estimated band";
  if (gap >= 0) return "in the upper half of the band";
  if (gap >= -bandPct) return "in the lower half of the band";
  return "below the estimated band";
}

export type ExportsData = {
  unit: string;
  source: string;
  months: string[];
  total: { v: number; yoy: number }[];
  items: { ko: string; en: string; series: { v: number; yoy: number }[] }[];
  released?: string;
};

// Shared, cached loaders for the static data files in /public/data
const cache: Record<string, Promise<unknown>> = {};
function load<T>(path: string): Promise<T> {
  cache[path] ??= fetch(path).then((r) => {
    if (!r.ok) throw new Error(`${path}: ${r.status}`);
    return r.json();
  });
  return cache[path] as Promise<T>;
}
export const loadNeer = () => load<NeerData>("/data/sgd-neer.json");
export const loadExports = () => load<ExportsData>("/data/korea-exports.json");

export const monthLabel = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-GB", { month: "short", year: "2-digit", timeZone: "UTC" });
};
export const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
