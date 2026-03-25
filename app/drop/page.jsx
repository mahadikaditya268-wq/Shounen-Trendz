'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

const DropPage = () => {
  const { products, router } = useAppContext();

  const latestDrop = [...products]
    .sort((a, b) => (b.date || 0) - (a.date || 0))
    .slice(0, 9);

  return (
    <>
      <Navbar />
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 md:pt-16 pb-16 md:pb-20">
        <div className="street-panel rounded-[28px] p-8 md:p-12 border border-[var(--border-strong)] mb-10 overflow-hidden relative">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255, 83, 61, 0.08) 18px, rgba(255, 83, 61, 0.08) 19px)" }} />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--accent-deep)] mb-2">Drop Zone</p>
              <h1 className="heading-display text-6xl md:text-8xl text-[var(--ink)]">Latest Drop</h1>
              <p className="mt-3 text-sm md:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
                Fresh arrivals curated from our newest release cycle. Built for street movement with anime attitude.
              </p>
            </div>
            <button
              onClick={() => router.push('/all-products')}
              className="btn-primary"
            >
              <span>Explore All Fits</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]">9 newest products</p>
          <button
            onClick={() => router.push('/all-products')}
            className="btn-outline"
          >
            View archive
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {latestDrop.map((product, index) => (
            <div
              key={product._id || index}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.04}s`, animationFillMode: 'both' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DropPage;
