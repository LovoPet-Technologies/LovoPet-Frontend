import { ArrowRight, PawPrint } from "lucide-react";

function CTASection() {
  return (
    <section className="bg-[#F8F3EC] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2rem] bg-[#5C2A73] px-8 py-16 text-center shadow-2xl md:px-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <PawPrint size={18} />
            Join the LovoPet Community
          </div>

          {/* Heading */}
          <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Your Pet Deserves
            <br />
            The Best Care
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200">
            Discover trusted veterinary care, AI-powered health support, pet
            shopping, adoption, and wellness services — all designed to keep
            your furry companion happy and healthy.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#E86A33] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#5C2A73]">
              Explore Services
              <ArrowRight size={20} />
            </button>

            <button className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#5C2A73]">
              Contact Us
            </button>
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/20 pt-10 text-white sm:grid-cols-3">
            <div>
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="mt-2 text-gray-300">Veterinary Assistance</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">AI</h3>
              <p className="mt-2 text-gray-300">Smart Pet Care</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">One</h3>
              <p className="mt-2 text-gray-300">Complete Pet Platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
