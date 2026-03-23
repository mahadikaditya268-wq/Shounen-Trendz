import React from "react";

const NewsLetter = () => {
  return (
    <section className="my-20 md:my-28">
      <div className="relative overflow-hidden rounded-[28px] border border-[var(--border-strong)] bg-[var(--surface-card)] px-8 md:px-16 py-14 md:py-20">

        <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-[var(--accent)]/30" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[var(--accent)]/30" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-[var(--accent)]/30" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-[var(--accent)]/30" />

        <div className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, rgba(255, 83, 61, 0.22) 0%, transparent 70%)`
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
          <span className="label-tag">Backstage Access</span>

          <div className="space-y-3">
            <h2 className="heading-display text-5xl md:text-7xl text-[var(--ink)] leading-tight">
              Join The<br />
              Drop List
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm mx-auto">
              Get first access to fresh capsules, styling edits, and anime-inspired collab announcements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full max-w-lg gap-0 sm:gap-0 shadow-sm">
            <input
              type="email"
              placeholder="you@streetmail.com"
              className="flex-1 font-body text-sm text-[var(--text-primary)] bg-[var(--surface-alt)] border border-[var(--border-strong)] sm:border-r-0 px-5 py-4 outline-none placeholder:text-[var(--text-ghost)] rounded-l-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(255,83,61,0.16)] transition-all"
            />
            <button className="bg-[var(--ink)] text-white text-[12px] font-semibold tracking-[0.12em] uppercase px-8 py-4 hover:bg-[var(--accent)] transition-colors duration-300 whitespace-nowrap rounded-r-sm">
              Join Crew
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
            {[
              { icon: "N", text: "No spam" },
              { icon: "24H", text: "Drop alerts first" },
              { icon: "VIP", text: "Members perks" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-2 py-0.5 border border-[var(--border)] rounded-full">{icon}</span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-ghost)]">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
