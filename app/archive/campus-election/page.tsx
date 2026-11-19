import type { Metadata } from "next";
import {
  Facts,
  LinkRow,
  NextRoom,
  PageIntro,
  PageShell,
  PhotoRow,
  Plate,
  Prose,
  Section,
  TextLink
} from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Campus Election 2024 | Personal Archive — Alvin Lim",
  description:
    "On the campaign trail: Universiti Malaya · November 2024. Historical record of standing as a student representative candidate for the Faculty of Business and Economics."
};

export default function CampusElectionPage() {
  return (
    <PageShell>
      <PageIntro
        back={{ href: "/archive", label: "Archive" }}
        eyebrow="Campus Election · November 2024"
        title="On the campaign trail."
        lede="Standing as a student representative candidate for the Faculty of Business and Economics at Universiti Malaya."
      />

      <Section label="Record">
        <div className="mb-12">
          <Plate
            photo={{
              src: "/photos/campus-election/candidate-card.webp",
              alt: "Round NewGen campaign card with Alvin's portrait, the name Lim Gi Hong, and the line Calon Fakulti Perniagaan dan Ekonomi",
              width: 1260,
              height: 1254,
              caption: "The candidate card: “Calon Fakulti Perniagaan dan Ekonomi” — candidate for the Faculty of Business and Economics."
            }}
          />
        </div>
        <Facts
          items={[
            ["University", "Universiti Malaya"],
            ["Constituency", "Faculty of Business & Economics"],
            ["Platform", "NewGen"],
            ["When", "November 2024"],
            ["Outcome", <span key="o" className="text-ember">Not elected</span>]
          ]}
        />
      </Section>

      <Section label="01" title="The candidacy">
        <div className="mb-12">
          <Plate
            photo={{
              src: "/photos/campus-election/speech.webp",
              alt: "Alvin in a black shirt speaking into a microphone, arm raised, between two NewGen banners",
              width: 1260,
              height: 833,
              caption: "Making the case to FBE students, November 2024."
            }}
          />
        </div>
        <Prose>
          <p>
            In November 2024, I stood as a student representative candidate for the Faculty of Business and Economics at Universiti Malaya with NewGen.
          </p>
          <p>
            I was selected to run as a candidate, and the experience introduced me to the practical side of student representation.
          </p>
        </Prose>
      </Section>

      <Section label="02" title="The campaign">
        <Prose>
          <p>
            The campaign involved listening to students, working with teammates, and engaging with candidates from other groups, including UMANY and Demokrat.
          </p>
          <p>
            Although we approached the election from different platforms, those conversations were an important part of the experience.
          </p>
        </Prose>
        <div className="mt-12">
          <PhotoRow
            photos={[
              {
                src: "/photos/campus-election/lecture-visit.webp",
                alt: "The NewGen team with banners at the front of a lecture room full of students",
                width: 1260,
                height: 819,
                caption: "Visiting a lecture room with the team."
              },
              {
                src: "/photos/campus-election/speaking-banner.webp",
                alt: "Alvin speaking into a microphone beside a teammate holding a NewGen banner",
                width: 1260,
                height: 833,
                caption: "Speaking alongside the NewGen banner."
              },
              {
                src: "/photos/campus-election/lecture-theatre-session.webp",
                alt: "Alvin addressing students in a lecture theatre, flanked by teammates holding NewGen banners",
                width: 1260,
                height: 841,
                caption: "A campaign session in a lecture theatre."
              }
            ]}
          />
        </div>
      </Section>

      <Section label="03" title="The outcome">
        <Prose>
          <p>I was not elected.</p>
          <p>
            Nevertheless, the experience gave me a clearer understanding of political participation and helped me reconsider whether it was the direction I wanted to pursue.
          </p>
        </Prose>
      </Section>

      <Section label="04" title="Looking back">
        <Prose>
          <p>
            I eventually chose to move away from politics and concentrate on my academic interests and independent research.
          </p>
          <p>I still value the conversations, teamwork, and experience of participating in the election.</p>
        </Prose>
        <LinkRow>
          <TextLink href="/archive/education">How this fits the move from law to economics</TextLink>
        </LinkRow>
      </Section>

      <NextRoom href="/archive/behind-the-scenes" label="Next in the archive" title="Behind the Scenes" />
    </PageShell>
  );
}
