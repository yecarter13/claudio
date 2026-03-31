"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Calendar } from "lucide-react";
import dynamic from "next/dynamic";
import { FILMS } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const MobileSlider = dynamic(() => import("@/components/ui/MobileSlider").then((m) => m.MobileSlider), { ssr: false });

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };
const SPRING = { type: "spring" as const, stiffness: 200, damping: 22 };

function FilmCard({ title, genre, description, image, href, year, teaser }: (typeof FILMS)[number]) {
  const reduced = useReducedMotion();
  const { t } = useI18n();
  return (
    <motion.article variants={fadeUp} className="group h-full [perspective:1200px]">
      <motion.div whileHover={reduced ? {} : { rotateY: 3, rotateX: -2, scale: 1.02 }} transition={SPRING}
        className="relative h-full overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] [transform-style:preserve-3d]"
        style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <img src={image} alt={`Affiche ${title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="font-accent absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            <Calendar className="h-2.5 w-2.5" aria-hidden="true" />{year}
          </span>
          <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 transition-transform duration-500 group-hover:translate-y-0">
            <span className="mb-2 inline-flex w-fit rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-medium text-[var(--accent-2)]">{genre}</span>
            <p className="mb-4 text-sm leading-relaxed text-slate-200">{description}</p>
            <div className="flex flex-wrap gap-2">
              <a href={href} target="_blank" rel="noreferrer"
                className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105"
                aria-label={`Voir ${title}`}>
                <Play className="h-3 w-3 fill-current" aria-hidden="true" />{t.films.watch}
              </a>
              {teaser && (
                <a href={teaser} target="_blank" rel="noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-white/20"
                  aria-label={`Teaser ${title}`}>
                  {t.films.teaser}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-hero text-xl text-[var(--text-primary)]">{title}</h3>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">{genre}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function FilmsSection() {
  const { t } = useI18n();
  const slides = FILMS.map((film) => ({ key: film.title, content: <FilmCard {...film} /> }));
  return (
    <RevealSection id="films" className="relative py-20 md:py-28" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>{t.films.label}</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          {t.films.heading}{" "}
          <span className="gradient-text">{t.films.accent}</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">{t.films.sub}</motion.p>
        <div className="mt-12 md:hidden"><MobileSlider slides={slides} /></div>
        <div className="mt-12 hidden md:grid md:grid-cols-3 md:gap-5">
          {FILMS.map((film) => <FilmCard key={film.title} {...film} />)}
        </div>
      </div>
    </RevealSection>
  );
}
