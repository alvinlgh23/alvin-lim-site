"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { computeBand, loadExports, loadNeer, monthLabel, zoneText } from "@/lib/neer";
import { TiltCard } from "@/components/lab/TiltCard";

type Facts = {
  neerGap: number;
  neerZone: string;
  neerR2: number;
  neerDays: number;
  neerLast: string;
  chipMonth: string;
  chipUsd: number;
  chipYoy: number;
  chipShare: number;
};

/* Everything these cards say is computed from the real model output and export data. */
function useFacts() {
  const [facts, setFacts] = useState<Facts | null>(null);
  useEffect(() => {
    Promise.all([loadNeer(), loadExports()])
      .then(([n, e]) => {
        const b = computeBand(n, n.modes[n.meta.default_mode].index, n.meta.default_band_pct);
        const last = e.months.length - 1;
        const chip = e.items.find((it) => it.en === "Semiconductors")!.series[last];
        setFacts({
          neerGap: b.gap,
          neerZone: zoneText(b.gap, n.meta.default_band_pct),
          neerR2: n.fit.full_r2,
          neerDays: n.dates.length,
          neerLast: n.meta.last_date,
          chipMonth: monthLabel(e.months[last]),
          chipUsd: chip.v / 10,
          chipYoy: chip.yoy,
          chipShare: chip.v / e.total[last].v
        });
      })
      .catch(() => setFacts(null));
  }, []);
  return facts;
}

function ChatCard({ facts }: { facts: Facts | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const lines = facts
    ? [
        { me: true, text: "Where is the Singapore dollar in its policy band?" },
        {
          me: false,
          text: `It's ${facts.neerZone}: ${facts.neerGap > 0 ? "+" : ""}${facts.neerGap.toFixed(2)}% from the estimated centre of a ±2% band.`
        },
        { me: true, text: "And what's carrying Korea's exports?" },
        {
          me: false,
          text: `Chips. $${facts.chipUsd.toFixed(1)}B in ${facts.chipMonth}, ${facts.chipYoy > 0 ? "+" : ""}${facts.chipYoy.toFixed(0)}% y/y — ${Math.round(facts.chipShare * 100)}% of everything Korea shipped.`
        }
      ]
    : [];
  return (
    <div ref={ref} className="flex h-full flex-col justify-end gap-3 p-6">
      {lines.map((l, k) => (
        <motion.p
          key={k}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 + k * 0.9, duration: 0.5 }}
          className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-snug ${
            l.me ? "self-end bg-white text-black" : "self-start bg-white/[0.07] text-white/85"
          }`}
        >
          {l.text}
        </motion.p>
      ))}
    </div>
  );
}

function TerminalCard({ facts }: { facts: Facts | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 6), 1100);
    return () => clearInterval(id);
  }, [inView]);
  const tasks = [
    ["Pull FX history", "fetch"],
    ["Infer basket weights", "ols"],
    ["Rebuild policy band", "band"],
    ["Score position", "check"]
  ];
  const pct = Math.min(100, (step / 4) * 100);
  return (
    <div ref={ref} className="h-full p-6 font-mono text-[12.5px]">
      <div className="flex items-center gap-2 text-white/40">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3">sgd-neer</span>
        <span className="ml-auto h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full bg-white transition-[width] duration-700" style={{ width: `${pct}%` }} />
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {tasks.map(([label, tag], k) => {
          const state = step > k ? "done" : step === k ? "running" : "queued";
          return (
            <div key={label} className="flex items-baseline justify-between gap-3 border-l border-white/10 pl-3">
              <span className="text-white/80">{label}</span>
              <span className="text-white/35">
                {tag}
                <span className={state === "done" ? "text-[#7EE2A8]" : state === "running" ? "text-[#8AB4FF]" : "text-white/30"}>
                  [{state}]
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <p className={`mt-5 text-white/70 transition-opacity duration-500 ${step >= 4 && facts ? "opacity-100" : "opacity-0"}`}>
        <span className="text-[#8AB4FF]">◆</span> R² {facts?.neerR2.toFixed(2)} · {facts?.neerDays} trading days · gap{" "}
        {facts ? `${facts.neerGap > 0 ? "+" : ""}${facts.neerGap.toFixed(2)}%` : ""}
      </p>
    </div>
  );
}

function SparkCard() {
  // A live-looking trace of the real index, drawn once on view
  const [path, setPath] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  useEffect(() => {
    loadNeer()
      .then((n) => {
        const s = n.modes[n.meta.default_mode].index.filter((_, i) => i % 6 === 0);
        const lo = Math.min(...s);
        const hi = Math.max(...s);
        setPath(s.map((v, i) => `${i ? "L" : "M"}${((i / (s.length - 1)) * 300).toFixed(1)},${(110 - ((v - lo) / (hi - lo)) * 100).toFixed(1)}`).join(""));
      })
      .catch(() => setPath(""));
  }, []);
  return (
    <div ref={ref} className="flex h-full flex-col justify-between p-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Shadow S$NEER · 2022 → today</p>
        <p className="mt-2 text-lg text-white">Singapore&apos;s hidden policy basket, rebuilt from public FX.</p>
      </div>
      <svg viewBox="0 0 300 120" className="mt-4 w-full overflow-visible">
        <motion.path
          d={path}
          fill="none"
          stroke="white"
          strokeWidth={1.6}
          initial={{ pathLength: 0 }}
          animate={inView && path ? { pathLength: 1 } : {}}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export function DemoCards() {
  const facts = useFacts();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <TiltCard className="min-h-[300px]">
        <ChatCard facts={facts} />
      </TiltCard>
      <TiltCard className="min-h-[300px]">
        <TerminalCard facts={facts} />
      </TiltCard>
      <TiltCard className="min-h-[300px]">
        <SparkCard />
      </TiltCard>
    </div>
  );
}
