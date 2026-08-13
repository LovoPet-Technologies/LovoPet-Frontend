import React from "react";

export default function FilterSortBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}) {
  return (
    <div
      id="products"
      className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pt-4"
    >
      <div className="w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-[#E8DFD5] rounded-xl px-4 py-2.5 text-[#3B1843] placeholder-zinc-400 focus:outline-none focus:border-[#E0603A] focus:ring-1 focus:ring-[#E0603A] text-sm shadow-sm transition"
        />
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        <div className="flex items-center gap-2 bg-white border border-[#E8DFD5] px-4 py-2 rounded-xl text-sm text-[#3B1843] shadow-sm">
          <span className="font-medium text-zinc-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[#3B1843] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="popularity">Popularity</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
