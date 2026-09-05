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
  "Bird Care": {
    image:
      "https://images.pexels.com/photos/37331347/pexels-photo-37331347.jpeg?auto=format&fit=crop&w=400&q=80",
  },
  Aquarium: {
    image:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=400&q=80",
  },
  Grooming: {
    image:
      "https://images.pexels.com/photos/19145877/pexels-photo-19145877.jpeg?auto=format&fit=crop&w=400&q=80",
  },
};

export default function CategorySection({
  categories: propCategories,
  selectedCategory,
  onSelectCategory,
}) {
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
            const data = CATEGORY_DATA[cat] || CATEGORY_DATA.All;

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
                  src={data.image}
                  alt={cat}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Multi-step overlay for seamless contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Bottom Title Container */}
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