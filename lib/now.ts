/*
  The Now board. Edit this file to update the page — change `updated` whenever you do.
  Live numbers (the S$NEER reading, the latest Korea export month) are filled in
  automatically from /public/data; everything written here is shown as-is.
*/

export type NowItem = {
  title: string;
  note: string;
  href?: string;
  /** "live" pulses; "beta" and "in progress" are quiet labels. */
  status?: "live" | "beta" | "in progress" | "scheduled";
  /** Attach a live reading from the data files. */
  metric?: "neer" | "exports";
};

export const NOW = {
  updated: "2026-11-23",

  running: [
    {
      title: "SGD-NEER Shadow Model",
      status: "live",
      metric: "neer",
      note: "Rebuilds Singapore's undisclosed policy band from public FX. The model refreshes every weekday at 07:00 SGT.",
      href: "/research/sgd-neer"
    },
    {
      title: "Korea export tracker",
      status: "live",
      metric: "exports",
      note: "MOTIR's monthly releases across 20 product groups — the export side of the KOSPI Signal Monitor.",
      href: "/lab/projects/kospi-signal-monitor"
    },
    {
      title: "Market Intelligence System",
      status: "beta",
      note: "v1.0 public beta: macro regime, sector momentum, overheat and rotation in one workstation.",
      href: "/lab/market-intelligence-system"
    }
  ] satisfies NowItem[],

  reading: [
    {
      title: "Semiconductor industry & architecture",
      status: "in progress",
      note: "Organising notes on mobile SoC evolution, chip architecture trade-offs, and the economics of leading-edge manufacturing.",
      href: "/research/semiconductors"
    }
  ] satisfies NowItem[],

  next: [
    {
      title: "Semiconductor research, written up",
      note: "Turning the notes above into a published case study.",
      href: "/research/semiconductors"
    },
    {
      title: "Sharper Lab engines",
      note: "Refining the Market Valuation Engine and the on-chain pipeline to test market expectations and liquidity conditions.",
      href: "/lab"
    }
  ] satisfies NowItem[],

  also: [
    { title: "Study", note: "Economics at Universiti Malaya — expected to graduate in 2028.", href: "/archive/education" },
    { title: "Guitar", note: "Regular classical guitar practice, after Trinity Grade 5 with Distinction.", href: "/archive/elsewhere" }
  ] satisfies NowItem[]
};
