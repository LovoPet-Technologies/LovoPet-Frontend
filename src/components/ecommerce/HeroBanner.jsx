import React from "react";

export default function HeroBanner({ title, subtitle }) {
  return (
    <div className="bg-gradient-to-b from-[#FAF6F0] via-[#FFFBF7] to-[#FAF6F0] py-16 px-6 text-center border-b border-[#E8DFD5]">
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#3B1843] mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-zinc-600 text-base md:text-lg max-w-xl mx-auto mb-8 font-medium">
        "{subtitle}"
      </p>
      <a
        href="#products"
        className="inline-block bg-[#E0603A] text-white font-semibold px-8 py-3.5 rounded-full shadow-md hover:bg-[#c8522d] hover:shadow-lg transition-all duration-200"
      >
        Explore Products
      </a>
    </div>
  );
}
