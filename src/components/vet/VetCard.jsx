import { Star, Briefcase, Calendar } from "lucide-react";

export default function VetCard({ vet }) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <div>
        {/* Top Header: Avatar & Main Info */}
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#5C2A73]/10 ring-2 ring-[#5C2A73]/10">
            <img
              src={vet.avatar}
              alt={vet.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#3B1E43]">{vet.name}</h3>
            <p className="text-xs font-semibold text-[#E86A33]">
              {vet.specialisation}
            </p>
            <p className="mt-0.5 text-[11px] text-gray-400">
              {vet.qualification}
            </p>
          </div>
        </div>

        <hr className="my-4 border-gray-100" />

        {/* Experience & Rating Row */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Experience
            </span>
            <p className="mt-1 flex items-center gap-1.5 font-semibold text-gray-800">
              <Briefcase size={14} className="text-[#E86A33]" />
              {vet.experience} yrs
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Rating
            </span>
            <p className="mt-1 flex items-center gap-1.5 font-semibold text-gray-800">
              <div className="flex text-[#E86A33]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold">{vet.rating}</span>
              <span className="text-gray-400">({vet.reviews})</span>
            </p>
          </div>
        </div>

        {/* Next Availability */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50/60 px-3 py-2 text-xs text-emerald-800">
          <Calendar size={14} className="text-emerald-600 shrink-0" />
          <span className="text-gray-500">Next available:</span>
          <span className="font-semibold text-gray-800">
            {vet.nextAvailable}
          </span>
        </div>
      </div>

      {/* Card Footer: Fee & Action Buttons */}
      <div className="mt-6 flex items-center justify-between pt-2">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-[#3B1E43]">₹{vet.fee}</span>
          <span className="text-xs text-gray-400">/ consult</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50">
            Profile
          </button>
          <button className="rounded-full bg-[#E86A33] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#d55922]">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
