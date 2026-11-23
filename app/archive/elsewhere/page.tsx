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
        image="/photos/elsewhere/hollywood.webp"
        imagePosition="50% 60%"
        imageTall
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
        <Entry meta="Sabah · March 2023" title="Climbing Mount Kinabalu">
          <p>
            In March 2023 I climbed Mount Kinabalu in Sabah, Malaysia&apos;s highest mountain — bare granite underfoot, a rope to follow, and the peaks catching the morning light.
          </p>
          <div className="pt-6">
            <Plate
              photo={{
                src: "/photos/elsewhere/kinabalu.webp",
                alt: "Alvin in a red jacket, beanie and sunglasses taking a selfie on the granite slopes of Mount Kinabalu, a rocky peak lit by early sun behind him",
                width: 1260,
                height: 946,
                caption: "On the granite near the top of Mount Kinabalu, March 2023."
              }}
            />
          </div>
        </Entry>
        <Entry meta="Korea" title="Industrial & cultural intersections">
          <p>
            Exploring South Korea both as a place to travel and as an economic case study where semiconductor manufacturing, export discipline, and cultural industries intersect — later inspiring the KOSPI Signal Monitor.
          </p>
        </Entry>
      </Section>

      <Section label="Interests" title="Music, guitar, and taking things apart.">
        <Entry meta="Pasar Seni, Kuala Lumpur" title="Looking through a lens">
          <p>
            Right after finishing STPM, I started exploring — new places, and new interests to go with them. At Pasar Seni I borrowed a friend&apos;s camera and started looking at the city through a lens.
          </p>
          <div className="pt-6">
            <Plate
              photo={{
                src: "/photos/elsewhere/pasar-seni.webp",
                alt: "Alvin, wearing a face mask, photographing with a borrowed camera in a leafy lane at Pasar Seni hung with paper lanterns",
                width: 630,
                height: 640,
                caption: "Borrowing a friend's camera at Pasar Seni, just after STPM."
              }}
            />
          </div>
        </Entry>
        <Entry meta="Practice · Trinity Grade 5, Distinction" title="Classical guitar">
          <p>
            Practicing classical guitar offers a counterbalance to analytical and digital work. Progress on the instrument cannot be rushed — it comes from slow repetition, attention to tone and finger placement, and patience.
          </p>
          <p>
            I hold the Trinity College London Classical Guitar Grade 5 certificate, awarded with Distinction in January 2026.
          </p>
          <div className="grid items-start gap-3 pt-6 sm:grid-cols-[1.5fr_1fr]">
            <Plate
              photo={{
                src: "/photos/elsewhere/guitar-performance.webp",
                alt: "Alvin playing classical guitar on stage beside a second guitarist, a black-and-white projection behind them",
                width: 1260,
                height: 942,
                caption: "On stage with a fellow guitarist."
              }}
            />
            <Plate
              photo={{
                src: "/photos/elsewhere/trinity-grade5.webp",
                alt: "Trinity College London certificate: Lim Gi Hong is awarded Grade 5 Classical Guitar with Distinction",
                width: 1145,
                height: 1200,
                caption: "Trinity College London, Grade 5 Classical Guitar — with Distinction, January 2026."
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
