import React from "react";

export default function HeroBanner({ title, subtitle }) {
  return (
    <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 py-16 px-6 text-center border-b border-zinc-800">
      <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
        {title}
      </h1>
      <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-6">
        "{subtitle}"
      </p>
      <a
        href="#products"
        className="inline-block bg-amber-500 text-zinc-950 font-semibold px-6 py-3 rounded-lg shadow hover:bg-amber-400 transition"
      >
        Explore Products
      </a>
    </div>
  );
}
