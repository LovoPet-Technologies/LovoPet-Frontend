// FilterSortBar.jsx
import React from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function FilterSortBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  resultCount,
}) {
  return (
    <div id="products" className="flex flex-col gap-4 mb-7 pt-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search food, medicine, toys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E8DFD3] rounded-2xl pl-11 pr-4 py-3 text-[#3B1843] placeholder-zinc-400 focus:outline-none focus:border-[#E0603A] focus:ring-2 focus:ring-[#E0603A]/15 text-sm shadow-sm transition"
          />
        </div>

        <div className="flex items-center gap-2 bg-white border border-[#E8DFD3] px-4 py-3 rounded-2xl text-sm shadow-sm w-full md:w-auto justify-between md:justify-start">
          <SlidersHorizontal size={15} className="text-[#748757]" />
          <span className="font-medium text-zinc-500 whitespace-nowrap">
            Sort by
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-[#3B1843] font-bold focus:outline-none cursor-pointer pr-5 text-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="low-high">Price: low to high</option>
              <option value="high-low">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#3B1843] pointer-events-none"
            />
          </div>
        </div>
      </div>

      <p className="text-xs font-semibold text-zinc-400 tracking-wide">
        {resultCount} {resultCount === 1 ? "product" : "products"} found
      </p>
    </div>
  );
}
