import React, { useState, useEffect } from "react";
import HeroBanner from "../components/ecommerce/HeroBanner";
import CategorySection from "../components/ecommerce/CategorySection";
import FilterSortBar from "../components/ecommerce/FilterSortBar";
import PetCard from "../components/adoption/PetCard";
import PetDetailsPage from "../components/adoption/PetDetailsPage";
import { adoptionPets, adoptionCategories } from "../data/adoptionData";

export default function AdoptionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    if (selectedPet) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedPet]);

  const filteredPets = adoptionPets.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPet) {
    return (
      <PetDetailsPage
        pet={selectedPet}
        allPets={adoptionPets}
        onSelectPet={setSelectedPet}
        onBack={() => setSelectedPet(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3B1843] font-sans">
      <HeroBanner
        title="Find Your Perfect Companion"
        subtitle="Every pet deserves a loving home. Adopt, don't shop. Be a part of their second chance."
      />

      <CategorySection
        categories={adoptionCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <FilterSortBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Main Pet Grid */}
          <div className="lg:col-span-8">
            {filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredPets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onSelectPet={setSelectedPet}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-zinc-400 bg-white rounded-2xl border border-[#EFE8DC]">
                <p className="text-lg font-medium">
                  No adoptable pets found matching your criteria.
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#EFE8DC] p-6 rounded-2xl">
              <h3 className="font-bold text-[#3B1843] text-lg mb-3">
                Why Adopt?
              </h3>
              <ul className="space-y-4 text-xs text-zinc-600">
                <li>
                  <strong className="block text-[#3B1843] text-sm">
                    Save a life
                  </strong>
                  Give a neglected pet a second chance at happiness.
                </li>
                <li>
                  <strong className="block text-[#3B1843] text-sm">
                    Affordable
                  </strong>
                  Adoption fees are lower than commercial breeders.
                </li>
                <li>
                  <strong className="block text-[#3B1843] text-sm">
                    Loyal companion
                  </strong>
                  Unconditional love for life.
                </li>
              </ul>
            </div>

            <div className="bg-[#3B1843] text-white p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">
                Not ready to adopt yet?
              </h3>
              <p className="text-xs text-zinc-200 mb-4 leading-relaxed">
                You can still help! Support us with donations, volunteering, or
                by spreading the word.
              </p>
              <button className="w-full py-2.5 bg-[#E0603A] hover:bg-white hover:text-[#3B1843] rounded-xl font-bold text-xs transition">
                Support Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
