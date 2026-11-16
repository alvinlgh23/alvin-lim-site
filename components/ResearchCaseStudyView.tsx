import {
  Entry,
  Facts,
  IndexRow,
  LinkRow,
  NextRoom,
  NumberedList,
  PageIntro,
  PageShell,
  Prose,
  Quote,
  Section,
  TextLink
} from "@/components/Gallery";
import type { ResearchCaseStudyRecord } from "@/lib/archive-data";

export function ResearchCaseStudyView({ study }: { study: ResearchCaseStudyRecord }) {
  return (
    <PageShell>
      <PageIntro
        back={{ href: "/research", label: "Research" }}
        eyebrow={`${study.category} · ${study.status}`}
        title={study.title}
        lede={study.shortDescription}
      >
        <LinkRow>
          <TextLink href={study.labRoute}>Open in the lab</TextLink>
          {study.githubUrl ? <TextLink href={study.githubUrl}>Source on GitHub</TextLink> : null}
        </LinkRow>
      </PageIntro>

      <Section label="The question">
        <Quote>“{study.researchQuestion}”</Quote>
      </Section>

      <Section label="Context">
        <Prose>
          {study.context.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      <Section label="Approach">
        <Prose>
          {study.approach.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      <Section label="Method" title="How signals are organized and read.">
        {study.methodology.map((item) => (
          <Entry key={item.layer} meta={item.layer} title={item.focus}>
            <p>{item.signals}</p>
            <p className="text-graphite">{item.interpretation}</p>
          </Entry>
        ))}
      </Section>

      <Section label="System" title="Pipeline.">
        <Prose>
          <p>{study.system.architectureSummary}</p>
        </Prose>
        <div className="mt-10">
          <NumberedList items={study.system.pipelineSteps} />
        </div>
        <div className="mt-12">
          <Facts
            items={[
              ["Inputs", study.system.inputs.join(" · ")],
              ["Stack", study.system.stack.join(" · ")],
              ["Output", study.output.format]
            ]}
          />
        </div>
      </Section>

      <Section label="Output" title="What the system produces.">
        <div className="max-w-[760px] border-l-2 border-ink pl-6 font-mono text-sm leading-relaxed">
          <p className="mb-4 text-ink">{study.output.sampleHeader}</p>
          {study.output.sampleLines.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-t border-rule py-2.5 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <span className="text-muted">{label}</span>
              <span className="text-ink">{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-graphite">
          {study.output.interpretationNote} This shows the structure of the output, not a historical backtest.
        </p>
      </Section>

      <Section label="Limits" title="What the model does not claim to know.">
        <NumberedList items={study.limitations} />
      </Section>

      <Section label="Related">
        {study.relatedResearch.map((rel) => (
          <IndexRow key={rel.href} href={rel.href} title={rel.title} meta={rel.category} />
        ))}
      </Section>

      <NextRoom href="/research" label="Back to the collection" title="Research" />
    </PageShell>
  );
}
