"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Music2, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { TRACKS, ytThumb } from "@/lib/data";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const MobileSlider = dynamic(
  () => import("@/components/ui/MobileSlider").then((m) => m.MobileSlider),
  { ssr: false }
);

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };

/* YouTube thumbnail with automatic hqdefault fallback */
function YtCover({ videoId, title }: { videoId: string; title: string }) {
  const [src, setSrc] = useState(() => ytThumb(videoId, "maxresdefault"));
  return (
    <img
      src={src}
      alt={`Cover ${title}`}
      loading="lazy"
      onError={() => setSrc(ytThumb(videoId, "hqdefault"))}
      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

function Waveform({ accent }: { accent?: boolean }) {
  const bars = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      height: Math.round(20 + Math.abs(Math.sin((i + 1) * 12.9898 + 0.41)) * 80),
      delay: ((i * 17) % 10) / 10,
    })), []);
  return (
    <div className="flex h-9 items-end gap-[3px]">
      {bars.map((bar, i) => (
        <span key={i} className={`wave-bar block w-1.5 rounded-full ${accent ? "bg-[var(--accent-2)]" : "bg-[var(--accent)]"}`}
          style={{ height: `${bar.height}%`, animationDelay: `${bar.delay}s` }} aria-hidden="true" />
      ))}
    </div>
  );
}

const TYPE_COLORS: Record<string, string> = {
  "Clip Officiel": "bg-[var(--accent-light)] text-[var(--accent)] border-[var(--border-subtle)]",
  "Visualizer":    "bg-sky-50 text-sky-600 border-sky-200",
  "Lyrics Video":  "bg-slate-100 text-slate-600 border-slate-200",
};

export function MusicSection() {
  const reduced = useReducedMotion();

  const trackCards = TRACKS.map((track) => ({
    key: track.title,
    content: (
      <motion.article
        variants={fadeUp}
        className="group h-full rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)]"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          <YtCover videoId={track.youtubeId} title={track.title} />
          <span className={`font-accent absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm ${TYPE_COLORS[track.type] ?? "bg-white/80 text-slate-600 border-slate-200"}`}>
            <Music2 className="h-2.5 w-2.5" aria-hidden="true" />{track.type}
          </span>
          {/* YouTube link badge */}
          <a href={track.streamLinks.youtube ?? "#"} target="_blank" rel="noreferrer"
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-red-600"
            aria-label={`Voir ${track.title} sur YouTube`}>
            <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
            YouTube
          </a>
          <a href={track.streamLinks.youtube ?? track.href}
            target="_blank" rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40"
            aria-label={`Regarder ${track.title} sur YouTube`}>
            <span className="scale-0 rounded-full bg-white p-4 text-[var(--accent)] shadow-xl transition-transform duration-300 group-hover:scale-100">
              <Play className="h-5 w-5 fill-current" />
            </span>
          </a>
        </div>
        <div className="p-5">
          <h3 className="font-hero text-2xl text-[var(--text-primary)]">{track.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{track.note}</p>
          <div className="mt-4 flex items-center justify-between">
            <Waveform accent={track.color === "orange"} />
            <span className="font-accent text-xs text-[var(--text-muted)]">{track.duration}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {track.streamLinks.apple && (
              <a key="apple" href={track.streamLinks.apple} target="_blank" rel="noreferrer"
                className="rounded-full border border-[var(--border-card)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                aria-label={`${track.title} sur Apple Music`}>
                Apple Music
              </a>
            )}
            {track.streamLinks.shazam && (
              <a key="shazam" href={track.streamLinks.shazam} target="_blank" rel="noreferrer"
                className="rounded-full border border-[var(--border-card)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                aria-label={`${track.title} sur Shazam`}>
                Shazam
              </a>
            )}
            {track.streamLinks.youtube && (
              <a key="yt" href={track.streamLinks.youtube} target="_blank" rel="noreferrer"
                className="rounded-full border border-[var(--border-card)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                aria-label={`${track.title} sur YouTube`}>
                YouTube
              </a>
            )}
          </div>
        </div>
      </motion.article>
    ),
  }));

  return (
    <RevealSection id="music" className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <motion.div animate={reduced ? {} : { y: [0, -20, 0], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--accent)] blur-3xl"
        aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>MUSIQUE</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          Quand je ne vous fais pas rire…{" "}
          <span className="gradient-text">je vous fais ressentir.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          La musique, c'est mon côté le plus intime.
        </motion.p>

        {/* Mobile: Swiper — Desktop: grid */}
        <div className="mt-12 md:hidden">
          <MobileSlider slides={trackCards} />
        </div>
        <div className="mt-12 hidden md:grid md:grid-cols-4 md:gap-6">
          {trackCards.map((s) => <div key={s.key}>{s.content}</div>)}
        </div>
      </div>
    </RevealSection>
  );
}
