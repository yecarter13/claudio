"use client";
import { useEffect, useRef } from "react";

interface Slide {
  key: string;
  content: React.ReactNode;
}

// Inject Swiper CSS once via a <link> tag — avoids dynamic import type issues
function injectSwiperCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("swiper-css")) return;
  const link = document.createElement("link");
  link.id = "swiper-css";
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css";
  document.head.appendChild(link);
}

export function MobileSlider({ slides, className }: { slides: Slide[]; className?: string }) {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instance: { destroy: () => void } | null = null;

    async function init() {
      injectSwiperCSS();

      const { Swiper } = await import("swiper");
      const { Pagination, A11y } = await import("swiper/modules");

      if (!swiperRef.current) return;

      instance = new Swiper(swiperRef.current, {
        modules: [Pagination, A11y],
        slidesPerView: 1.15,
        spaceBetween: 16,
        centeredSlides: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        a11y: { enabled: true },
        breakpoints: {
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3, centeredSlides: false },
        },
      }) as unknown as { destroy: () => void };
    }

    init();
    return () => { instance?.destroy(); };
  }, []);

  return (
    <div ref={swiperRef} className={`swiper ${className ?? ""}`}>
      <div className="swiper-wrapper">
        {slides.map((s) => (
          <div key={s.key} className="swiper-slide h-auto">
            {s.content}
          </div>
        ))}
      </div>
      <div className="swiper-pagination mt-6" />
    </div>
  );
}
