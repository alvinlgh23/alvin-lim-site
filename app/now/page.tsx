import type { Metadata } from "next";
import { NextRoom, PageIntro, PageShell } from "@/components/Gallery";
import { NowBoard } from "@/components/site/NowBoard";

export const metadata: Metadata = {
  title: "Now | Alvin Lim",
  description: "What's running, what I'm tracking and reading, and what comes next — a live status board."
};

export default function NowPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Now"
        title="What's running right now."
        lede="A status board, not a bio: the systems in motion, the dates and data I'm watching, and what I want to push next."
      />

      <section data-shortcut="Board" className="mx-auto w-full max-w-[1240px] scroll-mt-24 px-5 md:px-8">
        <div className="border-t border-white/[0.08] pt-8">
          <NowBoard />
        </div>
      </section>

      <NextRoom href="/contact" label="Want to talk about any of it?" title="Contact" />
    </PageShell>
  );
}
