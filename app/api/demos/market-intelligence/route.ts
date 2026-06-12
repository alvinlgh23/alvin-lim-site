import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MARKET_API_BASE = process.env.MARKET_INTELLIGENCE_API_URL || "https://market-valuation-engine.onrender.com";
const REQUEST_TIMEOUT_MS = 115_000;
const ALLOWED_MODES = new Set(["macro", "full", "sectors", "sectors_all", "sector", "company", "risk", "overheat", "conclusion"]);
const TICKER_PATTERN = /^[A-Z]{1,6}$/;
const SECTOR_PATTERN = /^[a-z0-9-]{1,32}$/;

type MarketMode = "macro" | "full" | "sectors" | "sectors_all" | "sector" | "company" | "risk" | "overheat" | "conclusion";

function friendlyError(status: number) {
  if (status === 400) return "Check the selected mode and input, then try again.";
  if (status === 429) return "Too many requests. Please wait a moment and try again.";
  if (status === 503) return "Market data provider is temporarily rate-limited. Please try again later.";
  if (status === 504) return "Analysis timed out. Please try again.";
  return "Market Intelligence API is temporarily unavailable. Please try again later.";
}

function normalizeMode(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase().replace("sectors-all", "sectors_all");
}

function normalizeInput(mode: MarketMode, value: unknown) {
  if (typeof value !== "string") return "";
  const input = value.trim();

  if (mode === "company" || mode === "risk" || mode === "overheat") {
    return input.replace(/^\$/, "").toUpperCase();
  }

  if (mode === "sector") {
    return input.toLowerCase();
  }

  return "";
}

function validateInput(mode: MarketMode, input: string) {
  if ((mode === "company" || mode === "risk" || mode === "overheat") && !TICKER_PATTERN.test(input)) {
    return "Ticker must be 1-6 uppercase letters.";
  }

  if (mode === "sector" && !SECTOR_PATTERN.test(input)) {
    return "Sector contains unsupported characters.";
  }

  return "";
}

export async function POST(request: Request) {
  let mode = "";
  let input = "";

  try {
    const body = (await request.json()) as { mode?: unknown; input?: unknown };
    mode = normalizeMode(body.mode);

    if (!ALLOWED_MODES.has(mode)) {
      return NextResponse.json({ ok: false, cached: false, error: "Unsupported analysis mode." }, { status: 400 });
    }

    input = normalizeInput(mode as MarketMode, body.input);
  } catch {
    return NextResponse.json({ ok: false, cached: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const validationError = validateInput(mode as MarketMode, input);
  if (validationError) {
    return NextResponse.json({ ok: false, cached: false, error: validationError }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${MARKET_API_BASE}/v1/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, input }),
      signal: controller.signal
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          cached: Boolean(payload.cached),
          duration_ms: payload.duration_ms,
          timestamp_utc: payload.timestamp_utc,
          error: payload.error || friendlyError(response.status)
        },
        { status: response.status }
      );
    }

    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        cached: false,
        error: "Market Intelligence API is temporarily unavailable. Please try again later."
      },
      { status: 503 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
