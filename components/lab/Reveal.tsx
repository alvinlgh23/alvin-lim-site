"use client";

import { motion } from "framer-motion";

/* Section entrance: rise out of a soft blur as it scrolls into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  id,
  shortcut
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  /** Label for number-key navigation. */
  shortcut?: string;
}) {
  return (
    <motion.section
      id={id}
      data-shortcut={shortcut}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
