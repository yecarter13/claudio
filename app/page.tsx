"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp, Menu, Sun, Moon, X, Film, Mail } from "lucide-react";
import dynamic from "next/dynamic";

// Above-fold sections — loaded immediately
import { AboutSection }   from "@/components/sections/AboutSection";
import { PlatformIcon }   from "@/components/ui/PlatformIcon";

// Below-fold sections — lazy loaded, no SSR (heavy: Swiper, Recharts, animations)
const FilmsSection        = dynamic(() => import("@/components/sections/FilmsSection").then(m => m.FilmsSection),        { ssr: false });
const MusicSection        = dynamic(() => import("@/components/sections/MusicSection").then(m => m.MusicSection),        { ssr: false });
const ShowsSection        = dynamic(() => import("@/components/sections/ShowsSection").then(m => m.ShowsSection),        { ssr: false });
const DigitalSection      = dynamic(() => import("@/components/sections/DigitalSection").then(m => m.DigitalSection),    { ssr: false });
const PartnershipsSection = dynamic(() => import("@/components/sections/PartnershipsSection").then(m => m.PartnershipsSection), { ssr: false });
const ServicesSection     = dynamic(() => import("@/components/sections/ServicesSection").then(m => m.ServicesSection),  { ssr: false });
const GallerySection      = dynamic(() => import("@/components/sections/GallerySection").then(m => m.GallerySection),    { ssr: false });
const ContactSection      = dynamic(() => import("@/components/sections/ContactSection").then(m => m.ContactSection),    { ssr: false });

/* ── Constants ─────────────────────────────────────────────────── */
const HERO_TITLE_FIRST    = "CLAUDIO";
const HERO_TITLE_LAST     = "NJALLA";
const HERO_SUBTITLE_LABEL = "Cameroonian Creator · Entertainment · Culture";
const HERO_TAGLINE        = "Je suis là pour vous divertir, vous faire rire, et vous faire vivre des émotions authentiques. Cameroun dans le cœur, le monde dans ma vision.";
const HERO_SCROLL_TEXT    = "Découvrir";
const FOOTER_QUOTE        = "Merci d'être passé. Revenez souvent — j'ai toujours quelque chose de nouveau à vous montrer.";

const TYPEWRITER_ROLES = ["Comedian", "Influencer", "Actor", "Music Artist"] as const;

const NAV_LINKS = [
  { id: "about",     label: "About"   },
  { id: "films",     label: "Films"   },
  { id: "music",     label: "Music"   },
  { id: "shows",     label: "Shows"   },
  { id: "influence", label: "Digital" },
  { id: "contact",   label: "Contact" },
] as const;

const HERO_BG     = "https://placehold.co/1920x1080/0b1120/1e293b?text=.";
const HERO_CUTOUT = "https://placehold.co/600x900/1e293b/60a5fa?text=CLAUDIO";

const HERO_STATS = [
  { key: "tiktok",    label: "TikTok",    count: "2.4M" },
  { key: "facebook",  label: "Facebook",  count: "975K" },
  { key: "snapchat",  label: "Snapchat",  count: "232K" },
  { key: "instagram", label: "Instagram", count: "181K" },
  { key: "youtube",   label: "YouTube",   count: "219K" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Hero name ─────────────────────────────────────────────────── */
function HeroName({ text, delay = 0, accent = false }: { text: string; delay?: number; accent?: boolean }) {
  return (
    <span
      className={`font-hero inline-flex overflow-hidden ${accent ? "bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent" : "text-[var(--text-primary)]"}`}
      aria-label={text}
    >
      {text.split("").map((l, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 48, skewY: 4 }}
          animate={{ opacity: 1, y: 0, skewY: 0 }}
          transition={{ duration: 0.55, delay: delay + i * 0.04, ease: EASE }}
          className="inline-block will-change-transform"
          style={{ lineHeight: 0.9 }}
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Floating orbs — adapts to theme ───────────────────────────── */
function FloatingOrbs({ count = 4 }: { count?: number }) {
  const reduced = useReducedMotion();
  const orbs = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 240 + i * 120,
      left: `${5 + i * 24}%`,
      top: `${8 + (i % 3) * 26}%`,
      duration: 9 + i * 3,
      delay: i * 1.8,
      opacity: 0.55 + i * 0.1,
    })), [count]);
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {orbs.map((o) => (
        <motion.div key={o.id}
          animate={{ y: [0, -28, 0], scale: [1, 1.06, 1], opacity: [o.opacity * 0.6, o.opacity, o.opacity * 0.6] }}
          transition={{ duration: o.duration, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", width: o.size, height: o.size,
            left: o.left, top: o.top, borderRadius: "50%",
            background: `radial-gradient(circle at 40% 40%, rgba(var(--accent-rgb),0.18), transparent 68%)`,
            filter: "blur(48px)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated grid lines (dark mode effect) ─────────────────────── */
function GridLines() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03] [data-theme=dark]:opacity-[0.06]" aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }}
    />
  );
}

/* ── Navbar ────────────────────────────────────────────────────── */
function TopBar({ hasScrolled, activeSection, isMobileMenuOpen, setIsMobileMenuOpen, jumpTo, theme, toggleTheme, isMounted }: {
  hasScrolled: boolean; activeSection: string;
  isMobileMenuOpen: boolean; setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jumpTo: (id: string) => void; theme: string; toggleTheme: () => void; isMounted: boolean;
}) {
  return (
    <motion.header
      initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${hasScrolled ? "border-b border-[var(--border-card)] backdrop-blur-xl shadow-sm" : "bg-transparent"}`}
      style={hasScrolled ? { background: "var(--nav-bg)" } : {}}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
        {/* Logo */}
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-2.5" aria-label="Retour en haut">
          <span className="font-hero inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-lg text-white shadow-sm transition-all group-hover:scale-105 group-hover:shadow-[0_0_16px_var(--glow)]">
            CN
          </span>
          <span className="font-accent text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-primary)]">
            Claudio Njalla
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <button key={link.id} type="button" onClick={() => jumpTo(link.id)}
              className="group relative text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[var(--accent)] transition-all duration-300 ${activeSection === link.id ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"}`} />
            </button>
          ))}
          {isMounted && (
            <button onClick={toggleTheme} className="rounded-full p-2 text-[var(--text-secondary)] transition-all hover:bg-[var(--accent-light)] hover:text-[var(--accent)]" aria-label="Basculer le thème">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <a href="#contact" className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-[0_4px_16px_var(--glow)]">
            Book Me
          </a>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          {isMounted && (
            <button onClick={toggleTheme} className="p-2 text-[var(--text-secondary)] transition-all hover:text-[var(--accent)]" aria-label="Thème">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <button type="button" onClick={() => setIsMobileMenuOpen((o) => !o)} className="p-2 text-[var(--text-primary)]" aria-label={isMobileMenuOpen ? "Fermer" : "Menu"}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col px-6 pb-10 pt-24 lg:hidden"
            style={{ background: "var(--mobile-menu-bg)", backdropFilter: "blur(20px)" }}>
            <div className="space-y-4">
              {NAV_LINKS.map((link, i) => (
                <motion.button key={link.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.06 }} type="button" onClick={() => jumpTo(link.id)}
                  className="block w-full text-left font-hero text-5xl text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                  {link.label}
                </motion.button>
              ))}
            </div>
            <motion.a initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              href="#contact" onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 inline-flex w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white">
              Book Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── Main page ─────────────────────────────────────────────────── */
export default function App() {
  const reduced = useReducedMotion();
  const [isMounted, setIsMounted]               = useState(false);
  const [theme, setTheme]                       = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled]           = useState(false);
  const [showScrollTop, setShowScrollTop]       = useState(false);
  const [activeSection, setActiveSection]       = useState("about");
  const [roleIndex, setRoleIndex]               = useState(0);
  const deferredRole = useDeferredValue(roleIndex);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((c) => (c + 1) % TYPEWRITER_ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHasScrolled(y > 60);
      setShowScrollTop(y > 300);
      const probe = y + window.innerHeight * 0.35;
      let curr = "about";
      NAV_LINKS.forEach((l) => {
        const el = document.getElementById(l.id);
        if (el && probe >= el.offsetTop) curr = l.id;
      });
      setActiveSection(curr);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setIsMobileMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMounted(true);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, isMounted]);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const jumpTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative overflow-x-hidden" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <TopBar hasScrolled={hasScrolled} activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}
        jumpTo={jumpTo} theme={theme} toggleTheme={toggleTheme} isMounted={isMounted} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden pt-16">
        {/* Mesh background */}
        <div className="absolute inset-0 mesh-bg" aria-hidden="true" />

        {/* Grid lines (visible in dark mode) */}
        <GridLines />

        {/* Animated gradient orbs */}
        <FloatingOrbs count={4} />

        {/* Top-right accent blob */}
        <motion.div
          animate={reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(var(--accent-rgb),0.22), transparent 70%)" }}
          aria-hidden="true"
        />
        {/* Bottom-left accent blob */}
        <motion.div
          animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18), transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Cutout portrait */}
        <motion.img
          initial={reduced ? false : { x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={reduced ? undefined : { duration: 1.2, delay: 0.3, ease: "easeOut" }}
          src={HERO_CUTOUT}
          alt="Portrait de Claudio Njalla"
          className="absolute bottom-0 right-0 z-[1] hidden h-[86vh] object-contain md:block"
          style={{ filter: "drop-shadow(0 0 60px rgba(var(--accent-rgb),0.30))", opacity: 0.88 }}
        />

        {/* Content */}
        <motion.div
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate="visible"
          className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 pb-36 pt-8 md:px-8 md:pb-28"
        >
          {/* Badge */}
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
            className="font-accent mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-4 py-1.5 text-xs font-semibold text-[var(--accent)] backdrop-blur-sm"
          >
            <motion.span
              animate={reduced ? undefined : { scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
            {HERO_SUBTITLE_LABEL}
          </motion.span>

          {/* Name */}
          <div className="mb-5">
            <h1 className="text-[clamp(3.8rem,13vw,9rem)] leading-[0.9]" aria-label={`${HERO_TITLE_FIRST} ${HERO_TITLE_LAST}`}>
              <HeroName text={HERO_TITLE_FIRST} delay={0.1} />
              <br />
              <HeroName text={HERO_TITLE_LAST} delay={0.24} accent />
            </h1>
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0, opacity: 0 }} animate={{ width: 64, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-4 h-1 rounded-full gradient-animate"
              style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent))" }}
            />
          </div>

          {/* Typewriter */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } } }}
            className="font-accent mb-4 text-lg font-semibold text-[var(--accent)]"
          >
            <AnimatePresence mode="wait">
              <motion.span key={deferredRole}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }} className="inline-block">
                {TYPEWRITER_ROLES[deferredRole]}
              </motion.span>
            </AnimatePresence>
            <span className="blinking-cursor ml-1 text-[var(--accent-2)]">|</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.65 } } }}
            className="max-w-lg text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
          >
            {HERO_TAGLINE}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.82 } } }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.a href="#films"
              whileHover={reduced ? undefined : { scale: 1.05 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="glow-pulse inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-md"
              aria-label="Voir mes films">
              <Film className="h-4 w-4" aria-hidden="true" />
              Voir mes Films
            </motion.a>
            <motion.a href="#contact"
              whileHover={reduced ? undefined : { scale: 1.05 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="glass-card inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="Me contacter">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Me Contacter
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.96 } } }}
            className="mt-6 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {["CN", "AF", "LM"].map((av) => (
                <span key={av} className="font-accent inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--bg-primary)] bg-[var(--accent)] text-[10px] font-bold text-white shadow-sm">
                  {av}
                </span>
              ))}
            </div>
            <span className="text-sm text-[var(--text-secondary)]">4M+ personnes me suivent</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1"
        >
          <div className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-2 backdrop-blur-sm">
            <ChevronDown className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          </div>
          <span className="font-accent text-[9px] uppercase tracking-[0.28em] text-[var(--text-muted)]">{HERO_SCROLL_TEXT}</span>
        </motion.div>

        {/* Stats bar — glassmorphism */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-[var(--border-card)] backdrop-blur-xl"
          style={{ background: "var(--stat-bar-bg)" }}>
          <div className="mx-auto flex max-w-7xl snap-x snap-mandatory items-center overflow-x-auto px-4 py-3 md:justify-between md:px-8">
            {HERO_STATS.map((stat, idx) => (
              <div key={stat.key} className="flex snap-start items-center">
                <div className="shimmer-sweep flex min-w-[155px] items-center gap-2 px-2 md:min-w-0">
                  <PlatformIcon platform={stat.key} className="h-4 w-4 text-[var(--accent)]" />
                  <span className="text-sm font-bold text-[var(--text-primary)]">{stat.count}</span>
                  <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
                </div>
                {idx < HERO_STATS.length - 1 && (
                  <span className="mx-2 text-[var(--border-card)]" aria-hidden="true">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <AboutSection />
      <FilmsSection />
      <MusicSection />
      <ShowsSection />
      <DigitalSection />
      <PartnershipsSection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border-card)]" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-hero text-3xl text-[var(--accent)]">CLAUDIO NJALLA</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Comedian · Influencer · Actor · Musician</p>
            </div>
            <p className="max-w-sm text-sm italic text-[var(--text-secondary)]">"{FOOTER_QUOTE}"</p>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border-card)] pt-5 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
            <span>© 2026 Claudio Njalla. Tous droits réservés.</span>
            <span>Made with care in Cameroon</span>
          </div>
        </div>
      </footer>

      {/* ── Scroll to top ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.85 }}
            whileHover={reduced ? {} : { scale: 1.1 }} whileTap={reduced ? {} : { scale: 0.92 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="glow-border fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition-all"
            aria-label="Remonter en haut"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
