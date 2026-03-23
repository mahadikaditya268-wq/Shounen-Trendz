import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <section className="flex flex-col items-center pt-16 md:pt-24">
      {/* Section Header */}
      <div className="flex items-center justify-between w-full mb-8 md:mb-10">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500 mb-2 block">Trending Now</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Popular Products</h2>
        </div>
        <button
          onClick={() => { router.push('/all-products') }}
          className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 group"
        >
          View all
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 w-full pb-10">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Mobile See More */}
      <button
        onClick={() => { router.push('/all-products') }}
        className="group relative px-12 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 overflow-hidden"
      >
        <span className="relative z-10">See more</span>
        <div className="absolute inset-0 bg-orange-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </button>
    </section>
  );
};

export default HomeProducts;
