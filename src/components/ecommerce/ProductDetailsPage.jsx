import React, { useState } from "react";
import { Star, Heart, Share2, ArrowLeft, ShoppingCart, Zap } from "lucide-react";

export default function ProductDetailsPage({ product, onBack }) {
  const sizes = product.sizes || ["S", "M", "L"];
  const colors = product.colors || ["Green", "Blue"];
  
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mainImage, setMainImage] = useState(product.image);

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image, product.image];

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
          <span>Home</span> / <span>Pet Supplies</span> / <span>{product.category}</span> / <span className="text-zinc-800 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {galleryImages.map((img, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden bg-[#FAF6F0] border border-zinc-100 group">
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition duration-300"
                />
                {index === 0 && (
                  <>
                    <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
                      <Heart size={18} className="text-zinc-600 hover:text-red-500" />
                    </button>
                    <button className="absolute top-16 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
                      <Share2 size={18} className="text-zinc-600" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Product Details & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Promo Banner */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-center justify-between mb-6">
              <span className="text-xs text-zinc-700 font-medium">Balanced nutrition in every bowl. <b>Shop now</b></span>
              <span className="bg-[#E0603A] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">Ad</span>
            </div>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">
                  Selected Size: <span className="font-bold text-black">{selectedSize}</span>
                  <button className="ml-3 text-xs text-blue-600 font-medium hover:underline">Size Chart</button>
                </p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl font-bold text-sm flex items-center justify-center border-2 transition ${
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

            {/* Color Selector */}
            {colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">
                  Selected Color: <span className="font-bold text-black">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {colors.map((color) => (
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

            {/* Title & Ratings */}
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                {product.rating} <Star size={10} fill="currentColor" />
              </span>
              <span className="text-xs font-bold text-zinc-400">({product.reviews} reviews)</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-green-600 font-bold text-xl">↓{product.discount}%</span>
              <span className="text-zinc-400 text-lg line-through">₹{product.originalPrice}</span>
              <span className="text-3xl font-extrabold text-zinc-900">₹{product.price}</span>
            </div>

            {/* Description */}
            <p className="text-zinc-600 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <button className="flex items-center justify-center gap-2 py-4 border-2 border-zinc-200 rounded-xl font-bold text-zinc-800 hover:bg-zinc-50 transition">
                <ShoppingCart size={18} /> Add to cart
              </button>
              <button className="flex items-center justify-center gap-2 py-4 bg-yellow-400 hover:bg-yellow-500 rounded-xl font-bold text-zinc-900 transition shadow-md">
                <Zap size={18} fill="currentColor" /> Buy at ₹{product.price}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}