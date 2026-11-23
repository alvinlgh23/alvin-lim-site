"use client";

import { useState } from "react";

/* Click-to-play YouTube: only a poster and a button until the visitor asks for the video,
   so the page stays light on a phone. Uses the privacy-enhanced (no-cookie) player. */
export function YouTubeEmbed({ id, title, duration }: { id: string; title: string; duration?: string }) {
  const [playing, setPlaying] = useState(false);
  const [poster, setPoster] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);

  return (
    <figure className="m-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1.5">
      <div className="relative aspect-video overflow-hidden rounded-[12px] bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onLoad={(e) => {
                // YouTube serves a 120px grey placeholder when the HD poster does not exist yet
                if (e.currentTarget.naturalWidth < 200 && poster.includes("maxres")) setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
              }}
              onError={() => setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
              className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-[0_0_40px_rgba(255,255,255,0.35)] transition group-hover:scale-105 group-hover:bg-white">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden="true">
                <path d="M7 5v14l12-7z" fill="currentColor" />
              </svg>
            </span>
            {duration ? (
              <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-[13px] text-white">{duration}</span>
            ) : null}
          </button>
        )}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 pb-2 pt-3 text-sm text-white/55">
        <span>{title}</span>
        <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer" className="text-white/45 transition hover:text-white">
          Watch on YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}
