import { Star, Briefcase, Calendar } from "lucide-react";

export default function VetCard({ vet, onBook, onProfile }) {
  const name = vet.name || "Dr. Veterinarian";
  const avatar =
    vet.profileImage ||
    vet.avatar ||
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop";
  const specialisation =
    vet.specialization || vet.specialisation || "General Veterinary Practice";
  const qualification = vet.qualification || "BVSc & AH";
  const rating = vet.rating || 4.9;
  const experience = vet.experienceYears ?? vet.experience ?? 5;
  const reviews = vet.reviews || 92;
  const fee = vet.consultationFee ?? vet.fee ?? 500;
  const nextAvailable = vet.nextAvailable || "Today Available";

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        {/* Top Header: Avatar & Main Info */}
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#5C2A73]/10 ring-2 ring-[#5C2A73]/10">
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-[#3B1E43]">{name}</h3>
            <p className="truncate text-[11px] font-semibold text-[#E86A33]">
              {specialisation}
            </p>
            <p className="truncate text-[10px] text-gray-400">{qualification}</p>
          </div>

          {/* Rating badge, top-right */}
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700">
            <Star size={11} fill="currentColor" className="text-amber-500" />
            {rating}
          </div>
        </div>

        {/* Experience & Reviews Row */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <Briefcase size={12} className="text-[#E86A33]" />
            <span className="font-semibold text-gray-700">{experience} yrs</span>
          </span>
          <span className="h-3 w-px bg-gray-200" />
          <span>{reviews} reviews</span>
        </div>

        {/* Next Availability */}
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50/70 px-2.5 py-1.5 text-[11px] text-emerald-800">
          <Calendar size={12} className="shrink-0 text-emerald-600" />
          <span className="text-gray-500">Next:</span>
          <span className="truncate font-semibold text-gray-800">
            {nextAvailable}
          </span>
        </div>
      </div>

      {/* Card Footer: Fee & Action Buttons */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-[#3B1E43]">₹{fee}</span>
          <span className="text-[10px] text-gray-400">/ consult</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onProfile && onProfile(vet)}
            className="rounded-full border border-gray-200 px-3 py-1.5 text-[11px] font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => onBook && onBook(vet)}
            className="rounded-full bg-[#E86A33] px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#d55922] cursor-pointer"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
