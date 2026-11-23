"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NeerBandChart } from "@/components/lab/NeerBandChart";

/* The product shot: a working model in an app window that tilts back and lays flat as it scrolls in. */
export function AppWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

  return (
    <div ref={ref} className="relative [perspective:1600px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[360px] w-[80%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_70%)]"
      />
      <motion.div
        style={{ rotateX, scale, opacity, transformOrigin: "50% 0%" }}
        className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0E0F10] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="ml-3 text-[13px] text-white/55">sgd-neer · shadow policy band</span>
          <span className="ml-auto rounded-full border border-white/10 px-2.5 py-0.5 text-[12px] text-white/50">live</span>
        </div>
        <div className="grid md:grid-cols-[220px_1fr]">
          <aside className="hidden border-r border-white/[0.07] p-4 text-[14px] md:block">
            {[
              ["Band position", true],
              ["Basket weights", false],
              ["Policy calendar", false],
              ["Korea exports", false]
            ].map(([label, on]) => (
              <p
                key={label as string}
                className={`rounded-lg px-3 py-2 ${on ? "bg-white/[0.06] text-white" : "text-white/45"}`}
              >
                {label}
              </p>
            ))}
            <p className="mt-6 px-3 text-[12px] leading-relaxed text-white/35">
              Recomputed in your browser from the model&apos;s own data.
            </p>
          </aside>
          <div className="p-5 md:p-8">
            <NeerBandChart />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
