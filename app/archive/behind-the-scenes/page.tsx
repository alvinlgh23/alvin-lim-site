import type { Metadata } from "next";
import { Facts, NextRoom, PageIntro, PageShell, Prose, Quote, Section } from "@/components/Gallery";

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
    narrative:
      "Audiences experience a live event as a seamless two-hour sequence, but the reality backstage is built on checklists, physical setup, and solving unexpected hardware or timing problems before the house lights dim."
  },
  {
    code: "RECORD 02 // VISUAL & MUSIC-VIDEO PRODUCTION",
    title: "On-Set Production & Lighting Resets",
    date: "Production Set Record",
    location: "Studio & Location Shoots",
    involvement: "Production Support & Set Operations",
    caption:
      "Between takes on set: camera blocking, lighting adjustments, cable management, and keeping a shoot moving on schedule.",
    narrative:
      "Working on music-video and visual production sets offered a close look at how creative work relies on disciplined logistics—where a few seconds of finished screen time require hours of patient coordination behind the camera."
  },
  {
    code: "RECORD 03 // CUE SHEETS & STAGE MANAGEMENT",
    title: "Backstage Transitions Under Time Pressure",
    date: "Show-Run Documentation",
    location: "Backstage & Control Areas",
    involvement: "Transition & Cue Support",
    caption:
      "Different venues, same last-minute chaos: coordinating transitions when schedules compress during a live run.",
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
      />

      {PRODUCTION_RECORDS.map((entry, idx) => (
        <Section key={entry.code} label={String(idx + 1).padStart(2, "0")} title={entry.title}>
          <Quote>“{entry.caption}”</Quote>
          <div className="mt-10">
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
