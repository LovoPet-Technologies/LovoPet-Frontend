import { Search, SlidersHorizontal } from "lucide-react";
import { specialisations } from "../../data/vetData";

export default function VetFilterSidebar({
  search,
  setSearch,
  selectedSpec,
  setSelectedSpec,
  maxFee,
  setMaxFee,
  sortBy,
  setSortBy,
}) {
  return (
    <aside className="w-full lg:w-72 shrink-0 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2 text-[#5C2A73]">
        <SlidersHorizontal size={18} />
        <h2 className="text-base font-bold">Filters</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <label className="mb-2 block text-xs font-medium text-gray-500">
          Search
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, speciality or city"
            className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-xs font-medium text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#5C2A73] focus:bg-white"
          />
        </div>
      </div>

      {/* Specialisation Pills */}
      <div className="mb-6">
        <label className="mb-3 block text-xs font-semibold text-gray-700">
          Specialisation
        </label>
        <div className="flex flex-wrap gap-2">
          {specialisations.map((spec) => {
            const isSelected = selectedSpec === spec;
            return (
              <button
                key={spec}
                onClick={() => setSelectedSpec(spec)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "border border-[#E86A33] bg-[#E86A33]/10 text-[#E86A33]"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Fee Slider */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-700">Max fee:</span>
          <span className="text-gray-900 font-bold">₹{maxFee}</span>
        </div>
        <input
          type="range"
          min="300"
          max="1000"
          step="50"
          value={maxFee}
          onChange={(e) => setMaxFee(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#E86A33]"
        />
      </div>

      {/* Sort By Radio Options */}
      <div>
        <label className="mb-3 block text-xs font-semibold text-gray-700">
          Sort by
        </label>
        <div className="space-y-2.5">
          {[
            { id: "top-rated", label: "Top rated" },
            { id: "most-experienced", label: "Most experienced" },
            { id: "lowest-fee", label: "Lowest fee" },
          ].map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 text-xs font-medium text-gray-600 transition hover:text-gray-900"
            >
              <input
                type="radio"
                name="sortBy"
                checked={sortBy === option.id}
                onChange={() => setSortBy(option.id)}
                className="h-4 w-4 accent-[#5C2A73]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
