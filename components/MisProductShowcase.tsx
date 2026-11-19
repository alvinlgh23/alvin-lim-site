import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";
import { projects } from "@/lib/projects";

const MIS_FEATURES = [
  {
    code: "MODULE 01",
    title: "Macro Regime Analysis",
    subtitle: "Global liquidity, rates & cross-asset risk appetite",
    description:
      "Evaluates US Treasury yield thresholds (10Y / 2Y), US Dollar (DXY) trajectory, volatility regimes (VIX), and carry conditions to classify the prevailing macro environment before screening individual assets."
  },
  {
    code: "MODULE 02",
    title: "Sector Momentum",
    subtitle: "Multi-horizon relative strength leaderboard",
    description:
      "Ranks equity sectors across 1M, 3M, and 6M relative-strength horizons against benchmark indices to identify where institutional capital is concentrating or rotating."
  },
  {
    code: "MODULE 03",
    title: "Sector Deep Dive",
    subtitle: "Breadth participation & sector-level valuation expansion",
    description:
      "Inspects internal sector breadth, leadership concentration, forward multiple expansion, and top institutional quality candidates within specific industries such as Semiconductors, Technology, Utilities, Energy, and Financials."
  },
  {
    code: "MODULE 04",
    title: "Company Research",
    subtitle: "Fundamental quality vs. narrative repricing",
    description:
      "Analyzes revenue acceleration, margin trajectory, free cash flow quality, and valuation multiples to separate durable operating momentum from purely narrative-driven multiple expansion."
  },
  {
    code: "MODULE 05",
    title: "Overheat Monitor",
    subtitle: "Positioning stretch & chase-risk diagnostics",
    description:
      "Measures extension from 200-day moving averages, forward PE expansion velocity, and momentum crowding to flag when a strong fundamental thesis faces elevated near-term chase risk."
  },
  {
    code: "MODULE 06",
    title: "Risk & Rotation",
    subtitle: "Capital flow transitions & leadership durability",
    description:
      "Synthesizes macro fragility, breadth concentration, rate sensitivity, and positioning heat into a structured leadership-durability and rotation-risk assessment."
  },
  {
    code: "MODULE 07",
    title: "Full Market Report",
    subtitle: "End-to-end multi-layer intelligence synthesis",
    description:
      "Generates a unified workstation report combining Macro Regime, Sector Rotation Leaders, Institutional Quality Screens, and Positioning Boundaries in a single auditable document."
  },
  {
    code: "MODULE 08",
    title: "Five-language interface",
    subtitle: "Multilingual research workstation surface",
    description:
      "Supports seamless switching across five interface languages so market structure diagnostics, regime classifications, and analytical reports remain accessible across international research workflows."
  }
];

const WORKSTATION_FRAMES = [
  {
    id: "frame-macro-sector",
    badge: "WORKSTATION SURFACE 01 // MACRO & SECTOR ROTATION",
    title: "Macro Regime Analysis & Sector Momentum Leaderboard",
    altDescription:
      "Preview of the Market Intelligence System macro regime and sector momentum workstation surface showing liquidity thresholds, asset attraction mapping, and multi-horizon sector relative strength.",
    windowTitle: "MIS v1.0 — Workstation // Macro Regime & Sector Momentum",
    activeTab: "01 Macro Regime · 02 Sector Momentum",
    languages: ["EN", "中文", "BM", "日本語", "한국어"],
    panels: [
      {
        heading: "LAYER 01 · GLOBAL LIQUIDITY & COST OF CAPITAL",
        rows: [
          ["US 10Y Treasury Threshold", " monitored vs. 4.50% tight-liquidity boundary"],
          ["2Y Front-Rate Proxy & DXY", "3M directional trend & rate-cut expectation channel"],
          ["Volatility & Carry Regime", "VIX risk perception + JPY carry sensitivity check"],
          ["Macro Regime Classification", "Selective Quality / Neutral-to-Constructive Risk Appetite"]
        ]
      },
      {
        heading: "LAYER 02 · SECTOR MOMENTUM & ROTATION LEADERBOARD",
        rows: [
          ["SMH · Semiconductors", "1M / 3M / 6M RS vs SPY · Institutional Quality Leader"],
          ["XLK · Technology", "1M / 3M / 6M RS vs SPY · Breadth & PE Expansion Read"],
          ["XLU · Utilities / Power", "1M / 3M / 6M RS vs SPY · Defensive & AI-Power Rotation"],
          ["XLE / XLF · Cyclicals", "1M / 3M / 6M RS vs SPY · Rate & Commodity Sensitivity"]
        ]
      }
    ]
  },
  {
    id: "frame-company-overheat",
    badge: "WORKSTATION SURFACE 02 // COMPANY RESEARCH & OVERHEAT MONITOR",
    title: "Sector Deep Dive, Company Research & Overheat Monitor",
    altDescription:
      "Preview of the Market Intelligence System company research and overheat monitor surface showing financial quality breakdown, valuation expansion, distance from 200MA, and chase-risk diagnostics.",
    windowTitle: "MIS v1.0 — Workstation // Company Research & Overheat Monitor",
    activeTab: "04 Company Research · 05 Overheat Monitor · 06 Risk & Rotation",
    languages: ["EN", "中文", "BM", "日本語", "한국어"],
    panels: [
      {
        heading: "LAYER 03 · COMPANY QUALITY & FUNDAMENTAL DURABILITY",
        rows: [
          ["Operating Trajectory", "Revenue acceleration · Margin expansion · FCF conversion"],
          ["Narrative vs. Fundamentals", "Separates earnings growth from forward PE multiple rerating"],
          ["Sector Deep Dive Context", "Compares company metrics against sector breadth & peers"],
          ["Quality Classification", "Institutional Quality Score & Fundamental Support Read"]
        ]
      },
      {
        heading: "LAYER 04 · OVERHEAT MONITOR & CHASE-RISK DIAGNOSTICS",
        rows: [
          ["Trend Extension Check", "6M momentum structure & distance from 200-day moving average"],
          ["Valuation Stretch", "Current Forward PE vs. historical baseline expansion"],
          ["Risk & Rotation Stage", "Narrative Repricing / Momentum Expansion / Crowding Alert"],
          ["Workstation Boundary", "Descriptive research diagnostic — never a buy/sell trigger"]
        ]
      }
    ]
  }
];

const ARCHITECTURE_LAYERS = [
  {
    step: "01",
    layer: "Discovery & Presentation Layer",
    domain: "alvin-lim.com / Chainstox Lab",
    description:
      "Provides the research context, methodological documentation, case studies, and system index. Intentionally decoupled from the live analytical runtime."
  },
  {
    step: "02",
    layer: "Standalone Application Interface",
    domain: "Standalone MIS web application",
    description:
      "Independently deployed five-language web workstation where users run Macro Regime scans, Sector Deep Dives, Company Research, Overheat checks, and Full Market Reports."
  },
  {
    step: "03",
    layer: "Analytical & Rule Engine",
    domain: "Independent MIS Backend",
    description:
      "Executes multi-horizon relative strength calculations, liquidity threshold rules, quality scoring, and overheat diagnostics without black-box trading signals."
  }
];

export function MisProductShowcase() {
  const adjacentProjects = projects
    .filter((item) => item.slug !== "market-intelligence-system" && item.category !== "Archive")
    .slice(0, 3);

  return (
    <main className="lab-shell lab-grid min-h-screen px-4 pb-24 pt-4 text-bone md:px-8">
      {/* Top Navigation */}
      <nav
        aria-label="Chainstox Lab Navigation"
        className="lab-topbar sticky top-4 z-20 mx-auto flex max-w-7xl items-center justify-between rounded-lg px-3 py-3 text-sm text-bone/62"
      >
        <Link
          className="lab-focus-ring lab-wordmark flex items-center gap-3 rounded-md px-2 py-1.5 font-semibold text-bone"
          href="/lab"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] font-mono text-xs text-bone">
            CL
          </span>
          <span className="hidden sm:inline">CHAINSTOX LAB</span>
        </Link>
        <div className="flex flex-wrap items-center gap-1">
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone"
            href="/"
          >
            Exhibition
          </Link>
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone"
            href="/research"
          >
            Research
          </Link>
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone"
            href="/archive"
          >
            Archive
          </Link>
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 transition hover:bg-white/[0.05] hover:text-bone"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="lab-button-secondary lab-focus-ring rounded-md px-3 py-2 text-bone transition hover:border-bone/30"
            href="/lab"
          >
            Lab Index
          </Link>
        </div>
      </nav>

      {/* =====================================================================
          1. PRODUCT HERO
      ===================================================================== */}
      <MotionSection className="mx-auto grid max-w-7xl gap-8 pb-14 pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="lab-eyebrow inline-flex items-center gap-2 rounded-md border border-moss/30 bg-moss/10 px-2.5 py-1 text-moss">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" />
              CHAINSTOX · OFFICIAL PRODUCT 01
            </span>
            <span className="lab-chip rounded-md px-2.5 py-1 font-mono text-bone/80">
              v1.0 Public Beta
            </span>
            <span className="lab-chip rounded-md px-2.5 py-1 font-mono text-bone/60">
              5-Language Workstation
            </span>
          </div>

          <h1 className="lab-hero-title mt-7 max-w-4xl text-[2.6rem] text-bone md:text-[4.5rem]">
            Market Intelligence System
          </h1>

          <p className="lab-copy mt-6 max-w-2xl text-lg text-bone/72 md:text-xl">
            A dedicated financial research and market intelligence workstation built to organize macro liquidity regimes, sector momentum, fundamental company quality, and positioning overheat into a disciplined analytical workflow.
          </p>

          <p className="lab-copy mt-4 max-w-2xl text-sm text-bone/52">
            Designed as an independent research workstation — separating signal observation, narrative context, and risk diagnostics rather than operating as an automated trading or guaranteed investment recommendation system.
          </p>

          {/* Primary Launch CTA & Secondary Navigation */}
          <div className="mt-9 flex flex-wrap items-start gap-4">
            <a
              href="#capabilities"
              className="lab-button-secondary lab-focus-ring rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:border-bone/30"
            >
              Explore Capabilities
            </a>
            <Link
              href="/research/market-valuation"
              className="lab-focus-ring rounded-md border border-white/10 px-4 py-3 text-sm font-medium text-bone/68 transition hover:border-bone/28 hover:text-bone"
            >
              Research Methodology →
            </Link>
          </div>
        </div>

        {/* Product Dossier & Specification Console */}
        <aside className="lab-console overflow-hidden rounded-lg">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="lab-eyebrow text-xs text-bone/40">chainstox://mis-v1.0</p>
              <p className="mt-1 text-sm text-bone/70">Product Specification & Boundary</p>
            </div>
            <span className="lab-eyebrow rounded-md border border-moss/30 bg-moss/10 px-2.5 py-1 text-[11px] text-moss">
              v1.0 Public Beta
            </span>
          </div>

          <div className="divide-y divide-white/8 px-5 py-2 text-sm">
            {[
              ["Brand", "CHAINSTOX"],
              ["Product", "Market Intelligence System (MIS)"],
              ["Release Stage", "v1.0 Public Beta"],
              ["Classification", "Financial Research & Market Intelligence Workstation"],
              ["Interface Languages", "5 Languages (Multilingual UI)"],
              ["Architecture", "Standalone Web Application (External Navigation)"]
            ].map(([label, value]) => (
              <div className="grid grid-cols-[0.42fr_0.58fr] gap-3 py-3" key={label}>
                <span className="text-bone/45">{label}</span>
                <span className="text-right font-mono text-xs text-bone/85">{value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 bg-black/30 px-5 py-4">
            <p className="lab-eyebrow text-[10px] text-bone/40">CORE WORKSTATION MODULES</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {[
                "Macro Regime Analysis",
                "Sector Momentum",
                "Sector Deep Dive",
                "Company Research",
                "Overheat Monitor",
                "Risk & Rotation",
                "Full Market Report",
                "Five-language interface"
              ].map((cap) => (
                <span
                  key={cap}
                  className="lab-kbd rounded-md px-2.5 py-1 font-mono text-[11px] text-bone/65"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </MotionSection>

      <div className="lab-hairline mx-auto h-px max-w-7xl" />

      {/* =====================================================================
          2. APPLICATION INTERFACE PREVIEW & VERIFIED WORKSTATION SURFACES
      ===================================================================== */}
      <MotionSection className="mx-auto max-w-7xl py-14" id="preview">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="lab-eyebrow text-xs text-moss">APPLICATION SURFACE PREVIEW</p>
            <h2 className="lab-section-title mt-3 text-3xl text-bone md:text-[2.5rem]">
              Structured multi-layer workstation views.
            </h2>
          </div>
          <p className="lab-copy max-w-md text-sm text-bone/52">
            Authentic diagnostic structures and report schemas from the Market Intelligence System—preserving real analytical fields without fabricated backtests or synthetic price charts.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {WORKSTATION_FRAMES.map((frame) => (
            <figure
              key={frame.id}
              aria-label={frame.altDescription}
              className="lab-console flex flex-col justify-between overflow-hidden rounded-lg border border-white/12"
            >
              {/* Browser / Workstation Window Chrome */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-black/45 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-moss/60" />
                    <span className="ml-2 font-mono text-[11px] text-bone/55">
                      {frame.windowTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {frame.languages.map((lang, idx) => (
                      <span
                        key={lang}
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                          idx === 0
                            ? "border border-moss/40 bg-moss/15 text-moss"
                            : "border border-white/10 text-bone/40"
                        }`}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Workstation Sub-Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 bg-white/[0.02] px-4 py-2 font-mono text-[11px]">
                  <span className="text-moss">{frame.badge}</span>
                  <span className="text-bone/45">{frame.activeTab}</span>
                </div>

                {/* Workstation Diagnostic Panels */}
                <div className="space-y-4 p-5">
                  {frame.panels.map((panel) => (
                    <div
                      key={panel.heading}
                      className="lab-terminal-lines rounded-md border border-white/10 bg-black/40 p-4 font-mono text-xs"
                    >
                      <p className="border-b border-white/10 pb-2 font-semibold text-bone/90">
                        {panel.heading}
                      </p>
                      <div className="mt-3 space-y-2">
                        {panel.rows.map(([k, v]) => (
                          <div
                            key={k}
                            className="grid gap-1 border-b border-white/[0.05] pb-2 last:border-b-0 last:pb-0 sm:grid-cols-[0.42fr_0.58fr]"
                          >
                            <span className="text-bone/48">{k}</span>
                            <span className="text-bone/82">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/30 px-5 py-3 text-xs text-bone/48">
                <span>{frame.title}</span>
                <span className="font-mono text-[11px] text-bone/60">
                  STANDALONE UI · NO IFRAME EMBED
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </MotionSection>

      <div className="lab-hairline mx-auto h-px max-w-7xl" />

      {/* =====================================================================
          3. RESEARCH CAPABILITIES (ALL 8 OFFICIAL FEATURES)
      ===================================================================== */}
      <MotionSection className="mx-auto max-w-7xl py-14" id="capabilities">
        <div className="mb-8 grid gap-5 md:grid-cols-[0.7fr_0.3fr] md:items-end">
          <div>
            <p className="lab-eyebrow text-xs text-bone/40">RESEARCH CAPABILITIES</p>
            <h2 className="lab-section-title mt-3 text-3xl text-bone md:text-[2.6rem]">
              Eight integrated modules for disciplined market inquiry.
            </h2>
          </div>
          <p className="lab-copy text-sm text-bone/50">
            Every module in MIS v1.0 Public Beta is designed to answer a specific structural question—from macro cost-of-capital down to individual stock positioning heat.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {MIS_FEATURES.map((feat) => (
            <article
              key={feat.title}
              className="lab-surface flex flex-col justify-between rounded-lg p-5 transition duration-300 hover:-translate-y-0.5 hover:border-bone/25"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="lab-eyebrow text-[10px] text-moss">{feat.code}</span>
                  <span className="font-mono text-[10px] text-bone/35">MIS v1.0</span>
                </div>
                <h3 className="lab-section-title mt-4 text-xl text-bone">{feat.title}</h3>
                <p className="mt-1 font-mono text-xs text-bone/52">{feat.subtitle}</p>
                <p className="lab-copy mt-3.5 text-sm text-bone/62">{feat.description}</p>
              </div>
              <div className="mt-5 border-t border-white/8 pt-3 font-mono text-[10px] text-bone/40">
                WORKSTATION MODULE · ACTIVE
              </div>
            </article>
          ))}
        </div>
      </MotionSection>

      <div className="lab-hairline mx-auto h-px max-w-7xl" />

      {/* =====================================================================
          4. SYSTEM ARCHITECTURE & APPLICATION BOUNDARY
      ===================================================================== */}
      <MotionSection className="mx-auto max-w-7xl py-14" id="architecture">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <div>
            <p className="lab-eyebrow text-xs text-bone/40">ARCHITECTURE OVERVIEW</p>
            <h2 className="lab-section-title mt-3 text-3xl text-bone md:text-[2.4rem]">
              Decoupled discovery and workstation execution.
            </h2>
            <p className="lab-copy mt-4 text-base text-bone/62">
              To keep both systems clean and maintainable, the personal archive (<span className="font-mono text-bone/85">alvin-lim.com</span>) serves strictly as the discovery and documentation layer, while the Market Intelligence System runs as its own standalone web application.
            </p>

            <div className="lab-surface mt-6 rounded-lg p-5">
              <p className="lab-eyebrow text-xs text-moss">POSITIONING & METHODOLOGY GUARDRAIL</p>
              <p className="lab-copy mt-3 text-sm text-bone/68">
                Market Intelligence System is a <strong>financial research and market intelligence workstation</strong>. It organizes public market series, fundamental ratios, and momentum structures so researchers can test hypotheses and inspect risk. It does not execute trades, generate automated buy/sell signals, or provide guaranteed investment recommendations.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {ARCHITECTURE_LAYERS.map((item) => (
              <div
                key={item.step}
                className="lab-console rounded-lg border border-white/12 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <span className="lab-eyebrow text-xs text-moss">
                    LAYER {item.step} · {item.layer}
                  </span>
                  <span className="rounded border border-white/12 bg-white/[0.03] px-2.5 py-0.5 font-mono text-xs text-bone/75">
                    {item.domain}
                  </span>
                </div>
                <p className="lab-copy mt-3.5 text-sm text-bone/65">{item.description}</p>
              </div>
            ))}

          </div>
        </div>
      </MotionSection>

      {/* =====================================================================
          5. ADJACENT LAB SYSTEMS
      ===================================================================== */}
      <MotionSection className="mx-auto max-w-7xl border-t border-white/10 pt-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="lab-eyebrow text-xs text-bone/38">CONTINUE IN CHAINSTOX LAB</p>
            <h2 className="lab-section-title mt-3 text-3xl text-bone">
              Adjacent research engines & models.
            </h2>
          </div>
          <Link
            className="lab-focus-ring rounded-md px-3 py-2 text-sm font-medium text-bone/60 transition hover:bg-white/[0.05] hover:text-bone"
            href="/lab"
          >
            ← Back to Chainstox Lab
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {adjacentProjects.map((item) => (
            <Link
              className="lab-surface rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-bone/22"
              href={`/lab/projects/${item.slug}`}
              key={item.slug}
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-bone/40">
                {item.status}
              </p>
              <h3 className="lab-section-title mt-3 text-lg text-bone">{item.name}</h3>
              <p className="lab-copy mt-2 text-sm text-bone/52">{item.type}</p>
            </Link>
          ))}
        </div>
      </MotionSection>
    </main>
  );
}
