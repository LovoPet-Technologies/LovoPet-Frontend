import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition shadow-lg">
      <div>
        <div className="relative h-48 w-full bg-zinc-800 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
          <span className="absolute top-2 left-2 bg-amber-500 text-zinc-950 text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        </div>
        <div className="p-4">
          <span className="text-xs text-amber-500 font-semibold tracking-wide uppercase">
            {product.category}
          </span>
          <h3 className="text-white font-semibold text-base mt-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between mt-4">
        <div>
          <span className="text-white font-bold text-lg">₹{product.price}</span>
          <span className="text-zinc-500 text-xs line-through ml-2">
            ₹{product.originalPrice}
          </span>
        </div>
        <button className="bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-white text-xs font-semibold px-3 py-2 rounded-lg transition">
          Add
        </button>
      </div>
    </div>
  );
}
