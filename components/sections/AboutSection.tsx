"use client";
import { motion } from "framer-motion";
import { Target, Rocket, MapPin } from "lucide-react";
import { ABOUT } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp   = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: E } } };
const stagger  = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export function AboutSection() {
  const { t } = useI18n();
  return (
    <RevealSection id="about" className="relative py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>{t.about.label}</SectionLabel>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div variants={fadeLeft} className="relative">
            <div className="overflow-hidden rounded-2xl border border-[var(--border-card)] shadow-[var(--shadow-card)]">
              <img src={ABOUT.photo} alt="Portrait de Claudio Njalla" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white shadow">
              <MapPin className="h-3 w-3" aria-hidden="true" />Cameroun
            </span>
          </motion.div>
          <motion.div variants={stagger} className="space-y-8">
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
                {t.about.heading}{" "}
                <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">{t.about.name}</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">{ABOUT.shortBio}</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="font-accent mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{t.about.parcours}</h3>
              <div className="relative space-y-3 border-l-2 border-[var(--border-subtle)] pl-5">
                {ABOUT.parcours.map((item) => (
                  <div key={item.year} className="relative">
                    <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-secondary)]" />
                    <span className="font-accent text-xs font-semibold text-[var(--accent)]">{item.year}</span>
                    <p className="text-sm text-[var(--text-secondary)]">{item.event}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
                <p className="font-accent mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                  <Target className="h-3.5 w-3.5" aria-hidden="true" />{t.about.vision}
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{ABOUT.vision}</p>
              </div>
              <div className="rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
                <p className="font-accent mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-2)]">
                  <Rocket className="h-3.5 w-3.5" aria-hidden="true" />{t.about.mission}
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{ABOUT.mission}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </RevealSection>
  );
}
