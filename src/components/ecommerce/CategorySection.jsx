import React from "react";

export default function CategorySection({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="py-5 px-6 bg-[#FAF6F0] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto flex space-x-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[#3B1843] text-white shadow-sm"
                : "bg-white text-[#3B1843] border border-[#E8DFD5] hover:border-[#E0603A] hover:text-[#E0603A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
