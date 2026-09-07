import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  IndianRupee,
} from "lucide-react";
import { specialisations } from "../../data/vetData";

const SORT_OPTIONS = [
  { id: "top-rated", label: "Top rated" },
  { id: "most-experienced", label: "Most experienced" },
  { id: "lowest-fee", label: "Lowest fee" },
];

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
  // Mobile: "filter" | "sort" | "price" | null — only one panel open at a time
  const [mobilePanel, setMobilePanel] = useState(null);

  const togglePanel = (panel) =>
    setMobilePanel((prev) => (prev === panel ? null : panel));

  return (
    <aside className="w-full shrink-0 pb-5 lg:w-64 lg:sticky lg:top-4 lg:self-start">
      {/* MOBILE: Filter / Sort / Price compact buttons (3 columns) */}
      <div className="mb-3 grid grid-cols-3 gap-1.5 lg:hidden">
        {/* Filter Toggle */}
        <button
          type="button"
          onClick={() => togglePanel("filter")}
          className={`flex items-center justify-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold shadow-sm ring-1 transition-all ${
            mobilePanel === "filter"
              ? "bg-[#5C2A73] text-white ring-[#5C2A73]"
              : "bg-white text-[#5C2A73] ring-black/10 hover:bg-[#5C2A73]/5"
          }`}
        >
          <SlidersHorizontal size={13} />
          Filter
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${
              mobilePanel === "filter" ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Sort Toggle */}
        <button
          type="button"
          onClick={() => togglePanel("sort")}
          className={`flex items-center justify-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold shadow-sm ring-1 transition-all ${
            mobilePanel === "sort"
              ? "bg-[#5C2A73] text-white ring-[#5C2A73]"
              : "bg-white text-[#5C2A73] ring-black/10 hover:bg-[#5C2A73]/5"
          }`}
        >
          <ArrowUpDown size={13} />
          Sort
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${
              mobilePanel === "sort" ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Price Dropdown Toggle */}
        <button
          type="button"
          onClick={() => togglePanel("price")}
          className={`flex items-center justify-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold shadow-sm ring-1 transition-all ${
            mobilePanel === "price"
              ? "bg-[#5C2A73] text-white ring-[#5C2A73]"
              : "bg-white text-[#5C2A73] ring-black/10 hover:bg-[#5C2A73]/5"
          }`}
        >
          <IndianRupee size={13} />
          Price
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${
              mobilePanel === "price" ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* MOBILE: Filter panel */}
      <div
        className={`lg:hidden ${
          mobilePanel === "filter"
            ? "mb-3 max-h-[1200px] opacity-100"
            : "max-h-0 opacity-0"
        } overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300`}
      >
        <div className="p-4 sm:p-5">
          <SearchField search={search} setSearch={setSearch} />
          <SpecialisationPills
            selectedSpec={selectedSpec}
            setSelectedSpec={setSelectedSpec}
          />
        </div>
      </div>

      {/* MOBILE: Sort panel */}
      <div
        className={`lg:hidden ${
          mobilePanel === "sort"
            ? "mb-3 max-h-[600px] opacity-100"
            : "max-h-0 opacity-0"
        } overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300`}
      >
        <div className="p-4 sm:p-5">
          <SortOptions sortBy={sortBy} setSortBy={setSortBy} last />
        </div>
      </div>

      {/* MOBILE: Price panel */}
      <div
        className={`lg:hidden ${
          mobilePanel === "price"
            ? "mb-3 max-h-[400px] opacity-100"
            : "max-h-0 opacity-0"
        } overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300`}
      >
        <div className="p-4 sm:p-5">
          <MaxFeeSlider maxFee={maxFee} setMaxFee={setMaxFee} last />
        </div>
      </div>

      {/* DESKTOP (lg+): Compact Sidebar Card */}
      <div className="hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 lg:block">
        <div className="mb-4 flex items-center gap-1.5 text-[#5C2A73]">
          <SlidersHorizontal size={16} />
          <h2 className="text-sm font-bold">Filters</h2>
        </div>

        <SearchField search={search} setSearch={setSearch} />
        <SpecialisationPills
          selectedSpec={selectedSpec}
          setSelectedSpec={setSelectedSpec}
        />
        <MaxFeeSlider maxFee={maxFee} setMaxFee={setMaxFee} />
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} last />
      </div>
    </aside>
  );
}

function SearchField({ search, setSearch }) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-[11px] font-medium text-gray-500">
        Search
      </label>
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Name, speciality or city"
          className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-1.5 pl-8 pr-3 text-[11px] font-medium text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#5C2A73] focus:bg-white focus:ring-2 focus:ring-[#5C2A73]/15"
        />
      </div>
    </div>
  );
}

function SpecialisationPills({ selectedSpec, setSelectedSpec }) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-[11px] font-semibold text-gray-700">
        Specialisation
      </label>
      <div className="flex flex-wrap gap-1.5">
        {specialisations.map((spec) => {
          const isSelected = selectedSpec === spec;
          return (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
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
  );
}

function MaxFeeSlider({ maxFee, setMaxFee, last }) {
  return (
    <div className={last ? "" : "mb-4"}>
      <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
        <span className="text-gray-700">Max fee:</span>
        <span className="rounded-full bg-[#5C2A73]/10 px-2 py-0.5 text-[11px] text-[#5C2A73]">
          ₹{maxFee}
        </span>
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
      <div className="mt-1 flex justify-between text-[10px] font-medium text-gray-400">
        <span>₹300</span>
        <span>₹1000</span>
      </div>
    </div>
  );
}

function SortOptions({ sortBy, setSortBy, last }) {
  return (
    <div className={last ? "" : "mb-4"}>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700">
        Sort by
      </label>
      <div className="space-y-0.5">
        {SORT_OPTIONS.map((option) => {
          const isSelected = sortBy === option.id;
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition ${
                isSelected
                  ? "bg-[#5C2A73]/10 text-[#5C2A73]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span
                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-all ${
                  isSelected
                    ? "border-[#5C2A73] bg-[#5C2A73]"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isSelected && (
                  <span className="h-1 w-1 rounded-full bg-white" />
                )}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}