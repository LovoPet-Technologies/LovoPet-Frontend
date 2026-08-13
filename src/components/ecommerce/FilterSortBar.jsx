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
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
        />
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg text-sm text-zinc-300">
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white focus:outline-none cursor-pointer"
          >
            <option value="popularity" className="bg-zinc-900">
              Popularity
            </option>
            <option value="low-high" className="bg-zinc-900">
              Price: Low to High
            </option>
            <option value="high-low" className="bg-zinc-900">
              Price: High to Low
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
