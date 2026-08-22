import { useState, useMemo } from "react";
import VetFilterSidebar from "../vet/VetFilterSidebar";
import VetCard from "../vet/VetCard";
import { vetsData } from "../../data/vetData";

const ITEMS_PER_PAGE = 6;

export default function VetLayout() {
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [maxFee, setMaxFee] = useState(800);
  const [sortBy, setSortBy] = useState("top-rated");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Sort Logic
  const filteredVets = useMemo(() => {
    return vetsData
      .filter((vet) => {
        const matchesSearch =
          vet.name.toLowerCase().includes(search.toLowerCase()) ||
          vet.specialisation.toLowerCase().includes(search.toLowerCase()) ||
          vet.qualification.toLowerCase().includes(search.toLowerCase());

        const matchesSpec =
          selectedSpec === "All" || vet.specialisation === selectedSpec;

        const matchesFee = vet.fee <= maxFee;

        return matchesSearch && matchesSpec && matchesFee;
      })
      .sort((a, b) => {
        if (sortBy === "top-rated") return b.rating - a.rating;
        if (sortBy === "most-experienced") return b.experience - a.experience;
        if (sortBy === "lowest-fee") return a.fee - b.fee;
        return 0;
      });
  }, [search, selectedSpec, maxFee, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredVets.length / ITEMS_PER_PAGE) || 1;
  const paginatedVets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVets, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 pt-25 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-[#3B1E43] sm:text-4xl lg:text-5xl">
            Find the right vet for your pet
          </h1>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Licensed specialists across surgery, dermatology, nutrition,
            emergency care, and behavior.
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Sidebar */}
          <VetFilterSidebar
            search={search}
            setSearch={setSearch}
            selectedSpec={selectedSpec}
            setSelectedSpec={setSelectedSpec}
            maxFee={maxFee}
            setMaxFee={setMaxFee}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Main Doctor Grid */}
          <main className="flex-1">
            <p className="mb-4 text-xs font-medium text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-800">
                {paginatedVets.length}
              </span>{" "}
              of {filteredVets.length} vets
            </p>

            {paginatedVets.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedVets.map((vet) => (
                  <VetCard key={vet.id} vet={vet} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-12 text-center text-gray-500 ring-1 ring-black/5">
                No veterinarians found matching your search or price filter.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm ring-1 ring-black/5 transition hover:bg-gray-50 disabled:opacity-40"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`h-8 w-8 rounded-full text-xs font-bold transition ${
                        isActive
                          ? "bg-[#5C2A73] text-white shadow"
                          : "bg-white text-gray-600 shadow-sm ring-1 ring-black/5 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm ring-1 ring-black/5 transition hover:bg-gray-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
