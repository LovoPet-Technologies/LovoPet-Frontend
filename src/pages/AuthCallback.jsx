import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../redux/slices/authSlice";

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState("Verifying your email and logging you in...");

  useEffect(() => {
    let isMounted = true;

    const completeAuth = async () => {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

      // Check if error passed in query params
      const errorParam = searchParams.get("error");
      if (errorParam) {
        if (isMounted) {
          setStatus("error");
          setMessage("Verification link is invalid or expired. Please request a new one.");
        }
        return;
      }

      try {
        // Exchange refreshToken cookie for new accessToken
        const res = await fetch(`${API}/auth/refresh-token`, {
          method: "GET",
          credentials: "include", // essential to send refreshToken cookie
        });

        if (!res.ok) {
          throw new Error("Session exchange failed");
        }

        const data = await res.json();
        if (data?.access_token) {
          dispatch(setAccessToken(data.access_token));

          // Fetch full profile with the new accessToken
          const meRes = await fetch(`${API}/auth/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          });

          if (meRes.ok) {
            const meData = await meRes.json();
            if (meData?.user) {
              dispatch(setUser(meData.user));
            }
          }

          if (isMounted) {
            setStatus("success");
            setMessage("Email successfully verified! Redirecting to home...");
            setTimeout(() => {
              navigate("/");
            }, 1800);
          }
        } else {
          throw new Error("No token returned");
        }
      } catch (err) {
        console.error("Auth callback verification error:", err);
        if (isMounted) {
          setStatus("success");
          setMessage("Email verified! Redirecting you to login...");
          setTimeout(() => {
            navigate("/auth");
          }, 2000);
        }
      }
    };

    completeAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F2] px-4 py-8 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#EFE3D3] rounded-2xl shadow-xl shadow-[#4D2C5E]/5 overflow-hidden text-center p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/logo.png" alt="LovoPet Logo" className="h-12 w-auto object-contain" />
            <img src="/brandName.png" alt="LovoPet" className="h-9 w-auto object-contain" />
          </div>

          {status === "verifying" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#E85D30]/30 border-t-[#E85D30] rounded-full animate-spin" />
              <h2 className="text-xl font-bold text-[#4D2C5E]">Verifying Email</h2>
              <p className="text-sm text-[#736372]">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold">
                ✓
              </div>
              <h2 className="text-xl font-bold text-[#4D2C5E]">Email Verified!</h2>
              <p className="text-sm text-[#736372]">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                !
              </div>
              <h2 className="text-xl font-bold text-[#4D2C5E]">Verification Issue</h2>
              <p className="text-sm text-[#736372]">{message}</p>
              <button
                onClick={() => navigate("/checkEmail")}
                className="mt-2 bg-[#E85D30] hover:bg-[#d44c21] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
              >
                Resend Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
