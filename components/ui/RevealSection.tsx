"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

const stagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function RevealSection({
  id,
  className,
  style,
  children,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? "visible" : "hidden"}
      animate={reduced || isInView ? "visible" : "hidden"}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}
