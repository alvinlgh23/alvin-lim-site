import type { Metadata } from "next";
import {
  Entry,
  IndexRow,
  LinkRow,
  NextRoom,
  PageIntro,
  PageShell,
  Prose,
  Quote,
  Section,
  TextLink
} from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Research Collection | Alvin Lim — A Personal Archive",
  description: "Research into technology, markets, and the systems connecting them."
};

export default function ResearchCollectionPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Research"
        title="Curiosity leads. Evidence decides."
        lede="Research into technology, markets, and the systems connecting them."
      />

      <Section label="Approach">
        <Prose>
          <p>
            My research often begins with curiosity about a technology, an industry, or a change that might reshape how things work.
          </p>
          <p>
            I usually start by understanding the technology or industry itself, then explore its commercial implications and how markets are valuing those possibilities.
          </p>
          <p>
            Sometimes, the process begins the other way around — with an instinct that something may be mispriced.
          </p>
          <p>
            In either case, I try to move beyond the initial impression, investigate the evidence, challenge my assumptions, and revise my view when necessary.
          </p>
        </Prose>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Entry meta="Bottom-up" title="Technology → Industry → Valuation">
            <p>
              Start with a hardware or technical shift, trace its commercial implications, and examine how markets price those possibilities.
            </p>
          </Entry>
          <Entry meta="Top-down" title="Price signal → Evidence → Revision">
            <p>
              Start with a market price or regime that seems difficult to explain, test the underlying assumptions, and revise when evidence disagrees.
            </p>
          </Entry>
        </div>
      </Section>

      <Section label="Areas" title="Three connected domains.">
        <IndexRow
          href="/research/semiconductors"
          title="Technology & Semiconductors"
          note="Chip architecture, computing technologies, technical progress, and their wider industrial implications."
          meta="In progress"
        />
        <IndexRow
          href="/research/markets"
          title="Markets & Valuation"
          note="Understanding market expectations, business fundamentals, risk, and the relationship between price and value."
          meta="Equities · Crypto"
        />
        <IndexRow
          href="/research/macro"
          title="Macroeconomics & Monetary Systems"
          note="Exchange rates, monetary frameworks, liquidity, and the forces shaping economic conditions."
          meta="FX · Liquidity"
        />
      </Section>

      <Section label="Case studies" title="Selected work.">
        <IndexRow
          href="/research/market-valuation"
          title="Market Valuation Engine"
          note="Exploring market conditions, valuation, and the signals that shape risk and expectations across macro liquidity, sector rotation, and positioning heat."
          meta="Markets"
        />
        <IndexRow
          href="/research/onchain-intelligence"
          title="On-Chain Market Intelligence"
          note="Investigating liquidity, capital flows, and market structure through on-chain data, holder cohort behavior, and explainable regime classification."
          meta="Crypto"
        />
        <IndexRow
          href="/research/sgd-neer"
          title="SGD-NEER Shadow Model"
          note="An independent attempt to understand Singapore's exchange-rate-based monetary framework through a transparent trade-weighted proxy basket."
          meta="Macro"
        />
        <IndexRow
          href="/research/markets#trade-my-way-up"
          title="Could I trade my way up?"
          note="A second-hand smartphone trading experiment, and what it taught me about price and value."
          meta="Field experiment"
        />
      </Section>

      <Section label="Note">
        <Quote>Intuition first. Evidence next.</Quote>
        <div className="mt-8">
          <Prose>
            <p>
              My earliest judgments about value came from familiarity rather than formal models. Today, intuition can still give me a starting point, but I try to understand why a judgment might be right — and what could prove it wrong.
            </p>
          </Prose>
        </div>
        <LinkRow>
          <TextLink href="/thoughts">More notes</TextLink>
        </LinkRow>
      </Section>

      <NextRoom href="/lab" label="Where the research becomes working systems" title="Chainstox Lab" />
    </PageShell>
  );
}
