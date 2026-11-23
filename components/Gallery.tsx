import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

/* Shared page language for everything outside Chainstox Lab, in a Linear/Vercel register:
   a near-black canvas, large tight type, quiet greys, hairline borders, soft rounded panels. */

const WRAP = "mx-auto w-full max-w-[1240px] px-5 md:px-8";
const PANEL = "rounded-2xl border border-white/[0.08] bg-white/[0.025]";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="site min-h-screen">
      <SiteNav />
      <main className="pb-28">{children}</main>
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
    <header className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_65%)]"
      />
      <div className={`${WRAP} relative pb-16 pt-16 md:pb-20 md:pt-28`}>
        {back ? (
          <Link href={back.href} className="mb-8 flex w-fit items-center gap-2 text-sm text-white/50 transition hover:text-white">
            ← {back.label}
          </Link>
        ) : null}
        <p className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[13px] text-white/65">{eyebrow}</p>
        <h1 className="mt-6 max-w-[18ch] text-[2.75rem] font-medium leading-[1.02] tracking-[-0.045em] text-[#F7F8F8] md:text-[4.5rem] xl:text-[5.25rem]">
          {title}
        </h1>
        {lede ? <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-white/60 md:text-xl">{lede}</p> : null}
        {children}
        {image ? (
          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute -inset-x-10 -top-10 bottom-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className={`${PANEL} relative overflow-hidden p-1.5`}>
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="block h-[min(52vh,520px)] w-full rounded-[12px] object-cover"
                style={{ objectPosition: imagePosition }}
              />
            </div>
          </div>
        ) : null}
      </div>
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
    <section id={id} className={`${WRAP} scroll-mt-24 pt-16 md:pt-24`}>
      <div className="grid gap-6 border-t border-white/[0.08] pt-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <p className="text-[13px] font-medium text-white/45 lg:sticky lg:top-24">{label}</p>
        </div>
        <div className="lg:col-span-9">
          {title ? (
            <h2 className="max-w-[24ch] text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-[#F7F8F8] md:text-[2.75rem]">
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
  return <div className="max-w-[64ch] space-y-5 text-[17px] leading-[1.75] text-white/68">{children}</div>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const className =
    "group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[15px] text-[#F7F8F8] transition hover:border-white/30 hover:bg-white/[0.08]";
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="text-white/50 transition-transform duration-300 group-hover:translate-x-0.5">
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
  return <div className="mt-9 flex flex-wrap gap-2">{children}</div>;
}

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
      className={`${PANEL} group mb-3 grid gap-3 p-6 transition duration-300 last:mb-0 hover:border-white/20 hover:bg-white/[0.05] md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:p-8`}
    >
      <div>
        {meta ? <p className="mb-3 text-[13px] text-white/45">{meta}</p> : null}
        <h3 className="text-2xl font-medium leading-tight tracking-[-0.03em] text-[#F7F8F8] md:text-[1.9rem]">{title}</h3>
        {note ? <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-white/55">{note}</p> : null}
      </div>
      <span aria-hidden="true" className="text-xl text-white/40 transition duration-300 group-hover:translate-x-1 group-hover:text-white">
        →
      </span>
    </Link>
  );
}

export function Entry({ title, meta, children }: { title: ReactNode; meta?: ReactNode; children?: ReactNode }) {
  return (
    <div className={`${PANEL} mb-3 p-6 last:mb-0 md:p-8`}>
      {meta ? <p className="mb-3 text-[13px] text-white/45">{meta}</p> : null}
      <h3 className="text-xl font-medium leading-snug tracking-[-0.025em] text-[#F7F8F8] md:text-[1.6rem]">{title}</h3>
      {children ? <div className="mt-4 max-w-[64ch] space-y-4 text-base leading-[1.75] text-white/62">{children}</div> : null}
    </div>
  );
}

export function Facts({ items }: { items: Array<[string, ReactNode]> }) {
  return (
    <dl className="m-0 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([term, value]) => (
        <div key={term} className={`${PANEL} p-5`}>
          <dt className="text-[13px] text-white/45">{term}</dt>
          <dd className="m-0 mt-2 text-[17px] leading-snug text-[#F7F8F8]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Quote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <figure className="m-0">
      <blockquote className="m-0 max-w-[28ch] text-3xl font-medium leading-[1.2] tracking-[-0.035em] text-[#F7F8F8] md:text-[2.6rem]">
        {children}
      </blockquote>
      {cite ? <figcaption className="mt-6 text-sm text-white/45">{cite}</figcaption> : null}
    </figure>
  );
}

export function NumberedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="m-0 max-w-[70ch] list-none p-0">
      {items.map((item, idx) => (
        <li key={idx} className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-white/[0.08] py-4 text-base leading-relaxed text-white/68 first:border-t-0 first:pt-0">
          <span className="pt-0.5 font-mono text-[13px] text-white/35">{String(idx + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function NextRoom({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <div className={`${WRAP} pt-20`}>
      <Link href={href} className={`${PANEL} group block p-8 transition hover:border-white/20 hover:bg-white/[0.05] md:p-12`}>
        <p className="text-[13px] text-white/45">{label}</p>
        <p className="mt-3 flex items-end justify-between gap-6 text-3xl font-medium leading-none tracking-[-0.04em] text-[#F7F8F8] md:text-6xl">
          <span>{title}</span>
          <span aria-hidden="true" className="text-2xl text-white/40 transition group-hover:translate-x-1 group-hover:text-white md:text-4xl">
            →
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
    <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure key={photo.src} className={`${PANEL} group m-0 overflow-hidden p-1.5`}>
          <div className="overflow-hidden rounded-[12px]">
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              className="block aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          {photo.caption ? <figcaption className="px-3 pb-2 pt-3 text-sm leading-relaxed text-white/55">{photo.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export function Plate({ photo }: { photo: GalleryPhoto }) {
  const portrait = photo.height >= photo.width * 0.9;
  return (
    <figure className={`${PANEL} group m-0 overflow-hidden p-1.5 ${portrait ? "max-w-[460px]" : "max-w-[860px]"}`}>
      <div className="overflow-hidden rounded-[12px]">
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
      {photo.caption ? <figcaption className="max-w-[70ch] px-3 pb-2 pt-3 text-sm leading-relaxed text-white/55">{photo.caption}</figcaption> : null}
    </figure>
  );
}
