"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";

type OutputBlock = {
  title: string;
  badge?: string;
  rows: Array<[string, string]>;
  note?: string;
};

type NativeDemo = {
  inputLabel: string;
  defaultScenario: string;
  heading: string;
  blocks: OutputBlock[];
};

type ValuationApiResponse = {
  ok: boolean;
  mode?: MarketMode;
  input?: string;
  command?: string;
  output?: string;
  error?: string;
  truncated?: boolean;
  cached?: boolean;
  duration_ms?: number;
  timestamp_utc?: string;
};

type MarketMode = "macro" | "full" | "sectors" | "sectors_all" | "sector" | "company" | "risk" | "conclusion";

const MARKET_MODES: Array<{
  id: MarketMode;
  label: string;
  needsInput?: "sector" | "ticker";
  defaultInput?: string;
}> = [
  { id: "macro", label: "Macro Regime Scan" },
  { id: "full", label: "Full Hottest-Market Report" },
  { id: "sectors", label: "Hottest Sector Leaderboard" },
  { id: "sectors_all", label: "Full Sector Leaderboard" },
  { id: "sector", label: "Specific Sector Condition / Crowding", needsInput: "sector", defaultInput: "semis" },
  { id: "company", label: "Specific Company Condition / Chase Risk", needsInput: "ticker", defaultInput: "NVDA" },
  { id: "risk", label: "Company Overheat Check", needsInput: "ticker", defaultInput: "NVDA" },
  { id: "conclusion", label: "Short Market Conclusion" }
];

const SECTOR_INPUTS = ["semis", "tech", "utilities", "energy", "financials"];
const MARKET_INTELLIGENCE_API_URL = "https://market-valuation-engine.onrender.com/v1/analyze";

function scenarioDefault(project: Project) {
  if (project.slug === "on-chain-market-intelligence") return "BTC market regime scan";
  if (project.slug === "market-valuation-engine") return "NVDA";
  if (project.slug === "kospi-signal-monitor") return "^KS11 vs semiconductors";
  if (project.slug === "sgd-neer-shadow-model") return "SGD NEER policy-band snapshot";
  if (project.slug === "crypto-treasury-valuation") return "MSTR treasury wrapper valuation";
  if (project.slug === "phone-cycle-timing-engine") return "Buy now vs wait 6 months";
  if (project.slug === "personal-intelligence-os") return "/market";
  return "Singapore fintech demand scan";
}

function nativeDemo(project: Project, scenario: string, runCount: number): NativeDemo {
  const runLabel = runCount > 0 ? `Run ${runCount}` : "Preview";

  if (project.slug === "on-chain-market-intelligence") {
    return {
      inputLabel: "Market / Scenario",
      defaultScenario: scenarioDefault(project),
      heading: "BTC · MARKET REGIME ENGINE · DUNE v2",
      blocks: [
        {
          title: "// Market Regime Classification · 2026-05-15",
          badge: runLabel,
          rows: [
            ["Scenario", scenario],
            ["Ontology", "Early Rotation"],
            ["Regime", "Neutral / Transition"],
            ["On-chain score", "+2 / +8"],
            ["Confidence", "High · 82.5%"],
            ["Source", "DUNE LIVE · execution 01KRPAVW6K"]
          ]
        },
        {
          title: "Regime Probability Distribution",
          badge: "7-STATE",
          rows: [
            ["Transition", "53%"],
            ["Compression", "35%"],
            ["BTC-Led Risk-On", "34%"],
            ["Early Rotation", "34%"],
            ["Liquidity Expansion", "30%"],
            ["Narrative Expansion", "21%"]
          ],
          note: "Matches the original report's ontology wheel and probability distribution section."
        },
        {
          title: "Four-Layer Engine · Composite Breakdown",
          badge: "AGG SCORE -0.04",
          rows: [
            ["Macro Liquidity", "+0/+7 · Neutral"],
            ["Capital Flow", "-2/+5 · Negative"],
            ["On-chain", "+2/+8 · Bullish"],
            ["Narrative Strength", "+0/+1 · Neutral"]
          ]
        },
        {
          title: "Indicator Snapshot · Latest Values",
          badge: "2026-05-15",
          rows: [
            ["SOPR · 7D MA", "1.004 · Neutral realized P/L regime · +0"],
            ["RHODL Ratio", "985 · Mid-cycle holder balance · +0"],
            ["Exchange Net Flow", "+187 BTC · Balanced exchange pressure · +0"],
            ["LTH / STH", "-0.12% · Holder rotation is neutral · +0"],
            ["Puell Multiple", "1.002 · Normal miner revenue regime · +0"],
            ["ETH Gas", "Low ETH gas supports risk appetite · +1"]
          ]
        }
      ]
    };
  }

  if (project.slug === "market-valuation-engine") {
    return {
      inputLabel: "Ticker",
      defaultScenario: scenarioDefault(project),
      heading: "Market Intelligence System",
      blocks: [
        {
          title: "=================================================\nGLOBAL LIQUIDITY CONDITIONS\n=================================================",
          badge: runLabel,
          rows: [
            ["Scenario", scenario],
            ["Liquidity Regime", "Neutral / Selective Risk Appetite"],
            ["Risk Perception", "Normal Risk Perception"],
            ["Carry Conditions", "JPY carry still relevant"],
            ["US 10Y Treasury Yield", "near the 4.50% tight-liquidity threshold"],
            ["DXY Trend", "Falling / Stable · 3M"]
          ],
          note: "Uses the original console report convention: separator headers, threshold diagnostics, and interpretation blocks."
        },
        {
          title: "=================================================\nSECTOR POSITIONING ANALYSIS\n=================================================",
          rows: [
            ["Sector", "Semiconductors"],
            ["Relative Strength vs SPY", "positive 6M leadership"],
            ["Sector PE Expansion", "rerating proxy: broad valuation expansion"],
            ["Breadth Participation", "Slightly Concentrated Leadership"],
            ["Sector Narrative Type", "AI infrastructure / institutional quality"]
          ]
        },
        {
          title: "=================================================\nPOSITIONING / OVERHEAT ANALYSIS\n=================================================",
          rows: [
            ["Price Performance", "+ strong 6M momentum"],
            ["Forward PE Expansion", "current forward PE vs prior forward PE"],
            ["Distance from 200MA", "extended but not a standalone sell signal"],
            ["Current Stage", "Narrative Repricing / Momentum Expansion"],
            ["Risk", "High Valuation Risk · Moderate Chase Risk"]
          ]
        },
        {
          title: "MARKET INTELLIGENCE EXTENSIONS",
          rows: [
            ["Capital Flow Story", "capital remains sensitive to AI/liquidity leadership"],
            ["Market Phase", "selective leadership rather than broad participation"],
            ["Leadership Durability Score", "depends on breadth, macro fragility, Fed sensitivity, and heat"],
            ["Scenario Analysis", "bullish confirmations vs bearish invalidations"],
            ["Final interpretation", "research read only; not a trade instruction"]
          ]
        }
      ]
    };
  }

  if (project.slug === "kospi-signal-monitor") {
    return {
      inputLabel: "Benchmark / Proxy",
      defaultScenario: scenarioDefault(project),
      heading: "KOSPI SIGNAL MONITOR",
      blocks: [
        {
          title: "Regime Summary",
          badge: "Granger + OLS + GARCH",
          rows: [
            ["Scenario", scenario],
            ["Benchmark", "^KS11 KOSPI Composite"],
            ["Primary proxy", "SK Hynix + Samsung Electronics"],
            ["Primary score", "candidate relationship score / 10"],
            ["Volatility regime", "KOSPI volatility regime · GARCH(1,1)"],
            ["Method note", "Granger p-values are Bonferroni-adjusted across tested lags"]
          ]
        },
        {
          title: "Signal Board",
          rows: [
            ["Technology / Semis", "Score · correlation · lag-adjusted p-value"],
            ["Macro / USDKRW", "inverse candidate relationship when FX pressure rises"],
            ["Consumption", "broad domestic and export-driven consumer demand proxy"],
            ["Cultural / K-pop", "listed K-pop agency basket · normalized"],
            ["Foreign Flow", "net foreign KOSPI buy/sell proxy when pykrx is available"]
          ],
          note: "Matches the dashboard's score cards and signal-strength language."
        },
        {
          title: "Export Earnings Snapshot",
          badge: "Latest official · USD",
          rows: [
            ["Semiconductors", "$141.9B · MOTIR/MSIT ICT exports, 2025"],
            ["ICT ex-Semis", "$84.3B · ICT total minus semiconductor exports"],
            ["K-Content Total", "games, music/K-pop, broadcast/video, film, animation, publishing"],
            ["Source note", "K-content services are annual survey data, not live customs goods statistics"]
          ]
        }
      ]
    };
  }

  if (project.slug === "sgd-neer-shadow-model") {
    return {
      inputLabel: "FX Scenario",
      defaultScenario: scenarioDefault(project),
      heading: "S$NEER Shadow Proxy",
      blocks: [
        {
          title: "==============================================================\nSHADOW S$NEER PROXY - LATEST SNAPSHOT\n==============================================================",
          badge: runLabel,
          rows: [
            ["Scenario", scenario],
            ["Date", "latest Yahoo Finance overlap window"],
            ["Index", "trade-weighted geometric SGD index"],
            ["Estimated centre", "MAS-style policy centre estimate"],
            ["Distance from estimated centre", "+/- % vs centre"],
            ["21d annualised volatility", "computed from Shadow_NEER_Log_Return"],
            ["Latest USD per SGD", "observable USD cross"]
          ]
        },
        {
          title: "==============================================================\nPROXY BASKET WEIGHTS\n==============================================================",
          rows: [
            ["USD", "basket weight · contribution bar"],
            ["CNY", "basket weight · contribution bar"],
            ["MYR", "basket weight · contribution bar"],
            ["EUR", "basket weight · contribution bar"],
            ["JPY", "basket weight · contribution bar"],
            ["TWD / IDR", "broader Asian trade-partner currencies"]
          ]
        },
        {
          title: "Dashboard Panels",
          rows: [
            ["Proxy Path vs Estimated Policy Band", "Centre Fit R2"],
            ["Estimated fixed band", "+/-2%"],
            ["Vol-adjusted stress band", "dynamic half-width"],
            ["Shadow S$NEER proxy", "higher index means broad SGD strength"],
            ["Disclosure", "MAS basket, centre, slope and band width are undisclosed"]
          ]
        }
      ]
    };
  }

  if (project.slug === "crypto-treasury-valuation") {
    return {
      inputLabel: "Ticker",
      defaultScenario: scenarioDefault(project),
      heading: "Crypto Treasury Company Valuation Model",
      blocks: [
        {
          title: "Treasury Wrapper Output",
          rows: [
            ["Ticker", scenario],
            ["mNAV", "1.05x"],
            ["Adjusted mNAV", "1.01x"],
            ["Signal", "FAIR"],
            ["Recommendation", "NEUTRAL — mNAV 1.05x, modest premium, reasonable BTC wrapper cost"],
            ["Trade enabled", "false"]
          ]
        }
      ]
    };
  }

  if (project.slug === "phone-cycle-timing-engine") {
    return {
      inputLabel: "Phone / Timing Assumption",
      defaultScenario: scenarioDefault(project),
      heading: "Phone Cycle Timing Engine",
      blocks: [
        {
          title: "Depreciation Scenario",
          rows: [
            ["Scenario", scenario],
            ["Projected market price", "estimated over time"],
            ["Suggested buy window", "after the steepest price drop"],
            ["Hold period", "calmer ownership window"],
            ["Sell signal", "before the next likely release shock"],
            ["Comparison", "buying now versus waiting"]
          ]
        }
      ]
    };
  }

  if (project.slug === "personal-intelligence-os") {
    return {
      inputLabel: "Command",
      defaultScenario: scenarioDefault(project),
      heading: "Hybrid Financial + Personal Intelligence OS",
      blocks: [
        {
          title: "Telegram Command Output",
          rows: [
            ["Command", scenario],
            ["Market Pulse", "SPX · NDX · DXY · US10Y"],
            ["Macro regime", "rates/liquidity channel and risk appetite"],
            ["Watchlist", "ticker brief with quotes and valuation when available"],
            ["Local-only", "/value, /chase, /analyze require local model runner"]
          ]
        }
      ]
    };
  }

  return {
    inputLabel: "Market Scan",
    defaultScenario: scenarioDefault(project),
    heading: "Demand Discovery Report",
    blocks: [
      {
        title: "Summary Metrics",
        rows: [
          ["Country", "Singapore"],
          ["Industry", scenario],
          ["Selected Demand", "evidence-backed demand cluster"],
          ["Demand Strength", "rating"],
          ["Market Saturation", "rating"],
          ["Final Assessment", "generated only from traceable evidence"]
        ]
      },
      {
        title: "Customer Pain Point Map",
        rows: [
          ["Problem", "repeated complaint pattern"],
          ["Impact", "business or user consequence"],
          ["Current Solution", "what users do today"],
          ["Limitation", "why current solution is insufficient"],
          ["Opportunity", "suggested MVP direction"]
        ]
      }
    ]
  };
}

function selectedMarketMode(mode: MarketMode) {
  return MARKET_MODES.find((item) => item.id === mode) || MARKET_MODES[0];
}

function marketCommand(mode: MarketMode, input: string) {
  const safeTicker = sanitizeTickerInput(input) || "NVDA";
  const safeSector = sanitizeSectorInput(input) || "semis";
  if (mode === "macro") return "python model.py macro";
  if (mode === "full") return "python model.py full";
  if (mode === "sectors") return "python model.py sectors";
  if (mode === "sectors_all") return "python model.py sectors all";
  if (mode === "sector") return `python model.py sector ${safeSector}`;
  if (mode === "company") return `python model.py company ${safeTicker}`;
  if (mode === "risk") return `python model.py risk ${safeTicker}`;
  return "python model.py conclusion";
}

function sanitizeTickerInput(value: string) {
  const ticker = normalizeTickerInput(value);
  return /^[A-Z]{1,6}$/.test(ticker) ? ticker : "";
}

function normalizeTickerInput(value: string) {
  return value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6);
}

function sanitizeSectorInput(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z-]/g, "").slice(0, 16);
}

function fallbackPreview(demo: NativeDemo) {
  return demo.blocks
    .map((block) => `${block.title}\n${block.rows.map(([label, value]) => `${label}: ${value}`).join("\n")}${block.note ? `\n\n${block.note}` : ""}`)
    .join("\n\n");
}

function friendlyMarketError(status: number) {
  if (status === 400) return "Check the selected mode and input, then try again.";
  if (status === 429) return "Too many requests. Please wait a moment and try again.";
  if (status === 503) return "Market data provider is temporarily rate-limited. Please try again later.";
  if (status === 504) return "Analysis timed out. Please try again.";
  return "Market Intelligence API is temporarily unavailable. Please try again later.";
}

async function readMarketResponse(response: Response): Promise<ValuationApiResponse> {
  const text = await response.text();
  if (!text.trim()) {
    return {
      ok: false,
      cached: false,
      error: "Market Intelligence API returned an empty response."
    };
  }

  try {
    return JSON.parse(text) as ValuationApiResponse;
  } catch {
    return {
      ok: false,
      cached: false,
      error: "Market Intelligence API returned an unreadable response."
    };
  }
}

export function DemoPanel({ project }: { project: Project }) {
  const [scenario, setScenario] = useState(() => scenarioDefault(project));
  const [submittedScenario, setSubmittedScenario] = useState(() => scenarioDefault(project));
  const [runCount, setRunCount] = useState(0);
  const [marketMode, setMarketMode] = useState<MarketMode>("macro");
  const [marketInput, setMarketInput] = useState("NVDA");
  const [isLoading, setIsLoading] = useState(false);
  const [valuationOutput, setValuationOutput] = useState("");
  const [valuationError, setValuationError] = useState("");
  const [executedCommand, setExecutedCommand] = useState("");
  const [responseMeta, setResponseMeta] = useState<{ cached?: boolean; durationMs?: number; timestampUtc?: string }>({});
  const isFinance = /market|valuation|kospi|crypto|neer|finance|on-chain|fx|equity/i.test(`${project.name} ${project.type} ${project.description}`);
  const isValuationDemo = project.slug === "market-valuation-engine";
  const demo = useMemo(() => nativeDemo(project, submittedScenario, runCount), [project, submittedScenario, runCount]);
  const activeMarketMode = selectedMarketMode(marketMode);
  const command = marketCommand(marketMode, marketInput.trim());

  async function generateOutput() {
    const nextScenario = scenario.trim() || demo.defaultScenario;
    setRunCount((count) => count + 1);

    if (!isValuationDemo) {
      setSubmittedScenario(nextScenario);
      return;
    }

    const input =
      activeMarketMode.needsInput === "ticker"
        ? sanitizeTickerInput(marketInput)
        : activeMarketMode.needsInput === "sector"
          ? sanitizeSectorInput(marketInput) || activeMarketMode.defaultInput || ""
          : "";
    setSubmittedScenario(input || activeMarketMode.label);
    setIsLoading(true);
    setValuationError("");
    setResponseMeta({});
    setExecutedCommand(command);

    try {
      const response = await fetch(MARKET_INTELLIGENCE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: marketMode, input })
      });
      const payload = await readMarketResponse(response);

      setResponseMeta({
        cached: Boolean(payload.cached),
        durationMs: payload.duration_ms,
        timestampUtc: payload.timestamp_utc
      });

      if (!response.ok || !payload.ok) {
        setValuationOutput(payload.output || "");
        setValuationError(payload.error || friendlyMarketError(response.status));
        setExecutedCommand(payload.command || command);
        return;
      }

      setValuationOutput(payload.output || "");
      setValuationError(payload.output ? "" : "The API returned successfully but no report output was included.");
      setExecutedCommand(payload.command || command);
    } catch (error) {
      const message =
        error instanceof TypeError
          ? "Unable to reach the Market Intelligence API. This may be a network or CORS issue."
          : error instanceof Error
            ? error.message
            : "Unable to run Valuation-model.";
      setValuationOutput("");
      setResponseMeta({});
      setValuationError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="lab-surface min-w-0 rounded-lg p-5">
        <p className="lab-eyebrow text-xs text-bone/38">Input Console</p>
        <h2 className="lab-section-title mt-4 text-2xl text-bone">
          {isValuationDemo ? "Market Intelligence Console" : "Simulated Research Input"}
        </h2>
        <div className="mt-6 space-y-4">
          {isValuationDemo ? (
            <>
              <label className="block text-sm text-bone/70" htmlFor="market-mode">
                Analysis Mode
              </label>
              <select
                className="lab-focus-ring w-full min-w-0 rounded-md border border-white/12 bg-black/30 px-4 py-3 text-bone outline-none transition focus:border-bone/45"
                id="market-mode"
                onChange={(event) => {
                  const nextMode = event.target.value as MarketMode;
                  const next = selectedMarketMode(nextMode);
                  setMarketMode(nextMode);
                  setMarketInput(next.defaultInput || "");
                  setValuationOutput("");
                  setValuationError("");
                  setResponseMeta({});
                  setExecutedCommand("");
                }}
                value={marketMode}
              >
                {MARKET_MODES.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {mode.label}
                  </option>
                ))}
              </select>
              {activeMarketMode.needsInput ? (
                <>
                  <label className="block text-sm text-bone/70" htmlFor="market-input">
                    {activeMarketMode.needsInput === "sector" ? "Sector" : "Company ticker"}
                  </label>
                  <input
                    className="lab-focus-ring w-full min-w-0 rounded-md border border-white/12 bg-black/30 px-4 py-3 text-bone outline-none transition placeholder:text-bone/35 focus:border-bone/45"
                    id="market-input"
                    onChange={(event) =>
                      setMarketInput(activeMarketMode.needsInput === "ticker" ? normalizeTickerInput(event.target.value) : event.target.value)
                    }
                    placeholder={activeMarketMode.needsInput === "sector" ? SECTOR_INPUTS.join(" / ") : "Try NVDA, AVGO, PLTR, AAPL..."}
                    value={marketInput}
                  />
                </>
              ) : null}
              <label className="block text-sm text-bone/70" htmlFor="market-command">
                Command
              </label>
              <input
                className="w-full min-w-0 rounded-md border border-white/12 bg-black/36 px-4 py-3 font-mono text-sm text-bone/62 outline-none"
                id="market-command"
                readOnly
                value={command}
              />
            </>
          ) : (
            <>
              <label className="block text-sm text-bone/70" htmlFor="demo-input">
                {demo.inputLabel}
              </label>
              <input
                className="lab-focus-ring w-full min-w-0 rounded-md border border-white/12 bg-black/30 px-4 py-3 text-bone outline-none transition placeholder:text-bone/35 focus:border-bone/45"
                id="demo-input"
                onChange={(event) => setScenario(event.target.value)}
                value={scenario}
              />
            </>
          )}
          <button
            className="lab-button-primary lab-focus-ring w-full rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            onClick={generateOutput}
            type="button"
          >
            {isLoading ? "Running analysis..." : isValuationDemo ? "Generate Output" : "Generate Sample Output"}
          </button>
        </div>
        <p className="lab-copy mt-5 text-sm text-bone/55">
          {isValuationDemo
            ? "Calls the live Render API with predefined Market Intelligence modes and sanitized inputs."
            : "Simulated demo based on original project output format. Demo output is simulated for presentation purposes."}
          {isFinance ? " This is not financial advice." : ""}
        </p>
        {isValuationDemo && activeMarketMode.needsInput ? (
          <p className="mt-3 rounded-md border border-white/8 bg-black/20 p-3 text-xs leading-5 text-bone/42">
            {activeMarketMode.needsInput === "sector"
              ? `Supported sectors: ${SECTOR_INPUTS.join(" / ")}`
              : "Ticker format: uppercase letters only, 1-6 characters."}
          </p>
        ) : null}
      </div>
      <div className="lab-console min-w-0 rounded-lg p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="lab-eyebrow text-xs text-bone/38">Output Panel</p>
          <span className="lab-eyebrow rounded-md border border-moss/25 bg-moss/10 px-2.5 py-1 text-[11px] text-moss/85">research</span>
        </div>
        <h2 className="lab-section-title mt-3 text-2xl text-bone">{demo.heading}</h2>
        {isValuationDemo ? (
          <>
            <p className="mt-2 text-xs text-bone/45">Live output from the Market Intelligence Render API.</p>
            {executedCommand ? <p className="mt-2 font-mono text-xs text-bone/38">{executedCommand}</p> : null}
            <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
              <div className="rounded-md border border-white/8 bg-black/22 px-3 py-2">
                <p className="lab-eyebrow text-[10px] text-bone/32">cached</p>
                <p className="mt-1 font-mono text-bone/70">{responseMeta.cached === undefined ? "-" : responseMeta.cached ? "true" : "false"}</p>
              </div>
              <div className="rounded-md border border-white/8 bg-black/22 px-3 py-2">
                <p className="lab-eyebrow text-[10px] text-bone/32">duration</p>
                <p className="mt-1 font-mono text-bone/70">{responseMeta.durationMs === undefined ? "-" : `${responseMeta.durationMs}ms`}</p>
              </div>
              <div className="rounded-md border border-white/8 bg-black/22 px-3 py-2">
                <p className="lab-eyebrow text-[10px] text-bone/32">timestamp</p>
                <p className="mt-1 break-all font-mono text-bone/70">{responseMeta.timestampUtc || "-"}</p>
              </div>
            </div>
            {valuationError ? <p className="mt-3 rounded-md border border-ember/25 bg-ember/10 p-3 text-xs leading-5 text-ember/85">{valuationError}</p> : null}
            <pre className="lab-terminal-lines mt-5 max-h-[620px] min-w-0 overflow-auto whitespace-pre-wrap rounded-md border border-white/8 bg-black/34 p-4 font-mono text-sm leading-6 text-bone/78">
              {isLoading ? `Running ${command} ...\nCalling ${MARKET_INTELLIGENCE_API_URL}` : valuationOutput || "Select a mode and generate output to view the live terminal report."}
            </pre>
          </>
        ) : (
          <>
            <p className="mt-2 text-xs text-bone/45">Simulated demo based on original project output format.</p>
            <div className="mt-5 space-y-4 font-mono text-sm">
              {demo.blocks.map((block) => (
                <section className="lab-terminal-lines rounded-md border border-white/8 bg-black/34 p-4 text-bone/78" key={block.title}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="whitespace-pre-line text-sm font-semibold leading-6 text-bone">{block.title}</h3>
                    {block.badge ? <span className="rounded-md border border-white/12 px-2 py-1 text-[11px] text-bone/58">{block.badge}</span> : null}
                  </div>
                  <div className="mt-4 space-y-2">
                    {block.rows.map(([label, value]) => (
                      <div className="grid gap-1 border-t border-white/8 pt-2 sm:grid-cols-[0.42fr_0.58fr]" key={`${block.title}-${label}`}>
                        <span className="text-bone/45">{label}</span>
                        <span className="text-bone/82">{value}</span>
                      </div>
                    ))}
                  </div>
                  {block.note ? <p className="mt-4 border-t border-white/8 pt-3 text-xs leading-5 text-bone/45">{block.note}</p> : null}
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
