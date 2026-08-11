// src/components/auth/Forgotpassword.jsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // no api call — UI only, just show success state
    setSent(true);
  };

  return (
    <div className="space-y-5">
      {/* BACK */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#1E2A4A] transition"
      >
        <ArrowLeft size={14} />
        Back to sign in
      </button>

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#1E2A4A]">Reset password</h2>
        <p className="mt-1 text-xs text-[#6B7280]">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {sent ? (
        <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl px-4 py-4 space-y-1">
          <p className="font-medium text-sm text-green-800">Check your inbox</p>
          <p className="text-green-700/80">
            If an account exists for <strong>{email}</strong>, a reset link has
            been sent.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs text-[#1E2A4A]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="
                w-full
                bg-[#FFF8F0] border border-[#F0E1CF]
                rounded-xl px-3 py-2.5
                text-sm text-[#1E2A4A]
                placeholder:text-[#B8AB9B]
                focus:outline-none focus:ring-2 focus:ring-[#F97316]/30
                focus:border-[#F97316]/60 transition
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full bg-[#F97316] hover:bg-[#EA580C]
              text-white rounded-xl py-2.5
              text-sm font-medium
              transition-all duration-200
              shadow-md shadow-orange-500/20
            "
          >
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;