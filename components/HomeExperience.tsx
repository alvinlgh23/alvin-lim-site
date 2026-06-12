"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

const softEase = [0.22, 1, 0.36, 1] as const;

function setGlowPosition(event: MouseEvent<HTMLDivElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
}

function LineReveal({ lines, className = "", delay = 0 }: { lines: string[]; className?: string; delay?: number }) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.85, delay: delay + index * 0.12, ease: softEase }}
          key={line}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

function SceneLabel({ children }: { children: React.ReactNode }) {
  return <p className="home-label text-sm font-medium tracking-[0.18em] text-current/55">{children}</p>;
}

function GlowArea({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`home-glow-area ${className}`} onMouseMove={setGlowPosition}>
      {children}
    </div>
  );
}

function HeroSequence() {
  const lines = [
    { text: "Hi.", className: "text-6xl md:text-8xl lg:text-9xl", delay: 0.1 },
    { text: "I'm Alvin.", className: "text-5xl md:text-7xl lg:text-8xl", delay: 0.78 },
    { text: "I study economics.", className: "mt-10 text-xl md:text-2xl", delay: 1.82 },
    { text: "I keep notes.", className: "text-xl md:text-2xl", delay: 2.72 },
    { text: "Sometimes they become things.", className: "text-xl md:text-2xl", delay: 3.62 }
  ];

  return (
    <div className="home-heading">
      {lines.map((line, index) => (
        <motion.div
          className={`overflow-hidden font-extrabold leading-[0.95] text-bone ${index > 1 ? "font-semibold leading-[1.22] text-bone/74" : ""} ${line.className}`}
          initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: line.delay, ease: softEase }}
          key={line.text}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
}

function CinematicPhoto({
  className,
  label,
  caption,
  tall = false,
  immersive = false,
  showCaption = true
}: {
  className: string;
  label: string;
  caption: string;
  tall?: boolean;
  immersive?: boolean;
  showCaption?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.01, 1.06]);

  return (
    <motion.div
      ref={ref}
      className={`home-photo home-glow-area ${className} ${immersive ? "min-h-[88vh]" : tall ? "min-h-[72vh]" : "min-h-[52vh]"} relative overflow-hidden rounded-lg border border-white/10`}
      onMouseMove={setGlowPosition}
      whileHover={{ rotateX: 1.5, rotateY: -1.5, scale: 1.012 }}
      transition={{ duration: 0.45, ease: softEase }}
    >
      <motion.div className="absolute inset-[-8%]" style={{ y, scale }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/24 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(236,228,215,0.18),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(217,130,75,0.2),transparent_30%)]" />
      {showCaption ? (
        <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-bone/42">{label}</p>
          <p className="mt-3 max-w-sm text-lg leading-7 text-bone/78 md:text-xl">{caption}</p>
        </div>
      ) : null}
    </motion.div>
  );
}

function ButtonLink({ href, children, variant = "solid" }: { href: string; children: React.ReactNode; variant?: "solid" | "ghost" }) {
  const base = "group inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5";
  const style =
    variant === "solid"
      ? "bg-bone text-ink shadow-[0_18px_50px_rgba(236,228,215,0.12)] hover:bg-white"
      : "border border-white/14 bg-white/[0.025] text-bone hover:border-bone/45 hover:bg-white/[0.06]";

  return (
    <Link className={`${base} ${style}`} href={href}>
      <span>{children}</span>
      <span className="ml-2 transition duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

function TextScene({
  label,
  lines,
  subtext,
  children,
  tone = "dark"
}: {
  label: string;
  lines: string[];
  subtext?: string;
  children?: React.ReactNode;
  tone?: "dark" | "paper";
}) {
  const isPaper = tone === "paper";

  return (
    <section className={`home-scene ${isPaper ? "home-paper-scene text-ink" : "text-bone"}`}>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
        <SceneLabel>{label}</SceneLabel>
        <LineReveal className="home-heading mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl" lines={lines} />
        {subtext ? (
          <motion.p
            className={`home-copy mt-8 max-w-2xl text-lg leading-8 md:text-xl ${isPaper ? "text-ink/62" : "text-bone/62"}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.75, delay: 0.22, ease: softEase }}
          >
            {subtext}
          </motion.p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function DocumentaryPhotoScene({
  label,
  question,
  lines,
  subtext,
  project,
  photoClass,
  photoLabel,
  photoCaption
}: {
  label: string;
  question: string;
  lines: string[];
  subtext: string;
  project?: string;
  photoClass: string;
  photoLabel: string;
  photoCaption: string;
}) {
  return (
    <section className="home-scene scroll-mt-28 px-4 py-12 md:px-6 md:py-14 lg:py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[18px]">
        <CinematicPhoto className={photoClass} label={photoLabel} caption={photoCaption} immersive showCaption={false} />
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
          <div className="max-w-3xl p-7 md:p-12 lg:p-16">
            <SceneLabel>{label}</SceneLabel>
            <motion.p
              className="home-copy mt-5 max-w-xl text-lg leading-8 text-bone/62 md:text-xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.75, ease: softEase }}
            >
              {question}
            </motion.p>
            <LineReveal className="home-heading mt-6 text-4xl font-extrabold leading-[1.04] text-bone md:text-5xl lg:text-6xl" lines={lines} />
            <motion.p
              className="home-copy mt-8 max-w-xl text-lg leading-8 text-bone/72 md:text-xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.75, delay: 0.2, ease: softEase }}
            >
              {subtext}
            </motion.p>
            {project ? (
              <motion.p
                className="home-label mt-6 text-xs uppercase tracking-[0.2em] text-ember/80"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.75, delay: 0.28, ease: softEase }}
              >
                Field note: {project}
              </motion.p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyCuriosityScene() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const questions = [
    {
      question: "Why do people make strange choices with money?",
      connection: "economics notes"
    },
    {
      question: "Why does the same guitar passage feel different every night?",
      connection: "practice pages"
    },
    {
      question: "What changes when you work while everyone else is sleeping?",
      connection: "Atlantic City"
    },
    {
      question: "What does a city sound like when you are new to it?",
      connection: "New York"
    },
    {
      question: "What happens backstage before the crowd sees anything?",
      connection: "event work"
    },
    {
      question: "What is it like to stand on a set and not be the main story?",
      connection: "music video and background acting"
    },
    {
      question: "What happens when a language starts becoming familiar?",
      connection: "Korean notebooks"
    },
    {
      question: "Why do some questions turn into files?",
      connection: "things I built"
    },
    {
      question: "Why did some ordinary days stay in my head?",
      connection: "small memories"
    },
    {
      question: "How did all of this end up on the same website?",
      connection: "this record"
    }
  ];

  return (
    <section className="home-question-wall relative min-h-[170vh] px-5 py-24 text-bone md:px-8">
      <div className="sticky top-0 mx-auto grid min-h-screen max-w-6xl gap-12 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="relative z-10">
          <SceneLabel>Entry 02</SceneLabel>
          <LineReveal
            className="home-heading mt-6 text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl"
            lines={["Questions that", "wouldn't leave", "me alone."]}
          />
          <motion.p
            className="home-copy mt-8 max-w-md text-lg leading-8 text-bone/58 md:text-xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.75, delay: 0.28, ease: softEase }}
          >
            Most of this did not begin as a plan. It began as things I kept noticing.
          </motion.p>
        </div>
        <div className="home-idea-wall relative z-10">
          {questions.map((item, index) => (
            <motion.button
              className="group home-idea-item block w-full border-t border-bone/10 px-0 py-5 text-left transition duration-300 hover:border-ember/45 md:py-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.75, delay: index * 0.055, ease: softEase }}
              onMouseEnter={() => setActiveQuestion(index)}
              onFocus={() => setActiveQuestion(index)}
              onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
              key={item.question}
              type="button"
            >
              <span className="home-heading block text-2xl font-extrabold leading-tight text-bone/78 transition duration-300 group-hover:translate-x-2 group-hover:text-bone md:text-3xl">
                {item.question}
              </span>
              <span
                className={`home-copy block overflow-hidden text-sm leading-6 text-ember/86 transition-all duration-300 md:text-base ${
                  activeQuestion === index ? "mt-3 max-h-16 opacity-100" : "mt-0 max-h-0 opacity-0"
                }`}
              >
                Left behind: <span className="text-bone/82">{item.connection}</span>
              </span>
            </motion.button>
          ))}
          <motion.div
            className="mt-10 border-t border-bone/12 pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.85, delay: 0.52, ease: softEase }}
          >
            <p className="home-heading text-3xl font-extrabold leading-tight text-bone md:text-4xl">
              The projects are only one kind
              <br />
              of footprint.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimelineScene() {
  const timeline = [
    ["Economics", "Started as classes. Became a way to notice incentives, markets, and ordinary choices."],
    ["Guitar", "A long stretch of repetition, sore fingers, and Trinity Grade 5 Distinction."],
    ["Things I Built", "Messy scripts, tabs, dashboards, and notes that turned into tools."],
    ["Work & Travel USA", "Atlantic City, night shifts, daily routines, and learning by being far from home."],
    ["New York", "One day of walking too much and looking up more than usual."],
    ["Korean", "Started learning the language. Slowly, sounds began to separate into words."],
    ["Events And Sets", "Concert work, backstage rooms, a music video, and background acting."]
  ];

  return (
    <section className="home-scene text-bone">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
        <SceneLabel>Entry 17</SceneLabel>
        <LineReveal className="home-heading mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl" lines={["It did not happen", "in a straight line."]} />
        <motion.div
          className="mt-12 grid gap-3 border-y border-bone/10 py-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.75, delay: 0.2, ease: softEase }}
        >
          {timeline.map(([title, note], index) => (
            <motion.div
              className="grid gap-3 border-b border-bone/8 pb-3 last:border-b-0 last:pb-0 md:grid-cols-[0.24fr_0.76fr]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.65, delay: index * 0.05, ease: softEase }}
              key={title}
            >
              <p className="home-label text-xs uppercase tracking-[0.2em] text-ember/80">{title}</p>
              <p className="home-copy text-base leading-7 text-bone/62 md:text-lg">{note}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function HomeExperience() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="home-shell relative min-h-screen overflow-hidden text-bone">
      <motion.div className="home-scroll-progress" style={{ scaleX: scrollYProgress }} />
      <div className="home-cinema-bg" />
      <div className="home-noise" />

      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/8 bg-ink/45 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm text-bone/62">
          <Link className="font-semibold tracking-[0.18em] text-bone/86 transition hover:text-bone" href="/">
            ALVIN LIM
          </Link>
          <div className="flex items-center gap-5">
            <Link className="transition hover:text-bone" href="/lab">
              Lab
            </Link>
            <Link className="transition hover:text-bone" href="/now">
              Now
            </Link>
            <Link className="transition hover:text-bone" href="/thoughts">
              Thoughts
            </Link>
            <Link className="transition hover:text-bone" href="/journey">
              Journey
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center px-5 pb-20 pt-28 md:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <GlowArea className="relative z-10 rounded-[28px] p-1">
            <HeroSequence />
            <motion.p
              className="home-copy mt-7 max-w-md text-base leading-7 text-bone/48 md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 4.4, ease: softEase }}
            >
              Most of this started as small questions I kept writing down.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 4.75, ease: softEase }}
            >
              <ButtonLink href="#story">Start with the notes</ButtonLink>
              <a className="group inline-flex items-center rounded-full border border-white/14 bg-white/[0.025] px-5 py-3 text-sm font-semibold text-bone transition duration-300 hover:-translate-y-0.5 hover:border-bone/45 hover:bg-white/[0.06]" href="#story">
                <span>Keep going</span>
                <span className="ml-2 transition duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </motion.div>
          </GlowArea>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: softEase }}
          >
            <CinematicPhoto
              className="hero-photo"
              label="hero-photo"
              caption="A page for the things that actually happened."
              tall
            />
          </motion.div>
        </div>
      </section>

      <div id="story">
        <StickyCuriosityScene />

        <DocumentaryPhotoScene
          label="Entry 03"
          question="What happens when a question leaves the notebook?"
          lines={["University made the questions louder.", "Not cleaner. Louder."]}
          subtext="Lectures, side projects, half-finished notes, and the slow feeling that economics was less a subject than a way to notice things."
          project="economics, notes, and unfinished ideas"
          photoClass="university-life-photo"
          photoLabel="university-life-photo"
          photoCaption="University life. Notes, classrooms, long walks, unfinished ideas."
        />

        <DocumentaryPhotoScene
          label="Entry 04"
          question="Do ideas matter if nobody hears them?"
          lines={["I thought ideas were enough.", "Rooms proved otherwise."]}
          subtext="Talking to people changed the shape of the idea. Some rooms were awkward. Some were loud. All of them were real."
          project="student election rooms"
          photoClass="student-election-photo"
          photoLabel="student-election-photo"
          photoCaption="Student election. Campaigning. Public rooms. Real people."
        />

        <DocumentaryPhotoScene
          label="Entry 05"
          question="What happened to the late-night tabs?"
          lines={["Some notes became", "things I built."]}
          subtext="Not polished at first. Mostly messy scripts, strange models, and enough curiosity to keep opening the laptop."
          project="things I built"
          photoClass="building-projects-photo"
          photoLabel="building-projects-photo"
          photoCaption="Building projects. Local scripts, dashboards, research systems."
        />

        <DocumentaryPhotoScene
          label="Entry 06"
          question="What does discipline look like when nobody is watching?"
          lines={["I picked up a guitar.", "It stayed."]}
          subtext="That eventually led to Trinity Grade 5 Distinction. Mostly, though, it was repetition: the same few bars, again and again, until they sounded a little less forced."
          project="classical guitar"
          photoClass="guitar-photo"
          photoLabel="guitar-photo"
          photoCaption="Classical guitar answered a lot of questions by refusing to be rushed."
        />

        <DocumentaryPhotoScene
          label="Entry 07"
          question="What happens if I leave home?"
          lines={["I left for a summer.", "Atlantic City was waiting."]}
          subtext="Work and Travel in the United States. Uniforms, strangers, bad sleep, practical problems, and ordinary days that felt larger because they were far from home."
          project="work and travel usa"
          photoClass="wat-america-photo"
          photoLabel="wat-america-photo"
          photoCaption="A classroom with uniforms, strangers, bad sleep, and very real consequences."
        />

        <DocumentaryPhotoScene
          label="Entry 08"
          question="What does independence feel like before it becomes a story?"
          lines={["Atlantic City was loud.", "I was quieter than I expected."]}
          subtext="Boardwalk lights, practical problems, and the kind of learning that does not ask for permission first."
          project="Atlantic City"
          photoClass="atlantic-city-photo"
          photoLabel="atlantic-city-photo"
          photoCaption="Atlantic City. Boardwalk, summer work, unfamiliar rooms."
        />

        <DocumentaryPhotoScene
          label="Entry 09"
          question="How big can the world feel in one afternoon?"
          lines={["New York was too much.", "I liked that."]}
          subtext="A day of looking up, walking too much, spending more than expected, and feeling very small in a useful way."
          project="new york"
          photoClass="new-york-photo"
          photoLabel="new-york-photo"
          photoCaption="New York. Walking, looking up, thinking too much."
        />

        <DocumentaryPhotoScene
          label="Entry 10"
          question="What happens when a language stops being only sound?"
          lines={["I started learning Korean.", "Slowly."]}
          subtext="At first it was just unfamiliar shapes and sounds. Then a few words stayed. Then a few sentences did."
          project="korean notebooks"
          photoClass="korea-photo"
          photoLabel="korea-photo"
          photoCaption="Korean notes. New sounds becoming familiar."
        />

        <TextScene
          label="Entry 11"
          lines={["Some questions became files.", "Some files became tools."]}
          subtext="The lab is one drawer in the notebook. It is where the market questions, scripts, and reports ended up."
          tone="dark"
        >
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.75, delay: 0.2, ease: softEase }}
          >
            <ButtonLink href="/lab">Open the Lab drawer</ButtonLink>
          </motion.div>
        </TextScene>

        <TextScene
          label="Entry 12"
          lines={["Music was there", "before the dashboards."]}
          subtext="I picked up a guitar. It became part of life. Before models and dashboards, there were slow passages, repeated badly, then a little less badly."
          tone="dark"
        >
          <motion.div
            className="mt-10 grid gap-3 border-y border-bone/10 py-5 text-sm text-bone/58 md:grid-cols-2"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.75, delay: 0.24, ease: softEase }}
          >
            {["Classical guitar", "Trinity Grade 5 Distinction", "Practice notes", "Quiet repetition"].map((item) => (
              <p className="home-label border-b border-bone/8 pb-3 uppercase tracking-[0.16em]" key={item}>
                {item}
              </p>
            ))}
          </motion.div>
        </TextScene>

        <DocumentaryPhotoScene
          label="Entry 13"
          question="What does practice look like before anyone hears it?"
          lines={["Mostly ordinary.", "Mostly repeated."]}
          subtext="The music part of the story is not a trophy shelf. It is a lot of sitting down, starting again, and hearing the same mistake until it changes."
          project="practice, performance, and recital photos"
          photoClass="guitar-photo"
          photoLabel="music-photo-space"
          photoCaption="Practice, performance, and recital photos."
        />

        <DocumentaryPhotoScene
          label="Entry 14"
          question="What happens before the audience sees anything?"
          lines={["Some nights happened", "behind the stage."]}
          subtext="Concerts and events became part of life too. Cables, timing, small problems, people moving quickly, and the strange calm of work that has to happen now."
          project="concerts, events, backstage work"
          photoClass="building-projects-photo"
          photoLabel="live-events-photo-space"
          photoCaption="Concerts, backstage rooms, and event operations."
        />

        <DocumentaryPhotoScene
          label="Entry 15"
          question="What happens outside the plan?"
          lines={["A music video set.", "Background acting."]}
          subtext="It was not a career plan. It was something that happened. A room full of people making a scene look natural, even though almost nothing about it felt ordinary."
          project="music video and background acting"
          photoClass="student-election-photo"
          photoLabel="performance-photo-space"
          photoCaption="Set days, performance work, and unexpected rooms."
        />

        <DocumentaryPhotoScene
          label="Entry 16"
          question="Was America only a trip?"
          lines={["Three months", "became a chapter."]}
          subtext="Atlantic City, night shifts, daily life, photos, small errands, and the feeling of figuring things out without the usual safety rails."
          project="atlantic city, new york, daily life, work"
          photoClass="wat-america-photo"
          photoLabel="work-travel-photo-space"
          photoCaption="Atlantic City, New York, daily life, and work moments."
        />

        <TimelineScene />

        <TextScene
          label="Entry 18"
          lines={["That is most", "of what happened."]}
          subtext="Not a clean storyline. Just economics classes, guitar practice, late-night tabs, Korean notes, event rooms, set days, Atlantic City shifts, New York walking, and a few tools made because the questions stayed around."
          tone="dark"
        >
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.75, delay: 0.2, ease: softEase }}
          >
            <ButtonLink href="/lab">Open the Lab drawer</ButtonLink>
          </motion.div>
        </TextScene>
      </div>
    </main>
  );
}
