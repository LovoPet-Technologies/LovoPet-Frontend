import React from "react";

export default function CategorySection({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="py-6 px-6 bg-zinc-900/50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex space-x-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              selectedCategory === cat
                ? "bg-amber-500 text-zinc-950 font-bold"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
