import React, { useState } from "react";
import {
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  ShieldCheck,
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

  const galleryImages =
    pet.gallery && pet.gallery.length > 0 ? pet.gallery : [pet.image];

  const highlights = getPetHighlights(pet);
  const keyBenefits = getPetKeyBenefits(pet);
  const related = getRelatedPets(pet, allPets, 4);

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

      {/* ADOPTION CONTACT POPUP MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl border border-[#EFE8DC]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <h3 className="text-xl font-bold text-[#3B1843] mb-1">
                  Adopt {pet.name}
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Please fill out your details. Our adoption coordinator will
                  reach out directly.
                </p>

                <form onSubmit={handleAdoptSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      City / Location
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ahmedabad"
                      className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:border-[#E0603A]"
                    />
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
