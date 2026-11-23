"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* Quiet keyboard navigation for the whole site.
   1–9 jump to the page's sections (anything marked data-shortcut, in order),
   G then H/R/L/N/C go to Home, Research, Lab, Now, Contact, and ? shows this list. */

const PAGES: Record<string, [string, string]> = {
  h: ["/", "Home"],
  r: ["/research", "Research"],
  l: ["/lab", "Lab"],
  n: ["/now", "Now"],
  c: ["/contact", "Contact"]
};

function sections() {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-shortcut]")).slice(0, 9);
}

export function Shortcuts() {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [flash, setFlash] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let pendingG = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;

      if (e.key === "?") {
        setLabels(sections().map((s) => s.dataset.shortcut || ""));
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key.toLowerCase() === "g") {
        pendingG = Date.now();
        return;
      }
      const page = PAGES[e.key.toLowerCase()];
      if (page && Date.now() - pendingG < 1200) {
        pendingG = 0;
        router.push(page[0]);
        return;
      }
      if (/^[1-9]$/.test(e.key)) {
        const list = sections();
        const target = list[Number(e.key) - 1];
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        setFlash(`${e.key} · ${target.dataset.shortcut}`);
        window.setTimeout(() => setFlash(null), 1100);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <>
      <AnimatePresence>
        {flash ? (
          <motion.div
            key={flash}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-white/15 bg-[#111214]/90 px-4 py-1.5 font-sans text-[13px] text-white/85 backdrop-blur-md"
          >
            {flash}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="help"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-5 font-sans backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
          >
            <motion.div
              initial={{ y: 12, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0E0F10] p-6 text-[#F7F8F8] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[15px] font-medium">Keyboard shortcuts</p>
              <p className="mt-5 text-[12px] text-white/40">On this page</p>
              <ul className="mt-2 space-y-1.5 text-[14px]">
                {labels.length ? (
                  labels.map((l, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-white/70">{l}</span>
                      <kbd className="rounded-md border border-white/15 bg-white/[0.05] px-2 py-0.5 font-mono text-[12px]">{i + 1}</kbd>
                    </li>
                  ))
                ) : (
                  <li className="text-white/40">No sections here.</li>
                )}
              </ul>
              <p className="mt-5 text-[12px] text-white/40">Go to</p>
              <ul className="mt-2 space-y-1.5 text-[14px]">
                {Object.entries(PAGES).map(([k, [, label]]) => (
                  <li key={k} className="flex items-center justify-between">
                    <span className="text-white/70">{label}</span>
                    <span className="font-mono text-[12px]">
                      <kbd className="rounded-md border border-white/15 bg-white/[0.05] px-2 py-0.5">G</kbd>{" "}
                      <kbd className="rounded-md border border-white/15 bg-white/[0.05] px-2 py-0.5">{k.toUpperCase()}</kbd>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[12px] text-white/35">Press ? or Esc to close.</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
