"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { GALLERY_ALBUMS, GALLERY_CATEGORIES, type GalleryAlbum } from "@/lib/data";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };

/* ── Lightbox with keyboard + swipe navigation ── */
function Lightbox({ album, startIndex, onClose }: {
  album: GalleryAlbum;
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number>(0);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + album.photos.length) % album.photos.length);
  }, [album.photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [go, onClose]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const photo = album.photos[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
      role="dialog" aria-modal="true" aria-label={`Galerie ${album.label}`}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div>
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{album.label}</p>
          <p className="text-sm font-medium text-white">{current + 1} / {album.photos.length}</p>
        </div>
        <button type="button" onClick={onClose}
          className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          aria-label="Fermer la galerie">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-12 md:px-20">
        {/* Prev */}
        <button type="button" onClick={() => go(-1)}
          className="absolute left-2 z-10 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/25 md:left-4"
          aria-label="Photo précédente">
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Animated image */}
        <div className="relative h-full w-full overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.img
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: E }}
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 mx-auto h-full w-full object-contain"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Next */}
        <button type="button" onClick={() => go(1)}
          className="absolute right-2 z-10 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/25 md:right-4"
          aria-label="Photo suivante">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 py-3 text-center">
        <p className="text-sm text-white/70">{photo.alt}</p>
      </div>

      {/* Thumbnail strip */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto px-4 pb-4 pt-1">
        {album.photos.map((p, i) => (
          <button key={i} type="button" onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === current ? "border-[var(--accent)] opacity-100 scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}
            aria-label={`Aller à la photo ${i + 1}`}>
            <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Album card ── */
function AlbumCard({ album, onClick }: { album: GalleryAlbum; onClick: () => void }) {
  return (
    <motion.button
      variants={fadeUp}
      type="button"
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] text-left shadow-[var(--shadow-card)] transition-all hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-hover)]"
      aria-label={`Ouvrir la galerie ${album.label}`}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={album.cover}
          alt={`Couverture ${album.label}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-600 group-hover:scale-108"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--accent)]/0 transition-all duration-300 group-hover:bg-[var(--accent)]/70">
          <div className="flex flex-col items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <Images className="h-8 w-8 text-white" aria-hidden="true" />
            <span className="text-sm font-semibold text-white">Voir la galerie</span>
          </div>
        </div>
        {/* Photo count badge */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Images className="h-3 w-3" aria-hidden="true" />
          {album.count} photos
        </span>
        {/* Category pill */}
        <span className="absolute bottom-3 left-3 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-light)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          {album.category}
        </span>
      </div>

      {/* Card footer */}
      <div className="p-4">
        <h3 className="font-display text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
          {album.label}
        </h3>
        <p className="mt-1 text-xs text-[var(--text-muted)]">{album.count} photos</p>
      </div>
    </motion.button>
  );
}

/* ── Main section ── */
export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const [openAlbum, setOpenAlbum]           = useState<GalleryAlbum | null>(null);

  const filtered = activeCategory === "Tous"
    ? GALLERY_ALBUMS
    : GALLERY_ALBUMS.filter((a) => a.category === activeCategory);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = openAlbum ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openAlbum]);

  return (
    <RevealSection id="galerie" className="relative py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>GALERIE</SectionLabel>

        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          En images,{" "}
          <span className="gradient-text">en coulisses.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          Cliquez sur une galerie pour parcourir toutes les photos.
        </motion.p>

        {/* Category filters */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <button key={cat} type="button" onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-250 ${
                activeCategory === cat
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm"
                  : "border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
              aria-pressed={activeCategory === cat}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Album grid */}
        <motion.div layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((album) => (
              <motion.div key={album.id} layout
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}>
                <AlbumCard album={album} onClick={() => setOpenAlbum(album)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openAlbum && (
          <Lightbox
            album={openAlbum}
            startIndex={0}
            onClose={() => setOpenAlbum(null)}
          />
        )}
      </AnimatePresence>
    </RevealSection>
  );
}
