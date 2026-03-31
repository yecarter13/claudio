"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { PLATFORMS } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { Sticker } from "@/components/ui/Sticker";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };

const COLORS: Record<string, string> = {
  tiktok:    "#6366f1",
  facebook:  "#1877F2",
  snapchat:  "#F7C600",
  youtube:   "#FF0000",
  instagram: "#E4405F",
};

const BRAND_COLORS: Record<string, string> = {
  tiktok:    "text-[#6366f1]",
  facebook:  "text-[#1877F2]",
  snapchat:  "text-[#F7C600]",
  youtube:   "text-[#FF0000]",
  instagram: "text-[#E4405F]",
  whatsapp:  "text-[#25D366]",
};

const PIE_DATA = PLATFORMS.map((p) => ({
  key:     p.key,
  label:   p.label,
  value:   p.followers,
  display: p.display,
  color:   COLORS[p.key] ?? "#3b82f6",
}));

const TOTAL = PIE_DATA.reduce((s, d) => s + d.value, 0);

function fmt(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
  return `${v}`;
}

/* ── Pure SVG Donut Chart ─────────────────────────────────────── */
function DonutChart() {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [hovered, setHovered] = useState<string | null>(null);

  const SIZE = 280;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R_OUTER = 110;
  const R_INNER = 68;
  const GAP_DEG = 2.5;

  // Build slices
  let cumAngle = -90; // start at top
  const slices = PIE_DATA.map((d) => {
    const pct = d.value / TOTAL;
    const sweepDeg = pct * 360 - GAP_DEG;
    const startRad = (cumAngle * Math.PI) / 180;
    const endRad   = ((cumAngle + sweepDeg) * Math.PI) / 180;
    cumAngle += pct * 360;

    const isHovered = hovered === d.key;
    const r = isHovered ? R_OUTER + 8 : R_OUTER;

    const x1 = CX + R_INNER * Math.cos(startRad);
    const y1 = CY + R_INNER * Math.sin(startRad);
    const x2 = CX + r * Math.cos(startRad);
    const y2 = CY + r * Math.sin(startRad);
    const x3 = CX + r * Math.cos(endRad);
    const y3 = CY + r * Math.sin(endRad);
    const x4 = CX + R_INNER * Math.cos(endRad);
    const y4 = CY + R_INNER * Math.sin(endRad);
    const large = sweepDeg > 180 ? 1 : 0;

    const path = `M ${x1} ${y1} L ${x2} ${y2} A ${r} ${r} 0 ${large} 1 ${x3} ${y3} L ${x4} ${y4} A ${R_INNER} ${R_INNER} 0 ${large} 0 ${x1} ${y1} Z`;

    // Label position (midpoint of arc)
    const midRad = startRad + (endRad - startRad) / 2;
    const labelR = (R_INNER + r) / 2;
    const lx = CX + labelR * Math.cos(midRad);
    const ly = CY + labelR * Math.sin(midRad);

    return { ...d, path, lx, ly, pct, isHovered };
  });

  const activeSlice = hovered ? slices.find((s) => s.key === hovered) : null;

  return (
    <div className="flex flex-1 flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
      {/* SVG donut */}
      <div className="relative flex-shrink-0">
        <svg
          ref={ref}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="overflow-visible"
          aria-label="Camembert audience par plateforme"
        >
          {slices.map((s) => (
            <motion.path
              key={s.key}
              d={s.path}
              fill={s.color}
              opacity={hovered && !s.isHovered ? 0.35 : 1}
              initial={reduced ? false : { scale: 0, opacity: 0, originX: `${CX}px`, originY: `${CY}px` }}
              animate={inView ? { scale: 1, opacity: hovered && !s.isHovered ? 0.35 : 1 } : {}}
              transition={{ duration: 0.7, delay: slices.indexOf(s) * 0.08, ease: E }}
              style={{ cursor: "pointer", filter: s.isHovered ? `drop-shadow(0 0 8px ${s.color}88)` : "none" }}
              onMouseEnter={() => setHovered(s.key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(s.key)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="img"
              aria-label={`${s.label}: ${fmt(s.value)} (${(s.pct * 100).toFixed(1)}%)`}
            />
          ))}

          {/* Center text */}
          <text x={CX} y={CY - 10} textAnchor="middle" fontSize={13} fill="var(--text-muted)" fontFamily="inherit">
            {activeSlice ? activeSlice.label : "Total"}
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" fontSize={22} fontWeight="700" fill={activeSlice?.color ?? "var(--text-primary)"} fontFamily="inherit">
            {activeSlice ? fmt(activeSlice.value) : fmt(TOTAL)}
          </text>
          {activeSlice && (
            <text x={CX} y={CY + 32} textAnchor="middle" fontSize={11} fill="var(--text-muted)" fontFamily="inherit">
              {(activeSlice.pct * 100).toFixed(1)}%
            </text>
          )}
        </svg>
      </div>

      {/* Legend — vertical on desktop */}
      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-1 md:w-auto">
        {slices.map((s) => (
          <motion.button
            key={s.key}
            type="button"
            onMouseEnter={() => setHovered(s.key)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered(hovered === s.key ? null : s.key)}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
              s.isHovered
                ? "border-[var(--accent)]/40 bg-[var(--accent-light)] shadow-sm"
                : "border-[var(--border-card)] bg-[var(--bg-secondary)] hover:border-[var(--border-subtle)]"
            }`}
            aria-label={`${s.label}: ${fmt(s.value)}`}
          >
            {/* Color dot */}
            <span className="h-3 w-3 flex-shrink-0 rounded-full" style={{ background: s.color }} />
            {/* Platform icon */}
            <PlatformIcon platform={s.key} className={`h-4 w-4 flex-shrink-0 ${BRAND_COLORS[s.key] ?? "text-[var(--text-secondary)]"}`} />
            {/* Label + value */}
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-[var(--text-primary)]">{s.label}</span>
              <span className="block text-xs text-[var(--text-muted)]">{fmt(s.value)} · {(s.pct * 100).toFixed(1)}%</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export function DigitalSection() {
  const { t } = useI18n();
  return (
    <RevealSection id="influence" className="relative overflow-visible py-20 md:py-28" style={{ background: "var(--bg-primary)" }}>

      {/* ── Sticker PHOTO — youtube (grand, style Polaroid) ── */}
      <Sticker className="right-4 top-6 lg:right-10 xl:right-20" delay={0.1} rotate={5} floatY={10}>
        <div className="w-36 overflow-hidden rounded-2xl border-4 border-[var(--bg-card)] bg-[var(--bg-card)] shadow-xl lg:w-44">
          <img src="/youtube.jpeg" alt="Claudio Njalla YouTube" className="h-44 w-full object-cover object-top lg:h-52" />
          <div className="px-2 py-1.5 text-center">
            <p className="font-accent text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Claudio Njalla</p>
          </div>
        </div>
      </Sticker>

      {/* ── Stickers abonnés ── */}

      {/* TikTok 2.4M */}
      <Sticker className="right-6 top-[52%] lg:right-16" delay={0.3} rotate={-4} floatY={12}>
        <div className="flex items-center gap-2 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] px-3.5 py-2 shadow-lg">
          <PlatformIcon platform="tiktok" className="h-5 w-5 text-[#6366f1]" />
          <div>
            <p className="font-hero text-base leading-none text-[var(--text-primary)]">2.4M</p>
            <p className="font-accent text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">TikTok</p>
          </div>
        </div>
      </Sticker>

      {/* Facebook 975K */}
      <Sticker className="right-4 top-[68%] lg:right-12" delay={0.45} rotate={3} floatY={8}>
        <div className="flex items-center gap-2 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] px-3.5 py-2 shadow-lg">
          <PlatformIcon platform="facebook" className="h-5 w-5 text-[#1877F2]" />
          <div>
            <p className="font-hero text-base leading-none text-[var(--text-primary)]">975K</p>
            <p className="font-accent text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Facebook</p>
          </div>
        </div>
      </Sticker>

      {/* YouTube 219K — bas gauche */}
      <Sticker className="-left-2 bottom-32 lg:left-6" delay={0.55} rotate={5} floatY={8}>
        <div className="flex items-center gap-2 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] px-3.5 py-2 shadow-lg">
          <PlatformIcon platform="youtube" className="h-5 w-5 text-[#FF0000]" />
          <div>
            <p className="font-hero text-base leading-none text-[var(--text-primary)]">219K</p>
            <p className="font-accent text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">YouTube</p>
          </div>
        </div>
      </Sticker>

      {/* Total badge — haut gauche */}
      <Sticker className="left-4 top-10 lg:left-16" delay={0.65} rotate={-7} floatY={14}>
        <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-light)] px-4 py-2.5 shadow-md">
          <p className="font-hero text-lg leading-none text-[var(--accent)]">4M+</p>
          <p className="font-accent text-[9px] uppercase tracking-[0.12em] text-[var(--accent)]">Followers</p>
        </div>
      </Sticker>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>{t.digital.label}</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          {t.digital.heading}{" "}
          <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">
            {t.digital.accent}
          </span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          {t.digital.sub}
        </motion.p>

        {/* Platform cards */}
        <motion.div
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {PLATFORMS.map((p) => (
            <motion.a key={p.key} href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel={p.href.startsWith("http") ? "noreferrer" : undefined}
              variants={fadeUp} whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.25 }}
              className="group rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-5 transition-all hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-hover)]"
              style={{ boxShadow: "var(--shadow-card)" }}
              aria-label={`${p.label} — ${p.display}`}
            >
              <PlatformIcon platform={p.key} className={`h-6 w-6 ${BRAND_COLORS[p.key] ?? "text-[var(--text-secondary)]"}`} />
              <p className="font-hero mt-3 text-3xl text-[var(--text-primary)]">{p.display}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{p.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{p.contentType}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Donut chart */}
        <motion.div variants={fadeUp}
          className="mt-10 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 md:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p className="font-accent mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            {t.digital.chart}
          </p>
          {/* 3-col layout: donut | legend | photo */}
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-6">
            {/* Donut SVG */}
            <div className="flex justify-center md:flex-shrink-0">
              <DonutChart />
            </div>

            {/* Spacer */}
            <div className="hidden md:block md:flex-1" />

            {/* Separator */}
            <div className="hidden md:block md:w-px md:self-stretch md:bg-[var(--border-card)]" />

            {/* Photo — pushed to far right */}
            <div className="hidden md:block md:flex-shrink-0 md:w-52 lg:w-64 xl:w-72">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border-card)]" style={{ aspectRatio: "3/4" }}>
                <img
                  src="/abonnes.jpeg"
                  alt="Claudio Njalla"
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--accent)]/30 bg-[var(--bg-card)]/80 px-4 py-1.5 text-center backdrop-blur-sm">
                  <p className="font-hero text-xl text-[var(--accent)]">{fmt(TOTAL)}+</p>
                  <p className="font-accent text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">followers</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </RevealSection>
  );
}
