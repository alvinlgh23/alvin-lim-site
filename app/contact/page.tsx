import type { Metadata } from "next";
import { PageIntro, PageShell, Section } from "@/components/Gallery";
import { VERIFIED_DESTINATIONS } from "@/lib/archive-data";

export const metadata: Metadata = {
  title: "Contact | Alvin Lim — A Personal Archive",
  description:
    "Let's get in touch. If you'd like to talk about research, technology, a project, or something interesting, feel free to reach out."
};

const linkedinHandle = VERIFIED_DESTINATIONS.linkedinProfile.replace(/^https?:\/\/(www\.)?/, "");

const CHANNELS = [
  { label: "LinkedIn", value: linkedinHandle, href: VERIFIED_DESTINATIONS.linkedinProfile },
  { label: "GitHub", value: "github.com/alvinlgh23", href: VERIFIED_DESTINATIONS.githubProfile }
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Contact"
        title="Let's get in touch."
        lede="If you'd like to talk about research, technology, a project, or something interesting, feel free to reach out."
      >
        <a
          href={`mailto:${VERIFIED_DESTINATIONS.email}`}
          className="editorial-serif mt-12 inline-block border-b-2 border-ink pb-2 text-3xl tracking-[-0.02em] text-ink transition-colors hover:border-ember hover:text-ember sm:text-4xl md:text-6xl"
        >
          {VERIFIED_DESTINATIONS.email}
        </a>
      </PageIntro>

      <Section label="Elsewhere">
        {CHANNELS.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-2 border-t border-rule py-7 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[14rem_1fr_auto] md:items-baseline md:gap-8"
          >
            <span className="editorial-serif text-3xl tracking-[-0.015em] transition-colors group-hover:text-ember md:text-4xl">
              {channel.label}
            </span>
            <span className="break-all text-base text-graphite md:text-lg">{channel.value}</span>
            <span aria-hidden="true" className="hidden text-lg text-muted transition-transform duration-300 group-hover:translate-x-1 md:block">
              ↗
            </span>
          </a>
        ))}
      </Section>

      <Section label="Good to talk about">
        <p className="editorial-serif max-w-[34ch] text-3xl leading-[1.3] tracking-[-0.012em] text-charcoal md:text-4xl">
          Market structure and valuation, semiconductors and hardware, macro and FX frameworks, analytical tools, and academic collaborations.
        </p>
      </Section>
    </PageShell>
  );
}
