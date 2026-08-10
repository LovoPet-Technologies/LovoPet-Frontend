import {
  ArrowRight,
  PawPrint,
  Heart,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FDF8F2]">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#E86A33]/8 blur-3xl" />
      <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-[#F4A96B]/10 blur-3xl" />

      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, #FDF3E7 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#5C2A73 1px, transparent 1px), linear-gradient(to right, #5C2A73 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 90%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">
        {/* Left Content */}
        <div className="max-w-2xl lg:w-1/2">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5D8C9] bg-white px-4 py-2 text-sm font-semibold text-[#5C2A73] shadow-sm">
            <PawPrint size={18} className="text-[#E86A33]" />
            AI health assistant now in beta
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-[#1E2A4A] md:text-5xl lg:text-6xl">
            Complete Care
            <br />
            For Your Pet,
            <br />
            <span className="text-[#E86A33]">In One Platform.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600 md:text-xl">
            "Reimagining Animal Care"
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E86A33] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#E86A33]/30 transition-all duration-300 hover:scale-105 hover:bg-[#5C2A73]">
              Book a consultation
              <ArrowRight size={20} />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#E5D8C9] bg-white px-8 py-4 text-lg font-bold text-[#1E2A4A] transition-all duration-300 hover:border-[#5C2A73] hover:text-[#5C2A73]">
              Explore services
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[#E5D8C9] pt-4">
            <div>
              <h3 className="text-3xl font-bold text-[#5C2A73]">48k+</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Pets Cared For
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#5C2A73]">180+</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Certified Vets
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#5C2A73]">4.9/5</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Owner Rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image & Floating Badges */}
        <div className="relative flex w-full max-w-lg justify-center lg:w-1/2">
          {/* Main Image Container */}
          <div className="relative h-[600px] w-[450px] rounded-[2.5rem] bg-gradient-to-br from-[#f8f1e6] to-[#e6d9ce] shadow-2xl overflow-hidden ring-4 ring-white">
            {/* Replace src with an image of your own animals if you have one */}
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop"
              alt="Dog, cat and farm animals together"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-[#5C2A73]/5 mix-blend-multiply"></div>
          </div>

          {/* Floating Card 1: Loved by owners */}
          <div className="absolute -left-8 top-24 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86A33]/15 text-[#E86A33]">
              <Heart size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1E2A4A]">
                Loved by every pet
              </p>
              <p className="text-xs text-gray-500">Cats, dogs & more</p>
            </div>
          </div>

          {/* Floating Card 2: Vaccination Due */}
          <div className="absolute -right-12 top-2/3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73]">
              <CalendarDays size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1E2A4A]">
                Vaccination due
              </p>
              <p className="text-xs text-gray-500">Rabies · 12 Aug</p>
            </div>
          </div>

          {/* Floating Card 3: Prescription Verified */}
          <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1E2A4A]">
                Prescription verified
              </p>
              <p className="text-xs text-gray-500">Dispatched today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
