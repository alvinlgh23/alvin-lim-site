"use client";

import { useEffect, useMemo, useState } from "react";
import { bandEvents, computeBand, longDate, loadNeer, type NeerData } from "@/lib/neer";

const REPO = "https://github.com/alvinlgh23/SGD-NEER-shadow-model";
const MOVE: Record<string, string> = { slope_up: "Slope raised", slope_down: "Slope reduced", recentre: "Re-centred" };

/* The receipts: fit statistics, the inferred basket with confidence intervals, where the
   Singapore dollar sat before each MAS statement, and links to the code that produced it. */
export function NeerEvidence() {
  const [data, setData] = useState<NeerData | null>(null);
  useEffect(() => {
    loadNeer().then(setData).catch(() => setData(null));
  }, []);

  const view = useMemo(() => {
    if (!data) return null;
    const mode = data.meta.default_mode;
    const bandPct = data.meta.default_band_pct;
    const b = computeBand(data, data.modes[mode].index, bandPct);
    const check = data.meta.python_check[mode];
    const reproduced = Math.abs(b.gap - check.latest_deviation_pct) < 0.01 && Math.abs(b.share - check.share_outside_band) < 0.005;

    const weights = data.weights.currencies
      .map((c) => ({ c, coef: data.weights.ols[c].coef, ci: 1.96 * data.weights.ols[c].se }))
      .sort((x, y) => y.coef - x.coef);
    const maxW = Math.max(...weights.map((w) => w.coef + w.ci));

    const events = bandEvents(data)
      .filter((e) => e.date > data.dates[0])
      .map((e) => {
        const i = data.dates.findIndex((d) => d >= e.date);
        const at20 = i - 20 >= 0 ? b.deviation[i - 20] : null;
        const window = b.deviation.slice(Math.max(0, i - 60), i);
        const peak = window.length ? window.reduce((m, v) => (Math.abs(v) > Math.abs(m) ? v : m), 0) : null;
        const outsideDays = window.filter((v) => Math.abs(v) > bandPct).length;
        return { ...e, at20, peak, outsideDays, windowLen: window.length };
      });
    return { b, check, reproduced, weights, maxW, events, bandPct };
  }, [data]);

  if (!data || !view) return <div className="h-64 animate-pulse rounded-2xl bg-white/[0.03]" />;
  const pct = (v: number | null, d = 2) => (v === null ? "–" : `${v > 0 ? "+" : ""}${v.toFixed(d)}%`);

  return (
    <div className="grid gap-12 [&>*]:min-w-0">
      {/* Fit */}
      <div>
        <p className="text-[15px] font-medium text-[#F7F8F8]">How well it fits</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["R², full sample", data.fit.full_r2.toFixed(2), "Weekly SGD returns explained by the 12-currency basket"],
            ["R², latest 2 years", data.fit.latest_r2.toFixed(2), `Rolling ${data.fit.window_weeks}-week window`],
            ["Days outside ±2% band", `${Math.round(view.b.share * 100)}%`, `Of ${data.dates.length.toLocaleString()} trading days since ${longDate(data.dates[0])}`],
            [
              "Reproduced from Python",
              view.reproduced ? "✓ match" : "✗ differs",
              `Browser: ${pct(view.b.gap)}, ${(view.b.share * 100).toFixed(1)}% · Python: ${pct(view.check.latest_deviation_pct)}, ${(view.check.share_outside_band * 100).toFixed(1)}%`
            ]
          ].map(([k, v, n]) => (
            <div key={k} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
              <p className="text-[13px] text-white/45">{k}</p>
              <p className="mt-2 text-3xl font-medium tracking-[-0.04em] text-[#F7F8F8]">{v}</p>
              <p className="mt-2 text-[13px] leading-snug text-white/45">{n}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weights */}
      <div>
        <p className="text-[15px] font-medium text-[#F7F8F8]">The inferred basket, with 95% intervals</p>
        <p className="mt-1 text-[14px] text-white/45">
          Frankel-Wei regression of weekly SGD returns on each currency, all in CHF. The bar is the estimate; the thin line its 95% interval.
        </p>
        <div className="mt-5 grid gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
          {view.weights.map((w) => (
            <div key={w.c} className="grid grid-cols-[3rem_1fr_8.5rem] items-center gap-3 text-[13px]">
              <span className="font-mono text-white/70">{w.c}</span>
              <div className="relative h-4">
                <div className="absolute inset-y-0 left-0 rounded-sm bg-white/80" style={{ width: `${(w.coef / view.maxW) * 100}%` }} />
                <div
                  className="absolute top-1/2 h-px -translate-y-1/2 bg-white/40"
                  style={{ left: `${(Math.max(0, w.coef - w.ci) / view.maxW) * 100}%`, width: `${((Math.min(w.coef + w.ci, view.maxW) - Math.max(0, w.coef - w.ci)) / view.maxW) * 100}%` }}
                />
              </div>
              <span className="text-right font-mono text-white/60">
                {(w.coef * 100).toFixed(1)}% <span className="text-white/35">± {(w.ci * 100).toFixed(1)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Before each statement */}
      <div>
        <p className="text-[15px] font-medium text-[#F7F8F8]">Where the dollar sat before each MAS move</p>
        <p className="mt-1 max-w-[70ch] text-[14px] text-white/45">
          Position against the estimated centre one month (20 trading days) before each statement, the largest gap in the three months before it, and how many of those days sat outside the band.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="text-[12px] text-white/45">
              <tr className="border-b border-white/[0.08]">
                <th className="px-5 py-3 font-normal">Statement</th>
                <th className="px-5 py-3 font-normal">Move</th>
                <th className="px-5 py-3 text-right font-normal">1 month before</th>
                <th className="px-5 py-3 text-right font-normal">Largest gap, prior 3m</th>
                <th className="px-5 py-3 text-right font-normal">Days outside, prior 3m</th>
              </tr>
            </thead>
            <tbody>
              {view.events.map((e) => (
                <tr key={e.date} className="border-b border-white/[0.06] last:border-0">
                  <td className="whitespace-nowrap px-5 py-3 text-white/80">{longDate(e.date)}</td>
                  <td className="px-5 py-3 text-white/70">
                    {MOVE[e.action] ?? e.action}
                    {!e.verified ? <span className="ml-2 rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-white/45">unverified</span> : null}
                  </td>
                  <td className={`px-5 py-3 text-right font-mono ${e.at20 !== null && Math.abs(e.at20) > view.bandPct ? "text-[#FF8A5B]" : "text-white/80"}`}>{pct(e.at20)}</td>
                  <td className={`px-5 py-3 text-right font-mono ${e.peak !== null && Math.abs(e.peak) > view.bandPct ? "text-[#FF8A5B]" : "text-white/80"}`}>{pct(e.peak)}</td>
                  <td className="px-5 py-3 text-right font-mono text-white/70">
                    {e.windowLen ? `${e.outsideDays} / ${e.windowLen}` : "–"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-[78ch] text-[13px] leading-relaxed text-white/40">
          Read this as a description, not a forecast: the band is drawn from the announced statement dates, so it is anchored with hindsight. Orange marks a gap wider than the ±{view.bandPct}% band.
        </p>
      </div>

      {/* Method & source */}
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <p className="text-[15px] font-medium text-[#F7F8F8]">Method, in three steps</p>
          <ol className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-white/62">
            <li>
              <span className="text-white">1 · Infer the basket.</span> Regress weekly SGD returns on 12 currencies, all priced in CHF (Frankel-Wei). Full-sample OLS with standard errors, plus a rolling 104-week, non-negative, sum-to-one estimate.
            </li>
            <li>
              <span className="text-white">2 · Build the index.</span> A chain-linked geometric index of the SGD crosses, using the rolling weights lagged one day — no look-ahead.
            </li>
            <li>
              <span className="text-white">3 · Draw the band.</span> Follow MAS&apos;s dated statements: change the slope on slope dates, re-centre on re-centre dates. After the last re-centre (July 2022) the band has no fitted parameters, so time outside it is a real test.
            </li>
          </ol>
          <p className="mt-5 text-[13px] leading-relaxed text-white/40">
            MAS discloses none of the basket, weights, centre, slope or width — every number here is an estimate. Slope sizes are analyst-style assumptions; only their direction comes from MAS statements.
          </p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <p className="text-[15px] font-medium text-[#F7F8F8]">Check it yourself</p>
          <ul className="mt-4 space-y-2 text-[14.5px]">
            {[
              ["Full repository & README", REPO],
              ["basket_inference.py — the regression", `${REPO}/blob/main/basket_inference.py`],
              ["SGD.py — the shadow index", `${REPO}/blob/main/SGD.py`],
              ["policy_band.py — the band", `${REPO}/blob/main/policy_band.py`],
              ["mps_calendar.py — MAS statement dates", `${REPO}/blob/main/mps_calendar.py`],
              ["tests/ — the checks that run before each refresh", `${REPO}/tree/main/tests`]
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 border-b border-white/[0.06] pb-2 text-white/75 transition hover:text-white">
                  {label}
                  <span className="text-white/35 transition group-hover:text-white">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-white/40">Data as of {longDate(data.meta.last_date)}.</p>
        </div>
      </div>
    </div>
  );
}
