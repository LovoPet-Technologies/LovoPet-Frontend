import { useState, useMemo, useEffect } from "react";
import VetFilterSidebar from "../vet/VetFilterSidebar";
import VetCard from "../vet/VetCard";
import BookingModal from "../consultation/BookingModal";
import { vetsData as fallbackVetsData } from "../../data/vetData";
import consultationApi from "../../api/consultationApi";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function VetLayout() {
  const [vetsList, setVetsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVetForBooking, setSelectedVetForBooking] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [maxFee, setMaxFee] = useState(2000);
  const [sortBy, setSortBy] = useState("top-rated");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch veterinarians from backend API
  useEffect(() => {
    let active = true;
    setLoading(true);

    consultationApi
      .getVets()
      .then((res) => {
        if (!active) return;
        if (res.success && Array.isArray(res.vets) && res.vets.length > 0) {
          const mappedVets = res.vets.map((v) => ({
            id: v._id,
            _id: v._id,
            name: v.name,
            specialisation: v.specialization || "General Medicine & Surgery",
            qualification: v.qualification || "BVSc & AH",
            experience: v.experienceYears || 5,
            experienceYears: v.experienceYears || 5,
            fee: v.consultationFee || 500,
            consultationFee: v.consultationFee || 500,
            rating: 4.9,
            reviews: 114,
            avatar:
              v.profileImage ||
              "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
            profileImage: v.profileImage,
            nextAvailable: "Today, Available Slots",
            bio: v.bio,
            availability: v.availability,
          }));

          // Only display veterinarians created in database
          setVetsList(mappedVets);
        } else {
          setVetsList([]);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch vets from backend:", err.message);
        if (active) setVetsList([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Filter & Sort Logic
  const filteredVets = useMemo(() => {
    return vetsList
      .filter((vet) => {
        const spec = vet.specialisation || vet.specialization || "";
        const qual = vet.qualification || "";
        const fee = vet.consultationFee ?? vet.fee ?? 0;

        const matchesSearch =
          vet.name.toLowerCase().includes(search.toLowerCase()) ||
          spec.toLowerCase().includes(search.toLowerCase()) ||
          qual.toLowerCase().includes(search.toLowerCase());

        const matchesSpec =
          selectedSpec === "All" || spec === selectedSpec;

        const matchesFee = fee <= maxFee;

        return matchesSearch && matchesSpec && matchesFee;
      })
      .sort((a, b) => {
        const ratingA = a.rating || 4.5;
        const ratingB = b.rating || 4.5;
        const expA = a.experienceYears ?? a.experience ?? 0;
        const expB = b.experienceYears ?? b.experience ?? 0;
        const feeA = a.consultationFee ?? a.fee ?? 0;
        const feeB = b.consultationFee ?? b.fee ?? 0;

        if (sortBy === "top-rated") return ratingB - ratingA;
        if (sortBy === "most-experienced") return expB - expA;
        if (sortBy === "lowest-fee") return feeA - feeB;
        return 0;
      });
  }, [vetsList, search, selectedSpec, maxFee, sortBy]);

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
    <div className="min-h-screen bg-[#FAF7F2] px-4 pt-32 pb-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-block rounded-full bg-[#E86A33]/10 px-3.5 py-1 text-xs font-bold text-[#E86A33]">
              Trusted Veterinary Telehealth
            </span>
            <a
              href="/my-consultations"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#5C2A73] hover:bg-[#451f56] px-3.5 py-1 text-xs font-bold text-white shadow-sm transition"
            >
              <span>My Consultations</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </a>
          </div>
          <h1 className="text-3xl font-black text-[#3B1E43] sm:text-4xl lg:text-5xl">
            Find the right vet for your pet
          </h1>
          <p className="mt-3 text-sm text-gray-500 sm:text-base max-w-2xl mx-auto">
            Licensed specialists across surgery, dermatology, nutrition,
            emergency care, and behavior ready for live video, audio, and chat consultations.
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
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-800">
                  {paginatedVets.length}
                </span>{" "}
                of {filteredVets.length} vets
              </p>

              {loading && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Loader2 size={13} className="animate-spin text-[#E86A33]" />
                  <span>Syncing with clinic directory...</span>
                </div>
              )}
            </div>

            {paginatedVets.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedVets.map((vet) => (
                  <VetCard
                    key={vet.id || vet._id}
                    vet={vet}
                    onBook={(v) => setSelectedVetForBooking(v)}
                    onProfile={(v) => setSelectedVetForBooking(v)}
                  />
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

      {/* Booking Modal */}
      <BookingModal
        vet={selectedVetForBooking}
        isOpen={!!selectedVetForBooking}
        onClose={() => setSelectedVetForBooking(null)}
      />
    </div>
  );
}
