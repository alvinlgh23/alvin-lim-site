import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);
const TIMEOUT_MS = 90_000;
const MAX_OUTPUT_LENGTH = 60_000;

const ALLOWED_MODES = new Set(["macro", "full", "sectors", "sectors-all", "sector", "company", "overheat"]);
const ALLOWED_SECTORS = new Set(["semis", "tech", "utilities", "energy", "financials"]);
const TICKER_PATTERN = /^[A-Z]{1,6}$/;

type DemoMode = "macro" | "full" | "sectors" | "sectors-all" | "sector" | "company" | "overheat";

function sanitizeToken(value: unknown, casing: "upper" | "lower") {
  if (typeof value !== "string") return "";
  const token = value.trim().replace(/^\$/, "");
  if (!/^[A-Za-z0-9.-]{1,16}$/.test(token)) return "";
  return casing === "upper" ? token.toUpperCase() : token.toLowerCase();
}

function sanitizeTicker(value: unknown) {
  if (typeof value !== "string") return "";
  const ticker = value.trim().toUpperCase();
  return TICKER_PATTERN.test(ticker) ? ticker : "";
}

function commandFor(mode: DemoMode, input: string) {
  if (mode === "macro") return { args: ["macro"], displayCommand: "python model.py macro" };
  if (mode === "full") return { args: ["full"], displayCommand: "python model.py full" };
  if (mode === "sectors") return { args: ["sectors"], displayCommand: "python model.py sectors" };
  if (mode === "sectors-all") return { args: ["sectors", "all"], displayCommand: "python model.py sectors all" };
  if (mode === "sector") return { args: ["sector", input], displayCommand: `python model.py sector ${input}` };
  if (mode === "company") return { args: ["company", input], displayCommand: `python model.py company ${input}` };
  return { args: ["risk", input], displayCommand: `python model.py risk ${input}` };
}

function fallbackOutput(mode: DemoMode, input: string, reason: string) {
  if (mode === "macro") {
    return `========================================================================
  LAYER 1 - MACRO REGIME ENGINE
========================================================================
  Mapping which asset class is attracting capital through rates, USD, and risk preference.

  10Y yield                          Unavailable       live data unavailable
  2Y / front-rate proxy              Unavailable       live data unavailable
  DXY                                Unavailable       live data unavailable
  VIX                                Unavailable       live data unavailable

  Liquidity / cost of capital        Unavailable       Fallback mode
  Market risk preference             Unavailable       Fallback mode
  Macro regime score                 Unavailable       Fallback mode

  Asset attraction map:
  Proxy  Asset                    Score        1M        3M        6M   3M vs SPY
  ----------------------------------------------------------------------------
  SPY    US equities                  -         -         -         -           -

  Manual / external data needed for full macro stack: Fed Funds Rate, M2 Liquidity, Reverse Repo, CPI / Inflation, Credit Spread.

  Regime read: Fallback output shown because the live script failed or timed out.

  Error: ${reason}`;
  }

  if (mode === "sectors" || mode === "sectors-all" || mode === "full") {
    return `MARKET INTELLIGENCE REPORT

=================================================
SECTOR ROTATION ANALYSIS
=================================================

Top Sector Rotation Leaders:

  ETF    Sector / Asset                  Score      1M RS      3M RS      6M RS   Breakout
  ----------------------------------------------------------------------------------------
  SMH    Semiconductors                      -          -          -          -          -
  XLK    Technology                          -          -          -          -          -
  XLU    Utilities                           -          -          -          -          -

=================================================
FINAL MARKET INTERPRETATION
=================================================

The live Market Intelligence System could not complete inside the demo timeout.
This fallback preserves the original project report format without inventing new sections.

Error: ${reason}`;
  }

  if (mode === "sector") {
    return `SPECIFIC SECTOR CONDITION REPORT

Selected sector: ${input || "semis"}

Top Institutional Quality Candidates:

1. Unavailable

Detail:
Live sector data unavailable in fallback mode.

=================================================
SECTOR POSITIONING ANALYSIS
=================================================

Sector:
${input || "semis"}

Relative Strength vs SPY:
Unavailable

Sector PE Expansion:
Unavailable

Breadth Participation:
Unavailable

Sector Narrative Type:
Unavailable

Assessment:
Fallback output shown because the live script failed or timed out.

Risk:
${reason}`;
  }

  return `SPECIFIC COMPANY CONDITION REPORT

Company: ${input || "NVDA"}

Revenue acceleration: Unavailable
Margin expansion: Unavailable
FCF: Unavailable
Quality score: Unavailable
Valuation risk: Data unavailable

Intelligence Breakdown:
- Financial Quality: Live data unavailable
- Narrative Strength: Requires Yahoo Finance response
- Momentum / Positioning: Requires price history
- Valuation Risk: Fallback mode
- Chase Risk: Fallback mode

Narrative Strength: Fallback Report
Driven by:
- safe demo timeout/error handling
- original Valuation-model report structure
- whitelisted command pattern

Interpretation:
The live Market Intelligence System script could not complete inside the demo timeout.
This fallback preserves the original project output format while avoiding an unsafe or hanging request.

Valuation Expansion: Unavailable
Momentum Heat: Unavailable

=================================================
POSITIONING / OVERHEAT ANALYSIS
=================================================

Price Performance:
Unavailable

Forward PE Expansion:
Unavailable

Distance from 200MA:
Unavailable

Momentum Structure:
Unavailable

Assessment:
Fallback output shown because the real script failed or timed out.

Current Stage:
Demo Fallback Mode

Risk:
${reason}`;
}

function truncateOutput(value: string) {
  if (value.length <= MAX_OUTPUT_LENGTH) {
    return { output: value, truncated: false };
  }

  return {
    output: `${value.slice(0, MAX_OUTPUT_LENGTH)}\n\n[Output truncated at ${MAX_OUTPUT_LENGTH} characters.]`,
    truncated: true
  };
}

function cleanError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown script error.";
  return message.replace(process.cwd(), "[workspace]").replace(/\/Users\/[^\s)]+/g, "[local-path]");
}

export async function POST(request: Request) {
  let mode = "";
  let rawInput: unknown = "";

  try {
    const body = (await request.json()) as { mode?: unknown; input?: unknown };
    mode = typeof body.mode === "string" ? body.mode : "";
    rawInput = body.input;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!ALLOWED_MODES.has(mode)) {
    return NextResponse.json({ ok: false, error: "Unsupported analysis mode." }, { status: 400 });
  }

  const demoMode = mode as DemoMode;
  const needsSector = demoMode === "sector";
  const needsTicker = demoMode === "company" || demoMode === "overheat";
  const input = needsSector ? sanitizeToken(rawInput, "lower") : needsTicker ? sanitizeTicker(rawInput) : "";

  if (needsSector && !ALLOWED_SECTORS.has(input)) {
    return NextResponse.json(
      {
        ok: false,
        source: "fallback",
        error: "Unsupported sector. Use semis, tech, utilities, energy, or financials.",
        output: fallbackOutput(demoMode, input || "semis", "Unsupported sector."),
        command: "python model.py sector [sector]"
      },
      { status: 400 }
    );
  }

  if (needsTicker && !input) {
    return NextResponse.json(
      {
        ok: false,
        source: "fallback",
        error: "Live project data unavailable for this ticker. Showing fallback report format.",
        output: fallbackOutput(demoMode, "TICKER", "Live project data unavailable for this ticker. Showing fallback report format."),
        command: demoMode === "overheat" ? "python model.py risk TICKER" : "python model.py company TICKER"
      },
      { status: 400 }
    );
  }

  const command = commandFor(demoMode, input);

  try {
    const { stdout, stderr } = await execFileAsync("python3", ["model.py", ...command.args], {
      cwd: `${process.cwd()}/Valuation-model`,
      timeout: TIMEOUT_MS,
      maxBuffer: 1024 * 1024 * 2
    });

    const rawOutput = stdout.trim();

    if (!rawOutput) {
      const reason = stderr.trim() || "Script returned no stdout.";
      const fallback = truncateOutput(fallbackOutput(demoMode, input, reason));
      return NextResponse.json({
        ok: false,
        source: "fallback",
        mode: demoMode,
        input,
        command: command.displayCommand,
        error: "Market Intelligence script returned no output.",
        stderr: stderr.trim().slice(0, 2000),
        ...fallback
      });
    }

    const output = truncateOutput(rawOutput);
    return NextResponse.json({
      ok: true,
      source: "real",
      mode: demoMode,
      input,
      command: command.displayCommand,
      stderr: stderr.trim().slice(0, 2000),
      ...output
    });
  } catch (error) {
    const reason = cleanError(error);
    const output = truncateOutput(fallbackOutput(demoMode, input, reason));

    return NextResponse.json({
      ok: false,
      source: "fallback",
      mode: demoMode,
      input,
      command: command.displayCommand,
      error: reason,
      ...output
    });
  }
}
