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
    <div id="products" className="mb-4 flex flex-col gap-2.5 pt-1">
      {/* Inline Search and Sort Row */}
      <div className="flex items-center gap-2">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search food, medicine, toys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#E8DFD3] bg-white py-2 pl-9 pr-3 text-xs font-medium text-[#3B1843] shadow-xs transition placeholder:text-zinc-400 focus:border-[#E0603A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E0603A]/15 lg:text-sm"
          />
        </div>

        {/* Compact Sort Button */}
        <div className="relative flex shrink-0 items-center rounded-xl border border-[#E8DFD3] bg-white px-3 py-2 text-xs font-bold text-[#3B1843] shadow-xs transition hover:border-[#E0603A] lg:text-sm">
          <div className="flex items-center gap-1.5 pointer-events-none">
            <SlidersHorizontal size={14} className="text-[#748757]" />
            <span className="hidden sm:inline">Sort</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="absolute inset-0 w-full opacity-0 cursor-pointer text-xs lg:text-sm"
          >
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          <ChevronDown
            size={13}
            className="pointer-events-none ml-1.5 text-[#3B1843]"
          />
        </div>
      </div>

      {/* Results Count Text */}
      <p className="text-[11px] font-semibold tracking-wide text-zinc-400 sm:text-xs">
        Showing <span className="text-[#3B1843]">{resultCount}</span>{" "}
        {resultCount === 1 ? "product" : "products"}
      </p>
    </div>
  );
}
