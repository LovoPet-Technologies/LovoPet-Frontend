import React, { useState } from "react";
import { Heart, MapPin, ShieldCheck } from "lucide-react";

export default function PetCard({ pet, onSelectPet }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      onClick={() => onSelectPet && onSelectPet(pet)}
      className="group bg-white border border-[#EFE8DC] rounded-[20px] overflow-hidden flex flex-col justify-between hover:border-[#E0603A]/50 hover:shadow-[0_18px_30px_-18px_rgba(59,24,67,0.28)] transition-all duration-300 cursor-pointer"
    >
      <div>
        <div className="relative h-52 w-full bg-[#FAF6F0] overflow-hidden">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          <span className="absolute top-3 left-3 bg-[#748757] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {pet.status}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved((s) => !s);
            }}
            aria-label="Save pet"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          >
            <Heart
              size={15}
              fill={saved ? "#E0603A" : "none"}
              color={saved ? "#E0603A" : "#3B1843"}
              strokeWidth={2.2}
            />
          </button>
        </div>

        <div className="p-5 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#748757]">
              {pet.category} • {pet.breed}
            </span>
            {pet.vaccinated && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                <ShieldCheck size={12} /> Vaccinated
              </span>
            )}
          </div>

          <h3
            className="text-[#3B1843] font-bold text-lg mt-1"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            {pet.name}
          </h3>

          <p className="text-zinc-500 text-xs mt-1 line-clamp-2 leading-relaxed min-h-[32px]">
            {pet.description}
          </p>

          <div className="flex items-center gap-2 mt-3 text-xs text-zinc-600 font-medium">
            <span>{pet.gender}</span>
            <span>•</span>
            <span>{pet.age}</span>
            <span>•</span>
            <span>{pet.size}</span>
          </div>

          <div className="flex items-center gap-1 mt-2 text-xs text-zinc-500">
            <MapPin size={13} className="text-[#E0603A]" />
            <span>{pet.location}</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-2 flex items-center justify-between mt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectPet && onSelectPet(pet);
          }}
          className="w-full flex items-center justify-center gap-1.5 text-white text-xs font-bold py-2.5 rounded-xl transition-all duration-200 shadow-sm bg-[#3B1843] hover:bg-[#E0603A]"
        >
          View Details & Adopt
        </button>
      </div>
    </div>
  );
}
