import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <section className="mt-20 md:mt-28">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12 md:mb-16">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-3">Curated Collection</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
        <div className="flex items-center gap-1.5 mt-4">
          <div className="w-8 h-[2px] bg-gray-300 rounded-full" />
          <div className="w-12 h-[2px] bg-orange-500 rounded-full" />
          <div className="w-8 h-[2px] bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 px-4 md:px-0">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]">
            {/* Image */}
            <Image
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="space-y-2.5">
                <p className="font-bold text-xl lg:text-2xl text-white tracking-tight leading-tight">{title}</p>
                <p className="text-sm text-white/70 leading-relaxed max-w-[260px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {description}
                </p>
                <button className="flex items-center gap-2 mt-2 bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 delay-150">
                  Shop Now
                  <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
