import React, { useState } from "react";
import HeroBanner from "../ecommerce/HeroBanner";
import CategorySection from "../ecommerce/CategorySection";
import FilterSortBar from "../ecommerce/FilterSortBar";
import ProductCard from "../ecommerce/ProductCard";

export default function ShopLayout({
  heroTitle,
  heroSubtitle,
  categories,
  products,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");

  // Filter Logic (Search + Category)
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    return b.reviews - a.reviews; // Popularity fallback based on reviews
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3B1843] font-sans">
      <HeroBanner title={heroTitle} subtitle={heroSubtitle} />
      <CategorySection
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <FilterSortBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {sortedProducts.link > 0 || sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-400">
            <p className="text-lg font-medium">
              No products found matching your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
