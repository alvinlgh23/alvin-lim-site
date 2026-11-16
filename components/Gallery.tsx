import Link from "next/link";
import type { ReactNode } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { MuseumFooter } from "@/components/MuseumFooter";

/* Shared page language for everything outside the home exhibition:
   one white wall, a very large title, ruled sections, and plain rows instead of cards. */

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <GlobalNav />
      <main className="mx-auto max-w-[1280px] px-6 pb-28 md:px-12">{children}</main>
      <MuseumFooter />
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lede,
  back,
  children
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  back?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <header className="pb-16 pt-14 md:pb-24 md:pt-20">
      {back ? (
        <Link
          href={back.href}
          className="archival-mono mb-10 inline-block text-xs text-muted transition-colors hover:text-ink"
        >
          ← {back.label}
        </Link>
      ) : null}
      <p className="archival-mono text-xs text-ember">{eyebrow}</p>
      <h1 className="editorial-serif mt-5 max-w-[17ch] text-[3.1rem] font-normal leading-[0.96] tracking-[-0.03em] md:text-[5.5rem] xl:text-[7rem]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-9 max-w-[46ch] text-xl leading-relaxed text-charcoal md:text-2xl">{lede}</p>
      ) : null}
      {children}
    </header>
  );
}

export function Section({
  label,
  title,
  id,
  children
}: {
  label: string;
  title?: ReactNode;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="grid scroll-mt-24 gap-6 border-t border-ink py-12 md:py-16 lg:grid-cols-12 lg:gap-10"
    >
      <div className="lg:col-span-3">
        <p className="archival-mono text-xs text-ember lg:sticky lg:top-24">{label}</p>
      </div>
      <div className="lg:col-span-9">
        {title ? (
          <h2 className="editorial-serif max-w-[22ch] text-4xl font-normal leading-[1.04] tracking-[-0.022em] md:text-5xl xl:text-[3.5rem]">
            {title}
          </h2>
        ) : null}
        <div className={title ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[62ch] space-y-5 text-lg leading-[1.75] text-charcoal">{children}</div>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const className =
    "group inline-flex items-center gap-3 border-b border-ink/40 pb-1.5 text-base font-medium text-ink transition-colors hover:border-ember hover:text-ember";
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        {external ? "↗" : "→"}
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function LinkRow({ children }: { children: ReactNode }) {
  return <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">{children}</div>;
}

/* A large linked row: the replacement for a card. */
export function IndexRow({
  href,
  title,
  note,
  meta
}: {
  href: string;
  title: ReactNode;
  note?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group grid gap-3 border-t border-rule py-8 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[1fr_auto] md:items-baseline md:gap-12"
    >
      <div>
        <h3 className="editorial-serif text-3xl font-normal leading-tight tracking-[-0.015em] transition-colors group-hover:text-ember md:text-[2.5rem]">
          {title}
        </h3>
        {note ? (
          <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-graphite md:text-lg">{note}</p>
        ) : null}
      </div>
      <span className="archival-mono flex items-center gap-3 text-xs text-muted transition-colors group-hover:text-ink">
        {meta}
        <span aria-hidden="true" className="text-base transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

/* A plain titled entry inside a section (no link on the whole row). */
export function Entry({
  title,
  meta,
  children
}: {
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-t border-rule py-8 first:border-t-0 first:pt-0 last:pb-0">
      {meta ? <p className="archival-mono mb-3 text-xs text-muted">{meta}</p> : null}
      <h3 className="editorial-serif text-2xl font-normal leading-snug tracking-[-0.012em] md:text-3xl">
        {title}
      </h3>
      {children ? (
        <div className="mt-3 max-w-[62ch] space-y-4 text-base leading-[1.75] text-charcoal md:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function Facts({ items }: { items: Array<[string, ReactNode]> }) {
  return (
    <dl className="m-0 grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([term, value]) => (
        <div key={term}>
          <dt className="archival-mono text-xs text-muted">{term}</dt>
          <dd className="m-0 mt-2 text-base leading-relaxed text-ink md:text-lg">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Quote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <figure className="m-0">
      <blockquote className="editorial-serif m-0 max-w-[24ch] text-4xl italic leading-[1.18] tracking-[-0.015em] md:text-5xl">
        {children}
      </blockquote>
      {cite ? <figcaption className="archival-mono mt-6 text-xs text-muted">{cite}</figcaption> : null}
    </figure>
  );
}

export function NumberedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="m-0 max-w-[66ch] list-none p-0">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-rule py-4 text-base leading-relaxed text-charcoal first:border-t-0 first:pt-0 md:text-lg"
        >
          <span className="archival-mono pt-1 text-xs text-ember">{String(idx + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/* The door to the next room, at the foot of a page. */
export function NextRoom({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <Link href={href} className="group mt-4 block border-t-2 border-ink pt-10">
      <p className="archival-mono text-xs text-muted">{label}</p>
      <p className="editorial-serif mt-3 flex items-baseline gap-5 text-5xl font-normal leading-none tracking-[-0.03em] transition-colors group-hover:text-ember md:text-7xl">
        <span>{title}</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </p>
    </Link>
  );
}
