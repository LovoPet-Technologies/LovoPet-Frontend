import {
  UserRoundPlus,
  SearchCheck,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: UserRoundPlus,
    title: "Create Your Account",
    description:
      "Sign up in just a few clicks and set up your pet's profile to access all LovoPet services.",
  },
  {
    id: 2,
    icon: SearchCheck,
    title: "Choose a Service",
    description:
      "Browse veterinary consultations, pharmacy, pet shop, adoption, and AI-powered pet care services.",
  },
  {
    id: 3,
    icon: Stethoscope,
    title: "Get Expert Care",
    description:
      "Book appointments, receive professional guidance, and manage your pet's healthcare with confidence.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#F8F3EC] py-16 lg:py-20 xl:py-24">
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6">
        <div className="mx-auto max-w-2xl xl:max-w-3xl text-center">
          <span className="rounded-full bg-[#E86A33]/10 px-3.5 py-1.5 text-[11px] lg:text-xs font-semibold uppercase tracking-widest text-[#E86A33]">
            How It Works
          </span>

          <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1E2A4A]">
            Caring for Your Pet
            <br />
            Has Never Been Easier
          </h2>

          <p className="mx-auto mt-4 max-w-xl lg:max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600">
            Start your pet care journey in three simple steps and enjoy a
            seamless digital experience with LovoPet.
          </p>
        </div>

        <div className="mt-14 lg:mt-16 flex flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:justify-center lg:gap-6 xl:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative w-full max-w-md rounded-2xl border border-[#E5D8C9] bg-white p-6 lg:p-6 xl:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg lg:flex-1 lg:max-w-none"
              >
                <div className="absolute -top-4 left-6 lg:left-7 flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#E86A33] text-base lg:text-lg font-bold text-white shadow-md">
                  {step.id}
                </div>

                <div className="mt-3 flex h-12 w-12 lg:h-13 lg:w-13 xl:h-16 xl:w-16 items-center justify-center rounded-xl lg:rounded-2xl bg-[#5C2A73]/10">
                  <Icon size={24} className="text-[#5C2A73] xl:hidden" />
                  <Icon size={30} className="hidden text-[#5C2A73] xl:block" />
                </div>

                <h3 className="mt-6 lg:mt-7 text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold text-[#5C2A73]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <div className="absolute -right-6 xl:-right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight size={24} className="text-[#E86A33]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
