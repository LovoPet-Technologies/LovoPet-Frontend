import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Loader2,
  ExternalLink,
} from "lucide-react";
import VideoCallModal from "./VideoCallModal";

export default function ConsultationCard({ consultation, onCancel }) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const {
    _id,
    veterinarian,
    pet,
    consultationDate,
    timeSlot,
    mode,
    status,
    message,
    vetNote,
    rejectionReason,
  } = consultation;

  const vetName = veterinarian?.name || "Veterinarian";
  const vetSpec = veterinarian?.specialization || "Veterinary Specialist";
  const vetImage =
    veterinarian?.profileImage ||
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop";

  const statusConfig = {
    pending: {
      label: "Pending Vet Acceptance",
      color: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Clock,
    },
    accepted: {
      label: "Confirmed & Scheduled",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle2,
    },
    rescheduled: {
      label: "Rescheduled by Vet",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      icon: RotateCcw,
    },
    completed: {
      label: "Completed",
      color: "bg-gray-50 text-gray-700 border-gray-200",
      icon: CheckCircle2,
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-50 text-red-700 border-red-200",
      icon: XCircle,
    },
    rejected: {
      label: "Declined",
      color: "bg-rose-50 text-rose-700 border-rose-200",
      icon: XCircle,
    },
  }[status] || {
    label: status,
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: HelpCircle,
  };

  const StatusIcon = statusConfig.icon;

  const canCancel = ["pending", "accepted", "rescheduled"].includes(status);

  const handleCancelClick = async () => {
    setCancelling(true);
    try {
      if (onCancel) await onCancel(_id);
      setShowCancelConfirm(false);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        {/* Vet Info */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-[#5C2A73]/10 ring-2 ring-[#5C2A73]/10">
            <img src={vetImage} alt={vetName} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#3B1E43]">{vetName}</h3>
            <p className="text-xs text-gray-500">{vetSpec}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border px-3 py-1 text-xs font-bold ${statusConfig.color}`}
        >
          <StatusIcon size={14} />
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* Appointment Specifics */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl bg-[#FAF7F2] p-4 border border-[#EFE8DC]/80">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Date & Time</span>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-gray-800">
            <Calendar size={13} className="text-[#E86A33]" />
            <span>{consultationDate}</span>
            <span>•</span>
            <Clock size={13} className="text-[#E86A33]" />
            <span>{timeSlot} IST</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Patient</span>
          <p className="mt-0.5 text-xs font-bold text-gray-800">
            {pet?.name} <span className="font-normal text-gray-500">({pet?.breed || pet?.type || "Pet"})</span>
          </p>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Mode</span>
          <div className="flex items-center gap-1 mt-0.5 text-xs font-semibold text-[#E86A33] capitalize">
            {mode === "video" && <Video size={13} />}
            {mode === "call" && <Phone size={13} />}
            {mode === "chat" && <MessageSquare size={13} />}
            <span>{mode} Consultation</span>
          </div>
        </div>
      </div>

      {/* Reason / Message */}
      {message && (
        <div className="mt-3 text-xs text-gray-600">
          <strong className="text-gray-700">Symptoms noted:</strong> {message}
        </div>
      )}

      {/* Doctor's Note or Rejection Reason if any */}
      {vetNote && (
        <div className="mt-3 rounded-xl bg-purple-50/70 p-3 text-xs text-purple-900 border border-purple-100">
          <strong>Doctor&apos;s Advice / Note:</strong> {vetNote}
        </div>
      )}

      {rejectionReason && (
        <div className="mt-3 rounded-xl bg-rose-50 p-3 text-xs text-rose-800 border border-rose-200">
          <strong>Decline reason:</strong> {rejectionReason}
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
        <span className="text-[11px] text-gray-400">Booking ID: {_id?.slice(-8).toUpperCase()}</span>

        <div className="flex items-center gap-2">
          {["accepted", "rescheduled"].includes(status) && (
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition"
            >
              <Video size={13} />
              <span>Join Video Call</span>
            </button>
          )}

          {canCancel && (
            <div>
              {showCancelConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Cancel booking?</span>
                  <button
                    type="button"
                    disabled={cancelling}
                    onClick={handleCancelClick}
                    className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow hover:bg-red-700 disabled:opacity-50"
                  >
                    {cancelling ? <Loader2 size={12} className="animate-spin inline" /> : "Yes, cancel"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCancelConfirm(false)}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(true)}
                  className="rounded-full border border-red-200 px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Live Video Call & Chat Modal */}
      {isVideoModalOpen && (
        <VideoCallModal
          consultation={consultation}
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          isDoctor={false}
          userName={pet?.name ? `${pet.name}'s Family` : "Pet Parent"}
        />
      )}
    </div>
  );
}
