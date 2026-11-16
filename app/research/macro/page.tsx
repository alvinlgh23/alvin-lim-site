import type { Metadata } from "next";
import {
  Entry,
  LinkRow,
  NextRoom,
  NumberedList,
  PageIntro,
  PageShell,
  Prose,
  Section,
  TextLink
} from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Macroeconomics & Monetary Systems | Alvin Lim — A Personal Archive",
  description:
    "Understanding the bigger picture: an exploration of exchange rates, monetary systems, liquidity, and the economic conditions shaping financial markets."
};

export default function MacroeconomicsPage() {
  return (
    <PageShell>
      <PageIntro
        back={{ href: "/research", label: "Research" }}
        eyebrow="Macroeconomics & Monetary Systems"
        title="Understanding the bigger picture."
        lede="An exploration of exchange rates, monetary systems, liquidity, and the economic conditions shaping financial markets."
      />

      <Section label="Two regimes" title="How a central bank steers.">
        <div className="grid gap-10 md:grid-cols-2">
          <Entry meta="Conventional" title="Interest-rate targeting">
            <p>
              Policy instrument: the overnight policy rate (e.g., Fed Funds). Transmission operates primarily through domestic borrowing costs, yield curves, and credit creation.
            </p>
          </Entry>
          <Entry meta="Small open economy · MAS" title="Exchange-rate framework">
            <p>
              Policy instrument: Basket, Band, and Crawl (S$NEER). Because traded goods dominate domestic prices, the trade-weighted exchange rate serves as the primary nominal anchor.
            </p>
          </Entry>
        </div>
        <div className="mt-12">
          <Prose>
            <p>
              When a central bank manages a currency basket within an undisclosed band, independent observers must construct transparent trade-weighted proxies to study exchange-rate pressure while clearly acknowledging what remains unobservable.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="Featured" title="SGD-NEER Shadow Model">
        <Prose>
          <p>
            An independent attempt to understand Singapore&apos;s exchange-rate-based monetary framework by building a geometric trade-weighted SGD index across observable partner currencies and estimating a reference policy band.
          </p>
        </Prose>

        <figure className="m-0 my-12 max-w-[760px]">
          <svg viewBox="0 0 440 190" className="block h-auto w-full" fill="none" role="img" aria-label="A line moving inside a rising policy band">
            <path d="M0 42 L440 18 L440 148 L0 172 Z" fill="#E63600" fillOpacity="0.06" />
            <line x1="0" y1="42" x2="440" y2="18" stroke="#767676" strokeDasharray="4 5" strokeWidth="1" />
            <line x1="0" y1="107" x2="440" y2="83" stroke="#0A0A0A" strokeOpacity="0.55" strokeWidth="1" />
            <line x1="0" y1="172" x2="440" y2="148" stroke="#767676" strokeDasharray="4 5" strokeWidth="1" />
            <path
              d="M0 128 C 40 118, 62 84, 104 92 S 168 132, 214 104 S 286 52, 330 66 S 404 96, 440 58"
              stroke="#E63600"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="440" cy="58" r="4" fill="#E63600" />
          </svg>
          <figcaption className="mt-5 max-w-[60ch] text-sm leading-relaxed text-graphite">
            A crawling exchange-rate band, sketched. The slope is the appreciation crawl; the dashed lines are an estimated corridor. Exact MAS parameters are undisclosed.
          </figcaption>
        </figure>

        <NumberedList
          items={[
            "Trade-weighted geometric index across observable bilateral SGD crosses",
            "Rolling policy center estimation, fixed reference band, and vol-adjusted stress band",
            "A strict distinction between independent proxy weights and undisclosed MAS data"
          ]}
        />
        <LinkRow>
          <TextLink href="/research/sgd-neer">Read the case study</TextLink>
          <TextLink href="/lab/projects/sgd-neer-shadow-model">Open in the lab</TextLink>
          <TextLink href="https://github.com/alvinlgh23/SGD-NEER-shadow-model">GitHub</TextLink>
        </LinkRow>
      </Section>

      <Section label="Notes" title="How macro conditions connect to market structure.">
        <Entry meta="Liquidity" title="Rates, dollar direction & risk appetite">
          <p>
            Long-end Treasury yields, DXY trend, and carry conditions form the first analytical layer in both the Market Valuation Engine and the On-Chain Market Intelligence pipeline.
          </p>
        </Entry>
        <Entry meta="Regional FX" title="Trade weights & Asian export cycles">
          <p>
            Exchange rates in trade-reliant Asian economies interact closely with semiconductor export cycles and cross-border capital flows, explored alongside the KOSPI Signal Monitor.
          </p>
        </Entry>
        <Entry meta="Humility" title="Stating what cannot be known">
          <p>
            Macroeconomic data is noisy and policy rules are often partially opaque. Useful independent models document their proxy assumptions upfront rather than projecting false precision.
          </p>
        </Entry>
      </Section>

      <NextRoom href="/research/markets" label="Next area" title="Markets & Valuation" />
    </PageShell>
  );
}
