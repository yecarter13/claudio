"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface StickerProps {
  children: ReactNode;
  className?: string;   // position absolue : "top-8 right-4", etc.
  delay?: number;
  rotate?: number;      // rotation en degrés
  floatY?: number;      // amplitude du float vertical (px)
}

/**
 * Sticker décoratif flottant — style badge/pill.
 * Positionné en absolu dans un parent `relative overflow-visible`.
 * Caché sur mobile (hidden md:flex) pour ne pas gêner le layout.
 */
export function Sticker({ children, className = "", delay = 0, rotate = -6, floatY = 10 }: StickerProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 8 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute hidden select-none md:flex ${className}`}
      style={{ zIndex: 10 }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -floatY, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
