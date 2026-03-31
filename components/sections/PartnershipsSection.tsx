"use client";
import { motion } from "framer-motion";
import { Handshake, ArrowRight } from "lucide-react";
import { PARTNERS } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { Sticker } from "@/components/ui/Sticker";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };

export function PartnershipsSection() {
  const { t } = useI18n();
  return (
    <RevealSection id="partenariats" className="relative overflow-visible py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>

      {/* ── Stickers décoratifs ── */}

      {/* Grand sticker photo — Claudio avec Tecno (style Polaroid) */}
      <Sticker className="right-4 top-8 lg:right-12 xl:right-24" delay={0.1} rotate={4} floatY={10}>
        <div className="w-40 overflow-hidden rounded-2xl border-4 border-[var(--bg-card)] bg-[var(--bg-card)] shadow-xl lg:w-48">
          <img src="/partenaires-tecno.jpeg" alt="Claudio x Tecno" className="h-40 w-full object-cover object-top lg:h-48" />
          <div className="px-2 py-1.5 text-center">
            <p className="font-accent text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Claudio × Tecno</p>
          </div>
        </div>
      </Sticker>

      {/* 1xBet sticker logo */}
      <Sticker className="bottom-20 right-6 lg:right-16" delay={0.4} rotate={-5} floatY={8}>
        <div className="flex items-center gap-2 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] px-4 py-2.5 shadow-lg">
          <img src="/1xbet.png" alt="1xBet" className="h-7 w-auto object-contain" />
          <div>
            <p className="font-accent text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Sponsor</p>
            <p className="font-display text-xs font-bold text-[var(--text-primary)]">1xBet</p>
          </div>
        </div>
      </Sticker>

      {/* Badge "Collaboration" */}
      <Sticker className="-left-2 top-16 lg:left-4" delay={0.3} rotate={-8} floatY={14}>
        <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-light)] px-4 py-2.5 shadow-md">
          <p className="font-accent text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Collab ✓
          </p>
        </div>
      </Sticker>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>{t.partners.label}</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          {t.partners.heading}{" "}
          <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">{t.partners.accent}</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">{t.partners.sub}</motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <motion.article key={partner.name} variants={fadeUp} whileHover={{ y: -5 }} transition={{ duration: 0.25 }}
              className="rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 transition-all hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-hover)]"
              style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="mb-5 flex h-12 items-center">
                <img src={partner.logo} alt={`Logo ${partner.name}`} loading="lazy" className="h-9 object-contain" />
              </div>
              <span className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--accent-light)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{partner.category}</span>
              <h3 className="font-display mt-3 text-xl font-bold text-[var(--text-primary)]">{partner.name}</h3>
              <p className="font-accent mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-2)]">{partner.type}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{partner.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="mb-4 text-[var(--text-secondary)]">
            {t.lang === "fr" ? "Vous souhaitez collaborer avec Claudio ?" : "Want to collaborate with Claudio?"}
          </p>
          <a href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-[0_4px_20px_var(--glow)]"
            aria-label={t.partners.cta}>
            <Handshake className="h-4 w-4" aria-hidden="true" />
            {t.partners.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </RevealSection>
  );
}
