"use client";
import { motion } from "framer-motion";
import { Play, Target, Tv } from "lucide-react";
import { useState } from "react";
import { SHOWS, ytThumb } from "@/lib/data";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };

/* Thumbnail YouTube avec fallback hqdefault */
function YtCover({ videoId, title }: { videoId: string; title: string }) {
  const [src, setSrc] = useState(() => ytThumb(videoId, "maxresdefault"));
  return (
    <img
      src={src}
      alt={`Émission ${title}`}
      loading="lazy"
      onError={() => setSrc(ytThumb(videoId, "hqdefault"))}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

/* Résout la source d'image d'un show */
function ShowCover({ show }: { show: (typeof SHOWS)[number] }) {
  if ("youtubeId" in show && show.youtubeId) {
    return <YtCover videoId={show.youtubeId} title={show.title} />;
  }
  if ("image" in show && show.image) {
    return (
      <img
        src={show.image as string}
        alt={`Émission ${show.title}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="h-full w-full bg-[var(--bg-card)]" aria-hidden="true" />
  );
}

export function ShowsSection() {
  return (
    <RevealSection id="shows" className="relative py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>SHOWS & CONCEPTS</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          Bienvenue dans{" "}
          <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">mon univers.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          Des émissions qui cassent les codes — créées pour vous faire vivre des moments uniques.
        </motion.p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {SHOWS.map((show) => (
            <motion.article key={show.title} variants={fadeUp}
              className="group overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)]"
              style={{ boxShadow: "var(--shadow-card)" }}>

              {/* Cover image */}
              <div className="relative h-52 overflow-hidden">
                <ShowCover show={show} />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="font-accent absolute right-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  {show.badge}
                </span>
              </div>

              <div className="space-y-4 p-6">
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">{show.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{show.description}</p>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--accent-light)] p-3">
                  <p className="font-accent mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                    <Target className="h-3 w-3" aria-hidden="true" />Objectif
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">{show.objectif}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-light)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    <Tv className="h-3 w-3" aria-hidden="true" />{show.type}
                  </span>
                  {show.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--border-card)] bg-[var(--bg-secondary)] px-3 py-1 text-xs text-[var(--text-secondary)]">{tag}</span>
                  ))}
                </div>

                <a href={show.href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-[0_4px_16px_var(--glow)]"
                  aria-label={`Regarder ${show.title}`}>
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />Regarder
                </a>

                {"episodes" in show && Array.isArray((show as { episodes?: unknown }).episodes) && (
                  <div className="flex flex-wrap gap-2">
                    {(show as typeof show & { episodes: { label: string; href: string }[] }).episodes.map((ep) => (
                      <a key={ep.label} href={ep.href} target="_blank" rel="noreferrer"
                        className="rounded-full border border-[var(--border-card)] bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        aria-label={ep.label}>
                        {ep.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
