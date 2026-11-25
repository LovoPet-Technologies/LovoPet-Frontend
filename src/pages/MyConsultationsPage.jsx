import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Loader2,
  AlertCircle,
  Plus,
  Stethoscope,
} from "lucide-react";
import consultationApi from "../api/consultationApi";
import ConsultationCard from "../components/consultation/ConsultationCard";

export default function MyConsultationsPage() {
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.auth);

  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  const loadConsultations = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await consultationApi.getMyConsultations(accessToken);
      if (res.success && Array.isArray(res.consultations)) {
        setConsultations(res.consultations);
      } else {
        setConsultations([]);
      }
    } catch (err) {
      console.error("Error loading consultations:", err);
      setError("Failed to load your consultations. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    loadConsultations();
  }, [user, accessToken]);

  const handleCancelBooking = async (id) => {
    try {
      const res = await consultationApi.cancelConsultation(id, accessToken);
      if (res.success) {
        showToast("Consultation booking cancelled successfully");
        setConsultations((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: "cancelled" } : c))
        );
      }
    } catch (err) {
      showToast(err.message || "Failed to cancel booking");
    }
  };

  const filteredConsultations = consultations.filter((c) => {
    if (activeFilter === "upcoming") {
      return ["pending", "accepted", "rescheduled"].includes(c.status);
    }
    if (activeFilter === "completed") {
      return c.status === "completed";
    }
    if (activeFilter === "cancelled") {
      return ["cancelled", "rejected"].includes(c.status);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 pt-32 pb-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#3B1E43] px-5 py-3 text-xs font-bold text-white shadow-xl">
            {toast}
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DC] pb-8 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E86A33]/10 px-3 py-1 text-xs font-bold text-[#E86A33] mb-2">
              <Stethoscope size={13} />
              <span>Veterinary Care History</span>
            </div>
            <h1 className="text-3xl font-black text-[#3B1E43]">My Consultations</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your scheduled telemedicine appointments, vet instructions, and medical history.
            </p>
          </div>

          <Link
            to="/vet"
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-[#E86A33] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-[#d55922] transition"
          >
            <Plus size={15} />
            <span>Book New Consultation</span>
          </Link>
        </div>

        {/* Not Logged In State */}
        {!user ? (
          <div className="rounded-3xl bg-white p-12 text-center ring-1 ring-black/5 max-w-lg mx-auto space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5C2A73]/10 text-[#5C2A73]">
              <Calendar size={28} />
            </div>
            <h2 className="text-xl font-bold text-[#3B1E43]">Sign in to view your bookings</h2>
            <p className="text-xs text-gray-500">
              Please sign in with your customer account to view your scheduled vet appointments and pet medical advice.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="rounded-full bg-[#E86A33] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#d55922] transition"
            >
              Sign In to Your Account
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-xs text-gray-500">
            <Loader2 size={24} className="animate-spin text-[#E86A33]" />
            <span>Loading your consultations...</span>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-red-50 p-6 text-center text-xs text-red-700 border border-red-200">
            <AlertCircle size={20} className="mx-auto mb-2 text-red-500" />
            <p className="font-semibold">{error}</p>
            <button
              onClick={loadConsultations}
              className="mt-3 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div>
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#EFE8DC] pb-3 overflow-x-auto">
              {[
                { id: "all", label: "All Appointments", count: consultations.length },
                {
                  id: "upcoming",
                  label: "Upcoming",
                  count: consultations.filter((c) =>
                    ["pending", "accepted", "rescheduled"].includes(c.status)
                  ).length,
                },
                {
                  id: "completed",
                  label: "Completed",
                  count: consultations.filter((c) => c.status === "completed").length,
                },
                {
                  id: "cancelled",
                  label: "Cancelled / Declined",
                  count: consultations.filter((c) => ["cancelled", "rejected"].includes(c.status)).length,
                },
              ].map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition shrink-0 ${
                      isActive
                        ? "bg-[#5C2A73] text-white shadow"
                        : "bg-white text-gray-600 hover:bg-gray-100 ring-1 ring-black/5"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* List */}
            {filteredConsultations.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center text-gray-500 ring-1 ring-black/5 space-y-4">
                <Calendar size={36} className="mx-auto text-gray-300" />
                <h3 className="text-base font-bold text-gray-700">No consultations in this category</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Have a question about your pet&apos;s diet, health, or skin? You can consult top veterinarians
                  right from home.
                </p>
                <Link
                  to="/vet"
                  className="inline-block rounded-full bg-[#E86A33] px-6 py-2 text-xs font-bold text-white shadow hover:bg-[#d55922]"
                >
                  Explore Available Vets
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredConsultations.map((consultation) => (
                  <ConsultationCard
                    key={consultation._id}
                    consultation={consultation}
                    onCancel={handleCancelBooking}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
