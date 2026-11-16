export type ResearchCaseStudyRecord = {
  slug: string;
  route: string;
  labRoute: string;
  figureNumber: string;
  title: string;
  category: string;
  status: string;
  researchQuestion: string;
  shortDescription: string;
  context: string[];
  approach: string[];
  methodology: Array<{
    layer: string;
    focus: string;
    signals: string;
    interpretation: string;
  }>;
  system: {
    architectureSummary: string;
    stack: string[];
    inputs: string[];
    pipelineSteps: string[];
  };
  output: {
    format: string;
    sampleHeader: string;
    sampleLines: Array<[string, string]>;
    interpretationNote: string;
  };
  limitations: string[];
  githubUrl: string;
  relatedResearch: Array<{
    title: string;
    category: string;
    href: string;
  }>;
};

export type ArchiveCollectionEntry = {
  slug: string;
  route: string;
  catalogNumber: string;
  title: string;
  category: string;
  date: string;
  location: string;
  summary: string;
  editorialFormat: string;
  highlights: string[];
};

export const SITE_IDENTITY = {
  title: "ALVIN LIM",
  subtitle: "A Personal Archive",
  philosophy: "A curiosity about how things work — and how they could work better.",
  institution: "Universiti Malaya · Faculty of Business and Economics",
  location: "Kuala Lumpur / Selangor, Malaysia",
  pillars: [
    {
      name: "Research",
      tagline: "What I'm trying to understand.",
      href: "/research",
      indexCode: "PILLAR I"
    },
    {
      name: "Archive",
      tagline: "How I got here.",
      href: "/archive",
      indexCode: "PILLAR II"
    },
    {
      name: "Elsewhere",
      tagline: "The things in between.",
      href: "/archive/elsewhere",
      indexCode: "PILLAR III"
    }
  ]
};

export const VERIFIED_DESTINATIONS = {
  githubProfile: "https://github.com/alvinlgh23",
  email: "alvinlim976@gmail.com",
  linkedinProfile: "https://www.linkedin.com/in/lim-gi-hong-5917a6305",
  chainstoxLab: "/lab",
  marketValuationRepo: "https://github.com/alvinlgh23/Market-Valuation-Engine",
  onChainRepo: "https://github.com/alvinlgh23/Onchain-market-structure-engine",
  sgdNeerRepo: "https://github.com/alvinlgh23/SGD-NEER-shadow-model",
  kospiRepo: "https://github.com/alvinlgh23/KOSPI_Signal_Monitor",
  phoneCycleRepo: "https://github.com/alvinlgh23/Phone-cycle",
  cryptoTreasuryRepo: "https://github.com/alvinlgh23/Crypto_Treasury_Company_Valuation_Model",
  personalIntelligenceRepo: "https://github.com/alvinlgh23/hybird-personal-intelligence"
};

export const RESEARCH_CASE_STUDIES: Record<string, ResearchCaseStudyRecord> = {
  "market-valuation": {
    slug: "market-valuation",
    route: "/research/market-valuation",
    labRoute: "/lab/projects/market-valuation-engine",
    figureNumber: "ARTIFACT 01 / CASE STUDY",
    title: "Market Valuation Engine",
    category: "MARKETS / VALUATION",
    status: "Active Research System · Preview",
    researchQuestion:
      "How can macro liquidity conditions, sector leadership, valuation expansion, and positioning heat be organized into a disciplined market-structure read without mistaking momentum for fundamental durability?",
    shortDescription:
      "Exploring market conditions, valuation, and the signals that shape risk and expectations.",
    context: [
      "Market prices move at the intersection of liquidity conditions, narrative repricing, and underlying business performance. Looking at valuation multiples in isolation often misses why capital is concentrating in specific sectors or when a strong narrative is beginning to stretch positioning.",
      "The Market Valuation Engine was built to structure that reading process: starting from the macro liquidity environment, narrowing into sector relative strength and breadth participation, and finally inspecting individual company valuation stretch and chase risk."
    ],
    approach: [
      "Rather than generating automated buy or sell triggers, the framework separates signal observation, narrative context, and risk diagnostics.",
      "It evaluates whether leadership is supported by broad participation or concentrated in a narrow group of names, and compares current forward valuation expansion against historical trend baselines."
    ],
    methodology: [
      {
        layer: "Layer 01 · Global Liquidity & Cost of Capital",
        focus: "Rates, USD direction, volatility, and carry conditions",
        signals: "US 10Y Treasury yield thresholds, 2Y front-rate proxies, DXY 3M trend, VIX regime, JPY carry sensitivity",
        interpretation: "Establishes whether the broader environment favors selective quality, defensive positioning, or broad risk appetite."
      },
      {
        layer: "Layer 02 · Sector Positioning & Rotation",
        focus: "Relative strength and breadth across equity sectors",
        signals: "1M / 3M / 6M relative strength vs SPY, sector PE expansion proxies, breadth participation",
        interpretation: "Distinguishes durable institutional leadership from narrow, crowded narrative spikes."
      },
      {
        layer: "Layer 03 · Company Quality & Valuation Stretch",
        focus: "Fundamental momentum vs multiple expansion",
        signals: "Revenue acceleration, margin trajectory, free cash flow quality, forward PE expansion",
        interpretation: "Checks whether price appreciation is backed by operating improvements or purely multiple rerating."
      },
      {
        layer: "Layer 04 · Positioning & Overheat Diagnostics",
        focus: "Chase risk and extension from trend baselines",
        signals: "6M price momentum, distance from 200-day moving average, narrative heat stage",
        interpretation: "Flags when a strong thesis faces elevated near-term valuation and positioning vulnerability."
      }
    ],
    system: {
      architectureSummary:
        "A modular Python command-line and embedded console research system that pulls market and fundamental series via Yahoo Finance, applies transparent threshold rules across four analytical layers, and outputs structured diagnostic commentary.",
      stack: ["Python", "yfinance", "Pandas", "CLI", "Next.js Embedded Console"],
      inputs: [
        "Macro benchmark series (US10Y, DXY, VIX, SPY)",
        "Sector ETF proxies (SMH, XLK, XLU, XLE, XLF)",
        "Company-level price history, moving averages, and forward valuation multiples"
      ],
      pipelineSteps: [
        "Ingest macro and benchmark time series with timeout and fallback protection",
        "Compute multi-horizon relative strength (1M, 3M, 6M) and trend extension metrics",
        "Evaluate sector breadth and valuation expansion rules",
        "Generate layered console report separating regime read, sector leadership, and company overheat risk"
      ]
    },
    output: {
      format: "Structured Multi-Layer Diagnostic Report (CLI & Embedded Lab Console)",
      sampleHeader: "MARKET INTELLIGENCE SYSTEM // LAYERED DIAGNOSTIC READ",
      sampleLines: [
        ["Analysis Surface", "Macro Regime · Sector Leaderboard · Company Overheat Check"],
        ["Liquidity Layer", "Rates threshold check + DXY 3M direction + Risk perception"],
        ["Sector Layer", "Relative strength vs SPY + Breadth participation read"],
        ["Valuation Layer", "Forward PE expansion vs fundamental quality proxies"],
        ["Positioning Output", "Valuation Risk classification · Chase Risk assessment"],
        ["Operating Boundary", "Descriptive research commentary only; not trade instructions"]
      ],
      interpretationNote:
        "All diagnostic outputs are designed to clarify what has to go right to justify current prices, separating business quality from crowding risk."
    },
    limitations: [
      "Full macro liquidity depth (such as M2 money supply, reverse repo balances, and credit spreads) requires external data feeds beyond standard Yahoo Finance series.",
      "Forward valuation ratios and quality proxies rely on public market data feeds that can lag or contain reporting inconsistencies.",
      "Outputs are structured research commentary intended to frame further investigation, not calibrated return forecasts or investment advice."
    ],
    githubUrl: "https://github.com/alvinlgh23/Market-Valuation-Engine",
    relatedResearch: [
      {
        title: "Markets & Valuation",
        category: "RESEARCH AREA",
        href: "/research/markets"
      },
      {
        title: "On-Chain Market Intelligence",
        category: "CASE STUDY",
        href: "/research/onchain-intelligence"
      },
      {
        title: "Technology & Semiconductors",
        category: "RESEARCH AREA",
        href: "/research/semiconductors"
      }
    ]
  },
  "onchain-intelligence": {
    slug: "onchain-intelligence",
    route: "/research/onchain-intelligence",
    labRoute: "/lab/projects/on-chain-market-intelligence",
    figureNumber: "ARTIFACT 02 / CASE STUDY",
    title: "On-Chain Market Intelligence",
    category: "CRYPTO / MARKET STRUCTURE",
    status: "Active Research System · Preview",
    researchQuestion:
      "How can on-chain holder behavior, exchange capital flows, macro liquidity, and narrative rotation be synthesized into an explainable market-regime classification?",
    shortDescription:
      "Investigating liquidity, capital flows, and market structure through on-chain data.",
    context: [
      "Digital asset markets are notoriously reflexive, yet public blockchains expose granular structural data—such as realized profit and loss, cohort holding duration, and exchange net flows—that rarely exist in traditional asset classes.",
      "Taken individually, single on-chain indicators frequently fail when market structure shifts. This project explores how combining on-chain behavior with macro liquidity and capital flow layers can classify the prevailing market regime more transparently."
    ],
    approach: [
      "Instead of treating on-chain metrics as standalone price predictors, the pipeline organizes signals into four distinct layers: Macro Liquidity, Capital Flow, On-Chain Holder Behavior, and Narrative Strength.",
      "Each indicator casts an explicit, auditable directional vote. The system aggregates these votes into a seven-state regime ontology while reporting source coverage and confidence."
    ],
    methodology: [
      {
        layer: "Layer 01 · Macro Liquidity Context",
        focus: "External monetary and risk conditions affecting digital assets",
        signals: "Rates trajectory, dollar liquidity proxies, cross-asset risk appetite",
        interpretation: "Contextualizes whether crypto market activity is supported by broader macro tailwinds or fighting liquidity headwinds."
      },
      {
        layer: "Layer 02 · Capital Flow & Exchange Pressure",
        focus: "Net capital entering or exiting trading venues",
        signals: "Exchange net flows, liquidity concentration, stablecoin and wrapper flow proxies",
        interpretation: "Tracks immediate supply-demand imbalances on spot and derivative venues."
      },
      {
        layer: "Layer 03 · On-Chain Cohort Behavior",
        focus: "Realized profit/loss and holder rotation",
        signals: "SOPR (7D MA), RHODL Ratio, Long-Term vs Short-Term Holder (LTH/STH) balance, Puell Multiple",
        interpretation: "Identifies whether long-term holders are accumulating, distributing into strength, or realizing losses."
      },
      {
        layer: "Layer 04 · Narrative & Network Activity",
        focus: "Internal rotation and network fee pressure",
        signals: "ETH gas regime, relative asset rotation, narrative dispersion",
        interpretation: "Measures whether risk appetite is broadening across the ecosystem or compressing into Bitcoin."
      }
    ],
    system: {
      architectureSummary:
        "A Python and Dune SQL analytical pipeline that queries blockchain and market series, evaluates transparent rule logic across four composite layers, and renders an HTML regime report with probability distributions.",
      stack: ["Python", "Pandas", "NumPy", "Dune SQL", "yfinance", "Static HTML"],
      inputs: [
        "Dune SQL query executions for on-chain cohort and flow metrics",
        "Cross-asset market series via yfinance",
        "Rule-weight configuration and regime ontology definitions"
      ],
      pipelineSteps: [
        "Fetch on-chain indicator series and verify data freshness / source coverage",
        "Score individual indicators (SOPR, RHODL, Exchange Net Flow, LTH/STH, Puell, ETH Gas)",
        "Compute composite layer scores and map to a 7-state regime probability distribution",
        "Export explainable HTML regime report detailing every vote and underlying value"
      ]
    },
    output: {
      format: "Explainable Regime Classification Report & 7-State Ontology Matrix",
      sampleHeader: "ON-CHAIN MARKET STRUCTURE ENGINE // REGIME ONTOLOGY",
      sampleLines: [
        ["Regime States", "Transition · Compression · BTC-Led Risk-On · Early Rotation · Liquidity Expansion · Narrative Expansion"],
        ["Composite Layers", "Macro Liquidity · Capital Flow · On-Chain Behavior · Narrative Strength"],
        ["Tracked Indicators", "SOPR (7D MA) · RHODL Ratio · Exchange Net Flow · LTH/STH · Puell Multiple · ETH Gas"],
        ["Transparency Rule", "Every composite score exposes its individual indicator votes and data source state"],
        ["Uncertainty Handling", "Heuristic probability distribution across candidate regimes rather than a single deterministic label"]
      ],
      interpretationNote:
        "Explainability is treated as a core design requirement: weak or missing data feeds are surfaced directly in the report rather than hidden behind a black-box score."
    },
    limitations: [
      "Live execution of full on-chain layers depends on active Dune API credentials and query execution quotas; some inputs fall back to proxy series when offline.",
      "Regime probability distributions are heuristic rule mappings designed for structural clarity, not statistically calibrated probability forecasts.",
      "Rapid off-chain leverage flushes in perpetual futures markets can move prices faster than daily on-chain settlement data reflects."
    ],
    githubUrl: "https://github.com/alvinlgh23/Onchain-market-structure-engine",
    relatedResearch: [
      {
        title: "Markets & Valuation",
        category: "RESEARCH AREA",
        href: "/research/markets"
      },
      {
        title: "Market Valuation Engine",
        category: "CASE STUDY",
        href: "/research/market-valuation"
      },
      {
        title: "SGD-NEER Shadow Model",
        category: "CASE STUDY",
        href: "/research/sgd-neer"
      }
    ]
  },
  "sgd-neer": {
    slug: "sgd-neer",
    route: "/research/sgd-neer",
    labRoute: "/lab/projects/sgd-neer-shadow-model",
    figureNumber: "ARTIFACT 03 / CASE STUDY",
    title: "SGD-NEER Shadow Model",
    category: "MACRO / MONETARY SYSTEMS",
    status: "Independent Proxy Model · Preview",
    researchQuestion:
      "How can an independent researcher construct a transparent trade-weighted proxy to study Singapore's exchange-rate-centered monetary framework when official basket weights and policy band parameters are undisclosed?",
    shortDescription:
      "An independent attempt to understand Singapore's exchange-rate-based monetary framework.",
    context: [
      "Unlike central banks that conduct monetary policy primarily by setting a domestic short-term interest rate, the Monetary Authority of Singapore (MAS) manages the Singapore dollar against an undisclosed trade-weighted basket of currencies—the Singapore Dollar Nominal Effective Exchange Rate (S$NEER)—within a policy band whose exact slope, center, and width are not publicly disclosed.",
      "Because Singapore is a small, open economy where import prices heavily influence domestic inflation, the exchange rate serves as the primary intermediate target of monetary policy. Studying this framework in practice requires building an observable shadow proxy while remaining rigorous about what is estimated versus what is official."
    ],
    approach: [
      "The SGD-NEER Shadow Model constructs a transparent, trade-weighted geometric index of observable SGD bilateral exchange rates across Singapore's major trading partners.",
      "Using historical overlap windows, the script estimates a baseline policy center and plots both a fixed reference band and a volatility-adjusted stress band to observe where the proxy sits relative to its recent trajectory."
    ],
    methodology: [
      {
        layer: "Step 01 · Observable Bilateral FX Basket",
        focus: "Major trading-partner currency crosses against SGD",
        signals: "Observable FX pairs including USD, CNY, MYR, EUR, JPY, TWD, IDR, and regional peers via public market feeds",
        interpretation: "Forms the raw bilateral exchange-rate inputs across Singapore's primary trade relationships."
      },
      {
        layer: "Step 02 · Trade-Weighted Geometric Index",
        focus: "Proxy basket weighting and log-return aggregation",
        signals: "Normalized proxy trade weights applied to bilateral log returns",
        interpretation: "Produces a continuous Shadow S$NEER index where a higher level indicates broad Singapore dollar appreciation."
      },
      {
        layer: "Step 03 · Policy Center & Band Estimation",
        focus: "Approximating the moving policy corridor",
        signals: "Rolling trend estimation for the proxy center, +/-2% fixed reference band, and 21-day annualized volatility stress band",
        interpretation: "Visualizes whether the SGD proxy is trading near the upper bound, center, or lower bound of its estimated corridor."
      }
    ],
    system: {
      architectureSummary:
        "A self-contained Python analytical model using yfinance and Matplotlib that constructs a geometric trade-weighted SGD index, computes rolling volatility and band distance metrics, and generates visual policy-band diagnostic charts.",
      stack: ["Python", "yfinance", "Matplotlib", "FX Data Series"],
      inputs: [
        "Observable bilateral FX exchange rate series (USD/SGD and cross rates)",
        "Transparent proxy trade-weight configuration",
        "Rolling window parameters for center estimation and 21-day realized volatility"
      ],
      pipelineSteps: [
        "Download and align overlapping daily FX close series across basket currencies",
        "Compute weighted geometric index and daily log returns",
        "Estimate rolling policy center, fixed reference band, and volatility-adjusted band",
        "Output snapshot table of proxy basket contributions and multi-panel policy band chart"
      ]
    },
    output: {
      format: "Shadow S$NEER Snapshot Console & Multi-Panel Policy Band Chart",
      sampleHeader: "SHADOW S$NEER PROXY // INDEPENDENT MONETARY FRAMEWORK STUDY",
      sampleLines: [
        ["Index Formulation", "Trade-weighted geometric SGD index across observable partner currencies"],
        ["Basket Components", "USD · CNY · MYR · EUR · JPY · TWD · IDR proxy weights"],
        ["Band Diagnostics", "Estimated policy center + Fixed (+/-2%) reference band + Vol-adjusted stress band"],
        ["Volatility Metric", "21-day annualized volatility computed from Shadow_NEER_Log_Return"],
        ["Official Distinction", "Independent educational proxy — strictly distinct from official MAS S$NEER series"]
      ],
      interpretationNote:
        "This model is an independent educational and analytical proxy. It does not replicate or claim knowledge of undisclosed Monetary Authority of Singapore (MAS) parameters."
    },
    limitations: [
      "The Monetary Authority of Singapore (MAS) does not publicly disclose the official currency basket composition, exact bilateral trade weights, policy band center, slope, or band width.",
      "Proxy weights in this model are independent approximations for educational and analytical exploration; they are not official MAS weights.",
      "Daily Yahoo Finance FX closing series can exhibit timestamp misalignment across Asian, European, and North American trading sessions."
    ],
    githubUrl: "https://github.com/alvinlgh23/SGD-NEER-shadow-model",
    relatedResearch: [
      {
        title: "Macroeconomics & Monetary Systems",
        category: "RESEARCH AREA",
        href: "/research/macro"
      },
      {
        title: "Market Valuation Engine",
        category: "CASE STUDY",
        href: "/research/market-valuation"
      },
      {
        title: "On-Chain Market Intelligence",
        category: "CASE STUDY",
        href: "/research/onchain-intelligence"
      }
    ]
  }
};

export const ARCHIVE_COLLECTION_ENTRIES: ArchiveCollectionEntry[] = [
  {
    slug: "education",
    route: "/archive/education",
    catalogNumber: "ARCHIVE 01 / AUTOBIOGRAPHICAL ESSAY",
    title: "Education & Direction",
    category: "ACADEMIC TRANSITION",
    date: "UKM → Universiti Malaya",
    location: "Malaysia",
    summary: "From studying law to economics, and the decisions that changed my direction.",
    editorialFormat: "Five-Part Autobiographical Essay",
    highlights: [
      "01 — An Early Ambition: Economic policy, resource allocation, and city planning",
      "02 — Choosing Law: Universiti Kebangsaan Malaysia and reassessing the path",
      "03 — Entering Economics: Transferring to Universiti Malaya",
      "04 — The Campus Election: 2024 candidacy with NewGen at FBE",
      "05 — Choosing Another Direction: Stepping away from politics toward research"
    ]
  },
  {
    slug: "campus-election",
    route: "/archive/campus-election",
    catalogNumber: "ARCHIVE 02 / HISTORICAL RECORD",
    title: "Campus Election",
    category: "CAMPUS LIFE",
    date: "November 2024",
    location: "Universiti Malaya · Faculty of Business and Economics",
    summary: "A student representative candidacy in 2024, and a closer look at political participation.",
    editorialFormat: "Documentary Historical Record",
    highlights: [
      "Selected to stand as a Faculty of Business and Economics candidate with NewGen",
      "Engaged across student groups including UMANY and Demokrat",
      "Recorded candidly: not elected, and how the experience reshaped personal direction"
    ]
  },
  {
    slug: "behind-the-scenes",
    route: "/archive/behind-the-scenes",
    catalogNumber: "ARCHIVE 03 / DOCUMENTARY SEQUENCE",
    title: "Behind the Scenes",
    category: "EXPERIENCES & PRODUCTION",
    date: "Selected Production & Event Records",
    location: "Venues, Backstage & Set Environments",
    summary: "Events, production environments, and the work that happens before an audience arrives.",
    editorialFormat: "Documentary Contact Sheet & Production Notes",
    highlights: [
      "Event setup, cue coordination, and backstage logistics before doors open",
      "Live venue transitions and production floor environments",
      "Music-video and set production support away from the spotlight"
    ]
  },
  {
    slug: "elsewhere",
    route: "/archive/elsewhere",
    catalogNumber: "ARCHIVE 04 / PERSONAL FIELD JOURNAL",
    title: "Elsewhere",
    category: "FIELD NOTES & INTERESTS",
    date: "Ongoing Field Notes",
    location: "Atlantic City · New York · Kuala Lumpur · Seoul",
    summary: "Work, travel, music, and observations collected along the way.",
    editorialFormat: "Three-Part Field Journal",
    highlights: [
      "01 — Work & Travel: Summer work and daily life in Atlantic City, United States",
      "02 — Places & Field Notes: Cities, streets, urban architecture, and transit notes",
      "03 — Personal Interests: Classical guitar practice, music, and secondary-school phone repairs"
    ]
  }
];
