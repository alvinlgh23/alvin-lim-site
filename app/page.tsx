import Link from "next/link";
import { Reveal } from "@/components/lab/Reveal";
import { AppWindow } from "@/components/site/AppWindow";
import { HomeHero } from "@/components/site/HomeHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

const FACTS: [string, string][] = [
  ["Study", "Bachelor of Economics (Applied Economics), Universiti Malaya · expected 2028"],
  ["Build", "Market models in Python & SQL — FX, equities, on-chain"],
  ["Campus", "Faculty student election candidate · UMFA investment competition"],
  ["Speak", "English, Malay, Chinese, basic Korean"]
];

const WORK = [
  {
    kicker: "Research · FX",
    title: "SGD-NEER Shadow Model",
    note: "Infers MAS's undisclosed basket from 12 currencies and rebuilds the policy band from every statement.",
    href: "/research/sgd-neer",
    image: "/photos/research/neer-dashboard.webp",
    wide: true
  },
  {
    kicker: "Research · Korea",
    title: "KOSPI Signal Monitor",
    note: "Korea equities through semiconductors, FX, exports and volatility.",
    href: "/lab/projects/kospi-signal-monitor",
    stat: ["49%", "of Korea's exports in Oct 2026 were chips"]
  },
  {
    kicker: "Systems",
    title: "Chainstox Lab",
    note: "Every model, running on real data — and the Market Intelligence System v1.0.",
    href: "/lab",
    stat: ["v1.0", "Market Intelligence System, public beta"]
  },
  {
    kicker: "Research",
    title: "All research",
    note: "Markets & valuation, semiconductors, macro and monetary systems, on-chain intelligence.",
    href: "/research",
    stat: ["06", "case studies and collections"]
  }
];

const LIFE = [
  { title: "Campus Election", note: "Ran for the faculty student council, Universiti Malaya, 2024", href: "/archive/campus-election", image: "/photos/campus-election/lecture-visit.webp" },
  { title: "Behind the Scenes", note: "Crew on the Eras Tour, Coldplay and Jay Chou", href: "/archive/behind-the-scenes", image: "/photos/behind-the-scenes/pre-show-stage.webp" },
  { title: "Atlantic City", note: "Work & Travel, summer 2026", href: "/archive/elsewhere", image: "/photos/atlantic-city/board-wok.webp", pos: "50% 30%" },
  { title: "Classical Guitar", note: "Trinity Grade 5, Distinction", href: "/archive/elsewhere", image: "/photos/elsewhere/guitar-performance.webp" },
  { title: "On camera", note: "A small role in a music video", href: "/archive/behind-the-scenes", image: "/photos/behind-the-scenes/music-video.webp" },
  { title: "Law → Economics", note: "UKM law, then economics at UM", href: "/archive/education", image: "/photos/education/um-2023.webp", pos: "50% 30%" }
];

function SectionHead({ kicker, title, href, cta }: { kicker: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="text-[15px] text-white/45">{kicker}</p>
        <h2 className="mt-3 max-w-[20ch] text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-[#F7F8F8] md:text-[3.4rem]">{title}</h2>
      </div>
      {href ? (
        <Link href={href} className="rounded-full border border-white/15 px-5 py-2.5 text-[15px] text-white/80 transition hover:border-white/30 hover:text-white">
          {cta} →
        </Link>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="site min-h-screen">
      <SiteNav />
      <HomeHero />

      {/* The product shot */}
      <section className="mx-auto max-w-[1240px] px-5 md:px-8">
        <AppWindow />
      </section>

      {/* At a glance */}
      <Reveal id="glance" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 pt-32 md:px-8 md:pt-44">
        <SectionHead kicker="At a glance" title="Thirty seconds on who I am." />
        <div className="mt-12 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 md:p-10">
            <div>
              <p className="text-3xl font-medium tracking-[-0.04em] text-[#F7F8F8] md:text-4xl">
                Alvin Lim{" "}
                <span lang="zh-Hans" className="ml-2 text-xl tracking-[0.04em] text-white/50 md:text-2xl">
                  林宜弘
                </span>
              </p>
              <dl className="mt-8">
                {FACTS.map(([k, v]) => (
                  <div key={k} className="grid gap-1 border-t border-white/[0.08] py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="text-[14px] text-white/45">{k}</dt>
                    <dd className="text-[17px] text-[#F7F8F8]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href="/cv/Alvin-Lim-CV.pdf" download="Alvin-Lim-CV.pdf" className="rounded-full bg-[#F7F8F8] px-6 py-3 text-[15px] font-medium text-[#08090A] transition hover:bg-white">
                Download CV
              </a>
              <a href={VERIFIED_DESTINATIONS.linkedinProfile} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 text-[15px] text-[#F7F8F8] transition hover:border-white/30">
                LinkedIn ↗
              </a>
              <a href={`mailto:${VERIFIED_DESTINATIONS.email}`} className="rounded-full border border-white/15 px-6 py-3 text-[15px] text-[#F7F8F8] transition hover:border-white/30">
                Email
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1.5">
            <img
              src="/photos/portrait/studio.webp"
              alt="Studio portrait of Alvin Lim in a white shirt, seated, chin resting on one hand"
              className="h-full max-h-[560px] min-h-[380px] w-full rounded-[12px] object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
          </div>
        </div>
      </Reveal>

      {/* Work */}
      <Reveal id="work" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 pt-32 md:px-8 md:pt-44">
        <SectionHead kicker="Selected work" title="Research that runs on real data." href="/research" cta="All research" />
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {WORK.map((w) => (
            <Link
              key={w.title}
              href={w.href}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition duration-300 hover:border-white/20 hover:bg-white/[0.05] ${
                w.wide ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {w.image ? (
                <div className="relative m-1.5 flex-1 overflow-hidden rounded-[12px]">
                  <img
                    src={w.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full min-h-[240px] w-full object-cover object-[50%_10%] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="px-7 pt-7">
                  <p className="text-[3.6rem] font-medium leading-none tracking-[-0.05em] text-[#F7F8F8]">{w.stat?.[0]}</p>
                  <p className="mt-2 max-w-[24ch] text-sm text-white/45">{w.stat?.[1]}</p>
                </div>
              )}
              <div className="p-7">
                <p className="text-[13px] text-white/45">{w.kicker}</p>
                <p className="mt-2 text-xl font-medium tracking-[-0.03em] text-[#F7F8F8] md:text-2xl">
                  {w.title} <span className="inline-block text-white/40 transition group-hover:translate-x-1 group-hover:text-white">→</span>
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/55">{w.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      {/* Life */}
      <Reveal id="life" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 pb-32 pt-32 md:px-8 md:pt-44">
        <SectionHead kicker="Beyond the desk" title="The rest of the story." href="/archive" cta="Archive" />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LIFE.map((l) => (
            <Link key={l.title} href={l.href} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1.5 transition hover:border-white/20">
              <div className="overflow-hidden rounded-[12px]">
                <img
                  src={l.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                  style={{ objectPosition: l.pos ?? "50% 50%" }}
                />
              </div>
              <div className="px-4 pb-4 pt-4">
                <p className="text-lg font-medium tracking-[-0.02em] text-[#F7F8F8]">
                  {l.title} <span className="text-white/40 transition group-hover:text-white">→</span>
                </p>
                <p className="mt-1 text-sm text-white/50">{l.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <SiteFooter />
    </div>
  );
}
