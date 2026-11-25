import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  PawPrint,
  Plus,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import consultationApi from "../api/consultationApi";

export default function MyPetsPage() {
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.auth);

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    weight: "",
    medicalNotes: "",
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const loadPets = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await consultationApi.getPets(accessToken);
      if (res.success && Array.isArray(res.pets)) {
        setPets(res.pets);
      } else {
        setPets([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load your pets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    loadPets();
  }, [user, accessToken]);

  const handleAddPet = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSaving(true);
    try {
      const res = await consultationApi.createPet(
        {
          ...form,
          name: form.name.trim(),
          breed: form.breed.trim(),
          age: form.age.trim(),
          weight: form.weight.trim(),
          medicalNotes: form.medicalNotes.trim(),
        },
        accessToken
      );

      if (res.success && res.pet) {
        setPets([res.pet, ...pets]);
        setModalOpen(false);
        setForm({
          name: "",
          species: "Dog",
          breed: "",
          age: "",
          gender: "Male",
          weight: "",
          medicalNotes: "",
        });
        showToast("Pet added successfully!");
      }
    } catch (err) {
      showToast(err.message || "Failed to add pet");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePet = async (id, name) => {
    if (!confirm(`Are you sure you want to remove ${name}?`)) return;

    try {
      const res = await consultationApi.deletePet(id, accessToken);
      if (res.success) {
        setPets(pets.filter((p) => p._id !== id));
        showToast("Pet record removed.");
      }
    } catch (err) {
      showToast(err.message || "Failed to remove pet.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 pt-32 pb-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#3B1E43] px-5 py-3 text-xs font-bold text-white shadow-xl">
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DC] pb-8 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5C2A73]/10 px-3 py-1 text-xs font-bold text-[#5C2A73] mb-2">
              <PawPrint size={13} />
              <span>Family & Companions</span>
            </div>
            <h1 className="text-3xl font-black text-[#3B1E43]">My Pets</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your pet profiles for quick consultation booking and medical tracking.
            </p>
          </div>

          {user && (
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-[#E86A33] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-[#d55922] transition"
            >
              <Plus size={15} />
              <span>Add New Pet</span>
            </button>
          )}
        </div>

        {!user ? (
          <div className="rounded-3xl bg-white p-12 text-center ring-1 ring-black/5 max-w-lg mx-auto space-y-4">
            <PawPrint size={32} className="mx-auto text-gray-300" />
            <h2 className="text-xl font-bold text-[#3B1E43]">Please sign in</h2>
            <p className="text-xs text-gray-500">
              Sign in with your customer account to view or add pets to your profile.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="rounded-full bg-[#E86A33] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#d55922]"
            >
              Sign In
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-xs text-gray-500">
            <Loader2 size={24} className="animate-spin text-[#E86A33]" />
            <span>Loading pet profiles...</span>
          </div>
        ) : pets.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center text-gray-500 ring-1 ring-black/5 space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FAF7F2] text-[#5C2A73]">
              <PawPrint size={32} />
            </div>
            <h3 className="text-base font-bold text-gray-800">No pets added yet</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Add your dogs, cats, or other pets to easily choose them when booking veterinary consultations.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full bg-[#E86A33] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#d55922]"
            >
              Add Your First Pet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="rounded-3xl border border-[#EFE8DC] bg-white p-5 shadow-sm transition hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-[#5C2A73]/10 flex items-center justify-center font-black text-lg text-[#5C2A73]">
                        {pet.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#3B1E43]">{pet.name}</h3>
                        <p className="text-xs font-semibold text-[#E86A33]">
                          {pet.species || pet.type} • {pet.breed || "Mixed"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeletePet(pet._id, pet.name)}
                      className="p-1.5 text-gray-300 hover:text-red-500 transition"
                      title="Remove pet"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-gray-500 bg-[#FAF7F2] p-3 rounded-2xl border border-[#EFE8DC]/60">
                    <div>
                      <span className="text-[10px] uppercase text-gray-400 font-bold block">Age</span>
                      <span className="font-semibold text-gray-800">{pet.age || "Not specified"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-gray-400 font-bold block">Gender</span>
                      <span className="font-semibold text-gray-800">{pet.gender || "Unknown"}</span>
                    </div>
                    {pet.weight && (
                      <div className="col-span-2">
                        <span className="text-[10px] uppercase text-gray-400 font-bold block">Weight</span>
                        <span className="font-semibold text-gray-800">{pet.weight}</span>
                      </div>
                    )}
                  </div>

                  {pet.medicalNotes && (
                    <div className="mt-3 text-[11px] text-gray-600 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100">
                      <strong className="text-gray-700">Medical Notes:</strong> {pet.medicalNotes}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate("/vet")}
                    className="w-full rounded-full bg-[#5C2A73]/10 py-2 text-xs font-bold text-[#5C2A73] hover:bg-[#5C2A73] hover:text-white transition"
                  >
                    Consult Vet for {pet.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Add Pet */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <h3 className="text-base font-bold text-[#3B1E43]">Add New Pet</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddPet} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Pet Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Leo, Bella"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-[#E86A33] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Species</label>
                    <select
                      value={form.species}
                      onChange={(e) => setForm({ ...form, species: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-[#E86A33] focus:outline-none"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Gender</label>
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-[#E86A33] focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Breed</label>
                    <input
                      type="text"
                      placeholder="e.g. Beagle, Persian"
                      value={form.breed}
                      onChange={(e) => setForm({ ...form, breed: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-[#E86A33] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Age</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 years, 6 months"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-[#E86A33] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    placeholder="e.g. 14 kg"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-[#E86A33] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Medical Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Allergies, chronic conditions, ongoing medications..."
                    value={form.medicalNotes}
                    onChange={(e) => setForm({ ...form, medicalNotes: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#E86A33] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-1.5 rounded-full bg-[#E86A33] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#d55922] disabled:opacity-50"
                  >
                    {saving && <Loader2 size={12} className="animate-spin" />}
                    <span>Save Pet</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
