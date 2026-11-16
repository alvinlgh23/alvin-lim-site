import type { Metadata } from "next";
import {
  Entry,
  Facts,
  IndexRow,
  NextRoom,
  PageIntro,
  PageShell,
  Prose,
  Section
} from "@/components/Gallery";
import { SmartphoneTradingDiagram } from "@/components/SmartphoneTradingDiagram";

export const metadata: Metadata = {
  title: "Markets & Valuation | Alvin Lim — A Personal Archive",
  description:
    "What is the market pricing in? And what might it be missing? Research into valuation, market structure, technology, and second-hand market experiments."
};

export default function MarketsValuationPage() {
  return (
    <PageShell>
      <PageIntro
        back={{ href: "/research", label: "Research" }}
        eyebrow="Markets & Valuation"
        title="What is the market pricing in?"
        lede="And what might it be missing?"
      />

      <Section label="Opening">
        <Prose>
          <p>
            I&apos;m interested in how markets assign value to companies, technologies, and future expectations.
          </p>
          <p>
            Sometimes my research begins with a technological development that I believe deserves closer attention. Other times, it begins with a market price that seems difficult to explain.
          </p>
          <p>
            I use financial analysis, market data, and independent research tools to investigate those questions.
          </p>
        </Prose>
      </Section>

      <Section label="Inquiries" title="Valuation, structure, and technological change.">
        <IndexRow
          href="/research/market-valuation"
          title="Market Valuation"
          note="How liquidity regimes, sector relative strength, and forward multiple expansion interact — and separating durable fundamental quality from narrative chase risk."
          meta="Equities & macro"
        />
        <IndexRow
          href="/research/onchain-intelligence"
          title="Market Structure"
          note="How holder cohorts, exchange net flows, and macro liquidity conditions combine into distinct market regimes rather than isolated price ticks."
          meta="On-chain & flows"
        />
        <IndexRow
          href="/research/semiconductors"
          title="Technology & Business"
          note="Connecting hardware evolution — from smartphone processors to foundry economics — with competitive advantage and how public markets value technical roadmaps."
          meta="Silicon & industry"
        />
      </Section>

      <Section id="trade-my-way-up" label="An early experiment" title="Could I trade my way up?">
        <Prose>
          <p>
            When I was younger, I wondered whether I could keep upgrading my phone simply by trading it for another one.
          </p>
          <p>
            I had noticed that Android phones often seemed to depreciate faster than iPhones in the second-hand market I was familiar with.
          </p>
          <p>
            My idea was simple: exchange my iPhone 5 (16GB) for a newer Android flagship, then trade that for a newer iPhone.
          </p>
          <p>The first step actually worked. I managed to exchange my iPhone 5 for a Samsung Galaxy Note 3.</p>
          <p>
            The second step didn&apos;t. I couldn&apos;t trade the Note 3 for an iPhone 6, partly because the Note 3 wasn&apos;t in particularly good condition.
          </p>
          <p>
            Looking back, I had identified a potential difference in how brands were valued, but I hadn&apos;t fully accounted for the condition of the individual device.
          </p>
          <p>
            It was a small, unsuccessful experiment in trading upward — and an early reminder that an apparent price difference doesn&apos;t necessarily translate into a real opportunity.
          </p>
        </Prose>

        <div className="my-12">
          <SmartphoneTradingDiagram />
        </div>

        <Facts
          items={[
            ["Started with", "iPhone 5 (16GB)"],
            ["First exchange", "Samsung Galaxy Note 3 — worked"],
            ["Second exchange", <span key="s" className="text-ember">iPhone 6 — didn&apos;t</span>]
          ]}
        />
      </Section>

      <Section label="Looking back" title="What the experiment revealed.">
        <Entry title="Relative valuation">
          <p>The idea came from observing differences in resale value between Android devices and iPhones.</p>
        </Entry>
        <Entry title="Device condition">
          <p>The Galaxy Note 3&apos;s physical condition affected its practical exchange value.</p>
        </Entry>
        <Entry title="Market frictions">
          <p>An apparent opportunity depends on finding someone willing to accept the proposed trade.</p>
        </Entry>
      </Section>

      <NextRoom href="/research/semiconductors" label="Next area" title="Semiconductors" />
    </PageShell>
  );
}
