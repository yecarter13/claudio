"use client";
import { motion } from "framer-motion";
import { Handshake, ArrowRight } from "lucide-react";
import { PARTNERS } from "@/lib/data";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };

export function PartnershipsSection() {
  return (
    <RevealSection id="partenariats" className="relative py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>PARTENARIATS</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          Ils m'ont fait{" "}
          <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">confiance.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          Des collaborations authentiques avec des marques qui partagent mes valeurs.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <motion.article key={partner.name} variants={fadeUp}
              whileHover={{ y: -5 }} transition={{ duration: 0.25 }}
              className="rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 transition-all hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-hover)]"
              style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="mb-5 flex h-12 items-center">
                <img src={partner.logo} alt={`Logo ${partner.name}`} loading="lazy" className="h-9 object-contain" />
              </div>
              <span className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--accent-light)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                {partner.category}
              </span>
              <h3 className="font-display mt-3 text-xl font-bold text-[var(--text-primary)]">{partner.name}</h3>
              <p className="font-accent mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-2)]">{partner.type}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{partner.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="mb-4 text-[var(--text-secondary)]">Vous souhaitez collaborer avec Claudio ?</p>
          <a href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-[0_4px_20px_var(--glow)]"
            aria-label="Proposer un partenariat">
            <Handshake className="h-4 w-4" aria-hidden="true" />
            Proposer un Partenariat
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </RevealSection>
  );
}
