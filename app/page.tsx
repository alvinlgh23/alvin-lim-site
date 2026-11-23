import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { HomeHero } from "@/components/site/HomeHero";
import { TopicExplorer, type Topic } from "@/components/site/TopicExplorer";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

const TOPICS: Topic[] = [
  {
    tab: "SGD-NEER",
    kicker: "Research · FX",
    title: "Rebuilding Singapore's hidden policy band",
    href: "/research/sgd-neer",
    image: "/photos/research/neer-dashboard.webp",
    pos: "50% 20%"
  },
  {
    tab: "Chainstox Lab",
    kicker: "Systems",
    title: "Market models, running live",
    href: "/lab",
    image: "/photos/research/neer-band.webp",
    fit: "contain"
  },
  {
    tab: "Campus Election",
    kicker: "Universiti Malaya · 2024",
    title: "Running for the faculty student council",
    href: "/archive/campus-election",
    image: "/photos/campus-election/speech.webp",
    pos: "50% 35%"
  },
  {
    tab: "Behind the Scenes",
    kicker: "Concert crew",
    title: "Before the lights come on",
    href: "/archive/behind-the-scenes",
    image: "/photos/behind-the-scenes/pre-show-stage.webp"
  },
  {
    tab: "Atlantic City",
    kicker: "Work & Travel · 2026",
    title: "A summer behind a food counter",
    href: "/archive/elsewhere",
    image: "/photos/atlantic-city/showboat-crew.webp",
    pos: "50% 30%"
  },
  {
    tab: "Classical Guitar",
    kicker: "Trinity Grade 5 · Distinction",
    title: "On stage, without a spreadsheet",
    href: "/archive/elsewhere",
    image: "/photos/elsewhere/guitar-performance.webp"
  },
  {
    tab: "Law → Economics",
    kicker: "Education",
    title: "From UKM law to UM economics",
    href: "/archive/education",
    image: "/photos/education/um-2023.webp",
    pos: "50% 30%"
  }
];

const FACTS: [string, string][] = [
  ["Study", "Bachelor of Economics (Applied Economics), Universiti Malaya — expected 2028"],
  ["Build", "Market models in Python & SQL — FX, equities, on-chain"],
  ["Campus", "Faculty student election candidate · UMFA investment competition"],
  ["Speak", "English, Malay, Chinese, basic Korean"]
];

const WORK = [
  {
    kicker: "Research · FX",
    title: "SGD-NEER Shadow Model",
    note: "Infers MAS's undisclosed basket from 12 currencies and rebuilds the policy band.",
    href: "/research/sgd-neer",
    image: "/photos/research/neer-dashboard.webp",
    contain: false
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
    note: "Every model, running on real data — with the Market Intelligence System v1.0.",
    href: "/lab",
    stat: ["v1.0", "Market Intelligence System, public beta"]
  }
];

const LIFE = [
  { title: "Campus Election", note: "Universiti Malaya, 2024", href: "/archive/campus-election", image: "/photos/campus-election/lecture-visit.webp" },
  { title: "Behind the Scenes", note: "Eras Tour, Coldplay, Jay Chou crew", href: "/archive/behind-the-scenes", image: "/photos/behind-the-scenes/backstage-lift.webp" },
  { title: "Atlantic City", note: "Work & Travel, summer 2026", href: "/archive/elsewhere", image: "/photos/atlantic-city/board-wok.webp" },
  { title: "On camera", note: "A small role in a music video", href: "/archive/behind-the-scenes", image: "/photos/behind-the-scenes/music-video.webp" }
];

export default function HomePage() {
  return (
    <div className="site min-h-screen">
      <SiteNav />
      <HomeHero />

      {/* Topics */}
      <section id="explore" className="mx-auto max-w-[1600px] scroll-mt-24 px-5 pt-24 md:px-10 md:pt-36">
        <TopicExplorer topics={TOPICS} />
      </section>

      {/* At a glance — the thirty-second read */}
      <section className="mx-auto max-w-[1600px] px-5 pt-24 md:px-10 md:pt-36">
        <div className="grid gap-2 lg:grid-cols-12">
          <div className="flex flex-col justify-between bg-white p-7 md:p-12 lg:col-span-7">
            <div>
              <p className="text-sm uppercase tracking-[0.08em] text-[#666]">At a glance</p>
              <h2 className="mt-5 text-[2.6rem] leading-[0.98] tracking-[-0.04em] md:text-7xl">
                Alvin Lim
                <span className="ml-4 align-middle text-2xl tracking-[0.04em] text-[#666] md:text-3xl" lang="zh-Hans">
                  林宜弘
                </span>
              </h2>
              <dl className="mt-10 border-t border-black/15">
                {FACTS.map(([k, v]) => (
                  <div key={k} className="grid gap-1 border-b border-black/10 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="text-sm uppercase tracking-[0.08em] text-[#666]">{k}</dt>
                    <dd className="text-lg text-[#111]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              <a
                href="/cv/Alvin-Lim-CV.pdf"
                download="Alvin-Lim-CV.pdf"
                className="bg-black px-8 py-4 text-[15px] text-white transition hover:bg-[#333]"
              >
                Download CV ↓
              </a>
              <a
                href={VERIFIED_DESTINATIONS.linkedinProfile}
                target="_blank"
                rel="noreferrer"
                className="border border-black px-8 py-4 text-[15px] transition hover:bg-black hover:text-white"
              >
                LinkedIn ↗
              </a>
              <a
                href={`mailto:${VERIFIED_DESTINATIONS.email}`}
                className="border border-black px-8 py-4 text-[15px] transition hover:bg-black hover:text-white"
              >
                Email
              </a>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden bg-[#1A1A1A] lg:col-span-5">
            <img
              src="/photos/portrait/alvin.webp"
              alt="Alvin Lim in a lecture hall, smiling and making peace signs"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "48% 30%" }}
            />
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-[1600px] px-5 pt-24 md:px-10 md:pt-36">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-black/15 pt-6">
          <h2 className="max-w-[18ch] text-4xl leading-[1.02] tracking-[-0.04em] md:text-6xl">Selected work</h2>
          <Link href="/research" className="border border-black px-6 py-3 text-sm uppercase tracking-[0.06em] transition hover:bg-black hover:text-white">
            See all
          </Link>
        </div>
        <div className="mt-10 grid gap-2 md:grid-cols-3">
          {WORK.map((w) => (
            <Link key={w.title} href={w.href} className="group flex flex-col bg-white transition-colors hover:bg-[#111] hover:text-white">
              <div className="relative aspect-[16/11] overflow-hidden bg-[#111] text-white">
                {w.image ? (
                  <img
                    src={w.image}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${w.contain ? "object-contain p-4" : "object-cover object-[50%_12%]"}`}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <p className="text-[4.5rem] leading-none tracking-[-0.05em] md:text-[5.5rem]">{w.stat?.[0]}</p>
                    <p className="mt-3 max-w-[22ch] text-white/60">{w.stat?.[1]}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs uppercase tracking-[0.08em] text-[#666] group-hover:text-white/55">{w.kicker}</p>
                <p className="mt-3 text-2xl tracking-[-0.03em] md:text-[1.9rem]">
                  {w.title} <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </p>
                <p className="mt-3 text-[#555] group-hover:text-white/65">{w.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Beyond the desk */}
      <section className="mx-auto max-w-[1600px] px-5 pb-28 pt-24 md:px-10 md:pt-36">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-black/15 pt-6">
          <h2 className="max-w-[18ch] text-4xl leading-[1.02] tracking-[-0.04em] md:text-6xl">Beyond the desk</h2>
          <Link href="/archive" className="border border-black px-6 py-3 text-sm uppercase tracking-[0.06em] transition hover:bg-black hover:text-white">
            Archive
          </Link>
        </div>
        <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {LIFE.map((l) => (
            <Link key={l.title} href={l.href} className="group relative block aspect-[3/4] overflow-hidden bg-[#1A1A1A] text-white">
              <img
                src={l.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-2xl tracking-[-0.03em]">
                  {l.title} <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </p>
                <p className="mt-1 text-sm text-white/70">{l.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
