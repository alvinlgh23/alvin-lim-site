import type { Metadata } from "next";
import {
  Entry,
  IndexRow,
  LinkRow,
  NextRoom,
  PageIntro,
  PageShell,
  Prose,
  Section,
  TextLink
} from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Technology & Semiconductors | Alvin Lim — A Personal Archive",
  description:
    "From smartphones to silicon: mobile SoC evolution, chip architecture, and the economics of the semiconductor industry."
};

export default function SemiconductorsPage() {
  return (
    <PageShell>
      <PageIntro
        back={{ href: "/research", label: "Research" }}
        eyebrow="Technology & Semiconductors · In progress"
        title="From smartphones to silicon."
      />

      <Section label="Where it started">
        <Prose>
          <p>My interest in semiconductors began with smartphones.</p>
          <p>
            Since primary school, I have enjoyed comparing phone specifications and following how each generation of iPhone processors evolved.
          </p>
          <p>
            Over time, that curiosity expanded beyond individual devices into questions about chip architecture, computing performance, and the semiconductor industry.
          </p>
        </Prose>
      </Section>

      <Section label="Scope" title="From the device to the foundry.">
        <Entry meta="The device" title="Smartphone specifications & generation cycles">
          <p>
            Comparing mobile processor generations, sustained thermal performance, battery efficiency, and secondary-market resale behavior.
          </p>
        </Entry>
        <Entry meta="The chip" title="SoC layout & microarchitecture">
          <p>
            CPU/GPU/NPU core allocation, memory bandwidth constraints, instruction-set efficiency, and node shrink trade-offs.
          </p>
        </Entry>
        <Entry meta="The industry" title="Foundry economics, capital intensity & supply chains">
          <p>
            Leading-edge lithography bottlenecks, fab utilization, design-to-manufacturing specialization, and market valuation of semiconductor cycles.
          </p>
        </Entry>
      </Section>

      <Section label="Planned" title="Directions I intend to investigate.">
        <Entry title="Mobile SoC evolution">
          <p>Understanding how mobile processors evolve across generations.</p>
        </Entry>
        <Entry title="Chip architecture">
          <p>Exploring architectural design, computing efficiency, and hardware trade-offs.</p>
        </Entry>
        <Entry title="Semiconductor industry">
          <p>Examining technical progress, competition, and the economics of semiconductor development.</p>
        </Entry>
      </Section>

      <Section label="Price and value" title="Product familiarity as an early lens on value.">
        <Prose>
          <p>
            During secondary school, I also spent time buying and reselling second-hand phones through Carousell, occasionally repairing faulty devices before selling them.
          </p>
          <p>
            Back then, my decisions were mostly instinctive. I knew the products well, and that familiarity gave me a sense of what they might be worth.
          </p>
          <p>It was a practical experience that still influences how I think about price and value today.</p>
        </Prose>
        <LinkRow>
          <TextLink href="/research/markets#trade-my-way-up">Could I trade my way up?</TextLink>
        </LinkRow>
      </Section>

      <Section label="Connected">
        <IndexRow
          href="/lab/projects/phone-cycle-timing-engine"
          title="Phone Cycle Timing Engine"
          note="A lab scenario tool modeling smartphone depreciation and release-cycle shocks."
          meta="Lab"
        />
        <IndexRow
          href="/lab/projects/kospi-signal-monitor"
          title="KOSPI Signal Monitor"
          note="Testing relationships between Korean equities, semiconductor exports, and FX."
          meta="Lab"
        />
      </Section>

      <NextRoom href="/research/macro" label="Next area" title="Macroeconomics" />
    </PageShell>
  );
}
