import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between my-16 md:my-24 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1d2e] via-[#252842] to-[#1a1d2e] min-h-[300px] md:min-h-[360px]">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Left Product */}
      <div className="relative z-10 md:pl-12 pt-10 md:pt-0 flex items-center justify-center">
        <Image
          className="max-w-48 md:max-w-56 drop-shadow-[0_20px_60px_rgba(255,120,50,0.15)] hover:scale-105 transition-transform duration-500"
          src={assets.jbl_soundbox_image}
          alt="jbl_soundbox_image"
        />
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 px-6 py-8 md:py-0">
        <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400 border border-orange-400/30 rounded-full">
          Gear Up
        </span>
        <h2 className="text-2xl md:text-4xl font-bold text-white max-w-[340px] leading-tight tracking-tight">
          Level Up Your Gaming Experience
        </h2>
        <p className="max-w-[360px] text-sm md:text-base text-gray-400 leading-relaxed">
          From immersive sound to precise controls—everything you need to win
        </p>
        <button className="group flex items-center justify-center gap-2 px-10 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white font-semibold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 hover:-translate-y-0.5 transition-all duration-300 mt-2">
          Buy now
          <Image className="group-hover:translate-x-1 transition-transform duration-300 brightness-0 invert" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>

      {/* Right Product */}
      <Image
        className="hidden md:block relative z-10 max-w-80 drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500"
        src={assets.md_controller_image}
        alt="md_controller_image"
      />
      <Image
        className="md:hidden relative z-10 mt-4"
        src={assets.sm_controller_image}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;
