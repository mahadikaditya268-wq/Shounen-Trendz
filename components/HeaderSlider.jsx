import React, { useState, useEffect, useCallback } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      tag: "Drop 01",
      title: "Neo Street\nUniform",
      subtitle: "Oversized layers, sharp seams, and city-coded silhouettes built for midnight walks.",
      offer: "Capsule sale up to 35%",
      buttonText: "Shop The Drop",
      imgSrc: assets.header_headphone_image,
      accent: "#ff533d",
    },
    {
      id: 2,
      tag: "Drop 02",
      title: "Shibuya\nMotion Core",
      subtitle: "Sport-tech cuts with manga-panel details for movement, comfort, and impact.",
      offer: "Limited restock",
      buttonText: "Explore Motion",
      imgSrc: assets.header_playstation_image,
      accent: "#00b8af",
    },
    {
      id: 3,
      tag: "Drop 03",
      title: "Akira\nAfterlight",
      subtitle: "Graphic-rich street essentials with anime attitude and handcrafted finishing.",
      offer: "Members early access",
      buttonText: "Unlock Early Access",
      imgSrc: assets.header_macbook_image,
      accent: "#111827",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index) => {
      if (transitioning || index === current) return;
      setDirection(index > current ? 1 : -1);
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, 400);
    },
    [transitioning, current]
  );

  useEffect(() => {
    const id = setInterval(() => {
      goTo((current + 1) % sliderData.length);
    }, 5500);
    return () => clearInterval(id);
  }, [current, goTo, sliderData.length]);

  const slide = sliderData[current];

  return (
    <div className="relative w-full mt-4 md:mt-6 overflow-hidden rounded-[28px] border border-[var(--border-strong)] street-panel" style={{ minHeight: 500 }}>
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 50%, ${slide.accent}30 0%, transparent 54%), radial-gradient(circle at 14% 16%, ${slide.accent}18 0%, transparent 48%)`,
          transition: "all 0.8s ease"
        }}
      />

      <div className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)`,
          backgroundSize: "54px 54px"
        }}
      />

      <div
        className="relative flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-0 md:min-h-[500px] gap-8"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? `translateX(${direction * 20}px)` : "translateX(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease"
        }}
      >
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="label-tag">{slide.tag}</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span
              className="font-mono text-[10px] tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {slide.offer}
            </span>
          </div>

          <h1
            className="heading-display text-5xl md:text-8xl text-[var(--ink)]"
            style={{ whiteSpace: "pre-line" }}
          >
            {slide.title}
          </h1>

          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-sm">
            {slide.subtitle}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button className="btn-primary group">
              <span>{slide.buttonText}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative z-10 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button className="btn-outline">
              lookbook
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3 pt-4">
            {sliderData.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-1 rounded-full transition-all duration-500 overflow-hidden"
                style={{ width: i === current ? 40 : 16 }}
                aria-label={`Slide ${i + 1}`}
              >
                <span className="absolute inset-0 bg-[var(--text-ghost)]/40" />
                {i === current && (
                  <span
                    className="absolute inset-0 origin-left"
                    style={{
                      background: "var(--accent)",
                    }}
                  />
                )}
              </button>
            ))}
            <span className="font-mono text-[10px] text-[var(--text-ghost)] ml-2">
              {String(current + 1).padStart(2, "0")} / {String(sliderData.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center flex-shrink-0">
          <div
            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full opacity-10 border-2"
            style={{ borderColor: slide.accent }}
          />
          <div
            className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full opacity-5 border"
            style={{ borderColor: slide.accent, background: slide.accent }}
          />
          <div className="absolute -top-4 -right-2 anime-badge font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
            style rank s
          </div>

          <Image
            className="relative w-48 md:w-80 drop-shadow-2xl animate-float"
            src={slide.imgSrc}
            alt={slide.title}
            style={{ filter: "drop-shadow(0 32px 48px rgba(10,10,15,0.15))" }}
          />
        </div>
      </div>

      <button
        onClick={() => goTo((current - 1 + sliderData.length) % sliderData.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--surface-card)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 z-20"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % sliderData.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--surface-card)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 z-20"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default HeaderSlider;
