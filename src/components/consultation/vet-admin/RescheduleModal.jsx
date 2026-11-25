import { useState, useMemo } from "react";
import { X, RotateCcw, Loader2 } from "lucide-react";

const getUpcomingDates = (daysCount = 10) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < daysCount; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    let label = d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    dates.push({ iso, label });
  }
  return dates;
};

const COMMON_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30"
];

export default function RescheduleModal({ consultation, isOpen, onClose, onSubmit }) {
  const dates = useMemo(() => getUpcomingDates(10), []);

  const [selectedDate, setSelectedDate] = useState(dates[1]?.iso || dates[0]?.iso);
  const [selectedSlot, setSelectedSlot] = useState("10:00");
  const [vetNote, setVetNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !consultation) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      setError("Please pick both date and time slot.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onSubmit({
        action: "reschedule",
        newDate: selectedDate,
        newTimeSlot: selectedSlot,
        vetNote: vetNote.trim(),
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to reschedule consultation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <RotateCcw size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#3B1E43]">Reschedule Appointment</h3>
              <p className="text-[11px] text-gray-400">
                Patient: {consultation.pet?.name} ({consultation.user?.name})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Select New Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-2.5 text-xs text-gray-800 font-medium focus:border-[#E86A33] focus:outline-none"
            >
              {dates.map((d) => (
                <option key={d.iso} value={d.iso}>
                  {d.label} ({d.iso})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Select New Time Slot (IST)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-36 overflow-y-auto p-1">
              {COMMON_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-700 hover:border-blue-400"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Reason / Message for Client (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. In emergency surgery, moving to afternoon slot..."
              value={vetNote}
              onChange={(e) => setVetNote(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#E86A33] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting && <Loader2 size={13} className="animate-spin" />}
              <span>Confirm Reschedule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
