import React, { useState, useEffect, useCallback } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentSlide + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, sliderData.length, goToSlide]);

  const handleSlideChange = (index) => {
    goToSlide(index);
  };

  return (
    <div className="relative w-full mt-4 md:mt-6 overflow-hidden rounded-2xl md:rounded-3xl">
      {/* Slide Track */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="relative flex flex-col-reverse md:flex-row items-center justify-between min-w-full bg-gradient-to-br from-[#E8EAF0] via-[#ECEEF4] to-[#F0F1F6] py-10 md:py-0 md:min-h-[420px] px-6 md:px-16 overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl" />

            {/* Text Content */}
            <div className="relative z-10 md:pl-4 mt-8 md:mt-0 md:max-w-lg">
              <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-orange-600 bg-orange-50 rounded-full mb-4 md:mb-5">
                {slide.offer}
              </span>
              <h1 className="text-2xl md:text-[42px] md:leading-[1.15] font-bold text-gray-900 tracking-tight">
                {slide.title}
              </h1>
              <div className="flex items-center gap-3 mt-6 md:mt-8">
                <button className="px-8 md:px-10 py-3 md:py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white font-semibold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-3 font-medium text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300">
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-1.5 transition-transform duration-300" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative z-10 flex items-center justify-center flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-2xl scale-110" />
                <Image
                  className="relative md:w-80 w-52 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`transition-all duration-500 rounded-full ${
              currentSlide === index
                ? "w-8 h-2.5 bg-orange-500 shadow-md shadow-orange-500/30"
                : "w-2.5 h-2.5 bg-gray-400/40 hover:bg-gray-400/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
