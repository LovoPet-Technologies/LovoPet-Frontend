import { useState } from "react";
import {
  X,
  User,
  PawPrint,
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  Check,
  RotateCcw,
  Ban,
  FileCheck2,
  Mail,
  Smartphone,
} from "lucide-react";
import VideoCallModal from "../VideoCallModal";

export default function RequestDetailModal({
  consultation,
  isOpen,
  onClose,
  onAccept,
  onReject,
  onReschedule,
  onComplete,
}) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (!isOpen || !consultation) return null;

  const {
    _id,
    user,
    pet,
    consultationDate,
    timeSlot,
    mode,
    status,
    message,
    instructions,
    vetNote,
    rejectionReason,
    rescheduleHistory,
    createdAt,
  } = consultation;

  const statusBadge = {
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    accepted: "bg-emerald-100 text-emerald-800 border-emerald-300",
    rescheduled: "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-gray-100 text-gray-800 border-gray-300",
    rejected: "bg-rose-100 text-rose-800 border-rose-300",
    cancelled: "bg-red-100 text-red-800 border-red-300",
  }[status] || "bg-gray-100 text-gray-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EFE8DC] bg-[#FAF7F2] px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#3B1E43]">
                Consultation #{_id?.slice(-8).toUpperCase()}
              </h3>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusBadge}`}
              >
                {status}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Requested on: {new Date(createdAt).toLocaleString("en-IN")}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Patient Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              <PawPrint size={14} className="text-[#E86A33]" />
              Patient (Pet)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 font-semibold block">Pet Name</span>
                <span className="font-bold text-gray-900">{pet?.name || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold block">Species</span>
                <span className="font-bold text-gray-900">{pet?.type || pet?.species || "Dog"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold block">Breed</span>
                <span className="font-bold text-gray-900">{pet?.breed || "Mixed"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold block">Age</span>
                <span className="font-bold text-gray-900">{pet?.age || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Pet Parent / Owner */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              <User size={14} className="text-[#E86A33]" />
              Pet Parent (Client)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 font-semibold block">Full Name</span>
                <span className="font-bold text-gray-900">{user?.name || "Client"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold block">Email</span>
                <span className="font-medium text-gray-700 flex items-center gap-1 truncate">
                  <Mail size={12} className="text-gray-400" />
                  {user?.email || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold block">Mobile Phone</span>
                <span className="font-medium text-gray-700 flex items-center gap-1">
                  <Smartphone size={12} className="text-gray-400" />
                  {user?.mobileNumber || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Time & Telehealth Mode */}
          <div className="rounded-2xl bg-[#FAF7F2] p-4 border border-[#EFE8DC] grid grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 font-bold block uppercase">Date</span>
              <div className="flex items-center gap-1 mt-0.5 font-bold text-gray-800">
                <Calendar size={13} className="text-[#E86A33]" />
                <span>{consultationDate}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-bold block uppercase">Time Slot</span>
              <div className="flex items-center gap-1 mt-0.5 font-bold text-gray-800">
                <Clock size={13} className="text-[#E86A33]" />
                <span>{timeSlot} IST</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-bold block uppercase">Mode</span>
              <div className="flex items-center gap-1 mt-0.5 font-bold text-[#E86A33] capitalize">
                {mode === "video" && <Video size={13} />}
                {mode === "call" && <Phone size={13} />}
                {mode === "chat" && <MessageSquare size={13} />}
                <span>{mode} Consult</span>
              </div>
            </div>
          </div>

          {/* Primary Complaint / Symptoms */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 mb-1">
              Pet Symptoms & Reason for Visit:
            </h4>
            <div className="rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 whitespace-pre-wrap">
              {message}
            </div>
          </div>

          {/* Special Instructions */}
          {instructions && (
            <div>
              <h4 className="text-xs font-bold text-gray-700 mb-1">
                Special Instructions from Owner:
              </h4>
              <div className="rounded-xl border border-gray-200 bg-amber-50/50 p-3 text-xs text-amber-900 whitespace-pre-wrap">
                {instructions}
              </div>
            </div>
          )}

          {/* Reschedule History */}
          {rescheduleHistory && rescheduleHistory.length > 0 && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-xs text-blue-900 space-y-1">
              <strong className="block font-bold">Reschedule Audit Log:</strong>
              {rescheduleHistory.map((h, i) => (
                <div key={i} className="text-[11px] text-blue-800">
                  • Moved from {h.fromDate} at {h.fromTimeSlot} on{" "}
                  {new Date(h.changedAt).toLocaleDateString()}
                </div>
              ))}
            </div>
          )}

          {/* Doctor Note */}
          {vetNote && (
            <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-3 text-xs text-purple-900">
              <strong>Your Clinical Note / Remarks:</strong> {vetNote}
            </div>
          )}

          {rejectionReason && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
              <strong>Rejection Reason:</strong> {rejectionReason}
            </div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {status === "pending" && (
              <>
                <button
                  type="button"
                  onClick={() => onReject(consultation)}
                  className="flex items-center gap-1 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  <Ban size={14} />
                  <span>Decline</span>
                </button>

                <button
                  type="button"
                  onClick={() => onReschedule(consultation)}
                  className="flex items-center gap-1 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50"
                >
                  <RotateCcw size={14} />
                  <span>Reschedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => onAccept(consultation)}
                  className="flex items-center gap-1 rounded-full bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700"
                >
                  <Check size={14} />
                  <span>Accept Consultation</span>
                </button>
              </>
            )}

            {["accepted", "rescheduled"].includes(status) && (
              <>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700"
                >
                  <Video size={14} />
                  <span>Start Live Video Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => onReschedule(consultation)}
                  className="flex items-center gap-1 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50"
                >
                  <RotateCcw size={14} />
                  <span>Reschedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => onComplete(consultation)}
                  className="flex items-center gap-1 rounded-full bg-[#5C2A73] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#431f54]"
                >
                  <FileCheck2 size={14} />
                  <span>Mark as Completed</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Video Call Modal */}
      {isVideoModalOpen && (
        <VideoCallModal
          consultation={consultation}
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          isDoctor={true}
          userName="Dr. Veterinarian"
        />
      )}
    </div>
  );
}
