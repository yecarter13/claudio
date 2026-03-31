"use client";
import { motion } from "framer-motion";
import { Megaphone, TrendingUp, Clapperboard, CalendarDays, LucideIcon, Check } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };

const ICONS: Record<string, LucideIcon> = {
  "Promotion de Marque":         Megaphone,
  "Influence Marketing":         TrendingUp,
  "Apparitions (Films & Clips)": Clapperboard,
  "Événementiel":                CalendarDays,
};

export function ServicesSection() {
  return (
    <RevealSection id="services" className="relative py-20 md:py-28" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>SERVICES</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          Ce que je peux{" "}
          <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">
            faire pour vous.
          </span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          De la promotion de marque à l'événementiel — mon audience et mon talent au service de vos projets.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.title] ?? Megaphone;
            return (
              <motion.article key={service.title} variants={fadeUp}
                whileHover={{ y: -5, borderColor: "rgba(59,130,246,0.35)" }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 transition-all"
                style={{ boxShadow: "var(--shadow-card)" }}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent)] transition-all group-hover:bg-[var(--accent)] group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display mt-4 text-xl font-bold text-[var(--text-primary)]">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Check className="h-3.5 w-3.5 flex-shrink-0 text-[var(--accent)]" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
