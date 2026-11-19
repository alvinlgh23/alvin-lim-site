import type { Metadata } from "next";
import { Facts, NextRoom, PageIntro, PageShell, Plate, Prose, Quote, Section } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Behind the Scenes | Personal Archive — Alvin Lim",
  description:
    "Before the lights come on. A collection of moments from events, productions, and the work that happens away from the spotlight."
};

const PRODUCTION_RECORDS = [
  {
    code: "RECORD 01 // LIVE EVENT OPERATIONS",
    title: "Venue Preparation & Pre-Show Floor Logistics",
    date: "Event Production Sequence",
    location: "Live Event & Concert Venues",
    involvement: "Event Crew & Backstage Coordination",
    caption:
      "Hours before doors open: stage markings, equipment load-ins, audio-visual checks, and last-minute schedule adjustments.",
    photo: {
      src: "/photos/behind-the-scenes/pre-show-stage.webp",
      alt: "An empty concert floor before doors: stacked black chairs in the foreground, lighting beams across a lit stage behind",
      width: 1260,
      height: 945,
      caption: "Before doors: lights being focused, chairs still stacked."
    },
    narrative:
      "Audiences experience a live event as a seamless two-hour sequence, but the reality backstage is built on checklists, physical setup, and solving unexpected hardware or timing problems before the house lights dim."
  },
  {
    code: "RECORD 02 // MUSIC VIDEO · ON CAMERA",
    title: "In Front of the Camera",
    date: "Music Video",
    location: "Music-video set",
    involvement: "On-camera role, closing scene",
    caption:
      "For once, standing where the camera points instead of behind it.",
    photo: {
      src: "/photos/behind-the-scenes/music-video.webp",
      alt: "A still from a music video: Alvin in glasses and a lanyard at a laptop, beside an actor in a cream suit",
      width: 1181,
      height: 665,
      caption: (
        <>
          A role in the closing scene of a music video by 低清DISSY.{" "}
          <a
            href="https://www.youtube.com/watch?v=maHLVOaUPGg"
            target="_blank"
            rel="noreferrer"
            className="text-ink underline underline-offset-4 hover:text-ember"
          >
            Watch on YouTube ↗
          </a>
        </>
      )
    },
    narrative:
      "Most of my event work happens out of frame. This time I was in it: a small role in the closing scene of a music video by 低清DISSY. Even a few seconds on screen rests on the same things I usually handle off camera — hitting a mark, getting the timing right, and staying patient between takes."
  },
  {
    code: "RECORD 03 // CUE SHEETS & STAGE MANAGEMENT",
    title: "Backstage Transitions Under Time Pressure",
    date: "Show-Run Documentation",
    location: "Backstage & Control Areas",
    involvement: "Transition & Cue Support",
    caption:
      "Different venues, same last-minute chaos: coordinating transitions when schedules compress during a live run.",
    photo: {
      src: "/photos/behind-the-scenes/backstage-lift.webp",
      alt: "Alvin and crew in black shirts packing a service lift full of flattened cardboard boxes",
      width: 1200,
      height: 1600,
      caption: "Changeover: clearing an entire lift of boxes between setups."
    },
    narrative:
      "Regardless of the venue size, the most valuable habit backstage is staying calm when a cue shifts—communicating clearly with the team and fixing what needs fixing without adding noise."
  }
];

export default function BehindTheScenesPage() {
  return (
    <PageShell>
      <PageIntro
        back={{ href: "/archive", label: "Archive" }}
        eyebrow="Behind the Scenes"
        title="Before the lights come on."
        lede="A collection of moments from events, productions, and the work that happens away from the spotlight."
      >
        <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-graphite md:text-lg">
          I&apos;ve worked as crew on Taylor Swift&apos;s The Eras Tour in Singapore (2024), Jay Chou&apos;s concerts in Malaysia (2023 and 2024), Coldplay in Malaysia (2024), and the 9Wave music festival at Sunway (2023) — and many other shows besides.
        </p>
      </PageIntro>

      {PRODUCTION_RECORDS.map((entry, idx) => (
        <Section key={entry.code} label={String(idx + 1).padStart(2, "0")} title={entry.title}>
          <Quote>“{entry.caption}”</Quote>
          <div className="mt-12">
            <Plate photo={entry.photo} />
          </div>
          <div className="mt-12">
            <Prose>
              <p>{entry.narrative}</p>
            </Prose>
          </div>
          <div className="mt-10">
            <Facts
              items={[
                ["Where", entry.location],
                ["Role", entry.involvement]
              ]}
            />
          </div>
        </Section>
      ))}

      <NextRoom href="/archive/elsewhere" label="Next in the archive" title="Elsewhere" />
    </PageShell>
  );
}
