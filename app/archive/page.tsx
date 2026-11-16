import type { Metadata } from "next";
import { IndexRow, NextRoom, PageIntro, PageShell, Section } from "@/components/Gallery";
import { ARCHIVE_COLLECTION_ENTRIES } from "@/lib/archive-data";

export const metadata: Metadata = {
  title: "Personal Archive | Alvin Lim — A Personal Archive",
  description:
    "A few things outside the usual categories. A collection of experiences, places, and interests that have shaped different parts of my life."
};

export default function PersonalArchivePage() {
  const [education, election, bts, elsewhere] = ARCHIVE_COLLECTION_ENTRIES;

  return (
    <PageShell>
      <PageIntro
        eyebrow="Archive"
        title="A few things outside the usual categories."
        lede="A collection of experiences, places, and interests that have shaped different parts of my life."
      />

      <Section label="How I got here">
        <IndexRow href={education.route} title={education.title} note={education.summary} meta="Essay" />
        <IndexRow href={election.route} title={election.title} note={election.summary} meta="Nov 2024" />
      </Section>

      <Section label="The things in between">
        <IndexRow href={bts.route} title={bts.title} note={bts.summary} meta="Productions" />
        <IndexRow href={elsewhere.route} title={elsewhere.title} note={elsewhere.summary} meta="Field journal" />
      </Section>

      <NextRoom href="/journey" label="The same story, in order" title="Journey" />
    </PageShell>
  );
}
