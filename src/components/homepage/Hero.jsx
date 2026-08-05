import { ArrowRight, PawPrint } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FDF8F2]">
      {/* Decorative Background */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#E86A33]/10 blur-3xl" />
      <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-[#5C2A73]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5D8C9] bg-white px-4 py-2 text-sm font-semibold text-[#5C2A73] shadow-sm">
            <PawPrint size={18} />
            AI Powered Pet Care Platform
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-[#5C2A73] md:text-6xl lg:text-7xl">
            Everything
            <br />
            Your Pet
            <br />
            Needs,
            <span className="text-[#E86A33]"> One Platform.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600 md:text-xl">
            Discover trusted veterinary care, pet pharmacy, adoption, AI-powered
            assistance, and premium pet products — all designed to keep your
            furry companions healthy and happy.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E86A33] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#5C2A73]">
              Explore Services
              <ArrowRight size={20} />
            </button>

            <button className="rounded-xl border-2 border-[#5C2A73] px-8 py-4 text-lg font-semibold text-[#5C2A73] transition-all duration-300 hover:bg-[#5C2A73] hover:text-white">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-[#5C2A73]">24/7</h3>
              <p className="mt-1 text-sm text-gray-600">Veterinary Support</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#5C2A73]">AI</h3>
              <p className="mt-1 text-sm text-gray-600">Smart Assistance</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#5C2A73]">100%</h3>
              <p className="mt-1 text-sm text-gray-600">Pet Focused</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full max-w-xl justify-center">
          <div className="flex h-[520px] w-full items-center justify-center rounded-[2rem] border border-[#E5D8C9] bg-[#F8F3EC] shadow-xl">
            <div className="text-center">
              <PawPrint
                size={90}
                className="mx-auto text-[#5C2A73]"
                strokeWidth={1.5}
              />

              <h3 className="mt-6 text-2xl font-bold text-[#5C2A73]">
                Hero Illustration
              </h3>

              <p className="mt-2 text-gray-500">Pet & Owner Image Here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
