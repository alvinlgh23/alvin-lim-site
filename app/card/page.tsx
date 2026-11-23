import type { Metadata } from "next";
import Link from "next/link";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

/* The digital twin of the printed A5 placard: what someone sees after scanning its QR code.
   One phone screen, the same photo, facts and look as the card in their hand. */

export const metadata: Metadata = {
  title: "Alvin Lim — Card",
  description: "Economics at Universiti Malaya. I build my own tools for reading markets. CV, contact and LinkedIn.",
  robots: { index: false }
};

const FACTS: [string, string][] = [
  ["Study", "Economics, Universiti Malaya · 2028"],
  ["Build", "Market models in Python & SQL — FX, equities, on-chain"],
  ["Campus", "Student election candidate · UMFA investment competition"],
  ["Speak", "English, Malay, Chinese, basic Korean"]
];

export default function CardPage() {
  return (
    <div className="site relative min-h-[100svh] overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-160px] h-[460px] w-[760px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),transparent_65%)]"
      />
      <main className="relative mx-auto flex min-h-[100svh] max-w-[440px] flex-col px-5 pb-8 pt-6">
        <header className="rise-in flex items-center justify-between">
          <span className="flex items-center gap-2.5 text-[16px] font-semibold tracking-[-0.02em]">
            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
              <rect x="1" y="1" width="22" height="22" rx="6" fill="#F7F8F8" />
              <path d="M6 16 L10.5 11.5 L13.5 14 L18 8.5" fill="none" stroke="#08090A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Alvin Lim
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] text-white/60">
            Economics · UM
          </span>
        </header>

        <section className="rise-in mt-7 grid grid-cols-[42%_1fr] items-end gap-4" style={{ animationDelay: "0.08s" }}>
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            <img
              src="/photos/portrait/studio.webp"
              alt="Studio portrait of Alvin Lim"
              className="h-full w-full rounded-[12px] object-cover"
              style={{ objectPosition: "50% 16%" }}
            />
          </div>
          <div>
            <h1 className="text-[2.6rem] font-medium leading-[0.92] tracking-[-0.05em] text-[#F7F8F8]">
              Alvin
              <br />
              Lim
            </h1>
            <p className="mt-2.5 flex items-baseline gap-2.5">
              <span lang="zh-Hans" className="text-lg tracking-[0.06em] text-white/60">
                林宜弘
              </span>
              <span className="text-[11px] tracking-[0.16em] text-white/40">LIM GI HONG</span>
            </p>
          </div>
        </section>

        <p className="rise-in mt-6 text-[1.55rem] font-medium leading-[1.1] tracking-[-0.04em] text-[#F7F8F8]" style={{ animationDelay: "0.16s" }}>
          I build my own tools for reading markets.
        </p>

        <dl className="rise-in mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-1 text-[14px]" style={{ animationDelay: "0.24s" }}>
          {FACTS.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[4.2rem_1fr] gap-3 border-t border-white/10 py-2.5 first:border-t-0">
              <dt className="text-white/45">{k}</dt>
              <dd className="text-[#F7F8F8]">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="rise-in mt-6 grid gap-2.5" style={{ animationDelay: "0.32s" }}>
          <a
            href="/cv/Alvin-Lim-CV.pdf"
            download="Alvin-Lim-CV.pdf"
            className="flex items-center justify-center gap-2 rounded-full bg-[#F7F8F8] px-6 py-3.5 text-[16px] font-medium text-[#08090A] transition active:scale-[0.99]"
          >
            Download CV
          </a>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="/alvin-lim.vcf"
              download="Alvin-Lim.vcf"
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[15px] text-[#F7F8F8] transition active:scale-[0.99]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M12 4v10m0 0-4-4m4 4 4-4M5 19h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Save contact
            </a>
            <a
              href={VERIFIED_DESTINATIONS.linkedinProfile}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[15px] text-[#F7F8F8] transition active:scale-[0.99]"
            >
              LinkedIn ↗
            </a>
          </div>
          <a
            href={`mailto:${VERIFIED_DESTINATIONS.email}`}
            className="text-center text-[14px] text-white/55 underline-offset-4 transition hover:text-white hover:underline"
          >
            {VERIFIED_DESTINATIONS.email}
          </a>
        </div>

        <Link
          href="/"
          className="rise-in mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-[15px] text-white/75 transition hover:text-white"
          style={{ animationDelay: "0.4s" }}
        >
          <span>See the full site</span>
          <span aria-hidden="true" className="text-white/40">→</span>
        </Link>
      </main>
    </div>
  );
}
