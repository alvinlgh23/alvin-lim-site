import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

/* Shared page language for everything outside Chainstox Lab:
   a full-bleed dark hero, a white intro band, then light-grey pages of square white tiles.
   One grotesk, monochrome, no rounded corners. */

const WRAP = "mx-auto w-full max-w-[1600px] px-5 md:px-10";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="site min-h-screen">
      <SiteNav />
      <main className="pb-24">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lede,
  back,
  image,
  imagePosition = "50% 40%",
  children
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  back?: { href: string; label: string };
  image?: string;
  imagePosition?: string;
  children?: ReactNode;
}) {
  return (
    <header>
      <div className="relative flex min-h-[58vh] items-end overflow-hidden bg-[#141414] text-white md:min-h-[68vh]">
        {image ? (
          <>
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-70 motion-safe:animate-[kenburns_22s_ease-out_both]"
              style={{ objectPosition: imagePosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
        )}
        <div className={`${WRAP} relative pb-12 pt-36 md:pb-16`}>
          {back ? (
            <Link href={back.href} className="mb-8 inline-block text-sm text-white/60 transition hover:text-white">
              ← {back.label}
            </Link>
          ) : null}
          <p className="text-sm uppercase tracking-[0.08em] text-white/70">{eyebrow}</p>
          <h1 className="mt-4 max-w-[16ch] text-[2.9rem] font-normal leading-[0.98] tracking-[-0.04em] md:text-[5rem] xl:text-[6.2rem]">
            {title}
          </h1>
        </div>
      </div>
      {lede || children ? (
        <div className="bg-white">
          <div className={`${WRAP} grid gap-8 py-14 md:py-20 lg:grid-cols-12`}>
            <div className="lg:col-span-9">
              {lede ? (
                <p className="max-w-[40ch] text-2xl leading-[1.35] tracking-[-0.015em] text-[#222] md:text-[2.1rem]">{lede}</p>
              ) : null}
              {children}
            </div>
          </div>
        </div>
      ) : null}
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
    <section id={id} className={`${WRAP} scroll-mt-28 pt-16 md:pt-24`}>
      <div className="grid gap-6 border-t border-black/15 pt-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <p className="text-sm uppercase tracking-[0.08em] text-[#555] lg:sticky lg:top-28">{label}</p>
        </div>
        <div className="lg:col-span-9">
          {title ? (
            <h2 className="max-w-[22ch] text-4xl font-normal leading-[1.02] tracking-[-0.035em] md:text-5xl xl:text-[3.6rem]">
              {title}
            </h2>
          ) : null}
          <div className={title ? "mt-10" : ""}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-[64ch] space-y-5 text-lg leading-[1.7] text-[#2A2A2A]">{children}</div>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const className =
    "group inline-flex items-center gap-3 border border-black bg-black px-5 py-3 text-[15px] text-white transition hover:bg-white hover:text-black";
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
  return <div className="mt-10 flex flex-wrap gap-2">{children}</div>;
}

/* A large linked tile: white at rest, inverts on hover. */
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
      className="group mb-2 grid gap-3 bg-white p-6 transition-colors duration-300 last:mb-0 hover:bg-[#111] hover:text-white md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:p-9"
    >
      <div>
        {meta ? <p className="mb-3 text-xs uppercase tracking-[0.08em] text-[#666] group-hover:text-white/55">{meta}</p> : null}
        <h3 className="text-[1.75rem] font-normal leading-tight tracking-[-0.03em] md:text-[2.4rem]">{title}</h3>
        {note ? (
          <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-[#555] group-hover:text-white/65 md:text-lg">{note}</p>
        ) : null}
      </div>
      <span aria-hidden="true" className="text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
        ↗
      </span>
    </Link>
  );
}

export function Entry({ title, meta, children }: { title: ReactNode; meta?: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-2 bg-white p-6 last:mb-0 md:p-9">
      {meta ? <p className="mb-3 text-xs uppercase tracking-[0.08em] text-[#666]">{meta}</p> : null}
      <h3 className="text-2xl font-normal leading-snug tracking-[-0.025em] md:text-[2rem]">{title}</h3>
      {children ? (
        <div className="mt-4 max-w-[64ch] space-y-4 text-base leading-[1.7] text-[#333] md:text-lg">{children}</div>
      ) : null}
    </div>
  );
}

export function Facts({ items }: { items: Array<[string, ReactNode]> }) {
  return (
    <dl className="m-0 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([term, value]) => (
        <div key={term} className="bg-white p-6">
          <dt className="text-xs uppercase tracking-[0.08em] text-[#666]">{term}</dt>
          <dd className="m-0 mt-3 text-lg leading-snug text-[#111]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Quote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <figure className="m-0">
      <blockquote className="m-0 max-w-[26ch] text-4xl leading-[1.12] tracking-[-0.035em] md:text-[3.4rem]">{children}</blockquote>
      {cite ? <figcaption className="mt-6 text-sm uppercase tracking-[0.08em] text-[#666]">{cite}</figcaption> : null}
    </figure>
  );
}

export function NumberedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="m-0 max-w-[70ch] list-none p-0">
      {items.map((item, idx) => (
        <li key={idx} className="mb-2 grid grid-cols-[3rem_1fr] gap-4 bg-white p-5 text-base leading-relaxed text-[#2A2A2A] last:mb-0 md:text-lg">
          <span className="pt-0.5 text-sm text-[#888]">{String(idx + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/* The way on, at the foot of a page: a full-width dark band. */
export function NextRoom({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <div className={`${WRAP} pt-20`}>
      <Link href={href} className="group block bg-[#111] p-8 text-white transition hover:bg-black md:p-14">
        <p className="text-sm uppercase tracking-[0.08em] text-white/50">{label}</p>
        <p className="mt-4 flex items-end justify-between gap-6 text-4xl leading-none tracking-[-0.04em] md:text-7xl">
          <span>{title}</span>
          <span aria-hidden="true" className="text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:text-5xl">
            ↗
          </span>
        </p>
      </Link>
    </div>
  );
}

export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
};

export function PhotoRow({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <div className="grid items-start gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure key={photo.src} className="group m-0 bg-white">
          <div className="overflow-hidden">
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              className="block aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
          {photo.caption ? <figcaption className="p-4 text-sm leading-relaxed text-[#444]">{photo.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export function Plate({ photo }: { photo: GalleryPhoto }) {
  const portrait = photo.height >= photo.width * 0.9;
  return (
    <figure className={`group m-0 bg-white ${portrait ? "max-w-[520px]" : "max-w-[1000px]"}`}>
      <div className="overflow-hidden">
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      {photo.caption ? <figcaption className="max-w-[70ch] p-4 text-sm leading-relaxed text-[#444]">{photo.caption}</figcaption> : null}
    </figure>
  );
}
