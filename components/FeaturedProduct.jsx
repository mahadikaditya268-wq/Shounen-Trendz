import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    tag: "Outerwear",
    title: "Night Run Layer",
    description: "Stackable jackets with reflective panel lines inspired by anime chase scenes.",
    cta: "Explore Outerwear",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    tag: "Accessories",
    title: "Signal Core Pack",
    description: "Crossbody bags, rings, and chains with clean manga-line detailing.",
    cta: "Shop Accessories",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    tag: "Graphic Tees",
    title: "Panel Print Edit",
    description: "Premium cotton tees featuring high-contrast art and bold typography blocks.",
    cta: "View Tees",
  },
];

const FeaturedProduct = () => {
  return (
    <section className="mt-20 md:mt-32">
      <div className="flex flex-col items-center mb-12 text-center space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[var(--accent)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent-deep)]">
            District Highlights
          </span>
          <span className="w-6 h-px bg-[var(--accent)]" />
        </div>
        <h2 className="heading-display text-5xl md:text-6xl text-[var(--ink)]">
          Featured Looks
        </h2>
        <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
          Editorial picks from this week&rsquo;s anime-street crossover collection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {products.map(({ id, image, tag, title, description, cta }, idx) => (
          <div
            key={id}
            className={`group relative overflow-hidden cursor-pointer ${
              idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
            style={{ borderRadius: 'var(--radius-lg)', aspectRatio: idx === 0 ? '3/4' : '3/4' }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              style={{ transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/95 via-[var(--ink)]/45 to-transparent" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.08) 10px, rgba(255,255,255,0.08) 11px)' }} />

            <div className="absolute top-5 left-5">
              <span className="font-mono text-[9px] tracking-widest uppercase text-white/85 bg-black/30 backdrop-blur-sm border border-white/30 px-3 py-1.5 rounded-full">
                {tag}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 space-y-3">
              <div className="w-8 h-px bg-[var(--accent)] mb-4 transition-all duration-500 group-hover:w-16" />

              <h3 className="heading-display text-2xl md:text-3xl text-white leading-tight">
                {title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1 group-hover:translate-y-0">
                {description}
              </p>

              <button className="flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-white mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:text-[var(--accent-soft)]">
                {cta}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
