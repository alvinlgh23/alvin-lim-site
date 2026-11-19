import type { Metadata } from "next";
import { LinkRow, NextRoom, PageIntro, PageShell, Prose, Section, TextLink } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Now | Alvin Lim — A Personal Archive",
  description: "Current projects, academic focus at Universiti Malaya, and active research directions."
};

export default function NowPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Now"
        title="What I'm focused on right now."
        lede="A snapshot of current study, active research, and what comes next."
      />

      <Section label="Study" title="Economics at Universiti Malaya">
        <Prose>
          <p>
            Studying economics at the Faculty of Business and Economics, Universiti Malaya — focusing on incentives, market structure, monetary institutions, and resource allocation. Expected to graduate in 2028.
          </p>
        </Prose>
        <LinkRow>
          <TextLink href="/archive/education">Education & Direction</TextLink>
        </LinkRow>
      </Section>

      <Section label="Lab" title="Chainstox Lab research systems">
        <Prose>
          <p>
            Refining the Market Valuation Engine, On-Chain Market Intelligence pipeline, and SGD-NEER Shadow Model to test market expectations and liquidity conditions.
          </p>
        </Prose>
        <LinkRow>
          <TextLink href="/research">Research collection</TextLink>
          <TextLink href="/lab">Chainstox Lab</TextLink>
        </LinkRow>
      </Section>

      <Section label="Next" title="Semiconductor industry & architecture">
        <Prose>
          <p>
            Organizing research notes on mobile SoC evolution, chip architecture trade-offs, and the industrial economics of leading-edge semiconductor manufacturing.
          </p>
        </Prose>
        <LinkRow>
          <TextLink href="/research/semiconductors">Semiconductor research</TextLink>
        </LinkRow>
      </Section>

      <Section label="Elsewhere" title="Classical guitar & field notes">
        <Prose>
          <p>
            Continuing regular classical guitar practice and documenting field observations across cities, architecture, and everyday systems.
          </p>
        </Prose>
        <LinkRow>
          <TextLink href="/archive/elsewhere">Elsewhere</TextLink>
        </LinkRow>
      </Section>

      <NextRoom href="/contact" label="Want to talk about any of it?" title="Contact" />
    </PageShell>
  );
}
