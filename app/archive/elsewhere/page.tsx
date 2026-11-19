import type { Metadata } from "next";
import {
  Entry,
  Facts,
  LinkRow,
  NextRoom,
  PageIntro,
  PageShell,
  PhotoRow,
  Plate,
  Prose,
  Quote,
  Section,
  TextLink
} from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Elsewhere | Personal Archive — Alvin Lim",
  description:
    "Elsewhere, for a while. Work & Travel in Atlantic City, urban field notes, and personal interests."
};

export default function ElsewherePage() {
  return (
    <PageShell>
      <PageIntro
        back={{ href: "/archive", label: "Archive" }}
        eyebrow="Elsewhere"
        title="Elsewhere, for a while."
        lede="Working in unfamiliar places, walking through cities, and keeping track of personal interests outside formal study and market research."
      />

      <Section label="Work & Travel" title="Atlantic City, United States.">
        <Prose>
          <p>
            Participating in the Work & Travel program in the United States meant stepping completely outside the familiar rhythm of university lectures in Malaysia and spending a summer working in Atlantic City, New Jersey.
          </p>
          <p>
            Daily life revolved around shift schedules, uniforms, boardwalk crowds, and learning how to handle practical responsibilities in an unfamiliar environment with strangers who quickly became coworkers.
          </p>
          <p>
            Atlantic City was loud and fast-paced on the surface, yet the experience itself taught a quieter kind of independence — solving everyday problems on your own before they ever turn into a story.
          </p>
        </Prose>
        <div className="mt-12">
          <PhotoRow
            photos={[
              {
                src: "/photos/atlantic-city/board-wok.webp",
                alt: "Alvin in a chef's jacket and red apron in front of the Board Wok counter",
                width: 900,
                height: 1600,
                caption: "Behind the Board Wok counter."
              },
              {
                src: "/photos/atlantic-city/showboat-crew.webp",
                alt: "A selfie of Alvin with two coworkers in chef's whites at a food counter",
                width: 1203,
                height: 1600,
                caption: "On shift with coworkers."
              },
              {
                src: "/photos/atlantic-city/board-wok-register.webp",
                alt: "A register screen showing an order of General Tso chicken, pepper steak and chicken with broccoli",
                width: 1202,
                height: 1600,
                caption: "A typical order on the register."
              }
            ]}
          />
        </div>
        <div className="my-12">
          <Quote>
            “Boardwalk lights, practical problems, and the kind of learning that does not ask for permission first.”
          </Quote>
        </div>
        <Facts
          items={[
            ["Program", "Summer Work & Travel (USA)"],
            ["When", "Summer 2026"],
            ["Base", "Atlantic City, New Jersey"],
            ["Context", "Seasonal shift work & independent travel"]
          ]}
        />
      </Section>

      <Section label="Places" title="Cities, streets, and everyday observations.">
        <Entry meta="New York" title="Scale, density & looking up">
          <p>
            Walking across Manhattan after working in New Jersey — noticing how vertical density, subway transit, and street-level commerce compress an enormous amount of human ambition into a few square miles.
          </p>
        </Entry>
        <Entry meta="Kuala Lumpur" title="Infrastructure & everyday movement">
          <p>
            Commuting between Klang, Petaling Jaya, and the Universiti Malaya campus — observing how rail extensions, highway bottlenecks, and neighborhood commercial districts shape daily economic life.
          </p>
        </Entry>
        <Entry meta="Korea" title="Industrial & cultural intersections">
          <p>
            Exploring South Korea both as a place to travel and as an economic case study where semiconductor manufacturing, export discipline, and cultural industries intersect — later inspiring the KOSPI Signal Monitor.
          </p>
        </Entry>
      </Section>

      <Section label="Interests" title="Music, guitar, and taking things apart.">
        <Entry meta="Practice · Trinity Grade 5, Distinction" title="Classical guitar">
          <p>
            Practicing classical guitar offers a counterbalance to analytical and digital work. Progress on the instrument cannot be rushed — it comes from slow repetition, attention to tone and finger placement, and patience.
          </p>
          <p>
            I hold the Trinity College London Classical Guitar Grade 5 certificate, awarded with Distinction.
          </p>
          <div className="pt-6">
            <Plate
              photo={{
                src: "/photos/elsewhere/guitar-performance.webp",
                alt: "Alvin playing classical guitar on stage beside a second guitarist, a black-and-white projection behind them",
                width: 1260,
                height: 942,
                caption: "On stage with a fellow guitarist."
              }}
            />
          </div>
        </Entry>
        <Entry meta="Hardware" title="Devices & repair">
          <p>
            Long before building Python valuation scripts, curiosity meant opening up faulty second-hand smartphones, replacing components, and seeing how consumer electronics are put together on the inside.
          </p>
        </Entry>
        <LinkRow>
          <TextLink href="/research/semiconductors">From smartphones to silicon</TextLink>
        </LinkRow>
      </Section>

      <NextRoom href="/research" label="Back to the work" title="Research" />
    </PageShell>
  );
}
