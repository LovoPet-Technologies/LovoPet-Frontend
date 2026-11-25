import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Calendar,
  PawPrint,
  Stethoscope,
  Wallet,
  Clock,
  LogOut,
  RefreshCw,
  Video,
  CheckCircle2,
  Users,
  ChevronRight,
  TrendingUp,
  Settings,
  Save,
  Check,
  User,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { clearUser } from "../redux/slices/authSlice";
import ConsultationRequests from "../components/consultation/vet-admin/ConsultationRequests";
import consultationApi from "../api/consultationApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DAYS_MAP = [
  { dayNum: 1, name: "Monday" },
  { dayNum: 2, name: "Tuesday" },
  { dayNum: 3, name: "Wednesday" },
  { dayNum: 4, name: "Thursday" },
  { dayNum: 5, name: "Friday" },
  { dayNum: 6, name: "Saturday" },
  { dayNum: 0, name: "Sunday" },
];

export default function VetAdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const token = accessToken || localStorage.getItem("accessToken") || "";

  const [activeTab, setActiveTab] = useState("Consultations");
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [toast, setToast] = useState("");

  // Account & Timetable form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experienceYears: 5,
    bio: "",
    consultationFee: 500,
    slotDurationMinutes: 30,
    profileImage: "",
  });

  const [timetable, setTimetable] = useState([
    { day: 1, dayName: "Monday", enabled: true, startTime: "09:00", endTime: "18:00" },
    { day: 2, dayName: "Tuesday", enabled: true, startTime: "09:00", endTime: "18:00" },
    { day: 3, dayName: "Wednesday", enabled: true, startTime: "09:00", endTime: "18:00" },
    { day: 4, dayName: "Thursday", enabled: true, startTime: "09:00", endTime: "18:00" },
    { day: 5, dayName: "Friday", enabled: true, startTime: "09:00", endTime: "18:00" },
    { day: 6, dayName: "Saturday", enabled: true, startTime: "10:00", endTime: "16:00" },
    { day: 0, dayName: "Sunday", enabled: false, startTime: "10:00", endTime: "14:00" },
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/vet-admin/login");
  };

  const [authChecking, setAuthChecking] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      let activeToken = token;

      // If token missing, attempt to refresh via cookie
      if (!activeToken) {
        try {
          const refreshRes = await fetch(`${API}/auth/refresh-token`, {
            method: "GET",
            credentials: "include",
          });
          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            if (refreshData.access_token) {
              activeToken = refreshData.access_token;
              dispatch(setAccessToken(refreshData.access_token));
            }
          }
        } catch {
          // continue
        }
      }

      if (!activeToken) {
        navigate("/vet-admin/login", { replace: true });
        return;
      }

      let res = await fetch(`${API}/api/vet/dashboard`, {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
        credentials: "include",
      });

      // If 401 unauthorized, try refreshing cookie session once
      if (res.status === 401) {
        const refreshRes = await fetch(`${API}/auth/refresh-token`, {
          method: "GET",
          credentials: "include",
        });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          if (refreshData.access_token) {
            activeToken = refreshData.access_token;
            dispatch(setAccessToken(refreshData.access_token));
            res = await fetch(`${API}/api/vet/dashboard`, {
              headers: {
                Authorization: `Bearer ${activeToken}`,
              },
              credentials: "include",
            });
          }
        }
      }

      if (!res.ok) {
        // Not a valid vet or not signed in
        navigate("/vet-admin/login", { replace: true });
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        setDashboardData(json.data);

        // Populate profile form from backend data
        const p = json.data.profile || {};
        setProfileForm({
          name: p.name || authUser?.name || "Dr. Rajesh Sharma",
          specialization: p.specialization || "Small Animal Internal Medicine & Surgery",
          qualification: p.qualification || "BVSc & AH, MVSc (Surgery)",
          experienceYears: p.experienceYears ?? 12,
          bio: p.bio || "Dedicated veterinary physician and surgeon with over a decade of clinical expertise.",
          consultationFee: p.consultationFee ?? 500,
          slotDurationMinutes: p.slotDurationMinutes ?? 30,
          profileImage: p.avatar || "",
        });

        // Populate timetable if available
        if (Array.isArray(p.availability) && p.availability.length > 0) {
          const availMap = new Map(p.availability.map((a) => [a.day, a]));
          setTimetable((prev) =>
            prev.map((item) => {
              const found = availMap.get(item.day);
              if (found) {
                return {
                  ...item,
                  enabled: true,
                  startTime: found.startTime || item.startTime,
                  endTime: found.endTime || item.endTime,
                };
              }
              return { ...item, enabled: false };
            })
          );
        }
      }
    } catch (e) {
      console.warn("Error fetching live dashboard data:", e.message);
    } finally {
      setLoading(false);
      setAuthChecking(false);
    }
  }, [token, authUser, dispatch, navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const profile = dashboardData?.profile || {
    name: authUser?.name || "Dr. Rajesh Sharma",
    specialization: "Small Animal Internal Medicine & Surgery",
    clinicName: "LovoPet Care & Telehealth Practice",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  };

  const metrics = dashboardData?.metrics || {
    totalAppointments: { value: 0, trendPercentage: 0 },
    activePatients: { value: 0, trendPercentage: 0 },
    totalEarnings: { value: 0, trendPercentage: 0 },
    settledEarnings: { value: 0 },
    pendingBalance: { value: 0, nextSettlementDate: "Every Friday" },
  };

  const appointments = dashboardData?.appointments || [];
  const patients = dashboardData?.patients || [];
  const availabilitySchedule = dashboardData?.availabilitySchedule || [];

  const handleSaveAvailability = async () => {
    setSavingSettings(true);
    try {
      // Build availability array for active days
      const availabilityPayload = timetable
        .filter((t) => t.enabled)
        .map((t) => ({
          day: t.day,
          startTime: t.startTime,
          endTime: t.endTime,
        }));

      // Build readable schedule for dashboard cards
      const scheduleCards = timetable
        .filter((t) => t.enabled)
        .map((t) => ({
          day: t.dayName,
          hours: `${t.startTime} - ${t.endTime}`,
          active: true,
        }));

      await consultationApi.updateVetAvailability(
        {
          availability: availabilityPayload,
          schedule: scheduleCards,
          consultationFee: Number(profileForm.consultationFee),
          slotDurationMinutes: Number(profileForm.slotDurationMinutes),
        },
        token
      );

      showToast("Timetable and consultation fee updated successfully!");
      fetchDashboardData();
    } catch (err) {
      showToast(err.message || "Failed to update timetable");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    setSavingSettings(true);
    try {
      await consultationApi.updateVetProfile(
        {
          name: profileForm.name,
          specialization: profileForm.specialization,
          qualification: profileForm.qualification,
          experienceYears: Number(profileForm.experienceYears),
          bio: profileForm.bio,
          consultationFee: Number(profileForm.consultationFee),
          slotDurationMinutes: Number(profileForm.slotDurationMinutes),
          profileImage: profileForm.profileImage,
        },
        token
      );

      showToast("Vet account details saved successfully!");
      fetchDashboardData();
    } catch (err) {
      showToast(err.message || "Failed to save profile");
    } finally {
      setSavingSettings(false);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.png" alt="LovoPet" className="h-12 w-auto animate-pulse" />
          <div className="flex items-center gap-2 text-xs font-bold text-[#5C2A73]">
            <RefreshCw size={16} className="animate-spin text-[#E86A33]" />
            <span>Connecting to live practice data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#3B1E43] px-5 py-3 text-xs font-bold text-white shadow-xl">
          {toast}
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-[#EFE8DC] bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <a href="/vet-admin/dashboard" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="LovoPet Logo"
              className="h-10 w-auto object-contain"
            />
            <img
              src="/brandName.png"
              alt="LovoPet"
              className="h-6 w-auto object-contain hidden sm:block"
            />
          </a>
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5C2A73] text-white shadow-sm shadow-[#5C2A73]/20">
              <Stethoscope size={16} />
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-[#3B1E43] leading-none flex items-center gap-1.5">
                Vet Practice Portal
                <span className="hidden md:inline-block text-[9px] font-bold bg-[#E86A33]/15 text-[#E86A33] px-2 py-0.5 rounded-full uppercase">
                  Doctor Admin
                </span>
              </h1>
              <p className="text-[10px] text-gray-400 mt-0.5">{profile.clinicName}</p>
            </div>
          </div>
        </div>

        {/* Right profile info & logout */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={fetchDashboardData}
            title="Refresh Practice Data"
            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            <RefreshCw size={12} className={loading ? "animate-spin text-[#E86A33]" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#E86A33]/20 bg-[#5C2A73]/10">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-gray-800">{profile.name}</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online & Accepting Patients
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign out of practice"
            className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Grid: Sidebar + View Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="rounded-3xl border border-[#EFE8DC] bg-white p-3 shadow-sm space-y-1">
            {[
              { id: "Consultations", label: "Consultations Desk", icon: Video, badge: "Live" },
              { id: "Dashboard", label: "Practice Overview", icon: LayoutDashboard },
              { id: "Appointments", label: "Appointments", icon: Calendar, count: appointments.length },
              { id: "Patients", label: "Patients & Pets", icon: PawPrint, count: patients.length },
              { id: "Timetable", label: "Timetable & Hours", icon: Clock },
              { id: "Account", label: "Account Settings", icon: Settings },
              { id: "Earnings", label: "Earnings & Payouts", icon: Wallet },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              if (authChecking) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.png" alt="LovoPet" className="h-12 w-auto animate-pulse" />
          <div className="flex items-center gap-2 text-xs font-bold text-[#5C2A73]">
            <RefreshCw size={16} className="animate-spin text-[#E86A33]" />
            <span>Connecting to live practice data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition text-left ${
                    isActive
                      ? "bg-[#5C2A73] text-white shadow-md shadow-[#5C2A73]/20"
                      : "text-gray-600 hover:bg-[#FAF7F2] hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? "text-orange-300" : "text-gray-400"} />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge && (
                    <span className="rounded-full bg-[#E86A33] px-2 py-0.5 text-[9px] font-black uppercase text-white tracking-wider">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && !tab.badge && (
                    <span
                      className={`rounded-full px-2 py-0.2 text-[10px] font-semibold ${
                        isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Doctor Profile Card */}
          <div className="rounded-3xl border border-[#EFE8DC] bg-gradient-to-br from-[#FAF7F2] to-white p-4 shadow-sm text-center">
            <div className="h-14 w-14 rounded-2xl overflow-hidden mx-auto shadow-md ring-2 ring-white mb-2">
              <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
            </div>
            <h3 className="text-xs font-bold text-gray-900">{profile.name}</h3>
            <p className="text-[10px] text-gray-500 mt-0.5">{profile.specialization}</p>
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 py-1 px-3 rounded-full border border-emerald-100">
              <CheckCircle2 size={12} />
              <span>Verified Practitioner</span>
            </div>
          </div>
        </aside>

        {/* Active Content Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: CONSULTATIONS DESK (Live backend integration) */}
          {activeTab === "Consultations" && (
            <ConsultationRequests />
          )}

          {/* TAB 2: PRACTICE OVERVIEW / DASHBOARD */}
          {activeTab === "Dashboard" && (
            <div className="space-y-6">
              {/* Metric stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4 shadow-sm">
                  <span className="text-xs font-bold text-gray-600">Total Appointments</span>
                  <div className="text-2xl font-black text-gray-900 mt-1">
                    {metrics.totalAppointments.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <TrendingUp size={12} />
                    <span>+{metrics.totalAppointments.trendPercentage}% this month</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-4 shadow-sm">
                  <span className="text-xs font-bold text-gray-600">Registered Patients</span>
                  <div className="text-2xl font-black text-gray-900 mt-1">
                    {metrics.activePatients.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <TrendingUp size={12} />
                    <span>+{metrics.activePatients.trendPercentage}% active</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm">
                  <span className="text-xs font-bold text-gray-600">Practice Earnings</span>
                  <div className="text-2xl font-black text-emerald-800 mt-1">
                    ₹{metrics.totalEarnings.value.toLocaleString("en-IN")}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <TrendingUp size={12} />
                    <span>+{metrics.totalEarnings.trendPercentage}% vs last period</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 shadow-sm">
                  <span className="text-xs font-bold text-gray-600">Pending Settlement</span>
                  <div className="text-2xl font-black text-blue-800 mt-1">
                    ₹{metrics.pendingBalance.value.toLocaleString("en-IN")}
                  </div>
                  <div className="mt-1 text-[11px] text-gray-500">
                    Payout scheduled: {metrics.pendingBalance.nextSettlementDate}
                  </div>
                </div>
              </div>

              {/* Consultation Quick Queue */}
              <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#3B1E43]">
                      Pending Patient Consultation Requests
                    </h3>
                    <p className="text-xs text-gray-400">
                      Incoming pet telehealth booking requests requiring vet action.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("Consultations")}
                    className="flex items-center gap-1 text-xs font-bold text-[#E86A33] hover:underline"
                  >
                    <span>Open Teleconsult Desk</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <ConsultationRequests />
              </div>
            </div>
          )}

          {/* TAB 3: APPOINTMENTS */}
          {activeTab === "Appointments" && (
            <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-[#3B1E43]">Clinic & Telehealth Schedule</h2>
                  <p className="text-xs text-gray-400">All booked appointments across calendar dates.</p>
                </div>
              </div>

              {appointments.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400">
                  No appointments currently scheduled.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#5C2A73]/10 flex items-center justify-center font-bold text-[#5C2A73] text-xs">
                          {apt.petName?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-gray-900">
                            {apt.petName} <span className="text-gray-400 font-normal">({apt.species} • {apt.breed})</span>
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Owner: {apt.owner} • {apt.ownerPhone}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-[#E86A33]">{apt.time}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{apt.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PATIENTS */}
          {activeTab === "Patients" && (
            <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-base font-bold text-[#3B1E43]">Registered Pet Patients</h2>
                <p className="text-xs text-gray-400">Real companion animal medical records from customer consultations.</p>
              </div>

              {patients.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400">
                  No patient records registered yet. Patients will automatically appear here when customers book consultations.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {patients.map((pat) => (
                    <div key={pat.id} className="rounded-2xl border border-gray-200 bg-[#FAF7F2] p-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#5C2A73]/10 flex items-center justify-center font-black text-[#5C2A73] text-sm">
                          {pat.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-gray-900">{pat.name}</h4>
                          <p className="text-[11px] text-gray-500">{pat.species} • {pat.breed} • {pat.age}</p>
                        </div>
                      </div>
                      <div className="text-[11px] text-gray-600 border-t border-gray-200/60 pt-2">
                        <strong>Client:</strong> {pat.owner} ({pat.ownerPhone})
                      </div>
                      {pat.history && (
                        <div className="text-[10px] text-gray-500 bg-white p-2 rounded-xl border border-gray-200">
                          {pat.history}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: TIMETABLE & AVAILABILITY */}
          {activeTab === "Timetable" && (
            <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-[#3B1E43]">
                    Weekly Consultation Timetable
                  </h2>
                  <p className="text-xs text-gray-500">
                    Set your working days and daily hours. Clients can only book slots during these times.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveAvailability}
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#5C2A73] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#5C2A73]/20 hover:bg-[#48205a] disabled:opacity-50 transition"
                >
                  <Save size={14} />
                  <span>{savingSettings ? "Saving..." : "Save Timetable"}</span>
                </button>
              </div>

              {/* Consultation & Duration Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE8DC]">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Consultation Fee (₹ INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={profileForm.consultationFee}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, consultationFee: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white pl-8 pr-3 py-2 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Charge per telehealth consultation session.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Slot Duration (Minutes)
                  </label>
                  <select
                    value={profileForm.slotDurationMinutes}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, slotDurationMinutes: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                  >
                    <option value={15}>15 Minutes (Express check)</option>
                    <option value={20}>20 Minutes</option>
                    <option value={30}>30 Minutes (Standard)</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes (Comprehensive)</option>
                  </select>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Time interval generated for each booking slot.
                  </p>
                </div>
              </div>

              {/* Daily Timetable Rows */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Daily Working Hours
                </h3>
                {timetable.map((dayItem, idx) => (
                  <div
                    key={dayItem.day}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border transition ${
                      dayItem.enabled
                        ? "bg-white border-purple-200/80 shadow-sm"
                        : "bg-gray-50/70 border-gray-200/60 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`day-${dayItem.day}`}
                        checked={dayItem.enabled}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setTimetable((prev) =>
                            prev.map((d) =>
                              d.day === dayItem.day ? { ...d, enabled: checked } : d
                            )
                          );
                        }}
                        className="h-4 w-4 rounded accent-[#5C2A73] cursor-pointer"
                      />
                      <label
                        htmlFor={`day-${dayItem.day}`}
                        className="text-xs font-bold text-gray-800 cursor-pointer min-w-[90px]"
                      >
                        {dayItem.dayName}
                      </label>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          dayItem.enabled
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {dayItem.enabled ? "Open" : "Closed"}
                      </span>
                    </div>

                    {dayItem.enabled ? (
                      <div className="flex items-center gap-2 pl-7 sm:pl-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-gray-500 font-medium">From:</span>
                          <input
                            type="time"
                            value={dayItem.startTime}
                            onChange={(e) => {
                              const val = e.target.value;
                              setTimetable((prev) =>
                                prev.map((d) =>
                                  d.day === dayItem.day ? { ...d, startTime: val } : d
                                )
                              );
                            }}
                            className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                          />
                        </div>
                        <span className="text-gray-400 text-xs">to</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-gray-500 font-medium">To:</span>
                          <input
                            type="time"
                            value={dayItem.endTime}
                            onChange={(e) => {
                              const val = e.target.value;
                              setTimetable((prev) =>
                                prev.map((d) =>
                                  d.day === dayItem.day ? { ...d, endTime: val } : d
                                )
                              );
                            }}
                            className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic pl-7 sm:pl-0">
                        No appointments will be accepted on this day
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveAvailability}
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#5C2A73] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#5C2A73]/20 hover:bg-[#48205a] disabled:opacity-50 transition"
                >
                  <Save size={14} />
                  <span>{savingSettings ? "Saving..." : "Save Timetable"}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: ACCOUNT SETTINGS */}
          {activeTab === "Account" && (
            <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-base font-bold text-[#3B1E43]">
                  Veterinarian Account & Professional Profile
                </h2>
                <p className="text-xs text-gray-500">
                  Manage your doctor credentials, qualifications, biography, and practice details visible to pet owners.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Doctor Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                      placeholder="e.g. Dr. Rajesh Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Account Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={authUser?.email || "dr.sharma@lovopet.com"}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Clinical Specialization
                    </label>
                    <input
                      type="text"
                      value={profileForm.specialization}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, specialization: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                      placeholder="e.g. Small Animal Internal Medicine & Surgery"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Academic Qualifications
                    </label>
                    <input
                      type="text"
                      value={profileForm.qualification}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, qualification: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                      placeholder="e.g. BVSc & AH, MVSc (Surgery)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Clinical Experience (Years)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={profileForm.experienceYears}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, experienceYears: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.profileImage}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, profileImage: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Doctor Biography & Expertise Summary
                  </label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs font-medium text-gray-800 focus:border-[#5C2A73] focus:outline-none"
                    placeholder="Brief overview of your veterinary background and philosophy of care..."
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#5C2A73] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#5C2A73]/20 hover:bg-[#48205a] disabled:opacity-50 transition"
                  >
                    <Save size={14} />
                    <span>{savingSettings ? "Saving Profile..." : "Save Account Profile"}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: EARNINGS & PAYOUTS */}
          {activeTab === "Earnings" && (
            <div className="rounded-3xl border border-[#EFE8DC] bg-white p-6 shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-base font-bold text-[#3B1E43]">Real-Time Practice Finances & Payouts</h2>
                <p className="text-xs text-gray-400">Live consultation earnings, completed settlements, and pending payouts.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <span className="text-xs font-bold text-gray-600">Total Consultation Value</span>
                  <div className="text-3xl font-black text-emerald-800 mt-2">
                    ₹{(metrics.totalEarnings?.value || 0).toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Gross revenue from accepted & completed consultations.</p>
                </div>

                <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5">
                  <span className="text-xs font-bold text-gray-600">Settled Earnings</span>
                  <div className="text-3xl font-black text-[#5C2A73] mt-2">
                    ₹{(metrics.settledEarnings?.value || 0).toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">From completed consultations, ready for bank deposit.</p>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
                  <span className="text-xs font-bold text-gray-600">Pending Escrow / Balance</span>
                  <div className="text-3xl font-black text-blue-800 mt-2">
                    ₹{(metrics.pendingBalance?.value || 0).toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Upcoming sessions; settles once consultation is completed.
                  </p>
                </div>
              </div>

              {/* Real Earnings Breakdown */}
              <div className="rounded-2xl border border-[#EFE8DC] bg-[#FAF7F2] p-5 space-y-3">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Live Consultation Ledger
                </h3>
                {appointments.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4 text-center">
                    No consultation fees recorded yet. Earnings will calculate live with every consultation booked.
                  </p>
                ) : (
                  <div className="divide-y divide-gray-200/60">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-gray-800">{apt.petName}</span>{" "}
                          <span className="text-gray-500">({apt.owner})</span> •{" "}
                          <span className="text-gray-400">{apt.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            apt.status === "completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {apt.status}
                          </span>
                          <span className="font-black text-gray-900">₹{apt.fee || 500}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
