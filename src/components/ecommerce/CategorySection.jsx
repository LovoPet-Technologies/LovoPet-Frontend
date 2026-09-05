import React from "react";

const PALETTE = {
  cream: "#FDF6EC",
  violet: "#3D1E5C",
  terracotta: "#E8752E",
  border: "#EAE0D0",
};

const CATEGORY_DATA = {
  All: {
    image:
      "https://images.pexels.com/photos/6271082/pexels-photo-6271082.jpeg?auto=format&fit=crop&w=400&q=80",
  },
  // Pet Shop Categories
  "Dog Food": {
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
  },
  "Cat Food": {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
  },
  Toys: {
    image:
      "https://images.pexels.com/photos/27636744/pexels-photo-27636744.jpeg?auto=format&fit=crop&w=400&q=80",
  },
  Accessories: {
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=400&q=80",
  },
  // Pharmacy Categories
  Vitamins: {
    image:
      "https://images.pexels.com/photos/17891281/pexels-photo-17891281.jpeg?auto=format&fit=crop&w=400&q=80",
  },
  "Pain Relief": {
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=400&q=80",
  },
  "Flea & Tick": {
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80",
  },
  "Skin Care": {
    image:
      "https://images.pexels.com/photos/4588066/pexels-photo-4588066.jpeg?auto=format&fit=crop&w=400&q=80",
  },
};

export default function CategorySection({
  categories: propCategories,
  selectedCategory,
  onSelectCategory,
}) {
  // Use passed category array or fall back to CATEGORY_DATA keys
  const displayCategories =
    propCategories && propCategories.length > 0
      ? propCategories
      : Object.keys(CATEGORY_DATA);

  return (
    <section style={{ backgroundColor: PALETTE.cream }} className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-4">
          {displayCategories.map((cat) => {
            const active = selectedCategory === cat;
            // Match category image or fallback to 'All' image
            const categoryMeta = CATEGORY_DATA[cat] || CATEGORY_DATA.All;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory && onSelectCategory(cat)}
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
                  src={categoryMeta.image}
                  alt={cat}
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
                      {cat}
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
