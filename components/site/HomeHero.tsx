"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const ROUTES = [
  { label: "For recruiters", href: "#glance" },
  { label: "For research", href: "#work" },
  { label: "For everyone else", href: "#life" }
];


/* A black mark lit from behind — the site's own sign: a rising line inside a rounded square. */
function GlowMark() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rx = useTransform(sy, [-1, 1], [10, -10]);
  const ry = useTransform(sx, [-1, 1], [-14, 14]);

  return (
    <div
      className="relative flex h-[300px] w-[300px] items-center justify-center [perspective:900px] md:h-[420px] md:w-[420px]"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),rgba(255,255,255,0.12)_40%,transparent_70%)] blur-2xl"
        animate={{ opacity: [0.75, 1, 0.75], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        className="relative h-[46%] w-[46%] rounded-[22%] bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_40px_6px_rgba(255,255,255,0.35),0_0_120px_30px_rgba(255,255,255,0.18)]"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* Draws in once, then keeps ticking like a live feed: the last two points drift,
              and the end point pulses. Purely visual. */}
          <motion.path
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, d: "M22 68 L42 48 L56 60 L78 34" }}
            animate={{
              pathLength: 1,
              d: ["M22 68 L42 48 L56 60 L78 34", "M22 68 L42 48 L56 57 L78 30", "M22 68 L42 48 L56 62 L78 37", "M22 68 L42 48 L56 59 L78 32"]
            }}
            transition={{
              pathLength: { delay: 0.6, duration: 1.6, ease: "easeInOut" },
              d: { delay: 2.4, duration: 5, repeat: reduced ? 0 : Infinity, repeatType: "mirror", ease: "easeInOut" }
            }}
          />
          <motion.circle
            r="4.5"
            fill="white"
            cx="78"
            initial={{ scale: 0, cy: 34 }}
            animate={{ scale: 1, cy: [34, 30, 37, 32] }}
            transition={{ scale: { delay: 2.1 }, cy: { delay: 2.4, duration: 5, repeat: reduced ? 0 : Infinity, repeatType: "mirror", ease: "easeInOut" } }}
          />
          {reduced ? null : <motion.circle
            r="4.5"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            cx="78"
            initial={{ opacity: 0, cy: 34 }}
            animate={{ opacity: [0, 0.8, 0], r: [4.5, 4.5, 13], cy: [34, 30, 37, 32] }}
            transition={{
              opacity: { delay: 2.4, duration: 1.8, repeat: Infinity, ease: "easeOut" },
              r: { delay: 2.4, duration: 1.8, repeat: Infinity, ease: "easeOut" },
              cy: { delay: 2.4, duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            }}
          />}
        </svg>
      </motion.div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section data-shortcut="Top" className="relative mx-auto grid min-h-[calc(100svh-64px)] max-w-[1240px] items-center gap-10 px-5 pb-16 pt-10 md:px-8 lg:grid-cols-[1.15fr_1fr_0.7fr] lg:gap-6">
      <div className="order-2 lg:order-1">
        <p style={{ animationDelay: "0.1s" }} className="rise-in text-[15px] text-white/50">
          Alvin Lim · Economics, Universiti Malaya
        </p>
        <h1
          style={{ animationDelay: "0.2s" }}
          className="rise-in mt-5 text-[3rem] font-medium leading-[0.98] tracking-[-0.05em] text-[#F7F8F8] sm:text-6xl lg:text-[4.6rem]"
        >
          I build my own tools for reading markets.
        </h1>
        <div style={{ animationDelay: "0.35s" }} className="rise-in mt-9 flex flex-wrap gap-3">
          <a
            href="/cv/Alvin-Lim-CV.pdf"
            download="Alvin-Lim-CV.pdf"
            className="rounded-full bg-[#F7F8F8] px-6 py-3 text-[16px] font-medium text-[#08090A] transition hover:bg-white"
          >
            Download CV
          </a>
          <a
            href="#work"
            className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-[16px] text-[#F7F8F8] transition hover:border-white/30 hover:bg-white/[0.07]"
          >
            See my work
          </a>
        </div>
      </div>

      <div style={{ animationDelay: "0.15s" }} className="rise-in order-1 flex justify-center lg:order-2">
        <GlowMark />
      </div>

      <ul style={{ animationDelay: "0.45s" }} className="rise-in order-3 hidden space-y-4 lg:block">
        {ROUTES.map((r) => (
          <li key={r.href}>
            <a href={r.href} className="group inline-flex items-center gap-2 text-[17px] text-[#F7F8F8]/85 transition hover:text-white">
              {r.label}
              <span className="text-white/35 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
