import {
  ArrowRight,
  PawPrint,
  Heart,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FDF8F2] pt-16">
      {/* Background gradients */}
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

      {/* Main Container - Removed min-h-[calc(100vh-4rem)] to fix the huge gap */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-12 lg:flex-row lg:gap-16 lg:py-20">
        {/* Left Content (Text & Buttons) */}
        <div className="flex w-full max-w-2xl flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5D8C9] bg-white px-4 py-2 text-xs font-semibold text-[#5C2A73] shadow-sm sm:text-sm">
            <PawPrint size={16} className="text-[#E86A33]" />
            AI health assistant now in beta
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-[#1E2A4A] sm:text-5xl lg:text-6xl xl:text-7xl">
            Complete Care
            <br />
            For Your Pet,
            <br />
            <span className="text-[#E86A33]">In One Platform.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:mt-8 sm:text-lg lg:text-xl">
            "Reimagining Animal Care"
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:mt-10 lg:justify-start">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E86A33] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#E86A33]/30 transition-all duration-300 hover:scale-105 hover:bg-[#5C2A73] sm:w-auto sm:py-4 sm:text-lg">
              Book a consultation
              <ArrowRight size={20} />
            </button>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#E5D8C9] bg-white px-8 py-3.5 text-base font-bold text-[#1E2A4A] transition-all duration-300 hover:border-[#5C2A73] hover:text-[#5C2A73] sm:w-auto sm:py-4 sm:text-lg">
              Explore services
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid w-full grid-cols-3 gap-4 border-t border-[#E5D8C9] pt-8 sm:gap-6 lg:mt-14 lg:w-auto">
            <div>
              <h3 className="text-2xl font-bold text-[#5C2A73] sm:text-3xl">
                48k+
              </h3>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
                Pets Cared For
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#5C2A73] sm:text-3xl">
                180+
              </h3>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
                Certified Vets
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#5C2A73] sm:text-3xl">
                4.9/5
              </h3>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
                Owner Rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image & Floating Badges */}
        <div className="relative mt-8 flex w-full max-w-lg justify-center lg:mt-0 lg:w-1/2">
          {/* Main Image Container - Scaled down for mobile, full size on desktop */}
          <div className="relative h-[450px] w-[320px] rounded-[2rem] bg-gradient-to-br from-[#f8f1e6] to-[#e6d9ce] shadow-2xl overflow-hidden ring-4 ring-white sm:h-[550px] sm:w-[400px] lg:h-[600px] lg:w-[450px] lg:rounded-[2.5rem]">
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop"
              alt="Dog, cat and farm animals together"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-[#5C2A73]/5 mix-blend-multiply"></div>
          </div>

          {/* Floating Card 1: Loved by owners */}
          <div className="absolute -left-4 top-16 flex items-center gap-2 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 sm:-left-8 sm:top-24 sm:gap-3 sm:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E86A33]/15 text-[#E86A33] sm:h-10 sm:w-10">
              <Heart size={18} className="sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E2A4A] sm:text-sm">
                Loved by every pet
              </p>
              <p className="text-[10px] text-gray-500 sm:text-xs">
                Cats, dogs & more
              </p>
            </div>
          </div>

          {/* Floating Card 2: Vaccination Due */}
          <div className="absolute -right-4 top-2/3 flex items-center gap-2 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 sm:-right-12 sm:gap-3 sm:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73] sm:h-10 sm:w-10">
              <CalendarDays size={18} className="sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E2A4A] sm:text-sm">
                Vaccination due
              </p>
              <p className="text-[10px] text-gray-500 sm:text-xs">
                Rabies · 12 Aug
              </p>
            </div>
          </div>

          {/* Floating Card 3: Prescription Verified */}
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 sm:-bottom-6 sm:gap-3 sm:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 sm:h-10 sm:w-10">
              <ShieldCheck size={18} className="sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E2A4A] sm:text-sm">
                Prescription verified
              </p>
              <p className="text-[10px] text-gray-500 sm:text-xs">
                Dispatched today
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
