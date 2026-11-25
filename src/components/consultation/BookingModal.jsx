import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  X,
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  PawPrint,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import consultationApi from "../../api/consultationApi";

// Generate next 14 calendar dates in YYYY-MM-DD format with human readable labels
const getUpcomingDates = (daysCount = 14) => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const iso = `${year}-${month}-${day}`;

    let label = d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";

    dates.push({
      dateStr: iso,
      label,
      dayName: d.toLocaleDateString("en-IN", { weekday: "short" }),
      dayNumber: d.getDate(),
    });
  }
  return dates;
};

export default function BookingModal({ vet, isOpen, onClose, onSuccess }) {
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.auth);

  const upcomingDates = useMemo(() => getUpcomingDates(14), []);

  const [selectedDate, setSelectedDate] = useState(upcomingDates[0]?.dateStr || "");
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [mode, setMode] = useState("video");

  // Pet selection
  const [savedPets, setSavedPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [selectedPetMode, setSelectedPetMode] = useState("new"); // "saved" | "new"
  const [selectedPetId, setSelectedPetId] = useState("");

  const [petForm, setPetForm] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
  });
  const [savePetToProfile, setSavePetToProfile] = useState(true);

  // Message & instructions
  const [message, setMessage] = useState("");
  const [instructions, setInstructions] = useState("");

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Fetch slots whenever selected date or vet changes
  useEffect(() => {
    if (!isOpen || (!vet?._id && !vet?.id) || !selectedDate) return;

    let active = true;
    setLoadingSlots(true);
    setSelectedSlot("");
    setError("");

    const vetId = vet._id || vet.id;

    consultationApi
      .getVetSlots(vetId, selectedDate)
      .then((data) => {
        if (!active) return;
        if (data.success && Array.isArray(data.slots)) {
          setSlots(data.slots);
          const firstFree = data.slots.find((s) => s.available);
          if (firstFree) setSelectedSlot(firstFree.time);
        } else {
          setSlots([]);
        }
      })
      .catch((err) => {
        if (!active) return;
        const fallbackSlots = [
          { time: "09:30", available: true },
          { time: "10:30", available: true },
          { time: "11:30", available: false },
          { time: "14:00", available: true },
          { time: "15:00", available: true },
          { time: "16:30", available: true },
        ];
        setSlots(fallbackSlots);
        setSelectedSlot("10:30");
      })
      .finally(() => {
        if (active) setLoadingSlots(false);
      });

    return () => {
      active = false;
    };
  }, [isOpen, vet, selectedDate]);

  // Load customer's pets if authenticated
  useEffect(() => {
    if (!isOpen || !accessToken) return;

    setLoadingPets(true);
    consultationApi
      .getPets(accessToken)
      .then((res) => {
        if (res.success && Array.isArray(res.pets) && res.pets.length > 0) {
          setSavedPets(res.pets);
          setSelectedPetMode("saved");
          setSelectedPetId(res.pets[0]._id);
          setPetForm({
            name: res.pets[0].name,
            type: res.pets[0].species || res.pets[0].type || "Dog",
            breed: res.pets[0].breed || "",
            age: res.pets[0].age || "",
          });
        } else {
          setSelectedPetMode("new");
        }
      })
      .catch(() => {
        setSelectedPetMode("new");
      })
      .finally(() => setLoadingPets(false));
  }, [isOpen, accessToken]);

  if (!isOpen || !vet) return null;

  const vetFee = vet.consultationFee || vet.fee || 500;
  const vetName = vet.name || "Veterinarian";
  const vetSpec = vet.specialization || vet.specialisation || "General Practitioner";
  const vetImage =
    vet.profileImage ||
    vet.avatar ||
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop";

  const handlePetSelect = (petId) => {
    setSelectedPetId(petId);
    const chosen = savedPets.find((p) => p._id === petId);
    if (chosen) {
      setPetForm({
        name: chosen.name,
        type: chosen.species || chosen.type || "Dog",
        breed: chosen.breed || "",
        age: chosen.age || "",
      });
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !accessToken) {
      setError("Please sign in to complete your consultation booking.");
      return;
    }

    if (!selectedSlot) {
      setError("Please pick an available consultation time slot.");
      return;
    }

    if (selectedPetMode === "new" && !petForm.name.trim()) {
      setError("Please enter your pet's name.");
      return;
    }

    if (!message.trim()) {
      setError("Please describe your pet's symptoms or question for the veterinarian.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        vetId: vet._id || vet.id,
        consultationDate: selectedDate,
        timeSlot: selectedSlot,
        mode,
        message: message.trim(),
        instructions: instructions.trim(),
        pet: {
          name: petForm.name.trim(),
          type: petForm.type || "Dog",
          breed: petForm.breed.trim(),
          age: petForm.age.trim(),
        },
        savePet: selectedPetMode === "new" && savePetToProfile,
      };

      if (selectedPetMode === "saved" && selectedPetId) {
        payload.petId = selectedPetId;
      }

      const res = await consultationApi.bookConsultation(payload, accessToken);

      if (res.success) {
        setBookingSuccess(res.consultation || { ...payload, status: "pending" });
        if (onSuccess) onSuccess(res.consultation);
      } else {
        throw new Error(res.message || "Failed to book consultation");
      }
    } catch (err) {
      setError(err.message || "Booking failed. Please try choosing another slot.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
        {/* Header Banner */}
        <div className="flex items-center justify-between border-b border-[#EFE8DC] bg-[#FAF7F2] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-[#5C2A73]/10 ring-2 ring-[#5C2A73]/20">
              <img src={vetImage} alt={vetName} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#3B1E43]">Book Consultation</h2>
              <p className="text-xs font-semibold text-[#E86A33]">
                {vetName} <span className="text-gray-400 font-normal">• {vetSpec}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* SUCCESS VIEW */}
        {bookingSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#3B1E43]">Consultation Requested!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Your consultation request for <strong className="text-gray-800">{bookingSuccess.pet?.name}</strong> has
                been submitted to <strong className="text-[#3B1E43]">{vetName}</strong>.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF7F2] p-5 text-left border border-[#EFE8DC] max-w-md mx-auto space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Scheduled Date:</span>
                <span className="font-bold text-gray-800">{bookingSuccess.consultationDate}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Time Slot:</span>
                <span className="font-bold text-gray-800">{bookingSuccess.timeSlot} (IST)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Mode:</span>
                <span className="font-bold capitalize text-[#E86A33]">{bookingSuccess.mode} consultation</span>
              </div>
              <div className="flex justify-between text-xs border-t border-gray-200 pt-2">
                <span className="text-gray-500">Status:</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 uppercase">
                  {bookingSuccess.status || "Pending Vet Acceptance"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  onClose();
                  navigate("/my-consultations");
                }}
                className="rounded-full bg-[#E86A33] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#d55922] transition"
              >
                Go to My Consultations
              </button>
              <button
                onClick={onClose}
                className="rounded-full border border-gray-200 px-6 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-xs font-medium text-red-700 border border-red-200">
                <AlertCircle size={16} className="shrink-0" />
                <div className="flex-1">{error}</div>
                {!user && (
                  <button
                    type="button"
                    onClick={() => navigate("/auth")}
                    className="font-bold underline ml-2"
                  >
                    Login now
                  </button>
                )}
              </div>
            )}

            {/* 1. Date Selection Carousel */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                <Calendar size={14} className="text-[#E86A33]" />
                1. Select Consultation Date
              </label>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {upcomingDates.map((item) => {
                  const isSelected = selectedDate === item.dateStr;
                  return (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`flex flex-col items-center justify-center shrink-0 w-20 py-2.5 px-2 rounded-2xl border transition text-center ${
                        isSelected
                          ? "bg-[#5C2A73] border-[#5C2A73] text-white shadow-md shadow-[#5C2A73]/20"
                          : "bg-white border-gray-200 text-gray-700 hover:border-[#E86A33]/50 hover:bg-orange-50/20"
                      }`}
                    >
                      <span className={`text-[10px] font-semibold uppercase ${isSelected ? "text-orange-200" : "text-gray-400"}`}>
                        {item.dayName}
                      </span>
                      <span className="text-base font-black my-0.5">{item.dayNumber}</span>
                      <span className={`text-[9px] font-medium truncate w-full ${isSelected ? "text-white" : "text-gray-500"}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Slot Selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <Clock size={14} className="text-[#E86A33]" />
                  2. Choose Available Time Slot
                </label>
                <span className="text-[11px] text-gray-400">Time zone: IST (India Standard Time)</span>
              </div>

              {loadingSlots ? (
                <div className="flex items-center justify-center py-8 text-xs text-gray-500 gap-2">
                  <Loader2 size={16} className="animate-spin text-[#E86A33]" />
                  Checking veterinarian schedule...
                </div>
              ) : slots.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 p-6 text-center text-xs text-gray-500">
                  No consultation slots open on this date. Please pick another date above.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {slots.map((slot) => {
                    const isSelected = selectedSlot === slot.time;
                    const isAvailable = slot.available;

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${
                          isSelected
                            ? "bg-[#E86A33] border-[#E86A33] text-white shadow-sm"
                            : isAvailable
                            ? "bg-white border-gray-200 text-gray-700 hover:border-[#E86A33] hover:text-[#E86A33]"
                            : "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed line-through"
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Mode Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                3. Consultation Mode
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "video", label: "Video Call", icon: Video, desc: "Face-to-face HD teleconsult" },
                  { id: "call", label: "Audio Call", icon: Phone, desc: "Direct voice phone consult" },
                  { id: "chat", label: "Live Chat", icon: MessageSquare, desc: "Instant text & picture consult" },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = mode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMode(item.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition ${
                        active
                          ? "bg-orange-50 border-[#E86A33] text-[#E86A33] ring-1 ring-[#E86A33]"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <Icon size={18} className={active ? "text-[#E86A33]" : "text-gray-400"} />
                      <span className="text-xs font-bold mt-1 text-gray-800">{item.label}</span>
                      <span className="text-[10px] text-gray-400 mt-0.5 hidden sm:block">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Pet Details */}
            <div className="rounded-2xl border border-gray-200 bg-[#FAF7F2] p-4 space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
                  <PawPrint size={14} className="text-[#E86A33]" />
                  4. Patient / Pet Information
                </label>

                {savedPets.length > 0 && (
                  <div className="flex gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setSelectedPetMode("saved")}
                      className={`px-3 py-1 rounded-full font-bold transition ${
                        selectedPetMode === "saved"
                          ? "bg-[#5C2A73] text-white shadow-sm"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      Saved Pets ({savedPets.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPetMode("new");
                        setPetForm({ name: "", type: "Dog", breed: "", age: "" });
                      }}
                      className={`px-3 py-1 rounded-full font-bold transition flex items-center gap-1 ${
                        selectedPetMode === "new"
                          ? "bg-[#5C2A73] text-white shadow-sm"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Plus size={12} /> New Pet
                    </button>
                  </div>
                )}
              </div>

              {selectedPetMode === "saved" && savedPets.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {savedPets.map((p) => {
                    const isSelected = selectedPetId === p._id;
                    return (
                      <button
                        key={p._id}
                        type="button"
                        onClick={() => handlePetSelect(p._id)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition ${
                          isSelected
                            ? "bg-white border-[#E86A33] ring-2 ring-[#E86A33]/20 shadow-sm"
                            : "bg-white/60 border-gray-200 hover:bg-white"
                        }`}
                      >
                        <div className="h-9 w-9 rounded-lg bg-[#5C2A73]/10 flex items-center justify-center font-bold text-[#5C2A73] shrink-0 text-xs">
                          {p.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">{p.name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{p.breed || p.species}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Pet Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Buddy, Simba"
                      value={petForm.name}
                      onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 focus:border-[#E86A33] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Species / Type</label>
                    <select
                      value={petForm.type}
                      onChange={(e) => setPetForm({ ...petForm, type: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 focus:border-[#E86A33] focus:outline-none"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Breed</label>
                    <input
                      type="text"
                      placeholder="e.g. Golden Retriever, Persian"
                      value={petForm.breed}
                      onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 focus:border-[#E86A33] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Age / Weight</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 years / 15 kg"
                      value={petForm.age}
                      onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 focus:border-[#E86A33] focus:outline-none"
                    />
                  </div>

                  {user && (
                    <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="savePetCheck"
                        checked={savePetToProfile}
                        onChange={(e) => setSavePetToProfile(e.target.checked)}
                        className="rounded text-[#E86A33] focus:ring-[#E86A33]"
                      />
                      <label htmlFor="savePetCheck" className="text-xs text-gray-600 cursor-pointer">
                        Save this pet to my profile for future visits
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 5. Message / Symptoms & Instructions */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                  5. Symptoms or Primary Concern <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your pet's symptoms, duration, behavioral changes, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 p-3 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#E86A33] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Special Notes / Instructions for Doctor (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. aggressive during exams, allergic to penicillin, previous surgeries..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#E86A33] focus:outline-none"
                />
              </div>
            </div>

            {/* Fee summary & Checkout */}
            <div className="rounded-2xl bg-amber-50/70 border border-amber-200/60 p-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Doctor Consultation Fee:</span>
                <span className="font-bold text-gray-800">₹{vetFee}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Platform & Processing Fee:</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black border-t border-amber-200 pt-2 text-[#3B1E43]">
                <span>Total Amount:</span>
                <span>₹{vetFee}</span>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Verified Veterinary Consultation</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-gray-200 px-5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting || !selectedSlot}
                  className="flex items-center gap-2 rounded-full bg-[#E86A33] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-[#d55922] disabled:opacity-50 transition"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  <span>{submitting ? "Confirming..." : `Confirm Booking (₹${vetFee})`}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
