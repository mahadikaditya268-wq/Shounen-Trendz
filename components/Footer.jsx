import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[var(--ink)] text-white mt-16 md:mt-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,0.05) 28px, rgba(255,255,255,0.05) 29px)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-16 md:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          <div className="md:col-span-4 space-y-6 relative z-10">
            <div className="opacity-80 hover:opacity-100 transition-opacity">
              <Image className="w-28 brightness-0 invert" src={assets.logo} alt="logo" />
            </div>

            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Street style label blending anime aesthetics, utility cuts, and statement graphics.
            </p>

            <div className="flex items-center gap-3">
              {[
                {
                  label: "Twitter",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {[
              {
                title: "Collections",
                links: ["All Fits", "New Drop", "Best Sellers", "Archive"],
              },
              {
                title: "Brand",
                links: ["About", "Collabs", "Press", "Community"],
              },
              {
                title: "Support",
                links: ["Help Desk", "Returns", "Shipping", "Contact"],
              },
            ].map(({ title, links }) => (
              <div key={title} className="space-y-5">
                <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-3">
          <p className="font-mono text-[10px] tracking-widest uppercase text-white/25">
            © 2026 shounen trendz all rights reserved
          </p>
          <div className="flex items-center gap-6">
            {["Terms", "Privacy", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-[10px] tracking-widest uppercase text-white/25 hover:text-white/60 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
