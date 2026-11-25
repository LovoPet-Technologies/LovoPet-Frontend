import { useState } from "react";
import {
  Clock,
  Video,
  Phone,
  MessageSquare,
  Check,
  RotateCcw,
  Ban,
  FileCheck2,
  Eye,
  Loader2,
  Search,
} from "lucide-react";

export default function RequestsTable({
  consultations,
  loading,
  onAccept,
  onOpenReject,
  onOpenReschedule,
  onComplete,
  onViewDetails,
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = consultations.filter((item) => {
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "pending" && item.status === "pending") ||
      (filterStatus === "active" && ["accepted", "rescheduled"].includes(item.status)) ||
      (filterStatus === "completed" && item.status === "completed") ||
      (filterStatus === "cancelled" && ["cancelled", "rejected"].includes(item.status));

    const petName = item.pet?.name || "";
    const userName = item.user?.name || "";
    const userEmail = item.user?.email || "";
    const searchLow = searchTerm.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      petName.toLowerCase().includes(searchLow) ||
      userName.toLowerCase().includes(searchLow) ||
      userEmail.toLowerCase().includes(searchLow);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const config = {
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      accepted: "bg-emerald-100 text-emerald-800 border-emerald-200",
      rescheduled: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-gray-100 text-gray-700 border-gray-200",
      rejected: "bg-rose-100 text-rose-800 border-rose-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    }[status] || "bg-gray-100 text-gray-700";

    return (
      <span
        className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="rounded-3xl border border-[#EFE8DC] bg-white p-5 shadow-sm space-y-4">
      {/* Table Header: Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All" },
            {
              id: "pending",
              label: "Pending Action",
              badge: consultations.filter((c) => c.status === "pending").length,
            },
            { id: "active", label: "Confirmed" },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Declined / Cancelled" },
          ].map((tab) => {
            const isActive = filterStatus === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterStatus(tab.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition shrink-0 ${
                  isActive
                    ? "bg-[#3B1E43] text-white shadow-sm"
                    : "bg-[#FAF7F2] text-gray-600 hover:bg-gray-100 border border-[#EFE8DC]"
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="rounded-full bg-amber-500 px-1.5 py-0.2 text-[9px] font-black text-white">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-[#FAF7F2] pl-8 pr-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#E86A33] focus:outline-none"
          />
        </div>
      </div>

      {/* Table / List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-xs text-gray-500">
          <Loader2 size={24} className="animate-spin text-[#E86A33]" />
          <span>Loading consultation requests from database...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-xs text-gray-400">
          No consultation records found matching current criteria.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3">Patient (Pet)</th>
                <th className="py-3 px-3">Pet Parent</th>
                <th className="py-3 px-3">Date & Slot</th>
                <th className="py-3 px-3">Mode</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {filtered.map((item) => {
                const s = item.status;
                return (
                  <tr key={item._id} className="hover:bg-[#FAF7F2]/50 transition">
                    {/* Patient */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-gray-900">{item.pet?.name || "Pet"}</div>
                      <div className="text-[11px] text-gray-400">
                        {item.pet?.type || "Dog"} • {item.pet?.breed || "Mixed"}
                      </div>
                    </td>

                    {/* Pet Parent */}
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-gray-800">{item.user?.name || "Client"}</div>
                      <div className="text-[11px] text-gray-400">{item.user?.mobileNumber || item.user?.email || "--"}</div>
                    </td>

                    {/* Date & Slot */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-gray-900">{item.consultationDate}</div>
                      <div className="text-[11px] text-[#E86A33] font-semibold flex items-center gap-1">
                        <Clock size={11} />
                        <span>{item.timeSlot} IST</span>
                      </div>
                    </td>

                    {/* Mode */}
                    <td className="py-3.5 px-3">
                      <div className="inline-flex items-center gap-1 font-semibold text-gray-700 capitalize">
                        {item.mode === "video" && <Video size={13} className="text-[#E86A33]" />}
                        {item.mode === "call" && <Phone size={13} className="text-[#5C2A73]" />}
                        {item.mode === "chat" && <MessageSquare size={13} className="text-blue-500" />}
                        <span>{item.mode}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">{getStatusBadge(item.status)}</td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          type="button"
                          onClick={() => onViewDetails(item)}
                          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                          title="View Request Details"
                        >
                          <Eye size={15} />
                        </button>

                        {s === "pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() => onAccept(item)}
                              className="rounded-lg bg-emerald-600 p-1.5 text-white hover:bg-emerald-700 shadow-sm transition"
                              title="Accept Booking"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenReschedule(item)}
                              className="rounded-lg bg-blue-50 border border-blue-200 p-1.5 text-blue-600 hover:bg-blue-100 transition"
                              title="Reschedule Booking"
                            >
                              <RotateCcw size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenReject(item)}
                              className="rounded-lg bg-red-50 border border-red-200 p-1.5 text-red-600 hover:bg-red-100 transition"
                              title="Decline Booking"
                            >
                              <Ban size={14} />
                            </button>
                          </>
                        )}

                        {["accepted", "rescheduled"].includes(s) && (
                          <>
                            <button
                              type="button"
                              onClick={() => onComplete(item)}
                              className="rounded-lg bg-[#5C2A73] p-1.5 text-white hover:bg-[#491f5c] shadow-sm transition"
                              title="Mark Completed"
                            >
                              <FileCheck2 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenReschedule(item)}
                              className="rounded-lg bg-blue-50 border border-blue-200 p-1.5 text-blue-600 hover:bg-blue-100 transition"
                              title="Reschedule Slot"
                            >
                              <RotateCcw size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
