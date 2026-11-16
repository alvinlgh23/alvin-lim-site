import type { Metadata } from "next";
import { Facts, LinkRow, NextRoom, PageIntro, PageShell, Prose, Section, TextLink } from "@/components/Gallery";

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
