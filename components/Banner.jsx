import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="my-20 md:my-32">
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--ink)] min-h-[320px] md:min-h-[420px] flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "48px 48px"
          }}
        />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)] opacity-[0.1] blur-[80px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[var(--neon)] opacity-[0.1] blur-[80px] rounded-full" />

        <div className="relative z-10 flex items-center justify-center order-2 md:order-1">
          <Image
            className="w-40 md:w-52 drop-shadow-2xl animate-float"
            src={assets.jbl_soundbox_image}
            alt="Speaker"
            style={{ filter: "drop-shadow(0 24px 40px rgba(200,169,110,0.2))" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 order-1 md:order-2 flex-1 max-w-md">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 h-px bg-[var(--neon)]" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--neon)]">
                Neon Arc Campaign
              </span>
              <span className="w-6 h-px bg-[var(--neon)]" />
            </div>

            <h2 className="heading-display text-5xl md:text-7xl text-white leading-tight">
              Build Your<br />
              Signature Fit
            </h2>
          </div>

          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Unisex streetwear pieces with manga-infused graphics and bold city attitude.
          </p>

          <button className="group flex items-center gap-3 px-8 py-3.5 border border-[var(--neon)]/60 text-[var(--neon)] text-[12px] font-medium tracking-[0.12em] uppercase hover:bg-[var(--neon)] hover:text-[var(--ink)] hover:border-[var(--neon)] transition-all duration-300 rounded-sm">
            <span>Shop Streetwear</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-8 pt-2 border-t border-white/10 w-full justify-center mt-2">
            {[
              { value: "82", label: "Drops" },
              { value: "17K", label: "Style Crew" },
              { value: "4.9", label: "Rated" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="heading-display text-xl text-[var(--neon)]">{value}</p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-white/30">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 hidden md:flex items-center justify-center order-3">
          <Image
            className="w-64 drop-shadow-2xl"
            src={assets.md_controller_image}
            alt="Controller"
            style={{ filter: "drop-shadow(0 24px 40px rgba(10,10,15,0.5))" }}
          />
        </div>
        <Image
          className="md:hidden relative z-10 w-40 order-3 mt-4"
          src={assets.sm_controller_image}
          alt="Controller"
        />
      </div>
    </section>
  );
};

export default Banner;
