import { useState } from "react";
import { X, Ban, Loader2 } from "lucide-react";

export default function RejectModal({ consultation, isOpen, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !consultation) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError("Please provide a reason for declining this consultation request.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onSubmit({
        action: "reject",
        rejectionReason: reason.trim(),
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to decline consultation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <Ban size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#3B1E43]">Decline Consultation</h3>
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
              Reason for Declining <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Outside my specialization, please book an exotic bird specialist..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-2.5 text-xs text-gray-800 focus:border-red-500 focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              This message will be shown to the client and their slot will be released immediately.
            </p>
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
              className="flex items-center gap-1.5 rounded-full bg-red-600 px-5 py-2 text-xs font-bold text-white shadow hover:bg-red-700 disabled:opacity-50"
            >
              {submitting && <Loader2 size={13} className="animate-spin" />}
              <span>Decline Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
