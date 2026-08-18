// CategorySection.jsx
import React from "react";
import {
  Stethoscope,
  Pill,
  ShoppingBag,
  PawPrint,
  Cpu,
  Leaf,
} from "lucide-react";

const CATEGORY_ICONS = {
  All: PawPrint,
  "Vet Care": Stethoscope,
  Pharmacy: Pill,
  "Pet Shop": ShoppingBag,
  "AI Health": Cpu,
  Natural: Leaf,
};

export default function CategorySection({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="bg-[#FBF6EF] pb-8 -mt-1">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-3 md:gap-5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] || PawPrint;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className="flex flex-col items-center gap-2 shrink-0 group"
              >
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200"
                  style={{
                    borderColor: active ? "#E0603A" : "#E8DFD3",
                    background: active ? "#E0603A" : "#FFFFFF",
                    boxShadow: active
                      ? "0 8px 18px -8px rgba(224,96,58,0.5)"
                      : "none",
                  }}
                >
                  <Icon
                    size={22}
                    strokeWidth={2.2}
                    color={active ? "#FFFFFF" : "#3B1843"}
                  />
                </span>
                <span
                  className="text-[11px] font-bold uppercase tracking-wide whitespace-nowrap"
                  style={{ color: active ? "#3B1843" : "#8A8378" }}
                >
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
