import React from "react";

const NewsLetter = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 my-16 md:my-24 mx-4 md:mx-0">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/8 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 md:py-20">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase text-orange-400 border border-orange-400/20 rounded-full mb-6">
          Exclusive Offer
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-lg leading-tight">
          Subscribe now &<br />get <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">20% off</span>
        </h2>

        <p className="text-sm md:text-base text-gray-400 mt-4 mb-10 max-w-md leading-relaxed">
          Join our newsletter and be the first to know about new arrivals, exclusive deals, and insider-only discounts.
        </p>

        {/* Input Group */}
        <div className="flex items-center max-w-xl w-full h-12 md:h-14 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 p-1.5 focus-within:border-orange-500/50 transition-colors duration-300">
          <input
            className="flex-1 h-full bg-transparent outline-none px-5 text-sm text-white placeholder:text-gray-500"
            type="email"
            placeholder="Enter your email address"
          />
          <button className="h-full px-6 md:px-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 whitespace-nowrap">
            Subscribe
          </button>
        </div>

        <p className="text-[11px] text-gray-500 mt-4">No spam, unsubscribe anytime. We respect your privacy.</p>
      </div>
    </section>
  );
};

export default NewsLetter;
