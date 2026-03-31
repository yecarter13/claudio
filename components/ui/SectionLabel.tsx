"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.span
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      className="font-accent inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-light)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
      {children}
    </motion.span>
  );
}
