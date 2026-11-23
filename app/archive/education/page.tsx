import type { Metadata } from "next";
import { LinkRow, NextRoom, PageIntro, PageShell, Plate, Prose, Section, TextLink } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Education & Direction | Personal Archive — Alvin Lim",
  description:
    "A different way of understanding systems: a five-part autobiographical essay on transitioning from law at UKM to economics at Universiti Malaya."
};

export default function EducationDirectionPage() {
  return (
    <PageShell>
      <PageIntro
        image="/photos/education/um-2023.webp"
        imagePosition="50% 30%"
        back={{ href: "/archive", label: "Archive" }}
        eyebrow="Education & Direction"
        title="A different way of understanding systems."
        lede="An essay in five parts: from an early ambition, through law, into economics."
      />

      <Section label="01" title="An early ambition">
        <Prose>
          <p>Before I became interested in financial research, I had a different ambition.</p>
          <p>
            I wanted to help shape how Malaysia developed — from economic policies and resource allocation to the planning of cities and infrastructure.
          </p>
          <p>
            I used to imagine urban planning almost like building a city in Minecraft, thinking about how everything could fit together more efficiently.
          </p>
        </Prose>
      </Section>

      <Section label="02" title="Choosing law">
        <p className="archival-mono mb-5 text-xs text-muted">Universiti Kebangsaan Malaysia · October 2022</p>
        <Prose>
          <p>That ambition initially led me to study law at Universiti Kebangsaan Malaysia.</p>
          <p>
            Once I began, however, I realised that studying law was quite different from the kind of policy and planning work I had imagined.
          </p>
          <p>I eventually decided to change direction and transferred to Universiti Malaya to study economics.</p>
        </Prose>
      </Section>

      <Section label="03" title="Entering economics">
        <p className="archival-mono mb-5 text-xs text-muted">Universiti Malaya · Faculty of Business and Economics · October 2023</p>
        <Prose>
          <p>
            Economics offered another way to explore questions about incentives, markets, institutions, and how resources are allocated.
          </p>
          <p>
            It also became a foundation for my growing interest in financial markets and independent research.
          </p>
          <p>I expect to graduate in 2028.</p>
        </Prose>
        <div className="mt-12">
          <Plate
            photo={{
              src: "/photos/education/um-2023.webp",
              alt: "Alvin in a Universiti Malaya varsity jacket in front of the illuminated Universiti Malaya 2023 sign at night",
              width: 1200,
              height: 1600,
              caption: "At Universiti Malaya."
            }}
          />
        </div>
      </Section>

      <Section label="04" title="The campus election">
        <p className="archival-mono mb-5 text-xs text-muted">November 2024</p>
        <Prose>
          <p>
            In 2024, I was selected to stand as a Faculty of Business and Economics student representative candidate with NewGen at Universiti Malaya.
          </p>
          <p>
            The campaign gave me firsthand experience with student representation and conversations across different campus groups.
          </p>
          <p>It also changed how I viewed political participation.</p>
        </Prose>
        <LinkRow>
          <TextLink href="/archive/campus-election">The 2024 campaign record</TextLink>
        </LinkRow>
      </Section>

      <Section label="05" title="Choosing another direction">
        <Prose>
          <p>
            Through that experience, I found that the political environment I encountered did not align with the kind of efficiency-focused, evidence-driven work I had originally imagined.
          </p>
          <p>
            I eventually decided to step away from political participation and focus my efforts on economics, financial markets, technology, and research.
          </p>
        </Prose>
        <LinkRow>
          <TextLink href="/research">Where that focus went</TextLink>
        </LinkRow>
      </Section>

      <NextRoom href="/archive/campus-election" label="Next in the archive" title="Campus Election" />
    </PageShell>
  );
}
