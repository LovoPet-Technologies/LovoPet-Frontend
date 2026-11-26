import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Shield,
  Save,
  CheckCircle2,
  Calendar,
  PawPrint,
  Clock,
  Video,
  LogOut,
  AlertCircle,
  Loader2,
  Package,
} from "lucide-react";
import { setUser, clearUser, setAccessToken } from "../redux/slices/authSlice";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  useEffect(() => {
    let active = true;

    async function fetchUserData() {
      if (!accessToken) {
        // Try refresh token if available in cookie
        try {
          const res = await fetch(`${API}/auth/refresh-token`, {
            method: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            if (data.access_token) {
              dispatch(setAccessToken(data.access_token));
              const meRes = await fetch(`${API}/auth/me`, {
                headers: { Authorization: `Bearer ${data.access_token}` },
              });
              if (meRes.ok) {
                const meData = await meRes.json();
                if (active && meData.user) {
                  dispatch(setUser(meData.user));
                  setName(meData.user.name || "");
                  setMobileNumber(meData.user.mobileNumber || "");
                  setProfilePic(meData.user.profilePic || "");
                }
              }
            }
          }
        } catch (e) {
          console.warn("Could not load user profile:", e);
        } finally {
          if (active) setFetching(false);
        }
        return;
      }

      try {
        const meRes = await fetch(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (meRes.ok) {
          const meData = await meRes.json();
          if (active && meData.user) {
            dispatch(setUser(meData.user));
            setName(meData.user.name || "");
            setMobileNumber(meData.user.mobileNumber || "");
            setProfilePic(meData.user.profilePic || "");
          }
        }
      } catch (e) {
        console.warn("Failed to fetch fresh user details:", e);
      } finally {
        if (active) setFetching(false);
      }
    }

    fetchUserData();

    return () => {
      active = false;
    };
  }, [accessToken, dispatch]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          mobileNumber: mobileNumber.trim(),
          profilePic: profilePic.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      dispatch(setUser({ ...user, ...data.user }));
      showToast("Profile details updated successfully!");
    } catch (err) {
      setError(err.message || "Could not update profile details.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // continue
    }
    dispatch(clearUser());
    navigate("/");
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center pt-28 pb-16">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-[#E86A33]" />
          <p className="text-xs font-bold text-[#5C2A73]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user && !accessToken) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center pt-28 pb-16 px-4">
        <div className="max-w-md w-full rounded-3xl bg-white p-8 text-center shadow-sm border border-[#EFE8DC]">
          <div className="h-14 w-14 rounded-2xl bg-[#5C2A73]/10 text-[#5C2A73] flex items-center justify-center mx-auto mb-4">
            <User size={28} />
          </div>
          <h2 className="text-xl font-black text-[#3B1E43]">Sign in to access your profile</h2>
          <p className="text-xs text-gray-500 mt-1 mb-6">
            View your consultation records, saved pets, and personal account details.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="w-full rounded-2xl bg-[#5C2A73] hover:bg-[#451f56] text-white py-3 text-xs font-bold shadow-md transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 pt-32 pb-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#3B1E43] px-5 py-3 text-xs font-bold text-white shadow-xl flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl overflow-hidden bg-[#5C2A73]/10 flex items-center justify-center border-2 border-[#E86A33]/20 shadow-md">
              {profilePic || user?.profilePic ? (
                <img
                  src={profilePic || user?.profilePic}
                  alt={user?.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={36} className="text-[#5C2A73]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#3B1E43]">
                  {user?.name || "Pet Parent"}
                </h1>
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {user?.role || "customer"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <Mail size={13} className="text-gray-400" />
                {user?.email}
              </p>
              {user?.mobileNumber && (
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                  <Phone size={13} className="text-gray-400" />
                  {user?.mobileNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/my-consultations")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5C2A73] hover:bg-[#451f56] text-white px-4 py-2.5 text-xs font-bold shadow-md transition"
            >
              <Video size={14} />
              <span>My Consultations</span>
            </button>
            <button
              onClick={() => navigate("/my-pets")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-2xl border border-[#5C2A73]/20 text-[#5C2A73] hover:bg-[#5C2A73]/10 px-4 py-2.5 text-xs font-bold transition"
            >
              <PawPrint size={14} />
              <span>My Pets</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Profile Form + Quick Action Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Form */}
          <div className="md:col-span-2 rounded-3xl border border-[#EFE8DC] bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-[#3B1E43]">Personal Details</h2>
              <p className="text-xs text-gray-400">Update your account information and contact number.</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3.5 py-2.5 text-xs font-medium text-gray-400 cursor-not-allowed"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Email is locked to your account identity.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone Number</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Avatar / Profile Picture URL</label>
                <input
                  type="url"
                  value={profilePic}
                  onChange={(e) => setProfilePic(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#5C2A73] hover:bg-[#451f56] text-white px-6 py-2.5 text-xs font-bold shadow-md transition disabled:opacity-50"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  <span>{loading ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Side Shortcuts */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-[#EFE8DC] bg-white p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Quick Links</h3>
              <div className="space-y-1 text-xs font-semibold">
                <button
                  onClick={() => navigate("/my-consultations")}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-[#FAF7F2] transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Video size={16} className="text-[#E86A33]" />
                    <span>My Consultations</span>
                  </div>
                  <span className="text-[10px] text-gray-400">&rarr;</span>
                </button>

                <button
                  onClick={() => navigate("/my-pets")}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-[#FAF7F2] transition"
                >
                  <div className="flex items-center gap-2.5">
                    <PawPrint size={16} className="text-[#5C2A73]" />
                    <span>My Pets & Records</span>
                  </div>
                  <span className="text-[10px] text-gray-400">&rarr;</span>
                </button>

                <button
                  onClick={() => navigate("/vet")}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-[#FAF7F2] transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar size={16} className="text-emerald-600" />
                    <span>Consult a Vet</span>
                  </div>
                  <span className="text-[10px] text-gray-400">&rarr;</span>
                </button>

                <button
                  onClick={() => navigate("/pet-shop")}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-[#FAF7F2] transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Package size={16} className="text-blue-600" />
                    <span>Pet Shop</span>
                  </div>
                  <span className="text-[10px] text-gray-400">&rarr;</span>
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-red-100 bg-red-50/50 p-5 shadow-sm">
              <h4 className="text-xs font-bold text-red-900 mb-1">Session Management</h4>
              <p className="text-[11px] text-gray-500 mb-3">Sign out of your LovoPet customer account on this browser.</p>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 p-2.5 text-xs font-bold transition shadow-sm"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
