import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <section className="pt-20 md:pt-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent-deep)]">
              Street Rotation
            </span>
          </div>
          <h2 className="heading-display text-5xl md:text-6xl text-[var(--ink)]">
            Most Wanted<br />
            Fits
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
            Weekly picks from our urban archive, curated for high-energy street looks.
          </p>
          <button
            onClick={() => router.push('/all-products')}
            className="btn-outline"
          >
            View all fits
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {products.map((product, index) => (
          <div
            key={index}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-14 gap-4">
        <div className="divider-ornament w-full max-w-xs">
          <span className="font-mono text-[9px] tracking-widest text-[var(--text-ghost)] uppercase whitespace-nowrap">
            next district drops
          </span>
        </div>
        <button
          onClick={() => router.push('/all-products')}
          className="btn-outline group"
        >
          <span>Browse full collection</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HomeProducts;
