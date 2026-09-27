import React, { useState } from "react";
import {
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Send,
  X,
} from "lucide-react";
import PetCard from "./PetCard";
import {
  getPetHighlights,
  getPetKeyBenefits,
  getRelatedPets,
} from "../../utils/adoptionUtils";

export default function PetDetailsPage({
  pet,
  onBack,
  allPets = [],
  onSelectPet,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Expanded Form State to capture all document sections
  const [formData, setFormData] = useState({
    // Section 1: Personal Information
    fullName: "",
    dob: "",
    gender: "",
    mobileNumber: "",
    email: "",
    residentialAddress: "",
    cityStatePin: "",
    occupation: "",
    emergencyContact: "",

    // Section 2: Housing & Living Environment
    housingType: "",
    propertyStatus: "",
    landlordAllowsPets: "",
    dayStayLocation: "",
    nightSleepLocation: "",

    // Section 3: Previous Pet Experience
    hasOwnedPetBefore: "No",
    previousPetTypes: "",
    previousPetsStillWithYou: "",
    previousPetsWhatHappened: "",
    hasSurrenderedPet: "",
    hasAdoptedRescueBefore: "",

    // Section 4: Existing Pets
    currentlyHasPets: "No",
    currentPetSpecies: "",
    currentPetBreed: "",
    currentPetAge: "",
    currentPetGender: "",
    currentPetsVaccinated: "",
    currentPetsSterilized: "",
    currentPetsBehavior: "",

    // Section 5: Financial Preparedness
    financiallyPreparedRoutine: false,
    financiallyPreparedEmergency: false,

    // Section 6: Post-Adoption Commitment
    willingToProvideUpdates: false,
    willingToFollowUpChecks: false,
    agreeNotToAbandonOrBreed: false,
    agreeToContactBeforeRehoming: false,
    understandLifelongCommitment: false,

    // Declaration
    declarationAccurate: false,
    declarationNoGuarantee: false,
    declarationAgreeTerms: false,
  });

  const galleryImages =
    pet.gallery && pet.gallery.length > 0 ? pet.gallery : [pet.image];

  const highlights = getPetHighlights(pet);
  const keyBenefits = getPetKeyBenefits(pet);
  const related = getRelatedPets(pet, allPets, 4);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdoptSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeModal = () => {
    setShowContactModal(false);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#3B1843] font-sans pt-13">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-b text-xs text-zinc-500 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-semibold text-[#3B1843] hover:text-[#E0603A] transition"
        >
          <ArrowLeft size={16} /> Back to Adoption
        </button>
        <div className="hidden md:flex items-center gap-1.5">
          <span>Home</span> / <span>Pet Adoption</span> /{" "}
          <span>{pet.category}</span> /{" "}
          <span className="text-zinc-800 font-medium">{pet.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-x-10 gap-y-8 items-start">
          {/* GALLERY SECTION */}
          <div className="order-1 lg:col-span-7 w-full flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#FAF6F0] border border-zinc-100 group">
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none md:overflow-hidden">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className="w-full shrink-0 snap-center relative"
                  >
                    <img
                      src={img}
                      alt={`${pet.name} ${index + 1}`}
                      className="w-full h-80 md:h-[28rem] object-cover transition"
                    />
                  </div>
                ))}
              </div>

              <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition z-10">
                <Heart size={18} className="text-zinc-600 hover:text-red-500" />
              </button>
              <button className="absolute top-16 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition z-10">
                <Share2 size={18} className="text-zinc-600" />
              </button>

              <span className="absolute bottom-4 left-4 bg-[#748757] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {pet.status}
              </span>
            </div>

            {/* Desktop Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="hidden md:flex gap-3">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      activeIndex === index
                        ? "border-[#E0603A]"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${pet.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT ACTION/BUY BOX */}
          <div className="order-2 lg:col-span-5 w-full lg:sticky lg:top-6 self-start flex flex-col justify-start">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-center justify-between mb-6">
              <span className="text-xs text-zinc-700 font-medium">
                Give love • Change a life • Save a pet
              </span>
              <span className="bg-[#E0603A] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                Adopt
              </span>
            </div>

            <span className="text-[11px] font-bold tracking-wider uppercase text-[#748757]">
              {pet.category} • {pet.breed}
            </span>

            <h1 className="text-3xl font-bold text-[#3B1843] mt-1 mb-2">
              {pet.name}
            </h1>

            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-zinc-600">
              <span className="flex items-center gap-1 text-[#E0603A]">
                <MapPin size={14} /> {pet.location}
              </span>
              <span>•</span>
              <span>{pet.gender}</span>
              <span>•</span>
              <span>{pet.age}</span>
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed mb-6">
              {pet.description}
            </p>

            {/* Adoption Process Banner */}
            <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#EFE8DC] mb-6">
              <h3 className="font-bold text-sm mb-1 text-[#3B1843]">
                Adoption Process:
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Click below to express your interest. Our adoption team will
                reach out to you within 24 hours to schedule a meeting.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowContactModal(true)}
              className="w-full py-4 bg-[#3B1843] hover:bg-[#E0603A] text-white rounded-xl font-bold text-base transition shadow-md flex items-center justify-center gap-2"
            >
              <Send size={18} /> Contact Us to Adopt {pet.name}
            </button>
          </div>

          {/* BOTTOM DETAILS SECTION */}
          <div className="order-3 lg:col-span-7 w-full flex flex-col gap-8">
            {/* Highlights */}
            <div>
              <h2 className="text-lg font-bold mb-3 text-[#3B1843]">
                Pet Medical & Location Summary
              </h2>
              <ul className="space-y-2">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-zinc-600"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-[#748757] mt-0.5 shrink-0"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-lg font-bold mb-3 text-[#3B1843]">
                Temperament & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {keyBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="bg-[#FAF6F0] border border-[#EFE8DC] rounded-xl p-4"
                  >
                    <p className="font-bold text-sm mb-1 text-[#3B1843]">
                      {b.title}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {b.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* History / Background */}
            <div>
              <h2 className="text-lg font-bold mb-3 text-[#3B1843]">
                Background & History
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {pet.history}
              </p>
            </div>
          </div>
        </div>

        {/* Related Adoptable Pets */}
        {related.length > 0 && (
          <div className="mt-16 border-t pt-8">
            <h2 className="text-lg font-bold mb-4 text-[#3B1843]">
              Other Pets Looking for a Home
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <PetCard key={p.id} pet={p} onSelectPet={onSelectPet} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ADOPTION APPLICATION POPUP MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-xl border border-[#EFE8DC]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 z-10"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <h3 className="text-xl font-bold text-[#3B1843] mb-1">
                  Adopt {pet.name}
                </h3>
                <p className="text-xs text-zinc-500 mb-6">
                  Please fill out your details. Our adoption coordinator will
                  reach out directly.
                </p>

                <form onSubmit={handleAdoptSubmit} className="space-y-6">
                  {/* Section 1: Personal Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#3B1843] border-b pb-1">
                      Section 1: Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Date of Birth / Age *
                        </label>
                        <input
                          required
                          type="text"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          placeholder="DD/MM/YYYY or Age"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Gender *
                        </label>
                        <select
                          required
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                        >
                          <option value="">Select Gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          required
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Occupation *
                        </label>
                        <input
                          required
                          type="text"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                          placeholder="Software Engineer"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Residential Address *
                      </label>
                      <textarea
                        required
                        name="residentialAddress"
                        rows={2}
                        value={formData.residentialAddress}
                        onChange={handleInputChange}
                        placeholder="House/Apartment No., Street, Landmark"
                        className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          City, State, PIN Code *
                        </label>
                        <input
                          required
                          type="text"
                          name="cityStatePin"
                          value={formData.cityStatePin}
                          onChange={handleInputChange}
                          placeholder="Ahmedabad, Gujarat, 380001"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Emergency Contact Number *
                        </label>
                        <input
                          required
                          type="tel"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Housing & Living Environment */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#3B1843] border-b pb-1">
                      Section 2: Housing & Living Environment
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Do you live in a: *
                        </label>
                        <select
                          required
                          name="housingType"
                          value={formData.housingType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                        >
                          <option value="">Select Option</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Independent House">
                            Independent House
                          </option>
                          <option value="Farmhouse">Farmhouse</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Is the property: *
                        </label>
                        <select
                          required
                          name="propertyStatus"
                          value={formData.propertyStatus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                        >
                          <option value="">Select Option</option>
                          <option value="Owned">Owned</option>
                          <option value="Rented">Rented</option>
                        </select>
                      </div>
                    </div>

                    {formData.propertyStatus === "Rented" && (
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          If rented, does your landlord allow pets? *
                        </label>
                        <select
                          required
                          name="landlordAllowsPets"
                          value={formData.landlordAllowsPets}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                        >
                          <option value="">Select Option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Where will the pet stay during the day? *
                        </label>
                        <input
                          required
                          type="text"
                          name="dayStayLocation"
                          value={formData.dayStayLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. Indoors, Living room"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Where will the pet sleep at night? *
                        </label>
                        <input
                          required
                          type="text"
                          name="nightSleepLocation"
                          value={formData.nightSleepLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. In my bedroom"
                          className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Previous Pet Experience */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#3B1843] border-b pb-1">
                      Section 3: Previous Pet Experience
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Have you ever owned a pet before? *
                      </label>
                      <div className="flex gap-4 items-center">
                        <label className="flex items-center gap-2 text-xs text-zinc-700">
                          <input
                            type="radio"
                            name="hasOwnedPetBefore"
                            value="Yes"
                            checked={formData.hasOwnedPetBefore === "Yes"}
                            onChange={handleInputChange}
                            className="accent-[#E0603A]"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-xs text-zinc-700">
                          <input
                            type="radio"
                            name="hasOwnedPetBefore"
                            value="No"
                            checked={formData.hasOwnedPetBefore === "No"}
                            onChange={handleInputChange}
                            className="accent-[#E0603A]"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {formData.hasOwnedPetBefore === "Yes" && (
                      <div className="space-y-3 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                        <div>
                          <label className="block text-xs font-bold text-zinc-700 mb-1">
                            What type of pet(s)? *
                          </label>
                          <input
                            required
                            type="text"
                            name="previousPetTypes"
                            value={formData.previousPetTypes}
                            onChange={handleInputChange}
                            placeholder="e.g. Dogs, Cats"
                            className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Are those pets still with you? *
                            </label>
                            <select
                              required
                              name="previousPetsStillWithYou"
                              value={formData.previousPetsStillWithYou}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            >
                              <option value="">Select Option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              If not, what happened to them? *
                            </label>
                            <input
                              required={
                                formData.previousPetsStillWithYou === "No"
                              }
                              type="text"
                              name="previousPetsWhatHappened"
                              value={formData.previousPetsWhatHappened}
                              onChange={handleInputChange}
                              placeholder="Passed away due to old age, etc."
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Have you ever surrendered or rehomed a pet? *
                            </label>
                            <select
                              required
                              name="hasSurrenderedPet"
                              value={formData.hasSurrenderedPet}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            >
                              <option value="">Select Option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Have you adopted a rescue animal before? *
                            </label>
                            <select
                              required
                              name="hasAdoptedRescueBefore"
                              value={formData.hasAdoptedRescueBefore}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            >
                              <option value="">Select Option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 4: Existing Pets */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#3B1843] border-b pb-1">
                      Section 4: Existing Pets
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Do you currently have any pets? *
                      </label>
                      <div className="flex gap-4 items-center">
                        <label className="flex items-center gap-2 text-xs text-zinc-700">
                          <input
                            type="radio"
                            name="currentlyHasPets"
                            value="Yes"
                            checked={formData.currentlyHasPets === "Yes"}
                            onChange={handleInputChange}
                            className="accent-[#E0603A]"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-xs text-zinc-700">
                          <input
                            type="radio"
                            name="currentlyHasPets"
                            value="No"
                            checked={formData.currentlyHasPets === "No"}
                            onChange={handleInputChange}
                            className="accent-[#E0603A]"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {formData.currentlyHasPets === "Yes" && (
                      <div className="space-y-3 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Species *
                            </label>
                            <input
                              required
                              type="text"
                              name="currentPetSpecies"
                              value={formData.currentPetSpecies}
                              onChange={handleInputChange}
                              placeholder="Dog / Cat"
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Breed *
                            </label>
                            <input
                              required
                              type="text"
                              name="currentPetBreed"
                              value={formData.currentPetBreed}
                              onChange={handleInputChange}
                              placeholder="Indie / Mix"
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Age *
                            </label>
                            <input
                              required
                              type="text"
                              name="currentPetAge"
                              value={formData.currentPetAge}
                              onChange={handleInputChange}
                              placeholder="2 years"
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Gender *
                            </label>
                            <select
                              required
                              name="currentPetGender"
                              value={formData.currentPetGender}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            >
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Are your current pets vaccinated? *
                            </label>
                            <select
                              required
                              name="currentPetsVaccinated"
                              value={formData.currentPetsVaccinated}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            >
                              <option value="">Select Option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">
                              Are your current pets sterilized/neutered? *
                            </label>
                            <select
                              required
                              name="currentPetsSterilized"
                              value={formData.currentPetsSterilized}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                            >
                              <option value="">Select Option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-700 mb-1">
                            How do your current pets generally behave around
                            other animals? *
                          </label>
                          <input
                            required
                            type="text"
                            name="currentPetsBehavior"
                            value={formData.currentPetsBehavior}
                            onChange={handleInputChange}
                            placeholder="e.g. Friendly, Shy"
                            className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A] bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 5: Financial Preparedness */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#3B1843] border-b pb-1">
                      Section 5: Financial Preparedness
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="financiallyPreparedRoutine"
                          checked={formData.financiallyPreparedRoutine}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          I am financially prepared for routine pet expenses
                          (food, vaccinations, grooming).*
                        </span>
                      </label>
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="financiallyPreparedEmergency"
                          checked={formData.financiallyPreparedEmergency}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          I am financially prepared for unexpected medical
                          emergencies.*
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Section 6: Post-Adoption Commitment */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#3B1843] border-b pb-1">
                      Section 6: Post-Adoption Commitment
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="willingToProvideUpdates"
                          checked={formData.willingToProvideUpdates}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          Are you willing to provide periodic updates about the
                          pet? *
                        </span>
                      </label>
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="willingToFollowUpChecks"
                          checked={formData.willingToFollowUpChecks}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          Are you willing to participate in follow-up checks by
                          LovoPet? *
                        </span>
                      </label>
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="agreeNotToAbandonOrBreed"
                          checked={formData.agreeNotToAbandonOrBreed}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          Do you agree not to abandon, neglect, sell, or
                          illegally breed the pet? *
                        </span>
                      </label>
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="agreeToContactBeforeRehoming"
                          checked={formData.agreeToContactBeforeRehoming}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          If you can no longer keep the pet, do you agree to
                          contact LovoPet before rehoming? *
                        </span>
                      </label>
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="understandLifelongCommitment"
                          checked={formData.understandLifelongCommitment}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          Do you understand that adoption is a lifelong
                          commitment? *
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Declaration */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#3B1843] border-b pb-1">
                      Declaration
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="declarationAccurate"
                          checked={formData.declarationAccurate}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          I certify that all information provided is accurate
                          and truthful.
                        </span>
                      </label>
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="declarationNoGuarantee"
                          checked={formData.declarationNoGuarantee}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          I understand that submitting this application does not
                          guarantee adoption approval.
                        </span>
                      </label>
                      <label className="flex items-start gap-2 text-xs text-zinc-700 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          name="declarationAgreeTerms"
                          checked={formData.declarationAgreeTerms}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-[#E0603A]"
                        />
                        <span>
                          I agree to LovoPet's adoption policies and terms &
                          conditions.
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#E0603A] hover:bg-[#3B1843] text-white font-bold rounded-xl text-sm transition"
                  >
                    Submit Application
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#3B1843] mb-2">
                  Application Received!
                </h3>
                <p className="text-sm font-semibold text-[#E0603A] bg-orange-50 py-3 rounded-xl border border-orange-200">
                  We will contact with you!
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 px-6 py-2 bg-[#3B1843] text-white rounded-xl text-xs font-bold hover:bg-[#E0603A] transition"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
