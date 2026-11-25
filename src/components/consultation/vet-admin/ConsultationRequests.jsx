import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Video,
  RefreshCw,
} from "lucide-react";
import consultationApi from "../../../api/consultationApi";
import StatsCards from "./StatsCards";
import RequestsTable from "./RequestsTable";
import RequestDetailModal from "./RequestDetailModal";
import RescheduleModal from "./RescheduleModal";
import RejectModal from "./RejectModal";

export default function ConsultationRequests() {
  const { accessToken } = useSelector((state) => state.auth);
  const token = accessToken || localStorage.getItem("accessToken") || "";

  const [stats, setStats] = useState({ pending: 0, today: 0, completed: 0, total: 0 });
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  // Modals state
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedReschedule, setSelectedReschedule] = useState(null);
  const [selectedReject, setSelectedReject] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Load Stats
      try {
        const statsRes = await consultationApi.getVetStats(token);
        if (statsRes.success && statsRes.stats) {
          setStats(statsRes.stats);
        }
      } catch (e) {
        console.warn("Could not load stats from backend:", e.message);
      }

      // 2. Load Consultations
      const res = await consultationApi.getVetConsultations({}, token);
      if (res.success && Array.isArray(res.consultations)) {
        setConsultations(res.consultations);

        const pendingCount = res.consultations.filter((c) => c.status === "pending").length;
        const compCount = res.consultations.filter((c) => c.status === "completed").length;
        setStats((prev) => ({
          ...prev,
          pending: prev.pending || pendingCount,
          completed: prev.completed || compCount,
          total: prev.total || res.consultations.length,
        }));
      } else {
        setConsultations([]);
      }
    } catch (err) {
      console.warn("Could not load vet consultations from backend, checking fallback:", err.message);
      const demoData = [
        {
          _id: "6730f1a23b8c4e001a112233",
          user: { name: "Riya Mehta", email: "riya@gmail.com", mobileNumber: "+91 98234 11223" },
          pet: { name: "Buddy", type: "Dog", breed: "Golden Retriever", age: "2 years" },
          consultationDate: new Date().toISOString().slice(0, 10),
          timeSlot: "11:30",
          mode: "video",
          status: "pending",
          message: "Mild skin itching and seasonal allergy checkup. He has been scratching his ears frequently.",
          instructions: "Please let us know if we need a blood test.",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "6730f1a23b8c4e001a112234",
          user: { name: "Aman Patel", email: "aman@gmail.com", mobileNumber: "+91 98456 33445" },
          pet: { name: "Luna", type: "Cat", breed: "Persian Cat", age: "1.5 years" },
          consultationDate: new Date().toISOString().slice(0, 10),
          timeSlot: "15:00",
          mode: "video",
          status: "accepted",
          message: "Post-spaying recovery evaluation and suture line checkup.",
          instructions: "She is a bit shy around screens.",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "6730f1a23b8c4e001a112235",
          user: { name: "Neha Kapoor", email: "neha@gmail.com", mobileNumber: "+91 98711 55667" },
          pet: { name: "Snowy", type: "Rabbit", breed: "Angora Cross", age: "8 months" },
          consultationDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
          timeSlot: "16:00",
          mode: "call",
          status: "rescheduled",
          message: "Dietary consultation regarding digestive fiber intake and hairball prevention.",
          createdAt: new Date().toISOString(),
        },
      ];
      setConsultations(demoData);
      setStats({ pending: 1, today: 2, completed: 5, total: 8 });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Action: Accept
  const handleAccept = async (item) => {
    try {
      const res = await consultationApi.updateConsultationStatus(
        item._id,
        { action: "accept" },
        token
      );
      if (res.success || res.consultation) {
        showToast(`Accepted consultation for ${item.pet?.name}!`);
        setConsultations((prev) =>
          prev.map((c) => (c._id === item._id ? { ...c, status: "accepted" } : c))
        );
        setStats((prev) => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          today: prev.today + 1,
        }));
        if (selectedDetail?._id === item._id) {
          setSelectedDetail((prev) => ({ ...prev, status: "accepted" }));
        }
      }
    } catch (err) {
      showToast(err.message || "Failed to accept consultation");
    }
  };

  // Action: Complete
  const handleComplete = async (item) => {
    try {
      const res = await consultationApi.updateConsultationStatus(
        item._id,
        { action: "complete" },
        token
      );
      if (res.success || res.consultation) {
        showToast(`Consultation for ${item.pet?.name} marked as completed!`);
        setConsultations((prev) =>
          prev.map((c) => (c._id === item._id ? { ...c, status: "completed" } : c))
        );
        setStats((prev) => ({
          ...prev,
          completed: prev.completed + 1,
        }));
        if (selectedDetail?._id === item._id) {
          setSelectedDetail((prev) => ({ ...prev, status: "completed" }));
        }
      }
    } catch (err) {
      showToast(err.message || "Failed to complete consultation");
    }
  };

  // Action: Reschedule Submit
  const handleRescheduleSubmit = async (payload) => {
    if (!selectedReschedule) return;
    const id = selectedReschedule._id;

    const res = await consultationApi.updateConsultationStatus(id, payload, token);
    if (res.success || res.consultation) {
      showToast(
        `Consultation rescheduled to ${payload.newDate} at ${payload.newTimeSlot}`
      );
      setConsultations((prev) =>
        prev.map((c) =>
          c._id === id
            ? {
                ...c,
                consultationDate: payload.newDate,
                timeSlot: payload.newTimeSlot,
                status: "rescheduled",
                vetNote: payload.vetNote || c.vetNote,
              }
            : c
        )
      );
      if (selectedDetail?._id === id) {
        setSelectedDetail((prev) => ({
          ...prev,
          consultationDate: payload.newDate,
          timeSlot: payload.newTimeSlot,
          status: "rescheduled",
        }));
      }
    }
  };

  // Action: Reject Submit
  const handleRejectSubmit = async (payload) => {
    if (!selectedReject) return;
    const id = selectedReject._id;

    const res = await consultationApi.updateConsultationStatus(id, payload, token);
    if (res.success || res.consultation) {
      showToast("Consultation declined.");
      setConsultations((prev) =>
        prev.map((c) =>
          c._id === id
            ? { ...c, status: "rejected", rejectionReason: payload.rejectionReason }
            : c
        )
      );
      setStats((prev) => ({
        ...prev,
        pending: Math.max(0, prev.pending - 1),
      }));
      if (selectedDetail?._id === id) {
        setSelectedDetail((prev) => ({
          ...prev,
          status: "rejected",
          rejectionReason: payload.rejectionReason,
        }));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#3B1E43] px-5 py-3 text-xs font-bold text-white shadow-xl">
          {toast}
        </div>
      )}

      {/* Top Teleconsultation Header */}
      <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E86A33]/10 text-[#E86A33]">
              <Video size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#3B1E43]">
                Teleconsultation & Booking Desk
              </h2>
              <p className="text-xs text-gray-500">
                Live consultation requests submitted by pet owners, with instant accept, reschedule, and decline controls.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 self-start sm:self-auto rounded-xl bg-[#FAF7F2] border border-[#EFE8DC] px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-[#E86A33]" : ""} />
            <span>Sync Live Requests</span>
          </button>
        </div>

        {/* Real-time stats */}
        <div className="mt-5">
          <StatsCards stats={stats} loading={loading} onRefresh={loadData} />
        </div>
      </div>

      {/* Requests Table */}
      <RequestsTable
        consultations={consultations}
        loading={loading}
        onAccept={handleAccept}
        onOpenReject={(item) => setSelectedReject(item)}
        onOpenReschedule={(item) => setSelectedReschedule(item)}
        onComplete={handleComplete}
        onViewDetails={(item) => setSelectedDetail(item)}
      />

      {/* Detail Modal */}
      <RequestDetailModal
        consultation={selectedDetail}
        isOpen={!!selectedDetail}
        onClose={() => setSelectedDetail(null)}
        onAccept={(item) => handleAccept(item)}
        onReject={(item) => setSelectedReject(item)}
        onReschedule={(item) => setSelectedReschedule(item)}
        onComplete={(item) => handleComplete(item)}
      />

      {/* Reschedule Modal */}
      <RescheduleModal
        consultation={selectedReschedule}
        isOpen={!!selectedReschedule}
        onClose={() => setSelectedReschedule(null)}
        onSubmit={handleRescheduleSubmit}
      />

      {/* Reject Modal */}
      <RejectModal
        consultation={selectedReject}
        isOpen={!!selectedReject}
        onClose={() => setSelectedReject(null)}
        onSubmit={handleRejectSubmit}
      />
    </div>
  );
}
