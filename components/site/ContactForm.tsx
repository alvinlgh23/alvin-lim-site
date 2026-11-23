"use client";

import { useState } from "react";

const TOPICS = ["Research", "Collaboration", "Other"] as const;
type Topic = (typeof TOPICS)[number];

const PLACEHOLDER: Record<Topic, string> = {
  Research: "Which model or question caught your eye — SGD-NEER, Korea, on-chain, valuation?",
  Collaboration: "What are you building, and where could I help?",
  Other: "Anything at all — internships, a question, or just hello."
};

/* The site is static, so the form composes the email in the visitor's own mail app,
   with the topic and message filled in. Nothing is stored or sent by the site. */
export function ContactForm({ email }: { email: string }) {
  const [topic, setTopic] = useState<Topic>("Research");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[${topic}] ${name ? `from ${name}` : "Hello"}`;
    const body = `${message}\n\n— ${name || "(no name)"}${from ? `\n${from}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[16px] text-[#F7F8F8] placeholder:text-white/30 outline-none transition focus:border-white/35 focus:bg-white/[0.05]";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
      <fieldset>
        <legend className="text-[13px] text-white/45">What would you like to talk about?</legend>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={topic === t}
              onClick={() => setTopic(t)}
              className={`rounded-full px-4 py-2 text-[15px] transition ${
                topic === t ? "bg-[#F7F8F8] text-[#08090A]" : "border border-white/15 bg-white/[0.03] text-white/70 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-white/45">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-white/45">Your email (optional)</span>
          <input value={from} onChange={(e) => setFrom(e.target.value)} type="email" autoComplete="email" className={field} placeholder="So I can reply" />
        </label>
      </div>
      <label className="mt-3 block">
        <span className="mb-1.5 block text-[13px] text-white/45">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder={PLACEHOLDER[topic]}
        />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="rounded-full bg-[#F7F8F8] px-6 py-3 text-[15px] font-medium text-[#08090A] transition hover:bg-white">
          Write the email →
        </button>
        <p className="text-[13px] text-white/40">
          {opened ? "Your email app should be open with the message ready to send." : "Opens your email app with everything filled in."}
        </p>
      </div>
    </form>
  );
}
