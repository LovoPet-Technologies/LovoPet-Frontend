import React from "react";

const PALETTE = {
  cream: "#FDF6EC",
  violet: "#3D1E5C",
  terracotta: "#E8752E",
  border: "#EAE0D0",
};

export default function CategorySection({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section style={{ backgroundColor: PALETTE.cream }} className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-4">
          {categories.map((catObj) => {
            // Support both object format ({ name, image }) and string format ("Dog Food")
            const catName = typeof catObj === "object" ? catObj.name : catObj;
            const catImage = typeof catObj === "object" ? catObj.image : "";

            const active = selectedCategory === catName;

            return (
              <button
                key={catName}
                onClick={() => onSelectCategory && onSelectCategory(catName)}
                aria-pressed={active}
                className={`group relative flex-shrink-0 w-32 aspect-[4/5] rounded-2xl overflow-hidden flex flex-col justify-end text-left transition-all duration-300 focus:outline-none ${
                  active
                    ? "ring-2 ring-offset-2 ring-[#E8752E] shadow-md scale-102"
                    : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
                }`}
                style={{
                  "--tw-ring-offset-color": PALETTE.cream,
                }}
              >
                {/* Background Image */}
                <img
                  src={catImage}
                  alt={catName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Contrast Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Bottom Title Bar */}
                <div className="relative z-10 p-3 w-full">
                  <div
                    className={`px-2.5 py-1.5 rounded-lg transition-colors duration-200 text-center ${
                      active
                        ? "bg-[#E8752E] text-white"
                        : "bg-black/40 backdrop-blur-md text-white/95 group-hover:bg-black/60"
                    }`}
                  >
                    <span className="block text-xs font-bold tracking-wide uppercase truncate">
                      {catName}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
