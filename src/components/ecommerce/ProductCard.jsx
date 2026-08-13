import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#E0603A]/40 hover:shadow-md transition-all duration-300">
      <div>
        <div className="relative h-48 w-full bg-[#FAF6F0] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
          <span className="absolute top-3 left-3 bg-[#E0603A] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.discount}% OFF
          </span>
        </div>
        <div className="p-5">
          <span className="text-xs text-[#748757] font-bold tracking-wider uppercase">
            {product.category}
          </span>
          <h3 className="text-[#3B1843] font-bold text-base mt-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-zinc-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between mt-2">
        <div>
          <span className="text-[#3B1843] font-extrabold text-lg">
            ₹{product.price}
          </span>
          <span className="text-zinc-400 text-xs line-through ml-2">
            ₹{product.originalPrice}
          </span>
        </div>
        <button className="bg-[#3B1843] hover:bg-[#E0603A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm">
          Add
        </button>
      </div>
    </div>
  );
}
