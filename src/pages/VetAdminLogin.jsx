import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Stethoscope,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { setAccessToken, setUser } from "../redux/slices/authSlice";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function VetAdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  // Check if user credentials/cookie are already saved, auto-pass login if valid
  useEffect(() => {
    let active = true;

    async function checkSavedSession() {
      // 1. If already authenticated in redux/localStorage with veterinarian role
      if (accessToken && authUser?.role === "veterinarian") {
        navigate("/vet-admin/dashboard", { replace: true });
        return;
      }

      // 2. Try cookie session verification (/auth/refresh-token)
      try {
        const res = await fetch(`${API}/auth/refresh-token`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.access_token) {
            // Verify who this user is
            const meRes = await fetch(`${API}/auth/me`, {
              headers: { Authorization: `Bearer ${data.access_token}` },
            });
            if (meRes.ok) {
              const meData = await meRes.json();
              if (meData.user?.role === "veterinarian") {
                dispatch(setAccessToken(data.access_token));
                dispatch(setUser(meData.user));
                if (active) {
                  navigate("/vet-admin/dashboard", { replace: true });
                  return;
                }
              }
            }
          }
        }
      } catch (e) {
        console.warn("Session cookie check:", e.message);
      } finally {
        if (active) setCheckingSession(false);
      }
    }

    checkSavedSession();

    return () => {
      active = false;
    };
  }, [accessToken, authUser, dispatch, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const response = await fetch(`${API}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          role: "veterinarian",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials. Please verify your email and password.");
      }

      if (data.user?.role !== "veterinarian") {
        throw new Error("Access denied. This portal is strictly reserved for registered veterinarians.");
      }

      dispatch(setAccessToken(data.access_token));
      dispatch(setUser(data.user));

      navigate("/vet-admin/dashboard", { replace: true });
    } catch (err) {
      console.warn("Backend auth failed:", err.message);
      setError(err.message || "Unable to sign in. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("dr.sharma@lovopet.com");
    setPassword("VetPass@123");
    setError("");
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.png" alt="LovoPet" className="h-12 w-auto animate-pulse" />
          <div className="flex items-center gap-2 text-xs font-bold text-[#5C2A73]">
            <Loader2 size={16} className="animate-spin text-[#E86A33]" />
            <span>Verifying doctor credentials & session...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] via-white to-[#F5ECE1] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Top Brand Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img
              src="/logo.png"
              alt="LovoPet Logo"
              className="h-12 w-auto object-contain"
            />
            <img
              src="/brandName.png"
              alt="LovoPet"
              className="h-7 w-auto object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C2A73]/10 text-[#5C2A73] text-xs font-bold mb-2">
            <Stethoscope size={14} />
            <span>Veterinary Doctor Portal</span>
          </div>
          <h1 className="text-xl font-black text-[#3B1E43] tracking-tight">
            Practice Administration
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Doctor Telehealth & Consultations Desk
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-black/5">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Sign in to practice</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Access your consultation requests, appointments, and patient charts.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-2xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Doctor Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="dr.sharma@lovopet.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] pl-10 pr-4 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#E86A33] focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] pl-10 pr-4 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#E86A33] focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-full bg-[#E86A33] py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#d55922] disabled:opacity-50 transition cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Practice</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C2A73] hover:text-[#E86A33] transition"
            >
              <Sparkles size={13} />
              <span>Use Test Vet Credentials (Dr. Sharma)</span>
            </button>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Encrypted HIPAA & Veterinary Board Compliant System</span>
        </div>
      </div>
    </div>
  );
}
