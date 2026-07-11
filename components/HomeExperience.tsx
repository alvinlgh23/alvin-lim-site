"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

function Appear({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, ease }}
    >
      {children}
    </motion.div>
  );
}

function PhotoSlot({ label, note, className = "" }: { label: string; note: string; className?: string }) {
  return (
    <motion.figure className={`personal-photo ${className}`} whileHover={{ y: -3, rotate: -0.25 }} transition={{ duration: 0.2 }}>
      <div className="personal-photo-mark" aria-hidden="true">+</div>
      <div className="personal-photo-label">{label}</div>
      <figcaption>{note}</figcaption>
    </motion.figure>
  );
}

export function HomeExperience() {
  return (
    <main className="personal-shell">
      <nav className="personal-nav" aria-label="Main navigation">
        <Link className="personal-name" href="/">Alvin Lim</Link>
        <div>
          <a href="#about">About</a>
          <a href="#places">Places</a>
          <Link href="/lab">Chainstox Lab ↗</Link>
        </div>
      </nav>

      <header className="personal-hero" id="about">
        <Appear>
          <p className="personal-kicker">Personal homepage / assorted evidence</p>
          <h1>Hi, I’m Alvin.</h1>
          <p className="personal-intro">I study economics, make market tools, and have spent a surprising amount of time backstage.</p>
        </Appear>
        <Appear className="personal-hero-note">
          <span>Currently in here:</span>
          law, economics, concerts, a music video, Atlantic City, and several browser tabs that became projects.
        </Appear>
      </header>

      <section className="personal-section personal-turning-point">
        <Appear className="personal-number">01</Appear>
        <Appear className="personal-story">
          <p className="personal-label">A change of subject</p>
          <h2>I started in law.<br />That did not last.</h2>
          <p>Economics made more sense, so I moved over. It gave me a useful way to ask why people, businesses, and markets do what they do.</p>
        </Appear>
        <Appear className="personal-side-note">No dramatic pivot.<br />Just a different course.</Appear>
      </section>

      <section className="personal-section personal-events">
        <Appear className="personal-section-heading">
          <p className="personal-label">Concerts & events</p>
          <h2>Meanwhile, behind the stage…</h2>
          <p>At some point, I started working behind concerts and events. Different venue. Different crowd. Same last-minute chaos.</p>
        </Appear>
        <div className="personal-photo-strip" aria-label="Event photo placeholders">
          <PhotoSlot label="EVENT CREW PHOTO" note="Setup, before doors open" className="photo-tall photo-blue" />
          <PhotoSlot label="BACKSTAGE PHOTO" note="The part the crowd does not see" className="photo-wide photo-red" />
          <PhotoSlot label="LIVE OPERATIONS" note="Somewhere between soundcheck and showtime" className="photo-tall photo-yellow" />
          <PhotoSlot label="PASS / WORK MATERIAL" note="Keep the bits that prove you were there" className="photo-square photo-green" />
        </div>
        <p className="personal-scroll-note">← swipe through the shift →</p>
      </section>

      <section className="personal-section personal-mv">
        <Appear className="personal-mv-copy">
          <p className="personal-label">One slightly odd detour</p>
          <h2>I also ended up as an extra in a music video.</h2>
          <p>No larger explanation. That just happened.</p>
        </Appear>
        <div className="personal-mv-grid">
          <PhotoSlot label="MV STILL" note="Frame from the finished video" className="photo-wide photo-purple" />
          <PhotoSlot label="SET PHOTO" note="Waiting around is part of filming" className="photo-square photo-orange" />
          <PhotoSlot label="BEHIND THE SCENES" note="People making a scene look normal" className="photo-wide photo-blue" />
        </div>
      </section>

      <section className="personal-section personal-america" id="places">
        <Appear className="personal-section-heading">
          <p className="personal-label">Atlantic City, USA</p>
          <h2>Work, long walks, then the laptop.</h2>
          <p>I went to Atlantic City for Work & Travel. Most days involved shifts, walking to work, and trying to stay awake long enough to open my laptop afterward.</p>
        </Appear>
        <div className="personal-america-grid">
          <PhotoSlot label="ATLANTIC CITY" note="A normal day off" className="photo-large photo-yellow" />
          <PhotoSlot label="THE WALK TO WORK" note="A route that became very familiar" className="photo-tall photo-green" />
          <PhotoSlot label="DAILY LIFE / COWORKERS" note="The less postcard-like parts" className="photo-wide photo-red" />
        </div>
      </section>

      <section className="personal-section personal-projects">
        <Appear className="personal-project-copy">
          <p className="personal-label">Markets & systems</p>
          <h2>I kept asking why markets moved the way they did.</h2>
          <p>Eventually, answering the questions manually became annoying. So I started building systems.</p>
          <p className="personal-small">A few scripts became dashboards, reports, and working tools. They live separately from this page.</p>
          <Link className="personal-button" href="/lab">Open Chainstox Lab <span>→</span></Link>
        </Appear>
        <PhotoSlot label="REAL PROJECT SCREENSHOT" note="Replace with a screenshot from Chainstox Lab" className="photo-project photo-ink" />
      </section>

      <aside className="personal-guitar">
        <span className="personal-guitar-icon" aria-hidden="true">♪</span>
        <div><strong>One more thing:</strong> I picked up classical guitar. Later, I passed Trinity Grade 5 with Distinction.</div>
        <span className="personal-guitar-note">That is the whole guitar section.</span>
      </aside>

      <footer className="personal-footer">
        <p>That’s the current archive.</p>
        <div><Link href="/lab">Lab</Link><Link href="/now">Now</Link><Link href="/thoughts">Thoughts</Link><Link href="/journey">Journey</Link></div>
        <p className="personal-footer-small">Made by Alvin, with an unreasonable number of tabs open.</p>
      </footer>
    </main>
  );
}
