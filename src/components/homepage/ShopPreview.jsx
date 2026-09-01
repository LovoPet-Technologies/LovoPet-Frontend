// components/homepage/ShopPreview.jsx
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
// NOTE: adjust this path to wherever petShopProducts.js actually lives in your project
import { petShopProducts } from "../../data/petShopData";
import SectionNav from "./SectionNav";

const featuredIds = [1, 7, 16, 21];

function ShopPreview() {
  const navigate = useNavigate();
  const featured = featuredIds
    .map((id) => petShopProducts.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section id="shop" className="scroll-mt-16 bg-[#FDF8F2] pt-16 lg:pt-20">
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="rounded-full bg-[#8B9A5B]/15 px-3.5 py-1.5 text-xs lg:text-sm font-semibold text-[#5C2A73]">
              THE LOVOPET SHOP
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-extrabold text-[#1E2A4A]">
              Shop the Essentials
            </h2>
            <p className="mt-2 max-w-xl text-base text-gray-600">
              Food, toys, and everyday gear for pets and farm animals alike —
              picked and stocked by the LovoPet team.
            </p>
          </div>
          <button
            onClick={() => navigate("/pet-shop")}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#5C2A73] px-5 py-2.5 text-sm font-bold text-[#5C2A73] transition-all duration-300 hover:bg-[#5C2A73] hover:text-white"
          >
            Visit the shop
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 pb-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((product) => (
            <button
              key={product.id}
              onClick={() => navigate("/pet-shop")}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5D8C9] bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#F8F3EC]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.discount ? (
                  <span className="absolute left-2 top-2 rounded-full bg-[#E86A33] px-2 py-1 text-[10px] font-bold text-white">
                    {product.discount}% OFF
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8B9A5B]">
                  {product.category}
                </span>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold text-[#1E2A4A] sm:text-base">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  <Star size={12} className="fill-[#E86A33] text-[#E86A33]" />
                  {product.rating}
                  <span className="text-gray-300">•</span>
                  {product.reviews} reviews
                </div>
                <div className="mt-auto flex items-baseline gap-2 pt-3">
                  <span className="text-base font-extrabold text-[#5C2A73] sm:text-lg">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <SectionNav nextId="why-choose-us" label="Why Choose LovoPet" />
    </section>
  );
}

export default ShopPreview;