"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PLATFORMS, CHART_DATA } from "@/lib/data";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const BarChart        = dynamic(() => import("recharts").then((m) => m.BarChart),        { ssr: false });
const Bar             = dynamic(() => import("recharts").then((m) => m.Bar),             { ssr: false });
const XAxis           = dynamic(() => import("recharts").then((m) => m.XAxis),           { ssr: false });
const YAxis           = dynamic(() => import("recharts").then((m) => m.YAxis),           { ssr: false });
const Tooltip         = dynamic(() => import("recharts").then((m) => m.Tooltip),         { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false });
const Cell            = dynamic(() => import("recharts").then((m) => m.Cell),            { ssr: false });

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };

const ICON_COLORS: Record<string, string> = {
  facebook: "text-[#1877F2]", tiktok: "text-slate-800",
  snapchat: "text-yellow-500", youtube: "text-red-500", instagram: "text-pink-500",
};

function fmt(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
  return `${v}`;
}

export function DigitalSection() {
  return (
    <RevealSection id="influence" className="relative py-20 md:py-28" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>INFLUENCE & PRÉSENCE DIGITALE</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          4M+ personnes{" "}
          <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">me suivent.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          Une communauté engagée sur 5 plateformes majeures.
        </motion.p>

        {/* Platform cards */}
        <motion.div variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PLATFORMS.map((p) => (
            <motion.a key={p.key} href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel={p.href.startsWith("http") ? "noreferrer" : undefined}
              variants={fadeUp} whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.25 }}
              className="group rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-5 transition-all hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-hover)]"
              style={{ boxShadow: "var(--shadow-card)" }} aria-label={`${p.label} — ${p.display}`}>
              <PlatformIcon platform={p.key} className={`h-6 w-6 ${ICON_COLORS[p.key] ?? "text-slate-600"}`} />
              <p className="font-hero mt-3 text-3xl text-[var(--text-primary)]">{p.display}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{p.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{p.contentType}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div variants={fadeUp}
          className="mt-10 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6"
          style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="font-accent mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Audience par plateforme</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} barCategoryGap="32%">
                <XAxis dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={38} />
                <Tooltip formatter={(v: number) => [fmt(v), "Followers"]}
                  contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 8, color: "var(--text-primary)", fontSize: 12 }}
                  cursor={{ fill: "var(--accent-light)" }} />
                <Bar dataKey="followers" radius={[6, 6, 0, 0]}>
                  {CHART_DATA.map((_, i) => <Cell key={i} fill="var(--accent)" fillOpacity={0.7 + i * 0.06} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </RevealSection>
  );
}
