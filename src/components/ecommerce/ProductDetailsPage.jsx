import React, { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  ArrowLeft,
  ShoppingCart,
  Zap,
  CheckCircle2,
} from "lucide-react";
import ProductCard from "./ProductCard";
import {
  getStockStatus,
  isOutOfStock,
  isFood,
  isMedicine,
  getHighlights,
  getKeyBenefits,
  getHowToUse,
  getIngredients,
  getReviews,
  getRatingBreakdown,
  getRelatedProducts,
} from "../../utils/productUtils";

export default function ProductDetailsPage({
  product,
  onBack,
  allProducts = [],
  onSelectProduct,
}) {
  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  const hasColors = Array.isArray(product.colors) && product.colors.length > 0;

  const [selectedSize, setSelectedSize] = useState(
    hasSizes ? product.sizes[0] : null,
  );
  const [selectedColor, setSelectedColor] = useState(
    hasColors ? product.colors[0] : null,
  );

  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];
  const [mainImage, setMainImage] = useState(galleryImages[0]);

  const stockStatus = getStockStatus(product);
  const soldOut = isOutOfStock(product);
  const ingredients = getIngredients(product);
  const reviews = getReviews(product);
  const breakdown = getRatingBreakdown(product);
  const related = getRelatedProducts(product, allProducts, 4);

  const stockBadgeStyles = {
    ok: "bg-green-50 text-green-700 border border-green-200",
    low: "bg-[#F6E4C9] text-[#8A5A16] border border-[#E9C98A]",
    out: "bg-zinc-100 text-zinc-500 border border-zinc-200",
  };

  return (
    <div className="min-h-screen bg-white text-[#3B1843] font-sans">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-b text-xs text-zinc-500 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-semibold text-[#3B1843] hover:text-[#E0603A] transition"
        >
          <ArrowLeft size={16} /> Back to Shop
        </button>
        <div className="hidden md:flex items-center gap-1.5">
          <span>Home</span> / <span>Pet Supplies</span> /{" "}
          <span>{product.category}</span> /{" "}
          <span className="text-zinc-800 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-[#FAF6F0] border border-zinc-100 group">
              <img
                src={mainImage}
                alt={product.name}
                className={`w-full h-96 md:h-[28rem] object-cover transition ${
                  soldOut ? "opacity-60 grayscale" : ""
                }`}
              />
              <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
                <Heart size={18} className="text-zinc-600 hover:text-red-500" />
              </button>
              <button className="absolute top-16 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
                <Share2 size={18} className="text-zinc-600" />
              </button>
              {soldOut && (
                <span className="absolute bottom-4 left-4 bg-zinc-800/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Out of stock
                </span>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="flex gap-3 mt-4">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      mainImage === img
                        ? "border-[#E0603A]"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Highlights */}
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-3">Highlights</h2>
              <ul className="space-y-2">
                {getHighlights(product).map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-zinc-600"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-[#748757] mt-0.5 shrink-0"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Benefits */}
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-3">Key Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {getKeyBenefits(product).map((b, i) => (
                  <div
                    key={i}
                    className="bg-[#FAF6F0] border border-zinc-100 rounded-xl p-4"
                  >
                    <p className="font-bold text-sm mb-1">{b.title}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {b.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* How to use */}
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-3">
                {isMedicine(product)
                  ? "Dosage & Directions"
                  : isFood(product)
                    ? "Feeding Guide"
                    : "How to Use"}
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {getHowToUse(product)}
              </p>
            </div>

            {/* Ingredients */}
            {ingredients && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-3">
                  {isMedicine(product) ? "Composition" : "Ingredients"}
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {ingredients}
                </p>
              </div>
            )}

            {/* Ratings & Reviews */}
            <div className="mt-10 border-t pt-8">
              <h2 className="text-lg font-bold mb-4">Ratings & Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 flex flex-col items-start">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold">
                      {product.rating}
                    </span>
                    <Star size={20} fill="#C79A3E" color="#C79A3E" />
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    {product.reviews} verified ratings
                  </p>
                </div>
                <div className="md:col-span-8 space-y-1.5">
                  {breakdown.map((row) => (
                    <div
                      key={row.star}
                      className="flex items-center gap-2 text-xs text-zinc-500"
                    >
                      <span className="w-8">{row.star}★</span>
                      <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C79A3E] rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-10 text-right">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="border border-zinc-100 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{r.name}</span>
                      <span className="flex items-center gap-1 text-xs font-bold bg-green-700 text-white px-2 py-0.5 rounded">
                        {r.rating} <Star size={10} fill="currentColor" />
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Buy Box */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-center justify-between mb-6">
              <span className="text-xs text-zinc-700 font-medium">
                Balanced nutrition in every bowl. <b>Shop now</b>
              </span>
              <span className="bg-[#E0603A] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                Ad
              </span>
            </div>

            <span
              className={`self-start text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-4 ${stockBadgeStyles[stockStatus.tone]}`}
            >
              {stockStatus.label}
            </span>

            {hasSizes && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">
                  Selected Size:{" "}
                  <span className="font-bold text-black">{selectedSize}</span>
                  <button className="ml-3 text-xs text-blue-600 font-medium hover:underline">
                    Size Chart
                  </button>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 h-12 px-3 rounded-xl font-bold text-sm flex items-center justify-center border-2 transition ${
                        selectedSize === size
                          ? "border-black bg-zinc-900 text-white"
                          : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasColors && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">
                  Selected Color:{" "}
                  <span className="font-bold text-black">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm border-2 transition ${
                        selectedColor === color
                          ? "border-black bg-zinc-900 text-white"
                          : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <span
              className="text-[11px] font-bold tracking-wider uppercase"
              style={{ color: "#748757" }}
            >
              {product.brand} · {product.category}
            </span>
            <h1 className="text-2xl font-bold text-zinc-900 mt-1 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                {product.rating} <Star size={10} fill="currentColor" />
              </span>
              <span className="text-xs font-bold text-zinc-400">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              {product.discount > 0 && (
                <span className="text-green-600 font-bold text-xl">
                  ↓{product.discount}%
                </span>
              )}
              <span className="text-zinc-400 text-lg line-through">
                ₹{product.originalPrice?.toLocaleString("en-IN")}
              </span>
              <span className="text-3xl font-extrabold text-zinc-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <button
                disabled={soldOut}
                className="flex items-center justify-center gap-2 py-4 border-2 border-zinc-200 rounded-xl font-bold text-zinc-800 hover:bg-zinc-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />{" "}
                {soldOut ? "Notify me" : "Add to cart"}
              </button>
              <button
                disabled={soldOut}
                className="flex items-center justify-center gap-2 py-4 bg-yellow-400 hover:bg-yellow-500 rounded-xl font-bold text-zinc-900 transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Zap size={18} fill="currentColor" /> Buy at ₹{product.price}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 border-t pt-8">
            <h2 className="text-lg font-bold mb-4">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
