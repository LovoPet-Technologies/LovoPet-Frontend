import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AtIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4.5 7C4.5 5.619 5.619 4.5 7 4.5C8.381 4.5 9.5 5.619 9.5 7C9.5 8.381 8.381 9.5 7 9.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [resendState, setResendState] = useState("idle"); // "idle" | "sent" | "cooldown"
  const [cooldown, setCooldown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const handleResend = async () => {
    if (resendState !== "idle") return;
    setErrorMessage("");

    try {
      const res = await fetch(`${API}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Failed to resend verification link.");
        return;
      }

      setResendState("sent");
      setCooldown(30);

      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendState("idle");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const resendLabel =
    resendState === "sent"
      ? "Verification link sent!"
      : resendState === "cooldown" || cooldown > 0
        ? `Resend in ${cooldown}s`
        : "Resend link";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F2] px-4 py-8 font-sans">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-[#EFE3D3] rounded-2xl shadow-xl shadow-[#4D2C5E]/5 overflow-hidden">
          {/* Top accent line using banner accent gradient */}
          <div className="h-1.5 bg-gradient-to-r from-[#E85D30] via-[#4D2C5E] to-[#849667]" />

          {/* Body */}
          <div className="px-8 pt-8 pb-8">
            {/* Header: Logo & Brand Name side-by-side */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <img
                src="/logo.png"
                alt="LovoPet Logo"
                className="h-12 w-auto object-contain"
              />
              <img
                src="/brandName.png"
                alt="LovoPet"
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold tracking-tight text-[#4D2C5E] text-center mb-2">
              Check your inbox
            </h1>

            <p className="text-sm text-[#736372] text-center leading-relaxed mb-6">
              We sent a verification link to activate your LovoPet account.
            </p>

            {/* In-UI Error Banner */}
            {errorMessage && (
              <div className="mb-5 text-xs text-red-600 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-xl text-center">
                {errorMessage}
              </div>
            )}

            {/* Email pill */}
            <div className="flex items-center justify-center gap-2.5 bg-[#FAF3EA] border border-[#EFE3D3] rounded-xl px-4 py-3 mb-6 text-[#E85D30]">
              <AtIcon />
              <span className="text-sm font-semibold text-[#4D2C5E] break-all">
                {email || "your email address"}
              </span>
            </div>

            <p className="text-xs text-[#736372] text-center leading-relaxed mb-8">
              Click the link in that email to sign in. The link expires in{" "}
              <span className="text-[#E85D30] font-semibold">10 minutes</span>{" "}
              and can only be used once.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="https://mail.google.com/mail/u/0/#inbox"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#E85D30] hover:bg-[#d44c21] text-white text-sm font-medium py-3 rounded-xl transition-all shadow-md shadow-[#E85D30]/20"
              >
                Open Email App
              </a>

              <button
                onClick={handleResend}
                disabled={resendState !== "idle"}
                className={`w-full text-sm py-3 rounded-xl border font-medium transition-all ${
                  resendState === "sent"
                    ? "border-[#849667] text-[#849667] bg-[#849667]/10"
                    : "border-[#EFE3D3] text-[#4D2C5E] hover:bg-[#FAF3EA] bg-white"
                } disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {resendLabel}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#EFE3D3] bg-[#FAF3EA]/60 px-8 py-4 flex items-center justify-between">
            <span className="text-xs text-[#736372]">Wrong email address?</span>
            <button
              onClick={() => navigate("/auth")}
              type="button"
              className="text-xs font-semibold text-[#E85D30] hover:text-[#d44c21] transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Use a different address
            </button>
          </div>
        </div>

        {/* Footer Tagline */}
        <p className="text-center text-xs text-[#9C8B9A] mt-6">
          "Reimagining Animal Care"
        </p>
      </div>
    </div>
  );
}

export default CheckEmail;
