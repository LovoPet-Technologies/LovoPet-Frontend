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
    <section className="bg-[#F8F3EC] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-[#E86A33]/10 px-4 py-2 text-sm font-semibold text-[#E86A33]">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-[#5C2A73] md:text-5xl">
            Caring for Your Pet
            <br />
            Has Never Been Easier
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Start your pet care journey in three simple steps and enjoy a
            seamless digital experience with LovoPet.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-10 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative rounded-3xl border border-[#E5D8C9] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Step Number */}
                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#E86A33] text-lg font-bold text-white shadow-md">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5C2A73]/10">
                  <Icon size={30} className="text-[#5C2A73]" />
                </div>

                {/* Title */}
                <h3 className="mt-8 text-2xl font-bold text-[#5C2A73]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>

                {/* Arrow (Desktop Only) */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ArrowRight size={32} className="text-[#E86A33]" />
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
