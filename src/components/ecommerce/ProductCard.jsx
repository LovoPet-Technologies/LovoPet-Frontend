// ProductCard.jsx
import React, { useState } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";

function StockBadge({ stock }) {
  if (stock === "out-of-stock") {
    return (
      <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-full bg-zinc-200 text-zinc-500">
        Out of stock
      </span>
    );
  }
  if (stock === "low-stock") {
    return (
      <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-full bg-[#F6E4C9] text-[#8A5A16]">
        Only a few left
      </span>
    );
  }
  return null;
}

export default function ProductCard({ product }) {
  const [saved, setSaved] = useState(false);
  const soldOut = product.stock === "out-of-stock";

  return (
    <div className="group bg-white border border-[#EFE8DC] rounded-[20px] overflow-hidden flex flex-col justify-between hover:border-[#E0603A]/50 hover:shadow-[0_18px_30px_-18px_rgba(59,24,67,0.28)] transition-all duration-300">
      <div>
        <div className="relative h-48 w-full bg-[#FAF6F0] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition duration-300 ${
              soldOut ? "opacity-50 grayscale" : ""
            }`}
          />
          {product.discount > 0 && (
            <span
              className="absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
              style={{ background: "#E0603A" }}
            >
              {product.discount}% off
            </span>
          )}
          <button
            onClick={() => setSaved((s) => !s)}
            aria-label="Save to wishlist"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          >
            <Heart
              size={15}
              fill={saved ? "#E0603A" : "none"}
              color={saved ? "#E0603A" : "#3B1843"}
              strokeWidth={2.2}
            />
          </button>
          {(product.stock === "low-stock" || soldOut) && (
            <div className="absolute bottom-3 left-3">
              <StockBadge stock={product.stock} />
            </div>
          )}
        </div>

        <div className="p-5 pb-3">
          <span
            className="text-[11px] font-bold tracking-wider uppercase"
            style={{ color: "#748757" }}
          >
            {product.category}
          </span>
          <h3
            className="text-[#3B1843] font-bold text-[15px] mt-1 line-clamp-1"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            {product.name}
          </h3>
          <p className="text-zinc-500 text-xs mt-1.5 line-clamp-2 leading-relaxed min-h-[32px]">
            {product.description}
          </p>

          <div className="flex items-center gap-1 mt-2.5">
            <Star size={13} fill="#C79A3E" color="#C79A3E" />
            <span className="text-xs font-bold text-[#3B1843]">
              {product.rating}
            </span>
            <span className="text-xs text-zinc-400">({product.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-2 flex items-center justify-between mt-1">
        <div>
          <span className="text-[#3B1843] font-extrabold text-lg">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-zinc-400 text-xs line-through ml-2">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <button
          disabled={soldOut}
          className="flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: soldOut ? "#B7AFA2" : "#3B1843" }}
          onMouseEnter={(e) => {
            if (!soldOut) e.currentTarget.style.background = "#E0603A";
          }}
          onMouseLeave={(e) => {
            if (!soldOut) e.currentTarget.style.background = "#3B1843";
          }}
        >
          <ShoppingCart size={13} />
          {soldOut ? "Notify me" : "Add"}
        </button>
      </div>
    </div>
  );
}
